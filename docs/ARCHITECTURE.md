# ShopSathi AI — System Architecture & Design Document

**B.Tech CSE Minor Project — MBM University, Jodhpur**  
Mahendra Gurjar (24UCSE4018) · Kailash (24UCSE4014)

---

## 1. System Overview

ShopSathi AI is a full-stack AI-powered e-commerce and customer support platform. It integrates a Vanilla JavaScript Single Page Application frontend, a FastAPI Python backend, a SQLite database via SQLAlchemy ORM, and browser-based AI Chat and Voice assistants — all in one cohesive system.

```
                  +--------------------------------------+
                  |      Customer Browser (SPA)          |
                  |   11 Pages + AI Chat + Voice UI      |
                  +------------------+-------------------+
                                     |
                                     | HTTP + X-Customer-ID
                                     |
                  +------------------v-------------------+
                  |    ShopSathi FastAPI Backend         |
                  |  Products | Orders | Returns         |
                  |  Refunds  | Support | Analytics      |
                  |  Security | Logging | Health         |
                  +------------------+-------------------+
                                     |
                                     | SQLAlchemy ORM
                                     |
                  +------------------v-------------------+
                  |    SQLite Database (shopsathi.db)    |
                  |  7 Tables: customers, products,      |
                  |  orders, returns, refunds,           |
                  |  support_tickets, audit_logs         |
                  +--------------------------------------+
```

---

## 2. AI Assistant Architecture

The Chat Agent and Voice Assistant are built entirely within the browser and ShopSathi backend:

```
User Input (Text or Voice)
         |
         v
processAgentQuery()     ← JavaScript NLP (AiLauncher.js)
         |
   Pattern Matching
   (intent + params)
         |
         v
Backend REST API Call   ← fetch() with X-Customer-ID header
  GET /orders/{id}
  POST /returns
  GET /products/search
  POST /support/tickets
         |
         v
JSON Response           ← FastAPI + SQLAlchemy
         |
         v
Formatted Reply (Chat)  ← Markdown to HTML
     OR
Spoken Reply (Voice)    ← SpeechSynthesis API
```

---

## 3. Intent-to-Function Mapping

| User Intent | AI Tool Called | REST Endpoint | Method | Output |
|---|---|---|---|---|
| Order Tracking | `check_order_status` | `/orders/{order_id}` | GET | Status, delivery date |
| Return Eligibility | `check_return_eligibility` | `/orders/{id}/return-eligibility` | GET | Eligible boolean |
| Request Return | `create_return_request` | `/returns` | POST | Return ID |
| Refund Status | `check_refund_status` | `/orders/{id}/refund` | GET | Refund ID, payout date |
| Product Search | `search_products` | `/products/search` | GET | Matching products |
| Cancel Order | `cancel_order` | `/orders/{id}/cancel` | POST | Cancelled status |
| Create Ticket | `create_support_ticket` | `/support/tickets` | POST | Ticket ID |
| Human Escalation | `escalate_support_ticket` | `/support/tickets/{id}/escalate` | POST | Escalated status |

---

## 4. Database Entity Relationships

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER ||--o{ SUPPORT_TICKET : creates
    PRODUCT ||--o{ ORDER : contains
    ORDER ||--o| RETURN_REQUEST : has
    ORDER ||--o| REFUND : generates
    ORDER ||--o{ SUPPORT_TICKET : references

    CUSTOMER {
        string customer_id PK
        string name
        string phone
        string email
    }

    PRODUCT {
        string product_id PK
        string name
        string category
        float price
        boolean returnable
    }

    ORDER {
        string order_id PK
        string customer_id FK
        string product_id FK
        string status
        datetime order_date
        string expected_delivery
    }

    RETURN_REQUEST {
        string return_id PK
        string order_id FK
        string reason
        string status
    }

    REFUND {
        string refund_id PK
        string order_id FK
        float amount
        string status
    }

    SUPPORT_TICKET {
        string ticket_id PK
        string customer_id FK
        string order_id FK
        string category
        string priority
        string status
        string assigned_to
    }
```

---

## 5. Security Architecture

| Layer | Mechanism | Enforcement |
|---|---|---|
| Authentication | `X-Customer-ID` HTTP header | Required on all private endpoints |
| Authorization | `require_current_customer` FastAPI dependency | 401 if missing, 403 if cross-account |
| Guest Blocking | `CUST105`/`GUEST` identity check | Treated as unauthenticated |
| API Key | `X-API-Key` header + env var | Optional; enforced if `SHOP_SATHI_API_KEY` is set |
| Error masking | Global exception handler | 500 response with no stack trace |
| SQL Injection | SQLAlchemy ORM parameterized queries | Automatic |
| Secrets | All keys in `.env` only | Never in frontend code or git commits |

---

## 6. Order Management & Cancellation Workflow

```mermaid
flowchart TD
    A["Customer Places Order"] --> B["Processing"]
    B --> C["Confirmed"]
    C --> D["Packed"]
    D --> E["Shipped"]
    E --> F["Out for Delivery"]
    F --> G["Delivered"]

    B -- "Cancel Request (Allowed)" --> H["Cancelled"]
    C -- "Cancel Request (Allowed)" --> H
    D -- "Cancel Request" --> I["HTTP 400 Blocked: Dispatch Started"]
    E -- "Cancel Request" --> I
    F -- "Cancel Request" --> I
    G -- "Cancel Request" --> I
```

---

## 7. Return & Refund Evaluation Workflow

```mermaid
flowchart TD
    Start["Customer Requests Return for Delivered Order"] --> ChkHygiene{"Product Returnable? (e.g. PRD105 Hygiene Check)"}
    ChkHygiene -- "No (returnable=False)" --> RejectHygiene["Reject: Non-returnable hygiene item"]
    ChkHygiene -- "Yes" --> ChkTime{"Delivered <= 7 Days Ago?"}
    ChkTime -- "No (> 7 Days)" --> RejectTime["Reject: Exceeded 7-day policy window"]
    ChkTime -- "Yes (<= 7 Days)" --> Approve["Approve: Create ReturnRequest (RETXXXX)"]
    Approve --> Pickup["Schedule Courier Pickup (24-48 hrs)"]
    Pickup --> ItemReceived["Item Returned & Verified"]
    ItemReceived --> RefundInit["Initiate Refund Payout (REFXXXX)"]
    RefundInit --> RefundComplete["Amount Credited to Customer Source Account"]
```

---

## 8. AI-to-Human Support Escalation Pipeline

```mermaid
flowchart LR
    Customer["Customer Issue"] --> NLP["Chat / Voice Agent NLP"]
    NLP --> ToolExec{"Can AI resolve via Tool?"}
    ToolExec -- "Yes" --> Reply["Automated Resolution & Ground-truth Reply"]
    ToolExec -- "No / Complex Dispute" --> CreateTkt["create_support_ticket (High Priority)"]
    CreateTkt --> Escalate["escalate_support_ticket (Status: Escalated)"]
    Escalate --> Human["Tier 2 Human Support Manager Assigned"]
    Human --> Contact["Human Representative Contacts Customer"]
```

