import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from './routes/auth.route.js'
import User from "./modle/userModule.js";
dotenv.config()

try {
    setTimeout(function () {
        mongoose.connect("mongodb://0.0.0.0:27017");
    }, 60000);
} catch (error) {

}

    const app = express();

    app.use(express.json())

    app.listen(3000,()=>{
        console.log("server running on the port 3000!!");
    })

    app.use('/api/user',userRouter)
    app.use('/api/auth',authRouter)

    app.use((error,req,res,next)=>{
        const statusCode = error.code || 500
        const message = error.message || "Internal Server Error"

        return res.status(statusCode).json(
            {
                Success:false,
                statusCode,
                message,
            })
    })
