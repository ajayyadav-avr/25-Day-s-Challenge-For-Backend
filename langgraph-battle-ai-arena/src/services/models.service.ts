import { ChatGoogle } from "@langchain/google"
import { ChatCohere } from "@langchain/cohere"
import { ChatGroq } from "@langchain/groq";
import config from "../config/config.js"

export const geminiModel = new ChatGoogle({
    model:"gemini-flash-latest",
    apiKey :config.GOOGLE_API_KEY,
});

export const cohereModel = new ChatCohere({
    model: "command-r7b-12-2024",
    apiKey: config.COHERE_API_KEY
})

export const grogModel = new ChatGroq({
    model: "gpt-oss-20b",
    apiKey: config.GROQ_API_KEY
}); 

