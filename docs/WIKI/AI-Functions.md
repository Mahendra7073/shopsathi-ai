# AI Functions & Tools

ShopSathi exposes **9 core autonomous backend tools** registered with the Kipps.AI agent framework.

---

## 📋 Comprehensive AI Tool Specification

| # | Tool Identifier | HTTP Route & Method | Purpose | Natural User Request Example |
|---|---|---|---|---|
| 1 | `search_products` | `GET /products/search`<br>`POST /products/search` | Searches catalog with keyword, max price, and category filters. | *"Find noise cancelling headphones under ₹5000"* |
| 2 | `check_order_status` | `POST /orders/lookup`<br>`GET /orders/{id}` | Fetches real-time status, expected delivery, and timeline. | *"Where is my order ORD1001?"* |
| 3 | `cancel_order` | `POST /orders/cancel`<br>`POST /orders/{id}/cancel` | Cancels processing orders and initiates automated refund. | *"Please cancel my order ORD1005"* |
| 4 | `check_return_eligibility` | `POST /orders/return-eligibility`<br>`GET /orders/{id}/return-eligibility` | Evaluates 7-day policy window and product hygiene flags. | *"Can I return my shoes ORD1003?"* |
| 5 | `create_return_request` | `POST /returns` | Creates a return record (`RETXXXX`) and schedules pickup. | *"Return ORD1003 because the size is too small"* |
| 6 | `check_refund_status` | `POST /orders/refund-status`<br>`GET /orders/{id}/refund` | Looks up refund transaction (`REFXXXX`) and bank payout date. | *"Check refund status for ORD1004"* |
| 7 | `create_support_ticket` | `POST /support/tickets` | Generates a structured ticket (`TKTXXXX`) with priority. | *"I was charged twice on UPI for ORD1005"* |
| 8 | `check_support_ticket` | `POST /support/tickets/status`<br>`GET /support/tickets/{id}` | Checks live resolution progress of an existing ticket. | *"What is the status of my ticket TKT9001?"* |
| 9 | `escalate_support_ticket` | `POST /support/tickets/escalate`<br>`POST /support/tickets/{id}/escalate` | Routes unresolved dispute directly to Tier 2 human support. | *"I want to talk to a human supervisor"* |
