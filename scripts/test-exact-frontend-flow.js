// Test the exact frontend flow to identify why results show 0%

const API_BASE = 'http://localhost:3000/api';

async function testExactFrontendFlow() {
  console.log('🧪 Testing Exact Frontend Flow...\n');

  try {
    // 1. Get questions (simulating frontend load)
    console.log('1. Loading questions (frontend simulation)...');
    const questionsResponse = await fetch(`${API_BASE}/questions`);
    const questionsData = await questionsResponse.json();
    
    if (!questionsData.questions || questionsData.questions.length === 0) {
      console.log('❌ No questions found');
      return;
    }
    
    const questions = questionsData.questions;
    console.log(`✅ Questions loaded: ${questions.length}`);
    
    // 2. Simulate pagination (1 question per page)
    const QUESTIONS_PER_PAGE = 1;
    const TOTAL_PAGES = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
    console.log(`📄 Total pages: ${TOTAL_PAGES}`);
    
    // 3. Simulate user going through all pages and answering
    console.log('\n3. Simulating user answering all questions...');
    let answers = {};
    let currentPageAnswers = {};
    
    // Simulate answering first 10 questions (for testing)
    for (let pageIndex = 0; pageIndex < Math.min(10, TOTAL_PAGES); pageIndex++) {
      const startIndex = pageIndex * QUESTIONS_PER_PAGE;
      const endIndex = startIndex + QUESTIONS_PER_PAGE;
      const currentPageQuestions = questions.slice(startIndex, endIndex);
      
      console.log(`\n--- Page ${pageIndex + 1} ---`);
      console.log(`Questions on this page: ${currentPageQuestions.length}`);
      
      // Simulate user answering the question on this page
      currentPageAnswers = {};
      currentPageQuestions.forEach(question => {
        const answer = Math.floor(Math.random() * 5) + 1; // Random answer 1-5
        currentPageAnswers[question.id] = answer;
        console.log(`Question ${question.id} (${question.category}): Answer ${answer}`);
      });
      
      // Simulate handleNextPage logic
      console.log('Saving current page answers to main answers...');
      console.log('Current page answers:', currentPageAnswers);
      console.log('Previous main answers:', answers);
      
      answers = {
        ...answers,
        ...currentPageAnswers
      };
      
      console.log('New combined answers:', answers);
      console.log(`Total answers collected: ${Object.keys(answers).length}`);
    }
    
    console.log(`\n✅ Simulated answering ${Object.keys(answers).length} questions`);
    console.log('Final answers sample:', Object.entries(answers).slice(0, 5));
    
    // 4. Simulate handleSubmitTest
    console.log('\n4. Simulating handleSubmitTest...');
    const finalAnswers = { ...answers, ...currentPageAnswers };
    console.log('Final answers for calculation:', Object.keys(finalAnswers).length);
    
    // 5. Simulate calculateResults function
    console.log('\n5. Simulating calculateResults function...');
    
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

    // 6. Calculate percentages (exact frontend logic)
    console.log('\n6. Calculating percentages (frontend logic)...');
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
      console.log('✅ Results have non-zero percentages - calculation is working');
      console.log('Top 3 results:', sortedResults.slice(0, 3));
      
      // Check if this matches what would be displayed in frontend
      console.log('\n8. Frontend display simulation...');
      console.log('Top result:', sortedResults[0].category, sortedResults[0].percentage + '%');
      console.log('Second result:', sortedResults[1].category, sortedResults[1].percentage + '%');
      console.log('Third result:', sortedResults[2].category, sortedResults[2].percentage + '%');
      
    } else {
      console.log('❌ All results are zero - calculation issue');
      console.log('Category scores:', categoryScores);
      console.log('Category counts:', categoryCounts);
      
      // Debug why scores are zero
      console.log('\nDebugging zero scores...');
      Object.entries(categoryScores).forEach(([category, score]) => {
        const count = categoryCounts[category];
        console.log(`${category}: score=${score}, count=${count}`);
      });
    }

    console.log('\n🎉 Exact frontend flow test completed!');
    console.log('\n📋 Summary:');
    console.log(`✅ Questions: ${questions.length}`);
    console.log(`✅ Pages simulated: ${Math.min(10, TOTAL_PAGES)}`);
    console.log(`✅ Answers collected: ${Object.keys(finalAnswers).length}`);
    console.log(`✅ Calculation working: ${hasNonZeroResults ? 'Yes' : 'No'}`);
    console.log(`✅ Top result: ${sortedResults[0]?.category} (${sortedResults[0]?.percentage}%)`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testExactFrontendFlow();
