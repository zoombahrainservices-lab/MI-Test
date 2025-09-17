'use client'

import { useState } from 'react'

interface TestIntroProps {
  onStartTest: (difficulty: 'easy' | 'medium' | 'hard') => void
}

export default function TestIntro({ onStartTest }: TestIntroProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to the Multiple Intelligence Assessment
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Based on Howard Gardner's theory of multiple intelligences, this test will help you 
            discover your unique cognitive strengths across eight different areas of intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">What You'll Learn</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Your strongest intelligence areas</li>
              <li>• How you learn best</li>
              <li>• Career paths that match your strengths</li>
              <li>• Ways to develop other intelligences</li>
            </ul>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800 mb-3">Test Details</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 10 carefully crafted questions</li>
              <li>• 1 minute per question (10 minutes total)</li>
              <li>• No right or wrong answers</li>
              <li>• Instant personalized results</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Important:</strong> Answer honestly based on your natural preferences and abilities. 
                There are no correct answers - this test is about discovering your unique strengths!
              </p>
            </div>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-purple-800 mb-4 text-center">Choose Your Difficulty Level</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Easy */}
            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedDifficulty === 'easy' 
                  ? 'border-green-500 bg-green-100' 
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
              onClick={() => setSelectedDifficulty('easy')}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🟢</div>
                <h4 className="font-semibold text-gray-800 mb-2">Easy</h4>
                <p className="text-sm text-gray-600">
                  Straightforward questions with clear options. Perfect for beginners.
                </p>
              </div>
            </div>

            {/* Medium */}
            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedDifficulty === 'medium' 
                  ? 'border-yellow-500 bg-yellow-100' 
                  : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
              }`}
              onClick={() => setSelectedDifficulty('medium')}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🟡</div>
                <h4 className="font-semibold text-gray-800 mb-2">Medium</h4>
                <p className="text-sm text-gray-600">
                  Balanced questions that require some reflection. Recommended for most users.
                </p>
              </div>
            </div>

            {/* Hard */}
            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedDifficulty === 'hard' 
                  ? 'border-red-500 bg-red-100' 
                  : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
              }`}
              onClick={() => setSelectedDifficulty('hard')}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🔴</div>
                <h4 className="font-semibold text-gray-800 mb-2">Hard</h4>
                <p className="text-sm text-gray-600">
                  Complex scenarios requiring deep self-reflection. For experienced users.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => onStartTest(selectedDifficulty)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105 shadow-lg"
          >
            Start the Test ({selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)})
          </button>
        </div>
      </div>
    </div>
  )
}
