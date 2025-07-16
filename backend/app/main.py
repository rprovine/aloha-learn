from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import auth, translation, pronunciation
from app.db.base import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Hawaiian Language Preservation Platform API"
)

# Configure CORS
origins = settings.ALLOWED_ORIGINS.split(",")
# Add additional allowed origins
origins.extend([
    "http://localhost:8080",  # For testing
    "file://",  # For local file testing
])
# Add Render URLs in production
if settings.DEBUG is False:
    origins.extend([
        "https://aloha-learn-frontend.onrender.com",
        "https://*.onrender.com"
    ])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for debugging
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["authentication"])
app.include_router(translation.router, prefix="/api/v1/translation", tags=["translation"])
app.include_router(pronunciation.router, prefix="/api/v1/pronunciation", tags=["pronunciation"])

@app.get("/")
def read_root():
    return {
        "message": "Aloha! Welcome to the Aloha Learn API",
        "version": settings.APP_VERSION,
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}