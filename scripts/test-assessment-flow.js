// Test the complete assessment flow to debug 0% results
// Run this with: node scripts/test-assessment-flow.js

async function testAssessmentFlow() {
  try {
    console.log('🧪 Testing complete assessment flow...');
    
    // 1. Get all questions
    console.log('\n1. Getting all questions...');
    const questionsResponse = await fetch('http://localhost:3000/api/questions');
    const questionsData = await questionsResponse.json();
    console.log(`✅ Questions loaded: ${questionsData.questions.length}`);
    
    // 2. Simulate user answering all questions (like pagination)
    console.log('\n2. Simulating user answers for all questions...');
    const allAnswers = {};
    questionsData.questions.forEach((question, index) => {
      // Simulate user answering each question with random answers 0-4
      allAnswers[question.id] = Math.floor(Math.random() * 5);
    });
    
    console.log(`✅ Simulated answers for ${Object.keys(allAnswers).length} questions`);
    console.log('Sample answers:', Object.entries(allAnswers).slice(0, 5));
    
    // 3. Test the assessment calculation logic
    console.log('\n3. Testing assessment calculation...');
    
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
    
    // Initialize scores and counts
    categories.forEach(category => {
      categoryScores[category] = 0;
      categoryCounts[category] = 0;
    });
    
    // Calculate scores
    Object.entries(allAnswers).forEach(([questionId, answer]) => {
      const question = questionsData.questions.find(q => q.id === parseInt(questionId));
      if (question && question.category) {
        console.log(`Processing question ${questionId}: category=${question.category}, answer=${answer}`);
        const key = normalizeCategory(question.category);
        const scoreValue = answer + 1; // Convert 0-4 to 1-5
        categoryScores[key] += scoreValue;
        categoryCounts[key] += 1;
        console.log(`Added to ${key}: score=${scoreValue}, total=${categoryScores[key]}, count=${categoryCounts[key]}`);
      }
    });
    
    console.log('\nFinal category scores:', categoryScores);
    console.log('Final category counts:', categoryCounts);
    
    // Calculate percentages
    const results = categories.map(category => {
      const score = categoryScores[category];
      const count = categoryCounts[category];
      const maxPossible = count * 5;
      const percentage = count > 0 ? Math.round((score / maxPossible) * 100) : 0;
      
      console.log(`${category}: score=${score}, count=${count}, maxPossible=${maxPossible}, percentage=${percentage}`);
      
      return { category, score, percentage };
    });
    
    const sortedResults = results.sort((a, b) => b.percentage - a.percentage);
    console.log('\nFinal sorted results:', sortedResults);
    
    // Check if any results are non-zero
    const hasNonZeroResults = sortedResults.some(r => r.percentage > 0);
    console.log(`\n✅ Has non-zero results: ${hasNonZeroResults}`);
    
    if (!hasNonZeroResults) {
      console.log('❌ All results are 0% - this is the problem!');
      console.log('Possible causes:');
      console.log('1. Questions don\'t have categories');
      console.log('2. Answer format is wrong');
      console.log('3. Category normalization is failing');
    } else {
      console.log('✅ Assessment calculation is working correctly!');
    }
    
    // 4. Test database storage
    console.log('\n4. Testing database storage...');
    const usersResponse = await fetch('http://localhost:3000/api/users');
    const usersData = await usersResponse.json();
    
    if (usersData.users.length > 0) {
      const testUserId = usersData.users[0].id;
      
      const responses = Object.entries(allAnswers).map(([questionId, answer]) => ({
        questionId: parseInt(questionId),
        answer: answer + 1,
        category: questionsData.questions.find(q => q.id === parseInt(questionId))?.category || 'unknown',
        difficulty: 'medium'
      }));
      
      const testData = {
        userId: testUserId,
        responses: responses,
        results: sortedResults,
        enhancedResults: {
          top3Intelligences: sortedResults.slice(0, 3).map(r => ({
            intelligence: r.category,
            percentage: r.percentage,
            description: `Test description for ${r.category}`
          }))
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
        const result = await simpleResponse.json();
        console.log('✅ Database storage successful:', result.message);
      } else {
        const error = await simpleResponse.text();
        console.log('❌ Database storage failed:', error);
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAssessmentFlow();
