// Test the full assessment flow
// Run this with: node scripts/test-full-assessment.js

async function testFullAssessment() {
  try {
    console.log('🧠 Testing full assessment flow...');
    
    // 1. Test questions loading
    console.log('\n1. Testing questions API...');
    const questionsResponse = await fetch('http://localhost:3000/api/questions');
    if (questionsResponse.ok) {
      const questionsData = await questionsResponse.json();
      console.log(`✅ Questions loaded: ${questionsData.questions.length} questions`);
      
      // Show sample questions
      console.log('\n📝 Sample questions:');
      questionsData.questions.slice(0, 3).forEach((q, index) => {
        console.log(`   ${index + 1}. [${q.category}] ${q.text.substring(0, 50)}...`);
      });
    } else {
      console.log('❌ Questions API failed');
      return;
    }
    
    // 2. Test with a real user
    console.log('\n2. Testing with real user...');
    const usersResponse = await fetch('http://localhost:3000/api/users');
    if (usersResponse.ok) {
      const usersData = await usersResponse.json();
      if (usersData.users && usersData.users.length > 0) {
        const realUserId = usersData.users[0].id;
        console.log(`✅ Using real user: ${realUserId}`);
        
        // 3. Test assessment submission
        console.log('\n3. Testing assessment submission...');
        const testData = {
          userId: realUserId,
          responses: [
            { questionId: 1, answer: 4, category: 'logical', difficulty: 'medium' },
            { questionId: 2, answer: 3, category: 'linguistic', difficulty: 'medium' },
            { questionId: 3, answer: 5, category: 'interpersonal', difficulty: 'medium' }
          ],
          results: [
            { category: 'logical', score: 4, percentage: 80 },
            { category: 'linguistic', score: 3, percentage: 60 },
            { category: 'interpersonal', score: 5, percentage: 100 }
          ],
          enhancedResults: {
            topIntelligences: [
              { intelligence: 'interpersonal', percentage: 100, description: 'People smart' },
              { intelligence: 'logical', percentage: 80, description: 'Number smart' },
              { intelligence: 'linguistic', percentage: 60, description: 'Word smart' }
            ],
            quotients: [
              { name: 'IQ', percentage: 70, description: 'Analytical reasoning' },
              { name: 'EQ', percentage: 100, description: 'Emotional intelligence' }
            ],
            careerMatches: [
              { career: 'Teacher', matchPercentage: 95, description: 'Educator role' },
              { career: 'Data Scientist', matchPercentage: 75, description: 'Analytical role' }
            ]
          },
          gender: 'male',
          timing: null
        };
        
        const response = await fetch('http://localhost:3000/api/test-results-simple', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testData)
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('✅ Assessment submitted successfully!');
          console.log(`📊 Test Result ID: ${result.testResultId}`);
          console.log(`📝 Responses stored: ${result.responsesCount}`);
        } else {
          const error = await response.text();
          console.log('❌ Assessment submission failed:', error);
        }
      } else {
        console.log('❌ No users found');
      }
    } else {
      console.log('❌ Cannot fetch users');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testFullAssessment();
