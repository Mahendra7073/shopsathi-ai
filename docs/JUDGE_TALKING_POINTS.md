# ShopSathi AI — Judge Talking Points & FAQ

This document provides concise, fact-based answers to key architectural, product, and technical questions likely to be asked by hackathon judges.

---

### 1. What problem does ShopSathi solve?
**Answer:** Traditional e-commerce customer support forces shoppers to navigate fragmented portals for shopping, order tracking, returns, and dispute resolution. Existing chatbots are rigid, FAQ-only bots that cannot perform transactional actions. When an issue occurs, customers get trapped in loops. ShopSathi bridges this gap by acting as a multi-modal agentic platform that discovers products, tracks real-time shipments, processes returns/refunds, and executes live backend tools—with automatic escalation to human agents when friction arises.

---

### 2. Why is this considered "Agentic AI"?
**Answer:** Unlike static chatbots that merely return generated text, ShopSathi is an **autonomous decision-maker**:
1. It analyzes unstructured natural language inputs (in English, Hindi, or Hinglish) across Chat and Voice.
2. It determines the user's operational goal (e.g., checking status, returning an item, inquiring about a refund).
3. It selects and parameterizes the exact backend tool (`check_order_status`, `check_return_eligibility`, etc.).
4. It receives ground-truth API data and reasons over it according to business rules.
5. If an anomaly or deadlock occurs, it autonomously creates a support ticket and executes human escalation.

---

### 3. What makes ShopSathi different from a normal chatbot?
**Answer:**
| Feature | Traditional Scripted Chatbot | ShopSathi AI Agentic System |
|---|---|---|
| **Data Source** | Static FAQ text / canned answers | Live REST APIs & SQLite/PostgreSQL Database |
| **Actions** | Read-only guidance links | Executes live transactions (cancel, return, ticket) |
| **Policy Engine** | None / prompts user to check T&C | Deterministic 7-day policy & hygiene validation |
| **Multi-Modality** | Text-only widget | Chat (Gemini 3.1 Flash Lite) + Real-Time Voice (Gemini 2.5 Flash Native Audio) |
| **Escalation** | Dead-end "leave a message" | Structured Tier 2 human agent routing |
| **Languages** | English only | English, Hindi, and Hinglish |

---

### 4. How does the AI access live information and prevent hallucinations?
**Answer:** The AI agents are configured with strict function-calling definitions. When a user asks about order `ORD1001`, the model invokes `check_order_status(order_id='ORD1001')`. The backend queries the database and returns structured JSON (`{"status": "Out for Delivery", "expected_delivery": "Today by 7:00 PM"}`). The LLM is instructed to base its response strictly on the tool output, guaranteeing zero hallucinated tracking numbers, prices, or refund states.

---

### 5. How does the Return Policy & Cancellation logic work?
**Answer:** ShopSathi utilizes a deterministic business rule engine:
- **Returns:** Checks if the product is marked `returnable=True` (e.g., water bottles are non-returnable for hygiene) AND calculates whether `current_date - delivered_date <= 7 days`.
- **Cancellations:** Only orders in `Processing` or `Confirmed` states can be cancelled. Once an order is `Delivered` or `Out for Delivery` (e.g., `ORD1002`), cancellation is strictly blocked with HTTP 400 Bad Request.

---

### 6. How does Human Escalation work?
**Answer:** When a customer has an unresolved dispute (such as an unconfirmed payment or complex complaint), the agent calls `create_support_ticket`. If immediate human intervention is requested or required, it calls `escalate_support_ticket(ticket_id, reason)`. The backend transitions the ticket status to `Escalated` and assigns it to a `Tier 2 Human Support Agent`, preserving the entire conversational context.

---

### 7. Why include both Chat and Real-Time Voice?
**Answer:** E-commerce shoppers have diverse interaction preferences. Chat is ideal for visual product browsing, cart reviews, and reviewing detailed return policies. Real-Time Voice (powered by Gemini 2.5 Flash Native Audio Preview with voice *Puck* and direct PSTN number `+91 8031339824`) provides hands-free accessibility for quick status checks and on-the-go inquiries with sub-second response times.

---

### 8. How is the system scalable and architected for production?
**Answer:**
- **Decoupled Architecture:** Clean separation between the client-side SPA (Vite + Vanilla JS), the FastAPI business logic layer, and the AI agent orchestration layer.
- **Stateless API:** REST endpoints are stateless, scalable, and Docker-ready.
- **High Performance:** Average backend tool execution latency is `< 7ms`.
- **Database Portability:** SQLAlchemy ORM allows switching between SQLite (local demo) and PostgreSQL / Cloud SQL in production via the `DATABASE_URL` environment variable.

---

### 9. What happens if an API endpoint fails?
**Answer:** The system features resilient error boundaries:
- The FastAPI backend returns standardized error envelopes (`ApiError` with HTTP status codes and user-friendly messages).
- Frontend services catch network and parsing errors, displaying clear empty states and "Try Again" toasts without crashing the UI.
- The AI agents receive standard error JSON and gracefully inform the customer or offer human escalation.

---

### 10. How is customer data and security protected?
**Answer:**
- Zero secrets, API keys, or database credentials are baked into client-side code or git repositories.
- All external LLM keys (`GEMINI_API_KEY`, `KIPPS_API_KEY`) remain strictly server-side.
- The backend supports header-based API key authentication (`X-API-Key`) for production function-calling protection.

---

### 11. What technologies were used?
**Answer:**
- **Frontend:** HTML5, CSS3 Tokens, Vanilla JavaScript ES6, Vite SPA, SVG Generator.
- **Backend:** Python 3.12, FastAPI, Uvicorn, SQLAlchemy ORM, Pydantic v2.
- **AI Models:** Gemini 3.1 Flash Lite (Chat Agent), Gemini 2.5 Flash Native Audio Preview (Voice Agent).
- **Deployment:** Render Web Services (Docker / Python), GitHub Version Control.
- **Testing:** Pytest (63 automated unit/integration tests, 100% pass rate).

---

### 12. What would you add next?
**Answer:**
1. **Automated WhatsApp / SMS Integrations:** Trigger real-time WhatsApp updates for order dispatches and return pickup OTPs.
2. **Visual Defect Inspection via Multi-Modal Vision:** Allow customers to upload photos of damaged goods directly in chat for automated AI return approvals.
3. **Live Human Agent Dashboard:** Real-time WebRTC audio handoff allowing Tier 2 agents to seamlessly join active voice calls.
