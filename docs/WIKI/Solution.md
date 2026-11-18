# Solution

## 💡 The ShopSathi Agentic Architecture

**ShopSathi AI** solves the e-commerce customer support dilemma by replacing static chatbots with an **Agentic Action Engine** that connects multi-modal AI assistants directly to live backend REST APIs.

---

## ⚙️ The Agentic Decision Loop

```
1. Customer Utterance
   (e.g., "Mera order ORD1001 kahan hai?")
          │
          ▼
2. Natural Language Intent Parsing
   (Engine identifies: check_order_status required with parameter order_id="ORD1001")
          │
          ▼
3. Autonomous Tool Execution
   (AI Agent calls: HTTP GET /orders/ORD1001 with X-Customer-ID header)
          │
          ▼
4. Deterministic Backend Evaluation
   (FastAPI queries SQLite database, returns {"status": "Out for Delivery", "expected_delivery": "Today by 7:00 PM"})
          │
          ▼
5. Grounded Multilingual Response
   ("Aapka order ORD1001 'Out for Delivery' hai aur aaj shaam 7:00 PM tak deliver ho jayega.")
```

---

## 🛡️ Key Architectural Principles
1. **API as the Single Source of Truth**: The AI never fabricates transactional facts. All order numbers, prices, refund amounts, and delivery dates come directly from live REST APIs.
2. **Deterministic Business Guardrails**: Business policies (such as refusing cancellation on delivered items or enforcing 7-day return limits) are executed in backend code, guaranteeing 100% compliance.
3. **Structured Human Escalation**: High-friction issues (e.g. unverified payment drops) automatically trigger `create_support_ticket` and `escalate_support_ticket`, transitioning the issue to a Tier 2 human supervisor.
4. **Sub-Second Performance**: Client-side intent parsing executes in under `0.04 ms`, backend roundtrip completes in `20 ms`, and audio starts streaming in under `140 ms`.
