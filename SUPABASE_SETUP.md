# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `mi-test-website`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
6. Click "Create new project"

## 2. Get Your Supabase Credentials

Once your project is created, go to **Settings** → **API**:

### Database URL
- Go to **Settings** → **Database**
- Copy the **Connection string** under "Connection parameters"
- It should look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### API Keys
- **Project URL**: `https://[YOUR-PROJECT-REF].supabase.co`
- **Anon Key**: Public key for client-side operations
- **Service Role Key**: Secret key for server-side operations

## 3. Create .env File

Create a `.env` file in your project root with the following content:

```env
# Supabase Database
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# JWT Secret (change this in production)
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

**Replace the following placeholders:**
- `[YOUR-PASSWORD]` - Your database password
- `[YOUR-PROJECT-REF]` - Your project reference ID
- `[YOUR-ANON-KEY]` - Your anon key from Supabase
- `[YOUR-SERVICE-ROLE-KEY]` - Your service role key from Supabase

## 4. Set Up the Database

Run the following commands to set up your database:

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema to Supabase
npm run db:push

# Seed the database with questions
npm run db:seed
```

## 5. Verify Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

3. Check your Supabase dashboard to see the tables created

## 6. Optional: Enable Row Level Security (RLS)

In your Supabase dashboard:

1. Go to **Authentication** → **Policies**
2. Enable RLS on your tables:
   - `users`
   - `test_results`
   - `questions`
   - `analytics`

3. Create policies to secure your data

## 7. Database Schema

Your database will have the following tables:

- **users** - User accounts and authentication
- **test_results** - Test answers and calculated scores
- **questions** - Test questions (24 questions)
- **analytics** - Daily statistics and metrics

## Troubleshooting

### Connection Issues
- Verify your DATABASE_URL is correct
- Check that your Supabase project is active
- Ensure your IP is not blocked (check Supabase dashboard)

### Migration Issues
- Make sure you're using the correct database password
- Check that the project reference ID is correct
- Verify your Supabase project is fully initialized

### API Issues
- Ensure your API keys are correct
- Check that your environment variables are loaded
- Verify your Supabase project settings

## Production Deployment

For production:

1. Create a new Supabase project for production
2. Update your environment variables
3. Run migrations: `npm run db:push`
4. Seed production database: `npm run db:seed`
5. Update your JWT_SECRET to a secure random string
