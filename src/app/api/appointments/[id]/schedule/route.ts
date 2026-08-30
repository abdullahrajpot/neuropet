import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Appointment } from "@/models/Appointment";
import { sendAppointmentScheduledEmail } from "@/lib/email";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { appointmentDate, status, vetBehaviouristName } = body;

    await connectDB();
    
    // Update appointment
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      {
        appointmentDate: new Date(appointmentDate),
        status: status || "scheduled",
        vetBehaviouristName,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Send appointment confirmation email (async, don't block response)
    setTimeout(async () => {
      try {
        await sendAppointmentScheduledEmail({
          clientName: appointment.name || appointment.ownerName,
          clientEmail: appointment.email,
          petName: appointment.petName,
          appointmentDate: new Date(appointmentDate),
          primaryConcern: appointment.primaryConcern,
          vetBehaviouristName,
        });
      } catch (emailError) {
        console.error("Failed to send appointment email:", emailError);
        // Don't fail the request if email fails
      }
    }, 0);

    return NextResponse.json({
      success: true,
      message: "Appointment scheduled successfully",
      appointment,
    });
  } catch (error) {
    console.error("Schedule appointment error:", error);
    return NextResponse.json(
      { error: "Failed to schedule appointment" },
      { status: 500 }
    );
  }
}
