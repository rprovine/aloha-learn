from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    preferred_language: Optional[str] = "en"
    learning_level: Optional[str] = "beginner"
    daily_goal_minutes: Optional[int] = 15


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    preferred_language: Optional[str] = None
    learning_level: Optional[str] = None
    daily_goal_minutes: Optional[int] = None


class UserInDB(UserBase):
    id: int
    is_active: bool
    is_superuser: bool
    total_points: int
    current_streak: int
    longest_streak: int
    lessons_completed: int
    created_at: datetime
    last_login: Optional[datetime]

    class Config:
        from_attributes = True


class User(UserInDB):
    pass


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    username: Optional[str] = None