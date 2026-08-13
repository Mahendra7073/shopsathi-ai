from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Customer
from app.schemas import CustomerResponse

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
