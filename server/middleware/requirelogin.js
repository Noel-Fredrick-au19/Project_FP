const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require ('../keys')
const mongoose = require ('mongoose')
const Employee = mongoose.model("Employee")

module.exports = (req,res,next)=>{
    const{authorization} = req.headers
    // authorization === Bearer +Token
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }

    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
           return res.status(401).json({error: "you must be logged in"})
        }

        const {_id} = payload
        Employee.findOne(_id).then(employeedata=>{
            req.employee = employeedata
        })
        next()
    })

}