const express= require("express");
const Student=require("../models/students");

//1. craete a router 
const router=new express.Router();

//2. define a router

//create a new student using promises
// app.post("/students",(req,res)=>{
//   const user = new Student(req.body);
//   user.save().then(()=>{
//     res.status(201).send(user);
//   })
//   .catch((e)=>{
//     // res.status(400).send(e);
//     console.log("Error:", e.message);
//     res.status(400).send({ error: e.message });
//   })
// })


//create document using async and awit
router.post("/students",async(req,res)=>{
    try{
        const user=new Student(req.body);
        const createUser=await user.save();
        res.status(201).send(createUser);
    }catch(e){res.status(400).send(e);}
        
    
})

//get or read the data of registered students
router.get("/students",async(req,res)=>{
    try{
        const studentsData = await Student.find();
        res.status(201).send(studentsData);
    }catch(e){
        res.status(400).send(e);
    }
     
})

//get the individual student data using id
router.get("/students/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
       const studentData = await Student.findById(_id);
        if(!studentData){
            res.status(400).send();
        }else{
            res.status(201).send(studentData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})

//update a document using id
router.patch("/students/:id",async(req,res)=>{
    try{
        const _id= req.params.id
       const updateStudents=await Student.findByIdAndUpdate( _id, req.body,{
            new:true
        });
        res.send(updateStudents);
    }catch(e){
        res.status(400).send(e);
    }
})

//delete a document using id
router.delete("/students/:id",async(req,res)=>{
    try{
        const deleteStudent=await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
           return  res.status(400).send();
        }
        res.send(deleteStudent);
    }catch(e){
           res.status(500).send(e);
    }
})


//3. register our router on app.js
module.exports=router;