# Supabase Google OAuth Setup

## 🚀 Quick Setup with Your Google Client ID

You have your Google Client ID: `428899873631-vno2f4vg5mrm59fa9bfd7q0fhv9ompvi.apps.googleusercontent.com`

### Step 1: Get Your Google Client Secret

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Select your project (the one with Client ID: 428899873631-vno2f4vg5mrm59fa9bfd7q0fhv9ompvi)

2. **Navigate to Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Find your OAuth 2.0 Client ID
   - Click on it to view details

3. **Copy the Client Secret**
   - You'll see both Client ID and Client Secret
   - Copy the Client Secret (it looks like: `GOCSPX-xxxxxxxxxxxxxxxxxxxx`)

### Step 2: Configure Supabase

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `xfsakpxluorfhumjopgp`

2. **Navigate to Authentication**
   - Go to "Authentication" → "Providers"
   - Find "Google" in the list

3. **Enable Google Provider**
   - Toggle "Enable sign in with Google" to **ON**
   - Enter your credentials:
     - **Client ID**: `428899873631-vno2f4vg5mrm59fa9bfd7q0fhv9ompvi.apps.googleusercontent.com`
     - **Client Secret**: `[Your Client Secret from Step 1]`

4. **Save Configuration**
   - Click "Save" to apply the changes

### Step 3: Verify Redirect URLs

Make sure your Google OAuth credentials have these redirect URIs:

**In Google Cloud Console:**
```
https://xfsakpxluorfhumjopgp.supabase.co/auth/v1/callback
http://localhost:3001/auth/callback
http://localhost:3000/auth/callback
```

### Step 4: Test the Integration

1. **Visit your login page**
   - Go to: http://localhost:3001/login
   - You should see the "Sign in with Google" button

2. **Test Google Sign-in**
   - Click the Google button
   - You'll be redirected to Google's OAuth page
   - After authentication, you'll be redirected back to your app

### 🔧 Troubleshooting

**If you get "Invalid redirect URI" error:**
- Check that the redirect URI in Google Console exactly matches: `https://xfsakpxluorfhumjopgp.supabase.co/auth/v1/callback`

**If you get "Client ID not found" error:**
- Verify the Client ID is correct in Supabase
- Make sure there are no extra spaces or characters

**If the Google button doesn't appear:**
- Check the browser console for any JavaScript errors
- Make sure the GoogleAuth component is properly imported

### ✅ Quick Checklist

- [ ] Google Client Secret obtained from Google Cloud Console
- [ ] Supabase Google provider enabled
- [ ] Client ID added to Supabase: `428899873631-vno2f4vg5mrm59fa9bfd7q0fhv9ompvi.apps.googleusercontent.com`
- [ ] Client Secret added to Supabase
- [ ] Redirect URIs configured in Google Console
- [ ] Test authentication flow

Once you complete these steps, Google authentication will be fully functional! 🎉
