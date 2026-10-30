const express = require("express");
const app = express();

const notesModel = require("./models/notes.model");

app.use(express.json())

app.post("/api/notes",async(req,res)=>{
    const{title, description}= req.body

    const note = await notesModel.create({
        title , description
    })
    res.status(201).json({
        message : "Notes Created Successfully",note
    })
})

app.get("/api/notes",async(req,res)=>{
    const note = await notesModel.find()

    res.status(200).json({
        message : "Notes Fetch Successfully",note
    })
})

app.delete("/api/notes/:id",async (req,res)=>{
    const id = req.params.id

    await notesModel.findByIdAndDelete(id)

    res.status(200).json({
        message : "Note Deleted Successfully"
    })
})

app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    const {title,description} = req.body

    await notesModel.findByIdAndUpdate(id,{title,description})

    res.status(200).json({
        message : "Note Updated Successfully"
    })
})

module.exports = app;