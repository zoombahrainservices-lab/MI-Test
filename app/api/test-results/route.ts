import { NextRequest, NextResponse } from 'next/server'
import { saveTestResult, getUserTestResults, updateAnalytics } from '@/lib/db-operations'
import { verifyToken } from '@/lib/auth'

// Ensure environment variables are loaded
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET environment variable is not set')
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    console.log('Auth header:', authHeader ? 'Present' : 'Missing')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid authorization header found')
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    console.log('Token extracted:', token ? 'Present' : 'Missing')
    
    const user = verifyToken(token)
    console.log('User from token:', user ? 'Valid' : 'Invalid')
    console.log('JWT_SECRET available:', process.env.JWT_SECRET ? 'Yes' : 'No')
    
    if (!user) {
      console.log('Token verification failed. Token:', token.substring(0, 20) + '...')
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
