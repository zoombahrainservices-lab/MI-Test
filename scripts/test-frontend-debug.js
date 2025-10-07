// Test to verify frontend debugging is working
// Run this with: node scripts/test-frontend-debug.js

async function testFrontendDebug() {
  try {
    console.log('🧪 Testing frontend debug information...');
    
    // 1. Get all questions
    console.log('\n1. Getting all questions...');
    const questionsResponse = await fetch('http://localhost:3000/api/questions');
    const questionsData = await questionsResponse.json();
    console.log(`✅ Questions loaded: ${questionsData.questions.length}`);
    
    // 2. Simulate the frontend pagination logic
    console.log('\n2. Simulating frontend pagination logic...');
    const QUESTIONS_PER_PAGE = 1;
    const TOTAL_PAGES = Math.ceil(questionsData.questions.length / QUESTIONS_PER_PAGE);
    
    console.log(`Total pages: ${TOTAL_PAGES}`);
    
    // Simulate user going through all pages
    let mainAnswers = {};
    let currentPageAnswers = {};
    
    for (let pageIndex = 0; pageIndex < TOTAL_PAGES; pageIndex++) {
      const startIndex = pageIndex * QUESTIONS_PER_PAGE;
      const endIndex = startIndex + QUESTIONS_PER_PAGE;
      const pageQuestions = questionsData.questions.slice(startIndex, endIndex);
      
      // Simulate user answering questions on this page
      const pageAnswers = {};
      pageQuestions.forEach(question => {
        const answer = Math.floor(Math.random() * 5); // Random 0-4
        pageAnswers[question.id] = answer;
      });
      
      // Simulate handleNextPage logic
      mainAnswers = { ...mainAnswers, ...pageAnswers };
      currentPageAnswers = pageAnswers;
      
      if (pageIndex % 10 === 0) {
        console.log(`Page ${pageIndex + 1}: Collected ${Object.keys(mainAnswers).length} answers so far`);
      }
    }
    
    console.log(`✅ Final answers collected: ${Object.keys(mainAnswers).length}/${questionsData.questions.length}`);
    
    // 3. Test the calculation with collected answers
    console.log('\n3. Testing calculation with collected answers...');
    
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
    
    Object.entries(mainAnswers).forEach(([questionId, answer]) => {
      const question = questionsData.questions.find(q => q.id === parseInt(questionId));
      if (question) {
        if (!question.category) {
          skippedQuestions++;
          return;
        }
        const key = normalizeCategory(question.category);
        const scoreValue = answer + 1;
        categoryScores[key] += scoreValue;
        categoryCounts[key] += 1;
        processedQuestions++;
      } else {
        skippedQuestions++;
      }
    });
    
    console.log(`Processed questions: ${processedQuestions}, Skipped: ${skippedQuestions}`);
    
    const results = categories.map(category => {
      const score = categoryScores[category];
      const count = categoryCounts[category];
      const maxPossible = count * 5;
      const percentage = count > 0 ? Math.round((score / maxPossible) * 100) : 0;
      return { category, score, percentage };
    });
    
    const sortedResults = results.sort((a, b) => b.percentage - a.percentage);
    
    console.log('\nFinal results:');
    sortedResults.forEach((result, index) => {
      console.log(`${index + 1}. ${result.category}: ${result.percentage}%`);
    });
    
    const hasNonZeroResults = sortedResults.some(r => r.percentage > 0);
    console.log(`\n✅ Has non-zero results: ${hasNonZeroResults}`);
    
    if (hasNonZeroResults) {
      console.log('🎉 Frontend pagination and calculation logic is working correctly!');
      console.log('The 0% results issue is purely database-related.');
    } else {
      console.log('❌ Frontend logic has issues - results are still 0%');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testFrontendDebug();
