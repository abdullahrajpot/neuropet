# Deployment Guide for Vercel

## Environment Variables Required

The following environment variables must be set in Vercel Dashboard:

### Database
- `MONGODB_URI` - Your MongoDB connection string

### Authentication
- `ADMIN_PASSWORD` - Admin login password
- `JWT_SECRET` - Secret key for JWT tokens (use a long random string in production)
- `ADMIN_CREATION_KEY` - Secret key for creating admin accounts

### Email (Resend)
- `RESEND_API_KEY` - API key from Resend.com
- `EMAIL_FROM` - Verified sender email address

### Application
- `NEXT_PUBLIC_APP_URL` - Your production URL (e.g., https://neuropet.vercel.app)

## How to Set Environment Variables on Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable listed above
4. Select all environments (Production, Preview, Development)
5. Click Save
6. Redeploy your application

## After Deployment

1. Visit your deployed URL
2. Go to `/admin/setup` to create your admin account
3. Test the booking form at `/book`

## Troubleshooting

### 500 Error on API Routes
- Check that all environment variables are set
- Verify MongoDB URI is correct and database is accessible
- Check Vercel deployment logs for specific errors

### Email Not Sending
- Verify RESEND_API_KEY is valid
- Ensure EMAIL_FROM is a verified domain/email in Resend
- Check Vercel function logs for email errors

## MongoDB Atlas Setup

Ensure your MongoDB Atlas cluster:
1. Has network access from anywhere (0.0.0.0/0) or Vercel IPs
2. Has a database user with read/write permissions
3. Connection string includes the correct database name
