'use client'

import { useState, useEffect } from 'react'
import { Question } from '../discover/page'

interface TestQuestionsProps {
  questions: Question[]
  answers: Record<number, number>
  onAnswerChange: (questionId: number, answer: number) => void
  onSubmitTest: (timingData?: any) => void
  currentLevel: 'easy' | 'medium'
}

export default function TestQuestions({ 
  questions, 
  answers, 
  onAnswerChange, 
  onSubmitTest,
  currentLevel
}: TestQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60) // 1 minute per question
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [questionTimes, setQuestionTimes] = useState<Record<number, number>>({})
  const [testStartTime] = useState(Date.now())

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      // Time's up, auto-advance to next question
      handleNextQuestion()
    }
  }, [timeLeft])

  const handleAnswerSelect = (answerIndex: number) => {
    onAnswerChange(currentQuestion.id, answerIndex)
  }

  const handleNextQuestion = () => {
    // Record time taken for current question
    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000)
    const updatedQuestionTimes = {
      ...questionTimes,
      [currentQuestion.id]: timeTaken
    }
    setQuestionTimes(updatedQuestionTimes)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTimeLeft(60) // Reset timer for next question
      setQuestionStartTime(Date.now())
    } else {
      // All questions completed - calculate final timing data
      const totalTime = Math.round((Date.now() - testStartTime) / 1000)
      const averageTimePerQuestion = totalTime / questions.length
      
      const finalTimingData = {
        totalTime,
        questionTimes: updatedQuestionTimes,
        averageTimePerQuestion: Math.round(averageTimePerQuestion)
      }
      
      onSubmitTest(finalTimingData)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setTimeLeft(60) // Reset timer
      setQuestionStartTime(Date.now())
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTotalTime = () => {
    return Math.round((Date.now() - testStartTime) / 1000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8">
        {/* Difficulty Level Display */}
        <div className="mb-4 text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold ${
            currentLevel === 'easy' 
              ? 'bg-green-100 text-green-800 border-2 border-green-200' 
              : 'bg-yellow-100 text-yellow-800 border-2 border-yellow-200'
          }`}>
            <span className="text-lg mr-2">{currentLevel === 'easy' ? '🟢' : '🟡'}</span>
            <span className="text-sm uppercase tracking-wide">
              {currentLevel === 'easy' ? 'Easy Level' : 'Medium Level'} 
              {currentLevel === 'easy' ? ' (Questions 1-10)' : ' (Questions 11-20)'}
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
                currentLevel === 'easy' ? 'bg-green-500' : 'bg-yellow-500'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Timer */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-lg text-lg font-bold ${
            timeLeft <= 10 ? 'bg-red-100 text-red-600' : 
            timeLeft <= 30 ? 'bg-yellow-100 text-yellow-600' : 
            'bg-green-100 text-green-600'
          }`}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Time Left: {formatTime(timeLeft)}
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
                  answers[currentQuestion.id] === optionIndex
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={optionIndex}
                  checked={answers[currentQuestion.id] === optionIndex}
                  onChange={() => handleAnswerSelect(optionIndex)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                  answers[currentQuestion.id] === optionIndex
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion.id] === optionIndex && (
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
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Previous
          </button>

          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Total Time</div>
            <div className="text-lg font-bold text-blue-600">{formatTime(getTotalTime())}</div>
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={answers[currentQuestion.id] === undefined}
            className={`font-medium py-2 px-6 rounded-lg transition duration-200 ${
              currentQuestionIndex === questions.length - 1
                ? currentLevel === 'easy'
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } disabled:bg-gray-400 disabled:cursor-not-allowed`}
          >
            {currentQuestionIndex === questions.length - 1 
              ? currentLevel === 'easy' 
                ? 'Next Level (Medium)' 
                : 'Finish Test'
              : 'Next Question'
            }
          </button>
        </div>
      </div>
    </div>
  )
}