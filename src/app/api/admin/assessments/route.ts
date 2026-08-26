import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Appointment } from "@/models/Appointment";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const assessments = await Appointment.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(assessments);
  } catch (error) {
    console.error("Fetch assessments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch assessments" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...updates } = await request.json();
    await connectDB();
    
    const assessment = await Appointment.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    
    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(assessment);
  } catch (error) {
    console.error("Update assessment error:", error);
    return NextResponse.json(
      { error: "Failed to update assessment" },
      { status: 500 }
    );
  }
}
