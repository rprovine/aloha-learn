# 🌺 Aloha Learn - Hawaiian Language Preservation Platform

A comprehensive Hawaiian language preservation platform that combines AI-powered translation, native-level language learning, and cultural context to help revitalize ʻŌlelo Hawaiʻi.

## 🌟 Features

### 🗣️ Translation Tool
- **AI-Powered Translation**: Real-time Hawaiian ↔ English translation using OpenAI
- **Cultural Context**: Each translation includes cultural significance and usage notes
- **Word Breakdown**: Detailed morphological analysis of Hawaiian words
- **Alternative Translations**: Multiple translation options for nuanced meanings

### 📚 Learning Platform
- **30-Lesson Curriculum**: Comprehensive journey from beginner to fluent speaker
  - 🌱 **Beginner** (Lessons 1-10): Alphabet, greetings, numbers, colors, family
  - 🌿 **Intermediate** (Lessons 11-20): Daily life, nature, emotions, grammar
  - 🌳 **Advanced** (Lessons 21-30): Proverbs, mythology, formal language, literature
- **Interactive Lessons**: Vocabulary, grammar, cultural notes, and practice exercises
- **Progress Tracking**: Visual progress bars and achievement system

### 🎵 Pronunciation System
- **Native Audio Support**: Infrastructure ready for native Hawaiian speaker recordings
- **Smart Fallback**: Uses Web Speech API with Hawaiian-optimized settings
- **Visual Feedback**: Different indicators for native audio vs. synthesized speech
- **Pronunciation Guide**: IPA transcription and syllable breakdown

### 🎨 Cultural Integration
- **ʻŌlelo Noʻeau**: Traditional Hawaiian proverbs and their meanings
- **Moʻolelo**: Stories and legends integrated into lessons
- **Cultural Notes**: Context and significance for words and phrases
- **Place Names**: Understanding the meaning behind Hawaiian locations

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for Hawaiian-themed styling
- **Framer Motion** for animations
- **React Router** for navigation

### Backend
- **FastAPI** (Python) for high-performance API
- **SQLAlchemy** ORM with PostgreSQL
- **JWT Authentication** for secure user sessions
- **OpenAI Integration** for translation services
- **Pydantic** for data validation

### Infrastructure
- **Docker** containers for easy deployment
- **PostgreSQL** for data persistence
- **Static file serving** for audio content
- **CORS-enabled** API for secure cross-origin requests

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- PostgreSQL 14+ (or Docker)
- OpenAI API key

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aloha-learn.git
   cd aloha-learn
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   # Edit both .env files with your credentials
   ```

3. **Start with Docker (Recommended)**
   ```bash
   docker-compose up
   ```

   Or manually:

4. **Backend setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload --port 8000
   ```

5. **Frontend setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - API docs: http://localhost:8000/docs

## 📁 Project Structure

```
aloha-learn/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Route pages
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   └── data/          # Curriculum content
│   └── public/            # Static assets
│
├── backend/                 # FastAPI server
│   ├── app/
│   │   ├── api/           # API endpoints
│   │   ├── models/        # Database models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── services/      # Business logic
│   │   └── core/          # Core configuration
│   ├── static/            # Audio files
│   └── scripts/           # Management scripts
│
├── database/               # Database files
├── docker-compose.yml     # Docker orchestration
└── docs/                  # Documentation
```

## 🎤 Native Audio Integration

The platform is fully prepared to accept native Hawaiian speaker audio recordings:

```bash
# Add audio files when available
cd backend
python scripts/manage_audio.py add "aloha" /path/to/aloha.mp3

# Check missing priority words
python scripts/manage_audio.py check
```

See [AUDIO_GUIDE.md](backend/AUDIO_GUIDE.md) for detailed instructions.

## 🌊 Cultural Respect

This platform is built with deep respect for Hawaiian culture and language. We:
- Present content with cultural authenticity
- Include proper diacritical marks (kahakō and ʻokina)
- Provide cultural context for appropriate usage
- Acknowledge the sacred nature of ʻŌlelo Hawaiʻi

## 🤝 Contributing

We welcome contributions that help preserve and teach Hawaiian language! Please:
1. Fork the repository
2. Create a feature branch
3. Ensure cultural accuracy
4. Submit a pull request

Priority areas:
- Native speaker audio recordings
- Additional lesson content
- UI/UX improvements
- Bug fixes

## 📜 License

This project is open source under the MIT License. See [LICENSE](LICENSE) for details.

## 🙏 Mahalo

Mahalo nui loa for your interest in preserving Hawaiian language and culture. E ola mau ka ʻōlelo Hawaiʻi! (May the Hawaiian language live on forever!)

---

Built with aloha by [Your Name] | [Report Issues](https://github.com/yourusername/aloha-learn/issues)