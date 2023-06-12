import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userAddDetails } from '../../../store/UserAuth'

import axios from 'axios'
import { userApi } from '../../../store/Api'
import "./UserLogin.css"
import { Cookies, useCookies } from 'react-cookie'

// import Cookies from 'universal-cookie';

function Login() {
  const dispatch = useDispatch()
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[error,setError]=useState(null)

  const navigate=useNavigate()

  const [cookies, setCookie] = useCookies(['jwt']);




  const handleSubmit=async(e)=>{
    e.preventDefault()
    
    axios.post(`${userApi}login`,  {
      email,
      password
    },{ withCredentials: true })
      .then((response) => {
        const result=response.data.userLogin
        console.log(result.token);
        if(result.status){
      
          dispatch(  userAddDetails({name:result.name,token:result.token}))

          // setCookie('jwt', result.token, { path: '/' });

       
          navigate('/home');
        }
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setError(error.response.data.error);
      });
  }

  return (
    <div className='login-body-user'>
<div className="card">
      <h1 className='user-login'>LOGIN</h1>
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
        <button style={{marginTop:"20px"}} onClick={()=>{navigate('/signup')}} className="btn-signup">Sign Up</button>
      </div>
      <p className='error'>{error}</p>
    </div>

    </div>
  )
}

export default Login
