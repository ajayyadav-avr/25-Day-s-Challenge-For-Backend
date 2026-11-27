import express from 'express'
import runArenaGraph from "./services/graph.ai.service.js"
import cors from "cors"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
}))
app.use(express.json())

app.get('/health',(req,res)=>{
    res.status(200).json({ status:'ok' })
})

app.post("/invoke", async (req, res) => {
    try {
        const { input } = req.body ?? {}
        if (!input || typeof input !== "string") {
            res.status(400).json({ message: "input is required", success: false })
            return
        }

        const result = await runArenaGraph(input)

        res.status(200).json({
            message: "Graph executed successfully",
            success: true,
            result
        })
    } catch (error) {
        console.error("Error in /invoke:", error)
        res.status(500).json({
            message: "Failed to execute graph",
            success: false,
        })
    }
})

export default app