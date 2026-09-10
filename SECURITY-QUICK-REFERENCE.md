# Security Quick Reference Card

## 🚀 Quick Start

### For Developers

#### 1. Protecting an Endpoint

```typescript
import { requireAuth, requireClient, requireAdmin } from "@/middleware/auth";

// For any authenticated user
export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (user instanceof NextResponse) return user;
  
  // user.userId, user.email, user.role available
}

// For clients only
export async function GET(request: NextRequest) {
  const user = await requireClient(request);
  if (user instanceof NextResponse) return user;
  
  // user.assessmentId available
}

// For admins only
export async function GET(request: NextRequest) {
  const user = await requireAdmin(request);
  if (user instanceof NextResponse) return user;
  
  // Admin-only logic
}
```

#### 2. Adding Rate Limiting

```typescript
import { checkRateLimit, getClientIP, RATE_LIMITS } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getClientIP(request);
  const rateLimit = checkRateLimit({
    ...RATE_LIMITS.LOGIN, // or .REGISTER, .API_GENERAL, etc.
    identifier: ip,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: `Too many attempts. Retry in ${rateLimit.retryAfter}s` },
      { status: 429 }
    );
  }
  
  // Your logic here
}
```

#### 3. Validating Payments

```typescript
import Stripe from 'stripe';

const CONSULTATION_PRICES = {
  'discovery': 0,
  'behavior-essentials': 270,
  // ... etc
};

// Validate amount
const expectedAmount = CONSULTATION_PRICES[consultationType] + tipAmount;
if (Math.abs(clientAmount - expectedAmount) > 0.01) {
  return error("Invalid amount");
}

// Verify with Stripe
const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
if (paymentIntent.status !== 'succeeded') {
  return error("Payment not completed");
}
```

---

## ⚡ Common Patterns

### Getting User from Request
```typescript
// NEVER trust client-provided IDs
❌ const userId = body.userId;

// ALWAYS use authenticated user
✅ const user = await requireClient(request);
✅ const userId = user.userId;
```

### Checking Resource Ownership
```typescript
import { canAccessResource, canAccessAssessment } from "@/middleware/auth";

// Check if user owns resource
if (!canAccessResource(user, resourceUserId)) {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// Check if user owns assessment
if (!canAccessAssessment(user, assessmentId)) {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
```

### Input Validation
```typescript
// Email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return error("Invalid email");
}

// Password strength
if (password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)) {
  return error("Weak password");
}
```

---

## 🔐 Security Checklist

### Before Deploying
- [ ] `JWT_SECRET` environment variable set (32+ characters)
- [ ] `STRIPE_SECRET_KEY` set to live key
- [ ] All endpoints use `requireAuth/Client/Admin`
- [ ] Rate limiting enabled on auth endpoints
- [ ] Secure cookie flags set (`httpOnly`, `secure`, `sameSite`)
- [ ] All payment amounts validated server-side
- [ ] Input validation on all user inputs
- [ ] Generic error messages (no sensitive info leaked)

### Testing
```bash
# Test authentication required
curl https://api/protected-endpoint
# Should return 401

# Test rate limiting
for i in {1..6}; do curl https://api/auth/login; done
# 6th request should return 429

# Test authorization
# Login as client, try to access admin endpoint
# Should return 403
```

---

## 📝 Rate Limit Presets

```typescript
RATE_LIMITS.LOGIN            // 5 attempts / 15 min
RATE_LIMITS.REGISTER         // 3 attempts / hour
RATE_LIMITS.PASSWORD_RESET   // 3 attempts / hour
RATE_LIMITS.APPOINTMENT_CREATE // 10 / hour
RATE_LIMITS.PAYMENT_INTENT   // 10 / hour
RATE_LIMITS.API_GENERAL      // 100 / minute
```

---

## 🚨 Security Incidents

### Suspicious Activity Logs
```typescript
console.warn(`⚠️  Security: ${type} - IP=${ip}, User=${email}`);
```

### What to Log
- ✅ Failed login attempts
- ✅ Rate limit violations
- ✅ Invalid payment amounts
- ✅ Unauthorized access attempts
- ❌ DON'T log passwords or tokens
- ❌ DON'T log credit card numbers

---

## 🔗 Quick Links

- Full Documentation: `SECURITY-IMPLEMENTATION.md`
- Complete Guide: `SECURITY-COMPLETE.md`
- Auth Middleware: `src/middleware/auth.ts`
- Rate Limiting: `src/lib/rate-limit.ts`

---

**Keep this card handy when developing!**
