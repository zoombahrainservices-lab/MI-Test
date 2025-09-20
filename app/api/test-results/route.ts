import { NextRequest, NextResponse } from 'next/server'
import { saveTestResult, getUserTestResults, updateAnalytics } from '@/lib/db-operations'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    console.log('Test results API called')
    
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No authorization header found')
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    console.log('Token found, verifying...', { token: token.substring(0, 20) + '...' })
    const user = verifyToken(token)
    if (!user) {
      console.log('Token verification failed - token might be expired or invalid')
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    console.log('User verified:', user)
    const requestBody = await request.json()
    console.log('Request body received:', requestBody)
    
    const { answers, scores, percentages, topIntelligence, secondIntelligence, thirdIntelligence } = requestBody

    // Validate input
    if (!answers || !scores || !percentages) {
      console.log('Validation failed - missing required data:', { answers: !!answers, scores: !!scores, percentages: !!percentages })
      return NextResponse.json(
        { error: 'Test data is required' },
        { status: 400 }
      )
    }

    console.log('Validation passed, saving test result...')
    
    // Save test result
    const testResult = await saveTestResult({
      userId: user.id,
      answers,
      scores,
      percentages,
      topIntelligence,
      secondIntelligence,
      thirdIntelligence,
    })

    console.log('Test result saved successfully:', testResult)

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
