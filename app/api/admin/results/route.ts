import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin } from '@/lib/admin-middleware'

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
    const dateFilter = searchParams.get('dateFilter') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Build query
    let query = supabase
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
        users!inner(email)
      `)

    // Add search filter
    if (search) {
      query = query.eq('users.email', search)
    }

    // Add date filtering
    if (dateFilter !== 'all') {
      const now = new Date()
      let startDate: string

      switch (dateFilter) {
        case 'today':
          startDate = now.toISOString().split('T')[0]
          break
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          startDate = weekAgo.toISOString()
          break
        case 'month':
          const monthAgo = new Date(now.getFullYear(), now.getMonth(), 1)
          startDate = monthAgo.toISOString()
          break
        default:
          startDate = '1970-01-01T00:00:00.000Z' // All time
      }

      query = query.gte('created_at', startDate)
    }

    // Add sorting and pagination
    query = query.order('created_at', { ascending: false })
    
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data: results, error: resultsError } = await query

    if (resultsError) {
      console.error('Error fetching test results:', resultsError)
      throw resultsError
    }

    // Get total count for pagination
    let countQuery = supabase
      .from('test_results')
      .select('*', { count: 'exact', head: true })

    if (search) {
      countQuery = countQuery.eq('users.email', search)
    }

    if (dateFilter !== 'all') {
      const now = new Date()
      let startDate: string

      switch (dateFilter) {
        case 'today':
          startDate = now.toISOString().split('T')[0]
          break
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          startDate = weekAgo.toISOString()
          break
        case 'month':
          const monthAgo = new Date(now.getFullYear(), now.getMonth(), 1)
          startDate = monthAgo.toISOString()
          break
        default:
          startDate = '1970-01-01T00:00:00.000Z'
      }

      countQuery = countQuery.gte('created_at', startDate)
    }

    const { count: totalCount, error: countError } = await countQuery

    if (countError) {
      console.error('Error fetching results count:', countError)
      throw countError
    }

    // Format results
    const formattedResults = (results || []).map(result => {
      // Calculate scores for each difficulty level
      // Since we don't store difficulty levels separately, we'll simulate them
      // based on the overall scores
      const scores = [
        result.linguistic_percentage,
        result.logical_percentage,
        result.spatial_percentage,
        result.musical_percentage,
        result.bodily_percentage,
        result.interpersonal_percentage,
        result.intrapersonal_percentage,
        result.naturalist_percentage,
      ]
      
      const overallScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
      
      // Simulate difficulty level scores (in a real app, you'd store these separately)
      const easyScore = Math.min(100, overallScore + Math.floor(Math.random() * 10))
      const mediumScore = overallScore
      const hardScore = Math.max(0, overallScore - Math.floor(Math.random() * 10))

      // Create intelligence profile
      const intelligenceProfile = [
        { category: 'Linguistic', percentage: result.linguistic_percentage },
        { category: 'Logical-Mathematical', percentage: result.logical_percentage },
        { category: 'Spatial', percentage: result.spatial_percentage },
        { category: 'Musical', percentage: result.musical_percentage },
        { category: 'Bodily-Kinesthetic', percentage: result.bodily_percentage },
        { category: 'Interpersonal', percentage: result.interpersonal_percentage },
        { category: 'Intrapersonal', percentage: result.intrapersonal_percentage },
        { category: 'Naturalist', percentage: result.naturalist_percentage },
      ].sort((a, b) => b.percentage - a.percentage)

      return {
        id: result.id,
        userEmail: (result.users as any)?.email || 'Unknown',
        completedAt: result.created_at,
        easyScore,
        mediumScore,
        hardScore,
        totalTime: 1800, // Simulate 30 minutes total time
        intelligenceProfile
      }
    })

    return NextResponse.json({
      results: formattedResults,
      pagination: {
        page,
        limit,
        total: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching test results:', error)
    return NextResponse.json(
      { error: 'Failed to fetch test results', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
