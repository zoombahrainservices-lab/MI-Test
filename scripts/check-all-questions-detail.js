// Check all questions in detail including inactive ones
// Run this with: node scripts/check-all-questions-detail.js

async function checkAllQuestionsDetail() {
  try {
    console.log('🔍 Checking ALL questions in database (including inactive)...');
    
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
    
    // Check for questions without category
    const noCategory = questionsData.questions.filter(q => !q.category);
    if (noCategory.length > 0) {
      console.log(`\n⚠️  Questions without category: ${noCategory.length}`);
    }
    
    // Check for inactive questions
    const inactive = questionsData.questions.filter(q => !q.is_active);
    if (inactive.length > 0) {
      console.log(`\n⚠️  Inactive questions: ${inactive.length}`);
    }
    
    // Show total count
    console.log(`\n📈 Total questions in database: ${questionsData.questions.length}`);
    
    // Show last few questions
    console.log('\n📝 Last 5 questions:');
    questionsData.questions.slice(-5).forEach((q, index) => {
      const questionText = q.text || q.question || 'No text available';
      console.log(`  ${questionsData.questions.length - 4 + index}. ID: ${q.id}, Category: ${q.category}, Question: ${questionText.substring(0, 50)}...`);
    });
    
    console.log('\n✅ All questions are loaded from database!');
    
  } catch (error) {
    console.error('❌ Check failed:', error.message);
  }
}

checkAllQuestionsDetail();
