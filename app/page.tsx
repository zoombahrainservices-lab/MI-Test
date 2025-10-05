'use client'

import Header from './components/Header'
import HomePage from './components/HomePage'
import { useAuth } from './hooks/useAuth'

export default function Home() {
  const { isAuthenticated, loading } = useAuth()

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <HomePage />
      </div>
    </main>
  )
}
