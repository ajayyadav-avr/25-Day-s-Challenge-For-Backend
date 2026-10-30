const mongoose = require("mongoose");

function connectToDB(){
    mongoose.connect(process.env.mongose_Uri)
    .then(()=>{
        console.log("Connected to db");
    })
}

module.exports = connectToDB