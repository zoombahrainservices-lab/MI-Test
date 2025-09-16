'use client'

import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'

interface HomePageProps {
  onGoToIntro: () => void
}

export default function HomePage({ onGoToIntro }: HomePageProps) {
  const { isAuthenticated, user } = useAuth()
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        {isAuthenticated ? (
          <>
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Welcome back, <span className="text-blue-600">{user?.name || user?.email}</span>!
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Ready to discover your intelligence profile? Take our comprehensive assessment to unlock your unique cognitive strengths.
            </p>
            <div className="space-x-4">
              <button
                onClick={onGoToIntro}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105 shadow-lg"
              >
                Take the Test Now
              </button>
              <Link
                href="/dashboard"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105 shadow-lg inline-block"
              >
                View Dashboard
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Discover Your
              <span className="text-blue-600"> Multiple Intelligence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Unlock your unique cognitive strengths with our comprehensive assessment based on Howard Gardner's 
              revolutionary theory of multiple intelligences.
            </p>
            <div className="space-x-4">
              <button
                onClick={onGoToIntro}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105 shadow-lg"
              >
                Take the Test Now
              </button>
            </div>
          </>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-4xl mb-4">🧠</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">8 Intelligence Types</h3>
          <p className="text-gray-600">
            Comprehensive assessment covering all areas of human intelligence from linguistic to naturalist.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Instant Results</h3>
          <p className="text-gray-600">
            Get your personalized intelligence profile immediately after completing the test.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Detailed Insights</h3>
          <p className="text-gray-600">
            Understand your strengths and discover new ways to develop your intelligences.
          </p>
        </div>
      </div>

      {/* Intelligence Types Preview */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          The 8 Types of Intelligence
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4">
            <div className="text-3xl mb-2">📚</div>
            <h4 className="font-semibold text-gray-800 mb-1">Linguistic</h4>
            <p className="text-sm text-gray-600">Word smart</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">🔢</div>
            <h4 className="font-semibold text-gray-800 mb-1">Logical-Mathematical</h4>
            <p className="text-sm text-gray-600">Number smart</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">🎨</div>
            <h4 className="font-semibold text-gray-800 mb-1">Spatial</h4>
            <p className="text-sm text-gray-600">Picture smart</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">🎵</div>
            <h4 className="font-semibold text-gray-800 mb-1">Musical</h4>
            <p className="text-sm text-gray-600">Music smart</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">🏃</div>
            <h4 className="font-semibold text-gray-800 mb-1">Bodily-Kinesthetic</h4>
            <p className="text-sm text-gray-600">Body smart</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">👥</div>
            <h4 className="font-semibold text-gray-800 mb-1">Interpersonal</h4>
            <p className="text-sm text-gray-600">People smart</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">🧠</div>
            <h4 className="font-semibold text-gray-800 mb-1">Intrapersonal</h4>
            <p className="text-sm text-gray-600">Self smart</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">🌿</div>
            <h4 className="font-semibold text-gray-800 mb-1">Naturalist</h4>
            <p className="text-sm text-gray-600">Nature smart</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Take the Test</h3>
            <p className="text-gray-600">Answer 24 carefully crafted questions about your preferences and abilities.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Your Results</h3>
            <p className="text-gray-600">Receive instant, detailed analysis of your intelligence strengths.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Discover & Grow</h3>
            <p className="text-gray-600">Learn how to leverage your strengths and develop new intelligences.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to Discover Your Intelligence?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands of people who have discovered their unique cognitive strengths.
        </p>
        <button
          onClick={onGoToIntro}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105 shadow-lg"
        >
          Start Your Journey
        </button>
      </div>
    </div>
  )
}
