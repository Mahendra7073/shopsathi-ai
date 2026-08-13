import time
from fastapi import APIRouter, Depends, HTTPException, status, Security
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Order
from app.schemas import OrderResponse, OrderCancelResponse, OrderLookupRequest
from app.logging_config import log_api_call
from app.security import verify_api_key

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.get("/{order_id}", response_model=OrderResponse, summary="Retrieve order status (check_order_status)")
def get_order_status(
    order_id: str,
    db: Session = Depends(get_db),
    api_key: str = Security(verify_api_key)
):
    """
    Retrieve real-time status and shipping details for an order.
    Used by Kipps.AI Function: check_order_status.
    """
    start_time = time.time()
    order = db.query(Order).filter(Order.order_id == order_id.upper()).first()

    if not order:
        log_api_call(
            db=db,
            function_called="check_order_status",
            intent="Order Tracking",
            api_result={"error": f"Order {order_id} not found"},
            success=False,
            response_time_ms=(time.time() - start_time) * 1000
        )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order {order_id} not found. Please verify the order ID."
        )

    response_data = {
        "order_id": order.order_id,
        "status": order.status,
        "expected_delivery": order.expected_delivery,
        "tracking_available": True if order.status != "Cancelled" else False,
        "product_name": order.product.name if order.product else "Unknown Product",
        "product_id": order.product_id,
        "customer_id": order.customer_id,
        "quantity": order.quantity,
        "amount": order.amount,
        "order_date": order.order_date,
        "delivered_date": order.delivered_date
    }

    log_api_call(
        db=db,
        function_called="check_order_status",
        customer_id=order.customer_id,
        intent="Order Tracking",
        api_result=response_data,
        success=True,
        response_time_ms=(time.time() - start_time) * 1000
    )

    return response_data


@router.post("/lookup", response_model=OrderResponse, summary="Lookup order status via JSON body (check_order_status_post)")
def lookup_order_status(
    payload: OrderLookupRequest,
    db: Session = Depends(get_db),
    api_key: str = Security(verify_api_key)
):
    """
    Retrieve real-time status and shipping details for an order using JSON body request.
    Useful for Kipps.AI API Functions requiring JSON body payloads.
    """
    order_id_clean = payload.order_id.strip().upper()
    return get_order_status(order_id=order_id_clean, db=db, api_key=api_key)


@router.post("/{order_id}/cancel", response_model=OrderCancelResponse, summary="Cancel eligible order (cancel_order)")
def cancel_order(
    order_id: str,
    db: Session = Depends(get_db),
    api_key: str = Security(verify_api_key)
):
    """
    Cancel an order if eligible (status is 'Processing' or 'Order Placed').
    Used by Kipps.AI Function: cancel_order.
    """
    start_time = time.time()
    order = db.query(Order).filter(Order.order_id == order_id.upper()).first()

    if not order:
        log_api_call(
            db=db,
            function_called="cancel_order",
            intent="Order Cancellation",
            api_result={"error": f"Order {order_id} not found"},
            success=False,
            response_time_ms=(time.time() - start_time) * 1000
        )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order {order_id} not found."
        )

    if order.status == "Cancelled":
        return {
            "success": True,
            "order_id": order.order_id,
            "status": "Cancelled",
            "message": f"Order {order.order_id} is already cancelled."
        }

    cancellable_statuses = ["Processing", "Order Placed", "Preparing to Ship"]
    if order.status not in cancellable_statuses:
        log_api_call(
            db=db,
            function_called="cancel_order",
            customer_id=order.customer_id,
            intent="Order Cancellation",
            api_result={"error": f"Cannot cancel order in state '{order.status}'"},
            success=False,
            response_time_ms=(time.time() - start_time) * 1000
        )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Order {order.order_id} cannot be cancelled because it is currently in state '{order.status}'."
        )

    order.status = "Cancelled"
    db.commit()

    res = {
        "success": True,
        "order_id": order.order_id,
        "status": "Cancelled",
        "message": f"Order {order.order_id} has been successfully cancelled. Any charged amount will be refunded within 3-5 business days."
    }

    log_api_call(
        db=db,
        function_called="cancel_order",
        customer_id=order.customer_id,
        intent="Order Cancellation",
        api_result=res,
        success=True,
        response_time_ms=(time.time() - start_time) * 1000
    )

    return res
