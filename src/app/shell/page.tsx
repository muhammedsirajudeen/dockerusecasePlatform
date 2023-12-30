"use client"
import { useEffect, useRef, useState } from "react"
import "./page.module.css"
import axios from "axios"
export default function Shell(){
    const [command,setCommand]=useState("")
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
                    console.log(response)
                }
            })
    
        }
        clicked.current=false

    },[])
    return(
        <div className="main  flex items-center justify-center   m-10">
            <textarea className="shellcontainer text-xs rounded-lg bg-black text-white w-96 h-96" value={command} onChange={(e)=>{
                setCommand(e.target.value)
                
                executable.current=e.target.value.split("|")[1]
                
                localStorage.setItem("command",executable.current)
            }} ></textarea>
        </div>
    )
}