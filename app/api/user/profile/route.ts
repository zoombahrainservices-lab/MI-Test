import { NextRequest, NextResponse } from 'next/server'
import { withUserAuth } from '@/lib/middleware/user-auth'
import { getUserProfile, updateUserProfile } from '@/lib/db-operations/user-operations'

// GET /api/user/profile - Get user profile
export const GET = withUserAuth(async (request: NextRequest, user) => {
  try {
    const profile = await getUserProfile(user)
    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Get user profile error:', error)
    return NextResponse.json(
      { error: 'Failed to get user profile' },
      { status: 500 }
    )
  }
})

// PUT /api/user/profile - Update user profile
export const PUT = withUserAuth(async (request: NextRequest, user) => {
  try {
    const { name } = await request.json()

    // Validate input
    if (name !== undefined && typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Name must be a string' },
        { status: 400 }
      )
    }

    const updates: { name?: string } = {}
    if (name !== undefined) {
      updates.name = name
    }

    const updatedProfile = await updateUserProfile(user, updates)
    return NextResponse.json({ 
      success: true,
      profile: updatedProfile 
    })
  } catch (error) {
    console.error('Update user profile error:', error)
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    )
  }
})
