from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from typing import Optional, Dict, List
import os
from pathlib import Path
from pydantic import BaseModel

router = APIRouter()

class PronunciationResponse(BaseModel):
    word: str
    phonetic: str
    ipa: str
    syllables: List[str]
    audio_url: Optional[str]
    tips: List[str]

# Pronunciation database (in production, this would be in a real database)
PRONUNCIATION_DATA: Dict[str, dict] = {
    "aloha": {
        "phonetic": "ah-LOH-hah",
        "ipa": "[ɐˈloːhɐ]",
        "syllables": ["a", "lo", "ha"],
        "audio_file": "aloha.mp3",
        "tips": [
            "Stress on the second syllable 'LO'",
            "Each vowel is pronounced separately",
            "The 'a' sounds like 'ah' in 'father'"
        ]
    },
    "mahalo": {
        "phonetic": "mah-HAH-loh",
        "ipa": "[mɐˈhaːlo]",
        "syllables": ["ma", "ha", "lo"],
        "audio_file": "mahalo.mp3",
        "tips": [
            "Stress on the second syllable 'HA'",
            "The 'o' at the end is pronounced like 'oh'"
        ]
    },
    "ohana": {
        "phonetic": "oh-HAH-nah",
        "ipa": "[oˈhaːnɐ]",
        "syllables": ["o", "ha", "na"],
        "audio_file": "ohana.mp3",
        "tips": [
            "Stress on the second syllable 'HA'",
            "Each vowel is distinct"
        ]
    },
    "keiki": {
        "phonetic": "KAY-kee",
        "ipa": "[ˈkejki]",
        "syllables": ["kei", "ki"],
        "audio_file": "keiki.mp3",
        "tips": [
            "Stress on the first syllable 'KAY'",
            "The 'ei' makes an 'ay' sound"
        ]
    },
    "wiki": {
        "phonetic": "VEE-kee",
        "ipa": "[ˈviki]",
        "syllables": ["wi", "ki"],
        "audio_file": "wiki.mp3",
        "tips": [
            "W sounds like 'v' before 'i'",
            "Stress on the first syllable"
        ]
    }
}

@router.get("/word/{word}", response_model=PronunciationResponse)
async def get_pronunciation(word: str):
    """Get pronunciation information for a Hawaiian word"""
    word_lower = word.lower()
    
    if word_lower in PRONUNCIATION_DATA:
        data = PRONUNCIATION_DATA[word_lower]
        
        # Check if audio file actually exists
        audio_url = None
        if data.get("audio_file"):
            audio_path = Path("static/audio/hawaiian") / data["audio_file"]
            if audio_path.exists():
                audio_url = f"/api/v1/pronunciation/audio/{data['audio_file']}"
        
        return PronunciationResponse(
            word=word,
            phonetic=data["phonetic"],
            ipa=data["ipa"],
            syllables=data["syllables"],
            audio_url=audio_url,
            tips=data["tips"]
        )
    
    # Generate basic pronunciation data for unknown words
    return generate_pronunciation(word)

def generate_pronunciation(word: str) -> PronunciationResponse:
    """Generate pronunciation data for words not in the database"""
    syllables = break_into_syllables(word)
    phonetic = generate_phonetic(word, syllables)
    tips = generate_tips(word)
    
    return PronunciationResponse(
        word=word,
        phonetic=phonetic,
        ipa=generate_ipa(word),
        syllables=syllables,
        audio_url=None,
        tips=tips
    )

def break_into_syllables(word: str) -> List[str]:
    """Break Hawaiian word into syllables"""
    syllables = []
    current = ""
    vowels = "aeiouāēīōū"
    
    for i, char in enumerate(word.lower()):
        current += char
        
        # Check if current char is a vowel
        if char in vowels:
            # Look ahead to see if next char is also a vowel
            if i + 1 < len(word) and word[i + 1] not in vowels:
                syllables.append(current)
                current = ""
            elif i + 1 == len(word):
                syllables.append(current)
                
    if current:
        syllables.append(current)
        
    return syllables

