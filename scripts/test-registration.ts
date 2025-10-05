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

async function testRegistration() {
  console.log('🧪 Testing user registration...')
  
  const testUser = {
    email: 'newuser@example.com',
    name: 'New User',
    password: 'newpassword123'
  }
  
  try {
    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', testUser.email)
      .single()

    if (existingUser) {
      console.log('ℹ️  User already exists, deleting for test...')
      await supabase
        .from('users')
        .delete()
        .eq('email', testUser.email)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(testUser.password, 12)
    console.log('✅ Password hashed successfully')

    // Create user
    const { data: user, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          email: testUser.email,
          name: testUser.name,
          password: hashedPassword
        }
      ])
      .select()
      .single()

    if (insertError) {
      console.error('❌ Registration failed:', insertError.message)
      return
    }

    console.log('✅ User registration successful!')
    console.log('📋 Created user:', {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at
    })

    // Test login
    console.log('\n🔐 Testing login...')
    const { data: loginUser, error: loginError } = await supabase
      .from('users')
      .select('*')
      .eq('email', testUser.email)
      .single()

    if (loginError || !loginUser) {
      console.error('❌ Login test failed:', loginError?.message)
      return
    }

    const isValidPassword = await bcrypt.compare(testUser.password, loginUser.password)
    if (isValidPassword) {
      console.log('✅ Login test successful!')
    } else {
      console.log('❌ Password verification failed')
    }

  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

testRegistration()

