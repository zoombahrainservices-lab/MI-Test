import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://llydesdtudepdiebfzfk.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxseWRlc2R0dWRlcGRpZWJmemZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTgzODQsImV4cCI6MjA3NTE3NDM4NH0.A8qjgiFYoygSxw7YCFkDU6jp7-bBzCUekOfc7LeN5Qk'

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    // Get users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (usersError) {
      console.error('Error fetching users:', usersError)
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }

    // Get test results
    let results = []
    if (userId) {
      console.log('Fetching results for user:', userId)
      const { data: userResults, error: resultsError } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (resultsError) {
        console.error('Error fetching results:', resultsError)
      } else {
        results = userResults || []
        console.log('Found results for user:', results.length)
      }
    } else {
      // Get all test results
      const { data: allResults, error: allResultsError } = await supabase
        .from('test_results')
        .select('*')
        .order('created_at', { ascending: false })

      if (allResultsError) {
        console.error('Error fetching all results:', allResultsError)
      } else {
        results = allResults || []
        console.log('Found all results:', results.length)
      }
    }

    return NextResponse.json({ 
      users: users || [],
      testResults: results,
      message: 'Debug data retrieved successfully'
    })
  } catch (error) {
    console.error('Error in test-results-debug API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
