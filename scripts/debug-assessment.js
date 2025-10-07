// Debug script to test assessment calculation
// Run this with: node scripts/debug-assessment.js

async function debugAssessment() {
  try {
    console.log('🔍 Debugging assessment calculation...');
    
    // 1. Test questions loading
    console.log('\n1. Testing questions API...');
    const questionsResponse = await fetch('http://localhost:3000/api/questions');
    if (!questionsResponse.ok) {
      console.log('❌ Questions API failed:', questionsResponse.status);
      return;
    }
    
    const questionsData = await questionsResponse.json();
    console.log(`✅ Questions loaded: ${questionsData.questions.length}`);
    
    // 2. Simulate assessment calculation
    console.log('\n2. Simulating assessment calculation...');
    
    // Create mock answers
    const mockAnswers = {};
    questionsData.questions.slice(0, 10).forEach((question, index) => {
      mockAnswers[question.id] = Math.floor(Math.random() * 5); // Random answer 0-4
    });
    
    console.log('Mock answers:', mockAnswers);
    
    // Calculate results manually
    const categories = ['linguistic', 'logical', 'spatial', 'musical', 'bodily', 'interpersonal', 'intrapersonal', 'naturalist'];
    const categoryScores = {};
    const categoryCounts = {};
    
    categories.forEach(category => {
      categoryScores[category] = 0;
      categoryCounts[category] = 0;
    });
    
    Object.entries(mockAnswers).forEach(([questionId, answer]) => {
      const question = questionsData.questions.find(q => q.id === parseInt(questionId));
      if (question && question.category) {
        const key = question.category.toLowerCase();
        if (categories.includes(key)) {
          const scoreValue = answer + 1; // Convert 0-4 to 1-5
          categoryScores[key] += scoreValue;
          categoryCounts[key] += 1;
          console.log(`Question ${questionId} (${key}): answer=${answer}, score=${scoreValue}, total=${categoryScores[key]}`);
        }
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
      
      return {
        category,
        score,
        percentage
      };
    });
    
    const sortedResults = results.sort((a, b) => b.percentage - a.percentage);
    console.log('\nFinal sorted results:', sortedResults);
    
    // 3. Test database storage
    console.log('\n3. Testing database storage...');
    const usersResponse = await fetch('http://localhost:3000/api/users');
    if (usersResponse.ok) {
      const usersData = await usersResponse.json();
      if (usersData.users && usersData.users.length > 0) {
        const realUserId = usersData.users[0].id;
        
        const testData = {
          userId: realUserId,
          responses: Object.entries(mockAnswers).map(([questionId, answer]) => ({
            questionId: parseInt(questionId),
            answer: answer + 1,
            category: questionsData.questions.find(q => q.id === parseInt(questionId))?.category || 'unknown',
            difficulty: 'medium'
          })),
          results: sortedResults,
          enhancedResults: {
            topIntelligences: sortedResults.slice(0, 3).map(r => ({
              intelligence: r.category,
              percentage: r.percentage,
              description: `Test description for ${r.category}`
            }))
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
          console.log('✅ Database storage successful:', result.message);
        } else {
          const error = await response.text();
          console.log('❌ Database storage failed:', error);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

// Run the debug
debugAssessment();
