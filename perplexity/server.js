import "dotenv/config";
import app from "./src/app.js";
import connecttoDB from "./src/config/database.js";
import {testAi} from "./src/services/ai.service.js"

const PORT = process.env.PORT;

testAi();

connecttoDB();

app.listen(PORT, () => {
  console.log(`server is runnig on port ${PORT}`);
});
