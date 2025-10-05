import { createClient } from '@supabase/supabase-js'
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

async function setupDatabaseViaSupabase() {
  console.log('🔧 Setting up database via Supabase...')
  console.log(`URL: ${supabaseUrl}`)
  
  try {
    // Test connection
    const { data, error } = await supabase.auth.getUser()
    if (error && error.message.includes('Invalid API key')) {
      console.error('❌ Invalid service role key')
      return
    }
    
    console.log('✅ Supabase connection successful!')
    
    // Test database access
    const { data: testData, error: testError } = await supabase
      .from('users')
      .select('count', { count: 'exact' })
    
    if (testError) {
      console.log('⚠️  Tables not found - this is expected for a new project')
      console.log('Error:', testError.message)
      
      console.log('\n📋 Next steps:')
      console.log('1. Your Supabase project is ready')
      console.log('2. You need to create tables using SQL or Prisma')
      console.log('3. Try running: npm run db:push')
      
    } else {
      console.log('✅ Database tables exist!')
      console.log(`Found ${testData?.length || 0} records in users table`)
    }
    
  } catch (error) {
    console.error('❌ Setup failed:', error)
  }
}

setupDatabaseViaSupabase()
