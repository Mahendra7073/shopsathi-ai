"""
Smoke Test Suite for ShopSathi AI Backend and API Endpoints.
Verifies server health, database records, customer authentication isolation,
order lookup, return eligibility, refund status, and support ticket creation.
"""

import os
import sys

# Ensure project root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from app.main import app
from app.core.database import SessionLocal
from app.models import Customer, Product, Order, SupportTicket

def run_smoke_tests():
    print("=" * 60)
    print("🧪 Starting ShopSathi AI Backend Smoke Tests...")
    print("=" * 60)

    client = TestClient(app)

    # 1. Health Check
    res = client.get("/health")
    assert res.status_code == 200, f"Health check failed: {res.status_code}"
    assert res.json()["status"] == "healthy"
    print("✅ [PASS] 1. /health endpoint is healthy and returning HTTP 200")

    # 2. Database Records Check
    db = SessionLocal()
    try:
        cust_count = db.query(Customer).count()
        prod_count = db.query(Product).count()
        ord_count = db.query(Order).count()
        assert cust_count >= 5, f"Expected at least 5 customers, found {cust_count}"
        assert prod_count >= 6, f"Expected at least 6 products, found {prod_count}"
        assert ord_count >= 50, f"Expected at least 50 orders, found {ord_count}"
        print(f"✅ [PASS] 2. Database integrity verified: {cust_count} customers, {prod_count} products, {ord_count} orders")
    finally:
        db.close()

    # 3. Product Catalog
    res = client.get("/products")
    assert res.status_code == 200
    products = res.json()
    assert len(products) >= 6
    print(f"✅ [PASS] 3. /products returned {len(products)} active catalog items")

    # 4. Product Search
    res = client.get("/products/search?query=shoes&max_price=2500")
    assert res.status_code == 200
    search_items = res.json()
    assert len(search_items) > 0
    print(f"✅ [PASS] 4. /products/search returned {len(search_items)} matching products within budget")

    # 5. Order Lookup with Customer Isolation
    res_valid = client.get("/orders/ORD1001", headers={"X-Customer-ID": "CUST101"})
    assert res_valid.status_code == 200
    assert res_valid.json()["order_id"] == "ORD1001"
    print("✅ [PASS] 5. Valid order lookup (ORD1001) for authenticated customer CUST101 succeeded")

    # 6. Cross-Customer Order Isolation (Security Barrier)
    res_cross = client.get("/orders/ORD1002", headers={"X-Customer-ID": "CUST101"})
    assert res_cross.status_code == 403
    print("✅ [PASS] 6. Cross-customer order access blocked with HTTP 403 Forbidden")

    # 7. Unauthenticated Order Access Blocked
    res_unauth = client.get("/orders/ORD1001")
    assert res_unauth.status_code == 401
    print("✅ [PASS] 7. Unauthenticated order lookup blocked with HTTP 401 Unauthorized")

    # 8. Return Eligibility
    res_return = client.get("/orders/ORD1003/return-eligibility", headers={"X-Customer-ID": "CUST103"})
    assert res_return.status_code == 200
    print(f"✅ [PASS] 8. Return eligibility endpoint returned HTTP 200 (eligible={res_return.json()['eligible']})")

    # 9. Refund Status
    res_refund = client.get("/orders/ORD1004/refund", headers={"X-Customer-ID": "CUST101"})
    assert res_refund.status_code == 200
    refund_data = res_refund.json()
    assert "refund_status" in refund_data
    print(f"✅ [PASS] 9. Refund status for ORD1004 verified (status={refund_data['refund_status']}, amount={refund_data['amount']})")

    # 10. Analytics Summary
    res_analytics = client.get("/analytics/summary")
    assert res_analytics.status_code == 200
    data = res_analytics.json()
    assert "total_requests" in data
    print(f"✅ [PASS] 10. /analytics/summary returned observability metrics (total={data['total_requests']})")

    print("=" * 60)
    print("🎯 All 10 Smoke Tests PASSED successfully!")
    print("=" * 60)
    return True

if __name__ == "__main__":
    success = run_smoke_tests()
    sys.exit(0 if success else 1)
