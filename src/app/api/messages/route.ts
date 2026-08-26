import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import Message from "@/lib/models/Message";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-this"
);

// GET messages for an assessment
export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token");

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    const { searchParams } = new URL(request.url);
    const assessmentId = searchParams.get("assessmentId");

    if (!assessmentId) {
      return NextResponse.json(
        { error: "Assessment ID required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Verify access
    if (payload.role === "client" && payload.assessmentId !== assessmentId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Get messages
    const messages = await Message.find({ assessmentId })
      .sort({ createdAt: 1 })
      .lean();

    // Mark messages as read if they're from the other party
    const otherSender = payload.role === "admin" ? "client" : "admin";
    await Message.updateMany(
      {
        assessmentId,
        sender: otherSender,
        read: false,
      },
      { read: true }
    );

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST new message
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token");

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    const { assessmentId, message } = await request.json();

    if (!assessmentId || !message) {
      return NextResponse.json(
        { error: "Assessment ID and message are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Verify access for clients
    if (payload.role === "client" && payload.assessmentId !== assessmentId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Create message
    const newMessage = await Message.create({
      assessmentId,
      sender: payload.role,
      senderName: payload.name,
      message,
      read: false,
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Send message error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
