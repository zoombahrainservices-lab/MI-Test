import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/middleware/admin-auth'
import { getDashboardStats } from '@/lib/db-operations/admin-operations'

export const GET = withAdminAuth(async (request: NextRequest, admin) => {
  try {
    const stats = await getDashboardStats()
    
    // Format the response to match the expected structure
    const formattedRecentResults = stats.recentTests.map(result => {
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
        userEmail: (result.users as any)?.email || 'Unknown',
        completedAt: result.created_at,
        totalScore: overallScore,
        level: 'Complete',
        topIntelligence: result.top_intelligence,
        secondIntelligence: result.second_intelligence,
        thirdIntelligence: result.third_intelligence
      }
    })

    return NextResponse.json({
      stats: {
        totalUsers: stats.totalUsers,
        totalTests: stats.totalTests,
        averageScore: stats.averageScore,
        recentTests: stats.recentTests.length
      },
      recentResults: formattedRecentResults
    })
  } catch (error: any) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data', details: error.message },
      { status: 500 }
    )
  }
})