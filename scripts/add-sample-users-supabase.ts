import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function addSampleUsers() {
  console.log('👥 Adding sample users via Supabase...')
  
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
        const { data, error } = await supabase
          .from('users')
          .insert([userData])
          .select()
          .single()
        
        if (error) {
          if (error.code === '23505') { // Unique constraint violation
            console.log(`ℹ️  User already exists: ${userData.email}`)
          } else {
            console.error(`❌ Error creating user ${userData.email}:`, error.message)
          }
        } else {
          console.log(`✅ Created user: ${data.name} (${data.email})`)
        }
      } catch (error) {
        console.error(`❌ Error creating user ${userData.email}:`, error)
      }
    }

    console.log('🎉 Sample users process completed!')
    
    // Show all users
    const { data: allUsers, error: fetchError } = await supabase
      .from('users')
      .select('id, email, name, is_active, created_at')
      .order('created_at', { ascending: false })
    
    if (fetchError) {
      console.error('❌ Error fetching users:', fetchError.message)
    } else {
      console.log('\n📋 All users in database:')
      console.table(allUsers)
    }
    
  } catch (error) {
    console.error('❌ Error adding sample users:', error)
  }
}

addSampleUsers()
