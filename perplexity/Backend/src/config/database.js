import mongoose from "mongoose";

async function connectToDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);

  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
}

export default connectToDB;
