import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function addSampleUsers() {
  console.log('👥 Adding sample users...')
  
  try {
    // Sample users
    const users = [
      {
        email: 'admin@example.com',
        name: 'Admin User',
        password: await bcrypt.hash('admin123', 10)
      },
      {
        email: 'john@example.com',
        name: 'John Doe',
        password: await bcrypt.hash('password123', 10)
      },
      {
        email: 'jane@example.com',
        name: 'Jane Smith',
        password: await bcrypt.hash('password123', 10)
      },
      {
        email: 'test@example.com',
        name: 'Test User',
        password: await bcrypt.hash('test123', 10)
      }
    ]

    for (const userData of users) {
      try {
        const user = await prisma.user.create({
          data: userData
        })
        console.log(`✅ Created user: ${user.name} (${user.email})`)
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`ℹ️  User already exists: ${userData.email}`)
        } else {
          console.error(`❌ Error creating user ${userData.email}:`, error)
        }
      }
    }

    console.log('🎉 Sample users added successfully!')
    
    // Show all users
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        createdAt: true
      }
    })
    
    console.log('\n📋 All users in database:')
    console.table(allUsers)
    
  } catch (error) {
    console.error('❌ Error adding sample users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addSampleUsers()
