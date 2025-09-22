'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'
import Header from '../components/Header'
import TestIntro from '../components/TestIntro'
import TestQuestions from '../components/TestQuestions'
import TestResults from '../components/TestResults'
import { Question } from '../data/questions'

interface TestAnswer {
  questionId: number
  answer: number
  category: string
  difficulty: string
}

interface TestResult {
  category: string
  score: number
  percentage: number
}


export default function DiscoverPage() {
  const { isAuthenticated, loading, user } = useAuth()
  const [currentStep, setCurrentStep] = useState<'intro' | 'gender' | 'test' | 'results'>('intro')
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [saving, setSaving] = useState(false)
  const [gender, setGender] = useState<'male' | 'female' | ''>('')
  const [currentPageAnswers, setCurrentPageAnswers] = useState<Record<number, number>>({})
  const [questions, setQuestions] = useState<Question[]>([])
  const [questionsLoading, setQuestionsLoading] = useState(true)
  const [questionsError, setQuestionsError] = useState<string | null>(null)

  // Constants for pagination
  const QUESTIONS_PER_PAGE = 1
  const TOTAL_PAGES = questions.length > 0 ? Math.ceil(questions.length / QUESTIONS_PER_PAGE) : 0

  // Fetch questions from database
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setQuestionsLoading(true)
        setQuestionsError(null)
        
        const response = await fetch('/api/questions')
        if (!response.ok) {
          throw new Error('Failed to fetch questions')
        }
        
        const data = await response.json()
        setQuestions(data.questions || [])
      } catch (error) {
        console.error('Error fetching questions:', error)
        setQuestionsError(error instanceof Error ? error.message : 'Failed to fetch questions')
      } finally {
        setQuestionsLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const saveTestResultToDatabase = async (results: TestResult[]) => {
    if (!user) {
      console.error('No user found for saving test results')
      return
    }
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      console.log('Token from localStorage:', token ? 'Found' : 'Not found')
      console.log('Token length:', token ? token.length : 0)
      console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'None')
      console.log('User from useAuth:', user)

      if (!token) {
        throw new Error('No authentication token found')
      }

      // Convert results to the format expected by the API
      const scores = {
        linguistic: results.find(r => r.category === 'Linguistic')?.score || 0,
        logical: results.find(r => r.category === 'Logical-Mathematical')?.score || 0,
        musicalCreative: results.find(r => r.category === 'Musical & Creative')?.score || 0,
        bodily: results.find(r => r.category === 'Bodily-Kinesthetic')?.score || 0,
        interpersonal: results.find(r => r.category === 'Interpersonal')?.score || 0,
        intrapersonal: results.find(r => r.category === 'Intrapersonal')?.score || 0,
        naturalistic: results.find(r => r.category === 'Naturalistic')?.score || 0,
        existential: results.find(r => r.category === 'Existential/Spiritual')?.score || 0,
        spatial: results.find(r => r.category === 'Spatial')?.score || 0,
      }

      const percentages = {
        linguistic: results.find(r => r.category === 'Linguistic')?.percentage || 0,
        logical: results.find(r => r.category === 'Logical-Mathematical')?.percentage || 0,
        musicalCreative: results.find(r => r.category === 'Musical & Creative')?.percentage || 0,
        bodily: results.find(r => r.category === 'Bodily-Kinesthetic')?.percentage || 0,
        interpersonal: results.find(r => r.category === 'Interpersonal')?.percentage || 0,
        intrapersonal: results.find(r => r.category === 'Intrapersonal')?.percentage || 0,
        naturalistic: results.find(r => r.category === 'Naturalistic')?.percentage || 0,
        existential: results.find(r => r.category === 'Existential/Spiritual')?.percentage || 0,
        spatial: results.find(r => r.category === 'Spatial')?.percentage || 0,
      }

      const topIntelligence = results.reduce((prev, current) => (prev.percentage > current.percentage) ? prev : current).category
      const sortedResults = results.sort((a, b) => b.percentage - a.percentage)
      const secondIntelligence = sortedResults[1]?.category || ''
      const thirdIntelligence = sortedResults[2]?.category || ''

      const response = await fetch('/api/test-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          answers: answers,
          scores,
          percentages,
          topIntelligence,
          secondIntelligence,
          thirdIntelligence,
          level: 'combined'
        })
      })

      if (!response.ok) {
        throw new Error(`Failed to save test results: ${response.statusText}`)
      }

      console.log(`Test results saved:`, await response.json())
    } catch (error) {
      console.error('Error saving test results:', error)
    } finally {
      setSaving(false)
    }
  }


  const calculateResults = (answers: Record<number, number>) => {
    const categoryScores: Record<string, number> = {}
    const categoryCounts: Record<string, number> = {}

    // Initialize scores for all 9 intelligence types
    const categories = [
      'Linguistic',
      'Logical-Mathematical', 
      'Musical & Creative',
      'Bodily-Kinesthetic',
      'Interpersonal',
      'Intrapersonal',
      'Naturalistic',
      'Existential/Spiritual',
      'Spatial'
    ]

    categories.forEach(category => {
      categoryScores[category] = 0
      categoryCounts[category] = 0
    })

    // Calculate scores
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId))
      if (question) {
        categoryScores[question.category] += answer + 1 // Convert 0-4 to 1-5
        categoryCounts[question.category] += 1
      }
    })

    // Calculate percentages
    const results: TestResult[] = categories.map(category => {
      const score = categoryScores[category]
      const count = categoryCounts[category]
      const maxPossible = count * 5
      const percentage = count > 0 ? Math.round((score / maxPossible) * 100) : 0
      
      return {
        category,
        score,
        percentage
      }
    })

    return results.sort((a, b) => b.percentage - a.percentage)
  }


  const handleStartTest = () => {
    setCurrentStep('gender')
  }

  const handleGenderSelect = (selectedGender: 'male' | 'female') => {
    setGender(selectedGender)
    setCurrentStep('test')
    setCurrentPageIndex(0)
    setAnswers({})
    setCurrentPageAnswers({})
  }

  // Initialize currentPageAnswers when page changes (but not when answers change to avoid loops)
  useEffect(() => {
    if (currentStep === 'test') {
      const startIndex = currentPageIndex * QUESTIONS_PER_PAGE
      const endIndex = startIndex + QUESTIONS_PER_PAGE
      const currentPageQuestions = questions.slice(startIndex, endIndex)
      const pageAnswers: Record<number, number> = {}
      
      currentPageQuestions.forEach(question => {
        if (answers[question.id] !== undefined) {
          pageAnswers[question.id] = answers[question.id]
        }
      })
      
      setCurrentPageAnswers(pageAnswers)
    }
  }, [currentPageIndex, currentStep]) // Removed 'answers' from dependencies to prevent loops

  const getCurrentPageQuestions = () => {
    const startIndex = currentPageIndex * QUESTIONS_PER_PAGE
    const endIndex = startIndex + QUESTIONS_PER_PAGE
    return questions.slice(startIndex, endIndex)
  }

  const handleAnswerSelect = (questionId: number, answer: number) => {
    setCurrentPageAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNextPage = useCallback(() => {
    // Save current page answers to main answers
    setAnswers(prev => ({
      ...prev,
      ...currentPageAnswers
    }))

    if (currentPageIndex < TOTAL_PAGES - 1) {
      const newPageIndex = currentPageIndex + 1
      setCurrentPageIndex(newPageIndex)
      
      // Clear current page answers for the new page
      setCurrentPageAnswers({})
    } else {
      handleSubmitTest()
    }
  }, [currentPageAnswers, currentPageIndex])

  const handlePreviousPage = useCallback(() => {
    if (currentPageIndex > 0) {
      const newPageIndex = currentPageIndex - 1
      setCurrentPageIndex(newPageIndex)
      
      // Restore answers for the previous page
      const startIndex = newPageIndex * QUESTIONS_PER_PAGE
      const endIndex = startIndex + QUESTIONS_PER_PAGE
      const previousPageQuestions = questions.slice(startIndex, endIndex)
      const previousPageAnswers: Record<number, number> = {}
      
      previousPageQuestions.forEach(question => {
        if (answers[question.id] !== undefined) {
          previousPageAnswers[question.id] = answers[question.id]
        }
      })
      
      setCurrentPageAnswers(previousPageAnswers)
    }
  }, [currentPageIndex, answers])

  const handleSubmitTest = useCallback(async () => {
    const results = calculateResults(answers)
    setTestResults(results)
    await saveTestResultToDatabase(results)
    setCurrentStep('results')
  }, [answers])

  const handleRestartTest = () => {
    setCurrentStep('intro')
    setCurrentPageIndex(0)
    setAnswers({})
    setCurrentPageAnswers({})
    setTestResults([])
    setGender('')
  }

  const getIntelligenceDescription = (category: string) => {
    const descriptions: Record<string, string> = {
      'Linguistic': 'Word smart - you excel with language, reading, writing, and communication',
      'Logical-Mathematical': 'Number smart - you excel with logic, reasoning, and mathematical concepts',
      'Musical & Creative': 'Creative smart - you excel with art, music, design, and creative expression',
      'Bodily-Kinesthetic': 'Body smart - you excel with physical movement and hands-on learning',
      'Interpersonal': 'People smart - you excel with understanding and relating to others',
      'Intrapersonal': 'Self smart - you excel with self-awareness and personal reflection',
      'Naturalistic': 'Nature smart - you excel with understanding natural systems and environments',
      'Existential/Spiritual': 'Spiritual smart - you excel with meaning, values, and ethical reasoning',
      'Spatial': 'Picture smart - you excel with visual and spatial relationships'
    }
    return descriptions[category] || 'Unknown intelligence type'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait...</p>
        </div>
      </div>
    )
  }

  // Show loading state while fetching questions
  if (questionsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    )
  }

  // Show error state if questions failed to load
  if (questionsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Questions</h1>
          <p className="text-gray-600 mb-6">{questionsError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Show error if no questions are available
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Questions Available</h1>
          <p className="text-gray-600 mb-6">There are no questions available for the test.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      {currentStep === 'intro' && (
        <TestIntro onStartTest={handleStartTest} />
      )}

      {currentStep === 'gender' && (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Before we begin...
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please select your gender to help us provide more personalized results
              </p>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => handleGenderSelect('male')}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                Male
              </button>
              <button
                onClick={() => handleGenderSelect('female')}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-200"
              >
                Female
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep === 'test' && (
        <TestQuestions
          questions={getCurrentPageQuestions()}
          currentPageIndex={currentPageIndex}
          totalPages={TOTAL_PAGES}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          onAnswerSelect={handleAnswerSelect}
          currentPageAnswers={currentPageAnswers}
        />
      )}

      {currentStep === 'results' && (
        <TestResults
          results={testResults}
          level="Complete"
          onMoveToNextLevel={() => {}}
          onRestartTest={handleRestartTest}
          showNextLevel={false}
          showPrint={true}
          timing={null}
          getIntelligenceDescription={getIntelligenceDescription}
        />
      )}

      {saving && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Saving your results...</p>
          </div>
        </div>
      )}
    </div>
  )
}