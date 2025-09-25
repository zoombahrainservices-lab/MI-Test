'use client'

import { useEffect, useState } from 'react'

interface MCQQuestion {
  id: number
  text: string
  options: string[]
  correctAnswers: number[]
  explanation?: string | null
  difficulty: 'easy' | 'medium' | 'hard'
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export default function MCQQuestionsPage() {
  const [questions, setQuestions] = useState<MCQQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<MCQQuestion | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/admin/mcq-questions?page=${page}&limit=10`)
        const data = await res.json()
        setQuestions(data.questions || [])
        setTotalPages(data.pagination?.totalPages || 1)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [page])

  const onSave = async (q: Partial<MCQQuestion>) => {
    if (editing) {
      await fetch('/api/admin/mcq-questions', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, ...q }) })
    } else {
      await fetch('/api/admin/mcq-questions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(q) })
    }
    setShowModal(false)
    setEditing(null)
    // refresh
    const res = await fetch(`/api/admin/mcq-questions?page=${page}&limit=10`)
    const data = await res.json()
    setQuestions(data.questions || [])
    setTotalPages(data.pagination?.totalPages || 1)
  }

  const onDelete = async (id: number) => {
    if (!confirm('Delete this question?')) return
    await fetch(`/api/admin/mcq-questions?id=${id}`, { method: 'DELETE' })
    const res = await fetch(`/api/admin/mcq-questions?page=${page}&limit=10`)
    const data = await res.json()
    setQuestions(data.questions || [])
    setTotalPages(data.pagination?.totalPages || 1)
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
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">MCQ Questions</h1>
          <p className="mt-2 text-sm text-gray-700">Create knowledge questions with one or more correct answers.</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button onClick={() => { setEditing(null); setShowModal(true) }} className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Add MCQ</button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {questions.map(q => (
            <li key={q.id} className="p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${q.difficulty === 'easy' ? 'bg-green-100 text-green-800' : q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{q.difficulty}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${q.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{q.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-2">{q.text}</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    {q.options.map((opt, idx) => (
                      <div key={idx}>
                        <span className="font-semibold mr-2">{String.fromCharCode(97 + idx)})</span>
                        <span className={q.correctAnswers.includes(idx) ? 'text-green-700 font-semibold' : ''}>{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ml-4 space-x-2">
                  <button onClick={() => { setEditing(q); setShowModal(true) }} className="text-blue-600 hover:text-blue-900 text-sm font-medium">Edit</button>
                  <button onClick={() => onDelete(q.id)} className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-3 py-1 text-sm rounded border disabled:opacity-50">Previous</button>
            <div className="text-sm">Page {page} of {totalPages}</div>
            <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="px-3 py-1 text-sm rounded border disabled:opacity-50">Next</button>
          </div>
        )}
      </div>

      {showModal && (
        <MCQModal
          question={editing}
          onClose={() => { setShowModal(false); setEditing(null) }}
          onSave={onSave}
        />
      )}
    </div>
  )
}

function MCQModal({ question, onClose, onSave }: { question: MCQQuestion | null, onClose: () => void, onSave: (q: Partial<MCQQuestion>) => void }) {
  const [text, setText] = useState<string>(question?.text || '')
  const [options, setOptions] = useState<string[]>(question?.options || ['','', '', ''])
  const [correctAnswers, setCorrectAnswers] = useState<number[]>(question?.correctAnswers || [])
  const [explanation, setExplanation] = useState<string>(question?.explanation || '')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(question?.difficulty || 'easy')
  const [isActive, setIsActive] = useState<boolean>(question?.isActive ?? true)

  const toggleCorrect = (idx: number) => {
    setCorrectAnswers(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx])
  }

  const updateOption = (idx: number, value: string) => {
    const next = [...options]
    next[idx] = value
    setOptions(next)
  }

  const addOption = () => setOptions(prev => [...prev, ''])
  const removeOption = (idx: number) => setOptions(prev => prev.filter((_, i) => i !== idx))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ text, options, correctAnswers, explanation, difficulty, isActive })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <form onSubmit={submit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 space-y-4">
              <h3 className="text-lg font-medium">{question ? 'Edit MCQ' : 'Add MCQ'}</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Question</label>
                <textarea value={text} onChange={e => setText(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Options</label>
                <div className="space-y-2">
                  {options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input type="checkbox" checked={correctAnswers.includes(idx)} onChange={() => toggleCorrect(idx)} title="Correct answer" />
                      <input value={opt} onChange={e => updateOption(idx, e.target.value)} className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder={`Option ${idx + 1}`} required />
                      {options.length > 2 && (
                        <button type="button" onClick={() => removeOption(idx)} className="text-red-600 text-sm">Remove</button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addOption} className="text-blue-600 text-sm">+ Add option</button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Tick the checkbox next to each correct answer. Supports multiple correct answers.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                  <select value={difficulty} onChange={e => setDifficulty(e.target.value as any)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Explanation (optional)</label>
                  <input value={explanation || ''} onChange={e => setExplanation(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Why this answer is correct" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
                <span className="text-sm">Active</span>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit" className="w-full inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto">{question ? 'Update' : 'Create'}</button>
              <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


