import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import { Appointment } from "@/models/Appointment";
import Message from "@/lib/models/Message";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-this"
);

export async function GET() {
  try {
    // Verify authentication
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

    // Get assessment
    const assessment = await Appointment.findById(payload.assessmentId);

    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }

    // Get unread message count
    const unreadMessages = await Message.countDocuments({
      assessmentId: payload.assessmentId,
      sender: "admin",
      read: false,
    });

    return NextResponse.json({
      user: {
        name: payload.name,
        email: payload.email,
        clientId: payload.clientId,
      },
      assessment: {
        status: assessment.status || "pending",
        petName: assessment.petName,
        primaryConcern: assessment.primaryConcern,
        appointmentDate: assessment.appointmentDate,
        submittedAt: assessment.createdAt,
      },
      unreadMessages,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard" },
      { status: 500 }
    );
  }
}
