import { NextResponse } from "next/server";
import connectDB from "../../../database/connect"
import mongoose from "mongoose";
import User from "../../../database/models/User"
const {sign,verify}=require("jsonwebtoken")

export async  function POST(request){

    try{
        if(mongoose.connection.readyState===0){
            await connectDB()

        }
        let data=await request.json()
        let user=await User.findOne({username:data.email})

        console.log(user)
        if(user.username===data.email && user.password===data.password){
            const token=sign(data,"sirajudeen")

            return NextResponse.json({ message: "success",token:token }, { status: 200 });

        }else{
            return NextResponse.json({ message: "invalid credentials" }, { status: 200 });

        }


    }catch(error){
        console.log(error)
        return NextResponse.json({ message: "internal server error" }, { status: 501 });

    }

}