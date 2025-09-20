import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/admin-middleware'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    const admin = requireAdmin(request)
    // Get total users count
    const { count: totalUsers, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    if (usersError) {
      console.error('Error fetching users count:', usersError)
      throw usersError
    }

    // Get total tests count
    const { count: totalTests, error: testsError } = await supabase
      .from('test_results')
      .select('*', { count: 'exact', head: true })

    if (testsError) {
      console.error('Error fetching tests count:', testsError)
      throw testsError
    }

    // Get test results for average calculation
    const { data: testResults, error: resultsError } = await supabase
      .from('test_results')
      .select(`
        linguistic_percentage,
        logical_percentage,
        spatial_percentage,
        musical_percentage,
        bodily_percentage,
        interpersonal_percentage,
        intrapersonal_percentage,
        naturalist_percentage
      `)

    if (resultsError) {
      console.error('Error fetching test results:', resultsError)
      throw resultsError
    }

    // Calculate overall average score
    let totalScore = 0
    let scoreCount = 0
    
    if (testResults) {
      testResults.forEach(result => {
        const scores = [
          result.linguistic_percentage,
          result.logical_percentage,
          result.spatial_percentage,
          result.musical_percentage,
          result.bodily_percentage,
          result.interpersonal_percentage,
          result.intrapersonal_percentage,
          result.naturalist_percentage,
        ]
        
        const userAverage = scores.reduce((sum, score) => sum + score, 0) / scores.length
        totalScore += userAverage
        scoreCount++
      })
    }

    const averageScore = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0

    // Get tests completed today
    const today = new Date().toISOString().split('T')[0]
    const { count: recentTests, error: todayError } = await supabase
      .from('test_results')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today)

    if (todayError) {
      console.error('Error fetching today tests:', todayError)
      throw todayError
    }

    // Get recent test results for the table
    const { data: recentTestResults, error: recentError } = await supabase
      .from('test_results')
      .select(`
        id,
        created_at,
        linguistic_percentage,
        logical_percentage,
        spatial_percentage,
        musical_percentage,
        bodily_percentage,
        interpersonal_percentage,
        intrapersonal_percentage,
        naturalist_percentage,
        top_intelligence,
        second_intelligence,
        third_intelligence,
        users!inner(email)
      `)
      .order('created_at', { ascending: false })
      .limit(5)

    if (recentError) {
      console.error('Error fetching recent results:', recentError)
      throw recentError
    }

    const formattedRecentResults = (recentTestResults || []).map(result => {
      // Calculate overall score from all intelligence percentages
      const scores = [
        result.linguistic_percentage,
        result.logical_percentage,
        result.spatial_percentage,
        result.musical_percentage,
        result.bodily_percentage,
        result.interpersonal_percentage,
        result.intrapersonal_percentage,
        result.naturalist_percentage,
      ]
      const overallScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)

      return {
        id: result.id,
        userEmail: result.users?.[0]?.email || 'Unknown',
        completedAt: result.created_at,
        totalScore: overallScore,
        level: 'Complete', // Since we don't store difficulty level separately
        topIntelligence: result.top_intelligence,
        secondIntelligence: result.second_intelligence,
        thirdIntelligence: result.third_intelligence
      }
    })

    return NextResponse.json({
      stats: {
        totalUsers: totalUsers || 0,
        totalTests: totalTests || 0,
        averageScore,
        recentTests: recentTests || 0
      },
      recentResults: formattedRecentResults
    })

  } catch (error: any) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data', details: error?.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
