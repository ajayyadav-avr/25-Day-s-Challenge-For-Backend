import { ChatGoogle } from "@langchain/google/node";

const model = new ChatGoogle({
  model: "gemini-3.7-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

export async function testAi(prompt = "hi") {
  try {
    const response = await model.invoke(prompt);
    console.log("AI Reply:", response.content);
    return response.content;
  } catch (err) {
    console.error("AI Error:", err.message);
    return "Sorry, the AI service is temporarily busy. Please try again later.";
  }
}
