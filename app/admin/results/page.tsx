'use client'

import { useState, useEffect } from 'react'

interface TestResult {
  id: string
  userEmail: string
  completedAt: string
  easyScore: number
  mediumScore: number
  hardScore: number
  totalTime: number
  intelligenceProfile: {
    category: string
    percentage: number
  }[]
}

export default function ResultsPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all')

  useEffect(() => {
    // Simulate loading results data
    const loadResults = async () => {
      setLoading(true)
      setTimeout(() => {
        setResults([
          {
            id: '1',
            userEmail: 'john.doe@example.com',
            completedAt: '2024-01-15T10:30:00Z',
            easyScore: 85,
            mediumScore: 78,
            hardScore: 72,
            totalTime: 1200,
            intelligenceProfile: [
              { category: 'Linguistic', percentage: 90 },
              { category: 'Logical-Mathematical', percentage: 85 },
              { category: 'Spatial', percentage: 70 }
            ]
          },
          {
            id: '2',
            userEmail: 'jane.smith@example.com',
            completedAt: '2024-01-15T09:15:00Z',
            easyScore: 72,
            mediumScore: 68,
            hardScore: 65,
            totalTime: 1350,
            intelligenceProfile: [
              { category: 'Interpersonal', percentage: 88 },
              { category: 'Intrapersonal', percentage: 82 },
              { category: 'Naturalist', percentage: 75 }
            ]
          }
        ])
        setLoading(false)
      }, 1000)
    }

    loadResults()
  }, [])

  const filteredResults = results.filter(result => {
    const matchesSearch = result.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    // Add date filtering logic here
    return matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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
          <h1 className="text-2xl font-bold text-gray-900">Test Results</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and analyze test results and intelligence profiles.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <span className="mr-2">📊</span>
            Export Results
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search
            </label>
            <input
              type="text"
              id="search"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Search by user email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date Range
            </label>
            <select
              id="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Test Results ({filteredResults.length})
          </h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {filteredResults.map((result) => (
            <li key={result.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="text-sm font-medium text-gray-900">{result.userEmail}</p>
                      <span className="text-sm text-gray-500">•</span>
                      <p className="text-sm text-gray-500">{formatDate(result.completedAt)}</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-2">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Easy Score</p>
                        <p className="text-sm font-medium text-green-600">{result.easyScore}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Medium Score</p>
                        <p className="text-sm font-medium text-yellow-600">{result.mediumScore}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Hard Score</p>
                        <p className="text-sm font-medium text-red-600">{result.hardScore}%</p>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">
                      <p>Total Time: {formatTime(result.totalTime)}</p>
                      <p>Top Intelligences: {result.intelligenceProfile.slice(0, 3).map(i => i.category).join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                      View Details
                    </button>
                    <button className="text-green-600 hover:text-green-900 text-sm font-medium">
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
