def test_check_return_eligible(client):
    response = client.get("/orders/ORD1003/return-eligibility", headers={"X-Customer-ID": "CUST103"})
    assert response.status_code == 200
    data = response.json()
    assert data["eligible"] is True

def test_check_return_expired(client):
    response = client.get("/orders/ORD1002/return-eligibility", headers={"X-Customer-ID": "CUST102"})
    assert response.status_code == 200
    data = response.json()
    assert data["eligible"] is False
    assert "expired" in data["reason"].lower()

def test_post_return_eligibility_eligible(client):
    response = client.post("/orders/return-eligibility", json={"order_id": "ORD1003"}, headers={"X-Customer-ID": "CUST103"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1003"
    assert data["eligible"] is True

def test_post_return_eligibility_ineligible(client):
    response = client.post("/orders/return-eligibility", json={"order_id": "ORD1002"}, headers={"X-Customer-ID": "CUST102"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1002"
    assert data["eligible"] is False

def test_post_return_eligibility_lowercase_whitespace(client):
    response = client.post("/orders/return-eligibility", json={"order_id": " ord1003 "}, headers={"X-Customer-ID": "CUST103"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1003"
    assert data["eligible"] is True

def test_post_return_eligibility_invalid_order(client):
    response = client.post("/orders/return-eligibility", json={"order_id": "INVALID"}, headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()

def test_create_return_success(client):
    response = client.post("/returns", json={
        "order_id": "ORD1003",
        "reason": "Size issue, requesting one size larger"
    }, headers={"X-Customer-ID": "CUST103"})
    assert response.status_code == 201
    data = response.json()
    assert data["order_id"] == "ORD1003"
    assert "RET" in data["return_id"]

def test_create_return_duplicate_or_ineligible(client):
    response = client.post("/returns", json={
        "order_id": "ORD1003",
        "reason": "Another return reason"
    }, headers={"X-Customer-ID": "CUST103"})
    assert response.status_code == 400
    data = response.json()
    assert "cannot create return" in data["detail"].lower()

def test_unauthenticated_return_access(client):
    response = client.get("/orders/ORD1003/return-eligibility")
    assert response.status_code == 401

def test_cross_customer_return_forbidden(client):
    # ORD1003 belongs to CUST103; requesting as CUST101
    response = client.get("/orders/ORD1003/return-eligibility", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 403
    assert "access denied" in response.json()["detail"].lower()

