import React, { useEffect, useState } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import PostCard2 from '../components/PostCard2'
import { api_base_url } from '../helper'

const Profile = () => {

  const [data, setData] = useState(null);
  const [posts, setPosts] = useState(0);
  const [postsData, setPostsData] = useState(null)

  const getUserDetails = () => {
    fetch(api_base_url + "/getMyDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      console.log("PR")
      if (data.success) {
        setData(data.data);
        setPosts(data.posts);
        console.log(data)
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
        userId: localStorage.getItem("userId")
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


  return (
    <>
      <div className="flex">
        <LeftSideBar />
        <div>
          <div className="flex p-[60px] items-center gap-[20px]">

            <div className="profileImg w-[120px] h-[120px] rounded-[50%] bg-gray-300"></div>
            <div>

              <p className='text-[30px]'>{data ? data.username : ""}</p>
              <p className='text-[gray] text-[14px]'>Created in {data ? new Date(data.date).toDateString() : ""}</p>
              <p className='text-[gray] text-[14px]'>{posts ? posts : ""} posts | {data ? data.followers.length : ""} Followers</p>

            </div>

            {/* <button className="btnBlue w-[150px] !rounded-[30px] absolute right-10">Follow</button> */}
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

export default Profile