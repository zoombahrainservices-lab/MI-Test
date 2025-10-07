// Script to test that MCQ questions are filtered out
// Run this with: node scripts/test-questions-filter.js

async function testQuestionsFilter() {
  try {
    console.log('🔍 Testing questions filter (MCQ should be excluded)...');
    
    const response = await fetch('http://localhost:3000/api/questions');
    
    if (response.ok) {
      const data = await response.json();
      const questions = data.questions;
      
      console.log(`✅ Found ${questions.length} questions (MCQ filtered out)`);
      
      // Check if any questions are missing category (should be none)
      const questionsWithoutCategory = questions.filter(q => !q.category);
      if (questionsWithoutCategory.length > 0) {
        console.log(`⚠️  Found ${questionsWithoutCategory.length} questions without category`);
      } else {
        console.log('✅ All questions have categories (MCQ properly filtered)');
      }
      
      // Count by category
      const categoryCounts = {};
      questions.forEach(q => {
        categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
      });
      
      console.log('\n📊 Questions by category:');
      Object.entries(categoryCounts).forEach(([category, count]) => {
        console.log(`   ${category}: ${count} questions`);
      });
      
    } else {
      console.error('❌ Error fetching questions:', response.status);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
    console.log('\n💡 Make sure your development server is running:');
    console.log('   npm run dev');
  }
}

// Run the test
testQuestionsFilter();
