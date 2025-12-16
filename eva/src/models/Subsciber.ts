import mongoose, { Schema, model, models } from "mongoose";

const SubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    categories: {
      type: [String],
      enum: ["newsletter", "promotion", "event"],
      default: ["newsletter"],
    },

    status: {
      type: String,
      enum: ["active", "unsubscribed"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default models.Subscriber || model("Subscriber", SubscriberSchema);
