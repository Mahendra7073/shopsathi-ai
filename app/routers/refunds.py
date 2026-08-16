import time
import urllib.parse
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query, Security
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Order, Refund, Customer
from app.schemas import RefundResponse, RefundStatusRequest
from app.logging_config import log_api_call
from app.security import verify_api_key, require_current_customer

router = APIRouter(prefix="/orders", tags=["Refunds"])

@router.get("/{order_id}/refund", response_model=RefundResponse, summary="Retrieve refund status (check_refund_status)")
def check_refund_status(
    order_id: str,
    order_id_query: Optional[str] = Query(None, alias="order_id", description="Optional query parameter fallback for order_id"),
    db: Session = Depends(get_db),
    current_customer: Customer = Depends(require_current_customer),
    api_key: str = Security(verify_api_key)
):
    """
    Retrieve refund status and details for an order.
    Enforces customer order isolation.
    """
    start_time = time.time()
    
    decoded_path = urllib.parse.unquote(order_id).strip()
    if (decoded_path.startswith("{") and decoded_path.endswith("}")) or not decoded_path:
        if order_id_query and order_id_query.strip():
            order_id_clean = urllib.parse.unquote(order_id_query).strip().upper()
        else:
            order_id_clean = decoded_path.upper()
    else:
        order_id_clean = decoded_path.upper()

    order = db.query(Order).filter(Order.order_id == order_id_clean).first()

    if not order:
        log_api_call(db=db, function_called="check_refund_status", intent="Refund Check", api_result={"error": f"Order {order_id_clean} not found"}, success=False, response_time_ms=(time.time() - start_time) * 1000)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order {order_id_clean} not found."
        )

    # Customer isolation check
    if order.customer_id != current_customer.customer_id:
        log_api_call(db=db, function_called="check_refund_status", customer_id=current_customer.customer_id, intent="Refund Check", api_result={"error": f"Access denied for order {order_id_clean}"}, success=False, response_time_ms=(time.time() - start_time) * 1000)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. You can only view refund status for orders associated with your account."
        )

    refund = db.query(Refund).filter(Refund.order_id == order_id_clean).first()

    if not refund:
        # No refund initiated yet
        msg = f"No refund record found for Order {order_id_clean}. Order status is currently '{order.status}'."
        log_api_call(db=db, function_called="check_refund_status", customer_id=order.customer_id, intent="Refund Check", api_result={"refund_status": "No Refund", "message": msg}, success=True, response_time_ms=(time.time() - start_time) * 1000)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=msg
        )

    res = {
        "order_id": refund.order_id,
        "refund_status": refund.status,
        "amount": refund.amount,
        "expected_date": refund.expected_date,
        "refund_id": refund.refund_id,
        "initiated_at": refund.initiated_at,
        "message": f"Refund {refund.refund_id} for ₹{refund.amount} is currently in status '{refund.status}'. Expected completion: {refund.expected_date}."
    }

    log_api_call(
        db=db,
        function_called="check_refund_status",
        customer_id=order.customer_id,
        intent="Refund Check",
        api_result=res,
        success=True,
        response_time_ms=(time.time() - start_time) * 1000
    )

    return res


@router.post("/refund-status", response_model=RefundResponse, summary="Retrieve refund status via JSON body (check_refund_status_post)")
def check_refund_status_post(
    payload: RefundStatusRequest,
    db: Session = Depends(get_db),
    current_customer: Customer = Depends(require_current_customer),
    api_key: str = Security(verify_api_key)
):
    """
    Retrieve refund status and details for an order using JSON body request.
    Enforces customer order isolation.
    """
    start_time = time.time()
    order_id_clean = payload.order_id.strip().upper()
    order = db.query(Order).filter(Order.order_id == order_id_clean).first()

    if not order:
        log_api_call(db=db, function_called="check_refund_status", intent="Refund Check", api_result={"error": f"Order {payload.order_id} not found"}, success=False, response_time_ms=(time.time() - start_time) * 1000)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order {payload.order_id} not found."
        )

    # Customer isolation check
    if order.customer_id != current_customer.customer_id:
        log_api_call(db=db, function_called="check_refund_status", customer_id=current_customer.customer_id, intent="Refund Check", api_result={"error": f"Access denied for order {order_id_clean}"}, success=False, response_time_ms=(time.time() - start_time) * 1000)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. You can only view refund status for orders associated with your account."
        )

    refund = db.query(Refund).filter(Refund.order_id == order_id_clean).first()

    if not refund:
        msg = f"No refund record found for Order {order_id_clean}. Order status is currently '{order.status}'."
        res = {
            "order_id": order.order_id,
            "refund_status": "No Refund Initiated",
            "amount": 0.0,
            "expected_date": None,
            "refund_id": "N/A",
            "initiated_at": order.order_date,
            "message": msg
        }
        log_api_call(db=db, function_called="check_refund_status", customer_id=order.customer_id, intent="Refund Check", api_result=res, success=True, response_time_ms=(time.time() - start_time) * 1000)
        return res

    res = {
        "order_id": refund.order_id,
        "refund_status": refund.status,
        "amount": refund.amount,
        "expected_date": refund.expected_date,
        "refund_id": refund.refund_id,
        "initiated_at": refund.initiated_at,
        "message": f"Refund {refund.refund_id} for ₹{refund.amount} is currently in status '{refund.status}'. Expected completion: {refund.expected_date}."
    }

    log_api_call(
        db=db,
        function_called="check_refund_status",
        customer_id=order.customer_id,
        intent="Refund Check",
        api_result=res,
        success=True,
        response_time_ms=(time.time() - start_time) * 1000
    )

    return res
