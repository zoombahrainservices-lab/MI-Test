import { TestResult } from '../discover/page'

interface TestResultsProps {
  results: TestResult[]
  level: string
  onMoveToNextLevel: () => void
  onRestartTest: () => void
  showNextLevel: boolean
  showPrint: boolean
  timing: any
  getIntelligenceDescription: (category: string) => string
}

export default function TestResults({ results, level, onMoveToNextLevel, onRestartTest, showNextLevel, showPrint, timing, getIntelligenceDescription }: TestResultsProps) {
  // Sort results by percentage
  const sortedResults = [...results].sort((a, b) => b.percentage - a.percentage)

  const topResult = sortedResults[0]
  const secondResult = sortedResults[1]
  const thirdResult = sortedResults[2]

  const getIntelligenceIcon = (category: string) => {
    const icons = {
      'Linguistic': '📚',
      'Logical-Mathematical': '🔢',
      'Musical & Creative': '🎨',
      'Bodily-Kinesthetic': '🏃',
      'Interpersonal': '👥',
      'Intrapersonal': '🧠',
      'Naturalistic': '🌿',
      'Existential/Spiritual': '🕊️',
      'Spatial': '🧩'
    }
    return icons[category as keyof typeof icons] || '💡'
  }

  const getIntelligenceColor = (category: string) => {
    const colors = {
      'Linguistic': 'from-blue-500 to-blue-600',
      'Logical-Mathematical': 'from-purple-500 to-purple-600',
      'Musical & Creative': 'from-pink-500 to-pink-600',
      'Bodily-Kinesthetic': 'from-green-500 to-green-600',
      'Interpersonal': 'from-indigo-500 to-indigo-600',
      'Intrapersonal': 'from-red-500 to-red-600',
      'Naturalistic': 'from-emerald-500 to-emerald-600',
      'Existential/Spiritual': 'from-violet-500 to-violet-600',
      'Spatial': 'from-orange-500 to-orange-600'
    }
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">📊</span>
            <h2 className="text-3xl font-bold text-gray-800">
              Your Multiple Intelligence Results
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Congratulations! You've completed the Multiple Intelligence Test. Here's your comprehensive intelligence profile.
          </p>
        </div>

        {/* Top 3 Results */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* First Place */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🥇</div>
            <div className="text-2xl mb-2">{getIntelligenceIcon(topResult.category)}</div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">{topResult.category}</h3>
            <div className="text-3xl font-bold text-yellow-600 mb-2">{topResult.percentage}%</div>
            <p className="text-sm text-yellow-700">{getIntelligenceDescription(topResult.category)}</p>
          </div>

          {/* Second Place */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🥈</div>
            <div className="text-2xl mb-2">{getIntelligenceIcon(secondResult.category)}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{secondResult.category}</h3>
            <div className="text-3xl font-bold text-gray-600 mb-2">{secondResult.percentage}%</div>
            <p className="text-sm text-gray-700">{getIntelligenceDescription(secondResult.category)}</p>
          </div>

          {/* Third Place */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🥉</div>
            <div className="text-2xl mb-2">{getIntelligenceIcon(thirdResult.category)}</div>
            <h3 className="text-xl font-bold text-orange-800 mb-2">{thirdResult.category}</h3>
            <div className="text-3xl font-bold text-orange-600 mb-2">{thirdResult.percentage}%</div>
            <p className="text-sm text-orange-700">{getIntelligenceDescription(thirdResult.category)}</p>
          </div>
        </div>

        {/* All Results */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Complete Intelligence Profile</h3>
          <div className="space-y-4">
            {sortedResults.map((result, index) => (
              <div key={result.category} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getIntelligenceIcon(result.category)}</span>
                    <span className="text-lg font-semibold text-gray-800">{result.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-600">{result.percentage}%</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`bg-gradient-to-r ${getIntelligenceColor(result.category)} h-3 rounded-full transition-all duration-1000`}
                    style={{ width: `${result.percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{getIntelligenceDescription(result.category)}</p>
              </div>
            ))}
          </div>
        </div>


        {/* Insights */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-3">What This Means for You</h3>
          <div className="space-y-2 text-blue-700">
            <p>• <strong>Your strongest area</strong> ({topResult.category}) represents your natural learning style and career preferences</p>
            <p>• <strong>Your secondary strengths</strong> can be developed further to create a well-rounded skill set</p>
            <p>• <strong>All intelligences can be improved</strong> through practice and exposure to different learning experiences</p>
            <p>• <strong>Consider careers</strong> that align with your top 2-3 intelligence areas for maximum satisfaction</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-x-4">
          <button
            onClick={onRestartTest}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
          >
            Take Test Again
          </button>
          {showPrint && (
            <button
              onClick={() => window.print()}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
            >
              Print Results
            </button>
          )}
          {showNextLevel && (
            <button
              onClick={onMoveToNextLevel}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
            >
              Move to Next Level
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
