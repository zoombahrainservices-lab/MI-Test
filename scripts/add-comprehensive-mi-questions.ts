import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://llydesdtudepdiebfzfk.supabase.co'
// Using the anon key for now - you'll need to replace this with your service role key
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxseWRlc2R0dWRlcGRpZWJmemZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTgzODQsImV4cCI6MjA3NTE3NDM4NH0.A8qjgiFYoygSxw7YCFkDU6jp7-bBzCUekOfc7LeN5Qk'

const supabase = createClient(supabaseUrl, supabaseKey)

interface Question {
  text: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  options: string[]
}

const questions: Question[] = [
  // Logical-Mathematical Intelligence
  {
    text: "I like to step back and study a situation before I get directly involved.",
    category: "logical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I gather facts and examine them carefully to reach sound conclusions.",
    category: "logical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I enjoy solving challenging problems that require deep thought and research.",
    category: "logical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I prefer to hold back my opinions until I've thoroughly checked the details.",
    category: "logical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I appreciate depth, precision, and complexity in the subjects I care about.",
    category: "logical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I can remain objective when evaluating problems or situations.",
    category: "logical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I often search for hidden rules or patterns that explain how things work.",
    category: "logical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },

  // Linguistic-Verbal Intelligence
  {
    text: "Recognition for my ideas and contributions matters to me.",
    category: "linguistic",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I actively welcome constructive feedback to sharpen and improve my work.",
    category: "linguistic",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },

  // Interpersonal Intelligence
  {
    text: "I can easily sense when someone needs care, support, or encouragement.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I often step in to help others without expecting anything in return.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "Making sure people feel valued and cared for is important in my relationships.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I naturally build and maintain strong, close connections with others.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I often put other people's needs ahead of my own.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I'm comfortable showing affection and expressing care toward people I value.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "My happiness is closely tied to the well-being of those around me.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "People often approach me to talk about their feelings or seek advice.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "Helping others gives me a sense of meaning and fulfillment.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I look for opportunities to support or encourage people whenever I can.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "It matters to me that others see me as kind and dependable.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I tend to offer help before someone even asks for it.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "My mood is often influenced by the emotional states of those around me.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },

  // Intrapersonal Intelligence
  {
    text: "I'm always looking for ways to be more efficient and effective.",
    category: "intrapersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "Recognition from my peers motivates me to keep striving for success.",
    category: "intrapersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I set fresh goals once I achieve the ones I've been working toward.",
    category: "intrapersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I adjust my approach if it helps me reach my goals faster or better.",
    category: "intrapersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "Achieving goals is central to how I define success for myself.",
    category: "intrapersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I am highly driven by ambition and personal achievement.",
    category: "intrapersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I feel proud when my accomplishments are acknowledged.",
    category: "intrapersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "Having privacy and time alone to reflect is important for me.",
    category: "intrapersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I'm more interested in ideas and concepts than in social activities.",
    category: "intrapersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },

  // Visual-Spatial Intelligence
  {
    text: "My creativity is often inspired by how I feel emotionally.",
    category: "spatial",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I like to show my individuality through my work and creative efforts.",
    category: "spatial",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I'm drawn to beauty and design, and I surround myself with things that inspire me.",
    category: "spatial",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I feel most alive when I'm creating something new and original.",
    category: "spatial",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "My style or creative expression reflects who I truly am.",
    category: "spatial",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I often notice creative details or inspiration in places others overlook.",
    category: "spatial",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I trust my creative instincts and feel confident in my artistic abilities.",
    category: "spatial",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I seek feedback on my creative work to make it even better.",
    category: "spatial",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },

  // Bodily-Kinesthetic Intelligence
  {
    text: "I can adapt quickly and perform well in many different tasks or roles.",
    category: "bodily",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "Even routine tasks feel engaging when I find creative ways to approach them.",
    category: "bodily",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I can think and respond effectively in the moment when unexpected things happen.",
    category: "bodily",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },

  // Musical-Rhythmic Intelligence
  {
    text: "I often notice rhythm, tone, or melody in everyday sounds.",
    category: "musical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "Music or rhythm helps me concentrate, remember things, or spark new ideas.",
    category: "musical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I enjoy expressing myself or organizing my work with a sense of flow or beat.",
    category: "musical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },

  // Naturalistic Intelligence
  {
    text: "I notice patterns and details in the environment that others often miss.",
    category: "naturalist",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I feel energized when working with nature, natural materials, or living systems.",
    category: "naturalist",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I can easily classify or organize things based on their natural qualities.",
    category: "naturalist",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },

  // Conscientiousness / Detail Orientation
  {
    text: "I can be critical of myself or others when I spot mistakes.",
    category: "logical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "Double-checking details before finishing a task is important to me.",
    category: "logical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I look for ways to make systems or methods more effective.",
    category: "logical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "When I receive feedback, I focus on the details to know how to improve.",
    category: "logical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I like my work environment organized, with everything in its place.",
    category: "logical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I feel responsible for correcting errors so the end result is accurate.",
    category: "logical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "People often rely on me to notice and fix small mistakes.",
    category: "logical",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },

  // Leadership / Assertiveness
  {
    text: "I naturally step forward to guide others and make decisions.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I speak my mind clearly and take a stand for my opinions.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "Standing up for people I care about matters as much as standing up for myself.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I'm comfortable facing conflict directly when necessary.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "In group settings, I often take on a leadership role without being asked.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I feel compelled to act when I see something unfair or unjust.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I respect strong individuals and enjoy working alongside them.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I like relying on my own abilities and being self-sufficient.",
    category: "intrapersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  },
  {
    text: "I'm comfortable using authority or influence to bring about positive change.",
    category: "interpersonal",
    difficulty: "medium",
    options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
  }
]

async function addQuestions() {
  try {
    console.log('Starting to add comprehensive MI questions...')
    
    // First, let's clear existing questions to avoid duplicates
    console.log('Clearing existing questions...')
    const { error: deleteError } = await supabase
      .from('questions')
      .delete()
      .neq('id', 0) // Delete all questions
    
    if (deleteError) {
      console.error('Error clearing questions:', deleteError)
    } else {
      console.log('Existing questions cleared successfully')
    }

    // Insert new questions
    console.log(`Adding ${questions.length} new questions...`)
    
    const { data, error } = await supabase
      .from('questions')
      .insert(questions)
      .select()

    if (error) {
      console.error('Error adding questions:', error)
      return
    }

    console.log(`Successfully added ${data?.length || 0} questions to the database!`)
    
    // Show summary by category
    const categoryCounts: Record<string, number> = {}
    questions.forEach(q => {
      categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1
    })
    
    console.log('\nQuestions added by category:')
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`- ${category}: ${count} questions`)
    })
    
    console.log('\nTotal questions in database:', questions.length)
    
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

// Run the script
addQuestions()
