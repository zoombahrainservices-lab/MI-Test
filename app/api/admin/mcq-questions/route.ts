import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/admin-middleware'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const admin = requireAdmin(request)
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const difficulty = searchParams.get('difficulty') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let query = supabase.from('mcq_questions').select('*')
    if (search) query = query.ilike('text', `%${search}%`)
    if (difficulty !== 'all') query = query.eq('difficulty', difficulty)
    query = query.order('id', { ascending: true })

    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error } = await query
    if (error) throw error

    // count
    let countQuery = supabase.from('mcq_questions').select('*', { count: 'exact', head: true })
    if (search) countQuery = countQuery.ilike('text', `%${search}%`)
    if (difficulty !== 'all') countQuery = countQuery.eq('difficulty', difficulty)
    const { count, error: countError } = await countQuery
    if (countError) throw countError

    return NextResponse.json({
      questions: (data || []).map(q => ({
        id: q.id,
        text: q.text,
        options: q.options || [],
        correctAnswers: q.correct_answers || [],
        explanation: q.explanation || null,
        difficulty: q.difficulty || 'easy',
        isActive: q.is_active !== false,
        createdAt: q.created_at,
        updatedAt: q.updated_at,
      })),
      pagination: { page, limit, total: count || 0, totalPages: Math.ceil((count || 0) / limit) }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch MCQ questions' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = requireAdmin(request)
    const body = await request.json()
    const { text, options, correctAnswers, explanation, difficulty, isActive } = body

    if (!text || !Array.isArray(options) || options.length < 2) {
      return NextResponse.json({ error: 'Text and at least 2 options required' }, { status: 400 })
    }
    if (!Array.isArray(correctAnswers) || correctAnswers.length < 1) {
      return NextResponse.json({ error: 'At least one correct answer index required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('mcq_questions')
      .insert({
        text,
        options,
        correct_answers: correctAnswers,
        explanation: explanation || null,
        difficulty: difficulty || 'easy',
        is_active: isActive !== false,
      })
      .select()
      .single()
    if (error) throw error

    return NextResponse.json({ success: true, question: data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create MCQ question' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = requireAdmin(request)
    const body = await request.json()
    const { id, text, options, correctAnswers, explanation, difficulty, isActive } = body
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    const update: any = {}
    if (text !== undefined) update.text = text
    if (options !== undefined) update.options = options
    if (correctAnswers !== undefined) update.correct_answers = correctAnswers
    if (explanation !== undefined) update.explanation = explanation
    if (difficulty !== undefined) update.difficulty = difficulty
    if (isActive !== undefined) update.is_active = isActive

    const { data, error } = await supabase
      .from('mcq_questions')
      .update(update)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return NextResponse.json({ success: true, question: data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update MCQ question' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const admin = requireAdmin(request)
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    const { error } = await supabase.from('mcq_questions').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete MCQ question' }, { status: 500 })
  }
}


