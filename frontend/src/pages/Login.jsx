import React, { useState } from 'react'
import logo from "../images/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import sideImg from "../images/side.png"
import { api_base_url } from '../helper'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("isLoggedIn", true);
        setTimeout(() => {
          navigate("/")
        }, 100);
      }
      else {
        setError(data.msg)
      }
    })
  }

  return (
    <>
      <div className="container flex items-center pl-[130px]">
        <form onSubmit={submitForm} className='flex flex-col h-[80vh] justify-center'>
          <img className='w-[170px] object-cover -ml-5' src={logo} alt="" />

          <div className="inputBox mt-[15px] w-[25vw]">
            <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' />
          </div>

          <div className="inputBox mt-[15px] w-[25vw]">
            <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" placeholder='Password' />
          </div>

          <p className='my-3 text-[14px]'>Don't Have An Account <Link className='text-blue-500' to="/signUp">Sign Up</Link></p>
          <p className='my-2 text-[13px] text-red-500'>{error}</p>
          <button className="btnBlue w-[25vw]">Login</button>
        </form>
        <div className="imageside  w-[70vw] flex items-center justify-end">
          <img className='w-[58vw] h-[100vh]' src={sideImg} alt="" />
        </div>
      </div>
    </>
  )
}

export default Login