#!/usr/bin/env tsx

/**
 * Production Database Setup Script
 * 
 * This script helps verify the database connection and setup for production deployment.
 * Run this locally to test your database connection before deploying to Vercel.
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing database connection...')
    
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Test if questions table exists and has data
    const questionCount = await prisma.question.count()
    console.log(`📊 Found ${questionCount} questions in database`)
    
    // Test if users table exists
    const userCount = await prisma.user.count()
    console.log(`👥 Found ${userCount} users in database`)
    
    // Test if test results table exists
    const resultCount = await prisma.testResult.count()
    console.log(`📈 Found ${resultCount} test results in database`)
    
    console.log('🎉 Database setup is ready for production!')
    
  } catch (error) {
    console.error('❌ Database connection failed:')
    console.error(error)
    
    if (error instanceof Error) {
      if (error.message.includes('6543')) {
        console.error('\n🔧 Fix: Make sure your DATABASE_URL uses port 5432, not 6543')
        console.error('   Correct format: postgresql://postgres:[PASSWORD]@db.xfsakpxluorfhumjopgp.supabase.co:5432/postgres')
      }
      
      if (error.message.includes('Can\'t reach database server')) {
        console.error('\n🔧 Fix: Check your DATABASE_URL and make sure:')
        console.error('   1. The password is correct')
        console.error('   2. The host is correct (db.xfsakpxluorfhumjopgp.supabase.co)')
        console.error('   3. The port is 5432')
        console.error('   4. Your Supabase database is running')
      }
    }
    
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the test
testDatabaseConnection()
