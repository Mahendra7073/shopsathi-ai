# ShopSathi AI: An AI-Powered E-Commerce and Customer Support Platform

> **B.Tech CSE Minor Project — MBM University, Jodhpur**

| Field | Details |
|---|---|
| **Project Title** | ShopSathi AI: An AI-Powered E-Commerce and Customer Support Platform |
| **Project Type** | B.Tech CSE Minor Project |
| **Team Member 1** | Mahendra Gurjar — 24UCSE4018 |
| **Team Member 2** | Kailash — 24UCSE4014 |
| **University** | MBM University, Jodhpur |
| **Department** | Computer Science and Engineering |
| **Academic Year** | 2024–2026 |

---

## Abstract

ShopSathi AI is an AI-powered e-commerce and customer support platform that integrates a complete online shopping experience with an intelligent AI assistant. The system enables customers to browse products, place orders, track shipments, initiate returns, and manage refunds through an interactive web interface. The platform includes an AI Chat Agent and a Voice Assistant that can answer product queries, check order status, process returns, and escalate complex issues to human support agents — all in real time.

The backend is built using **FastAPI** with **SQLAlchemy ORM** and **SQLite**, providing a robust REST API layer. The frontend is a **single-page application (SPA)** built with **Vanilla JavaScript** and **Vite**. The AI assistant uses **rule-based NLP** combined with **backend function/tool calling** to handle customer queries without depending on a third-party AI service for the core functionality. All customer data is strictly isolated using server-side authorization, and no private data is accessible across customer accounts.

---

## 1. Introduction

The rapid growth of e-commerce has created a massive demand for scalable, responsive, and intelligent customer support systems. Traditional customer service approaches — such as email, phone calls, and human-only support centers — are expensive, slow, and unable to handle the volume of customer queries modern platforms generate.

ShopSathi AI addresses this problem by combining a fully functional e-commerce web platform with an AI-powered customer support layer. The system allows customers to self-serve for common tasks (tracking orders, returning items, checking refunds) while routing complex issues to human agents when needed.

This project demonstrates practical skills in full-stack web development, REST API design, database modeling, authentication, and AI-integrated application development.

---

## 2. Problem Statement

Modern e-commerce platforms face the following challenges:

1. **High Support Volume**: Customers frequently ask repetitive questions about order status, delivery, returns, and refunds — consuming large amounts of human agent time.
2. **Slow Response Times**: Phone and email support cannot provide instant answers at scale, leading to customer dissatisfaction.
3. **Language Barriers**: Many Indian customers prefer to interact in Hindi or Hinglish rather than formal English, making standard chatbots ineffective.
4. **Data Privacy Risks**: Without proper server-side authorization, customer data may be exposed across accounts.
5. **Disconnected Systems**: E-commerce features (product catalog, cart, checkout) and support features (tickets, escalation) often exist as separate systems, creating poor user experiences.

---

## 3. Objectives

The primary objectives of this project are:

1. Build a complete e-commerce web platform with product listing, search, cart, checkout, order tracking, and return/refund management.
2. Develop an AI Chat Assistant capable of answering product queries, tracking orders, initiating returns, checking refunds, and creating support tickets using backend API tool-calling.
3. Develop a Voice Assistant that uses the browser's Web Speech API for voice input and text-to-speech output, integrated with the same backend logic as the Chat Agent.
4. Implement a Customer Support module with ticket creation, ticket status tracking, and human-agent escalation workflows.
5. Enforce strict customer-wise data isolation so that no customer can access another customer's orders, returns, or ticket data.
6. Provide a clean, documented REST API backend suitable for integration with external AI services.
7. Produce comprehensive academic documentation for college submission.

---

## 4. Scope of the Project

### In Scope
- E-commerce module: Home page, product listing, product detail, search, cart, checkout, order placement and tracking.
- Customer support module: Ticket creation, ticket tracking, escalation, return and refund management.
- AI Assistant module: Chat agent and voice agent with backend function/tool calling.
- Security module: Header-based customer authentication, server-side data isolation, unauthorized-access protection.
- Backend and database module: FastAPI, SQLAlchemy, SQLite, Pydantic validation, structured logging, analytics.

