import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const { 
      userId, 
      responses, 
      results, 
      enhancedResults,
      gender,
      timing 
    } = await request.json()

    if (!userId || !responses || !results) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    console.log('Storing test results for user:', userId)
    console.log('Results:', results)
    console.log('Enhanced results:', enhancedResults)

    // Store test results using existing schema structure
    const responsesArray = responses.map((response: any) => ({
      question_id: response.questionId,
      answer: response.answer
    }))
    
    // Format responses as requested: array of objects with answer, category, difficulty, questionId
    const answersArray = responses.map((response: any) => ({
      answer: response.answer,
      category: response.category,
      difficulty: response.difficulty,
      questionId: response.questionId
    }))
    
    const testResultData = {
      user_id: userId,
      level: 'combined',
      answers: answersArray, // Store responses in the new format
      responses: responses, // Store raw responses as JSONB
      results: results, // Store traditional results as JSONB
      enhanced_results: enhancedResults || null, // Store enhanced results as JSONB
      gender: gender || null,
      // Map the individual intelligence scores using existing columns
      linguistic_score: results.find((r: any) => r.category === 'linguistic')?.score || 0,
      logical_score: results.find((r: any) => r.category === 'logical')?.score || 0,
      spatial_score: results.find((r: any) => r.category === 'spatial')?.score || 0,
      musical_score: results.find((r: any) => r.category === 'musical')?.score || 0,
      bodily_score: results.find((r: any) => r.category === 'bodily')?.score || 0,
      interpersonal_score: results.find((r: any) => r.category === 'interpersonal')?.score || 0,
      intrapersonal_score: results.find((r: any) => r.category === 'intrapersonal')?.score || 0,
      naturalist_score: results.find((r: any) => r.category === 'naturalist')?.score || 0,
      linguistic_percentage: results.find((r: any) => r.category === 'linguistic')?.percentage || 0,
      logical_percentage: results.find((r: any) => r.category === 'logical')?.percentage || 0,
      spatial_percentage: results.find((r: any) => r.category === 'spatial')?.percentage || 0,
      musical_percentage: results.find((r: any) => r.category === 'musical')?.percentage || 0,
      bodily_percentage: results.find((r: any) => r.category === 'bodily')?.percentage || 0,
      interpersonal_percentage: results.find((r: any) => r.category === 'interpersonal')?.percentage || 0,
      intrapersonal_percentage: results.find((r: any) => r.category === 'intrapersonal')?.percentage || 0,
      naturalist_percentage: results.find((r: any) => r.category === 'naturalist')?.percentage || 0,
      top_intelligence: results[0]?.category || 'unknown',
      second_intelligence: results[1]?.category || 'unknown',
      third_intelligence: results[2]?.category || 'unknown',
      timing_data: timing || null
    }

    const { data: testResult, error: testResultError } = await supabase
      .from('test_results')
      .insert([testResultData])
      .select()
      .single()

    if (testResultError) {
      console.error('Error storing test result:', testResultError)
      return NextResponse.json({ error: 'Failed to store test result: ' + testResultError.message }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Test results stored successfully',
      testResultId: testResult.id,
      responsesCount: responses.length
    })

  } catch (error) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Internal server error: ' + errorMessage }, { status: 500 })
  }
}
