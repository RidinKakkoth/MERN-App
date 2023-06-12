import React, { useEffect } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import AdminLogin from '../pages/Admin page/AdminLogin'
import AdiminDashboard from '../pages/Admin page/AdminDashboard'
import EditUserData from '../pages/Admin page/EditUserData'
import { useDispatch ,useSelector} from 'react-redux'
// import { adminActions } from '../store/AdminAuth'
import { useCookies } from 'react-cookie'
import { adminAdd } from '../store/AdminAuth'

function AdminRoute() {

const[cookies]=useCookies(['jwt'])
const dispatch=useDispatch()

useEffect(()=>{

  if(Object.keys(cookies).length>0){
  dispatch(adminAdd({token:cookies?.jwt.token}))
  }
})

let Admin = useSelector(state=> state.Admin.adminToken)


  return (
    <div>
        <Routes>
            <Route path='/' element={Admin?<AdiminDashboard/>:<AdminLogin/>}/>
            <Route path='/dashboard' element={Admin?<AdiminDashboard/>:<AdminLogin/>}/>
            <Route path='/editUser' element={Admin?<EditUserData/>:<AdminLogin/>}/>
            <Route/>
        </Routes>
      
    </div>
  )
}

export default AdminRoute
