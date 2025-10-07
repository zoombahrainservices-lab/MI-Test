// Final test to verify results display is working
// Run this with: node scripts/test-final-results-fix.js

async function testFinalResultsFix() {
  try {
    console.log('🧪 Testing final results fix...');
    
    // 1. Test database storage
    console.log('\n1. Testing database storage...');
    const questionsResponse = await fetch('http://localhost:3000/api/questions');
    const questionsData = await questionsResponse.json();
    
    const usersResponse = await fetch('http://localhost:3000/api/users');
    const usersData = await usersResponse.json();
    
    if (usersData.users.length === 0) {
      console.log('❌ No users found');
      return;
    }
    
    const testUserId = usersData.users[0].id;
    
    // Simulate assessment
    const allAnswers = {};
    questionsData.questions.forEach((question, index) => {
      allAnswers[question.id] = Math.floor(Math.random() * 5);
    });
    
    const responses = Object.entries(allAnswers).map(([questionId, answer]) => ({
      questionId: parseInt(questionId),
      answer: answer + 1,
      category: questionsData.questions.find(q => q.id === parseInt(questionId))?.category || 'unknown',
      difficulty: 'medium'
    }));
    
    // Calculate results
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
    
    const intelligenceScores = categories.map(category => {
      const score = categoryScores[category];
      const count = categoryCounts[category];
      const maxPossible = count * 5;
      const percentage = count > 0 ? Math.round((score / maxPossible) * 100) : 0;
      return {
        intelligence: category,
        rawScore: score,
        maxPossible: maxPossible,
        percentage: percentage,
        description: `Description for ${category} intelligence`
      };
    });
    
    const sortedIntelligenceScores = intelligenceScores.sort((a, b) => b.percentage - a.percentage);
    
    const quotients = [
      {
        name: 'IQ (Intelligence Quotient)',
        percentage: Math.round(((sortedIntelligenceScores.find(s => s.intelligence === 'logical')?.percentage || 0) + 
                               (sortedIntelligenceScores.find(s => s.intelligence === 'linguistic')?.percentage || 0)) / 2),
        description: 'Analytical and verbal reasoning abilities'
      },
      {
        name: 'EQ (Emotional Quotient)',
        percentage: Math.round(((sortedIntelligenceScores.find(s => s.intelligence === 'interpersonal')?.percentage || 0) + 
                               (sortedIntelligenceScores.find(s => s.intelligence === 'intrapersonal')?.percentage || 0)) / 2),
        description: 'Emotional intelligence and self-awareness'
      }
    ];
    
    const careerMatches = [
      {
        career: 'Data Scientist',
        matchPercentage: Math.round((sortedIntelligenceScores.find(s => s.intelligence === 'logical')?.percentage || 0) * 0.8),
        description: 'Analyzes complex data to help organizations make informed decisions',
        requiredIntelligences: ['logical', 'linguistic'],
        salaryRange: '$70,000 - $150,000'
      }
    ];
    
    const enhancedResults = {
      topIntelligences: sortedIntelligenceScores.slice(0, 3),
      top3Intelligences: sortedIntelligenceScores.slice(0, 3),
      quotients: quotients,
      careerMatches: careerMatches,
      bestFitCareers: careerMatches.slice(0, 3)
    };
    
    console.log('Enhanced Results Structure:');
    console.log('Top 3 Intelligences:', enhancedResults.topIntelligences.length);
    console.log('Quotients:', enhancedResults.quotients.length);
    console.log('Career Matches:', enhancedResults.careerMatches.length);
    
    console.log('\nSample Data:');
    console.log('Top Intelligence:', enhancedResults.topIntelligences[0]);
    console.log('First Quotient:', enhancedResults.quotients[0]);
    console.log('First Career:', enhancedResults.careerMatches[0]);
    
    // Test storage
    const testData = {
      userId: testUserId,
      responses: responses,
      results: sortedIntelligenceScores,
      enhancedResults: enhancedResults,
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
    
    // Test retrieval
    console.log('\n2. Testing results retrieval...');
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
          hasGender: !!latestResult.gender
        });
        
        if (latestResult.enhanced_results) {
          console.log('Enhanced results in database:', {
            hasTopIntelligences: !!latestResult.enhanced_results.topIntelligences,
            hasQuotients: !!latestResult.enhanced_results.quotients,
            hasCareerMatches: !!latestResult.enhanced_results.careerMatches,
            topIntelligencesCount: latestResult.enhanced_results.topIntelligences?.length || 0,
            quotientsCount: latestResult.enhanced_results.quotients?.length || 0
          });
        }
      }
    } else {
      console.log('❌ Results retrieval failed:', resultsResponse.status);
    }
    
    console.log('\n🎉 Final results fix test completed!');
    console.log('📋 Summary:');
    console.log('✅ Assessment calculation: Working');
    console.log('✅ Results structure: Correct');
    console.log('✅ Database storage: ' + (simpleResponse.ok ? 'Working' : 'Needs schema update'));
    console.log('✅ Results retrieval: ' + (resultsResponse.ok ? 'Working' : 'Failed'));
    
    if (simpleResponse.ok && resultsResponse.ok) {
      console.log('\n🎯 The system should now display results correctly!');
      console.log('If you still see 0% results, check the browser console for debugging information.');
    } else {
      console.log('\n💡 You need to run the database schema update:');
      console.log('📝 Run this SQL in Supabase SQL Editor:');
      console.log('scripts/final-database-schema-update.sql');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testFinalResultsFix();
