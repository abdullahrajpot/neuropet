import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-this"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = [
    "/",
    "/about",
    "/services",
    "/blog",
    "/contact",
    "/book",
    "/book/confirmation",
    "/privacy-policy",
    "/terms",
    "/admin/login",
    "/admin/setup",
    "/client/login",
    "/client/register",
  ];

  // Check if path is exactly a public path or starts with a public path
  const isPublicPath = publicPaths.some((path) => {
    return pathname === path || pathname.startsWith(path + "/");
  });

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Get token from cookie - try both possible cookie names
  const token = request.cookies.get("auth-token");
  
  console.log("🔍 Middleware check for:", pathname);
  console.log("🍪 Cookie found:", token ? "YES" : "NO");
  console.log("🍪 All cookies:", request.cookies.getAll().map(c => c.name));

  if (!token) {
    console.log("❌ No token - redirecting to login");
    // Redirect to appropriate login page
    if (pathname.startsWith("/admin")) {
      const url = new URL("/admin/login", request.url);
      return NextResponse.redirect(url);
    }
    if (pathname.startsWith("/client")) {
      const url = new URL("/client/login", request.url);
      return NextResponse.redirect(url);
    }
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  try {
    // Verify token
    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    const userRole = payload.role as string;

    console.log("✅ Token verified - Role:", userRole);

    // Check role-based access
    if (pathname.startsWith("/admin") && userRole !== "admin") {
      console.log("❌ Admin access denied - wrong role");
      const url = new URL("/admin/login", request.url);
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith("/client") && userRole !== "client") {
      console.log("❌ Client access denied - wrong role");
      const url = new URL("/client/login", request.url);
      return NextResponse.redirect(url);
    }

    // Token is valid, allow access
    console.log("✅ Access granted");
    return NextResponse.next();
  } catch (error) {
    console.error("❌ Token verification failed:", error);
    // Invalid token - redirect to login
    if (pathname.startsWith("/admin")) {
      const url = new URL("/admin/login", request.url);
      return NextResponse.redirect(url);
    }
    if (pathname.startsWith("/client")) {
      const url = new URL("/client/login", request.url);
      return NextResponse.redirect(url);
    }
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/assessments/:path*",
    "/admin/appointments/:path*",
    "/admin/pets/:path*",
    "/admin/blog/:path*",
    "/admin/messages/:path*",
    "/client/dashboard/:path*",
    "/client/assessment/:path*",
    "/client/messages/:path*",
    "/client/profile/:path*",
    "/client/settings/:path*",
  ],
};
