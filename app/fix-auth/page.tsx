'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FixAuth() {
  const router = useRouter()

  useEffect(() => {
    // Clear all authentication data
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Clear cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    
    console.log('Authentication data cleared')
    
    // Redirect to login after a short delay
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">Fixing Authentication</h1>
        <p className="text-gray-600">Clearing invalid authentication data...</p>
        <p className="text-sm text-gray-500 mt-2">Redirecting to login in 2 seconds...</p>
      </div>
    </div>
  )
}
