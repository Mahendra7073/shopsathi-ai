def test_analytics_summary(client):
    response = client.get("/analytics/summary")
    assert response.status_code == 200
    data = response.json()
    assert "total_requests" in data
    assert "resolved_by_ai" in data
    assert "escalated_to_human" in data
    assert "recent_logs" in data
    assert isinstance(data["recent_logs"], list)
