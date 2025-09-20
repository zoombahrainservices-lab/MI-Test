import { TestResult } from '../discover/page'

interface MediumResultsProps {
  results: TestResult[]
  onMoveToHard: () => void
  onRestartTest: () => void
  savingResults?: boolean
  saveError?: string | null
  saveSuccess?: string | null
}

export default function MediumResults({ results, onMoveToHard, onRestartTest, savingResults, saveError, saveSuccess }: MediumResultsProps) {
  const topResult = results[0]
  const secondResult = results[1]
  const thirdResult = results[2]

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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 print:shadow-none print:p-4">
        {/* Print Title - Only visible when printing */}
        <div className="hidden print:block text-center mb-6 border-b-2 border-gray-300 pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Multiple Intelligence Test - Medium Level Results</h1>
          <p className="text-sm text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
        </div>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">🟡</span>
            <h2 className="text-3xl font-bold text-yellow-800">
              Medium Level Results
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Excellent work! You've completed the Medium level. Here are your results for questions 11-20.
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

        {/* All Medium Results */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Complete Medium Level Profile</h3>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={result.category} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getIntelligenceIcon(result.category)}</span>
                    <span className="text-lg font-semibold text-gray-800">{result.category}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-600">{result.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`bg-gradient-to-r ${getIntelligenceColor(result.category)} h-3 rounded-full transition-all duration-1000`}
                    style={{ width: `${result.percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{result.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Level Info */}
        <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-2">🔴</span>
            <h3 className="text-xl font-bold text-red-800">Ready for the Ultimate Challenge?</h3>
          </div>
          <p className="text-red-700 mb-4">
            Outstanding! You've mastered the Medium level! Now it's time for the final challenge - the Hard level questions (21-30). 
            These are the most complex scenarios that will truly test your intelligence strengths.
          </p>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">What to expect in Hard Level:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Highly complex scenarios requiring deep analysis</li>
              <li>• Advanced self-reflection and critical thinking</li>
              <li>• Multi-layered questions testing your limits</li>
              <li>• 10 final questions to complete your comprehensive profile</li>
            </ul>
          </div>
        </div>

        {/* Save Status */}
        {savingResults && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-blue-700">Saving your results to the database...</span>
            </div>
          </div>
        )}

        {saveError && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex items-center">
              <span className="text-red-700">⚠️ {saveError}</span>
            </div>
          </div>
        )}

        {saveSuccess && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex items-center">
              <span className="text-green-700">✅ {saveSuccess}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center space-x-4 print:hidden">
          <button
            onClick={onRestartTest}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105 shadow-lg"
          >
            Restart Test
          </button>
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105 shadow-lg"
          >
            🖨️ Print Medium Results
          </button>
          <button
            onClick={onMoveToHard}
            disabled={savingResults || !!saveError}
            className={`font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105 shadow-lg ${
              savingResults || saveError 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {savingResults ? 'Saving...' : '🔴 Move to Hard Level'}
          </button>
        </div>
      </div>
    </div>
  )
}
