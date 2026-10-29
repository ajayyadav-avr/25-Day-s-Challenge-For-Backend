const express = require("express");
const app = express();

const notesModel = require("./models/notes.model")

app.use(express.json())

app.post("/notes",async(req,res)=>{
    const{title, description}= req.body

    const note = await notesModel.create({
        title , description
    })
    res.status(201).json({
        message : "Notes Created Successfully",note
    })
})

module.exports = app;