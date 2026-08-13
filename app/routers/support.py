import time
from datetime import datetime, timezone
import uuid
import re
from fastapi import APIRouter, Depends, HTTPException, status, Security
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import SupportTicket, Customer, Order
from app.schemas import CreateSupportTicketRequest, SupportTicketResponse, EscalateTicketRequest, EscalateTicketPostRequest
from app.logging_config import log_api_call
from app.security import verify_api_key

router = APIRouter(prefix="/support", tags=["Support Tickets"])


def clean_ticket_id(raw_id: str) -> str:
    """Robustly cleans and extracts ticket IDs e.g. 'Ticket #TKTD1536D' -> 'TKTD1536D'."""
    if not raw_id:
        return ""
    clean = raw_id.strip().upper()
    match = re.search(r'TKT[A-Z0-9]+', clean)
    if match:
        return match.group(0)
    return clean.lstrip("#").strip()


@router.post("/tickets", response_model=SupportTicketResponse, status_code=status.HTTP_201_CREATED, summary="Create support ticket (create_support_ticket)")
def create_support_ticket(
    payload: CreateSupportTicketRequest,
    db: Session = Depends(get_db),
    api_key: str = Security(verify_api_key)
):
    """
    Create a new support ticket for a customer query.
    Used by Kipps.AI Function: create_support_ticket.
    Accepts customer_id, subject/category, description, priority, order_id.
    """
    start_time = time.time()
    
    # 1. Normalize & validate customer_id
    if not payload.customer_id or not payload.customer_id.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="customer_id is required."
        )
    customer_id = payload.customer_id.strip().upper()
    customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()

    if not customer:
        log_api_call(db=db, function_called="create_support_ticket", intent="Support Ticket Creation", api_result={"error": f"Customer {customer_id} not found"}, success=False, response_time_ms=(time.time() - start_time) * 1000)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Customer {customer_id} not found."
        )

    # 2. Validate description
    if not payload.description or not payload.description.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="description is required."
        )
    description = payload.description.strip()

    # 3. Handle subject & category
    subject_val = payload.subject.strip() if payload.subject and payload.subject.strip() else None
    category_val = payload.category.strip() if payload.category and payload.category.strip() else (subject_val or "General Support")

    # 4. Priority normalization (low -> Low, high -> High)
    raw_priority = payload.priority.strip() if payload.priority and payload.priority.strip() else "Medium"
    priority_normalized = raw_priority.title()
    if priority_normalized not in ["Low", "Medium", "High", "Critical"]:
        priority_normalized = "Medium"

    # 5. Optional order_id validation
    order_id = payload.order_id.strip().upper() if payload.order_id and payload.order_id.strip() else None
    if order_id:
        order = db.query(Order).filter(Order.order_id == order_id).first()
        if not order:
            log_api_call(db=db, function_called="create_support_ticket", intent="Support Ticket Creation", api_result={"error": f"Order {order_id} not found"}, success=False, response_time_ms=(time.time() - start_time) * 1000)
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Order {order_id} not found."
            )

    # 6. Generate real unique ticket ID & persist to DB
    ticket_id = f"TKT{uuid.uuid4().hex[:6].upper()}"
    ticket = SupportTicket(
        ticket_id=ticket_id,
        customer_id=customer_id,
        order_id=order_id,
        category=category_val,
        priority=priority_normalized,
        description=description,
        status="Open",
        assigned_to="AI Agent",
        created_at=datetime.now(timezone.utc).replace(tzinfo=None)
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    res = {
        "success": True,
        "ticket_id": ticket.ticket_id,
        "customer_id": ticket.customer_id,
        "subject": subject_val or category_val,
        "category": ticket.category,
        "priority": ticket.priority,
        "description": ticket.description,
        "status": ticket.status,
        "assigned_to": ticket.assigned_to,
        "order_id": ticket.order_id,
        "reason_for_escalation": ticket.reason_for_escalation,
        "escalated_at": ticket.escalated_at,
        "created_at": ticket.created_at,
        "message": f"Support ticket {ticket_id} created successfully for customer '{customer_id}' with priority '{ticket.priority}'."
    }

    log_api_call(
        db=db,
        function_called="create_support_ticket",
        customer_id=customer_id,
        intent="Support Ticket Creation",
        api_result=res,
        success=True,
        response_time_ms=(time.time() - start_time) * 1000
    )

    return res


@router.post("/tickets/escalate", response_model=SupportTicketResponse, summary="Escalate ticket via JSON body (escalate_support_ticket_post)")
def escalate_support_ticket_post(
    payload: EscalateTicketPostRequest,
    db: Session = Depends(get_db),
    api_key: str = Security(verify_api_key)
):
    """
    Escalate a support ticket using JSON body payload.
    Used by Kipps.AI Function: escalate_support_ticket.
    """
    start_time = time.time()
    t_id = clean_ticket_id(payload.ticket_id)
    ticket = db.query(SupportTicket).filter(SupportTicket.ticket_id == t_id).first()

    if not ticket:
        log_api_call(db=db, function_called="escalate_support_ticket", intent="Human Escalation", api_result={"error": f"Support ticket {t_id} not found."}, success=False, escalation=True, response_time_ms=(time.time() - start_time) * 1000)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Support ticket {t_id} not found."
        )

    # Check if ticket is already escalated
    if ticket.status == "Escalated":
        res = {
            "success": True,
            "ticket_id": ticket.ticket_id,
            "customer_id": ticket.customer_id,
            "subject": ticket.category,
            "category": ticket.category,
            "priority": ticket.priority,
            "description": ticket.description,
            "status": "Escalated",
            "assigned_to": ticket.assigned_to or "Tier 2 Human Support Agent",
            "order_id": ticket.order_id,
            "reason_for_escalation": ticket.reason_for_escalation,
            "escalated_at": ticket.escalated_at,
            "created_at": ticket.created_at,
            "message": f"Ticket {t_id} is already escalated to {ticket.assigned_to or 'Tier 2 Human Support Agent'}."
        }
        log_api_call(db=db, function_called="escalate_support_ticket", customer_id=ticket.customer_id, intent="Human Escalation", api_result=res, success=True, escalation=True, response_time_ms=(time.time() - start_time) * 1000)
        return res

    reason = payload.reason if payload.reason else "Escalated by AI Agent due to unresolved complex issue."
    ticket.status = "Escalated"
    ticket.assigned_to = "Tier 2 Human Support Agent"
    ticket.reason_for_escalation = reason
    ticket.escalated_at = datetime.now(timezone.utc).replace(tzinfo=None)
    db.commit()
    db.refresh(ticket)

    res = {
        "success": True,
        "ticket_id": ticket.ticket_id,
        "customer_id": ticket.customer_id,
        "subject": ticket.category,
        "category": ticket.category,
        "priority": ticket.priority,
        "description": ticket.description,
        "status": ticket.status,
        "assigned_to": ticket.assigned_to,
        "order_id": ticket.order_id,
        "reason_for_escalation": ticket.reason_for_escalation,
        "escalated_at": ticket.escalated_at,
        "created_at": ticket.created_at,
        "message": f"Ticket {t_id} has been escalated to human support ({ticket.assigned_to}). Reason: {reason}."
    }

    log_api_call(
        db=db,
        function_called="escalate_support_ticket",
        customer_id=ticket.customer_id,
        intent="Human Escalation",
        api_result=res,
        success=True,
        escalation=True,
        response_time_ms=(time.time() - start_time) * 1000
    )

    return res


