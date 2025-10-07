export interface IntelligenceScore {
  intelligence: string
  rawScore: number
  maxPossible: number
  percentage: number
  description: string
}

export interface QuotientScore {
  name: string
  percentage: number
  description: string
}

export interface CareerMatch {
  career: string
  matchPercentage: number
  description: string
  requiredIntelligences: string[]
  salaryRange?: string
  educationLevel?: string
}

export interface AssessmentResult {
  topIntelligences: IntelligenceScore[]
  allIntelligences: IntelligenceScore[]
  quotients: QuotientScore[]
  careerMatches: CareerMatch[]
  bestFitCareers: CareerMatch[]
  personalizedAdvice: string[]
}

// Intelligence definitions with descriptions
export const INTELLIGENCE_DEFINITIONS = {
  linguistic: {
    name: 'Linguistic-Verbal',
    description: 'Word smart - excels at reading, writing, speaking, and language learning',
    icon: '📚'
  },
  logical: {
    name: 'Logical-Mathematical', 
    description: 'Number smart - strong analytical thinking, problem-solving, and mathematical reasoning',
    icon: '🔢'
  },
  spatial: {
    name: 'Visual-Spatial',
    description: 'Picture smart - excellent at visualizing, designing, and spatial reasoning',
    icon: '🧩'
  },
  musical: {
    name: 'Musical-Rhythmic',
    description: 'Music smart - sensitive to sounds, rhythms, tones, and musical patterns',
    icon: '🎵'
  },
  bodily: {
    name: 'Bodily-Kinesthetic',
    description: 'Body smart - skilled at physical activities, hands-on learning, and movement',
    icon: '🏃'
  },
  interpersonal: {
    name: 'Interpersonal',
    description: 'People smart - excellent at understanding and relating to others',
    icon: '👥'
  },
  intrapersonal: {
    name: 'Intrapersonal',
    description: 'Self smart - strong self-awareness, introspection, and emotional intelligence',
    icon: '🧠'
  },
  naturalist: {
    name: 'Naturalistic',
    description: 'Nature smart - connected to nature, environmental awareness, and natural patterns',
    icon: '🌿'
  },
  existential: {
    name: 'Existential-Spiritual',
    description: 'Spirit smart - contemplates deep questions about life, meaning, and existence',
    icon: '✨'
  }
}

