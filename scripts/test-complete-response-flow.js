// Using built-in fetch (Node.js 18+)

const API_BASE = 'http://localhost:3000/api';

async function testCompleteResponseFlow() {
  console.log('🧪 Testing Complete Response Flow...\n');

  try {
    // 1. Get questions
    console.log('1. Getting questions...');
    const questionsResponse = await fetch(`${API_BASE}/questions`);
    const questionsData = await questionsResponse.json();
    
    if (!questionsData.questions || questionsData.questions.length === 0) {
      console.log('❌ No questions found');
      return;
    }
    
    console.log(`✅ Questions loaded: ${questionsData.questions.length}`);
    
    // 2. Get users
    console.log('\n2. Getting users...');
    const usersResponse = await fetch(`${API_BASE}/test-results-debug`);
    const usersData = await usersResponse.json();
    
    if (!usersData.users || usersData.users.length === 0) {
      console.log('❌ No users found');
      return;
    }
    
    console.log(`✅ Users loaded: ${usersData.users.length}`);
    const testUserId = usersData.users[0].id;
    console.log(`Using test user: ${testUserId}`);

    // 3. Create comprehensive test responses
    console.log('\n3. Creating comprehensive test responses...');
    const responses = [];
    const questions = questionsData.questions.slice(0, 10); // Test with first 10 questions
    
    questions.forEach((question, index) => {
      responses.push({
        questionId: question.id,
        answer: Math.floor(Math.random() * 5) + 1, // Random answer 1-5
        category: question.category || 'logical',
        difficulty: question.difficulty || 'medium'
      });
    });
    
    console.log(`✅ Created ${responses.length} test responses`);
    console.log('Sample responses:', responses.slice(0, 3));

    // 4. Create test results (traditional format)
    console.log('\n4. Creating test results...');
    const categories = ['logical', 'linguistic', 'interpersonal', 'intrapersonal', 'spatial', 'musical', 'bodily', 'naturalist'];
    const results = categories.map(category => {
      const score = Math.floor(Math.random() * 40) + 60; // Random score 60-100
      return {
        category,
        score,
        percentage: score,
        count: Math.floor(Math.random() * 5) + 3
      };
    }).sort((a, b) => b.percentage - a.percentage);
    
    console.log('✅ Test results created');
    console.log('Top 3 results:', results.slice(0, 3));

    // 5. Create enhanced results
    console.log('\n5. Creating enhanced results...');
    const enhancedResults = {
      intelligenceScores: results,
      topIntelligences: results.slice(0, 3),
      quotients: [
        { name: 'IQ', percentage: 85, description: 'Intelligence Quotient' },
        { name: 'EQ', percentage: 92, description: 'Emotional Quotient' },
        { name: 'AQ', percentage: 78, description: 'Adaptability Quotient' },
        { name: 'CQ', percentage: 88, description: 'Creative Quotient' },
        { name: 'SQ', percentage: 75, description: 'Spiritual Quotient' }
      ],
      careerMatches: [
        { name: 'Data Scientist', matchPercentage: 89, description: 'Analytical role', salaryRange: '$80k-120k', education: 'Bachelor\'s in Computer Science' },
        { name: 'Teacher', matchPercentage: 85, description: 'Educational role', salaryRange: '$40k-70k', education: 'Bachelor\'s in Education' },
        { name: 'Designer', matchPercentage: 82, description: 'Creative role', salaryRange: '$50k-90k', education: 'Bachelor\'s in Design' }
      ],
      bestFitCareers: []
    };
    
    console.log('✅ Enhanced results created');

    // 6. Test simple API (fallback)
    console.log('\n6. Testing simple API (fallback)...');
    const simplePayload = {
      userId: testUserId,
      responses: responses,
      results: results,
      enhancedResults: enhancedResults,
      gender: 'other',
      timing: { startTime: Date.now(), endTime: Date.now() + 300000 }
    };

    const simpleResponse = await fetch(`${API_BASE}/test-results-simple`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(simplePayload)
    });

    const simpleResult = await simpleResponse.json();
    
    if (simpleResponse.ok) {
      console.log('✅ Simple API storage successful');
      console.log('Simple API result:', simpleResult);
    } else {
      console.log('❌ Simple API storage failed:', simpleResult);
    }

    // 7. Test enhanced API
    console.log('\n7. Testing enhanced API...');
    const enhancedPayload = {
      userId: testUserId,
      responses: responses,
      results: results,
      enhancedResults: enhancedResults,
      gender: 'other',
      timing: { startTime: Date.now(), endTime: Date.now() + 300000 }
    };

    const enhancedResponse = await fetch(`${API_BASE}/test-responses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enhancedPayload)
    });

    const enhancedResult = await enhancedResponse.json();
    
    if (enhancedResponse.ok) {
      console.log('✅ Enhanced API storage successful');
      console.log('Enhanced API result:', enhancedResult);
    } else {
      console.log('❌ Enhanced API storage failed:', enhancedResult);
    }

    // 8. Verify stored data
    console.log('\n8. Verifying stored data...');
    const verifyResponse = await fetch(`${API_BASE}/test-results-debug`);
    const verifyData = await verifyResponse.json();
    
    if (verifyData.testResults && verifyData.testResults.length > 0) {
      const latestResult = verifyData.testResults[verifyData.testResults.length - 1];
      console.log('✅ Latest test result found');
      console.log('Result ID:', latestResult.id);
      console.log('User ID:', latestResult.user_id);
      console.log('Has responses:', !!latestResult.responses);
      console.log('Has enhanced results:', !!latestResult.enhanced_results);
      console.log('Top intelligence:', latestResult.top_intelligence);
      console.log('Linguistic score:', latestResult.linguistic_score);
      console.log('Linguistic percentage:', latestResult.linguistic_percentage);
    } else {
      console.log('❌ No test results found in database');
    }

    console.log('\n🎉 Complete response flow test completed!');
    console.log('\n📋 Summary:');
    console.log(`✅ Questions: ${questionsData.questions.length}`);
    console.log(`✅ Users: ${usersData.users.length}`);
    console.log(`✅ Test responses: ${responses.length}`);
    console.log(`✅ Simple API: ${simpleResponse.ok ? 'Success' : 'Failed'}`);
    console.log(`✅ Enhanced API: ${enhancedResponse.ok ? 'Success' : 'Failed'}`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testCompleteResponseFlow();
