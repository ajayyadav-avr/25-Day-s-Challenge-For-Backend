const mongoose = require("mongoose");

function connecttodb(){
    mongoose.connect(process.env.Mongose_URI).then(()=>{
        console.log("Connected To MongoDB");
    })
}

module.exports = connecttodb;