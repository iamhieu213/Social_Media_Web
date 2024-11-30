var express = require('express');
var router = express.Router();
var userModel = require("../models/userMode");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var postModel = require("../models/postModel");
var multer = require("multer");
const path = require('path');

const secret = "secret";

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/signUp", async (req, res) => {
  let { username, name, email, password } = req.body;
  let emailCon = await userModel.findOne({ email: email });

  if (emailCon) {
    return res.json({
      success: false,
      msg: "Email already exists"
    });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) throw err;
        else {
          let user = await userModel.create({
            username: username,
            name: name,
            email: email,
            password: hash
          });

          res.json({
            success: true,
            msg: "User created successfully",
          });
        }
      });
    });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  console.log(password, email)
  let user = await userModel.findOne({ email: email });

  if (user) {
    // Compare the provided password with the hashed password in the database
    bcrypt.compare(password, user.password, function (err, match) {
      console.log(match)
      if (match) {
        var token = jwt.sign({ email: email, userId: user._id }, secret);

        return res.json({
          success: true,
          msg: "User logged in successfully",
          token: token,
          userId: user._id
        });
      } else {
        return res.json({
          success: false,
          msg: "Invalid password"
        });
      }
    });
  } else {
    return res.json({
      success: false,
      msg: "User not found"
    });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname); // Get the file extension
    cb(null, file.fieldname + '-' + uniqueSuffix + extension); // Append the extension
  }
});

const upload = multer({ storage: storage });

router.post("/createPost", upload.single('postImg'), async (req, res) => {
  if (!req.file) {
    return res.json({
      success: false,
      msg: "Please upload an image"
    });
  };

  let newPost = await postModel.create({
    post: req.body.post,
    uploadedBy: req.body.userId,
    postImg: req.file.filename
  })

  res.json({
    success: true,
    msg: "Post created successfully",
    postId: newPost._id
  })
})

router.post("/createComment", async (req, res) => {
  try {
    let { userId, comment, postId } = req.body;

    // Find the user by userId
    let user = await userModel.findById(userId);

    if (user) {
      // Update the post by adding the new comment
      let updatedPost = await postModel.findByIdAndUpdate(
        postId,
        {
          $push: {
            comments: {
              userId: userId,
              name: user.name, // Assuming you have a 'name' field in the user model
              comment: comment,
              date: Date.now()
            }
          }
        },
        { new: true } // This returns the updated document
      );

      if (updatedPost) {
        res.json({
          success: true,
          msg: "Comment created successfully",
          updatedPost // You can return the updated post if needed
        });
      } else {
        res.json({
          success: false,
          msg: "Post not found"
        });
      }
    } else {
      res.json({
        success: false,
        msg: "User not found"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "An error occurred",
      error: error.message
    });
  }
});

router.post("/toggleLike", async (req, res) => {
  try {
    const { postId, userId } = req.body;

    // Find the post
    let post = await postModel.findById(postId);

    // Check if the user has already liked the post
    const likeIndex = post.likes.findIndex(like => like.userId.toString() === userId);

    if (likeIndex !== -1) {
      // If the user has already liked the post, remove the like (unlike)
      post.likes.splice(likeIndex, 1);
      await post.save();
      return res.json({ success: true, msg: "Post unliked" });
    } else {
      // If the user hasn't liked the post, add the like
      post.likes.push({ userId });
      await post.save();
      return res.json({ success: true, msg: "Post liked" });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "An error occurred",
      error: error.message
    });
  }
});


router.post("/getAllPosts", async (req, res) => {
  try {
    let { userId } = req.body;
    let posts = await postModel.find({});

    let fullData = await Promise.all(posts.map(async (post) => {
      let user = await userModel.findById(post.uploadedBy);
      let likes = await postModel.findById(post._id).populate('likes.userId');
      let comments = await postModel.findById(post._id).populate('comments.userId');

      console.log('Likes:', likes.likes);

      return {
        post: post,
        user: user,
        likes: likes.likes, // assuming likes is populated
        comments: comments.comments, // assuming comments is populated
        isYouLiked: likes.likes.some(like => like.userId._id.toString() === userId)
      };
    }));

    res.json({
      success: true,
      data: fullData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "An error occurred",
      error: error.message
    });
  }
});

