// Check the structure of questions in database
// Run this with: node scripts/check-question-structure.js

async function checkQuestionStructure() {
  try {
    console.log('🔍 Checking question structure...');
    
    const questionsResponse = await fetch('http://localhost:3000/api/questions');
    const questionsData = await questionsResponse.json();
    
    console.log(`✅ Questions loaded: ${questionsData.questions.length}`);
    
    if (questionsData.questions.length > 0) {
      const firstQuestion = questionsData.questions[0];
      console.log('\n📝 First question structure:');
      console.log(JSON.stringify(firstQuestion, null, 2));
      
      console.log('\n📊 Available fields:');
      Object.keys(firstQuestion).forEach(key => {
        console.log(`  ${key}: ${typeof firstQuestion[key]}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Check failed:', error.message);
  }
}

checkQuestionStructure();
