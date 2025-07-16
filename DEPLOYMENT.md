# Deployment Guide for Aloha Learn

## Deploying to Render

Render can host both your frontend and backend together with a PostgreSQL database.

### Prerequisites
1. A Render account (free tier works)
2. Your OpenAI API key
3. This repository pushed to GitHub

### Deployment Steps

1. **Connect GitHub to Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Blueprint"
   - Connect your GitHub account
   - Select the `aloha-learn` repository

2. **Deploy with render.yaml**
   - Render will automatically detect the `render.yaml` file
   - Review the services:
     - Backend API service
     - Frontend static site
     - PostgreSQL database
   - Click "Apply"

3. **Set Environment Variables**
   - Go to the backend service settings
   - Add your `OPENAI_API_KEY`
   - The database URL and secret key are auto-generated

4. **Wait for Deployment**
   - Backend will build and start (5-10 minutes)
   - Frontend will build and deploy
   - Database will be provisioned

5. **Access Your App**
   - Frontend URL: `https://aloha-learn-frontend.onrender.com`
   - Backend URL: `https://aloha-learn-backend.onrender.com`

### Important Notes

1. **Free Tier Limitations**
   - Services sleep after 15 minutes of inactivity
   - First request after sleep takes ~30 seconds
   - Limited to 750 hours/month

2. **Database**
   - Free PostgreSQL has 1GB storage limit
   - Data persists between deployments

3. **Static Files**
   - Audio files in `/backend/static` are included
   - Add native audio files before deploying

4. **Password Reset**
   - In production, email won't work without SMTP setup
   - Reset tokens are stored in memory (lost on restart)
   - Consider using Redis for production

### Troubleshooting

1. **CORS Errors**
   - The frontend URL is automatically added to CORS
   - Check browser console for specific errors

2. **Database Connection**
   - Render provides DATABASE_URL automatically
   - The app converts postgres:// to postgresql://

3. **Build Failures**
   - Check build logs in Render dashboard
   - Ensure all dependencies are in requirements.txt

### Upgrading to Production

For a production deployment, consider:

1. **Paid Render Plan** - No sleep, better performance
2. **Email Service** - SendGrid/Mailgun for password resets
3. **Redis** - For session/token storage
4. **CDN** - For static assets and audio files
5. **Monitoring** - Error tracking with Sentry
6. **Backup** - Regular database backups

### Alternative: Local Development

To keep using the local setup:
```bash
# Backend
cd backend
uvicorn app.main:app --reload

# Frontend
cd frontend
npm run dev
```

## Environment Variables Reference

### Backend (.env)
```
DATABASE_URL=sqlite:///./aloha_learn.db  # or PostgreSQL URL
SECRET_KEY=your-secret-key
OPENAI_API_KEY=sk-...
ENVIRONMENT=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api/v1
```

For Render deployment, these are set automatically or in the dashboard.