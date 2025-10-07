import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    return NextResponse.json({
      supabaseUrl,
      supabaseAnonKey: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'Not set',
      message: 'Environment variables check'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to check environment variables' }, { status: 500 })
  }
}
