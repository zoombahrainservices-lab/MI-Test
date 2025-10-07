// Test database schema and storage
// Run this with: node scripts/test-database-schema.js

async function testDatabaseSchema() {
  try {
    console.log('🔍 Testing database schema...');
    
    // 1. Test questions API
    console.log('\n1. Testing questions API...');
    const questionsResponse = await fetch('http://localhost:3000/api/questions');
    if (!questionsResponse.ok) {
      console.log('❌ Questions API failed:', questionsResponse.status);
      return;
    }
    
    const questionsData = await questionsResponse.json();
    console.log(`✅ Questions loaded: ${questionsData.questions.length}`);
    
    // 2. Test users API
    console.log('\n2. Testing users API...');
    const usersResponse = await fetch('http://localhost:3000/api/users');
    if (!usersResponse.ok) {
      console.log('❌ Users API failed:', usersResponse.status);
      return;
    }
    
    const usersData = await usersResponse.json();
    console.log(`✅ Users loaded: ${usersData.users.length}`);
    
    if (usersData.users.length === 0) {
      console.log('❌ No users found - cannot test database storage');
      return;
    }
    
    const testUserId = usersData.users[0].id;
    console.log(`Using test user: ${testUserId}`);
    
    // 3. Test simple API storage
    console.log('\n3. Testing simple API storage...');
    const testData = {
      userId: testUserId,
      responses: [
        { questionId: 1, answer: 3, category: 'logical', difficulty: 'medium' },
        { questionId: 2, answer: 4, category: 'linguistic', difficulty: 'medium' }
      ],
      results: [
        { category: 'logical', score: 15, percentage: 75 },
        { category: 'linguistic', score: 20, percentage: 80 }
      ],
      enhancedResults: {
        top3Intelligences: [
          { intelligence: 'linguistic', percentage: 80, description: 'Test' },
          { intelligence: 'logical', percentage: 75, description: 'Test' }
        ],
        quotientScores: [
          { name: 'IQ (Intelligence Quotient)', percentage: 78, description: 'Test' }
        ]
      },
      gender: 'male',
      timing: null
    };
    
    const simpleResponse = await fetch('http://localhost:3000/api/test-results-simple', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    if (simpleResponse.ok) {
      const simpleResult = await simpleResponse.json();
      console.log('✅ Simple API storage successful:', simpleResult.message);
    } else {
      const simpleError = await simpleResponse.text();
      console.log('❌ Simple API storage failed:', simpleError);
    }
    
    // 4. Test enhanced API storage
    console.log('\n4. Testing enhanced API storage...');
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
    }
    
    // 5. Test results retrieval
    console.log('\n5. Testing results retrieval...');
    const resultsResponse = await fetch(`http://localhost:3000/api/test-results-debug?userId=${testUserId}`);
    if (resultsResponse.ok) {
      const resultsData = await resultsResponse.json();
      console.log(`✅ Results retrieved: ${resultsData.results.length} results found`);
      if (resultsData.results.length > 0) {
        const latestResult = resultsData.results[0];
        console.log('Latest result structure:', {
          hasResults: !!latestResult.results,
          hasEnhancedResults: !!latestResult.enhanced_results,
          hasAnswers: !!latestResult.answers,
          hasGender: !!latestResult.gender
        });
      }
    } else {
      console.log('❌ Results retrieval failed:', resultsResponse.status);
    }
    
  } catch (error) {
    console.error('❌ Database schema test failed:', error.message);
  }
}

testDatabaseSchema();
