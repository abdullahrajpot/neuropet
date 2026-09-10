# Security Implementation - NeuroPet

## Status: IN PROGRESS

Last Updated: September 2026

---

## ✅ Completed Security Improvements

### 1. Authentication Architecture
**Status: ✅ COMPLETED**

#### JWT Middleware (`src/middleware/auth.ts`)
- ✅ **No fallback secrets** - Application fails to start without proper `JWT_SECRET`
- ✅ Centralized authentication logic in `verifyAuth()`
- ✅ Role-based helper functions: `requireAuth()`, `requireAdmin()`, `requireClient()`
- ✅ Resource ownership validation: `canAccessResource()`, `canAccessAssessment()`
- ✅ Supports both Bearer token and cookie authentication

**Security Features:**
```typescript
// BEFORE (INSECURE):
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

// AFTER (SECURE):
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required");
}
```

### 2. Client Endpoints - JWT-Based Authentication
**Status: ✅ COMPLETED**

All client endpoints now:
- ✅ Derive user ID from verified JWT token
- ✅ No user IDs accepted from client requests
- ✅ Use `requireClient()` middleware for authentication
- ✅ Validate resource ownership before access

#### Updated Endpoints:

##### `/api/client/dashboard` (GET)
- ✅ Removed cookie-based auth with fallback secret
- ✅ Uses `requireClient()` middleware
- ✅ Derives `assessmentId` from JWT payload
- ✅ User can only access their own assessment

##### `/api/client/profile` (PATCH)
- ✅ Uses `requireClient()` middleware
- ✅ Updates user profile using `userId` from JWT
- ✅ Added email format validation
- ✅ Prevents email hijacking (checks if email already exists)

##### `/api/client/change-password` (POST)
- ✅ Uses `requireClient()` middleware
- ✅ Enhanced password strength validation:
  - Minimum 8 characters
  - Requires uppercase letter
  - Requires lowercase letter
  - Requires number
- ✅ Prevents password reuse
- ✅ Increased bcrypt cost factor to 12

##### `/api/client/upgrade-plan` (POST)
- ✅ Uses `requireClient()` middleware
- ✅ Derives `assessmentId` from JWT
- ✅ Validates consultation type and pricing server-side
- ✅ Verifies payment intent with Stripe API
- ✅ Prevents price manipulation

### 3. Payment Security
**Status: ✅ COMPLETED**

#### `/api/create-payment-intent` (POST)
- ✅ **Server-side price validation** - All amounts validated against hardcoded prices
- ✅ No fallback for Stripe key - requires proper configuration
- ✅ Validates consultation types
- ✅ Validates tip amounts (0-100 range)
- ✅ Email format validation
- ✅ Prevents price manipulation attacks

**Price Validation:**
```typescript
const CONSULTATION_PRICES: Record<string, number> = {
  'discovery': 0,
  'behavior-essentials': 270,
  'behavior-intensive': 470,
  'puppy-foundations': 220,
};

// Validates client-provided amount matches expected price
if (Math.abs(amount - expectedTotalAmount) > 0.01) {
  return error("Invalid payment amount");
}
```

#### Payment Verification in Upgrade Plan
- ✅ Retrieves payment intent from Stripe to verify
- ✅ Validates payment status is 'succeeded'
- ✅ Verifies paid amount matches expected amount
- ✅ Prevents fake payment IDs

### 4. UI - Authentication Pages
**Status: ✅ COMPLETED**

- ✅ Admin login page uses `(auth)` folder structure
- ✅ Sidebar does not show on authentication pages
- ✅ Proper layout separation between authenticated and unauthenticated pages

---

## 🔄 In Progress / Remaining Tasks

### 5. Secure Appointment Endpoints
**Status: ⏳ PENDING**

#### What Needs to be Done:
- Ensure appointments can only be created by authenticated users
- Add rate limiting to prevent spam appointments
- Validate all input fields (email, phone, pet details)
- Prevent duplicate appointments within timeframe
- Add CSRF protection

### 6. Authorization Checks
**Status: ⏳ PENDING**

#### What Needs to be Done:
- Audit all admin endpoints for proper role checking
- Ensure clients can't access admin resources
- Verify admin can access all resources but clients only their own
- Add logging for unauthorized access attempts

### 7. Rate Limiting
**Status: ⏳ PENDING**

#### Critical Endpoints Needing Rate Limiting:
- `/api/auth/login` - Prevent brute force
- `/api/auth/register` - Prevent spam accounts
- `/api/appointments` - Prevent booking spam
- `/api/create-payment-intent` - Prevent abuse

**Recommended Implementation:**
```typescript
// Use package like 'rate-limiter-flexible' or implement custom
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 attempts
  duration: 60 * 15, // per 15 minutes
});
```

### 8. Session Management
**Status: ⏳ PENDING**

#### Current Issues:
- Tokens stored in cookies but need HttpOnly and Secure flags
- No token refresh mechanism
- No session expiration handling

#### What Needs to be Done:
```typescript
// Set secure cookie flags
response.cookies.set('auth-token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
});
```

### 9. Input Validation & Sanitization
**Status: ⏳ PENDING**

#### What Needs to be Done:
- Add validation library (e.g., Zod, Joi, or Yup)
- Validate all user inputs
- Sanitize HTML inputs
- Prevent SQL/NoSQL injection
- Validate file uploads (video files)
- Maximum length checks on all string fields

