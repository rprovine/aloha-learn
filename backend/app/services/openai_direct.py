"""
Direct HTTP implementation for OpenAI API to avoid SDK connection issues on Render
"""
import httpx
import json
import logging
from typing import Dict, List
from app.core.config import settings

logger = logging.getLogger(__name__)

class DirectOpenAIClient:
    """Direct HTTP client for OpenAI API that works reliably on Render"""
    
    def __init__(self, api_key: str):
        # Strip any whitespace/newlines from the API key
        self.api_key = api_key.strip()
        self.base_url = "https://api.openai.com/v1"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    async def chat_completion(self, messages: List[Dict], model: str = "gpt-4o-mini", 
                            temperature: float = 0.3, max_tokens: int = None,
                            response_format: Dict = None) -> Dict:
        """Make a chat completion request using direct HTTP"""
        
        payload = {
            "model": model,
            "messages": messages,
            "temperature": temperature
        }
        
        if max_tokens:
            payload["max_tokens"] = max_tokens
        
        if response_format:
            payload["response_format"] = response_format
        
        # Use httpx with specific settings that work on Render
        async with httpx.AsyncClient(
            timeout=httpx.Timeout(30.0, connect=10.0),
            follow_redirects=True,
            http2=False,  # Disable HTTP/2 which can cause issues
            verify=True
        ) as client:
            try:
                logger.info("Making direct HTTP request to OpenAI API")
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers=self.headers,
                    json=payload
                )
                
                if response.status_code != 200:
                    logger.error(f"OpenAI API error: {response.status_code} - {response.text}")
                    raise Exception(f"OpenAI API error: {response.status_code}")
                
                return response.json()
                
            except httpx.ConnectTimeout:
                logger.error("Connection timeout to OpenAI API")
                raise Exception("Connection timeout to OpenAI API")
            except httpx.ReadTimeout:
                logger.error("Read timeout from OpenAI API")
                raise Exception("Read timeout from OpenAI API")
            except Exception as e:
                logger.error(f"Direct OpenAI API error: {type(e).__name__}: {str(e)}")
                raise


# Helper function to create client
def get_direct_client():
    return DirectOpenAIClient(settings.OPENAI_API_KEY)