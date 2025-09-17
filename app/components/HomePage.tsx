'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'

export default function HomePage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  const handleTakeTest = () => {
    if (isAuthenticated) {
      router.push('/discover')
    } else {
      router.push('/login')
    }
  }
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16">
        {isAuthenticated ? (
          <>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 px-4">
              Welcome back, <span className="text-blue-600">{user?.name || user?.email}</span>!
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Ready to discover your intelligence profile? Take our comprehensive assessment to unlock your unique cognitive strengths.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <button
                onClick={handleTakeTest}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition duration-200 transform hover:scale-105 shadow-lg"
              >
                Take the Test Now
              </button>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition duration-200 transform hover:scale-105 shadow-lg text-center"
              >
                View Dashboard
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 px-4">
              Discover Your
              <span className="text-blue-600"> Multiple Intelligence</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Unlock your unique cognitive strengths with our comprehensive assessment based on Howard Gardner's 
              revolutionary theory of multiple intelligences.
            </p>
            <div className="px-4">
              <button
                onClick={handleTakeTest}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition duration-200 transform hover:scale-105 shadow-lg"
              >
                Take the Test Now
              </button>
            </div>
          </>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🧠</div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">8 Intelligence Types</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Comprehensive assessment covering all areas of human intelligence from linguistic to naturalist.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Instant Results</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Get your personalized intelligence profile immediately after completing the test.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center sm:col-span-2 lg:col-span-1">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📊</div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Detailed Insights</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Understand your strengths and discover new ways to develop your intelligences.
          </p>
        </div>
      </div>

      {/* Intelligence Types Preview */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 mb-12 sm:mb-16 mx-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
          The 8 Types of Intelligence
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl mb-2">📚</div>
            <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Linguistic</h4>
            <p className="text-xs sm:text-sm text-gray-600">Word smart</p>
          </div>
          <div className="text-center p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl mb-2">🔢</div>
            <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Logical-Mathematical</h4>
            <p className="text-xs sm:text-sm text-gray-600">Number smart</p>
          </div>
          <div className="text-center p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl mb-2">🎨</div>
            <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Spatial</h4>
            <p className="text-xs sm:text-sm text-gray-600">Picture smart</p>
          </div>
          <div className="text-center p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl mb-2">🎵</div>
            <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Musical</h4>
            <p className="text-xs sm:text-sm text-gray-600">Music smart</p>
          </div>
          <div className="text-center p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl mb-2">🏃</div>
            <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Bodily-Kinesthetic</h4>
            <p className="text-xs sm:text-sm text-gray-600">Body smart</p>
          </div>
          <div className="text-center p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl mb-2">👥</div>
            <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Interpersonal</h4>
            <p className="text-xs sm:text-sm text-gray-600">People smart</p>
          </div>
          <div className="text-center p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl mb-2">🧠</div>
            <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Intrapersonal</h4>
            <p className="text-xs sm:text-sm text-gray-600">Self smart</p>
          </div>
          <div className="text-center p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl mb-2">🌿</div>
            <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Naturalist</h4>
            <p className="text-xs sm:text-sm text-gray-600">Nature smart</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 sm:p-6 lg:p-8 mb-12 sm:mb-16 mx-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
          How It Works
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="bg-blue-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4">1</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Take the Test</h3>
            <p className="text-sm sm:text-base text-gray-600">Answer 24 carefully crafted questions about your preferences and abilities.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4">2</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Get Your Results</h3>
            <p className="text-sm sm:text-base text-gray-600">Receive instant, detailed analysis of your intelligence strengths.</p>
          </div>
          <div className="text-center sm:col-span-2 lg:col-span-1">
            <div className="bg-blue-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4">3</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Discover & Grow</h3>
            <p className="text-sm sm:text-base text-gray-600">Learn how to leverage your strengths and develop new intelligences.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Ready to Discover Your Intelligence?
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
          Join thousands of people who have discovered their unique cognitive strengths.
        </p>
        <button
          onClick={handleTakeTest}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition duration-200 transform hover:scale-105 shadow-lg"
        >
          Start Your Journey
        </button>
      </div>
    </div>
  )
}
