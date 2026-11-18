# ShopSathi AI — Faculty Evaluator & Defense Q&A Guide

**B.Tech CSE Minor Project — MBM University, Jodhpur**
**Project Developers:** Mahendra Gurjar (24UCSE4018) · Kailash (24UCSE4014) — Semester VII

---

## 1. What problem does ShopSathi solve?
**Answer:** Traditional e-commerce customer support forces shoppers to navigate fragmented portals for shopping, order tracking, returns, and dispute resolution. Existing chatbots are typically rigid, FAQ-only bots that cannot perform real actions on user accounts. When an issue occurs, customers get trapped in loops. ShopSathi bridges this gap by acting as an agentic platform that discovers products, tracks real-time shipments, validates return eligibility, checks refunds, and executes live backend tools — with automatic escalation to human agents when friction arises.

---

## 2. Why is this considered "Agentic AI"?
**Answer:** Unlike static chatbots that merely return pre-written or speculative text, ShopSathi is an **autonomous decision-making system**:
1. It parses unstructured natural language inputs (in English, Hindi, or Hinglish) across Chat and Voice interfaces.
2. It classifies the user's operational goal (order tracking, product search, cancellation, return, refund, or support).
3. It extracts key parameters (e.g., Order ID `ORD1001`, budget limits `₹2000`, product category `running shoes`).
4. It calls and executes the exact backend REST API tool (`GET /orders/{id}`, `POST /returns`, etc.).
5. It formats the ground-truth API response into a natural response for the customer.
6. If an unresolved dispute occurs, it autonomously creates a support ticket and executes human escalation.

---

## 3. What makes ShopSathi different from a traditional chatbot?
**Answer:**

| Feature | Traditional Scripted Chatbot | ShopSathi AI Agentic System |
|---|---|---|
| **Data Source** | Static FAQ text / canned answers | Live REST APIs & SQLite Database |
| **Actions** | Read-only guidance links | Executes live transactions (cancel, return, ticket) |
| **Policy Engine** | None / prompts user to check T&C | Deterministic 7-day return policy & hygiene validation |
| **Multi-Modality** | Text-only widget | Multilingual Chat + Native Browser Voice Assistant |
| **Escalation** | Dead-end "leave a message" | Structured Tier 2 human agent routing & priority assignment |
| **Languages** | English only | English, Hindi, and Hinglish |
| **Customer Privacy**| Often shared or unauthenticated | Strict 401 Unauthorized / 403 Forbidden customer isolation |

---

## 4. How does the AI access live information and prevent hallucinations?
**Answer:** The AI assistant uses deterministic backend tool calling. When a user asks about order `ORD1001`, the engine extracts the ID and queries `GET /orders/ORD1001`. The backend queries the database and returns structured JSON (`{"status": "Out for Delivery", "expected_delivery": "Today by 7:00 PM"}`). The assistant bases its response strictly on this tool output, guaranteeing zero hallucinated tracking numbers, prices, or refund states.

---

## 5. How does the Return Policy & Cancellation logic work?
**Answer:**
1. **Cancellation Guard:** Orders in `Delivered` or `Out for Delivery` status cannot be cancelled via self-service; the system blocks cancellation and directs the customer to initiate a return upon arrival.
2. **7-Day Return Policy Engine:** When a return is requested for a delivered item, the backend checks:
   - Whether the item is returnable (e.g. hygiene products like pillows are non-returnable).
   - Whether the delivery timestamp was within the last 7 days.
   - If older than 7 days, the return is marked ineligible and the user is offered a dispute escalation ticket.

---

## 6. How is customer data privacy and security handled?
**Answer:**
- **Zero Cross-Customer Data Leakage:** All customer endpoints require the `X-Customer-ID` authentication header.
- **Server-Side Authorization:** Attempting to view another customer's order (e.g., CUST101 requesting ORD1002 belonging to CUST102) strictly returns **HTTP 403 Forbidden**.
- **Guest Protection:** Guest users (`CUST105`) cannot view orders or request returns without logging in (returning **HTTP 401 Unauthorized**).
- **Public vs Private Caching:** Catalog searches (`GET /products*`) are cached in memory for 60 seconds (duration: `0.002 ms`), but sensitive customer data (`/orders`, `/returns`, `/refunds`, `/support`) is **never cached**.

---

## 7. What is the test coverage and verification status?
**Answer:** The project has **145 total automated tests** with a 100% pass rate:
- **80 Backend Pytest Tests:** Testing all 8 routers, customer isolation, 7-day return policy, security, and health.
- **55 Frontend AI Agent Tests:** Testing English, Hindi, and Hinglish NLP intents, edge cases, latency benchmarks, and TTS audio formatting.
- **10 API Smoke Tests:** Automated end-to-end server sanity and database integrity verification.
- **Continuous Integration:** Automated GitHub Actions pipeline (`.github/workflows/ci.yml`) runs all tests on every push.

---

## 8. What is the technology stack and deployment architecture?
**Answer:**
- **Frontend:** Vanilla JavaScript (ES6 modules), Vite build tool, responsive CSS with design tokens.
- **Backend:** Python 3.12, FastAPI, Uvicorn ASGI server.
- **Database:** SQLite with SQLAlchemy ORM (compatible with PostgreSQL).
- **Voice / Speech:** Browser W3C Web Speech API (`SpeechRecognition` + `SpeechSynthesis`).
- **Containerization & Deployment:** Dockerfile (Python 3.12-slim), `render.yaml`, live deployment on Render Web Services.
