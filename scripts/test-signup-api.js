// Test signup API to create a user
const fetch = require('node-fetch')

async function testSignupAPI() {
  console.log('🔧 Testing signup API...')
  
  try {
    const signupData = {
      email: 'farzi@gmail.com',
      name: 'Test User',
      password: 'password123'
    }
    
    console.log('📤 Sending signup request...')
    console.log('   Email:', signupData.email)
    console.log('   Name:', signupData.name)
    console.log('   Password:', signupData.password)
    
    const response = await fetch('https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app/api/auth/register-supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData)
    })
    
    const data = await response.json()
    
    console.log('\n📥 Response received:')
    console.log('   Status:', response.status)
    console.log('   Data:', JSON.stringify(data, null, 2))
    
    if (response.ok) {
      console.log('\n✅ User created successfully!')
      console.log('🔑 Login credentials:')
      console.log(`   Email: ${signupData.email}`)
      console.log(`   Password: ${signupData.password}`)
      console.log('\n💡 Now you can test login with these credentials!')
    } else {
      console.log('\n❌ Signup failed:')
      console.log('   Error:', data.error)
      
      if (data.error === 'User already exists') {
        console.log('\n💡 User already exists! Try logging in instead.')
        console.log('🔑 Login credentials:')
        console.log(`   Email: ${signupData.email}`)
        console.log(`   Password: ${signupData.password}`)
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testSignupAPI()
