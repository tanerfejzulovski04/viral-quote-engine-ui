import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const logo = formData.get("logo") as File;

    if (!logo) {
      return NextResponse.json({ error: "No logo file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    if (!allowedTypes.includes(logo.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PNG, JPG, or SVG file." },
        { status: 400 }
      );
    }

    // Validate file size (2MB limit)
    if (logo.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Please upload a file smaller than 2MB." },
        { status: 400 }
      );
    }

    // For demo purposes, we'll create a data URL from the file
    // In a real app, you would upload to a cloud storage service like AWS S3
    const bytes = await logo.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${logo.type};base64,${base64}`;

    // In production, you would save the file and return the actual URL
    return NextResponse.json({
      url: dataUrl,
      name: logo.name,
      size: logo.size,
      type: logo.type,
    });
  } catch (error) {
    console.error("Logo upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload logo" },
      { status: 500 }
    );
  }
}