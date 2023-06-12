const express=require("express")

const router=express.Router()

const{adminSignin,userData,editUser,deleteUser}=require('../controllers/adminController')


router.post("/login",adminSignin)

router.get("/userdata",userData)

router.get("/deleteuser/:id",deleteUser)

router.post("/edituser",editUser)

module.exports=router