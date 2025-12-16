import mongoose, { Schema, models } from "mongoose";

const MaterialSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    fileUrl: {
      type: String, // uploaded file or external link
      required: true,
    },
    fileType: {
      type: String, // pdf, docx, pptx, link
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default models.Material || mongoose.model("Material", MaterialSchema);
