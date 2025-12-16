import mongoose, { Schema, models, model } from "mongoose";

const TrainingVideoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    youtubeId: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      default: "Training",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default models.TrainingVideo ||
  model("TrainingVideo", TrainingVideoSchema);
