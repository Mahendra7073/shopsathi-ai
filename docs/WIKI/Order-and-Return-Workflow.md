# Order & Return Workflows

## 📦 1. Order Lifecycle & Cancellation Protection

ShopSathi implements a multi-stage order lifecycle with strict cancellation guards:

```
[Processing] ──► [Confirmed] ──► [Packed] ──► [Shipped] ──► [Out for Delivery] ──► [Delivered]
     │                 │
     ▼                 ▼
[Cancelled]       [Cancelled]
 (Allowed)         (Allowed)
```

### Business Rule: Cancellation Protection
* **Allowed States**: Orders in `Processing` or `Confirmed` can be cancelled self-service via the UI or AI assistants.
* **Blocked States**: Once an order reaches `Packed`, `Shipped`, `Out for Delivery`, or `Delivered`, cancellation is strictly rejected with **HTTP 400 Bad Request** to prevent logistics desynchronization.

---

## 🔄 2. Return & Refund Policy Engine

ShopSathi enforces an automated 7-day return policy engine:

```
Delivered Order
       │
       ▼
1. Product Hygiene Check (returnable == True)
       │
       ▼
2. Timestamp Calculation (current_time - delivered_time <= 7 days)
       │
       ├─────────────────────────────────┐
       ▼                                 ▼
[Eligible: True]                 [Eligible: False]
       │                                 │
       ▼                                 ▼
Create ReturnRequest (RET-xxxx)  Return Rejected with clear reason
       │
       ▼
Initiate Refund (REF-xxxx)
```

### Policy Rules
1. **7-Day Policy**: Products delivered within 7 calendar days (e.g. `ORD1003`) are eligible for return. Products delivered > 7 days ago (e.g. `ORD1002`) are marked expired/ineligible.
2. **Hygiene Policy**: Specific products (e.g. `PROD005` - Ergonomic Memory Foam Pillow) are flagged `returnable=False` for hygiene safety.
