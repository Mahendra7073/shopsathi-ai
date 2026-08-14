# System Architecture

## 🏗️ Architecture Overview

ShopSathi AI is built on a modular 4-tier decoupled architecture:

```
                            CUSTOMER INTERACTION LAYER
                   ┌────────────────────────────────────────┐
                   │  Web Browser SPA  │  PSTN Voice Call   │
                   │    (11 Pages)     │  (+91 8031339824)  │
                   └─────────┬──────────────────┬───────────┘
                             │                  │
                             ▼                  ▼
                         KIPPS.AI AGENTIC ORCHESTRATION LAYER
                   ┌────────────────────────────────────────┐
                   │  Chat Agent (Gemini 3.1 Flash Lite)    │
                   │  Voice Agent (Gemini 2.5 Native Audio) │
                   │  9 Core Autonomous Function Bindings   │
                   └──────────────────┬─────────────────────┘
                                      │ REST API Tool Calls
                                      ▼
                        SHOPSATHI FASTAPI BACKEND LAYER
                   ┌────────────────────────────────────────┐
                   │  Routers: Products, Orders, Returns,   │
                   │           Refunds, Support, Analytics  │
                   │  Deterministic Policy Rules Engine     │
                   │  Tier-2 Human Escalation Pipeline      │
                   └──────────────────┬─────────────────────┘
                                      │ SQLAlchemy ORM
                                      ▼
                             DATA PERSISTENCE LAYER
                   ┌────────────────────────────────────────┐
                   │  SQLite (Local) / PostgreSQL (Prod)    │
                   │  Products, Orders, Customers, Returns, │
                   │  Refunds, Support Tickets, Audit Logs  │
                   └────────────────────────────────────────┘
```

---

## 🧩 Architectural Layers & Responsibilities

### 1. Presentation Layer (Frontend SPA)
* **Framework**: Vite + Vanilla JavaScript ES6
* **Responsibilities**: Client-side routing, responsive UI components, live cart store in `localStorage`, floating dual AI launcher, interactive dark admin dashboard.

### 2. Orchestration Layer (KIPPS.AI & Gemini)
* **Models**: Gemini 3.1 Flash Lite (Chat) and Gemini 2.5 Flash Native Audio Preview (Voice).
* **Responsibilities**: Natural language processing, language translation (English, Hindi, Hinglish), intent classification, parameter extraction, and autonomous tool invocation.

### 3. Application Layer (FastAPI Backend)
* **Framework**: Python 3.12 + FastAPI + Uvicorn
* **Responsibilities**: Business validation rules (e.g. delivered orders cannot be cancelled), 7-day policy calculation, ticket creation & human routing, structured audit logging, and observability metrics.

### 4. Persistence Layer (Database)
* **ORM**: SQLAlchemy ORM with Pydantic v2 schemas
* **Database**: SQLite for development/testing, PostgreSQL compatible for production deployment.
