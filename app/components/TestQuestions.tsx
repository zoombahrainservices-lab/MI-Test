'use client'

import { useState, useEffect } from 'react'
import { Question } from '../discover/page'

interface TestQuestionsProps {
  questions: Question[]
  currentQuestionIndex: number
  onNextQuestion: (answer: number) => void
}

export default function TestQuestions({ 
  questions, 
  currentQuestionIndex,
  onNextQuestion
}: TestQuestionsProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== undefined) {
      // Call parent's onNextQuestion
      onNextQuestion(selectedAnswer)
      
      // Reset selected answer for next question
      setSelectedAnswer(undefined)
    }
  }


  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8">

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
              className="h-2 rounded-full transition-all duration-300 bg-blue-500"
              style={{ width: `${progress}%` }}
            ></div>
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
        <div className="flex justify-center items-center">
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === undefined}
            className={`font-medium py-2 px-6 rounded-lg transition duration-200 ${
              currentQuestionIndex === questions.length - 1
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } disabled:bg-gray-400 disabled:cursor-not-allowed`}
          >
            {currentQuestionIndex === questions.length - 1 
              ? 'Finish Test'
              : 'Next Question'
            }
          </button>
        </div>
      </div>
    </div>
  )
}