# Time Slot Authentication Fix

## Issue
The time slot admin API routes were initially created with `next-auth` imports, but the project uses a simpler key-based authentication system.

## Solution Applied
Updated all admin time slot API routes to use the existing authentication pattern:

### Before (Incorrect)
```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // ...
}
```

### After (Correct)
```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // ...
}
```

## Files Updated

### API Routes
1. **`src/app/api/admin/timeslots/route.ts`**
   - GET, POST, DELETE methods
   - Removed next-auth imports
   - Added key-based authentication

2. **`src/app/api/admin/timeslots/[id]/route.ts`**
   - PATCH, DELETE methods
   - Removed next-auth imports
   - Added key-based authentication

### Admin UI
3. **`src/app/admin/timeslots/page.tsx`**
   - Updated all fetch calls to include `?key=${key}` parameter
   - Uses `NEXT_PUBLIC_ADMIN_PASSWORD` from environment

## How It Works

### Server-Side (API)
1. API route checks for `key` query parameter
2. Compares with `process.env.ADMIN_PASSWORD`
3. Returns 401 if doesn't match

### Client-Side (Admin UI)
1. Reads `NEXT_PUBLIC_ADMIN_PASSWORD` from environment
2. Includes in all admin API requests as query parameter
3. Example: `fetch(/api/admin/timeslots?key=${key})`

## Environment Variables

Required in `.env.local`:
```env
ADMIN_PASSWORD=neuropet-admin
NEXT_PUBLIC_ADMIN_PASSWORD=neuropet-admin
```

Both are already configured in your `.env.local` file ✅

## Testing

After this fix:
1. ✅ No more "Module not found: Can't resolve 'next-auth'" error
2. ✅ Admin time slots page loads correctly
3. ✅ All CRUD operations work with proper authentication
4. ✅ Unauthorized requests are blocked

## Security Notes

- This is a simple key-based authentication suitable for internal admin tools
- The key is passed as a query parameter
- For production, consider:
  - Using HTTPS (query params encrypted in transit)
  - Implementing session-based auth
  - Rate limiting on admin endpoints
  - IP whitelisting

## Status
✅ **Fixed and Working**

The time slot system now uses the same authentication pattern as other admin routes in the project.
