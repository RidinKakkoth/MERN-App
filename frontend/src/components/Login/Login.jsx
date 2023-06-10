import React, { useState } from 'react'
import "./Login.css"

function Login() {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(email,password);
  }

  return (
    <div className='login-body'>
<div className="card">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label >Email</label>
          <input type="email" id="email" name="email"
          onChange={(e)=>{setEmail(e.target.value)}}
           className="form-control" />
        </div>
  
        <div className="form-group">
          <label >Password</label>
          <input type="password" id="password" 
          onChange={(e)=>{setPassword(e.target.value)}}
          name="password" className="form-control" />
        </div>

        <div className='btn-div'>
        <button type="submit"  className="login-btn">Log In</button>
        </div>

      </form>

      <div className='btn-div' >
        <button style={{marginTop:"20px"}}  className="btn-primary">Sign Up</button>
      </div>
    </div>

    </div>
  )
}

export default Login
