const mongoose = require ("mongoose");                 // to run this in terminal ( node src/app.js)
const validator=require("validator");

const studentSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email id already present"],
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("Invalid email");
            }
        }
    },
    phone:{
        type:Number,
        min:10,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    }
})

//we create a new collection
const Student=new mongoose.model("Student",studentSchema);

module.exports=Student;