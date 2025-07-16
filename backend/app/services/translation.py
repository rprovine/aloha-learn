import openai
from typing import Dict, List, Optional
from app.core.config import settings
from app.models.translation import Dictionary
from sqlalchemy.orm import Session
import json
import logging
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TranslationService:
    def __init__(self, db: Session):
        self.db = db
        try:
            self.client = openai.OpenAI(
                api_key=settings.OPENAI_API_KEY,
                timeout=30.0,  # 30 second timeout
                max_retries=3  # Retry up to 3 times
            )
            logger.info(f"OpenAI client initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize OpenAI client: {e}")
            raise
    
    async def translate(
        self,
        text: str,
        source_lang: str,
        target_lang: str,
        include_cultural_context: bool = True
    ) -> Dict:
        # Determine translation direction
        if source_lang == 'en' and target_lang == 'haw':
            return await self._translate_to_hawaiian(text, include_cultural_context)
        elif source_lang == 'haw' and target_lang == 'en':
            return await self._translate_to_english(text, include_cultural_context)
        else:
            raise ValueError("Only English-Hawaiian translations are supported")
    
    async def _translate_to_hawaiian(self, text: str, include_context: bool) -> Dict:
        # Check dictionary first for common words/phrases
        dictionary_results = self._check_dictionary(text, 'en')
        
        # Prepare the prompt
        prompt = f"""Translate to Hawaiian: "{text}"
Return JSON:
{{
  "translation": "Hawaiian translation",
  "word_breakdown": [{{"hawaiian": "word", "english": "meaning"}}],
  "cultural_context": "Brief cultural note",
  "pronunciation_guide": "Simple pronunciation"
}}"""

        try:
            # Retry logic for connection issues
            max_retries = 3
            retry_delay = 1
            last_error = None
            
            for attempt in range(max_retries):
                try:
                    response = self.client.chat.completions.create(
                        model="gpt-3.5-turbo-0125",
                        messages=[
                            {"role": "system", "content": "Hawaiian translator. Return JSON only."},
                            {"role": "user", "content": prompt}
                        ],
                        temperature=0.3,
                        response_format={"type": "json_object"}
                    )
                    break  # Success, exit retry loop
                except openai.APIConnectionError as e:
                    last_error = e
                    logger.warning(f"Connection error on attempt {attempt + 1}: {e}")
                    if attempt < max_retries - 1:
                        time.sleep(retry_delay * (attempt + 1))
                    else:
                        raise last_error
            
            result = json.loads(response.choices[0].message.content)
            
            # Enhance with dictionary data if available
            if dictionary_results:
                result['dictionary_matches'] = dictionary_results
            
            return result
            
        except openai.RateLimitError as e:
            logger.error(f"OpenAI Rate Limit Error: {str(e)}")
            return {
                "translation": "Translation service is busy, please try again",
                "error": "Rate limit reached",
                "dictionary_matches": dictionary_results
            }
        except openai.AuthenticationError as e:
            logger.error(f"OpenAI Authentication Error: {str(e)}")
            return {
                "translation": "Translation service configuration error",
                "error": "Authentication failed",
                "dictionary_matches": dictionary_results
            }
        except Exception as e:
            logger.error(f"OpenAI Translation Error: {str(e)}")
            logger.error(f"Error type: {type(e).__name__}")
            logger.error(f"Full error details: {repr(e)}")
            # Fallback to basic translation
            return {
                "translation": "Translation temporarily unavailable",
                "error": str(e),
                "error_type": type(e).__name__,
                "dictionary_matches": dictionary_results
            }
    
    async def _translate_to_english(self, text: str, include_context: bool) -> Dict:
        # Check dictionary first
        dictionary_results = self._check_dictionary(text, 'haw')
        
        prompt = f"""You are an expert Hawaiian language translator with deep cultural knowledge.
        
Translate the following Hawaiian text to English:
"{text}"

Provide:
1. The English translation
2. Word-by-word breakdown
3. Cultural significance and context
4. Literal vs. contextual meaning differences

Format your response as JSON:
{{
    "translation": "English translation here",
    "word_breakdown": [
        {{"hawaiian": "word", "english": "meaning", "part_of_speech": "noun/verb/etc"}},
        ...
    ],
    "cultural_context": "Cultural significance",
    "literal_meaning": "Literal translation if different",
    "contextual_meaning": "Contextual/idiomatic meaning"
}}"""

        try:
            # Retry logic for connection issues
            max_retries = 3
            retry_delay = 1
            last_error = None
            
            for attempt in range(max_retries):
                try:
                    response = self.client.chat.completions.create(
                        model="gpt-3.5-turbo-0125",
                        messages=[
                            {"role": "system", "content": "You are a Hawaiian language expert focused on preserving cultural nuance in translations."},
                            {"role": "user", "content": prompt}
                        ],
                        temperature=0.3,
                        response_format={"type": "json_object"}
                    )
                    break  # Success, exit retry loop
                except openai.APIConnectionError as e:
                    last_error = e
                    logger.warning(f"Connection error on attempt {attempt + 1}: {e}")
                    if attempt < max_retries - 1:
                        time.sleep(retry_delay * (attempt + 1))
                    else:
                        raise last_error
            
            result = json.loads(response.choices[0].message.content)
            
            if dictionary_results:
                result['dictionary_matches'] = dictionary_results
            
            return result
            
        except openai.RateLimitError as e:
            logger.error(f"OpenAI Rate Limit Error: {str(e)}")
            return {
                "translation": "Translation service is busy, please try again",
                "error": "Rate limit reached",
                "dictionary_matches": dictionary_results
            }
        except openai.AuthenticationError as e:
            logger.error(f"OpenAI Authentication Error: {str(e)}")
            return {
                "translation": "Translation service configuration error",
                "error": "Authentication failed",
                "dictionary_matches": dictionary_results
            }
        except Exception as e:
            logger.error(f"OpenAI English Translation Error: {str(e)}")
            logger.error(f"Error type: {type(e).__name__}")
            logger.error(f"Full error details: {repr(e)}")
            return {
                "translation": "Translation temporarily unavailable",
                "error": str(e),
                "error_type": type(e).__name__,
                "dictionary_matches": dictionary_results
            }
    
    def _check_dictionary(self, text: str, source_lang: str) -> List[Dict]:
        # Simple word lookup in dictionary
        words = text.lower().split()
        matches = []
        
        for word in words:
            if source_lang == 'en':
                entry = self.db.query(Dictionary).filter(
                    Dictionary.english_translation.ilike(f'%{word}%')
                ).first()
            else:
                entry = self.db.query(Dictionary).filter(
                    Dictionary.hawaiian_word.ilike(f'%{word}%')
                ).first()
            
            if entry:
                matches.append({
                    'word': word,
                    'hawaiian': entry.hawaiian_word,
                    'english': entry.english_translation,
                    'part_of_speech': entry.part_of_speech,
                    'cultural_notes': entry.cultural_notes
                })
        
        return matches
    
    async def get_word_of_the_day(self) -> Dict:
        # Get a random word from the dictionary with beginner difficulty
        from sqlalchemy import func
        word = self.db.query(Dictionary).filter(
            Dictionary.difficulty_level == 'beginner'
        ).order_by(func.random()).first()
        
        if word:
            return {
                'hawaiian': word.hawaiian_word,
                'english': word.english_translation,
                'pronunciation': word.pronunciation_ipa,
                'part_of_speech': word.part_of_speech,
                'example': word.example_sentences[0] if word.example_sentences else None,
                'cultural_notes': word.cultural_notes
            }
        
        return None