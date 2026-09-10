import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { TimeSlot } from "@/models/TimeSlot";

// PATCH - Update a time slot
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = await request.json();

    await connectDB();
    
    // Check if slot is booked and prevent changing date/time if so
    const existingSlot = await TimeSlot.findById(id);
    if (!existingSlot) {
      return NextResponse.json(
        { error: "Time slot not found" },
        { status: 404 }
      );
    }
    
    if (existingSlot.isBooked) {
      // Allow only limited fields to be updated when booked
      const allowedUpdates: any = {};
      if (body.notes !== undefined) allowedUpdates.notes = body.notes;
      if (body.isAvailable !== undefined) allowedUpdates.isAvailable = body.isAvailable;
      
      if (Object.keys(allowedUpdates).length === 0) {
        return NextResponse.json(
          { error: "Cannot modify date/time of booked slots" },
          { status: 400 }
        );
      }
      
      const updatedSlot = await TimeSlot.findByIdAndUpdate(
        id,
        allowedUpdates,
        { new: true, runValidators: true }
      );
      
      return NextResponse.json({
        success: true,
        timeSlot: updatedSlot,
        message: "Limited update applied (slot is booked)",
      });
    }
    
    // Full update for unbooked slots
    const updateData: any = {};
    if (body.date !== undefined) updateData.date = new Date(body.date);
    if (body.startTime !== undefined) updateData.startTime = body.startTime;
    if (body.endTime !== undefined) updateData.endTime = body.endTime;
    if (body.duration !== undefined) updateData.duration = body.duration;
    if (body.isAvailable !== undefined) updateData.isAvailable = body.isAvailable;
    if (body.consultationType !== undefined) updateData.consultationType = body.consultationType;
    if (body.notes !== undefined) updateData.notes = body.notes;
    
    const updatedSlot = await TimeSlot.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedSlot) {
      return NextResponse.json(
        { error: "Time slot not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      timeSlot: updatedSlot,
    });
  } catch (error: any) {
    console.error("Update time slot error:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "A slot with this date and time already exists" },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update time slot", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a single time slot
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;

    await connectDB();
    
    // Check if slot is booked
    const slot = await TimeSlot.findById(id);
    if (!slot) {
      return NextResponse.json(
        { error: "Time slot not found" },
        { status: 404 }
      );
    }
    
    if (slot.isBooked) {
      return NextResponse.json(
        { error: "Cannot delete a booked time slot" },
        { status: 400 }
      );
    }
    
    await TimeSlot.findByIdAndDelete(id);
    
    return NextResponse.json({
      success: true,
      message: "Time slot deleted successfully",
    });
  } catch (error) {
    console.error("Delete time slot error:", error);
    return NextResponse.json(
      { error: "Failed to delete time slot" },
      { status: 500 }
    );
  }
}
