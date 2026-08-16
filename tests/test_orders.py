def test_get_existing_order(client):
    response = client.get("/orders/ORD1001", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1001"
    assert data["status"] == "Out for Delivery"
    assert data["product_name"] == "AirPro Wireless Noise-Cancelling Headphones"

def test_get_invalid_order(client):
    response = client.get("/orders/ORD9999", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()

def test_post_lookup_ord1002(client):
    response = client.post("/orders/lookup", json={"order_id": "ORD1002"}, headers={"X-Customer-ID": "CUST102"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1002"
    assert data["status"] == "Delivered"
    assert data["product_name"] == "Cotton Oxford Casual Shirt"

def test_post_lookup_ord1001(client):
    response = client.post("/orders/lookup", json={"order_id": "ord1001 "}, headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1001"
    assert data["status"] == "Out for Delivery"

def test_post_lookup_ord1003(client):
    response = client.post("/orders/lookup", json={"order_id": "ORD1003"}, headers={"X-Customer-ID": "CUST103"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1003"
    assert data["status"] == "Delivered"

def test_post_lookup_invalid(client):
    response = client.post("/orders/lookup", json={"order_id": "INVALID"}, headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()

def test_post_cancel_ord1005_success(client):
    # ORD1005 is owned by CUST102
    response = client.post("/orders/cancel", json={"order_id": " ord1005 "}, headers={"X-Customer-ID": "CUST102"})
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["order_id"] == "ORD1005"
    assert data["status"] == "Cancelled"

def test_post_cancel_already_cancelled(client):
    response = client.post("/orders/cancel", json={"order_id": "ORD1005"}, headers={"X-Customer-ID": "CUST102"})
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "Cancelled"
    assert "already cancelled" in data["message"].lower()

def test_post_cancel_delivered_order(client):
    # ORD1002 is owned by CUST102 and is "Delivered"
    response = client.post("/orders/cancel", json={"order_id": "ORD1002"}, headers={"X-Customer-ID": "CUST102"})
    assert response.status_code == 400
    data = response.json()
    assert "cannot be cancelled" in data["detail"].lower()

def test_post_cancel_invalid_order(client):
    response = client.post("/orders/cancel", json={"order_id": "INVALID"}, headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()

def test_cancel_eligible_order(client):
    response = client.post("/orders/ORD1005/cancel", headers={"X-Customer-ID": "CUST102"})
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "Cancelled"

def test_cancel_ineligible_order(client):
    response = client.post("/orders/ORD1001/cancel", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 400
    data = response.json()
    assert "cannot be cancelled" in data["detail"].lower()

def test_list_all_orders(client):
    response = client.get("/orders", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 5

def test_list_orders_filtered_by_customer(client):
    response = client.get("/orders?customer_id=CUST101", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 5
    assert all(o["customer_id"] == "CUST101" for o in data)

def test_unique_order_ids(client):
    response = client.get("/orders", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 200
    data = response.json()
    order_ids = [o["order_id"] for o in data]
    assert len(order_ids) == len(set(order_ids))

def test_expanded_order_lookups(client):
    # ORD1010 owned by CUST101
    response = client.get("/orders/ORD1010", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1010"
    assert data["amount"] > 0

def test_get_order_with_template_placeholder_encoded(client):
    response = client.get("/orders/%7Border_id%7D?order_id=ORD1001", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1001"
    assert data["status"] == "Out for Delivery"

def test_list_orders_filtered_by_order_id(client):
    response = client.get("/orders?order_id=ORD1001", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]["order_id"] == "ORD1001"

def test_unauthenticated_order_access_returns_401(client):
    response = client.get("/orders/ORD1001")
    assert response.status_code == 401

def test_guest_order_access_returns_401(client):
    response = client.get("/orders/ORD1001", headers={"X-Customer-ID": "CUST105"})
    assert response.status_code == 401

def test_cross_customer_order_access_returns_403(client):
    # ORD1001 belongs to CUST101; requesting as CUST102
    response = client.get("/orders/ORD1001", headers={"X-Customer-ID": "CUST102"})
    assert response.status_code == 403
    assert "access denied" in response.json()["detail"].lower()



