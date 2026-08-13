def test_check_refund_status_existing(client):
    response = client.get("/orders/ORD1004/refund")
    assert response.status_code == 200
    data = response.json()
    assert data["refund_id"] == "REF7001"
    assert data["amount"] == 2499.0
    assert data["refund_status"] == "Initiated"

def test_check_refund_status_none(client):
    response = client.get("/orders/ORD1001/refund")
    assert response.status_code == 404
    data = response.json()
    assert "no refund record found" in data["detail"].lower()

def test_post_refund_status_existing(client):
    response = client.post("/orders/refund-status", json={"order_id": "ORD1004"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1004"
    assert data["refund_id"] == "REF7001"
    assert data["refund_status"] == "Initiated"

def test_post_refund_status_no_refund_yet(client):
    response = client.post("/orders/refund-status", json={"order_id": "ORD1001"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1001"
    assert data["refund_status"] == "No Refund Initiated"
    assert "no refund record found" in data["message"].lower()

def test_post_refund_status_lowercase_whitespace(client):
    response = client.post("/orders/refund-status", json={"order_id": " ord1004 "})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1004"
    assert data["refund_id"] == "REF7001"

def test_post_refund_status_invalid_order(client):
    response = client.post("/orders/refund-status", json={"order_id": "INVALID"})
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()
