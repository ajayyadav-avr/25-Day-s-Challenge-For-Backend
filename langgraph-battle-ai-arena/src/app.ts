import express from 'express'
import useGraph from "./services/grap.ai.service.js"

const app = express()

app.get('/health',(req,res)=>{
    res.status(200).json({ status:'ok' })
})

app.get("/use-graph", async (req,res)=>{
    const result = await useGraph("Write an code for factorial function in JS")
    res.status(201).json(result)
})

export default app