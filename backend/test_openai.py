#!/usr/bin/env python3
import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the backend directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.core.config import settings
import openai

print(f"API Key exists: {bool(settings.OPENAI_API_KEY)}")
print(f"API Key length: {len(settings.OPENAI_API_KEY)}")
print(f"API Key starts with: {settings.OPENAI_API_KEY[:7] if settings.OPENAI_API_KEY else 'None'}")

try:
    client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
    
    # Test with a simple completion
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "Say 'test'"}],
        max_tokens=10
    )
    
    print("\nOpenAI API Test: SUCCESS")
    print(f"Response: {response.choices[0].message.content}")
    
except openai.AuthenticationError as e:
    print(f"\nAuthentication Error: {e}")
    print("The API key appears to be invalid or expired.")
    
except openai.APIError as e:
    print(f"\nAPI Error: {e}")
    print("There might be an issue with the OpenAI service.")
    
except Exception as e:
    print(f"\nUnexpected Error: {type(e).__name__}: {e}")