import { NextRequest, NextResponse } from 'next/server'

// Mock user data
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  timezone: 'America/New_York',
  plan: 'pro',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
}

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return NextResponse.json({
    success: true,
    data: mockUser
  })
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Simulate validation
    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name must be at least 2 characters long' },
        { status: 400 }
      )
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Update mock user
    const updatedUser = {
      ...mockUser,
      ...body,
      updatedAt: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully!'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request data' },
      { status: 400 }
    )
  }
}