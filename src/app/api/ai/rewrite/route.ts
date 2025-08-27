import { NextRequest, NextResponse } from "next/server";

interface RewriteRequest {
  text: string;
  style: "shorter" | "punchier" | "motivational";
}

interface RewriteVariant {
  id: string;
  text: string;
}

// Mock AI service - in production, this would call a real AI API
function generateRewriteVariants(text: string, style: string): RewriteVariant[] {
  const variants: RewriteVariant[] = [];

  switch (style) {
    case "shorter":
      variants.push(
        {
          id: "1",
          text: text.split(" ").slice(0, Math.ceil(text.split(" ").length * 0.7)).join(" ") + ".",
        },
        {
          id: "2", 
          text: text.replace(/\b(very|really|quite|extremely|absolutely)\s+/gi, "").trim(),
        },
        {
          id: "3",
          text: text.split(".")[0] + ".",
        }
      );
      break;
      
    case "punchier":
      variants.push(
        {
          id: "1",
          text: text.replace(/\./g, "!").replace(/\?/g, "!"),
        },
        {
          id: "2",
          text: `💥 ${text.toUpperCase()}`,
        },
        {
          id: "3",
          text: text.replace(/\b(I think|maybe|perhaps|possibly)\s+/gi, "").trim(),
        }
      );
      break;
      
    case "motivational":
      variants.push(
        {
          id: "1",
          text: `🌟 ${text} Remember: every great journey starts with a single step!`,
        },
        {
          id: "2",
          text: `${text} You've got this! 💪`,
        },
        {
          id: "3",
          text: `Believe in yourself! ${text} The only limit is your imagination! ✨`,
        }
      );
      break;
      
    default:
      variants.push(
        {
          id: "1",
          text: `Rewritten: ${text}`,
        },
        {
          id: "2",
          text: `Alternative: ${text}`,
        },
        {
          id: "3",
          text: `Enhanced: ${text}`,
        }
      );
  }

  return variants;
}

export async function POST(request: NextRequest) {
  try {
    const body: RewriteRequest = await request.json();
    
    if (!body.text || !body.style) {
      return NextResponse.json(
        { error: "Missing required fields: text and style" },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const variants = generateRewriteVariants(body.text, body.style);

    return NextResponse.json({
      variants,
      originalText: body.text,
      style: body.style,
    });
  } catch (error) {
    console.error("Error in AI rewrite API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}