/**
 * Authentication helpers for API routes.
 * Lives in lib/ (not middleware/) to avoid confusion with Next.js middleware.
 */

import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import {
  AuthTokenPayload,
  parseAuthTokenPayload,
} from "@/lib/auth-token";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    "FATAL: JWT_SECRET environment variable is not configured. " +
      "Application cannot start without proper security configuration."
  );
}

const SECRET = new TextEncoder().encode(JWT_SECRET);

export type { AuthTokenPayload };

export interface AuthenticatedRequest extends NextRequest {
  user: AuthTokenPayload;
}

export async function verifyAuth(
  request: NextRequest
): Promise<{ user: AuthTokenPayload } | { error: string; status: number }> {
  try {
    const authHeader = request.headers.get("authorization");
    let token: string | undefined;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      token = request.cookies.get("auth-token")?.value;
    }

    if (!token) {
      return {
        error: "Authentication required. Please log in.",
        status: 401,
      };
    }

    const { payload } = await jwtVerify(token, SECRET);
    const user = parseAuthTokenPayload(payload);

    if (!user) {
      return {
        error: "Invalid authentication token",
        status: 401,
      };
    }

    return { user };
  } catch (error) {
    console.error("JWT verification failed:", error);
    return {
      error: "Invalid or expired authentication token",
      status: 401,
    };
  }
}

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

export function canAccessResource(
  user: AuthTokenPayload,
  resourceUserId: string
): boolean {
  if (user.role === "admin") return true;
  return user.userId === resourceUserId;
}

export function canAccessAssessment(
  user: AuthTokenPayload,
  assessmentId: string
): boolean {
  if (user.role === "admin") return true;
  return user.assessmentId === assessmentId;
}
