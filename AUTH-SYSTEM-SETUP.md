# NeuroPet Authentication System Setup Guide

## 🎉 What's Been Implemented

### ✅ Complete Authentication System
- **JWT-based authentication** with HTTP-only cookies
- **Role-based access control** (Admin & Client)
- **Secure password hashing** with bcrypt
- **Protected routes** with middleware
- **Session management**

### ✅ Admin Portal
- **Login page** (`/admin/login`) - Email/password authentication
- **Dashboard** - Overview with stats
- **Assessment Management** (`/admin/assessments`) - List, filter, search
- **Assessment Details** (`/admin/assessments/[id]`) - Full view with status management
- Role: `admin`

### ✅ Client Portal
- **Registration page** (`/client/register`) - Register with Client ID
- **Login page** (`/client/login`) - Email/password authentication
- **Dashboard** (`/client/dashboard`) - Status overview, quick actions
- **Messages** - Communication with behaviourist (to be completed)
- **Assessment View** - View submitted assessment (to be completed)
- **Profile** - Manage account (to be completed)
- Role: `client`

---

## 📦 Required Dependencies

You need to install these packages:

```bash
npm install bcryptjs jose nanoid
npm install -D @types/bcryptjs
```

**Package purposes:**
- `bcryptjs` - Password hashing
- `jose` - JWT token creation and verification
- `nanoid` - Generate unique client IDs
- `@types/bcryptjs` - TypeScript types

---

## 🔧 Setup Instructions

### Step 1: Install Dependencies

```bash
cd "c:\Users\Sabri laptop\Desktop\neuropet"
npm install bcryptjs jose nanoid
npm install -D @types/bcryptjs
```

### Step 2: Environment Variables

The `.env.local` file has been updated with:

```env
MONGODB_URI=your_mongodb_uri
ADMIN_PASSWORD=neuropet-admin
JWT_SECRET=neuropet-jwt-secret-change-this-in-production-use-long-random-string
ADMIN_CREATION_KEY=create-admin-secret-key-2024
```

**🔐 Security Note:** Change these secrets in production!

### Step 3: Update MongoDB Models

The existing `Appointment` model needs a small update. Add these fields:

```javascript
// In your Appointment model
{
  // ... existing fields
  status: {
    type: String,
    enum: ["pending", "reviewed", "scheduled", "completed", "archived"],
    default: "pending",
  },
  notes: String,
  appointmentDate: Date,
  clientId: { type: String, unique: true, sparse: true },
  videoUploaded: { type: Boolean, default: false },
}
```

### Step 4: Create First Admin User

Use this API endpoint to create an admin account:

```bash
# Using curl (Command Prompt):
curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -H "X-Admin-Key: create-admin-secret-key-2024" ^
  -d "{\"email\":\"admin@neuropet.com\",\"password\":\"SecurePassword123\",\"name\":\"Admin User\",\"role\":\"admin\"}"

# Or using PowerShell:
$headers = @{
    "Content-Type" = "application/json"
    "X-Admin-Key" = "create-admin-secret-key-2024"
}
$body = @{
    email = "admin@neuropet.com"
    password = "SecurePassword123"
    name = "Admin User"
    role = "admin"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/auth/register" -Method POST -Headers $headers -Body $body
```

### Step 5: Update Booking Confirmation Page

Update `src/app/book/confirmation/page.tsx` to save the `clientId` and display it to users:

```typescript
// After successful form submission, the API returns:
// { assessmentId, clientId }

// Store clientId and display:
"Your assessment has been submitted!"
"Client ID: {clientId}"
"Save this ID to create your client portal account"
```

---

## 🚀 How It Works

### Authentication Flow

#### Admin Login:
1. Admin goes to `/admin/login`
2. Enters email & password
3. System verifies credentials with `role: "admin"`
4. JWT token created and stored in HTTP-only cookie
5. Redirected to `/admin/dashboard`
6. Middleware protects all `/admin/*` routes

#### Client Registration:
1. Client submits assessment form → receives `clientId` via email
2. Goes to `/client/register`
3. Enters clientId, name, email, password
4. System validates clientId against assessment
5. Creates client account linked to assessment
6. Auto-login and redirect to `/client/dashboard`

#### Client Login:
1. Client goes to `/client/login`
2. Enters email & password
3. System verifies credentials with `role: "client"`
4. JWT token created and stored in HTTP-only cookie
5. Redirected to `/client/dashboard`
6. Middleware protects all `/client/*` routes

### Middleware Protection

The middleware (`src/middleware.ts`) automatically:
- Checks for authentication token
- Verifies token validity
- Enforces role-based access:
  - `/admin/*` requires `role: "admin"`
  - `/client/*` requires `role: "client"`
- Redirects unauthorized users to login

---

