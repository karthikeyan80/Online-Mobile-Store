import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Optional: Exit process if connection fails
  }
};

export default connectDB;
