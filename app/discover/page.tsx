'use client'

import { useState } from 'react'
import Header from '../components/Header'
import TestIntro from '../components/TestIntro'
import TestQuestions from '../components/TestQuestions'
import EasyResults from '../components/EasyResults'
import MediumResults from '../components/MediumResults'
import TestResults from '../components/TestResults'
import { useAuth } from '../hooks/useAuth'
import ProtectedRoute from '../components/ProtectedRoute'

export interface Question {
  id: number
  text: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
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
  const [currentStep, setCurrentStep] = useState<'intro' | 'test' | 'easy-results' | 'medium-results' | 'results'>('intro')
  const [currentLevel, setCurrentLevel] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [easyResults, setEasyResults] = useState<TestResult[]>([])
  const [mediumResults, setMediumResults] = useState<TestResult[]>([])
  const [hardResults, setHardResults] = useState<TestResult[]>([])
  const [timingData, setTimingData] = useState<TimingData | null>(null)

  const questions: Question[] = [
    // EASY QUESTIONS (1-10)
    // Linguistic Intelligence
    { id: 1, text: "I enjoy reading books and writing stories", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Logical-Mathematical Intelligence
    { id: 2, text: "I enjoy solving math problems and logic puzzles", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Spatial Intelligence
    { id: 3, text: "I can easily visualize objects in 3D", category: "Spatial", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Musical Intelligence
    { id: 4, text: "I can easily remember melodies and rhythms", category: "Musical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Bodily-Kinesthetic Intelligence
    { id: 5, text: "I learn best through hands-on activities", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Interpersonal Intelligence
    { id: 6, text: "I enjoy working in groups and teams", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Intrapersonal Intelligence
    { id: 7, text: "I enjoy spending time alone to reflect", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Naturalist Intelligence
    { id: 8, text: "I enjoy spending time in nature", category: "Naturalist", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Additional questions for better coverage
    { id: 9, text: "I find it easy to learn new languages", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 10, text: "I like to analyze patterns and relationships", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },

    // MEDIUM QUESTIONS (11-20)
    // Linguistic Intelligence - Medium
    { id: 11, text: "I can easily adapt my communication style to different audiences and contexts", category: "Linguistic", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Logical-Mathematical Intelligence - Medium
    { id: 12, text: "I enjoy breaking down complex problems into smaller, manageable parts", category: "Logical-Mathematical", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Spatial Intelligence - Medium
    { id: 13, text: "I can mentally rotate and manipulate 3D objects to solve spatial problems", category: "Spatial", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Musical Intelligence - Medium
    { id: 14, text: "I can identify subtle differences in musical tones and rhythms", category: "Musical", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Bodily-Kinesthetic Intelligence - Medium
    { id: 15, text: "I excel at activities that require precise coordination between mind and body", category: "Bodily-Kinesthetic", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Interpersonal Intelligence - Medium
    { id: 16, text: "I can accurately read people's emotions and motivations in social situations", category: "Interpersonal", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Intrapersonal Intelligence - Medium
    { id: 17, text: "I have a deep understanding of my own strengths, weaknesses, and motivations", category: "Intrapersonal", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Naturalist Intelligence - Medium
    { id: 18, text: "I can identify patterns and relationships in natural environments", category: "Naturalist", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Additional questions for better coverage
    { id: 19, text: "I can effectively communicate complex ideas through writing", category: "Linguistic", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 20, text: "I enjoy creating and testing hypotheses to solve problems", category: "Logical-Mathematical", difficulty: "medium", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },

    // HARD QUESTIONS (21-30)
    // Linguistic Intelligence - Hard
    { id: 21, text: "I can craft compelling narratives that deeply resonate with diverse audiences across different cultural contexts", category: "Linguistic", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Logical-Mathematical Intelligence - Hard
    { id: 22, text: "I excel at solving multi-layered problems that require integrating concepts from multiple disciplines", category: "Logical-Mathematical", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Spatial Intelligence - Hard
    { id: 23, text: "I can mentally manipulate complex 3D structures and predict how they would behave under various conditions", category: "Spatial", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Musical Intelligence - Hard
    { id: 24, text: "I can compose original music that evokes specific emotions and tells a story without words", category: "Musical", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Bodily-Kinesthetic Intelligence - Hard
    { id: 25, text: "I can master complex physical skills that require precise timing, coordination, and muscle memory", category: "Bodily-Kinesthetic", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Interpersonal Intelligence - Hard
    { id: 26, text: "I can mediate conflicts between people with deeply opposing viewpoints and find mutually beneficial solutions", category: "Interpersonal", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Intrapersonal Intelligence - Hard
    { id: 27, text: "I have profound self-awareness that allows me to predict my own reactions and growth patterns in various life situations", category: "Intrapersonal", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Naturalist Intelligence - Hard
    { id: 28, text: "I can identify subtle ecological relationships and predict how environmental changes will affect entire ecosystems", category: "Naturalist", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    
    // Additional questions for better coverage
    { id: 29, text: "I can adapt my communication style to influence and inspire people from completely different backgrounds and belief systems", category: "Linguistic", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 30, text: "I can develop innovative solutions to problems that have never been solved before by combining unexpected approaches", category: "Logical-Mathematical", difficulty: "hard", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  ]

  const calculateResults = (answers: Record<number, number>, difficulty: 'easy' | 'medium' | 'hard') => {
    const categories = ['Linguistic', 'Logical-Mathematical', 'Spatial', 'Musical', 'Bodily-Kinesthetic', 'Interpersonal', 'Intrapersonal', 'Naturalist']
    const results: TestResult[] = []

    categories.forEach(category => {
      const categoryQuestions = questions.filter(q => q.category === category && q.difficulty === difficulty)
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
    if (currentLevel === 'easy') {
      // Calculate easy results and show easy results page
      const easyTestResults = calculateResults(answers, 'easy')
      setEasyResults(easyTestResults)
      setCurrentStep('easy-results')
    } else if (currentLevel === 'medium') {
      // Calculate medium results and show medium results page
      const mediumTestResults = calculateResults(answers, 'medium')
      setMediumResults(mediumTestResults)
      setCurrentStep('medium-results')
    } else if (currentLevel === 'hard') {
      // Calculate hard results and show final results
      const hardTestResults = calculateResults(answers, 'hard')
      setHardResults(hardTestResults)
      if (timing) {
        setTimingData(timing)
      }
      setCurrentStep('results')
    }
  }

  const handleMoveToMedium = () => {
    setCurrentLevel('medium')
    setAnswers({}) // Reset answers for medium level
    setCurrentStep('test')
  }

  const handleMoveToHard = () => {
    setCurrentLevel('hard')
    setAnswers({}) // Reset answers for hard level
    setCurrentStep('test')
  }

  const handleRestartTest = () => {
    setCurrentStep('intro')
    setCurrentLevel('easy')
    setAnswers({})
    setEasyResults([])
    setMediumResults([])
    setHardResults([])
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
                    questions={questions.filter(q => q.difficulty === currentLevel)}
                    answers={answers}
                    onAnswerChange={handleAnswerChange}
                    onSubmitTest={handleSubmitTest}
                    currentLevel={currentLevel}
                  />
                </ProtectedRoute>
              )}

        {currentStep === 'easy-results' && (
          <ProtectedRoute>
            <EasyResults
              results={easyResults}
              onMoveToMedium={handleMoveToMedium}
              onRestartTest={handleRestartTest}
            />
          </ProtectedRoute>
        )}

        {currentStep === 'medium-results' && (
          <ProtectedRoute>
            <MediumResults
              results={mediumResults}
              onMoveToHard={handleMoveToHard}
              onRestartTest={handleRestartTest}
            />
          </ProtectedRoute>
        )}
        
        {currentStep === 'results' && (
          <ProtectedRoute>
            <TestResults
              easyResults={easyResults}
              mediumResults={mediumResults}
              hardResults={hardResults}
              timingData={timingData}
              onRestartTest={handleRestartTest}
            />
          </ProtectedRoute>
        )}
      </div>
    </main>
  )
}
