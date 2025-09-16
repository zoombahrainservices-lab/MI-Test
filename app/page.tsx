'use client'

import { useState } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import TestIntro from './components/TestIntro'
import TestQuestions from './components/TestQuestions'
import TestResults from './components/TestResults'
import { useAuth } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'

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

export default function Home() {
  const { isAuthenticated, loading } = useAuth()
  const [currentStep, setCurrentStep] = useState<'home' | 'intro' | 'test' | 'results'>('home')
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [results, setResults] = useState<TestResult[]>([])

  const questions: Question[] = [
    // Linguistic Intelligence
    { id: 1, text: "I enjoy reading books and writing stories", category: "Linguistic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 2, text: "I find it easy to learn new languages", category: "Linguistic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 3, text: "I love word games and puzzles", category: "Linguistic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Logical-Mathematical Intelligence
    { id: 4, text: "I enjoy solving math problems and logic puzzles", category: "Logical-Mathematical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 5, text: "I like to analyze patterns and relationships", category: "Logical-Mathematical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 6, text: "I prefer step-by-step problem solving", category: "Logical-Mathematical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Spatial Intelligence
    { id: 7, text: "I can easily visualize objects in 3D", category: "Spatial", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 8, text: "I enjoy drawing, painting, or designing", category: "Spatial", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 9, text: "I have a good sense of direction", category: "Spatial", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Musical Intelligence
    { id: 10, text: "I can easily remember melodies and rhythms", category: "Musical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 11, text: "I enjoy playing musical instruments", category: "Musical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 12, text: "I notice sounds that others might miss", category: "Musical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Bodily-Kinesthetic Intelligence
    { id: 13, text: "I learn best through hands-on activities", category: "Bodily-Kinesthetic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 14, text: "I enjoy sports and physical activities", category: "Bodily-Kinesthetic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 15, text: "I have good hand-eye coordination", category: "Bodily-Kinesthetic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Interpersonal Intelligence
    { id: 16, text: "I enjoy working in groups and teams", category: "Interpersonal", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 17, text: "I can easily understand other people's feelings", category: "Interpersonal", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 18, text: "I am a natural leader", category: "Interpersonal", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Intrapersonal Intelligence
    { id: 19, text: "I enjoy spending time alone to reflect", category: "Intrapersonal", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 20, text: "I have a strong sense of self-awareness", category: "Intrapersonal", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 21, text: "I prefer to work independently", category: "Intrapersonal", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Naturalist Intelligence
    { id: 22, text: "I enjoy spending time in nature", category: "Naturalist", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 23, text: "I can easily identify different plants and animals", category: "Naturalist", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 24, text: "I care deeply about environmental issues", category: "Naturalist", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
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

  const handleGoToIntro = () => {
    setCurrentStep('intro')
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

  const handleSubmitTest = () => {
    const testResults = calculateResults(answers)
    setResults(testResults)
    setCurrentStep('results')
  }

  const handleRestartTest = () => {
    setCurrentStep('home')
    setAnswers({})
    setResults([])
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

  // If user is not authenticated, show home page with login prompt
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <HomePage onGoToIntro={handleGoToIntro} />
        </div>
      </main>
    )
  }

  // If user is authenticated, show test flow
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'home' && (
          <HomePage onGoToIntro={handleGoToIntro} />
        )}
        
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
              onRestartTest={handleRestartTest}
            />
          </ProtectedRoute>
        )}
      </div>
    </main>
  )
}
