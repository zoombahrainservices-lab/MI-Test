// Debug stored results to understand why they show 0%

const API_BASE = 'http://localhost:3000/api';

async function debugStoredResults() {
  console.log('🔍 Debugging Stored Results...\n');

  try {
    // Get all test results
    const response = await fetch(`${API_BASE}/test-results-debug`);
    const data = await response.json();
    
    if (!data.testResults || data.testResults.length === 0) {
      console.log('❌ No test results found');
      return;
    }
    
    console.log(`✅ Found ${data.testResults.length} test results`);
    
    // Check the latest result
    const latestResult = data.testResults[0];
    console.log('\n📊 Latest Test Result:');
    console.log('ID:', latestResult.id);
    console.log('User ID:', latestResult.user_id);
    console.log('Created:', latestResult.created_at);
    console.log('Level:', latestResult.level);
    
    // Check individual scores
    console.log('\n📈 Individual Intelligence Scores:');
    console.log('Linguistic:', latestResult.linguistic_score, '(', latestResult.linguistic_percentage, '%)');
    console.log('Logical:', latestResult.logical_score, '(', latestResult.logical_percentage, '%)');
    console.log('Spatial:', latestResult.spatial_score, '(', latestResult.spatial_percentage, '%)');
    console.log('Musical:', latestResult.musical_score, '(', latestResult.musical_percentage, '%)');
    console.log('Bodily:', latestResult.bodily_score, '(', latestResult.bodily_percentage, '%)');
    console.log('Interpersonal:', latestResult.interpersonal_score, '(', latestResult.interpersonal_percentage, '%)');
    console.log('Intrapersonal:', latestResult.intrapersonal_score, '(', latestResult.intrapersonal_percentage, '%)');
    console.log('Naturalist:', latestResult.naturalist_score, '(', latestResult.naturalist_percentage, '%)');
    
    // Check top intelligences
    console.log('\n🏆 Top Intelligences:');
    console.log('1st:', latestResult.top_intelligence);
    console.log('2nd:', latestResult.second_intelligence);
    console.log('3rd:', latestResult.third_intelligence);
    
    // Check if results JSONB exists
    console.log('\n📋 Results JSONB:');
    if (latestResult.results) {
      console.log('Results array length:', latestResult.results.length);
      console.log('Sample results:', latestResult.results.slice(0, 3));
    } else {
      console.log('❌ No results JSONB found');
    }
    
    // Check if enhanced results exist
    console.log('\n🚀 Enhanced Results:');
    if (latestResult.enhanced_results) {
      console.log('Enhanced results available:', !!latestResult.enhanced_results);
      if (latestResult.enhanced_results.topIntelligences) {
        console.log('Top intelligences count:', latestResult.enhanced_results.topIntelligences.length);
      }
    } else {
      console.log('❌ No enhanced results found');
    }
    
    // Check if responses exist
    console.log('\n💬 Responses:');
    if (latestResult.responses) {
      console.log('Responses array length:', latestResult.responses.length);
      console.log('Sample responses:', latestResult.responses.slice(0, 3));
    } else {
      console.log('❌ No responses found');
    }
    
    // Check if answers exist
    console.log('\n📝 Answers:');
    if (latestResult.answers) {
      console.log('Answers array length:', latestResult.answers.length);
      console.log('Sample answers:', latestResult.answers.slice(0, 3));
    } else {
      console.log('❌ No answers found');
    }

    console.log('\n🎯 Analysis:');
    const hasNonZeroScores = latestResult.linguistic_score > 0 || 
                           latestResult.logical_score > 0 || 
                           latestResult.spatial_score > 0;
    
    if (hasNonZeroScores) {
      console.log('✅ Some scores are non-zero - calculation is working');
    } else {
      console.log('❌ All scores are zero - calculation issue');
    }
    
    if (latestResult.results && latestResult.results.length > 0) {
      console.log('✅ Results JSONB exists - data is stored');
    } else {
      console.log('❌ No results JSONB - data not stored properly');
    }

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

debugStoredResults();
