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

  // Track whether all questions on current page are answered
  useEffect(() => {
    const allAnswered = questions.every(question => 
      currentPageAnswers[question.id] !== undefined
    )
    setAllAnswersSelected(allAnswered)
  }, [questions, currentPageAnswers])

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    onAnswerSelect(questionId, answerIndex)

    // After selecting, check if all questions on this page are answered, then advance
    const answeredNow: Record<number, number> = { ...currentPageAnswers, [questionId]: answerIndex }
    const allAnswered = questions.every(q => answeredNow[q.id] !== undefined)
    if (allAnswered && questions.length > 0) {
      setIsAutoAdvancing(true)
      setTimeout(() => {
        onNextPage()
        setIsAutoAdvancing(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 800)
    }
  }


  const handlePreviousPage = () => {
    onPreviousPage?.()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getSelectedCircleStyles = (optionIndex: number, isMcq: boolean) => {
    if (isMcq) {
      return 'border-gray-600 bg-gray-600/30'
    }
    // Color coding based on actual option order: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    // Selected circles are filled with same color at 30% transparency
    switch (optionIndex) {
      case 0: return 'border-red-600 bg-red-600/30'
      case 1: return 'border-red-500 bg-red-500/30'
      case 2: return 'border-gray-500 bg-gray-500/30'
      case 3: return 'border-green-500 bg-green-500/30'
      case 4: return 'border-green-600 bg-green-600/30'
      default: return 'border-gray-500 bg-gray-500/30'
    }
  }

  const getUnselectedCircleStyles = (optionIndex: number, isMcq: boolean) => {
    if (isMcq) {
      return 'border-gray-500 bg-transparent'
    }
    // Unselected circles show only outline (border) with transparent background
    switch (optionIndex) {
      case 0: return 'border-red-600 bg-transparent'
      case 1: return 'border-red-500 bg-transparent'
      case 2: return 'border-gray-500 bg-transparent'
      case 3: return 'border-green-500 bg-transparent'
      case 4: return 'border-green-600 bg-transparent'
      default: return 'border-gray-500 bg-transparent'
    }
  }



  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 mt-4 sm:mt-8">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-normal text-sm sm:text-base animate-pulse">
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
                <h3 className="text-lg sm:text-xl md:text-2xl font-normal text-gray-700 leading-relaxed animate-fade-in">
                  {question.text}
                </h3>
              </div>
              
              <div className="flex flex-col items-center space-y-4 sm:space-y-6 py-6 sm:py-8">
                {question.options.map((option, optionIndex) => (
                  <div 
                    key={optionIndex} 
                    className="flex items-center space-x-4 sm:space-x-6 animate-fade-in w-full max-w-md"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${optionIndex * 0.1}s both`
                    }}
                  >
                    <label className="cursor-pointer flex items-center space-x-4 w-full">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={optionIndex}
                        checked={currentPageAnswers[question.id] === optionIndex}
                        onChange={() => handleAnswerSelect(question.id, optionIndex)}
                        className="sr-only"
                      />
                      {(() => { const isMcq = (question as any)?.type === 'mcq' || !(question as any)?.category; return (
                      <div 
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg flex-shrink-0 ${
                          currentPageAnswers[question.id] === optionIndex 
                            ? getSelectedCircleStyles(optionIndex, isMcq) + ' animate-bounce'
                            : getUnselectedCircleStyles(optionIndex, isMcq)
                        }`}
                      >
                      </div>
                      )})()}
                      <span className="text-sm sm:text-base md:text-lg font-normal text-gray-700 leading-relaxed flex-1">
                        {option}
                      </span>
                    </label>
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
            className={`font-normal py-2 px-4 sm:px-6 rounded-lg transition duration-200 text-sm sm:text-base ${
              currentPageIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            Previous Page
          </button>
        </div>
      </div>
    </div>
  )
}