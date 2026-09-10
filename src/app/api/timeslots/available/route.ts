import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { TimeSlot } from "@/models/TimeSlot";

// GET - Fetch available time slots for booking
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const consultationType = searchParams.get("consultationType");
    
    // Default to next 60 days if no range specified
    const start = startDate ? new Date(startDate) : new Date();
    const end = endDate 
      ? new Date(endDate) 
      : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
    
    // Build query
    let query: any = {
      date: { $gte: start, $lte: end },
      isBooked: false,
      isAvailable: true,
    };
    
    // Filter by consultation type if specified
    if (consultationType && consultationType !== "all") {
      query.$or = [
        { consultationType: consultationType },
        { consultationType: "all" }
      ];
    }
    
    const timeSlots = await TimeSlot.find(query)
      .sort({ date: 1, startTime: 1 })
      .select("-bookedBy -notes") // Hide internal fields from public
      .lean();
    
    return NextResponse.json({
      success: true,
      slots: timeSlots,
      count: timeSlots.length,
    });
  } catch (error) {
    console.error("Fetch available time slots error:", error);
    return NextResponse.json(
      { error: "Failed to fetch available time slots" },
      { status: 500 }
    );
  }
}
