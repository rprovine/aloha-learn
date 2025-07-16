# Aloha Learn - Hawaiian Language Preservation Platform

A comprehensive Hawaiian language preservation platform that combines AI-powered translation, native-level language learning, and cultural context.

## Features

- **AI-Powered Translation**: Real-time Hawaiian ↔ English translation with cultural context
- **Interactive Learning Platform**: Structured courses from beginner to advanced
- **Pronunciation Practice**: Speech recognition for authentic pronunciation
- **Cultural Integration**: Stories (mo'olelo) and cultural significance with each lesson
- **Progress Tracking**: Comprehensive dashboard with achievements and analytics
- **Community Features**: Connect with other learners

## Tech Stack

- **Frontend**: React.js with TypeScript, Tailwind CSS
- **Backend**: FastAPI (Python) with PostgreSQL
- **AI Integration**: OpenAI API for translations
- **Authentication**: JWT-based secure authentication
- **Audio**: Web Speech API for pronunciation
- **Deployment**: Docker containers

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3.9+
- PostgreSQL 14+
- Docker & Docker Compose

### Environment Setup

1. Clone the repository
2. Copy `.env.example` to `.env` in both frontend and backend directories
3. Add your OpenAI API key and database credentials

### Installation

```bash
# Install backend dependencies
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Install frontend dependencies
cd ../frontend
npm install

# Set up database
cd ../database
docker-compose up -d
```

### Running the Application

```bash
# Start backend server
cd backend
uvicorn main:app --reload

# Start frontend development server
cd frontend
npm run dev
```

## Project Structure

```
aloha-learn/
├── frontend/           # React TypeScript application
├── backend/            # FastAPI Python server
├── database/           # PostgreSQL schemas and migrations
├── docker/             # Docker configuration files
└── docs/              # Additional documentation
```

## Cultural Respect

This platform is built with deep respect for Hawaiian culture and language. We acknowledge the importance of preserving 'Ōlelo Hawaiʻi and present all content with cultural authenticity and sensitivity.

## License

This project is proprietary software. All rights reserved.

## Mahalo

Mahalo nui loa for your interest in preserving Hawaiian language and culture.