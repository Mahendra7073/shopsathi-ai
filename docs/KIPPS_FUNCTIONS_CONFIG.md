# Kipps.AI API Functions Configuration Specification

This document provides explicit, copy-pasteable configuration specifications for every Kipps.AI API Function.

> **Base URL Placeholder**: `<PUBLIC_API_URL>` (e.g. `https://shopsathi-api.onrender.com` or your `ngrok` URL `https://xxxx.ngrok-free.app`).  
> **API Security Header**: `X-API-Key: YOUR_SHOP_SATHI_API_KEY` (configured in Kipps function custom headers).

---

## Kipps Function Mapping Table

| Kipps Function Name | HTTP Method | Endpoint Path | Primary Purpose |
| :--- | :--- | :--- | :--- |
| `check_order_status` | `GET` | `/orders/{order_id}` | Real-time order tracking & delivery ETA |
| `check_return_eligibility` | `GET` | `/orders/{order_id}/return-eligibility` | 7-day policy & item returnability decision |
| `create_return_request` | `POST` | `/returns` | Submit return pickup request |
| `check_refund_status` | `GET` | `/orders/{order_id}/refund` | Refund transaction status & payout date |
| `search_products` | `GET` | `/products/search` | Product recommendations & budget filtering |
| `cancel_order` | `POST` | `/orders/{order_id}/cancel` | Order cancellation for processing items |
| `create_support_ticket` | `POST` | `/support/tickets` | Issue ticket creation for customer complaints |
| `escalate_support_ticket` | `POST` | `/support/tickets/{ticket_id}/escalate` | Escalate unresolved ticket to Tier 2 human agent |

---

## Detailed Function Specifications

### 1. `check_order_status`
* **Function Name**: `check_order_status`
* **Description**: `"Use this function when the customer asks about the current status, delivery status, shipping progress, tracking, or expected delivery date of an order. Ask for the order ID if it is not already provided. Never guess order status."`
* **HTTP Method**: `GET`
* **Endpoint Path**: `/orders/{order_id}`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/orders/{order_id}`
* **Custom Headers**: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Parameters**:
  * `order_id` (Type: `string`, Location: `path`, Required: `true`, Description: `Order ID format ORDxxxx e.g. ORD1001`)
* **Example Request**: `GET <PUBLIC_API_URL>/orders/ORD1001`
* **Example Response**:
  ```json
  {
    "order_id": "ORD1001",
    "status": "Out for Delivery",
    "expected_delivery": "Today by 7:00 PM",
    "tracking_available": true,
    "product_name": "AirPro Wireless Noise-Cancelling Headphones",
    "product_id": "PRD101",
    "customer_id": "CUST101",
    "quantity": 1,
    "amount": 4999.0,
    "order_date": "2026-08-12T15:00:00",
    "delivered_date": null
  }
  ```
* **When Agent Should Use**: When customer asks "Where is my order?", "Mera order kab aayega?", or provides an Order ID to track shipment.

---

### 2. `check_return_eligibility`
* **Function Name**: `check_return_eligibility`
* **Description**: `"Use this function before creating a return request to verify if an order is eligible for return. It checks the 7-day return window, delivery status, product returnability policy, and previous return submissions."`
* **HTTP Method**: `GET`
* **Endpoint Path**: `/orders/{order_id}/return-eligibility`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/orders/{order_id}/return-eligibility`
* **Custom Headers**: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Parameters**:
  * `order_id` (Type: `string`, Location: `path`, Required: `true`, Description: `Order ID format ORDxxxx e.g. ORD1003`)
* **Example Request**: `GET <PUBLIC_API_URL>/orders/ORD1003/return-eligibility`
* **Example Response**:
  ```json
  {
    "order_id": "ORD1003",
    "eligible": true,
    "reason": "Order is eligible for return. Delivered 2 days ago (within 7-day return window).",
    "days_since_delivery": 2,
    "returnable_policy": true
  }
  ```
* **When Agent Should Use**: When customer says "I want to return ORD1003", "Mujhe return karna hai", or asks if an item can be returned.

---

