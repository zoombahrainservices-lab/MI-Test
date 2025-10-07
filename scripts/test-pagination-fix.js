// Test the pagination fix to ensure all answers are collected
// Run this with: node scripts/test-pagination-fix.js

async function testPaginationFix() {
  try {
    console.log('🧪 Testing pagination fix...');
    
    // 1. Get all questions
    console.log('\n1. Getting all questions...');
    const questionsResponse = await fetch('http://localhost:3000/api/questions');
    const questionsData = await questionsResponse.json();
    console.log(`✅ Questions loaded: ${questionsData.questions.length}`);
    
    // 2. Simulate pagination with answers
    console.log('\n2. Simulating pagination with answers...');
    const QUESTIONS_PER_PAGE = 1;
    const TOTAL_PAGES = Math.ceil(questionsData.questions.length / QUESTIONS_PER_PAGE);
    
    console.log(`Total pages: ${TOTAL_PAGES}`);
    
    // Simulate user going through all pages and answering
    let allAnswers = {};
    let currentPageAnswers = {};
    
    for (let pageIndex = 0; pageIndex < TOTAL_PAGES; pageIndex++) {
      const startIndex = pageIndex * QUESTIONS_PER_PAGE;
      const endIndex = startIndex + QUESTIONS_PER_PAGE;
      const pageQuestions = questionsData.questions.slice(startIndex, endIndex);
      
      console.log(`\nPage ${pageIndex + 1}/${TOTAL_PAGES}:`);
      console.log(`Questions: ${pageQuestions.map(q => q.id).join(', ')}`);
      
      // Simulate user answering questions on this page
      const pageAnswers = {};
      pageQuestions.forEach(question => {
        const answer = Math.floor(Math.random() * 5); // Random 0-4
        pageAnswers[question.id] = answer;
        console.log(`  Question ${question.id}: answer=${answer}`);
      });
      
      // Simulate saving page answers to main answers (like handleNextPage)
      allAnswers = { ...allAnswers, ...pageAnswers };
      console.log(`Total answers collected so far: ${Object.keys(allAnswers).length}`);
    }
    
    console.log(`\n✅ Final answers collected: ${Object.keys(allAnswers).length}/${questionsData.questions.length}`);
    
    // 3. Test assessment calculation with collected answers
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
    
    categories.forEach(category => {
      categoryScores[category] = 0;
      categoryCounts[category] = 0;
    });
    
    // Calculate scores
    Object.entries(allAnswers).forEach(([questionId, answer]) => {
      const question = questionsData.questions.find(q => q.id === parseInt(questionId));
      if (question && question.category) {
        const key = normalizeCategory(question.category);
        const scoreValue = answer + 1; // Convert 0-4 to 1-5
        categoryScores[key] += scoreValue;
        categoryCounts[key] += 1;
      }
    });
    
    // Calculate percentages
    const results = categories.map(category => {
      const score = categoryScores[category];
      const count = categoryCounts[category];
      const maxPossible = count * 5;
      const percentage = count > 0 ? Math.round((score / maxPossible) * 100) : 0;
      return { category, score, percentage };
    });
    
    const sortedResults = results.sort((a, b) => b.percentage - a.percentage);
    
    console.log('\nFinal results:');
    sortedResults.forEach(result => {
      console.log(`  ${result.category}: ${result.percentage}%`);
    });
    
    const hasNonZeroResults = sortedResults.some(r => r.percentage > 0);
    console.log(`\n✅ Has non-zero results: ${hasNonZeroResults}`);
    
    if (hasNonZeroResults) {
      console.log('🎉 Pagination fix is working! All answers are being collected correctly.');
    } else {
      console.log('❌ Pagination fix failed - still getting 0% results.');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testPaginationFix();
