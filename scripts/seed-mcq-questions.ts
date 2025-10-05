import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

type Q = { text: string; options: string[]; correctAnswers: number[]; difficulty?: string }

const section = (title: string, items: Array<{ q: string; opts: string[]; ansIndex: number | number[] }>, difficulty: string): Q[] => {
  return items.map(i => ({ text: `${title}\n\n${i.q}`, options: i.opts, correctAnswers: Array.isArray(i.ansIndex) ? i.ansIndex : [i.ansIndex], difficulty }))
}

const numerical: Q[] = section('Section 1: Numerical Ability', [
  { q: 'What is 25% of 200?', opts: ['25','50','75','100'], ansIndex: 1 },
  { q: 'If 5x = 45, what is x?', opts: ['5','7','9','10'], ansIndex: 2 },
  { q: 'The sum of 15 and 37 is:', opts: ['52','42','50','53'], ansIndex: 0 },
  { q: 'If a train travels 60 km in 1.5 hours, its speed is:', opts: ['40 km/h','45 km/h','50 km/h','55 km/h'], ansIndex: 0 },
  { q: '5/8 + 3/4 = ?', opts: ['1','7/8','1 1/8','1 1/4'], ansIndex: 2 },
  { q: 'The LCM of 6 and 8 is:', opts: ['14','24','48','12'], ansIndex: 1 },
  { q: 'What is 15²?', opts: ['210','225','230','250'], ansIndex: 1 },
  { q: 'If 3 pencils cost $1.50, how much for 10 pencils?', opts: ['$4.50','$5.00','$5.50','$6.00'], ansIndex: 1 },
  { q: 'The difference between 85 and 47 is:', opts: ['28','38','48','32'], ansIndex: 1 },
  { q: 'A bag contains 6 red, 4 blue, and 5 green balls. Total balls are:', opts: ['15','14','16','18'], ansIndex: 0 },
  { q: '√144 = ?', opts: ['10','11','12','14'], ansIndex: 2 },
  { q: 'If a number is increased by 20% and becomes 120, the original number is:', opts: ['90','95','100','105'], ansIndex: 2 },
  { q: '50% of 240 is:', opts: ['120','110','100','130'], ansIndex: 0 },
  { q: '3/5 of a number is 36. The number is:', opts: ['50','55','60','65'], ansIndex: 2 },
  { q: '7 × 8 ÷ 4 = ?', opts: ['10','12','14','16'], ansIndex: 2 },
], 'easy')

const logical: Q[] = section('Section 2: Logical Reasoning', [
  { q: 'If all roses are flowers and some flowers fade quickly, can we say all roses fade quickly?', opts: ['Yes','No','Cannot say','None'], ansIndex: 2 },
  { q: 'Find the odd one out: 2, 4, 8, 16, 20, 32', opts: ['4','8','20','32'], ansIndex: 2 },
  { q: 'Complete the series: 3, 6, 12, 24, ?', opts: ['30','36','48','50'], ansIndex: 2 },
  { q: 'Which number comes next: 2, 5, 10, 17, 26, ?', opts: ['35','37','38','39'], ansIndex: 1 },
  { q: 'If A > B, B > C, then:', opts: ['A > C','C > A','A = C','Cannot say'], ansIndex: 0 },
  { q: 'Find the next number: 1, 4, 9, 16, ?', opts: ['20','25','24','30'], ansIndex: 1 },
  { q: 'If CAT is coded as DBU, DOG is coded as EPH, then FOX is coded as:', opts: ['GPY','GPZ','GQY','GQZ'], ansIndex: 1 },
  { q: 'Find the odd one: Triangle, Square, Circle, Cube', opts: ['Triangle','Square','Circle','Cube'], ansIndex: 3 },
  { q: 'If 7 + 3 = 210, 5 + 4 = 95, 6 + 2 = ?', opts: ['48','32','410','48'], ansIndex: 0 },
  { q: 'Which one is next in the series? J, F, M, A, M, ?', opts: ['J','A','J','F'], ansIndex: 0 },
  { q: 'If 2 pencils + 3 pens = 17, 4 pencils + 2 pens = 20, find 1 pencil + 1 pen.', opts: ['5','6','7','8'], ansIndex: 1 },
  { q: 'A cube has how many edges?', opts: ['6','8','12','16'], ansIndex: 2 },
  { q: 'Find the missing letter: A, C, F, J, ?', opts: ['N','O','M','P'], ansIndex: 0 },
  { q: 'Find the odd one: Mercury, Venus, Earth, Pluto', opts: ['Mercury','Venus','Earth','Pluto'], ansIndex: 3 },
  { q: 'If 3 + 6 = 18, 4 + 5 = 20, 5 + 6 = ?', opts: ['25','30','33','35'], ansIndex: 1 },
], 'medium')

