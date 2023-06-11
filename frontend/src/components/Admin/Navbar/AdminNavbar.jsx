import React from 'react'
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { adminActions } from '../../../store/AdminAuth';
import { BiLogOut } from 'react-icons/bi';

import './AdminNavbar.css'
import { useNavigate } from 'react-router-dom'

function AdminNavbar() {
    const navigate=useNavigate()

    const dispatch=useDispatch()
    const [cookie,setCookie,removeCookie]=useCookies(['jwt'])

    const adminLogout=()=>{
            removeCookie('jwt')
            dispatch(adminActions.adminLogout())
            navigate('/admin')
    }


  return (
    <div>
         <div className='navbar-admin'>
            <span className='dashboard' onClick={()=>{navigate('/admin/dashboard')}}>Dasboard</span>
             <div className='nav-right-admin'>
                  <span className='admin-logout' onClick={adminLogout}>{<BiLogOut/>} Logout</span>
             </div>
      </div>
    </div>
  )
}

export default AdminNavbar
