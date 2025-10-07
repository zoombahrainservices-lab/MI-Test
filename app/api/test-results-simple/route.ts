import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://llydesdtudepdiebfzfk.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxseWRlc2R0dWRlcGRpZWJmemZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTgzODQsImV4cCI6MjA3NTE3NDM4NH0.A8qjgiFYoygSxw7YCFkDU6jp7-bBzCUekOfc7LeN5Qk'

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
      linguistic_score: results.find(r => r.category === 'linguistic')?.score || 0,
      logical_score: results.find(r => r.category === 'logical')?.score || 0,
      spatial_score: results.find(r => r.category === 'spatial')?.score || 0,
      musical_score: results.find(r => r.category === 'musical')?.score || 0,
      bodily_score: results.find(r => r.category === 'bodily')?.score || 0,
      interpersonal_score: results.find(r => r.category === 'interpersonal')?.score || 0,
      intrapersonal_score: results.find(r => r.category === 'intrapersonal')?.score || 0,
      naturalist_score: results.find(r => r.category === 'naturalist')?.score || 0,
      linguistic_percentage: results.find(r => r.category === 'linguistic')?.percentage || 0,
      logical_percentage: results.find(r => r.category === 'logical')?.percentage || 0,
      spatial_percentage: results.find(r => r.category === 'spatial')?.percentage || 0,
      musical_percentage: results.find(r => r.category === 'musical')?.percentage || 0,
      bodily_percentage: results.find(r => r.category === 'bodily')?.percentage || 0,
      interpersonal_percentage: results.find(r => r.category === 'interpersonal')?.percentage || 0,
      intrapersonal_percentage: results.find(r => r.category === 'intrapersonal')?.percentage || 0,
      naturalist_percentage: results.find(r => r.category === 'naturalist')?.percentage || 0,
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
    return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 })
  }
}
