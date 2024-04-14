import mongoose from "mongoose";


export const connectDB = async ()=>{
    try {
        const result = await mongoose.connect(process.env.MONGOOSE_URI!)
        // console.log(result, ` result after making connect request`)
        // console.log(result.connections, " logging connection")
        // console.log(result.connections[0].readyState, " logging connections")
        const connection = mongoose.connection

        connection.on('connection',(a)=>{
            console.log(`Mongodb Connected`,a)
        })
        connection.on("error",(err:any)=>{
            console.log("DB not connected ", err)
            process.exit()
        })
    } catch (error) {
        console.log(`Something went wrong while connecting to DB`)
        console.log(error, ` from utils/db.ts`)
    }
}