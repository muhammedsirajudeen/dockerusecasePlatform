"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"
export default function Signin(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmpassword]=useState("")

   
    
    async function googlesigninHandler(){
        let user=await signIn("google")
        alert(user)
        

    }
    async function passwordHandler(){
  
            let response=await axios.post("/api/usersignin",{
                email:email,
                password:password
            })
           if(response.data.message!=="success"){
            setEmail("")
            setPassword("")
            alert(response.data.message)
            

           }
           else if(response.data.message==="success"){
            window.localStorage.setItem("token",response.data.token)

            //also obtain token and save it here
            window.location="/"
           }

    }

    function signout(){
        signOut()
    }
    function emailHandler(e){
        setEmail(e.target.value)
    }
    function passHandler(e){
        setPassword(e.target.value)
    }

    return(
        <div className="flex flex-col items-center justify-center mt-20  " >
            <div className="flex flex-col items-center justify-evenly h-72 "  >
                <input type="email" className="border border-black"  placeholder="email" onChange={emailHandler} value={email} ></input>
                <input type="password" className="border border-black"  placeholder="password" onChange={passHandler} value={password} ></input>
                <button onClick={passwordHandler}  >signup</button>
            
            </div>

        </div>
    )
}