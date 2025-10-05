import { NextResponse } from 'next/server'
import { getMixedQuestions } from '@/lib/db-operations'

export async function GET() {
  try {
    // Mix Likert and MCQ questions
    const questions = await getMixedQuestions()
    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Get questions error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
