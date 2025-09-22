# Manual Questions Update Guide

## Why Admin Panel Shows Only 30 Questions

The admin panel is correctly fetching from the database, but the database still contains the old questions (around 24-30 questions from the original seed script). We need to update the database with all 100 questions.

## Solution Options

### Option 1: Use Admin Panel Interface (Recommended)

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Login as admin** and go to `/admin/questions`

3. **Delete existing questions**:
   - Go through each page and delete all existing questions
   - Or use the bulk delete feature if available

4. **Add new questions**:
   - Use the "Add Question" button
   - Add all 100 questions manually (this will take time but is safe)

### Option 2: Database Direct Access

If you have access to your Supabase dashboard:

1. **Go to Supabase Dashboard** → Your Project → Table Editor
2. **Select the `questions` table**
3. **Delete all existing rows**
4. **Import the 100 questions** (you can export from the script and import)

### Option 3: Environment Variable Setup

If you can get your Supabase service role key:

1. **Get your service role key** from Supabase Dashboard → Settings → API
2. **Set environment variable**:
   ```bash
   $env:SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
   ```
3. **Run the seeding script**:
   ```bash
   npx tsx scripts/seed-100-questions.ts
   ```

## Quick Fix: Add Missing Questions

Since you have 30 questions and need 100, you can:

1. **Keep the existing 30 questions**
2. **Add the remaining 70 questions** through the admin panel
3. **Use the questions from `app/data/questions.ts`** as reference

## Questions to Add (IDs 31-100)

Here are the questions you need to add (IDs 31-100):

```javascript
// Questions 31-100 to add
const additionalQuestions = [
  { text: "I value depth and complexity in my areas of interest or expertise", category: "Logical-Mathematical", difficulty: "easy" },
  { text: "I can be detached when analyzing situations or problems", category: "Logical-Mathematical", difficulty: "easy" },
  { text: "I often look for underlying principles or patterns to understand how things work", category: "Logical-Mathematical", difficulty: "easy" },
  { text: "My happiness is closely linked to the well-being of the people I care about", category: "Interpersonal", difficulty: "easy" },
  { text: "I am often approached by people who seek comfort or advice", category: "Interpersonal", difficulty: "easy" },
  { text: "Helping others makes me feel valued and fulfilled", category: "Interpersonal", difficulty: "easy" },
  { text: "Being appreciated for my contributions is important to me", category: "Intrapersonal", difficulty: "easy" },
  { text: "Setting and achieving goals is a fundamental part of how I define success", category: "Intrapersonal", difficulty: "easy" },
  { text: "I am driven by my ambition and the desire to be successful", category: "Intrapersonal", difficulty: "easy" },
  { text: "I enjoy being recognized for my accomplishments", category: "Intrapersonal", difficulty: "easy" },
  // ... (continue with all 100 questions from the data file)
]
```

## Verification

After adding questions:

1. **Check admin panel**: Should show 100 questions
2. **Check discover page**: Should load all 100 questions
3. **Test pagination**: Should show 25 pages (4 questions per page)

## Next Steps

1. Choose one of the options above
2. Update the database with all 100 questions
3. Verify both admin panel and discover page work correctly
4. Test the complete flow from start to finish

