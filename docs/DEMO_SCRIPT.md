# ShopSathi AI — Hackathon Live Demo Script (3–5 Minutes)

---

## Demo Overview
* **Goal**: Demonstrate a complete, production-grade agentic workflow showing intent recognition, real-time API function execution, knowledge base retrieval, and human escalation.

---

## Scenario 1: Multilingual Order Tracking (Hinglish / Chat)

* **User Input**:
  > *"Mera order ORD1001 kaha hai?"*
* **AI Agent Flow**:
  1. Detects Hinglish language & order tracking intent.
  2. Extracts Order ID `ORD1001`.
  3. Executes `check_order_status("ORD1001")`.
  4. Receives API response: `{"status": "Out for Delivery", "expected_delivery": "Today by 7:00 PM"}`.
* **Expected AI Response**:
  > *"Aapka order ORD1001 (AirPro Headphones) filhaal Out for Delivery hai aur aaj shaam 7:00 PM tak deliver ho jayega! 🚚"*

---

## Scenario 2: Return Eligibility & Request Creation (Hinglish / Chat)

* **User Input**:
  > *"ORD1003 return karna hai, shoes small size ke aaye hai."*
* **AI Agent Flow**:
  1. Identifies return intent for `ORD1003`.
  2. Executes `check_return_eligibility("ORD1003")` -> Response: `{"eligible": true}`.
  3. Executes `create_return_request("ORD1003", "Size small")`.
  4. Receives Return ID `RET...`.
* **Expected AI Response**:
  > *"Aapka order ORD1003 return ke liye eligible hai. Maine Return Request submit kar di hai (Return ID: RETXXXX). Agle 24-48 ghante me pickup schedule ho jayega."*

---

## Scenario 3: Product Search with Budget Constraint (English / Chat)

* **User Input**:
  > *"Show me running shoes under ₹2000."*
* **AI Agent Flow**:
  1. Identifies product search intent with budget constraint `max_price=2000` and `query="running shoes"`.
  2. Executes `search_products(query="running shoes", max_price=2000, category="Footwear")`.
* **Expected AI Response**:
  > *"Here is what I found for you: UltraFit Pro Running Shoes for ₹1,899 (In Stock, 7-day return policy available)."*

---

## Scenario 4: Payment Issue & Human Escalation (Voice / Chat)

* **User Input**:
  > *"Mera payment deduct ho gaya ₹1499 par order confirm nahi hua. Mujhe human agent se baat karni hai!"*
* **AI Agent Flow**:
  1. Identifies payment dispute & explicit human escalation demand.
  2. Executes `create_support_ticket(customer_id="CUST102", category="Payment Issue", description="...", order_id="ORD1005")`.
  3. Executes `escalate_support_ticket(ticket_id="TKT9001", reason="Customer requested human agent")`.
* **Expected AI Response**:
  > *"I understand your concern. I have created Support Ticket TKT9001 and escalated it to our Tier 2 Human Support Manager. A human representative will call you back shortly."*

---

## Scenario 5: Live Dashboard Observability Walkthrough

* Open Dashboard at `http://127.0.0.1:8000/static/index.html`.
* Show live metrics updating in real-time (Total API Calls, AI Resolved vs Human Escalations, Latency).
* Point to the **Audit Log Table** displaying exact timestamps, intents, latencies, and escalation tags.
