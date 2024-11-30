import React, { useState } from 'react'
import logo from "../images/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import sideImg from "../images/side.png"
import { api_base_url } from '../helper'

const SignUp = () => {

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        name,
        email,
        password
      })
    }).then((res) => res.json()).then((data) => {
      if (data.success) {
        navigate("/login");
      }
      else {
        setError(data.msg);
      }
    })
  }

  return (
    <>
      <div className="container flex items-center pl-[130px]">
        <form onSubmit={submitForm} className='flex flex-col h-[80vh] justify-center'>
          <img className='w-[170px] object-cover -ml-5' src={logo} alt="" />

          <div className="inputBox mt-[30px] w-[25vw]">
            <input 
              required 
              type="text" 
              placeholder='Username' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>

          <div className="inputBox mt-[15px] w-[25vw]">
            <input 
              required 
              type="text" 
              placeholder='Name' 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          <div className="inputBox mt-[15px] w-[25vw]">
            <input 
              required 
              type="email" 
              placeholder='Email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="inputBox mt-[15px] w-[25vw]">
            <input 
              required 
              type="password" 
              placeholder='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <p className='my-3 text-[14px]'>Already Have An Account <Link className='text-blue-500' to="/login">Login</Link></p>

          <p className='my-2 text-[13px] text-red-500'>{error}</p>

          <button className="btnBlue w-[25vw]">Sign Up</button>
        </form>
        <div className="imageside w-[70vw] flex items-center justify-end">
          <img className='w-[58vw] h-[100vh]' src={sideImg} alt="" />
        </div>
      </div>
    </>
  )
}

export default SignUp;
