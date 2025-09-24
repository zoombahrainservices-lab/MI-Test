import { NextResponse } from 'next/server'
import { getAllQuestions } from '@/lib/db-operations'

export async function GET() {
  try {
    // getAllQuestions() returns questions in random order (shuffled)
    const questions = await getAllQuestions()
    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Get questions error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
