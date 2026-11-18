# ShopSathi AI — An AI-Powered E-Commerce and Customer Support Platform

> **B.Tech Computer Science and Engineering Minor Project — MBM University, Jodhpur**

[![Backend Tests](https://img.shields.io/badge/Backend%20Pytest-80%2F80%20Passed-16a34a?style=flat-square&logo=pytest)](https://github.com/Mahendra7073/shopsathi-ai)
[![Frontend AI Tests](https://img.shields.io/badge/Frontend%20AI-55%2F55%20Passed-2563eb?style=flat-square&logo=node.js)](https://github.com/Mahendra7073/shopsathi-ai)
[![Smoke Tests](https://img.shields.io/badge/API%20Smoke-10%2F10%20Passed-06b6d4?style=flat-square)](https://github.com/Mahendra7073/shopsathi-ai)
[![Production Live](https://img.shields.io/badge/Production-Live%20on%20Render-8b5cf6?style=flat-square&logo=render)](https://shopsathi-ai.onrender.com/app/)

---

## Academic Project Details

| Academic Field | Information |
|---|---|
| **Project Title** | ShopSathi AI: An AI-Powered E-Commerce and Customer Support Platform |
| **Project Type** | B.Tech Computer Science and Engineering Minor Project |
| **Institution** | MBM University, Jodhpur |
| **Department** | Department of Computer Science and Engineering |
| **Semester** | Semester VII |
| **Academic Year** | 2026 |
| **Developer 1** | **Mahendra Gurjar** — Roll No. 24UCSE4018 |
| **Developer 2** | **Kailash** — Roll No. 24UCSE4014 |
| **Repository** | [https://github.com/Mahendra7073/shopsathi-ai](https://github.com/Mahendra7073/shopsathi-ai) |

---

## Abstract

**ShopSathi AI** (*"Shopping Companion"*) is a full-stack, AI-driven e-commerce and customer support platform that integrates an online retail shopping workflow with autonomous customer support assistants. The platform enables shoppers to discover catalog products, manage persistent shopping carts, submit orders, track shipments in real time, evaluate 7-day return policy eligibility, look up refund payouts, and request human assistance.

Built with **FastAPI**, **SQLAlchemy ORM**, **SQLite**, **Vite**, and **Vanilla JavaScript ES6**, ShopSathi pairs full e-commerce operations with an in-browser **Multilingual Chat Agent** (English, Hindi, Hinglish) and a **Real-Time Voice Assistant** powered by the W3C Web Speech API. The assistants execute live backend REST API tools deterministically without hallucination, while strict server-side authorization boundaries enforce zero cross-customer data leakage.

---

## 1. Problem Statement

Modern e-commerce platforms suffer from major customer service bottlenecks:
1. **Disjointed User Journeys**: Customers must navigate across disparate interfaces for product discovery, order tracking portals, return forms, and detached help desks.
2. **Static Scripted Chatbots**: Traditional e-commerce bots rely on static FAQs or ungrounded generative models that cannot execute transactions (such as cancellations or return requests) and risk hallucinating fake tracking numbers or policy terms.
3. **Dead-End Frustrations**: When an order dispute arises (e.g. duplicate payment deductions), bots trap shoppers in loops rather than cleanly routing context to human supervisors.
4. **Language & Accessibility Barriers**: Millions of Indian consumers communicate in Hindi, Hinglish, or prefer natural conversational voice calls over typing lengthy text.
5. **Customer Data Privacy Risks**: Loose authorization often leaks order records and customer contact details across user sessions.

---

## 2. Project Objectives

The key engineering objectives of ShopSathi AI are:
1. **Full-Stack E-Commerce Engine**: Develop a responsive Single Page Application (11 views) covering catalog browsing, debounced search, shopping cart, checkout, order tracking, returns, and customer profiles.
2. **Deterministic Autonomous Agent**: Build an agentic NLP engine that extracts intents and parameters across English, Hindi, and Hinglish, autonomously executing live backend REST API tools.
3. **Browser Voice Assistant**: Integrate the W3C Web Speech API (`SpeechRecognition` + `SpeechSynthesis`) with speech formatting, audio waveform feedback, and sub-140ms sentence streaming.
4. **Strict Customer Data Isolation**: Enforce server-side authorization (`401 Unauthorized` / `403 Forbidden`) ensuring no customer can ever access another user's orders, returns, refunds, or support tickets.
5. **Deterministic Policy Guards**: Implement automated business rules: delivered orders cannot be cancelled; returns must comply with a 7-day post-delivery window; hygiene items are non-returnable.
6. **Tier-2 Human Escalation Pipeline**: Provide autonomous priority assignment (`Critical`, `High`, `Medium`) and automated ticket handoff to human support representatives.
7. **Production Observability & Testing**: Measure sub-millisecond local execution, live sub-35ms backend API roundtrips, structured audit logging, and 100% test coverage across 145 automated tests.

---

## 3. Key Features

* 🛍️ **Complete Retail Experience**: 6 pre-seeded catalog products with category filtering (Electronics, Footwear, Fashion, Home) and dynamic budget sliders.
* 📦 **52-Order Pre-Seeded Dataset**: Comprehensive order histories with live milestones (`Processing`, `Packed`, `Shipped`, `Out for Delivery`, `Delivered`, `Cancelled`).
* 🤖 **Autonomous Multilingual Chatbot**: Slide-out chat drawer understanding English, Hindi, and Hinglish queries with live backend tool calling.
* 🎙️ **Real-Time Browser Voice Assistant**: Hands-free voice conversations using browser-native speech recognition and speech synthesis with spoken ID formatting (`ORD1001` ➔ `O R D 1 0 0 1`).
* 🛡️ **Zero Cross-Customer Data Leakage**: Authenticated `X-Customer-ID` headers verified on every request; cross-account access returns HTTP 403 Forbidden.
* ⚖️ **Automated Return Policy Engine**: Evaluates delivery dates against a strict 7-day cutoff and rejects non-returnable hygiene products.
* 💸 **Real-Time Refund Tracking**: Look up payout states, amounts, and estimated bank credit dates.
* 🎫 **Automated Support Escalation**: Generates structured tickets with priority assignment and assigns complex disputes to Tier-2 human agents.
* 📊 **Operations & Observability Dashboard**: Interactive dark dashboard (`/static/index.html`) displaying real-time metrics and audit logs.
* 🧪 **145 Automated Tests**: 80 backend Pytest tests, 55 frontend AI agent tests, and 10 API smoke tests with 100% pass rate.

---

## 4. Technology Stack

| Layer | Technologies | Purpose |
|---|---|---|
| **Frontend Framework** | Vanilla JavaScript (ES6 Modules), HTML5, CSS3 | Single Page Application (11 views), zero framework bloat |
| **Build & Bundler** | Vite v6.4 | Module bundling, hot reload, production optimization |
| **Backend Framework** | Python 3.12, FastAPI, Uvicorn (ASGI) | High-performance asynchronous REST API server |
| **ORM & Database** | SQLAlchemy ORM, SQLite (`shopsathi.db`) | Relational persistence, automated migrations & seeding |
| **Data Validation** | Pydantic v2 | Request/response schema contracts and type safety |
| **AI NLP & Actions** | Client-side Regex Classifier + REST Tool Calling | Multilingual intent detection (sub-0.05ms) |
| **Voice & Speech** | W3C Web Speech API (`SpeechRecognition`, `SpeechSynthesis`) | Browser-native voice input and audio streaming |
| **Testing** | Pytest, Httpx, Starlette TestClient, Node.js | Automated regression, security, and benchmark suites |
| **DevOps & Cloud** | Docker (`python:3.12-slim`), Render Web Services, GitHub Actions | CI/CD pipeline and cloud container deployment |

---

## 5. System Architecture

ShopSathi AI employs a decoupled 3-tier architecture separating presentation, autonomous agent logic, application business rules, and relational persistence.

```
                        CUSTOMER INTERACTION LAYER
               ┌──────────────────────────────────────────┐
               │  Web Browser SPA (11 Views)              │
               │  Chat Agent (Floating Slideout Drawer)   │
               │  Voice Assistant (W3C Web Speech API)    │
               └────────────────────┬─────────────────────┘
                                    │ HTTP Requests
                                    │ X-Customer-ID Header (Auth)
                                    ▼
                    SHOPSATHI FASTAPI BACKEND LAYER
               ┌──────────────────────────────────────────┐
               │  Routers: Products, Orders, Returns,     │
               │           Refunds, Support, Analytics    │
               │  Security: Customer isolation (401/403)  │
               │  Business Rules: 7-day return policy     │
               │  Tier-2 Human Escalation Pipeline        │
               │  Structured Audit Logging                │
               └────────────────────┬─────────────────────┘
                                    │ SQLAlchemy ORM
                                    ▼
                       DATA PERSISTENCE LAYER
               ┌──────────────────────────────────────────┐
               │  SQLite Database (shopsathi.db)          │
               │  7 Relational Tables                     │
               │  Products, Orders, Customers, Returns,   │
               │  Refunds, Support Tickets, Audit Logs    │
               └──────────────────────────────────────────┘
```

![ShopSathi AI Architecture Diagram](docs/assets/architecture.png)

### End-to-End Autonomous Request Flow

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Customer / Browser
    participant AI as AI Engine (AiLauncher.js)
    participant API as FastAPI Backend (Uvicorn)
    participant DB as SQLite (SQLAlchemy)

    Customer->>AI: Types "Where is my order ORD1001?"
    Note over AI: Local Intent Detection (0.012 ms)<br/>Intent: TRACKING, OrderID: ORD1001
    AI->>API: GET /orders/ORD1001 [Header: X-Customer-ID: CUST101]
    Note over API: Security check (verify ownership)<br/>X-Process-Time: ~4.0 ms
    API->>DB: Query Order(order_id='ORD1001')
    DB-->>API: Order record (Status: Out for Delivery)
    API-->>AI: HTTP 200 JSON Response
    Note over AI: Natural Language Formatting + Quick Action Buttons
    AI-->>Customer: Displays status & delivery timeline
```

---

## 6. Frontend Modules & Views

The frontend is a modular Single Page Application featuring client-side hash routing:

1. **Home (`#/`)**: Hero banner, quick-action navigation cards, value pillars, and floating AI launcher.
2. **Products (`#/products`)**: Real-time debounced catalog search, category buttons, budget price slider, and in-stock badges.
3. **Product Detail (`#/products/:id`)**: High-resolution gallery, specifications, return policy indicator, and "Add to Cart" action.
4. **Cart (`#/cart`)**: Persistent `localStorage` item store, item removal, live total computation, and checkout trigger.
5. **Checkout (`#/checkout`)**: Delivery address input, order summary, and simulated payment modes (COD, UPI, Card).
6. **My Orders (`#/orders`)**: Real-time order list filtered by authenticated customer, with status badges across 52 orders.
7. **Order Detail (`#/orders/:id`)**: 6-step visual delivery timeline (`Order Placed` ➔ `Confirmed` ➔ `Packed` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`) with cancellation guards.
8. **Returns & Refunds (`#/returns`)**: Return submission wizard (eligibility check, reason selector, submission) and live refund payout tracker.
9. **Support Center (`#/support`)**: Ticket generation form, category selector, priority level, and human escalation trigger.
10. **Customer Profile (`#/profile`)**: Profile identity, customer ID, email, phone, role badge, and active order count.
11. **Login Switcher (`#/login`)**: Fast demo profile switcher (`CUST101` Mahendra Gurjar, `CUST102` Admin, `CUST103` HR, `CUST104` Team, `CUST105` Guest).

---

## 7. Backend REST API Modules

The FastAPI backend exposes 18 modular endpoints mounted directly and under the `/api` alias:

```
FastAPI Application
├── /health                        # GET: System uptime and health verification
├── /products                      # GET, POST: Catalog listing and budget search
├── /orders                        # GET, POST: Tracking, status timeline, cancellation
├── /customers                     # GET: Customer profile and order history
├── /returns                       # POST: Return eligibility and request creation
├── /refunds                       # GET, POST: Payout status tracking
├── /support                       # GET, POST: Support tickets and human escalation
├── /analytics                     # GET: Observability metrics and execution audit logs
├── /static                        # Static files: Operations & Admin Dashboard
└── /app                           # Static files: Production Frontend SPA
```

---

## 8. Database Design & Entities

The database utilizes **SQLAlchemy ORM** managing 7 relational tables:

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER ||--o{ SUPPORT_TICKET : creates
    PRODUCT ||--o{ ORDER : contains
    ORDER ||--o| RETURN_REQUEST : generates
    ORDER ||--o| REFUND : triggers
    ORDER ||--o{ SUPPORT_TICKET : references

    CUSTOMER {
        string customer_id PK
        string name
        string email
        string phone
    }

    PRODUCT {
        string product_id PK
        string name
        string category
        float price
        text description
        int stock
        boolean returnable
    }

    ORDER {
        string order_id PK
        string customer_id FK
        string product_id FK
        int quantity
        float amount
        string status
        datetime order_date
        string expected_delivery
        datetime delivered_date
    }

    RETURN_REQUEST {
        string return_id PK
        string order_id FK
        string reason
        string status
        datetime created_at
    }

    REFUND {
        string refund_id PK
        string order_id FK
        float amount
        string status
        datetime initiated_at
        string expected_date
    }

    SUPPORT_TICKET {
        string ticket_id PK
        string customer_id FK
        string order_id FK
        string category
        string priority
        text description
        string status
        string assigned_to
        text reason_for_escalation
        datetime escalated_at
        datetime created_at
    }

    AUDIT_LOG {
        int id PK
        string request_id
        string customer_id
        string intent
        string function_called
        text api_result
        boolean success
        boolean escalation
        float response_time_ms
        datetime timestamp
    }
```

---

## 9. Chatbot & Voice Assistant Functionality

### Multilingual Chat Agent
The Chat Agent operates via an optimized in-browser regex intent classification engine in `AiLauncher.js`:
* **Intent Detection Latency**: `0.001 – 0.040 ms` (V8 precompiled regex).
* **Local Fast-Path Intents**: Greetings, capabilities, thanks, goodbye, and store policies respond in `0.05 – 0.35 ms`.
* **Multilingual Coverage**: Full parsing for English, Hindi (Unicode Devanagari), and Hinglish (transliterated).
* **Autonomous Tool Execution**: Calls backend REST endpoints directly (`/orders`, `/returns`, `/refunds`, `/support`, `/products`).
* **Zero Hallucination**: Grounded 100% in live database JSON responses.

### Real-Time Voice Assistant
The Voice Assistant leverages the browser-native **W3C Web Speech API**:
* **Speech Input**: `SpeechRecognition` / `webkitSpeechRecognition` with live speech-to-text transcript.
* **Speech Output**: `window.speechSynthesis` with character spacing for alphanumeric IDs (`ORD1001` ➔ `O R D 1 0 0 1`, `₹2499` ➔ `2499 rupees`).
* **Time-to-First-Audio**: Punctuation-based sentence chunking begins audio playback in under `140 ms`.
* **Acoustic Mutex Lock**: Speech recognition is automatically stopped while audio is playing, eliminating self-hearing acoustic feedback loops.

---

## 10. Authentication & Customer Data Privacy

```mermaid
flowchart TD
    Req[Incoming HTTP Request] --> CheckAuth{Has X-Customer-ID?}
    CheckAuth -- No / Empty --> PubCheck{Is Public Route?<br/>health, products}
    PubCheck -- Yes --> Allow[Serve 200 OK]
    PubCheck -- No --> Deny401[HTTP 401 Unauthorized]

    CheckAuth -- Yes --> GuestCheck{Is CUST105 Guest?}
    GuestCheck -- Yes --> Deny401
    GuestCheck -- No --> OwnerCheck{Does Resource Belong<br/>to Customer?}
    OwnerCheck -- No --> Deny403[HTTP 403 Forbidden<br/>Access Restricted]
    OwnerCheck -- Yes --> Allow
```

1. **Header-Based Authentication**: Private customer endpoints require the `X-Customer-ID` header.
2. **Strict Cross-Customer Isolation**: Attempting to query an order, return, refund, or ticket belonging to another customer returns **HTTP 403 Forbidden**.
3. **Guest Session Protection**: Guest users (`CUST105`) can browse products, but cannot view orders or request returns without logging in (**HTTP 401 Unauthorized**).
4. **Selective Cache Protection**: Catalog GET requests are cached in memory for 60 seconds (`0.002 ms` warm hits), but customer account data is **strictly never cached**.
5. **Zero Client Secrets**: No API keys, database credentials, or private tokens are packaged into client bundles or public repositories.

---

## 11. Installation & Local Setup

### Prerequisites
* Python 3.11 or 3.12
* Node.js v18 or v20+
* Git

### Step 1: Clone Repository
```bash
git clone https://github.com/Mahendra7073/shopsathi-ai.git
cd shopsathi-ai
```

### Step 2: Set Up Python Backend
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Configure Environment Variables
```bash
cp .env.example .env
```

### Step 4: Run FastAPI Backend
```bash
python -m uvicorn app.main:app --reload --port 8000
```
On startup, `seed_db()` automatically creates `shopsathi.db` with 52 orders, 5 customer profiles, 6 products, 3 refunds, and 6 tickets.

### Step 5: (Optional) Run Frontend in Dev Mode
```bash
cd frontend
npm install
npm run dev
```
Frontend development server starts at `http://localhost:5173`.
The production built SPA is also served directly by FastAPI at `http://localhost:8000/app/`.

---

## 12. Testing & Verified Results

The repository features a multi-tiered automated testing suite with **145 total tests (100% pass rate)**:

```text
======================================================================
1. BACKEND PYTEST SUITE (80 Tests)
   Command: pytest tests/ -v
   Result:  80 passed, 1 warning in 1.82s (100% Pass)
======================================================================
2. FRONTEND AI AGENT QA SUITE (55 Tests)
   Command: cd frontend && node test_ai_agent.js
   Result:  🎯 QA TEST SUMMARY: 55 PASSED | 0 FAILED | 55 TOTAL
======================================================================
3. BACKEND API SMOKE TESTS (10 Scenarios)
   Command: python scripts/smoke_test.py
   Result:  🎯 All 10 Smoke Tests PASSED successfully!
======================================================================
4. LIVE BACKEND PERFORMANCE BENCHMARK (100 Requests)
   Command: python scripts/benchmark_backend.py
   Result:  100 / 100 HTTP 200 OK
            Average Roundtrip Latency: 20.32 ms
            Median Roundtrip Latency:  22.09 ms
            p95 Roundtrip Latency:     34.77 ms
            Target: 100% UNDER 500 ms (PASS)
======================================================================
5. FRONTEND VITE PRODUCTION BUILD
   Command: cd frontend && npm run build
   Result:  ✓ built in 460ms (130.03 kB JS bundle, 0 errors)
======================================================================
TOTAL AUTOMATED TESTS: 145 / 145 PASSED (100% GREEN)
======================================================================
```

---

## 13. Live Deployment Links

* 🛍️ **Production Web Application**: [https://shopsathi-ai.onrender.com/app/](https://shopsathi-ai.onrender.com/app/)
* 📊 **Operations & Admin Dashboard**: [https://shopsathi-ai.onrender.com/static/index.html](https://shopsathi-ai.onrender.com/static/index.html)
* 📖 **Interactive Swagger API Documentation**: [https://shopsathi-ai.onrender.com/docs](https://shopsathi-ai.onrender.com/docs)
* 🩺 **Uptime Health Check API**: [https://shopsathi-ai.onrender.com/health](https://shopsathi-ai.onrender.com/health)
* 🐙 **GitHub Repository**: [https://github.com/Mahendra7073/shopsathi-ai](https://github.com/Mahendra7073/shopsathi-ai)

### Pre-Seeded Demo Login Personas

| Customer ID | Name | Role | Purpose |
|---|---|---|---|
| `CUST101` | **Mahendra Gurjar** | Customer / Owner Demo | Primary demo profile (`ORD1001` Out for Delivery) |
| `CUST102` | **ShopSathi Admin** | Administrator | Orders `ORD1002` (Delivered) & `ORD1005` (Processing) |
| `CUST103` | **ShopSathi HR** | HR / Operations | Return testing profile (`ORD1003` Delivered within 7 days) |
| `CUST104` | **ShopSathi Team** | Support Team | Order testing profile (`ORD1020` Packed, `ORD1050` Cancelled) |
| `CUST105` | **Guest** | Guest Session | View-only storefront browsing (Account access blocked) |

---

## 14. Screenshots of Working Application

Genuine screenshots captured from the running application:

| View | Screenshot | Route / Interface |
|---|---|---|
| **Home Page** | ![Home](docs/screenshots/latest/01-home.png) | `#/` |
| **Product Catalog** | ![Products](docs/screenshots/latest/02-products.png) | `#/products` |
| **Product Detail** | ![Product Detail](docs/screenshots/latest/03-product-detail.png) | `#/products/PROD001` |
| **Shopping Cart** | ![Cart](docs/screenshots/latest/04-cart.png) | `#/cart` |
| **Checkout Flow** | ![Checkout](docs/screenshots/latest/05-checkout.png) | `#/checkout` |
| **Order History** | ![Orders](docs/screenshots/latest/06-orders.png) | `#/orders` |
| **Order Timeline** | ![Order Detail](docs/screenshots/latest/07-order-detail.png) | `#/orders/ORD1001` |
| **Returns & Policy** | ![Returns](docs/screenshots/latest/08-returns.png) | `#/returns` |
| **Refund Tracker** | ![Refund Status](docs/screenshots/latest/09-refund-status.png) | `#/returns` |
| **Customer Support** | ![Support](docs/screenshots/latest/10-support.png) | `#/support` |
| **Customer Profile** | ![Profile](docs/screenshots/latest/11-profile.png) | `#/profile` |
| **Profile Switcher** | ![Login](docs/screenshots/latest/12-login.png) | `#/login` |
| **Chat Assistant** | ![Chat Agent](docs/screenshots/latest/13-chat-assistant.png) | Floating drawer (`#ai-panel`) |
| **Voice Assistant** | ![Voice Agent](docs/screenshots/latest/14-voice-assistant.png) | Audio modal (`#ai-voice-panel`) |
| **Admin Dashboard** | ![Admin](docs/screenshots/latest/15-admin-dashboard.png) | `/static/index.html` |
| **Swagger API Docs** | ![Swagger](docs/screenshots/latest/16-swagger-docs.png) | `/docs` |
| **Mobile Home** | ![Mobile Home](docs/screenshots/latest/17-mobile-home.png) | Mobile viewport (375×812) |
| **Mobile Orders** | ![Mobile Orders](docs/screenshots/latest/18-mobile-orders.png) | Mobile viewport (375×812) |

---

## 15. Limitations & Future Scope

### Current Limitations
1. **Rule-Based NLP Intent Engine**: Unstructured queries outside supported intents fall back to guided navigation prompts rather than open-domain conversation.
2. **Browser Voice Dependency**: The Voice Assistant relies on the W3C Web Speech API, which requires browser microphone permissions and functions most reliably in Chromium browsers.
3. **Single-Node SQLite**: Suitable for minor project evaluation and single-instance deployments; high-concurrency production requires PostgreSQL.

### Future Scope
1. **Google Gemini LLM Integration**: Incorporate server-side Google Gemini Flash models as an optional hybrid intelligence layer for open-ended conversation.
2. **Multi-Modal Vision Inspection**: Allow customers to upload packaging photos for automated damage classification and instant return approval.
3. **Omni-Channel Messaging**: Integrate the ShopSathi assistant into official WhatsApp Business and Telegram bots.
4. **Live WebRTC Audio Handoff**: Enable direct browser-to-browser voice transfer from the AI Voice Assistant to a human support supervisor.
5. **Real Payment Gateway**: Integrate Razorpay or Stripe for real credit card and UPI transactions.

---

## 16. Repository Structure

```
ShopSathi-AI-Minor-Project/
├── .github/
│   └── workflows/
│       └── ci.yml                # Automated GitHub Actions CI workflow (Backend + Frontend)
├── app/                          # FastAPI backend application
│   ├── main.py                   # App initialization, CORS, middleware, router mount
│   ├── models.py                 # 7 SQLAlchemy ORM database models
│   ├── schemas.py                # Pydantic v2 validation contracts
│   ├── core/                     # Core infrastructure & system dependencies
│   │   ├── database.py           # SQLAlchemy database engine and sessionmaker
│   │   ├── security.py           # Customer authentication & API key enforcement
│   │   └── logging_config.py     # Structured audit logging & observability
│   ├── services/                 # Business & data initialization services
│   │   └── seed_data.py          # Initial dataset seeding (52 orders, 5 profiles)
│   ├── static/                   # Interactive Admin & Operations Dashboard
│   │   ├── index.html
│   │   ├── style.css
│   │   └── app.js
│   └── routers/                  # 8 modular REST API routers
│       ├── health.py             # GET /health
│       ├── products.py           # Product catalog & price filtering
│       ├── orders.py             # Order tracking & cancellation
│       ├── customers.py          # Customer profile & account orders
│       ├── returns.py            # Return eligibility & creation
│       ├── refunds.py            # Refund status tracking
│       ├── support.py            # Support tickets & human escalation
│       └── analytics.py          # Observability & AI metrics
├── frontend/                     # Vite Single Page Application (SPA)
│   ├── index.html                # Application entry HTML
│   ├── vite.config.js            # Vite build configuration
│   ├── package.json              # Frontend manifest with npm test
│   ├── package-lock.json         # Dependency lockfile
│   ├── test_ai_agent.js          # Root delegation entry point for QA test suite
│   ├── tests/                    # Frontend test suite
│   │   └── test_ai_agent.js      # 55-test Chat & Voice Agent automated QA suite
│   ├── public/
│   │   └── favicon.svg           # Application favicon
│   ├── dist/                     # Production build (served by backend /app/)
│   │   ├── index.html
│   │   ├── favicon.svg
│   │   └── assets/
│   │       ├── index-D-L9Uho_.css
│   │       └── index-CxDOEQ9m.js
│   └── src/                      # Frontend JavaScript source
│       ├── main.js               # Bootstrap & route mounting
│       ├── router.js             # Client-side hash router
│       ├── store/                # Reactive state management
│       │   └── index.js          # Cart, user session & local state
│       ├── services/
│       │   └── api.js            # Centralized API service with catalog caching
│       ├── components/           # Category-wise modular UI components
│       │   ├── common/           # Reusable atomic UI (Logo, Modal, Toast)
│       │   ├── layout/           # Page structural components (Header, Footer)
│       │   └── ai/               # AI Assistant interface (AiLauncher)
│       ├── pages/                # 11 complete views (Home, Cart, Orders, etc.)
│       └── styles/               # Global design tokens and component styles
├── tests/                        # Pytest automated test suite (80 tests)
│   ├── conftest.py               # Shared fixtures & test database setup
│   ├── test_health.py
│   ├── test_products.py
│   ├── test_orders.py
│   ├── test_customers.py
│   ├── test_returns.py
│   ├── test_refunds.py
│   ├── test_support.py
│   ├── test_security.py
│   └── test_analytics.py
├── scripts/                      # Operational & verification scripts
│   ├── benchmark_backend.py      # 100-request live backend performance benchmark
│   ├── capture_latest_screenshots.js # Playwright screenshot capture automation
│   └── smoke_test.py             # Backend health, database & security smoke tests
├── docs/                         # Academic documentation & QA audits
│   ├── ARCHITECTURE.md           # System architecture, data flow & security design
│   ├── DEPLOYMENT.md             # Render, Docker & local deployment guides
│   ├── API_TEST_COMMANDS.md      # Copy-pasteable curl & PowerShell test commands
│   ├── CODEBASE_STRUCTURE_REPORT.md # Comprehensive codebase restructuring report
│   ├── FINAL_POST_RESTRUCTURE_VERIFICATION.md # Final post-restructuring verification audit
│   ├── PRE_PUSH_AUDIT.md         # Final pre-push verification audit report
│   ├── VOICE_ASSISTANT_PERFORMANCE_QA.md  # Voice Agent latency & benchmark audit
│   ├── CHAT_VOICE_AGENT_QA_REPORT.md      # End-to-end Chat & Voice QA audit report
│   ├── REPOSITORY_CLEANUP_REPORT.md       # Repository file audit & cleanup log
│   ├── SHOP_SATHI_KNOWLEDGE_BASE.md       # Domain rules, return policies & FAQs
│   ├── SCREENSHOTS.md            # Screenshot catalog with visual walkthrough
│   ├── assets/                   # Architecture diagram images
│   ├── screenshots/              # Application screenshots
│   │   └── latest/               # 18 genuine high-resolution screenshots
│   ├── WIKI/                     # 20 detailed GitHub wiki pages
│   └── archive/                  # Legacy hackathon documentation (historical record)
├── .env.example                  # Environment configuration template
├── .gitignore                    # Git ignore rules (venv, node_modules, *.db, cache)
├── requirements.txt              # Python production dependencies (7 packages)
├── Dockerfile                    # Containerization manifest
├── Procfile                      # Render/Heroku process configuration
├── render.yaml                   # Infrastructure-as-Code deployment specification
└── README.md                     # Master B.Tech Minor Project documentation
```

---

## 17. Academic Evaluation & Credits

This project was conceived, designed, and implemented as an academic **Minor Project** under the **Bachelor of Technology in Computer Science and Engineering** curriculum at **MBM University, Jodhpur**.

**Developers & Contributors:**
* **Mahendra Gurjar** — Roll No. 24UCSE4018, B.Tech CSE (Semester VII)
* **Kailash** — Roll No. 24UCSE4014, B.Tech CSE (Semester VII)

*Developed for academic and educational evaluation.*
