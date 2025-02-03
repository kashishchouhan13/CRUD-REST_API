const mongoose=require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL||"mongodb+srv://kashish:kashish13@cluster.ids5y.mongodb.net/students-api?retryWrites=true&w=majority&appName=Cluster" )
.then(()=>console.log("connection sucessful"))
.catch((err)=>console.log(err));
