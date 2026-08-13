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
