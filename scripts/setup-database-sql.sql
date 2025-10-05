-- Database Setup SQL for Supabase
-- Run this in your Supabase SQL Editor

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    password TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create test_results table
CREATE TABLE IF NOT EXISTS test_results (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    answers JSONB NOT NULL,
    linguistic_score INTEGER NOT NULL,
    logical_score INTEGER NOT NULL,
    spatial_score INTEGER NOT NULL,
    musical_score INTEGER NOT NULL,
    bodily_score INTEGER NOT NULL,
    interpersonal_score INTEGER NOT NULL,
    intrapersonal_score INTEGER NOT NULL,
    naturalist_score INTEGER NOT NULL,
    linguistic_percentage INTEGER NOT NULL,
    logical_percentage INTEGER NOT NULL,
    spatial_percentage INTEGER NOT NULL,
    musical_percentage INTEGER NOT NULL,
    bodily_percentage INTEGER NOT NULL,
    interpersonal_percentage INTEGER NOT NULL,
    intrapersonal_percentage INTEGER NOT NULL,
    naturalist_percentage INTEGER NOT NULL,
    top_intelligence TEXT NOT NULL,
    second_intelligence TEXT NOT NULL,
    third_intelligence TEXT NOT NULL,
    level TEXT DEFAULT 'combined',
    timing_data JSONB
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT DEFAULT 'easy',
    is_active BOOLEAN DEFAULT true,
    options JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mcq_questions table
CREATE TABLE IF NOT EXISTS mcq_questions (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answers JSONB NOT NULL,
    explanation TEXT,
    difficulty TEXT DEFAULT 'easy',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    total_tests INTEGER DEFAULT 0,
    total_users INTEGER DEFAULT 0,
    linguistic_count INTEGER DEFAULT 0,
    logical_count INTEGER DEFAULT 0,
    spatial_count INTEGER DEFAULT 0,
    musical_count INTEGER DEFAULT 0,
    bodily_count INTEGER DEFAULT 0,
    interpersonal_count INTEGER DEFAULT 0,
    intrapersonal_count INTEGER DEFAULT 0,
    naturalist_count INTEGER DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_test_results_user_id ON test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_mcq_questions_difficulty ON mcq_questions(difficulty);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcq_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies
-- Users can read and update their own data
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid()::text = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = id);

-- Users can read and insert their own test results
CREATE POLICY "Users can read own test results" ON test_results FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own test results" ON test_results FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Questions and MCQ questions are readable by everyone
CREATE POLICY "Questions are readable by everyone" ON questions FOR SELECT USING (true);
CREATE POLICY "MCQ questions are readable by everyone" ON mcq_questions FOR SELECT USING (true);

-- Analytics are readable by everyone (for public stats)
CREATE POLICY "Analytics are readable by everyone" ON analytics FOR SELECT USING (true);

-- Admins have full access (you'll need to configure this based on your admin system)
CREATE POLICY "Admins have full access" ON admins FOR ALL USING (true);

-- Insert sample data
INSERT INTO questions (text, category, options) VALUES
('I enjoy reading books and writing stories', 'linguistic', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I like solving puzzles and mathematical problems', 'logical', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I can easily visualize objects in 3D space', 'spatial', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I have a good sense of rhythm and enjoy music', 'musical', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I learn best through hands-on activities', 'bodily', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I work well with others in groups', 'interpersonal', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I prefer to work independently', 'intrapersonal', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]'),
('I enjoy spending time in nature', 'naturalist', '["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]');

-- Insert sample MCQ questions
INSERT INTO mcq_questions (text, options, correct_answers, explanation) VALUES
('What is the capital of France?', '["London", "Berlin", "Paris", "Madrid"]', '[2]', 'Paris is the capital city of France.'),
('Which planet is closest to the Sun?', '["Venus", "Mercury", "Earth", "Mars"]', '[1]', 'Mercury is the closest planet to the Sun in our solar system.'),
('What is 2 + 2?', '["3", "4", "5", "6"]', '[1]', '2 + 2 equals 4.');

-- Insert sample admin user (password is hashed for "admin123")
INSERT INTO admins (email, name, password) VALUES
('admin@example.com', 'Admin User', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

COMMIT;
