# Support & Escalation Workflows

## 🎫 The Support Lifecycle

When automated AI workflows encounter unresolvable customer disputes, ShopSathi prevents customer deadlocks through a structured **AI-to-Human Escalation Pipeline**:

```
1. Customer Reports Issue
   (e.g., "UPI deduction occurred but order ORD1005 is still processing")
          │
          ▼
2. AI Evaluates Friction
   (Model identifies payment gateway dispute requires human supervisor)
          │
          ▼
3. Autonomous Ticket Generation (create_support_ticket)
   (Backend generates TKT9001 with High priority, Category: Payment Issue)
          │
          ▼
4. Human Escalation (escalate_support_ticket)
   (Status transitions to 'Escalated' and assigns to 'Tier 2 Human Agent')
          │
          ▼
5. Resolution & Customer Notification
   (Ticket status tracked live via check_support_ticket)
```

---

## 👥 Escalation Rules & SLA Categories

| Category | Typical Scenarios | Initial Priority | Initial Assigned To | Escalation Target |
|---|---|:---:|---|---|
| **Payment Issue** | Gateway timeout, duplicate deduction, refund dispute | **High** | AI Agent | Tier 2 Human Support Agent |
| **Shipping Delay** | Package delayed beyond SLA, delivery boy uncontactable | **Medium** | AI Agent | Logistics Operations Lead |
| **Return Dispute** | Damaged item received, rejected return appeal | **Medium** | AI Agent | Customer Care Supervisor |
| **Product Inquiry** | Sizing advice, compatibility question | **Low** | AI Agent | AI Agent (Resolved autonomously) |
