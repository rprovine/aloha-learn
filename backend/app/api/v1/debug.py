from fastapi import APIRouter
import openai
import httpx
import socket
import ssl
import os
from app.core.config import settings

router = APIRouter()

@router.get("/test-openai")
async def test_openai_connection():
    """Test OpenAI API connectivity with detailed diagnostics"""
    results = {
        "environment": os.getenv("RENDER", "local"),
        "checks": {}
    }
    
    # 1. Test DNS resolution
    try:
        ip = socket.gethostbyname("api.openai.com")
        results["checks"]["dns_resolution"] = {
            "success": True,
            "ip": ip
        }
    except Exception as e:
        results["checks"]["dns_resolution"] = {
            "success": False,
            "error": str(e)
        }
    
    # 2. Test HTTPS connection
    try:
        with httpx.Client() as client:
            response = client.get("https://api.openai.com", timeout=10)
            results["checks"]["https_connection"] = {
                "success": True,
                "status_code": response.status_code
            }
    except Exception as e:
        results["checks"]["https_connection"] = {
            "success": False,
            "error": str(e),
            "error_type": type(e).__name__
        }
    
    # 3. Test OpenAI client initialization
    try:
        client = openai.OpenAI(api_key=settings.OPENAI_API_KEY, timeout=30)
        results["checks"]["client_init"] = {"success": True}
    except Exception as e:
        results["checks"]["client_init"] = {
            "success": False,
            "error": str(e)
        }
        return results
    
    # 4. Test simple API call
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Say 'test'"}],
            max_tokens=10
        )
        results["checks"]["api_call"] = {
            "success": True,
            "response": response.choices[0].message.content
        }
    except openai.APIConnectionError as e:
        results["checks"]["api_call"] = {
            "success": False,
            "error": str(e),
            "error_type": "APIConnectionError",
            "cause": str(e.__cause__) if e.__cause__ else None
        }
    except Exception as e:
        results["checks"]["api_call"] = {
            "success": False,
            "error": str(e),
            "error_type": type(e).__name__
        }
    
    # 5. Check SSL certificates
    try:
        context = ssl.create_default_context()
        with socket.create_connection(("api.openai.com", 443)) as sock:
            with context.wrap_socket(sock, server_hostname="api.openai.com") as ssock:
                results["checks"]["ssl"] = {
                    "success": True,
                    "protocol": ssock.version()
                }
    except Exception as e:
        results["checks"]["ssl"] = {
            "success": False,
            "error": str(e)
        }
    
    return results