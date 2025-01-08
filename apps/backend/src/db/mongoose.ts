import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.DATABASE_URI || "");
      console.log(`MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`);
    } catch (error:any) {
      console.error(error.message);
      process.exit(1);
    }
  }

  export default connectDB;