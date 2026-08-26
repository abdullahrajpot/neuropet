import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  
  return NextResponse.json({
    cookies: allCookies,
    authToken: cookieStore.get("auth-token")?.value || "NOT FOUND",
    count: allCookies.length,
  });
}
