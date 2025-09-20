'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import ProtectedRoute from '../components/ProtectedRoute'
import TestIntro from '../components/TestIntro'
import TestQuestions from '../components/TestQuestions'
import TestResults from '../components/TestResults'

interface Question {
  id: number
  text: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  options: string[]
}

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

interface TimingData {
  totalTime: number
  questionTimes: Record<number, number>
}

export default function DiscoverPage() {
  const { isAuthenticated, loading, user } = useAuth()
  const [currentStep, setCurrentStep] = useState<'intro' | 'gender' | 'easy' | 'easy-results' | 'medium' | 'medium-results' | 'hard' | 'results'>('intro')
  const [currentLevel, setCurrentLevel] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [easyAnswers, setEasyAnswers] = useState<Record<number, number>>({})
  const [mediumAnswers, setMediumAnswers] = useState<Record<number, number>>({})
  const [hardAnswers, setHardAnswers] = useState<Record<number, number>>({})
  const [easyTestResults, setEasyTestResults] = useState<TestResult[]>([])
  const [mediumTestResults, setMediumTestResults] = useState<TestResult[]>([])
  const [hardTestResults, setHardTestResults] = useState<TestResult[]>([])
  const [timing, setTiming] = useState<TimingData>({ totalTime: 0, questionTimes: {} })
  const [saving, setSaving] = useState(false)
  const [gender, setGender] = useState<'male' | 'female' | ''>('')

  const saveTestResultToDatabase = async (results: TestResult[], level: string, timing?: TimingData) => {
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
          level,
          timing
        })
      })

      if (!response.ok) {
        throw new Error(`Failed to save test results: ${response.statusText}`)
      }

      console.log(`Test results saved for ${level} level:`, await response.json())
    } catch (error) {
      console.error('Error saving test results:', error)
    } finally {
      setSaving(false)
    }
  }

  const questions: Question[] = [
    // EASY QUESTIONS (1-10)
    // Linguistic Intelligence
    { id: 1, text: "I enjoy expressing my ideas clearly in writing or speech", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Logical-Mathematical Intelligence
    { id: 2, text: "I enjoy identifying patterns and predicting outcomes before taking action", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Musical & Creative Intelligence
    { id: 3, text: "I feel inspired when surrounded by art, music, or design", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Bodily-Kinesthetic Intelligence
    { id: 4, text: "I feel comfortable learning by doing rather than only observing", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Interpersonal Intelligence
    { id: 5, text: "I notice when someone is feeling upset even if they do not say anything", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Intrapersonal Intelligence
    { id: 6, text: "I often reflect on my thoughts and emotions to understand myself better", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Naturalistic Intelligence
    { id: 7, text: "I enjoy exploring nature and discovering new environments", category: "Naturalistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Existential/Spiritual Intelligence
    { id: 8, text: "I reflect on the meaning of my actions and their impact on others", category: "Existential/Spiritual", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Spatial Intelligence
    { id: 9, text: "I can easily visualize objects in 3D", category: "Spatial", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Additional question for better coverage
    { id: 10, text: "I pay attention to the words I use to ensure they are accurate", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },

    // MEDIUM QUESTIONS (11-20)
    // Linguistic Intelligence - Medium
    { id: 11, text: "I am motivated to persuade or inspire others through language", category: "Linguistic", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Logical-Mathematical Intelligence - Medium
    { id: 12, text: "I like breaking problems into smaller steps to find the best solution", category: "Logical-Mathematical", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Musical & Creative Intelligence - Medium
    { id: 13, text: "I often find new ways to approach a task or challenge creatively", category: "Musical & Creative", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Bodily-Kinesthetic Intelligence - Medium
    { id: 14, text: "I often use physical activity to think through ideas or problems", category: "Bodily-Kinesthetic", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Interpersonal Intelligence - Medium
    { id: 15, text: "I enjoy helping people resolve their conflicts or misunderstandings", category: "Interpersonal", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Intrapersonal Intelligence - Medium
    { id: 16, text: "I prefer setting personal goals and working independently to achieve them", category: "Intrapersonal", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Naturalistic Intelligence - Medium
    { id: 17, text: "I am curious about how natural systems and living things interact", category: "Naturalistic", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Existential/Spiritual Intelligence - Medium
    { id: 18, text: "I feel strongly about fairness, justice, and ethical decisions", category: "Existential/Spiritual", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Spatial Intelligence - Medium
    { id: 19, text: "I can mentally rotate and manipulate 3D objects to solve spatial problems", category: "Spatial", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Additional question for better coverage
    { id: 20, text: "I enjoy reading or learning new ways to communicate effectively", category: "Linguistic", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },

    // HARD QUESTIONS (21-30)
    // Linguistic Intelligence - Hard
    { id: 21, text: "I feel confident when I can explain complex ideas simply", category: "Linguistic", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Logical-Mathematical Intelligence - Hard
    { id: 22, text: "I often analyze situations from multiple angles before making decisions", category: "Logical-Mathematical", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Musical & Creative Intelligence - Hard
    { id: 23, text: "I draw inspiration from emotions or life experiences for my creative work", category: "Musical & Creative", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Bodily-Kinesthetic Intelligence - Hard
    { id: 24, text: "I am skilled at adapting my actions to achieve practical results", category: "Bodily-Kinesthetic", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Interpersonal Intelligence - Hard
    { id: 25, text: "I naturally create harmony in groups by listening to everyone's perspective", category: "Interpersonal", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Intrapersonal Intelligence - Hard
    { id: 26, text: "I make decisions based on my values and long-term priorities", category: "Intrapersonal", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Naturalistic Intelligence - Hard
    { id: 27, text: "I often notice details in my environment that others might miss", category: "Naturalistic", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Existential/Spiritual Intelligence - Hard
    { id: 28, text: "I value inner peace and try to create calm in my surroundings", category: "Existential/Spiritual", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Spatial Intelligence - Hard
    { id: 29, text: "I can mentally manipulate complex 3D structures and predict how they would behave under various conditions", category: "Spatial", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Additional question for better coverage
    { id: 30, text: "I notice grammatical or logical inconsistencies in written or spoken information", category: "Linguistic", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] }
  ]

  const calculateResults = (answers: Record<number, number>, difficulty: 'easy' | 'medium' | 'hard') => {
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
      const question = questions.find(q => q.id === parseInt(questionId) && q.difficulty === difficulty)
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

  const getCurrentQuestions = () => {
    return questions.filter(q => q.difficulty === currentLevel)
  }

  const handleStartTest = () => {
    setCurrentStep('gender')
  }

  const handleGenderSelect = (selectedGender: 'male' | 'female') => {
    setGender(selectedGender)
    setCurrentStep('easy')
    setCurrentLevel('easy')
    setCurrentQuestionIndex(0)
    setAnswers({})
    setTiming({ totalTime: 0, questionTimes: {} })
  }

  const handleNextQuestion = (answer: number) => {
    const currentQuestions = getCurrentQuestions()
    const currentQuestion = currentQuestions[currentQuestionIndex]
    
    if (currentQuestion) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: answer
      }))

      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
      } else {
        handleSubmitTest()
      }
    }
  }

  const handleSubmitTest = async () => {
    const currentQuestions = getCurrentQuestions()
    const results = calculateResults(answers, currentLevel)
    
    if (currentLevel === 'easy') {
      setEasyTestResults(results)
      setEasyAnswers({ ...answers })
      await saveTestResultToDatabase(results, 'easy', timing)
      setCurrentStep('easy-results')
    } else if (currentLevel === 'medium') {
      setMediumTestResults(results)
      setMediumAnswers({ ...answers })
      await saveTestResultToDatabase(results, 'medium', timing)
      setCurrentStep('medium-results')
    } else if (currentLevel === 'hard') {
      setHardTestResults(results)
      setHardAnswers({ ...answers })
      await saveTestResultToDatabase(results, 'hard', timing)
      setCurrentStep('results')
    }
  }

  const handleMoveToNextLevel = () => {
    if (currentLevel === 'easy') {
      setCurrentLevel('medium')
      setCurrentStep('medium')
      setCurrentQuestionIndex(0)
      setAnswers({})
      setTiming({ totalTime: 0, questionTimes: {} })
    } else if (currentLevel === 'medium') {
      setCurrentLevel('hard')
      setCurrentStep('hard')
      setCurrentQuestionIndex(0)
      setAnswers({})
      setTiming({ totalTime: 0, questionTimes: {} })
    }
  }

  const handleRestartTest = () => {
    setCurrentStep('intro')
    setCurrentLevel('easy')
    setCurrentQuestionIndex(0)
    setAnswers({})
    setEasyAnswers({})
    setMediumAnswers({})
    setHardAnswers({})
    setEasyTestResults([])
    setMediumTestResults([])
    setHardTestResults([])
    setTiming({ totalTime: 0, questionTimes: {} })
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
    return <ProtectedRoute />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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

      {(currentStep === 'easy' || currentStep === 'medium' || currentStep === 'hard') && (
        <TestQuestions
          questions={getCurrentQuestions()}
          currentQuestionIndex={currentQuestionIndex}
          onNextQuestion={handleNextQuestion}
          difficulty={currentLevel}
          timing={timing}
          setTiming={setTiming}
        />
      )}

      {currentStep === 'easy-results' && (
        <TestResults
          results={easyTestResults}
          level="Easy"
          onMoveToNextLevel={handleMoveToNextLevel}
          onRestartTest={handleRestartTest}
          showNextLevel={true}
          showPrint={true}
          timing={timing}
          getIntelligenceDescription={getIntelligenceDescription}
        />
      )}

      {currentStep === 'medium-results' && (
        <TestResults
          results={mediumTestResults}
          level="Medium"
          onMoveToNextLevel={handleMoveToNextLevel}
          onRestartTest={handleRestartTest}
          showNextLevel={true}
          showPrint={false}
          timing={timing}
          getIntelligenceDescription={getIntelligenceDescription}
        />
      )}

      {currentStep === 'results' && (
        <TestResults
          results={hardTestResults}
          level="Hard"
          onMoveToNextLevel={() => {}}
          onRestartTest={handleRestartTest}
          showNextLevel={false}
          showPrint={false}
          timing={timing}
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