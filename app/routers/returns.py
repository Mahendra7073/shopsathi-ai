import time
from datetime import datetime, timezone
import uuid
from fastapi import APIRouter, Depends, HTTPException, status, Security
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Order, ReturnRequest
from app.schemas import ReturnEligibilityResponse, CreateReturnRequest, ReturnResponse
from app.logging_config import log_api_call
from app.security import verify_api_key

router = APIRouter(tags=["Returns"])

RETURN_POLICY_DAYS = 7

@router.get("/orders/{order_id}/return-eligibility", response_model=ReturnEligibilityResponse, summary="Check return eligibility (check_return_eligibility)")
def check_return_eligibility(
    order_id: str,
    db: Session = Depends(get_db),
    api_key: str = Security(verify_api_key)
):
    """
    Check whether an order is eligible for return according to return policies.
    Used by Kipps.AI Function: check_return_eligibility.
    """
    start_time = time.time()
    order = db.query(Order).filter(Order.order_id == order_id.upper()).first()

    if not order:
        log_api_call(
            db=db,
            function_called="check_return_eligibility",
            intent="Return Inquiry",
            api_result={"error": f"Order {order_id} not found"},
            success=False,
            response_time_ms=(time.time() - start_time) * 1000
        )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order {order_id} not found."
        )

    # 1. Check if return request already exists
    existing_return = db.query(ReturnRequest).filter(ReturnRequest.order_id == order.order_id).first()
    if existing_return:
        res = {
            "order_id": order.order_id,
            "eligible": False,
            "reason": f"A return request ({existing_return.return_id}) has already been submitted for this order with status '{existing_return.status}'.",
            "days_since_delivery": None,
            "returnable_policy": order.product.returnable if order.product else True
        }
        log_api_call(db=db, function_called="check_return_eligibility", customer_id=order.customer_id, intent="Return Inquiry", api_result=res, success=True, response_time_ms=(time.time() - start_time) * 1000)
        return res

    # 2. Check product policy
    if order.product and not order.product.returnable:
        res = {
            "order_id": order.order_id,
            "eligible": False,
            "reason": f"Product '{order.product.name}' is non-returnable due to hygiene and safety policy.",
            "days_since_delivery": None,
            "returnable_policy": False
        }
        log_api_call(db=db, function_called="check_return_eligibility", customer_id=order.customer_id, intent="Return Inquiry", api_result=res, success=True, response_time_ms=(time.time() - start_time) * 1000)
        return res

    # 3. Check order delivery status
    if order.status != "Delivered" or not order.delivered_date:
        res = {
            "order_id": order.order_id,
            "eligible": False,
            "reason": f"Order status is currently '{order.status}'. Returns are only permitted for delivered items.",
            "days_since_delivery": None,
            "returnable_policy": True
        }
        log_api_call(db=db, function_called="check_return_eligibility", customer_id=order.customer_id, intent="Return Inquiry", api_result=res, success=True, response_time_ms=(time.time() - start_time) * 1000)
        return res

    # 4. Check return window (7 days)
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    days_since = (now - order.delivered_date).days
    if days_since > RETURN_POLICY_DAYS:
        res = {
            "order_id": order.order_id,
            "eligible": False,
            "reason": f"Return window expired. Item was delivered {days_since} days ago (7-day return policy).",
            "days_since_delivery": days_since,
            "returnable_policy": True
        }
        log_api_call(db=db, function_called="check_return_eligibility", customer_id=order.customer_id, intent="Return Inquiry", api_result=res, success=True, response_time_ms=(time.time() - start_time) * 1000)
        return res

    # Eligible!
    res = {
        "order_id": order.order_id,
        "eligible": True,
        "reason": f"Order is eligible for return. Delivered {days_since} days ago (within {RETURN_POLICY_DAYS}-day return window).",
        "days_since_delivery": days_since,
        "returnable_policy": True
    }
    log_api_call(db=db, function_called="check_return_eligibility", customer_id=order.customer_id, intent="Return Inquiry", api_result=res, success=True, response_time_ms=(time.time() - start_time) * 1000)
    return res


@router.post("/returns", response_model=ReturnResponse, status_code=status.HTTP_201_CREATED, summary="Create return request (create_return_request)")
def create_return_request(
    payload: CreateReturnRequest,
    db: Session = Depends(get_db),
    api_key: str = Security(verify_api_key)
):
    """
    Submit a return request for an eligible order.
    Used by Kipps.AI Function: create_return_request.
    """
    start_time = time.time()
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    order_id = payload.order_id.upper()
    order = db.query(Order).filter(Order.order_id == order_id).first()

    if not order:
        log_api_call(db=db, function_called="create_return_request", intent="Create Return", api_result={"error": f"Order {order_id} not found"}, success=False, response_time_ms=(time.time() - start_time) * 1000)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order {order_id} not found."
        )

    # Check eligibility first
    eligibility = check_return_eligibility(order_id=order_id, db=db, api_key=api_key)
    if not eligibility["eligible"]:
        log_api_call(db=db, function_called="create_return_request", customer_id=order.customer_id, intent="Create Return", api_result={"error": eligibility["reason"]}, success=False, response_time_ms=(time.time() - start_time) * 1000)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot create return: {eligibility['reason']}"
        )

    # Create return record
    return_id = f"RET{uuid.uuid4().hex[:6].upper()}"
    return_req = ReturnRequest(
        return_id=return_id,
        order_id=order_id,
        reason=payload.reason,
        status="Requested",
        created_at=now
    )
    db.add(return_req)
    
    # Update order status to Return Requested
    order.status = "Return Requested"
    db.commit()
    db.refresh(return_req)

    res = {
        "success": True,
        "return_id": return_req.return_id,
        "order_id": return_req.order_id,
        "reason": return_req.reason,
        "status": return_req.status,
        "created_at": return_req.created_at,
        "message": f"Return request {return_id} submitted successfully! Pickup will be scheduled within 24-48 hours."
    }

    log_api_call(
        db=db,
        function_called="create_return_request",
        customer_id=order.customer_id,
        intent="Create Return",
        api_result=res,
        success=True,
        response_time_ms=(time.time() - start_time) * 1000
    )

    return res
