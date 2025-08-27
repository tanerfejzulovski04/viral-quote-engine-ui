import { NextRequest, NextResponse } from 'next/server'

const plans = ['free', 'starter', 'pro', 'enterprise']

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.plan || !plans.includes(body.plan)) {
      return NextResponse.json(
        { success: false, error: 'Invalid plan selection' },
        { status: 400 }
      )
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({
      success: true,
      data: {
        plan: body.plan,
        switchedAt: new Date().toISOString()
      },
      message: `Plan switched to ${body.plan} successfully!`
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request data' },
      { status: 400 }
    )
  }
}