### Out of Scope
- Real payment gateway integration (simulated in demo data).
- Mobile native application (web responsive only).
- Real-time cloud database synchronization.
- Full production AI natural language model (Gemini API integration is documented but optional).

---

## 5. Existing System

Traditional e-commerce customer support systems typically use:
- Email ticketing (slow response, no real-time capability)
- Phone call centers (expensive, limited hours)
- Simple FAQ chatbots (rule-based only, cannot take real actions)
- Separate portals for shopping and support

**Drawbacks of existing systems:**
- High operational cost due to human-intensive support
- Inability to handle high query volumes during peak hours (sales, festive seasons)
- No integration between shopping actions and support actions
- Lack of multi-language support for Indian users
- No self-service capability for order management

---

## 6. Proposed System

ShopSathi AI proposes an integrated platform where:
- Customers can browse, shop, and manage orders on a single platform.
- An AI Chat Agent handles common queries and takes real actions (create return, check refund, cancel order) using backend function-calling over REST APIs.
- A Voice Assistant lets customers speak their queries and receive spoken answers.
- Complex issues are automatically escalated to human support agents via support tickets.
- All customer data remains isolated and secure through server-side authorization.

**Advantages over existing systems:**
- Instant AI-powered responses reduce average handling time from minutes to under 2 seconds.
- Multilingual support (English, Hindi, Hinglish) using language-agnostic API identifiers (e.g. `ORD1001`).
- Integrated e-commerce + support in a single web application.
- No external AI service dependency required for core functionality.
- Secure, customer-isolated data architecture prevents privacy violations.

---

## 7. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Customer Browser (SPA)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │
│  │  Pages   │  │  Store   │  │  API     │  │  AI Launcher   │  │
│  │ Home     │  │ Cart     │  │ Service  │  │  Chat Panel    │  │
│  │ Products │  │ User     │  │ Layer    │  │  Voice Panel   │  │
│  │ Orders   │  │ Session  │  │ (fetch)  │  │  NLP Engine    │  │
│  │ Support  │  │          │  │          │  │  Tool Caller   │  │
│  └────┬─────┘  └──────────┘  └────┬─────┘  └───────┬────────┘  │
└───────┼─────────────────────────── ┼────────────────┼───────────┘
        │  HTTP Requests              │                │
        │  X-Customer-ID Header       │                │
        ▼                             ▼                ▼
┌───────────────────────────────────────────────────────────────┐
│                   FastAPI Backend (Python)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ /products│  │ /orders  │  │ /support │  │ /returns     │  │
│  │ /search  │  │ /cancel  │  │ /tickets │  │ /refunds     │  │
│  │          │  │ /lookup  │  │ /escalate│  │ /analytics   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │   Security Layer (security.py)                         │    │
│  │   verify_api_key | get_current_customer                │    │
│  │   require_current_customer | 403 isolation checks      │    │
│  └────────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │   SQLAlchemy ORM                                       │    │
│  │   Product | Customer | Order | ReturnRequest           │    │
│  │   Refund | SupportTicket | AuditLog                   │    │
│  └────────────────────────────────────────────────────────┘    │
└──────────────────────────────┬────────────────────────────────┘
                               │
                               ▼
                    ┌──────────────────┐
                    │   SQLite Database │
                    │   shopsathi.db   │
                    └──────────────────┘
