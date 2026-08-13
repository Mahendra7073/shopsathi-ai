import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models import AuditLog, SupportTicket, ReturnRequest, Refund, Order
from app.schemas import AnalyticsSummaryResponse

router = APIRouter(prefix="/analytics", tags=["Analytics & Observability"])

@router.get("/summary", response_model=AnalyticsSummaryResponse, summary="Retrieve real-time observability & AI analytics metrics")
def get_analytics_summary(db: Session = Depends(get_db)):
    """
    Get aggregated system performance metrics, resolution vs escalation stats, and recent execution logs.
    Used for hackathon demonstration and monitoring dashboard.
    """
    total_requests = db.query(AuditLog).count()
    escalated_count = db.query(AuditLog).filter(AuditLog.escalation == True).count()
    resolved_by_ai = max(0, total_requests - escalated_count)

    returns_created = db.query(ReturnRequest).count()
    refunds_checked = db.query(Refund).count()
    cancellations = db.query(Order).filter(Order.status == "Cancelled").count()

    avg_time = db.query(func.avg(AuditLog.response_time_ms)).scalar() or 0.0

    recent_logs = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(15).all()

    formatted_logs = []
    for log in recent_logs:
        formatted_logs.append({
            "id": log.id,
            "request_id": log.request_id,
            "customer_id": log.customer_id,
            "intent": log.intent,
            "function_called": log.function_called,
            "success": log.success,
            "escalation": log.escalation,
            "response_time_ms": log.response_time_ms,
            "timestamp": log.timestamp.isoformat() if log.timestamp else None
        })

    return {
        "total_requests": total_requests,
        "resolved_by_ai": resolved_by_ai,
        "escalated_to_human": escalated_count,
        "returns_created": returns_created,
        "refunds_checked": refunds_checked,
        "cancellations": cancellations,
        "avg_response_time_ms": round(float(avg_time), 2),
        "recent_logs": formatted_logs
    }
