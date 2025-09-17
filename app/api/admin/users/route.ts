import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Note: We don't have a status field in our User model yet
    // For now, we'll return all users as 'active'
    // You can add a status field to the User model if needed

    // Build orderBy clause
    const orderBy: any = {}
    if (sortBy === 'email') {
      orderBy.email = sortOrder
    } else if (sortBy === 'createdAt') {
      orderBy.createdAt = sortOrder
    } else if (sortBy === 'totalTests') {
      orderBy.testResults = { _count: sortOrder }
    } else if (sortBy === 'averageScore') {
      // We'll need to calculate this in the application
      orderBy.createdAt = 'desc' // Default fallback
    }

    // Get users with their test results
    const users = await prisma.user.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        testResults: {
          select: {
            linguisticPercentage: true,
            logicalPercentage: true,
            spatialPercentage: true,
            musicalPercentage: true,
            bodilyPercentage: true,
            interpersonalPercentage: true,
            intrapersonalPercentage: true,
            naturalistPercentage: true,
            createdAt: true
          }
        }
      }
    })

    // Get total count for pagination
    const totalCount = await prisma.user.count({ where })

    // Format users with calculated fields
    const formattedUsers = users.map(user => {
      const totalTests = user.testResults.length
      
      // Calculate average score
      let averageScore = 0
      if (totalTests > 0) {
        const allScores = user.testResults.flatMap(result => [
          result.linguisticPercentage,
          result.logicalPercentage,
          result.spatialPercentage,
          result.musicalPercentage,
          result.bodilyPercentage,
          result.interpersonalPercentage,
          result.intrapersonalPercentage,
          result.naturalistPercentage,
        ])
        averageScore = Math.round(allScores.reduce((sum, score) => sum + score, 0) / allScores.length)
      }

      // Get last login (we'll use the latest test result as proxy)
      const lastLogin = user.testResults.length > 0 
        ? user.testResults.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0].createdAt
        : null

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt.toISOString(),
        lastLogin: lastLogin?.toISOString(),
        totalTests,
        averageScore,
        status: 'active' // Default status since we don't have this field yet
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
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
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
    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
