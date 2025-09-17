'use client'

import { useState } from 'react'
import Header from '../components/Header'
import TestIntro from '../components/TestIntro'
import TestQuestions from '../components/TestQuestions'
import TestResults from '../components/TestResults'
import { useAuth } from '../hooks/useAuth'
import ProtectedRoute from '../components/ProtectedRoute'

export interface Question {
  id: number
  text: string
  category: string
  options: string[]
}

export interface TestResult {
  category: string
  score: number
  percentage: number
  description: string
}

export interface TimingData {
  totalTime: number
  questionTimes: Record<number, number>
  averageTimePerQuestion: number
}

export default function DiscoverPage() {
  const { isAuthenticated, loading } = useAuth()
  const [currentStep, setCurrentStep] = useState<'intro' | 'test' | 'results'>('intro')
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [results, setResults] = useState<TestResult[]>([])
  const [timingData, setTimingData] = useState<TimingData | null>(null)

  const questions: Question[] = [
    // Linguistic Intelligence
    { id: 1, text: "I enjoy reading books and writing stories", category: "Linguistic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Logical-Mathematical Intelligence
    { id: 2, text: "I enjoy solving math problems and logic puzzles", category: "Logical-Mathematical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Spatial Intelligence
    { id: 3, text: "I can easily visualize objects in 3D", category: "Spatial", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Musical Intelligence
    { id: 4, text: "I can easily remember melodies and rhythms", category: "Musical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Bodily-Kinesthetic Intelligence
    { id: 5, text: "I learn best through hands-on activities", category: "Bodily-Kinesthetic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Interpersonal Intelligence
    { id: 6, text: "I enjoy working in groups and teams", category: "Interpersonal", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Intrapersonal Intelligence
    { id: 7, text: "I enjoy spending time alone to reflect", category: "Intrapersonal", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Naturalist Intelligence
    { id: 8, text: "I enjoy spending time in nature", category: "Naturalist", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Additional questions for better coverage
    { id: 9, text: "I find it easy to learn new languages", category: "Linguistic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 10, text: "I like to analyze patterns and relationships", category: "Logical-Mathematical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  ]

  const calculateResults = (answers: Record<number, number>) => {
    const categories = ['Linguistic', 'Logical-Mathematical', 'Spatial', 'Musical', 'Bodily-Kinesthetic', 'Interpersonal', 'Intrapersonal', 'Naturalist']
    const results: TestResult[] = []

    categories.forEach(category => {
      const categoryQuestions = questions.filter(q => q.category === category)
      const totalScore = categoryQuestions.reduce((sum, question) => {
        const answer = answers[question.id]
        return sum + (answer !== undefined ? answer + 1 : 0) // Convert 0-4 to 1-5
      }, 0)
      const maxScore = categoryQuestions.length * 5
      const percentage = Math.round((totalScore / maxScore) * 100)

      const descriptions = {
        'Linguistic': 'Word smart - you excel with language, reading, writing, and communication',
        'Logical-Mathematical': 'Number smart - you excel with logic, reasoning, and mathematical concepts',
        'Spatial': 'Picture smart - you excel with visual and spatial relationships',
        'Musical': 'Music smart - you excel with rhythm, melody, and musical patterns',
        'Bodily-Kinesthetic': 'Body smart - you excel with physical movement and hands-on learning',
        'Interpersonal': 'People smart - you excel with understanding and relating to others',
        'Intrapersonal': 'Self smart - you excel with self-reflection and understanding your own emotions',
        'Naturalist': 'Nature smart - you excel with understanding and connecting with the natural world'
      }

      results.push({
        category,
        score: totalScore,
        percentage,
        description: descriptions[category as keyof typeof descriptions]
      })
    })

    return results.sort((a, b) => b.percentage - a.percentage)
  }

  const handleStartTest = () => {
    setCurrentStep('test')
  }

  const handleAnswerChange = (questionId: number, answer: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleSubmitTest = (timing?: TimingData) => {
    const testResults = calculateResults(answers)
    setResults(testResults)
    if (timing) {
      setTimingData(timing)
    }
    setCurrentStep('results')
  }

  const handleRestartTest = () => {
    setCurrentStep('intro')
    setAnswers({})
    setResults([])
    setTimingData(null)
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

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'intro' && (
          <ProtectedRoute>
            <TestIntro onStartTest={handleStartTest} />
          </ProtectedRoute>
        )}
        
        {currentStep === 'test' && (
          <ProtectedRoute>
            <TestQuestions
              questions={questions}
              answers={answers}
              onAnswerChange={handleAnswerChange}
              onSubmitTest={handleSubmitTest}
            />
          </ProtectedRoute>
        )}
        
        {currentStep === 'results' && (
          <ProtectedRoute>
            <TestResults
              results={results}
              timingData={timingData}
              onRestartTest={handleRestartTest}
            />
          </ProtectedRoute>
        )}
      </div>
    </main>
  )
}
