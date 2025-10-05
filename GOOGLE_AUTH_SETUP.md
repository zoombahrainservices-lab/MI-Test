# Google Authentication Setup Guide

## 🚀 Google OAuth Configuration

To enable Google authentication in your MindMatrix website, you need to configure Google OAuth in your Supabase project.

### Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project (or select existing)**
   - Click "Select a project" → "New Project"
   - Name: "MindMatrix Website" (or any name you prefer)
   - Click "Create"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click on it and press "Enable"

4. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "MindMatrix Website OAuth"

5. **Configure Authorized Redirect URIs**
   - Add these URIs:
     ```
     https://xfsakpxluorfhumjopgp.supabase.co/auth/v1/callback
     http://localhost:3001/auth/callback
     http://localhost:3000/auth/callback
     ```

6. **Get Your Credentials**
   - Copy the **Client ID** and **Client Secret**
   - Keep these safe - you'll need them for Supabase

### Step 2: Configure Supabase

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `xfsakpxluorfhumjopgp`

2. **Navigate to Authentication**
   - Go to "Authentication" → "Providers"
   - Find "Google" in the list

3. **Enable Google Provider**
   - Toggle "Enable sign in with Google" to ON
   - Enter your Google OAuth credentials:
     - **Client ID**: (from Google Cloud Console)
     - **Client Secret**: (from Google Cloud Console)

4. **Configure Redirect URL**
   - The redirect URL should be: `https://xfsakpxluorfhumjopgp.supabase.co/auth/v1/callback`
   - This is automatically set by Supabase

5. **Save Configuration**
   - Click "Save" to apply the changes

### Step 3: Test the Integration

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Visit the login page**
   - Go to: http://localhost:3001/login
   - You should see a "Sign in with Google" button

3. **Test Google Sign-in**
   - Click the Google button
   - You should be redirected to Google's OAuth page
   - After authentication, you'll be redirected back to your app

### Step 4: Production Setup

For production deployment, you'll need to:

1. **Update Google OAuth Settings**
   - Add your production domain to authorized redirect URIs
   - Example: `https://yourdomain.com/auth/callback`

2. **Update Supabase Settings**
   - Add your production domain to allowed origins in Supabase
   - Go to "Authentication" → "URL Configuration"

### 🔧 Troubleshooting

**Common Issues:**

1. **"Invalid redirect URI" error**
   - Make sure the redirect URI in Google Console matches exactly
   - Check for typos in the URL

2. **"Client ID not found" error**
   - Verify the Client ID is correct in Supabase
   - Make sure the Google project is active

3. **"Access blocked" error**
   - Check if the Google+ API is enabled
   - Verify OAuth consent screen is configured

4. **Redirect loop**
   - Check the callback URL configuration
   - Make sure the auth callback page is working

### 📝 Important Notes

- **Development vs Production**: Use different OAuth credentials for development and production
- **Security**: Never commit OAuth credentials to version control
- **Testing**: Test with different Google accounts to ensure it works for all users
- **User Data**: Google OAuth provides name and email automatically

### ✅ Verification Checklist

- [ ] Google Cloud Console project created
- [ ] Google+ API enabled
- [ ] OAuth 2.0 credentials created
- [ ] Redirect URIs configured correctly
- [ ] Supabase Google provider enabled
- [ ] Client ID and Secret added to Supabase
- [ ] Test authentication flow works
- [ ] User data is stored in database correctly

Once you complete these steps, your users will be able to sign in with their Google accounts! 🎉
