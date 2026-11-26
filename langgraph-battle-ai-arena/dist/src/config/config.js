import { config } from "dotenv";
config();
const app_config = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
    OPEN_AI_KEY: process.env.OPEN_AI_KEY || "",
    CLOUDFLARE_API_KEY: process.env.CLOUDFLARE_API_KEY || "",
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID || ""
};
export default app_config;
//# sourceMappingURL=config.js.map