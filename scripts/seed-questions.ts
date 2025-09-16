import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const questions = [
  // Linguistic Intelligence
  { text: "I enjoy reading books and writing stories", category: "Linguistic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I find it easy to learn new languages", category: "Linguistic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I love word games and puzzles", category: "Linguistic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  
  // Logical-Mathematical Intelligence
  { text: "I enjoy solving math problems and logic puzzles", category: "Logical-Mathematical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I like to analyze patterns and relationships", category: "Logical-Mathematical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I prefer step-by-step problem solving", category: "Logical-Mathematical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  
  // Spatial Intelligence
  { text: "I can easily visualize objects in 3D", category: "Spatial", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I enjoy drawing, painting, or designing", category: "Spatial", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I have a good sense of direction", category: "Spatial", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  
  // Musical Intelligence
  { text: "I can easily remember melodies and rhythms", category: "Musical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I enjoy playing musical instruments", category: "Musical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I notice sounds that others might miss", category: "Musical", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  
  // Bodily-Kinesthetic Intelligence
  { text: "I learn best through hands-on activities", category: "Bodily-Kinesthetic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I enjoy sports and physical activities", category: "Bodily-Kinesthetic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I have good hand-eye coordination", category: "Bodily-Kinesthetic", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  
  // Interpersonal Intelligence
  { text: "I enjoy working in groups and teams", category: "Interpersonal", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I can easily understand other people's feelings", category: "Interpersonal", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I am a natural leader", category: "Interpersonal", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  
  // Intrapersonal Intelligence
  { text: "I enjoy spending time alone to reflect", category: "Intrapersonal", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I have a strong sense of self-awareness", category: "Intrapersonal", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I prefer to work independently", category: "Intrapersonal", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  
  // Naturalist Intelligence
  { text: "I enjoy spending time in nature", category: "Naturalist", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I can easily identify different plants and animals", category: "Naturalist", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  { text: "I care deeply about environmental issues", category: "Naturalist", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
]

async function main() {
  console.log('Seeding questions...')
  
  // Clear existing questions
  await prisma.question.deleteMany()
  
  // Create questions
  for (const question of questions) {
    await prisma.question.create({
      data: question,
    })
  }
  
  console.log(`Seeded ${questions.length} questions`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
