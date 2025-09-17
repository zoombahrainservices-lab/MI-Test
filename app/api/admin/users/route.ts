import { NextRequest, NextResponse } from 'next/server'
import { withAdminAuth } from '@/lib/middleware/admin-auth'
import { getUsers, updateUserStatus, deleteUser } from '@/lib/db-operations/admin-operations'

export const GET = withAdminAuth(async (request: NextRequest, admin) => {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const result = await getUsers({
      search,
      status: status as 'active' | 'inactive' | 'all',
      sortBy: sortBy as 'email' | 'name' | 'created_at',
      sortOrder: sortOrder as 'asc' | 'desc',
      page,
      limit
    })

    // Format users with additional calculated fields
    const formattedUsers = result.users.map(user => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
        lastLogin: user.created_at, // We'll use created_at as proxy for now
        totalTests: 0, // This would need to be calculated separately
        averageScore: 0, // This would need to be calculated separately
        status: user.is_active ? 'active' : 'inactive'
      }
    })

    return NextResponse.json({
      users: formattedUsers,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages
      }
    })
  } catch (error: any) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error.message },
      { status: 500 }
    )
  }
})

export const PUT = withAdminAuth(async (request: NextRequest, admin) => {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || status === undefined) {
      return NextResponse.json(
        { error: 'User ID and status are required' },
        { status: 400 }
      )
    }

    const updatedUser = await updateUserStatus(id, status as 'active' | 'inactive')

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        status: updatedUser.is_active ? 'active' : 'inactive',
        createdAt: updatedUser.created_at
      }
    })
  } catch (error: any) {
    console.error('Error updating user status:', error)
    return NextResponse.json(
      { error: 'Failed to update user status', details: error.message },
      { status: 500 }
    )
  }
})

export const DELETE = withAdminAuth(async (request: NextRequest, admin) => {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    await deleteUser(userId)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user', details: error.message },
      { status: 500 }
    )
  }
})