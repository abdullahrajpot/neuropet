import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { TimeSlot } from "@/models/TimeSlot";

// GET - Fetch all time slots (with optional date range filter)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    
    let query: any = {};
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    
    const timeSlots = await TimeSlot.find(query)
      .sort({ date: 1, startTime: 1 })
      .populate("bookedBy", "ownerName email petName")
      .lean();
    
    return NextResponse.json(timeSlots);
  } catch (error) {
    console.error("Fetch time slots error:", error);
    return NextResponse.json(
      { error: "Failed to fetch time slots" },
      { status: 500 }
    );
  }
}

// POST - Create new time slot(s)
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    
    const body = await request.json();
    const { slots, bulkCreate } = body;
    
    if (bulkCreate && Array.isArray(slots)) {
      // Bulk create multiple slots
      const createdSlots = [];
      const errors = [];
      
      for (const slot of slots) {
        try {
          const newSlot = await TimeSlot.create({
            date: new Date(slot.date),
            startTime: slot.startTime,
            endTime: slot.endTime,
            duration: slot.duration || 60,
            isAvailable: slot.isAvailable !== undefined ? slot.isAvailable : true,
            consultationType: slot.consultationType || "all",
            notes: slot.notes || "",
          });
          createdSlots.push(newSlot);
        } catch (err: any) {
          if (err.code === 11000) {
            errors.push({
              date: slot.date,
              startTime: slot.startTime,
              error: "Slot already exists",
            });
          } else {
            errors.push({
              date: slot.date,
              startTime: slot.startTime,
              error: err.message,
            });
          }
        }
      }
      
      return NextResponse.json({
        success: true,
        created: createdSlots.length,
        errors: errors.length,
        createdSlots,
        errorDetails: errors,
      }, { status: 201 });
      
    } else {
      // Create single slot
      const newSlot = await TimeSlot.create({
        date: new Date(body.date),
        startTime: body.startTime,
        endTime: body.endTime,
        duration: body.duration || 60,
        isAvailable: body.isAvailable !== undefined ? body.isAvailable : true,
        consultationType: body.consultationType || "all",
        notes: body.notes || "",
      });
      
      return NextResponse.json({
        success: true,
        timeSlot: newSlot,
      }, { status: 201 });
    }
  } catch (error: any) {
    console.error("Create time slot error:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Time slot already exists for this date and time" },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create time slot", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete multiple time slots
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids")?.split(",") || [];
    
    if (ids.length === 0) {
      return NextResponse.json(
        { error: "No slot IDs provided" },
        { status: 400 }
      );
    }
    
    // Check if any slots are booked
    const bookedSlots = await TimeSlot.find({
      _id: { $in: ids },
      isBooked: true,
    });
    
    if (bookedSlots.length > 0) {
      return NextResponse.json(
        { 
          error: "Cannot delete booked slots", 
          bookedSlots: bookedSlots.map(s => s._id)
        },
        { status: 400 }
      );
    }
    
    const result = await TimeSlot.deleteMany({ _id: { $in: ids } });
    
    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete time slots error:", error);
    return NextResponse.json(
      { error: "Failed to delete time slots" },
      { status: 500 }
    );
  }
}
