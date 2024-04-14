import User from "@/models/userModel";
import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";
connectDB()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const{username,email,password} = reqBody
        const ifExist = await User.findOne({email})
        if(ifExist){
            return NextResponse.json({msg:"User elaready exist"},{status:403})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        const newUser:any = await User.create({username,email,password:hashedPassword});
        console.log("New user from signup route post req", newUser)

        // send email for verification

        await sendEmail({email,emailType:"VERIFY",userId:newUser._id})
        
        return NextResponse.json({message:"User Signup Succesfully",success:true,newUser})
    } catch (error:any) {
        return NextResponse.json({msg:error.message,status:500})
    }
}

export function GET (request:NextRequest){
return NextResponse.json({msg:"Signup wprking fine"})
}