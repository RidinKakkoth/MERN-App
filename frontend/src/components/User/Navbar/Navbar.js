import React from 'react'
import "./Navbar.css"

import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate=useNavigate()
  return (
    <div>
            <div className='navbar'>
            <span className='home' onClick={()=>{navigate('/home')}}>Home</span>
         <div className='nav-right'>
            <span className='logout' onClick={()=>{navigate('/')}}>Logout</span>
            <span className='profile' onClick={()=>{navigate('/profile')}}><CgProfile/></span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
