import { NextResponse } from 'next/server'

// Mock user authentication data
const mockAuthUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  timezone: 'America/New_York',
  plan: 'pro',
  isAuthenticated: true,
  permissions: ['read:profile', 'write:profile', 'billing:manage']
}

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return NextResponse.json({
    success: true,
    data: mockAuthUser
  })
}