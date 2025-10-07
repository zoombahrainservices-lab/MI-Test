// Test frontend results display to understand why 0% is showing

const API_BASE = 'http://localhost:3000/api';

async function testFrontendResultsDisplay() {
  console.log('🧪 Testing Frontend Results Display...\n');

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

    // 3. Simulate frontend calculation
    console.log('\n3. Simulating frontend calculation...');
    const questions = questionsData.questions.slice(0, 10); // Test with first 10 questions
    
    // Create test answers (simulating user responses)
    const answers = {};
    questions.forEach((question, index) => {
      answers[question.id] = Math.floor(Math.random() * 5) + 1; // Random answer 1-5
    });
    
    console.log(`✅ Created ${Object.keys(answers).length} test answers`);
    console.log('Sample answers:', Object.entries(answers).slice(0, 3));

    // 4. Simulate the calculateResults function from frontend
    console.log('\n4. Simulating calculateResults function...');
    
    const categories = ['logical', 'linguistic', 'interpersonal', 'intrapersonal', 'spatial', 'musical', 'bodily', 'naturalist'];
    const categoryScores = categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {});
    const categoryCounts = categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {});

    const normalizeCategory = (category) => {
      if (!category) return 'logical';
      return category.toLowerCase().replace(/[^a-z]/g, '');
    };

    console.log('Processing answers...');
    let processedQuestions = 0;
    let skippedQuestions = 0;
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        const key = normalizeCategory(question.category);
        const scoreValue = answer; // Frontend uses answer directly (1-5)
        categoryScores[key] += scoreValue;
        categoryCounts[key] += 1;
        processedQuestions++;
        console.log(`Question ${questionId}: category=${question.category}, answer=${answer}, key=${key}, score=${scoreValue}, total=${categoryScores[key]}, count=${categoryCounts[key]}`);
      } else {
        console.log(`Question ${questionId} not found in questions array`);
        skippedQuestions++;
      }
    });
    
    console.log(`Processed questions: ${processedQuestions}, Skipped: ${skippedQuestions}`);
    console.log('Final category scores:', categoryScores);
    console.log('Final category counts:', categoryCounts);

    // 5. Calculate percentages (frontend logic)
    console.log('\n5. Calculating percentages...');
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

    // 6. Check if results are valid
    console.log('\n6. Validating results...');
    const hasNonZeroResults = sortedResults.some(r => r.percentage > 0);
    
    if (hasNonZeroResults) {
      console.log('✅ Results have non-zero percentages - calculation is working');
      console.log('Top 3 results:', sortedResults.slice(0, 3));
    } else {
      console.log('❌ All results are zero - calculation issue');
      console.log('Category scores:', categoryScores);
      console.log('Category counts:', categoryCounts);
    }

    // 7. Test with stored results from database
    console.log('\n7. Testing with stored database results...');
    if (usersData.testResults && usersData.testResults.length > 0) {
      const latestResult = usersData.testResults[0];
      console.log('Latest database result:');
      console.log('- Linguistic:', latestResult.linguistic_percentage, '%');
      console.log('- Logical:', latestResult.logical_percentage, '%');
      console.log('- Interpersonal:', latestResult.interpersonal_percentage, '%');
      console.log('- Results JSONB:', latestResult.results ? latestResult.results.length : 'None');
      
      if (latestResult.results && latestResult.results.length > 0) {
        console.log('Database results sample:', latestResult.results.slice(0, 3));
      }
    }

    console.log('\n🎉 Frontend results display test completed!');
    console.log('\n📋 Summary:');
    console.log(`✅ Questions: ${questionsData.questions.length}`);
    console.log(`✅ Users: ${usersData.users.length}`);
    console.log(`✅ Test answers: ${Object.keys(answers).length}`);
    console.log(`✅ Calculation working: ${hasNonZeroResults ? 'Yes' : 'No'}`);
    console.log(`✅ Database results: ${usersData.testResults ? usersData.testResults.length : 0}`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testFrontendResultsDisplay();
