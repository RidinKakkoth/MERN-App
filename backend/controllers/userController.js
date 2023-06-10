const User=require('../models/userModel')
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const inputValidator = require('../middleware/inputValidator');

const createToken=(id)=>{
    return  jwt.sign({_id:id},process.env.SECRET,{expiresIn:'3d'})
}

//login user

const loginUser=async(req,res)=>{

    try {
        const{email,password}=req.body
        inputValidator.loginInputValidator(email,password)

        const user=await User.findOne({email:email})

        if(!user){
            throw Error("Invalid User credential")
        }

        const match=await bcrypt.compare(password,user.password)

        if(!match){
            throw Error("Incorrect password")
        }
        
        //create token

        const token=createToken(user._id)

        res.status(200).json({msg: 'User signed in successfully', user: token })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


//signup user

const signupUser=async(req,res)=>{
    
    try {
        const{firstname,lastname,email,password,phone}=req.body;

          inputValidator.signupInputValidator(firstname, lastname, email, password, phone);

        const exist=await User.findOne({email:email})

        if(exist){
            throw Error("Email already in use")
        }
        
        const hashPassword= await bcrypt.hash(password,10)
        const newUser=new User({
            firstname,
            lastname,
            email,
            password:hashPassword,
            phone
            
        })
        const savedUser=await newUser.save()

        // create a token
        const token=createToken(savedUser._id)

        res.json({ msg: 'User registered successfully', user: token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports={loginUser,signupUser}