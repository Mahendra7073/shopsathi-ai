def test_create_support_ticket(client):
    response = client.post("/support/tickets", json={
        "customer_id": "CUST101",
        "category": "Shipping Delay",
        "description": "Package is delayed beyond promised delivery window",
        "order_id": "ORD1001"
    }, headers={"X-Customer-ID": "CUST101"})
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
    }, headers={"X-Customer-ID": "CUST101"})
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
    }, headers={"X-Customer-ID": "CUST999"})
    assert response.status_code == 401
    data = response.json()
    assert "authentication required" in data["detail"].lower()


def test_create_support_ticket_missing_description(client):
    response = client.post("/support/tickets", json={
        "customer_id": "CUST101",
        "subject": "Missing Description Test",
        "priority": "low"
    }, headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 422  # Pydantic validation error for missing required field

def test_post_ticket_status_existing(client):
    # TKT9001 belongs to CUST102
    response = client.post("/support/tickets/status", json={"ticket_id": "TKT9001"}, headers={"X-Customer-ID": "CUST102"})
    assert response.status_code == 200
    data = response.json()
    assert data["ticket_id"] == "TKT9001"
    assert data["customer_id"] == "CUST102"
    assert "status" in data
    assert "assigned_to" in data

def test_post_ticket_status_lowercase_and_whitespace(client):
    response = client.post("/support/tickets/status", json={"ticket_id": " tkt9001 "}, headers={"X-Customer-ID": "CUST102"})
    assert response.status_code == 200
    data = response.json()
    assert data["ticket_id"] == "TKT9001"

def test_post_ticket_status_invalid_ticket(client):
    response = client.post("/support/tickets/status", json={"ticket_id": "TKT99999"}, headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()

def test_post_ticket_status_created_escalated_retrieved_separate_requests(client):
    """Req 10 & 11: Create ticket in Req 1, Escalate in Req 2, Retrieve status via POST in Req 3."""
    headers = {"X-Customer-ID": "CUST101"}
    req1 = client.post("/support/tickets", json={
        "customer_id": "CUST101",
        "subject": "Item arrived damaged",
        "description": "The item screen was shattered upon arrival.",
        "priority": "high"
    }, headers=headers)
    assert req1.status_code == 201
    t_id = req1.json()["ticket_id"]

    req2 = client.post("/support/tickets/escalate", json={
        "ticket_id": t_id,
        "reason": "Damaged goods dispute requiring manager intervention"
    }, headers=headers)
    assert req2.status_code == 200
    assert req2.json()["status"] == "Escalated"

    req3 = client.post("/support/tickets/status", json={
        "ticket_id": f" {t_id.lower()} "
    }, headers=headers)
    assert req3.status_code == 200
    status_data = req3.json()
    assert status_data["ticket_id"] == t_id
    assert status_data["customer_id"] == "CUST101"
    assert status_data["status"] == "Escalated"
    assert "Tier 2" in status_data["assigned_to"]
    assert status_data["reason_for_escalation"] == "Damaged goods dispute requiring manager intervention"

def test_post_escalate_support_ticket_json_body(client):
    headers = {"X-Customer-ID": "CUST101"}
    c_res = client.post("/support/tickets", json={
        "customer_id": "CUST101",
        "subject": "Escalation Test",
        "description": "Issue requiring human attention",
        "priority": "high"
    }, headers=headers)
    assert c_res.status_code == 201
    real_ticket_id = c_res.json()["ticket_id"]

    e_res = client.post("/support/tickets/escalate", json={
        "ticket_id": f" {real_ticket_id.lower()} "
    }, headers=headers)
    assert e_res.status_code == 200
    e_data = e_res.json()
    assert e_data["ticket_id"] == real_ticket_id
    assert e_data["status"] == "Escalated"

def test_two_separate_http_requests_creation_and_escalation(client):
    headers = {"X-Customer-ID": "CUST101"}
    req1 = client.post("/support/tickets", json={
        "customer_id": "CUST101",
        "subject": "Order tracking question",
        "description": "Where is my order ORD1001?",
        "priority": "medium"
    }, headers=headers)
    assert req1.status_code == 201
    t_id = req1.json()["ticket_id"]

    req2 = client.get(f"/support/tickets/{t_id}", headers=headers)
    assert req2.status_code == 200
    get_data = req2.json()
    assert get_data["ticket_id"] == t_id
    assert get_data["status"] == "Open"

    req3 = client.post("/support/tickets/escalate", json={
        "ticket_id": t_id,
        "reason": "Customer requested immediate escalation to human"
    }, headers=headers)
    assert req3.status_code == 200
    esc_data = req3.json()
    assert esc_data["ticket_id"] == t_id
    assert esc_data["status"] == "Escalated"

def test_ticket_persistence_across_app_recreation(client):
    headers = {"X-Customer-ID": "CUST101"}
    res1 = client.post("/support/tickets", json={
        "customer_id": "CUST101",
        "subject": "Persistence test ticket",
        "description": "Testing DB persistence",
        "priority": "low"
    }, headers=headers)
    assert res1.status_code == 201
    t_id = res1.json()["ticket_id"]

    from fastapi.testclient import TestClient
    from app.main import app
    from app.database import get_db
    from tests.conftest import TestingSessionLocal

    def _override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = _override_get_db
    with TestClient(app) as fresh_client:
        res_get = fresh_client.post("/support/tickets/status", json={"ticket_id": t_id}, headers=headers)
        assert res_get.status_code == 200
        assert res_get.json()["ticket_id"] == t_id

        res_esc = fresh_client.post("/support/tickets/escalate", json={"ticket_id": f"Ticket #{t_id}"}, headers=headers)
        assert res_esc.status_code == 200
        assert res_esc.json()["status"] == "Escalated"

def test_post_escalate_already_escalated(client):
    headers = {"X-Customer-ID": "CUST101"}
    c_res = client.post("/support/tickets", json={
        "customer_id": "CUST101",
        "description": "Second escalation test"
    }, headers=headers)
    ticket_id = c_res.json()["ticket_id"]

    client.post("/support/tickets/escalate", json={"ticket_id": ticket_id}, headers=headers)

    e2_res = client.post("/support/tickets/escalate", json={"ticket_id": ticket_id}, headers=headers)
    assert e2_res.status_code == 200
    e2_data = e2_res.json()
    assert e2_data["status"] == "Escalated"

def test_post_escalate_invalid_ticket(client):
    response = client.post("/support/tickets/escalate", json={"ticket_id": "TKT99999"}, headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 404
    data = response.json()
    assert "not found" in data["detail"].lower()

def test_create_ticket_and_immediate_escalation(client):
    headers = {"X-Customer-ID": "CUST101"}
    create_res = client.post("/support/tickets", json={
        "customer_id": "CUST101",
        "subject": "Complex Issue",
        "description": "Payment stuck in pending state",
        "priority": "CRITICAL"
    }, headers=headers)
    assert create_res.status_code == 201
    ticket_id = create_res.json()["ticket_id"]

    escalate_res = client.post(f"/support/tickets/{ticket_id}/escalate", json={
        "reason": "Escalated by AI Agent"
    }, headers=headers)
    assert escalate_res.status_code == 200
    esc_data = escalate_res.json()
    assert esc_data["ticket_id"] == ticket_id
    assert esc_data["status"] == "Escalated"

def test_escalate_support_ticket(client):
    response = client.post("/support/tickets/TKT9001/escalate", json={
        "reason": "Payment dispute unconfirmed by automated processor"
    }, headers={"X-Customer-ID": "CUST102"})
    assert response.status_code == 200
    data = response.json()
    assert data["ticket_id"] == "TKT9001"
    assert data["status"] == "Escalated"

def test_unauthenticated_ticket_access(client):
    response = client.post("/support/tickets/status", json={"ticket_id": "TKT9001"})
    assert response.status_code == 401

def test_cross_customer_ticket_forbidden(client):
    # TKT9001 belongs to CUST102; requesting as CUST101
    response = client.post("/support/tickets/status", json={"ticket_id": "TKT9001"}, headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 403
    assert "access denied" in response.json()["detail"].lower()

