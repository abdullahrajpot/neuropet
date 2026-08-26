import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { connectDB } from "@/lib/mongodb";
import { Appointment } from "@/models/Appointment";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const assessmentId = formData.get("assessmentId") as string;
    
    if (!assessmentId) {
      return NextResponse.json(
        { error: "Assessment ID is required" },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "videos", assessmentId);
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const uploadedFiles: string[] = [];

    // Process each video file
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("video-") && value instanceof File) {
        const file = value as File;
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create a unique filename
        const timestamp = Date.now();
        const ext = file.name.split(".").pop();
        const filename = `${key}-${timestamp}.${ext}`;
        const filepath = join(uploadsDir, filename);

        // Save the file
        await writeFile(filepath, buffer);
        
        // Store relative path for database
        const relativePath = `/uploads/videos/${assessmentId}/${filename}`;
        uploadedFiles.push(relativePath);
      }
    }

    // Update assessment in database with video paths
    await connectDB();
    await Appointment.findByIdAndUpdate(assessmentId, {
      videoPaths: uploadedFiles,
      videoCount: uploadedFiles.length,
      videoUploaded: true,
    });

    console.log(`✅ ${uploadedFiles.length} videos uploaded for assessment ${assessmentId}`);

    return NextResponse.json({
      success: true,
      message: `${uploadedFiles.length} video(s) uploaded successfully`,
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Video upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload videos" },
      { status: 500 }
    );
  }
}
