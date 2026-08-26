import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-this"
);

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password, and role are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user by email and role
    const user = await User.findOne({ email, role });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if account is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: "Account is inactive. Please contact support." },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Create JWT token
    const token = await new SignJWT({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      clientId: user.clientId,
      assessmentId: user.assessmentId?.toString(),
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    // Create response
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          clientId: user.clientId,
          assessmentId: user.assessmentId,
        },
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: false, // Allow on localhost HTTP
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    console.log("✅ Login successful - Cookie set for:", email, "Role:", role);

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: 500 }
    );
  }
}
