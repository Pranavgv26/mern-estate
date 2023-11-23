import mongoose from "mongoose";


const userScheme =  new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,        
    }
},{timestamps:true});

const User = mongoose.model('User',userScheme)

export default User;