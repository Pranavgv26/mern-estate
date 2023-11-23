import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
dotenv.config()

mongoose

.connect(process.env.MONGO)
.then(()=>{
    console.log("Conected Succesfuly");
})
.catch((error)=>{
    console.log("connection error",error);
})

const app = express();

app.listen(3000,()=>{
    console.log("server running on the port 3000!!");
})

app.use('/api/user',userRouter)
