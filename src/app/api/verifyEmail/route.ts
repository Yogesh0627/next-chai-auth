import User from "@/models/userModel";
import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

connectDB()


export async function POST(request:NextRequest){
    try {
    const body = await request.json()
    // console.log("body, from verify",body)
    const {token} = body
    console.log(token)

    const ifUser = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})

    if (!ifUser){
        return NextResponse.json({msg:"Invalid Token"},{status:400})
    }
    else if (ifUser.isVerified){
        return NextResponse.json({msg:"Already Verified",success:true},{status:200})
    }
    else{
        console.log(ifUser)
        ifUser.isVerified = true
        ifUser.verifyToken = undefined
        ifUser.verifyTokenExpiry = undefined
        console.log(ifUser)
        await ifUser.save()
        return NextResponse.json({msg:"Verified successfully",success:true},{status:200})
    }
} catch (error:any) {
    console.log("Error from verifyEmail route", error.message)
    return NextResponse.json({msg:"Not Verifed due to some error",message:error.message,status:500})    
}
}