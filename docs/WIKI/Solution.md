# Solution

## 💡 The ShopSathi Agentic Architecture

**ShopSathi AI** solves the support dilemma by replacing static chatbots with an **Agentic Action Engine** that connects multi-modal AI agents directly to live backend REST APIs.

---

## ⚙️ The Agentic Decision Loop

```
1. Customer Utterance
   (e.g., "Mera order ORD1001 kahan hai?")
          │
          ▼
2. Natural Language Intent Parsing
   (Model identifies: check_order_status required with parameter order_id="ORD1001")
          │
          ▼
3. Autonomous Tool Execution
   (KIPPS.AI sends HTTP POST /orders/lookup {"order_id": "ORD1001"})
          │
          ▼
4. Deterministic Backend Evaluation
   (FastAPI queries SQLite/PostgreSQL, returns {"status": "Out for Delivery", "expected_delivery": "Today by 7:00 PM"})
          │
          ▼
5. Grounded Multilingual Response
   ("Aapka order ORD1001 'Out for Delivery' hai aur aaj shaam 7:00 PM tak deliver ho jayega.")
```

---

## 🛡️ Key Architectural Principles
1. **API as the Single Source of Truth**: The AI never generates transactional facts from model weights. All order numbers, prices, refund amounts, and delivery dates come from live APIs.
2. **Deterministic Business Guardrails**: Business policies (such as refusing cancellation on delivered items or enforcing 7-day return limits) are executed in backend code, guaranteeing 100% compliance.
3. **Structured Human Escalation**: High-friction issues (e.g. unverified payment gateway drops) automatically trigger `create_support_ticket` and `escalate_support_ticket`, transitioning the issue to a Tier 2 human agent.
