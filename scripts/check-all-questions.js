// Check how many questions are in the database
// Run this with: node scripts/check-all-questions.js

async function checkAllQuestions() {
  try {
    console.log('🔍 Checking all questions in database...');
    
    // Test questions API - should return all questions
    console.log('\n1. Testing questions API...');
    const questionsResponse = await fetch('http://localhost:3000/api/questions');
    if (!questionsResponse.ok) {
      console.log('❌ Questions API failed:', questionsResponse.status);
      return;
    }
    
    const questionsData = await questionsResponse.json();
    console.log(`✅ Questions loaded: ${questionsData.questions.length}`);
    
    // Show question categories
    const categories = {};
    questionsData.questions.forEach(q => {
      categories[q.category] = (categories[q.category] || 0) + 1;
    });
    
    console.log('\n📊 Questions by category:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} questions`);
    });
    
    // Show first few questions
    console.log('\n📝 First 5 questions:');
    questionsData.questions.slice(0, 5).forEach((q, index) => {
      const questionText = q.text || q.question || 'No text available';
      console.log(`  ${index + 1}. ID: ${q.id}, Category: ${q.category}, Question: ${questionText.substring(0, 50)}...`);
    });
    
    console.log('\n✅ All questions are loaded from database!');
    
  } catch (error) {
    console.error('❌ Check failed:', error.message);
  }
}

checkAllQuestions();
