import React, { useEffect } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LoginPage from '../pages/User page/LoginPage'
import SignupPage from '../pages/User page/SignupPage'
import HomePage from '../pages/User page/HomePage'
import ProfilePage from '../pages/User page/ProfilePage'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { userAddDetails } from '../store/UserAuth'

function UserRoute() {

const [cookies]=useCookies(['jwt'])
const dispatch=useDispatch()

console.log(cookies, "cookies");


useEffect(()=>{

  console.log(cookies.jwt,"cccccccccccccccckkkkkkkkkkkkkk");

  if(cookies.jwt){
    dispatch(userAddDetails({name:cookies.jwt.userName,token:cookies.jwt.token}))
  }
},[cookies,dispatch])

// const userToken=useSelector((state)=>state.User.userToken)
const userToken = useSelector((state) => state.user.userToken);
console.log(userToken,"uttttttttttttttt");


  return (
    <div>
       <Routes>
      <Route path='/' element={userToken?<HomePage/>:<LoginPage/>}/>
      <Route path='/signup' element={userToken?<HomePage/>:<SignupPage/>}/>
      <Route path='/home' element={ userToken?<HomePage/>:<LoginPage/>}/>
      <Route path='/profile' element={userToken?<ProfilePage/>:<LoginPage/>}/>
      </Routes>
    </div>
  )
}

export default UserRoute
