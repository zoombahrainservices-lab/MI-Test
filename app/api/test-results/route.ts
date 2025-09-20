import { NextRequest, NextResponse } from 'next/server'
import { saveTestResult, getUserTestResults, updateAnalytics } from '@/lib/db-operations'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const { answers, scores, percentages, topIntelligence, secondIntelligence, thirdIntelligence, level, timing } = await request.json()

    // Validate input
    if (!answers || !scores || !percentages) {
      return NextResponse.json(
        { error: 'Test data is required' },
        { status: 400 }
      )
    }

    // Save test result
    const testResult = await saveTestResult({
      userId: user.id,
      answers,
      scores,
      percentages,
      topIntelligence,
      secondIntelligence,
      thirdIntelligence,
      level,
      timing
    })

    // Update analytics
    await updateAnalytics()

    return NextResponse.json({ testResult })
  } catch (error) {
    console.error('Save test result error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const testResults = await getUserTestResults(user.id)
    return NextResponse.json({ testResults })
  } catch (error) {
    console.error('Get test results error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