```

---

## 8. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Vanilla JavaScript (ES Modules) | SPA pages, UI components |
| **Build Tool** | Vite 6 | Frontend bundling and dev server |
| **Styling** | Custom CSS (CSS Variables, Dark Mode) | Responsive UI design |
| **Backend** | FastAPI (Python 3.11+) | REST API framework |
| **ORM** | SQLAlchemy 2.0 | Database abstraction layer |
| **Database** | SQLite | Persistent data storage |
| **Validation** | Pydantic v2 | Request/response schema validation |
| **Testing** | Pytest + HTTPX TestClient | Automated backend test suite |
| **Deployment** | Uvicorn ASGI server | Production server |
| **AI Chat** | Rule-based NLP + Backend Tool Calling | Chat agent intelligence |
| **AI Voice** | Web Speech API (SpeechRecognition + SpeechSynthesis) | Voice I/O |
| **Containerization** | Docker + Dockerfile | Container packaging |
| **CI/CD** | Render.com (render.yaml) | Cloud deployment |

---

## 9. Module Description

### A. E-Commerce Module
| Feature | Implementation |
|---|---|
| Home Page | Hero, features grid, AI CTA, stats section (`pages/Home.js`) |
| Product Listing | Category filters, search, card grid (`pages/Products.js`) |
| Product Detail | Description, price, stock, Add to Cart (`pages/ProductDetail.js`) |
| Product Search | Backend `/products/search?query=&max_price=&category=` |
| Shopping Cart | LocalStorage cart with quantity management (`store.js`) |
| Checkout | Order summary, address, order placement simulation (`pages/Checkout.js`) |
| Order Tracking | Real-time status, timeline view (`pages/Orders.js`, `pages/OrderDetail.js`) |
| Customer Login | Demo profiles with session via LocalStorage (`pages/Login.js`) |

### B. Customer Support Module
| Feature | Implementation |
|---|---|
| Support Dashboard | Ticket listing, status overview (`pages/Support.js`) |
| Ticket Creation | POST `/support/tickets` with customer auth |
| Ticket Tracking | GET `/support/tickets/{ticket_id}` |
| Human Escalation | POST `/support/tickets/{ticket_id}/escalate` |
| Returns | Eligibility check + return request creation (`pages/Returns.js`) |
| Refunds | Refund status tracking by order ID |

### C. AI Assistant Module
| Feature | Implementation |
|---|---|
| AI Chat Agent | Rule-based NLP with backend tool-calling (`components/AiLauncher.js`) |
| AI Voice Agent | Web Speech API (SpeechRecognition + SpeechSynthesis) |
| Product Queries | `searchProducts()` → GET `/products/search` |
| Order Queries | `getOrderStatus()` → GET `/orders/{order_id}` |
| Return Handling | `checkReturnEligibility()` + `createReturnRequest()` |
| Refund Queries | `checkRefundStatus()` → GET `/orders/{order_id}/refund` |
| Support Ticket | `createSupportTicket()` + `escalateSupportTicket()` |
| Multilingual | English, Hindi, Hinglish query pattern matching |

### D. Security Module
| Feature | Implementation |
|---|---|
| Customer Auth | `X-Customer-ID` header on every authenticated API call |
| Data Isolation | `require_current_customer` dependency enforces 403 on cross-account access |
| API Key Auth | Optional `X-API-Key` header verification via `SHOP_SATHI_API_KEY` env var |
| Guest Blocking | CUST105/Guest sessions explicitly blocked from private endpoints |
| Error Masking | Global exception handler prevents stack trace exposure |

### E. Backend and Database Module
| Feature | Implementation |
|---|---|
| REST API | FastAPI routers: `/orders`, `/products`, `/returns`, `/refunds`, `/support`, `/customers`, `/analytics`, `/health` |
| Database Models | `Product`, `Customer`, `Order`, `ReturnRequest`, `Refund`, `SupportTicket`, `AuditLog` |
| Relationships | SQLAlchemy relationships with cascade rules |
| Validation | Pydantic v2 schemas for all request/response models |
| Seed Data | Auto-seeded demo customers, products, and orders on startup |
| Logging | `AuditLog` model captures all tool calls with response times |
| Analytics | `GET /analytics/summary` aggregates AI usage metrics |

---

## 10. Database Design

### Entity Relationship Summary

```
Customer (1) ──────── (N) Order
Order    (1) ──────── (1) ReturnRequest
Order    (1) ──────── (1) Refund
Customer (1) ──────── (N) SupportTicket
Order    (1) ──────── (N) SupportTicket
Product  (1) ──────── (N) Order
```

### Key Tables

| Table | Key Columns |
|---|---|
| `customers` | `customer_id` (PK), `name`, `phone`, `email` |
| `products` | `product_id` (PK), `name`, `category`, `price`, `stock`, `returnable` |
| `orders` | `order_id` (PK), `customer_id` (FK), `product_id` (FK), `status`, `amount`, `order_date` |
| `returns` | `return_id` (PK), `order_id` (FK, unique), `reason`, `status` |
| `refunds` | `refund_id` (PK), `order_id` (FK, unique), `amount`, `status`, `expected_date` |
| `support_tickets` | `ticket_id` (PK), `customer_id` (FK), `order_id` (FK), `category`, `priority`, `status`, `assigned_to` |
| `audit_logs` | `id` (PK, auto), `function_called`, `customer_id`, `intent`, `success`, `response_time_ms` |

---

## 11. Software and Hardware Requirements

### Software Requirements

| Component | Requirement |
|---|---|
| Operating System | Windows 10/11, Linux (Ubuntu 20.04+), macOS 12+ |
| Python | 3.11 or higher |
| Node.js | 18 or higher |
| Browser | Chrome 110+, Edge 110+, Firefox 110+ (for Voice: Chrome recommended) |
| Git | 2.x |

### Python Dependencies
```
fastapi>=0.110.0
uvicorn>=0.28.0
sqlalchemy>=2.0.28
pydantic>=2.6.4
pydantic-settings>=2.2.1
pytest>=8.1.1
httpx>=0.27.0
```

### Hardware Requirements (Minimum)
| Component | Requirement |
|---|---|
| RAM | 2 GB |
| Disk Space | 500 MB (excluding virtual environment) |
| Processor | Dual-core 1.6 GHz or higher |
| Network | Internet (for Vite dev server and optional Gemini API) |
| Microphone | Required for Voice Assistant feature |

---

## 12. Getting Started (Local Development)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Mahendra7073/shopsathi-ai.git
cd shopsathi-ai
```

