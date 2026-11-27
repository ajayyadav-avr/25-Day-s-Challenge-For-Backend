import { config } from "dotenv";
config();

type AppConfig = {
  readonly GOOGLE_API_KEY: string;
  readonly COHERE_API_KEY: string;
  readonly GROQ_API_KEY: string;
  readonly OPEN_AI_KEY: string;
  readonly CLOUDFLARE_API_KEY: string;
  readonly CLOUDFLARE_ACCOUNT_ID: string;
};

const appConfig: AppConfig = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  COHERE_API_KEY: process.env.COHERE_API_KEY || "",
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  OPEN_AI_KEY: process.env.OPEN_AI_KEY || "",
  CLOUDFLARE_API_KEY: process.env.CLOUDFLARE_API_KEY || "",
  CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID || "",
};

export default appConfig;
