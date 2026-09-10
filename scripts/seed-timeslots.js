/**
 * Seed Time Slots Script
 * 
 * This script creates sample time slots for testing the booking system.
 * Run with: node scripts/seed-timeslots.js
 * 
 * Creates slots for the next 30 days:
 * - Monday to Friday: 9am-5pm (1-hour slots)
 * - Saturday: 9am-1pm (1-hour slots)
 * - Sunday: Closed
 */

const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/neuropet';

// Time slot schema (same as in TimeSlot.ts)
const timeSlotSchema = new mongoose.Schema({
  date: { type: Date, required: true, index: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  duration: { type: Number, required: true, default: 60 },
  isBooked: { type: Boolean, default: false, index: true },
  bookedBy: { type: String, ref: "Appointment", sparse: true },
  isAvailable: { type: Boolean, default: true },
  consultationType: {
    type: String,
    enum: ["discovery", "behavior-essentials", "behavior-intensive", "puppy-foundations", "all"],
    default: "all"
  },
  notes: String,
}, { 
  timestamps: true,
});

timeSlotSchema.index({ date: 1, startTime: 1 }, { unique: true });

const TimeSlot = mongoose.models.TimeSlot || mongoose.model('TimeSlot', timeSlotSchema);

// Configuration
const DAYS_TO_CREATE = 30;
const WORKING_DAYS = [1, 2, 3, 4, 5]; // Monday to Friday
const SATURDAY = 6;

// Time slots for weekdays
const WEEKDAY_SLOTS = [
  { start: "09:00", end: "10:00" },
  { start: "10:00", end: "11:00" },
  { start: "11:00", end: "12:00" },
  { start: "12:00", end: "13:00" },
  { start: "13:00", end: "14:00" },
  { start: "14:00", end: "15:00" },
  { start: "15:00", end: "16:00" },
  { start: "16:00", end: "17:00" },
];

// Time slots for Saturday
const SATURDAY_SLOTS = [
  { start: "09:00", end: "10:00" },
  { start: "10:00", end: "11:00" },
  { start: "11:00", end: "12:00" },
  { start: "12:00", end: "13:00" },
];

async function seedTimeSlots() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing time slots (optional - comment out if you want to keep existing)
    console.log('🗑️  Clearing existing time slots...');
    await TimeSlot.deleteMany({});
    console.log('✅ Cleared existing time slots');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const slots = [];
    let createdCount = 0;
    let skippedCount = 0;

    console.log(`📅 Creating time slots for next ${DAYS_TO_CREATE} days...`);

    for (let i = 0; i < DAYS_TO_CREATE; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      const dayOfWeek = date.getDay();
      
      // Skip Sundays
      if (dayOfWeek === 0) {
        continue;
      }

      // Choose time slots based on day
      const daySlots = dayOfWeek === SATURDAY ? SATURDAY_SLOTS : WEEKDAY_SLOTS;

      for (const timeSlot of daySlots) {
        const slot = {
          date: date,
          startTime: timeSlot.start,
          endTime: timeSlot.end,
          duration: 60,
          isBooked: false,
          isAvailable: true,
          consultationType: "all",
          notes: "",
        };

        try {
          await TimeSlot.create(slot);
          createdCount++;
        } catch (error) {
          if (error.code === 11000) {
            // Duplicate key - slot already exists
            skippedCount++;
          } else {
            console.error(`❌ Error creating slot for ${date.toDateString()} at ${timeSlot.start}:`, error.message);
          }
        }
      }
    }

    console.log('');
    console.log('✅ Time slot seeding completed!');
    console.log(`   📊 Statistics:`);
    console.log(`      - Created: ${createdCount} slots`);
    console.log(`      - Skipped: ${skippedCount} duplicates`);
    console.log('');
    console.log('🎉 Done! You can now use the booking system.');
    console.log('   👉 Admin panel: http://localhost:3000/admin/timeslots');
    console.log('   👉 Booking page: http://localhost:3000/book');

  } catch (error) {
    console.error('❌ Error seeding time slots:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seed function
seedTimeSlots();
