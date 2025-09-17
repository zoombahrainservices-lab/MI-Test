import { createClient } from '@supabase/supabase-js'
import { AuthenticatedAdmin } from '@/lib/middleware/admin-auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface UserFilters {
  search?: string
  status?: 'active' | 'inactive' | 'all'
  sortBy?: 'email' | 'name' | 'created_at'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface QuestionFilters {
  search?: string
  category?: string
  difficulty?: 'easy' | 'medium' | 'hard' | 'all'
  isActive?: boolean
  page?: number
  limit?: number
}

export interface CreateQuestionData {
  text: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  options: string[]
}

export interface UpdateQuestionData {
  text?: string
  category?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  options?: string[]
  isActive?: boolean
}

// Admin dashboard operations
export async function getDashboardStats() {
  try {
    // Get total users
    const { count: totalUsers, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    if (usersError) {
      throw new Error(`Failed to get total users: ${usersError.message}`)
    }

    // Get total tests
    const { count: totalTests, error: testsError } = await supabase
      .from('test_results')
      .select('*', { count: 'exact', head: true })

    if (testsError) {
      throw new Error(`Failed to get total tests: ${testsError.message}`)
    }

    // Get average scores
    const { data: avgScores, error: avgError } = await supabase
      .from('test_results')
      .select('linguistic_percentage, logical_percentage, spatial_percentage, musical_percentage, bodily_percentage, interpersonal_percentage, intrapersonal_percentage, naturalist_percentage')

    if (avgError) {
      throw new Error(`Failed to get average scores: ${avgError.message}`)
    }

    // Calculate average score
    let averageScore = 0
    if (avgScores && avgScores.length > 0) {
      const totalScore = avgScores.reduce((sum, result) => {
        return sum + (
          result.linguistic_percentage +
          result.logical_percentage +
          result.spatial_percentage +
          result.musical_percentage +
          result.bodily_percentage +
          result.interpersonal_percentage +
          result.intrapersonal_percentage +
          result.naturalist_percentage
        ) / 8
      }, 0)
      averageScore = Math.round(totalScore / avgScores.length)
    }

    // Get recent tests
    const { data: recentTests, error: recentError } = await supabase
      .from('test_results')
      .select(`
        id,
        created_at,
        top_intelligence,
        second_intelligence,
        third_intelligence,
        linguistic_percentage,
        logical_percentage,
        spatial_percentage,
        musical_percentage,
        bodily_percentage,
        interpersonal_percentage,
        intrapersonal_percentage,
        naturalist_percentage,
        users!inner(email, name)
      `)
      .order('created_at', { ascending: false })
      .limit(5)

    if (recentError) {
      throw new Error(`Failed to get recent tests: ${recentError.message}`)
    }

    return {
      totalUsers: totalUsers || 0,
      totalTests: totalTests || 0,
      averageScore,
      recentTests: recentTests || []
    }
  } catch (error) {
    console.error('Error getting dashboard stats:', error)
    throw error
  }
}

// Admin user management operations
export async function getUsers(filters: UserFilters = {}) {
  const {
    search = '',
    status = 'all',
    sortBy = 'created_at',
    sortOrder = 'desc',
    page = 1,
    limit = 10
  } = filters

  let query = supabase
    .from('users')
    .select('*', { count: 'exact' })

  // Apply search filter
  if (search) {
    query = query.or(`email.ilike.%${search}%,name.ilike.%${search}%`)
  }

  // Apply status filter
  if (status !== 'all') {
    const isActive = status === 'active'
    query = query.eq('is_active', isActive)
  }

  // Apply sorting
  query = query.order(sortBy, { ascending: sortOrder === 'asc' })

  // Apply pagination
  const from = (page - 1) * limit
  const to = from + limit - 1
  query = query.range(from, to)

  const { data: users, error, count } = await query

  if (error) {
    throw new Error(`Failed to get users: ${error.message}`)
  }

  return {
    users: users || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit)
  }
}

export async function updateUserStatus(userId: string, status: 'active' | 'inactive') {
  const isActive = status === 'active'

  const { data: updatedUser, error } = await supabase
    .from('users')
    .update({ is_active: isActive })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update user status: ${error.message}`)
  }

  return updatedUser
}

export async function deleteUser(userId: string) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId)

  if (error) {
    throw new Error(`Failed to delete user: ${error.message}`)
  }

  return { success: true }
}

// Admin question management operations
export async function getQuestions(filters: QuestionFilters = {}) {
  const {
    search = '',
    category = 'all',
    difficulty = 'all',
    isActive = undefined,
    page = 1,
    limit = 10
  } = filters

  let query = supabase
    .from('questions')
    .select('*', { count: 'exact' })

  // Apply search filter
  if (search) {
    query = query.ilike('text', `%${search}%`)
  }

  // Apply category filter
  if (category !== 'all') {
    query = query.eq('category', category)
  }

  // Apply difficulty filter
  if (difficulty !== 'all') {
    query = query.eq('difficulty', difficulty)
  }

  // Apply active status filter
  if (isActive !== undefined) {
    query = query.eq('is_active', isActive)
  }

  // Apply sorting
  query = query.order('id', { ascending: true })

  // Apply pagination
  const from = (page - 1) * limit
  const to = from + limit - 1
  query = query.range(from, to)

  const { data: questions, error, count } = await query

  if (error) {
    throw new Error(`Failed to get questions: ${error.message}`)
  }

  return {
    questions: questions || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit)
  }
}

export async function createQuestion(data: CreateQuestionData) {
  const { data: question, error } = await supabase
    .from('questions')
    .insert({
      text: data.text,
      category: data.category,
      difficulty: data.difficulty,
      options: data.options,
      is_active: true
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create question: ${error.message}`)
  }

  return question
}

export async function updateQuestion(questionId: number, data: UpdateQuestionData) {
  const { data: question, error } = await supabase
    .from('questions')
    .update(data)
    .eq('id', questionId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update question: ${error.message}`)
  }

  return question
}

export async function deleteQuestion(questionId: number) {
  const { error } = await supabase
    .from('questions')
    .delete()
    .eq('id', questionId)

  if (error) {
    throw new Error(`Failed to delete question: ${error.message}`)
  }

  return { success: true }
}

export async function toggleQuestionStatus(questionId: number) {
  // First get the current status
  const { data: question, error: fetchError } = await supabase
    .from('questions')
    .select('is_active')
    .eq('id', questionId)
    .single()

  if (fetchError) {
    throw new Error(`Failed to fetch question: ${fetchError.message}`)
  }

  // Toggle the status
  const { data: updatedQuestion, error: updateError } = await supabase
    .from('questions')
    .update({ is_active: !question.is_active })
    .eq('id', questionId)
    .select()
    .single()

  if (updateError) {
    throw new Error(`Failed to toggle question status: ${updateError.message}`)
  }

  return updatedQuestion
}

// Admin test results operations
export async function getAllTestResults(page: number = 1, limit: number = 10) {
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data: testResults, error, count } = await supabase
    .from('test_results')
    .select(`
      id,
      created_at,
      linguistic_percentage,
      logical_percentage,
      spatial_percentage,
      musical_percentage,
      bodily_percentage,
      interpersonal_percentage,
      intrapersonal_percentage,
      naturalist_percentage,
      top_intelligence,
      second_intelligence,
      third_intelligence,
      users!inner(email, name)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    throw new Error(`Failed to get test results: ${error.message}`)
  }

  return {
    testResults: testResults || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit)
  }
}