### Step 2: Set Up Python Virtual Environment and Install Dependencies
```bash
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate # Linux/macOS
pip install -r requirements.txt
```

### Step 3: Configure Environment
```bash
copy .env.example .env
# Edit .env as needed (defaults work for local development)
```

### Step 4: Start the Backend Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will auto-seed the database and start on `http://localhost:8000`.

| Endpoint | Description |
|---|---|
| `http://localhost:8000/` | API info and links |
| `http://localhost:8000/docs` | Swagger UI (interactive API docs) |
| `http://localhost:8000/health` | Health check |
| `http://localhost:8000/app/` | Frontend (after build) |

### Step 5: Set Up and Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend dev server: `http://localhost:5173`

### Step 6: (Optional) Build Frontend for Production
```bash
cd frontend
npm run build
```
Built files are served by FastAPI at `http://localhost:8000/app/`.

### Demo Login Credentials

| Customer ID | Name | Role |
|---|---|---|
| `CUST101` | Mahendra Gurjar | Customer / Owner Demo |
| `CUST102` | ShopSathi Admin | Administrator |
| `CUST103` | ShopSathi HR | HR / Operations |
| `CUST104` | ShopSathi Team | Support Team |
| `CUST105` | Guest | Guest (view-only, no auth) |

---

## 13. Testing Strategy

### Backend Unit and Integration Tests
Run the full test suite:
```bash
venv\Scripts\activate
pytest tests/ -v
```

### Test Files

| File | Coverage |
|---|---|
| `tests/test_health.py` | Health check endpoint |
| `tests/test_products.py` | Product listing and search |
| `tests/test_orders.py` | Order tracking, cancellation, isolation |
| `tests/test_customers.py` | Customer profile, isolation |
| `tests/test_returns.py` | Return eligibility, creation |
| `tests/test_refunds.py` | Refund status |
| `tests/test_support.py` | Ticket creation, escalation |
| `tests/test_security.py` | 401/403 enforcement |
| `tests/test_analytics.py` | Analytics summary |

### Test Strategy

| Type | Approach |
|---|---|
| Happy Path | Valid requests with correct customer data |
| Error Path | Missing fields, wrong types, 422 validation errors |
| Auth Tests | Requests without auth headers → 401 Unauthorized |
| Isolation Tests | Requests for another customer's data → 403 Forbidden |
| Edge Cases | Empty results, boundary prices, non-existent IDs |

---

## 14. Expected Outcomes

