'use client'

import { useEffect, useState } from 'react'

export default function DebugAuth() {
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    const getDebugInfo = () => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      
      setDebugInfo({
        token: {
          exists: !!token,
          length: token ? token.length : 0,
          preview: token ? token.substring(0, 50) + '...' : 'None',
          full: token
        },
        user: {
          exists: !!user,
          data: user ? JSON.parse(user) : null
        },
        cookies: document.cookie,
        userAgent: navigator.userAgent,
        url: window.location.href
      })
    }

    getDebugInfo()
  }, [])

  const clearAll = () => {
    localStorage.clear()
    sessionStorage.clear()
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    })
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Authentication Debug Info</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">LocalStorage Data</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-600">Token:</h3>
              <div className="bg-gray-50 p-3 rounded">
                <p><strong>Exists:</strong> {debugInfo.token?.exists ? 'Yes' : 'No'}</p>
                <p><strong>Length:</strong> {debugInfo.token?.length}</p>
                <p><strong>Preview:</strong> {debugInfo.token?.preview}</p>
                {debugInfo.token?.full && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-blue-600">Show Full Token</summary>
                    <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {debugInfo.token.full}
                    </pre>
                  </details>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-600">User Data:</h3>
              <div className="bg-gray-50 p-3 rounded">
                <p><strong>Exists:</strong> {debugInfo.user?.exists ? 'Yes' : 'No'}</p>
                {debugInfo.user?.data && (
                  <pre className="mt-2 text-sm bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(debugInfo.user.data, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Cookies</h2>
          <div className="bg-gray-50 p-3 rounded">
            <pre className="text-sm overflow-auto">
              {debugInfo.cookies || 'No cookies found'}
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Browser Info</h2>
          <div className="bg-gray-50 p-3 rounded">
            <p><strong>URL:</strong> {debugInfo.url}</p>
            <p><strong>User Agent:</strong> {debugInfo.userAgent}</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={clearAll}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Clear All Data
          </button>
          
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Go to Login
          </button>
          
          <button
            onClick={() => window.location.href = '/discover'}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Go to Discover
          </button>
        </div>
      </div>
    </div>
  )
}
