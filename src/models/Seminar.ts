import mongoose, { Schema, Document } from 'mongoose';

export interface ISeminar extends Document {
  title: string;
  description: string;
  date: Date;
  capacity: number;
  currentRegistrations: number;
  isOpen: boolean;
  location: string;
  instructor: string;
  createdAt: Date;
  updatedAt: Date;
}

const SeminarSchema = new Schema<ISeminar>({
  title: {
    type: String,
    required: [true, 'Seminar title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Seminar description is required'],
  },
  date: {
    type: Date,
    required: [true, 'Seminar date is required'],
  },
  capacity: {
    type: Number,
    required: [true, 'Seminar capacity is required'],
    min: [1, 'Capacity must be at least 1'],
  },
  currentRegistrations: {
    type: Number,
    default: 0,
    min: [0, 'Registrations cannot be negative'],
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  instructor: {
    type: String,
    required: [true, 'Instructor name is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
SeminarSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual to check if seminar is full
SeminarSchema.virtual('isFull').get(function() {
  return this.currentRegistrations >= this.capacity;
});

// Virtual to get available seats
SeminarSchema.virtual('availableSeats').get(function() {
  return this.capacity - this.currentRegistrations;
});

// Update isOpen status based on capacity
SeminarSchema.pre('save', function(next) {
  if (this.currentRegistrations >= this.capacity) {
    this.isOpen = false;
  } else {
    this.isOpen = true;
  }
  next();
});

export default mongoose.models.Seminar || mongoose.model<ISeminar>('Seminar', SeminarSchema);