def generate_phonetic(word: str, syllables: List[str]) -> str:
    """Generate phonetic pronunciation"""
    phonetic_parts = []
    
    for i, syllable in enumerate(syllables):
        phonetic = syllable
        
        # Apply basic rules
        phonetic = phonetic.replace('a', 'ah')
        phonetic = phonetic.replace('e', 'eh')
        phonetic = phonetic.replace('i', 'ee')
        phonetic = phonetic.replace('o', 'oh')
        phonetic = phonetic.replace('u', 'oo')
        
        # W before i/e becomes V
        phonetic = phonetic.replace('wee', 'vee')
        phonetic = phonetic.replace('weh', 'veh')
        
        # Apply stress to penultimate syllable
        if len(syllables) > 1 and i == len(syllables) - 2:
            phonetic = phonetic.upper()
            
        phonetic_parts.append(phonetic)
    
    return "-".join(phonetic_parts)

def generate_ipa(word: str) -> str:
    """Generate IPA representation"""
    ipa_map = {
        'a': 'ɐ', 'ā': 'aː',
        'e': 'ɛ', 'ē': 'eː',
        'i': 'i', 'ī': 'iː',
        'o': 'o', 'ō': 'oː',
        'u': 'u', 'ū': 'uː',
        'h': 'h', 'k': 'k', 'l': 'l',
        'm': 'm', 'n': 'n', 'p': 'p',
        'w': 'w', 'ʻ': 'ʔ'
    }
    
    ipa = ""
    word_lower = word.lower()
    
    for i, char in enumerate(word_lower):
        if char == 'w' and i + 1 < len(word_lower) and word_lower[i + 1] in 'ie':
            ipa += 'v'
        else:
            ipa += ipa_map.get(char, char)
    
    return f"[{ipa}]"

def generate_tips(word: str) -> List[str]:
    """Generate pronunciation tips based on word features"""
    tips = []
    word_lower = word.lower()
    
    # Check for W before i/e
    if 'wi' in word_lower or 'we' in word_lower:
        tips.append("W sounds like 'v' before i and e")
    
    # Check for ʻokina
    if 'ʻ' in word:
        tips.append("The ʻokina (ʻ) is a glottal stop - make a brief pause")
    
    # Check for macrons
    if any(char in word for char in 'āēīōū'):
        tips.append("Hold vowels with macrons (lines above) longer")
    
    # General tip for longer words
    if len(word) > 4:
        tips.append("Stress usually falls on the second-to-last syllable")
    
    # Check for diphthongs
    vowels = "aeiou"
    for i in range(len(word_lower) - 1):
        if word_lower[i] in vowels and word_lower[i + 1] in vowels:
            tips.append("Pronounce each vowel separately")
            break
    
    return tips

@router.get("/audio/{filename}")
async def get_audio_file(filename: str):
    """Serve pre-recorded audio files from native Hawaiian speakers"""
    
    # Security: Ensure filename doesn't contain path traversal attempts
    if ".." in filename or "/" in filename or "\\" in filename:
        raise HTTPException(status_code=400, detail="Invalid filename")
    
    # Define the audio directory
    audio_dir = Path("static/audio/hawaiian")
    file_path = audio_dir / filename
    
    # Check if file exists
    if not file_path.exists() or not file_path.is_file():
        # Fallback message for missing audio
        raise HTTPException(
            status_code=404,
            detail=f"Audio file not found. Native speaker recording needed for '{filename}'."
        )
    
    # Determine content type based on file extension
    content_type = "audio/mpeg"  # default for mp3
    if filename.endswith(".wav"):
        content_type = "audio/wav"
    elif filename.endswith(".ogg"):
        content_type = "audio/ogg"
    elif filename.endswith(".m4a"):
        content_type = "audio/mp4"
    
    return FileResponse(
        path=file_path,
        media_type=content_type,
        headers={
            "Cache-Control": "public, max-age=86400",  # Cache for 1 day
            "Accept-Ranges": "bytes"  # Enable partial content for audio streaming
        }
    )