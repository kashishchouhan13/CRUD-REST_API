const express=require("express");      //  npm run dev
const path = require("path");
require("./db/conn") ;     
const Student=require("./models/students");
const studentRouter=require("./routers/student");

const app=express();
const port= process.env.PORT|| 4000;

app.use(express.json());//express.json is a method inbuild in express to recognise the incoming 
//Request Object as a JSON Object. This method is called middleware
app.use(studentRouter);

app.use(express.static(path.join(__dirname, "../")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

app.listen(port,()=>{
    console.log(`server running on ${port}`);
})