### 3. `create_return_request`
* **Function Name**: `create_return_request`
* **Description**: `"Use this function to formally create a return request after verifying that the order is eligible. Requires order ID and a reason for return."`
* **HTTP Method**: `POST`
* **Endpoint Path**: `/returns`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/returns`
* **Custom Headers**: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Parameters** (JSON Body):
  * `order_id` (Type: `string`, Required: `true`, Description: `Order ID e.g. ORD1003`)
  * `reason` (Type: `string`, Required: `true`, Description: `Reason for return e.g. Size too small`)
* **Example Request Body**:
  ```json
  {
    "order_id": "ORD1003",
    "reason": "Size too small"
  }
  ```
* **Example Response**:
  ```json
  {
    "success": true,
    "return_id": "RET78A1B",
    "order_id": "ORD1003",
    "reason": "Size too small",
    "status": "Requested",
    "created_at": "2026-08-13T20:30:00",
    "message": "Return request RET78A1B submitted successfully! Pickup will be scheduled within 24-48 hours."
  }
  ```
* **When Agent Should Use**: After `check_return_eligibility` confirms eligibility and customer confirms return reason.

---

### 4. `check_refund_status`
* **Function Name**: `check_refund_status`
* **Description**: `"Use this function when a customer asks about their refund status, money reversal, refund transaction ID, or expected refund date for a returned or cancelled order."`
* **HTTP Method**: `GET`
* **Endpoint Path**: `/orders/{order_id}/refund`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/orders/{order_id}/refund`
* **Custom Headers**: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Parameters**:
  * `order_id` (Type: `string`, Location: `path`, Required: `true`, Description: `Order ID format ORDxxxx e.g. ORD1004`)
* **Example Request**: `GET <PUBLIC_API_URL>/orders/ORD1004/refund`
* **Example Response**:
  ```json
  {
    "order_id": "ORD1004",
    "refund_status": "Initiated",
    "amount": 2499.0,
    "expected_date": "Within 2-3 business days to original payment method (Bank AC ending 4091)",
    "refund_id": "REF7001",
    "initiated_at": "2026-08-12T10:00:00",
    "message": "Refund REF7001 for ₹2499.0 is currently in status 'Initiated'."
  }
  ```
* **When Agent Should Use**: When customer asks "Mera refund kab aayega?", "Where is my refund for ORD1004?", or checks refund status.

---

### 5. `search_products`
* **Function Name**: `search_products`
* **Description**: `"Use this function to search products in the catalog when the customer asks for recommendations, products under a specific price budget, or specific categories (Electronics, Footwear, Fashion, Home)."`
* **HTTP Method**: `GET`
* **Endpoint Path**: `/products/search`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/products/search`
* **Custom Headers**: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Query Parameters**:
  * `query` (Type: `string`, Location: `query`, Required: `false`, Description: `Product name or keyword search e.g. running shoes`)
  * `max_price` (Type: `number`, Location: `query`, Required: `false`, Description: `Maximum budget limit in INR e.g. 2000`)
  * `category` (Type: `string`, Location: `query`, Required: `false`, Description: `Category filter: Electronics, Footwear, Fashion, Home`)
* **Example Request**: `GET <PUBLIC_API_URL>/products/search?query=running&max_price=2000`
* **Example Response**:
  ```json
  [
    {
      "product_id": "PRD102",
      "name": "UltraFit Pro Running Shoes",
      "category": "Footwear",
      "price": 1899.0,
      "description": "Lightweight breathable mesh running shoes with shock-absorbing soles.",
      "stock": 20,
      "returnable": true
    }
  ]
  ```
* **When Agent Should Use**: When customer asks "Show running shoes under 2000", "₹1500 me shirt dikhao", or asks for product suggestions.

---

### 6. `cancel_order`
* **Function Name**: `cancel_order`
* **Description**: `"Use this function when a customer requests to cancel an order that has not been delivered yet. Cancels orders currently in 'Processing' or 'Order Placed' status."`
* **HTTP Method**: `POST`
* **Endpoint Path**: `/orders/{order_id}/cancel`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/orders/{order_id}/cancel`
* **Custom Headers**: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Parameters**:
  * `order_id` (Type: `string`, Location: `path`, Required: `true`, Description: `Order ID e.g. ORD1005`)
