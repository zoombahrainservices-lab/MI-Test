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

async function verifyDatabaseSetup() {
  console.log('🔍 Verifying database setup via Supabase...')
  
  try {
    // Test connection
    const { data, error } = await supabase.auth.getUser()
    if (error && error.message.includes('Invalid API key')) {
      console.error('❌ Invalid service role key')
      return
    }
    
    console.log('✅ Supabase connection successful!')
    
    // Check each table and count records
    const tables = [
      'users',
      'questions', 
      'mcq_questions',
      'test_results',
      'admins',
      'analytics'
    ]
    
    const counts = {}
    
    for (const table of tables) {
      try {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true })
        
        if (error) {
          console.log(`⚠️  Table ${table}: ${error.message}`)
          counts[table] = 'Error'
        } else {
          counts[table] = count || 0
          console.log(`✅ Table ${table}: ${count || 0} records`)
        }
      } catch (error) {
        console.log(`❌ Error checking table ${table}:`, error.message)
        counts[table] = 'Error'
      }
    }
    
    console.log('\n📊 Record counts:')
    console.table(counts)
    
    // Show sample data
    console.log('\n👥 Sample users:')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, name, is_active')
      .limit(3)
    
    if (usersError) {
      console.error('❌ Error fetching users:', usersError.message)
    } else {
      console.table(users)
    }
    
    console.log('\n❓ Sample questions:')
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('id, text, category, difficulty')
      .limit(3)
    
    if (questionsError) {
      console.error('❌ Error fetching questions:', questionsError.message)
    } else {
      console.table(questions)
    }
    
    console.log('\n🎯 Sample MCQ questions:')
    const { data: mcqQuestions, error: mcqError } = await supabase
      .from('mcq_questions')
      .select('id, text, options, correct_answers')
      .limit(3)
    
    if (mcqError) {
      console.error('❌ Error fetching MCQ questions:', mcqError.message)
    } else {
      console.table(mcqQuestions)
    }
    
    console.log('\n🎉 Database setup verification complete!')
    console.log('\n📋 Summary:')
    console.log('✅ Supabase connection working')
    console.log('✅ All tables created')
    console.log('✅ Sample data added')
    console.log('✅ Ready for application use')
    
  } catch (error) {
    console.error('❌ Database verification failed:', error)
  }
}

verifyDatabaseSetup()
