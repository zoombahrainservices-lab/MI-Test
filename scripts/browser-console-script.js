// Browser Console Script to Add Questions
// Run this in your browser console while on the admin questions page

const questions = [
  { text: "I value depth and complexity in my areas of interest or expertise", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I can be detached when analyzing situations or problems", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often look for underlying principles or patterns to understand how things work", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "My happiness is closely linked to the well-being of the people I care about", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am often approached by people who seek comfort or advice", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Helping others makes me feel valued and fulfilled", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Being appreciated for my contributions is important to me", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Setting and achieving goals is a fundamental part of how I define success", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am driven by my ambition and the desire to be successful", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I enjoy being recognized for my accomplishments", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Privacy and time alone to think are essential to me", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am more interested in ideas and concepts than in social interaction", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am vigilant about potential risks and always plan for contingencies", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I seek security and stability in my environment and relationships", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am loyal and committed, especially to those I trust", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Before making decisions, I consider all the possible outcomes and risks", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I prefer clear guidelines and expectations to feel secure in my role", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I sometimes hesitate to take action due to fear of making the wrong choice", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I value predictability and routine as they provide a sense of stability", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often seek advice or reassurance from others before proceeding", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I embrace change and adapt easily to new situations", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often seek out new and exciting experiences to keep life interesting", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Routine tasks are an opportunity for me to find creative ways to engage", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I quickly become bored with the status quo and look for ways to innovate", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Planning too far ahead feels restrictive to me; I prefer spontaneity", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am optimistic and can usually find the silver lining in difficult situations", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I thrive in environments that allow me freedom and the ability to choose", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am skilled at thinking on my feet and making the best of unexpected changes", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "New ideas and projects excite me more than the implementation or follow-through", category: "Musical & Creative", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I prefer to keep my options open rather than commit to one course of action", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Exploring and experiencing the world is a top priority for me", category: "Naturalistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I take charge of situations and am confident in making decisions", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am assertive in expressing my opinions and taking a stand", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Protecting those I care about is just as important as standing up for myself", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am not afraid of confrontation and will face conflicts head-on", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I naturally take on leadership roles in group settings", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "Injustice or unfairness prompts me to action; I must speak up", category: "Existential/Spiritual", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I respect strength in others and am drawn to people who are also assertive", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am self-reliant and prefer to depend on my own abilities", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am comfortable with power and using it to effect change", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
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
  { text: "I value a calm and tranquil environment where conflicts are minimal", category: "Intrapersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am willing to compromise my own preferences for the sake of group harmony", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "It's important for me that conflicts are resolved amicably and without resentment", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I sometimes downplay my own needs to keep peace in my relationships", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I approach disagreements with the goal of finding a solution that satisfies everyone", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I believe maintaining a relationship is more important than winning an argument", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I actively look for ways to support and encourage others", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "It's important to me that others see me as helpful and kind", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often offer help before being asked", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "My own mood is affected by the emotional states of those around me", category: "Interpersonal", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I enjoy expressing my ideas clearly in writing or speech", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I pay attention to the words I use to ensure they are accurate", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am motivated to persuade or inspire others through language", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I enjoy reading or learning new ways to communicate effectively", category: "Linguistic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I enjoy identifying patterns and predicting outcomes before taking action", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I like breaking problems into smaller steps to find the best solution", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often analyze situations from multiple angles before making decisions", category: "Logical-Mathematical", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I feel comfortable learning by doing rather than only observing", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I often use physical activity to think through ideas or problems", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am skilled at adapting my actions to achieve practical results", category: "Bodily-Kinesthetic", difficulty: "easy", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] }
];

// Function to add questions via the admin API
async function addQuestions() {
  console.log('🚀 Starting to add questions...');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    try {
      const response = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: question.text,
          category: question.category,
          difficulty: question.difficulty,
          options: question.options
        })
      });
      
      if (response.ok) {
        successCount++;
        console.log(`✅ Added question ${i + 1}/${questions.length}: ${question.text.substring(0, 50)}...`);
      } else {
        errorCount++;
        const errorData = await response.text();
        console.log(`❌ Failed to add question ${i + 1}: ${errorData}`);
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      errorCount++;
      console.log(`❌ Error adding question ${i + 1}: ${error.message}`);
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`✅ Successfully added: ${successCount} questions`);
  console.log(`❌ Failed to add: ${errorCount} questions`);
  
  if (successCount > 0) {
    console.log('🎉 Questions update completed!');
    console.log('🔄 Please refresh your admin panel to see the new questions.');
  }
}

// Run the function
addQuestions();

