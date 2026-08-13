import os
from fastapi import Security, HTTPException, status
from fastapi.security.api_key import APIKeyHeader

API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

def verify_api_key(api_key_header: str = Security(api_key_header)):
    """
    Validates X-API-Key header against SHOP_SATHI_API_KEY environment variable.
    If SHOP_SATHI_API_KEY is not configured or empty, authentication is bypassed for local dev ease.
    """
    expected_api_key = os.getenv("SHOP_SATHI_API_KEY")
    
    # If API key authentication is enabled via environment variable
    if expected_api_key:
        if not api_key_header or api_key_header != expected_api_key:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or missing X-API-Key header."
            )
    return api_key_header
