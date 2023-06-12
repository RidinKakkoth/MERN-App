import React from 'react'
import "./Navbar.css"
import { BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';

import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { UserActions } from '../../../store/UserAuth';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Navbar() {

    const navigate=useNavigate()
    const[cookie,setCookie,removeCookie]=useCookies(['jwt'])
    const dispatch=useDispatch()
    
    const userName=useSelector((state)=>state.user.userName)

    const userLogout=()=>{
          removeCookie('jwt')

          dispatch(UserActions.userLogout())
          navigate('/')
    }


  return (
    <div>
            <div className='navbar'>
            <span className='home' onClick={()=>{navigate('/home')}}>Home</span>
         <div className='nav-right'>
            <span className='profile' onClick={()=>{navigate('/profile')}}><CgProfile/></span>
          <div>
          <p className='username'>Hi: {userName}</p>
          </div>
            <div className='lgdiv'>
            <span className='logout' onClick={userLogout}> {<BiLogOut/>} Logout</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
