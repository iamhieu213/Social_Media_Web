import React, { useEffect, useState } from 'react'
import LeftSideBar from '../components/LeftSideBar'
import TopUsres from '../components/TopUsres'
import PostCard from '../components/PostCard'
import RightSideBar from '../components/RightSideBar'
import { api_base_url } from '../helper'

const Home = () => {

  const [data, setData] = useState(null);

  const getAllPosts = () => {
    fetch(api_base_url + "/getAllPosts",{
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res=>res.json()).then(data=>{
      setData(data.data)
      console.log(data)
    })
  }

  useEffect(() => {
    getAllPosts();
  }, [])
  

  return (
    <>
      <div className='flex'>
        <LeftSideBar />
        <div className='w-[55vw] p-[20px] min-h-[100vh]'>
          <TopUsres/>

          <div className="posts w-full flex flex-col items-end mt-[40px] ml-[10px]">
            {
              data ? data.map((item,index)=>{
                return <PostCard key={index} data={item}/>
              }) : "No posts found"
            }
          </div>
        </div>
        <RightSideBar />
      </div>
    </>
  )
}

export default Home