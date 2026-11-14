import "dotenv/config"
import readline from "readline/promises"
import { ChatGoogle } from "@langchain/google";
import { HumanMessage } from "langchain";

const rl = readline.createInterface({
    input : process.stdin,
    output :process.stdout,
})

const model = new ChatGoogle({
    model : "gemini-3.5-flash-lite",
});

const messages = []

while(true){
    const userInput = await rl.question("YOU: ")

    messages.push(new HumanMessage(userInput))

    const response = await model.invoke(messages)

    messages.push(response)

    console.log("AI: " + response.content);
    
}

r1.close();