import { NextRequest, NextResponse } from 'next/server'
import { verifyUserCredentials } from '@/lib/db-operations'
import { generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Verify credentials
    const user = await verifyUserCredentials(email, password)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate token
    const token = await generateToken({
      id: user.id,
      email: user.email,
      name: user.name || undefined,
    })

    return NextResponse.json({
      user,
      token,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
