import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const dateFilter = searchParams.get('dateFilter') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.user = {
        email: { contains: search, mode: 'insensitive' }
      }
    }

    // Add date filtering
    if (dateFilter !== 'all') {
      const now = new Date()
      let startDate: Date

      switch (dateFilter) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          break
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1)
          break
        default:
          startDate = new Date(0) // All time
      }

      where.createdAt = {
        gte: startDate
      }
    }

    // Get test results
    const results = await prisma.testResult.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    })

    // Get total count for pagination
    const totalCount = await prisma.testResult.count({ where })

    // Format results
    const formattedResults = results.map(result => {
      // Calculate scores for each difficulty level
      // Since we don't store difficulty levels separately, we'll simulate them
      // based on the overall scores
      const scores = [
        result.linguisticPercentage,
        result.logicalPercentage,
        result.spatialPercentage,
        result.musicalPercentage,
        result.bodilyPercentage,
        result.interpersonalPercentage,
        result.intrapersonalPercentage,
        result.naturalistPercentage,
      ]
      
      const overallScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
      
      // Simulate difficulty level scores (in a real app, you'd store these separately)
      const easyScore = Math.min(100, overallScore + Math.floor(Math.random() * 10))
      const mediumScore = overallScore
      const hardScore = Math.max(0, overallScore - Math.floor(Math.random() * 10))

      // Create intelligence profile
      const intelligenceProfile = [
        { category: 'Linguistic', percentage: result.linguisticPercentage },
        { category: 'Logical-Mathematical', percentage: result.logicalPercentage },
        { category: 'Spatial', percentage: result.spatialPercentage },
        { category: 'Musical', percentage: result.musicalPercentage },
        { category: 'Bodily-Kinesthetic', percentage: result.bodilyPercentage },
        { category: 'Interpersonal', percentage: result.interpersonalPercentage },
        { category: 'Intrapersonal', percentage: result.intrapersonalPercentage },
        { category: 'Naturalist', percentage: result.naturalistPercentage },
      ].sort((a, b) => b.percentage - a.percentage)

      return {
        id: result.id,
        userEmail: result.user.email,
        completedAt: result.createdAt.toISOString(),
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
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching test results:', error)
    return NextResponse.json(
      { error: 'Failed to fetch test results' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
