import time
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query, Security
from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Product
from app.schemas import ProductResponse, ProductSearchRequest
from app.logging_config import log_api_call
from app.security import verify_api_key

router = APIRouter(prefix="/products", tags=["Products"])


def execute_catalog_search(
    db: Session,
    query: Optional[str] = None,
    max_price: Optional[float] = None,
    category: Optional[str] = None
) -> List[Product]:
    """Helper function to perform smart multi-keyword catalog search."""
    q = db.query(Product)

    if category and category.strip():
        q = q.filter(Product.category.ilike(f"%{category.strip()}%"))

    if max_price is not None:
        q = q.filter(Product.price <= max_price)

    if query and query.strip():
        clean_q = query.strip()
        # 1. Substring / phrase match
        phrase_matches = q.filter(
            (Product.name.ilike(f"%{clean_q}%")) |
            (Product.description.ilike(f"%{clean_q}%")) |
            (Product.category.ilike(f"%{clean_q}%"))
        ).all()

        if phrase_matches:
            return phrase_matches

        # 2. Tokenized match (all words / stems)
        words = [w for w in clean_q.split() if len(w) > 1]
        if words:
            token_q = q
            for w in words:
                stem = w.rstrip('s') if len(w) > 3 and w.endswith('s') else w
                token_q = token_q.filter(
                    (Product.name.ilike(f"%{stem}%")) |
                    (Product.description.ilike(f"%{stem}%")) |
                    (Product.category.ilike(f"%{stem}%"))
                )
            token_matches = token_q.all()
            if token_matches:
                return token_matches

            # 3. Match any word / stem
            any_conditions = []
            for w in words:
                stem = w.rstrip('s') if len(w) > 3 and w.endswith('s') else w
                any_conditions.append(Product.name.ilike(f"%{stem}%"))
                any_conditions.append(Product.description.ilike(f"%{stem}%"))
                any_conditions.append(Product.category.ilike(f"%{stem}%"))
            return q.filter(or_(*any_conditions)).all()

    return q.all()


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
    Search product catalog with optional query text, max price budget, and category filters (GET query params).
    Used by Kipps.AI Function: search_products.
    """
    start_time = time.time()
    results = execute_catalog_search(db=db, query=query, max_price=max_price, category=category)

    log_api_call(
        db=db,
        function_called="search_products",
        intent="Product Recommendation",
        api_result={"query": query, "max_price": max_price, "category": category, "count": len(results)},
        success=True,
        response_time_ms=(time.time() - start_time) * 1000
    )

    return results


@router.post("/search", response_model=List[ProductResponse], summary="Search products via JSON body (search_products_post)")
def search_products_post(
    payload: ProductSearchRequest,
    db: Session = Depends(get_db),
    api_key: str = Security(verify_api_key)
):
    """
    Search product catalog using JSON body request payload.
    Used by Kipps.AI Function: search_products.
    """
    start_time = time.time()
    results = execute_catalog_search(
        db=db,
        query=payload.query,
        max_price=payload.max_price,
        category=payload.category
    )

    log_api_call(
        db=db,
        function_called="search_products",
        intent="Product Recommendation",
        api_result={"query": payload.query, "max_price": payload.max_price, "category": payload.category, "count": len(results)},
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
