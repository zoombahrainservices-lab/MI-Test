import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Get total users count
    const totalUsers = await prisma.user.count()

    // Get total tests count
    const totalTests = await prisma.testResult.count()

    // Get average scores
    const testResults = await prisma.testResult.findMany({
      select: {
        linguisticPercentage: true,
        logicalPercentage: true,
        spatialPercentage: true,
        musicalPercentage: true,
        bodilyPercentage: true,
        interpersonalPercentage: true,
        intrapersonalPercentage: true,
        naturalistPercentage: true,
      }
    })

    // Calculate overall average score
    let totalScore = 0
    let scoreCount = 0
    
    testResults.forEach(result => {
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
      
      const userAverage = scores.reduce((sum, score) => sum + score, 0) / scores.length
      totalScore += userAverage
      scoreCount++
    })

    const averageScore = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0

    // Get tests completed today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const recentTests = await prisma.testResult.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      }
    })

    // Get recent test results for the table
    const recentTestResults = await prisma.testResult.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    })

    const formattedRecentResults = recentTestResults.map(result => {
      // Calculate overall score from all intelligence percentages
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

      return {
        id: result.id,
        userEmail: result.user.email,
        completedAt: result.createdAt.toISOString(),
        totalScore: overallScore,
        level: 'Complete', // Since we don't store difficulty level separately
        topIntelligence: result.topIntelligence,
        secondIntelligence: result.secondIntelligence,
        thirdIntelligence: result.thirdIntelligence
      }
    })

    return NextResponse.json({
      stats: {
        totalUsers,
        totalTests,
        averageScore,
        recentTests
      },
      recentResults: formattedRecentResults
    })

  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
