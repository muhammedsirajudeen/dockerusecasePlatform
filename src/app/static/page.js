"use client";
import Navbar from "@/components/Navbar";
import axios from "axios"
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
export default function StaticHosting(){
    const [visible,setVisible]=useState(true)
    const [username,setUsername]=useState("")
    useEffect(()=>{
        setUsername(jwtDecode(localStorage.getItem("token")))
    },[])
    async function uploadHandler(){

        //here we handle the uploads and upload it to the express backend server 

        let htmlfile=document.querySelector("#html")
        let file=htmlfile.files[0]
        const formData=new FormData()
        formData.append('file',file)
        let token=window.localStorage.getItem("token")
        formData.append('token',token)
        let response=(await axios.post("http://localhost:4000/static/upload/html",formData,
        {headers:{
            'Content-Type': 'multipart/form-data',

        }}) ).data
        console.log(response)
        if(response.message==="success"){
            alert("first part completed")
            //add animation or something else here
        }else{
            alert("first part denied please resubmit")
            return 
        }

        let cssfile=document.querySelector("#css")
        const cssData=new FormData()
        cssData.append('file',cssfile.files[0])
        cssData.append('token',token)


        response=(await axios.post("http://localhost:4000/static/upload/html",cssData,
        {headers:{
            'Content-Type': 'multipart/form-data',

        }}) ).data

        if(response.message==="success"){
            alert("second part completed")
        }else{
            alert("second part denied please resubmit the files")
            return 
        }

        let jsfile=document.querySelector("#js")
        const jsData=new FormData()
        jsData.append('file',jsfile.files[0])
        jsData.append('token',token)


        response=(await axios.post("http://localhost:4000/static/upload/html",jsData,
        {headers:{
            'Content-Type': 'multipart/form-data',

        }}) ).data

        if(response.message==="success"){
            alert("third part completed")
            setVisible(true)
        }else{
            alert("third part denied please resubmit the files")
            return 
        }


        
    }
    return(
        <div className="flex flex-col justify-center items-center w-full">
            <Navbar/>
            <p className="font-bold mt-10">Upload your static Contents here </p>
            <p className="text-xs">one website per username</p>
            {/*
                upload files here
                first upload html then upload css then create an account there and just 
                create a folder in the username put it in express and it will be publicly accessible 
            */}
            <h1 className="mt-10 font-bold "  >HTML FILE</h1>
            <input type="file" id="html" ></input>

            <h1 className="mt-10 font-bold "  >CSS FILE</h1>
            <input type="file" id="css" ></input>

            <h1 className="mt-10 font-bold "  >JS FILE</h1>
            <input type="file" id="js" ></input>

            <button className="bg-black text-white rounded-lg mt-10 text-xs p-3" onClick={uploadHandler}  > UPLOAD</button>
            {visible ?  
            <>
                <h1>your website can be found here</h1>

                <a href={`http://localhost:4000/${username.email}/index.html`}>{`http://localhost:4000/${username.email}/index.html`}</a>
            </>
            :<></>}
        </div>
    )
}