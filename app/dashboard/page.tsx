'use client'

import { useAuth } from '../hooks/useAuth'
import ProtectedRoute from '../components/ProtectedRoute'
import Header from '../components/Header'
import Link from 'next/link'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <ProtectedRoute>
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome to Your Dashboard
                </h1>
                <p className="text-gray-600">
                  Hello, {user?.name || user?.email}! Here's your Multiple Intelligence Test overview.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-blue-800 mb-3">
                    Take the Test
                  </h2>
                  <p className="text-blue-600 mb-4">
                    Discover your unique intelligence profile with our comprehensive assessment.
                  </p>
                  <Link
                    href="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                  >
                    Start Test
                  </Link>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-green-800 mb-3">
                    View Results
                  </h2>
                  <p className="text-green-600 mb-4">
                    Review your previous test results and track your progress over time.
                  </p>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                    View Results
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Your Profile
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Name:</span>
                    <span className="text-gray-800">{user?.name || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Email:</span>
                    <span className="text-gray-800">{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">User ID:</span>
                    <span className="text-gray-800 font-mono text-sm">{user?.id}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}