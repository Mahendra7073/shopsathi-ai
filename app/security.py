import os
from typing import Optional
from fastapi import Security, HTTPException, status, Header, Depends
from fastapi.security.api_key import APIKeyHeader
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Customer

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


def get_current_customer(
    x_customer_id: Optional[str] = Header(None, alias="X-Customer-ID"),
    db: Session = Depends(get_db)
) -> Optional[Customer]:
    """
    Extracts authenticated customer identity from X-Customer-ID header.
    Guest (CUST105) or missing header is treated as unauthenticated (None).
    """
    if not x_customer_id or not x_customer_id.strip():
        return None
    
    cid = x_customer_id.strip().upper()
    
    # Guest profile (CUST105) MUST NOT be treated as an authenticated customer
    if cid == "CUST105" or cid == "GUEST":
        return None
    
    customer = db.query(Customer).filter(Customer.customer_id == cid).first()
    return customer


def require_current_customer(
    current_customer: Optional[Customer] = Depends(get_current_customer)
) -> Customer:
    """
    Requires an authenticated customer identity.
    Raises 401 Unauthorized if request is unauthenticated or Guest.
    """
    if not current_customer:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Please log in to access your account data."
        )
    return current_customer

