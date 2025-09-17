import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/middleware/admin-auth'
import { 
  getQuestions, 
  createQuestion, 
  updateQuestion, 
  deleteQuestion, 
  toggleQuestionStatus 
} from '@/lib/db-operations/admin-operations'

export const GET = withAdminAuth(async (request: NextRequest, admin) => {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || 'all'
    const difficulty = searchParams.get('difficulty') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const result = await getQuestions({
      search,
      category,
      difficulty: difficulty as 'easy' | 'medium' | 'hard' | 'all',
      page,
      limit
    })

    // Format questions for the admin panel
    const formattedQuestions = result.questions.map(question => ({
      id: question.id,
      text: question.text,
      category: question.category,
      difficulty: question.difficulty || 'easy',
      options: Array.isArray(question.options) ? question.options : ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
      createdAt: question.created_at || new Date().toISOString(),
      updatedAt: question.updated_at || new Date().toISOString(),
      isActive: question.is_active !== false
    }))

    return NextResponse.json({
      questions: formattedQuestions,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages
      }
    })
  } catch (error: any) {
    console.error('Error fetching questions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch questions', details: error.message },
      { status: 500 }
    )
  }
})

export const POST = withAdminAuth(async (request: NextRequest, admin) => {
  try {
    const body = await request.json()
    const { text, category, difficulty, options } = body

    // Validate input
    if (!text || !category || !difficulty || !options) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return NextResponse.json(
        { error: 'Difficulty must be easy, medium, or hard' },
        { status: 400 }
      )
    }

    if (!Array.isArray(options) || options.length === 0) {
      return NextResponse.json(
        { error: 'Options must be a non-empty array' },
        { status: 400 }
      )
    }

    const question = await createQuestion({
      text,
      category,
      difficulty: difficulty as 'easy' | 'medium' | 'hard',
      options
    })

    return NextResponse.json({
      success: true,
      question: {
        id: question.id,
        text: question.text,
        category: question.category,
        difficulty: question.difficulty,
        options: question.options,
        createdAt: question.created_at,
        updatedAt: question.updated_at,
        isActive: question.is_active
      }
    })
  } catch (error: any) {
    console.error('Error creating question:', error)
    return NextResponse.json(
      { error: 'Failed to create question', details: error.message },
      { status: 500 }
    )
  }
})

export const PUT = withAdminAuth(async (request: NextRequest, admin) => {
  try {
    const body = await request.json()
    const { id, text, category, difficulty, options, isActive } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Question ID is required' },
        { status: 400 }
      )
    }

    const updates: any = {}
    if (text !== undefined) updates.text = text
    if (category !== undefined) updates.category = category
    if (difficulty !== undefined) {
      if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        return NextResponse.json(
          { error: 'Difficulty must be easy, medium, or hard' },
          { status: 400 }
        )
      }
      updates.difficulty = difficulty
    }
    if (options !== undefined) {
      if (!Array.isArray(options) || options.length === 0) {
        return NextResponse.json(
          { error: 'Options must be a non-empty array' },
          { status: 400 }
        )
      }
      updates.options = options
    }
    if (isActive !== undefined) updates.isActive = isActive

    const question = await updateQuestion(id, updates)

    return NextResponse.json({
      success: true,
      question: {
        id: question.id,
        text: question.text,
        category: question.category,
        difficulty: question.difficulty,
        options: question.options,
        createdAt: question.created_at,
        updatedAt: question.updated_at,
        isActive: question.is_active
      }
    })
  } catch (error: any) {
    console.error('Error updating question:', error)
    return NextResponse.json(
      { error: 'Failed to update question', details: error.message },
      { status: 500 }
    )
  }
})

export const DELETE = withAdminAuth(async (request: NextRequest, admin) => {
  try {
    const { searchParams } = new URL(request.url)
    const questionId = searchParams.get('id')

    if (!questionId) {
      return NextResponse.json(
        { error: 'Question ID is required' },
        { status: 400 }
      )
    }

    await deleteQuestion(parseInt(questionId))
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting question:', error)
    return NextResponse.json(
      { error: 'Failed to delete question', details: error.message },
      { status: 500 }
    )
  }
})

// PATCH for toggling question status
export const PATCH = withAdminAuth(async (request: NextRequest, admin) => {
  try {
    const { searchParams } = new URL(request.url)
    const questionId = searchParams.get('id')

    if (!questionId) {
      return NextResponse.json(
        { error: 'Question ID is required' },
        { status: 400 }
      )
    }

    const question = await toggleQuestionStatus(parseInt(questionId))

    return NextResponse.json({
      success: true,
      question: {
        id: question.id,
        text: question.text,
        category: question.category,
        difficulty: question.difficulty,
        options: question.options,
        createdAt: question.created_at,
        updatedAt: question.updated_at,
        isActive: question.is_active
      }
    })
  } catch (error: any) {
    console.error('Error toggling question status:', error)
    return NextResponse.json(
      { error: 'Failed to toggle question status', details: error.message },
      { status: 500 }
    )
  }
})