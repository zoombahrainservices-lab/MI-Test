'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClearAuth() {
  const router = useRouter()
  const [cleared, setCleared] = useState(false)

  useEffect(() => {
    // Force clear all authentication data
    console.log('Force clearing all authentication data...')
    
    // Clear ALL localStorage (not just specific items)
    localStorage.clear()
    
    // Clear ALL sessionStorage
    sessionStorage.clear()
    
    // Clear all cookies
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    })
    
    // Clear IndexedDB if it exists
    if ('indexedDB' in window) {
      try {
        indexedDB.deleteDatabase('keyval-store')
      } catch (e) {
        // Ignore errors
      }
    }
    
    console.log('All authentication data cleared successfully')
    setCleared(true)
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      window.location.href = '/login' // Use window.location.href for hard redirect
    }, 2000)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-red-600 text-6xl mb-4">🔧</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Authentication Reset</h1>
          
          {!cleared ? (
            <div>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Clearing authentication data...</p>
            </div>
          ) : (
            <div>
              <div className="text-green-600 text-4xl mb-4">✅</div>
              <p className="text-green-600 font-semibold mb-2">Authentication data cleared!</p>
              <p className="text-gray-600 text-sm">Redirecting to login page...</p>
            </div>
          )}
          
          <div className="mt-6 text-xs text-gray-500">
            <p>This page clears all stored authentication data to fix login issues.</p>
            <p>You will be redirected to the login page automatically.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
