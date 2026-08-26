# Troubleshooting Guide

## 🔧 Current Issue: 500 Error on Form Submission

### Problem
Getting a 500 Internal Server Error when submitting the booking form.

### Solution
The Appointment model was updated with new fields, but the server needs to be restarted to pick up the changes.

**IMPORTANT: Restart your development server**

### How to Restart

#### Method 1: Using restart-dev.bat (Easiest)
```bash
restart-dev.bat
```

#### Method 2: Manual Restart
1. In your terminal, press `Ctrl + C` to stop the server
2. Wait for it to fully stop
3. Run `npm run dev` again

#### Method 3: Close Terminal and Start Fresh
1. Close the terminal window
2. Open a new terminal
3. Navigate to project: `cd "c:\Users\Sabri laptop\Desktop\neuropet"`
4. Start server: `npm run dev`

---

## ✅ After Restarting

Once the server is restarted:

1. Go to `http://localhost:3000/book`
2. Fill out the 9-step assessment form
3. Submit the form
4. You should see the confirmation page with your **Client ID**
5. Save that Client ID!
6. Click "Create Client Account" to register

---

## 🐛 Common Issues & Fixes

### Issue 1: Hydration Mismatch Warning
**Symptom:** Warning about hydration mismatch in console

**Cause:** Browser extensions (like Grammarly, ad blockers) modifying HTML

**Solution:** 
- This is just a warning, not an error
- The app will still work
- You can ignore it or disable browser extensions on localhost

### Issue 2: Module not found: 'jose', 'bcryptjs', or 'nanoid'
**Symptom:** Build error about missing modules

**Solution:**
```bash
npm install bcryptjs jose nanoid
npm install -D @types/bcryptjs
```
Or run: `install-dependencies.bat`

### Issue 3: MongoDB Connection Error
**Symptom:** Error about MONGODB_URI

**Cause:** Database connection issue

**Solution:**
- Check `.env.local` has MONGODB_URI set
- Verify MongoDB Atlas connection string is correct
- Check your IP is whitelisted in MongoDB Atlas

### Issue 4: Cannot create admin user
**Symptom:** 401 Unauthorized when creating admin

**Solution:**
- Check `X-Admin-Key` header matches `.env.local` value
- Current key: `create-admin-secret-key-2024`
- Make sure server is running

### Issue 5: Client registration fails
**Symptom:** "Invalid Client ID" error

**Cause:** Client ID doesn't exist in database

**Solution:**
- First submit the booking form to generate a Client ID
- Use that exact Client ID (case-sensitive) when registering
- Check the confirmation page after form submission

### Issue 6: JWT/Authentication errors
**Symptom:** "Not authenticated" or token errors

**Solution:**
- Clear browser cookies for localhost
- Check JWT_SECRET is set in `.env.local`
- Logout and login again

### Issue 7: 500 Error after code changes
**Symptom:** API routes returning 500 errors

**Cause:** Server needs restart to pick up model/code changes

**Solution:**
- Always restart server after changing:
  - Database models
  - API routes
  - Environment variables
  - Middleware

---

## 📋 Verification Checklist

Before testing the system, verify:

- [ ] Dependencies installed (`bcryptjs`, `jose`, `nanoid`)
- [ ] `.env.local` has all required variables
- [ ] MongoDB connection string is correct
- [ ] Development server is running (`npm run dev`)
- [ ] Server restarted after any model changes
- [ ] Browser is on `http://localhost:3000`

---

## 🔍 How to Check Server Logs

When you get an error:

1. Look at your terminal where `npm run dev` is running
2. Find the error message with stack trace
3. Common errors:
   - `ValidationError` - Missing required fields
   - `MongoError` - Database connection issue
   - `TypeError` - Code/type mismatch
   - Module not found - Missing package

Example of what to look for:
```
POST /api/appointments 500 in 234ms
Error: ValidationError: Appointment validation failed: ...
```

---

## 🧪 Testing After Fix

### Test 1: Submit Booking Form
1. Go to `http://localhost:3000/book`
2. Fill all required fields in 9 steps
3. Check privacy consent
4. Submit
5. ✅ Should see confirmation with Client ID

### Test 2: Client Registration
1. Copy Client ID from confirmation
2. Click "Create Client Account"
3. Fill registration form
4. Submit
5. ✅ Should auto-login to dashboard

### Test 3: Client Login
1. Logout from dashboard
2. Go to `/client/login`
3. Enter email and password
4. ✅ Should login successfully

### Test 4: Admin Access
1. Create admin user (use `create-admin.bat`)
2. Go to `/admin/login`
3. Enter admin credentials
4. ✅ Should see admin dashboard

---

## 🆘 Still Having Issues?

### Step-by-step debugging:

1. **Check Environment Variables**
   ```bash
   # In terminal
   echo %MONGODB_URI%
   ```
   Should show your MongoDB connection string

2. **Verify Dependencies**
   ```bash
   npm list bcryptjs jose nanoid
   ```
   Should show versions installed

3. **Test MongoDB Connection**
   - Go to MongoDB Atlas
   - Check cluster is running
   - Verify connection string
   - Test connection in MongoDB Compass

4. **Clear Everything and Start Fresh**
   ```bash
   # Stop server
   Ctrl + C
   
   # Clear node modules cache
   npm cache clean --force
   
   # Reinstall dependencies
   npm install
   
   # Restart server
   npm run dev
   ```

5. **Check Browser Console**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for error messages
   - Check Network tab for failed requests

---

## 💡 Pro Tips

1. **Always restart server after:**
   - Changing models
   - Updating API routes
   - Modifying .env.local
   - Installing new packages

2. **Clear browser cache if:**
   - CSS isn't updating
   - Old code is running
   - Cookies seem stuck

3. **Check both terminals:**
   - Server terminal for backend errors
   - Browser console for frontend errors

4. **Use the batch scripts:**
   - `restart-dev.bat` - Quick restart
   - `create-admin.bat` - Easy admin creation
   - `install-dependencies.bat` - Install packages

---

## 📞 Quick Reference

### Server Commands
- Start: `npm run dev`
- Stop: `Ctrl + C`
- Build: `npm run build`
- Restart: `restart-dev.bat`

### URLs
- Home: `http://localhost:3000`
- Booking: `http://localhost:3000/book`
- Admin Login: `http://localhost:3000/admin/login`
- Client Login: `http://localhost:3000/client/login`
- Client Register: `http://localhost:3000/client/register`

### Environment Variables
- `MONGODB_URI` - Database connection
- `JWT_SECRET` - Token signing
- `ADMIN_CREATION_KEY` - Admin security
- (Located in `.env.local`)

---

**Remember:** Most issues are solved by simply restarting the development server! 🔄
