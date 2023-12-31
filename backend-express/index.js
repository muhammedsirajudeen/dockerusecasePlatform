const express=require("express")
const cors=require("cors")

//globals
const PORT=4000
const app=express()

//routes
const static=require("./static/upload")


app.use(express.static('public'))
app.use(express.json())

app.use('/static',static)

app.listen(PORT,()=>console.log("server started at port "+PORT))


