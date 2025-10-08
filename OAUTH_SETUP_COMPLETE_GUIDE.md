# 🔐 Complete OAuth Setup Guide - Updated Credentials

**Last Updated:** 2025-10-08  
**Status:** New OAuth credentials configured

---

## 📋 New Google OAuth Credentials

⚠️ **IMPORTANT:** Your OAuth credentials are stored locally in:
- `client_secret_967437028471-ptjc2g7j271iga52j5ca9kii8783g9kt.apps.googleusercontent.com.json`
- This file is NOT committed to Git for security

**To get your credentials:**
1. Check the JSON file in your local project folder
2. Or get them from Google Cloud Console: https://console.cloud.google.com/apis/credentials

---

## ✅ Step 1: Configure Google Cloud Console (5 minutes)

### 1.1 Go to Google Cloud Console
**URL:** https://console.cloud.google.com/apis/credentials

### 1.2 Select Your OAuth Client
Click on: `967437028471-ptjc2g7j271iga52j5ca9kii8783g9kt.apps.googleusercontent.com`

### 1.3 Add Authorized JavaScript Origins

Click **"ADD URI"** and add each of these (one at a time):

```
https://llydesdtudepdiebfzfk.supabase.co
```
```
https://mi-test-git-master-zoom-bahrain-services-projects.vercel.app
```
```
https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app
```
```
http://localhost:3000
```
```
http://localhost:3001
```

⚠️ **IMPORTANT:** Do NOT include `?_vercel_share=...` or any query parameters!

### 1.4 Add Authorized Redirect URIs

Click **"ADD URI"** and add each of these (one at a time):

```
https://llydesdtudepdiebfzfk.supabase.co/auth/v1/callback
```
```
https://mi-test-git-master-zoom-bahrain-services-projects.vercel.app/auth/callback
```
```
https://mi-test-3xgp6450x-zoom-bahrain-services-projects.vercel.app/auth/callback
```
```
http://localhost:3000/auth/callback
```

### 1.5 Save Changes
Click **"SAVE"** at the bottom of the page.

⏰ **Wait 5-10 minutes** for Google to propagate the changes.

---

## ✅ Step 2: Configure Supabase (3 minutes)

### 2.1 Go to Supabase Auth Providers
**URL:** https://supabase.com/dashboard/project/llydesdtudepdiebfzfk/auth/providers

### 2.2 Enable Google Provider
1. Find **Google** in the providers list
2. Click on it to expand
3. Toggle **"Enable Sign in with Google"** to ON

### 2.3 Enter OAuth Credentials

**Client ID (for OAuth):**
- Copy from your local `client_secret_*.json` file
- Or from Google Cloud Console

**Client Secret (for OAuth):**
- Copy from your local `client_secret_*.json` file
- Or from Google Cloud Console

### 2.4 Verify Redirect URL
The redirect URL should be pre-filled as:
```
https://llydesdtudepdiebfzfk.supabase.co/auth/v1/callback
```

### 2.5 Save
Click **"Save"** button.

---

## ✅ Step 3: Verify Vercel Environment Variables (2 minutes)

### 3.1 Go to Vercel Environment Variables
**URL:** https://vercel.com/zoom-bahrain-services-projects/mi-test/settings/environment-variables

### 3.2 Verify These Are Set

| Variable | Value | Scope |
|----------|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://llydesdtudepdiebfzfk.supabase.co` | All ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` (from Supabase) | All ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` (from Supabase) | All ✅ |
| `DATABASE_URL` | `postgresql://postgres:PASSWORD@db.llydesdtudepdiebfzfk.supabase.co:5432/postgres` | All ✅ |
| `JWT_SECRET` | Any secure random string | All ✅ |

### 3.3 Get Supabase Keys
If you need the Supabase keys:
**URL:** https://supabase.com/dashboard/project/llydesdtudepdiebfzfk/settings/api

Copy:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

### 3.4 Redeploy if Needed
If you changed any environment variables:
1. Go to: https://vercel.com/zoom-bahrain-services-projects/mi-test
2. Click on the latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

## ✅ Step 4: Test Everything (5 minutes)

### 4.1 Test Environment Variables
Visit this URL to verify your Vercel deployment is using the correct Supabase URL:
```
https://mi-test-git-master-zoom-bahrain-services-projects.vercel.app/api/test-supabase-url
```

**Expected Response:**
```json
{
  "supabaseUrl": "https://llydesdtudepdiebfzfk.supabase.co",
  "supabaseAnonKey": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Environment variables check"
}
```

✅ If correct → Continue to next test  
❌ If wrong URL → Update Vercel environment variables and redeploy

### 4.2 Test Google OAuth Login

1. **Go to login page:**
   ```
   https://mi-test-git-master-zoom-bahrain-services-projects.vercel.app/login
   ```

2. **Click "Sign in with Google"**

3. **Select your Google account**

4. **Should redirect back to your app successfully** ✅

