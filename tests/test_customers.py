def test_get_existing_customer(client):
    response = client.get("/customers/CUST101", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 200
    data = response.json()
    assert data["customer_id"] == "CUST101"
    assert data["name"] == "Mahendra Gurjar"
    assert "email" in data
    assert "phone" in data

def test_get_invalid_customer(client):
    response = client.get("/customers/CUST999", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 403
    data = response.json()
    assert "access denied" in data["detail"].lower()

def test_get_customer_orders(client):
    response = client.get("/customers/CUST101/orders", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert all(o["customer_id"] == "CUST101" for o in data)

def test_get_customer_orders_invalid_customer(client):
    response = client.get("/customers/CUST999/orders", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 403
    data = response.json()
    assert "access denied" in data["detail"].lower()

def test_unauthenticated_customer_access(client):
    response = client.get("/customers/CUST101")
    assert response.status_code == 401

def test_guest_customer_access(client):
    response = client.get("/customers/CUST101", headers={"X-Customer-ID": "CUST105"})
    assert response.status_code == 401

def test_cross_customer_profile_access_forbidden(client):
    response = client.get("/customers/CUST101", headers={"X-Customer-ID": "CUST102"})
    assert response.status_code == 403
    assert "access denied" in response.json()["detail"].lower()

