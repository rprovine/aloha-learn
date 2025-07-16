export interface Lesson {
  id: number;
  title: string;
  titleHawaiian?: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  completed: boolean;
  locked: boolean;
  duration: number;
  points: number;
  prerequisites?: number[];
  culturalNote?: string;
}

export const curriculum: Lesson[] = [
  // ========== BEGINNER LEVEL (Hoʻomaka) ==========
  {
    id: 1,
    title: "Hawaiian Alphabet & Pronunciation",
    titleHawaiian: "Ka Pīʻāpā Hawaiʻi",
    description: "Learn the 13 letters of the Hawaiian alphabet and master proper pronunciation",
    level: "beginner",
    category: "Foundations",
    completed: false,
    locked: false,
    duration: 20,
    points: 100,
    culturalNote: "Hawaiian has only 13 letters, making it one of the world's shortest alphabets"
  },
  {
    id: 2,
    title: "Basic Greetings",
    titleHawaiian: "Nā Aloha Kūpono",
    description: "Essential greetings: Aloha, Mahalo, A hui hou, and more",
    level: "beginner",
    category: "Conversation",
    completed: false,
    locked: false,
    duration: 15,
    points: 100,
    culturalNote: "Aloha carries deep meaning beyond just 'hello' - it represents love, peace, and compassion"
  },
  {
    id: 3,
    title: "Numbers 1-10",
    titleHawaiian: "Nā Helu 1-10",
    description: "Count from ʻekahi to ʻumi (one to ten) in Hawaiian",
    level: "beginner",
    category: "Numbers",
    completed: false,
    locked: false,
    duration: 20,
    points: 100,
    prerequisites: [1]
  },
  {
    id: 4,
    title: "Colors of Hawaii",
    titleHawaiian: "Nā Waihoʻoluʻu",
    description: "Learn colors inspired by Hawaiian nature: ocean blue, sunset orange, and more",
    level: "beginner",
    category: "Vocabulary",
    completed: false,
    locked: false,
    duration: 15,
    points: 100,
    prerequisites: [1]
  },
  {
    id: 5,
    title: "Family Members",
    titleHawaiian: "ʻOhana",
    description: "Learn words for family members: makua (parent), keiki (child), tūtū (grandparent)",
    level: "beginner",
    category: "Family",
    completed: false,
    locked: false,
    duration: 25,
    points: 150,
    prerequisites: [2],
    culturalNote: "ʻOhana means family, but extends beyond blood relations to include chosen family"
  },
  {
    id: 6,
    title: "Days of the Week",
    titleHawaiian: "Nā Lā o ka Pule",
    description: "Learn the days from Pōʻakahi (Monday) to Lāpule (Sunday)",
    level: "beginner",
    category: "Time",
    completed: false,
    locked: false,
    duration: 20,
    points: 100,
    prerequisites: [3]
  },
  {
    id: 7,
    title: "Common Phrases",
    titleHawaiian: "Nā ʻŌlelo Maʻamau",
    description: "Essential phrases: How are you? Thank you very much, You're welcome",
    level: "beginner",
    category: "Conversation",
    completed: false,
    locked: false,
    duration: 25,
    points: 150,
    prerequisites: [2]
  },
  {
    id: 8,
    title: "Numbers 11-100",
    titleHawaiian: "Nā Helu 11-100",
    description: "Expand your counting skills to one hundred (hoʻokahi haneli)",
    level: "beginner",
    category: "Numbers",
    completed: false,
    locked: false,
    duration: 25,
    points: 150,
    prerequisites: [3]
  },
  {
    id: 9,
    title: "Body Parts",
    titleHawaiian: "Nā ʻApana o ke Kino",
    description: "Learn body parts: poʻo (head), lima (hand), wāwae (foot), and more",
    level: "beginner",
    category: "Vocabulary",
    completed: false,
    locked: false,
    duration: 20,
    points: 100,
    prerequisites: [4]
  },
  {
    id: 10,
    title: "Basic Questions",
    titleHawaiian: "Nā Nīnau Kumu",
    description: "Form simple questions: What? Where? Who? When?",
    level: "beginner",
    category: "Grammar",
    completed: false,
    locked: false,
    duration: 30,
    points: 200,
    prerequisites: [7]
  },

  // ========== INTERMEDIATE LEVEL (Waena) ==========
  {
    id: 11,
    title: "Weather & Nature",
    titleHawaiian: "Ke Anilā a me ka ʻĀina",
    description: "Describe weather: lā (sun), ua (rain), makani (wind), and natural features",
    level: "intermediate",
    category: "Nature",
    completed: false,
    locked: false,
    duration: 30,
    points: 200,
    prerequisites: [10]
  },
  {
    id: 12,
    title: "Food & Cooking",
    titleHawaiian: "Ka Meaʻai a me ka Kuke ʻana",
    description: "Traditional foods: poi, laulau, poke, and cooking terms",
    level: "intermediate",
    category: "Culture",
    completed: false,
    locked: false,
    duration: 25,
    points: 200,
    prerequisites: [10],
    culturalNote: "Food is central to Hawaiian culture and gatherings"
  },
  {
    id: 13,
    title: "Directions & Locations",
    titleHawaiian: "Nā Kuhikuhi ʻĀina",
    description: "Navigate using mauka (toward mountain), makai (toward ocean), and cardinal directions",
    level: "intermediate",
    category: "Directions",
    completed: false,
    locked: false,
    duration: 30,
    points: 200,
    prerequisites: [11],
    culturalNote: "Hawaiians traditionally use landmarks rather than compass directions"
  },
  {
    id: 14,
    title: "Time Expressions",
    titleHawaiian: "Nā Mamala Manawa",
    description: "Express time: past, present, future, and specific times of day",
    level: "intermediate",
    category: "Time",
    completed: false,
    locked: false,
    duration: 25,
    points: 200,
    prerequisites: [6]
  },
  {
    id: 15,
    title: "Emotions & Feelings",
    titleHawaiian: "Nā Manaʻo",
    description: "Express emotions: hauʻoli (happy), kaumaha (sad), huhū (angry)",
    level: "intermediate",
    category: "Expression",
    completed: false,
    locked: false,
    duration: 20,
    points: 150,
    prerequisites: [10]
  },
  {
    id: 16,
    title: "Ocean & Marine Life",
    titleHawaiian: "Ke Kai a me Nā Iʻa",
    description: "Ocean terms: nalu (wave), kai (sea), and marine creatures",
    level: "intermediate",
    category: "Nature",
    completed: false,
    locked: false,
    duration: 30,
    points: 200,
    prerequisites: [11],
    culturalNote: "The ocean is vital to Hawaiian life and culture"
  },
  {
    id: 17,
    title: "Plants & Flowers",
    titleHawaiian: "Nā Lāʻau a me Nā Pua",
    description: "Learn about native plants: koa, ʻōhiʻa lehua, plumeria, and their uses",
    level: "intermediate",
    category: "Nature",
    completed: false,
    locked: false,
    duration: 25,
    points: 200,
    prerequisites: [11],
    culturalNote: "Many Hawaiian plants have medicinal and cultural significance"
  },
  {
    id: 18,
    title: "Sentence Structure",
    titleHawaiian: "Ka Papa ʻŌlelo",
    description: "Master Hawaiian sentence patterns: VSO order and particles",
    level: "intermediate",
    category: "Grammar",
    completed: false,
    locked: false,
    duration: 35,
    points: 250,
    prerequisites: [10]
  },
  {
    id: 19,
    title: "Possessives",
    titleHawaiian: "Nā Kino",
    description: "Understand koʻu/kuʻu (my), kou (your), kona (his/her) and a/o categories",
    level: "intermediate",
    category: "Grammar",
    completed: false,
    locked: false,
    duration: 30,
    points: 250,
    prerequisites: [18]
  },
  {
    id: 20,
    title: "Daily Activities",
    titleHawaiian: "Nā Hana o Kēlā me Kēia Lā",
    description: "Describe daily routines: wake up, eat, work, sleep",
    level: "intermediate",
    category: "Conversation",
    completed: false,
    locked: false,
    duration: 25,
    points: 200,
    prerequisites: [14, 15]
  },

  // ========== ADVANCED LEVEL (Kiʻekiʻe) ==========
  {
    id: 21,
    title: "Hawaiian Proverbs",
    titleHawaiian: "ʻŌlelo Noʻeau",
    description: "Study traditional sayings and their deep cultural meanings",
    level: "advanced",
    category: "Culture",
    completed: false,
    locked: false,
    duration: 40,
    points: 300,
    prerequisites: [20],
    culturalNote: "ʻŌlelo noʻeau contain generations of Hawaiian wisdom"
  },
  {
    id: 22,
    title: "Traditional Practices",
    titleHawaiian: "Nā Hana Kahiko",
    description: "Learn vocabulary for traditional practices: hula, fishing, farming",
    level: "advanced",
    category: "Culture",
    completed: false,
    locked: false,
    duration: 35,
    points: 300,
    prerequisites: [21]
  },
  {
    id: 23,
    title: "Complex Grammar",
    titleHawaiian: "Nā Loina ʻŌlelo Paʻakikī",
    description: "Master complex structures: passive voice, causatives, directionals",
    level: "advanced",
    category: "Grammar",
    completed: false,
    locked: false,
    duration: 45,
    points: 350,
    prerequisites: [19]
  },
  {
    id: 24,
    title: "Hawaiian Mythology",
    titleHawaiian: "Nā Moʻolelo o Nā Akua",
    description: "Stories of Hawaiian gods: Pele, Kāne, Kanaloa, and their significance",
    level: "advanced",
    category: "Culture",
    completed: false,
    locked: false,
    duration: 40,
    points: 300,
    prerequisites: [21],
    culturalNote: "These stories teach important life lessons and values"
  },
  {
    id: 25,
    title: "Place Names & History",
    titleHawaiian: "Nā Inoa ʻĀina",
    description: "Understand the meanings behind Hawaiian place names and their stories",
    level: "advanced",
    category: "History",
    completed: false,
    locked: false,
    duration: 35,
    points: 300,
    prerequisites: [13]
  },
  {
    id: 26,
    title: "Formal & Ceremonial Language",
    titleHawaiian: "Ka ʻŌlelo Hoʻohanohano",
    description: "Language for ceremonies, prayers, and formal occasions",
    level: "advanced",
    category: "Culture",
    completed: false,
    locked: false,
    duration: 40,
    points: 350,
    prerequisites: [23]
  },
  {
    id: 27,
    title: "Poetry & Mele",
    titleHawaiian: "Nā Mele a me ka Hoʻoulu",
    description: "Compose and understand Hawaiian poetry and songs",
    level: "advanced",
    category: "Arts",
    completed: false,
    locked: false,
    duration: 45,
    points: 350,
    prerequisites: [26]
  },
  {
    id: 28,
    title: "Professional Hawaiian",
    titleHawaiian: "Ka ʻŌlelo ʻOihana",
    description: "Business and professional vocabulary for modern contexts",
    level: "advanced",
    category: "Professional",
    completed: false,
    locked: false,
    duration: 35,
    points: 300,
    prerequisites: [20]
  },
  {
    id: 29,
    title: "Hawaiian Literature",
    titleHawaiian: "Ka Moʻokalaleo Hawaiʻi",
    description: "Read and analyze Hawaiian newspapers and historical texts",
    level: "advanced",
    category: "Literature",
    completed: false,
    locked: false,
    duration: 50,
    points: 400,
    prerequisites: [27]
  },
  {
    id: 30,
    title: "Fluent Conversation",
    titleHawaiian: "Ka Kamaʻilio ʻAkāka",
    description: "Master natural conversation flow and idiomatic expressions",
    level: "advanced",
    category: "Conversation",
    completed: false,
    locked: false,
    duration: 45,
    points: 400,
    prerequisites: [23, 28]
  }
];

export const getCurriculumByLevel = (level: 'beginner' | 'intermediate' | 'advanced') => {
  return curriculum.filter(lesson => lesson.level === level);
};

export const getUnlockedLessons = (completedLessonIds: number[]) => {
  return curriculum.map(lesson => ({
    ...lesson,
    locked: lesson.prerequisites ? 
      !lesson.prerequisites.every(prereq => completedLessonIds.includes(prereq)) : 
      false
  }));
};