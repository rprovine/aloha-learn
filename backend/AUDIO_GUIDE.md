# Native Hawaiian Audio Integration Guide

## Overview
The Aloha Learn platform is fully prepared to accept and serve audio recordings from native Hawaiian speakers. When audio files are available, they will automatically be used instead of browser-based speech synthesis.

## Audio File Requirements

### Supported Formats
- **MP3** (.mp3) - Recommended for web compatibility
- **WAV** (.wav) - High quality, larger files
- **OGG** (.ogg) - Good compression, open format
- **M4A** (.m4a) - Apple format, good quality

### Recording Guidelines
- **Sample Rate**: 44.1 kHz or 48 kHz
- **Bit Rate**: 128-256 kbps for MP3
- **Length**: Keep files short (single words or short phrases)
- **Quality**: Clean recording without background noise
- **Volume**: Normalized to prevent clipping

## How to Add Audio Files

### Method 1: Using the Management Script

```bash
cd backend
python scripts/manage_audio.py add "aloha" /path/to/aloha.mp3
```

This will:
1. Copy the audio file to `backend/static/audio/hawaiian/`
2. Rename it to a standardized format
3. Update metadata
4. Show instructions for updating the pronunciation database

### Method 2: Manual Addition

1. Place audio files in: `backend/static/audio/hawaiian/`
2. Name them as: `{word}.{extension}` (e.g., `aloha.mp3`)
3. Update `PRONUNCIATION_DATA` in `backend/app/api/v1/pronunciation.py`:

```python
"aloha": {
    "phonetic": "ah-LOH-hah",
    "ipa": "[ɐˈloːhɐ]",
    "syllables": ["a", "lo", "ha"],
    "audio_file": "aloha.mp3",  # Add this line
    "tips": [...]
}
```

## Management Commands

### List all audio files
```bash
python scripts/manage_audio.py list
```

### Check missing priority words
```bash
python scripts/manage_audio.py check
```

## Priority Words for Recording

These common words should be prioritized for native speaker recordings:

### Basic Greetings
- aloha (hello/goodbye/love)
- mahalo (thank you)
- e komo mai (welcome)
- a hui hou (until we meet again)

### Common Words
- keiki (child)
- wahine (woman)
- kāne (man)
- ʻohana (family)
- kokua (help)
- kai (ocean)
- mauka (toward mountain)
- makai (toward ocean)

### Cultural Terms
- hula (dance)
- lei (garland)
- lūʻau (feast)
- poi (pounded taro)
- poke (cut fish)

## How It Works

1. **Frontend Request**: When a word needs pronunciation, the component calls:
   ```
   GET /api/v1/pronunciation/word/{word}
   ```

2. **Backend Check**: The API checks if an audio file exists for the word

3. **Response**: If found, returns `audio_url` in the response:
   ```json
   {
     "word": "aloha",
     "audio_url": "/api/v1/pronunciation/audio/aloha.mp3",
     "phonetic": "ah-LOH-hah",
     ...
   }
   ```

4. **Playback**: The frontend component:
   - Shows a different colored speaker icon (🎵 teal) for native audio
   - Plays the native audio file when clicked
   - Falls back to speech synthesis if playback fails

## Visual Indicators

- **🎵 Teal speaker icon**: Native Hawaiian speaker audio available
- **🔊 Blue speaker icon**: Using speech synthesis (approximated)
- **Tooltip**: Shows "Native speaker audio" when hovering

## Future Enhancements

1. **Batch Upload**: Script to process multiple audio files at once
2. **Audio Validation**: Automatic quality checks
3. **Caching**: CDN integration for faster audio delivery
4. **Variants**: Multiple recordings for different contexts
5. **Sentences**: Support for phrase recordings

## Testing Audio Integration

1. Add a test audio file:
   ```bash
   # Create a test file (or use a real recording)
   echo "test" > test_aloha.mp3  # Replace with real audio
   python scripts/manage_audio.py add "aloha" test_aloha.mp3
   ```

2. Update the pronunciation data in the backend

3. Test in the app - the speaker icon should appear in teal color

## Contact

For questions about audio recording standards or to contribute native speaker recordings, please contact the project maintainers.