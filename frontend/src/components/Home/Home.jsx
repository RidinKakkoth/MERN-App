import React from 'react'
import './Home.css'
import { CgProfile } from 'react-icons/cg';

function Home() {
  return (
    <div className='home' >
      <div className='navbar'>
            <h1>Home</h1>
         <div>
            <span className='logout'>Logout</span>
            <span className='profile'><CgProfile/></span>
        </div>
      </div>
    </div>
  )
}

export default Home
