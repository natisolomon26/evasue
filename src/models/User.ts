// src/models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface PermissionSet {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface IUser extends Document {
  isAdmin: any;
  email: string;
  password: string;
  name?: string;

  // Role system
  role: "super_admin" | "admin";

  // Permissions only used for "admin"
  permissions: {
    events: PermissionSet;
    newsletter: PermissionSet;
    emails: PermissionSet;
    materials: PermissionSet;
  };

  // Super admin lock
  isSystemProtected: boolean;

  createdAt: Date;
}

const PermissionSchema = new Schema<PermissionSet>({
  create: { type: Boolean, default: false },
  read: { type: Boolean, default: true },
  update: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
});

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: { type: String, required: true },
  name: { type: String, default: "" },

  // --- ROLE SYSTEM ---
  role: {
    type: String,
    enum: ["super_admin", "admin"],
    default: "admin",
  },

  // --- PERMISSIONS SYSTEM ---
  permissions: {
    events: { type: PermissionSchema, default: () => ({}) },
    newsletter: { type: PermissionSchema, default: () => ({}) },
    emails: { type: PermissionSchema, default: () => ({}) },
    materials: { type: PermissionSchema, default: () => ({}) },
  },

  // --- SUPER ADMIN CANNOT BE DELETED ---
  isSystemProtected: { type: Boolean, default: false },
  

  createdAt: { type: Date, default: Date.now },
});

// Prevent overwrite in dev
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
