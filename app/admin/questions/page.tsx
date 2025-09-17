'use client'

import { useState, useEffect } from 'react'

interface Question {
  id: number
  text: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  options: string[]
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)

  const categories = [
    'Linguistic',
    'Logical-Mathematical', 
    'Spatial',
    'Musical',
    'Bodily-Kinesthetic',
    'Interpersonal',
    'Intrapersonal',
    'Naturalist'
  ]

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/admin/questions')
        if (!response.ok) {
          throw new Error('Failed to fetch questions')
        }
        const data = await response.json()
        setQuestions(data.questions || [])
      } catch (error) {
        console.error('Error loading questions:', error)
        // Set empty array on error
        setQuestions([])
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [])

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || question.category === categoryFilter
    const matchesDifficulty = difficultyFilter === 'all' || question.difficulty === difficultyFilter
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const handleToggleActive = async (questionId: number) => {
    try {
      const question = questions.find(q => q.id === questionId)
      if (!question) return

      const newStatus = question.isActive ? 'inactive' : 'active'
      
      const response = await fetch('/api/admin/questions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: questionId,
          text: question.text,
          category: question.category,
          difficulty: question.difficulty,
          options: question.options,
          status: newStatus
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to update question status')
      }
      
      // Update local state
      setQuestions(questions.map(q => 
        q.id === questionId ? { ...q, isActive: !q.isActive } : q
      ))
    } catch (error) {
      console.error('Error updating question status:', error)
      alert('Failed to update question status. Please try again.')
    }
  }

  const handleDeleteQuestion = async (questionId: number) => {
    if (confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/admin/questions?id=${questionId}`, {
          method: 'DELETE'
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete question')
        }
        
        // Remove from local state
        setQuestions(questions.filter(q => q.id !== questionId))
      } catch (error) {
        console.error('Error deleting question:', error)
        alert('Failed to delete question. Please try again.')
      }
    }
  }

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question)
    setShowAddModal(true)
  }

  const handleSaveQuestion = async (questionData: Partial<Question>) => {
    try {
      if (editingQuestion) {
        // Update existing question
        const response = await fetch('/api/admin/questions', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: editingQuestion.id,
            text: questionData.text,
            category: questionData.category,
            difficulty: questionData.difficulty,
            options: questionData.options
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to update question')
        }
        
        const data = await response.json()
        
        // Update local state
        setQuestions(questions.map(q => 
          q.id === editingQuestion.id ? data.question : q
        ))
      } else {
        // Add new question
        const response = await fetch('/api/admin/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: questionData.text,
            category: questionData.category,
            difficulty: questionData.difficulty,
            options: questionData.options
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to create question')
        }
        
        const data = await response.json()
        
        // Add to local state
        setQuestions([...questions, data.question])
      }
      
      setShowAddModal(false)
      setEditingQuestion(null)
    } catch (error) {
      console.error('Error saving question:', error)
      alert('Failed to save question. Please try again.')
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Questions</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage test questions and their categories.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <span className="mr-2">➕</span>
            Add Question
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search
            </label>
            <input
              type="text"
              id="search"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
              Difficulty
            </label>
            <select
              id="difficulty"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as any)}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Questions ({filteredQuestions.length})
          </h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {filteredQuestions.map((question) => (
            <li key={question.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {question.category}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${question.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {question.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      {question.text}
                    </p>
                    <div className="text-sm text-gray-500">
                      <p>Options: {question.options.join(', ')}</p>
                      <p>Created: {formatDate(question.createdAt)} | Updated: {formatDate(question.updatedAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleToggleActive(question.id)}
                      className={`text-xs px-2 py-1 rounded ${
                        question.isActive 
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {question.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleEditQuestion(question)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add/Edit Question Modal */}
      {showAddModal && (
        <QuestionModal
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onClose={() => {
            setShowAddModal(false)
            setEditingQuestion(null)
          }}
          categories={categories}
        />
      )}
    </div>
  )
}

// Question Modal Component
function QuestionModal({ 
  question, 
  onSave, 
  onClose, 
  categories 
}: { 
  question: Question | null
  onSave: (data: Partial<Question>) => void
  onClose: () => void
  categories: string[]
}) {
  const [formData, setFormData] = useState({
    text: question?.text || '',
    category: question?.category || 'Linguistic',
    difficulty: question?.difficulty || 'easy',
    options: question?.options || ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree']
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {question ? 'Edit Question' : 'Add New Question'}
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Question Text */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Question Text</label>
                      <textarea
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        rows={3}
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    {/* Difficulty */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    {/* Options */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Answer Options</label>
                      {formData.options.map((option, index) => (
                        <input
                          key={index}
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          required
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {question ? 'Update Question' : 'Add Question'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
