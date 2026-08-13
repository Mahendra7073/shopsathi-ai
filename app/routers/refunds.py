import time
from fastapi import APIRouter, Depends, HTTPException, status, Security
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Order, Refund
from app.schemas import RefundResponse
from app.logging_config import log_api_call
from app.security import verify_api_key

router = APIRouter(prefix="/orders", tags=["Refunds"])

@router.get("/{order_id}/refund", response_model=RefundResponse, summary="Retrieve refund status (check_refund_status)")
def check_refund_status(
    order_id: str,
    db: Session = Depends(get_db),
    api_key: str = Security(verify_api_key)
):
    """
    Retrieve refund status and details for an order.
    Used by Kipps.AI Function: check_refund_status.
    """
    start_time = time.time()
    order_id_clean = order_id.upper()
    order = db.query(Order).filter(Order.order_id == order_id_clean).first()

    if not order:
        log_api_call(db=db, function_called="check_refund_status", intent="Refund Check", api_result={"error": f"Order {order_id} not found"}, success=False, response_time_ms=(time.time() - start_time) * 1000)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order {order_id} not found."
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
