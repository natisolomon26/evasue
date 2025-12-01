// src/models/Registration.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRegistration extends Document {
  eventId: mongoose.Types.ObjectId;          // Reference to Event
  answers: Map<string, string>;             // Form field answers
  isGuest: boolean;
  registeredAt: Date;
  paymentStatus?: "pending" | "completed" | "failed";
  paymentType?: string; // "card", "telebirr", "bank", etc.
  transactionId?: string;
  amountPaid?: number;
}

const RegistrationSchema = new Schema<IRegistration>({
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  answers: { type: Map, of: String, required: true },
  isGuest: { type: Boolean, default: true },
  registeredAt: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  paymentType: { type: String },
  transactionId: { type: String },
  amountPaid: { type: Number },
});

const Registration: Model<IRegistration> = mongoose.models.Registration || mongoose.model<IRegistration>("Registration", RegistrationSchema);

export default Registration;
