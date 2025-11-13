from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import os
import time
import logging

logger = logging.getLogger(__name__)

# Get database URL and fix postgres:// to postgresql://
database_url = os.getenv("DATABASE_URL", settings.DATABASE_URL or "sqlite:///./aloha_learn.db")
if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

# Create engine with connection pooling settings
engine = create_engine(
    database_url,
    echo=settings.DATABASE_ECHO,
    pool_pre_ping=True,
    pool_recycle=300,  # Recycle connections after 5 minutes
    pool_size=5,
    max_overflow=10,
    connect_args={
        "connect_timeout": 10,
        "keepalives": 1,
        "keepalives_idle": 30,
        "keepalives_interval": 10,
        "keepalives_count": 5,
    } if "postgresql" in database_url else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def wait_for_db(max_retries=5, delay=2):
    """Wait for database to be available with retries"""
    from sqlalchemy import text

    for attempt in range(max_retries):
        try:
            # Try to connect
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
                logger.info(f"Database connection successful on attempt {attempt + 1}")
                return True
        except Exception as e:
            if attempt < max_retries - 1:
                logger.warning(f"Database connection attempt {attempt + 1} failed: {e}. Retrying in {delay}s...")
                time.sleep(delay)
            else:
                logger.error(f"Database connection failed after {max_retries} attempts: {e}")
                raise
    return False


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()