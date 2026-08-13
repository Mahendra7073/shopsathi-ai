def test_create_support_ticket(client):
    response = client.post("/support/tickets", json={
        "customer_id": "CUST101",
        "category": "Shipping Delay",
        "description": "Package is delayed beyond promised delivery window",
        "order_id": "ORD1001"
    })
    assert response.status_code == 201
    data = response.json()
    assert "TKT" in data["ticket_id"]
    assert data["customer_id"] == "CUST101"
    assert data["status"] == "Open"

def test_escalate_support_ticket(client):
    # Escalate existing ticket TKT9001
    response = client.post("/support/tickets/TKT9001/escalate", json={
        "reason": "Payment dispute unconfirmed by automated processor"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["ticket_id"] == "TKT9001"
    assert data["status"] == "Escalated"
    assert "Tier 2" in data["assigned_to"]
