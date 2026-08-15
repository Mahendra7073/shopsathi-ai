# ShopSathi AI — Live Hackathon Demonstration Script (3–5 Minutes)

---

## 🎯 Demonstration Objective
Showcase a complete, end-to-end agentic workflow where **Gemini 3.1 Flash Lite** (Chat Agent) and **Gemini 2.5 Flash Native Audio** (Voice Agent) seamlessly discover products, execute live order management tools across 52 realistic orders, enforce business rules, and escalate complex disputes to Tier 2 human support.

---

## ⏱️ Step-by-Step Demo Flow

### 🎬 STEP 1: Introduction & Problem Context (30 Seconds)
* **Action:** Open `https://shopsathi-ai.onrender.com/app/` (or local `http://localhost:8000/app/`).
* **Speaker Script:**
  > *"Hello judges! Meet **ShopSathi AI** — 'Smart Shopping. Smarter Support.' In traditional e-commerce, customers are forced to bounce between shopping catalogues, tracking portals, refund forms, and disconnected support agents. ShopSathi unites these operations into one seamless Agentic AI platform powered by Gemini 3.1 Flash Lite and Gemini 2.5 Flash Native Audio Preview."*

---

### 🔍 STEP 2: Product Discovery & Smart Search (30 Seconds)
* **Action:** Click **"Explore Products"** (or go to `#/products`). Type `"running shoes under 2000"`.
* **Observe:** The search debounces and instantly filters the catalog to show `UltraFit Pro Running Shoes` (₹1,899).
* **Speaker Script:**
  > *"Customers can search naturally with price and category constraints. Our backend validates stock, pricing, and 7-day return policy rules in real time."*

---

### 📦 STEP 3: Order Tracking & Live Timeline (30 Seconds)
* **Action:** Navigate to `#/orders` or click on `ORD1001`.
* **Observe:** 
  - The Orders page showcases our **52 seeded orders** with responsive pagination and status filters.
  - Clicking `ORD1001` reveals a 6-step visual delivery timeline showing status **"Out for Delivery"** and delivery estimate *"Today by 7:00 PM"*.
* **Speaker Script:**
  > *"Our system manages 52 realistic customer orders. Here is ORD1001 for Mahendra Gurjar. Notice the real-time timeline, shipping details, and delivery estimates."*

---

### 🔄 STEP 4: Return Eligibility & 7-Day Policy Engine (30 Seconds)
* **Action:** Navigate to `#/returns`. Enter `ORD1003` and click **"Check Eligibility"**.
* **Observe:** System confirms: `Eligible: True` ("Delivered 2 days ago — within 7-day return window").
* **Speaker Script:**
  > *"Instead of guessing, ShopSathi's deterministic policy engine calculates delivery timestamps. If an order exceeds 7 days like ORD1002, returns are safely rejected. ORD1003 was delivered 2 days ago, so return creation succeeds with real return ID generation."*

---

### 💰 STEP 5: Refund Status Tracking (30 Seconds)
* **Action:** In the Refund section of `#/returns`, enter `ORD1004` and click **"Check Refund"**.
* **Observe:** Displays refund `REF7001` for ₹2,499.0 with status `Initiated` and expected payout window.
* **Speaker Script:**
  > *"Refund inquiries are connected to actual banking payout records. Here, ORD1004 shows refund REF7001 initiated for ₹2,499."*

---

### 🎫 STEP 6: Support Ticket & Human Escalation (45 Seconds)
* **Action:** Navigate to `#/support`.
* **Step 6a:** Fill ticket form for `CUST101`: Category `Payment Issue`, Priority `High`, Description *"Payment debited via UPI but order still in processing"*.
* **Observe:** Generates real ticket `TKTXXXX`.
* **Step 6b:** Look up the ticket status.
* **Step 6c:** Click **"Escalate to Human Agent"**.
* **Observe:** Status updates to **"Escalated"** and assigns to **"Tier 2 Human Support Agent"**.
* **Speaker Script:**
  > *"When AI cannot resolve an edge case, ShopSathi never leaves the user stuck. It packages the context into a support ticket and performs an immediate handoff to Tier 2 human support."*

---

### 💬 STEP 7: Multilingual Chat Agent with Live Tools (45 Seconds)
* **Action:** Click the floating **"Ask ShopSathi"** launcher and open Chat mode.
* **Input Query:**
  - In English: *"Where is my order ORD1010?"*
  - Or in Hinglish: *"Mera order ORD1010 kahan hai?"*
* **Observe:** The agent invokes `check_order_status` tool and outputs: *"Order ORD1010 for Ergonomic Memory Foam Pillow is currently in 'Processing' status with expected delivery: 'Verification in progress'."*
* **Speaker Script:**
  > *"Our Gemini 3.1 Flash Lite Chat Agent doesn't hallucinate. It executes live backend tools to fetch ground-truth database state in English, Hindi, or Hinglish."*

---

### 🎙️ STEP 8: Real-Time Voice Agent Demonstration (45 Seconds)
* **Action:** Switch to Voice Mode in the AI Launcher.
* **Observe:** State transition: `Connecting` ➔ `Connected` ➔ `Listening`.
* **Speak:** *"Where is my order ORD1030?"*
* **Observe:** Visual audio waveforms, live speech-to-text transcript, `< 10ms` backend tool latency, and clear natural voice response (Voice: Puck).
* **Speaker Script:**
  > *"Our Real-Time Voice Agent uses Gemini 2.5 Flash Native Audio Preview with sub-second speech-to-speech responsiveness and direct PSTN phone integration at +91 8031339824."*

---

### 🏁 STEP 9: Conclusion & Summary (15 Seconds)
* **Speaker Script:**
  > *"ShopSathi AI combines autonomous agentic actions, voice and chat multi-modality, deterministic business guardrails, and human escalation into a production-verified customer experience. Thank you!"*
