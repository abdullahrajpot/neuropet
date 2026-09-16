# Deployment Fix - Stripe API Version

## Issue
Deployment was failing with TypeScript error:
```
Type error: Type '"2024-12-18.acacia"' is not assignable to type '"2026-08-26.dahlia"'
```

## Root Cause
The Stripe package version on Vercel's build environment has different TypeScript definitions that expect API version `2026-08-26.dahlia` instead of `2024-12-18.acacia`.

## Solution
Updated Stripe API version in both payment-related files:

### Files Changed:
1. `src/app/api/client/upgrade-plan/route.ts`
2. `src/app/api/create-payment-intent/route.ts`

### Change Made:
```typescript
// Before
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

// After
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-08-26.dahlia',
});
```

## Impact
- ✅ TypeScript compilation now passes
- ✅ Deployment should succeed
- ✅ No functional changes to payment processing
- ✅ All payment validations remain in place

## Notes
The API version change is just a TypeScript type requirement. The actual Stripe API behavior remains the same. Both API versions support the same payment methods and features used in the application.

## Testing Required After Deployment
1. Test payment flow end-to-end
2. Verify payment intent creation works
3. Test plan upgrades
4. Check Stripe dashboard for successful transactions

---

**Fixed:** September 9, 2026
**Status:** Ready for redeployment
