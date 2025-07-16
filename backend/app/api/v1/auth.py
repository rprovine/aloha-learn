from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.core.security import verify_password, get_password_hash, create_access_token
from app.schemas.user import User, UserCreate, Token
from app.models.user import User as UserModel
from app.api.deps import get_current_user
from pydantic import BaseModel
try:
    from pydantic import EmailStr
except ImportError:
    # Fallback for older pydantic
    EmailStr = str
import secrets
import logging
import os

logger = logging.getLogger(__name__)

router = APIRouter()

# In-memory storage for reset tokens (in production, use Redis or database)
reset_tokens = {}

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


@router.post("/register", response_model=User)
def register(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    # Check if user exists
    db_user = db.query(UserModel).filter(
        (UserModel.email == user_data.email) | 
        (UserModel.username == user_data.username)
    ).first()
    
    if db_user:
        if db_user.email == user_data.email:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )
        else:
            raise HTTPException(
                status_code=400,
                detail="Username already taken"
            )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    db_user = UserModel(
        email=user_data.email,
        username=user_data.username,
        full_name=user_data.full_name,
        hashed_password=hashed_password,
        preferred_language=user_data.preferred_language,
        learning_level=user_data.learning_level,
        daily_goal_minutes=user_data.daily_goal_minutes
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user


@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Find user by username or email
    user = db.query(UserModel).filter(
        (UserModel.username == form_data.username) | 
        (UserModel.email == form_data.username)
    ).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Update last login
    user.last_login = datetime.utcnow()
    db.commit()
    
    # Create access token
    access_token = create_access_token(
        data={"sub": user.username}
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=User)
def read_users_me(current_user: UserModel = Depends(get_current_user)):
    return current_user


@router.post("/logout")
def logout(current_user: UserModel = Depends(get_current_user)):
    # In a real application, you might want to invalidate the token
    # For now, we'll just return a success message
    return {"message": "Successfully logged out"}


@router.post("/forgot-password")
def forgot_password(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):
    # Find user by email
    user = db.query(UserModel).filter(UserModel.email == request.email).first()
    
    # Always return success to prevent email enumeration
    if user:
        # Generate reset token
        token = secrets.token_urlsafe(32)
        reset_tokens[token] = {
            "user_id": user.id,
            "email": user.email,
            "expires": datetime.utcnow() + timedelta(hours=1)
        }
        
        # Create reset link
        frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
        reset_link = f"{frontend_url}/reset-password?token={token}"
        
        # For development/demo, return the link directly
        # In production with email service, send via email instead
        logger.info(f"Password reset link for {user.email}: {reset_link}")
        
        # Return link in response for demo purposes
        return {
            "message": "Password reset link generated",
            "reset_link": reset_link,  # Remove this in production with email
            "expires_in": "1 hour"
        }
        
    return {"message": "If an account with that email exists, we've sent password reset instructions."}


@router.post("/reset-password")
def reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    # Validate token
    token_data = reset_tokens.get(request.token)
    
    if not token_data or datetime.utcnow() > token_data["expires"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Find user and update password
    user = db.query(UserModel).filter(UserModel.id == token_data["user_id"]).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update password
    user.hashed_password = get_password_hash(request.new_password)
    db.commit()
    
    # Remove used token
    del reset_tokens[request.token]
    
    return {"message": "Password reset successfully"}