import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISeminarRegistration extends Document {
  seminarId: Types.ObjectId;
  fullName: string;
  phoneNumber: string;
  email?: string;
  status: 'confirmed' | 'cancelled';
  referenceNumber: string;
  attended: boolean;
}

const SeminarRegistrationSchema = new Schema<ISeminarRegistration>(
  {
    seminarId: {
      type: Schema.Types.ObjectId,
      ref: 'Seminar',
      required: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
    },
    referenceNumber: {
      type: String,
      unique: true,
      index: true,
    },
    attended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/* Auto-generate reference number */
SeminarRegistrationSchema.pre('save', function (next) {
  if (!this.referenceNumber) {
    const year = new Date().getFullYear().toString().slice(-2);
    const rand = Math.floor(100000 + Math.random() * 900000);
    this.referenceNumber = `SEM-${year}-${rand}`;
  }
  next();
});

/* Prevent duplicate active registrations */
SeminarRegistrationSchema.index(
  { seminarId: 1, phoneNumber: 1 },
  { unique: true }
);

export default mongoose.models.SeminarRegistration ||
  mongoose.model<ISeminarRegistration>('SeminarRegistration', SeminarRegistrationSchema);
