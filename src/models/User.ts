// src/models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string; // hashed
  name?: string;
  role: string;
  createdAt: Date;
  
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  name: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, enum: ["admin", "student"], default: "student" },
});

// Avoid model overwrite in dev/hot reload
const User: Model<IUser> = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);
export default User;
