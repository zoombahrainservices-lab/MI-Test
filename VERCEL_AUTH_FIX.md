# Vercel Authentication Fix - Complete Guide

## 🔍 Root Cause Identified

Your code had **hardcoded Supabase URLs** in 12 different files instead of using environment variables. This prevented Vercel environment variable changes from taking effect.

## ✅ What Was Fixed

### Files Updated (12 total):
1. `app/components/GoogleAuth.tsx` - Client-side Google OAuth
2. `app/auth/callback/page.tsx` - OAuth callback handler
3. `lib/supabase.ts` - Supabase client library
4. `app/api/questions/route.ts` - Questions API
5. `app/api/users/route.ts` - Users API
6. `app/api/test-results-debug/route.ts` - Test results debug API
7. `app/api/test-responses/route.ts` - Test responses API
8. `app/api/test-results-simple/route.ts` - Simple test results API
9. `app/api/test-db/route.ts` - Database test API
10. `app/api/auth/login-supabase/route.ts` - Login API
11. `app/api/auth/register-supabase/route.ts` - Registration API
12. `app/api/auth/google-callback/route.ts` - Google OAuth callback API

### Changes Made:
**Before:**
```typescript
const supabaseUrl = 'https://llydesdtudepdiebfzfk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

**After:**
```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
```

## 🎯 Required Environment Variables in Vercel

You **MUST** configure these in your Vercel project settings:

### 1. Go to Vercel Dashboard:
https://vercel.com/zoom-bahrain-services-projects/mi-test/settings/environment-variables

### 2. Add/Verify These Variables:

#### **NEXT_PUBLIC_SUPABASE_URL**
- **Value:** `https://llydesdtudepdiebfzfk.supabase.co`
- **Scope:** Production, Preview, Development

#### **NEXT_PUBLIC_SUPABASE_ANON_KEY**
- **Value:** Your Supabase anon key (starts with `eyJhbGci...`)
- **Scope:** Production, Preview, Development

#### **SUPABASE_SERVICE_ROLE_KEY**
- **Value:** Your Supabase service role key (starts with `eyJhbGci...`)
- **Scope:** Production, Preview, Development

#### **DATABASE_URL** (if using Prisma)
- **Value:** `postgresql://postgres:YOUR_PASSWORD@db.llydesdtudepdiebfzfk.supabase.co:5432/postgres`
- **Scope:** Production, Preview, Development

#### **JWT_SECRET**
- **Value:** Your JWT secret for token generation
- **Scope:** Production, Preview, Development

## 📍 How to Get Your Supabase Keys

1. **Go to Supabase Dashboard:**
   https://supabase.com/dashboard/project/llydesdtudepdiebfzfk/settings/api

2. **Copy the following:**
   - **Project URL** → Use as `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → Use as `SUPABASE_SERVICE_ROLE_KEY`

## 🔧 Google OAuth Configuration

### 1. Update Google Cloud Console

**Go to:** https://console.cloud.google.com/apis/credentials

**Authorized redirect URIs (must include all 3):**
```
https://llydesdtudepdiebfzfk.supabase.co/auth/v1/callback
https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

**Authorized JavaScript origins:**
```
https://llydesdtudepdiebfzfk.supabase.co
https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app
http://localhost:3000
```

### 2. Update Supabase Dashboard

**Go to:** https://supabase.com/dashboard/project/llydesdtudepdiebfzfk/auth/providers

1. Enable **Google** provider
2. Add your **Client ID** and **Client Secret** from Google Cloud Console
3. **Save** the changes

## 🚀 Deployment Steps

### 1. Wait for Current Deployment to Complete
The deployment is already in progress. Wait 2-3 minutes for it to finish.

### 2. Test the Environment Variables Endpoint
Once deployed, visit:
```
https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app/api/test-supabase-url
```

**Expected Response:**
```json
{
  "supabaseUrl": "https://llydesdtudepdiebfzfk.supabase.co",
  "supabaseAnonKey": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Environment variables check"
}
```

### 3. If Wrong URL Appears

If you see the old URL (`xfsakpxluorfhumjopgp`), then:

1. **Go to Vercel Environment Variables:**
   https://vercel.com/zoom-bahrain-services-projects/mi-test/settings/environment-variables

2. **Delete the old `NEXT_PUBLIC_SUPABASE_URL` variable**

3. **Add the correct one:**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://llydesdtudepdiebfzfk.supabase.co`
   - Scope: All (Production, Preview, Development)

4. **Redeploy** (will happen automatically or click "Redeploy" on latest deployment)

### 4. Test Authentication

After deployment completes and environment variables are correct:

#### Test Google OAuth:
1. Go to: https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app/login
2. Click "Sign in with Google"
3. Should redirect to Google → back to your app successfully

#### Test Email/Password:
1. Go to: https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app/signup
2. Enter email and password
3. Should create account successfully

## 🐛 Troubleshooting

### Issue: "Failed to create user"

**Cause:** RLS (Row Level Security) policy missing

**Fix:** Run this SQL in Supabase SQL Editor:
```sql
-- Allow user registration (INSERT into users table)
DROP POLICY IF EXISTS "Allow user registration" ON users;
CREATE POLICY "Allow user registration"
ON users FOR INSERT
WITH CHECK (true);
```

### Issue: Google OAuth redirects to old URL

**Cause:** Google Cloud Console still has old redirect URI

**Fix:**
1. Remove old redirect URIs from Google Cloud Console
2. Add only the new redirect URIs (listed above)
3. Wait 5-10 minutes for Google to propagate changes
4. Clear browser cache and try again

### Issue: "Unauthorized" or "Invalid token"

**Cause:** Environment variables not set in Vercel

**Fix:**
1. Verify all environment variables are set in Vercel
2. Redeploy after adding variables
3. Clear browser cookies and localStorage

## ✅ Verification Checklist

- [ ] All 12 code files updated to use environment variables
- [ ] Code pushed to GitHub
- [ ] Vercel deployment completed successfully
- [ ] Environment variables set in Vercel (all 5 variables)
- [ ] Google Cloud Console redirect URIs updated
- [ ] Supabase Google provider enabled with correct credentials
- [ ] Test endpoint returns correct Supabase URL
- [ ] Google OAuth login works
- [ ] Email/Password signup works
- [ ] RLS policies configured for user registration

## 📊 Status

✅ **Code Fixed** - All hardcoded URLs replaced with environment variables
✅ **Pushed to GitHub** - Commit: `4e1de36`
🔄 **Deployment In Progress** - Vercel is building the updated code
⏳ **Waiting** - For deployment to complete and environment variable verification

## 🎉 Next Steps

1. **Check deployment status** at https://vercel.com/zoom-bahrain-services-projects/mi-test
2. **Test the environment variables endpoint** once deployment is complete
3. **Update Vercel environment variables** if the test shows wrong values
4. **Test authentication** (Google OAuth and Email/Password)

---

**Created:** 2025-10-08  
**Last Updated:** 2025-10-08  
**Status:** Code fixed, awaiting deployment

