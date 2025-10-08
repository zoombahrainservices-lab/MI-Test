import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Internal server error: ' + errorMessage }, { status: 500 })
  }
}
