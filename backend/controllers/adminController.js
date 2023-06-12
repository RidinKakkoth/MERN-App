const inputValidator=require("../middleware/inputValidator")
const Admin=require("../models/adminModel")
const User=require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const createToken=(id)=>{
    console.log(id);
    return  jwt.sign({id:id},"secretCodeforAdmin",{expiresIn:'3d'})
}


const adminSignin=async(req,res)=>{
    
   
    
    try {

        let adminLogin={
            status: false,
            token: null,
            name:null
        }

        const{email,password}=req.body
       
      const inputError=  inputValidator.loginInputValidator(email,password)
      
      if(inputError){
        return res.status(400).json({ error: inputError });
      }

        const admin=await Admin.findOne({email:email})
        
        if(!admin){
            
            return res.status(400).json({ error: "Invalid credentials" });
        }
        
        const match=await bcrypt.compare(password,admin.password)
       

        if(!match){
            
            return res.status(400).json({ error: "Incorrect password" });
        }
        
        //create token
        let token = createToken(admin._id);
        adminLogin.token = token;
        adminLogin.status = true;
        adminLogin.name = admin.email; // Change property name from "AdminName" to "name"
        
        

        let obj = {
          token
        };
        
        res.cookie("adminCookie", obj, {
          httpOnly: false, 
          maxAge: 6000 * 1000,
          secure:false
        })
          .status(200)
          .send({ adminLogin });
        



        // res.status(200).json({msg: 'Admin signed in successfully', userLogin })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const userData=async(req,res)=>{

    try {
        // const jwtToken=req.cookies.jwt.token
        // const decodeToken=jwt.verify(jwtToken,"secretCodeforAdmin")    
        // const adminId=decodeToken.id
            //no need to decode admin id , need all userdata
        const jwtToken = jwt.verify(req.cookies.adminCookie.token, "secretCodeforAdmin"); 
       

        if(jwtToken){
                User.find().then((data)=>{
                    res.send({data})
                }).catch((error)=>{
                    res.status(500).send({ error: error.message });
                })
        }
    } catch (error) {
        res.status(401).send({ error: "Unauthorized" });
    }

}

const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const jwtToken = jwt.verify(req.cookies.adminCookie.token, "secretCodeforAdmin");
  
      if (jwtToken) {
        await User.deleteOne({ _id: userId });
        console.log("deleted");
        res.sendStatus(200);
      } else {
        res.sendStatus(401); // Unauthorized
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500); // Internal Server Error
    }
  };
  

const editUser=async(req,res)=>{

    const jwtToken=jwt.verify(req.cookies.adminCookie.token,"secretCodeforAdmin")

    if(jwtToken){

        let edited=false

        const { userId, editedFname, editedLname, editedEmail, editedPhone } = req.body;


        const user=await User.findById(userId)


        if(user){
            User.updateOne({_id:userId},
                {
                    $set:{
                        firstname:editedFname,
                        lastname:editedLname,
                        phone:editedPhone,
                        email:editedEmail
                    }
                }
                ).then(()=>{
                    edited=true
                    res.status(200).send(edited)
                })
             
        }

    }

}   


module.exports={
    adminSignin,userData,deleteUser,editUser
}