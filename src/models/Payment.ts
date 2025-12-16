import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPayment extends Document {
  eventId: mongoose.Types.ObjectId | string;
  registrationId: mongoose.Types.ObjectId | string;
  amount: number;
  currency: string;
  chapaRef: string;
  chapaTxId?: string;
  status: "PENDING"|"SUCCESS"|"FAILED"|"REFUNDED";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawWebhook?: any;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    registrationId: { type: Schema.Types.ObjectId, ref: "Registration", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "ETB" },
    chapaRef: { type: String, required: true },
    chapaTxId: { type: String },
    status: { type: String, enum: ["PENDING","SUCCESS","FAILED","REFUNDED"], default: "PENDING" },
    rawWebhook: { type: Schema.Types.Mixed },
    paidAt: { type: Date }
  },
  { timestamps: true }
);

PaymentSchema.index({ eventId: 1 });
PaymentSchema.index({ registrationId: 1 });
PaymentSchema.index({ chapaRef: 1 });

const Payment: Model<IPayment> = mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);
export default Payment;
