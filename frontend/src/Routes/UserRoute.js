import React, { useEffect } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LoginPage from '../pages/User page/LoginPage'
import SignupPage from '../pages/User page/SignupPage'
import HomePage from '../pages/User page/HomePage'
import ProfilePage from '../pages/User page/ProfilePage'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { UserActions } from '../store/UserAuth'

function UserRoute() {

const [cookies]=useCookies(['jwt'])
const dispatch=useDispatch()

useEffect(()=>{

  if(cookies.jwt){
    dispatch(UserActions.userAddDetails({name:cookies.jwt.name,token:cookies.jwt.token}))
  }
},[cookies.jwt,dispatch])

const userToken=useSelector((state)=>state.user.userToken)

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
