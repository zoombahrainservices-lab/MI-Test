export interface Question {
  id: number
  text: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  options: string[]
  is_active?: boolean
  created_at?: string
  updated_at?: string
}

// Questions are now fetched from the database via /api/questions
// This file only contains the interface definition
