import { prisma } from './prisma'
import { hashPassword, verifyPassword } from './auth'

export interface CreateUserData {
  email: string
  name?: string
  password: string
}

export interface TestAnswer {
  questionId: number
  answer: number
}

export interface TestResultData {
  userId: string
  answers: TestAnswer[]
  scores: {
    linguistic: number
    logical: number
    spatial: number
    musical: number
    bodily: number
    interpersonal: number
    intrapersonal: number
    naturalist: number
  }
  percentages: {
    linguistic: number
    logical: number
    spatial: number
    musical: number
    bodily: number
    interpersonal: number
    intrapersonal: number
    naturalist: number
  }
  topIntelligence: string
  secondIntelligence: string
  thirdIntelligence: string
}

// User operations
export async function createUser(data: CreateUserData) {
  const hashedPassword = await hashPassword(data.password)
  
  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  })
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  })
}

export async function verifyUserCredentials(email: string, password: string) {
  const user = await findUserByEmail(email)
  if (!user) return null

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  }
}

// Test result operations
export async function saveTestResult(data: TestResultData) {
  return prisma.testResult.create({
    data: {
      userId: data.userId,
      answers: data.answers,
      linguisticScore: data.scores.linguistic,
      logicalScore: data.scores.logical,
      spatialScore: data.scores.spatial,
      musicalScore: data.scores.musical,
      bodilyScore: data.scores.bodily,
      interpersonalScore: data.scores.interpersonal,
      intrapersonalScore: data.scores.intrapersonal,
      naturalistScore: data.scores.naturalist,
      linguisticPercentage: data.percentages.linguistic,
      logicalPercentage: data.percentages.logical,
      spatialPercentage: data.percentages.spatial,
      musicalPercentage: data.percentages.musical,
      bodilyPercentage: data.percentages.bodily,
      interpersonalPercentage: data.percentages.interpersonal,
      intrapersonalPercentage: data.percentages.intrapersonal,
      naturalistPercentage: data.percentages.naturalist,
      topIntelligence: data.topIntelligence,
      secondIntelligence: data.secondIntelligence,
      thirdIntelligence: data.thirdIntelligence,
    },
  })
}

export async function getUserTestResults(userId: string) {
  return prisma.testResult.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getLatestTestResult(userId: string) {
  return prisma.testResult.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

// Question operations
export async function getAllQuestions() {
  return prisma.question.findMany({
    orderBy: { id: 'asc' },
  })
}

export async function createQuestion(data: {
  text: string
  category: string
  options: string[]
}) {
  return prisma.question.create({
    data: {
      text: data.text,
      category: data.category,
      options: data.options,
    },
  })
}

// Analytics operations
export async function updateAnalytics() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const existingAnalytics = await prisma.analytics.findFirst({
    where: {
      date: {
        gte: today,
        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    },
  })

  if (existingAnalytics) {
    // Update existing analytics
    return prisma.analytics.update({
      where: { id: existingAnalytics.id },
      data: {
        totalTests: { increment: 1 },
      },
    })
  } else {
    // Create new analytics entry
    return prisma.analytics.create({
      data: {
        date: today,
        totalTests: 1,
        totalUsers: 0,
      },
    })
  }
}

export async function getAnalytics() {
  return prisma.analytics.findMany({
    orderBy: { date: 'desc' },
    take: 30, // Last 30 days
  })
}
