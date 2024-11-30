import React from 'react'

const RightSideBar = () => {
  return (
    <>
      <div className="RightSideBar pt-[60px] w-[25vw] h-[100vh] sticky top-0 right-0 bg-[#121212] p-[20px]">
        <div className="flex items-center gap-2">
          <img className='w-[50px] h-[50px] rounded-[50%] cursor-pointer' src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="" />
          <div>
            <b className=''>Coding</b>
            <p className='text-[14px] text-[gray]'>Create Anything With Code </p>
          </div>
        </div>

        <p style={{marginTop: '20px',fontWeight:"700",marginBottom:"20px"}}>Top Creators On Snapper</p>

        <div className="creators">

        <div className="flex items-center gap-2 mb-[20px]">
          <img className='w-[35px] h-[35px] rounded-[50%] cursor-pointer' src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="" />
          <div>
            <b>imkir</b>
            <p className='text-[14px] text-[gray]'>13M Followers</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-[20px]">
          <img className='w-[35px] h-[35px] rounded-[50%] cursor-pointer' src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="" />
          <div>
            <b>imkir</b>
            <p className='text-[14px] text-[gray]'>13M Followers</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-[20px]">
          <img className='w-[35px] h-[35px] rounded-[50%] cursor-pointer' src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="" />
          <div>
            <b>imkir</b>
            <p className='text-[14px] text-[gray]'>13M Followers</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-[20px]">
          <img className='w-[35px] h-[35px] rounded-[50%] cursor-pointer' src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="" />
          <div>
            <b>imkir</b>
            <p className='text-[14px] text-[gray]'>13M Followers</p>
          </div>
        </div>

        </div>
      </div>
    </>
  )
}

export default RightSideBar