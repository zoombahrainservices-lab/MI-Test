// Test the MI Assessment Engine directly
// Run this with: node scripts/test-assessment-engine.js

// Mock the MI Assessment Engine
class MIAssessmentEngine {
  constructor() {
    this.userScores = {}
    this.questionCounts = {}
  }

  initializeIntelligences() {
    const intelligences = ['linguistic', 'logical', 'spatial', 'musical', 'bodily', 'interpersonal', 'intrapersonal', 'naturalist', 'existential']
    intelligences.forEach(intelligence => {
      this.userScores[intelligence] = 0
      this.questionCounts[intelligence] = 0
    })
  }

  normalizeCategory(category) {
    const mapping = {
      'Linguistic': 'linguistic',
      'Logical-Mathematical': 'logical',
      'Visual-Spatial': 'spatial',
      'Musical-Rhythmic': 'musical',
      'Bodily-Kinesthetic': 'bodily',
      'Interpersonal': 'interpersonal',
      'Intrapersonal': 'intrapersonal',
      'Naturalistic': 'naturalist',
      'Existential': 'existential'
    }
    return mapping[category] || category.toLowerCase()
  }

  processAnswers(answers, questions) {
    console.log('Processing answers:', answers)
    console.log('Questions available:', questions.length)
    
    this.initializeIntelligences()
    
    // Calculate raw scores
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId))
      if (question && question.category) {
        const intelligence = this.normalizeCategory(question.category)
        console.log(`Question ${questionId}: category=${question.category}, intelligence=${intelligence}, answer=${answer}`)
        if (this.userScores.hasOwnProperty(intelligence)) {
          const scoreValue = answer + 1
          this.userScores[intelligence] += scoreValue
          this.questionCounts[intelligence] += 1
          console.log(`Added to ${intelligence}: score=${scoreValue}, total=${this.userScores[intelligence]}, count=${this.questionCounts[intelligence]}`)
        }
      }
    })
    
    console.log('Final scores:', this.userScores)
    console.log('Final counts:', this.questionCounts)
    
    // Calculate intelligence scores
    const intelligenceScores = this.calculateIntelligenceScores()
    console.log('Intelligence scores:', intelligenceScores)
    
    return {
      intelligenceScores,
      top3Intelligences: intelligenceScores.slice(0, 3),
      quotientScores: this.calculateQuotients(intelligenceScores),
      careerMatches: []
    }
  }

  calculateIntelligenceScores() {
    const scores = []
    
    Object.keys(this.userScores).forEach(intelligence => {
      const rawScore = this.userScores[intelligence]
      const count = this.questionCounts[intelligence]
      const maxPossible = count * 5
      const percentage = count > 0 ? Math.round((rawScore / maxPossible) * 100) : 0
      
      console.log(`${intelligence}: raw=${rawScore}, count=${count}, max=${maxPossible}, percentage=${percentage}`)
      
      scores.push({
        intelligence,
        rawScore,
        maxPossible,
        percentage,
        description: `Description for ${intelligence}`
      })
    })
    
    return scores.sort((a, b) => b.percentage - a.percentage)
  }

  calculateQuotients(scores) {
    const scoreMap = new Map(scores.map(s => [s.intelligence, s.percentage]))
    console.log('Score map:', Object.fromEntries(scoreMap))
    
    const quotients = [
      {
        name: 'IQ (Intelligence Quotient)',
        percentage: Math.round(((scoreMap.get('logical') || 0) + (scoreMap.get('linguistic') || 0)) / 2),
        description: 'Analytical and verbal reasoning abilities'
      },
      {
        name: 'EQ (Emotional Quotient)',
        percentage: Math.round(((scoreMap.get('interpersonal') || 0) + (scoreMap.get('intrapersonal') || 0)) / 2),
        description: 'Emotional intelligence and self-awareness'
      },
      {
        name: 'AQ (Adaptability Quotient)',
        percentage: Math.round(((scoreMap.get('bodily') || 0) + (scoreMap.get('naturalist') || 0)) / 2),
        description: 'Physical and environmental adaptability'
      },
      {
        name: 'CQ (Creative Quotient)',
        percentage: Math.round(((scoreMap.get('spatial') || 0) + (scoreMap.get('musical') || 0)) / 2),
        description: 'Creative and artistic abilities'
      },
      {
        name: 'SQ (Spiritual Quotient)',
        percentage: Math.round(((scoreMap.get('existential') || 0) + (scoreMap.get('intrapersonal') || 0)) / 2),
        description: 'Spiritual awareness and meaning-making'
      }
    ]
    
    console.log('Quotients:', quotients)
    return quotients
  }
}

async function testAssessmentEngine() {
  try {
    console.log('🧪 Testing MI Assessment Engine...');
    
    // Get questions
    const questionsResponse = await fetch('http://localhost:3000/api/questions');
    const questionsData = await questionsResponse.json();
    console.log(`Loaded ${questionsData.questions.length} questions`);
    
    // Create mock answers
    const mockAnswers = {};
    questionsData.questions.slice(0, 20).forEach((question, index) => {
      mockAnswers[question.id] = Math.floor(Math.random() * 5); // Random 0-4
    });
    
    console.log('Mock answers:', mockAnswers);
    
    // Test assessment engine
    const engine = new MIAssessmentEngine();
    const result = engine.processAnswers(mockAnswers, questionsData.questions);
    
    console.log('\n🎯 Assessment Result:');
    console.log('Top 3 Intelligences:', result.top3Intelligences);
    console.log('Quotient Scores:', result.quotientScores);
    
    // Check if any scores are non-zero
    const hasNonZeroScores = result.top3Intelligences.some(i => i.percentage > 0);
    const hasNonZeroQuotients = result.quotientScores.some(q => q.percentage > 0);
    
    console.log(`\n✅ Has non-zero intelligence scores: ${hasNonZeroScores}`);
    console.log(`✅ Has non-zero quotient scores: ${hasNonZeroQuotients}`);
    
    if (!hasNonZeroScores) {
      console.log('❌ All intelligence scores are 0 - this is the problem!');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAssessmentEngine();
