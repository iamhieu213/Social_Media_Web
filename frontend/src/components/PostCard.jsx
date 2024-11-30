import React, { useState } from 'react'
import { BiMessageSquare } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { FaHeart, FaRegBookmark, FaRegHeart, FaShare } from 'react-icons/fa6'
import { PiShareFat } from 'react-icons/pi'
import { api_base_url } from '../helper'

const PostCard = ({ data }) => {

  const [comment, setComment] = useState("");

  const [isCommentsShow, setIsCommentsShow] = useState(false);

  const createComment = (postId) => {
    fetch(api_base_url + "/createComment", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        postId: postId,
        comment: comment,
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        alert("Commented Successfully");
      }
      else {
        alert("Something went wrong");
      }
    })
  };

  const toggleLike = (isYouLiked, postId) => {
    fetch(api_base_url + "/toggleLike", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        postId: postId,
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      console.log(data);
    });
  };

  return (
    <>
      <div className="post mb-4 p-[15px] w-[80%] mr-[70px] border-[1px] border-[#fff] " style={{ height: 'fit-content' }}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <img className='w-[35px] h-[35px] cursor-pointer rounded-[50%]' src="https://i.pinimg.com/736x/59/37/5f/59375f2046d3b594d59039e8ffbf485a.jpg" alt="" />
            <p className='text-[gray]'><b className='text-white'>{data ? data.user.username : ""}</b> | {data ? new Date(data.post.date).toDateString() : ""} </p>
          </div>
          <i className='text-[20px] cursor-pointer'><BsThreeDots /></i>
        </div>

        <div className="imageCon mt-[20px] w-full">
          <img src={data ? "http://localhost:3000/uploads/" + data.post.postImg : ""} alt="" />
        </div>

        <div className="flex items-center mt-[10px] justify-between w-full">
          <div className="flex items-center gap-2">
            <i onClick={() => { toggleLike(data.isYouLiked, data.post._id) }} className={`text-[25px] cursor-pointer ${data.isYouLiked ? "text-red-600" : ""}`}>{data.isYouLiked ? <FaHeart /> : <FaRegHeart />}</i>
            <i className='text-[25px] cursor-pointer'><BiMessageSquare /></i>
            <i className='text-[25px] cursor-pointer'><PiShareFat /></i>
          </div>

          <i className='text-[25px] cursor-pointer'><FaRegBookmark /></i>

        </div>
        <b className='text-[14px]'>{data ? data.post.likes.length : ""} likes</b>

        <p className='text-[gray] text-[15px]'><b className='text-white'>{data ? data.user.username : ""}</b> {data ? data.post.post : ""}</p>
        <p onClick={()=>{data.post.comments.length > 0 ? setIsCommentsShow(!isCommentsShow) : ""}} className='text-[14px] text-[gray]'>{data ? data.post.comments.length > 0 ? `View all ${data.post.comments.length} comments` : "No Comments" : ""} </p>

        {
          isCommentsShow ? <>
            <div className='w-full my-3'>
              {
                data ? data.post.comments.map((comment) => {
                  return (
                    <div className="comment mb-1 p-[5px] bg-[#201E26]">
                      <p className='text-[13px] text-[gray]'>{comment.name} | {new Date(comment.date).toDateString()}</p>
                      <p>{comment.comment}</p>
                    </div>
                  )
                }) : "No Commenst Yet !"
              }
            </div>
          </> : ""
        }

        <div className="inputBox !bg-transparent w-full !rounded-none" style={{ borderBottom: "1px solid #fff" }}>
          <input onChange={(e) => { setComment(e.target.value) }} onKeyUp={(e) => {
            if (e.key === "Enter") {
              createComment(data.post._id, data.isYouLiked);
            }
          }} value={comment} className='!pl-0' type="text" placeholder='Add a comment...' />
        </div>
      </div>
    </>
  )
}

export default PostCard