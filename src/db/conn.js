const mongoose=require("mongoose");

mongoose.connect("process.env.MONGO_URI ||mongodb://localhost:27017/students-api")
.then(()=>console.log("connection sucessful"))
.catch((err)=>console.log(err));
