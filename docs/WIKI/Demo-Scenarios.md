# Demo Scenarios & Verified Records

This page lists all verified test scenarios across the **52 pre-seeded orders** (`ORD1001`–`ORD1052`).

---

## 🎯 Core Demo Scenarios

| Order ID | Customer | Product | Amount | Live Status | Verified Behavior |
|---|---|---|---|---|---|
| **`ORD1001`** | `CUST101` | AirPro Wireless Headphones | ₹4,999.0 | **Out for Delivery** | Expected: "Today by 7:00 PM". Cancellation rejected (Out for Delivery state). |
| **`ORD1002`** | `CUST102` | Cotton Oxford Casual Shirt | ₹1,299.0 | **Delivered** | Delivered 12 days ago. Cancellation rejected (Delivered). Return rejected (> 7 days). |
| **`ORD1003`** | `CUST103` | UltraFit Pro Running Shoes | ₹1,899.0 | **Delivered** | Delivered 2 days ago. Return **eligible** (within 7 days). Creates `RETXXXX`. |
| **`ORD1004`** | `CUST101` | SmartWatch Active 4 | ₹2,499.0 | **Returned** | Linked to refund **`REF7001`** (₹2,499.0, Initiated). |
| **`ORD1005`** | `CUST102` | Memory Foam Pillow | ₹1,499.0 | **Processing** | **Cancellable**. Linked to support ticket `TKT9001` (Escalated). |

---

## 📦 Expanded Dataset Verification Samples

| Order ID | Customer | Product | Amount | Live Status | Details |
|---|---|---|---|---|---|
| **`ORD1010`** | `CUST101` | Memory Foam Pillow | ₹1,499.0 | **Processing** | Verification in progress |
| **`ORD1020`** | `CUST104` | Cotton Oxford Shirt | ₹1,299.0 | **Packed** | Awaiting courier handover |
| **`ORD1030`** | `CUST102` | UltraFit Running Shoes | ₹1,899.0 | **Out for Delivery** | Out for delivery by Courier Partner |
| **`ORD1040`** | `CUST105` | Memory Foam Pillow (Qty 2) | ₹2,998.0 | **Delivered** | Delivered 8 days ago |
| **`ORD1050`** | `CUST104` | Memory Foam Pillow | ₹1,499.0 | **Cancelled** | Cancelled prior to dispatch |
