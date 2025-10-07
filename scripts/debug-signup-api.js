// Debug signup API to understand the error
const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')

const supabaseUrl = 'https://llydesdtudepdiebfzfk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxseWRlc2R0dWRlcGRpZWJmemZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTgzODQsImV4cCI6MjA3NTE3NDM4NH0.A8qjgiFYoygSxw7YCFkDU6jp7-bBzCUekOfc7LeN5Qk'

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugSignupAPI() {
  console.log('🔍 Debugging signup API...')
  
  try {
    const email = 'farsi@gmail.com'
    const name = 'Farsi'
    const password = 'password123'
    
    console.log('📤 Testing signup with:')
    console.log('   Email:', email)
    console.log('   Name:', name)
    console.log('   Password:', password)
    
    // 1. Check if user already exists
    console.log('\n1. Checking if user already exists...')
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Error checking existing user:', checkError)
      return
    }
    
    if (existingUser) {
      console.log('⚠️  User already exists!')
      console.log('   ID:', existingUser.id)
      console.log('   Email:', existingUser.email)
      console.log('   Name:', existingUser.name)
      console.log('   Created:', existingUser.created_at)
      console.log('\n💡 Try logging in instead of creating a new account!')
      return
    }
    
    console.log('✅ User does not exist, proceeding with creation...')
    
    // 2. Hash password
    console.log('\n2. Hashing password...')
    const hashedPassword = await bcrypt.hash(password, 12)
    console.log('✅ Password hashed successfully')
    
    // 3. Try to create user
    console.log('\n3. Creating user...')
    const { data: user, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          email,
          name: name || null,
          password: hashedPassword
        }
      ])
      .select()
      .single()
    
    if (insertError) {
      console.error('❌ Insert error:', insertError)
      console.log('\n🔍 Error details:')
      console.log('   Code:', insertError.code)
      console.log('   Message:', insertError.message)
      console.log('   Details:', insertError.details)
      console.log('   Hint:', insertError.hint)
      
      if (insertError.code === '42501') {
        console.log('\n💡 This is a Row Level Security (RLS) error!')
        console.log('💡 The database has RLS enabled but no policies allow user creation')
        console.log('💡 Solution: Update RLS policies in Supabase dashboard')
      } else if (insertError.code === '23505') {
        console.log('\n💡 This is a unique constraint violation!')
        console.log('💡 User already exists with this email')
      } else {
        console.log('\n💡 This is a database permission error!')
        console.log('💡 Check Supabase service role key and RLS policies')
      }
      
      return
    }
    
    console.log('✅ User created successfully!')
    console.log('   ID:', user.id)
    console.log('   Email:', user.email)
    console.log('   Name:', user.name)
    console.log('   Created:', user.created_at)
    
    // 4. Generate token
    console.log('\n4. Generating token...')
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')
    console.log('✅ Token generated:', token.substring(0, 20) + '...')
    
    console.log('\n🎉 Signup successful!')
    console.log('🔑 Login credentials:')
    console.log('   Email:', email)
    console.log('   Password:', password)
    
  } catch (error) {
    console.error('❌ Debug failed:', error)
  }
}

debugSignupAPI()
