import { NextRequest, NextResponse } from 'next/server'

// This route is deprecated - redirect to the new user route structure
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'This endpoint is deprecated. Please use /api/user/questions instead.',
      redirect: '/api/user/questions'
    },
    { status: 410 } // Gone
  )
}