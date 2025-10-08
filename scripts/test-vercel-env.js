// Test Vercel environment variables
const fetch = require('node-fetch')

const VERCEL_URL = 'https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app'

async function testVercelEnvironment() {
  console.log('🔍 Testing Vercel Environment Variables...')
  console.log('🌐 Testing URL:', VERCEL_URL)
  
  try {
    // Test 1: Check if app is accessible
    console.log('\n1. Testing app accessibility...')
    const homeResponse = await fetch(VERCEL_URL)
    console.log('   Status:', homeResponse.status)
    
    if (homeResponse.status !== 200) {
      console.log('❌ App not accessible!')
      return
    }
    console.log('✅ App is accessible')
    
    // Test 2: Test signup with detailed error logging
    console.log('\n2. Testing signup API with error details...')
    const signupData = {
      email: 'test-vercel@example.com',
      name: 'Test Vercel User',
      password: 'password123'
    }
    
    console.log('📤 Sending signup request...')
    console.log('   Data:', JSON.stringify(signupData, null, 2))
    
    const signupResponse = await fetch(`${VERCEL_URL}/api/auth/register-supabase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData)
    })
    
    const signupResult = await signupResponse.json()
    console.log('   Status:', signupResponse.status)
    console.log('   Response:', JSON.stringify(signupResult, null, 2))
    
    // Analyze the error
    if (signupResponse.status === 500) {
      console.log('\n🔍 Error Analysis:')
      if (signupResult.error === 'Failed to create user') {
        console.log('❌ Database/RLS Issue:')
        console.log('   - Check SUPABASE_SERVICE_ROLE_KEY in Vercel')
        console.log('   - Check RLS policies in Supabase')
        console.log('   - Check database connection')
      } else if (signupResult.error === 'Internal server error') {
        console.log('❌ Environment Variable Issue:')
        console.log('   - SUPABASE_SERVICE_ROLE_KEY not set in Vercel')
        console.log('   - JWT_SECRET not set in Vercel')
        console.log('   - Check all environment variables')
      }
    } else if (signupResponse.status === 200) {
      console.log('✅ Signup working!')
    }
    
    // Test 3: Test login
    console.log('\n3. Testing login API...')
    const loginData = {
      email: 'test-vercel@example.com',
      password: 'password123'
    }
    
    const loginResponse = await fetch(`${VERCEL_URL}/api/auth/login-supabase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    })
    
    const loginResult = await loginResponse.json()
    console.log('   Status:', loginResponse.status)
    console.log('   Response:', JSON.stringify(loginResult, null, 2))
    
    // Test 4: Test users API
    console.log('\n4. Testing users API...')
    const usersResponse = await fetch(`${VERCEL_URL}/api/users`)
    const usersResult = await usersResponse.json()
    console.log('   Status:', usersResponse.status)
    console.log('   Response:', JSON.stringify(usersResult, null, 2))
    
    // Summary
    console.log('\n📋 Summary:')
    console.log('   App accessible:', homeResponse.status === 200 ? '✅' : '❌')
    console.log('   Signup API:', signupResponse.status === 200 ? '✅' : '❌')
    console.log('   Login API:', loginResponse.status === 200 ? '✅' : '❌')
    console.log('   Users API:', usersResponse.status === 200 ? '✅' : '❌')
    
    // Recommendations
    console.log('\n💡 Recommendations:')
    if (signupResponse.status === 500) {
      console.log('1. ❌ Add SUPABASE_SERVICE_ROLE_KEY to Vercel environment variables')
      console.log('2. ❌ Add JWT_SECRET to Vercel environment variables')
      console.log('3. ❌ Check RLS policies in Supabase')
    }
    if (loginResponse.status === 401) {
      console.log('4. ❌ User might not exist - create account first')
    }
    if (usersResponse.status === 500) {
      console.log('5. ❌ Database connection issue - check environment variables')
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testVercelEnvironment()


