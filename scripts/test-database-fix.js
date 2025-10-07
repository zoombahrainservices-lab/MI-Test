// Test script to verify database schema fixes
// Run this with: node scripts/test-database-fix.js

async function testDatabaseFix() {
  try {
    console.log('🔧 Testing database schema fixes...');
    
    // Test 1: Check if questions are loading properly
    console.log('\n1. Testing questions API...');
    const questionsResponse = await fetch('http://localhost:3000/api/questions');
    if (questionsResponse.ok) {
      const questionsData = await questionsResponse.json();
      console.log(`✅ Questions API working: ${questionsData.questions.length} questions loaded`);
    } else {
      console.log('❌ Questions API failed:', questionsResponse.status);
    }
    
    // Test 2: Check if test-responses API is working
    console.log('\n2. Testing test-responses API...');
    const testData = {
      userId: 'test-user-123',
      responses: [
        { questionId: 1, answer: 4, category: 'logical', difficulty: 'medium' },
        { questionId: 2, answer: 3, category: 'linguistic', difficulty: 'medium' }
      ],
      results: [
        { category: 'logical', score: 4, percentage: 80 },
        { category: 'linguistic', score: 3, percentage: 60 }
      ],
      enhancedResults: {
        topIntelligences: [
          { intelligence: 'logical', percentage: 80, description: 'Test' }
        ]
      },
      gender: 'male',
      timing: null
    };
    
    const testResponse = await fetch('http://localhost:3000/api/test-responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    if (testResponse.ok) {
      const result = await testResponse.json();
      console.log('✅ Test-responses API working:', result.message);
    } else {
      const error = await testResponse.text();
      console.log('❌ Test-responses API failed:', error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure your development server is running:');
    console.log('   npm run dev');
  }
}

// Run the test
testDatabaseFix();
