// Script to update questions via the admin API
// This approach uses the existing admin API instead of direct database access

const SUPABASE_URL = 'https://llydesdtudepdiebfzfk.supabase.co'

// All 100 questions from app/data/questions.ts
const questions = [
  { id: 1, text: "I can become critical of myself or others when mistakes are made", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 2, text: "Ensuring that every detail is correct before completing a task is important to me", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 3, text: "I often find ways to improve methods that are already considered efficient", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 4, text: "When given feedback, I focus on the details to understand how to improve", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 5, text: "My work environment is organized, and everything has a specific place", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 6, text: "I feel a strong sense of responsibility to correct inaccuracies for the benefit of others", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 7, text: "I am often the person who others rely on to find and fix mistakes", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 8, text: "I naturally sense when someone needs emotional support", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 9, text: "I take active steps to help others without expecting anything in return", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 10, text: "Making sure others feel cared for is a priority in my relationships", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 11, text: "I find it easy to build and maintain close, personal relationships", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 12, text: "I often put the needs of others before my own", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 13, text: "I am comfortable expressing affection and care towards others", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 14, text: "I am adaptable and excel in a variety of tasks and roles", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 15, text: "I constantly look for ways to improve my efficiency and productivity", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 16, text: "Being seen as successful by my peers is an important motivator for me", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 17, text: "I actively create and pursue new goals once current ones are achieved", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 18, text: "I adapt my approach if it means accomplishing a goal more effectively", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 19, text: "My creativity is often sparked by my emotional experiences", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 20, text: "I need to express my individuality in my work or artistic endeavors", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 21, text: "I am drawn to aesthetics and surround myself with beauty that inspires me", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 22, text: "I feel most alive when I am creating something new and original", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 23, text: "My personal style is a true reflection of my unique identity", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 24, text: "I often find creative inspiration in places others might overlook", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 25, text: "I am confident in my creative abilities and trust my unique vision", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 26, text: "I actively seek feedback to refine and enhance my creative projects", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 27, text: "I prefer to observe and analyze before getting involved in a situation", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 28, text: "I collect and analyze data to make informed decisions", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 29, text: "I enjoy solving complex problems with thorough analysis and research", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 30, text: "I am cautious about sharing my insights until I have fully examined an issue", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 31, text: "I value depth and complexity in my areas of interest or expertise", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 32, text: "I can be detached when analyzing situations or problems", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 33, text: "I often look for underlying principles or patterns to understand how things work", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 34, text: "My happiness is closely linked to the well-being of the people I care about", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 35, text: "I am often approached by people who seek comfort or advice", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 36, text: "Helping others makes me feel valued and fulfilled", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 37, text: "Being appreciated for my contributions is important to me", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 38, text: "Setting and achieving goals is a fundamental part of how I define success", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 39, text: "I am driven by my ambition and the desire to be successful", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 40, text: "I enjoy being recognized for my accomplishments", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 41, text: "Privacy and time alone to think are essential to me", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 42, text: "I am more interested in ideas and concepts than in social interaction", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 43, text: "I am vigilant about potential risks and always plan for contingencies", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 44, text: "I seek security and stability in my environment and relationships", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 45, text: "I am loyal and committed, especially to those I trust", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 46, text: "Before making decisions, I consider all the possible outcomes and risks", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 47, text: "I prefer clear guidelines and expectations to feel secure in my role", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 48, text: "I sometimes hesitate to take action due to fear of making the wrong choice", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 49, text: "I value predictability and routine as they provide a sense of stability", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 50, text: "I often seek advice or reassurance from others before proceeding", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 51, text: "I embrace change and adapt easily to new situations", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 52, text: "I often seek out new and exciting experiences to keep life interesting", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 53, text: "Routine tasks are an opportunity for me to find creative ways to engage", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 54, text: "I quickly become bored with the status quo and look for ways to innovate", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 55, text: "Planning too far ahead feels restrictive to me; I prefer spontaneity", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 56, text: "I am optimistic and can usually find the silver lining in difficult situations", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 57, text: "I thrive in environments that allow me freedom and the ability to choose", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 58, text: "I am skilled at thinking on my feet and making the best of unexpected changes", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 59, text: "New ideas and projects excite me more than the implementation or follow-through", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 60, text: "I prefer to keep my options open rather than commit to one course of action", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 61, text: "Exploring and experiencing the world is a top priority for me", category: "Naturalistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 62, text: "I take charge of situations and am confident in making decisions", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 63, text: "I am assertive in expressing my opinions and taking a stand", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 64, text: "Protecting those I care about is just as important as standing up for myself", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 65, text: "I am not afraid of confrontation and will face conflicts head-on", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 66, text: "I naturally take on leadership roles in group settings", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 67, text: "Injustice or unfairness prompts me to action; I must speak up", category: "Existential/Spiritual", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 68, text: "I respect strength in others and am drawn to people who are also assertive", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 69, text: "I am self-reliant and prefer to depend on my own abilities", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 70, text: "I am comfortable with power and using it to effect change", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 71, text: "I strive to maintain harmony in my relationships and environment", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 72, text: "I often see multiple sides of an issue and try to mediate disagreements", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 73, text: "Avoiding tension and conflict is often more comfortable for me than addressing problems", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 74, text: "I work to ensure that everyone feels heard and included in discussions", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 75, text: "I am good at helping others find common ground and compromise", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 76, text: "Peaceful resolutions are more important to me than winning an argument", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 77, text: "I am often the peacemaker in my group of friends or at work", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 78, text: "I prefer to listen and understand all viewpoints before expressing my own", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 79, text: "I find it challenging to make decisions when there is a potential for conflict", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 80, text: "I often go with the flow to avoid rocking the boat", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 81, text: "I value a calm and tranquil environment where conflicts are minimal", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 82, text: "I am willing to compromise my own preferences for the sake of group harmony", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 83, text: "It's important for me that conflicts are resolved amicably and without resentment", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 84, text: "I sometimes downplay my own needs to keep peace in my relationships", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 85, text: "I approach disagreements with the goal of finding a solution that satisfies everyone", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 86, text: "I believe maintaining a relationship is more important than winning an argument", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 87, text: "I actively look for ways to support and encourage others", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 88, text: "It's important to me that others see me as helpful and kind", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 89, text: "I often offer help before being asked", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 90, text: "My own mood is affected by the emotional states of those around me", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 91, text: "I enjoy expressing my ideas clearly in writing or speech", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 92, text: "I pay attention to the words I use to ensure they are accurate", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 93, text: "I am motivated to persuade or inspire others through language", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 94, text: "I enjoy reading or learning new ways to communicate effectively", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 95, text: "I enjoy identifying patterns and predicting outcomes before taking action", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 96, text: "I like breaking problems into smaller steps to find the best solution", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 97, text: "I often analyze situations from multiple angles before making decisions", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 98, text: "I feel comfortable learning by doing rather than only observing", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 99, text: "I often use physical activity to think through ideas or problems", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { id: 100, text: "I am skilled at adapting my actions to achieve practical results", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] }
]

async function updateQuestions() {
  console.log('🔄 Updating questions via admin API...')
  
  try {
    // First, let's check what's currently in the database
    console.log('📊 Checking current questions in database...')
    const checkResponse = await fetch('http://localhost:3000/api/questions')
    if (checkResponse.ok) {
      const checkData = await checkResponse.json()
      console.log(`📋 Current questions in database: ${checkData.questions?.length || 0}`)
    }

    console.log('⚠️  Note: This script requires the development server to be running')
    console.log('⚠️  Note: You need to be logged in as admin to use the admin API')
    console.log('⚠️  Note: This approach will add questions one by one via the admin API')
    
    console.log('🚀 Starting to add 100 questions...')
    
    let successCount = 0
    let errorCount = 0
    
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i]
      try {
        const response = await fetch('http://localhost:3000/api/admin/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Note: You'll need to add authentication headers here
            // 'Authorization': 'Bearer your-admin-token'
          },
          body: JSON.stringify({
            text: question.text,
            category: question.category,
            difficulty: question.difficulty,
            options: question.options
          })
        })
        
        if (response.ok) {
          successCount++
          console.log(`✅ Added question ${i + 1}/100: ${question.text.substring(0, 50)}...`)
        } else {
          errorCount++
          const errorData = await response.text()
          console.log(`❌ Failed to add question ${i + 1}: ${errorData}`)
        }
        
        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100))
        
      } catch (error) {
        errorCount++
        console.log(`❌ Error adding question ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
    
    console.log(`\n📊 Summary:`)
    console.log(`✅ Successfully added: ${successCount} questions`)
    console.log(`❌ Failed to add: ${errorCount} questions`)
    
    if (successCount > 0) {
      console.log('🎉 Questions update completed!')
      console.log('🔄 Please refresh your admin panel to see the new questions.')
    }
    
  } catch (error) {
    console.error('❌ Script failed:', error)
  }
}

// Run the update
updateQuestions()

