from typing import List, Optional, Dict
from pydantic import BaseModel
from datetime import datetime


class TranslationRequest(BaseModel):
    text: str
    source_language: str = "en"  # 'en' or 'haw'
    target_language: str = "haw"  # 'haw' or 'en'
    include_cultural_context: bool = True


class WordBreakdown(BaseModel):
    hawaiian: str
    english: str
    part_of_speech: Optional[str] = None


class TranslationResponse(BaseModel):
    translation: str
    word_breakdown: Optional[List[WordBreakdown]] = None
    cultural_context: Optional[str] = None
    alternatives: Optional[List[str]] = None
    pronunciation_guide: Optional[str] = None
    literal_meaning: Optional[str] = None
    contextual_meaning: Optional[str] = None
    dictionary_matches: Optional[List[Dict]] = None


class TranslationHistory(BaseModel):
    id: int
    source_text: str
    translated_text: str
    source_language: str
    target_language: str
    cultural_context: Optional[str]
    created_at: datetime
    is_favorite: bool

    class Config:
        from_attributes = True


class DictionaryEntry(BaseModel):
    hawaiian_word: str
    english_translation: str
    part_of_speech: Optional[str]
    pronunciation_ipa: Optional[str]
    definitions: Optional[List[Dict]]
    example_sentences: Optional[List[Dict]]
    cultural_notes: Optional[str]
    categories: Optional[List[str]]
    difficulty_level: Optional[str]

    class Config:
        from_attributes = True


class WordOfTheDay(BaseModel):
    hawaiian: str
    english: str
    pronunciation: Optional[str]
    part_of_speech: Optional[str]
    example: Optional[Dict]
    cultural_notes: Optional[str]