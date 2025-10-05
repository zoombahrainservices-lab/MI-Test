import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateToken } from '@/lib/auth'

const supabaseUrl = 'https://llydesdtudepdiebfzfk.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json()

    if (!user) {
      return NextResponse.json(
        { error: 'User data is required' },
        { status: 400 }
      )
    }

    // Check if user already exists in our users table
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', user.email)
      .single()

    if (existingUser) {
      // User exists, generate token and return their data
      const token = generateToken({
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name
      })
      
      return NextResponse.json({
        user: {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name
        },
        token,
        message: 'User logged in successfully'
      })
    }

    // Create new user in our users table
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Google User',
          password: 'oauth-user-no-password' // Default password for OAuth users
        }
      ])
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Generate token for new user
    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    })

    return NextResponse.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      },
      token,
      message: 'User created successfully'
    })
  } catch (error) {
    console.error('Google callback error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
