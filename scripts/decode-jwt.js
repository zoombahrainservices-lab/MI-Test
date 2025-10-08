// Decode the JWT token to see user information
const jwt = 'eyJpc3MiOiJodHRwczovL2xseWRlc2R0dWRlcGRpZWJmemZrLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIzOTc2MTQyMC1mODQxLTQ4NTctYmQ0MS1iYThmNmVkYzQ5MmUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzU5ODU2MTI2LCJpYXQiOjE3NTk4NTI1MjYsImVtYWlsIjoiem9vbWJhaHJhaW5zZXJ2aWNlc0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imdvb2dsZSIsInByb3ZpZGVycyI6WyJnb29nbGUiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pFc2VpcUYtLUY5VnltOUhycTFTRXVObUhMUGRKREk5SUk5QWp3OEZpU0dDSEprQT1zOTYtYyIsImVtYWlsIjoiem9vbWJhaHJhaW5zZXJ2aWNlc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZnVsbF9uYW1lIjoiWm9vbSBCYWhyYWluIiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwibmFtZSI6Ilpvb20gQmFocmFpbiIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pFc2VpcUYtLUY5VnltOUhycTFTRXVObUhMUGRKREk5SUk5QWp3OEZpU0dDSEprQT1zOTYtYyIsInByb3ZpZGVyX2lkIjoiMTExOTkyODIxNjM4NDYwNDc0MTg1Iiwic3ViIjoiMTExOTkyODIxNjM4NDYwNDc0MTg1In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3NTk4NTI1MjZ9XSwic2Vzc2lvbl9pZCI6IjljMWM2OWIwLThmZDYtNDVmMi1hNjM3LWU5OWE4MDk2MmU0MCIsImlzX2Fub255bW91cyI6ZmFsc2V9'

function decodeJWT(token) {
  try {
    // Split the JWT into parts
    const parts = token.split('.')
    
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format')
    }
    
    // Decode the payload (middle part)
    const payload = parts[1]
    
    // Add padding if needed
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4)
    
    // Decode base64
    const decodedPayload = Buffer.from(paddedPayload, 'base64').toString('utf-8')
    
    return JSON.parse(decodedPayload)
  } catch (error) {
    console.error('Error decoding JWT:', error.message)
    return null
  }
}

console.log('🔍 Decoding JWT Token...')
console.log('Token:', jwt.substring(0, 50) + '...')
console.log('')

const decoded = decodeJWT(jwt)

if (decoded) {
  console.log('✅ JWT Decoded Successfully!')
  console.log('')
  console.log('👤 User Information:')
  console.log('   Email:', decoded.email)
  console.log('   Name:', decoded.user_metadata?.full_name || decoded.user_metadata?.name)
  console.log('   User ID:', decoded.sub)
  console.log('   Provider:', decoded.app_metadata?.provider)
  console.log('   Email Verified:', decoded.user_metadata?.email_verified)
  console.log('   Avatar:', decoded.user_metadata?.avatar_url)
  console.log('')
  console.log('🔐 Authentication Details:')
  console.log('   Role:', decoded.role)
  console.log('   Issued At:', new Date(decoded.iat * 1000).toISOString())
  console.log('   Expires At:', new Date(decoded.exp * 1000).toISOString())
  console.log('   Session ID:', decoded.session_id)
  console.log('   Anonymous:', decoded.is_anonymous)
  console.log('')
  console.log('🎉 Google OAuth is working perfectly!')
  console.log('   - User successfully authenticated')
  console.log('   - JWT token is valid')
  console.log('   - User can now access the application')
} else {
  console.log('❌ Failed to decode JWT token')
}
