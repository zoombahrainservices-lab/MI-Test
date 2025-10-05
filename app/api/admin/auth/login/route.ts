import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const result = await authenticateAdmin(email, password)
    
    if (!result) {
      console.log(`Admin login failed for email: ${email}`)
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      )
    }

    console.log(`Admin login successful for: ${email}`)

    // Set HTTP-only cookie for admin session
    const response = NextResponse.json({
      success: true,
      admin: {
        id: result.admin.id,
        email: result.admin.email,
        name: result.admin.name,
        role: result.admin.role
      }
    })

    // Set admin token as HTTP-only cookie
    response.cookies.set('admin-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })

    return response

  } catch (error: any) {
    console.error('Admin login error:', error)
    
    // Check if it's a database table error
    if (error.message && error.message.includes('Could not find the table')) {
      return NextResponse.json(
        { error: 'Admin table not found. Please contact system administrator.' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
