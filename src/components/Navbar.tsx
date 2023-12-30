"use client"
export default function Navbar(){
    function authenticationHandler(){
        console.log("handle authentication here")
    }
    return(
        <div className="flex w-full items-center justify-evenly mt-1 ">
            <a href="/shell">Shell access</a>
            <a href="/">Home</a>
            <a href="/">Home</a>
            <a href="/">Home</a>
            <button  onClick={authenticationHandler} className="bg-black text-white rounded-lg text-xs p-1 ">signout</button>
        </div>
    )
}