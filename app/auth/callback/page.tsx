'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { useAuth } from '../../hooks/useAuth'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function AuthCallback() {
  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // First, try to get the session from the URL hash/fragment
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Session error:', sessionError)
          // Try to handle the OAuth callback from URL
          const { data: authData, error: authError } = await supabase.auth.getUser()
          
          if (authError || !authData.user) {
            console.error('Auth error:', authError)
            router.push('/login?error=auth_failed')
            return
          }
          
          // We have a user, proceed with user creation/login
          await handleUserAuth(authData.user)
          return
        }

        if (sessionData.session?.user) {
          await handleUserAuth(sessionData.session.user)
        } else {
          // Try to get user without session
          const { data: userData, error: userError } = await supabase.auth.getUser()
          
          if (userError || !userData.user) {
            console.error('No user found:', userError)
            router.push('/login?error=no_session')
            return
          }
          
          await handleUserAuth(userData.user)
        }
      } catch (err) {
        console.error('Auth callback error:', err)
        router.push('/login?error=auth_failed')
      }
    }

    const handleUserAuth = async (user: any) => {
      try {
        const response = await fetch('/api/auth/google-callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user
          }),
        })

        const userData = await response.json()

        if (response.ok) {
          // Use the auth hook's login function to set both localStorage and cookies
          login(userData.user, userData.token)
          
          // Redirect to discover page
          router.push('/discover')
        } else {
          console.error('Failed to create user:', userData.error)
          router.push('/login?error=user_creation_failed')
        }
      } catch (err) {
        console.error('Error creating user:', err)
        router.push('/login?error=user_creation_failed')
      }
    }

    handleAuthCallback()
  }, [router, login])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  )
}
