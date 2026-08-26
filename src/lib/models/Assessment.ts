import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema(
  {
    // Client Information
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
    rehomeReason: { type: String },

    // Household
    householdAdults: { type: String, required: true },
    householdChildren: { type: String, required: true },
    childrenAges: { type: String },
    otherPets: { type: String, required: true },
    otherPetsDetails: { type: String },
    homeType: { type: String, required: true },
    hasGarden: { type: String, required: true },

    // Veterinary
    vetName: { type: String, required: true },
    vetAddress: { type: String, required: true },
    vetPhone: { type: String, required: true },
    lastVetVisit: { type: String, required: true },
    currentMedications: { type: String },
    medicalConditions: { type: String },

    // Behaviour History
    behaviorConcernDuration: { type: String, required: true },
    behaviorConcernFrequency: { type: String, required: true },
    triggersOrPatterns: { type: String, required: true },
    previousIncidents: { type: String, required: true },
    incidentDetails: { type: String },
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
    trainingDetails: { type: String },
    trainingMethods: { type: String },
    diet: { type: String, required: true },
    allergies: { type: String },
    currentSupplements: { type: String },

    // Additional
    preferredDate: { type: String },
    additionalInfo: { type: String },
    videoUploaded: { type: Boolean, default: false },

    // Status & Management
    status: {
      type: String,
      enum: ["pending", "reviewed", "scheduled", "completed", "archived"],
      default: "pending",
    },
    assignedTo: { type: String },
    appointmentDate: { type: Date },
    notes: { type: String },
    clientPortalAccess: { type: Boolean, default: true },
    clientId: { type: String, unique: true }, // For client portal login
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Assessment ||
  mongoose.model("Assessment", AssessmentSchema);
