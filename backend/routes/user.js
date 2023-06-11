const express=require("express")

//controllers
const{loginUser,signupUser, getProfile,editProfile}=require("../controllers/userController")

const router=express.Router()

const multer = require("multer")
const path = require('path')
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/profileImages"),function(error,success){
            if(error){
                console.log(error);
            }
        })
    },
    filename:function(req,file,cb){
        const name = Date.now()+"-"+file.originalname;
        cb(null,name,function(error,success){
            if(error){
                console.log(error);
            }
        })
    }
})
const upload = multer({storage:storage})


//login
router.post('/login',loginUser)

//signup
router.post('/signup',signupUser)

router.get('/profile',getProfile)

router.post("/editProfile",upload.single('image'),editProfile)



module.exports=router