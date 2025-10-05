# 🚨 Fix: Enable Google Provider in Supabase

## The Error
```
{"code":400,"error_code":"validation_failed","msg":"Unsupported provider: provider is not enabled"}
```

This means Google OAuth is **NOT ENABLED** in your Supabase project.

## 🔧 Step-by-Step Fix

### 1. Open Supabase Dashboard
- Go to: https://supabase.com/dashboard
- Select project: `xfsakpxluorfhumjopgp`

### 2. Navigate to Authentication
- Click **"Authentication"** in left sidebar
- Click **"Providers"** tab

### 3. Find Google Provider
- Look for **"Google"** in the providers list
- You'll see a toggle switch that's currently **OFF**

### 4. Enable Google Provider
- Toggle **"Enable sign in with Google"** to **ON**
- You'll see input fields appear:
  - Client ID
  - Client Secret

### 5. Add Your Credentials
- **Client ID**: `428899873631-vno2f4vg5mrm59fa9bfd7q0fhv9ompvi.apps.googleusercontent.com`
- **Client Secret**: [Get this from Google Cloud Console - see below]

### 6. Get Google Client Secret
1. Go to: https://console.cloud.google.com/
2. Select your project
3. Go to "APIs & Services" → "Credentials"
4. Click on your OAuth 2.0 Client ID
5. Copy the **Client Secret** (starts with `GOCSPX-`)

### 7. Save Configuration
- Paste the Client Secret in Supabase
- Click **"Save"**

### 8. Test Again
- Go to: http://localhost:3001/login
- Click "Sign in with Google"
- Should work now! 🎉

## 🔍 What to Look For

**Before (Error):**
```
Google Provider: [OFF] ❌
```

**After (Working):**
```
Google Provider: [ON] ✅
Client ID: 428899873631-vno2f4vg5mrm59fa9bfd7q0fhv9ompvi.apps.googleusercontent.com
Client Secret: GOCSPX-xxxxxxxxxxxxxxxxxxxx
```

## 🚨 Common Issues

1. **"Client ID not found"**
   - Double-check the Client ID is correct
   - No extra spaces or characters

2. **"Invalid redirect URI"**
   - Make sure redirect URI in Google Console is: `https://xfsakpxluorfhumjopgp.supabase.co/auth/v1/callback`

3. **Still getting "provider not enabled"**
   - Make sure you clicked "Save" in Supabase
   - Refresh the page and try again

## ✅ Success Indicators

- Google provider shows as **ENABLED** in Supabase
- No error when clicking "Sign in with Google"
- Redirects to Google OAuth page
- After authentication, redirects back to your app

Once you complete these steps, the Google authentication will work perfectly! 🚀
