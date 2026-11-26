import { ChatOpenAI } from "@langchain/openai";
import { ChatCohere } from "@langchain/cohere";
import { ChatGroq } from "@langchain/groq";
import app_config from "../config/config.js";
export const openAiModel = new ChatOpenAI({
    model: "gpt-5.5-pro",
    apiKey: app_config.OPEN_AI_KEY,
});
export const cohereModel = new ChatCohere({
    model: "command-r7b-12-2024",
    apiKey: app_config.COHERE_API_KEY
});
export const grogModel = new ChatGroq({
    model: "openai/gpt-oss-20b",
    apiKey: app_config.GROQ_API_KEY
});
export const cloudflareModel = new ChatOpenAI({
    model: "@cf/google/gemma-4-26b-a4b-it",
    apiKey: app_config.CLOUDFLARE_API_KEY,
    configuration: {
        baseURL: `https://api.cloudflare.com/client/v4/accounts/${app_config.CLOUDFLARE_ACCOUNT_ID}/ai/v1`
    }
});
//# sourceMappingURL=models.service.js.map