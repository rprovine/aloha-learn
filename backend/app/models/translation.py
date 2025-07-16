from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base import Base


class Translation(Base):
    __tablename__ = "translations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Null for anonymous users
    
    # Translation data
    source_text = Column(Text, nullable=False)
    translated_text = Column(Text, nullable=False)
    source_language = Column(String, nullable=False)  # 'en' or 'haw'
    target_language = Column(String, nullable=False)  # 'haw' or 'en'
    
    # Cultural context
    cultural_context = Column(Text)
    word_meanings = Column(JSON)  # Individual word translations and meanings
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_favorite = Column(Boolean, default=False)
    
    # Relations
    user = relationship("User", backref="translations")


class Dictionary(Base):
    __tablename__ = "dictionary"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Word data
    hawaiian_word = Column(String, nullable=False, index=True)
    english_translation = Column(String, nullable=False)
    
    # Linguistic info
    part_of_speech = Column(String)  # noun, verb, adjective, etc.
    pronunciation_ipa = Column(String)  # IPA notation
    audio_url = Column(String)
    
    # Definitions and examples
    definitions = Column(JSON)  # List of definitions with contexts
    example_sentences = Column(JSON)  # Hawaiian sentences with English translations
    
    # Cultural significance
    cultural_notes = Column(Text)
    etymology = Column(Text)
    related_words = Column(JSON)  # List of related Hawaiian words
    
    # Categories
    categories = Column(JSON)  # ['nature', 'family', 'food', etc.]
    difficulty_level = Column(String)  # beginner, intermediate, advanced
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())