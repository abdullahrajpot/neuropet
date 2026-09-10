# Time Slot Booking System

## Overview

A comprehensive time slot management and booking system that allows:
- **Admins** to create, manage, and track appointment time slots
- **Clients** to view available slots and book appointments via a calendar interface
- **Real-time availability** - once a slot is booked, it's automatically disabled for other users

## Features

### Admin Features
1. **Create Time Slots**
   - Single slot creation
   - Bulk creation (multiple slots across date ranges)
   - Set duration, consultation type, and notes
   - Date/time validation to prevent duplicates

2. **Manage Time Slots**
   - View all slots organized by date
   - Edit availability and notes
   - Delete unbooked slots
   - View booking details for booked slots
   - Filter by date range

3. **Bulk Operations**
   - Create multiple time slots at once
   - Select specific days of the week
   - Add multiple time slots per day
   - Choose consultation types

4. **Statistics Dashboard**
   - Total slots
   - Available slots
   - Booked slots
   - Disabled slots

### Client Features
1. **Calendar View**
   - Interactive month calendar
   - Visual indicators for available dates
   - Navigate between months
   - Today indicator

2. **Time Slot Selection**
   - Select a date with available slots
   - View all time slots for that date
   - See slot duration and timing
   - Select preferred time slot

3. **Booking Confirmation**
   - Visual confirmation of selected slot
   - Display date, time, and duration
   - Prevent booking conflicts

## File Structure

### Models
```
src/models/
├── TimeSlot.ts          # Time slot schema and model
└── Appointment.ts       # Updated with timeSlotId reference
```

### API Routes
```
src/app/api/
├── timeslots/
│   ├── available/
│   │   └── route.ts     # Public: Get available slots
│   └── book/
│       └── route.ts     # Public: Book a time slot
└── admin/
    └── timeslots/
        ├── route.ts     # Admin: CRUD operations
        └── [id]/
            └── route.ts # Admin: Update/Delete single slot
```

### Components
```
src/components/booking/
└── TimeSlotSelector.tsx # Client-facing calendar & slot selector
```

### Pages
```
src/app/
├── (public)/
│   └── book/
│       └── page.tsx     # Updated booking flow with time slot selection
└── admin/
    └── timeslots/
        └── page.tsx     # Admin time slot management interface
```

## Database Schema

### TimeSlot Model
```typescript
{
  _id: ObjectId,
  date: Date,              // Date for this slot
  startTime: String,       // e.g., "09:00"
  endTime: String,         // e.g., "10:00"
  duration: Number,        // Duration in minutes (default: 60)
  isBooked: Boolean,       // Is slot taken? (default: false)
  bookedBy: String,        // Reference to Appointment._id
  isAvailable: Boolean,    // Admin can disable slots (default: true)
  consultationType: String, // "all", "discovery", "behavior-essentials", etc.
  notes: String,           // Admin notes
  createdAt: Date,
  updatedAt: Date
}

// Compound unique index on (date + startTime)
```

### Appointment Model Updates
```typescript
{
  // ... existing fields ...
  timeSlotId: String,      // Reference to TimeSlot._id
  appointmentDate: Date,   // Synced from selected time slot
  // ... rest of fields ...
}
```

## API Endpoints

### Public Endpoints

#### GET `/api/timeslots/available`
Get available time slots for booking.

**Query Parameters:**
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string
- `consultationType` (optional): Filter by consultation type

**Response:**
```json
{
  "success": true,
  "slots": [
    {
      "_id": "...",
      "date": "2024-03-15T00:00:00.000Z",
      "startTime": "09:00",
      "endTime": "10:00",
      "duration": 60,
      "isBooked": false,
      "isAvailable": true,
      "consultationType": "all"
    }
  ],
  "count": 1
}
```

#### POST `/api/timeslots/book`
Book a time slot for an appointment.

**Body:**
```json
{
  "timeSlotId": "...",
  "appointmentId": "..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Time slot booked successfully",
  "timeSlot": { ... }
}
```

**Error Cases:**
- 404: Time slot not found
- 409: Time slot already booked
- 400: Missing required fields

### Admin Endpoints (Require Authentication)

