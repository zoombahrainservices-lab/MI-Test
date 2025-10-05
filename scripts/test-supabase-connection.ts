import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Test Supabase connection
async function testSupabaseConnection() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase environment variables')
    console.log('Please check your .env file contains:')
    console.log('NEXT_PUBLIC_SUPABASE_URL=')
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=')
    return
  }

  console.log('🔍 Testing Supabase connection...')
  console.log(`URL: ${supabaseUrl}`)
  console.log(`Anon Key: ${supabaseAnonKey.substring(0, 20)}...`)

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Test basic connection
    const { data, error } = await supabase.from('users').select('count', { count: 'exact' })
    
    if (error) {
      console.log('⚠️  Connection established but tables might not exist yet')
      console.log('Error:', error.message)
      console.log('This is normal for a new project - you need to run the database setup')
    } else {
      console.log('✅ Supabase connection successful!')
      console.log(`Found ${data?.length || 0} records in users table`)
    }

    // Test auth service
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError && authError.message.includes('Invalid API key')) {
      console.error('❌ Invalid API key - please check your credentials')
    } else {
      console.log('✅ Authentication service is accessible')
    }

  } catch (err) {
    console.error('❌ Connection failed:', err)
  }
}

testSupabaseConnection()
