'use client'

import { AssessmentResult, getIntelligenceIcon, getIntelligenceName, getIntelligenceDescription } from '../../lib/mi-assessment-engine'

interface EnhancedTestResultsProps {
  assessmentResult: AssessmentResult
  onRestartTest: () => void
  showPrint: boolean
  timing?: any
}

export default function EnhancedTestResults({ 
  assessmentResult, 
  onRestartTest, 
  showPrint,
  timing 
}: EnhancedTestResultsProps) {
  
  console.log('EnhancedTestResults received assessmentResult:', assessmentResult)
  console.log('Top 3 Intelligences:', assessmentResult?.top3Intelligences)
  console.log('Quotients:', assessmentResult?.quotients)
  console.log('Career Matches:', assessmentResult?.careerMatches)
  
  // Ensure we have the data we need
  if (!assessmentResult) {
    console.error('No assessment result provided to EnhancedTestResults')
    return <div>No assessment results available</div>
  }
  
  const topIntelligences = assessmentResult.topIntelligences || assessmentResult.top3Intelligences || []
  const quotients = assessmentResult.quotients || []
  const careerMatches = assessmentResult.careerMatches || []
  const bestFitCareers = assessmentResult.bestFitCareers || careerMatches.slice(0, 3)
  
  console.log('Processed data:', {
    topIntelligences: topIntelligences.length,
    quotients: quotients.length,
    careerMatches: careerMatches.length,
    bestFitCareers: bestFitCareers.length
  })
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getQuotientColor = (name: string) => {
    const colors: Record<string, string> = {
      'IQ (Intelligence Quotient)': 'from-blue-500 to-blue-600',
      'EQ (Emotional Quotient)': 'from-green-500 to-green-600',
      'AQ (Adaptability Quotient)': 'from-purple-500 to-purple-600',
      'CQ (Creative Quotient)': 'from-pink-500 to-pink-600',
      'SQ (Spiritual Quotient)': 'from-indigo-500 to-indigo-600'
    }
    return colors[name] || 'from-gray-500 to-gray-600'
  }

  const getCareerMatchColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600 bg-green-50 border-green-200'
    if (percentage >= 75) return 'text-blue-600 bg-blue-50 border-blue-200'
    if (percentage >= 65) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-gray-600 bg-gray-50 border-gray-200'
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">🧠</span>
            <h2 className="text-3xl font-bold text-gray-800">
              Your Multiple Intelligence Assessment Results
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Discover your cognitive strengths and explore career paths that align with your unique intelligence profile.
          </p>
        </div>

        {/* MCQ Summary */}
        {timing?.mcq && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="text-green-800 text-sm sm:text-base">
                <span className="font-semibold">Knowledge Assessment Score:</span> {timing.mcq.correct} / {timing.mcq.total}
              </div>
              <div className="text-green-700 text-sm">Questions answered correctly</div>
            </div>
          </div>
        )}
      </div>

      {/* Top 3 Intelligences */}
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Top 3 Intelligences</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {topIntelligences.map((intelligence, index) => (
            <div 
              key={intelligence.intelligence}
              className={`rounded-lg p-6 text-center ${
                index === 0 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200' :
                index === 1 ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200' :
                'bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200'
              }`}
            >
              <div className="text-4xl mb-3">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </div>
              <div className="text-3xl mb-3">{getIntelligenceIcon(intelligence.intelligence)}</div>
              <h4 className="text-xl font-bold mb-2">
                {getIntelligenceName(intelligence.intelligence)}
              </h4>
              <div className="text-3xl font-bold mb-3 text-gray-700">{intelligence.percentage}%</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {intelligence.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quotient Profile */}
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Quotient Profile</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotients.map((quotient, index) => (
            <div key={quotient.name} className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">{quotient.name}</h4>
                <div className="text-2xl font-bold text-gray-700">{quotient.percentage}%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div 
                  className={`bg-gradient-to-r ${getQuotientColor(quotient.name)} h-3 rounded-full transition-all duration-1000`}
                  style={{ width: `${quotient.percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{quotient.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Career Matches */}
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Career Matches</h3>
        
        {/* Best Fit Careers */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">✅</span>
            Best Fit Careers
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            {bestFitCareers.map((career, index) => (
              <div 
                key={career.career}
                className={`rounded-lg p-4 border-2 ${getCareerMatchColor(career.matchPercentage)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-lg">{career.career}</h5>
                  <span className="text-xl font-bold">{career.matchPercentage}%</span>
                </div>
                <p className="text-sm mb-2">{career.description}</p>
                {career.salaryRange && (
                  <p className="text-xs text-gray-500">Salary: {career.salaryRange}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* All Career Matches */}
        <div>
          <h4 className="text-xl font-semibold text-gray-800 mb-4">All Career Matches</h4>
          <div className="space-y-3">
            {careerMatches.slice(3, 10).map((career, index) => (
              <div 
                key={career.career}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-800">{career.career}</h5>
                  <p className="text-sm text-gray-600">{career.description}</p>
                  {career.salaryRange && (
                    <p className="text-xs text-gray-500 mt-1">Salary: {career.salaryRange}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-700">{career.matchPercentage}%</div>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${career.matchPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complete Intelligence Profile */}
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Complete Intelligence Profile</h3>
        <div className="space-y-4">
          {assessmentResult.allIntelligences.map((intelligence, index) => (
            <div key={intelligence.intelligence} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{getIntelligenceIcon(intelligence.intelligence)}</span>
                  <span className="text-lg font-semibold text-gray-800">
                    {getIntelligenceName(intelligence.intelligence)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-600">{intelligence.percentage}%</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${intelligence.percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{intelligence.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Personalized Advice */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
        <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
          <span className="text-2xl mr-2">💡</span>
          Personalized Career Guidance
        </h3>
        <div className="space-y-2 text-blue-700">
          {assessmentResult.personalizedAdvice.map((advice, index) => (
            <p key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{advice}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center space-x-4">
        <button
          onClick={onRestartTest}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
        >
          Take Assessment Again
        </button>
        {showPrint && (
          <button
            onClick={() => window.print()}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
          >
            Print Results
          </button>
        )}
      </div>
    </div>
  )
}
