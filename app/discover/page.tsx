'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'
import Header from '../components/Header'
import TestIntro from '../components/TestIntro'
import TestQuestions from '../components/TestQuestions'
import TestResults from '../components/TestResults'
import EnhancedTestResults from '../components/EnhancedTestResults'
import { Question } from '../data/questions'
import { MIAssessmentEngine, AssessmentResult } from '../../lib/mi-assessment-engine'

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
  const [enhancedResults, setEnhancedResults] = useState<AssessmentResult | null>(null)
  const [saving, setSaving] = useState(false)
  const [gender, setGender] = useState<'male' | 'female' | ''>('')
  const [currentPageAnswers, setCurrentPageAnswers] = useState<Record<number, number>>({})
  const [questions, setQuestions] = useState<Question[]>([])
  const [questionsLoading, setQuestionsLoading] = useState(true)
  const [questionsError, setQuestionsError] = useState<string | null>(null)
  const [resultsTiming, setResultsTiming] = useState<any>(null)
  const [useEnhancedResults, setUseEnhancedResults] = useState(true)

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

  const saveTestResultToDatabase = async (results: TestResult[], enhancedResults?: any, timingExtra?: any) => {
    if (!user) {
      console.error('No user found for saving test results')
      return
    }
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      console.log('Token from localStorage:', token ? 'Found' : 'Not found')
      console.log('User from useAuth:', user)

      if (!token) {
        throw new Error('No authentication token found')
      }

      // Prepare responses data
      const responses = Object.entries(answers).map(([questionId, answer]) => ({
        questionId: parseInt(questionId),
        answer: answer + 1, // Convert 0-4 to 1-5
        category: questions.find(q => q.id === parseInt(questionId))?.category || 'unknown',
        difficulty: questions.find(q => q.id === parseInt(questionId))?.difficulty || 'easy'
      }))

      // Try the new API first, fallback to simple API
      let response = await fetch('/api/test-responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user.id,
          responses: responses,
          results: results,
          enhancedResults: enhancedResults,
          gender: gender,
          timing: timingExtra || null
        })
      })

      // If the new API fails, try the simple API
      if (!response.ok) {
        console.log('New API failed, trying simple API...')
        response = await fetch('/api/test-results-simple', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: user.id,
            responses: responses,
            results: results,
            enhancedResults: enhancedResults,
            gender: gender,
            timing: timingExtra || null
          })
        })
      }

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
    console.log('=== CALCULATION DEBUG ===')
    console.log('Calculating results with answers:', answers)
    console.log('Total answers provided:', Object.keys(answers).length)
    console.log('Available questions:', questions.length)
    console.log('Questions with categories:', questions.filter(q => q.category).length)
    
    const normalizeCategory = (raw: string): string => {
      const c = (raw || '').toLowerCase()
      if (c.includes('logical')) return 'logical'
      if (c.includes('linguistic')) return 'linguistic'
      if (c.includes('spatial')) return 'spatial'
      if (c.includes('music') || c.includes('creative')) return 'musical'
      if (c.includes('bodily') || c.includes('kinesthetic')) return 'bodily'
      if (c.includes('interpersonal')) return 'interpersonal'
      if (c.includes('intrapersonal')) return 'intrapersonal'
      if (c.includes('natural')) return 'naturalist'
      return c
    }
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
    let processedQuestions = 0
    let skippedQuestions = 0
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId))
      if (question) {
        console.log(`Processing question ${questionId}: category=${question.category}, answer=${answer}`)
        // If question is MCQ type, it won't have a category; skip scoring for MI test
        // Mixed fetch returns MCQ with fields: type='mcq' (no category). Our frontend `Question` type may not include it, so guard by presence.
        const anyQ: any = question as any
        if (anyQ.type === 'mcq' || !question.category) {
          console.log(`Skipping question ${questionId} - no category or MCQ type`)
          skippedQuestions++
          return
        }
        const key = normalizeCategory(question.category)
        // Answer is already in range 1-5, no conversion needed
        const scoreValue = answer
        categoryScores[key] += scoreValue
        categoryCounts[key] += 1
        processedQuestions++
        console.log(`Added to ${key}: score=${scoreValue}, total=${categoryScores[key]}, count=${categoryCounts[key]}`)
      } else {
        console.log(`Question ${questionId} not found in questions array`)
        skippedQuestions++
      }
    })
    
    console.log(`Processed questions: ${processedQuestions}, Skipped: ${skippedQuestions}`)

    console.log('Final category scores:', categoryScores)
    console.log('Final category counts:', categoryCounts)

    // Calculate percentages
    const results: TestResult[] = categories.map(category => {
      const score = categoryScores[category]
      const count = categoryCounts[category]
      const maxPossible = count * 5
      const percentage = count > 0 ? Math.round((score / maxPossible) * 100) : 0
      
      console.log(`${category}: score=${score}, count=${count}, maxPossible=${maxPossible}, percentage=${percentage}`)
      
      return {
        category,
        score,
        percentage
      }
    })

    const sortedResults = results.sort((a, b) => b.percentage - a.percentage)
    console.log('Final sorted results:', sortedResults)
    console.log('=== CALCULATION COMPLETE ===')
    return sortedResults
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

  // Initialize currentPageAnswers when page changes
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
      
      console.log(`=== PAGE INITIALIZATION DEBUG (Page ${currentPageIndex + 1}) ===`)
      console.log('Current page questions:', currentPageQuestions.map(q => q.id))
      console.log('Existing answers for this page:', pageAnswers)
      console.log('All answers so far:', answers)
      
      setCurrentPageAnswers(pageAnswers)
    }
  }, [currentPageIndex, currentStep, answers]) // Added 'answers' back to properly sync

  const getCurrentPageQuestions = () => {
    const startIndex = currentPageIndex * QUESTIONS_PER_PAGE
    const endIndex = startIndex + QUESTIONS_PER_PAGE
    return questions.slice(startIndex, endIndex)
  }

  const handleAnswerSelect = (questionId: number, answer: number) => {
    console.log(`=== ANSWER SELECTION DEBUG ===`)
    console.log(`Question ${questionId} answered with: ${answer}`)
    
    // Update current page answers
    setCurrentPageAnswers(prev => {
      const newPageAnswers = {
        ...prev,
        [questionId]: answer
      }
      console.log('Updated current page answers:', newPageAnswers)
      return newPageAnswers
    })
    
    // Also immediately update main answers to ensure no data loss
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: answer
      }
      console.log('Updated main answers:', newAnswers)
      return newAnswers
    })
  }

  const handleNextPage = useCallback(() => {
    // Save current page answers to main answers
    console.log('=== PAGE NAVIGATION DEBUG ===')
    console.log('Current page answers being saved:', currentPageAnswers)
    console.log('Previous main answers:', answers)
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        ...currentPageAnswers
      }
      console.log('New combined answers:', newAnswers)
      return newAnswers
    })

    if (currentPageIndex < TOTAL_PAGES - 1) {
      const newPageIndex = currentPageIndex + 1
      setCurrentPageIndex(newPageIndex)
      
      // Don't clear current page answers - they should be preserved
      // setCurrentPageAnswers({})
    } else {
      handleSubmitTest()
    }
  }, [currentPageAnswers, currentPageIndex])

  const handlePreviousPage = useCallback(() => {
    if (currentPageIndex > 0) {
      const newPageIndex = currentPageIndex - 1
      setCurrentPageIndex(newPageIndex)
      
      // Don't clear current page answers - they should be preserved
      // setCurrentPageAnswers({})
    }
  }, [currentPageIndex])

  const handleSubmitTest = async () => {
    // Save final answers
    const finalAnswers = { ...answers, ...currentPageAnswers }
    console.log('=== ASSESSMENT SUBMISSION DEBUG ===')
    console.log('Main answers:', answers)
    console.log('Current page answers:', currentPageAnswers)
    console.log('Final answers for calculation:', finalAnswers)
    console.log('Total answers collected:', Object.keys(finalAnswers).length)
    console.log('Questions available for calculation:', questions.length)
    
    // Validate that we have answers for all questions
    const answeredQuestionIds = Object.keys(finalAnswers).map(id => parseInt(id))
    const allQuestionIds = questions.map(q => q.id)
    const missingAnswers = allQuestionIds.filter(id => !answeredQuestionIds.includes(id))
    
    console.log('Answered question IDs:', answeredQuestionIds)
    console.log('All question IDs:', allQuestionIds)
    console.log('Missing answers for questions:', missingAnswers)
    
    if (missingAnswers.length > 0) {
      console.warn(`⚠️ WARNING: ${missingAnswers.length} questions have no answers!`)
      console.warn('Missing questions:', missingAnswers)
    }
    
    console.log('=====================================')
    setAnswers(finalAnswers)

    // Calculate traditional results
    const results = calculateResults(finalAnswers)
    console.log('Traditional results calculated:', results)
    setTestResults(results)

    // Calculate enhanced results using the new assessment engine
    const assessmentEngine = new MIAssessmentEngine()
    const enhancedAssessment = assessmentEngine.processAnswers(finalAnswers, questions)
    console.log('Enhanced assessment result:', enhancedAssessment)
    console.log('Enhanced assessment structure:', {
      hasTopIntelligences: !!enhancedAssessment.topIntelligences,
      hasQuotients: !!enhancedAssessment.quotients,
      hasCareerMatches: !!enhancedAssessment.careerMatches,
      topIntelligencesCount: enhancedAssessment.topIntelligences?.length || 0,
      quotientsCount: enhancedAssessment.quotients?.length || 0,
      careerMatchesCount: enhancedAssessment.careerMatches?.length || 0
    })
    setEnhancedResults(enhancedAssessment)

    // Compute MCQ summary and details
    const mcqDetails: any[] = []
    let mcqTotal = 0
    let mcqCorrect = 0
    questions.forEach((q: any) => {
      if (q?.type === 'mcq') {
        const selectedIndex = finalAnswers[q.id]
        if (selectedIndex !== undefined) {
          mcqTotal += 1
          const correct = Array.isArray(q.correctAnswers) && q.correctAnswers.includes(selectedIndex)
          if (correct) mcqCorrect += 1
          mcqDetails.push({ id: q.id, selectedIndex, correctAnswers: q.correctAnswers || [], correct })
        }
      }
    })

    const timingPayload = { mcq: { total: mcqTotal, correct: mcqCorrect, details: mcqDetails } }
    setResultsTiming(timingPayload)

    // Save to database (using both traditional and enhanced results)
    await saveTestResultToDatabase(results, enhancedAssessment, timingPayload)

    // Move to results step
    setCurrentStep('results')
  }

  const handleRestartTest = () => {
    setCurrentStep('intro')
    setCurrentPageIndex(0)
    setAnswers({})
    setCurrentPageAnswers({})
    setTestResults([])
    setEnhancedResults(null)
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
          <div className="space-y-6">
            {/* Results Toggle */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setUseEnhancedResults(true)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    useEnhancedResults 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Enhanced Results
                </button>
                <button
                  onClick={() => setUseEnhancedResults(false)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    !useEnhancedResults 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Standard Results
                </button>
              </div>
            </div>

             {/* Results Display */}
             {useEnhancedResults && enhancedResults ? (
               <EnhancedTestResults
                 assessmentResult={enhancedResults}
                 onRestartTest={handleRestartTest}
                 showPrint={true}
                 timing={resultsTiming}
               />
             ) : (
               <TestResults
                 results={testResults}
                 level="combined"
                 onMoveToNextLevel={() => {}}
                 onRestartTest={handleRestartTest}
                 showNextLevel={false}
                 showPrint={true}
                 timing={resultsTiming}
                 getIntelligenceDescription={getIntelligenceDescription}
               />
             )}
             
             {/* Debug Information */}
             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
               <h3 className="font-semibold text-yellow-800 mb-2">Debug Information</h3>
               <div className="text-sm text-yellow-700">
                 <p>Enhanced Results Available: {enhancedResults ? 'Yes' : 'No'}</p>
                 <p>Traditional Results Available: {testResults.length > 0 ? 'Yes' : 'No'}</p>
                 <p>Using Enhanced Results: {useEnhancedResults ? 'Yes' : 'No'}</p>
                 {enhancedResults && (
                   <div className="mt-2">
                     <p>Top Intelligences: {enhancedResults.topIntelligences?.length || 0}</p>
                     <p>Quotient Scores: {enhancedResults.quotients?.length || 0}</p>
                     <p>Top 3 Sample: {JSON.stringify(enhancedResults.topIntelligences?.slice(0, 2) || [])}</p>
                     <p>Quotient Sample: {JSON.stringify(enhancedResults.quotients?.slice(0, 2) || [])}</p>
                   </div>
                 )}
                 {testResults.length > 0 && (
                   <div className="mt-2">
                     <p>Traditional Results Sample: {JSON.stringify(testResults.slice(0, 3))}</p>
                   </div>
                 )}
               </div>
             </div>
          </div>
        )}
      </div>
    </main>
  )
}
