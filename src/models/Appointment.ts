import mongoose, { Schema, models, model } from "mongoose";

export interface IAppointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  petName: string;
  petType: string;
  message?: string;
  preferredDate?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    petName: { type: String, required: true },
    petType: { type: String, required: true },
    message: String,
    preferredDate: String,
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Appointment =
  models.Appointment || model<IAppointment>("Appointment", AppointmentSchema);
