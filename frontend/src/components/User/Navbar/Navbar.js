import React from 'react'
import "./Navbar.css"
import { BiLogOut } from 'react-icons/bi';

import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate=useNavigate()
  return (
    <div>
            <div className='navbar'>
            <span className='home' onClick={()=>{navigate('/home')}}>Home</span>
         <div className='nav-right'>
            <div className='lgdiv'>
            <span className='logout' onClick={()=>{navigate('/')}}> {<BiLogOut/>} Logout</span>
            </div>
            <span className='profile' onClick={()=>{navigate('/profile')}}><CgProfile/></span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
