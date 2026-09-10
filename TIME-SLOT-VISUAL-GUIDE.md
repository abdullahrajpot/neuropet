# Time Slot System - Visual Guide

## 📱 Client Booking Experience

### Step 1-8: Assessment Form
```
┌─────────────────────────────────────┐
│  NeuroPet Booking Form              │
├─────────────────────────────────────┤
│  Step 1: Your Details               │
│  Step 2: About Your Pet             │
│  Step 3: Living Situation           │
│  Step 4: Veterinary Care            │
│  Step 5: Behaviour History          │
│  Step 6: Main Concerns              │
│  Step 7: Daily Life                 │
│  Step 8: Training & Diet            │
│  Step 9: Review & Submit            │
└─────────────────────────────────────┘
```

### Step 9: Time Slot Selection ⭐ NEW

```
┌─────────────────────────────────────────────────────┐
│  📅 Select Appointment Time                         │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ← March 2024 →                                     │
│                                                      │
│  Sun Mon Tue Wed Thu Fri Sat                        │
│   -   -   -   -   1   2   3                        │
│   4   5   6   7  [8] [9] [10]  ← Dots show slots   │
│  [11][12][13][14] 15  [16] 17                      │
│  [18][19] 20  [21][22][23] 24                      │
│   25  26  27  28  29  30  31                        │
│                                                      │
│  🟢 Available  ⭕ Today  ⚫ Past/Unavailable        │
└─────────────────────────────────────────────────────┘

        ↓ User clicks on March 15 ↓

┌─────────────────────────────────────────────────────┐
│  🕐 Available Times for Friday, 15 March            │
├─────────────────────────────────────────────────────┤
│                                                      │
│  [09:00]  [10:00]  [11:00]  [12:00]                │
│   60min    60min    60min    60min                  │
│                                                      │
│  [14:00]  [15:00]  [16:00]  [17:00]                │
│   60min    60min    60min    60min                  │
│                                                      │
└─────────────────────────────────────────────────────┘

        ↓ User clicks 10:00 ↓

┌─────────────────────────────────────────────────────┐
│  ✅ Appointment Time Selected                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  📅 Friday, 15 March 2024 at 10:00                 │
│                                                      │
│  You can proceed to the next step to confirm.       │
│                                                      │
│              [← Back]  [Next Step →]                │
└─────────────────────────────────────────────────────┘
```

### Step 10: Payment
```
┌─────────────────────────────────────┐
│  💳 Payment                         │
├─────────────────────────────────────┤
│  Total: £270                        │
│  - Behavior Essentials: £270        │
│  - Tip: £0                          │
│                                     │
│  [Card Number]                      │
│  [Expiry] [CVC]                     │
│                                     │
│  [Complete Booking →]               │
└─────────────────────────────────────┘
```

---

## 🎛️ Admin Management Experience

### Time Slots Dashboard
```
┌────────────────────────────────────────────────────────────┐
│  Time Slot Management                                       │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  [Bulk Create]  [+ Add Time Slot]                         │
│                                                             │
│  📊 Statistics:                                            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │  Total  │ │Available│ │ Booked  │ │Disabled │        │
│  │   42    │ │   28    │ │   12    │ │    2    │        │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│                                                             │
│  📅 Monday, 15 March 2024                     (8 slots)   │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 09:00-10:00 | 60min | All Types | ✅ Available      │ │
│  │ 10:00-11:00 | 60min | Discovery | ✓  Booked        │ │
│  │   John Smith • Buddy (dog)                          │ │
│  │ 11:00-12:00 | 60min | All Types | ✅ Available      │ │
│  │ ...                                                  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  📅 Tuesday, 16 March 2024                   (8 slots)   │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 09:00-10:00 | 60min | All Types | ✅ Available      │ │
│  │ ...                                                  │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

### Create Single Slot Modal
```
┌─────────────────────────────────┐
│  Create Time Slot              │
├─────────────────────────────────┤
│                                 │
│  Date: [📅 15/03/2024]         │
│                                 │
│  Start: [🕐 09:00]             │
│  End:   [🕐 10:00]             │
│                                 │
│  Duration: [60] minutes         │
│                                 │
│  Type: [All Types ▼]           │
│                                 │
│  Notes: [____________]          │
│                                 │
│  [Cancel] [Create Slot]         │
└─────────────────────────────────┘
```

### Bulk Create Modal
```
┌─────────────────────────────────────────────────┐
│  Bulk Create Time Slots                         │
├─────────────────────────────────────────────────┤
│                                                  │
│  Date Range:                                    │
│  Start: [📅 15/03/2024]                        │
│  End:   [📅 31/03/2024]                        │
│                                                  │
│  Days of Week:                                  │
│  [Mon][Tue][Wed][Thu][Fri] Sat  Sun           │
│   ✓    ✓    ✓    ✓    ✓                       │
│                                                  │
│  Time Slots Per Day:                            │
│  [09:00] - [10:00] - [60] min  [🗑️]          │
│  [10:00] - [11:00] - [60] min  [🗑️]          │
│  [11:00] - [12:00] - [60] min  [🗑️]          │
│  [+ Add Time Slot]                             │
│                                                  │
│  Type: [All Types ▼]                           │
│                                                  │
│  [Cancel] [Create Slots]                        │
└─────────────────────────────────────────────────┘

        ↓ Creates ↓

  15 days × 3 slots = 45 time slots
