// src/models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string; // hashed
  name?: string;
  isAdmin: boolean;        // <-- NEW
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true },
  name: { type: String, default: "" },

  // NEW: simple admin flag
  isAdmin: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

// Avoid model overwrite in hot reload
const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export default User;
