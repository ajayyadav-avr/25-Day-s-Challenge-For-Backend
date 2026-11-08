const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "Username is Required"],
        unique : [true, "Username must be Required"]
    },
    email :{
        type : String,
        required : [true, "Email is Required"],
        unique : [true, "Email must be Required"]
    },
    password : {
        type : String,

    }
})

// userSchema.pre("Save",function (next) { })
// userSchema.post("Save",function (next) { })

const userModel = mongoose.model("users",userSchema)

module.exports = userModel;