def test_get_existing_customer(client):
    response = client.get("/customers/CUST101")
    assert response.status_code == 200
    data = response.json()
    assert data["customer_id"] == "CUST101"
    assert data["name"] == "Mahendra Gurjar"
    assert "email" in data
    assert "phone" in data

def test_get_invalid_customer(client):
    response = client.get("/customers/CUST999")
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()

def test_get_customer_orders(client):
    response = client.get("/customers/CUST101/orders")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert all(o["customer_id"] == "CUST101" for o in data)

def test_get_customer_orders_invalid_customer(client):
    response = client.get("/customers/CUST999/orders")
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()
