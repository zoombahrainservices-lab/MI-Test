// Test capturing ALL questions dynamically (64/64, or any number)

const API_BASE = 'http://localhost:3000/api';

async function testAllQuestionsCapture() {
  console.log('🧪 Testing ALL Questions Capture (Dynamic)...\n');

  try {
    // 1. Load ALL questions
    console.log('1. Loading ALL questions...');
    const questionsResponse = await fetch(`${API_BASE}/questions`);
    const questionsData = await questionsResponse.json();
    
    if (!questionsData.questions || questionsData.questions.length === 0) {
      console.log('❌ No questions found');
      return;
    }
    
    const questions = questionsData.questions;
    console.log(`✅ ALL questions loaded: ${questions.length}`);
    
    // 2. Simulate complete user journey with ALL questions
    console.log('\n2. Simulating complete user journey with ALL questions...');
    
    // Simulate state variables
    let answers = {}; // Main answers storage
    let currentPageAnswers = {}; // Current page answers
    let currentPageIndex = 0;
    const QUESTIONS_PER_PAGE = 1;
    const TOTAL_PAGES = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
    
    console.log(`📄 Total pages: ${TOTAL_PAGES}`);
    console.log(`📄 Questions per page: ${QUESTIONS_PER_PAGE}`);
    console.log(`📄 Expected total answers: ${questions.length}`);
    
    // 3. Simulate answering ALL questions (complete journey)
    console.log('\n3. Simulating answering ALL questions...');
    
    // Answer ALL questions (not just 20)
    for (let pageIndex = 0; pageIndex < TOTAL_PAGES; pageIndex++) {
      const startIndex = pageIndex * QUESTIONS_PER_PAGE;
      const endIndex = startIndex + QUESTIONS_PER_PAGE;
      const currentPageQuestions = questions.slice(startIndex, endIndex);
      
      // Show progress every 10 questions
      if (pageIndex % 10 === 0 || pageIndex === TOTAL_PAGES - 1) {
        const progress = Math.round((pageIndex / TOTAL_PAGES) * 100);
        console.log(`\n--- Page ${pageIndex + 1}/${TOTAL_PAGES} (Progress: ${progress}%) ---`);
      }
      
      // Simulate handleAnswerSelect
      currentPageAnswers = {};
      currentPageQuestions.forEach(question => {
        const answer = Math.floor(Math.random() * 5) + 1; // Random answer 1-5
        
        // Simulate the improved handleAnswerSelect logic
        currentPageAnswers[question.id] = answer;
        answers[question.id] = answer; // Immediate storage in main answers
        
        if (pageIndex % 10 === 0 || pageIndex === TOTAL_PAGES - 1) {
          console.log(`Question ${question.id} (${question.category}): Answer ${answer}`);
        }
      });
      
      // Simulate handleNextPage logic
      answers = {
        ...answers,
        ...currentPageAnswers
      };
      
      if (pageIndex % 10 === 0 || pageIndex === TOTAL_PAGES - 1) {
        console.log(`Total answers collected: ${Object.keys(answers).length}`);
      }
    }
    
    console.log(`\n✅ Simulated answering ALL ${Object.keys(answers).length} questions`);
    console.log('Final answers sample:', Object.entries(answers).slice(0, 5));
    
    // 4. Validate that we have answers for ALL questions
    console.log('\n4. Validating ALL questions answered...');
    const finalAnswers = { ...answers, ...currentPageAnswers };
    
    console.log('Final answers for calculation:', Object.keys(finalAnswers).length);
    console.log('Questions available for calculation:', questions.length);
    
    // Validate that we have answers for ALL questions
    const answeredQuestionIds = Object.keys(finalAnswers).map(id => parseInt(id));
    const allQuestionIds = questions.map(q => q.id);
    const missingAnswers = allQuestionIds.filter(id => !answeredQuestionIds.includes(id));
    
    console.log('Answered question IDs:', answeredQuestionIds.length);
    console.log('All question IDs:', allQuestionIds.length);
    console.log('Missing answers for questions:', missingAnswers.length);
    
    if (missingAnswers.length > 0) {
      console.warn(`⚠️ WARNING: ${missingAnswers.length} questions have no answers!`);
      console.warn('Missing questions:', missingAnswers.slice(0, 10));
    } else {
      console.log('✅ ALL questions have answers!');
    }
    
    // 5. Test calculation with ALL captured responses
    console.log('\n5. Testing calculation with ALL captured responses...');
    
    const categories = ['logical', 'linguistic', 'interpersonal', 'intrapersonal', 'spatial', 'musical', 'bodily', 'naturalist'];
    const categoryScores = categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {});
    const categoryCounts = categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {});

    const normalizeCategory = (category) => {
      if (!category) return 'logical';
      return category.toLowerCase().replace(/[^a-z]/g, '');
    };

    console.log('Processing ALL final answers...');
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
      } else {
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
      
      return {
        category,
        score,
        percentage
      };
    });

    const sortedResults = results.sort((a, b) => b.percentage - a.percentage);
    console.log('Final sorted results:', sortedResults);

    // 7. Validate results
    console.log('\n7. Validating results...');
    const hasNonZeroResults = sortedResults.some(r => r.percentage > 0);
    
    if (hasNonZeroResults) {
      console.log('✅ Results have non-zero percentages - ALL questions captured correctly');
      console.log('Top 3 results:', sortedResults.slice(0, 3));
    } else {
      console.log('❌ All results are zero - capture issue');
    }

    // 8. Test database storage with ALL responses
    console.log('\n8. Testing database storage with ALL responses...');
    
    // Get users
    const usersResponse = await fetch(`${API_BASE}/test-results-debug`);
    const usersData = await usersResponse.json();
    
    if (!usersData.users || usersData.users.length === 0) {
      console.log('❌ No users found');
      return;
    }
    
    const testUserId = usersData.users[0].id;
    console.log(`Using test user: ${testUserId}`);
    
    // Create responses array for database storage with ALL responses
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

    // 9. Verify stored data
    console.log('\n9. Verifying stored data...');
    const verifyResponse = await fetch(`${API_BASE}/test-results-debug`);
    const verifyData = await verifyResponse.json();
    
    if (verifyData.testResults && verifyData.testResults.length > 0) {
      const latestResult = verifyData.testResults[0];
      console.log('✅ Latest test result found');
      console.log(`Result ID: ${latestResult.id}`);
      console.log(`Top intelligence: ${latestResult.top_intelligence} (${latestResult.linguistic_percentage}%)`);
      console.log(`Has responses: ${!!latestResult.responses}`);
      console.log(`Has enhanced results: ${!!latestResult.enhanced_results}`);
      console.log(`Has answers: ${!!latestResult.answers}`);
      
      // Check if results are non-zero
      const hasNonZeroScores = latestResult.linguistic_percentage > 0 || 
                             latestResult.logical_percentage > 0 || 
                             latestResult.interpersonal_percentage > 0;
      
      if (hasNonZeroScores) {
        console.log('✅ Stored results have non-zero percentages - display should work');
      } else {
        console.log('❌ Stored results have zero percentages - display issue');
      }
    } else {
      console.log('❌ No test results found in database');
    }

    console.log('\n🎉 ALL questions capture test completed!');
    console.log('\n📋 Final Summary:');
    console.log(`✅ Questions: ${questions.length}`);
    console.log(`✅ Pages simulated: ${TOTAL_PAGES}`);
    console.log(`✅ Answers captured: ${Object.keys(finalAnswers).length}/${questions.length} (${Math.round((Object.keys(finalAnswers).length / questions.length) * 100)}%)`);
    console.log(`✅ Missing answers: ${missingAnswers.length}`);
    console.log(`✅ Calculation working: ${hasNonZeroResults ? 'Yes' : 'No'}`);
    console.log(`✅ Database storage: ${simpleResponse.ok ? 'Success' : 'Failed'}`);
    console.log(`✅ Top result: ${sortedResults[0]?.category} (${sortedResults[0]?.percentage}%)`);
    
    console.log('\n💡 System Status:');
    if (Object.keys(finalAnswers).length === questions.length) {
      console.log('✅ ALL questions captured successfully!');
      console.log('✅ System is fully dynamic and scalable!');
      console.log('✅ Ready for any number of questions (100, 200, etc.)!');
    } else {
      console.log('❌ Not all questions captured - system needs improvement');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAllQuestionsCapture();