```

---

## 🔄 Booking Flow Diagram

```
┌─────────────┐
│   Client    │
│  Visits     │
│ /book page  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Fills Form  │
│  (Steps 1-8)│
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ Step 9: Selects     │◄─── Fetches available slots
│    Time Slot        │     GET /api/timeslots/available
│                     │
│ • Views calendar    │
│ • Picks date        │
│ • Picks time        │
└──────┬──────────────┘
       │
       ▼
┌─────────────┐
│ Step 10:    │
│  Payment    │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  Submit Booking     │
│                     │
│  1. Create appt     │───► POST /api/appointments
│  2. Book slot       │───► POST /api/timeslots/book
│  3. Upload videos   │───► POST /api/upload-videos
└──────┬──────────────┘
       │
       ▼
┌─────────────┐
│ Slot now    │
│  BOOKED     │◄─── Atomic update prevents
│             │     double-booking
└──────┬──────┘
       │
       ▼
┌─────────────┐
│Confirmation │
│    Email    │
└─────────────┘
```

---

## 💾 Database Structure

```
TimeSlot Collection:
┌────────────────────────────────────────┐
│ _id: "abc123"                          │
│ date: 2024-03-15T00:00:00.000Z       │
│ startTime: "10:00"                     │
│ endTime: "11:00"                       │
│ duration: 60                           │
│ isBooked: true                         │
│ bookedBy: "xyz789" ─┐                 │
│ isAvailable: true   │                  │
│ consultationType: "discovery"          │
│ notes: "Video call"                    │
└─────────────────────┼──────────────────┘
                      │
                      │ references
                      │
                      ▼
        Appointment Collection:
        ┌────────────────────────────┐
        │ _id: "xyz789"              │
        │ ownerName: "John Smith"    │
        │ petName: "Buddy"           │
        │ timeSlotId: "abc123" ◄─────┘
        │ appointmentDate: 2024-03-15│
        │ status: "scheduled"        │
        │ ...                        │
        └────────────────────────────┘
```

---

## 🎨 UI Color Guide

### Calendar States
- 🟢 **Available Date** - Primary color (green dot)
- ⭕ **Today** - Accent ring
- ⚫ **Past/Unavailable** - Gray, disabled
- 🔵 **Selected Date** - Primary background

### Time Slot States
- 🟩 **Available Slot** - Primary background
- 🟦 **Selected Slot** - Primary gradient + checkmark
- ⬜ **Default** - Light background + hover

### Admin Panel
- 🟢 **Booked** - Green background
- 🟡 **Available** - Yellow/Accent badge
- 🔴 **Disabled** - Red background

---

## 📊 Statistics Dashboard

```
Admin sees real-time stats:

┌─────────────────────────────────────────────┐
│  Total Slots: 240                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100%     │
│                                              │
│  Available: 180                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━      75%         │
│                                              │
│  Booked: 52                                  │
│  ━━━━━━━━                        22%         │
│                                              │
│  Disabled: 8                                 │
│  ━━                              3%          │
└─────────────────────────────────────────────┘
```

---

## 🔐 Security Flow

```
Client Request:
  GET /api/timeslots/available
  ↓
  ✅ No auth needed (public info)
  ↓
  Returns: Available slots only


Admin Request:
  GET /api/admin/timeslots?key=neuropet-admin
  ↓
  Check: key === ADMIN_PASSWORD?
  ↓
  ✅ Yes → Return all slots + booking details
  ❌ No  → 401 Unauthorized


Booking Request:
  POST /api/timeslots/book
  { timeSlotId, appointmentId }
  ↓
  Atomic Update:
  findOneAndUpdate({
    _id: timeSlotId,
    isBooked: false ◄─── Only if not booked
  }, {
    isBooked: true,
    bookedBy: appointmentId
  })
  ↓
  ✅ Success → Slot booked
  ❌ Failed → Already booked (409)
```

---

## 🎯 Success Indicators

### Client Knows Booking Worked When:
1. ✅ Checkmark appears on selected slot
2. ✅ Confirmation box shows date/time
3. ✅ Payment completes successfully
4. ✅ Redirected to confirmation page
5. ✅ Email received

### Admin Knows System Working When:
1. ✅ Stats show correct counts
2. ✅ Booked slots show client names
3. ✅ Calendar updates in real-time
4. ✅ Can create/edit/delete slots
5. ✅ No errors in console

---

## 🎉 Visual Summary

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Admin     │────▶│  Time Slots  │◀────│    Client    │
│   Creates    │     │   Database   │     │    Books     │
│    Slots     │     └──────────────┘     │    Slots     │
└──────────────┘            │              └──────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │ Real-time    │
                    │ Availability │
                    │   Updates    │
                    └──────────────┘
```

**Result:** Beautiful, functional, race-condition-safe booking system! 🎊

---

Read `TIME-SLOTS-README.md` for quick start instructions!
