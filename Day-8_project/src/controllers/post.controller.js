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

async function getPostController(req,res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "Unauthorized Access"
        })
    }

    let decoded;
    try{
       decoded = jwt.verify(token, process.env.JWT_Secrets)
    }
    catch(err){
        return res.status(401).json({
            message : "Invalid Token"
        })
    }

    const userId = decoded.id;

    const posts =await postModel.find({
        user : userId
    })

    res.status(200).json({
        message : "Posts Fetched Successfully",
        posts
    })
}

async function getPostDetailsController(req,res){
     const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "Unauthorized Access"
        })
    }

    let decoded;
    try{
       decoded = jwt.verify(token, process.env.JWT_Secrets)
    }
    catch(err){
        return res.status(401).json({
            message : "Invalid Token"
        })
    }

    const userId = decoded.id
    const postId = req.params.postId

    const post =await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message : "post Not found"
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message : "Forbidden Content"
        })
    }

    return res.status(200).json({
        message : "Posts Fetched Successfully",
        post
    })

}
module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}