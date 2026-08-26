import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { Appointment } from "@/models/Appointment";

export async function POST(request: Request) {
  try {
    const { email, password, name, role, clientId } = await request.json();

    // Validate required fields
    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      );
    }

    // For client registration, verify clientId and link to assessment
    if (role === "client") {
      if (!clientId) {
        return NextResponse.json(
          { error: "Client ID is required for client registration" },
          { status: 400 }
        );
      }

      // Find assessment by clientId
      const assessment = await Appointment.findOne({ clientId });
      if (!assessment) {
        return NextResponse.json(
          { error: "Invalid Client ID" },
          { status: 400 }
        );
      }

      // Create client user
      const user = await User.create({
        email,
        password,
        name,
        role: "client",
        clientId,
        assessmentId: assessment._id,
        emailVerified: true, // Auto-verify for clients
      });

      return NextResponse.json(
        {
          message: "Client account created successfully",
          userId: user._id,
          role: user.role,
        },
        { status: 201 }
      );
    }

    // For admin registration (restricted)
    if (role === "admin") {
      // Check admin creation key
      const adminKey = request.headers.get("X-Admin-Key");
      if (adminKey !== process.env.ADMIN_CREATION_KEY) {
        return NextResponse.json(
          { error: "Unauthorized to create admin account" },
          { status: 403 }
        );
      }

      const user = await User.create({
        email,
        password,
        name,
        role: "admin",
      });

      return NextResponse.json(
        {
          message: "Admin account created successfully",
          userId: user._id,
          role: user.role,
        },
        { status: 201 }
      );
    }

    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}
