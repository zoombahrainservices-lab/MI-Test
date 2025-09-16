'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import GoogleAuth from '../components/GoogleAuth'
import { useAuth } from '../hooks/useAuth'

export default function SignupPage() {
  const router = useRouter()
  const { isAuthenticated, login } = useAuth()
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })
  const [fieldSuccess, setFieldSuccess] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    name: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setFieldErrors({
        ...fieldErrors,
        confirmPassword: 'Passwords do not match'
      })
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register-supabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Use the auth hook's login function to set both localStorage and cookies
        login(data.user, data.token)
        
        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        setError(data.error || 'An error occurred')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // Clear field errors when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: ''
      })
    }

    // Basic validation
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (value && emailRegex.test(value)) {
        setFieldSuccess({
          ...fieldSuccess,
          email: true
        })
      } else {
        setFieldSuccess({
          ...fieldSuccess,
          email: false
        })
      }
    }

    if (name === 'password') {
      if (value && value.length >= 6) {
        setFieldSuccess({
          ...fieldSuccess,
          password: true
        })
      } else {
        setFieldSuccess({
          ...fieldSuccess,
          password: false
        })
      }
      
      // Check if confirm password matches
      if (formData.confirmPassword) {
        if (value === formData.confirmPassword) {
          setFieldSuccess({
            ...fieldSuccess,
            confirmPassword: true
          })
          setFieldErrors({
            ...fieldErrors,
            confirmPassword: ''
          })
        } else {
          setFieldSuccess({
            ...fieldSuccess,
            confirmPassword: false
          })
          setFieldErrors({
            ...fieldErrors,
            confirmPassword: 'Passwords do not match'
          })
        }
      }
    }

    if (name === 'confirmPassword') {
      if (value && value === formData.password) {
        setFieldSuccess({
          ...fieldSuccess,
          confirmPassword: true
        })
        setFieldErrors({
          ...fieldErrors,
          confirmPassword: ''
        })
      } else if (value && value !== formData.password) {
        setFieldSuccess({
          ...fieldSuccess,
          confirmPassword: false
        })
        setFieldErrors({
          ...fieldErrors,
          confirmPassword: 'Passwords do not match'
        })
      } else {
        setFieldSuccess({
          ...fieldSuccess,
          confirmPassword: false
        })
      }
    }

    if (name === 'name') {
      if (value && value.length >= 2) {
        setFieldSuccess({
          ...fieldSuccess,
          name: true
        })
      } else {
        setFieldSuccess({
          ...fieldSuccess,
          name: false
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to existing account
            </Link>
          </p>
        </div>
        
        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="name" className={`block mb-2 text-sm font-medium ${
                fieldSuccess.name ? 'text-green-700' : fieldErrors.name ? 'text-red-700' : 'text-gray-700'
              }`}>
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`${
                  fieldSuccess.name 
                    ? 'bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500' 
                    : fieldErrors.name 
                      ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                } border text-sm rounded-lg block w-full p-2.5`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {fieldSuccess.name && (
                <p className="mt-2 text-sm text-green-600">
                  <span className="font-medium">Great!</span> Name looks good!
                </p>
              )}
              {fieldErrors.name && (
                <p className="mt-2 text-sm text-red-600">
                  <span className="font-medium">Error!</span> {fieldErrors.name}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className={`block mb-2 text-sm font-medium ${
                fieldSuccess.email ? 'text-green-700' : fieldErrors.email ? 'text-red-700' : 'text-gray-700'
              }`}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`${
                  fieldSuccess.email 
                    ? 'bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500' 
                    : fieldErrors.email 
                      ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                } border text-sm rounded-lg block w-full p-2.5`}
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
              />
              {fieldSuccess.email && (
                <p className="mt-2 text-sm text-green-600">
                  <span className="font-medium">Perfect!</span> Email format is valid!
                </p>
              )}
              {fieldErrors.email && (
                <p className="mt-2 text-sm text-red-600">
                  <span className="font-medium">Error!</span> {fieldErrors.email}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className={`block mb-2 text-sm font-medium ${
                fieldSuccess.password ? 'text-green-700' : fieldErrors.password ? 'text-red-700' : 'text-gray-700'
              }`}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`${
                  fieldSuccess.password 
                    ? 'bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500' 
                    : fieldErrors.password 
                      ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                } border text-sm rounded-lg block w-full p-2.5`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {fieldSuccess.password && (
                <p className="mt-2 text-sm text-green-600">
                  <span className="font-medium">Excellent!</span> Password is strong enough!
                </p>
              )}
              {fieldErrors.password && (
                <p className="mt-2 text-sm text-red-600">
                  <span className="font-medium">Error!</span> {fieldErrors.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className={`block mb-2 text-sm font-medium ${
                fieldSuccess.confirmPassword ? 'text-green-700' : fieldErrors.confirmPassword ? 'text-red-700' : 'text-gray-700'
              }`}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`${
                  fieldSuccess.confirmPassword 
                    ? 'bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500' 
                    : fieldErrors.confirmPassword 
                      ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
                } border text-sm rounded-lg block w-full p-2.5`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {fieldSuccess.confirmPassword && (
                <p className="mt-2 text-sm text-green-600">
                  <span className="font-medium">Perfect!</span> Passwords match!
                </p>
              )}
              {fieldErrors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  <span className="font-medium">Error!</span> {fieldErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !fieldSuccess.email || !fieldSuccess.password || !fieldSuccess.confirmPassword || !fieldSuccess.name}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create account'
              )}
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              ← Back to home
            </Link>
          </div>
        </form>

        <GoogleAuth mode="signup" />
      </div>
    </div>
  )
}
