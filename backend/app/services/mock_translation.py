from typing import Dict, List
import random

class MockTranslationService:
    def __init__(self, db):
        self.db = db
        
    async def translate(self, text: str, source_lang: str, target_lang: str, include_cultural_context: bool = True) -> Dict:
        # Mock Hawaiian translations
        mock_translations = {
            'hello': {
                'translation': 'Aloha',
                'word_breakdown': [
                    {'hawaiian': 'Aloha', 'english': 'hello, goodbye, love', 'part_of_speech': 'interjection'}
                ],
                'cultural_context': 'Aloha is more than just a greeting - it embodies the spirit of love, peace, and compassion that is central to Hawaiian culture.',
                'pronunciation_guide': 'ah-LOH-hah'
            },
            'thank you': {
                'translation': 'Mahalo',
                'word_breakdown': [
                    {'hawaiian': 'Mahalo', 'english': 'thank you', 'part_of_speech': 'interjection'}
                ],
                'cultural_context': 'Mahalo expresses gratitude and appreciation, reflecting the Hawaiian value of showing respect and thankfulness.',
                'pronunciation_guide': 'mah-HAH-loh'
            },
            'family': {
                'translation': 'ʻOhana',
                'word_breakdown': [
                    {'hawaiian': 'ʻOhana', 'english': 'family', 'part_of_speech': 'noun'}
                ],
                'cultural_context': 'ʻOhana means family, but extends beyond blood relations to include chosen family and community.',
                'pronunciation_guide': 'oh-HAH-nah'
            },
            'love': {
                'translation': 'Aloha',
                'word_breakdown': [
                    {'hawaiian': 'Aloha', 'english': 'love, affection', 'part_of_speech': 'noun'}
                ],
                'cultural_context': 'Aloha encompasses love, affection, peace, compassion and mercy.',
                'pronunciation_guide': 'ah-LOH-hah'
            }
        }
        
        # Check for direct matches
        text_lower = text.lower().strip()
        if text_lower in mock_translations:
            return mock_translations[text_lower]
        
        # For reverse translation (Hawaiian to English)
        if source_lang == 'haw':
            reverse_map = {
                'aloha': 'Hello/Love',
                'mahalo': 'Thank you', 
                'ohana': 'Family',
                'ʻohana': 'Family'
            }
            if text_lower in reverse_map:
                return {
                    'translation': reverse_map[text_lower],
                    'cultural_context': 'This is a fundamental Hawaiian word with deep cultural meaning.',
                    'pronunciation_guide': 'Authentic Hawaiian pronunciation'
                }
        
        # Generic response for other text
        if source_lang == 'en' and target_lang == 'haw':
            return {
                'translation': f'[Hawaiian translation of "{text}"]',
                'word_breakdown': [
                    {'hawaiian': '[Hawaiian word]', 'english': text, 'part_of_speech': 'various'}
                ],
                'cultural_context': 'This is a demo translation. For accurate translations, please add your OpenAI API key to the .env file.',
                'pronunciation_guide': '[Pronunciation guide would appear here]',
                'alternatives': ['[Alternative translation 1]', '[Alternative translation 2]']
            }
        else:
            return {
                'translation': f'[English translation of "{text}"]',
                'cultural_context': 'This is a demo translation. For accurate translations, please add your OpenAI API key to the .env file.'
            }