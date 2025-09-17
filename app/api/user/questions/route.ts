import { NextRequest, NextResponse } from 'next/server'
import { withUserAuth } from '@/lib/middleware/user-auth'
import { getActiveQuestions, getQuestionsByDifficulty } from '@/lib/db-operations/user-operations'

// GET /api/user/questions - Get questions for user
export const GET = withUserAuth(async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url)
    const difficulty = searchParams.get('difficulty') as 'easy' | 'medium' | 'hard' | null

    let questions
    if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) {
      questions = await getQuestionsByDifficulty(difficulty)
    } else {
      questions = await getActiveQuestions()
    }

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Get user questions error:', error)
    return NextResponse.json(
      { error: 'Failed to get questions' },
      { status: 500 }
    )
  }
})
