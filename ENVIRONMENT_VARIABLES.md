# Environment Variables Configuration

**Last Updated:** 2025-10-08  
**For:** MI Test Project

---

## 📋 Required Environment Variables

### **Vercel Environment Variables**

Set these in: https://vercel.com/zoom-bahrain-services-projects/mi-test/settings/environment-variables

| Variable Name | Description | Where to Get | Example Value | Scope |
|--------------|-------------|--------------|---------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API | `https://llydesdtudepdiebfzfk.supabase.co` | All ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Supabase Dashboard → Settings → API | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | All ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (secret) | Supabase Dashboard → Settings → API | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | All ✅ |
| `DATABASE_URL` | PostgreSQL database connection string | Supabase Dashboard → Settings → Database | `postgresql://postgres:PASSWORD@db.llydesdtudepdiebfzfk.supabase.co:5432/postgres` | All ✅ |
| `JWT_SECRET` | Secret key for JWT token generation | Generate a secure random string | Any secure random string (32+ characters) | All ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Local `client_secret_*.json` file | (see your local JSON file) | All ✅ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Local `client_secret_*.json` file | (see your local JSON file) | All ✅ |

---

## 🔍 How to Get Each Variable

### 1. **Supabase Variables**

**Go to:** https://supabase.com/dashboard/project/llydesdtudepdiebfzfk/settings/api

**Copy:**
- **Project URL** → Use as `NEXT_PUBLIC_SUPABASE_URL`
- **Project API keys → anon public** → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Project API keys → service_role** → Use as `SUPABASE_SERVICE_ROLE_KEY` ⚠️ (Keep secret!)

### 2. **Database URL**

**Go to:** https://supabase.com/dashboard/project/llydesdtudepdiebfzfk/settings/database

**Format:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.llydesdtudepdiebfzfk.supabase.co:5432/postgres
```

**Replace `[YOUR-PASSWORD]`** with your actual database password.

### 3. **JWT Secret**

Generate a secure random string (32+ characters). You can use:

**Online generator:**
```
https://www.uuidgenerator.net/
```

**Or command line:**
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# PowerShell
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

### 4. **Google OAuth Credentials**

**Open your local file:**
```
client_secret_967437028471-ptjc2g7j271iga52j5ca9kii8783g9kt.apps.googleusercontent.com.json
```

**Copy:**
- `client_id` → Use as `GOOGLE_CLIENT_ID`
- `client_secret` → Use as `GOOGLE_CLIENT_SECRET`

---

## 🚀 Setting Variables in Vercel

### **Step 1: Go to Vercel**
https://vercel.com/zoom-bahrain-services-projects/mi-test/settings/environment-variables

### **Step 2: Add Each Variable**

For each variable:
1. Click **"Add New"**
2. **Name:** Enter the variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
3. **Value:** Paste the value
4. **Environments:** Select **All** (Production, Preview, Development)
5. Click **"Save"**

### **Step 3: Redeploy**

After adding all variables:
1. Go to: https://vercel.com/zoom-bahrain-services-projects/mi-test
2. Click on the latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes for deployment to complete

---

## 🔐 Local Development (.env.local)

For local development, create a `.env.local` file in your project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://llydesdtudepdiebfzfk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.llydesdtudepdiebfzfk.supabase.co:5432/postgres

# JWT
JWT_SECRET=your-secure-random-string-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-from-json-file
GOOGLE_CLIENT_SECRET=your-google-client-secret-from-json-file
```

⚠️ **Note:** `.env.local` is already in `.gitignore` - never commit this file!

---

## ✅ Verification

### **Test Environment Variables Endpoint**

After setting all variables and redeploying, test:

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

✅ **If the URL is correct** → Environment variables are set correctly  
❌ **If the URL is wrong** → Check Vercel environment variables and redeploy

---

## 🐛 Troubleshooting

### Issue: "Environment variable not defined"

**Solution:**
1. Verify the variable is set in Vercel
2. Ensure it's set for all environments (Production, Preview, Development)
3. Redeploy after adding variables
4. Wait 2-3 minutes for deployment to complete

### Issue: "Invalid Supabase credentials"

**Solution:**
1. Go to Supabase Dashboard → Settings → API
2. Copy the keys again (ensure no extra spaces)
3. Update in Vercel
4. Redeploy

### Issue: "Google OAuth not working"

**Solution:**
1. Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set in Vercel
2. Ensure Google OAuth is also configured in Supabase Dashboard
3. Check Google Cloud Console has correct redirect URIs
4. Redeploy

### Issue: "Database connection failed"

**Solution:**
1. Verify `DATABASE_URL` format is correct
2. Check the password is correct (no special characters that need escaping)
3. Ensure port is 5432 (not 6543)
4. Test connection from Supabase Dashboard

---

## 📊 Summary

**Total Variables:** 7

**Public Variables (NEXT_PUBLIC_*):** 2
- Can be accessed in browser
- Safe to expose to client-side code

**Private Variables:** 5
- Only accessible on server-side
- Never exposed to browser
- Keep these secret!

---

## 🔗 Quick Links

- **Vercel Env Vars:** https://vercel.com/zoom-bahrain-services-projects/mi-test/settings/environment-variables
- **Supabase API Keys:** https://supabase.com/dashboard/project/llydesdtudepdiebfzfk/settings/api
- **Supabase Database:** https://supabase.com/dashboard/project/llydesdtudepdiebfzfk/settings/database
- **Google Cloud Console:** https://console.cloud.google.com/apis/credentials
- **Test Endpoint:** https://mi-test-git-master-zoom-bahrain-services-projects.vercel.app/api/test-supabase-url

---

**Once all environment variables are set and you've redeployed, your application will be fully functional!** 🎉

