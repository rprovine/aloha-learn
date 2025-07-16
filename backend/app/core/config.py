from typing import List, Optional
try:
    from pydantic_settings import BaseSettings
except ImportError:
    from pydantic import BaseSettings
from pydantic import AnyHttpUrl
import os


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Aloha Learn"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("ENVIRONMENT", "development") == "development"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./aloha_learn.db")
    DATABASE_ECHO: bool = False
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Convert postgres:// to postgresql:// for SQLAlchemy compatibility
        if self.DATABASE_URL and self.DATABASE_URL.startswith("postgres://"):
            self.DATABASE_URL = self.DATABASE_URL.replace("postgres://", "postgresql://", 1)
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # OpenAI
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    # Redis
    REDIS_URL: Optional[str] = None
    
    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:5173"
    
    # Email
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: Optional[int] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()