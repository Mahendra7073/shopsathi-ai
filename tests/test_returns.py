def test_check_return_eligible(client):
    # ORD1003 delivered 2 days ago, returnable
    response = client.get("/orders/ORD1003/return-eligibility")
    assert response.status_code == 200
    data = response.json()
    assert data["eligible"] is True

def test_check_return_expired(client):
    # ORD1002 delivered 12 days ago (> 7 days policy)
    response = client.get("/orders/ORD1002/return-eligibility")
    assert response.status_code == 200
    data = response.json()
    assert data["eligible"] is False
    assert "expired" in data["reason"].lower()

def test_post_return_eligibility_eligible(client):
    response = client.post("/orders/return-eligibility", json={"order_id": "ORD1003"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1003"
    assert data["eligible"] is True

def test_post_return_eligibility_ineligible(client):
    response = client.post("/orders/return-eligibility", json={"order_id": "ORD1002"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1002"
    assert data["eligible"] is False

def test_post_return_eligibility_lowercase_whitespace(client):
    response = client.post("/orders/return-eligibility", json={"order_id": " ord1003 "})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1003"
    assert data["eligible"] is True

def test_post_return_eligibility_invalid_order(client):
    response = client.post("/orders/return-eligibility", json={"order_id": "INVALID"})
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()

def test_create_return_success(client):
    response = client.post("/returns", json={
        "order_id": "ORD1003",
        "reason": "Size issue, requesting one size larger"
    })
    assert response.status_code == 201
    data = response.json()
    assert data["order_id"] == "ORD1003"
    assert "RET" in data["return_id"]

def test_create_return_duplicate_or_ineligible(client):
    # Second return request for ORD1003 should fail
    response = client.post("/returns", json={
        "order_id": "ORD1003",
        "reason": "Another return reason"
    })
    assert response.status_code == 400
    data = response.json()
    assert "cannot create return" in data["detail"].lower()
