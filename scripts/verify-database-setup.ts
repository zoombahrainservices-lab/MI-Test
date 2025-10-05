import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function verifyDatabaseSetup() {
  console.log('🔍 Verifying database setup...')
  
  try {
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Check tables
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
    console.log('\n📋 Database tables:')
    console.table(tables)
    
    // Count records in each table
    const counts = {
      users: await prisma.user.count(),
      questions: await prisma.question.count(),
      mcqQuestions: await prisma.mCQQuestion.count(),
      testResults: await prisma.testResult.count(),
      admins: await prisma.admin.count(),
      analytics: await prisma.analytics.count()
    }
    
    console.log('\n📊 Record counts:')
    console.table(counts)
    
    // Show sample data
    if (counts.users > 0) {
      console.log('\n👥 Sample users:')
      const users = await prisma.user.findMany({
        take: 3,
        select: {
          id: true,
          email: true,
          name: true,
          isActive: true
        }
      })
      console.table(users)
    }
    
    if (counts.questions > 0) {
      console.log('\n❓ Sample questions:')
      const questions = await prisma.question.findMany({
        take: 3,
        select: {
          id: true,
          text: true,
          category: true,
          difficulty: true
        }
      })
      console.table(questions)
    }
    
    console.log('\n🎉 Database setup verification complete!')
    
  } catch (error) {
    console.error('❌ Database verification failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyDatabaseSetup()