### 10. Additional Security Measures
**Status: ⏳ PENDING**

#### Recommended:
- **CSRF Protection** - Add CSRF tokens for state-changing operations
- **Content Security Policy** - Set proper CSP headers
- **XSS Protection** - Sanitize all user-generated content
- **SQL Injection** - Using Mongoose protects against this, but validate inputs
- **Audit Logging** - Log all sensitive operations
- **2FA** - Optional two-factor authentication for admin accounts

---

## 🔒 Security Best Practices Applied

### ✅ Authentication
- [x] JWT tokens with no fallback secrets
- [x] Proper token verification
- [x] Role-based access control (RBAC)
- [x] Resource ownership validation

### ✅ Authorization
- [x] Users can only access their own data
- [x] Admins can access all data
- [x] Middleware enforces authorization

### ✅ Payment Security
- [x] Server-side price validation
- [x] Payment verification with Stripe
- [x] No client-side amount trusted
- [x] Prevents price manipulation

### ✅ Password Security
- [x] bcrypt with cost factor 12
- [x] Strong password requirements
- [x] Prevents password reuse
- [x] Current password verification before change

### ⏳ Pending
- [ ] Rate limiting on auth endpoints
- [ ] CSRF protection
- [ ] Session management improvements
- [ ] Input validation library
- [ ] Content Security Policy headers
- [ ] Audit logging

---

## 📊 Security Test Checklist

### Authentication Tests
- [x] Cannot access protected routes without token
- [x] Invalid token is rejected
- [x] Expired token is rejected
- [x] User can only access their own resources
- [ ] Rate limiting prevents brute force
- [ ] Session expires after inactivity

### Authorization Tests
- [x] Client cannot access admin endpoints
- [x] Client cannot access another client's data
- [x] Admin can access all resources
- [ ] Unauthorized access is logged

### Payment Tests
- [x] Cannot manipulate prices
- [x] Payment verification works
- [x] Invalid payment intents rejected
- [ ] Refund authorization works
- [ ] Payment webhooks are secure

### Input Validation Tests
- [x] Email format validated
- [x] Password strength enforced
- [ ] All inputs have max length
- [ ] Special characters handled safely
- [ ] File uploads validated

---

## 🚀 Deployment Security Checklist

### Environment Variables
```env
# REQUIRED - No fallbacks allowed
JWT_SECRET=<strong-random-string>
STRIPE_SECRET_KEY=sk_live_...
MONGODB_URI=mongodb+srv://...
ADMIN_PASSWORD=<strong-password>

# Email
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.com

# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

### Production Configuration
- [ ] HTTPS enabled (enforce SSL)
- [ ] Environment variables properly set
- [ ] No default/fallback secrets
- [ ] Secure cookie flags enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Error messages don't leak sensitive info
- [ ] Logging configured (but no sensitive data logged)

### Pre-Deployment Checklist
1. [ ] All environment variables set
2. [ ] JWT_SECRET is strong (min 32 characters)
3. [ ] Stripe in live mode with live keys
4. [ ] MongoDB connection string is secure
5. [ ] Admin password is strong
6. [ ] HTTPS certificates valid
7. [ ] Security headers configured
8. [ ] Rate limiting enabled
9. [ ] Audit logging enabled
10. [ ] Backup strategy in place

---

## 🛡️ Security Architecture

### Request Flow
```
Client Request
    ↓
Rate Limiter (if enabled)
    ↓
JWT Verification (middleware/auth.ts)
    ↓
req.user attached (contains: userId, role, email, etc.)
    ↓
Authorization Check (role-based)
    ↓
Resource Ownership Validation
    ↓
Input Validation
    ↓
Business Logic
    ↓
Response
```

### Authentication Flow
```
Login Request
    ↓
Validate credentials (bcrypt compare)
    ↓
Generate JWT (includes userId, role, assessmentId)
    ↓
Set HttpOnly Cookie
    ↓
Return user data (no sensitive info)
```

### Payment Flow
```
Client Submits Amount
    ↓
Server Validates Amount (against hardcoded prices)
    ↓
Create Stripe Payment Intent (server-validated amount)
    ↓
Client Completes Payment
    ↓
Server Verifies Payment with Stripe API
    ↓
Update Database (only if payment verified)
```

---

## 🔍 Known Limitations

1. **No Rate Limiting Yet** - Vulnerable to brute force attacks
2. **Session Management** - Tokens don't refresh, no sliding expiration
3. **No CSRF Protection** - State-changing operations not CSRF-protected
4. **Limited Input Validation** - Only basic validation, no comprehensive validation library
5. **No 2FA** - Admin accounts don't have two-factor authentication option
6. **No Audit Logs** - Suspicious activities not logged
7. **File Upload** - Video upload security needs review

---

## 📞 Security Contact

For security issues, please contact:
- **Email**: security@neuropet.com
- **Report vulnerabilities privately** before public disclosure

---

## 🎯 Next Steps

### Immediate (Critical)
1. Add rate limiting to auth endpoints
2. Implement secure session management
3. Add comprehensive input validation

### Short Term (Important)
4. Add CSRF protection
5. Implement audit logging
6. Add security headers (CSP, etc.)

### Long Term (Nice to Have)
7. Add 2FA for admin accounts
8. Implement API versioning
9. Add security scanning in CI/CD
10. Regular security audits

---

**Last Updated:** September 9, 2026
**Version:** 1.0
**Status:** In Progress - Core security implemented, refinements pending
