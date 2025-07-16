from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, Float, JSON, UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base import Base


class UserProgress(Base):
    __tablename__ = "user_progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)
    
    # Progress tracking
    is_completed = Column(Boolean, default=False)
    completion_percentage = Column(Float, default=0.0)
    score = Column(Float)  # Quiz/exercise score
    time_spent_minutes = Column(Integer, default=0)
    
    # Attempts
    attempts = Column(Integer, default=0)
    best_score = Column(Float)
    
    # Dates
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))
    last_accessed = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relations
    user = relationship("User", backref="progress")
    lesson = relationship("Lesson", backref="user_progress")
    
    # Ensure one progress record per user-lesson combination
    __table_args__ = (UniqueConstraint('user_id', 'lesson_id'),)


class Achievement(Base):
    __tablename__ = "achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Achievement info
    name = Column(String, nullable=False, unique=True)
    name_hawaiian = Column(String)
    description = Column(Text)
    icon_name = Column(String)  # Icon identifier
    
    # Requirements
    requirement_type = Column(String)  # lessons_completed, streak_days, points_earned, etc.
    requirement_value = Column(Integer)  # Number needed to unlock
    requirement_details = Column(JSON)  # Additional requirements
    
    # Points and rewards
    points_value = Column(Integer, default=0)
    badge_tier = Column(String)  # bronze, silver, gold, platinum
    
    # Metadata
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class UserAchievement(Base):
    __tablename__ = "user_achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    achievement_id = Column(Integer, ForeignKey("achievements.id"), nullable=False)
    
    # Unlock info
    unlocked_at = Column(DateTime(timezone=True), server_default=func.now())
    progress_value = Column(Integer, default=0)  # Current progress towards achievement
    is_claimed = Column(Boolean, default=False)  # If user has claimed rewards
    
    # Relations
    user = relationship("User", backref="achievements")
    achievement = relationship("Achievement", backref="user_achievements")
    
    # Ensure one achievement per user
    __table_args__ = (UniqueConstraint('user_id', 'achievement_id'),)


class StudySession(Base):
    __tablename__ = "study_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Session data
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    ended_at = Column(DateTime(timezone=True))
    duration_minutes = Column(Integer)
    
    # Activities
    lessons_studied = Column(JSON, default=[])  # List of lesson IDs
    translations_made = Column(Integer, default=0)
    exercises_completed = Column(Integer, default=0)
    
    # Points earned
    points_earned = Column(Integer, default=0)
    
    # Relations
    user = relationship("User", backref="study_sessions")