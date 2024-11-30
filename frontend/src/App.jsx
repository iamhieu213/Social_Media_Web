import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignUp from './pages/signUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import CreatorProfile from './pages/CreatorProfile';

const App = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/login"/>} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={isLoggedIn ? <Profile /> : <Navigate to="/login"/>} />
          <Route path='/creatorProfile/:id' element={isLoggedIn ? <CreatorProfile /> : <Navigate to="/login"/>} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App