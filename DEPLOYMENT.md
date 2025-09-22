# Deployment Configuration

## Environment Variables for Vercel

Add these environment variables to your Vercel project:

### Database Configuration
```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xfsakpxluorfhumjopgp.supabase.co:5432/postgres
```

**Important**: Make sure to use port `5432`, NOT `6543`

### NextAuth Configuration
```
NEXTAUTH_URL=https://mi-test-eight.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-key
```

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://xfsakpxluorfhumjopgp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhmc2FrcHhsdW9yZmh1bWpvcGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMTAyMjQsImV4cCI6MjA3MzU4NjIyNH0.0US4-GK8jdIrGDw8zv9h3TGvQa9kMhhMKVIsOqXRuO4
```

### Google OAuth Configuration
```
GOOGLE_CLIENT_ID=428899873631-vno2f4vg5mrm59fa9bfd7q0fhv9ompvi.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## How to Add Environment Variables in Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable above
5. Make sure to select all environments (Production, Preview, Development)
6. Redeploy your project

## Common Issues

- **Wrong Port**: Make sure DATABASE_URL uses port `5432`, not `6543`
- **Missing Password**: Replace `[YOUR-PASSWORD]` with your actual Supabase database password
- **Wrong Domain**: Use `mi-test-eight.vercel.app` as your NEXTAUTH_URL
