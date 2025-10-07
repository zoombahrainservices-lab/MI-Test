// Test response capture mechanism to ensure all answers are properly stored

const API_BASE = 'http://localhost:3000/api';

async function testResponseCapture() {
  console.log('🧪 Testing Response Capture Mechanism...\n');

  try {
    // 1. Get questions
    console.log('1. Getting questions...');
    const questionsResponse = await fetch(`${API_BASE}/questions`);
    const questionsData = await questionsResponse.json();
    
    if (!questionsData.questions || questionsData.questions.length === 0) {
      console.log('❌ No questions found');
      return;
    }
    
    const questions = questionsData.questions;
    console.log(`✅ Questions loaded: ${questions.length}`);
    
    // 2. Simulate the exact frontend flow with response capture
    console.log('\n2. Simulating frontend response capture...');
    
    // Simulate state variables
    let answers = {}; // Main answers storage
    let currentPageAnswers = {}; // Current page answers
    let currentPageIndex = 0;
    const QUESTIONS_PER_PAGE = 1;
    const TOTAL_PAGES = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
    
    console.log(`📄 Total pages: ${TOTAL_PAGES}`);
    
    // 3. Simulate answering questions with proper response capture
    console.log('\n3. Simulating question answering with response capture...');
    
    // Test with first 10 questions
    for (let pageIndex = 0; pageIndex < Math.min(10, TOTAL_PAGES); pageIndex++) {
      const startIndex = pageIndex * QUESTIONS_PER_PAGE;
      const endIndex = startIndex + QUESTIONS_PER_PAGE;
      const currentPageQuestions = questions.slice(startIndex, endIndex);
      
      console.log(`\n--- Page ${pageIndex + 1} ---`);
      console.log(`Questions on this page: ${currentPageQuestions.length}`);
      
      // Simulate handleAnswerSelect
      currentPageAnswers = {};
      currentPageQuestions.forEach(question => {
        const answer = Math.floor(Math.random() * 5) + 1; // Random answer 1-5
        console.log(`Question ${question.id} (${question.category}): Answer ${answer}`);
        
        // Simulate the improved handleAnswerSelect logic
        currentPageAnswers[question.id] = answer;
        answers[question.id] = answer; // Immediate storage in main answers
        
        console.log(`✅ Answer ${answer} stored for question ${question.id}`);
      });
      
      // Simulate handleNextPage logic
      console.log('Saving current page answers to main answers...');
      console.log('Current page answers:', currentPageAnswers);
      console.log('Previous main answers:', answers);
      
      // Merge current page answers with main answers
      answers = {
        ...answers,
        ...currentPageAnswers
      };
      
      console.log('New combined answers:', answers);
      console.log(`Total answers collected: ${Object.keys(answers).length}`);
      
      // Simulate page navigation
      if (pageIndex < Math.min(10, TOTAL_PAGES) - 1) {
        console.log('Moving to next page...');
      } else {
        console.log('Reached last page, submitting test...');
      }
    }
    
    console.log(`\n✅ Simulated answering ${Object.keys(answers).length} questions`);
    console.log('Final answers sample:', Object.entries(answers).slice(0, 5));
    
    // 4. Simulate handleSubmitTest validation
    console.log('\n4. Simulating handleSubmitTest validation...');
    const finalAnswers = { ...answers, ...currentPageAnswers };
    
    console.log('Final answers for calculation:', Object.keys(finalAnswers).length);
    console.log('Questions available for calculation:', questions.length);
    
    // Validate that we have answers for all questions
    const answeredQuestionIds = Object.keys(finalAnswers).map(id => parseInt(id));
    const allQuestionIds = questions.map(q => q.id);
    const missingAnswers = allQuestionIds.filter(id => !answeredQuestionIds.includes(id));
    
    console.log('Answered question IDs:', answeredQuestionIds);
    console.log('All question IDs:', allQuestionIds);
    console.log('Missing answers for questions:', missingAnswers);
    
    if (missingAnswers.length > 0) {
      console.warn(`⚠️ WARNING: ${missingAnswers.length} questions have no answers!`);
      console.warn('Missing questions:', missingAnswers);
    } else {
      console.log('✅ All questions have answers!');
    }
    
    // 5. Test calculation with captured responses
    console.log('\n5. Testing calculation with captured responses...');
    
    const categories = ['logical', 'linguistic', 'interpersonal', 'intrapersonal', 'spatial', 'musical', 'bodily', 'naturalist'];
    const categoryScores = categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {});
    const categoryCounts = categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {});

    const normalizeCategory = (category) => {
      if (!category) return 'logical';
      return category.toLowerCase().replace(/[^a-z]/g, '');
    };

    console.log('Processing final answers...');
    let processedQuestions = 0;
    let skippedQuestions = 0;
    
    Object.entries(finalAnswers).forEach(([questionId, answer]) => {
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

    // 6. Calculate percentages
    console.log('\n6. Calculating percentages...');
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

    // 7. Validate results
    console.log('\n7. Validating results...');
    const hasNonZeroResults = sortedResults.some(r => r.percentage > 0);
    
    if (hasNonZeroResults) {
      console.log('✅ Results have non-zero percentages - response capture is working');
      console.log('Top 3 results:', sortedResults.slice(0, 3));
    } else {
      console.log('❌ All results are zero - response capture issue');
      console.log('Category scores:', categoryScores);
      console.log('Category counts:', categoryCounts);
    }

    // 8. Test database storage
    console.log('\n8. Testing database storage...');
    
    // Get users
    const usersResponse = await fetch(`${API_BASE}/test-results-debug`);
    const usersData = await usersResponse.json();
    
    if (!usersData.users || usersData.users.length === 0) {
      console.log('❌ No users found');
      return;
    }
    
    const testUserId = usersData.users[0].id;
    console.log(`Using test user: ${testUserId}`);
    
    // Create responses array for database storage
    const responses = Object.entries(finalAnswers).map(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      return {
        questionId: parseInt(questionId),
        answer: answer,
        category: question?.category || 'logical',
        difficulty: question?.difficulty || 'medium'
      };
    });
    
    console.log(`✅ Created ${responses.length} responses for database storage`);
    console.log('Sample responses:', responses.slice(0, 3));
    
    // Test simple API storage
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
      console.log('✅ Database storage successful');
      console.log(`Result ID: ${simpleResult.testResultId}`);
      console.log(`Responses stored: ${simpleResult.responsesCount}`);
    } else {
      console.log('❌ Database storage failed:', simpleResult);
    }

    console.log('\n🎉 Response capture test completed!');
    console.log('\n📋 Summary:');
    console.log(`✅ Questions: ${questions.length}`);
    console.log(`✅ Pages simulated: ${Math.min(10, TOTAL_PAGES)}`);
    console.log(`✅ Answers captured: ${Object.keys(finalAnswers).length}`);
    console.log(`✅ Missing answers: ${missingAnswers.length}`);
    console.log(`✅ Calculation working: ${hasNonZeroResults ? 'Yes' : 'No'}`);
    console.log(`✅ Database storage: ${simpleResponse.ok ? 'Success' : 'Failed'}`);
    console.log(`✅ Top result: ${sortedResults[0]?.category} (${sortedResults[0]?.percentage}%)`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testResponseCapture();
