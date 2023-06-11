import React, { useRef, useState } from 'react'
import './EditUser.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { adminApi } from '../../../store/Api'




function EditUser() {
    
    const location=useLocation()
    const navigate=useNavigate()

const [error,setError]=useState('')
const editFname=useRef()
const editLname=useRef()
const editPhone=useRef()
const editEmail=useRef()

const userId=location.state?._id
const firstname=location.state?.firstname
const lastname=location.state?.lastname
const phone=location.state?.phone
const email=location.state?.email





const handleSubmit=()=>{

    const editedFname=editFname.current.value
    const editedLname=editLname.current.value
    const editedPhone=editPhone.current.value
    const editedEmail=editEmail.current.value

    if(editedEmail!==""&&editedFname!==""&&editedLname!==""&&editedPhone!==""){

            axios.post(`${adminApi}edituser`,{userId,editedFname,editedLname,editedEmail,editedPhone},
            {withCredentials:true}).then((response)=>{

                if(response.data){
                    navigate('/admin/dashboard')
                }else{
                    setError(response.error.message)
                }
            }).catch(error=>console.log(error.message))
    }


}

  return (
<div className='edit-body'>

<div className="edit-card">
  <h1 className='user-edit-h1'>Edit Userdata</h1>
    <div className="form-group-edit">
      <label className='edit-label' >First Name</label>
      <input type="text" id="firstName"
       ref={editFname} required
       defaultValue={firstname}
      name="firstName" className="form-edit" />
    </div>
    <div className="form-group-edit">
      <label className='edit-label' >Last Name</label>
      <input type="text" id="lastName" 
        ref={editLname} required
        defaultValue={lastname}
        name="lastName" className="form-edit" />
    </div>
    <div className="form-group-edit">
      <label className='edit-label'>Email</label>
      <input type="email" id="email" required
        ref={editEmail}
        defaultValue={email}
    name="email" className="form-edit" />
    </div>
    <div className="form-group-edit">
      <label className='edit-label'>Phone</label>
      <input type="number" id="phone" required
        ref={editPhone}
        defaultValue={phone} 
       name="phone" className="form-edit" />
    </div>
    <div className='btn-div-edit'>
    <button onClick={handleSubmit} className="btn-primary-edit">Update</button>
    </div>



  <p>{error}</p>
</div>
</div>
  )
}

export default EditUser
