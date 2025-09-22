import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables from .env file
config()

// Initialize Supabase client with hardcoded URL (same as lib/supabase.ts)
const supabaseUrl = 'https://xfsakpxluorfhumjopgp.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY environment variable is required')
  console.log('Please set SUPABASE_SERVICE_ROLE_KEY in your environment or .env file')
  console.log('You can get this key from your Supabase Dashboard → Settings → API')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// All questions from your list, organized by intelligence types
const allQuestions = [
  // Logical-Mathematical Intelligence (Perfectionist/Detail-Oriented)
  { text: "I can become critical of myself or others when mistakes are made", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Ensuring that every detail is correct before completing a task is important to me", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often find ways to improve methods that are already considered efficient", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "When given feedback, I focus on the details to understand how to improve", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "My work environment is organized, and everything has a specific place", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am often the person who others rely on to find and fix mistakes", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I constantly look for ways to improve my efficiency and productivity", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I adapt my approach if it means accomplishing a goal more effectively", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I prefer to observe and analyze before getting involved in a situation", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I collect and analyze data to make informed decisions", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I enjoy solving complex problems with thorough analysis and research", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am cautious about sharing my insights until I have fully examined an issue", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I value depth and complexity in my areas of interest or expertise", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I can be detached when analyzing situations or problems", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often look for underlying principles or patterns to understand how things work", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Before making decisions, I consider all the possible outcomes and risks", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },

  // Interpersonal Intelligence (People Smart)
  { text: "I naturally sense when someone needs emotional support", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I take active steps to help others without expecting anything in return", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Making sure others feel cared for is a priority in my relationships", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I find it easy to build and maintain close, personal relationships", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often put the needs of others before my own", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am comfortable expressing affection and care towards others", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "My happiness is closely linked to the well-being of the people I care about", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am often approached by people who seek comfort or advice", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Helping others makes me feel valued and fulfilled", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often seek advice or reassurance from others before proceeding", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am loyal and committed, especially to those I trust", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I strive to maintain harmony in my relationships and environment", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often see multiple sides of an issue and try to mediate disagreements", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Avoiding tension and conflict is often more comfortable for me than addressing problems", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I work to ensure that everyone feels heard and included in discussions", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am good at helping others find common ground and compromise", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Peaceful resolutions are more important to me than winning an argument", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am often the peacemaker in my group of friends or at work", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I prefer to listen and understand all viewpoints before expressing my own", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I find it challenging to make decisions when there is a potential for conflict", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often go with the flow to avoid rocking the boat", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am willing to compromise my own preferences for the sake of group harmony", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "It's important for me that conflicts are resolved amicably and without resentment", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I sometimes downplay my own needs to keep peace in my relationships", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I approach disagreements with the goal of finding a solution that satisfies everyone", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I believe maintaining a relationship is more important than winning an argument", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I actively look for ways to support and encourage others", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "It's important to me that others see me as helpful and kind", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often offer help before being asked", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "My own mood is affected by the emotional states of those around me", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },

  // Intrapersonal Intelligence (Self Smart)
  { text: "I feel a strong sense of responsibility to correct inaccuracies for the benefit of others", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Being seen as successful by my peers is an important motivator for me", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I actively create and pursue new goals once current ones are achieved", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Being appreciated for my contributions is important to me", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Setting and achieving goals is a fundamental part of how I define success", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am driven by my ambition and the desire to be successful", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I enjoy being recognized for my accomplishments", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Privacy and time alone to think are essential to me", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am more interested in ideas and concepts than in social interaction", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am vigilant about potential risks and always plan for contingencies", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I seek security and stability in my environment and relationships", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I prefer clear guidelines and expectations to feel secure in my role", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I sometimes hesitate to take action due to fear of making the wrong choice", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I value predictability and routine as they provide a sense of stability", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am optimistic and can usually find the silver lining in difficult situations", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I thrive in environments that allow me freedom and the ability to choose", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I take charge of situations and am confident in making decisions", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am assertive in expressing my opinions and taking a stand", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am not afraid of confrontation and will face conflicts head-on", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I naturally take on leadership roles in group settings", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I respect strength in others and am drawn to people who are also assertive", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am self-reliant and prefer to depend on my own abilities", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am comfortable with power and using it to effect change", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I value a calm and tranquil environment where conflicts are minimal", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },

  // Musical & Creative Intelligence (Creative Smart)
  { text: "My creativity is often sparked by my emotional experiences", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I need to express my individuality in my work or artistic endeavors", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am drawn to aesthetics and surround myself with beauty that inspires me", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I feel most alive when I am creating something new and original", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "My personal style is a true reflection of my unique identity", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often find creative inspiration in places others might overlook", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am confident in my creative abilities and trust my unique vision", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I actively seek feedback to refine and enhance my creative projects", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Routine tasks are an opportunity for me to find creative ways to engage", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I quickly become bored with the status quo and look for ways to innovate", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "New ideas and projects excite me more than the implementation or follow-through", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },

  // Bodily-Kinesthetic Intelligence (Body Smart)
  { text: "I am adaptable and excel in a variety of tasks and roles", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I embrace change and adapt easily to new situations", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often seek out new and exciting experiences to keep life interesting", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Planning too far ahead feels restrictive to me; I prefer spontaneity", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am skilled at thinking on my feet and making the best of unexpected changes", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I prefer to keep my options open rather than commit to one course of action", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I feel comfortable learning by doing rather than only observing", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often use physical activity to think through ideas or problems", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am skilled at adapting my actions to achieve practical results", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },

  // Naturalistic Intelligence (Nature Smart)
  { text: "Exploring and experiencing the world is a top priority for me", category: "Naturalistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },

  // Existential/Spiritual Intelligence (Spiritual Smart)
  { text: "Injustice or unfairness prompts me to action; I must speak up", category: "Existential/Spiritual", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },

  // Linguistic Intelligence (Word Smart)
  { text: "I enjoy expressing my ideas clearly in writing or speech", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I pay attention to the words I use to ensure they are accurate", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am motivated to persuade or inspire others through language", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I enjoy reading or learning new ways to communicate effectively", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },

  // Spatial Intelligence (Picture Smart)
  { text: "I can easily visualize objects in 3D", category: "Spatial", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I can mentally rotate and manipulate 3D objects to solve spatial problems", category: "Spatial", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I can mentally manipulate complex 3D structures and predict how they would behave under various conditions", category: "Spatial", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I have a strong sense of direction and can navigate easily", category: "Spatial", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] }
]

// Fisher-Yates shuffle algorithm to randomize the order
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

async function addShuffledQuestions() {
  console.log('🔄 Starting shuffled questions database update...')
  console.log(`📊 Total questions to process: ${allQuestions.length}`)
  
  try {
    // Step 1: Clear all existing questions
    console.log('🗑️ Step 1: Clearing all existing questions...')
    const { error: deleteError } = await supabase
      .from('questions')
      .delete()
      .neq('id', 0) // Delete all rows
    
    if (deleteError) {
      console.error('❌ Error clearing questions:', deleteError)
      throw deleteError
    }
    
    console.log('✅ Successfully cleared all existing questions')
    
    // Step 2: Shuffle the questions
    console.log('🔀 Step 2: Shuffling questions to randomize order...')
    const shuffledQuestions = shuffleArray(allQuestions)
    console.log('✅ Questions shuffled successfully')
    
    // Step 3: Add shuffled questions with sequential IDs
    console.log('📝 Step 3: Adding shuffled questions to database...')
    const questionsWithIds = shuffledQuestions.map((question, index) => ({
      id: index + 1,
      text: question.text,
      category: question.category,
      difficulty: question.difficulty,
      options: question.options,
      is_active: true
    }))
    
    const { data, error } = await supabase
      .from('questions')
      .insert(questionsWithIds)
      .select()
    
    if (error) {
      console.error('❌ Error inserting questions:', error)
      throw error
    }
    
    console.log(`✅ Successfully inserted ${data?.length || questionsWithIds.length} shuffled questions`)
    
    // Step 4: Verify the count and show sample
    console.log('🔍 Step 4: Verifying questions in database...')
    const { data: verifyData, error: verifyError } = await supabase
      .from('questions')
      .select('*')
      .order('id', { ascending: true })
    
    if (verifyError) {
      console.error('❌ Error verifying questions:', verifyError)
      throw verifyError
    }
    
    const questionCount = verifyData?.length || 0
    console.log(`📊 Total questions in database: ${questionCount}`)
    
    if (questionCount === allQuestions.length) {
      console.log('🎉 SUCCESS! Database now contains all shuffled questions')
      console.log('')
      console.log('📋 First 10 questions in shuffled order:')
      verifyData?.slice(0, 10).forEach((q, index) => {
        console.log(`${index + 1}. [${q.category || 'Unknown'}] ${(q.text || 'No text').substring(0, 60)}...`)
      })
      console.log('')
      console.log('📊 Question Distribution:')
      const categoryCounts = verifyData?.reduce((acc, q) => {
        const category = q.category || 'Unknown'
        acc[category] = (acc[category] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      Object.entries(categoryCounts || {}).forEach(([category, count]) => {
        console.log(`• ${category}: ${count} questions`)
      })
      console.log('')
      console.log('✅ Shuffled questions added successfully!')
      console.log('🔄 You can now refresh your admin panel and discover page to see the shuffled questions.')
    } else {
      console.log(`⚠️  WARNING: Expected ${allQuestions.length} questions, but found ${questionCount}`)
    }
    
  } catch (error) {
    console.error('❌ Database update failed:', error)
    process.exit(1)
  }
}

// Run the update
addShuffledQuestions()
