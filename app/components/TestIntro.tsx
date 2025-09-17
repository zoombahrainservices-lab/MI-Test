interface TestIntroProps {
  onStartTest: () => void
}

export default function TestIntro({ onStartTest }: TestIntroProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to the Multiple Intelligence Assessment
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Based on Howard Gardner's theory of multiple intelligences, this test will help you 
            discover your unique cognitive strengths across eight different areas of intelligence.
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
            <li>• 30 carefully crafted questions (10 Easy + 10 Medium + 10 Hard)</li>
            <li>• Progressive timing: Easy (60s), Medium (30s), Hard (15s) per question</li>
            <li>• Progressive difficulty levels</li>
            <li>• No right or wrong answers</li>
            <li>• Comprehensive results for all three levels</li>
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

        <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Timer Warning:</strong> Each question has a time limit! If you run out of time, you'll see a timeout message with options to retry or return home. 
                The timer gets shorter as difficulty increases: Easy (60s) → Medium (30s) → Hard (15s).
              </p>
            </div>
          </div>
        </div>

        {/* Progressive Difficulty System */}
        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-purple-800 mb-3">Progressive Difficulty System</h3>
          <p className="text-gray-600 mb-4">
            The test follows a progressive structure to provide comprehensive insights:
          </p>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-white rounded-lg border-l-4 border-green-500">
              <div className="text-2xl mr-3">🟢</div>
              <div>
                <h4 className="font-medium text-gray-800">Level 1: Easy Questions (1-10)</h4>
                <p className="text-sm text-gray-600">Start with straightforward questions - 60 seconds per question</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg border-l-4 border-yellow-500">
              <div className="text-2xl mr-3">🟡</div>
              <div>
                <h4 className="font-medium text-gray-800">Level 2: Medium Questions (11-20)</h4>
                <p className="text-sm text-gray-600">Progress to more complex scenarios - 30 seconds per question</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg border-l-4 border-red-500">
              <div className="text-2xl mr-3">🔴</div>
              <div>
                <h4 className="font-medium text-gray-800">Level 3: Hard Questions (21-30)</h4>
                <p className="text-sm text-gray-600">Tackle the most complex scenarios - 15 seconds per question</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg border-l-4 border-blue-500">
              <div className="text-2xl mr-3">📊</div>
              <div>
                <h4 className="font-medium text-gray-800">Comprehensive Results</h4>
                <p className="text-sm text-gray-600">Get detailed scores for all three difficulty levels</p>
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
