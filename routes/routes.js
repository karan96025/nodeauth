const express=require("express");
const {createUsers,loginUser}=require("../controllers/user.controller");
const {auth,isAdmin,isSubAdminorAdmin}=require("../middleware/auth.middleware")
const router=express.Router();


router.post("/register",createUsers)
router.post("/login",loginUser)

router.get("/dashboard",auth,isAdmin,(req,res)=>{
    res.send("Welcome to dashboard")
})

router.get("/add-Account",auth,isSubAdminorAdmin,(req,res)=>{
    res.send("Welcome to Account center")
})

module.exports=router;