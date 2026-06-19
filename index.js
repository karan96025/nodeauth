const express=require("express");
const app=express();
const dbConnection=require("./config/dbconnection")
const userRoutes=require("./routes/routes")
require("dotenv").config();

app.use(express.json());
app.use("/api/users",userRoutes);


dbConnection();

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})