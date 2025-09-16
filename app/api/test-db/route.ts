import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xfsakpxluorfhumjopgp.supabase.co'
const supabaseKey = 'sb_secret_Hzf1NZJpdq-wLRU6W1RN-A_NZHzWxAa'

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1)
    
    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        message: 'Supabase connection working but table might not exist'
      })
    }
    
    return NextResponse.json({
      success: true,
      data,
      message: 'Database connection successful'
    })
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      message: 'Database connection failed'
    })
  }
}
