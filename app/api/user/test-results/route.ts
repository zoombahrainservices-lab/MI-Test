import { NextRequest, NextResponse } from 'next/server'
import { withUserAuth } from '@/lib/middleware/user-auth'
import { saveUserTestResult, getUserTestResults, getLatestUserTestResult } from '@/lib/db-operations/user-operations'
import { updateAnalytics } from '@/lib/db-operations'

// POST /api/user/test-results - Save a new test result
export const POST = withUserAuth(async (request: NextRequest, user) => {
  try {
    const { answers, scores, percentages, topIntelligence, secondIntelligence, thirdIntelligence } = await request.json()

    // Validate input
    if (!answers || !scores || !percentages) {
      return NextResponse.json(
        { error: 'Test data is required' },
        { status: 400 }
      )
    }

    // Save test result
    const testResult = await saveUserTestResult(user, {
      answers,
      scores,
      percentages,
      topIntelligence,
      secondIntelligence,
      thirdIntelligence,
    })

    // Update analytics
    await updateAnalytics()

    return NextResponse.json({ 
      success: true,
      testResult 
    })
  } catch (error) {
    console.error('Save user test result error:', error)
    return NextResponse.json(
      { error: 'Failed to save test result' },
      { status: 500 }
    )
  }
})

// GET /api/user/test-results - Get user's test results
export const GET = withUserAuth(async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url)
    const latest = searchParams.get('latest') === 'true'

    if (latest) {
      const testResult = await getLatestUserTestResult(user)
      return NextResponse.json({ testResult })
    } else {
      const testResults = await getUserTestResults(user)
      return NextResponse.json({ testResults })
    }
  } catch (error) {
    console.error('Get user test results error:', error)
    return NextResponse.json(
      { error: 'Failed to get test results' },
      { status: 500 }
    )
  }
})
