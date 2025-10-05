import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/admin-middleware'
import { getAllQuestionsForAdmin } from '@/lib/db-operations'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    const admin = requireAdmin(request)
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || 'all'
    const difficulty = searchParams.get('difficulty') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Build query
    let query = supabase
      .from('questions')
      .select('*')

    // Add search filter
    if (search) {
      query = query.ilike('text', `%${search}%`)
    }

    // Add category filter
    if (category !== 'all') {
      query = query.eq('category', category)
    }

    // Add difficulty filter
    if (difficulty !== 'all') {
      query = query.eq('difficulty', difficulty)
    }

    // Add sorting
    query = query.order('id', { ascending: true })

    // Add pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data: questions, error: questionsError } = await query

    if (questionsError) {
      console.error('Error fetching questions:', questionsError)
      throw questionsError
    }

    // Get total count for pagination
    let countQuery = supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })

    if (search) {
      countQuery = countQuery.ilike('text', `%${search}%`)
    }

    if (category !== 'all') {
      countQuery = countQuery.eq('category', category)
    }

    if (difficulty !== 'all') {
      countQuery = countQuery.eq('difficulty', difficulty)
    }

    const { count: totalCount, error: countError } = await countQuery

    if (countError) {
      console.error('Error fetching questions count:', countError)
      throw countError
    }

    // Format questions to match the expected interface
    const formattedQuestions = (questions || []).map(question => ({
      id: question.id,
      text: question.text,
      category: question.category,
      difficulty: question.difficulty || 'easy',
      options: Array.isArray(question.options) ? question.options : ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
      createdAt: question.created_at || new Date().toISOString(),
      updatedAt: question.updated_at || new Date().toISOString(),
      isActive: question.is_active !== false // Default to true if undefined
    }))

    return NextResponse.json({
      questions: formattedQuestions,
      pagination: {
        page,
        limit,
        total: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch questions', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    const admin = requireAdmin(request)
    const body = await request.json()
    const { text, category, difficulty, options } = body

    if (!text || !category) {
      return NextResponse.json(
        { error: 'Question text and category are required' },
        { status: 400 }
      )
    }

    const { data: newQuestion, error: insertError } = await supabase
      .from('questions')
      .insert({
        text,
        category,
        difficulty: difficulty || 'easy',
        is_active: true,
        options: options || ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree']
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error creating question:', insertError)
      throw insertError
    }

    return NextResponse.json({
      success: true,
      question: {
        id: newQuestion.id,
        text: newQuestion.text,
        category: newQuestion.category,
        difficulty: newQuestion.difficulty || 'easy',
        options: Array.isArray(newQuestion.options) ? newQuestion.options : ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
        createdAt: newQuestion.created_at || new Date().toISOString(),
        updatedAt: newQuestion.updated_at || new Date().toISOString(),
        isActive: newQuestion.is_active !== false
      }
    })

  } catch (error) {
    console.error('Error creating question:', error)
    return NextResponse.json(
      { error: 'Failed to create question', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Require admin authentication
    const admin = requireAdmin(request)
    const body = await request.json()
    const { id, text, category, difficulty, options, isActive } = body

    if (!id || !text || !category) {
      return NextResponse.json(
        { error: 'Question ID, text, and category are required' },
        { status: 400 }
      )
    }

    const updateData: any = {
      text,
      category,
      options: options || ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree']
    }

    if (difficulty) {
      updateData.difficulty = difficulty
    }

    if (isActive !== undefined) {
      updateData.is_active = isActive
    }

    const { data: updatedQuestion, error: updateError } = await supabase
      .from('questions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating question:', updateError)
      throw updateError
    }

    return NextResponse.json({
      success: true,
      question: {
        id: updatedQuestion.id,
        text: updatedQuestion.text,
        category: updatedQuestion.category,
        difficulty: updatedQuestion.difficulty || 'easy',
        options: Array.isArray(updatedQuestion.options) ? updatedQuestion.options : ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
        createdAt: updatedQuestion.created_at || new Date().toISOString(),
        updatedAt: updatedQuestion.updated_at || new Date().toISOString(),
        isActive: updatedQuestion.is_active !== false
      }
    })

  } catch (error) {
    console.error('Error updating question:', error)
    return NextResponse.json(
      { error: 'Failed to update question', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Require admin authentication
    const admin = requireAdmin(request)
    const { searchParams } = new URL(request.url)
    const questionId = searchParams.get('id')

    if (!questionId) {
      return NextResponse.json(
        { error: 'Question ID is required' },
        { status: 400 }
      )
    }

    const { error: deleteError } = await supabase
      .from('questions')
      .delete()
      .eq('id', questionId)

    if (deleteError) {
      console.error('Error deleting question:', deleteError)
      throw deleteError
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error deleting question:', error)
    return NextResponse.json(
      { error: 'Failed to delete question', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
