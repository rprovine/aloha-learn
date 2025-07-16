from sqlalchemy import Column, Integer, String, Text, Boolean, JSON, Float, Enum, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.db.base import Base
import enum
import uuid


class LessonLevel(str, enum.Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"


class LessonType(str, enum.Enum):
    VOCABULARY = "vocabulary"
    GRAMMAR = "grammar"
    PRONUNCIATION = "pronunciation"
    CONVERSATION = "conversation"
    CULTURE = "culture"


class Lesson(Base):
    __tablename__ = "lessons"
    
    id = Column(Integer, primary_key=True, index=True)
    uuid = Column(String, default=lambda: str(uuid.uuid4()), unique=True, index=True)
    
    # Basic info
    title = Column(String, nullable=False)
    title_hawaiian = Column(String)
    description = Column(Text)
    level = Column(Enum(LessonLevel), nullable=False)
    lesson_type = Column(Enum(LessonType), nullable=False)
    order_index = Column(Integer, nullable=False)  # Order within the course
    
    # Content
    content = Column(JSON, nullable=False)  # Structured lesson content
    vocabulary = Column(JSON)  # List of vocabulary items
    phrases = Column(JSON)  # Common phrases
    grammar_points = Column(JSON)  # Grammar explanations
    
    # Cultural context
    cultural_notes = Column(Text)
    moelelo = Column(Text)  # Hawaiian story
    
    # Media
    audio_urls = Column(JSON, default=[])
    image_urls = Column(JSON, default=[])
    
    # Requirements
    prerequisites = Column(JSON, default=[])  # List of lesson IDs
    estimated_minutes = Column(Integer, default=15)
    points_value = Column(Integer, default=100)
    
    # Metadata
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class LessonContent(Base):
    __tablename__ = "lesson_contents"
    
    id = Column(Integer, primary_key=True, index=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)
    
    # Content sections
    content_type = Column(String, nullable=False)  # intro, vocabulary, practice, quiz, etc.
    order_index = Column(Integer, nullable=False)
    
    # Content data
    title = Column(String)
    content = Column(JSON, nullable=False)  # Flexible content structure
    
    # Interactive elements
    exercises = Column(JSON)  # Practice exercises
    quiz_questions = Column(JSON)  # Quiz data
    
    # Media
    audio_url = Column(String)
    image_url = Column(String)