### 4.3 Test Email/Password Signup

1. **Go to signup page:**
   ```
   https://mi-test-git-master-zoom-bahrain-services-projects.vercel.app/signup
   ```

2. **Enter email and password**

3. **Click "Sign Up"**

4. **Should create account successfully** ✅

### 4.4 Check Browser Console
Open browser DevTools (F12) and check for any errors:
- ✅ No errors = All good!
- ❌ Errors = Check the troubleshooting section below

---

## 🐛 Troubleshooting

### Issue: "Invalid redirect URI" from Google

**Cause:** Google Cloud Console doesn't have the correct redirect URIs

**Solution:**
1. Go back to Step 1 and verify all redirect URIs are added
2. Make sure there are NO query parameters (`?_vercel_share=...`)
3. Wait 10 minutes for Google to propagate changes
4. Clear browser cache and try again

### Issue: "Failed to create user" error

**Cause:** RLS policy missing for user registration

**Solution:** Run this SQL in Supabase SQL Editor:
```sql
-- Allow user registration
DROP POLICY IF EXISTS "Allow user registration" ON users;
CREATE POLICY "Allow user registration"
ON users FOR INSERT
WITH CHECK (true);
```

### Issue: Test endpoint shows wrong Supabase URL

**Cause:** Environment variables not set correctly in Vercel

**Solution:**
1. Go to Vercel environment variables
2. Delete old `NEXT_PUBLIC_SUPABASE_URL` if it exists
3. Add new one: `https://llydesdtudepdiebfzfk.supabase.co`
4. Redeploy
5. Wait 2-3 minutes and test again

### Issue: "Unauthorized" or "Invalid token" errors

**Cause:** Mismatched environment variables

**Solution:**
1. Verify all 5 environment variables are set in Vercel
2. Verify Supabase Google provider has correct Client ID and Secret
3. Redeploy Vercel
4. Clear browser cookies and localStorage
5. Try again

### Issue: Google OAuth redirects to old Supabase URL

**Cause:** Old credentials or wrong configuration in Supabase

**Solution:**
1. Verify Supabase Google provider has the NEW Client ID and Secret
2. Verify Google Cloud Console has the correct redirect URIs
3. Clear browser cache
4. Wait 10 minutes
5. Try again

---

## 📊 Configuration Summary

### ✅ What's Configured

| Component | Status | Configuration |
|-----------|--------|---------------|
| **Google OAuth Client** | ✅ New | `967437028471-ptjc2g7j271iga52j5ca9kii8783g9kt` |
| **Redirect URIs** | ⏳ Pending | Need to add in Google Cloud Console |
| **JavaScript Origins** | ⏳ Pending | Need to add in Google Cloud Console |
| **Supabase Google Provider** | ⏳ Pending | Need to enable and configure |
| **Vercel Environment Variables** | ⏳ Pending | Need to verify/set |
| **Code** | ✅ Fixed | All hardcoded URLs replaced with env vars |

---

## ✅ Complete Checklist

### Google Cloud Console
- [ ] Added all 5 JavaScript origins
- [ ] Added all 4 redirect URIs
- [ ] Saved changes
- [ ] Waited 10 minutes for propagation

### Supabase
- [ ] Enabled Google provider
- [ ] Entered new Client ID
- [ ] Entered new Client Secret
- [ ] Saved changes

### Vercel
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Set `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Set `DATABASE_URL`
- [ ] Set `JWT_SECRET`
- [ ] Redeployed if needed

### Testing
- [ ] Test endpoint returns correct Supabase URL
- [ ] Google OAuth login works
- [ ] Email/Password signup works
- [ ] No console errors

---

## 🎉 Success Criteria

Your setup is complete when:
1. ✅ Test endpoint shows correct Supabase URL
2. ✅ Google OAuth login redirects correctly
3. ✅ User can sign up with email/password
4. ✅ User can sign in with Google
5. ✅ No errors in browser console
6. ✅ User is redirected to `/discover` after login

---

## 📞 Quick Links

- **Google Cloud Console:** https://console.cloud.google.com/apis/credentials
- **Supabase Auth Providers:** https://supabase.com/dashboard/project/llydesdtudepdiebfzfk/auth/providers
- **Supabase API Keys:** https://supabase.com/dashboard/project/llydesdtudepdiebfzfk/settings/api
- **Vercel Environment Variables:** https://vercel.com/zoom-bahrain-services-projects/mi-test/settings/environment-variables
- **Test Endpoint:** https://mi-test-git-master-zoom-bahrain-services-projects.vercel.app/api/test-supabase-url
- **Login Page:** https://mi-test-git-master-zoom-bahrain-services-projects.vercel.app/login
- **Signup Page:** https://mi-test-git-master-zoom-bahrain-services-projects.vercel.app/signup

---

**Total Time to Complete:** ~15 minutes  
**Difficulty:** Easy (just copy & paste)

**Follow this guide step-by-step and your OAuth will work perfectly!** 🎉

