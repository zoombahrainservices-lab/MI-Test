// Create a test user for login testing
const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')

const supabaseUrl = 'https://llydesdtudepdiebfzfk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxseWRlc2R0dWRlcGRpZWJmemZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTgzODQsImV4cCI6MjA3NTE3NDM4NH0.A8qjgiFYoygSxw7YCFkDU6jp7-bBzCUekOfc7LeN5Qk'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTestUser() {
  console.log('🔧 Creating test user...')
  
  try {
    const email = 'farzi@gmail.com'
    const password = 'password123'
    const name = 'Test User'
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)
    console.log('🔐 Password hashed successfully')
    
    // Create user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        email: email,
        name: name,
        password: hashedPassword,
        is_active: true
      })
      .select('id, email, name, created_at')
      .single()
    
    if (error) {
      if (error.code === '23505') {
        console.log('⚠️  User already exists!')
        console.log('💡 Try logging in with:')
        console.log(`   Email: ${email}`)
        console.log(`   Password: ${password}`)
      } else {
        console.error('❌ Error creating user:', error)
        return
      }
    } else {
      console.log('✅ Test user created successfully!')
      console.log(`   Email: ${newUser.email}`)
      console.log(`   Name: ${newUser.name}`)
      console.log(`   ID: ${newUser.id}`)
      console.log(`   Created: ${newUser.created_at}`)
      console.log('\n🔑 Login credentials:')
      console.log(`   Email: ${email}`)
      console.log(`   Password: ${password}`)
    }
    
  } catch (error) {
    console.error('❌ Failed to create test user:', error)
  }
}

createTestUser()
