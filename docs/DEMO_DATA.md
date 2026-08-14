# ShopSathi AI — Demo Data Cheat Sheet

This document contains pre-seeded test records and verification scenarios for live demonstrations and judging evaluations.

---

## 👥 Demo Customers

| Customer ID | Name | Phone | Email | Total Orders |
|---|---|---|---|:---:|
| **`CUST101`** | Rahul Sharma | `9876543210` | `rahul.sharma@example.com` | 12 |
| **`CUST102`** | Priya Patel | `9812345678` | `priya.patel@example.com` | 11 |
| **`CUST103`** | Amit Kumar | `9988776655` | `amit.kumar@example.com` | 10 |
| **`CUST104`** | Sneha Gupta | `9765432109` | `sneha.gupta@example.com` | 9 |
| **`CUST105`** | Vikram Malhotra | `9823456781` | `vikram.m@example.com` | 10 |

---

## 🎯 Key Test Scenarios (Core Demo Orders)

| Order ID | Customer | Product | Amount | Live Status | Demonstration Scenario & Behavior |
|---|---|---|---|---|---|
| **`ORD1001`** | `CUST101` | AirPro Wireless Headphones | ₹4,999.0 | **Out for Delivery** | Expected Delivery: "Today by 7:00 PM". Cannot be cancelled (Out for Delivery state). |
| **`ORD1002`** | `CUST102` | Cotton Oxford Casual Shirt | ₹1,299.0 | **Delivered** | Delivered 12 days ago. Cancellation **strictly rejected** (HTTP 400). Return window expired (> 7 days). |
| **`ORD1003`** | `CUST103` | UltraFit Pro Running Shoes | ₹1,899.0 | **Delivered** | Delivered 2 days ago. **Eligible for Return** (within 7-day window). Successfully creates `RETXXXX`. |
| **`ORD1004`** | `CUST101` | SmartWatch Active 4 | ₹2,499.0 | **Returned** | Linked to Refund **`REF7001`** (₹2,499.0, Status: `Initiated`, Expected in 2–3 business days). |
| **`ORD1005`** | `CUST102` | Memory Foam Pillow | ₹1,499.0 | **Processing** | **Cancellable order**. Linked to initial escalated payment ticket `TKT9001`. |

---

## 📦 Expanded Dataset Highlights (52 Orders: `ORD1001` → `ORD1052`)

| Order ID | Customer | Product | Amount | Live Status | Expected Delivery / Details |
|---|---|---|---|---|---|
| **`ORD1006`** | `CUST101` | Cotton Oxford Shirt (Qty 2) | ₹2,598.0 | **Processing** | Payment Confirmed - Order in queue |
| **`ORD1010`** | `CUST101` | Memory Foam Pillow | ₹1,499.0 | **Processing** | Verification in progress |
| **`ORD1013`** | `CUST101` | UltraFit Running Shoes | ₹1,899.0 | **Confirmed** | Delivery expected in 3 days |
| **`ORD1018`** | `CUST101` | SmartWatch Active 4 | ₹2,499.0 | **Packed** | Courier pickup scheduled |
| **`ORD1020`** | `CUST104` | Cotton Oxford Shirt | ₹1,299.0 | **Packed** | Awaiting courier handover |
| **`ORD1024`** | `CUST102` | AirPro Wireless Headphones | ₹4,999.0 | **Shipped** | BlueDart Tracking #BD8921 |
| **`ORD1030`** | `CUST102` | UltraFit Running Shoes | ₹1,899.0 | **Out for Delivery** | Out for delivery by Courier Partner |
| **`ORD1034`** | `CUST101` | UltraFit Running Shoes | ₹1,899.0 | **Out for Delivery** | Out for delivery in your area |
| **`ORD1036`** | `CUST101` | AirPro Wireless Headphones | ₹4,999.0 | **Delivered** | Delivered 3 days ago (Return Eligible) |
| **`ORD1040`** | `CUST105` | Memory Foam Pillow (Qty 2) | ₹2,998.0 | **Delivered** | Delivered 8 days ago |
| **`ORD1048`** | `CUST101` | SmartWatch Active 4 | ₹2,499.0 | **Cancelled** | Order cancelled by customer |
| **`ORD1049`** | `CUST103` | AirPro Wireless Headphones | ₹4,999.0 | **Cancelled** | Linked to Refund **`REF7002`** (Completed) |
| **`ORD1050`** | `CUST104` | Memory Foam Pillow | ₹1,499.0 | **Cancelled** | Cancelled prior to dispatch |
| **`ORD1051`** | `CUST105` | UltraFit Running Shoes | ₹1,899.0 | **Return Requested** | Linked to Return **`RET6002`** (Requested) |
| **`ORD1052`** | `CUST102` | Cotton Oxford Shirt | ₹1,299.0 | **Returned** | Linked to Refund **`REF7003`** (Processing) |

---

## 🏷️ Product Catalog Reference

| Product ID | Product Name | Category | Price | Stock | Returnable Policy |
|---|---|---|---|:---:|:---:|
| **`PRD101`** | AirPro Wireless Noise-Cancelling Headphones | Electronics | ₹4,999.0 | 45 | ✅ Yes (7-Day Policy) |
| **`PRD102`** | UltraFit Pro Running Shoes | Footwear | ₹1,899.0 | 20 | ✅ Yes (7-Day Policy) |
| **`PRD103`** | SmartWatch Active 4 | Electronics | ₹2,499.0 | 15 | ✅ Yes (7-Day Policy) |
| **`PRD104`** | Cotton Oxford Casual Shirt | Fashion | ₹1,299.0 | 80 | ✅ Yes (7-Day Policy) |
| **`PRD105`** | Stainless Steel Insulated Water Bottle 1L | Home | ₹799.0 | 120 | ❌ No (Hygiene Policy) |
| **`PRD106`** | Ergonomic Memory Foam Pillow | Home | ₹1,499.0 | 30 | ✅ Yes (7-Day Policy) |

---

## 🎫 Pre-Seeded Support Tickets

| Ticket ID | Customer | Order ID | Category | Priority | Live Status | Assigned To |
|---|---|---|---|---|---|---|
| **`TKT9001`** | `CUST102` | `ORD1005` | Payment Issue | High | **Escalated** | Tier 2 Human Agent |
| **`TKT9002`** | `CUST101` | `ORD1001` | Shipping Delay | Medium | **Open** | AI Agent |
| **`TKT9003`** | `CUST103` | `ORD1003` | Return Dispute | Low | **Resolved** | AI Agent |
