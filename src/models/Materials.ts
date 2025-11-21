// src/models/Material.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMaterial extends Document {
  title: string;
  description?: string;
  fileUrl: string; // link to file or path
  createdBy: mongoose.Schema.Types.ObjectId; // ref to User
  createdAt: Date;
}

const MaterialSchema = new Schema<IMaterial>({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  fileUrl: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Material: Model<IMaterial> =
  (mongoose.models.Material as Model<IMaterial>) || mongoose.model<IMaterial>("Material", MaterialSchema);

export default Material;
