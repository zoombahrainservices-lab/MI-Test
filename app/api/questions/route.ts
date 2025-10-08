import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    const { data: questions, error } = await supabase
      .from('questions')
      .select('*')
      .eq('is_active', true)
      .order('id')

    if (error) {
      console.error('Error fetching questions:', error)
      return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
    }

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Internal server error: ' + errorMessage }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { questions } = await request.json()

    if (!questions || !Array.isArray(questions)) {
      return NextResponse.json({ error: 'Questions array is required' }, { status: 400 })
    }

    // Clear existing questions first
    const { error: deleteError } = await supabase
      .from('questions')
      .delete()
      .neq('id', 0)

    if (deleteError) {
      console.error('Error clearing questions:', deleteError)
      return NextResponse.json({ error: 'Failed to clear existing questions' }, { status: 500 })
    }

    // Insert new questions
    const { data, error } = await supabase
      .from('questions')
      .insert(questions)
      .select()

    if (error) {
      console.error('Error inserting questions:', error)
      return NextResponse.json({ error: 'Failed to insert questions' }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Questions added successfully', 
      count: data?.length || 0,
      questions: data 
    })
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Internal server error: ' + errorMessage }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const { error } = await supabase
      .from('questions')
      .delete()
      .neq('id', 0)

    if (error) {
      console.error('Error clearing questions:', error)
      return NextResponse.json({ error: 'Failed to clear questions' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Questions cleared successfully' })
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Internal server error: ' + errorMessage }, { status: 500 })
  }
}