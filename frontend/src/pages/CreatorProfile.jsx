import React, { useEffect, useState } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import PostCard2 from '../components/PostCard2'
import { api_base_url } from '../helper'
import { useParams } from 'react-router-dom'

const CreatorProfile = () => {

  let {id} = useParams();
  const [data, setData] = useState(null);
  const [posts, setPosts] = useState(0);
  const [postsData, setPostsData] = useState(null)
  const [isYouFollowed, setIsYouFollowed] = useState();

  const getUserDetails = () => {
    fetch(api_base_url + "/getCreatorDatails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: id,
        currentUserId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      console.log("CR")
      if (data.success) {
        setData(data.data);
        setPosts(data.posts);
        setIsYouFollowed(data.isYouFollowed)
      }
      else {
        alert(data.msg)
      }
    })
  }

  const getAllPosts = () => {
    fetch(api_base_url + "/getPosts", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: id
      })
    }).then(res => res.json()).then(data => {
      console.log(data);
      if(data.success){
        setPostsData(data.data)
      }
      else{
        alert(data.msg)
      }
    })
  }

  useEffect(() => {
    getUserDetails();
    getAllPosts();
  }, [])

  const followUser = (id) => {
    fetch(api_base_url + "/followUser", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        followId: id,
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setIsYouFollowed(true)
      }
      else {
        alert(data.msg)
      }
    })
  };

  const unFollowUser = (id) => {
    fetch(api_base_url + "/unFollowUser", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        followId: id,
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setIsYouFollowed(false)
      }
      else {
        alert(data.msg)
      }
    })
  };

  return (
    <>
      <div className="flex">
        <LeftSideBar />
        <div>
          <div className="flex p-[60px] items-center gap-[20px]">

            <div className="CreatorProfileImg w-[120px] h-[120px] rounded-[50%] bg-gray-300"></div>
            <div>

              <p className='text-[30px]'>{data ? data.username : ""}</p>
              <p className='text-[gray] text-[14px]'>Created in {data ? new Date(data.date).toDateString() : ""}</p>
              <p className='text-[gray] text-[14px]'>{posts ? posts : ""} posts | {data ? data.followers.length : ""} Followers</p>

            </div>

           {
            isYouFollowed ? <>
            <button onClick={()=>{unFollowUser(id)}} className="btnBlue w-[150px] !rounded-[30px] absolute right-10">Un Follow</button>
            </> : <button onClick={()=>{followUser(id)}} className="btnBlue w-[150px] !rounded-[30px] absolute right-10">Follow</button>
           }
          </div>

          <div className="posts mb-[40px] flex gap-[15px] flex-wrap ml-[80px]">
        
            {
              postsData ? postsData.map((post,index)=>{
                return (
                  <>
                    <PostCard2 key={index} post={post} />
                  </>
                )
              }) : "No Posts Yet !"
            }
          </div>
        </div>


      </div>
    </>
  )
}

export default CreatorProfile