const verbal: Q[] = section('Section 3: Verbal Ability', [
  { q: 'Synonym of “Abundant”:', opts: ['Scarce','Plentiful','Tiny','Rare'], ansIndex: 1 },
  { q: 'Antonym of “Ancient”:', opts: ['Old','Modern','Elderly','Past'], ansIndex: 1 },
  { q: 'Fill in the blank: She is good ___ singing.', opts: ['in','at','on','for'], ansIndex: 1 },
  { q: 'Choose correct word: He ___ to school every day.', opts: ['go','goes','going','gone'], ansIndex: 1 },
  { q: 'Pick the odd one: Happy, Joyful, Sad, Cheerful', opts: ['Happy','Joyful','Sad','Cheerful'], ansIndex: 2 },
  { q: 'Correct spelling:', opts: ['Accommodate','Acommodate','Accomodate','Acomodate'], ansIndex: 0 },
  { q: 'Fill in the blank: I have lived here ___ 5 years.', opts: ['since','for','at','by'], ansIndex: 1 },
  { q: 'Synonym of “Brave”:', opts: ['Cowardly','Courageous','Afraid','Nervous'], ansIndex: 1 },
  { q: 'Choose the correct idiom: “Hit the nail on the ___”', opts: ['head','hand','foot','wall'], ansIndex: 0 },
  { q: 'Antonym of “Scarcity”:', opts: ['Shortage','Lack','Abundance','Deficiency'], ansIndex: 2 },
], 'easy')

const spatial: Q[] = section('Section 4: Analytical/Spatial Ability', [
  { q: 'If all squares are rectangles and all rectangles are shapes, are all squares shapes?', opts: ['Yes','No','Cannot say','None'], ansIndex: 0 },
  { q: 'Which figure comes next? (Sequence: △, □, △, □, ?)', opts: ['△','□','○','◇'], ansIndex: 0 },
  { q: 'How many sides does a hexagon have?', opts: ['5','6','7','8'], ansIndex: 1 },
  { q: 'Find the mirror image of “123”', opts: ['321','213','132','312'], ansIndex: 0 },
  { q: 'Which number completes the pattern: 2, 6, 12, 20, 30, ?', opts: ['40','42','48','50'], ansIndex: 1 },
  { q: 'If a clock shows 3:00, the angle between hour and minute hand is:', opts: ['90°','80°','100°','120°'], ansIndex: 0 },
  { q: 'If a cube has 8 vertices, how many faces does it have?', opts: ['4','6','8','12'], ansIndex: 1 },
  { q: 'Which shape has all sides equal and all angles 90°?', opts: ['Rectangle','Square','Rhombus','Parallelogram'], ansIndex: 1 },
  { q: 'If A is taller than B and B is taller than C, who is the shortest?', opts: ['A','B','C','Cannot say'], ansIndex: 2 },
  { q: 'Find the odd one: Triangle, Circle, Rectangle, Sphere', opts: ['Triangle','Circle','Rectangle','Sphere'], ansIndex: 3 },
], 'medium')

const questions: Q[] = [...numerical, ...logical, ...verbal, ...spatial]

async function main() {
  for (const q of questions) {
    const { error } = await supabase.from('mcq_questions').insert({
      text: q.text,
      options: q.options,
      correct_answers: q.correctAnswers,
      difficulty: q.difficulty || 'easy',
      is_active: true,
    })
    if (error) {
      console.error('Insert error:', error)
      process.exitCode = 1
    }
  }
  console.log(`Inserted ${questions.length} MCQ questions.`)
}

main()


