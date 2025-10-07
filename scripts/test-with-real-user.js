// Test with a real user from the database
// Run this with: node scripts/test-with-real-user.js

async function testWithRealUser() {
  try {
    console.log('🔧 Testing with real user...');
    
    // First, let's get a real user from the database
    const usersResponse = await fetch('http://localhost:3000/api/users');
    if (!usersResponse.ok) {
      console.log('❌ Cannot fetch users, trying with a test user ID');
      // Use a test user ID that might exist
      const testUserId = 'test-user-' + Date.now();
      await testWithUserId(testUserId);
      return;
    }
    
    const usersData = await usersResponse.json();
    if (usersData.users && usersData.users.length > 0) {
      const realUserId = usersData.users[0].id;
      console.log('✅ Found real user:', realUserId);
      await testWithUserId(realUserId);
    } else {
      console.log('❌ No users found in database');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

async function testWithUserId(userId) {
  try {
    const testData = {
      userId: userId,
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
      console.log('✅ Simple API working with user:', userId);
      console.log('Result:', result.message);
    } else {
      const error = await response.text();
      console.log('❌ Simple API failed:', error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testWithRealUser();
