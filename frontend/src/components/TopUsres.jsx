import React, { useEffect, useState } from 'react'
import { api_base_url } from '../helper'
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';

const TopUsres = () => {
  const naviagte = useNavigate();
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch(api_base_url + "/getAllUsers").then(res => res.json()).then(data => {
      setData(data.data)
      console.log(data.data)
    })
  }, [])

  return (
    <>
      <div className="TopUsres pt-[20px] ml-[10px] flex items-center gap-[20px]">

        {
          data ? data.map((user, index) => {
            return (
              user._id == localStorage.getItem("userId") ? "" : <div onClick={() => { naviagte("/creatorProfile/" + user._id) }} className="userCon flex items-center justify-center flex-col">
                <Avatar className=" cursor-pointer" name={user.name} size="50" round="50%" />
                <p className='text-[13px] mt-1'>{user.name}</p>
              </div>
            )
          }) : "No Users Yet !"
        }

      </div>
    </>
  )
}

export default TopUsres