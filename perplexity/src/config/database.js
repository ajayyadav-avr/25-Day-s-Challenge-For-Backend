import mongoose from "mongoose";

function connecttoDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("MongoDB Connection Failed:", err.message);
    });
}

export default connecttoDB;
