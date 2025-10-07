// Test the simple API fallback
// Run this with: node scripts/test-simple-api.js

async function testSimpleAPI() {
  try {
    console.log('🔧 Testing simple API fallback...');
    
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
    
    const response = await fetch('http://localhost:3000/api/test-results-simple', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Simple API working:', result.message);
    } else {
      const error = await response.text();
      console.log('❌ Simple API failed:', error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testSimpleAPI();
