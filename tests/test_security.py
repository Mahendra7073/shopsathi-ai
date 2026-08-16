import os
import pytest
from fastapi.testclient import TestClient

def test_api_key_auth_bypassed_when_unset(client):
    if "SHOP_SATHI_API_KEY" in os.environ:
        del os.environ["SHOP_SATHI_API_KEY"]

    response = client.get("/orders/ORD1001", headers={"X-Customer-ID": "CUST101"})
    assert response.status_code == 200


def test_api_key_auth_enforced_when_set(client):
    test_key = "test_secret_key_12345"
    os.environ["SHOP_SATHI_API_KEY"] = test_key
    headers_no_key = {"X-Customer-ID": "CUST101"}
    headers_wrong_key = {"X-Customer-ID": "CUST101", "X-API-Key": "wrong_key"}
    headers_valid_key = {"X-Customer-ID": "CUST101", "X-API-Key": test_key}
    try:
        # Request without API key header -> 401 Unauthorized
        res_no_key = client.get("/orders/ORD1001", headers=headers_no_key)
        assert res_no_key.status_code == 401
        assert "invalid or missing x-api-key header" in res_no_key.json()["detail"].lower()

        # Request with wrong API key header -> 401 Unauthorized
        res_wrong_key = client.get("/orders/ORD1001", headers=headers_wrong_key)
        assert res_wrong_key.status_code == 401

        # Request with correct API key header -> 200 OK
        res_valid_key = client.get("/orders/ORD1001", headers=headers_valid_key)
        assert res_valid_key.status_code == 200
        assert res_valid_key.json()["order_id"] == "ORD1001"
    finally:
        del os.environ["SHOP_SATHI_API_KEY"]


def test_public_health_bypasses_auth_always(client):
    os.environ["SHOP_SATHI_API_KEY"] = "test_secret_key_12345"
    try:
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"
    finally:
        del os.environ["SHOP_SATHI_API_KEY"]

