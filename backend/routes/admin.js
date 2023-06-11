const express=require("express")

const router=express.Router()

const{adminLogin,userData,editUser,deleteUser}=require('../controllers/adminController')


router.post("/login",adminLogin)

router.get("/userdata",userData)

router.get("/deleteuser/:id",deleteUser)

router.post("/edituser",editUser)

module.exports=router