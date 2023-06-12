import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adminActions } from '../../../store/AdminAuth'
import { adminAdd } from '../../../store/AdminAuth';

import axios from 'axios'
import { adminApi } from '../../../store/Api'
import "./Login.css"
// import { useCookies } from 'react-cookie';

function Login() {
  const dispatch = useDispatch()
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[error,setError]=useState(null)

  // const [cookies, setCookie] = useCookies(['jwt']);//=================

  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    
    axios.post(`${adminApi}login`,  {
      email,
      password
    },{ withCredentials: true })
      .then((response) => {
        const result=response.data.adminLogin
        if(result.status){
         
          // setCookie('jwt', result.token);//====================
          console.log(result,"strt");
          // dispatch(adminActions.adminAdd({token:result.token}))
          dispatch(adminAdd({token:result.token}))
          navigate('/admin/dashboard');
        }
        else{
          // setError(result.)
        }
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setError(error.response.data.error);
      });
  }

  return (
    <div className='login-body'>
<div className="card">
      <h1 className='admin-login'>Log In</h1>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label className='admin-label' >Email</label>
          <input type="email" id="email" name="email"
          onChange={(e)=>{setEmail(e.target.value)}}
           className="form-control" />
        </div>
  
        <div className="form-group">
          <label className='admin-label'>Password</label>
          <input type="password" id="password" 
          onChange={(e)=>{setPassword(e.target.value)}}
          name="password" className="form-control" />
        </div>

        <div className='admin-btn-div'>
        <button type="submit"  className="adminlogin-btn">Log In</button>
        </div>

      </form>
{/* 
      <div className='btn-div' >
        <button style={{marginTop:"20px"}} onClick={()=>{navigate('/signup')}} className="btn-primary">Sign Up</button>
      </div> */}
      <p>{error}</p>
    </div>

    </div>
  )
}

export default Login