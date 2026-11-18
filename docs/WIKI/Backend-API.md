# Backend API Reference

The ShopSathi backend is powered by **FastAPI** and **Uvicorn**, providing structured REST endpoints with Pydantic v2 data validation, SQLAlchemy ORM models, and automatic `/api` route prefix aliases.

---

## 🔌 API Route Catalog (18 Registered Endpoints)

All endpoints are available both directly (e.g. `/health`) and via the `/api` prefix (e.g. `/api/health`).

### 1. Health & Core
* `GET /health`: Service uptime health check.
  * *Response*: `{"status": "healthy", "app_name": "ShopSathi AI", "version": "1.0.0", "timestamp": "..."}`
* `GET /`: Root endpoint returning metadata and documentation links.

### 2. Products (`/products`)
* `GET /products`: Retrieve complete product catalog.
* `GET /products/search?query=shoes&max_price=2000&category=Footwear`: Query-based search with budget and category filters.
* `POST /products/search`: Search products via JSON body `{"query": "shoes", "max_price": 2000}`.
* `GET /products/{product_id}`: Retrieve single product details.

### 3. Orders (`/orders`)
* `GET /orders`: List orders (supports optional `?customer_id=CUST101` and `?status=Processing`).
* `GET /orders/{order_id}`: Get order status and shipping timeline for authenticated customer.
* `POST /orders/lookup`: Order lookup via JSON body `{"order_id": "ORD1001"}`.
* `POST /orders/{order_id}/cancel`: Cancel eligible processing order.
* `POST /orders/cancel`: Cancel order via JSON body `{"order_id": "ORD1005"}`.

### 4. Returns & Refunds (`/orders`, `/returns`, `/refunds`)
* `GET /orders/{order_id}/return-eligibility`: Evaluate 7-day return policy and item returnability.
* `POST /orders/return-eligibility`: Check return eligibility via JSON body `{"order_id": "ORD1003"}`.
* `POST /returns`: Submit return request with payload `{"order_id": "ORD1003", "reason": "Defective item"}`.
* `GET /orders/{order_id}/refund`: Get refund status and payout details.
* `POST /orders/refund-status`: Check refund via JSON body `{"order_id": "ORD1004"}`.

### 5. Support & Escalation (`/support`)
* `POST /support/tickets`: Create a support ticket `{"customer_id": "CUST101", "description": "...", "priority": "High"}`.
* `POST /support/tickets/status`: Check ticket status `{"ticket_id": "TKT9001"}`.
* `GET /support/tickets/{ticket_id}`: Get ticket details by ID.
* `POST /support/tickets/{ticket_id}/escalate`: Escalate ticket to Tier 2 human agent.
* `POST /support/tickets/escalate`: Escalate ticket via JSON body `{"ticket_id": "TKT9001", "reason": "..."}`.

### 6. Customers (`/customers`)
* `GET /customers/{customer_id}`: Retrieve authenticated customer profile.
* `GET /customers/{customer_id}/orders`: List customer order history.

### 7. Observability & Analytics (`/analytics`)
* `GET /analytics/summary`: Aggregate counts for total requests, AI resolution rate, escalation count, and average execution times.

---

## 🏗️ Backend Layer & Directory Architecture

The FastAPI backend is organized into distinct concern-separated modules:

`	ext
app/
├── core/             # Infrastructure foundations
│   ├── database.py   # SQLAlchemy engine, session maker, WAL pragmas
│   ├── security.py   # Customer authentication (X-Customer-ID) & API keys
│   └── logging_config.py # Structured audit logging
├── services/         # Business & data initialization services
│   └── seed_data.py  # Synchronized demo database seeder
├── routers/          # 8 modular REST routers (Products, Orders, Returns, etc.)
├── models.py         # 7 SQLAlchemy ORM declarative models
├── schemas.py        # Pydantic v2 validation contracts
├── static/           # Standalone Operations & Admin Dashboard
└── main.py           # Application initialization, middleware & static mounts
`
