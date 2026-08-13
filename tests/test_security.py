import os
import pytest
from fastapi.testclient import TestClient

def test_api_key_auth_bypassed_when_unset(client):
    # Ensure env var is clear
    if "SHOP_SATHI_API_KEY" in os.environ:
        del os.environ["SHOP_SATHI_API_KEY"]

    response = client.get("/orders/ORD1001")
    assert response.status_code == 200


def test_api_key_auth_enforced_when_set(client):
    test_key = "test_secret_key_12345"
    os.environ["SHOP_SATHI_API_KEY"] = test_key
    try:
        # Request without header -> 401 Unauthorized
        res_no_key = client.get("/orders/ORD1001")
        assert res_no_key.status_code == 401
        assert "invalid or missing" in res_no_key.json()["detail"].lower()

        # Request with wrong header -> 401 Unauthorized
        res_wrong_key = client.get("/orders/ORD1001", headers={"X-API-Key": "wrong_key"})
        assert res_wrong_key.status_code == 401

        # Request with correct header -> 200 OK
        res_valid_key = client.get("/orders/ORD1001", headers={"X-API-Key": test_key})
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
