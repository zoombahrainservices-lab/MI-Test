'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Left side - Logo/Title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition duration-200">
              <Image
                src="/logo.png"
                alt="MindMatrix Logo"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12"
                priority
              />
              <span className="text-lg sm:text-xl font-bold text-gray-800">MindMatrix</span>
            </Link>
          </div>

          {/* Middle - Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`relative transition duration-200 font-medium ${
                isActive('/') 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
              {isActive('/') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </Link>
            {isAuthenticated && (
              <Link 
                href="/discover" 
                className={`relative transition duration-200 font-medium ${
                  isActive('/discover') 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Discover
                {isActive('/discover') && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </Link>
            )}
            <Link 
              href="/pricing" 
              className={`relative transition duration-200 font-medium ${
                isActive('/pricing') 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Pricing
              {isActive('/pricing') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </Link>
            <Link 
              href="/contact" 
              className={`relative transition duration-200 font-medium ${
                isActive('/contact') 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Contact
              {isActive('/contact') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </Link>
          </div>

          {/* Right side - Login/User Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
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
                  className={`relative transition duration-200 font-medium py-2 ${
                    isActive('/') 
                      ? 'text-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                  {isActive('/') && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                  )}
                </Link>
                {isAuthenticated && (
                  <Link 
                    href="/discover" 
                    className={`relative transition duration-200 font-medium py-2 ${
                      isActive('/discover') 
                        ? 'text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Discover
                    {isActive('/discover') && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                    )}
                  </Link>
                )}
                <Link 
                  href="/pricing" 
                  className={`relative transition duration-200 font-medium py-2 ${
                    isActive('/pricing') 
                      ? 'text-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                  {isActive('/pricing') && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                  )}
                </Link>
                <Link 
                  href="/contact" 
                  className={`relative transition duration-200 font-medium py-2 ${
                    isActive('/contact') 
                      ? 'text-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                  {isActive('/contact') && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                  )}
                </Link>
              </div>

              {/* Auth Section */}
              <div className="border-t border-gray-200 pt-4">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-3">
                    <div className="text-sm text-gray-500">
                      Welcome, {user?.name || user?.email}
                    </div>
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
