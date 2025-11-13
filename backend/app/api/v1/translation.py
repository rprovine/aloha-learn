from typing import List, Optional
import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.translation import Translation
from app.schemas.translation import (
    TranslationRequest,
    TranslationResponse,
    TranslationHistory,
    WordOfTheDay
)
from app.services.translation import TranslationService
from app.services.mock_translation import MockTranslationService
from app.core.config import settings

router = APIRouter()


@router.post("/translate", response_model=TranslationResponse)
async def translate(
    request: TranslationRequest
):
    import logging
    logger = logging.getLogger(__name__)

    db = None
    try:
        # Try to get database session, but don't fail if it's not available
        try:
            from app.db.base import SessionLocal
            db = SessionLocal()
            logger.info("Database session created successfully")
        except Exception as db_error:
            logger.warning(f"Database not available: {str(db_error)[:100]}")
            # Continue without database - translation can work without it

        # Initialize translation service
        # Use mock service if OpenAI is having issues or for testing
        use_mock = os.getenv("USE_MOCK_TRANSLATION", "false").lower() == "true"

        logger.info(f"Translation request: {request.text[:50]}... (mock={use_mock})")

        if use_mock:
            from app.services.mock_translation import MockTranslationService
            service = MockTranslationService(db)
        else:
            service = TranslationService(db)

        # Perform translation
        result = await service.translate(
            text=request.text,
            source_lang=request.source_language,
            target_lang=request.target_language,
            include_cultural_context=request.include_cultural_context
        )
    except Exception as e:
        logger.error(f"Translation service initialization error: {type(e).__name__}: {str(e)}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail=f"Translation service error: {type(e).__name__}: {str(e)}"
        )
    finally:
        if db:
            try:
                db.close()
            except:
                pass
    
    # Check if translation failed
    if result.get('translation') == 'Translation temporarily unavailable':
        error_message = result.get('error', 'Translation service error')
        error_type = result.get('error_type', 'Unknown')
        raise HTTPException(
            status_code=503,
            detail=f"{error_message} (Error type: {error_type})"
        )
    
    # Save to history if user is authenticated
    if current_user:
        translation_record = Translation(
            user_id=current_user.id,
            source_text=request.text,
            translated_text=result.get('translation', ''),
            source_language=request.source_language,
            target_language=request.target_language,
            cultural_context=result.get('cultural_context'),
            word_meanings=result.get('word_breakdown', [])
        )
        db.add(translation_record)
        db.commit()
    
    return TranslationResponse(**result)


@router.get("/history", response_model=List[TranslationHistory])
def get_translation_history(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    translations = db.query(Translation).filter(
        Translation.user_id == current_user.id
    ).order_by(Translation.created_at.desc()).offset(skip).limit(limit).all()
    
    return translations


@router.post("/history/{translation_id}/favorite")
def toggle_favorite(
    translation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    translation = db.query(Translation).filter(
        Translation.id == translation_id,
        Translation.user_id == current_user.id
    ).first()
    
    if not translation:
        raise HTTPException(status_code=404, detail="Translation not found")
    
    translation.is_favorite = not translation.is_favorite
    db.commit()
    
    return {"is_favorite": translation.is_favorite}


@router.get("/word-of-the-day", response_model=WordOfTheDay)
async def get_word_of_the_day(db: Session = Depends(get_db)):
    service = TranslationService(db)
    word = await service.get_word_of_the_day()
    
    if not word:
        raise HTTPException(status_code=404, detail="No word available")
    
    return word


@router.delete("/history/{translation_id}")
def delete_translation(
    translation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    translation = db.query(Translation).filter(
        Translation.id == translation_id,
        Translation.user_id == current_user.id
    ).first()
    
    if not translation:
        raise HTTPException(status_code=404, detail="Translation not found")
    
    db.delete(translation)
    db.commit()
    
    return {"message": "Translation deleted successfully"}