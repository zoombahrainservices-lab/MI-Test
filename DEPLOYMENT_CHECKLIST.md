# 🚀 Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Environment Variables (CRITICAL)
Add these to Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xfsakpxluorfhumjopgp.supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://xfsakpxluorfhumjopgp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhmc2FrcHhsdW9yZmh1bWpvcGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMTAyMjQsImV4cCI6MjA3MzU4NjIyNH0.0US4-GK8jdIrGDw8zv9h3TGvQa9kMhhMKVIsOqXRuO4
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SUPABASE-SERVICE-ROLE-KEY]
NEXTAUTH_URL=https://mi-test-eight.vercel.app
NEXTAUTH_SECRET=[YOUR-NEXTAUTH-SECRET-KEY]
GOOGLE_CLIENT_ID=428899873631-vno2f4vg5mrm59fa9bfd7q0fhv9ompvi.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=[YOUR-GOOGLE-CLIENT-SECRET]
```

### 2. Database Connection Test
After deployment, test: `https://mi-test-eight.vercel.app/api/test-db-connection`

Expected response:
```json
{
  "success": true,
  "message": "Database connection successful!",
  "data": {
    "questionCount": 100,
    "userCount": 0,
    "databaseUrl": "Set",
    "port": "Correct (5432)"
  }
}
```

### 3. Google OAuth Configuration
Update these URLs in Google Cloud Console:
- Authorized JavaScript origins: `https://mi-test-eight.vercel.app`
- Authorized redirect URIs: `https://mi-test-eight.vercel.app/auth/callback`

### 4. Supabase Configuration
Update Site URL in Supabase Dashboard:
- Site URL: `https://mi-test-eight.vercel.app`
- Redirect URLs: `https://mi-test-eight.vercel.app/auth/callback`

## 🔧 Common Issues & Solutions

### Issue 1: PrismaClientInitializationError
**Cause**: Wrong DATABASE_URL port (using 6543 instead of 5432)
**Solution**: Update DATABASE_URL to use port 5432

### Issue 2: Build Failures
**Cause**: Missing environment variables
**Solution**: Add all required environment variables to Vercel

### Issue 3: Google OAuth Redirect Issues
**Cause**: Wrong redirect URIs in Google Cloud Console
**Solution**: Update redirect URIs to use Vercel domain

### Issue 4: Database Connection Timeouts
**Cause**: Incorrect database configuration
**Solution**: Verify DATABASE_URL format and credentials

## 🎯 Post-Deployment Testing

1. ✅ Homepage loads
2. ✅ Google OAuth works
3. ✅ Test questions load
4. ✅ Test submission works
5. ✅ Admin panel accessible
6. ✅ Database connection test passes

## 🚨 Emergency Fixes

If deployment fails:
1. Check Vercel build logs
2. Verify environment variables
3. Test database connection
4. Check Google OAuth configuration
5. Redeploy with latest commit
