// src/models/Event.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFormField {
  label: string;
  type: "text" | "textarea" | "email" | "number" | "select" | "checkbox";
  options?: string[]; // only for select/checkbox
  required?: boolean;
}

export interface IRegistration {
  userId: string;
  answers: Record<string, string>; // key: field label, value: response
  registeredAt: Date;
}

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  createdBy: string;
  isPaid: boolean;          // Add this
  price: number;            // Add this
  formFields: IFormField[];
  registrations: IRegistration[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: Date, required: true },
    location: { type: String, default: "" },
    createdBy: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
    price: { type: Number, default: 0 },  
    formFields: [
      {
        label: { type: String, required: true },
        type: { type: String, enum: ["text","textarea","email","number","select","checkbox"], required: true },
        options: [String],
        required: { type: Boolean, default: false },
      }
    ],
    registrations: [
      {
        userId: { type: String },
        answers: { type: Map, of: String },
        registeredAt: { type: Date, default: Date.now },
      }
    ]
  },
  { timestamps: true }
);

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
export default Event;