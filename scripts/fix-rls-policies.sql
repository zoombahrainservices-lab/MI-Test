-- Fix RLS policies for user registration
-- Run this in Supabase SQL Editor

-- 1. Enable RLS on users table (if not already enabled)
ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

-- 2. Create policy to allow user registration
CREATE POLICY "Allow user registration" ON "public"."users"
FOR INSERT WITH CHECK (true);

-- 3. Create policy to allow users to read their own data
CREATE POLICY "Users can read own data" ON "public"."users"
FOR SELECT USING (auth.uid()::text = id::text);

-- 4. Create policy to allow users to update their own data
CREATE POLICY "Users can update own data" ON "public"."users"
FOR UPDATE USING (auth.uid()::text = id::text);

-- 5. Create policy to allow users to delete their own data
CREATE POLICY "Users can delete own data" ON "public"."users"
FOR DELETE USING (auth.uid()::text = id::text);

-- 6. Alternative: If you want to allow all operations for now (for testing)
-- DROP POLICY IF EXISTS "Allow user registration" ON "public"."users";
-- CREATE POLICY "Allow all operations" ON "public"."users"
-- FOR ALL USING (true) WITH CHECK (true);