1. A fully functional web-based e-commerce platform with shopping, order management, returns, refunds, and customer support.
2. A working AI Chat Agent that takes real API actions (tracks orders, creates returns, checks refunds, escalates tickets).
3. A working Voice Assistant using browser-native speech recognition and synthesis.
4. A secure backend API with strict customer data isolation.
5. A test suite covering all major API endpoints and security scenarios.
6. Complete academic documentation suitable for B.Tech Minor Project evaluation.

---

## 15. Future Scope

1. **Gemini API Integration**: Replace the current rule-based NLP engine in the Chat Agent with Google Gemini API (server-side) for true natural language understanding and contextual conversation.
2. **Real Payment Gateway**: Integrate Razorpay or Paytm for real payment processing.
3. **PostgreSQL Migration**: Replace SQLite with PostgreSQL for production scalability.
4. **Admin Dashboard**: Build a full admin panel for inventory management, order management, and analytics.
5. **Recommendation Engine**: Add ML-based product recommendations using collaborative filtering.
6. **Mobile Application**: Build a React Native or Flutter mobile app using the same backend REST APIs.
7. **WhatsApp Bot**: Integrate the same AI assistant logic into a WhatsApp Business API bot.
8. **Real-time Notifications**: Add WebSocket support for live order status push notifications.
9. **Multi-vendor Support**: Extend the product model to support multiple sellers.
10. **Sentiment Analysis**: Analyze support ticket descriptions to auto-assign priority using sentiment scoring.

---

## 16. Project Structure

```
ShopSathi-AI-Minor-Project/
├── app/                          # FastAPI backend application
│   ├── main.py                   # App initialization, CORS, router registration
│   ├── models.py                 # SQLAlchemy ORM models
│   ├── schemas.py                # Pydantic v2 request/response schemas
│   ├── database.py               # Database engine and session setup
│   ├── security.py               # Authentication and customer isolation
│   ├── seed_data.py              # Demo data seeder
│   ├── logging_config.py         # Structured audit logging
│   └── routers/
│       ├── health.py             # GET /health
│       ├── products.py           # Product listing and search
│       ├── orders.py             # Order tracking and cancellation
│       ├── customers.py          # Customer profile and orders
│       ├── returns.py            # Return eligibility and creation
│       ├── refunds.py            # Refund status
│       ├── support.py            # Support tickets and escalation
│       └── analytics.py         # Observability and AI metrics
├── frontend/                     # Vite SPA frontend
│   ├── src/
│   │   ├── main.js               # App bootstrap and route mounting
│   │   ├── router.js             # Hash-based client-side router
│   │   ├── store.js              # Cart and user session state
│   │   ├── services/api.js       # Centralized API client
│   │   ├── components/
│   │   │   ├── AiLauncher.js     # Chat + Voice AI Assistant
│   │   │   ├── Header.js         # Navigation header
│   │   │   ├── Footer.js         # Site footer
│   │   │   ├── Logo.js           # SVG logo components
│   │   │   ├── Modal.js          # Modal dialog utility
│   │   │   └── Toast.js          # Notification toasts
│   │   ├── pages/
│   │   │   ├── Home.js           # Home page
│   │   │   ├── Products.js       # Product listing
│   │   │   ├── ProductDetail.js  # Product detail
│   │   │   ├── Cart.js           # Shopping cart
│   │   │   ├── Checkout.js       # Checkout and order placement
│   │   │   ├── Orders.js         # Order list
│   │   │   ├── OrderDetail.js    # Order timeline
│   │   │   ├── Returns.js        # Returns and refunds
│   │   │   ├── Support.js        # Support tickets
│   │   │   ├── Profile.js        # Customer profile
│   │   │   └── Login.js          # Authentication
│   │   └── styles/
│   │       ├── global.css         # Base styles and CSS variables
│   │       ├── components.css     # Component-level styles
│   │       ├── pages.css          # Page-level styles
│   │       └── variables.css      # Design tokens
│   ├── package.json
│   └── vite.config.js
├── tests/                        # Pytest test suite
│   ├── conftest.py               # Shared fixtures and test client
│   ├── test_health.py
│   ├── test_products.py
│   ├── test_orders.py
│   ├── test_customers.py
│   ├── test_returns.py
│   ├── test_refunds.py
│   ├── test_support.py
│   ├── test_security.py
│   └── test_analytics.py
├── docs/                         # Project documentation
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   ├── API_TEST_COMMANDS.md
│   ├── SHOP_SATHI_KNOWLEDGE_BASE.md
│   ├── archive/                  # Legacy documentation (historical reference)
│   ├── screenshots/              # Application screenshots (27 images)
│   └── WIKI/                     # Detailed wiki pages
├── .env.example                  # Environment configuration template
├── .gitignore
├── requirements.txt              # Python dependencies
├── Dockerfile                    # Docker container definition
├── Procfile                      # Render/Heroku process file
├── render.yaml                   # Render.com deployment config
└── README.md                     # This file
```

