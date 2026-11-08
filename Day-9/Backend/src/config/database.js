const mongoose = require("mongoose")

mongoose.set('strictQuery', false); 

function connectToDB(){
    mongoose.connect(process.env.Mongose_URI).then(()=>{
        console.log("Connected to MongoDB");
    }).catch(err => console.error(err));
}

module.exports = connectToDB