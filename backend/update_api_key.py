#!/usr/bin/env python3
import os

def update_api_key():
    print("Current .env file content:")
    with open('.env', 'r') as f:
        content = f.read()
        print(content)
    
    print("\nPlease enter your OpenAI API key (starts with sk-):")
    api_key = input().strip()
    
    if api_key and api_key.startswith('sk-'):
        # Update the .env file
        updated_content = content.replace('your-openai-api-key-here', api_key)
        
        with open('.env', 'w') as f:
            f.write(updated_content)
        
        print(f"\n✅ API key updated successfully!")
        print("Please restart the backend server with:")
        print("uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload")
    else:
        print("❌ Invalid API key. It should start with 'sk-'")

if __name__ == "__main__":
    update_api_key()