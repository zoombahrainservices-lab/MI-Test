// Browser script to add comprehensive MI questions
// Run this in your browser console on the Supabase dashboard or your app

const questions = [
  // Logical-Mathematical Intelligence
  { text: "I like to step back and study a situation before I get directly involved.", category: "logical", difficulty: "medium" },
  { text: "I gather facts and examine them carefully to reach sound conclusions.", category: "logical", difficulty: "medium" },
  { text: "I enjoy solving challenging problems that require deep thought and research.", category: "logical", difficulty: "medium" },
  { text: "I prefer to hold back my opinions until I've thoroughly checked the details.", category: "logical", difficulty: "medium" },
  { text: "I appreciate depth, precision, and complexity in the subjects I care about.", category: "logical", difficulty: "medium" },
  { text: "I can remain objective when evaluating problems or situations.", category: "logical", difficulty: "medium" },
  { text: "I often search for hidden rules or patterns that explain how things work.", category: "logical", difficulty: "medium" },

  // Linguistic-Verbal Intelligence
  { text: "Recognition for my ideas and contributions matters to me.", category: "linguistic", difficulty: "medium" },
  { text: "I actively welcome constructive feedback to sharpen and improve my work.", category: "linguistic", difficulty: "medium" },

  // Interpersonal Intelligence
  { text: "I can easily sense when someone needs care, support, or encouragement.", category: "interpersonal", difficulty: "medium" },
  { text: "I often step in to help others without expecting anything in return.", category: "interpersonal", difficulty: "medium" },
  { text: "Making sure people feel valued and cared for is important in my relationships.", category: "interpersonal", difficulty: "medium" },
  { text: "I naturally build and maintain strong, close connections with others.", category: "interpersonal", difficulty: "medium" },
  { text: "I often put other people's needs ahead of my own.", category: "interpersonal", difficulty: "medium" },
  { text: "I'm comfortable showing affection and expressing care toward people I value.", category: "interpersonal", difficulty: "medium" },
  { text: "My happiness is closely tied to the well-being of those around me.", category: "interpersonal", difficulty: "medium" },
  { text: "People often approach me to talk about their feelings or seek advice.", category: "interpersonal", difficulty: "medium" },
  { text: "Helping others gives me a sense of meaning and fulfillment.", category: "interpersonal", difficulty: "medium" },
  { text: "I look for opportunities to support or encourage people whenever I can.", category: "interpersonal", difficulty: "medium" },
  { text: "It matters to me that others see me as kind and dependable.", category: "interpersonal", difficulty: "medium" },
  { text: "I tend to offer help before someone even asks for it.", category: "interpersonal", difficulty: "medium" },
  { text: "My mood is often influenced by the emotional states of those around me.", category: "interpersonal", difficulty: "medium" },

  // Intrapersonal Intelligence
  { text: "I'm always looking for ways to be more efficient and effective.", category: "intrapersonal", difficulty: "medium" },
  { text: "Recognition from my peers motivates me to keep striving for success.", category: "intrapersonal", difficulty: "medium" },
  { text: "I set fresh goals once I achieve the ones I've been working toward.", category: "intrapersonal", difficulty: "medium" },
  { text: "I adjust my approach if it helps me reach my goals faster or better.", category: "intrapersonal", difficulty: "medium" },
  { text: "Achieving goals is central to how I define success for myself.", category: "intrapersonal", difficulty: "medium" },
  { text: "I am highly driven by ambition and personal achievement.", category: "intrapersonal", difficulty: "medium" },
  { text: "I feel proud when my accomplishments are acknowledged.", category: "intrapersonal", difficulty: "medium" },
  { text: "Having privacy and time alone to reflect is important for me.", category: "intrapersonal", difficulty: "medium" },
  { text: "I'm more interested in ideas and concepts than in social activities.", category: "intrapersonal", difficulty: "medium" },

  // Visual-Spatial Intelligence
  { text: "My creativity is often inspired by how I feel emotionally.", category: "spatial", difficulty: "medium" },
  { text: "I like to show my individuality through my work and creative efforts.", category: "spatial", difficulty: "medium" },
  { text: "I'm drawn to beauty and design, and I surround myself with things that inspire me.", category: "spatial", difficulty: "medium" },
  { text: "I feel most alive when I'm creating something new and original.", category: "spatial", difficulty: "medium" },
  { text: "My style or creative expression reflects who I truly am.", category: "spatial", difficulty: "medium" },
  { text: "I often notice creative details or inspiration in places others overlook.", category: "spatial", difficulty: "medium" },
  { text: "I trust my creative instincts and feel confident in my artistic abilities.", category: "spatial", difficulty: "medium" },
  { text: "I seek feedback on my creative work to make it even better.", category: "spatial", difficulty: "medium" },

  // Bodily-Kinesthetic Intelligence
  { text: "I can adapt quickly and perform well in many different tasks or roles.", category: "bodily", difficulty: "medium" },
  { text: "Even routine tasks feel engaging when I find creative ways to approach them.", category: "bodily", difficulty: "medium" },
  { text: "I can think and respond effectively in the moment when unexpected things happen.", category: "bodily", difficulty: "medium" },

  // Musical-Rhythmic Intelligence
  { text: "I often notice rhythm, tone, or melody in everyday sounds.", category: "musical", difficulty: "medium" },
  { text: "Music or rhythm helps me concentrate, remember things, or spark new ideas.", category: "musical", difficulty: "medium" },
  { text: "I enjoy expressing myself or organizing my work with a sense of flow or beat.", category: "musical", difficulty: "medium" },

  // Naturalistic Intelligence
  { text: "I notice patterns and details in the environment that others often miss.", category: "naturalist", difficulty: "medium" },
  { text: "I feel energized when working with nature, natural materials, or living systems.", category: "naturalist", difficulty: "medium" },
  { text: "I can easily classify or organize things based on their natural qualities.", category: "naturalist", difficulty: "medium" },

  // Conscientiousness / Detail Orientation (mapped to logical)
  { text: "I can be critical of myself or others when I spot mistakes.", category: "logical", difficulty: "medium" },
  { text: "Double-checking details before finishing a task is important to me.", category: "logical", difficulty: "medium" },
  { text: "I look for ways to make systems or methods more effective.", category: "logical", difficulty: "medium" },
  { text: "When I receive feedback, I focus on the details to know how to improve.", category: "logical", difficulty: "medium" },
  { text: "I like my work environment organized, with everything in its place.", category: "logical", difficulty: "medium" },
  { text: "I feel responsible for correcting errors so the end result is accurate.", category: "logical", difficulty: "medium" },
  { text: "People often rely on me to notice and fix small mistakes.", category: "logical", difficulty: "medium" },

  // Leadership / Assertiveness (mapped to interpersonal)
  { text: "I naturally step forward to guide others and make decisions.", category: "interpersonal", difficulty: "medium" },
  { text: "I speak my mind clearly and take a stand for my opinions.", category: "interpersonal", difficulty: "medium" },
  { text: "Standing up for people I care about matters as much as standing up for myself.", category: "interpersonal", difficulty: "medium" },
  { text: "I'm comfortable facing conflict directly when necessary.", category: "interpersonal", difficulty: "medium" },
  { text: "In group settings, I often take on a leadership role without being asked.", category: "interpersonal", difficulty: "medium" },
  { text: "I feel compelled to act when I see something unfair or unjust.", category: "interpersonal", difficulty: "medium" },
  { text: "I respect strong individuals and enjoy working alongside them.", category: "interpersonal", difficulty: "medium" },
  { text: "I like relying on my own abilities and being self-sufficient.", category: "intrapersonal", difficulty: "medium" },
  { text: "I'm comfortable using authority or influence to bring about positive change.", category: "interpersonal", difficulty: "medium" }
];

// Add options to each question
const questionsWithOptions = questions.map(q => ({
  ...q,
  options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
}));

console.log('Questions prepared:', questionsWithOptions.length);

// Function to add questions via API
async function addQuestions() {
  try {
    console.log('Starting to add questions...');
    
    // Clear existing questions first
    const deleteResponse = await fetch('/api/questions', {
      method: 'DELETE'
    });
    console.log('Existing questions cleared');
    
    // Add new questions
    const response = await fetch('/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questions: questionsWithOptions })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Questions added successfully:', result);
      
      // Show summary by category
      const categoryCounts = {};
      questionsWithOptions.forEach(q => {
        categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
      });
      
      console.log('\nQuestions added by category:');
      Object.entries(categoryCounts).forEach(([category, count]) => {
        console.log(`- ${category}: ${count} questions`);
      });
      
    } else {
      console.error('Error adding questions:', await response.text());
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
addQuestions();
