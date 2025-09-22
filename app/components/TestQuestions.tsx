'use client'

import { useState, useEffect } from 'react'
import { Question } from '../data/questions'

interface TestQuestionsProps {
  questions: Question[]
  currentPageIndex: number
  totalPages: number
  onNextPage: () => void
  onPreviousPage?: () => void
  onAnswerSelect: (questionId: number, answer: number) => void
  currentPageAnswers: Record<number, number>
}

export default function TestQuestions({ 
  questions, 
  currentPageIndex,
  totalPages,
  onNextPage,
  onPreviousPage,
  onAnswerSelect,
  currentPageAnswers
}: TestQuestionsProps) {
  const [allAnswersSelected, setAllAnswersSelected] = useState(false)
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false)
  const [questionKey, setQuestionKey] = useState(0)

  const progress = ((currentPageIndex + 1) / totalPages) * 100

  // Update question key for animation when page changes
  useEffect(() => {
    setQuestionKey(currentPageIndex)
  }, [currentPageIndex])

  // Check if all questions on current page are answered and auto-advance
  useEffect(() => {
    const allAnswered = questions.every(question => 
      currentPageAnswers[question.id] !== undefined
    )
    setAllAnswersSelected(allAnswered)
    
    // Only auto-advance if all questions are answered AND we have at least one answer
    if (allAnswered && questions.length > 0 && Object.keys(currentPageAnswers).length > 0) {
      setIsAutoAdvancing(true)
      const timer = setTimeout(() => {
        onNextPage()
        setIsAutoAdvancing(false)
        // Scroll to top when advancing to next page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 1500) // 1.5 second delay to show completion
      
      return () => clearTimeout(timer)
    }
  }, [questions, currentPageAnswers])

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    onAnswerSelect(questionId, answerIndex)
  }


  const handlePreviousPage = () => {
    onPreviousPage?.()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getSelectedCircleStyles = (optionIndex: number) => {
    // Color coding based on actual option order: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    // Selected circles are filled with same color at 75% transparency
    switch (optionIndex) {
      case 0: return 'border-green-700 bg-green-700/75'  // Strongly Agree - green with 75% opacity
      case 1: return 'border-green-500 bg-green-500/75'  // Agree - light green with 75% opacity
      case 2: return 'border-yellow-600 bg-yellow-600/75' // Neutral - yellow with 75% opacity
      case 3: return 'border-red-500 bg-red-500/75'      // Disagree - light red with 75% opacity
      case 4: return 'border-red-700 bg-red-700/75'      // Strongly Disagree - dark red with 75% opacity
      default: return 'border-gray-500 bg-gray-500/75'
    }
  }

  const getUnselectedCircleStyles = (optionIndex: number) => {
    // Unselected circles show only outline (border) with transparent background
    switch (optionIndex) {
      case 0: return 'border-green-700 bg-transparent'  // Strongly Agree - green outline
      case 1: return 'border-green-500 bg-transparent'  // Agree - light green outline
      case 2: return 'border-yellow-600 bg-transparent' // Neutral - yellow outline
      case 3: return 'border-red-500 bg-transparent'    // Disagree - light red outline
      case 4: return 'border-red-700 bg-transparent'    // Strongly Disagree - dark red outline
      default: return 'border-gray-500 bg-transparent'
    }
  }



  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 mt-4 sm:mt-8">
      <div className="bg-white rounded-lg shadow-xl p-3 sm:p-4 md:p-6 lg:p-8">

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-sm sm:text-base animate-pulse">
              {Math.round(progress)}% Complete
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700 ease-out animate-pulse"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6 sm:space-y-8">
          {questions.map((question, questionIndex) => (
            <div 
              key={`${question.id}-${questionKey}`} 
              className="mb-6 sm:mb-8 animate-fade-in-up"
              style={{
                animation: 'fadeInUp 0.6s ease-out'
              }}
            >
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed animate-fade-in">
                  {question.text}
                </h3>
              </div>
              
              <div className="flex justify-center items-start space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 xl:space-x-16 py-6 sm:py-8">
                {question.options.map((option, optionIndex) => (
                  <div 
                    key={optionIndex} 
                    className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4 animate-fade-in"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${optionIndex * 0.1}s both`
                    }}
                  >
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={optionIndex}
                        checked={currentPageAnswers[question.id] === optionIndex}
                        onChange={() => handleAnswerSelect(question.id, optionIndex)}
                        className="sr-only"
                      />
                      <div 
                        className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-2 sm:border-3 md:border-4 transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                          currentPageAnswers[question.id] === optionIndex 
                            ? getSelectedCircleStyles(optionIndex) + ' animate-bounce'
                            : getUnselectedCircleStyles(optionIndex)
                        }`}
                      >
                      </div>
                    </label>
                    <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 text-center leading-tight max-w-12 sm:max-w-16 md:max-w-20 lg:max-w-24">
                      {option}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPageIndex === 0}
            className={`font-medium py-2 px-4 sm:px-6 rounded-lg transition duration-200 text-sm sm:text-base ${
              currentPageIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            Previous Page
          </button>
          
          <div className="text-xs sm:text-sm text-gray-500 text-center">
            {isAutoAdvancing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                <span>Moving to next page...</span>
              </div>
            ) : allAnswersSelected ? (
              'All questions answered! Moving to next page...'
            ) : (
              'Answer all questions to continue'
            )}
          </div>
        </div>
      </div>
    </div>
  )
}