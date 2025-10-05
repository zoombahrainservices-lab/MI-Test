'use client'

import { useEffect, useState } from 'react'

export default function EmergencyFix() {
  const [status, setStatus] = useState('Starting...')

  useEffect(() => {
    const fixAuth = async () => {
      try {
        setStatus('Clearing localStorage...')
        
        // Clear all localStorage
        localStorage.clear()
        
        setStatus('Clearing sessionStorage...')
        
        // Clear all sessionStorage
        sessionStorage.clear()
        
        setStatus('Clearing cookies...')
        
        // Clear all cookies
        document.cookie.split(";").forEach(function(c) { 
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
        })
        
        setStatus('Clearing IndexedDB...')
        
        // Clear IndexedDB if it exists
        if ('indexedDB' in window) {
          try {
            indexedDB.deleteDatabase('keyval-store')
          } catch (e) {
            // Ignore errors
          }
        }
        
        setStatus('Done! Redirecting...')
        
        // Force redirect to home page
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
        
      } catch (error) {
        setStatus('Error: ' + error)
      }
    }

    fixAuth()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-red-600 text-6xl mb-4">🚨</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Emergency Authentication Fix</h1>
          
          <div className="mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold">{status}</p>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
            <p className="font-semibold mb-2">This page will:</p>
            <ul className="text-left space-y-1">
              <li>• Clear all localStorage data</li>
              <li>• Clear all sessionStorage data</li>
              <li>• Clear all cookies</li>
              <li>• Clear IndexedDB data</li>
              <li>• Redirect to home page</li>
            </ul>
          </div>
          
          <div className="mt-6 text-xs text-gray-500">
            <p>This is an emergency fix for authentication loops.</p>
            <p>You will be redirected to the home page automatically.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