* **Example Request**: `POST <PUBLIC_API_URL>/orders/ORD1005/cancel`
* **Example Response**:
  ```json
  {
    "success": true,
    "order_id": "ORD1005",
    "status": "Cancelled",
    "message": "Order ORD1005 has been successfully cancelled. Any charged amount will be refunded within 3-5 business days."
  }
  ```
* **When Agent Should Use**: When customer requests "Cancel my order ORD1005", "Mujhe order cancel karna hai".

---

### 7. `create_support_ticket`
* **Function Name**: `create_support_ticket`
* **Description**: `"Use this function to log a support ticket when a customer faces an unresolved payment issue, shipping delay, damaged product dispute, or complex inquiry requiring record keeping."`
* **HTTP Method**: `POST`
* **Endpoint Path**: `/support/tickets`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/support/tickets`
* **Custom Headers**: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Parameters** (JSON Body):
  * `customer_id` (Type: `string`, Required: `true`, Description: `Customer ID e.g. CUST101`)
  * `category` (Type: `string`, Required: `true`, Description: `Category: Payment Issue, Shipping Delay, Return Dispute, Cancellation, General`)
  * `description` (Type: `string`, Required: `true`, Description: `Detailed description of customer problem`)
  * `priority` (Type: `string`, Required: `false`, Description: `Low, Medium, High, Critical (default: Medium)`)
  * `order_id` (Type: `string`, Required: `false`, Description: `Associated Order ID if applicable e.g. ORD1005`)
* **Example Request Body**:
  ```json
  {
    "customer_id": "CUST102",
    "category": "Payment Issue",
    "description": "Payment deducted ₹1499 via UPI but order status still processing",
    "priority": "High",
    "order_id": "ORD1005"
  }
  ```
* **Example Response**:
  ```json
  {
    "success": true,
    "ticket_id": "TKT4B91A",
    "customer_id": "CUST102",
    "order_id": "ORD1005",
    "category": "Payment Issue",
    "priority": "High",
    "description": "Payment deducted ₹1499 via UPI but order status still processing",
    "status": "Open",
    "assigned_to": "AI Agent",
    "reason_for_escalation": null,
    "escalated_at": null,
    "created_at": "2026-08-13T20:45:00",
    "message": "Support ticket TKT4B91A created successfully under category 'Payment Issue' with priority 'High'."
  }
  ```
* **When Agent Should Use**: When a complaint cannot be resolved automatically or requires formal ticketing.

---

### 8. `escalate_support_ticket`
* **Function Name**: `escalate_support_ticket`
* **Description**: `"Use this function when a customer demands to speak to a human agent, or when an issue (such as an unconfirmed payment or delayed refund) cannot be resolved by AI tools alone. Marks ticket as Escalated and assigns to Tier 2 Human Support Agent."`
* **HTTP Method**: `POST`
* **Endpoint Path**: `/support/tickets/{ticket_id}/escalate`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/support/tickets/{ticket_id}/escalate`
* **Custom Headers**: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Parameters**:
  * `ticket_id` (Type: `string`, Location: `path`, Required: `true`, Description: `Ticket ID format TKTxxxx e.g. TKT9001`)
  * Body `reason` (Type: `string`, Location: `body`, Required: `false`, Description: `Reason for human escalation`)
* **Example Request Body**:
  ```json
  {
    "reason": "Customer explicitly requested human manager for payment dispute"
  }
  ```
* **Example Response**:
  ```json
  {
    "success": true,
    "ticket_id": "TKT9001",
    "customer_id": "CUST102",
    "order_id": "ORD1005",
    "category": "Payment Issue",
    "priority": "High",
    "description": "Amount ₹1,499 deducted via UPI...",
    "status": "Escalated",
    "assigned_to": "Tier 2 Human Support Agent",
    "reason_for_escalation": "Customer explicitly requested human manager for payment dispute",
    "escalated_at": "2026-08-13T20:50:00",
    "created_at": "2026-08-13T18:00:00",
    "message": "Ticket TKT9001 has been escalated to human support (Tier 2 Human Support Agent)."
  }
  ```
* **When Agent Should Use**: When customer requests "Human se baat karao", "Escalate this issue", or for high-value unresolved disputes.
