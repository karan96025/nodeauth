const user=require("./../models/Users")
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
require("dotenv").config();

const jwtSecret=process.env.JWT_SECRET
const createUsers=async (req,res)=>{
try{
const {name,email,password,role}=req.body;
console.log("password is",password)
const hashedPassword=await bcrypt.hash(password,10)
const newUser=new user({
    name,
    email,
    password:hashedPassword,
    role
})
    await newUser.save();
   
    const token=jwt.sign({id:newUser._id,email:newUser.email,role:newUser.role},jwtSecret,{expiresIn:"7d"})

    res.status(200).json({
        message:"User created successfully",
        token
    })
    }catch(error){
        console.error("Register error:", error.message)
        res.status(500).json({
            message:"Internal server error"
        })
    }
}


const loginUser=async(req,res)=>{
 try{
     const {email,password}=req.body;
     console.log("password is",password)
    const foundUser=await user.findOne({email});
    if(!foundUser){
        return res.status(400).json({
            message:"User not found",
        })
    }

    const isMatch=await bcrypt.compare(password,foundUser.password);
    if(!isMatch){
         return res.status(400).json({
            message:"Invalid credentials",
        })
    }

    const token=jwt.sign({id:foundUser._id,email:foundUser.email,role:foundUser.role},jwtSecret,{expiresIn:"7d"});

    res.status(200).json({
        message:"Login successfully",
        token
    })
 }catch(err){
    console.log(err)
    res.status(500).json({
        message:"Internal server error"
    })
 }
}

module.exports={createUsers,loginUser}