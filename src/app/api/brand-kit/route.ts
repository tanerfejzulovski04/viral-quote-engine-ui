import { NextRequest, NextResponse } from "next/server";

interface BrandKitData {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  watermarkText: string;
  watermarkEnabled: boolean;
  logoUrl?: string;
}

// In-memory storage for demo purposes
// In a real app, you would use a database
let brandKitStorage: BrandKitData | null = null;

export async function POST(request: NextRequest) {
  try {
    const brandKitData: BrandKitData = await request.json();

    // Validate required fields
    if (!brandKitData.primaryColor || !brandKitData.secondaryColor || !brandKitData.accentColor) {
      return NextResponse.json(
        { error: "Missing required color fields" },
        { status: 400 }
      );
    }

    if (!brandKitData.fontFamily) {
      return NextResponse.json(
        { error: "Font family is required" },
        { status: 400 }
      );
    }

    // Save brand kit (in-memory for demo)
    brandKitStorage = {
      ...brandKitData,
      watermarkText: brandKitData.watermarkText || "",
      watermarkEnabled: brandKitData.watermarkEnabled ?? false,
    };

    return NextResponse.json({
      message: "Brand kit saved successfully",
      data: brandKitStorage,
    });
  } catch (error) {
    console.error("Brand kit save error:", error);
    return NextResponse.json(
      { error: "Failed to save brand kit" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!brandKitStorage) {
      // Return default brand kit if none exists
      const defaultBrandKit: BrandKitData = {
        primaryColor: "#000000",
        secondaryColor: "#666666",
        accentColor: "#3B82F6",
        fontFamily: "Inter",
        watermarkText: "My Brand",
        watermarkEnabled: true,
      };
      return NextResponse.json({ data: defaultBrandKit });
    }

    return NextResponse.json({ data: brandKitStorage });
  } catch (error) {
    console.error("Brand kit fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch brand kit" },
      { status: 500 }
    );
  }
}