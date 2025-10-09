# 🚀 Vercel Deployment - Environment Variables Setup

## ✅ Repository Status: CLEAN

Your Git repository is now **clean** with:
- ✅ No old Supabase URL references
- ✅ `.env` file kept local (not pushed to Git)
- ✅ No large files or node_modules
- ✅ Proper `.gitignore` configuration

---

## 🔑 Required Environment Variables for Vercel

Add these **7 environment variables** in your Vercel dashboard:
**Settings → Environment Variables**

### 1. NEXT_PUBLIC_SUPABASE_URL
```
https://llydesdtudepdiebfzfk.supabase.co
```

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxseWRlc2R0dWRlcGRpZWJmemZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTgzODQsImV4cCI6MjA3NTE3NDM4NH0.A8qjgiFYoygSxw7YCFkDU6jp7-bBzCUekOfc7LeN5Qk
```

### 3. SUPABASE_SERVICE_ROLE_KEY
```
Get from: https://supabase.com/dashboard/project/llydesdtudepdiebfzfk/settings/api
```

### 4. DATABASE_URL
```
postgresql://postgres:[YOUR-PASSWORD]@db.llydesdtudepdiebfzfk.supabase.co:5432/postgres
```
**Replace `[YOUR-PASSWORD]` with your actual database password**

### 5. JWT_SECRET
```
Generate a secure random string (32+ characters)
Example: use a password generator or command:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 6. GOOGLE_CLIENT_ID
```
Get from your local file: client_secret_*.json
Or from: https://console.cloud.google.com/apis/credentials
```

### 7. GOOGLE_CLIENT_SECRET
```
Get from your local file: client_secret_*.json
Or from: https://console.cloud.google.com/apis/credentials
```

---

## 📝 Steps to Deploy

### 1. Add Environment Variables to Vercel
Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add all 7 variables above, selecting **"All Environments"** for each.

### 2. Redeploy Your Project
After adding the environment variables:
- Go to Deployments tab
- Click the three dots (...) on the latest deployment
- Click "Redeploy"

OR just push any commit:
```bash
git commit --allow-empty -m "Trigger redeployment"
git push origin main
```

### 3. Test Your Deployment
Wait 2-3 minutes for deployment, then test:

**Test Supabase Connection:**
```
https://your-app.vercel.app/api/test-supabase-url
```
Should show: `"supabaseUrl": "https://llydesdtudepdiebfzfk.supabase.co"`

**Test Google OAuth:**
- Visit your deployed app
- Click "Sign in with Google"
- Should redirect to Google login (NOT the old Supabase URL)

**Test Email/Password:**
- Try signing up with email/password
- Should work without "Invalid credentials" error

---

## 🔒 Security Note

**Why we DON'T push `.env` to Git:**
- GitHub automatically blocks pushes with OAuth secrets (Push Protection)
- Secrets in Git history are accessible to anyone with repo access
- Vercel environment variables are the secure way to handle secrets

Your `.env` file is now in `.gitignore` and will stay on your local machine only.

---

## ✅ What's Fixed

1. ✅ Removed all references to old Supabase URL (`xfsakpxluorfhumjopgp`)
2. ✅ Code uses environment variables (`process.env.*`)
3. ✅ `.gitignore` properly configured
4. ✅ No secrets committed to Git
5. ✅ Clear instructions for Vercel deployment

---

## 🆘 If You Still See Issues

1. **Old URL still showing?**
   - Clear Vercel cache: Settings → Data Cache → Clear All
   - Ensure ALL 7 environment variables are set
   - Redeploy from scratch

2. **Google OAuth not working?**
   - Check Google Cloud Console authorized redirect URIs
   - Ensure Supabase Google provider is enabled
   - Verify Client ID and Secret match

3. **Email login failing?**
   - Check RLS policies in Supabase
   - Ensure user exists in database
   - Test with Supabase Auth debug mode

---

## 📞 Next Steps

1. Add all 7 environment variables to Vercel ✅
2. Redeploy your project ✅
3. Test authentication (Google & Email) ✅
4. Celebrate! 🎉


