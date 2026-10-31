const mongoose = require("mongoose");

function connectToDB(){
    mongoose.connect(process.env.Mongose_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
}

module.exports = connectToDB