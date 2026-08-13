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

def test_create_support_ticket_kipps_schema(client):
    response = client.post("/support/tickets", json={
        "customer_id": " cust101 ",
        "subject": "Issue with order ORD1001",
        "description": "I need assistance regarding my order ORD1001.",
        "priority": "high"
    })
    assert response.status_code == 201
    data = response.json()
    assert "TKT" in data["ticket_id"]
    assert data["customer_id"] == "CUST101"
    assert data["subject"] == "Issue with order ORD1001"
    assert data["description"] == "I need assistance regarding my order ORD1001."
    assert data["priority"] == "High"
    assert data["status"] == "Open"

def test_create_support_ticket_invalid_customer(client):
    response = client.post("/support/tickets", json={
        "customer_id": "CUST999",
        "subject": "Invalid Customer Test",
        "description": "Some issue",
        "priority": "medium"
    })
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()

def test_create_support_ticket_missing_description(client):
    response = client.post("/support/tickets", json={
        "customer_id": "CUST101",
        "subject": "Missing Description Test",
        "priority": "low"
    })
    assert response.status_code == 422  # Pydantic validation error for missing required field

def test_post_escalate_support_ticket_json_body(client):
    # 1. Create ticket
    c_res = client.post("/support/tickets", json={
        "customer_id": "CUST101",
        "subject": "Escalation Test",
        "description": "Issue requiring human attention",
        "priority": "high"
    })
    assert c_res.status_code == 201
    real_ticket_id = c_res.json()["ticket_id"]

    # 2. Escalate via POST /support/tickets/escalate
    e_res = client.post("/support/tickets/escalate", json={
        "ticket_id": f" {real_ticket_id.lower()} "
    })
    assert e_res.status_code == 200
    e_data = e_res.json()
    assert e_data["ticket_id"] == real_ticket_id
    assert e_data["status"] == "Escalated"
    assert "Tier 2" in e_data["assigned_to"]

def test_post_escalate_already_escalated(client):
    # 1. Create ticket
    c_res = client.post("/support/tickets", json={
        "customer_id": "CUST101",
        "description": "Second escalation test"
    })
    ticket_id = c_res.json()["ticket_id"]

    # 2. Escalate once
    client.post("/support/tickets/escalate", json={"ticket_id": ticket_id})

    # 3. Escalate second time (should return 200 with already escalated status)
    e2_res = client.post("/support/tickets/escalate", json={"ticket_id": ticket_id})
    assert e2_res.status_code == 200
    e2_data = e2_res.json()
    assert e2_data["status"] == "Escalated"
    assert "already escalated" in e2_data["message"].lower()

def test_post_escalate_invalid_ticket(client):
    response = client.post("/support/tickets/escalate", json={"ticket_id": "TKT99999"})
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()

def test_create_ticket_and_immediate_escalation(client):
    # 1. Create ticket
    create_res = client.post("/support/tickets", json={
        "customer_id": "CUST101",
        "subject": "Complex Issue",
        "description": "Payment stuck in pending state",
        "priority": "CRITICAL"
    })
    assert create_res.status_code == 201
    ticket_id = create_res.json()["ticket_id"]
    assert create_res.json()["priority"] == "Critical"

    # 2. Immediately escalate using generated ticket_id via path endpoint
    escalate_res = client.post(f"/support/tickets/{ticket_id}/escalate", json={
        "reason": "Escalated by AI Agent"
    })
    assert escalate_res.status_code == 200
    esc_data = escalate_res.json()
    assert esc_data["ticket_id"] == ticket_id
    assert esc_data["status"] == "Escalated"
    assert "Tier 2" in esc_data["assigned_to"]

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
