// Test script to debug login issues
const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')

const supabaseUrl = 'https://llydesdtudepdiebfzfk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxseWRlc2R0dWRlcGRpZWJmemZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTgzODQsImV4cCI6MjA3NTE3NDM4NH0.A8qjgiFYoygSxw7YCFkDU6jp7-bBzCUekOfc7LeN5Qk'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testLoginDebug() {
  console.log('🔍 Testing login debug...')
  
  try {
    // 1. Check if users exist in database
    console.log('\n1. Checking users in database...')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, name, created_at')
      .limit(10)
    
    if (usersError) {
      console.error('❌ Error fetching users:', usersError)
      return
    }
    
    console.log(`✅ Found ${users?.length || 0} users in database`)
    if (users && users.length > 0) {
      console.log('📋 Users:')
      users.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.email} (${user.name || 'No name'}) - ID: ${user.id}`)
      })
    }
    
    // 2. Check specific user if exists
    const testEmail = 'farzi@gmail.com'
    console.log(`\n2. Checking specific user: ${testEmail}`)
    
    const { data: specificUser, error: specificError } = await supabase
      .from('users')
      .select('*')
      .eq('email', testEmail)
      .single()
    
    if (specificError) {
      if (specificError.code === 'PGRST116') {
        console.log(`❌ User ${testEmail} not found in database`)
        console.log('💡 This explains the "Invalid credentials" error!')
        console.log('💡 The user needs to be created first via signup or Google OAuth')
      } else {
        console.error('❌ Error fetching specific user:', specificError)
      }
    } else {
      console.log(`✅ User found: ${specificUser.email}`)
      console.log(`   - ID: ${specificUser.id}`)
      console.log(`   - Name: ${specificUser.name || 'No name'}`)
      console.log(`   - Created: ${specificUser.created_at}`)
      console.log(`   - Has password: ${specificUser.password ? 'Yes' : 'No'}`)
      
      // Test password verification
      if (specificUser.password) {
        console.log('\n3. Testing password verification...')
        const testPassword = 'password123' // Common test password
        const isValid = await bcrypt.compare(testPassword, specificUser.password)
        console.log(`🔐 Password verification result: ${isValid ? '✅ Valid' : '❌ Invalid'}`)
        
        if (!isValid) {
          console.log('💡 Password mismatch - this could be the issue!')
          console.log('💡 Try creating a new account or resetting password')
        }
      }
    }
    
    // 3. Check if there are any OAuth users
    console.log('\n4. Checking for OAuth users...')
    const { data: oauthUsers, error: oauthError } = await supabase
      .from('users')
      .select('id, email, name, password')
      .eq('password', 'oauth-user-no-password')
    
    if (oauthError) {
      console.error('❌ Error fetching OAuth users:', oauthError)
    } else {
      console.log(`✅ Found ${oauthUsers?.length || 0} OAuth users`)
      if (oauthUsers && oauthUsers.length > 0) {
        oauthUsers.forEach((user, index) => {
          console.log(`  ${index + 1}. ${user.email} (OAuth user)`)
        })
      }
    }
    
    // 4. Recommendations
    console.log('\n📋 Recommendations:')
    if (!users || users.length === 0) {
      console.log('1. ❌ No users found - create a test user first')
      console.log('2. 💡 Use the signup page to create an account')
      console.log('3. 💡 Or use Google OAuth to create an account')
    } else {
      console.log('1. ✅ Users exist in database')
      console.log('2. 💡 Check if the specific email exists')
      console.log('3. 💡 Verify password is correct')
      console.log('4. 💡 Try creating a new account with different email')
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

testLoginDebug()
