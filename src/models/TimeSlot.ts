import mongoose, { Schema, models, model } from "mongoose";

export interface ITimeSlot {
  _id: string;
  date: Date; // The date for this slot
  startTime: string; // e.g., "09:00"
  endTime: string; // e.g., "10:00"
  duration: number; // Duration in minutes
  isBooked: boolean; // Is this slot taken?
  bookedBy?: string; // Reference to Appointment._id if booked
  isAvailable: boolean; // Admin can disable slots
  consultationType?: "discovery" | "behavior-essentials" | "behavior-intensive" | "puppy-foundations" | "all";
  notes?: string; // Admin notes for the slot
  createdAt: Date;
  updatedAt: Date;
}

const TimeSlotSchema = new Schema<ITimeSlot>(
  {
    date: { 
      type: Date, 
      required: true,
      index: true // Index for faster queries
    },
    startTime: { 
      type: String, 
      required: true 
    },
    endTime: { 
      type: String, 
      required: true 
    },
    duration: { 
      type: Number, 
      required: true,
      default: 60 // Default 60 minutes
    },
    isBooked: { 
      type: Boolean, 
      default: false,
      index: true
    },
    bookedBy: { 
      type: String, 
      ref: "Appointment",
      sparse: true
    },
    isAvailable: { 
      type: Boolean, 
      default: true 
    },
    consultationType: {
      type: String,
      enum: ["discovery", "behavior-essentials", "behavior-intensive", "puppy-foundations", "all"],
      default: "all"
    },
    notes: String,
  },
  { timestamps: true }
);

// Create compound unique index
TimeSlotSchema.index({ date: 1, startTime: 1 }, { unique: true });

export const TimeSlot =
  models.TimeSlot || model<ITimeSlot>("TimeSlot", TimeSlotSchema);
