# ShopSathi AI — Agentic E-Commerce Customer Support System

> **Tagline**: *"AI customer support that speaks, acts, and knows when to call a human."*  
> **Hackathon**: Kipps.AI Developer Hackathon 2026

---

## 📖 1. Overview & Problem Statement

E-commerce businesses struggle with high support call volumes, delayed resolutions, and rigid chatbots that can only answer static FAQs. Traditional chatbots fail when customers ask complex operational queries like *"Where is my order?"*, *"Can I return this size?"*, or *"My payment was deducted but order failed!"*.

**ShopSathi AI** solves this by acting as a **durable multi-agent AI system** capable of:
1. **Understanding Intent** in English, Hindi, and Hinglish.
2. **Taking Real-Time Actions** via API tool calls (order tracking, return request submission, refund checking, order cancellation).
3. **Reasoning Over Policies** using a trained Kipps.AI Knowledge Base.
4. **Escalating to Humans** automatically when complex, high-friction issues arise.

---

## 🏗️ 2. Architecture & Separation of Concerns

```
Customer (Chat / Voice)
       │
┌──────┴─────────────────────────────────┐
│     Kipps.AI Agent & Workflow Layer    │
│  (Chat Agent, Voice Agent, KB, Tools) │
└──────┬─────────────────────────────────┘
       │ REST (HTTP JSON)
┌──────▼─────────────────────────────────┐
│       ShopSathi FastAPI Backend        │
│  (REST APIs, Business Rules, DB, Logs) │
└──────┬─────────────────────────────────┘
       │
┌──────┴─────────────────────────────────┐
│      SQLite / PostgreSQL Database       │
│ (Orders, Returns, Refunds, Support Tkts)│
└────────────────────────────────────────┘
```

Kipps.AI serves as the primary **AI reasoning/orchestration layer**, while the ShopSathi FastAPI backend provides **deterministic business data, APIs, database persistence, and observability**.

---

## 🚀 3. Key Features & Capabilities

* **Multi-Channel AI**: Works seamlessly across **Kipps Chat Agent** and **Kipps Voice Agent**.
* **Order Tracking (`check_order_status`)**: Fetches live shipping status and delivery dates.
* **Return Management (`check_return_eligibility`, `create_return_request`)**: Automatically enforces 7-day return policies and non-returnable hygiene rules.
* **Refund Lookup (`check_refund_status`)**: Tracks refund transaction IDs and expected bank payout dates.
* **Order Cancellation (`cancel_order`)**: Cancels eligible processing orders in real time.
* **Product Catalog Search (`search_products`)**: Filters catalog by query text, budget constraints (max price), and category.
* **Human Escalation Workflow (`create_support_ticket`, `escalate_support_ticket`)**: Automatically generates support tickets and assigns high-priority disputes to Tier 2 human agents.
* **Observability & Analytics (`GET /analytics/summary`)**: Provides system resolution rates, latency stats, and structured audit logs.
* **Interactive Dark Dashboard**: Serves live system monitoring and direct API tool testing interface at `/static/index.html`.

---

## 🛠️ 4. Tech Stack

* **Backend**: Python 3.11+, FastAPI, Uvicorn
* **Database & ORM**: SQLite (Development) / PostgreSQL compatible, SQLAlchemy ORM
* **Data Validation**: Pydantic v2
* **Testing**: Pytest, TestClient, HTTPX
* **Frontend Dashboard**: Vanilla HTML5 / Modern CSS3 (Dark Theme) / JavaScript ES6
* **AI & Orchestration**: Kipps.AI (Chat Agent, Voice Agent, Knowledge Base, Functions)

---

## 🔌 5. REST API Endpoints Summary

| Method | Endpoint | Purpose | Kipps Function Mapped |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Service uptime health check | System Check |
| `GET` | `/orders/{order_id}` | Retrieve order status & delivery details | `check_order_status` |
| `POST` | `/orders/{order_id}/cancel` | Cancel an eligible processing order | `cancel_order` |
| `GET` | `/customers/{customer_id}` | Retrieve customer profile | Customer Lookup |
| `GET` | `/products` | List all catalog products | Catalog Listing |
| `GET` | `/products/search` | Search products by query, price, category | `search_products` |
| `GET` | `/products/{product_id}` | Get single product details | Product Detail |
| `GET` | `/orders/{order_id}/return-eligibility` | Verify 7-day policy & item returnability | `check_return_eligibility` |
| `POST` | `/returns` | Submit return request | `create_return_request` |
| `GET` | `/orders/{order_id}/refund` | Check status of refund payout | `check_refund_status` |
| `POST` | `/support/tickets` | Create support ticket | `create_support_ticket` |
| `GET` | `/support/tickets/{ticket_id}` | Retrieve ticket details | Ticket Lookup |
| `POST` | `/support/tickets/{ticket_id}/escalate` | Escalate unresolved ticket to human | `escalate_support_ticket` |
| `GET` | `/analytics/summary` | Retrieve system observability metrics | Observability Dashboard |

---

## 💻 6. Quick Start & Local Execution

### 1. Environment Setup
```bash
# Clone repository
cd "c:\Users\ASUS\kipps ai hackathon"

# Create and activate Python virtual environment
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Run FastAPI Backend Server
```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

* **Swagger API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
* **Interactive Dashboard**: [http://localhost:8000/static/index.html](http://localhost:8000/static/index.html)

---

## 🧪 7. Running Automated Tests

Run the full Pytest test suite covering all 12+ API cases:
```bash
.\venv\Scripts\pytest -v
```

---

## 📁 8. Project Documentation Directory

Detailed guides are provided inside the `docs/` folder:
* 📄 [PROJECT_AUDIT.md](file:///c:/Users/ASUS/kipps%20ai%20hackathon/docs/PROJECT_AUDIT.md) — Initial audit report & stack decisions.
* 📄 [ARCHITECTURE.md](file:///c:/Users/ASUS/kipps%20ai%20hackathon/docs/ARCHITECTURE.md) — System architecture & data model relationships.
* 📄 [SHOP_SATHI_KNOWLEDGE_BASE.md](file:///c:/Users/ASUS/kipps%20ai%20hackathon/docs/SHOP_SATHI_KNOWLEDGE_BASE.md) — Knowledge Base text for Kipps upload.
* 📄 [KIPPS_CHAT_AGENT_PROMPT.md](file:///c:/Users/ASUS/kipps%20ai%20hackathon/docs/KIPPS_CHAT_AGENT_PROMPT.md) — Chat Agent prompt instructions.
* 📄 [KIPPS_VOICE_AGENT_PROMPT.md](file:///c:/Users/ASUS/kipps%20ai%20hackathon/docs/KIPPS_VOICE_AGENT_PROMPT.md) — Voice Agent prompt instructions.
* 📄 [KIPPS_SETUP.md](file:///c:/Users/ASUS/kipps%20ai%20hackathon/docs/KIPPS_SETUP.md) — Step-by-step Kipps platform configuration manual.
* 📄 [DEMO_SCRIPT.md](file:///c:/Users/ASUS/kipps%20ai%20hackathon/docs/DEMO_SCRIPT.md) — 3-5 minute live hackathon demonstration script.
