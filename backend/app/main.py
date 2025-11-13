from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import auth, translation, pronunciation
from app.db.base import engine, Base, wait_for_db
import logging

logger = logging.getLogger(__name__)

# Wait for database to be available and create tables
try:
    logger.info("Waiting for database connection...")
    wait_for_db(max_retries=10, delay=3)
    logger.info("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created successfully")
except Exception as e:
    logger.error(f"Failed to initialize database: {e}")
    # Don't fail the application startup, let it try to connect later
    logger.warning("Application starting without database initialization")

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

# Debug router (only in development)
if settings.DEBUG:
    from app.api.v1 import debug, simple_test
    app.include_router(debug.router, prefix="/api/v1/debug", tags=["debug"])
    app.include_router(simple_test.router, prefix="/api/v1/test", tags=["test"])

@app.get("/")
def read_root():
    return {
        "message": "Aloha! Welcome to the Aloha Learn API",
        "version": settings.APP_VERSION,
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    import os
    from app.db.base import engine, database_url
    from sqlalchemy import text

    health_status = {"status": "healthy"}

    # Show masked database URL for debugging
    if database_url:
        # Mask password in URL
        import re
        masked_url = re.sub(r'://([^:]+):([^@]+)@', r'://\1:****@', database_url)
        health_status["database_url"] = masked_url
    else:
        health_status["database_url"] = "not configured"

    # Check database connection
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        health_status["database"] = "connected"
    except Exception as e:
        health_status["database"] = f"error: {str(e)[:100]}"
        health_status["status"] = "unhealthy"

    # Check OpenAI API key
    api_key = os.getenv("OPENAI_API_KEY", "")
    if api_key:
        health_status["openai_key"] = f"configured ({len(api_key)} chars)"
    else:
        health_status["openai_key"] = "not configured"
        health_status["status"] = "degraded"

    return health_status

@app.get("/test-network")
async def test_network():
    """Public network test endpoint"""
    import httpx
    import openai
    import asyncio
    import os
    
    results = {"tests": []}
    
    # Test 1: Basic external connectivity
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get("https://httpbin.org/get")
            results["tests"].append({
                "name": "httpbin",
                "success": True,
                "status": response.status_code
            })
    except Exception as e:
        results["tests"].append({
            "name": "httpbin",
            "success": False,
            "error": str(e)[:100]
        })
    
    # Test 2: OpenAI connectivity (no auth)
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get("https://api.openai.com/v1/models")
            results["tests"].append({
                "name": "openai_connectivity",
                "success": True,
                "status": response.status_code
            })
    except Exception as e:
        results["tests"].append({
            "name": "openai_connectivity",
            "success": False,
            "error": str(e)[:100]
        })
    
    # Test 3: OpenAI API with timeout
    try:
        client = openai.OpenAI(
            api_key=settings.OPENAI_API_KEY,
            timeout=5.0,
            max_retries=0
        )
        
        async def test_call():
            return await asyncio.to_thread(
                lambda: client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[{"role": "user", "content": "Hi"}],
                    max_tokens=5
                )
            )
        
        response = await asyncio.wait_for(test_call(), timeout=5.0)
        results["tests"].append({
            "name": "openai_api",
            "success": True,
            "response": response.choices[0].message.content
        })
    except asyncio.TimeoutError:
        results["tests"].append({
            "name": "openai_api",
            "success": False,
            "error": "Timeout after 5 seconds"
        })
    except Exception as e:
        results["tests"].append({
            "name": "openai_api",
            "success": False,
            "error": f"{type(e).__name__}: {str(e)[:100]}"
        })
    
    results["environment"] = {
        "is_render": bool(os.getenv("RENDER")),
        "region": os.getenv("RENDER_REGION", "unknown"),
        "python_version": os.sys.version.split()[0]
    }
    
    return results

@app.get("/test-direct")
async def test_direct_client():
    """Test the direct HTTP client"""
    try:
        from app.services.openai_direct import get_direct_client
        client = get_direct_client()
        
        response = await client.chat_completion(
            messages=[{"role": "user", "content": "Say test"}],
            max_tokens=10
        )
        
        return {
            "success": True,
            "response": response['choices'][0]['message']['content']
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "error_type": type(e).__name__
        }