# MongoDB Atlas Network Access Setup for Vercel

## Quick Fix: Allow Access from Anywhere

The easiest solution for Vercel deployments:

1. Go to https://cloud.mongodb.com
2. Select your cluster
3. Click on **Network Access** in the left sidebar
4. Click **+ ADD IP ADDRESS**
5. Click **ALLOW ACCESS FROM ANYWHERE**
6. This will add `0.0.0.0/0` (allows all IPs)
7. Click **Confirm**

⚠️ **Note:** This is safe for development. For production, consider using MongoDB's built-in authentication and encryption.

## Alternative: Whitelist Vercel IPs (More Secure)

If you want more security, whitelist only Vercel's IP ranges:

1. Go to Network Access in MongoDB Atlas
2. Add these IP ranges (Vercel's deployment regions):
   - `76.76.21.0/24`
   - `76.223.0.0/20` 
   - All Vercel IPs listed at: https://vercel.com/docs/concepts/deployments/ip-addresses

## Verify Connection String

Your MongoDB connection string should look like:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

Make sure:
- Username and password are correct
- No special characters that need encoding
- Database name is included (optional but recommended)
- `retryWrites=true&w=majority` parameters are included

## Test Connection

You can test the connection locally first:
1. Use the same `MONGODB_URI` in your `.env.local`
2. Run `npm run dev`
3. Try submitting the form
4. If it works locally, the connection string is correct

## Common Issues

### Error: "MongoNetworkError"
- Check Network Access settings in Atlas
- Verify IP address `0.0.0.0/0` is whitelisted

### Error: "Authentication failed"
- Verify username and password in connection string
- Check user has correct permissions (read/write)

### Error: "Database name not specified"
- Add database name to connection string: `...mongodb.net/neuropet?...`
