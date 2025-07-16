"""
OpenAI configuration with Render-specific fixes
"""
import os
import httpx
import logging

logger = logging.getLogger(__name__)

def get_http_client():
    """
    Create an HTTP client with custom settings for Render
    """
    # Increase timeouts for Render environment
    timeout = httpx.Timeout(
        connect=30.0,  # Connection timeout
        read=60.0,     # Read timeout
        write=30.0,    # Write timeout
        pool=30.0      # Pool timeout
    )
    
    # Custom transport with retry
    transport = httpx.HTTPTransport(
        retries=3,
        verify=True,
    )
    
    return httpx.Client(
        timeout=timeout,
        transport=transport,
        follow_redirects=True
    )