#### GET `/api/admin/timeslots`
Get all time slots with optional filtering.

**Query Parameters:**
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string

**Response:**
```json
[
  {
    "_id": "...",
    "date": "2024-03-15T00:00:00.000Z",
    "startTime": "09:00",
    "endTime": "10:00",
    "duration": 60,
    "isBooked": true,
    "isAvailable": true,
    "consultationType": "discovery",
    "notes": "Video consultation",
    "bookedBy": {
      "ownerName": "John Smith",
      "email": "john@example.com",
      "petName": "Buddy"
    }
  }
]
```

#### POST `/api/admin/timeslots`
Create new time slot(s).

**Single Creation:**
```json
{
  "date": "2024-03-15",
  "startTime": "09:00",
  "endTime": "10:00",
  "duration": 60,
  "isAvailable": true,
  "consultationType": "all",
  "notes": "Optional notes"
}
```

**Bulk Creation:**
```json
{
  "bulkCreate": true,
  "slots": [
    {
      "date": "2024-03-15",
      "startTime": "09:00",
      "endTime": "10:00",
      "duration": 60,
      "consultationType": "all"
    },
    // ... more slots
  ]
}
```

**Response:**
```json
{
  "success": true,
  "created": 10,
  "errors": 2,
  "createdSlots": [ ... ],
  "errorDetails": [ ... ]
}
```

#### PATCH `/api/admin/timeslots/[id]`
Update a time slot.

**Body:**
```json
{
  "isAvailable": false,
  "notes": "Updated notes"
}
```

**Note:** If slot is booked, only `isAvailable` and `notes` can be updated.

**Response:**
```json
{
  "success": true,
  "timeSlot": { ... },
  "message": "Limited update applied (slot is booked)" // if applicable
}
```

#### DELETE `/api/admin/timeslots/[id]`
Delete a single unbooked time slot.

**Response:**
```json
{
  "success": true,
  "message": "Time slot deleted successfully"
}
```

**Error:** Cannot delete booked slots (400)

#### DELETE `/api/admin/timeslots?ids=id1,id2,id3`
Delete multiple unbooked time slots.

**Query Parameters:**
- `ids`: Comma-separated slot IDs

**Response:**
```json
{
  "success": true,
  "deletedCount": 3
}
```

## Booking Flow

### Client Journey

1. **Form Completion** (Steps 0-7)
   - Client fills out appointment assessment form
   - Adds optional video uploads
   - Selects consultation type and optional tip

2. **Review** (Step 8)
   - Review all submitted information
   - Agree to privacy policy

3. **Time Slot Selection** (Step 9) ⭐ NEW
   - View calendar with available dates
   - Select a date with available slots
   - Choose preferred time from available slots
   - See confirmation of selected time

4. **Payment** (Step 10)
   - Complete payment if applicable
   - Free discovery sessions skip payment

5. **Confirmation**
   - Time slot is atomically booked
   - Videos uploaded if provided
   - Confirmation email sent
   - Redirect to confirmation page

### Atomic Booking

The booking process uses atomic updates to prevent race conditions:

```typescript
// In /api/timeslots/book
const updatedSlot = await TimeSlot.findOneAndUpdate(
  { 
    _id: timeSlotId, 
    isBooked: false,      // Only update if not booked
    isAvailable: true      // Only if available
  },
  { 
    isBooked: true, 
    bookedBy: appointmentId 
  },
  { new: true }
);

if (!updatedSlot) {
  // Slot was just booked by someone else
  return error 409
}
```

This ensures only ONE user can book a specific time slot, even if multiple users try simultaneously.

## Admin Workflow

### Creating Time Slots

#### Single Slot
1. Go to **Admin → Time Slots**
2. Click **Add Time Slot**
3. Fill in:
   - Date
   - Start time
   - End time
   - Duration (minutes)
   - Consultation type
   - Optional notes
4. Click **Create Slot**

#### Bulk Creation
1. Click **Bulk Create**
2. Set date range (start and end dates)
3. Select days of week (optional - leave empty for all days)
4. Add time slots per day
   - Start time, end time, duration
   - Can add multiple slots per day
