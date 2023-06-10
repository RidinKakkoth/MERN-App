const express=require("express")

//controllers
const{loginUser,signupUser}=require("../controllers/userController")

const router=express.Router()

//login
router.post('/login',loginUser)

//signup
router.post('/signup',signupUser)



module.exports=router