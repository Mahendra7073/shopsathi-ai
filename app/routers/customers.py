from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Customer, Order
from app.schemas import CustomerResponse, OrderResponse

router = APIRouter(prefix="/customers", tags=["Customers"])

@router.get("/{customer_id}", response_model=CustomerResponse, summary="Retrieve customer profile")
def get_customer(customer_id: str, db: Session = Depends(get_db)):
    """Retrieve customer details by ID."""
    customer = db.query(Customer).filter(Customer.customer_id == customer_id.upper()).first()
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Customer {customer_id} not found."
        )
    return customer


@router.get("/{customer_id}/orders", response_model=List[OrderResponse], summary="Retrieve customer orders")
def get_customer_orders(customer_id: str, db: Session = Depends(get_db)):
    """Retrieve all orders for a customer."""
    customer = db.query(Customer).filter(Customer.customer_id == customer_id.upper()).first()
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Customer {customer_id} not found."
        )
    orders = db.query(Order).filter(Order.customer_id == customer_id.upper()).order_by(Order.order_date.desc()).all()
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
