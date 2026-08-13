from datetime import datetime, timezone
from fastapi import APIRouter

router = APIRouter(tags=["Health"])

@router.get("/health", summary="Check backend service health")
def health_check():
    """Health check endpoint for Kipps.AI agent monitoring and backend uptime verification."""
    return {
        "status": "healthy",
        "app_name": "ShopSathi AI",
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
