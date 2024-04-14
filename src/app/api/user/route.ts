import User from '@/models/userModel';
import  jwt  from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";



export async function GET(request:NextRequest){
    try {
        const token = request.cookies.get("token")?.value || ""
        
        const decodedValue:any = jwt.verify(token,process.env.JWT_SECRET!)

        const id = decodedValue.id
        const user = await User.findById(id).select("-password")
        if(!user){
            return NextResponse.json({msg:"Invalid token"}) 
        }
        return NextResponse.json({msg:"User found",success:true,user})
    } catch (error:any) {
        console.log("Error from user route.ts", error.message)
        return NextResponse.json({msg:"Something went wrong"})
    }

}