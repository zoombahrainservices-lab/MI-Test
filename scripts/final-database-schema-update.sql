-- Final comprehensive database schema update
-- Run this in Supabase SQL Editor to fix all issues

-- 1. Add missing columns to test_results table
ALTER TABLE test_results 
ADD COLUMN IF NOT EXISTS results JSONB,
ADD COLUMN IF NOT EXISTS enhanced_results JSONB,
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS answers JSONB,
ADD COLUMN IF NOT EXISTS responses JSONB;

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

-- 3. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_question_responses_user_id ON question_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_question_responses_question_id ON question_responses(question_id);
CREATE INDEX IF NOT EXISTS idx_question_responses_category ON question_responses(category);

-- 4. Enable RLS on question_responses
ALTER TABLE question_responses ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for question_responses
CREATE POLICY IF NOT EXISTS "Users can read own question responses" 
ON question_responses FOR SELECT 
USING (auth.uid()::text = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own question responses" 
ON question_responses FOR INSERT 
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY IF NOT EXISTS "Users can update own question responses" 
ON question_responses FOR UPDATE 
USING (auth.uid()::text = user_id);

-- 6. Update existing test_results to have proper structure
UPDATE test_results 
SET 
    results = COALESCE(results, '[]'::jsonb),
    enhanced_results = COALESCE(enhanced_results, '{}'::jsonb),
    answers = COALESCE(answers, '[]'::jsonb),
    responses = COALESCE(responses, '[]'::jsonb)
WHERE results IS NULL OR enhanced_results IS NULL OR answers IS NULL OR responses IS NULL;

-- 7. Verify the schema
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name IN ('test_results', 'question_responses')
ORDER BY table_name, ordinal_position;
