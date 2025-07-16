interface Slide {
  type: 'intro' | 'vocabulary' | 'grammar' | 'culture' | 'practice' | 'complete';
  title?: string;
  content?: string;
  image?: string;
  word?: string;
  translation?: string;
  pronunciation?: string;
  example?: string;
  exampleTranslation?: string;
  culturalNote?: string;
  question?: string;
  options?: string[];
  correctAnswer?: number;
  message?: string;
  points?: number;
  grammarPoint?: string;
  explanation?: string;
  examples?: { hawaiian: string; english: string }[];
}

interface LessonContent {
  id: number;
  title: string;
  slides: Slide[];
}

export const lessonContents: { [key: number]: LessonContent } = {
  // ========== BEGINNER LEVEL ==========
  
  // Lesson 1: Hawaiian Alphabet & Pronunciation
  1: {
    id: 1,
    title: "Hawaiian Alphabet & Pronunciation",
    slides: [
      {
        type: "intro",
        title: "Ka Pīʻāpā Hawaiʻi",
        content: "Welcome to the Hawaiian alphabet! Hawaiian has one of the shortest alphabets in the world with only 13 letters.",
        image: "🌺"
      },
      {
        type: "culture",
        title: "The 13 Letters",
        content: "Hawaiian uses 5 vowels (A, E, I, O, U) and 8 consonants (H, K, L, M, N, P, W, ʻ). The ʻokina (ʻ) is a consonant that represents a glottal stop.",
        culturalNote: "The Hawaiian alphabet was developed by missionaries in the 1820s to create a written form of the language."
      },
      {
        type: "vocabulary",
        word: "A",
        pronunciation: "ah (like 'ah' in father)",
        example: "Aloha",
        exampleTranslation: "Hello/Love",
        culturalNote: "Each vowel has only one sound in Hawaiian, making pronunciation consistent."
      },
      {
        type: "vocabulary",
        word: "E",
        pronunciation: "eh (like 'e' in bet)",
        example: "Keiki",
        exampleTranslation: "Child"
      },
      {
        type: "vocabulary",
        word: "I",
        pronunciation: "ee (like 'ee' in see)",
        example: "Lilikoi",
        exampleTranslation: "Passion fruit"
      },
      {
        type: "vocabulary",
        word: "O",
        pronunciation: "oh (like 'o' in go)",
        example: "Kokua",
        exampleTranslation: "Help"
      },
      {
        type: "vocabulary",
        word: "U",
        pronunciation: "oo (like 'oo' in moon)",
        example: "Mahalo nui",
        exampleTranslation: "Thank you very much"
      },
      {
        type: "grammar",
        grammarPoint: "The ʻOkina",
        explanation: "The ʻokina (ʻ) is a glottal stop - a brief pause in speech. It's considered a consonant.",
        examples: [
          { hawaiian: "Hawaii", english: "Without ʻokina" },
          { hawaiian: "Hawaiʻi", english: "With ʻokina (correct)" },
          { hawaiian: "pau", english: "finished" },
          { hawaiian: "paʻu", english: "skirt" }
        ]
      },
      {
        type: "practice",
        question: "Which letter represents a glottal stop in Hawaiian?",
        options: ["H", "K", "ʻ (ʻokina)", "W"],
        correctAnswer: 2
      },
      {
        type: "practice",
        question: "How many letters are in the Hawaiian alphabet?",
        options: ["26", "13", "15", "10"],
        correctAnswer: 1
      },
      {
        type: "complete",
        message: "Hana maikaʻi! (Good job!)",
        points: 100
      }
    ]
  },

  // Lesson 2: Basic Greetings
  2: {
    id: 2,
    title: "Basic Greetings",
    slides: [
      {
        type: "intro",
        title: "Nā Aloha Kūpono",
        content: "In this lesson, you'll learn essential Hawaiian greetings used in daily life. These words carry deep cultural meaning.",
        image: "🌺"
      },
      {
        type: "vocabulary",
        word: "Aloha",
        translation: "Hello, goodbye, love",
        pronunciation: "ah-LOH-hah",
        example: "Aloha kākou",
        exampleTranslation: "Hello everyone",
        culturalNote: "Aloha embodies love, peace, compassion, and mercy. It's a way of life, not just a greeting."
      },
      {
        type: "vocabulary",
        word: "Mahalo",
        translation: "Thank you",
        pronunciation: "mah-HAH-loh",
        example: "Mahalo nui loa",
        exampleTranslation: "Thank you very much",
        culturalNote: "Gratitude is central to Hawaiian culture. Mahalo should be said with genuine appreciation."
      },
      {
        type: "vocabulary",
        word: "A hui hou",
        translation: "Until we meet again",
        pronunciation: "ah HOO-ee HOH",
        example: "A hui hou kākou",
        exampleTranslation: "Until we all meet again"
      },
      {
        type: "vocabulary",
        word: "E komo mai",
        translation: "Welcome, come in",
        pronunciation: "eh KOH-moh MY",
        example: "E komo mai i ka hale",
        exampleTranslation: "Welcome to the house",
        culturalNote: "Hawaiian hospitality is legendary. This phrase embodies the spirit of welcoming."
      },
      {
        type: "vocabulary",
        word: "ʻAʻole pilikia",
        translation: "You're welcome, no problem",
        pronunciation: "ah-OH-leh pee-lee-KEE-ah",
        example: "Mahalo! - ʻAʻole pilikia!",
        exampleTranslation: "Thank you! - You're welcome!"
      },
      {
        type: "practice",
        question: "How do you say 'Thank you' in Hawaiian?",
        options: ["Aloha", "Mahalo", "Kokua", "Ohana"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "What does 'A hui hou' mean?",
        options: ["Hello", "Welcome", "Until we meet again", "Good morning"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "Maikaʻi loa! (Very good!)",
        points: 100
      }
    ]
  },

  // Lesson 3: Numbers 1-10
  3: {
    id: 3,
    title: "Numbers 1-10",
    slides: [
      {
        type: "intro",
        title: "Nā Helu 1-10",
        content: "Numbers are essential for daily communication. Let's learn to count from one to ten in Hawaiian!",
        image: "🔢"
      },
      {
        type: "vocabulary",
        word: "ʻekahi",
        translation: "one (1)",
        pronunciation: "eh-KAH-hee",
        example: "Hoʻokahi keiki",
        exampleTranslation: "One child"
      },
      {
        type: "vocabulary",
        word: "ʻelua",
        translation: "two (2)",
        pronunciation: "eh-LOO-ah",
        example: "ʻElua maka",
        exampleTranslation: "Two eyes"
      },
      {
        type: "vocabulary",
        word: "ʻekolu",
        translation: "three (3)",
        pronunciation: "eh-KOH-loo",
        example: "ʻEkolu lā",
        exampleTranslation: "Three days"
      },
      {
        type: "vocabulary",
        word: "ʻehā",
        translation: "four (4)",
        pronunciation: "eh-HAH",
        example: "ʻEhā wāwae",
        exampleTranslation: "Four feet"
      },
      {
        type: "vocabulary",
        word: "ʻelima",
        translation: "five (5)",
        pronunciation: "eh-LEE-mah",
        example: "ʻElima manamana lima",
        exampleTranslation: "Five fingers"
      },
      {
        type: "vocabulary",
        word: "ʻeono",
        translation: "six (6)",
        pronunciation: "eh-OH-noh",
        example: "ʻEono mahina",
        exampleTranslation: "Six months"
      },
      {
        type: "vocabulary",
        word: "ʻehiku",
        translation: "seven (7)",
        pronunciation: "eh-HEE-koo",
        example: "ʻEhiku lā",
        exampleTranslation: "Seven days (one week)"
      },
      {
        type: "vocabulary",
        word: "ʻewalu",
        translation: "eight (8)",
        pronunciation: "eh-VAH-loo",
        example: "ʻEwalu hoku",
        exampleTranslation: "Eight stars"
      },
      {
        type: "vocabulary",
        word: "ʻeiwa",
        translation: "nine (9)",
        pronunciation: "eh-EE-vah",
        example: "ʻEiwa makahiki",
        exampleTranslation: "Nine years"
      },
      {
        type: "vocabulary",
        word: "ʻumi",
        translation: "ten (10)",
        pronunciation: "OO-mee",
        example: "ʻUmi keiki",
        exampleTranslation: "Ten children"
      },
      {
        type: "practice",
        question: "What is 5 in Hawaiian?",
        options: ["ʻekolu", "ʻelima", "ʻehiku", "ʻumi"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "How do you say 'ten' in Hawaiian?",
        options: ["ʻeiwa", "ʻewalu", "ʻumi", "ʻekahi"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "Pōmaikaʻi! (Excellent!)",
        points: 100
      }
    ]
  },

  // Lesson 4: Colors of Hawaii
  4: {
    id: 4,
    title: "Colors of Hawaii",
    slides: [
      {
        type: "intro",
        title: "Nā Waihoʻoluʻu",
        content: "Hawaii's natural beauty is reflected in its color vocabulary. Let's learn colors inspired by the islands!",
        image: "🌈"
      },
      {
        type: "vocabulary",
        word: "ʻulaʻula",
        translation: "red",
        pronunciation: "oo-lah-oo-lah",
        example: "Ka pua ʻulaʻula",
        exampleTranslation: "The red flower",
        culturalNote: "Red is sacred in Hawaiian culture, often associated with royalty and the goddess Pele."
      },
      {
        type: "vocabulary",
        word: "melemele",
        translation: "yellow",
        pronunciation: "meh-leh-meh-leh",
        example: "Ka lā melemele",
        exampleTranslation: "The yellow sun"
      },
      {
        type: "vocabulary",
        word: "ʻōmaʻomaʻo",
        translation: "green",
        pronunciation: "oh-mah-oh-mah-oh",
        example: "Nā lau ʻōmaʻomaʻo",
        exampleTranslation: "The green leaves"
      },
      {
        type: "vocabulary",
        word: "uliuli",
        translation: "blue/dark",
        pronunciation: "oo-lee-oo-lee",
        example: "Ke kai uliuli",
        exampleTranslation: "The blue ocean",
        culturalNote: "Uliuli can mean both blue and dark colors, depending on context."
      },
      {
        type: "vocabulary",
        word: "keʻokeʻo",
        translation: "white",
        pronunciation: "keh-oh-keh-oh",
        example: "Ka hale keʻokeʻo",
        exampleTranslation: "The white house"
      },
      {
        type: "vocabulary",
        word: "ʻeleʻele",
        translation: "black",
        pronunciation: "eh-leh-eh-leh",
        example: "Ka pōhaku ʻeleʻele",
        exampleTranslation: "The black rock"
      },
      {
        type: "vocabulary",
        word: "poni",
        translation: "purple",
        pronunciation: "POH-nee",
        example: "Ka lole poni",
        exampleTranslation: "The purple cloth",
        culturalNote: "Purple was a royal color in ancient Hawaii."
      },
      {
        type: "practice",
        question: "What color is 'ʻulaʻula'?",
        options: ["Blue", "Green", "Red", "Yellow"],
        correctAnswer: 2
      },
      {
        type: "practice",
        question: "How do you say 'green' in Hawaiian?",
        options: ["uliuli", "ʻōmaʻomaʻo", "melemele", "keʻokeʻo"],
        correctAnswer: 1
      },
      {
        type: "complete",
        message: "Nani! (Beautiful!)",
        points: 100
      }
    ]
  },

  // Lesson 5: Family Members
  5: {
    id: 5,
    title: "Family Members",
    slides: [
      {
        type: "intro",
        title: "ʻOhana",
        content: "Family is the foundation of Hawaiian society. Learn to talk about your loved ones in Hawaiian!",
        image: "👨‍👩‍👧‍👦"
      },
      {
        type: "culture",
        title: "The Meaning of ʻOhana",
        content: "ʻOhana means family, but in Hawaiian culture, it extends beyond blood relations to include all those who are family in your heart.",
        culturalNote: "The root word 'oha' refers to the root or corm of the kalo (taro) plant, symbolizing that all ʻohana come from the same root."
      },
      {
        type: "vocabulary",
        word: "makua",
        translation: "parent",
        pronunciation: "mah-KOO-ah",
        example: "Koʻu makua",
        exampleTranslation: "My parent"
      },
      {
        type: "vocabulary",
        word: "makuahine",
        translation: "mother",
        pronunciation: "mah-koo-ah-HEE-neh",
        example: "Kuʻu makuahine aloha",
        exampleTranslation: "My beloved mother"
      },
      {
        type: "vocabulary",
        word: "makuakāne",
        translation: "father",
        pronunciation: "mah-koo-ah-KAH-neh",
        example: "Koʻu makuakāne",
        exampleTranslation: "My father"
      },
      {
        type: "vocabulary",
        word: "keiki",
        translation: "child",
        pronunciation: "KAY-kee",
        example: "Nā keiki",
        exampleTranslation: "The children"
      },
      {
        type: "vocabulary",
        word: "tūtū",
        translation: "grandparent",
        pronunciation: "TOO-too",
        example: "Koʻu tūtū wahine",
        exampleTranslation: "My grandmother",
        culturalNote: "Elders are highly respected in Hawaiian culture and are considered the holders of wisdom."
      },
      {
        type: "vocabulary",
        word: "kaikaina",
        translation: "younger sibling",
        pronunciation: "kai-KAI-nah",
        example: "Koʻu kaikaina",
        exampleTranslation: "My younger sibling"
      },
      {
        type: "vocabulary",
        word: "kaikuaʻana",
        translation: "older sibling",
        pronunciation: "kai-koo-ah-AH-nah",
        example: "Koʻu kaikuaʻana",
        exampleTranslation: "My older sibling"
      },
      {
        type: "practice",
        question: "What does 'keiki' mean?",
        options: ["Parent", "Child", "Grandparent", "Family"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "How do you say 'mother' in Hawaiian?",
        options: ["makua", "makuakāne", "makuahine", "tūtū"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "ʻOhana means family!",
        points: 150
      }
    ]
  },

  // Lesson 6: Days of the Week
  6: {
    id: 6,
    title: "Days of the Week",
    slides: [
      {
        type: "intro",
        title: "Nā Lā o ka Pule",
        content: "Learn the days of the week in Hawaiian! Each day has special meaning and significance.",
        image: "📅"
      },
      {
        type: "vocabulary",
        word: "Pōʻakahi",
        translation: "Monday",
        pronunciation: "poh-ah-KAH-hee",
        example: "I ka Pōʻakahi",
        exampleTranslation: "On Monday",
        culturalNote: "Literally means 'first night' - the Hawaiian week traditionally started on Monday."
      },
      {
        type: "vocabulary",
        word: "Pōʻalua",
        translation: "Tuesday",
        pronunciation: "poh-ah-LOO-ah",
        example: "I ka Pōʻalua",
        exampleTranslation: "On Tuesday"
      },
      {
        type: "vocabulary",
        word: "Pōʻakolu",
        translation: "Wednesday",
        pronunciation: "poh-ah-KOH-loo",
        example: "I ka Pōʻakolu",
        exampleTranslation: "On Wednesday"
      },
      {
        type: "vocabulary",
        word: "Pōʻahā",
        translation: "Thursday",
        pronunciation: "poh-ah-HAH",
        example: "I ka Pōʻahā",
        exampleTranslation: "On Thursday"
      },
      {
        type: "vocabulary",
        word: "Pōʻalima",
        translation: "Friday",
        pronunciation: "poh-ah-LEE-mah",
        example: "Aloha Pōʻalima!",
        exampleTranslation: "Happy Friday!"
      },
      {
        type: "vocabulary",
        word: "Pōʻaono",
        translation: "Saturday",
        pronunciation: "poh-ah-OH-noh",
        example: "I ka Pōʻaono",
        exampleTranslation: "On Saturday"
      },
      {
        type: "vocabulary",
        word: "Lāpule",
        translation: "Sunday",
        pronunciation: "LAH-poo-leh",
        example: "I ka Lāpule",
        exampleTranslation: "On Sunday",
        culturalNote: "Literally means 'prayer day' - reflecting the Christian influence on Hawaiian culture."
      },
      {
        type: "practice",
        question: "What day is 'Pōʻakahi'?",
        options: ["Sunday", "Monday", "Friday", "Saturday"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "How do you say 'Sunday' in Hawaiian?",
        options: ["Pōʻakahi", "Pōʻaono", "Lāpule", "Pōʻalima"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "Maikaʻi! Now you know the days!",
        points: 100
      }
    ]
  },

  // Lesson 7: Common Phrases
  7: {
    id: 7,
    title: "Common Phrases",
    slides: [
      {
        type: "intro",
        title: "Nā ʻŌlelo Maʻamau",
        content: "Master essential phrases for everyday Hawaiian conversation!",
        image: "💬"
      },
      {
        type: "vocabulary",
        word: "Pehea ʻoe?",
        translation: "How are you?",
        pronunciation: "peh-HEH-ah oy",
        example: "Aloha! Pehea ʻoe?",
        exampleTranslation: "Hello! How are you?"
      },
      {
        type: "vocabulary",
        word: "Maikaʻi au",
        translation: "I am fine",
        pronunciation: "my-KAH-ee ow",
        example: "Maikaʻi au, mahalo",
        exampleTranslation: "I am fine, thank you"
      },
      {
        type: "vocabulary",
        word: "E kala mai",
        translation: "Excuse me/Sorry",
        pronunciation: "eh KAH-lah my",
        example: "E kala mai iaʻu",
        exampleTranslation: "Excuse me/Forgive me"
      },
      {
        type: "vocabulary",
        word: "ʻO wai kou inoa?",
        translation: "What is your name?",
        pronunciation: "oh vai koh ee-NOH-ah",
        example: "Aloha, ʻo wai kou inoa?",
        exampleTranslation: "Hello, what is your name?"
      },
      {
        type: "vocabulary",
        word: "ʻO [name] koʻu inoa",
        translation: "My name is [name]",
        pronunciation: "oh [name] koh-oo ee-NOH-ah",
        example: "ʻO Kailani koʻu inoa",
        exampleTranslation: "My name is Kailani"
      },
      {
        type: "vocabulary",
        word: "Hauʻoli lā hānau",
        translation: "Happy birthday",
        pronunciation: "how-OH-lee lah HAH-now",
        example: "Hauʻoli lā hānau iā ʻoe!",
        exampleTranslation: "Happy birthday to you!"
      },
      {
        type: "practice",
        question: "How do you say 'How are you?' in Hawaiian?",
        options: ["Mahalo nui", "Pehea ʻoe?", "E kala mai", "Maikaʻi au"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "What does 'E kala mai' mean?",
        options: ["Thank you", "Good morning", "Excuse me/Sorry", "Welcome"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "ʻAʻohe mea! (Excellent work!)",
        points: 150
      }
    ]
  },

  // Lesson 8: Numbers 11-100
  8: {
    id: 8,
    title: "Numbers 11-100",
    slides: [
      {
        type: "intro",
        title: "Nā Helu 11-100",
        content: "Expand your counting skills! Learn to count beyond ten in Hawaiian.",
        image: "💯"
      },
      {
        type: "grammar",
        grammarPoint: "Numbers 11-19",
        explanation: "Numbers 11-19 are formed with 'ʻumi kūmā' (ten and) plus the single digit.",
        examples: [
          { hawaiian: "ʻumi kūmā kahi", english: "11 (ten and one)" },
          { hawaiian: "ʻumi kūmā lua", english: "12 (ten and two)" },
          { hawaiian: "ʻumi kūmā kolu", english: "13 (ten and three)" }
        ]
      },
      {
        type: "vocabulary",
        word: "iwakālua",
        translation: "twenty (20)",
        pronunciation: "ee-vah-KAH-loo-ah",
        example: "Iwakālua makahiki",
        exampleTranslation: "Twenty years"
      },
      {
        type: "vocabulary",
        word: "kanakolu",
        translation: "thirty (30)",
        pronunciation: "kah-nah-KOH-loo",
        example: "Kanakolu minuke",
        exampleTranslation: "Thirty minutes"
      },
      {
        type: "vocabulary",
        word: "kanahā",
        translation: "forty (40)",
        pronunciation: "kah-nah-HAH",
        example: "Kanahā lā",
        exampleTranslation: "Forty days"
      },
      {
        type: "vocabulary",
        word: "kanalima",
        translation: "fifty (50)",
        pronunciation: "kah-nah-LEE-mah",
        example: "Kanalima kālā",
        exampleTranslation: "Fifty dollars"
      },
      {
        type: "vocabulary",
        word: "hoʻokahi haneli",
        translation: "one hundred (100)",
        pronunciation: "hoh-oh-KAH-hee hah-NEH-lee",
        example: "Hoʻokahi haneli makahiki",
        exampleTranslation: "One hundred years"
      },
      {
        type: "practice",
        question: "What is 20 in Hawaiian?",
        options: ["kanakolu", "iwakālua", "kanalima", "kanahā"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "How do you say '100' in Hawaiian?",
        options: ["kanalima", "kanakolu", "hoʻokahi haneli", "iwakālua"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "Pōmaikaʻi! You can count to 100!",
        points: 150
      }
    ]
  },

  // Lesson 9: Body Parts
  9: {
    id: 9,
    title: "Body Parts",
    slides: [
      {
        type: "intro",
        title: "Nā ʻApana o ke Kino",
        content: "Learn the names of body parts in Hawaiian. Understanding the body is essential for health and daily communication.",
        image: "🚶"
      },
      {
        type: "vocabulary",
        word: "poʻo",
        translation: "head",
        pronunciation: "POH-oh",
        example: "Koʻu poʻo",
        exampleTranslation: "My head"
      },
      {
        type: "vocabulary",
        word: "maka",
        translation: "eye/face",
        pronunciation: "MAH-kah",
        example: "Nā maka uliuli",
        exampleTranslation: "Blue eyes",
        culturalNote: "Maka can mean both eye and face depending on context."
      },
      {
        type: "vocabulary",
        word: "lima",
        translation: "hand/arm",
        pronunciation: "LEE-mah",
        example: "ʻElima manamana lima",
        exampleTranslation: "Five fingers (literally: five branches of hand)"
      },
      {
        type: "vocabulary",
        word: "wāwae",
        translation: "leg/foot",
        pronunciation: "VAH-vai",
        example: "ʻElua wāwae",
        exampleTranslation: "Two legs/feet"
      },
      {
        type: "vocabulary",
        word: "kino",
        translation: "body",
        pronunciation: "KEE-noh",
        example: "Kino kānaka",
        exampleTranslation: "Human body"
      },
      {
        type: "vocabulary",
        word: "puʻuwai",
        translation: "heart",
        pronunciation: "poo-oo-VAI",
        example: "Koʻu puʻuwai aloha",
        exampleTranslation: "My loving heart"
      },
      {
        type: "practice",
        question: "What does 'poʻo' mean?",
        options: ["Hand", "Foot", "Head", "Heart"],
        correctAnswer: 2
      },
      {
        type: "practice",
        question: "How do you say 'heart' in Hawaiian?",
        options: ["kino", "lima", "maka", "puʻuwai"],
        correctAnswer: 3
      },
      {
        type: "complete",
        message: "Maikaʻi! You know your body parts!",
        points: 100
      }
    ]
  },

  // Lesson 10: Basic Questions
  10: {
    id: 10,
    title: "Basic Questions",
    slides: [
      {
        type: "intro",
        title: "Nā Nīnau Kumu",
        content: "Questions are essential for conversation. Let's learn how to ask basic questions in Hawaiian!",
        image: "❓"
      },
      {
        type: "grammar",
        grammarPoint: "Question Words",
        explanation: "Hawaiian question words often start with 'he' or use specific question markers.",
        examples: [
          { hawaiian: "He aha?", english: "What?" },
          { hawaiian: "ʻAuhea?", english: "Where?" },
          { hawaiian: "Wai?", english: "Who?" },
          { hawaiian: "Pehea?", english: "How?" },
          { hawaiian: "ʻEhia?", english: "How many?" },
          { hawaiian: "Ināhea?", english: "When?" }
        ]
      },
      {
        type: "vocabulary",
        word: "He aha kēia?",
        translation: "What is this?",
        pronunciation: "heh AH-hah KAY-yah",
        example: "He aha kēia mea?",
        exampleTranslation: "What is this thing?"
      },
      {
        type: "vocabulary",
        word: "ʻAuhea ʻoe?",
        translation: "Where are you?",
        pronunciation: "ow-HEH-ah oy",
        example: "ʻAuhea ka hale?",
        exampleTranslation: "Where is the house?"
      },
      {
        type: "vocabulary",
        word: "ʻO wai kēlā?",
        translation: "Who is that?",
        pronunciation: "oh vai KEH-lah",
        example: "ʻO wai kēlā kanaka?",
        exampleTranslation: "Who is that person?"
      },
      {
        type: "vocabulary",
        word: "Pehea e hana ai?",
        translation: "How to do it?",
        pronunciation: "peh-HEH-ah eh HAH-nah ai",
        example: "Pehea e ʻōlelo Hawaiʻi ai?",
        exampleTranslation: "How to speak Hawaiian?"
      },
      {
        type: "practice",
        question: "How do you ask 'What?' in Hawaiian?",
        options: ["Pehea?", "He aha?", "ʻAuhea?", "Wai?"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "What does 'ʻAuhea?' mean?",
        options: ["Who?", "What?", "Where?", "When?"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "Maikaʻi ka nīnau! (Good questions!)",
        points: 200
      }
    ]
  },

  // ========== INTERMEDIATE LEVEL ==========

  // Lesson 11: Weather & Nature
  11: {
    id: 11,
    title: "Weather & Nature",
    slides: [
      {
        type: "intro",
        title: "Ke Anilā a me ka ʻĀina",
        content: "Hawaii's weather and natural beauty are legendary. Learn to describe the environment around you!",
        image: "🌤️"
      },
      {
        type: "vocabulary",
        word: "lā",
        translation: "sun, day",
        pronunciation: "LAH",
        example: "Lā maikaʻi",
        exampleTranslation: "Beautiful day",
        culturalNote: "The sun was considered a manifestation of the god Kāne."
      },
      {
        type: "vocabulary",
        word: "ua",
        translation: "rain",
        pronunciation: "OO-ah",
        example: "Ua nui i kēia lā",
        exampleTranslation: "Heavy rain today",
        culturalNote: "Hawaii has over 200 words for different types of rain!"
      },
      {
        type: "vocabulary",
        word: "makani",
        translation: "wind",
        pronunciation: "mah-KAH-nee",
        example: "Makani ʻoluʻolu",
        exampleTranslation: "Cool breeze"
      },
      {
        type: "vocabulary",
        word: "ao",
        translation: "cloud",
        pronunciation: "AH-oh",
        example: "Nā ao keʻokeʻo",
        exampleTranslation: "White clouds"
      },
      {
        type: "vocabulary",
        word: "ānuenue",
        translation: "rainbow",
        pronunciation: "AH-noo-eh-noo-eh",
        example: "Nani ka ānuenue",
        exampleTranslation: "The rainbow is beautiful",
        culturalNote: "Rainbows are considered a bridge between heaven and earth."
      },
      {
        type: "vocabulary",
        word: "mauna",
        translation: "mountain",
        pronunciation: "MOW-nah",
        example: "Mauna Kea",
        exampleTranslation: "White Mountain"
      },
      {
        type: "practice",
        question: "What does 'ua' mean?",
        options: ["Sun", "Rain", "Wind", "Cloud"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "How do you say 'rainbow' in Hawaiian?",
        options: ["makani", "lā", "ānuenue", "ao"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "Nani ka lā! (Beautiful day!)",
        points: 200
      }
    ]
  },

  // Lesson 12: Food & Cooking
  12: {
    id: 12,
    title: "Food & Cooking",
    slides: [
      {
        type: "intro",
        title: "Ka Meaʻai a me ka Kuke ʻana",
        content: "Food is central to Hawaiian culture. Learn about traditional foods and cooking!",
        image: "🍽️"
      },
      {
        type: "vocabulary",
        word: "poi",
        translation: "pounded taro",
        pronunciation: "POH-ee",
        example: "Poi paʻa",
        exampleTranslation: "Thick poi",
        culturalNote: "Poi is the traditional staple food of Native Hawaiians, made from kalo (taro)."
      },
      {
        type: "vocabulary",
        word: "laulau",
        translation: "wrapped food bundle",
        pronunciation: "LAU-lau",
        example: "Laulau puaʻa",
        exampleTranslation: "Pork laulau",
        culturalNote: "Traditionally wrapped in ti leaves and steamed in an imu (underground oven)."
      },
      {
        type: "vocabulary",
        word: "poke",
        translation: "cut pieces (usually fish)",
        pronunciation: "POH-keh",
        example: "Poke ʻahi",
        exampleTranslation: "Tuna poke"
      },
      {
        type: "vocabulary",
        word: "kālua",
        translation: "to cook in underground oven",
        pronunciation: "KAH-loo-ah",
        example: "Puaʻa kālua",
        exampleTranslation: "Roasted pig"
      },
      {
        type: "vocabulary",
        word: "lūʻau",
        translation: "feast, taro leaves",
        pronunciation: "LOO-ow",
        example: "Hele i ka lūʻau",
        exampleTranslation: "Go to the feast",
        culturalNote: "Lūʻau originally referred to taro leaves, now means a Hawaiian feast."
      },
      {
        type: "practice",
        question: "What is 'poi' made from?",
        options: ["Fish", "Taro", "Coconut", "Breadfruit"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "What does 'kālua' mean?",
        options: ["Raw fish", "Wrapped food", "Cook in underground oven", "Feast"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "ʻOno ka meaʻai! (Delicious food!)",
        points: 200
      }
    ]
  },

  // Lesson 13: Directions & Locations
  13: {
    id: 13,
    title: "Directions & Locations",
    slides: [
      {
        type: "intro",
        title: "Nā Kuhikuhi ʻĀina",
        content: "Learn to navigate using Hawaiian directional terms, which are based on natural landmarks!",
        image: "🧭"
      },
      {
        type: "culture",
        title: "Hawaiian Directions",
        content: "Unlike Western compass directions, Hawaiian directions are based on natural features: mountains and ocean.",
        culturalNote: "This system reflects the deep connection between Hawaiians and their environment."
      },
      {
        type: "vocabulary",
        word: "mauka",
        translation: "toward the mountain/inland",
        pronunciation: "MOW-kah",
        example: "Hele mauka",
        exampleTranslation: "Go inland"
      },
      {
        type: "vocabulary",
        word: "makai",
        translation: "toward the ocean",
        pronunciation: "mah-KAI",
        example: "Ka hale makai",
        exampleTranslation: "The house by the ocean"
      },
      {
        type: "vocabulary",
        word: "ʻākau",
        translation: "north/right",
        pronunciation: "AH-kow",
        example: "Ma ka ʻākau",
        exampleTranslation: "To the north"
      },
      {
        type: "vocabulary",
        word: "hema",
        translation: "south/left",
        pronunciation: "HEH-mah",
        example: "Ma ka hema",
        exampleTranslation: "To the south"
      },
      {
        type: "vocabulary",
        word: "komohana",
        translation: "west",
        pronunciation: "koh-moh-HAH-nah",
        example: "Ka lā komohana",
        exampleTranslation: "The setting sun (west)"
      },
      {
        type: "vocabulary",
        word: "hikina",
        translation: "east",
        pronunciation: "hee-KEE-nah",
        example: "Ka lā hikina",
        exampleTranslation: "The rising sun (east)"
      },
      {
        type: "practice",
        question: "What does 'mauka' mean?",
        options: ["Toward ocean", "Toward mountain", "North", "South"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "How do you say 'toward the ocean'?",
        options: ["mauka", "makai", "ʻākau", "hema"],
        correctAnswer: 1
      },
      {
        type: "complete",
        message: "Maikaʻi! You can navigate!",
        points: 200
      }
    ]
  },

  // Lesson 14: Time Expressions
  14: {
    id: 14,
    title: "Time Expressions",
    slides: [
      {
        type: "intro",
        title: "Nā Mamala Manawa",
        content: "Master time expressions to talk about past, present, and future in Hawaiian!",
        image: "⏰"
      },
      {
        type: "vocabulary",
        word: "i kēia manawa",
        translation: "now, at this time",
        pronunciation: "ee KAY-yah mah-NAH-wah",
        example: "I kēia manawa, makemake au",
        exampleTranslation: "Right now, I want"
      },
      {
        type: "vocabulary",
        word: "i nehinei",
        translation: "yesterday",
        pronunciation: "ee neh-hee-NAY",
        example: "Ua hele au i nehinei",
        exampleTranslation: "I went yesterday"
      },
      {
        type: "vocabulary",
        word: "ʻapōpō",
        translation: "tomorrow",
        pronunciation: "ah-poh-POH",
        example: "E hele ana ʻapōpō",
        exampleTranslation: "Will go tomorrow"
      },
      {
        type: "vocabulary",
        word: "kakahiaka",
        translation: "morning",
        pronunciation: "kah-kah-hee-AH-kah",
        example: "I ke kakahiaka nui",
        exampleTranslation: "In the early morning"
      },
      {
        type: "vocabulary",
        word: "awakea",
        translation: "noon, midday",
        pronunciation: "ah-wah-KEH-ah",
        example: "I ka awakea",
        exampleTranslation: "At noon"
      },
      {
        type: "vocabulary",
        word: "ahiahi",
        translation: "evening",
        pronunciation: "ah-hee-AH-hee",
        example: "I ke ahiahi maikaʻi",
        exampleTranslation: "In the pleasant evening"
      },
      {
        type: "practice",
        question: "What does 'i nehinei' mean?",
        options: ["Today", "Yesterday", "Tomorrow", "Now"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "How do you say 'morning' in Hawaiian?",
        options: ["ahiahi", "awakea", "kakahiaka", "manawa"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "Pōmaikaʻi! Time well spent!",
        points: 200
      }
    ]
  },

  // Lesson 15: Emotions & Feelings
  15: {
    id: 15,
    title: "Emotions & Feelings",
    slides: [
      {
        type: "intro",
        title: "Nā Manaʻo",
        content: "Express your emotions and understand others' feelings in Hawaiian!",
        image: "😊"
      },
      {
        type: "vocabulary",
        word: "hauʻoli",
        translation: "happy, joyful",
        pronunciation: "how-OH-lee",
        example: "Hauʻoli au",
        exampleTranslation: "I am happy"
      },
      {
        type: "vocabulary",
        word: "kaumaha",
        translation: "sad, heavy-hearted",
        pronunciation: "kow-MAH-hah",
        example: "Kaumaha koʻu naʻau",
        exampleTranslation: "My heart is sad"
      },
      {
        type: "vocabulary",
        word: "huhū",
        translation: "angry",
        pronunciation: "hoo-HOO",
        example: "Mai huhū",
        exampleTranslation: "Don't be angry"
      },
      {
        type: "vocabulary",
        word: "makemake",
        translation: "want, like, desire",
        pronunciation: "MAH-keh-MAH-keh",
        example: "Makemake au iā ʻoe",
        exampleTranslation: "I like/love you"
      },
      {
        type: "vocabulary",
        word: "hilahila",
        translation: "shy, embarrassed",
        pronunciation: "HEE-lah-HEE-lah",
        example: "Hilahila ka wahine",
        exampleTranslation: "The woman is shy"
      },
      {
        type: "vocabulary",
        word: "hoʻomaika'i",
        translation: "grateful, thankful",
        pronunciation: "hoh-oh-my-KAH-ee",
        example: "Hoʻomaikaʻi au",
        exampleTranslation: "I am grateful"
      },
      {
        type: "practice",
        question: "What does 'hauʻoli' mean?",
        options: ["Sad", "Happy", "Angry", "Shy"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "How do you say 'I want' in Hawaiian?",
        options: ["Hauʻoli au", "Huhū au", "Makemake au", "Hilahila au"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "Hauʻoli au! (I'm happy!)",
        points: 150
      }
    ]
  },

  // Lesson 16: Ocean & Marine Life
  16: {
    id: 16,
    title: "Ocean & Marine Life",
    slides: [
      {
        type: "intro",
        title: "Ke Kai a me Nā Iʻa",
        content: "The ocean is life to Hawaii. Learn about the sea and its creatures!",
        image: "🌊"
      },
      {
        type: "vocabulary",
        word: "kai",
        translation: "sea, ocean water",
        pronunciation: "KAI",
        example: "Ke kai uliuli",
        exampleTranslation: "The deep blue sea"
      },
      {
        type: "vocabulary",
        word: "nalu",
        translation: "wave",
        pronunciation: "NAH-loo",
        example: "Heʻe nalu",
        exampleTranslation: "Surf (ride waves)",
        culturalNote: "Surfing was invented in Hawaii and is deeply spiritual."
      },
      {
        type: "vocabulary",
        word: "honu",
        translation: "sea turtle",
        pronunciation: "HOH-noo",
        example: "Ka honu ʻeleʻele",
        exampleTranslation: "The black sea turtle",
        culturalNote: "Honu are sacred and protected in Hawaiian culture."
      },
      {
        type: "vocabulary",
        word: "naiʻa",
        translation: "dolphin",
        pronunciation: "nah-EE-ah",
        example: "Nā naiʻa holokai",
        exampleTranslation: "The swimming dolphins"
      },
      {
        type: "vocabulary",
        word: "manō",
        translation: "shark",
        pronunciation: "mah-NOH",
        example: "Ka manō nui",
        exampleTranslation: "The big shark",
        culturalNote: "Some sharks are ʻaumākua (family guardians) to certain families."
      },
      {
        type: "vocabulary",
        word: "iʻa",
        translation: "fish",
        pronunciation: "EE-ah",
        example: "Nā iʻa ʻono",
        exampleTranslation: "The delicious fish"
      },
      {
        type: "practice",
        question: "What does 'honu' mean?",
        options: ["Dolphin", "Shark", "Sea turtle", "Fish"],
        correctAnswer: 2
      },
      {
        type: "practice",
        question: "How do you say 'wave' in Hawaiian?",
        options: ["kai", "nalu", "iʻa", "manō"],
        correctAnswer: 1
      },
      {
        type: "complete",
        message: "Aloha ke kai! (Love the ocean!)",
        points: 200
      }
    ]
  },

  // Lesson 17: Plants & Flowers
  17: {
    id: 17,
    title: "Plants & Flowers",
    slides: [
      {
        type: "intro",
        title: "Nā Lāʻau a me Nā Pua",
        content: "Discover Hawaii's beautiful native plants and their cultural significance!",
        image: "🌺"
      },
      {
        type: "vocabulary",
        word: "pua",
        translation: "flower",
        pronunciation: "POO-ah",
        example: "Nā pua nani",
        exampleTranslation: "Beautiful flowers"
      },
      {
        type: "vocabulary",
        word: "lehua",
        translation: "ʻōhiʻa lehua flower",
        pronunciation: "leh-HOO-ah",
        example: "Ka pua lehua ʻulaʻula",
        exampleTranslation: "The red lehua flower",
        culturalNote: "Sacred to Pele, picking lehua flowers is said to bring rain."
      },
      {
        type: "vocabulary",
        word: "kalo",
        translation: "taro",
        pronunciation: "KAH-loh",
        example: "Ka loʻi kalo",
        exampleTranslation: "The taro patch",
        culturalNote: "Kalo is the elder brother of the Hawaiian people in mythology."
      },
      {
        type: "vocabulary",
        word: "niu",
        translation: "coconut",
        pronunciation: "NEE-oo",
        example: "Ka wai niu",
        exampleTranslation: "Coconut water"
      },
      {
        type: "vocabulary",
        word: "kukui",
        translation: "candlenut tree",
        pronunciation: "koo-KOO-ee",
        example: "Ka lei kukui",
        exampleTranslation: "The kukui lei",
        culturalNote: "Kukui is Hawaii's state tree, symbolizing enlightenment."
      },
      {
        type: "vocabulary",
        word: "maile",
        translation: "maile vine",
        pronunciation: "MY-leh",
        example: "Ka lei maile",
        exampleTranslation: "The maile lei",
        culturalNote: "Maile lei are used for special occasions and ceremonies."
      },
      {
        type: "practice",
        question: "What plant is the 'elder brother' in Hawaiian mythology?",
        options: ["Lehua", "Kalo", "Kukui", "Niu"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "What is Hawaii's state tree?",
        options: ["Niu", "Maile", "Kukui", "Kalo"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "Nani nā pua! (Beautiful flowers!)",
        points: 200
      }
    ]
  },

  // Lesson 18: Sentence Structure
  18: {
    id: 18,
    title: "Sentence Structure",
    slides: [
      {
        type: "intro",
        title: "Ka Papa ʻŌlelo",
        content: "Master Hawaiian sentence patterns to communicate naturally!",
        image: "📝"
      },
      {
        type: "grammar",
        grammarPoint: "VSO Word Order",
        explanation: "Hawaiian typically uses Verb-Subject-Object order, different from English SVO.",
        examples: [
          { hawaiian: "Hele ka wahine", english: "The woman goes (Goes the woman)" },
          { hawaiian: "ʻAi ka keiki i ka poi", english: "The child eats poi (Eats the child the poi)" },
          { hawaiian: "Makemake au i ka hula", english: "I like hula (Like I the hula)" }
        ]
      },
      {
        type: "grammar",
        grammarPoint: "Ka/Ke (The)",
        explanation: "Use 'ke' before words starting with k, e, a, o. Use 'ka' before all other letters.",
        examples: [
          { hawaiian: "ke keiki", english: "the child" },
          { hawaiian: "ke aloha", english: "the love" },
          { hawaiian: "ka wahine", english: "the woman" },
          { hawaiian: "ka hale", english: "the house" }
        ]
      },
      {
        type: "grammar",
        grammarPoint: "Nā (Plural The)",
        explanation: "'Nā' marks plural definite articles, like 'the' for multiple items.",
        examples: [
          { hawaiian: "nā keiki", english: "the children" },
          { hawaiian: "nā hale", english: "the houses" },
          { hawaiian: "nā makua", english: "the parents" }
        ]
      },
      {
        type: "practice",
        question: "Which article goes before 'aloha'?",
        options: ["ka", "ke", "nā", "he"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "What is the correct word order in Hawaiian?",
        options: ["Subject-Verb-Object", "Verb-Subject-Object", "Object-Verb-Subject", "Subject-Object-Verb"],
        correctAnswer: 1
      },
      {
        type: "complete",
        message: "Maikaʻi ka hoʻomaopopo!",
        points: 250
      }
    ]
  },

  // Lesson 19: Possessives
  19: {
    id: 19,
    title: "Possessives",
    slides: [
      {
        type: "intro",
        title: "Nā Kino",
        content: "Learn the complex but beautiful Hawaiian possessive system!",
        image: "🤝"
      },
      {
        type: "grammar",
        grammarPoint: "A-class vs O-class",
        explanation: "Hawaiian has two possessive classes: A-class (things you acquire) and O-class (things inherent to you).",
        examples: [
          { hawaiian: "kaʻu puke", english: "my book (A-class - acquired)" },
          { hawaiian: "koʻu makua", english: "my parent (O-class - inherent)" },
          { hawaiian: "kāna meaʻai", english: "his/her food (A-class)" },
          { hawaiian: "kona inoa", english: "his/her name (O-class)" }
        ]
      },
      {
        type: "vocabulary",
        word: "koʻu/kuʻu",
        translation: "my (O-class)",
        pronunciation: "koh-oo/koo-oo",
        example: "Koʻu ʻohana",
        exampleTranslation: "My family",
        culturalNote: "Kuʻu shows extra affection: kuʻu aloha (my dear love)"
      },
      {
        type: "vocabulary",
        word: "kaʻu",
        translation: "my (A-class)",
        pronunciation: "kah-oo",
        example: "Kaʻu hana",
        exampleTranslation: "My work"
      },
      {
        type: "vocabulary",
        word: "kou",
        translation: "your (O-class)",
        pronunciation: "koh",
        example: "Kou inoa",
        exampleTranslation: "Your name"
      },
      {
        type: "vocabulary",
        word: "kāu",
        translation: "your (A-class)",
        pronunciation: "cow",
        example: "Kāu lei",
        exampleTranslation: "Your lei"
      },
      {
        type: "practice",
        question: "Which possessive for 'my mother'?",
        options: ["kaʻu makuahine", "koʻu makuahine", "kāu makuahine", "kou makuahine"],
        correctAnswer: 1
      },
      {
        type: "practice",
        question: "Which possessive for 'my car' (acquired)?",
        options: ["koʻu kaʻa", "kaʻu kaʻa", "kou kaʻa", "kona kaʻa"],
        correctAnswer: 1
      },
      {
        type: "complete",
        message: "Maikaʻi! Complex but beautiful!",
        points: 250
      }
    ]
  },

  // Lesson 20: Daily Activities
  20: {
    id: 20,
    title: "Daily Activities",
    slides: [
      {
        type: "intro",
        title: "Nā Hana o Kēlā me Kēia Lā",
        content: "Describe your daily routine in Hawaiian!",
        image: "🌅"
      },
      {
        type: "vocabulary",
        word: "ala",
        translation: "wake up, arise",
        pronunciation: "AH-lah",
        example: "Ala au i ke kakahiaka",
        exampleTranslation: "I wake up in the morning"
      },
      {
        type: "vocabulary",
        word: "ʻauʻau",
        translation: "bathe, swim",
        pronunciation: "ow-ow",
        example: "ʻAuʻau i ka hale ʻauʻau",
        exampleTranslation: "Bathe in the bathroom"
      },
      {
        type: "vocabulary",
        word: "ʻai",
        translation: "eat",
        pronunciation: "ai",
        example: "ʻAi i ka ʻaina kakahiaka",
        exampleTranslation: "Eat breakfast"
      },
      {
        type: "vocabulary",
        word: "hana",
        translation: "work, do",
        pronunciation: "HAH-nah",
        example: "Hana au ma ke keʻena",
        exampleTranslation: "I work at the office"
      },
      {
        type: "vocabulary",
        word: "hoʻomaha",
        translation: "rest, relax",
        pronunciation: "hoh-oh-MAH-hah",
        example: "Hoʻomaha i ke ahiahi",
        exampleTranslation: "Rest in the evening"
      },
      {
        type: "vocabulary",
        word: "hiamoe",
        translation: "sleep",
        pronunciation: "HEE-ah-MOH-eh",
        example: "Hiamoe i ka pō",
        exampleTranslation: "Sleep at night"
      },
      {
        type: "practice",
        question: "What does 'ala' mean?",
        options: ["Sleep", "Eat", "Wake up", "Work"],
        correctAnswer: 2
      },
      {
        type: "practice",
        question: "How do you say 'work' in Hawaiian?",
        options: ["ʻai", "hana", "ʻauʻau", "hiamoe"],
        correctAnswer: 1
      },
      {
        type: "complete",
        message: "Lā maikaʻi! (Good day!)",
        points: 200
      }
    ]
  },

  // ========== ADVANCED LEVEL ==========

  // Lesson 21: Hawaiian Proverbs
  21: {
    id: 21,
    title: "Hawaiian Proverbs",
    slides: [
      {
        type: "intro",
        title: "ʻŌlelo Noʻeau",
        content: "Hawaiian proverbs contain centuries of wisdom. Let's explore these treasures!",
        image: "📜"
      },
      {
        type: "culture",
        title: "The Wisdom of ʻŌlelo Noʻeau",
        content: "These sayings teach life lessons through metaphor, often referencing nature and daily life.",
        culturalNote: "Mary Kawena Pukui collected over 3,000 Hawaiian proverbs, preserving this wisdom."
      },
      {
        type: "vocabulary",
        word: "I ka ʻōlelo no ke ola, i ka ʻōlelo no ka make",
        translation: "In language there is life, in language there is death",
        pronunciation: "ee kah OH-leh-loh noh keh OH-lah",
        culturalNote: "Words have power to heal or harm - choose them wisely."
      },
      {
        type: "vocabulary",
        word: "He aliʻi ka ʻāina; he kauwā ke kanaka",
        translation: "The land is chief; man is its servant",
        pronunciation: "heh ah-LEE-ee kah AH-ee-nah",
        culturalNote: "Respect for the land comes before personal needs."
      },
      {
        type: "vocabulary",
        word: "ʻAʻohe pau ka ʻike i ka hālau hoʻokahi",
        translation: "All knowledge is not learned in one school",
        pronunciation: "ah-OH-heh pow kah EE-keh",
        culturalNote: "Be open to learning from many sources."
      },
      {
        type: "vocabulary",
        word: "E hoʻomau i ka ʻimi naʻauao",
        translation: "Continue to seek knowledge",
        pronunciation: "eh hoh-oh-MOW ee kah EE-mee",
        culturalNote: "Lifelong learning is valued in Hawaiian culture."
      },
      {
        type: "practice",
        question: "What does 'I ka ʻōlelo no ke ola' teach about?",
        options: ["Land ownership", "Power of words", "Seeking knowledge", "School learning"],
        correctAnswer: 1
      },
      {
        type: "complete",
        message: "Paʻa ka naʻauao! (Wisdom secured!)",
        points: 300
      }
    ]
  },

  // Lesson 22: Traditional Practices
  22: {
    id: 22,
    title: "Traditional Practices",
    slides: [
      {
        type: "intro",
        title: "Nā Hana Kahiko",
        content: "Explore traditional Hawaiian practices that continue today!",
        image: "🏝️"
      },
      {
        type: "vocabulary",
        word: "hula",
        translation: "Hawaiian dance",
        pronunciation: "HOO-lah",
        example: "Hula kahiko",
        exampleTranslation: "Ancient hula",
        culturalNote: "Hula preserves history, genealogy, and prophecy through dance."
      },
      {
        type: "vocabulary",
        word: "lomilomi",
        translation: "Hawaiian massage",
        pronunciation: "LOH-mee-LOH-mee",
        example: "Ka lomilomi ʻana",
        exampleTranslation: "The massaging",
        culturalNote: "Healing practice passed down through families."
      },
      {
        type: "vocabulary",
        word: "hoʻoponopono",
        translation: "make right, reconciliation",
        pronunciation: "hoh-oh-poh-noh-POH-noh",
        example: "Hana hoʻoponopono",
        exampleTranslation: "Practice reconciliation",
        culturalNote: "Traditional conflict resolution and forgiveness practice."
      },
      {
        type: "vocabulary",
        word: "lawaiʻa",
        translation: "fishing",
        pronunciation: "lah-VAI-ah",
        example: "Lawaiʻa kūʻula",
        exampleTranslation: "Fishing with shrines",
        culturalNote: "Sustainable fishing with respect for ocean resources."
      },
      {
        type: "vocabulary",
        word: "mālama ʻāina",
        translation: "care for the land",
        pronunciation: "MAH-lah-mah AH-ee-nah",
        example: "E mālama ʻāina kākou",
        exampleTranslation: "Let us all care for the land"
      },
      {
        type: "practice",
        question: "What is 'hoʻoponopono'?",
        options: ["Dancing", "Fishing", "Reconciliation", "Massage"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "Hoʻomau ka hana! (Continue the practices!)",
        points: 300
      }
    ]
  },

  // Lesson 23: Complex Grammar
  23: {
    id: 23,
    title: "Complex Grammar",
    slides: [
      {
        type: "intro",
        title: "Nā Loina ʻŌlelo Paʻakikī",
        content: "Master advanced Hawaiian grammar structures!",
        image: "🎓"
      },
      {
        type: "grammar",
        grammarPoint: "Passive Voice with ʻia",
        explanation: "Add 'ʻia' after verbs to make them passive.",
        examples: [
          { hawaiian: "Hana ʻia ka poi", english: "The poi is made" },
          { hawaiian: "ʻAi ʻia ka iʻa", english: "The fish is eaten" },
          { hawaiian: "Kākau ʻia ka moʻolelo", english: "The story is written" }
        ]
      },
      {
        type: "grammar",
        grammarPoint: "Causative with hoʻo-",
        explanation: "Prefix 'hoʻo-' makes verbs causative (to cause something).",
        examples: [
          { hawaiian: "hoʻomaopopo", english: "to make understand" },
          { hawaiian: "hoʻonani", english: "to beautify" },
          { hawaiian: "hoʻolohe", english: "to make listen" }
        ]
      },
      {
        type: "grammar",
        grammarPoint: "Directionals: mai, aku, aʻe, iho",
        explanation: "These particles show direction of action relative to speaker.",
        examples: [
          { hawaiian: "Hele mai", english: "Come (toward speaker)" },
          { hawaiian: "Hele aku", english: "Go (away from speaker)" },
          { hawaiian: "Piʻi aʻe", english: "Climb up" },
          { hawaiian: "Iho ihola", english: "Go down" }
        ]
      },
      {
        type: "practice",
        question: "What does 'hoʻo-' prefix do?",
        options: ["Makes plural", "Makes passive", "Makes causative", "Makes past tense"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "ʻIke loa! (Very knowledgeable!)",
        points: 350
      }
    ]
  },

  // Lesson 24: Hawaiian Mythology
  24: {
    id: 24,
    title: "Hawaiian Mythology",
    slides: [
      {
        type: "intro",
        title: "Nā Moʻolelo o Nā Akua",
        content: "Enter the world of Hawaiian gods and goddesses!",
        image: "⚡"
      },
      {
        type: "vocabulary",
        word: "Pele",
        translation: "Goddess of volcanoes",
        pronunciation: "PEH-leh",
        example: "Ka wahine ʻai honua",
        exampleTranslation: "The earth-eating woman",
        culturalNote: "Pele resides in Kīlauea volcano and controls lava flows."
      },
      {
        type: "vocabulary",
        word: "Kāne",
        translation: "God of creation and life",
        pronunciation: "KAH-neh",
        example: "Kāne i ka wai ola",
        exampleTranslation: "Kāne of the life-giving waters",
        culturalNote: "One of the four major Hawaiian gods."
      },
      {
        type: "vocabulary",
        word: "Kanaloa",
        translation: "God of the ocean",
        pronunciation: "kah-nah-LOH-ah",
        example: "Kanaloa i ke kai",
        exampleTranslation: "Kanaloa of the sea",
        culturalNote: "Often paired with Kāne in Hawaiian mythology."
      },
      {
        type: "vocabulary",
        word: "Māui",
        translation: "The trickster hero",
        pronunciation: "MAH-oo-ee",
        example: "Māui a Kalana",
        exampleTranslation: "Māui son of Kalana",
        culturalNote: "Famous for snaring the sun to slow its journey."
      },
      {
        type: "vocabulary",
        word: "Hina",
        translation: "Goddess of the moon",
        pronunciation: "HEE-nah",
        example: "Hina ke kapa",
        exampleTranslation: "Hina of the tapa cloth",
        culturalNote: "Associated with women's crafts and the moon."
      },
      {
        type: "practice",
        question: "Who is the goddess of volcanoes?",
        options: ["Hina", "Pele", "Kāne", "Māui"],
        correctAnswer: 1
      },
      {
        type: "complete",
        message: "Nui ka ʻike! (Great knowledge!)",
        points: 300
      }
    ]
  },

  // Lesson 25: Place Names & History
  25: {
    id: 25,
    title: "Place Names & History",
    slides: [
      {
        type: "intro",
        title: "Nā Inoa ʻĀina",
        content: "Every Hawaiian place name tells a story. Let's discover their meanings!",
        image: "🗺️"
      },
      {
        type: "vocabulary",
        word: "Honolulu",
        translation: "Sheltered harbor",
        pronunciation: "hoh-noh-LOO-loo",
        example: "Ke kūlanakauhale o Honolulu",
        exampleTranslation: "The city of Honolulu"
      },
      {
        type: "vocabulary",
        word: "Waikīkī",
        translation: "Spouting water",
        pronunciation: "vai-kee-KEE",
        example: "Ka one o Waikīkī",
        exampleTranslation: "The sands of Waikiki",
        culturalNote: "Once a wetland area with freshwater springs."
      },
      {
        type: "vocabulary",
        word: "Haleakalā",
        translation: "House of the sun",
        pronunciation: "HAH-leh-ah-kah-LAH",
        example: "Ka mauna o Haleakalā",
        exampleTranslation: "The mountain of Haleakala",
        culturalNote: "Where Māui snared the sun in legend."
      },
      {
        type: "vocabulary",
        word: "Kauaʻi",
        translation: "The garden isle",
        pronunciation: "kah-WAH-ee",
        example: "Ka mokupuni o Kauaʻi",
        exampleTranslation: "The island of Kauai"
      },
      {
        type: "vocabulary",
        word: "Mauna Kea",
        translation: "White mountain",
        pronunciation: "MOW-nah KEH-ah",
        example: "Kapu ka Mauna Kea",
        exampleTranslation: "Mauna Kea is sacred",
        culturalNote: "Sacred mountain and piko (navel) of Hawaii Island."
      },
      {
        type: "practice",
        question: "What does 'Waikīkī' mean?",
        options: ["White mountain", "Spouting water", "Sheltered harbor", "Garden isle"],
        correctAnswer: 1
      },
      {
        type: "complete",
        message: "ʻIke i ka moʻolelo! (Know the story!)",
        points: 300
      }
    ]
  },

  // Lesson 26: Formal & Ceremonial Language
  26: {
    id: 26,
    title: "Formal & Ceremonial Language",
    slides: [
      {
        type: "intro",
        title: "Ka ʻŌlelo Hoʻohanohano",
        content: "Learn the respectful language used in ceremonies and formal occasions.",
        image: "🎋"
      },
      {
        type: "vocabulary",
        word: "E hoʻolohe mai",
        translation: "Please listen (formal)",
        pronunciation: "eh hoh-oh-LOH-heh my",
        example: "E hoʻolohe mai oukou",
        exampleTranslation: "Please listen, all of you"
      },
      {
        type: "vocabulary",
        word: "Me ka haʻahaʻa",
        translation: "With humility",
        pronunciation: "meh kah hah-ah-HAH-ah",
        example: "Kākoʻo me ka haʻahaʻa",
        exampleTranslation: "Support with humility"
      },
      {
        type: "vocabulary",
        word: "E mālama pono",
        translation: "Take good care",
        pronunciation: "eh MAH-lah-mah POH-noh",
        example: "E mālama pono kekahi i kekahi",
        exampleTranslation: "Take good care of one another"
      },
      {
        type: "vocabulary",
        word: "Welina me ke aloha",
        translation: "Greetings with love (formal)",
        pronunciation: "veh-LEE-nah meh keh ah-LOH-hah",
        example: "Welina me ke aloha pumehana",
        exampleTranslation: "Warm greetings with love"
      },
      {
        type: "practice",
        question: "What does 'Me ka haʻahaʻa' mean?",
        options: ["With love", "With humility", "With respect", "With gratitude"],
        correctAnswer: 1
      },
      {
        type: "complete",
        message: "Hoʻohanohano! (Dignified!)",
        points: 350
      }
    ]
  },

  // Lesson 27: Poetry & Mele
  27: {
    id: 27,
    title: "Poetry & Mele",
    slides: [
      {
        type: "intro",
        title: "Nā Mele a me ka Hoʻoulu",
        content: "Discover the beauty of Hawaiian poetry and traditional songs!",
        image: "🎵"
      },
      {
        type: "culture",
        title: "The Art of Mele",
        content: "Mele (songs/poems) preserve history, express emotions, and honor people and places.",
        culturalNote: "Traditional mele were memorized and passed down orally for generations."
      },
      {
        type: "vocabulary",
        word: "mele",
        translation: "song, poem, chant",
        pronunciation: "MEH-leh",
        example: "Mele aloha",
        exampleTranslation: "Love song"
      },
      {
        type: "vocabulary",
        word: "oli",
        translation: "chant without dance",
        pronunciation: "OH-lee",
        example: "Oli mahalo",
        exampleTranslation: "Chant of gratitude"
      },
      {
        type: "vocabulary",
        word: "kaona",
        translation: "hidden meaning",
        pronunciation: "kah-OH-nah",
        example: "He kaona ko ka mele",
        exampleTranslation: "The song has hidden meaning",
        culturalNote: "Hawaiian poetry often contains multiple layers of meaning."
      },
      {
        type: "grammar",
        grammarPoint: "Poetic Repetition",
        explanation: "Repetition adds rhythm and emphasis in Hawaiian poetry.",
        examples: [
          { hawaiian: "Ua, ua, ua nui", english: "Rain, rain, heavy rain" },
          { hawaiian: "Nani, nani nā pua", english: "Beautiful, beautiful flowers" }
        ]
      },
      {
        type: "practice",
        question: "What is 'kaona' in Hawaiian poetry?",
        options: ["Rhythm", "Hidden meaning", "Repetition", "Dance"],
        correctAnswer: 1
      },
      {
        type: "complete",
        message: "He haku mele ʻoe! (You're a poet!)",
        points: 350
      }
    ]
  },

  // Lesson 28: Professional Hawaiian
  28: {
    id: 28,
    title: "Professional Hawaiian",
    slides: [
      {
        type: "intro",
        title: "Ka ʻŌlelo ʻOihana",
        content: "Learn Hawaiian for professional and business contexts!",
        image: "💼"
      },
      {
        type: "vocabulary",
        word: "ʻoihana",
        translation: "business, profession",
        pronunciation: "oy-HAH-nah",
        example: "Koʻu ʻoihana",
        exampleTranslation: "My profession"
      },
      {
        type: "vocabulary",
        word: "hālāwai",
        translation: "meeting",
        pronunciation: "HAH-LAH-vai",
        example: "Ka hālāwai ʻoihana",
        exampleTranslation: "The business meeting"
      },
      {
        type: "vocabulary",
        word: "palapala",
        translation: "document, writing",
        pronunciation: "pah-lah-PAH-lah",
        example: "Nā palapala ʻoihana",
        exampleTranslation: "Business documents"
      },
      {
        type: "vocabulary",
        word: "kuleana",
        translation: "responsibility, rights",
        pronunciation: "koo-leh-AH-nah",
        example: "Koʻu kuleana",
        exampleTranslation: "My responsibility",
        culturalNote: "Kuleana implies both rights and responsibilities together."
      },
      {
        type: "vocabulary",
        word: "hoʻokō",
        translation: "fulfill, accomplish",
        pronunciation: "hoh-oh-KOH",
        example: "Hoʻokō i ka hana",
        exampleTranslation: "Accomplish the work"
      },
      {
        type: "practice",
        question: "What does 'kuleana' mean?",
        options: ["Meeting", "Document", "Responsibility", "Business"],
        correctAnswer: 2
      },
      {
        type: "complete",
        message: "Kūpono no ka ʻoihana! (Ready for business!)",
        points: 300
      }
    ]
  },

  // Lesson 29: Hawaiian Literature
  29: {
    id: 29,
    title: "Hawaiian Literature",
    slides: [
      {
        type: "intro",
        title: "Ka Moʻokalaleo Hawaiʻi",
        content: "Explore the rich tradition of Hawaiian literature and newspapers!",
        image: "📚"
      },
      {
        type: "culture",
        title: "Hawaiian Newspapers",
        content: "From 1834-1948, over 100 Hawaiian language newspapers published stories, news, and mele.",
        culturalNote: "Hawaii had one of the highest literacy rates in the world in the 1800s."
      },
      {
        type: "vocabulary",
        word: "nūpepa",
        translation: "newspaper",
        pronunciation: "NOO-peh-pah",
        example: "Ka nūpepa Hawaiʻi",
        exampleTranslation: "The Hawaiian newspaper"
      },
      {
        type: "vocabulary",
        word: "moʻolelo",
        translation: "story, history, narrative",
        pronunciation: "moh-oh-LEH-loh",
        example: "He moʻolelo kahiko",
        exampleTranslation: "An ancient story"
      },
      {
        type: "vocabulary",
        word: "kaʻao",
        translation: "legend, fictional story",
        pronunciation: "kah-AH-oh",
        example: "Nā kaʻao o Hawaiʻi",
        exampleTranslation: "The legends of Hawaii"
      },
      {
        type: "vocabulary",
        word: "moʻokūʻauhau",
        translation: "genealogy",
        pronunciation: "moh-oh-koo-ow-HOW",
        example: "Ka moʻokūʻauhau aliʻi",
        exampleTranslation: "The chiefly genealogy",
        culturalNote: "Genealogies connected people to land and established rights."
      },
      {
        type: "practice",
        question: "What is a 'moʻolelo'?",
        options: ["Newspaper", "Story/history", "Genealogy", "Legend"],
        correctAnswer: 1
      },
      {
        type: "complete",
        message: "He mea heluhelu ʻoe! (You're a reader!)",
        points: 400
      }
    ]
  },

  // Lesson 30: Fluent Conversation
  30: {
    id: 30,
    title: "Fluent Conversation",
    slides: [
      {
        type: "intro",
        title: "Ka Kamaʻilio ʻAkāka",
        content: "Congratulations! You're ready for natural Hawaiian conversation!",
        image: "🎊"
      },
      {
        type: "grammar",
        grammarPoint: "Natural Flow",
        explanation: "Combine all you've learned for smooth, natural conversation.",
        examples: [
          { hawaiian: "Pehea kou lā i kēia lā?", english: "How's your day today?" },
          { hawaiian: "Maikaʻi wale nō, mahalo no kou nīnau", english: "Just fine, thanks for asking" },
          { hawaiian: "He aha kāu e hana nei?", english: "What are you doing?" }
        ]
      },
      {
        type: "vocabulary",
        word: "E ʻoluʻolu ʻoe",
        translation: "Please (polite request)",
        pronunciation: "eh oh-loo-OH-loo oy",
        example: "E ʻoluʻolu ʻoe, e kōkua mai",
        exampleTranslation: "Please help me"
      },
      {
        type: "vocabulary",
        word: "ʻAe paha",
        translation: "Maybe, perhaps",
        pronunciation: "AH-eh PAH-hah",
        example: "ʻAe paha, e ʻike ana kāua",
        exampleTranslation: "Perhaps we'll see"
      },
      {
        type: "vocabulary",
        word: "I koʻu manaʻo",
        translation: "In my opinion",
        pronunciation: "ee koh-oo mah-NAH-oh",
        example: "I koʻu manaʻo, maikaʻi kēlā",
        exampleTranslation: "In my opinion, that's good"
      },
      {
        type: "culture",
        title: "E Ola ka ʻŌlelo Hawaiʻi!",
        content: "Let the Hawaiian Language Live! You are now part of the movement to revitalize Hawaiian.",
        culturalNote: "Every speaker helps ensure Hawaiian thrives for future generations."
      },
      {
        type: "complete",
        message: "Hoʻomaikaʻi! You've completed all 30 lessons!",
        points: 400
      }
    ]
  }
};

export const getLessonContent = (lessonId: number): LessonContent | undefined => {
  return lessonContents[lessonId];
};