import mongoose, { Schema, models } from "mongoose";

const StaffSchema = new Schema(
  {
    fullName: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String },
    image: { type: String }, // URL
  },
  { timestamps: true }
);

export default models.Staff || mongoose.model("Staff", StaffSchema);
