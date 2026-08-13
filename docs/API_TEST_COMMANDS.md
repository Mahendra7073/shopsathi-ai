# ShopSathi AI — Public API Test Commands (cURL)

This document provides copy-pasteable `curl` test commands for every backend API endpoint.

> **Public API Base URL Placeholder**: `<PUBLIC_API_URL>` (e.g. `https://shopsathi-ai-backend.onrender.com` or your `ngrok` URL `https://xxxx.ngrok-free.app`)  
> **API Security Header**: `-H "X-API-Key: YOUR_SHOP_SATHI_API_KEY"` (if `SHOP_SATHI_API_KEY` is configured in environment)

---

## 1. System Health Check (Public / No Auth Required)

```bash
curl -X GET "<PUBLIC_API_URL>/health"
```

---

## 2. Order Tracking (`check_order_status` GET)

```bash
curl -X GET "<PUBLIC_API_URL>/orders/ORD1001" \
     -H "X-API-Key: YOUR_SHOP_SATHI_API_KEY"
```

---

## 2b. Order Tracking via JSON Body (`check_order_status_post` POST)

```bash
curl -X POST "<PUBLIC_API_URL>/orders/lookup" \
     -H "Content-Type: application/json" \
     -H "X-API-Key: YOUR_SHOP_SATHI_API_KEY" \
     -d '{
       "order_id": "ORD1002"
     }'
```

---

## 3. Return Eligibility (`check_return_eligibility` GET)

```bash
curl -X GET "<PUBLIC_API_URL>/orders/ORD1003/return-eligibility" \
     -H "X-API-Key: YOUR_SHOP_SATHI_API_KEY"
```

---

## 3b. Return Eligibility via JSON Body (`check_return_eligibility_post` POST)

```bash
curl -X POST "<PUBLIC_API_URL>/orders/return-eligibility" \
     -H "Content-Type: application/json" \
     -H "X-API-Key: YOUR_SHOP_SATHI_API_KEY" \
     -d '{
       "order_id": "ORD1003"
     }'
```

---

## 4. Create Return Request (`create_return_request`)

```bash
curl -X POST "<PUBLIC_API_URL>/returns" \
     -H "Content-Type: application/json" \
     -H "X-API-Key: YOUR_SHOP_SATHI_API_KEY" \
     -d '{
       "order_id": "ORD1003",
       "reason": "Product size is too small"
     }'
```

---

## 5. Refund Status (`check_refund_status` GET)

```bash
curl -X GET "<PUBLIC_API_URL>/orders/ORD1004/refund" \
     -H "X-API-Key: YOUR_SHOP_SATHI_API_KEY"
```

---

## 5b. Refund Status via JSON Body (`check_refund_status_post` POST)

```bash
curl -X POST "<PUBLIC_API_URL>/orders/refund-status" \
     -H "Content-Type: application/json" \
     -H "X-API-Key: YOUR_SHOP_SATHI_API_KEY" \
     -d '{
       "order_id": "ORD1004"
     }'
```

---

## 6. Search Catalog Products (`search_products`)

```bash
curl -X GET "<PUBLIC_API_URL>/products/search?query=running&max_price=2000" \
     -H "X-API-Key: YOUR_SHOP_SATHI_API_KEY"
```

---

## 7. Order Cancellation (`cancel_order`)

```bash
curl -X POST "<PUBLIC_API_URL>/orders/cancel" \
     -H "Content-Type: application/json" \
     -H "X-API-Key: YOUR_SHOP_SATHI_API_KEY" \
     -d '{
       "order_id": "ORD1005"
     }'
```

---

## 8. Create Support Ticket (`create_support_ticket`)

```bash
curl -X POST "<PUBLIC_API_URL>/support/tickets" \
     -H "Content-Type: application/json" \
     -H "X-API-Key: YOUR_SHOP_SATHI_API_KEY" \
     -d '{
       "customer_id": "CUST101",
       "category": "Payment Issue",
       "description": "Payment deducted ₹1499 via UPI but order status processing",
       "priority": "High",
       "order_id": "ORD1005"
     }'
```

---

## 9. Escalate Support Ticket (`escalate_support_ticket`)

```bash
curl -X POST "<PUBLIC_API_URL>/support/tickets/TKT9001/escalate" \
     -H "Content-Type: application/json" \
     -H "X-API-Key: YOUR_SHOP_SATHI_API_KEY" \
     -d '{
       "reason": "Customer requested human manager for unresolved payment issue"
     }'
```

---

## 10. Observability & Analytics Summary

```bash
curl -X GET "<PUBLIC_API_URL>/analytics/summary"
```
