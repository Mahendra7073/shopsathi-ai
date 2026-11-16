# System Architecture

## 🏗️ Architecture Overview

ShopSathi AI is built on a modular 3-tier architecture:

```
                        CUSTOMER INTERACTION LAYER
               ┌──────────────────────────────────────────┐
               │  Web Browser SPA (11 Pages)               │
               │  Chat Agent (Floating Panel)              │
               │  Voice Assistant (Web Speech API)         │
               └───────────────┬──────────────────────────┘
                               │ HTTP Requests
                               │ X-Customer-ID Header (Auth)
                               ▼
                    SHOPSATHI FASTAPI BACKEND LAYER
               ┌──────────────────────────────────────────┐
               │  Routers: Products, Orders, Returns,      │
               │           Refunds, Support, Analytics     │
               │  Security: Customer isolation (403)       │
               │  Business Rules: 7-day return policy      │
               │  Tier-2 Human Escalation Pipeline         │
               │  Structured Audit Logging                 │
               └───────────────┬──────────────────────────┘
                               │ SQLAlchemy ORM
                               ▼
                       DATA PERSISTENCE LAYER
               ┌──────────────────────────────────────────┐
               │  SQLite (Local) / PostgreSQL compatible   │
               │  Products, Orders, Customers, Returns,    │
               │  Refunds, Support Tickets, Audit Logs     │
               └──────────────────────────────────────────┘
```

---

## 🧩 Architectural Layers & Responsibilities

### 1. Presentation Layer (Frontend SPA)
* **Framework**: Vite + Vanilla JavaScript ES6 Modules
* **Responsibilities**: Client-side routing, responsive UI components, live cart store in `localStorage`, floating dual AI launcher (chat + voice), interactive admin dashboard.

### 2. AI Assistant Layer (Browser-Side)
* **Chat Agent**: Rule-based NLP (`processAgentQuery()`) + backend REST API tool-calling
* **Voice Agent**: Browser `SpeechRecognition` API (input) + `SpeechSynthesis` API (output)
* **Responsibilities**: Natural language understanding (English/Hindi/Hinglish), intent classification, parameter extraction, and autonomous tool invocation against the FastAPI backend.

### 3. Application Layer (FastAPI Backend)
* **Framework**: Python 3.12 + FastAPI + Uvicorn
* **Responsibilities**: Business validation rules (e.g. delivered orders cannot be cancelled), 7-day policy calculation, ticket creation & human routing, structured audit logging, and observability metrics.

### 4. Persistence Layer (Database)
* **ORM**: SQLAlchemy ORM with Pydantic v2 schemas
* **Database**: SQLite for development/testing, PostgreSQL compatible for production deployment.

---

## 🔐 Security Architecture

* **Authentication**: `X-Customer-ID` header sent on every authenticated request
* **Authorization**: `require_current_customer` dependency enforces 403 Forbidden on cross-account access
* **Data Isolation**: Each customer can only access their own orders, returns, refunds, and tickets
* **API Key**: Optional `X-API-Key` header verification via `SHOP_SATHI_API_KEY` environment variable
* **Error Masking**: Global exception handler prevents internal stack traces from reaching clients
