
import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

connectDB()


export async function GET(request:NextRequest){

    try {

        const response =  NextResponse.json({msg:"Sign Out Sucessfully",success:true})
        
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })
        return response
        
    } catch (error:any) {
    console.log("Error from signin route", error.message)
    return NextResponse.json({msg:"Not Verifed due to some error",message:error.message,status:500})  
    }

}