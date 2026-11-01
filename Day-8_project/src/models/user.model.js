const moongose = require("mongoose");

const userSchema = new moongose.Schema({
    userName : {
        type : String,
        unique : [true, "UserName Alright Exists"],
        required : [true, "UserName is Required" ]
    },
    email : {
        type : String,
        unique : [true, "Email Alright Exists"],
        required : [true, "Email is Required" ]
    },
    password : {
        type : String,
        required : [true, "Password is Required"]
    },
    bio : String,
    profile_image : {
        type : String,
        default : "https://ik.imagekit.io/rdghcfvsf/85038f5657b515dae2f4f9f44c177500.jpg"
    }
})

const userModel = moongose.model("user", userSchema)

module.exports = userModel