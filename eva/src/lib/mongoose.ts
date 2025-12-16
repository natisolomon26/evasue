import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const MONGO_URL = process.env.MONGO_URL;
  if (!MONGO_URL) throw new Error("❌ Missing MONGO_URL");

  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(MONGO_URL);
  console.log("✅ MongoDB Connected");
};
