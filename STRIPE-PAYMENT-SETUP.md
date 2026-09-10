# Stripe Payment Integration Setup Guide

## Overview
This guide will help you set up Stripe payment integration for your booking system. The system automatically detects free consultations and only shows payment for paid plans.

## Features Implemented
- ✅ **Automatic Payment Detection**: Free consultations skip payment
- ✅ **Secure Card Payments**: Stripe Elements integration
- ✅ **Multiple Payment Methods**: Cards, Apple Pay, Google Pay (auto-detected)
- ✅ **Payment Status Display**: Real-time feedback
- ✅ **Consultation Type Integration**: Prices pulled from selected plan
- ✅ **PCI Compliance**: Stripe handles all card data

## Installation Steps

### 1. Install Stripe Dependencies
Run the installation script:
```bash
install-stripe.bat
```

Or manually install:
```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

### 2. Get Your Stripe API Keys

1. **Create a Stripe Account** (if you don't have one):
   - Go to https://dashboard.stripe.com/register
   - Complete the registration process

2. **Get Your API Keys**:
   - Go to https://dashboard.stripe.com/apikeys
   - Copy your **Publishable key** (starts with `pk_test_`)
   - Copy your **Secret key** (starts with `sk_test_`)

3. **Add Keys to `.env.local`**:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   ```

### 3. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the booking page: `http://localhost:3000/book`

3. Fill out the form and select a **paid consultation** type

4. Use Stripe's test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **Requires Authentication**: `4000 0025 0000 3155`
   - **Expiry**: Any future date
   - **CVC**: Any 3 digits
   - **ZIP**: Any 5 digits

## How It Works

### Booking Flow with Payment

```
User selects plan → Fills form (9 steps) → Payment step appears → Stripe payment → Confirmation
```

### Payment Logic

1. **Free Consultation (Discovery Call)**:
   - Amount: £0
   - Payment step shows "Free Consultation" message
   - No credit card required
   - Books immediately

2. **Paid Consultations**:
   - Behaviour Essentials: £270
   - Behaviour Intensive: £470
   - Puppy Foundations: £220
   - Payment step shows Stripe card form
   - Requires successful payment before booking

### URL Parameters

The booking page detects the plan from URL:
- `/book?type=discovery` → Free consultation
- `/book?plan=behavior-essentials` → £270 plan
- `/book?plan=behavior-intensive` → £470 plan
- `/book?plan=puppy-foundations` → £220 plan

## Files Created

### API Routes
- `src/app/api/create-payment-intent/route.ts` - Creates Stripe payment intents

### Components
- `src/components/booking/PaymentStep.tsx` - Payment step wrapper
- `src/components/booking/StripePaymentForm.tsx` - Stripe payment form

### Scripts
- `install-stripe.bat` - Installation script

## Production Deployment

### 1. Switch to Live Keys

In `.env.local` (or your production environment):
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
STRIPE_SECRET_KEY=sk_live_your_live_key
```

### 2. Activate Your Stripe Account

1. Go to https://dashboard.stripe.com/account/onboarding
2. Complete the business verification process
3. Provide:
   - Business details
   - Banking information
   - Tax information

### 3. Enable Payment Methods

In your Stripe Dashboard:
1. Go to Settings → Payment methods
2. Enable desired payment methods:
   - Cards (enabled by default)
   - Apple Pay
   - Google Pay
   - Link (Stripe's one-click checkout)

### 4. Set Up Webhooks (Optional but Recommended)

1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy the webhook signing secret
5. Add to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

## Pricing Configuration

Prices are defined in two places:

### 1. Pricing Page (`src/app/(public)/pricing/page.tsx`)
Shows the plan cards with prices

### 2. Booking Page Logic
Update the `getPlanDetails()` function in your booking page to match your prices:

```typescript
function getPlanDetails(plan: string) {
  const plans = {
    'discovery': { name: 'Free Discovery Call', price: 0 },
    'behavior-essentials': { name: 'Behaviour Essentials', price: 270 },
    'behavior-intensive': { name: 'Behaviour Intensive', price: 470 },
    'puppy-foundations': { name: 'Puppy Foundations', price: 220 },
  };
  return plans[plan] || plans['discovery'];
}
```

## Security Considerations

✅ **Secure by Design**:
- Card details never touch your server
- Stripe handles PCI compliance
- Payment intents prevent duplicate charges
- All data encrypted in transit

✅ **Environment Variables**:
- Never commit `.env.local` to git
- Use separate test/live keys
- Rotate keys if exposed

## Troubleshooting

### "Stripe is not defined" Error
- Make sure you ran `install-stripe.bat`
- Restart your dev server after installation

### "Invalid API Key" Error
- Check your `.env.local` has correct keys
- Ensure keys match environment (test vs live)
- Verify no extra spaces in key values

### Payment Form Not Showing
- Check browser console for errors
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- Make sure you're selecting a paid plan

### Payment Fails in Production
- Verify you switched to live keys
- Ensure Stripe account is activated
- Check customer's bank doesn't decline

## Testing Checklist

- [ ] Install dependencies successfully
- [ ] Add Stripe keys to `.env.local`
- [ ] Free consultation books without payment
- [ ] Paid consultations show Stripe form
- [ ] Test card `4242 4242 4242 4242` works
- [ ] Declined card shows error message
- [ ] Payment success redirects to confirmation
- [ ] Booking data saved correctly

## Support

### Stripe Dashboard
- View payments: https://dashboard.stripe.com/payments
- View customers: https://dashboard.stripe.com/customers
- View logs: https://dashboard.stripe.com/logs

### Stripe Documentation
- API Docs: https://stripe.com/docs/api
- Testing: https://stripe.com/docs/testing
- Payment Intents: https://stripe.com/docs/payments/payment-intents

### Get Help
- Stripe Support: https://support.stripe.com
- Stripe Status: https://status.stripe.com

## Next Steps

1. Run `install-stripe.bat`
2. Get your Stripe API keys
3. Add keys to `.env.local`
4. Test with card `4242 4242 4242 4242`
5. Complete a test booking
6. Review payment in Stripe Dashboard

Congratulations! Your payment system is ready to accept bookings. 🎉
