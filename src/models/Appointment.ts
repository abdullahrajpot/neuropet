import mongoose, { Schema, models, model } from "mongoose";

export interface IAppointment {
  _id: string;
  
  // Contact Information (Step 0)
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  
  // Pet Details (Step 1)
  petName: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  neutered: string;
  dateAcquired: string;
  acquiredFrom: string;
  acquiredAge: string;
  rehomed: string;
  rehomeReason?: string;
  
  // Living Situation (Step 2)
  householdAdults: string;
  householdChildren: string;
  childrenAges?: string;
  otherPets: string;
  otherPetsDetails?: string;
  homeType: string;
  hasGarden: string;
  
  // Veterinary Care (Step 3)
  vetName: string;
  vetAddress: string;
  vetPhone: string;
  lastVetVisit: string;
  currentMedications?: string;
  medicalConditions?: string;
  
  // Behaviour History (Step 4)
  behaviorConcernDuration: string;
  behaviorConcernFrequency: string;
  triggersOrPatterns: string;
  previousIncidents: string;
  incidentDetails?: string;
  behaviorWorseningOrImproving: string;
  
  // Main Concerns (Step 5)
  primaryConcern: string;
  concernDescription: string;
  concernSeverity: string;
  concernImpact: string;
  attemptedSolutions: string;
  
  // Daily Life (Step 6)
  exerciseAmount: string;
  exerciseType: string;
  feedingSchedule: string;
  sleepingArrangement: string;
  leftAloneDuration: string;
  leftAloneReaction: string;
  
  // Training & Diet (Step 7)
  previousTraining: string;
  trainingDetails?: string;
  trainingMethods?: string;
  diet: string;
  allergies?: string;
  currentSupplements?: string;
  
  // Additional Information
  preferredDate?: string;
  additionalInfo?: string;
  
  // Management Fields
  status: "pending" | "reviewed" | "scheduled" | "completed" | "archived";
  notes?: string;
  appointmentDate?: Date;
  clientId?: string;
  videoUploaded?: boolean;
  videoCount?: number;
  videoPaths?: string[];
  
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    // Contact Information
    ownerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    postcode: { type: String, required: true },
    
    // Pet Details
    petName: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    neutered: { type: String, required: true },
    dateAcquired: { type: String, required: true },
    acquiredFrom: { type: String, required: true },
    acquiredAge: { type: String, required: true },
    rehomed: { type: String, required: true },
    rehomeReason: String,
    
    // Living Situation
    householdAdults: { type: String, required: true },
    householdChildren: { type: String, required: true },
    childrenAges: String,
    otherPets: { type: String, required: true },
    otherPetsDetails: String,
    homeType: { type: String, required: true },
    hasGarden: { type: String, required: true },
    
    // Veterinary Care
    vetName: { type: String, required: true },
    vetAddress: { type: String, required: true },
    vetPhone: { type: String, required: true },
    lastVetVisit: { type: String, required: true },
    currentMedications: String,
    medicalConditions: String,
    
    // Behaviour History
    behaviorConcernDuration: { type: String, required: true },
    behaviorConcernFrequency: { type: String, required: true },
    triggersOrPatterns: { type: String, required: true },
    previousIncidents: { type: String, required: true },
    incidentDetails: String,
    behaviorWorseningOrImproving: { type: String, required: true },
    
    // Main Concerns
    primaryConcern: { type: String, required: true },
    concernDescription: { type: String, required: true },
    concernSeverity: { type: String, required: true },
    concernImpact: { type: String, required: true },
    attemptedSolutions: { type: String, required: true },
    
    // Daily Life
    exerciseAmount: { type: String, required: true },
    exerciseType: { type: String, required: true },
    feedingSchedule: { type: String, required: true },
    sleepingArrangement: { type: String, required: true },
    leftAloneDuration: { type: String, required: true },
    leftAloneReaction: { type: String, required: true },
    
    // Training & Diet
    previousTraining: { type: String, required: true },
    trainingDetails: String,
    trainingMethods: String,
    diet: { type: String, required: true },
    allergies: String,
    currentSupplements: String,
    
    // Additional
    preferredDate: String,
    additionalInfo: String,
    
    // Management
    status: {
      type: String,
      enum: ["pending", "reviewed", "scheduled", "completed", "archived"],
      default: "pending",
    },
    notes: String,
    appointmentDate: Date,
    clientId: { type: String, unique: true, sparse: true },
    videoUploaded: { type: Boolean, default: false },
    videoCount: { type: Number, default: 0 },
    videoPaths: [String],
  },
  { timestamps: true }
);

export const Appointment =
  models.Appointment || model<IAppointment>("Appointment", AppointmentSchema);
