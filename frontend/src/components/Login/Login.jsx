import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./Login.css"

function Login() {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[error,setError]=useState(null)

  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
   
    
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });
      console.log(response.data,"rrrrrrrrr",response);
       navigate('/home')
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error)
      
    }
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
      <p>{error}</p>
    </div>

    </div>
  )
}

export default Login
