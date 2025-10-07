-- Update response storage schema to store all answers as a single object
-- Run this in Supabase SQL Editor

-- 1. Drop the existing question_responses table (if it exists)
DROP TABLE IF EXISTS question_responses CASCADE;

-- 2. Create new responses table with simplified schema
CREATE TABLE IF NOT EXISTS responses (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    answers JSONB NOT NULL, -- Store all answers as a single JSON object
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_responses_user_id ON responses(user_id);
CREATE INDEX IF NOT EXISTS idx_responses_created_at ON responses(created_at);

-- 4. Enable RLS on responses table
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for responses
DROP POLICY IF EXISTS "Users can read own responses" ON responses;
CREATE POLICY "Users can read own responses" 
ON responses FOR SELECT 
USING (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can insert own responses" ON responses;
CREATE POLICY "Users can insert own responses" 
ON responses FOR INSERT 
WITH CHECK (auth.uid()::text = user_id);

DROP POLICY IF EXISTS "Users can update own responses" ON responses;
CREATE POLICY "Users can update own responses" 
ON responses FOR UPDATE 
USING (auth.uid()::text = user_id);

-- 6. Verify the schema
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'responses'
ORDER BY ordinal_position;
