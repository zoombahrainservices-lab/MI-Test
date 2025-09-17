import { NextRequest, NextResponse } from 'next/server'

// This route is deprecated - redirect to the new user route structure
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'This endpoint is deprecated. Please use /api/user/test-results instead.',
      redirect: '/api/user/test-results'
    },
    { status: 410 } // Gone
  )
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'This endpoint is deprecated. Please use /api/user/test-results instead.',
      redirect: '/api/user/test-results'
    },
    { status: 410 } // Gone
  )
}