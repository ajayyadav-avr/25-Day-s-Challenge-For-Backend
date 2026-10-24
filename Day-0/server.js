/*
1. npm init -y
2. npm express
3. npx nodemon index.js
*/

const express = require("express");
const app = express(); 

app.get('/',(req,res)=>{
    res.send("Hello User, Server is working!")
})



app.listen(3000,()=>{
    console.log("Server running on port 3000");
})
