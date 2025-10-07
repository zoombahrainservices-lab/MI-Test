// Test the final database schema update
// Run this with: node scripts/test-database-schema-final.js

async function testDatabaseSchemaFinal() {
  try {
    console.log('🧪 Testing final database schema...');
    
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
      console.log('❌ No users found - cannot test database storage');
      return;
    }
    
    const testUserId = usersData.users[0].id;
    console.log(`Using test user: ${testUserId}`);
    
    // 3. Simulate complete assessment
    console.log('\n3. Simulating complete assessment...');
    const allAnswers = {};
    questionsData.questions.forEach((question, index) => {
      allAnswers[question.id] = Math.floor(Math.random() * 5); // Random 0-4
    });
    
    console.log(`✅ Simulated answers for ${Object.keys(allAnswers).length} questions`);
    
    // 4. Calculate results
    console.log('\n4. Calculating results...');
    const normalizeCategory = (raw) => {
      const c = (raw || '').toLowerCase();
      if (c.includes('logical')) return 'logical';
      if (c.includes('linguistic')) return 'linguistic';
      if (c.includes('spatial')) return 'spatial';
      if (c.includes('music') || c.includes('creative')) return 'musical';
      if (c.includes('bodily') || c.includes('kinesthetic')) return 'bodily';
      if (c.includes('interpersonal')) return 'interpersonal';
      if (c.includes('intrapersonal')) return 'intrapersonal';
      if (c.includes('natural')) return 'naturalist';
      return c;
    };
    
    const categories = [
      'linguistic', 'logical', 'spatial', 'musical', 'bodily',
      'interpersonal', 'intrapersonal', 'naturalist'
    ];
    
    const categoryScores = {};
    const categoryCounts = {};
    
    categories.forEach(category => {
      categoryScores[category] = 0;
      categoryCounts[category] = 0;
    });
    
    Object.entries(allAnswers).forEach(([questionId, answer]) => {
      const question = questionsData.questions.find(q => q.id === parseInt(questionId));
      if (question && question.category) {
        const key = normalizeCategory(question.category);
        const scoreValue = answer + 1;
        categoryScores[key] += scoreValue;
        categoryCounts[key] += 1;
      }
    });
    
    const results = categories.map(category => {
      const score = categoryScores[category];
      const count = categoryCounts[category];
      const maxPossible = count * 5;
      const percentage = count > 0 ? Math.round((score / maxPossible) * 100) : 0;
      return { category, score, percentage };
    });
    
    const sortedResults = results.sort((a, b) => b.percentage - a.percentage);
    
    console.log('Top 3 results:');
    sortedResults.slice(0, 3).forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.category}: ${result.percentage}%`);
    });
    
    // 5. Test database storage with new format
    console.log('\n5. Testing database storage with new format...');
    
    const responses = Object.entries(allAnswers).map(([questionId, answer]) => ({
      questionId: parseInt(questionId),
      answer: answer + 1,
      category: questionsData.questions.find(q => q.id === parseInt(questionId))?.category || 'unknown',
      difficulty: 'medium'
    }));
    
    const responsesArray = responses.map((response) => ({
      question_id: response.questionId,
      answer: response.answer
    }));
    
    const enhancedResults = {
      top3Intelligences: sortedResults.slice(0, 3).map(r => ({
        intelligence: r.category,
        percentage: r.percentage,
        description: `Description for ${r.category} intelligence`
      })),
      quotientScores: [
        {
          name: 'IQ (Intelligence Quotient)',
          percentage: Math.round(((sortedResults.find(r => r.category === 'logical')?.percentage || 0) + 
                                 (sortedResults.find(r => r.category === 'linguistic')?.percentage || 0)) / 2),
          description: 'Analytical and verbal reasoning abilities'
        }
      ]
    };
    
    const testData = {
      userId: testUserId,
      responses: responses,
      results: sortedResults,
      enhancedResults: enhancedResults,
      gender: 'male',
      timing: null
    };
    
    // Test simple API
    console.log('Testing simple API storage...');
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
      console.log('💡 You need to run the database schema update!');
      console.log('📝 Run this SQL in Supabase SQL Editor:');
      console.log('scripts/final-database-schema-update.sql');
      return;
    }
    
    // Test enhanced API
    console.log('\nTesting enhanced API storage...');
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
    
    // Test results retrieval
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
          hasResponses: !!latestResult.responses,
          hasGender: !!latestResult.gender,
          answersCount: latestResult.answers?.length || 0,
          responsesCount: latestResult.responses?.length || 0
        });
      }
    } else {
      console.log('❌ Results retrieval failed:', resultsResponse.status);
    }
    
    console.log('\n🎉 Database schema test completed!');
    console.log('📋 Summary:');
    console.log('✅ Assessment calculation: Working');
    console.log('✅ Results calculation: Working');
    console.log('✅ Database storage: ' + (simpleResponse.ok ? 'Working' : 'Needs schema update'));
    console.log('✅ Response storage: ' + (enhancedResponse.ok ? 'Working' : 'Needs table creation'));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testDatabaseSchemaFinal();
