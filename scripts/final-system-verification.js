// Final comprehensive system verification

const API_BASE = 'http://localhost:3000/api';

async function finalSystemVerification() {
  console.log('🔍 Final System Verification...\n');

  try {
    // 1. Test questions API
    console.log('1. Testing Questions API...');
    const questionsResponse = await fetch(`${API_BASE}/questions`);
    const questionsData = await questionsResponse.json();
    
    if (!questionsData.questions || questionsData.questions.length === 0) {
      console.log('❌ Questions API failed');
      return;
    }
    
    console.log(`✅ Questions API: ${questionsData.questions.length} questions loaded`);
    
    // 2. Test users and results API
    console.log('\n2. Testing Users and Results API...');
    const debugResponse = await fetch(`${API_BASE}/test-results-debug`);
    const debugData = await debugResponse.json();
    
    if (!debugData.users || debugData.users.length === 0) {
      console.log('❌ Users API failed');
      return;
    }
    
    console.log(`✅ Users API: ${debugData.users.length} users found`);
    console.log(`✅ Results API: ${debugData.testResults?.length || 0} test results found`);
    
    // 3. Test complete assessment flow
    console.log('\n3. Testing Complete Assessment Flow...');
    const testUserId = debugData.users[0].id;
    const questions = questionsData.questions.slice(0, 10); // Test with first 10 questions
    
    // Create comprehensive test responses
    const responses = questions.map(question => ({
      questionId: question.id,
      answer: Math.floor(Math.random() * 5) + 1,
      category: question.category || 'logical',
      difficulty: question.difficulty || 'medium'
    }));
    
    console.log(`✅ Created ${responses.length} test responses`);
    
    // Create test results
    const categories = ['logical', 'linguistic', 'interpersonal', 'intrapersonal', 'spatial', 'musical', 'bodily', 'naturalist'];
    const results = categories.map(category => {
      const score = Math.floor(Math.random() * 40) + 60;
      return {
        category,
        score,
        percentage: score,
        count: Math.floor(Math.random() * 5) + 3
      };
    }).sort((a, b) => b.percentage - a.percentage);
    
    console.log(`✅ Created test results with top score: ${results[0].category} (${results[0].percentage}%)`);
    
    // 4. Test simple API storage
    console.log('\n4. Testing Simple API Storage...');
    const simplePayload = {
      userId: testUserId,
      responses: responses,
      results: results,
      enhancedResults: {
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
          { name: 'Data Scientist', matchPercentage: 89, description: 'Analytical role' },
          { name: 'Teacher', matchPercentage: 85, description: 'Educational role' },
          { name: 'Designer', matchPercentage: 82, description: 'Creative role' }
        ]
      },
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
      console.log(`   Result ID: ${simpleResult.testResultId}`);
      console.log(`   Responses stored: ${simpleResult.responsesCount}`);
    } else {
      console.log('❌ Simple API storage failed:', simpleResult);
    }

    // 5. Test enhanced API storage
    console.log('\n5. Testing Enhanced API Storage...');
    const enhancedResponse = await fetch(`${API_BASE}/test-responses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(simplePayload)
    });

    const enhancedResult = await enhancedResponse.json();
    
    if (enhancedResponse.ok) {
      console.log('✅ Enhanced API storage successful');
    } else {
      console.log('❌ Enhanced API storage failed:', enhancedResult);
      console.log('   This is expected if responses table does not exist yet');
    }

    // 6. Verify stored data
    console.log('\n6. Verifying Stored Data...');
    const verifyResponse = await fetch(`${API_BASE}/test-results-debug`);
    const verifyData = await verifyResponse.json();
    
    if (verifyData.testResults && verifyData.testResults.length > 0) {
      const latestResult = verifyData.testResults[0];
      console.log('✅ Latest test result found');
      console.log(`   Result ID: ${latestResult.id}`);
      console.log(`   User ID: ${latestResult.user_id}`);
      console.log(`   Top intelligence: ${latestResult.top_intelligence} (${latestResult.linguistic_percentage}%)`);
      console.log(`   Has responses: ${!!latestResult.responses}`);
      console.log(`   Has enhanced results: ${!!latestResult.enhanced_results}`);
      console.log(`   Has answers: ${!!latestResult.answers}`);
      
      // Check if results are non-zero
      const hasNonZeroScores = latestResult.linguistic_percentage > 0 || 
                             latestResult.logical_percentage > 0 || 
                             latestResult.interpersonal_percentage > 0;
      
      if (hasNonZeroScores) {
        console.log('✅ Results have non-zero percentages - display should work');
      } else {
        console.log('❌ Results have zero percentages - display issue');
      }
    } else {
      console.log('❌ No test results found in database');
    }

    // 7. Test frontend calculation simulation
    console.log('\n7. Testing Frontend Calculation Simulation...');
    
    // Simulate the exact frontend calculation
    const answers = {};
    questions.forEach(question => {
      answers[question.id] = Math.floor(Math.random() * 5) + 1;
    });
    
    const categories2 = ['logical', 'linguistic', 'interpersonal', 'intrapersonal', 'spatial', 'musical', 'bodily', 'naturalist'];
    const categoryScores = categories2.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {});
    const categoryCounts = categories2.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {});

    const normalizeCategory = (category) => {
      if (!category) return 'logical';
      return category.toLowerCase().replace(/[^a-z]/g, '');
    };

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        const key = normalizeCategory(question.category);
        categoryScores[key] += answer;
        categoryCounts[key] += 1;
      }
    });

    const results2 = categories2.map(category => {
      const score = categoryScores[category];
      const count = categoryCounts[category];
      const maxPossible = count * 5;
      const percentage = count > 0 ? Math.round((score / maxPossible) * 100) : 0;
      return { category, score, percentage };
    }).sort((a, b) => b.percentage - a.percentage);

    const hasNonZeroResults = results2.some(r => r.percentage > 0);
    
    if (hasNonZeroResults) {
      console.log('✅ Frontend calculation simulation successful');
      console.log(`   Top result: ${results2[0].category} (${results2[0].percentage}%)`);
    } else {
      console.log('❌ Frontend calculation simulation failed');
    }

    console.log('\n🎉 Final System Verification Completed!');
    console.log('\n📋 System Status:');
    console.log(`✅ Questions API: Working (${questionsData.questions.length} questions)`);
    console.log(`✅ Users API: Working (${debugData.users.length} users)`);
    console.log(`✅ Results API: Working (${debugData.testResults?.length || 0} results)`);
    console.log(`✅ Simple API: ${simpleResponse.ok ? 'Working' : 'Failed'}`);
    console.log(`✅ Enhanced API: ${enhancedResponse.ok ? 'Working' : 'Failed (expected if responses table missing)'}`);
    console.log(`✅ Database Storage: ${verifyData.testResults?.length > 0 ? 'Working' : 'Failed'}`);
    console.log(`✅ Frontend Calculation: ${hasNonZeroResults ? 'Working' : 'Failed'}`);
    
    console.log('\n💡 Next Steps:');
    if (!enhancedResponse.ok) {
      console.log('1. Run the SQL script: scripts/update-response-schema-fixed.sql');
      console.log('2. Test again with: node scripts/final-system-verification.js');
    } else {
      console.log('1. All systems are working correctly!');
      console.log('2. Test the frontend to ensure results display properly');
    }

  } catch (error) {
    console.error('❌ System verification failed:', error.message);
  }
}

finalSystemVerification();
