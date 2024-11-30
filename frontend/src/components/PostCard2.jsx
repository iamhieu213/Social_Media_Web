import React from 'react'

const PostCard2 = ({post}) => {
  return (
    <>
      <div className="PostCard2 cursor-pointer w-[250px] h-[250px] border-[1px] p-[10px] border-[#fff]">
        <img className='w-full h-[80%] object-cover' src={post ? `http://localhost:3000/uploads/${post.postImg}` : ""} alt="" />
       <p>{post ? post.post : ""}</p>
       <p className='text-[gray] text-[14px]'>{post ? post.likes.length : ""} likes | {post ? post.comments.length : ""} comments</p>
      </div>
    </>
  )
}

export default PostCard2