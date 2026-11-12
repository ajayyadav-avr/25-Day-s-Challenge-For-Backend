import "dotenv/config";
import app from "./src/app.js";
import connecttoDB from "./src/config/database.js";

const PORT = process.env.PORT;

connecttoDB();

app.listen(PORT, () => {
  console.log(`server is runnig on port ${PORT}`);
});