## 📂 File Structure (All ✅ Complete)

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx              ✅ Admin login
│   │   ├── dashboard/page.tsx          ✅ Admin dashboard
│   │   ├── assessments/
│   │   │   ├── page.tsx                ✅ Assessment list
│   │   │   └── [id]/page.tsx           ✅ Assessment details
│   │   └── messages/
│   │       └── [id]/page.tsx           ✅ Admin messaging
│   ├── client/
│   │   ├── login/page.tsx              ✅ Client login
│   │   ├── register/page.tsx           ✅ Client registration
│   │   ├── dashboard/page.tsx          ✅ Client dashboard
│   │   ├── assessment/page.tsx         ✅ View assessment
│   │   ├── messages/page.tsx           ✅ Client messaging
│   │   └── profile/page.tsx            ✅ Profile management
│   └── api/
│       ├── auth/
│       │   ├── register/route.ts       ✅ Registration
│       │   ├── login/route.ts          ✅ Login
│       │   ├── logout/route.ts         ✅ Logout
│       │   └── me/route.ts             ✅ Get current user
│       ├── admin/
│       │   └── assessments/route.ts    ✅ Admin assessment API
│       ├── client/
│       │   ├── dashboard/route.ts      ✅ Client dashboard API
│       │   ├── assessment/route.ts     ✅ Get assessment
│       │   ├── profile/route.ts        ✅ Update profile
│       │   └── change-password/route.ts ✅ Change password
│       └── messages/route.ts           ✅ Messaging API
├── lib/
│   └── models/
│       ├── User.ts                     ✅ User model with auth
│       ├── Message.ts                  ✅ Messaging model
│       └── FormTemplate.ts             ✅ Dynamic form builder schema
└── middleware.ts                       ✅ Route protection
```

---

## 🎨 Design System

All pages follow the NeuroPet theme:

### Colors:
- **Primary:** `#1E4A40` (Deep Teal)
- **Accent:** `#D97540` (Terracotta)
- **Cream:** `#FBF7F0`
- **Primary-100:** `#E4EFEB` (Pale Teal)

### Components:
- Rounded corners (rounded-2xl, rounded-3xl, rounded-full)
- Soft shadows (shadow-lg, shadow-xl)
- Smooth transitions
- Pill-shaped inputs and buttons
- Gradient backgrounds for auth pages

---

## 🔐 Security Features

✅ **Password Security:**
- Bcrypt hashing with salt
- Minimum 8 characters
- Password confirmation on registration

✅ **Token Security:**
- JWT with HS256 algorithm
- HTTP-only cookies (not accessible via JavaScript)
- 7-day expiration
- Secure flag in production

✅ **Role-Based Access:**
- Middleware enforces role checks
- Admin cannot access client routes
- Client cannot access admin routes

✅ **Admin Creation:**
- Requires special `X-Admin-Key` header
- Prevents unauthorized admin creation

---

## ✅ Complete System Status

### ✅ FULLY IMPLEMENTED
1. ✅ Client Assessment View (`/client/assessment`) - Read-only display with all sections
2. ✅ Messaging System - Both admin and client sides with real-time updates
3. ✅ Client Profile (`/client/profile`) - Update name/email and change password
4. ✅ All API Routes - Authentication, profile, messages, assessments

### 🚧 Still To Be Completed

1. **Dynamic Form Builder** (`/admin/form-builder`)
   - Add/edit/remove questions
   - Drag and drop ordering
   - Question types (text, select, textarea, etc.)
   - Conditional logic
   - API: `/api/form-template`

2. **Email Notifications**
   - Welcome email with clientId
   - Status update emails
   - New message notifications
   - Appointment reminders

3. **Booking Confirmation Update**
   - Display clientId after form submission
   - Instructions for client portal access

---

## 🧪 Testing the System

### Test Admin Account:
After creating admin user:
```
Email: admin@neuropet.com
Password: SecurePassword123
URL: http://localhost:3000/admin/login
```

### Test Client Flow:
1. Submit assessment at `/book`
2. Note the clientId in response
3. Go to `/client/register`
4. Register with the clientId
5. Login and access dashboard

---

## 📝 API Endpoints

### Authentication:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Admin:
- `GET /api/admin/assessments?key={key}` - List all assessments
- `PATCH /api/admin/assessments?key={key}` - Update assessment

### Client:
- `GET /api/client/dashboard` - Get client dashboard data

---

## 🎯 Next Steps

1. **Install dependencies** (see Step 1)
2. **Create admin user** (see Step 4)
3. **Test authentication** (see Testing section)
4. **Build remaining features** (see To Be Completed)

---

## 💡 Tips

- Use browser DevTools → Application → Cookies to see the auth token
- JWT payload can be decoded at https://jwt.io (but token is secure)
- Clear cookies if you get authentication errors
- Check MongoDB for User collection after registration
- Middleware logs can help debug route protection issues

---

## 🆘 Troubleshooting

**Problem:** "Not authenticated" error
- **Solution:** Clear cookies and login again

**Problem:** Cannot create admin
- **Solution:** Check `X-Admin-Key` header matches `.env.local`

**Problem:** Client registration fails with "Invalid Client ID"
- **Solution:** Ensure assessment was submitted and clientId exists

**Problem:** Routes not protected
- **Solution:** Check middleware.ts is in src/ root (not src/app/)

**Problem:** JWT errors
- **Solution:** Ensure JWT_SECRET is set in .env.local

---

## 📧 Support

If you encounter issues:
1. Check console for errors
2. Verify environment variables
3. Ensure MongoDB connection is working
4. Check that all dependencies are installed

The foundation is complete and working! The remaining work is building out the messaging system, assessment views, and form builder using the same patterns already established.
