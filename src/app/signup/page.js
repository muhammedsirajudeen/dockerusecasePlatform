"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"
export default function Login(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmpassword]=useState("")

   
    
    async function googlesigninHandler(){
        let user=await signIn("google")
        alert(user)
        

    }
    async function passwordHandler(){
        if(password===confirmpassword){
            let response=await axios.post("/api/usersignup",{
                email:email,
                password:password
            })
           if(response.data.message!=="success"){
            setEmail("")
            setPassword("")
            alert(response.data.message)
            

           }
           else if(response.data.message==="success"){
            window.location="/signin"
           }
        }
        else{
            alert("password isnt same")
        }
    }
    function confirmpassHandler(e){
        setConfirmpassword(e.target.value)
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
<div className="flex flex-col items-center justify-center mt-20 ">
    <h1 className="font-bold" >DOCKER USE CASE PLATFORM</h1>
  <div className="flex flex-col items-center justify-evenly h-72">
    <input 
      type="email" 
      className="border border-black px-4 py-2 mb-4 rounded-md"  
      placeholder="Email" 
      onChange={emailHandler} 
      value={email} 
    />
    <input 
      type="password" 
      className="border border-black px-4 py-2 mb-4 rounded-md"  
      placeholder="Password" 
      onChange={passHandler} 
      value={password} 
    />
    <input 
      type="password" 
      className="border border-black px-4 py-2 mb-4 rounded-md" 
      placeholder="Confirm Password" 
      onChange={confirmpassHandler} 
      value={confirmpassword} 
    />
    <button 
      onClick={passwordHandler}  
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Signup
    </button>
  </div>
</div>

    )
}