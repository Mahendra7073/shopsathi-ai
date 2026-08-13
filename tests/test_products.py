def test_list_products(client):
    response = client.get("/products")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 5

def test_get_product_by_id(client):
    response = client.get("/products/PRD101")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "AirPro Wireless Noise-Cancelling Headphones"
    assert data["category"] == "Electronics"

def test_search_products_query_and_price(client):
    response = client.get("/products/search?query=running&max_price=2000")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert data[0]["product_id"] == "PRD102"
    assert data[0]["price"] <= 2000.0

def test_search_products_no_match(client):
    response = client.get("/products/search?query=laptop&max_price=500")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 0
