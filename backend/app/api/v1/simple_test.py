from fastapi import APIRouter
import asyncio
import httpx
import os

router = APIRouter()

@router.get("/network-test")
async def network_test():
    """Simple network test that won't hang"""
    results = {"tests": []}
    
    # Test 1: Basic connectivity
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
    
    # Test 2: OpenAI without API key (just connectivity)
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get("https://api.openai.com/v1/models")
            results["tests"].append({
                "name": "openai_no_auth",
                "success": True,
                "status": response.status_code
            })
    except Exception as e:
        results["tests"].append({
            "name": "openai_no_auth", 
            "success": False,
            "error": str(e)[:100]
        })
    
    # Test 3: Simple OpenAI API call with timeout
    try:
        import openai
        from app.core.config import settings
        
        # Create client with very short timeout
        client = openai.OpenAI(
            api_key=settings.OPENAI_API_KEY,
            timeout=5.0,
            max_retries=0
        )
        
        # Use asyncio timeout as backup
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
            "content": response.choices[0].message.content
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
            "error": str(e)[:100]
        })
    
    results["environment"] = {
        "render": os.getenv("RENDER", "false"),
        "region": os.getenv("RENDER_REGION", "unknown")
    }
    
    return results