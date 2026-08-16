from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Customer, Order
from app.schemas import CustomerResponse, OrderResponse
from app.security import require_current_customer

router = APIRouter(prefix="/customers", tags=["Customers"])

@router.get("/{customer_id}", response_model=CustomerResponse, summary="Retrieve customer profile")
def get_customer(
    customer_id: str,
    db: Session = Depends(get_db),
    current_customer: Customer = Depends(require_current_customer)
):
    """Retrieve customer details by ID. Enforces customer isolation."""
    target_cid = customer_id.strip().upper()
    if target_cid != current_customer.customer_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. You can only view your own customer profile."
        )
    return current_customer


@router.get("/{customer_id}/orders", response_model=List[OrderResponse], summary="Retrieve customer orders")
def get_customer_orders(
    customer_id: str,
    db: Session = Depends(get_db),
    current_customer: Customer = Depends(require_current_customer)
):
    """Retrieve all orders for a customer. Enforces customer isolation."""
    target_cid = customer_id.strip().upper()
    if target_cid != current_customer.customer_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. You can only view orders associated with your account."
        )

    orders = db.query(Order).filter(Order.customer_id == target_cid).order_by(Order.order_date.desc()).all()
    results = []
    for order in orders:
        results.append({
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
        })
    return results

