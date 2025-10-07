// Test script to verify 10 questions limit and response storage
// Run this with: node scripts/test-10-questions.js

async function test10Questions() {
  try {
    console.log('🧪 Testing 10 questions limit and response storage...');
    
    // 1. Test questions API - should return only 10 questions
    console.log('\n1. Testing questions API (should return 10 questions)...');
    const questionsResponse = await fetch('http://localhost:3000/api/questions');
    if (!questionsResponse.ok) {
      console.log('❌ Questions API failed:', questionsResponse.status);
      return;
    }
    
    const questionsData = await questionsResponse.json();
    console.log(`✅ Questions loaded: ${questionsData.questions.length} (expected: 10)`);
    
    if (questionsData.questions.length !== 10) {
      console.log('❌ Expected 10 questions, got:', questionsData.questions.length);
    } else {
      console.log('✅ Correct number of questions loaded');
    }
    
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
      console.log('❌ No users found - cannot test response storage');
      return;
    }
    
    const testUserId = usersData.users[0].id;
    console.log(`Using test user: ${testUserId}`);
    
    // 3. Create mock responses for all 10 questions
    console.log('\n3. Creating mock responses for 10 questions...');
    const mockResponses = questionsData.questions.map((question, index) => ({
      questionId: question.id,
      answer: Math.floor(Math.random() * 5) + 1, // Random answer 1-5
      category: question.category,
      difficulty: question.difficulty || 'medium'
    }));
    
    console.log('Mock responses created:', mockResponses.length);
    console.log('Sample responses:', mockResponses.slice(0, 3));
    
    // 4. Create mock results
    const mockResults = [
      { category: 'linguistic', score: 15, percentage: 75 },
      { category: 'logical', score: 20, percentage: 80 },
      { category: 'interpersonal', score: 18, percentage: 72 }
    ];
    
    // 5. Test enhanced API storage (with question_responses table)
    console.log('\n4. Testing enhanced API storage...');
    const enhancedData = {
      userId: testUserId,
      responses: mockResponses,
      results: mockResults,
      enhancedResults: {
        top3Intelligences: [
          { intelligence: 'logical', percentage: 80, description: 'Test' },
          { intelligence: 'linguistic', percentage: 75, description: 'Test' },
          { intelligence: 'interpersonal', percentage: 72, description: 'Test' }
        ],
        quotientScores: [
          { name: 'IQ (Intelligence Quotient)', percentage: 78, description: 'Test' }
        ]
      },
      gender: 'male',
      timing: null
    };
    
    const enhancedResponse = await fetch('http://localhost:3000/api/test-responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enhancedData)
    });
    
    if (enhancedResponse.ok) {
      const enhancedResult = await enhancedResponse.json();
      console.log('✅ Enhanced API storage successful:', enhancedResult.message);
    } else {
      const enhancedError = await enhancedResponse.text();
      console.log('❌ Enhanced API storage failed:', enhancedError);
      
      // Try simple API as fallback
      console.log('\n5. Trying simple API as fallback...');
      const simpleResponse = await fetch('http://localhost:3000/api/test-results-simple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enhancedData)
      });
      
      if (simpleResponse.ok) {
        const simpleResult = await simpleResponse.json();
        console.log('✅ Simple API storage successful:', simpleResult.message);
      } else {
        const simpleError = await simpleResponse.text();
        console.log('❌ Simple API storage failed:', simpleError);
      }
    }
    
    // 6. Test results retrieval
    console.log('\n6. Testing results retrieval...');
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
          hasGender: !!latestResult.gender,
          answersCount: latestResult.answers?.length || 0
        });
      }
    } else {
      console.log('❌ Results retrieval failed:', resultsResponse.status);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

test10Questions();
