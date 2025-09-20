'use client'

import { useState, useEffect } from 'react'
import { Question } from '../discover/page'

interface TestQuestionsProps {
  questions: Question[]
  currentQuestionIndex: number
  onNextQuestion: (answer: number) => void
  difficulty: 'easy' | 'medium' | 'hard'
  timing: any
  setTiming: (timing: any) => void
}

export default function TestQuestions({ 
  questions, 
  currentQuestionIndex,
  onNextQuestion,
  difficulty,
  timing,
  setTiming
}: TestQuestionsProps) {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Set initial time based on difficulty level
    return difficulty === 'easy' ? 60 : difficulty === 'medium' ? 30 : 15
  })
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [questionTimes, setQuestionTimes] = useState<Record<number, number>>({})
  const [testStartTime] = useState(Date.now())
  const [isTimedOut, setIsTimedOut] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isTimedOut) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isTimedOut) {
      // Time's up, show timeout message
      setIsTimedOut(true)
    }
  }, [timeLeft, isTimedOut])

  // Reset timer when level changes
  useEffect(() => {
    const newTime = difficulty === 'easy' ? 60 : difficulty === 'medium' ? 30 : 15
    setTimeLeft(newTime)
    setIsTimedOut(false)
    setQuestionStartTime(Date.now())
  }, [difficulty])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== undefined) {
      // Record time taken for current question
      const timeTaken = Math.round((Date.now() - questionStartTime) / 1000)
      const updatedQuestionTimes = {
        ...timing.questionTimes,
        [currentQuestion.id]: timeTaken
      }
      
      // Update timing data
      setTiming({
        ...timing,
        questionTimes: updatedQuestionTimes
      })
      
      // Call parent's onNextQuestion
      onNextQuestion(selectedAnswer)
      
      // Reset selected answer for next question
      setSelectedAnswer(undefined)
    }
  }

  const handleReturnHome = () => {
    // This will be handled by the parent component
    window.location.href = '/'
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTotalTime = () => {
    return Math.round((Date.now() - testStartTime) / 1000)
  }

  // Show timeout message if user timed out
  if (isTimedOut) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">⏰</div>
            <h2 className="text-3xl font-bold text-red-600 mb-4">Time's Up!</h2>
            <p className="text-lg text-gray-600 mb-2">
              You ran out of time on the {difficulty} level.
            </p>
            <p className="text-gray-500">
              Don't worry! You can retry the {difficulty} level or return to the home page.
            </p>
          </div>
          
          <div className="space-x-4">
            <button
              onClick={handleReturnHome}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
            >
              🏠 Return to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8">
        {/* Difficulty Level Display */}
        <div className="mb-4 text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold ${
            difficulty === 'easy' 
              ? 'bg-green-100 text-green-800 border-2 border-green-200' 
              : difficulty === 'medium'
              ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-200'
              : 'bg-red-100 text-red-800 border-2 border-red-200'
          }`}>
            <span className="text-lg mr-2">
              {difficulty === 'easy' ? '🟢' : difficulty === 'medium' ? '🟡' : '🔴'}
            </span>
            <span className="text-sm uppercase tracking-wide">
              {difficulty === 'easy' ? 'Easy Level (Questions 1-10)' : 
               difficulty === 'medium' ? 'Medium Level (Questions 11-20)' : 
               'Hard Level (Questions 21-30)'}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                difficulty === 'easy' ? 'bg-green-500' : 
                difficulty === 'medium' ? 'bg-yellow-500' : 
                'bg-red-500'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Timer */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-lg text-lg font-bold ${
            timeLeft <= 5 ? 'bg-red-100 text-red-600' : 
            timeLeft <= 10 ? 'bg-yellow-100 text-yellow-600' : 
            'bg-green-100 text-green-600'
          }`}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Time Left: {formatTime(timeLeft)}
            <span className="ml-2 text-sm opacity-75">
              ({difficulty === 'easy' ? '60s' : difficulty === 'medium' ? '30s' : '15s'} per question)
            </span>
          </div>
        </div>

        {/* Current Question */}
        <div className="mb-8">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full mb-4">
              {currentQuestion.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 leading-relaxed">
              {currentQuestion.text}
            </h3>
          </div>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedAnswer === optionIndex
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={optionIndex}
                  checked={selectedAnswer === optionIndex}
                  onChange={() => handleAnswerSelect(optionIndex)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                  selectedAnswer === optionIndex
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === optionIndex && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-base font-medium">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <div className="w-24"></div>

          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Total Time</div>
            <div className="text-lg font-bold text-blue-600">{formatTime(getTotalTime())}</div>
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === undefined}
            className={`font-medium py-2 px-6 rounded-lg transition duration-200 ${
              currentQuestionIndex === questions.length - 1
                ? difficulty === 'easy'
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : difficulty === 'medium'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } disabled:bg-gray-400 disabled:cursor-not-allowed`}
          >
            {currentQuestionIndex === questions.length - 1 
              ? difficulty === 'easy' 
                ? 'Next Level (Medium)' 
                : difficulty === 'medium'
                ? 'Next Level (Hard)'
                : 'Finish Test'
              : 'Next Question'
            }
          </button>
        </div>
      </div>
    </div>
  )
}