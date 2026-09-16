import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { SignJWT } from "jose";
import {
  checkRateLimit,
  getClientIP,
  createRateLimitIdentifier,
  resetRateLimit,
  RATE_LIMITS,
} from "@/lib/rate-limit";

// Use Node.js runtime (not Edge) for JWT operations
export const runtime = "nodejs";

// SECURITY: No fallback secret
if (!process.env.JWT_SECRET) {
  throw new Error(
    "FATAL: JWT_SECRET environment variable is not configured. " +
    "Application cannot start without proper security configuration."
  );
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * POST /api/auth/login
 * 
 * SECURITY:
 * - Rate limiting to prevent brute force attacks
 * - Secure session management with HttpOnly cookies
 * - Generic error messages to prevent user enumeration
 * - Logs suspicious login attempts
 */
export async function POST(request: NextRequest) {
  const ip = getClientIP(request);
  
  try {
    const { email, password, role } = await request.json();

    // Input validation
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password, and role are required" },
        { status: 400 }
      );
    }

    // SECURITY: Rate limiting by IP + email
    const rateLimitId = createRateLimitIdentifier(ip, email);
    const rateLimit = checkRateLimit({
      ...RATE_LIMITS.LOGIN,
      identifier: rateLimitId,
    });

    if (!rateLimit.allowed) {
      console.warn(
        `⚠️  Rate limit exceeded for login attempt: IP=${ip}, Email=${email}`
      );
      
      return NextResponse.json(
        {
          error: `Too many login attempts. Please try again in ${rateLimit.retryAfter} seconds.`,
          retryAfter: rateLimit.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.retryAfter?.toString() || "900",
          },
        }
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

    // Role validation
    if (role !== "admin" && role !== "client") {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user by email and role
    const user = await User.findOne({ email, role });
    
    // SECURITY: Generic error message to prevent user enumeration
    if (!user) {
      console.warn(
        `⚠️  Failed login attempt: IP=${ip}, Email=${email}, Reason=User not found`
      );
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if account is active
    if (!user.isActive) {
      console.warn(
        `⚠️  Login attempt on inactive account: IP=${ip}, Email=${email}`
      );
      return NextResponse.json(
        { error: "Account is inactive. Please contact support." },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.warn(
        `⚠️  Failed login attempt: IP=${ip}, Email=${email}, Reason=Invalid password`
      );
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // SECURITY: Reset rate limit after successful login
    resetRateLimit(rateLimitId);

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

    // SECURITY: Set secure HTTP-only cookie
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict", // CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    console.log(
      `✅ Login successful: IP=${ip}, Email=${email}, Role=${role}`
    );

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    
    // SECURITY: Don't leak error details to client
    return NextResponse.json(
      { error: "An error occurred during login. Please try again." },
      { status: 500 }
    );
  }
}
