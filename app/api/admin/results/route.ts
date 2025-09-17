import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/middleware/admin-auth'
import { getAllTestResults } from '@/lib/db-operations/admin-operations'

export const GET = withAdminAuth(async (request: NextRequest, admin) => {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const result = await getAllTestResults(page, limit)

    // Format test results for the admin panel
    const formattedResults = result.testResults.map(testResult => {
      // Calculate overall score from all intelligence percentages
      const scores = [
        testResult.linguistic_percentage,
        testResult.logical_percentage,
        testResult.spatial_percentage,
        testResult.musical_percentage,
        testResult.bodily_percentage,
        testResult.interpersonal_percentage,
        testResult.intrapersonal_percentage,
        testResult.naturalist_percentage,
      ]
      const overallScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)

      return {
        id: testResult.id,
        userEmail: testResult.users.email,
        userName: testResult.users.name,
        completedAt: testResult.created_at,
        totalScore: overallScore,
        level: 'Complete', // Since we don't store difficulty level separately
        topIntelligence: testResult.top_intelligence,
        secondIntelligence: testResult.second_intelligence,
        thirdIntelligence: testResult.third_intelligence,
        scores: {
          linguistic: testResult.linguistic_percentage,
          logical: testResult.logical_percentage,
          spatial: testResult.spatial_percentage,
          musical: testResult.musical_percentage,
          bodily: testResult.bodily_percentage,
          interpersonal: testResult.interpersonal_percentage,
          intrapersonal: testResult.intrapersonal_percentage,
          naturalist: testResult.naturalist_percentage,
        }
      }
    })

    return NextResponse.json({
      testResults: formattedResults,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages
      }
    })
  } catch (error: any) {
    console.error('Error fetching test results:', error)
    return NextResponse.json(
      { error: 'Failed to fetch test results', details: error.message },
      { status: 500 }
    )
  }
})