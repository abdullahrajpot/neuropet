import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { connectDB } from "@/lib/mongodb";
import { Appointment } from "@/models/Appointment";
import { sendAssessmentConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Generate unique client ID
    const clientId = nanoid(10).toUpperCase();
    
    await connectDB();
    const appointment = await Appointment.create({
      ...body,
      clientId,
      status: "pending",
    });
    
    // Send confirmation email to client (don't wait, run async)
    // Using setTimeout to avoid blocking the response
    setTimeout(async () => {
      try {
        await sendAssessmentConfirmationEmail({
          clientName: body.name || body.ownerName,
          clientEmail: body.email,
          clientId: clientId,
          petName: body.petName,
          primaryConcern: body.primaryConcern,
          submittedAt: appointment.createdAt,
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Don't fail the request if email fails
      }
    }, 0);
    
    return NextResponse.json({ 
      id: appointment._id,
      clientId: clientId,
      message: "Assessment submitted successfully"
    }, { status: 201 });
  } catch (error) {
    console.error("Appointment error:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const appointments = await Appointment.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Fetch appointments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
