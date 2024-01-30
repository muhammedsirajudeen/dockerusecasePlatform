const express = require('express')
const router = express.Router()

const formidable = require('formidable');
const path = require('path');
const fs = require('fs-extra');
const jwt=require("jsonwebtoken")
router.get("/",(req,res)=>{
    res.json({message:"hello"})
})


router.post("/upload/html",(req,res)=>{
    //on upload we create the folder and inside the folder we place the assets then we would be able to show off the assets
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {

        const uploadedFile = files.file;
        const username=(jwt.verify(fields.token[0],"sirajudeen")).email
        const uploadpath=path.join("/home/vava/Programming/Freelance/deepuclient/backend-express/public",username)
        fs.ensureDirSync(uploadpath)
        const filePath = path.join(uploadpath, uploadedFile[0].originalFilename);
        console.log(uploadedFile[0].filepath)
        fs.rename(uploadedFile[0].filepath, filePath, (renameErr) => {
            if (renameErr) {
              console.error('Error moving file:', renameErr);
              return res.status(500).json({ error: 'Internal Server Error' });
            }
      
            res.status(200).json({ message: "success", filePath });
          });

    
        // Move the uploaded file to the desired location

      });
})






module.exports = router