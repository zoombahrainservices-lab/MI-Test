import fs from 'fs'
import path from 'path'

// This script helps update Supabase configuration files
// Run this after you get your new Supabase project credentials

interface SupabaseConfig {
  projectUrl: string
  anonKey: string
  serviceRoleKey: string
  databaseUrl: string
}

function updateConfigFile(filePath: string, oldUrl: string, newUrl: string) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`)
      return false
    }

    const content = fs.readFileSync(filePath, 'utf8')
    const updatedContent = content.replace(oldUrl, newUrl)
    
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent)
      console.log(`✅ Updated: ${filePath}`)
      return true
    } else {
      console.log(`ℹ️  No changes needed: ${filePath}`)
      return false
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error)
    return false
  }
}

async function updateSupabaseConfig(config: SupabaseConfig) {
  const oldUrl = 'https://xfsakpxluorfhumjopgp.supabase.co'
  const newUrl = config.projectUrl

  console.log('🔄 Updating Supabase configuration files...')
  console.log(`Old URL: ${oldUrl}`)
  console.log(`New URL: ${newUrl}`)

  const filesToUpdate = [
    'lib/supabase.ts',
    'app/components/GoogleAuth.tsx',
    'app/api/auth/google-callback/route.ts'
  ]

  let updatedFiles = 0
  for (const file of filesToUpdate) {
    if (updateConfigFile(file, oldUrl, newUrl)) {
      updatedFiles++
    }
  }

  // Update .env file
  console.log('🔄 Updating .env file...')
  try {
    const envPath = '.env'
    if (fs.existsSync(envPath)) {
      let envContent = fs.readFileSync(envPath, 'utf8')
      
      // Update DATABASE_URL
      envContent = envContent.replace(
        /DATABASE_URL="[^"]*"/,
        `DATABASE_URL="${config.databaseUrl}"`
      )
      
      // Update NEXT_PUBLIC_SUPABASE_URL
      envContent = envContent.replace(
        /NEXT_PUBLIC_SUPABASE_URL="[^"]*"/,
        `NEXT_PUBLIC_SUPABASE_URL="${config.projectUrl}"`
      )
      
      // Update NEXT_PUBLIC_SUPABASE_ANON_KEY
      envContent = envContent.replace(
        /NEXT_PUBLIC_SUPABASE_ANON_KEY="[^"]*"/,
        `NEXT_PUBLIC_SUPABASE_ANON_KEY="${config.anonKey}"`
      )
      
      // Update SUPABASE_SERVICE_ROLE_KEY
      envContent = envContent.replace(
        /SUPABASE_SERVICE_ROLE_KEY="[^"]*"/,
        `SUPABASE_SERVICE_ROLE_KEY="${config.serviceRoleKey}"`
      )
      
      fs.writeFileSync(envPath, envContent)
      console.log('✅ Updated .env file')
      updatedFiles++
    }
  } catch (error) {
    console.error('❌ Error updating .env file:', error)
  }

  console.log(`\n🎉 Configuration update complete!`)
  console.log(`Updated ${updatedFiles} files`)
  console.log('\nNext steps:')
  console.log('1. Run: npm run db:generate')
  console.log('2. Run: npm run db:push')
  console.log('3. Run: npm run db:seed')
  console.log('4. Run: npm run dev')
}

// Example usage - replace with your actual credentials
const newConfig: SupabaseConfig = {
  projectUrl: 'https://YOUR-NEW-PROJECT-REF.supabase.co',
  anonKey: 'YOUR-NEW-ANON-KEY',
  serviceRoleKey: 'YOUR-NEW-SERVICE-ROLE-KEY',
  databaseUrl: 'postgresql://postgres:YOUR-PASSWORD@db.YOUR-NEW-PROJECT-REF.supabase.co:6543/postgres?pgbouncer=true'
}

console.log('📝 To use this script:')
console.log('1. Update the newConfig object with your actual credentials')
console.log('2. Run: npx tsx scripts/update-supabase-config.ts')
console.log('\nOr manually update the files with your new Supabase credentials.')
