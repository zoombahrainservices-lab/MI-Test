import { NextRequest, NextResponse } from 'next/server'
import { saveTestResult, getUserTestResults, updateAnalytics } from '@/lib/db-operations'
import { verifyToken } from '@/lib/auth'

// Ensure environment variables are loaded
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET environment variable is not set')
}

export async function POST(request: NextRequest) {
  try {
    // Try to get user from session cookies first
    const userCookie = request.cookies.get('user')?.value
    const tokenCookie = request.cookies.get('token')?.value
    
    console.log('User cookie:', userCookie ? 'Present' : 'Missing')
    console.log('Token cookie:', tokenCookie ? 'Present' : 'Missing')
    
    let user = null
    
    // Try session-based authentication first
    if (userCookie && tokenCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie))
        const tokenUser = verifyToken(tokenCookie)
        
        if (tokenUser && tokenUser.id === userData.id) {
          user = userData
          console.log('User authenticated via session cookies')
        }
      } catch (error) {
        console.log('Session cookie authentication failed:', error)
      }
    }
    
    // Fallback to Authorization header
    if (!user) {
      const authHeader = request.headers.get('authorization')
      console.log('Auth header:', authHeader ? 'Present' : 'Missing')
      
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7)
        console.log('Token extracted:', token ? 'Present' : 'Missing')
        
        user = verifyToken(token)
        console.log('User from token:', user ? 'Valid' : 'Invalid')
      }
    }
    
    if (!user) {
      console.log('No valid authentication found')
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    let { answers, scores, percentages, topIntelligence, secondIntelligence, thirdIntelligence, level, timing } = body

    // Backward/forward compatibility: if client sends `results` array, map it to scores/percentages and compute top 3
    if ((!scores || !percentages) && Array.isArray(body?.results)) {
      const resultsArray = body.results as Array<{ category: string; score: number; percentage: number }>

      // Initialize structures for all expected categories to avoid undefined keys
      const baseScores: Record<string, number> = {
        linguistic: 0,
        logical: 0,
        spatial: 0,
        musical: 0,
        bodily: 0,
        interpersonal: 0,
        intrapersonal: 0,
        naturalist: 0,
      }
      const basePercentages: Record<string, number> = { ...baseScores }

      for (const r of resultsArray) {
        // normalize incoming categories to lowercase canonical keys
        const c = (r.category || '').toLowerCase()
        const mapKey = c.includes('logical') ? 'logical'
          : c.includes('linguistic') ? 'linguistic'
          : c.includes('spatial') ? 'spatial'
          : (c.includes('music') || c.includes('creative')) ? 'musical'
          : (c.includes('bodily') || c.includes('kinesthetic')) ? 'bodily'
          : c.includes('interpersonal') ? 'interpersonal'
          : c.includes('intrapersonal') ? 'intrapersonal'
          : c.includes('natural') ? 'naturalist'
          : c
        baseScores[mapKey] = r.score
        basePercentages[mapKey] = r.percentage
      }

      // Sort by percentage to derive top three categories
      const sorted = [...resultsArray].sort((a, b) => b.percentage - a.percentage)
      scores = baseScores as typeof scores
      percentages = basePercentages as typeof percentages
      topIntelligence = sorted[0]?.category || 'linguistic'
      secondIntelligence = sorted[1]?.category || 'logical'
      thirdIntelligence = sorted[2]?.category || 'spatial'
      level = body.level || 'combined'
      timing = body.timing ?? null
    }

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
