// Debug script to find out why results are showing 0%
// Run this with: node scripts/debug-zero-results.js

async function debugZeroResults() {
  try {
    console.log('🔍 Debugging zero results issue...');
    
    // 1. Get all questions
    console.log('\n1. Getting all questions...');
    const questionsResponse = await fetch('http://localhost:3000/api/questions');
    const questionsData = await questionsResponse.json();
    console.log(`✅ Questions loaded: ${questionsData.questions.length}`);
    
    // Check question structure
    if (questionsData.questions.length > 0) {
      const firstQuestion = questionsData.questions[0];
      console.log('First question structure:', {
        id: firstQuestion.id,
        category: firstQuestion.category,
        text: firstQuestion.text?.substring(0, 50) + '...',
        hasCategory: !!firstQuestion.category
      });
    }
    
    // 2. Simulate user answering all questions
    console.log('\n2. Simulating user answers...');
    const allAnswers = {};
    questionsData.questions.forEach((question, index) => {
      allAnswers[question.id] = Math.floor(Math.random() * 5); // Random 0-4
    });
    
    console.log(`✅ Simulated answers for ${Object.keys(allAnswers).length} questions`);
    console.log('Sample answers:', Object.entries(allAnswers).slice(0, 5));
    
    // 3. Test the calculation logic step by step
    console.log('\n3. Testing calculation logic...');
    
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
    
    let processedQuestions = 0;
    let skippedQuestions = 0;
    
    // Process each answer
    Object.entries(allAnswers).forEach(([questionId, answer]) => {
      const question = questionsData.questions.find(q => q.id === parseInt(questionId));
      if (question) {
        console.log(`Processing question ${questionId}: category=${question.category}, answer=${answer}`);
        
        if (!question.category) {
          console.log(`❌ Question ${questionId} has no category - skipping`);
          skippedQuestions++;
          return;
        }
        
        const key = normalizeCategory(question.category);
        const scoreValue = answer + 1; // Convert 0-4 to 1-5
        categoryScores[key] += scoreValue;
        categoryCounts[key] += 1;
        processedQuestions++;
        console.log(`✅ Added to ${key}: score=${scoreValue}, total=${categoryScores[key]}, count=${categoryCounts[key]}`);
      } else {
        console.log(`❌ Question ${questionId} not found in questions array`);
        skippedQuestions++;
      }
    });
    
    console.log(`\n📊 Processing Summary:`);
    console.log(`Processed questions: ${processedQuestions}`);
    console.log(`Skipped questions: ${skippedQuestions}`);
    console.log(`Total questions: ${Object.keys(allAnswers).length}`);
    
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
    
    console.log('\nFinal sorted results:');
    sortedResults.forEach((result, index) => {
      console.log(`${index + 1}. ${result.category}: ${result.percentage}%`);
    });
    
    const hasNonZeroResults = sortedResults.some(r => r.percentage > 0);
    console.log(`\n✅ Has non-zero results: ${hasNonZeroResults}`);
    
    if (!hasNonZeroResults) {
      console.log('\n❌ DIAGNOSIS: All results are 0%');
      console.log('Possible causes:');
      console.log('1. Questions don\'t have categories');
      console.log('2. Category normalization is failing');
      console.log('3. Answer format is wrong');
      console.log('4. Questions are being skipped');
      
      // Check categories
      const questionsWithCategories = questionsData.questions.filter(q => q.category);
      console.log(`\nQuestions with categories: ${questionsWithCategories.length}/${questionsData.questions.length}`);
      
      if (questionsWithCategories.length === 0) {
        console.log('❌ NO QUESTIONS HAVE CATEGORIES - This is the problem!');
      }
    } else {
      console.log('✅ Assessment calculation is working correctly!');
    }
    
    // 4. Test database storage with new format
    console.log('\n4. Testing database storage with new format...');
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
      
      const responsesArray = responses.map((response) => ({
        question_id: response.questionId,
        answer: response.answer
      }));
      
      const testData = {
        userId: testUserId,
        responses: responses,
        results: sortedResults,
        enhancedResults: {
          top3Intelligences: sortedResults.slice(0, 3).map(r => ({
            intelligence: r.category,
            percentage: r.percentage,
            description: `Description for ${r.category}`
          }))
        },
        gender: 'male',
        timing: null
      };
      
      console.log('Testing simple API storage...');
      const simpleResponse = await fetch('http://localhost:3000/api/test-results-simple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });
      
      if (simpleResponse.ok) {
        const result = await simpleResponse.json();
        console.log('✅ Simple API storage successful:', result.message);
      } else {
        const error = await simpleResponse.text();
        console.log('❌ Simple API storage failed:', error);
      }
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

debugZeroResults();
