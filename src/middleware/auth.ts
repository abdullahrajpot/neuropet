/**
 * Authentication Middleware
 * 
 * Provides JWT verification and user authentication for API routes.
 * SECURITY: No fallback secrets - requires proper JWT_SECRET configuration.
 */

import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

// JWT Secret - MUST be configured, no fallbacks
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    "FATAL: JWT_SECRET environment variable is not configured. " +
    "Application cannot start without proper security configuration."
  );
}

const SECRET = new TextEncoder().encode(JWT_SECRET);

// App auth token payload (distinct from jose's JWTPayload)
export interface AuthTokenPayload {
  userId: string;
  email: string;
  name: string;
  role: "admin" | "client";
  clientId?: string;
  assessmentId?: string;
}

// Extended Request with User
export interface AuthenticatedRequest extends NextRequest {
  user: AuthTokenPayload;
}

/**
 * Verify JWT token from Authorization header or cookie
 * SECURITY: Derives user from verified JWT, never trusts client-provided IDs
 */
export async function verifyAuth(
  request: NextRequest
): Promise<{ user: AuthTokenPayload } | { error: string; status: number }> {
  try {
    // Try Authorization header first (Bearer token)
    const authHeader = request.headers.get("authorization");
    let token: string | undefined;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      // Fallback to cookie
      const cookieToken = request.cookies.get("auth-token");
      token = cookieToken?.value;
    }

    if (!token) {
      return {
        error: "Authentication required. Please log in.",
        status: 401,
      };
    }

    // Verify JWT token
    const { payload } = await jwtVerify(token, SECRET);

    // Validate payload structure
    if (
      !payload.userId ||
      !payload.email ||
      !payload.role ||
      (payload.role !== "admin" && payload.role !== "client")
    ) {
      return {
        error: "Invalid authentication token",
        status: 401,
      };
    }

    return {
      user: {
        userId: String(payload.userId),
        email: String(payload.email),
        name: String(payload.name ?? ""),
        role: payload.role as "admin" | "client",
        ...(payload.clientId ? { clientId: String(payload.clientId) } : {}),
        ...(payload.assessmentId
          ? { assessmentId: String(payload.assessmentId) }
          : {}),
      },
    };
  } catch (error) {
    console.error("JWT verification failed:", error);
    return {
      error: "Invalid or expired authentication token",
      status: 401,
    };
  }
}

/**
 * Require authentication - returns 401 if not authenticated
 */
export async function requireAuth(
  request: NextRequest
): Promise<AuthTokenPayload | NextResponse> {
  const result = await verifyAuth(request);

  if ("error" in result) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status }
    );
  }

  return result.user;
}

/**
 * Require admin role - returns 403 if not admin
 * SECURITY: Enforces role-based access control
 */
export async function requireAdmin(
  request: NextRequest
): Promise<AuthTokenPayload | NextResponse> {
  const result = await verifyAuth(request);

  if ("error" in result) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status }
    );
  }

  if (result.user.role !== "admin") {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 }
    );
  }

  return result.user;
}

/**
 * Require client role - returns 403 if not client
 */
export async function requireClient(
  request: NextRequest
): Promise<AuthTokenPayload | NextResponse> {
  const result = await verifyAuth(request);

  if ("error" in result) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status }
    );
  }

  if (result.user.role !== "client") {
    return NextResponse.json(
      { error: "Client access required" },
      { status: 403 }
    );
  }

  return result.user;
}

/**
 * Check if user owns resource (for authorization)
 * SECURITY: Prevents users from accessing other users' data
 */
export function canAccessResource(
  user: AuthTokenPayload,
  resourceUserId: string
): boolean {
  // Admins can access all resources
  if (user.role === "admin") {
    return true;
  }

  // Users can only access their own resources
  return user.userId === resourceUserId;
}

/**
 * Check if user owns assessment (for clients)
 */
export function canAccessAssessment(
  user: AuthTokenPayload,
  assessmentId: string
): boolean {
  // Admins can access all assessments
  if (user.role === "admin") {
    return true;
  }

  // Clients can only access their own assessment
  return user.assessmentId === assessmentId;
}
