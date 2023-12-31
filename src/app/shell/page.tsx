"use client"
import { useEffect, useRef, useState } from "react"
import "./page.module.css"
import axios from "axios"
import Navbar from "@/components/Navbar"
export default function Shell(){
    const [command,setCommand]=useState("")
    const [result,setResult]=useState("")
    const executable=useRef("")
    
    const clicked=useRef(true)
    useEffect(()=>{
 
        async function getPwd(){
            let response=(await axios.get("/api/shell/getpwd")).data
            setCommand(response.message.replace("\n","|"))
        }
        if(clicked.current){

            getPwd()
    
            window.addEventListener("keyup",async (e)=>{
                if(e.key==="Enter"){
                    //if enter key is pressed we send the command back to the server execute and return
                    let command=localStorage.getItem("command")
                    console.log(command)
                    let response=(await axios.post("/api/shell/getstdout",
                    {
                        command:command,
                        //further user details here
                    }
                    )).data
                    console.log(response.message)
                    setResult(response.message)
                }
            })
    
        }
        clicked.current=false

    },[])
    return(
        <div className="main  flex flex-col items-center justify-center  mb-10">
            <Navbar/>
            <textarea className="shellcontainer text-xs rounded-lg bg-black text-white w-96 h-60" value={command} onChange={(e)=>{
                setCommand(e.target.value)
                
                executable.current=e.target.value.split("|")[1]
                
                localStorage.setItem("command",executable.current)
            }} ></textarea>
            <div className="bg-black text-white w-96 h-60 mt-10">{result}</div>
        </div>
    )
}