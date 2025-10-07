// Script to verify questions in database
// Run this with: node scripts/verify-questions.js

async function verifyQuestions() {
  try {
    console.log('🔍 Checking questions in database...');
    
    const response = await fetch('http://localhost:3000/api/questions');
    
    if (response.ok) {
      const data = await response.json();
      const questions = data.questions;
      
      console.log(`✅ Found ${questions.length} questions in database`);
      
      // Count by category
      const categoryCounts = {};
      questions.forEach(q => {
        categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
      });
      
      console.log('\n📊 Questions by category:');
      Object.entries(categoryCounts).forEach(([category, count]) => {
        console.log(`   ${category}: ${count} questions`);
      });
      
      console.log('\n📝 Sample questions:');
      questions.slice(0, 3).forEach((q, index) => {
        console.log(`   ${index + 1}. [${q.category}] ${q.text.substring(0, 50)}...`);
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

// Run the verification
verifyQuestions();