// Career mapping with intelligence weights
export const CAREER_MAPPING: Record<string, Record<string, number>> = {
  'Data Scientist': {
    logical: 0.35,
    linguistic: 0.15,
    intrapersonal: 0.20,
    spatial: 0.10,
    interpersonal: 0.10,
    musical: 0.05,
    bodily: 0.02,
    naturalist: 0.02,
    existential: 0.01
  },
  'Software Engineer': {
    logical: 0.30,
    spatial: 0.25,
    linguistic: 0.15,
    intrapersonal: 0.15,
    interpersonal: 0.08,
    musical: 0.04,
    bodily: 0.02,
    naturalist: 0.01,
    existential: 0.00
  },
  'Teacher/Educator': {
    linguistic: 0.30,
    interpersonal: 0.30,
    intrapersonal: 0.20,
    logical: 0.10,
    musical: 0.05,
    spatial: 0.03,
    bodily: 0.01,
    naturalist: 0.01,
    existential: 0.00
  },
  'UX/UI Designer': {
    spatial: 0.40,
    interpersonal: 0.20,
    musical: 0.15,
    linguistic: 0.10,
    logical: 0.08,
    intrapersonal: 0.05,
    bodily: 0.01,
    naturalist: 0.01,
    existential: 0.00
  },
  'Marketing Manager': {
    interpersonal: 0.25,
    linguistic: 0.25,
    intrapersonal: 0.20,
    logical: 0.15,
    spatial: 0.08,
    musical: 0.04,
    bodily: 0.02,
    naturalist: 0.01,
    existential: 0.00
  },
  'Psychologist/Counselor': {
    interpersonal: 0.35,
    intrapersonal: 0.30,
    linguistic: 0.15,
    logical: 0.10,
    spatial: 0.05,
    musical: 0.03,
    bodily: 0.01,
    naturalist: 0.01,
    existential: 0.00
  },
  'Architect': {
    spatial: 0.35,
    logical: 0.20,
    linguistic: 0.15,
    intrapersonal: 0.15,
    interpersonal: 0.08,
    musical: 0.04,
    bodily: 0.02,
    naturalist: 0.01,
    existential: 0.00
  },
  'Doctor/Physician': {
    logical: 0.25,
    interpersonal: 0.25,
    intrapersonal: 0.20,
    linguistic: 0.15,
    spatial: 0.08,
    bodily: 0.05,
    musical: 0.01,
    naturalist: 0.01,
    existential: 0.00
  },
  'Musician/Composer': {
    musical: 0.50,
    intrapersonal: 0.20,
    spatial: 0.15,
    interpersonal: 0.08,
    linguistic: 0.04,
    logical: 0.02,
    bodily: 0.01,
    naturalist: 0.00,
    existential: 0.00
  },
  'Athlete/Sports Professional': {
    bodily: 0.40,
    intrapersonal: 0.25,
    interpersonal: 0.15,
    logical: 0.10,
    spatial: 0.05,
    linguistic: 0.03,
    musical: 0.01,
    naturalist: 0.01,
    existential: 0.00
  },
  'Environmental Scientist': {
    naturalist: 0.35,
    logical: 0.25,
    intrapersonal: 0.15,
    linguistic: 0.10,
    spatial: 0.08,
    interpersonal: 0.05,
    musical: 0.01,
    bodily: 0.01,
    existential: 0.00
  },
  'HR Manager': {
    interpersonal: 0.35,
    linguistic: 0.20,
    intrapersonal: 0.20,
    logical: 0.15,
    spatial: 0.05,
    musical: 0.03,
    bodily: 0.01,
    naturalist: 0.01,
    existential: 0.00
  },
  'Graphic Designer': {
    spatial: 0.35,
    musical: 0.20,
    interpersonal: 0.15,
    linguistic: 0.10,
    intrapersonal: 0.10,
    logical: 0.05,
    bodily: 0.03,
    naturalist: 0.02,
    existential: 0.00
  },
  'Business Analyst': {
    logical: 0.30,
    linguistic: 0.20,
    intrapersonal: 0.20,
    interpersonal: 0.15,
    spatial: 0.10,
    musical: 0.03,
    bodily: 0.01,
    naturalist: 0.01,
    existential: 0.00
  },
  'Social Worker': {
    interpersonal: 0.40,
    intrapersonal: 0.25,
    linguistic: 0.15,
    logical: 0.10,
    spatial: 0.05,
    musical: 0.03,
    bodily: 0.01,
    naturalist: 0.01,
    existential: 0.00
  },
  'Research Scientist': {
    logical: 0.30,
    intrapersonal: 0.25,
    linguistic: 0.20,
    spatial: 0.15,
    interpersonal: 0.05,
    musical: 0.03,
    bodily: 0.01,
    naturalist: 0.01,
    existential: 0.00
  },
  'Chef/Culinary Professional': {
    bodily: 0.30,
    spatial: 0.25,
    musical: 0.20,
    interpersonal: 0.15,
    intrapersonal: 0.05,
    linguistic: 0.03,
    logical: 0.01,
    naturalist: 0.01,
    existential: 0.00
  },
  'Journalist/Writer': {
    linguistic: 0.40,
    intrapersonal: 0.20,
    interpersonal: 0.15,
    logical: 0.15,
    spatial: 0.05,
    musical: 0.03,
    bodily: 0.01,
    naturalist: 0.01,
    existential: 0.00
  },
  'Financial Advisor': {
    logical: 0.30,
    interpersonal: 0.25,
    linguistic: 0.20,
    intrapersonal: 0.15,
    spatial: 0.05,
    musical: 0.03,
    bodily: 0.01,
    naturalist: 0.01,
    existential: 0.00
  },
  'Therapist/Counselor': {
    interpersonal: 0.40,
    intrapersonal: 0.30,
    linguistic: 0.15,
    logical: 0.10,
    spatial: 0.03,
    musical: 0.01,
    bodily: 0.01,
    naturalist: 0.00,
    existential: 0.00
  }
}

