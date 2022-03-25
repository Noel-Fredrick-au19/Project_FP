
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Employee = mongoose.model("Employee")
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requirelogin')



router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
    if(!email || !password || !name){
       return res.status(422).json({error:"Please add all the fields"})
    }
    Employee.findOne({email:email})
    .then((savedEmployee)=>{
        if(savedEmployee){
            return res.status(422).json({error:"Employee already exits"})
        }

        // using bcrypt
        bcrypt.hash(password,12)
        .then(hashedpassword=>{

            const employee = new Employee({
                email:email,
                password:hashedpassword,
                name:name
            })
    
            employee.save()
            .then(employee=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })

        })

        
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/login',(req,res)=>{
    const{email,password} = req.body
    if(!email || !password){
        res.status(422).json({error:"please add email or password"})
    }
    Employee.findOne({email:email})
    .then(savedEmployee=>{
        if(!savedEmployee){
            return res.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password,savedEmployee.password)
        .then(doMatch =>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
                // using JWT Token for verification
                const token = jwt.sign({_id:savedEmployee._id},JWT_SECRET)
                const {id,name,email} = savedEmployee
                res.json({token,employee:{id,name,email}})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})




// router.post('/cloudinary',upload.single('profile_pic'),async(req,res,next)=>{

//     let localpath=req.file.path.replace(/\\/g,"/")
//     let result=await uploadToCoudinary(localpath)
//     res.send("File uploaded successfully")
//     })
    


module.exports = router