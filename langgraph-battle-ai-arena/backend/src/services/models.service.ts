import { ChatOpenAI } from "@langchain/openai";
import { ChatCohere } from "@langchain/cohere";
import { ChatGroq } from "@langchain/groq";
import appConfig from "../config/config.js";

export const openAiModel = new ChatOpenAI({
  model: "gpt-5.5-pro",
  apiKey: appConfig.OPEN_AI_KEY,
});

export const cohereModel = new ChatCohere({
  model: "command-r7b-12-2024",
  apiKey: appConfig.COHERE_API_KEY,
});

export const groqModel = new ChatGroq({
  model: "openai/gpt-oss-20b",
  apiKey: appConfig.GROQ_API_KEY,
});

export const cloudflareModel = new ChatOpenAI({
  model: "@cf/google/gemma-4-26b-a4b-it",
  apiKey: appConfig.CLOUDFLARE_API_KEY,
  configuration: {
    baseURL: `https://api.cloudflare.com/client/v4/accounts/${appConfig.CLOUDFLARE_ACCOUNT_ID}/ai/v1`,
  },
});
