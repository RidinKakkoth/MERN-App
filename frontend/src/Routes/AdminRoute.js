import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import AdminLogin from '../pages/Admin page/AdminLogin'
import AdiminDashboard from '../pages/Admin page/AdminDashboard'

function AdminRoute() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<AdminLogin/>}/>
            <Route path='/dashboard' element={<AdiminDashboard/>}/>
            <Route path='/editUser' element={<AdiminDashboard/>}/>
            <Route/>
        </Routes>
      
    </div>
  )
}

export default AdminRoute
