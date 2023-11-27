import User from "../modle/userModule.js"
import { errorHandler } from "../utlis/errorHandler.js";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";

export const signUp = async (req,res,next)=>{
    const {userName,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({userName,email,password:hashedPassword});
    try {
        await newUser.save();
        res.status(201).json("User Created Succesfully")
    } catch (error) {
        next((errorHandler('550',error.message)))
    }
   
}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = validUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };