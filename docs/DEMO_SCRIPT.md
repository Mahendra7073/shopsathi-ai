# ShopSathi AI — Project Demonstration Guide (3–5 Minutes)

**B.Tech CSE Minor Project — MBM University, Jodhpur**
**Developers:** Mahendra Gurjar (24UCSE4018) · Kailash (24UCSE4014) — Semester VII

---

## 🎯 Demonstration Objective
Showcase a complete, end-to-end agentic workflow where the **ShopSathi Chat Agent** (Multilingual Natural Language Processing) and **ShopSathi Voice Assistant** (W3C Web Speech API) seamlessly discover products, execute live order management tools across 52 realistic orders, enforce business rules, and escalate complex disputes to Tier 2 human support.

---

## ⏱️ Step-by-Step Demo Flow

### 🎬 STEP 1: Introduction & Problem Context (30 Seconds)
* **Action:** Open `http://localhost:8000/app/` (or live `https://shopsathi-ai.onrender.com/app/`).
* **Speaker Script:**
  > *"Hello! Meet **ShopSathi AI** — 'Smart Shopping. Smarter Support.' In traditional e-commerce, customers are forced to bounce between shopping catalogues, tracking portals, refund forms, and disconnected support agents. ShopSathi unites these operations into one seamless Agentic AI platform with a built-in Chat Assistant and Voice Assistant."*

---

### 🔍 STEP 2: Product Discovery & Smart Search (30 Seconds)
* **Action:** Click **"Explore Products"** (or navigate to `#/products`). Type `"running shoes under 2000"`.
* **Observe:** The search debounces and instantly filters the catalog to show `UltraFit Pro Running Shoes` (₹1,899).
* **Speaker Script:**
  > *"Customers can search naturally with price and category constraints. Our backend validates stock, pricing, and 7-day return policy rules in real time."*

---

### 📦 STEP 3: Order Tracking & Live Timeline (45 Seconds)
* **Action:** Go to `#/orders` or click on `ORD1001` in the order list.
* **Observe:** The detailed timeline displays status *"Out for Delivery"*, courier name, tracking ID, and expected delivery.
* **Speaker Script:**
  > *"Our system manages 52 realistic customer orders. Here is ORD1001 for Mahendra Gurjar. Notice the strict customer data isolation: if logged in as CUST101, you can only see orders assigned to CUST101. Attempting to view another customer's order directly results in a 403 Forbidden barrier."*

---

### 🤖 STEP 4: Multilingual Chat Agent in Action (60 Seconds)
* **Action:** Open the floating **"Ask ShopSathi"** widget (`#ai-fab`) and click **"Chat with ShopSathi"**.
* **Query 1 (English Tracking):** Type: `"Where is my order ORD1001?"`
  * **Result:** Agent invokes `GET /orders/ORD1001` and replies: *"Your order ORD1001 is Out for Delivery. Expected delivery is today by 7:00 PM."*
* **Query 2 (Hindi/Hinglish Return):** Type: `"ORD1003 return karna hai defective item"`
  * **Result:** Agent invokes `POST /returns` and creates return `RET-ORD1003-xxx`.
* **Query 3 (Human Escalation):** Type: `"I need to talk to a human agent, money deducted twice"`
  * **Result:** Agent invokes `POST /support/tickets` and automatically escalates to Tier-2 human support with priority *Critical*.
* **Speaker Script:**
  > *"The Chat Agent operates using client-side intent matching with live backend REST API tool execution. It understands English, Hindi, and Hinglish, and never hallucinates — every answer is grounded in actual database records."*

---

### 🎙️ STEP 5: Browser Voice Assistant (45 Seconds)
* **Action:** Open **"Talk to ShopSathi Voice"** (`#ai-open-voice`).
* **Observe:** The interactive modal displays connection status, listening waves, and live speech transcription.
* **Query:** Speak: *"Check refund for ORD1004"*
* **Observe:** The assistant transcribes speech, invokes `GET /orders/ORD1004/refund`, and speaks the formatted answer: *"Your refund for order O R D 1 0 0 4 is Initiated. Amount is 2499 rupees."*
* **Speaker Script:**
  > *"The Voice Assistant uses the browser's native W3C Web Speech API for zero-dependency speech recognition and synthesis. Alphanumeric IDs are automatically spelled out for natural pronunciation, and responses stream to audio in under 140 milliseconds."*

---

### 📊 STEP 6: Admin Observability & Audit Logs (30 Seconds)
* **Action:** Open `http://localhost:8000/static/index.html` (Admin Dashboard).
* **Observe:** Real-time metrics show total requests, AI resolution rate, escalation count, and structured audit logs.
* **Speaker Script:**
  > *"Every AI action and tool execution is logged with sub-millisecond response times into our SQLite audit log for complete system observability."*

---

## 🏆 Key Takeaways for Evaluators
1. **Fully Working Full-Stack System:** Vanilla JS SPA + FastAPI + SQLite + SQLAlchemy.
2. **Autonomous Tool Calling:** 8 registered API functions executed live against the backend.
3. **Strict Data Privacy:** Customer isolation barriers (401/403) protect all account data.
4. **145 Automated Tests:** 80 Pytest backend tests, 55 frontend AI tests, and 10 API smoke tests with 100% pass rate.
