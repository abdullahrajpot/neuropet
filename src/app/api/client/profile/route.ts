import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { requireClient } from "@/middleware/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

/**
 * PATCH /api/client/profile
 * 
 * SECURITY: Uses JWT authentication, derives userId from token
 * User can only update their own profile
 */
export async function PATCH(request: NextRequest) {
  try {
    // SECURITY: Verify authentication and get user from JWT
    const user = await requireClient(request);
    if (user instanceof NextResponse) {
      return user; // Return error response
    }

    const body = await request.json();
    const { name, email } = body;

    // Input validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if email is already taken by another user
    // SECURITY: Exclude current user from check
    const existingUser = await User.findOne({ 
      email, 
      _id: { $ne: user.userId } 
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 400 }
      );
    }

    // SECURITY: Update using userId from verified JWT
    const updatedUser = await User.findByIdAndUpdate(
      user.userId,
      { name, email },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
