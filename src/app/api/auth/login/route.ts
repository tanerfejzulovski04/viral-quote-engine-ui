import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
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

    // Simulate authentication logic
    // In a real app, you would:
    // 1. Hash the password
    // 2. Query your database
    // 3. Compare hashed passwords
    // 4. Generate JWT tokens
    
    // For demo purposes, we'll accept any email/password combination
    // that passes validation
    const user = {
      id: "1",
      name: "Test User",
      email: email,
    }

    return NextResponse.json(
      {
        message: "Login successful",
        user,
        // In a real app, you'd return JWT tokens here
        token: "demo_jwt_token",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}