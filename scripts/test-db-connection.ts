import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...')
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL?.replace(/\/\/.*@/, '//***:***@')}`)
  
  const prisma = new PrismaClient()
  
  try {
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Test query
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Database query successful:', result)
    
    // Check if tables exist
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('📋 Existing tables:', tables)
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    
    if (error.code === 'P1001') {
      console.log('\n🔧 Possible solutions:')
      console.log('1. Check if your Supabase project is fully active')
      console.log('2. Verify the DATABASE_URL in your .env file')
      console.log('3. Make sure the database password is correct')
      console.log('4. Wait a few minutes if the project was just created')
    }
  } finally {
    await prisma.$disconnect()
  }
}

testDatabaseConnection()
