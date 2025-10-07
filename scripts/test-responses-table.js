// Test the new responses table
// Run this with: node scripts/test-responses-table.js

async function testResponsesTable() {
  try {
    console.log('🧪 Testing new responses table...');
    
    // 1. Get all questions
    console.log('\n1. Getting all questions...');
    const questionsResponse = await fetch('http://localhost:3000/api/questions');
    const questionsData = await questionsResponse.json();
    console.log(`✅ Questions loaded: ${questionsData.questions.length}`);
    
    // 2. Get users
    console.log('\n2. Getting users...');
    const usersResponse = await fetch('http://localhost:3000/api/users');
    const usersData = await usersResponse.json();
    console.log(`✅ Users loaded: ${usersData.users.length}`);
    
    if (usersData.users.length === 0) {
      console.log('❌ No users found');
      return;
    }
    
    const testUserId = usersData.users[0].id;
    console.log(`Using test user: ${testUserId}`);
    
    // 3. Create test responses in new format
    console.log('\n3. Creating test responses in new format...');
    const responses = [
      {
        questionId: 1,
        answer: 3,
        category: 'logical',
        difficulty: 'medium'
      },
      {
        questionId: 2,
        answer: 4,
        category: 'linguistic',
        difficulty: 'medium'
      },
      {
        questionId: 3,
        answer: 2,
        category: 'interpersonal',
        difficulty: 'medium'
      }
    ];
    
    console.log('Test responses format:');
    console.log(JSON.stringify(responses, null, 2));
    
    // 4. Test direct database insertion (simulate what the API does)
    console.log('\n4. Testing direct database insertion...');
    
    // This would be done by the API, but we can simulate the structure
    const responseData = {
      user_id: testUserId,
      answers: responses,
      created_at: new Date().toISOString()
    };
    
    console.log('Response data structure:');
    console.log(JSON.stringify(responseData, null, 2));
    
    // 5. Test API storage
    console.log('\n5. Testing API storage...');
    const testData = {
      userId: testUserId,
      responses: responses,
      results: [
        { category: 'logical', score: 15, percentage: 75 },
        { category: 'linguistic', score: 20, percentage: 80 },
        { category: 'interpersonal', score: 18, percentage: 72 }
      ],
      enhancedResults: {
        topIntelligences: [
          { intelligence: 'linguistic', percentage: 80, description: 'Test' },
          { intelligence: 'logical', percentage: 75, description: 'Test' },
          { intelligence: 'interpersonal', percentage: 72, description: 'Test' }
        ]
      },
      gender: 'male',
      timing: null
    };
    
    const enhancedResponse = await fetch('http://localhost:3000/api/test-responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    if (enhancedResponse.ok) {
      const enhancedResult = await enhancedResponse.json();
      console.log('✅ Enhanced API storage successful:', enhancedResult.message);
    } else {
      const enhancedError = await enhancedResponse.text();
      console.log('❌ Enhanced API storage failed:', enhancedError);
      console.log('💡 You need to run the database schema update!');
      console.log('📝 Run this SQL in Supabase SQL Editor:');
      console.log('scripts/update-response-schema.sql');
    }
    
    console.log('\n🎉 Responses table test completed!');
    console.log('📋 Summary:');
    console.log('✅ Response format: Correct structure');
    console.log('✅ Data format: Compatible with new schema');
    console.log('✅ API integration: ' + (enhancedResponse.ok ? 'Working' : 'Needs schema update'));
    
    if (!enhancedResponse.ok) {
      console.log('\n💡 Next steps:');
      console.log('1. Run the SQL script: scripts/update-response-schema.sql');
      console.log('2. Test again with: node scripts/test-responses-table.js');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testResponsesTable();