@router.post("/tickets/{ticket_id}/escalate", response_model=SupportTicketResponse, summary="Escalate support ticket to human agent (escalate_support_ticket)")
def escalate_support_ticket(
    ticket_id: str,
    payload: EscalateTicketRequest = None,
    db: Session = Depends(get_db),
    api_key: str = Security(verify_api_key)
):
    """
    Escalate an unresolved support ticket to a Tier 2 human customer support agent (URL path parameter).
    Used by Kipps.AI Function: escalate_support_ticket.
    """
    start_time = time.time()
    t_id = clean_ticket_id(ticket_id)
    ticket = db.query(SupportTicket).filter(SupportTicket.ticket_id == t_id).first()

    if not ticket:
        log_api_call(db=db, function_called="escalate_support_ticket", intent="Human Escalation", api_result={"error": f"Support ticket {t_id} not found."}, success=False, escalation=True, response_time_ms=(time.time() - start_time) * 1000)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Support ticket {t_id} not found."
        )

    if ticket.status == "Escalated":
        res = {
            "success": True,
            "ticket_id": ticket.ticket_id,
            "customer_id": ticket.customer_id,
            "subject": ticket.category,
            "category": ticket.category,
            "priority": ticket.priority,
            "description": ticket.description,
            "status": "Escalated",
            "assigned_to": ticket.assigned_to or "Tier 2 Human Support Agent",
            "order_id": ticket.order_id,
            "reason_for_escalation": ticket.reason_for_escalation,
            "escalated_at": ticket.escalated_at,
            "created_at": ticket.created_at,
            "message": f"Ticket {t_id} is already escalated to {ticket.assigned_to or 'Tier 2 Human Support Agent'}."
        }
        log_api_call(db=db, function_called="escalate_support_ticket", customer_id=ticket.customer_id, intent="Human Escalation", api_result=res, success=True, escalation=True, response_time_ms=(time.time() - start_time) * 1000)
        return res

    reason = payload.reason if payload and payload.reason else "Escalated by AI Agent due to unresolved complex issue."
    ticket.status = "Escalated"
    ticket.assigned_to = "Tier 2 Human Support Agent"
    ticket.reason_for_escalation = reason
    ticket.escalated_at = datetime.now(timezone.utc).replace(tzinfo=None)
    db.commit()
    db.refresh(ticket)

    res = {
        "success": True,
        "ticket_id": ticket.ticket_id,
        "customer_id": ticket.customer_id,
        "subject": ticket.category,
        "category": ticket.category,
        "priority": ticket.priority,
        "description": ticket.description,
        "status": ticket.status,
        "assigned_to": ticket.assigned_to,
        "order_id": ticket.order_id,
        "reason_for_escalation": ticket.reason_for_escalation,
        "escalated_at": ticket.escalated_at,
        "created_at": ticket.created_at,
        "message": f"Ticket {t_id} has been escalated to human support ({ticket.assigned_to}). Reason: {reason}."
    }

    log_api_call(
        db=db,
        function_called="escalate_support_ticket",
        customer_id=ticket.customer_id,
        intent="Human Escalation",
        api_result=res,
        success=True,
        escalation=True,
        response_time_ms=(time.time() - start_time) * 1000
    )

    return res


@router.get("/tickets/{ticket_id}", response_model=SupportTicketResponse, summary="Get support ticket details")
def get_support_ticket(ticket_id: str, db: Session = Depends(get_db)):
    """Retrieve details of a support ticket by ticket_id."""
    t_id = clean_ticket_id(ticket_id)
    ticket = db.query(SupportTicket).filter(SupportTicket.ticket_id == t_id).first()
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Support ticket {t_id} not found."
        )

    return {
        "success": True,
        "ticket_id": ticket.ticket_id,
        "customer_id": ticket.customer_id,
        "subject": ticket.category,
        "category": ticket.category,
        "priority": ticket.priority,
        "description": ticket.description,
        "status": ticket.status,
        "assigned_to": ticket.assigned_to,
        "order_id": ticket.order_id,
        "reason_for_escalation": ticket.reason_for_escalation,
        "escalated_at": ticket.escalated_at,
        "created_at": ticket.created_at,
        "message": f"Ticket {ticket.ticket_id} is currently '{ticket.status}' (Assigned to: {ticket.assigned_to})."
    }
