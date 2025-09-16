import { execSync } from 'child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function setupDatabase() {
  console.log('🚀 Setting up database...')
  
  try {
    // Generate Prisma client
    console.log('📦 Generating Prisma client...')
    execSync('npx prisma generate', { stdio: 'inherit' })
    
    // Push schema to database
    console.log('🗄️ Pushing schema to database...')
    execSync('npx prisma db push', { stdio: 'inherit' })
    
    // Seed questions
    console.log('🌱 Seeding questions...')
    execSync('npm run db:seed', { stdio: 'inherit' })
    
    console.log('✅ Database setup complete!')
    console.log('')
    console.log('Next steps:')
    console.log('1. Copy env.example to .env and update the values')
    console.log('2. Run npm run dev to start the development server')
    console.log('3. Run npm run db:studio to open Prisma Studio')
    
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase()
