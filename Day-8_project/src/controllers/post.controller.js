const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const { Folders } = require("@imagekit/nodejs/resources.js")
const jwt = require("jsonwebtoken")

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res) {
    console.log(req.body, req.file);

    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message : "Token not Provided, unauthorized access"
        })
    }

    let decoded = null

    try{
       decoded = jwt.verify(token, process.env.JWT_Secrets)
    }
    catch(err){
        return res.status(401).json({
            message : "user not authorized"
        })
    }
    

    console.log(decoded);
    
    const file = await imageKit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "Test",
        folder : "instaClonePost"
    })
    
    const post = await postModel.create({
        caption : req.body.caption,
        img_Url : file.url,
        user : decoded.id,
    })

    res.status(201).json({
        message : "Post Created Successfully",
        post
    })
    
}

module.exports = {
    createPostController
}