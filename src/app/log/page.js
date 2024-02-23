"use client"
import Navbar from '@/components/Navbar'
import axios from "axios"
import { useEffect, useState } from 'react'
import BarChart from '@/components/BarChart'
export default function Log(){
    const [files,setFiles]=useState([])
    const [firstbar,setFirstbar]=useState({})
    const [secondbar,setSecondbar]=useState({})
    useEffect(()=>{
        async function getfileNames(){
            let response=await axios.post("http://localhost:5000/filenames",
            {
                token:window.localStorage
            })
            console.log(response.data)
            setFiles(response.data.filenames)
        }
        getfileNames()

    },[])
    async function fileUploader(){
        let logfile=document.querySelector(".logfile")
        const formData=new FormData()
        formData.append("files",logfile.files[0])
        formData.append("token",window.localStorage.getItem("token"))
        
        let response=(await axios.post("http://localhost:5000/upload",formData,
        {headers:{
            'Content-Type': 'multipart/form-data',

        }}) ).data
        console.log(response)
        window.location.reload()
    }
    async function summaryHandler(e){
        let response=(await axios.post("http://localhost:5000/summary",
        {
            filename:e.target.textContent,
            token:window.localStorage.getItem('token')
        }
        )).data
        console.log(response)
        setFirstbar({
            labels:response.threat_count_labels,
            values:response.threat_count_array
        })
        setSecondbar(
            {
                labels:response.threat_type_count_labels,
                values:response.threat_type_count_array
            }
        )

    }

    return(
        <>
            <Navbar/>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='mt-10 font-bold text-xl'>LOG  ANALYZER</h1>
                <div className=' mt-5 border border-black flex ' >
                    <p className='border border-black' >date</p>
                    <p className='border border-black' >threat type</p>
                    <p className='border border-black' >priority level</p>
                    <p className='border border-black' >threat or not</p>
                </div>
                <p className='mt-5'> make sure that the data is in these column before uploading</p>

                <input   type='file' className=' mt-5 logfile'></input> 
                <button className='mt-5 bg-black text-white rounded-lg p-2 ' onClick={fileUploader} >UPLOAD</button>
                {/* give a button here with link to that particular file and it leads to that particular space */}
                <div className=' mt-5 uploadedfiles flex flex-col items-center justify-center'>
                    <h1>PREVIOUSLY  UPLOADED LOG FILES</h1>
                    {files.map((value)=>{
                        return(
                            <p onClick={summaryHandler}  >{value}</p>
                        )
                    })}
                </div>
                    {/* summary container */}
                <div className='border border-black'>

                    <BarChart data={firstbar}/>
                    <BarChart data={secondbar}/>
                </div>


            </div>
        </>
    )
}