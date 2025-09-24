import { createClient } from '@supabase/supabase-js'
import { hashPassword, verifyPassword } from './auth'

// Use service role key for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface CreateUserData {
  email: string
  name?: string
  password: string
}

export interface TestAnswer {
  questionId: number
  answer: number
}

export interface TestResultData {
  userId: string
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
  level?: string
  timing?: any
}

// User operations
export async function createUser(data: CreateUserData) {
  const hashedPassword = await hashPassword(data.password)
  
  const { data: newUser, error } = await supabase
    .from('users')
    .insert({
      email: data.email,
      name: data.name,
      password: hashedPassword,
      is_active: true
    })
    .select('id, email, name, created_at')
    .single()

  if (error) {
    throw new Error(`Failed to create user: ${error.message}`)
  }

  return newUser
}

export async function findUserByEmail(email: string) {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
    throw new Error(`Failed to find user: ${error.message}`)
  }

  return user
}

export async function findUserById(id: string) {
  const { data: user, error } = await supabase
    .from('users')
    .select('id, email, name, created_at')
    .eq('id', id)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
    throw new Error(`Failed to find user: ${error.message}`)
  }

  return user
}

export async function verifyUserCredentials(email: string, password: string) {
  const user = await findUserByEmail(email)
  if (!user) return null

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  }
}

// Test result operations
export async function saveTestResult(data: TestResultData) {
  const { data: testResult, error } = await supabase
    .from('test_results')
    .insert({
      user_id: data.userId,
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
      level: data.level || 'combined',
      timing_data: data.timing || null,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to save test result: ${error.message}`)
  }

  return testResult
}

export async function getUserTestResults(userId: string) {
  const { data: testResults, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to get user test results: ${error.message}`)
  }

  return testResults
}

export async function getLatestTestResult(userId: string) {
  const { data: testResult, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
    throw new Error(`Failed to get latest test result: ${error.message}`)
  }

  return testResult
}

// Question operations
export async function getAllQuestions() {
  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    throw new Error(`Failed to get questions: ${error.message}`)
  }

  // Shuffle the questions array using Fisher-Yates algorithm
  const shuffledQuestions = [...questions]
  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]]
  }

  // Select only 50 random questions from the shuffled 74
  const selectedQuestions = shuffledQuestions.slice(0, 50)
  
  console.log(`🔄 Questions shuffled: ${questions.length} total, selected ${selectedQuestions.length} random questions`)
  console.log(`📋 First question ID: ${selectedQuestions[0]?.id}, Text: "${selectedQuestions[0]?.text?.substring(0, 50)}..."`)
  
  return selectedQuestions
}

// Get questions in original order for admin management
export async function getAllQuestionsForAdmin() {
  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    throw new Error(`Failed to get questions: ${error.message}`)
  }

  return questions
}

export async function createQuestion(data: {
  text: string
  category: string
  options: string[]
}) {
  const { data: question, error } = await supabase
    .from('questions')
    .insert({
      text: data.text,
      category: data.category,
      options: data.options,
      difficulty: 'easy',
      is_active: true
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create question: ${error.message}`)
  }

  return question
}

// Analytics operations
export async function updateAnalytics() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)

  // Check if analytics entry exists for today
  const { data: existingAnalytics, error: findError } = await supabase
    .from('analytics')
    .select('*')
    .gte('date', today.toISOString())
    .lt('date', tomorrow.toISOString())
    .single()

  if (findError && findError.code !== 'PGRST116') { // PGRST116 is "not found"
    throw new Error(`Failed to check analytics: ${findError.message}`)
  }

  if (existingAnalytics) {
    // Update existing analytics
    const { data: updatedAnalytics, error: updateError } = await supabase
      .from('analytics')
      .update({
        total_tests: existingAnalytics.total_tests + 1,
      })
      .eq('id', existingAnalytics.id)
      .select()
      .single()

    if (updateError) {
      throw new Error(`Failed to update analytics: ${updateError.message}`)
    }

    return updatedAnalytics
  } else {
    // Create new analytics entry
    const { data: newAnalytics, error: createError } = await supabase
      .from('analytics')
      .insert({
        date: today.toISOString(),
        total_tests: 1,
        total_users: 0,
      })
      .select()
      .single()

    if (createError) {
      throw new Error(`Failed to create analytics: ${createError.message}`)
    }

    return newAnalytics
  }
}

export async function getAnalytics() {
  const { data: analytics, error } = await supabase
    .from('analytics')
    .select('*')
    .order('date', { ascending: false })
    .limit(30) // Last 30 days

  if (error) {
    throw new Error(`Failed to get analytics: ${error.message}`)
  }

  return analytics
}
