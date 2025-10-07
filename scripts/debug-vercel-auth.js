// Comprehensive debug script for Vercel authentication issues
const fetch = require('node-fetch')

const VERCEL_URL = 'https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app'

async function debugVercelAuth() {
  console.log('🔍 Debugging Vercel Authentication Issues...')
  console.log('🌐 Testing URL:', VERCEL_URL)
  
  try {
    // 1. Test if the app is accessible
    console.log('\n1. Testing app accessibility...')
    const homeResponse = await fetch(VERCEL_URL)
    console.log('   Home page status:', homeResponse.status)
    
    if (homeResponse.status !== 200) {
      console.log('❌ App is not accessible!')
      return
    }
    console.log('✅ App is accessible')
    
    // 2. Test signup API
    console.log('\n2. Testing signup API...')
    const signupData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123'
    }
    
    const signupResponse = await fetch(`${VERCEL_URL}/api/auth/register-supabase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData)
    })
    
    const signupResult = await signupResponse.json()
    console.log('   Signup status:', signupResponse.status)
    console.log('   Signup response:', JSON.stringify(signupResult, null, 2))
    
    if (signupResponse.status === 200) {
      console.log('✅ Signup API working!')
    } else {
      console.log('❌ Signup API failed:', signupResult.error)
    }
    
    // 3. Test login API
    console.log('\n3. Testing login API...')
    const loginData = {
      email: 'test@example.com',
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
    console.log('   Login status:', loginResponse.status)
    console.log('   Login response:', JSON.stringify(loginResult, null, 2))
    
    if (loginResponse.status === 200) {
      console.log('✅ Login API working!')
    } else {
      console.log('❌ Login API failed:', loginResult.error)
    }
    
    // 4. Test users API
    console.log('\n4. Testing users API...')
    const usersResponse = await fetch(`${VERCEL_URL}/api/users`)
    const usersResult = await usersResponse.json()
    console.log('   Users status:', usersResponse.status)
    console.log('   Users response:', JSON.stringify(usersResult, null, 2))
    
    // 5. Test questions API
    console.log('\n5. Testing questions API...')
    const questionsResponse = await fetch(`${VERCEL_URL}/api/questions`)
    const questionsResult = await questionsResponse.json()
    console.log('   Questions status:', questionsResponse.status)
    console.log('   Questions count:', questionsResult.questions?.length || 0)
    
    // 6. Summary and recommendations
    console.log('\n📋 Summary:')
    console.log('   App accessible:', homeResponse.status === 200 ? '✅' : '❌')
    console.log('   Signup API:', signupResponse.status === 200 ? '✅' : '❌')
    console.log('   Login API:', loginResponse.status === 200 ? '✅' : '❌')
    console.log('   Users API:', usersResponse.status === 200 ? '✅' : '❌')
    console.log('   Questions API:', questionsResponse.status === 200 ? '✅' : '❌')
    
    // 7. Common issues and solutions
    console.log('\n🔧 Common Issues & Solutions:')
    
    if (signupResponse.status !== 200) {
      console.log('❌ Signup Issues:')
      console.log('   - Check RLS policies in Supabase')
      console.log('   - Verify SUPABASE_SERVICE_ROLE_KEY in Vercel')
      console.log('   - Check database connection')
    }
    
    if (loginResponse.status !== 200) {
      console.log('❌ Login Issues:')
      console.log('   - User might not exist (create account first)')
      console.log('   - Check password hashing')
      console.log('   - Verify JWT_SECRET in Vercel')
    }
    
    if (usersResponse.status !== 200) {
      console.log('❌ Users API Issues:')
      console.log('   - Check Supabase connection')
      console.log('   - Verify environment variables')
    }
    
    console.log('\n💡 Next Steps:')
    console.log('1. Check Vercel environment variables')
    console.log('2. Verify Supabase RLS policies')
    console.log('3. Test Google OAuth configuration')
    console.log('4. Check browser console for errors')
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message)
  }
}

debugVercelAuth()
