import React, { useState } from 'react'
import './Signup.css'
import  axios  from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[firstname,setFirstname]=useState("")
  const[lastname,setLastname]=useState("")
  const[phone,setPhone]=useState("")
  const[error,setError]=useState(null)

  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(email,password,phone,lastname,firstname,"ppppppppppppppdddddddddddd");

    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', {
        email,
        password,
        firstname,
        lastname,
        phone,
      });
       navigate('/login')
    } catch (error) {
      setError(error.message);
    }



  }

  return (
    <div className='signup-body'>

    <div className="card">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label >First Name</label>
          <input type="text" id="firstName"
          onChange={(e)=>{setFirstname(e.target.value)}} 
          name="firstName" className="form-control" />
        </div>
        <div className="form-group">
          <label >Last Name</label>
          <input type="text" id="lastName" 
          onChange={(e)=>{setLastname(e.target.value)}} 
          name="lastName" className="form-control" />
        </div>
        <div className="form-group">
          <label >Email</label>
          <input type="email" id="email"
          onChange={(e)=>{setEmail(e.target.value)}} 
           name="email" className="form-control" />
        </div>
        <div className="form-group">
          <label >Phone</label>
          <input type="text" id="phone"
          onChange={(e)=>{setPhone(e.target.value)}} 
           name="phone" className="form-control" />
        </div>
        <div className="form-group">
          <label >Password</label>
          <input type="password"
          onChange={(e)=>{setPassword(e.target.value)}} 
           id="password" name="password" className="form-control" />
        </div>
        <div className='btn-div'>
        <button type="submit" className="btn-primary">Sign Up</button>
        </div>
      </form>
      <div className='btn-div'>
        <button  className="login-btn">Log In</button>
      </div>
    </div>
    </div>
  )
}

export default Signup
