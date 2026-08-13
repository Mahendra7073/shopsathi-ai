def test_get_existing_order(client):
    response = client.get("/orders/ORD1001")
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1001"
    assert data["status"] == "Out for Delivery"
    assert data["product_name"] == "AirPro Wireless Noise-Cancelling Headphones"

def test_get_invalid_order(client):
    response = client.get("/orders/ORD9999")
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()

def test_post_lookup_ord1002(client):
    response = client.post("/orders/lookup", json={"order_id": "ORD1002"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1002"
    assert data["status"] == "Delivered"
    assert data["product_name"] == "Cotton Oxford Casual Shirt"

def test_post_lookup_ord1001(client):
    response = client.post("/orders/lookup", json={"order_id": "ord1001 "})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1001"
    assert data["status"] == "Out for Delivery"

def test_post_lookup_ord1003(client):
    response = client.post("/orders/lookup", json={"order_id": "ORD1003"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1003"
    assert data["status"] == "Delivered"

def test_post_lookup_invalid(client):
    response = client.post("/orders/lookup", json={"order_id": "INVALID"})
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()

def test_cancel_eligible_order(client):
    # ORD1005 is in state "Processing"
    response = client.post("/orders/ORD1005/cancel")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "Cancelled"

def test_cancel_ineligible_order(client):
    # ORD1001 is "Out for Delivery"
    response = client.post("/orders/ORD1001/cancel")
    assert response.status_code == 400
    data = response.json()
    assert "cannot be cancelled" in data["detail"].lower()
