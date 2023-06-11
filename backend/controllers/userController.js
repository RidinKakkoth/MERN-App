const User=require('../models/userModel')
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const inputValidator = require('../middleware/inputValidator');

const createToken=(id)=>{
    console.log(id,"iiiiiiiiiiiiiiiii");
    return  jwt.sign({id:id},"secretCodeforUser",{expiresIn:'3d'})
}

//login user

const loginUser=async(req,res)=>{

    try {

        let userLogin={
            status: false,
            token: null,
            name: null,
        }

        const{email,password}=req.body
       
      const inputError=  inputValidator.loginInputValidator(email,password)
      
      if(inputError){
        return res.status(400).json({ error: inputError });
      }

        const user=await User.findOne({email:email})

        if(!user){
            
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const match=await bcrypt.compare(password,user.password)

        if(!match){
            
            return res.status(400).json({ error: "Incorrect password" });
        }
        
        //create token
        let token = createToken(user._id);
        userLogin.token = token;
        userLogin.status = true;
        let userName = user.firstname + " " + user.lastname;
        userLogin.name = userName; // Change property name from "userName" to "name"
        
        

        let obj = {
          token,
          userName
        };
        
        res.cookie("jwt", obj, {
          httpOnly: true,
          maxAge: 6000 * 1000,
          secure:false
        })
          .status(200)
          .send({ userLogin });
        



        // res.status(200).json({msg: 'User signed in successfully', userLogin })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


//signup user

const signupUser=async(req,res)=>{
    
    try {
        const{firstname,lastname,email,password,phone}=req.body;

         const inputError= inputValidator.signupInputValidator(firstname, lastname, email, password, phone);
         if(inputError){
            return res.status(400).json({ error: inputError });

         }

        const exist=await User.findOne({email:email})

        if(exist){
            
            return res.status(400).json({ error: "Email already in use" });
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


const getProfile=async(req,res)=>{
    try {
    
        
        if (!req.cookies || !req.cookies.jwt) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        
   
        const jwtToken = req.cookies.jwt.token; // Assuming your token is stored as { token: "..." }
        
        const decodedToken = jwt.verify(jwtToken,"secretCodeforUser");
      
        const userId = decodedToken.id; // Assuming your token payload has the user ID stored as _id
       
      
        try {
          const user = await User.findById(userId);
     
      
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
      
          return res.status(200).json({ user });
        } catch (error) {
          return res.status(500).json({ error: "Database error" });
        }
      } catch (error) {
        return res.status(403).json({ error: "Token verification failed" });
      }
      
}

const editProfile= async(req,res)=>{
    try {
        
       const jwtToken = req.cookies.jwt.token;
       const decode=jwt.verify(jwtToken,"secretCodeforUser")
       console.log(decode);
        if(!decode.id){
            throw new Error("Invalid Token")
        }
        const userData = await User.findOne({_id:decode.id})

        if(!userData){
            throw new Error("User not found")
        }
        if(req.file&&req.file.path){
            userData.image=req.file.filename;
            console.log(userData);
            const url =req.file.path;
            await userData.save()
            console.log("success")
            res.status(200).send({success:true,url})
        }else{
            throw new Error("No image is there")
        }
        
    } catch (error) {
        res.status(500).json({error:'Internal server error'});
    }
  }



module.exports={loginUser,signupUser,getProfile,editProfile}