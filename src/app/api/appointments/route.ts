import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import connectDB from "@/lib/db";
import { Appointment } from "@/models/Appointment";
import { sendAssessmentConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log("Received appointment data:", JSON.stringify(body, null, 2));
    
    // Extract tip, consultation type, and payment details
    const { 
      tipAmount, 
      consultationType, 
      paymentIntentId, 
      paymentAmount,
      ...appointmentData 
    } = body;
    
    // Generate unique client ID
    const clientId = nanoid(10).toUpperCase();
    
    await connectDB();
    
    const dataToSave = {
      ...appointmentData,
      clientId,
      consultationType: consultationType || "discovery",
      tipAmount: tipAmount || 0,
      paymentIntentId: paymentIntentId || undefined,
      paymentAmount: paymentAmount || 0,
      paymentStatus: paymentIntentId ? "succeeded" : (paymentAmount && paymentAmount > 0 ? "pending" : "succeeded"),
      paymentDate: paymentIntentId ? new Date() : (paymentAmount && paymentAmount > 0 ? new Date() : undefined),
      status: "pending",
    };
    
    console.log("Creating appointment with data:", JSON.stringify(dataToSave, null, 2));
    
    const appointment = await Appointment.create(dataToSave);
    
    console.log("Appointment created successfully:", appointment._id);
    
    // Send confirmation email to client (don't wait, run async)
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
      }
    }, 0);
    
    return NextResponse.json({ 
      id: appointment._id,
      clientId: clientId,
      message: "Assessment submitted successfully"
    }, { status: 201 });
  } catch (error) {
    console.error("Appointment error details:", error);
    
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') {
      const validationError = error as any;
      console.error("Validation errors:", validationError.errors);
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: Object.keys(validationError.errors).map(key => ({
            field: key,
            message: validationError.errors[key].message
          }))
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create appointment", details: error instanceof Error ? error.message : String(error) },
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
