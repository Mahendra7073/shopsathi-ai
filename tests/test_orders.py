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

def test_post_cancel_ord1005_success(client):
    # ORD1005 is in state "Processing"
    response = client.post("/orders/cancel", json={"order_id": " ord1005 "})
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["order_id"] == "ORD1005"
    assert data["status"] == "Cancelled"

def test_post_cancel_already_cancelled(client):
    # Second cancel request for ORD1005
    response = client.post("/orders/cancel", json={"order_id": "ORD1005"})
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "Cancelled"
    assert "already cancelled" in data["message"].lower()

def test_post_cancel_delivered_order(client):
    # ORD1002 is "Delivered"
    response = client.post("/orders/cancel", json={"order_id": "ORD1002"})
    assert response.status_code == 400
    data = response.json()
    assert "cannot be cancelled" in data["detail"].lower()

def test_post_cancel_invalid_order(client):
    response = client.post("/orders/cancel", json={"order_id": "INVALID"})
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()

def test_cancel_eligible_order(client):
    # Testing original path param endpoint /orders/{order_id}/cancel
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

def test_list_all_orders(client):
    response = client.get("/orders")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 50

def test_list_orders_filtered_by_customer(client):
    response = client.get("/orders?customer_id=CUST101")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 5
    assert all(o["customer_id"] == "CUST101" for o in data)

def test_unique_order_ids(client):
    response = client.get("/orders")
    assert response.status_code == 200
    data = response.json()
    order_ids = [o["order_id"] for o in data]
    assert len(order_ids) == len(set(order_ids))
    assert len(order_ids) >= 50

def test_expanded_order_lookups(client):
    for oid in ["ORD1010", "ORD1020", "ORD1030", "ORD1040", "ORD1050"]:
        response = client.get(f"/orders/{oid}")
        assert response.status_code == 200
        data = response.json()
        assert data["order_id"] == oid
        assert data["amount"] > 0
        assert data["status"] in [
            "Processing", "Confirmed", "Packed", "Shipped",
            "Out for Delivery", "Delivered", "Cancelled",
            "Returned", "Return Requested"
        ]

def test_get_order_with_template_placeholder_encoded(client):
    # Test Kipps.AI querying /orders/%7Border_id%7D?order_id=ORD1001
    response = client.get("/orders/%7Border_id%7D?order_id=ORD1001")
    assert response.status_code == 200
    data = response.json()
    assert data["order_id"] == "ORD1001"
    assert data["status"] == "Out for Delivery"

def test_list_orders_filtered_by_order_id(client):
    # Test querying /orders?order_id=ORD1001
    response = client.get("/orders?order_id=ORD1001")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]["order_id"] == "ORD1001"


