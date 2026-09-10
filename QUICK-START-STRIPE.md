# Quick Start - Stripe Payment Integration

## 🚀 3-Minute Setup

Follow these steps to get Stripe payments working:

### ✅ Step 1: Install Dependencies (30 seconds)
```bash
install-stripe.bat
```
Wait for installation to complete.

### ✅ Step 2: Get Stripe Keys (1 minute)
1. Go to https://dashboard.stripe.com/register (sign up if needed)
2. Click "Developers" → "API keys"
3. Copy both keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`) - Click "Reveal" first

### ✅ Step 3: Add Keys to .env.local (30 seconds)
Open `.env.local` file and update these lines:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_paste_your_key_here
STRIPE_SECRET_KEY=sk_test_paste_your_key_here
```

### ✅ Step 4: Restart Server (30 seconds)
```bash
# Press Ctrl+C to stop current server
npm run dev
```

### ✅ Step 5: Test It! (1 minute)

**Test Free Booking:**
1. Go to: http://localhost:3000/book?type=discovery
2. Fill form quickly
3. Should complete without payment ✅

**Test Paid Booking:**
1. Go to: http://localhost:3000/book?plan=behavior-essentials
2. Fill form
3. Use test card: **4242 4242 4242 4242**
4. Expiry: **12/25**
5. CVC: **123**
6. ZIP: **12345**
7. Payment should succeed ✅

## 🎯 That's It!

Your payment system is now live (in test mode).

## 📊 View Test Payments
https://dashboard.stripe.com/test/payments

## 🔄 When Ready for Production
1. Complete Stripe account verification
2. Replace `pk_test_` and `sk_test_` with `pk_live_` and `sk_live_` keys
3. Deploy to production

---

## 🆘 Having Issues?

### Installation Failed?
```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

### Keys Not Working?
- Make sure no spaces in .env.local
- Restart dev server after adding keys
- Check you copied both keys correctly

### Payment Form Not Showing?
- Selected a paid plan (not discovery)?
- Browser console shows errors?
- Try different browser

### Test Card Declined?
- Use exactly: 4242 4242 4242 4242
- Future expiry date
- Any 3-digit CVC

## 📚 Full Documentation
See `STRIPE-INTEGRATION-COMPLETE.md` for detailed information.

---

**Need help? Check the Stripe Dashboard logs at:**
https://dashboard.stripe.com/test/logs
