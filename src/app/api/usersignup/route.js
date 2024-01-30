import { NextResponse } from "next/server";
import connectDB from "../../../database/connect"
import mongoose from "mongoose";
import User from "../../../database/models/User"
export async  function POST(request){

    try{
        if(mongoose.connection.readyState===0){
            await connectDB()

        }
        let data=await request.json()
        let user=await User.findOne({username:data.email})
        console.log(user)
        if(user){
            return NextResponse.json({ message: "user already exists" }, { status: 200 });
        }else{
            const newUser=new User({
                username:data.email,
                password:data.password
            })
            await newUser.save()
            return NextResponse.json({ message: "success" }, { status: 200 });

        }

    }catch(error){
        console.log(error)
        return NextResponse.json({ message: "internal server error" }, { status: 501 });

    }

}