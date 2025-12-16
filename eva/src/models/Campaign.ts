import mongoose, { Schema, model, models } from "mongoose";

const CampaignSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    htmlBody: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["newsletter", "promotion", "event"],
      required: true,
    },

    sentTo: {
      type: [String], // store list of emails sent
      default: [],
    },

    sentAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default models.Campaign || model("Campaign", CampaignSchema);
