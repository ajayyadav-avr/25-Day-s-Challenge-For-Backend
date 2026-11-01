const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    caption : {
        type : String,
        default : "",
    },
    img_Url : {
        type : String,
        required : [true , "imgUrl is required for Creating an Post"]
    },
    user : {
        ref : "users",
        type : mongoose.Schema.Types.ObjectId,
        required : [true ,"userid is required for creating an post"]
    },
})

const postModel = mongoose.model("post", postSchema)

module.exports = postModel