---

## 17. AI Integration Status

> **Important for evaluators and future contributors.**

ShopSathi AI is designed with a **fully independent, self-contained architecture**. The core e-commerce and customer support functionality does not depend on any external AI API key to operate.

**Current AI Architecture:**
- The **Chat Agent (`AiLauncher.js`)** operates using **browser-side intent matching + backend REST API tool-calling**. It understands product queries, order lookups, return requests, and support ticket creation without any external LLM subscription.
- The **Voice Agent** uses the browser's native **Web Speech API** (`SpeechRecognition` and `SpeechSynthesis`) — a standard W3C API available in all modern browsers. No external voice service is required.
- The backend REST APIs have **no external AI dependency** — all 8 tool functions are standard FastAPI endpoints callable by any client.
- Legacy integration documentation (`docs/archive/`) is retained for historical reference only.

**Gemini API (Optional Upgrade Path):**
- The UI references "Gemini 3.1 Flash" and "Gemini 2.5 Audio" as target model integrations — a planned future scope item.
- Adding `GEMINI_API_KEY` to `.env` enables a direct Gemini server-side integration without breaking any existing functionality.
- This upgrade is documented in `docs/ARCHITECTURE.md` under Future Scope.

**Summary: All core shopping, order, return, refund, and support features work fully without any external AI API key.**

---

## 18. API Reference (Key Endpoints)

### Products
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/products` | None | List all products |
| GET | `/products/search` | None | Search by query, price, category |
| GET | `/products/{id}` | None | Get product details |

### Orders
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/orders` | Required | List customer's orders |
| GET | `/orders/{id}` | Required | Get order status |
| POST | `/orders/{id}/cancel` | Required | Cancel eligible order |

### Returns & Refunds
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/orders/{id}/return-eligibility` | Required | Check if order is returnable |
| POST | `/returns` | Required | Create return request |
| GET | `/orders/{id}/refund` | Required | Check refund status |

### Support
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/support/tickets` | Required | Create support ticket |
| GET | `/support/tickets/{id}` | Required | Get ticket details |
| POST | `/support/tickets/{id}/escalate` | Required | Escalate to human agent |

### System
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/health` | None | Health check |
| GET | `/analytics/summary` | None | AI tool usage metrics |
| GET | `/docs` | None | Swagger interactive API docs |

**Authentication**: Send `X-Customer-ID: CUST101` header with every authenticated request.

---

## 19. Screenshots

Application screenshots are available in `docs/screenshots/`:

| Screenshot | Description |
|---|---|
| `01-home.png` | Home page with hero and features |
| `02-products.png` | Product listing with filters |
| `03-product-detail.png` | Product detail page |
| `04-cart.png` | Shopping cart |
| `05-checkout.png` | Checkout flow |
| `06-orders.png` | Order list |
| `07-order-detail.png` | Order timeline |
| `08-returns.png` | Returns and refunds page |
| `09-refund-status.png` | Refund status view |
| `10-support.png` | Support ticket dashboard |
| `11-profile.png` | Customer profile |
| `12-login.png` | Login page |
| `13-chat-agent.png` | AI Chat Agent panel |
| `18-voice-agent.png` | Voice Agent panel |
| `26-swagger-api.png` | Swagger API documentation |

---

## 20. License

This project is developed as an academic minor project for MBM University, Jodhpur, under the B.Tech Computer Science and Engineering program.

**Team Members:**
- Mahendra Gurjar — 24UCSE4018
- Kailash — 24UCSE4014

For academic and educational use only.
