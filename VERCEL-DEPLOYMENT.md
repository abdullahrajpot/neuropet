# Vercel Deployment Guide

## 🚀 Deploying NeuroPet to Vercel

### Prerequisites
- Vercel account
- GitHub repository connected
- All environment variables ready

---

## ⚙️ Environment Variables Configuration

### Required Variables (Set in Vercel Dashboard)

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

#### 1. Database
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/neuropet?retryWrites=true&w=majority
```

#### 2. Security (CRITICAL)
```env
JWT_SECRET=<generate-strong-32-character-random-string>
ADMIN_PASSWORD=<strong-admin-password>
NEXT_PUBLIC_ADMIN_PASSWORD=<same-as-admin-password>
ADMIN_CREATION_KEY=<unique-key-for-creating-admin>
```

**Generate JWT_SECRET:**
```bash
# Use this command to generate a secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 3. Email (Resend)
```env
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.com
```

#### 4. Stripe Payment
```env
# Production keys (starts with pk_live_ and sk_live_)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

#### 5. Application
```env
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NODE_ENV=production
```

---

## 🔒 Security Checklist

### Before Deploying
- [ ] All environment variables set in Vercel (not in code)
- [ ] JWT_SECRET is strong (32+ characters, randomly generated)
- [ ] Stripe using LIVE keys (not test keys)
- [ ] Email FROM address is verified in Resend
- [ ] MongoDB connection string uses production cluster
- [ ] ADMIN_PASSWORD is strong and unique
- [ ] HTTPS will be enabled (Vercel does this automatically)

---

## 📝 Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Security improvements and production ready"
git push origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Deploy"

### 3. Set Environment Variables
1. Go to Project Settings → Environment Variables
2. Add all variables from above
3. Make sure to add them for **Production**, **Preview**, and **Development** environments

### 4. Redeploy
After adding environment variables:
1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"

---

## 🔍 Vercel Build Configuration

### Build Settings (Already Configured)
```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### Framework Preset
- **Framework**: Next.js
- **Node Version**: 20.x (automatic)

---

## ⚠️ Common Deployment Issues & Solutions

### Issue: "JWT_SECRET is required" Error
**Solution:** Add JWT_SECRET environment variable in Vercel dashboard

### Issue: Stripe webhook failures
**Solution:** 
1. Update webhook endpoint in Stripe dashboard
2. Set to: `https://your-domain.vercel.app/api/webhooks/stripe`

### Issue: MongoDB connection timeout
**Solution:**
1. Whitelist Vercel IP addresses in MongoDB Atlas
2. Or use `0.0.0.0/0` (all IPs) - less secure but works
3. In MongoDB Atlas: Network Access → Add IP Address

### Issue: Email not sending
**Solution:**
1. Verify domain in Resend dashboard
2. Update `EMAIL_FROM` to verified address
3. Check Resend API key is correct

### Issue: npm warnings during build
**Solution:** These warnings are normal and won't prevent deployment:
```
npm warn allow-scripts 2 packages have install scripts...
```
This is informational only and safe to ignore.

---

## 🌐 Custom Domain Setup

### 1. Add Domain in Vercel
1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., neuropet.com)

### 2. Configure DNS
Add these records to your DNS provider:

**For root domain (neuropet.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain (www.neuropet.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Update Environment Variables
After domain is active:
```env
NEXT_PUBLIC_APP_URL=https://neuropet.com
```

### 4. SSL Certificate
Vercel automatically provisions SSL certificate (HTTPS)
- No action needed
- Takes 1-2 minutes after DNS propagation

---

## 🧪 Post-Deployment Testing

### 1. Test Authentication
```bash
# Test login endpoint
curl -X POST https://your-domain.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"wrong","role":"admin"}'

# Should return 401 with rate limiting working
```

### 2. Test Rate Limiting
```bash
# Make 6 rapid requests
for i in {1..6}; do
  curl https://your-domain.vercel.app/api/auth/login \
    -X POST -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"test","role":"client"}'
done

# 6th request should return 429 Too Many Requests
```

### 3. Test Secure Cookies
1. Open browser DevTools → Network
2. Login to the application
3. Check response headers for:
   - `Set-Cookie: auth-token=...; HttpOnly; Secure; SameSite=Strict`

### 4. Test Payment Flow
1. Go to booking page
2. Fill out form
3. Select paid consultation type
4. Complete payment with Stripe test card:
   - Card: 4242 4242 4242 4242
   - Exp: Any future date
   - CVC: Any 3 digits
5. Verify payment processes correctly

---

## 📊 Monitoring & Logs

### Vercel Dashboard
- **Deployments**: View build logs and deployment history
- **Functions**: Monitor API route performance
- **Analytics**: Track page views and performance (if enabled)

### View Logs
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# View logs
vercel logs <project-name>
```

### Monitor Security Events
Check application logs for:
- Failed login attempts
- Rate limit violations
- Payment validation errors

Console logs will appear in Vercel Functions logs:
```
⚠️  Failed login: IP=..., Email=..., Reason=...
✅ Login successful: IP=..., Email=..., Role=...
```

---

## 🔄 Continuous Deployment

### Automatic Deployments
Every push to `main` branch triggers:
1. Build on Vercel
2. Run tests (if configured)
3. Deploy to production

### Preview Deployments
Every pull request creates:
1. Preview URL
2. Independent environment
3. Test before merging

### Rollback
If deployment has issues:
1. Go to Deployments tab
2. Find previous working deployment
3. Click "Promote to Production"

---

## 🎯 Performance Optimization

### Already Optimized
- ✅ Next.js automatic code splitting
- ✅ Image optimization with Next.js Image
- ✅ API routes are serverless functions
- ✅ Static pages cached at edge

### Additional Optimizations (Optional)
1. Enable Vercel Analytics
2. Configure caching headers
3. Use Vercel Edge Functions for auth
4. Enable ISR (Incremental Static Regeneration)

---

## 🆘 Troubleshooting

### Build Fails
1. Check Vercel build logs
2. Verify all environment variables are set
3. Test build locally: `npm run build`
4. Check for TypeScript errors

### Runtime Errors
1. Check Vercel Functions logs
2. Verify MongoDB connection
3. Check API route responses
4. Test API endpoints with curl

### SSL Issues
1. Wait for DNS propagation (24-48 hours)
2. Verify DNS records are correct
3. Contact Vercel support if persists

---

## 📞 Support

### Vercel Support
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support
- Status: https://vercel-status.com

### Application Issues
- Security: security@neuropet.com
- Technical: support@neuropet.com

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Code pushed to GitHub
- [ ] All tests passing locally
- [ ] Environment variables documented
- [ ] Security review completed
- [ ] Database migrations run (if any)

### Deployment
- [ ] Project created in Vercel
- [ ] GitHub repository connected
- [ ] All environment variables set
- [ ] Custom domain configured (if applicable)
- [ ] First deployment successful

### Post-Deployment
- [ ] Test authentication endpoints
- [ ] Test payment flow
- [ ] Verify secure cookies
- [ ] Test rate limiting
- [ ] Monitor logs for errors
- [ ] Update DNS (if custom domain)
- [ ] Verify SSL certificate active

---

## 🎉 Success!

Once all checks pass, your NeuroPet application is:
- ✅ Deployed to Vercel
- ✅ Secured with HTTPS
- ✅ Protected with rate limiting
- ✅ Ready for production traffic

**Live URL:** https://your-project.vercel.app

---

**Last Updated:** September 9, 2026
**Version:** 1.0