router.get("/getAllUsers", async (req, res) => {
  let users = await userModel.find({});
  res.json({
    success: true,
    data: users
  })
})

router.post("/getMyDetails", async (req, res) => {
  let { userId } = req.body;
  let user = await userModel.findById(userId);
  if (user) {
    let posts = await postModel.find({ uploadedBy: userId });
    return res.json({
      success: true,
      msg: "User Found",
      data: user,
      posts: posts.length
    });
  }
  else {
    return res.json({
      success: false,
      msg: "User Not Found !"
    })
  }
});

router.post("/getUserDetails", async (req, res) => {
  let { userId } = req.body;
  let user = await userModel.findById(userId);
  if (user) {
    let posts = await postModel.find({ uploadedBy: userId });
    return res.json({
      success: true,
      msg: "User Found",
      data: user,
      posts: posts.length
    })
  }
  else {
    return res.json({
      success: false,
      msg: "User Not Found !"
    })
  }
})

router.post("/getPosts", async (req, res) => {
  let { userId } = req.body;
  let user = await userModel.findById(userId);
  if (user) {
    let posts = await postModel.find({ uploadedBy: userId });
    return res.json({
      success: true,
      msg: "User Found",
      data: posts
    })
  }
  else {
    return res.json({
      success: false,
      msg: "User Not Found !"
    })
  }
})

// Follow User Route
router.post("/followUser", async (req, res) => {
  try {
    let { userId, followId } = req.body;

    // Find the user who is following
    let user = await userModel.findById(userId);

    if (user) {
      // Check if the user is already following the target user
      const alreadyFollowing = user.followers.some(follower => follower.userId.toString() === followId);

      if (!alreadyFollowing) {
        // Add the new follower object with the followId
        user.followers.push({ userId: followId });
        await user.save();
        return res.json({
          success: true,
          msg: "User Followed"
        });
      } else {
        return res.json({
          success: false,
          msg: "Already Following User"
        });
      }
    } else {
      return res.json({
        success: false,
        msg: "User Not Found!"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
      error: error.message
    });
  }
});

// Unfollow User Route
router.post("/unFollowUser", async (req, res) => {
  try {
    let { userId, followId } = req.body;

    console.log(userId, followId)
    // Find the user who is unfollowing
    let user = await userModel.findById(userId);

    if (user) {
      // Check if the user is following the target user
      const followerIndex = user.followers.findIndex(follower => follower.userId.toString() === followId);

      if (followerIndex !== -1) {
        // Remove the follower object that matches the followId
        user.followers.splice(followerIndex, 1);
        await user.save();
        return res.json({
          success: true,
          msg: "User Unfollowed"
        });
      } else {
        return res.json({
          success: false,
          msg: "User was not being followed"
        });
      }
    } else {
      return res.json({
        success: false,
        msg: "User Not Found!"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
      error: error.message
    });
  }
});


// Get User Details Including "isYouFollowed" (POST)
router.post("/getCreatorDatails", async (req, res) => {
  try {
    const { userId, currentUserId } = req.body;

    // Find the user by userId
    const user = await userModel.findById(userId);

    if (user) {
      // Check if the current user is following the target user
      // const isYouFollowed = user.followers.some(follower => follower.userId_id.equals(currentUserId));
      const isYouFollowed = user.followers.some(follower => follower.userId.toString() === currentUserId);

      return res.json({
        success: true,
        msg: "User Found",
        data: {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          followers: user.followers.length,  // Number of followers
          date: user.date,
          posts: user.__v  // Example, you can return posts if available
        },
        isYouFollowed // Add this to the response to show follow status
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "User Not Found!"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
      error: error.message
    });
  }
});

module.exports = router;
