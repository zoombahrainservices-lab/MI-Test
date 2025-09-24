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

export interface TestResult {
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

      const response = await fetch('/api/test-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          answers: Object.entries(answers).map(([questionId, answer]) => ({
            questionId: parseInt(questionId),
            answer: answer + 1, // Convert 0-4 to 1-5
            category: questions.find(q => q.id === parseInt(questionId))?.category || 'unknown',
            difficulty: questions.find(q => q.id === parseInt(questionId))?.difficulty || 'easy'
          })),
          results: results,
          gender: gender
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save test results')
      }

      const savedResult = await response.json()
      console.log('Test results saved successfully:', savedResult)
    } catch (error) {
      console.error('Error saving test results:', error)
      // Don't throw the error, just log it so the user can still see results
    } finally {
      setSaving(false)
    }
  }

  const calculateResults = (answers: Record<number, number>): TestResult[] => {
    const categories = [
      'linguistic',
      'logical', 
      'spatial',
      'musical',
      'bodily',
      'interpersonal',
      'intrapersonal',
      'naturalist'
    ]

    const categoryScores: Record<string, number> = {}
    const categoryCounts: Record<string, number> = {}

    // Initialize scores and counts
    categories.forEach(category => {
      categoryScores[category] = 0
      categoryCounts[category] = 0
    })

    // Calculate scores
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId))
      if (question) {
        // Convert 0-4 to 1-5
        categoryScores[question.category] += answer + 1
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
      
      // Clear current page answers for the new page
      setCurrentPageAnswers({})
    }
  }, [currentPageIndex])

  const handleSubmitTest = async () => {
    // Save final answers
    const finalAnswers = { ...answers, ...currentPageAnswers }
    setAnswers(finalAnswers)

    // Calculate results
    const results = calculateResults(finalAnswers)
    setTestResults(results)

    // Save to database
    await saveTestResultToDatabase(results)

    // Move to results step
    setCurrentStep('results')
  }

  const handleRestartTest = () => {
    setCurrentStep('intro')
    setCurrentPageIndex(0)
    setAnswers({})
    setCurrentPageAnswers({})
    setTestResults([])
    setGender('')
  }

  const getIntelligenceDescription = (category: string): string => {
    const descriptions: Record<string, string> = {
      linguistic: 'Linguistic intelligence involves sensitivity to spoken and written language, the ability to learn languages, and the capacity to use language to accomplish certain goals.',
      logical: 'Logical-mathematical intelligence consists of the capacity to analyze problems logically, carry out mathematical operations, and investigate issues scientifically.',
      spatial: 'Spatial intelligence features the potential to recognize and manipulate the patterns of wide space as well as the patterns of more confined areas.',
      musical: 'Musical intelligence involves skill in the performance, composition, and appreciation of musical patterns.',
      bodily: 'Bodily-kinesthetic intelligence entails the potential of using one\'s whole body or parts of the body to solve problems.',
      interpersonal: 'Interpersonal intelligence is concerned with the capacity to understand the intentions, motivations, and desires of other people.',
      intrapersonal: 'Intrapersonal intelligence entails the capacity to understand oneself, to appreciate one\'s feelings, fears, and motivations.',
      naturalist: 'Naturalist intelligence enables human beings to recognize, categorize, and draw upon certain features of the environment.'
    }
    return descriptions[category] || 'This intelligence type represents your cognitive strengths in this area.'
  }

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </main>
    )
  }

  // Show error state if not authenticated
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">You need to be logged in to access this page.</p>
            <Link 
              href="/login" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Show questions loading state
  if (questionsLoading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading questions...</p>
          </div>
        </div>
      </main>
    )
  }

  // Show questions error state
  if (questionsError) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Questions</h1>
            <p className="text-gray-600 mb-6">{questionsError}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'intro' && (
          <TestIntro onStartTest={handleStartTest} />
        )}

        {currentStep === 'gender' && (
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Before we begin...</h1>
            <p className="text-gray-600 mb-8">Please select your gender to help us provide more personalized results</p>
            
            <div className="space-y-4">
              <button
                onClick={() => handleGenderSelect('male')}
                className="w-full max-w-xs mx-auto block bg-blue-600 text-white py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                Male
              </button>
              <button
                onClick={() => handleGenderSelect('female')}
                className="w-full max-w-xs mx-auto block bg-pink-600 text-white py-4 px-8 rounded-lg hover:bg-pink-700 transition-colors text-lg font-medium"
              >
                Female
              </button>
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
            level="combined"
            onMoveToNextLevel={() => {}}
            onRestartTest={handleRestartTest}
            showNextLevel={false}
            showPrint={true}
            timing={null}
            getIntelligenceDescription={getIntelligenceDescription}
          />
        )}
      </div>
    </main>
  )
}
