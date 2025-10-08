# 🚀 Quick Fix Guide - Google OAuth & Vercel

## ⚡ The Problem
Your code had **hardcoded Supabase URLs** in 12 files, so changing environment variables in Vercel didn't work.

## ✅ What I Fixed
Replaced all hardcoded URLs with environment variables in:
- All API routes (9 files)
- Client components (2 files)  
- Library files (1 file)

## 🎯 What YOU Need to Do Now

### 1️⃣ Set Environment Variables in Vercel (5 minutes)

**Go to:** https://vercel.com/zoom-bahrain-services-projects/mi-test/settings/environment-variables

**Add these 5 variables:**

| Variable Name | Value | Where to Get It |
|--------------|-------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://llydesdtudepdiebfzfk.supabase.co` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` | Supabase Dashboard → Settings → API |
| `DATABASE_URL` | `postgresql://postgres:PASSWORD@db.llydesdtudepdiebfzfk.supabase.co:5432/postgres` | Replace PASSWORD with your DB password |
| `JWT_SECRET` | Any random string | Use a secure random string |

**Scope for all:** ✅ Production ✅ Preview ✅ Development

### 2️⃣ Update Google Cloud Console (3 minutes)

**Go to:** https://console.cloud.google.com/apis/credentials

**Authorized redirect URIs:**
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

### 3️⃣ Enable Google in Supabase (2 minutes)

**Go to:** https://supabase.com/dashboard/project/llydesdtudepdiebfzfk/auth/providers

1. Click on **Google** provider
2. Toggle **Enable**
3. Paste your **Client ID** and **Client Secret** from Google
4. Click **Save**

### 4️⃣ Test Your Deployment (2 minutes)

**Wait for Vercel deployment to finish** (check: https://vercel.com/zoom-bahrain-services-projects/mi-test)

**Then test the environment variables:**
```
https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app/api/test-supabase-url
```

**Should return:**
```json
{
  "supabaseUrl": "https://llydesdtudepdiebfzfk.supabase.co",
  ...
}
```

### 5️⃣ Test Authentication

**Google OAuth:**
```
https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app/login
```
Click "Sign in with Google" → Should work! ✅

**Email/Password:**
```
https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app/signup
```
Create an account → Should work! ✅

## 🐛 If Something Doesn't Work

### Google OAuth Still Goes to Old URL?
1. Clear your browser cache
2. Wait 10 minutes (Google takes time to update)
3. Double-check Google Cloud Console redirect URIs

### "Failed to create user" Error?
Run this SQL in Supabase SQL Editor:
```sql
DROP POLICY IF EXISTS "Allow user registration" ON users;
CREATE POLICY "Allow user registration"
ON users FOR INSERT
WITH CHECK (true);
```

### Test Endpoint Shows Wrong URL?
1. Delete old environment variables in Vercel
2. Add new ones (from step 1)
3. Redeploy
4. Wait 2-3 minutes
5. Test again

## 📋 Quick Checklist

- [ ] Set 5 environment variables in Vercel
- [ ] Update Google Cloud Console redirect URIs
- [ ] Enable Google provider in Supabase
- [ ] Wait for Vercel deployment to complete
- [ ] Test environment variables endpoint
- [ ] Test Google OAuth login
- [ ] Test email/password signup

## 🎉 Done!

Once all checklist items are complete, your authentication should work perfectly on Vercel!

---

**Need more details?** See `VERCEL_AUTH_FIX.md` for the complete technical guide.

