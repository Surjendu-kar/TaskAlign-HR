import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async (): Promise<void> => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    const connectionString = `${process.env.MONGODB_URI}${DB_NAME}`;
    await mongoose.connect(connectionString);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
