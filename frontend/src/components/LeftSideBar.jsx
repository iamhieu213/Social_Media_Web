import React, { useState } from 'react'
import logo from "../images/logo.png"
import { AiFillHome } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import { MdLogout, MdOutlineExplore } from 'react-icons/md';
import { BsCameraReels, BsCheckLg } from 'react-icons/bs';
import { LuMessageSquare } from 'react-icons/lu';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { FaImage, FaRegSquarePlus } from 'react-icons/fa6';
import { api_base_url } from '../helper';


const LeftSideBar = () => {

  const [isModelShow, setIsModelShow] = useState(false);
  const [postImg, setPostImg] = useState("");
  const [post, setPost] = useState("");

  const createPost = (e) => {
    let formData = new FormData();
    formData.append("post", post);
    formData.append("postImg", postImg);
    formData.append("userId", localStorage.getItem("userId"));
    e.preventDefault();
    if (post == "") {
      alert("You must write something to post")
    }
    else if (postImg == "") {
      alert("You must select an image to post")
    }
    else {
      fetch(api_base_url + "/createPost", {
        mode: "cors",
        method: "POST",
        body: formData,
      }).then(res => res.json()).then(data => {
        console.log(data);
      })
    }
  }

  return (
    <div className='w-[20vw] p-[15px] border-r-[.5px] border-r-[#fff] h-[100vh] sticky top-0 left-0'>
      <img className='w-[140px] mt-4 mb-5 cursor-pointer' src={logo} alt="" />

      <div className="links pl-4">
        <Link to="/" className='flex my-6 items-center gap-3 text-[16px]'><i className='text-[25px]'><AiFillHome /></i> Home </Link>
        <Link className='flex my-6 items-center gap-3 text-[16px]'><i className='text-[25px]'><RiSearchLine /></i> Search </Link>
        <Link className='flex my-6 items-center gap-3 text-[16px]'><i className='text-[25px]'><MdOutlineExplore /></i> Explore </Link>
        <Link className='flex my-6 items-center gap-3 text-[16px]'><i className='text-[25px]'><BsCameraReels /></i> Reels </Link>
        <Link className='flex my-6 items-center gap-3 text-[16px]'><i className='text-[25px]'><LuMessageSquare /></i> Messages </Link>
        <Link className='flex my-6 items-center gap-3 text-[16px]'><i className='text-[25px]'><IoMdNotificationsOutline /></i> Notifications </Link>
        <Link onClick={() => { setIsModelShow(true) }} className='flex my-6 items-center gap-3 text-[16px]'><i className='text-[25px]'><FaRegSquarePlus /></i> Create </Link>
        <Link to="/profile" className='flex my-6 items-center gap-3 text-[16px]'><img className='w-[25px] h-[25px] rounded-[50%] cursor-pointer' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" /> Profile </Link>

        <Link onClick={()=>{
          localStorage.removeItem("userId");
          localStorage.removeItem("token");
          localStorage.removeItem("isLoggedIn");
          window.location.reload();
        }} className='flex my-6 items-center gap-3 text-[16px] absolute bottom-3'><i className='text-[25px]'><MdLogout /></i> Logout </Link>

      </div>

      <input type="file" onChange={(e) => { setPostImg(e.target.files[0]) }} name="postImg" id='realFile' hidden />


      {
        isModelShow ?
          <div onClick={(e) => {
            if (e.target.classList.contains("modelCon")) {
              setIsModelShow(false)
            }
          }} className="modelCon fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex items-center flex-col justify-center bg-[rgb(0,0,0,.5)]">
            <div className="modelBody w-[35vw] min-h-[50vh] bg-[#121212] rounded-[10px] p-[20px]">
              <div>
                <p className='text-[20px]'>Create New Post</p>

                <div className="textBox mt-[20px]">
                  <textarea onChange={(e) => { setPost(e.target.value) }} value={post} placeholder="What's on your mind ?" id=""></textarea>
                  <i onClick={() => {
                    document.getElementById("realFile").click()
                  }} className='text-[20px] cursor-pointer m-[10px]'><FaImage /></i>
                </div>
              </div>

              <button onClick={createPost} className="btnBlue w-full mt-3">Create Post</button>
            </div>
          </div> : ""
      }
    </div>


  )
}

export default LeftSideBar