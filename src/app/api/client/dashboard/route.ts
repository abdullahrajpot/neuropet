import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { requireClient } from "@/middleware/auth";
import { connectDB } from "@/lib/mongodb";
import { Appointment } from "@/models/Appointment";
import Message from "@/lib/models/Message";

/**
 * GET /api/client/dashboard
 * 
 * SECURITY: Uses JWT authentication, derives user from token
 * No user IDs in URL - authenticated endpoint
 */
export async function GET(request: NextRequest) {
  try {
    // SECURITY: Verify authentication and get user from JWT
    const user = await requireClient(request);
    if (user instanceof NextResponse) {
      return user; // Return error response
    }

    await connectDB();

    // SECURITY: Use assessmentId from verified JWT payload
    const assessment = await Appointment.findById(user.assessmentId);

    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }

    // Get unread message count for this user's assessment
    const unreadMessages = await Message.countDocuments({
      assessmentId: user.assessmentId,
      sender: "admin",
      read: false,
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        clientId: user.clientId,
      },
      assessment: {
        status: assessment.status || "pending",
        petName: assessment.petName,
        primaryConcern: assessment.primaryConcern,
        appointmentDate: assessment.appointmentDate,
        submittedAt: assessment.createdAt,
        consultationType: assessment.consultationType,
        tipAmount: assessment.tipAmount,
        paymentAmount: assessment.paymentAmount,
        paymentStatus: assessment.paymentStatus,
        paymentDate: assessment.paymentDate,
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
