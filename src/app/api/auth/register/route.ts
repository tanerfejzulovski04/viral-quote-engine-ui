import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      )
    }

    // Name validation
    if (name.length < 2) {
      return NextResponse.json(
        { 
          errors: { 
            name: "Name must be at least 2 characters" 
          } 
        },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          errors: { 
            email: "Please enter a valid email address" 
          } 
        },
        { status: 400 }
      )
    }

    // Password length validation
    if (password.length < 6) {
      return NextResponse.json(
        { 
          errors: { 
            password: "Password must be at least 6 characters" 
          } 
        },
        { status: 400 }
      )
    }

    // Simulate registration logic
    // In a real app, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Save user to database
    // 4. Generate JWT tokens
    // 5. Send welcome email
    
    // For demo purposes, we'll simulate a successful registration
    // Simulate checking if user already exists
    if (email === "test@example.com") {
      return NextResponse.json(
        { 
          errors: { 
            email: "An account with this email already exists" 
          } 
        },
        { status: 400 }
      )
    }

    const user = {
      id: Math.random().toString(36).substring(7),
      name: name,
      email: email,
    }

    return NextResponse.json(
      {
        message: "Registration successful",
        user,
        // In a real app, you'd return JWT tokens here
        token: "demo_jwt_token",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}