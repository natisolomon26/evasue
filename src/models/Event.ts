import mongoose, { Schema, Document } from "mongoose";

export interface IFormField {
  label: string;
  type: "text" | "email" | "number" | "textarea" | "select" | "checkbox";
  required: boolean;
  options?: string[];
}

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  isPaid: boolean;
  price: number;
  formFields: IFormField[];
}

const FormFieldSchema = new Schema<IFormField>({
  label: { type: String, required: true },
  type: {
    type: String,
    enum: ["text", "email", "number", "textarea", "select", "checkbox"],
    required: true
  },
  required: { type: Boolean, default: false },
  options: { type: [String], default: [] }
});

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    location: String,
    isPaid: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    formFields: { type: [FormFieldSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.models.Event ||
  mongoose.model<IEvent>("Event", EventSchema);
