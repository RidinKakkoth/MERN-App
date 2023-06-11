import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LoginPage from '../pages/User page/LoginPage'
import SignupPage from '../pages/User page/SignupPage'
import Navbar from '../components/User/Navbar/Navbar'
import HomePage from '../pages/User page/HomePage'
import ProfilePage from '../pages/User page/ProfilePage'

function UserRoute() {
  return (
    <div>
       <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/home' element={<><Navbar/> <HomePage/></>}/>
      <Route path='/profile' element={<><Navbar/><ProfilePage/></>}/>
      </Routes>
    </div>
  )
}

export default UserRoute
