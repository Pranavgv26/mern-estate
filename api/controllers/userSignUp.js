import User from "../modle/userModule.js"
import { errorHandler } from "../utlis/errorHandler.js";

export const signup = async (req,res,next)=>{
    const {userName,emailId,password} = req.body;
    const newUser = new User({userName,emailId,password});
    try {
        await newUser.save();
        res.status(201).json("User Created Succesfully")
    } catch (error) {
        next((errorHandler('550',error.message)))
    }
   
}