// Hawaiian Pronunciation Service
// Provides phonetic breakdowns and pronunciation rules

interface PronunciationRule {
  pattern: RegExp;
  replacement: string;
  description: string;
}

// Hawaiian pronunciation rules
const pronunciationRules: PronunciationRule[] = [
  // Vowels
  { pattern: /a/g, replacement: 'ah', description: 'Like "ah" in father' },
  { pattern: /e/g, replacement: 'eh', description: 'Like "e" in bet' },
  { pattern: /i/g, replacement: 'ee', description: 'Like "ee" in see' },
  { pattern: /o/g, replacement: 'oh', description: 'Like "o" in go' },
  { pattern: /u/g, replacement: 'oo', description: 'Like "oo" in moon' },
  
  // Long vowels (with macron)
  { pattern: /ā/g, replacement: 'ahh', description: 'Held longer' },
  { pattern: /ē/g, replacement: 'ehh', description: 'Held longer' },
  { pattern: /ī/g, replacement: 'eee', description: 'Held longer' },
  { pattern: /ō/g, replacement: 'ohh', description: 'Held longer' },
  { pattern: /ū/g, replacement: 'ooo', description: 'Held longer' },
  
  // Consonants with special rules
  { pattern: /w(?=[ie])/g, replacement: 'v', description: 'W sounds like V before i and e' },
  { pattern: /w(?=[aou])/g, replacement: 'w', description: 'W sounds like W before a, o, u' },
];

// Common Hawaiian words with stress patterns
const stressPatterns: { [key: string]: string } = {
  'aloha': 'ah-LOH-hah',
  'mahalo': 'mah-HAH-loh',
  'ohana': 'oh-HAH-nah',
  'keiki': 'KAY-kee',
  'wahine': 'wah-HEE-neh',
  'kane': 'KAH-neh',
  'mauka': 'MOW-kah',
  'makai': 'mah-KAI',
  'kokua': 'koh-KOO-ah',
  'hula': 'HOO-lah',
  'lei': 'LAY',
  'luau': 'LOO-ow',
  'ukulele': 'oo-koo-LEH-leh',
  'wiki': 'VEE-kee', // W sounds like V before i
  'hawaii': 'hah-VAI-ee', // W sounds like V before i
  'hawaiʻi': 'hah-VAI-ee', // With ʻokina
};

// Syllable breaking for Hawaiian words
export function breakIntoSyllables(word: string): string[] {
  // Hawaiian syllables follow CV or V pattern (Consonant-Vowel or just Vowel)
  const syllables: string[] = [];
  let current = '';
  
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    const nextChar = word[i + 1];
    
    current += char;
    
    // Check if current character is a vowel
    if (/[aeiouāēīōū]/i.test(char)) {
      // If next character is not a vowel, end syllable
      if (!nextChar || !/[aeiouāēīōū]/i.test(nextChar)) {
        syllables.push(current);
        current = '';
      }
    }
  }
  
  if (current) {
    syllables.push(current);
  }
  
  return syllables;
}

// Get phonetic pronunciation
export function getPhoneticPronunciation(word: string): string {
  const lowerWord = word.toLowerCase();
  
  // Check if we have a specific stress pattern for this word
  if (stressPatterns[lowerWord]) {
    return stressPatterns[lowerWord];
  }
  
  // Otherwise, break into syllables and apply general rules
  const syllables = breakIntoSyllables(lowerWord);
  const phoneticSyllables = syllables.map((syllable, index) => {
    let phonetic = syllable;
    
    // Apply pronunciation rules
    pronunciationRules.forEach(rule => {
      phonetic = phonetic.replace(rule.pattern, rule.replacement);
    });
    
    // Apply stress to second-to-last syllable (penultimate stress)
    if (syllables.length > 1 && index === syllables.length - 2) {
      phonetic = phonetic.toUpperCase();
    }
    
    return phonetic;
  });
  
  return phoneticSyllables.join('-');
}

// Get IPA (International Phonetic Alphabet) representation
export function getIPAPronunciation(word: string): string {
  const ipaMap: { [key: string]: string } = {
    'a': 'ɐ',
    'ā': 'aː',
    'e': 'ɛ',
    'ē': 'eː',
    'i': 'i',
    'ī': 'iː',
    'o': 'o',
    'ō': 'oː',
    'u': 'u',
    'ū': 'uː',
    'h': 'h',
    'k': 'k',
    'l': 'l',
    'm': 'm',
    'n': 'n',
    'p': 'p',
    'w': 'w~v', // Can be either
    'ʻ': 'ʔ', // Glottal stop
  };
  
  let ipa = '';
  const lowerWord = word.toLowerCase();
  
  for (let i = 0; i < lowerWord.length; i++) {
    const char = lowerWord[i];
    const nextChar = lowerWord[i + 1];
    
    if (char === 'w' && nextChar && /[ie]/.test(nextChar)) {
      ipa += 'v';
    } else {
      ipa += ipaMap[char] || char;
    }
  }
  
  return `[${ipa}]`;
}

// Speech synthesis optimized for Hawaiian
export function speakHawaiian(text: string, options?: {
  rate?: number;
  pitch?: number;
  voice?: SpeechSynthesisVoice;
}): void {
  // Cancel any ongoing speech
  speechSynthesis.cancel();
  
  // Break text into manageable chunks
  const chunks = text.split(/[.!?]+/).filter(chunk => chunk.trim());
  
  chunks.forEach((chunk, index) => {
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      
      // Apply Hawaiian-optimized settings
      utterance.rate = options?.rate || 0.7; // Slower for clarity
      utterance.pitch = options?.pitch || 1.1; // Slightly higher
      utterance.volume = 1.0;
      
      if (options?.voice) {
        utterance.voice = options.voice;
      }
      
      // Add pauses between words for clarity
      utterance.text = chunk.replace(/\s+/g, ' ... ');
      
      speechSynthesis.speak(utterance);
    }, index * 1000); // Delay between chunks
  });
}

// Get audio file path for pre-recorded pronunciations
export function getAudioFilePath(word: string): string | null {
  // In production, you would have a mapping of words to audio files
  // recorded by native Hawaiian speakers
  const audioFiles: { [key: string]: string } = {
    // Example mappings
    'aloha': '/audio/hawaiian/aloha.mp3',
    'mahalo': '/audio/hawaiian/mahalo.mp3',
    // ... more mappings
  };
  
  return audioFiles[word.toLowerCase()] || null;
}

// Pronunciation feedback
export function getPronunciationTips(word: string): string[] {
  const tips: string[] = [];
  const lowerWord = word.toLowerCase();
  
  // Check for common pronunciation challenges
  if (lowerWord.includes('w')) {
    tips.push('Remember: W sounds like "v" before i and e');
  }
  
  if (lowerWord.includes('ʻ')) {
    tips.push('The ʻokina (ʻ) is a glottal stop - make a brief pause');
  }
  
  if (/[āēīōū]/.test(lowerWord)) {
    tips.push('Hold vowels with macrons (lines above) longer');
  }
  
  if (lowerWord.length > 4) {
    tips.push('Stress usually falls on the second-to-last syllable');
  }
  
  // Check for diphthongs
  if (/[aeiou]{2,}/.test(lowerWord)) {
    tips.push('Pronounce each vowel separately');
  }
  
  return tips;
}