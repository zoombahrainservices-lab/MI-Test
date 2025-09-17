import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Build query
    let query = supabase
      .from('users')
      .select(`
        id,
        email,
        name,
        status,
        created_at,
        test_results(
          linguistic_percentage,
          logical_percentage,
          spatial_percentage,
          musical_percentage,
          bodily_percentage,
          interpersonal_percentage,
          intrapersonal_percentage,
          naturalist_percentage,
          created_at
        )
      `)

    // Add search filter
    if (search) {
      query = query.or(`email.ilike.%${search}%,name.ilike.%${search}%`)
    }

    // Add status filter
    if (status !== 'all') {
      query = query.eq('status', status)
    }

    // Add sorting
    if (sortBy === 'email') {
      query = query.order('email', { ascending: sortOrder === 'asc' })
    } else if (sortBy === 'created_at') {
      query = query.order('created_at', { ascending: sortOrder === 'asc' })
    } else if (sortBy === 'status') {
      query = query.order('status', { ascending: sortOrder === 'asc' })
    } else {
      query = query.order('created_at', { ascending: false })
    }

    // Add pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data: users, error: usersError } = await query

    if (usersError) {
      console.error('Error fetching users:', usersError)
      throw usersError
    }

    // Get total count for pagination
    let countQuery = supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    if (search) {
      countQuery = countQuery.or(`email.ilike.%${search}%,name.ilike.%${search}%`)
    }

    if (status !== 'all') {
      countQuery = countQuery.eq('status', status)
    }

    const { count: totalCount, error: countError } = await countQuery

    if (countError) {
      console.error('Error fetching users count:', countError)
      throw countError
    }

    // Format users with calculated fields
    const formattedUsers = (users || []).map(user => {
      const totalTests = user.test_results?.length || 0
      
      // Calculate average score
      let averageScore = 0
      if (totalTests > 0 && user.test_results) {
        const allScores = user.test_results.flatMap(result => [
          result.linguistic_percentage,
          result.logical_percentage,
          result.spatial_percentage,
          result.musical_percentage,
          result.bodily_percentage,
          result.interpersonal_percentage,
          result.intrapersonal_percentage,
          result.naturalist_percentage,
        ])
        averageScore = Math.round(allScores.reduce((sum, score) => sum + score, 0) / allScores.length)
      }

      // Get last login (we'll use the latest test result as proxy)
      const lastLogin = totalTests > 0 && user.test_results
        ? user.test_results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0].created_at
        : null

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
        lastLogin: lastLogin,
        totalTests,
        averageScore,
        status: user.status || 'active'
      }
    })

    // Sort by average score if requested
    if (sortBy === 'averageScore') {
      formattedUsers.sort((a, b) => {
        return sortOrder === 'asc' ? a.averageScore - b.averageScore : b.averageScore - a.averageScore
      })
    }

    return NextResponse.json({
      users: formattedUsers,
      pagination: {
        page,
        limit,
        total: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'User ID and status are required' },
        { status: 400 }
      )
    }

    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating user status:', updateError)
      throw updateError
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        status: updatedUser.status,
        createdAt: updatedUser.created_at
      }
    })

  } catch (error) {
    console.error('Error updating user status:', error)
    return NextResponse.json(
      { error: 'Failed to update user status', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Delete user (this will also delete their test results due to cascade)
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', userId)

    if (deleteError) {
      console.error('Error deleting user:', deleteError)
      throw deleteError
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user', details: error.message },
      { status: 500 }
    )
  }
}
