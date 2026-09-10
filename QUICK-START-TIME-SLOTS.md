# Quick Start Guide: Time Slot Booking System

## 🚀 Getting Started

The time slot booking system is now integrated into your NeuroPet application. This guide will help you set it up and start using it.

## 📋 Prerequisites

- MongoDB database connected
- Admin account created
- Application running (`npm run dev`)

## 🎯 Quick Setup (3 Steps)

### Step 1: Create Sample Time Slots

Run the seeder script to create sample slots for the next 30 days:

```bash
# Windows
seed-timeslots.bat

# Or directly with Node
node scripts/seed-timeslots.js
```

This creates:
- **Monday-Friday**: 9am-5pm (8 slots per day)
- **Saturday**: 9am-1pm (4 slots per day)
- **Sunday**: Closed

### Step 2: Access Admin Panel

1. Login to admin panel: `http://localhost:3000/admin/login`
2. Navigate to **Time Slots** in the sidebar
3. You should see all the seeded slots organized by date

### Step 3: Test Booking Flow

1. Go to booking page: `http://localhost:3000/book`
2. Fill out the appointment form (steps 1-8)
3. At step 9, you'll see the **calendar with available dates**
4. Select a date → view available time slots
5. Choose a time → proceed to payment/confirmation

## 🎨 Admin Features

### View Time Slots
- Navigate to **Admin → Time Slots**
- See all slots organized by date
- View statistics (total, available, booked, disabled)

### Create Single Slot
1. Click **Add Time Slot**
2. Fill in:
   - Date
   - Start time (e.g., 09:00)
   - End time (e.g., 10:00)
   - Duration (60 minutes default)
   - Consultation type
   - Optional notes
3. Click **Create Slot**

### Bulk Create Slots
1. Click **Bulk Create**
2. Set date range (e.g., next 7 days)
3. Select days of week (leave empty for all days)
4. Add time slots:
   - Start: 09:00, End: 10:00, Duration: 60
   - Start: 10:00, End: 11:00, Duration: 60
   - etc.
5. Choose consultation type
6. Click **Create Slots**

### Manage Slots
- **Edit**: Click pencil icon → change availability or notes
- **Delete**: Click trash icon → remove unbooked slots
- **View Details**: See who booked each slot

## 👥 Client Experience

### Calendar Interface
Clients see:
- **Calendar view** with available dates highlighted
- **Dots on dates** indicate available slots
- **Today** highlighted with colored ring
- **Past dates** grayed out and disabled

### Selecting Time
1. Click on a date with available slots
2. View all time slots for that day
3. See start time, duration
4. Selected slot shows with checkmark
5. Confirmation message displays chosen date/time

### Booking Protection
- ✅ **Real-time availability** - slots update instantly
- ✅ **No double-booking** - atomic database operations
- ✅ **Locked dates** - booked slots disabled for others
- ✅ **Visual feedback** - clear selection states

## 📊 How It Works

### Slot States

1. **Available** (Green badge)
   - Not booked, available for booking
   - Visible in client calendar

2. **Booked** (Blue/Green background)
   - Reserved by a client
   - Shows client name and pet
   - Cannot be deleted

3. **Disabled** (Red badge)
   - Admin has disabled
   - Not visible to clients
   - Can be re-enabled

### Booking Flow

```
Client fills form → Reviews info → Selects time slot → 
Pays (if required) → Slot booked atomically → 
Confirmation sent → Slot disabled for others
```

## 🔧 Customization

### Change Working Hours

Edit `scripts/seed-timeslots.js`:

```javascript
const WEEKDAY_SLOTS = [
  { start: "08:00", end: "09:00" },  // Start at 8am
  { start: "09:00", end: "10:00" },
  // ... add more slots
  { start: "18:00", end: "19:00" },  // End at 7pm
];
```

### Change Consultation Types

Edit `src/models/TimeSlot.ts`:

```typescript
consultationType: {
  type: String,
  enum: ["discovery", "standard", "intensive", "all"],
  default: "all"
}
```

### Change Slot Duration

In admin panel or seed script:
```javascript
duration: 30,  // 30-minute slots
duration: 90,  // 90-minute slots
```

## 🧪 Testing

### Test Concurrent Bookings
1. Open two browser windows
2. Both select the same time slot
3. First to click "Book" gets the slot
4. Second sees "already booked" message

### Test Slot Visibility
1. Admin creates a slot
2. Immediately visible in client calendar
3. Client books it
4. Slot disappears from calendar
5. Shows as booked in admin panel

## 📱 Mobile-Friendly

The calendar and time slot selector are:
- ✅ Fully responsive
- ✅ Touch-optimized
- ✅ Easy to navigate on mobile
- ✅ Clear visual feedback

## ❓ Common Questions

### Q: Can I create slots for multiple months?
**A:** Yes! Use bulk create with a large date range (e.g., 60-90 days).

### Q: What if I need to cancel a booked slot?
**A:** Currently, admin can mark slot as unavailable. Proper cancellation feature can be added (see TIME-SLOT-SYSTEM.md for future enhancements).

### Q: Can I have different durations for different types?
**A:** Yes! When creating slots, set different durations. For example:
- Discovery: 30 min
- Behavior Essential: 60 min
- Behavior Intensive: 90 min

### Q: How do I handle holidays?
**A:** Don't create slots for those dates, or create them and mark as unavailable.

### Q: Can clients see who else booked?
**A:** No, booking details are only visible to admin.

## 🆘 Troubleshooting

### No slots showing in calendar
- Check admin panel - are there slots created?
- Verify `isAvailable: true` and `isBooked: false`
- Check date range - slots must be in future

### Cannot delete slot
- Booked slots cannot be deleted (by design)
- Unbook it first, then delete

### Duplicate slot error
- A slot already exists at that date/time
- Check admin panel for existing slots

### Time slot not updating
- Refresh the page
- Check browser console for errors
- Verify MongoDB connection

## 📚 Advanced Usage

See `TIME-SLOT-SYSTEM.md` for:
- Full API documentation
- Database schema details
- Security considerations
- Future enhancement ideas
- Detailed troubleshooting

## 🎉 That's It!

You now have a fully functional time slot booking system! Clients can easily select appointments, and you can manage your schedule efficiently.

**Need help?** Check the main documentation or browser console for detailed error messages.
