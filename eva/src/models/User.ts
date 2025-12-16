// src/models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export type Role = "superadmin" | "admin" | "staff";

export interface Permission {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface UserPermissions {
  events: Permission;
  newsletter: Permission;
  emails: Permission;
  materials: Permission;
  [key: string]: Permission; // for future expansion
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string; // hashed
  role: Role;
  permissions: UserPermissions;
  isSystemProtected: boolean;
  createdAt: Date;
}

const PermissionSchema = new Schema<Permission>({
  create: { type: Boolean, default: false },
  read: { type: Boolean, default: true },
  update: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
});

const UserSchema = new Schema<IUser>({
  name: { type: String, default: "" },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },

  role: { type: String, enum: ["superadmin", "admin", "staff"], default: "staff" },

  permissions: {
    events: { type: PermissionSchema, default: {} },
    newsletter: { type: PermissionSchema, default: {} },
    emails: { type: PermissionSchema, default: {} },
    materials: { type: PermissionSchema, default: {} },
  },

  isSystemProtected: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite in hot reload
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