5. Choose consultation type
6. Click **Create Slots**
7. Review results (successful + any duplicates skipped)

### Managing Time Slots

- **View by Date**: Slots organized by calendar date
- **Edit**: Click edit icon to change availability or notes
- **Delete**: Click trash icon to remove unbooked slots
- **Filter**: Use date range to view specific periods
- **Statistics**: Dashboard shows total, available, booked, and disabled counts

### Slot States

1. **Available** (Green)
   - `isBooked: false`, `isAvailable: true`
   - Visible to clients for booking

2. **Booked** (Blue)
   - `isBooked: true`
   - Shows client information
   - Cannot be deleted or modified (date/time locked)

3. **Disabled** (Red)
   - `isAvailable: false`
   - Hidden from clients
   - Can be re-enabled by admin

## Security Considerations

### Authorization
- Admin endpoints check for admin role via NextAuth session
- Public endpoints only expose necessary data (hide bookedBy, notes)

### Race Condition Prevention
- Atomic database updates using `findOneAndUpdate` with query conditions
- Compound unique index on (date, startTime) prevents duplicate slots
- Transaction-safe booking process

### Data Validation
- Date/time format validation
- Duration minimum (15 minutes)
- Consultation type enum validation
- Duplicate prevention at database level

## Testing Checklist

### Admin Testing
- [ ] Create single time slot
- [ ] Create bulk time slots (date range)
- [ ] Create bulk with specific days of week
- [ ] Edit unbooked slot
- [ ] Try editing booked slot (should limit changes)
- [ ] Delete unbooked slot
- [ ] Try deleting booked slot (should fail)
- [ ] Disable/enable slot
- [ ] View slots by date range
- [ ] Check statistics accuracy

### Client Testing
- [ ] View calendar with available dates
- [ ] Navigate between months
- [ ] Select date with slots
- [ ] View time slots for date
- [ ] Select a time slot
- [ ] See confirmation display
- [ ] Complete booking flow
- [ ] Try booking same slot (should fail for second user)
- [ ] Verify slot shows as booked after booking

### Edge Cases
- [ ] Concurrent booking attempts (race condition)
- [ ] Booking after slot disabled by admin
- [ ] Creating duplicate time slot
- [ ] Booking with invalid appointment ID
- [ ] Booking with invalid time slot ID
- [ ] Past dates filtering
- [ ] Timezone handling

## Future Enhancements

### Potential Improvements
1. **Recurring Slots**
   - Create repeating weekly patterns
   - Automatically generate slots for next N weeks

2. **Buffer Time**
   - Add buffer between appointments
   - Prevent back-to-back bookings

3. **Multiple Practitioners**
   - Assign slots to specific team members
   - Filter by practitioner availability

4. **Cancellation/Rescheduling**
   - Allow clients to reschedule
   - Release slots back to pool
   - Cancellation policies

5. **Waitlist**
   - Allow clients to join waitlist for full dates
   - Auto-notify when slots become available

6. **Email Reminders**
   - Send appointment reminders
   - 24-hour and 1-hour notifications

7. **Google Calendar Integration**
   - Sync with admin's calendar
   - Block out busy times automatically

8. **Timezone Support**
   - Display times in user's timezone
   - Store UTC, display local

9. **Slot Duration Variants**
   - Quick presets (30min, 60min, 90min)
   - Custom durations per consultation type

10. **Analytics**
    - Booking patterns
    - Peak times
    - Conversion rates
    - No-show tracking

## Troubleshooting

### Slot Not Appearing for Clients
- Check `isAvailable: true`
- Check `isBooked: false`
- Verify date is in future
- Check consultation type matching

### Cannot Delete Slot
- Verify slot is not booked (`isBooked: false`)
- Check admin authentication

### Duplicate Slot Error
- Check database for existing slot at same date/time
- Compound index ensures uniqueness

### Race Condition Issues
- Verify atomic update in booking API
- Check database query conditions
- Review error handling for 409 responses

## Support

For issues or questions:
1. Check logs in browser console and server logs
2. Verify database connection
3. Test API endpoints directly
4. Review NextAuth session authentication

## License

This time slot system is part of the NeuroPet application.
