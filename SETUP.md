# Aloha Learn Setup Guide

## Quick Start

1. **Clone the repository and navigate to the project**
   ```bash
   cd aloha-learn
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your-actual-openai-api-key
   ```

3. **Start the application**
   ```bash
   ./start.sh
   ```
   Or manually with Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Development Setup (Without Docker)

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set up database
createdb aloha_learn

# Run migrations
alembic upgrade head

# Start backend
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Database Setup

1. **Create initial admin user** (optional)
   ```python
   # In Python shell with backend virtualenv activated
   from app.db.base import SessionLocal
   from app.models.user import User
   from app.core.security import get_password_hash
   
   db = SessionLocal()
   admin = User(
       email="admin@example.com",
       username="admin",
       hashed_password=get_password_hash("admin123"),
       is_superuser=True
   )
   db.add(admin)
   db.commit()
   ```

2. **Seed database with sample lessons** (optional)
   ```bash
   cd backend
   python scripts/seed_lessons.py
   ```

## Configuration

### Required Environment Variables
- `OPENAI_API_KEY`: Your OpenAI API key for translation features
- `SECRET_KEY`: JWT secret key (auto-generated if not provided)
- `DATABASE_URL`: PostgreSQL connection string

### Optional Configuration
- `REDIS_URL`: Redis connection for caching
- `SMTP_*`: Email configuration for notifications

## Troubleshooting

### Port Already in Use
If you get port conflicts:
```bash
# Check what's using the ports
lsof -i :3000
lsof -i :8000
lsof -i :5432

# Stop conflicting services or change ports in docker-compose.yml
```

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose ps db

# View database logs
docker-compose logs db
```

### Frontend Build Issues
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

### Using Docker
1. Update `.env` with production values
2. Build production images:
   ```bash
   docker-compose -f docker-compose.prod.yml build
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Manual Deployment
1. Backend: Deploy to any Python hosting (Heroku, AWS, etc.)
2. Frontend: Build and deploy to static hosting:
   ```bash
   cd frontend
   npm run build
   # Deploy dist/ folder to Netlify, Vercel, etc.
   ```

## API Documentation

Once running, visit http://localhost:8000/docs for interactive API documentation.

## Support

For issues or questions, please check the logs:
```bash
docker-compose logs -f
```

Mahalo for using Aloha Learn! 🌺