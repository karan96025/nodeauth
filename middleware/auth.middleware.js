const jwt=require("jsonwebtoken");

const auth=async (req,res,next)=>{
    try{
        const token=req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message:"token missing"
        })
    }

    const verifyToken=jwt.verify(token,process.env.JWT_SECRET);
    console.log(" verifyToken", verifyToken)
    req.user=verifyToken;
    next();
    }catch(err){
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

const isAdmin= (req,res,next)=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({
          message:"Access Denied"
        })
    }
    next();
}

const isSubAdminorAdmin=(req,res,next)=>{
    if(req.user.role ==="subAdmin" || req.user.role === "admin"){
        return next();
    }

}

module.exports={auth,isAdmin,isSubAdminorAdmin}