export class MIAssessmentEngine {
  private userScores: Record<string, number> = {}
  private questionCounts: Record<string, number> = {}

  constructor() {
    this.initializeIntelligences()
  }

  private initializeIntelligences() {
    const intelligences = Object.keys(INTELLIGENCE_DEFINITIONS)
    intelligences.forEach(intelligence => {
      this.userScores[intelligence] = 0
      this.questionCounts[intelligence] = 0
    })
  }

  // Process user answers and calculate scores
  public processAnswers(answers: Record<number, number>, questions: any[]): AssessmentResult {
    console.log('MI Assessment Engine: Processing answers', answers)
    console.log('MI Assessment Engine: Questions available', questions.length)
    
    this.initializeIntelligences()
    
    // Calculate raw scores for each intelligence
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId))
      if (question && question.category) {
        const intelligence = this.normalizeCategory(question.category)
        console.log(`Processing question ${questionId}: category=${question.category}, intelligence=${intelligence}, answer=${answer}`)
        if (this.userScores.hasOwnProperty(intelligence)) {
          // Convert 0-4 scale to 1-5 scale
          const scoreValue = answer + 1
          this.userScores[intelligence] += scoreValue
          this.questionCounts[intelligence] += 1
          console.log(`Added to ${intelligence}: score=${scoreValue}, total=${this.userScores[intelligence]}, count=${this.questionCounts[intelligence]}`)
        }
      }
    })
    
    console.log('Final user scores:', this.userScores)
    console.log('Final question counts:', this.questionCounts)

    // Calculate normalized scores
    const intelligenceScores = this.calculateIntelligenceScores()
    
    // Calculate quotients
    const quotients = this.calculateQuotients(intelligenceScores)
    
    // Find career matches
    const careerMatches = this.calculateCareerMatches(intelligenceScores)
    
    // Generate personalized advice
    const personalizedAdvice = this.generatePersonalizedAdvice(intelligenceScores, quotients)

    return {
      topIntelligences: intelligenceScores.slice(0, 3),
      allIntelligences: intelligenceScores,
      quotients,
      careerMatches,
      bestFitCareers: careerMatches.slice(0, 3),
      personalizedAdvice
    }
  }

  private normalizeCategory(category: string): string {
    const c = (category || '').toLowerCase()
    if (c.includes('logical') || c.includes('mathematical')) return 'logical'
    if (c.includes('linguistic') || c.includes('verbal')) return 'linguistic'
    if (c.includes('spatial') || c.includes('visual')) return 'spatial'
    if (c.includes('musical') || c.includes('creative')) return 'musical'
    if (c.includes('bodily') || c.includes('kinesthetic')) return 'bodily'
    if (c.includes('interpersonal')) return 'interpersonal'
    if (c.includes('intrapersonal')) return 'intrapersonal'
    if (c.includes('natural') || c.includes('naturalist')) return 'naturalist'
    if (c.includes('existential') || c.includes('spiritual')) return 'existential'
    return c
  }

  private calculateIntelligenceScores(): IntelligenceScore[] {
    const scores: IntelligenceScore[] = []
    
    Object.entries(this.userScores).forEach(([intelligence, rawScore]) => {
      const questionCount = this.questionCounts[intelligence]
      const maxPossible = questionCount * 5
      const percentage = questionCount > 0 ? Math.round((rawScore / maxPossible) * 100) : 0
      
      const definition = INTELLIGENCE_DEFINITIONS[intelligence as keyof typeof INTELLIGENCE_DEFINITIONS]
      
      scores.push({
        intelligence,
        rawScore,
        maxPossible,
        percentage,
        description: definition?.description || 'Intelligence description not available'
      })
    })

    return scores.sort((a, b) => b.percentage - a.percentage)
  }

  private calculateQuotients(scores: IntelligenceScore[]): QuotientScore[] {
    const scoreMap = new Map(scores.map(s => [s.intelligence, s.percentage]))
    console.log('Score map for quotients:', Object.fromEntries(scoreMap))
    
    const quotients: QuotientScore[] = [
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

    console.log('Calculated quotients:', quotients)
    return quotients
  }

  private calculateCareerMatches(scores: IntelligenceScore[]): CareerMatch[] {
    const scoreMap = new Map(scores.map(s => [s.intelligence, s.percentage]))
    const matches: CareerMatch[] = []

    Object.entries(CAREER_MAPPING).forEach(([career, weights]) => {
      let totalMatch = 0
      let totalWeight = 0
      const requiredIntelligences: string[] = []

      Object.entries(weights).forEach(([intelligence, weight]) => {
        if (weight > 0.1) { // Only include intelligences with significant weight
          requiredIntelligences.push(intelligence)
        }
        const userScore = scoreMap.get(intelligence) || 0
        totalMatch += userScore * weight
        totalWeight += weight
      })

      const matchPercentage = Math.round(totalMatch / totalWeight)
      
      matches.push({
        career,
        matchPercentage,
        description: this.getCareerDescription(career),
        requiredIntelligences,
        salaryRange: this.getSalaryRange(career),
        educationLevel: this.getEducationLevel(career)
      })
    })

    return matches.sort((a, b) => b.matchPercentage - a.matchPercentage)
  }

  private getCareerDescription(career: string): string {
    const descriptions: Record<string, string> = {
      'Data Scientist': 'Analyzes complex data to help organizations make informed decisions',
      'Software Engineer': 'Designs and develops software applications and systems',
      'Teacher/Educator': 'Educates and inspires students in various subjects and life skills',
      'UX/UI Designer': 'Creates user-friendly and visually appealing digital experiences',
      'Marketing Manager': 'Develops and executes marketing strategies to promote products/services',
      'Psychologist/Counselor': 'Helps individuals understand and overcome psychological challenges',
      'Architect': 'Designs buildings and structures that are functional and aesthetically pleasing',
      'Doctor/Physician': 'Diagnoses and treats medical conditions to improve patient health',
      'Musician/Composer': 'Creates and performs music for entertainment and artistic expression',
      'Athlete/Sports Professional': 'Competes in sports and maintains peak physical performance',
      'Environmental Scientist': 'Studies and protects the natural environment',
      'HR Manager': 'Manages human resources and organizational development',
      'Graphic Designer': 'Creates visual communications and design solutions',
      'Business Analyst': 'Analyzes business processes and recommends improvements',
      'Social Worker': 'Helps individuals and communities overcome social challenges',
      'Research Scientist': 'Conducts scientific research to advance knowledge',
      'Chef/Culinary Professional': 'Creates culinary experiences and manages food service',
      'Journalist/Writer': 'Communicates information and stories through written content',
      'Financial Advisor': 'Provides financial planning and investment advice',
      'Therapist/Counselor': 'Provides therapeutic support for mental health and well-being'
    }
    return descriptions[career] || 'Professional career in various industries'
  }

  private getSalaryRange(career: string): string {
    const ranges: Record<string, string> = {
      'Data Scientist': '$70,000 - $150,000',
      'Software Engineer': '$60,000 - $180,000',
      'Teacher/Educator': '$40,000 - $80,000',
      'UX/UI Designer': '$50,000 - $120,000',
      'Marketing Manager': '$50,000 - $130,000',
      'Psychologist/Counselor': '$45,000 - $100,000',
      'Architect': '$50,000 - $120,000',
      'Doctor/Physician': '$150,000 - $400,000+',
      'Musician/Composer': '$30,000 - $100,000+',
      'Athlete/Sports Professional': '$40,000 - $1,000,000+',
      'Environmental Scientist': '$45,000 - $90,000',
      'HR Manager': '$50,000 - $120,000',
      'Graphic Designer': '$35,000 - $80,000',
      'Business Analyst': '$55,000 - $110,000',
      'Social Worker': '$35,000 - $70,000',
      'Research Scientist': '$50,000 - $120,000',
      'Chef/Culinary Professional': '$30,000 - $80,000',
      'Journalist/Writer': '$30,000 - $80,000',
      'Financial Advisor': '$40,000 - $150,000+',
      'Therapist/Counselor': '$40,000 - $90,000'
    }
    return ranges[career] || 'Varies by experience and location'
  }

  private getEducationLevel(career: string): string {
    const levels: Record<string, string> = {
      'Data Scientist': 'Bachelor\'s in Computer Science, Statistics, or related field',
      'Software Engineer': 'Bachelor\'s in Computer Science or related field',
      'Teacher/Educator': 'Bachelor\'s in Education + Teaching Certification',
      'UX/UI Designer': 'Bachelor\'s in Design, HCI, or related field',
      'Marketing Manager': 'Bachelor\'s in Marketing, Business, or related field',
      'Psychologist/Counselor': 'Master\'s or Doctorate in Psychology',
      'Architect': 'Bachelor\'s or Master\'s in Architecture',
      'Doctor/Physician': 'Medical Degree (MD/DO)',
      'Musician/Composer': 'Bachelor\'s in Music or equivalent experience',
      'Athlete/Sports Professional': 'High School + Professional Training',
      'Environmental Scientist': 'Bachelor\'s or Master\'s in Environmental Science',
      'HR Manager': 'Bachelor\'s in HR, Business, or related field',
      'Graphic Designer': 'Bachelor\'s in Graphic Design or related field',
      'Business Analyst': 'Bachelor\'s in Business, Economics, or related field',
      'Social Worker': 'Bachelor\'s or Master\'s in Social Work',
      'Research Scientist': 'Master\'s or Doctorate in relevant field',
      'Chef/Culinary Professional': 'Culinary School or Apprenticeship',
      'Journalist/Writer': 'Bachelor\'s in Journalism, English, or related field',
      'Financial Advisor': 'Bachelor\'s in Finance, Economics, or related field',
      'Therapist/Counselor': 'Master\'s in Counseling, Psychology, or related field'
    }
    return levels[career] || 'Varies by position and requirements'
  }

  private generatePersonalizedAdvice(scores: IntelligenceScore[], quotients: QuotientScore[]): string[] {
    const advice: string[] = []
    const topIntelligence = scores[0]
    const secondIntelligence = scores[1]
    const thirdIntelligence = scores[2]

    // Top intelligence advice
    if (topIntelligence) {
      advice.push(`Your strongest intelligence is ${INTELLIGENCE_DEFINITIONS[topIntelligence.intelligence as keyof typeof INTELLIGENCE_DEFINITIONS]?.name} (${topIntelligence.percentage}%). This suggests you excel in areas that require ${topIntelligence.description.toLowerCase()}.`)
    }

    // Career development advice
    if (topIntelligence && secondIntelligence) {
      advice.push(`Consider careers that combine your top strengths: ${INTELLIGENCE_DEFINITIONS[topIntelligence.intelligence as keyof typeof INTELLIGENCE_DEFINITIONS]?.name} and ${INTELLIGENCE_DEFINITIONS[secondIntelligence.intelligence as keyof typeof INTELLIGENCE_DEFINITIONS]?.name}. This combination can lead to unique professional opportunities.`)
    }

    // Development areas
    const lowestScore = scores[scores.length - 1]
    if (lowestScore && lowestScore.percentage < 60) {
      advice.push(`Consider developing your ${INTELLIGENCE_DEFINITIONS[lowestScore.intelligence as keyof typeof INTELLIGENCE_DEFINITIONS]?.name} intelligence through targeted activities and learning experiences.`)
    }

    // Quotient-specific advice
    const highestQuotient = quotients.reduce((prev, current) => (prev.percentage > current.percentage) ? prev : current)
    advice.push(`Your highest quotient is ${highestQuotient.name} (${highestQuotient.percentage}%), indicating strong ${highestQuotient.description.toLowerCase()}.`)

    return advice
  }
}

// Export utility functions
export const getIntelligenceIcon = (intelligence: string): string => {
  return INTELLIGENCE_DEFINITIONS[intelligence as keyof typeof INTELLIGENCE_DEFINITIONS]?.icon || '💡'
}

export const getIntelligenceName = (intelligence: string): string => {
  return INTELLIGENCE_DEFINITIONS[intelligence as keyof typeof INTELLIGENCE_DEFINITIONS]?.name || intelligence
}

export const getIntelligenceDescription = (intelligence: string): string => {
  return INTELLIGENCE_DEFINITIONS[intelligence as keyof typeof INTELLIGENCE_DEFINITIONS]?.description || 'Intelligence description not available'
}
