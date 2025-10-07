-- Complete database schema fix
-- Run this in your Supabase SQL Editor

-- 1. First, let's check the current test_results table structure
-- Add missing columns to test_results table
ALTER TABLE test_results 
ADD COLUMN IF NOT EXISTS results JSONB,
ADD COLUMN IF NOT EXISTS enhanced_results JSONB,
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS answers JSONB;

-- 2. Create question_responses table
CREATE TABLE IF NOT EXISTS question_responses (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    answer INTEGER NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_question_responses_user_id ON question_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_question_responses_question_id ON question_responses(question_id);
CREATE INDEX IF NOT EXISTS idx_question_responses_category ON question_responses(category);

-- 4. Enable Row Level Security for question_responses
ALTER TABLE question_responses ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for question_responses
DROP POLICY IF EXISTS "Users can read own question responses" ON question_responses;
CREATE POLICY "Users can read own question responses" ON question_responses 
FOR SELECT USING (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can insert own question responses" ON question_responses;
CREATE POLICY "Users can insert own question responses" ON question_responses 
FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- 6. Update existing test_results to handle new structure
UPDATE test_results 
SET results = '[]'::jsonb 
WHERE results IS NULL;

UPDATE test_results 
SET answers = '[]'::jsonb 
WHERE answers IS NULL;

-- 7. Verify the structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'test_results' 
ORDER BY ordinal_position;

SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'question_responses' 
ORDER BY ordinal_position;

COMMIT;
