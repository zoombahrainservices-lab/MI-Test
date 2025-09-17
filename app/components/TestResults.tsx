import { TestResult, TimingData } from '../discover/page'

interface TestResultsProps {
  easyResults: TestResult[]
  mediumResults: TestResult[]
  hardResults: TestResult[]
  timingData?: TimingData | null
  onRestartTest: () => void
}

export default function TestResults({ easyResults, mediumResults, hardResults, timingData, onRestartTest }: TestResultsProps) {
  // Calculate combined results (average of easy, medium, and hard)
  const combinedResults = easyResults.map((easyResult, index) => {
    const mediumResult = mediumResults[index]
    const hardResult = hardResults[index]
    const averagePercentage = Math.round((easyResult.percentage + mediumResult.percentage + hardResult.percentage) / 3)
    return {
      ...easyResult,
      percentage: averagePercentage,
      easyPercentage: easyResult.percentage,
      mediumPercentage: mediumResult.percentage,
      hardPercentage: hardResult.percentage
    }
  }).sort((a, b) => b.percentage - a.percentage)

  const topResult = combinedResults[0]
  const secondResult = combinedResults[1]
  const thirdResult = combinedResults[2]

  const getIntelligenceIcon = (category: string) => {
    const icons = {
      'Linguistic': '📚',
      'Logical-Mathematical': '🔢',
      'Spatial': '🎨',
      'Musical': '🎵',
      'Bodily-Kinesthetic': '🏃',
      'Interpersonal': '👥',
      'Intrapersonal': '🧠',
      'Naturalist': '🌿'
    }
    return icons[category as keyof typeof icons] || '💡'
  }

  const getIntelligenceColor = (category: string) => {
    const colors = {
      'Linguistic': 'from-blue-500 to-blue-600',
      'Logical-Mathematical': 'from-purple-500 to-purple-600',
      'Spatial': 'from-pink-500 to-pink-600',
      'Musical': 'from-yellow-500 to-yellow-600',
      'Bodily-Kinesthetic': 'from-green-500 to-green-600',
      'Interpersonal': 'from-indigo-500 to-indigo-600',
      'Intrapersonal': 'from-red-500 to-red-600',
      'Naturalist': 'from-emerald-500 to-emerald-600'
    }
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">📊</span>
            <h2 className="text-3xl font-bold text-gray-800">
              Complete Multiple Intelligence Results
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Congratulations! You've completed all three difficulty levels. Here's your comprehensive intelligence profile combining Easy, Medium, and Hard levels.
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
            <p className="text-sm text-yellow-700">{topResult.description}</p>
          </div>

          {/* Second Place */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🥈</div>
            <div className="text-2xl mb-2">{getIntelligenceIcon(secondResult.category)}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{secondResult.category}</h3>
            <div className="text-3xl font-bold text-gray-600 mb-2">{secondResult.percentage}%</div>
            <p className="text-sm text-gray-700">{secondResult.description}</p>
          </div>

          {/* Third Place */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🥉</div>
            <div className="text-2xl mb-2">{getIntelligenceIcon(thirdResult.category)}</div>
            <h3 className="text-xl font-bold text-orange-800 mb-2">{thirdResult.category}</h3>
            <div className="text-3xl font-bold text-orange-600 mb-2">{thirdResult.percentage}%</div>
            <p className="text-sm text-orange-700">{thirdResult.description}</p>
          </div>
        </div>

        {/* All Results */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Combined Intelligence Profile (Easy + Medium + Hard)</h3>
          <div className="space-y-4">
            {combinedResults.map((result, index) => (
              <div key={result.category} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getIntelligenceIcon(result.category)}</span>
                    <span className="text-lg font-semibold text-gray-800">{result.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-600">{result.percentage}%</div>
                    <div className="text-xs text-gray-500">
                      Easy: {result.easyPercentage}% | Medium: {result.mediumPercentage}% | Hard: {result.hardPercentage}%
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`bg-gradient-to-r ${getIntelligenceColor(result.category)} h-3 rounded-full transition-all duration-1000`}
                    style={{ width: `${result.percentage}%` }}
                  ></div>
                </div>
                <div className="flex space-x-2 mb-2">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">Easy Level</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${result.easyPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">Medium Level</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${result.mediumPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">Hard Level</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${result.hardPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{result.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Level Comparison */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Difficulty Level Comparison</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🟢</span>
                <h4 className="text-lg font-semibold text-green-800">Easy Level Performance</h4>
              </div>
              <div className="space-y-2">
                {easyResults.slice(0, 3).map((result, index) => (
                  <div key={result.category} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{result.category}</span>
                    <span className="text-sm font-bold text-green-600">{result.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🟡</span>
                <h4 className="text-lg font-semibold text-yellow-800">Medium Level Performance</h4>
              </div>
              <div className="space-y-2">
                {mediumResults.slice(0, 3).map((result, index) => (
                  <div key={result.category} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{result.category}</span>
                    <span className="text-sm font-bold text-yellow-600">{result.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🔴</span>
                <h4 className="text-lg font-semibold text-red-800">Hard Level Performance</h4>
              </div>
              <div className="space-y-2">
                {hardResults.slice(0, 3).map((result, index) => (
                  <div key={result.category} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{result.category}</span>
                    <span className="text-sm font-bold text-red-600">{result.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timing Data */}
        {timingData && (
          <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
            <h3 className="text-xl font-bold text-green-800 mb-4">Test Performance</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{formatTime(timingData.totalTime)}</div>
                <div className="text-sm text-green-700">Total Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{formatTime(timingData.averageTimePerQuestion)}</div>
                <div className="text-sm text-green-700">Average per Question</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{Object.keys(timingData.questionTimes).length}</div>
                <div className="text-sm text-green-700">Questions Completed</div>
              </div>
            </div>
            
            {/* Question-by-Question Timing */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-green-800 mb-3">Time per Question</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {Object.entries(timingData.questionTimes).map(([questionId, time]) => (
                  <div key={questionId} className="bg-white rounded-lg p-3 text-center">
                    <div className="text-sm font-medium text-green-600">Q{questionId}</div>
                    <div className="text-lg font-bold text-green-800">{formatTime(time)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
          <button
            onClick={() => window.print()}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
          >
            Print Results
          </button>
        </div>
      </div>
    </div>
  )
}
