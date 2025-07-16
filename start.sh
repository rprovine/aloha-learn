#!/bin/bash

echo "🌺 Starting Aloha Learn - Hawaiian Language Preservation Platform 🌺"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your API keys."
    echo ""
fi

# Check if OpenAI API key is set
if grep -q "your-openai-api-key-here" .env; then
    echo "⚠️  WARNING: OpenAI API key not configured in .env file!"
    echo "Translation features will not work without it."
    echo ""
fi

# Start Docker Compose
echo "🚀 Starting Docker containers..."
docker-compose up -d

echo ""
echo "✅ Aloha Learn is starting up!"
echo ""
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:8000"
echo "📚 API Documentation: http://localhost:8000/docs"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop: docker-compose down"
echo ""
echo "Mahalo! 🤙"