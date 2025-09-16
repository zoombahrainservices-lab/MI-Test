'use client'

import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Left side - Logo/Title */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition duration-200">
              Multiple Intelligence Test
            </Link>
          </div>

          {/* Middle - Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition duration-200 font-medium">
              Home
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition duration-200 font-medium">
              Pricing
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition duration-200 font-medium">
              Contact
            </Link>
          </div>

          {/* Right side - Login/User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-blue-600 transition duration-200 font-medium"
                >
                  Dashboard
                </Link>
                <span className="text-gray-600">Welcome, {user?.name || user?.email}</span>
                <button
                  onClick={logout}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-blue-600 transition duration-200 font-medium"
                >
                  Login
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
