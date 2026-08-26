import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import { Appointment } from "@/models/Appointment";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-this"
);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token");

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token.value, JWT_SECRET);

    if (payload.role !== "client") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    await connectDB();

    const assessment = await Appointment.findById(payload.assessmentId);

    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(assessment);
  } catch (error) {
    console.error("Assessment fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch assessment" },
      { status: 500 }
    );
  }
}
