'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Left side - Logo/Title */}
          <div className="flex items-center">
            <Link href="/" className="text-lg sm:text-xl font-bold text-gray-800 hover:text-blue-600 transition duration-200">
              <span className="hidden sm:inline">Multiple Intelligence Test</span>
              <span className="sm:hidden">MI Test</span>
            </Link>
          </div>

          {/* Middle - Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
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

          {/* Right side - Login/User Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-blue-600 transition duration-200 font-medium"
                >
                  Dashboard
                </Link>
                <span className="text-gray-600 hidden lg:inline">Welcome, {user?.name || user?.email}</span>
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
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-800 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {/* Navigation Links */}
              <div className="flex flex-col space-y-2">
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-blue-600 transition duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/pricing" 
                  className="text-gray-600 hover:text-blue-600 transition duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link 
                  href="/contact" 
                  className="text-gray-600 hover:text-blue-600 transition duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>

              {/* Auth Section */}
              <div className="border-t border-gray-200 pt-4">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-3">
                    <div className="text-sm text-gray-500">
                      Welcome, {user?.name || user?.email}
                    </div>
                    <Link
                      href="/dashboard"
                      className="text-gray-600 hover:text-blue-600 transition duration-200 font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 text-left"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/login"
                      className="text-gray-600 hover:text-blue-600 transition duration-200 font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
