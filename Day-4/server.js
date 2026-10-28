/*
- Server ko Start krna
- database se connect krna
*/ 
const app = require("./src/app");
const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://ajay:zFXTeVtjQlSuVCiR@cluster0.yo05liu.mongodb.net/Day-4")
    .then(()=>{
        console.log("Connected To Database");
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})