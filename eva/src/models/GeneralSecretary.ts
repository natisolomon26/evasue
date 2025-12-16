import mongoose, { Schema, models } from "mongoose";

const GeneralSecretarySchema = new Schema(
  {
    fullName: { type: String, required: true },
    role: { type: String, required: true, default: "General Secretary" },

    description: { type: String },
    education: { type: String },
    personal: { type: String },

    image: { type: String },

    isActive: { type: Boolean, default: true } // easiest way to track who's current
  },
  { timestamps: true }
);

export default models.GeneralSecretary ||
  mongoose.model("GeneralSecretary", GeneralSecretarySchema);
