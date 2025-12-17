import mongoose, { Schema, Document } from 'mongoose';

export interface IRegistration extends Document {
  seminarId: mongoose.Types.ObjectId;
  fullName: string;
  phoneNumber: string;
  email?: string;
  registrationDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'waitlisted';
  referenceNumber: string;
  attended: boolean;
  notes?: string;
}

const RegistrationSchema = new Schema<IRegistration>({
  seminarId: {
    type: Schema.Types.ObjectId,
    ref: 'Seminar',
    required: [true, 'Seminar ID is required'],
    index: true,
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v: string) {
        return /^[0-9]{10,15}$/.test(v);
      },
      message: 'Please enter a valid phone number',
    },
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v: string) {
        return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please enter a valid email address',
    },
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'waitlisted'],
    default: 'confirmed',
  },
  referenceNumber: {
    type: String,
    unique: true,
    required: true,
  },
  attended: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Generate unique reference number before saving
RegistrationSchema.pre('save', async function(next) {
  if (this.isNew) {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(1000 + Math.random() * 9000);
    this.referenceNumber = `REG-${year}-${random}`;
  }
  next();
});

// Create compound index for unique registration per seminar
RegistrationSchema.index(
  { seminarId: 1, phoneNumber: 1 },
  { 
    unique: true, 
    partialFilterExpression: { status: { $ne: 'cancelled' } } 
  }
);

export default mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);