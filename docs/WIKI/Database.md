# Database Schema & Data Models

ShopSathi uses **SQLAlchemy ORM** to manage relational entities with automated seed data generation.

---

## 🗄️ Entity Relationship Diagram

```
   ┌──────────────┐             ┌──────────────┐
   │   Customer   │1           N│    Order     │
   │──────────────│─────────────│──────────────│
   │ customer_id  │             │ order_id     │
   │ name         │             │ customer_id  │
   │ email        │             │ product_id   │
   │ phone        │             │ quantity     │
   └──────────────┘             │ amount       │
                                │ status       │
   ┌──────────────┐             │ order_date   │
   │   Product    │1           N│ delivered_dat│
   │──────────────│─────────────│ expected_del │
   │ product_id   │             └──────┬───────┘
   │ name         │                    │
   │ category     │         ┌──────────┴──────────┐
   │ price        │        1│                    1│
   │ stock        │         ▼                     ▼
   │ returnable   │  ┌──────────────┐     ┌──────────────┐
   └──────────────┘  │ReturnRequest │     │    Refund    │
                     │──────────────│     │──────────────│
                     │ return_id    │     │ refund_id    │
                     │ order_id     │     │ order_id     │
                     │ reason       │     │ amount       │
                     │ status       │     │ status       │
                     └──────────────┘     │ expected_date│
                                          └──────────────┘

   ┌──────────────┐             ┌──────────────┐
   │SupportTicket │             │   AuditLog   │
   │──────────────│             │──────────────│
   │ ticket_id    │             │ log_id       │
   │ customer_id  │             │ event_type   │
   │ order_id     │             │ payload      │
   │ status       │             │ timestamp    │
   │ assigned_to  │             └──────────────┘
   └──────────────┘
```

---

## 📋 Entity Descriptions

1. **`Product`**: Stores catalog items (`product_id`, `name`, `category`, `price`, `description`, `stock`, `returnable`).
2. **`Customer`**: Stores user profiles (`customer_id`, `name`, `email`, `phone`).
3. **`Order`**: Stores purchases (`order_id`, `customer_id`, `product_id`, `quantity`, `amount`, `status`, `order_date`, `expected_delivery`, `delivered_date`).
4. **`ReturnRequest`**: Manages return workflows (`return_id`, `order_id`, `reason`, `status`, `created_at`).
5. **`Refund`**: Tracks payout records (`refund_id`, `order_id`, `amount`, `status`, `initiated_at`, `expected_date`).
6. **`SupportTicket`**: Tracks issues and human escalations (`ticket_id`, `customer_id`, `order_id`, `category`, `priority`, `description`, `status`, `assigned_to`, `reason_for_escalation`).
7. **`AuditLog`**: Structured logging for AI tool calls and system operations.
