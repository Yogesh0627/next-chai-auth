import User from "@/models/userModel";
import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
connectDB()


export async function POST(request:NextRequest){

    // check input validation
    // check user existance with email
    try {

        const body = await request.json()
        console.log(body);
        const {username,email,password}=body

        const ifExist = await User.findOne({email})
        if (!ifExist){
            return NextResponse.json({msg:"User not exist"},{status:400})
        }

        const validPassword = await bcryptjs.compare(password,ifExist.password)

        if(!validPassword){
            return NextResponse.json({msg:"Wrong Password",statua:202,success:false})
        }

        const token = jwt.sign({id:ifExist._id,username,email},process.env.JWT_SECRET!,{expiresIn:"1d"})
        
        const response =  NextResponse.json({msg:"Sign in Sucessfully",success:true,token})
        
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response
        
    } catch (error:any) {
    console.log("Error from signin route", error.message)
    return NextResponse.json({msg:"Not Verifed due to some error",message:error.message,status:500})  
    }

}