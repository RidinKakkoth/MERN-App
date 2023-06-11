import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import AdminLogin from '../pages/Admin page/AdminLogin'
import AdiminDashboard from '../pages/Admin page/AdminDashboard'
import EditUserData from '../pages/Admin page/EditUserData'

function AdminRoute() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<AdminLogin/>}/>
            <Route path='/dashboard' element={<AdiminDashboard/>}/>
            <Route path='/editUser' element={<EditUserData/>}/>
            <Route/>
        </Routes>
      
    </div>
  )
}

export default AdminRoute
