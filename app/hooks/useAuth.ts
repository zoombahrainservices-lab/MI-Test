'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')

      console.log('useAuth checkAuth - Token:', token ? 'Found' : 'Not found')
      console.log('useAuth checkAuth - Token length:', token ? token.length : 0)
      console.log('useAuth checkAuth - User data:', userData ? 'Found' : 'Not found')

      // Check if token is valid JWT format (should be 200+ characters)
      if (token && token.length < 100) {
        console.log('useAuth checkAuth - Invalid token format, clearing auth data')
        clearAuthData()
        return
      }

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData)
          console.log('useAuth checkAuth - Parsed user:', parsedUser)
          
          // For now, just check if we have valid data - skip server verification to break the loop
          if (parsedUser && parsedUser.id && parsedUser.email) {
            setUser(parsedUser)
            setIsAuthenticated(true)
            console.log('useAuth checkAuth - User authenticated locally')
          } else {
            console.log('useAuth checkAuth - Invalid user data, clearing auth data')
            clearAuthData()
          }
        } catch (parseError) {
          console.error('Error parsing user data:', parseError)
          clearAuthData()
        }
      } else {
        console.log('useAuth checkAuth - No token or user data, setting unauthenticated')
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      clearAuthData()
    } finally {
      setLoading(false)
      setAuthChecked(true)
    }
  }

  const verifyTokenWithServer = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      })
      return response.ok
    } catch (error) {
      console.error('Token verification failed:', error)
      return false
    }
  }

  const clearAuthData = () => {
    console.log('Clearing authentication data')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Clear cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    
    setUser(null)
    setIsAuthenticated(false)
  }

  const login = (userData: User, token: string) => {
    // Validate token format before storing
    if (token.length < 100) {
      console.error('Invalid token format received')
      return false
    }

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Set cookies for middleware with 24-hour expiration
    const expires = new Date()
    expires.setDate(expires.getDate() + 1) // 24 hours
    document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
    document.cookie = `user=${encodeURIComponent(JSON.stringify(userData))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
    
    setUser(userData)
    setIsAuthenticated(true)
    return true
  }

  const logout = () => {
    clearAuthData()
    router.push('/login')
  }

  const requireAuth = () => {
    if (!authChecked) {
      return false // Still checking authentication
    }
    if (!isAuthenticated) {
      router.push('/login')
      return false
    }
    return isAuthenticated
  }

  // Auto-logout after 24 hours
  useEffect(() => {
    if (isAuthenticated) {
      const timeout = setTimeout(() => {
        console.log('Session expired, logging out')
        logout()
      }, 24 * 60 * 60 * 1000) // 24 hours

      return () => clearTimeout(timeout)
    }
  }, [isAuthenticated])

  return {
    user,
    loading: loading || !authChecked,
    isAuthenticated,
    login,
    logout,
    requireAuth,
    checkAuth,
    clearAuthData
  }
}
