import time
import json
import logging
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models import AuditLog

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("ShopSathiBackend")

def log_api_call(
    db: Session,
    function_called: str,
    request_id: str = "REQ-N/A",
    customer_id: str = None,
    intent: str = None,
    api_result: str = None,
    success: bool = True,
    escalation: bool = False,
    response_time_ms: float = 0.0
):
    """Helper to persist audit logs for observability and analytics."""
    try:
        log_entry = AuditLog(
            request_id=request_id,
            customer_id=customer_id,
            intent=intent or function_called,
            function_called=function_called,
            api_result=json.dumps(api_result, default=str) if isinstance(api_result, (dict, list)) else str(api_result),
            success=success,
            escalation=escalation,
            response_time_ms=round(response_time_ms, 2),
            timestamp=datetime.now(timezone.utc).replace(tzinfo=None)
        )
        db.add(log_entry)
        db.commit()
    except Exception as e:
        logger.error(f"Failed to write audit log: {e}")
        db.rollback()
