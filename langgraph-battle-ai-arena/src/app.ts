import express from 'express'
import useGraph from "../src/services/grap.ai.service.js"

const app = express()

app.get('/health',(req,res)=>{
    res.status(200).json({ status:'ok' })
})

app.post("/use-graph", async (req,res)=>{
    await useGraph("What is the capital of Indian?")
})

export default app