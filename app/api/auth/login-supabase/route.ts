import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { generateToken } from '@/lib/auth'

const supabaseUrl = 'https://llydesdtudepdiebfzfk.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

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

    // Find user by email
    const { data: user, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (findError || !user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if this is an OAuth user (has default OAuth password)
    if (user.password === 'oauth-user-no-password') {
      return NextResponse.json(
        { error: 'This account was created with Google. Please use Google sign-in instead.' },
        { status: 401 }
      )
    }

    // Verify password for regular users
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate proper JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
