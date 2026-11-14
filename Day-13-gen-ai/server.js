import "dotenv/config";
import readline from "readline/promises";
import { ChatGoogle } from "@langchain/google";
import { HumanMessage, tool, createAgent } from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";

const emailTool = tool(sendEmail, {
  name: "emailTool",
  description: "Use this tool to send an email",
  schema: z.object({
    to: z.string().describe("The recipient's email address"),
    html: z.string().describe("The HTML content of the email"),
    subject: z.string().describe("The subject of the email"),
  }),
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatGoogle({
  model: "gemini-3.5-flash-lite",
});

const agent = createAgent({
  model,
  tools: [emailTool],
});

const messages = [];

while (true) {
  const userInput = await rl.question("YOU: ");

  messages.push(new HumanMessage(userInput));

  const response = await agent.invoke({
    messages,
  });

  const aiMessage = response.messages[response.messages.length - 1];
  messages.push(aiMessage);

  console.log("AI: " + aiMessage.content);
}

