const mongoose=require("mongoose");
require("dotenv").config();
const mongoUrl=process.env.MONGODB_URI;

const connectDb=async ()=>{
    try{
        await mongoose.connect(mongoUrl)
        console.log("mongodb connected successfully")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

module.exports=connectDb;