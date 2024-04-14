import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { stringifyError } from "next/dist/shared/lib/utils";


const userSchema = new mongoose.Schema({
    username:{type:String,
            required:[true,`Please Provide Username`],
            unique:[true, `This username is already exist please choose another one`]
    },
    email:{type:String,
        require:[true, `please provide an email`],
        unique:[true, `Email already exist please provide another email`]
    },
    password:{
        type:String,
        required:[true, `please provide password`]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date

})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User
