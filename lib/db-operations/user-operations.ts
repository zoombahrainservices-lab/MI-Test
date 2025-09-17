import { createClient } from '@supabase/supabase-js'
import { AuthenticatedUser } from '@/lib/middleware/user-auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface TestAnswer {
  questionId: number
  answer: number
}

export interface TestResultData {
  answers: TestAnswer[]
  scores: {
    linguistic: number
    logical: number
    spatial: number
    musical: number
    bodily: number
    interpersonal: number
    intrapersonal: number
    naturalist: number
  }
  percentages: {
    linguistic: number
    logical: number
    spatial: number
    musical: number
    bodily: number
    interpersonal: number
    intrapersonal: number
    naturalist: number
  }
  topIntelligence: string
  secondIntelligence: string
  thirdIntelligence: string
}

// User test result operations
export async function saveUserTestResult(user: AuthenticatedUser, data: TestResultData) {
  const { data: testResult, error } = await supabase
    .from('test_results')
    .insert({
      user_id: user.id,
      answers: data.answers,
      linguistic_score: data.scores.linguistic,
      logical_score: data.scores.logical,
      spatial_score: data.scores.spatial,
      musical_score: data.scores.musical,
      bodily_score: data.scores.bodily,
      interpersonal_score: data.scores.interpersonal,
      intrapersonal_score: data.scores.intrapersonal,
      naturalist_score: data.scores.naturalist,
      linguistic_percentage: data.percentages.linguistic,
      logical_percentage: data.percentages.logical,
      spatial_percentage: data.percentages.spatial,
      musical_percentage: data.percentages.musical,
      bodily_percentage: data.percentages.bodily,
      interpersonal_percentage: data.percentages.interpersonal,
      intrapersonal_percentage: data.percentages.intrapersonal,
      naturalist_percentage: data.percentages.naturalist,
      top_intelligence: data.topIntelligence,
      second_intelligence: data.secondIntelligence,
      third_intelligence: data.thirdIntelligence,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to save test result: ${error.message}`)
  }

  return testResult
}

export async function getUserTestResults(user: AuthenticatedUser) {
  const { data: testResults, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to get user test results: ${error.message}`)
  }

  return testResults
}

export async function getLatestUserTestResult(user: AuthenticatedUser) {
  const { data: testResult, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
    throw new Error(`Failed to get latest test result: ${error.message}`)
  }

  return testResult
}

// User profile operations
export async function getUserProfile(user: AuthenticatedUser) {
  const { data: profile, error } = await supabase
    .from('users')
    .select('id, email, name, created_at, is_active')
    .eq('id', user.id)
    .single()

  if (error) {
    throw new Error(`Failed to get user profile: ${error.message}`)
  }

  return profile
}

export async function updateUserProfile(user: AuthenticatedUser, updates: { name?: string }) {
  const { data: updatedProfile, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', user.id)
    .select('id, email, name, created_at, is_active')
    .single()

  if (error) {
    throw new Error(`Failed to update user profile: ${error.message}`)
  }

  return updatedProfile
}

// User questions operations
export async function getActiveQuestions() {
  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .eq('is_active', true)
    .order('id', { ascending: true })

  if (error) {
    throw new Error(`Failed to get questions: ${error.message}`)
  }

  return questions
}

export async function getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard') {
  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .eq('is_active', true)
    .eq('difficulty', difficulty)
    .order('id', { ascending: true })

  if (error) {
    throw new Error(`Failed to get questions by difficulty: ${error.message}`)
  }

  return questions
}
