import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { TimeSlot } from "@/models/TimeSlot";
import { Appointment } from "@/models/Appointment";

// POST - Book a time slot
export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { timeSlotId, appointmentId } = body;
    
    if (!timeSlotId || !appointmentId) {
      return NextResponse.json(
        { error: "Time slot ID and appointment ID are required" },
        { status: 400 }
      );
    }
    
    // Find the time slot
    const timeSlot = await TimeSlot.findById(timeSlotId);
    
    if (!timeSlot) {
      return NextResponse.json(
        { error: "Time slot not found" },
        { status: 404 }
      );
    }
    
    // Check if slot is available
    if (timeSlot.isBooked || !timeSlot.isAvailable) {
      return NextResponse.json(
        { error: "Time slot is not available" },
        { status: 409 }
      );
    }
    
    // Verify appointment exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }
    
    // Book the slot (atomic update to prevent race conditions)
    const updatedSlot = await TimeSlot.findOneAndUpdate(
      { 
        _id: timeSlotId, 
        isBooked: false, 
        isAvailable: true 
      },
      { 
        isBooked: true, 
        bookedBy: appointmentId 
      },
      { new: true }
    );
    
    if (!updatedSlot) {
      return NextResponse.json(
        { error: "Time slot was just booked by someone else" },
        { status: 409 }
      );
    }
    
    // Update appointment with time slot info
    await Appointment.findByIdAndUpdate(appointmentId, {
      timeSlotId: timeSlotId,
      appointmentDate: timeSlot.date,
      status: "scheduled",
    });
    
    return NextResponse.json({
      success: true,
      message: "Time slot booked successfully",
      timeSlot: updatedSlot,
    });
  } catch (error) {
    console.error("Book time slot error:", error);
    return NextResponse.json(
      { error: "Failed to book time slot" },
      { status: 500 }
    );
  }
}
