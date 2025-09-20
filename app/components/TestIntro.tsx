interface TestIntroProps {
  onStartTest: () => void
}

export default function TestIntro({ onStartTest }: TestIntroProps) {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to the Multiple Intelligence Assessment
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Based on Howard Gardner's theory of multiple intelligences, this test will help you 
            discover your unique cognitive strengths across nine different areas of intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">What You'll Learn</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Your strongest intelligence areas</li>
              <li>• How you learn best</li>
              <li>• Career paths that match your strengths</li>
              <li>• Ways to develop other intelligences</li>
            </ul>
          </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-green-800 mb-3">Test Details</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 28 carefully crafted questions covering all 9 intelligence types</li>
            <li>• No time pressure - take your time to answer thoughtfully</li>
            <li>• No right or wrong answers</li>
            <li>• Comprehensive results showing your intelligence profile</li>
            <li>• Instant results with detailed insights</li>
          </ul>
        </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Important:</strong> Answer honestly based on your natural preferences and abilities. 
                There are no correct answers - this test is about discovering your unique strengths!
              </p>
            </div>
          </div>
        </div>


        {/* Intelligence Types Overview */}
        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-purple-800 mb-3">The 9 Types of Intelligence</h3>
          <p className="text-gray-600 mb-4">
            This test evaluates your strengths across all nine intelligence types:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center p-3 bg-white rounded-lg">
              <div className="text-2xl mr-3">📚</div>
              <div>
                <h4 className="font-medium text-gray-800">Linguistic</h4>
                <p className="text-sm text-gray-600">Word smart</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg">
              <div className="text-2xl mr-3">🔢</div>
              <div>
                <h4 className="font-medium text-gray-800">Logical-Mathematical</h4>
                <p className="text-sm text-gray-600">Number smart</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg">
              <div className="text-2xl mr-3">🎨</div>
              <div>
                <h4 className="font-medium text-gray-800">Musical & Creative</h4>
                <p className="text-sm text-gray-600">Creative smart</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg">
              <div className="text-2xl mr-3">🏃</div>
              <div>
                <h4 className="font-medium text-gray-800">Bodily-Kinesthetic</h4>
                <p className="text-sm text-gray-600">Body smart</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg">
              <div className="text-2xl mr-3">👥</div>
              <div>
                <h4 className="font-medium text-gray-800">Interpersonal</h4>
                <p className="text-sm text-gray-600">People smart</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg">
              <div className="text-2xl mr-3">🧠</div>
              <div>
                <h4 className="font-medium text-gray-800">Intrapersonal</h4>
                <p className="text-sm text-gray-600">Self smart</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg">
              <div className="text-2xl mr-3">🌿</div>
              <div>
                <h4 className="font-medium text-gray-800">Naturalistic</h4>
                <p className="text-sm text-gray-600">Nature smart</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg">
              <div className="text-2xl mr-3">🕊️</div>
              <div>
                <h4 className="font-medium text-gray-800">Existential/Spiritual</h4>
                <p className="text-sm text-gray-600">Spiritual smart</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg">
              <div className="text-2xl mr-3">🧩</div>
              <div>
                <h4 className="font-medium text-gray-800">Spatial</h4>
                <p className="text-sm text-gray-600">Picture smart</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onStartTest}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform hover:scale-105 shadow-lg"
          >
            Start the Test
          </button>
        </div>
      </div>
    </div>
  )
}
