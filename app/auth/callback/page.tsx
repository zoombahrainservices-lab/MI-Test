'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { useAuth } from '../../hooks/useAuth'

const supabaseUrl = 'https://xfsakpxluorfhumjopgp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhmc2FrcHhsdW9yZmh1bWpvcGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMTAyMjQsImV4cCI6MjA3MzU4NjIyNH0.0US4-GK8jdIrGDw8zv9h3TGvQa9kMhhMKVIsOqXRuO4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function AuthCallback() {
  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          router.push('/login?error=auth_failed')
          return
        }

        if (data.session?.user) {
          // Create or update user in our database
          try {
            const response = await fetch('/api/auth/google-callback', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user: data.session.user
              }),
            })

            const userData = await response.json()

            if (response.ok) {
              // Use the auth hook's login function to set both localStorage and cookies
              login(userData.user, data.session.access_token)
              
              // Redirect to dashboard
              router.push('/dashboard')
            } else {
              console.error('Failed to create user:', userData.error)
              router.push('/login?error=user_creation_failed')
            }
          } catch (err) {
            console.error('Error creating user:', err)
            router.push('/login?error=user_creation_failed')
          }
        } else {
          router.push('/login?error=no_session')
        }
      } catch (err) {
        console.error('Auth callback error:', err)
        router.push('/login?error=auth_failed')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  )
}
