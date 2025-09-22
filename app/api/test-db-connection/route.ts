import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Test if we can query the database
    const questionCount = await prisma.question.count()
    const userCount = await prisma.user.count()
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      data: {
        questionCount,
        userCount,
        databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
        port: process.env.DATABASE_URL?.includes(':5432') ? 'Correct (5432)' : 'Wrong port'
      }
    })
  } catch (error) {
    console.error('Database connection error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
      port: process.env.DATABASE_URL?.includes(':5432') ? 'Correct (5432)' : 'Wrong port'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
