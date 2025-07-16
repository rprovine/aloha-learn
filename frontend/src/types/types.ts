export interface User {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  preferred_language: string;
  learning_level: string;
  daily_goal_minutes: number;
  total_points: number;
  current_streak: number;
  longest_streak: number;
  lessons_completed: number;
  created_at: string;
  last_login?: string;
}

export interface TranslationRequest {
  text: string;
  source_language: 'en' | 'haw';
  target_language: 'en' | 'haw';
  include_cultural_context?: boolean;
}

export interface WordBreakdown {
  hawaiian: string;
  english: string;
  part_of_speech?: string;
}

export interface TranslationResponse {
  translation: string;
  word_breakdown?: WordBreakdown[];
  cultural_context?: string;
  alternatives?: string[];
  pronunciation_guide?: string;
  literal_meaning?: string;
  contextual_meaning?: string;
  dictionary_matches?: any[];
}

export interface TranslationHistory {
  id: number;
  source_text: string;
  translated_text: string;
  source_language: string;
  target_language: string;
  cultural_context?: string;
  created_at: string;
  is_favorite: boolean;
}

export interface Lesson {
  id: number;
  uuid: string;
  title: string;
  title_hawaiian?: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  lesson_type: 'vocabulary' | 'grammar' | 'pronunciation' | 'conversation' | 'culture';
  order_index: number;
  content: any;
  vocabulary?: any[];
  phrases?: any[];
  grammar_points?: any[];
  cultural_notes?: string;
  moelelo?: string;
  audio_urls?: string[];
  image_urls?: string[];
  prerequisites?: number[];
  estimated_minutes: number;
  points_value: number;
  is_published: boolean;
}

export interface UserProgress {
  id: number;
  user_id: number;
  lesson_id: number;
  is_completed: boolean;
  completion_percentage: number;
  score?: number;
  time_spent_minutes: number;
  attempts: number;
  best_score?: number;
  started_at: string;
  completed_at?: string;
  last_accessed: string;
}