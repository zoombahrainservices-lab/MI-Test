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
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')

      console.log('🔍 Auth check:', { token: token ? 'Present' : 'Missing', userData: userData ? 'Present' : 'Missing' })

      if (token && userData) {
        const parsedUser = JSON.parse(userData)
        console.log('✅ User authenticated:', parsedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } else {
        console.log('❌ User not authenticated')
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('❌ Error checking auth:', error)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = (userData: User, token: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Set cookies for middleware
    const expires = new Date()
    expires.setDate(expires.getDate() + 7)
    document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
    document.cookie = `user=${encodeURIComponent(JSON.stringify(userData))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
    
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Clear cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    
    setUser(null)
    setIsAuthenticated(false)
    router.push('/login')
  }

  const requireAuth = () => {
    if (!isAuthenticated && !loading) {
      router.push('/login')
      return false
    }
    return isAuthenticated
  }

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    requireAuth,
    checkAuth
  }
}
