# Dog Behavior Services Update - Implementation Guide

## ✅ Completed

### 1. Created New Data Structure
- **File**: `src/data/dogBehaviorServices.ts`
- **Contains**:
  - 4 service plans (Free Discovery Call, Behaviour Essentials £270, Behaviour Intensive £470, Puppy Foundations £220)
  - Common behavior issues list
  - Why virtual training works benefits
  - Tip options (£5, £10, £15)

### 2. Created New Pricing Page
- **File**: `src/app/(public)/pricing/page.tsx`
- **Features**:
  - Hero section with stats and reviews
  - Free discovery call CTA
  - 4 pricing cards with features
  - Common behavior issues section
  - Why virtual training works section
  - Final CTA section

### 3. Created Tip Component
- **File**: `src/components/booking/TipSection.tsx`
- **Features**:
  - Optional tip selection (£5, £10, £15, or no tip)
  - Coffee/heart icon theme
  - Animated selection feedback
  - Clear messaging that tip is optional

## 🔄 Next Steps to Complete

### 4. Update Main Navigation
**File**: Check your navigation component (likely in `src/components/layout/Header.tsx` or similar)

Update navigation links to include:
```tsx
<Link href="/pricing">Pricing & Plans</Link>
<Link href="/services">Dog Behavior Services</Link>
<Link href="/book">Book Consultation</Link>
```

### 5. Update Homepage Services Section
**File**: `src/components/home/sections.tsx` or `src/app/(public)/page.tsx`

Replace current services section with:
- Focus on dog behavior only
- Show 3-4 key services
- Link to pricing page
- Emphasize free discovery call

### 6. Update Booking Form
**File**: `src/app/(public)/book/page.tsx`

Changes needed:
1. Add query parameter detection for `?type=discovery` and `?plan=behavior-essentials`
2. Add tip selection step BEFORE final submission
3. Update form to focus on dog behavior assessment
4. Add consultation type selection at start
5. Include tip amount in submission data

Example structure:
```tsx
const [tipAmount, setTipAmount] = useState<number | null>(null);
const [consultationType, setConsultationType] = useState<string>('discovery');

// In your form step before submission:
{step === FINAL_STEP - 1 && (
  <TipSection selectedTip={tipAmount} onTipSelect={setTipAmount} />
)}

// Include in submission:
const submissionData = {
  ...formData,
  consultationType,
  tipAmount,
  totalAmount: calculateTotal(consultationType, tipAmount),
};
```

### 7. Update Services Page Content
**File**: `src/app/(public)/services/page.tsx` or `src/app/(public)/training-behaviour/page.tsx`

Restructure to show:
- Dog behavior focus only
- Remove cat and other pet services
- Add program comparison table
- Link to pricing page
- Show process flow (Discovery Call → Choose Plan → Start Program)

### 8. Create Process Flow Section

Add to services or homepage:

```
1. Book Free Discovery Call
   ↓
2. Discuss Your Dog's Needs
   ↓
3. Choose Your Program
   ↓
4. Start Training with Daily Support
```

### 9. Update API Route for Tips
**File**: `src/app/api/appointments/route.ts`

Add tip handling:
```typescript
export async function POST(request: Request) {
  const body = await request.json();
  const { tipAmount, consultationType, ...restData } = body;
  
  const appointment = await Appointment.create({
    ...restData,
    consultationType,
    tipAmount: tipAmount || 0,
    status: consultationType === 'discovery' ? 'discovery-scheduled' : 'pending',
    clientId: nanoid(10).toUpperCase(),
  });
  
  // ... rest of code
}
```

### 10. Update Database Model
**File**: `src/models/Appointment.ts`

Add fields:
```typescript
consultationType: {
  type: String,
  enum: ['discovery', 'behavior-essentials', 'behavior-intensive', 'puppy-foundations'],
  default: 'discovery'
},
tipAmount: {
  type: Number,
  default: 0
},
```

## 📋 Quick Implementation Checklist

- [x] Created pricing page
- [x] Created tip component
- [x] Created service data structure
- [ ] Update navigation menu
- [ ] Add tip section to booking form
- [ ] Update booking form to handle consultation types
- [ ] Update services page content
- [ ] Add process flow visualization
- [ ] Update API to handle tips
- [ ] Update database model
- [ ] Test full booking flow
- [ ] Deploy changes

## 🎨 Design Consistency

All new components follow your existing theme:
- Primary color: `#1E4A40` (primary-900/700)
- Accent color: `#D97540` (accent-600)
- Cream background: `#FDF8F3`
- Typography: Poppins (display), Open Sans (body)
- Border radius: Rounded (2xl, 3xl for cards)
- Shadows: Soft, layered

## 📱 Mobile Responsive

All components are fully responsive with:
- Grid layouts that stack on mobile
- Touch-friendly buttons (min 44px height)
- Readable font sizes
- Proper spacing

## 🚀 To Go Live

1. Complete remaining checklist items
2. Test booking flow with tip selection
3. Verify email notifications include tip amount
4. Update environment variables on Vercel
5. Deploy and test on production
