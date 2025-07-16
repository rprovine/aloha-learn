#!/usr/bin/env python3
"""
Audio File Management Script for Native Hawaiian Speaker Recordings

Usage:
    python manage_audio.py add <word> <audio_file>
    python manage_audio.py list
    python manage_audio.py check
"""

import os
import sys
import json
import shutil
from pathlib import Path
from typing import Dict, List

# Audio directory configuration
AUDIO_DIR = Path(__file__).parent.parent / "static" / "audio" / "hawaiian"
METADATA_FILE = AUDIO_DIR / "metadata.json"

# Supported audio formats
SUPPORTED_FORMATS = {'.mp3', '.wav', '.ogg', '.m4a'}

def ensure_directories():
    """Ensure audio directories exist"""
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)

def load_metadata() -> Dict:
    """Load audio metadata"""
    if METADATA_FILE.exists():
        with open(METADATA_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_metadata(metadata: Dict):
    """Save audio metadata"""
    with open(METADATA_FILE, 'w') as f:
        json.dump(metadata, f, indent=2)

def add_audio(word: str, audio_file: Path):
    """Add a new audio file for a Hawaiian word"""
    ensure_directories()
    
    # Validate file
    if not audio_file.exists():
        print(f"Error: Audio file '{audio_file}' not found")
        return False
    
    # Check format
    suffix = audio_file.suffix.lower()
    if suffix not in SUPPORTED_FORMATS:
        print(f"Error: Unsupported format '{suffix}'. Supported: {SUPPORTED_FORMATS}")
        return False
    
    # Normalize word
    word_normalized = word.lower().strip()
    
    # Copy file with standardized name
    target_filename = f"{word_normalized}{suffix}"
    target_path = AUDIO_DIR / target_filename
    
    try:
        shutil.copy2(audio_file, target_path)
        print(f"✓ Added audio for '{word}' -> {target_filename}")
        
        # Update metadata
        metadata = load_metadata()
        metadata[word_normalized] = {
            "filename": target_filename,
            "original_file": str(audio_file),
            "word": word,
            "format": suffix[1:],  # Remove dot
            "size_kb": round(target_path.stat().st_size / 1024, 2)
        }
        save_metadata(metadata)
        
        # Update pronunciation.py data
        update_pronunciation_data(word_normalized, target_filename)
        
        return True
    except Exception as e:
        print(f"Error copying file: {e}")
        return False

def update_pronunciation_data(word: str, filename: str):
    """Update the pronunciation.py file with new audio reference"""
    pronunciation_file = Path(__file__).parent.parent / "app" / "api" / "v1" / "pronunciation.py"
    
    print(f"Note: Remember to update PRONUNCIATION_DATA in pronunciation.py:")
    print(f'    "{word}": {{')
    print(f'        "audio_file": "{filename}",')
    print(f'        # ... other pronunciation data')
    print(f'    }}')

def list_audio():
    """List all available audio files"""
    ensure_directories()
    metadata = load_metadata()
    
    if not metadata:
        print("No audio files found.")
        return
    
    print(f"\n{'Word':<15} {'Filename':<25} {'Format':<8} {'Size (KB)':<10}")
    print("-" * 60)
    
    for word, info in sorted(metadata.items()):
        print(f"{info['word']:<15} {info['filename']:<25} {info['format']:<8} {info['size_kb']:<10}")
    
    print(f"\nTotal: {len(metadata)} audio files")

def check_audio():
    """Check audio files and report missing words"""
    ensure_directories()
    
    # Common Hawaiian words that should have audio
    priority_words = [
        "aloha", "mahalo", "ohana", "keiki", "wahine", "kane",
        "mauka", "makai", "wiki", "hawaii", "kokua", "hula",
        "lei", "luau", "poi", "poke", "lanai", "kai", "mana"
    ]
    
    metadata = load_metadata()
    existing_words = set(metadata.keys())
    
    print("Audio Coverage Report")
    print("=" * 40)
    
    # Check priority words
    print("\nPriority Words Status:")
    missing_priority = []
    for word in priority_words:
        if word in existing_words:
            print(f"  ✓ {word}")
        else:
            print(f"  ✗ {word} (missing)")
            missing_priority.append(word)
    
    # Check filesystem vs metadata
    print("\nFilesystem Check:")
    audio_files = list(AUDIO_DIR.glob("*.*"))
    audio_files = [f for f in audio_files if f.suffix.lower() in SUPPORTED_FORMATS]
    
    print(f"  Files in directory: {len(audio_files)}")
    print(f"  Files in metadata: {len(metadata)}")
    
    # Report missing priority words
    if missing_priority:
        print(f"\n⚠️  Missing {len(missing_priority)} priority words:")
        print(f"   {', '.join(missing_priority)}")
    
    return len(missing_priority) == 0

def main():
    """Main CLI handler"""
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "add":
        if len(sys.argv) != 4:
            print("Usage: python manage_audio.py add <word> <audio_file>")
            sys.exit(1)
        word = sys.argv[2]
        audio_file = Path(sys.argv[3])
        success = add_audio(word, audio_file)
        sys.exit(0 if success else 1)
    
    elif command == "list":
        list_audio()
    
    elif command == "check":
        check_audio()
    
    else:
        print(f"Unknown command: {command}")
        print(__doc__)
        sys.exit(1)

if __name__ == "__main__":
    main()