import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { requireClient } from "@/middleware/auth";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

/**
 * POST /api/client/change-password
 * 
 * SECURITY: Uses JWT authentication, derives userId from token
 * User can only change their own password
 */
export async function POST(request: NextRequest) {
  try {
    // SECURITY: Verify authentication and get user from JWT
    const user = await requireClient(request);
    if (user instanceof NextResponse) {
      return user; // Return error response
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Input validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    // Password strength validation
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Additional password strength checks
    if (!/[A-Z]/.test(newPassword)) {
      return NextResponse.json(
        { error: "Password must contain at least one uppercase letter" },
        { status: 400 }
      );
    }

    if (!/[a-z]/.test(newPassword)) {
      return NextResponse.json(
        { error: "Password must contain at least one lowercase letter" },
        { status: 400 }
      );
    }

    if (!/[0-9]/.test(newPassword)) {
      return NextResponse.json(
        { error: "Password must contain at least one number" },
        { status: 400 }
      );
    }

    await connectDB();

    // SECURITY: Use userId from verified JWT
    const dbUser = await User.findById(user.userId);

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, dbUser.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Prevent reusing the same password
    const isSamePassword = await bcrypt.compare(newPassword, dbUser.password);
    if (isSamePassword) {
      return NextResponse.json(
        { error: "New password must be different from current password" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12); // Increased cost factor

    // Update password
    dbUser.password = hashedPassword;
    await dbUser.save();

    return NextResponse.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}
