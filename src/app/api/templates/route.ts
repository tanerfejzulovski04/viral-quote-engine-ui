import { NextResponse } from 'next/server'

export async function GET() {
  const templates = [
    { 
      id: "modern", 
      name: "Modern", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      textColor: "#ffffff" 
    },
    { 
      id: "minimal", 
      name: "Minimal", 
      background: "#ffffff",
      textColor: "#000000" 
    },
    { 
      id: "dark", 
      name: "Dark", 
      background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
      textColor: "#ffffff" 
    },
    { 
      id: "vibrant", 
      name: "Vibrant", 
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      textColor: "#ffffff" 
    },
    {
      id: "ocean",
      name: "Ocean",
      background: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
      textColor: "#ffffff"
    },
    {
      id: "sunset",
      name: "Sunset",
      background: "linear-gradient(135deg, #ee9617 0%, #fe5858 100%)",
      textColor: "#ffffff"
    }
  ]

  return NextResponse.json(templates)
}