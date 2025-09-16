import { Question } from '../page'

interface TestQuestionsProps {
  questions: Question[]
  answers: Record<number, number>
  onAnswerChange: (questionId: number, answer: number) => void
  onSubmitTest: () => void
}

export default function TestQuestions({ 
  questions, 
  answers, 
  onAnswerChange, 
  onSubmitTest 
}: TestQuestionsProps) {
  const answeredQuestions = Object.keys(answers).length
  const totalQuestions = questions.length
  const progress = (answeredQuestions / totalQuestions) * 100

  const isTestComplete = answeredQuestions === totalQuestions

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progress: {answeredQuestions} of {totalQuestions} questions
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {questions.map((question, index) => (
            <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
                  {question.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-800">
                  {index + 1}. {question.text}
                </h3>
              </div>

              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      answers[question.id] === optionIndex
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={optionIndex}
                      checked={answers[question.id] === optionIndex}
                      onChange={() => onAnswerChange(question.id, optionIndex)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                      answers[question.id] === optionIndex
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[question.id] === optionIndex && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            onClick={onSubmitTest}
            disabled={!isTestComplete}
            className={`font-bold py-4 px-8 rounded-lg text-lg transition duration-200 transform ${
              isTestComplete
                ? 'bg-green-600 hover:bg-green-700 text-white hover:scale-105 shadow-lg cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isTestComplete ? 'View My Results' : `Complete ${totalQuestions - answeredQuestions} more questions`}
          </button>
        </div>
      </div>
    </div>
  )
}
