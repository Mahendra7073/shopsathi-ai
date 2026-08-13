import time
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query, Security
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Product
from app.schemas import ProductResponse
from app.logging_config import log_api_call
from app.security import verify_api_key

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("", response_model=List[ProductResponse], summary="List all products")
def list_products(db: Session = Depends(get_db)):
    """Retrieve full catalog of products."""
    return db.query(Product).all()


@router.get("/search", response_model=List[ProductResponse], summary="Search/recommend products (search_products)")
def search_products(
    query: Optional[str] = Query(None, description="Search query string e.g. 'shoes' or 'headphones'"),
    max_price: Optional[float] = Query(None, description="Maximum budget price e.g. 2000.0"),
    category: Optional[str] = Query(None, description="Category filter e.g. Electronics, Footwear, Fashion, Home"),
    db: Session = Depends(get_db),
    api_key: str = Security(verify_api_key)
):
    """
    Search product catalog with optional query text, max price budget, and category filters.
    Used by Kipps.AI Function: search_products.
    """
    start_time = time.time()
    q = db.query(Product)

    if category:
        q = q.filter(Product.category.ilike(f"%{category}%"))
    if max_price is not None:
        q = q.filter(Product.price <= max_price)
    if query:
        q = q.filter(
            (Product.name.ilike(f"%{query}%")) |
            (Product.description.ilike(f"%{query}%")) |
            (Product.category.ilike(f"%{query}%"))
        )

    results = q.all()

    log_api_call(
        db=db,
        function_called="search_products",
        intent="Product Recommendation",
        api_result={"query": query, "max_price": max_price, "category": category, "count": len(results)},
        success=True,
        response_time_ms=(time.time() - start_time) * 1000
    )

    return results


@router.get("/{product_id}", response_model=ProductResponse, summary="Get product details")
def get_product(product_id: str, db: Session = Depends(get_db)):
    """Retrieve details for a specific product by product_id."""
    product = db.query(Product).filter(Product.product_id == product_id.upper()).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product {product_id} not found."
        )
    return product
