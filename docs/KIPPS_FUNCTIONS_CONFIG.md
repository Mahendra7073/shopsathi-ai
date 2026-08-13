# Kipps.AI API Functions Configuration Specification

This document provides explicit, copy-pasteable configuration specifications for every Kipps.AI API Function.

> **Base URL Placeholder**: `<PUBLIC_API_URL>` (e.g. `https://shopsathi-api.onrender.com` or your `ngrok` URL `https://xxxx.ngrok-free.app`).  
> **API Security Header**: `X-API-Key: YOUR_SHOP_SATHI_API_KEY` (configured in Kipps function custom headers).

---

## Kipps Function Mapping Table

| Kipps Function Name | HTTP Method | Endpoint Path | Primary Purpose |
| :--- | :--- | :--- | :--- |
| `check_order_status` | `GET` | `/orders/{order_id}` | Real-time order tracking (URL path param) |
| `check_order_status_post` | `POST` | `/orders/lookup` | Real-time order tracking (JSON body payload) |
| `check_return_eligibility` | `GET` | `/orders/{order_id}/return-eligibility` | 7-day policy & item returnability decision |
| `create_return_request` | `POST` | `/returns` | Submit return pickup request |
| `check_refund_status` | `GET` | `/orders/{order_id}/refund` | Refund transaction status & payout date |
| `search_products` | `GET` | `/products/search` | Product recommendations & budget filtering |
| `cancel_order` | `POST` | `/orders/{order_id}/cancel` | Order cancellation for processing items |
| `create_support_ticket` | `POST` | `/support/tickets` | Issue ticket creation for customer complaints |
| `escalate_support_ticket` | `POST` | `/support/tickets/{ticket_id}/escalate` | Escalate unresolved ticket to Tier 2 human agent |

---

## Detailed Function Specifications

### 1. `check_order_status` (GET Endpoint)
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

---

### 1b. `check_order_status_post` (POST Endpoint with JSON Body)
* **Function Name**: `check_order_status_post`
* **Description**: `"Use this function to look up an order status by sending the order_id inside the JSON request body. Ideal for tool calling engines requiring POST JSON body payloads."`
* **HTTP Method**: `POST`
* **Endpoint Path**: `/orders/lookup`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/orders/lookup`
* **Custom Headers**: `Content-Type: application/json`, `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Request Body (JSON)**:
  ```json
  {
    "order_id": "ORD1002"
  }
  ```
* **Example Response**:
  ```json
  {
    "order_id": "ORD1002",
    "status": "Delivered",
    "expected_delivery": "Delivered 12 days ago",
    "tracking_available": true,
    "product_name": "Cotton Oxford Casual Shirt",
    "product_id": "PRD104",
    "customer_id": "CUST102",
    "quantity": 1,
    "amount": 1299.0,
    "order_date": "2026-07-29T17:59:13.476693",
    "delivered_date": "2026-08-01T17:59:13.476693"
  }
  ```

---

### 2. `check_return_eligibility` (GET Endpoint)
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

---

### 2b. `check_return_eligibility_post` (POST Endpoint with JSON Body)
* **Function Name**: `check_return_eligibility_post`
* **Description**: `"Use this function to check return eligibility using a JSON body payload containing order_id."`
* **HTTP Method**: `POST`
* **Endpoint Path**: `/orders/return-eligibility`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/orders/return-eligibility`
* **Custom Headers**: `Content-Type: application/json`, `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Request Body (JSON)**:
  ```json
  {
    "order_id": "ORD1003"
  }
  ```
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

---

### 4. `check_refund_status` (GET Endpoint)
* **Function Name**: `check_refund_status`
* **Description**: `"Use this function when a customer asks about their refund status, money reversal, refund transaction ID, or expected refund date for a returned or cancelled order."`
* **HTTP Method**: `GET`
* **Endpoint Path**: `/orders/{order_id}/refund`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/orders/{order_id}/refund`
* **Custom Headers**: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Parameters**:
  * `order_id` (Type: `string`, Location: `path`, Required: `true`, Description: `Order ID format ORDxxxx e.g. ORD1004`)
* **Example Request**: `GET <PUBLIC_API_URL>/orders/ORD1004/refund`

---

### 4b. `check_refund_status_post` (POST Endpoint with JSON Body)
* **Function Name**: `check_refund_status_post`
* **Description**: `"Use this function to retrieve refund status and details for an order using JSON body request payload."`
* **HTTP Method**: `POST`
* **Endpoint Path**: `/orders/refund-status`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/orders/refund-status`
* **Custom Headers**: `Content-Type: application/json`, `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Request Body (JSON)**:
  ```json
  {
    "order_id": "ORD1004"
  }
  ```
* **Example Response**:
  ```json
  {
    "order_id": "ORD1004",
    "refund_status": "Initiated",
    "amount": 2499.0,
    "expected_date": "2026-08-16",
    "refund_id": "REF7001",
    "initiated_at": "2026-08-13T10:00:00",
    "message": "Refund REF7001 for ₹2499.0 is currently in status 'Initiated'. Expected completion: 2026-08-16."
  }
  ```

---

### 5. `search_products` (GET Endpoint)
* **Function Name**: `search_products`
* **Description**: `"Use this function to search products in the catalog when the customer asks for recommendations, products under a specific price budget, or specific categories (Electronics, Footwear, Fashion, Home)."`
* **HTTP Method**: `GET`
* **Endpoint Path**: `/products/search`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/products/search`

---

### 5b. `search_products_post` (POST Endpoint with JSON Body)
* **Function Name**: `search_products_post`
* **Description**: `"Use this function to search products in the catalog using a JSON body payload containing query, max_price, or category."`
* **HTTP Method**: `POST`
* **Endpoint Path**: `/products/search`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/products/search`
* **Custom Headers**: `Content-Type: application/json`, `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Request Body (JSON)**:
  ```json
  {
    "query": "wireless headphones"
  }
  ```
* **Example Response**:
  ```json
  [
    {
      "product_id": "PRD101",
      "name": "AirPro Wireless Noise-Cancelling Headphones",
      "category": "Electronics",
      "price": 4999.0,
      "description": "Premium active noise cancellation headphones with 30hr battery life.",
      "stock": 45,
      "returnable": true
    }
  ]
  ```

---

### 6. `cancel_order`
* **Function Name**: `cancel_order`
* **Description**: `"Use this function when a customer requests to cancel an order that has not been delivered yet. Cancels orders currently in 'Processing' or 'Order Placed' status."`
* **HTTP Method**: `POST`
* **Endpoint Path**: `/orders/cancel` (or `/orders/{order_id}/cancel`)
* **Full URL Placeholder**: `<PUBLIC_API_URL>/orders/cancel`
* **Custom Headers**: `Content-Type: application/json`, `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Parameters** (JSON Body):
  * `order_id` (Type: `string`, Required: `true`, Description: `Order ID e.g. ORD1005`)
* **Example Request Body**:
  ```json
  {
    "order_id": "ORD1005"
  }
  ```
* **Example Response**:
  ```json
  {
    "success": true,
    "order_id": "ORD1005",
    "status": "Cancelled",
    "message": "Order ORD1005 has been successfully cancelled. Any charged amount will be refunded within 3-5 business days."
  }
  ```

---

### 7. `create_support_ticket`
* **Function Name**: `create_support_ticket`
* **Description**: `"Use this function to log a support ticket when a customer faces an issue or complaint requiring record keeping."`
* **HTTP Method**: `POST`
* **Endpoint Path**: `/support/tickets`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/support/tickets`
* **Custom Headers**: `Content-Type: application/json`, `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Parameters** (JSON Body):
  * `customer_id` (Type: `string`, Required: `true`, Description: `Customer ID e.g. CUST101`)
  * `subject` (Type: `string`, Required: `true`, Description: `Subject summary e.g. Issue with order ORD1001`)
  * `description` (Type: `string`, Required: `true`, Description: `Detailed issue description`)
  * `priority` (Type: `string`, Required: `true`, Description: `Priority e.g. low, medium, high, critical`)
* **Example Request Body**:
  ```json
  {
    "customer_id": "CUST101",
    "subject": "Issue with order ORD1001",
    "description": "I need assistance regarding my order ORD1001.",
    "priority": "high"
  }
  ```
* **Example Response**:
  ```json
  {
    "success": true,
    "ticket_id": "TKT8F2A1B",
    "customer_id": "CUST101",
    "subject": "Issue with order ORD1001",
    "category": "Issue with order ORD1001",
    "priority": "High",
    "description": "I need assistance regarding my order ORD1001.",
    "status": "Open",
    "assigned_to": "AI Agent",
    "order_id": null,
    "created_at": "2026-08-14T01:50:00",
    "message": "Support ticket TKT8F2A1B created successfully for customer 'CUST101' with priority 'High'."
  }
  ```

---

### 7b. `get_support_ticket_post` (POST Endpoint with JSON Body)
* **Function Name**: `get_support_ticket_post`
* **Description**: `"Use this function to check the status or retrieve details of an existing support ticket by sending ticket_id inside the JSON request body."`
* **HTTP Method**: `POST`
* **Endpoint Path**: `/support/tickets/status`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/support/tickets/status`
* **Custom Headers**: `Content-Type: application/json`, `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Parameters** (JSON Body):
  * `ticket_id` (Type: `string`, Required: `true`, Description: `Ticket ID e.g. TKT6CBDC8`)
* **Example Request Body**:
  ```json
  {
    "ticket_id": "TKT6CBDC8"
  }
  ```
* **Example Response**:
  ```json
  {
    "success": true,
    "ticket_id": "TKT6CBDC8",
    "customer_id": "CUST101",
    "subject": "Issue with order ORD1001",
    "category": "Issue with order ORD1001",
    "priority": "High",
    "description": "I need assistance regarding my order ORD1001.",
    "status": "Escalated",
    "assigned_to": "Tier 2 Human Support Agent",
    "order_id": null,
    "reason_for_escalation": "Escalated by AI Agent due to unresolved complex issue",
    "escalated_at": "2026-08-14T02:00:00",
    "created_at": "2026-08-14T01:50:00",
    "message": "Ticket TKT6CBDC8 is currently 'Escalated' (Assigned to: Tier 2 Human Support Agent)."
  }
  ```

---

### 8. `escalate_support_ticket` (GET / Path Param Endpoint)
* **Function Name**: `escalate_support_ticket`
* **Description**: `"Use this function when a customer demands to speak to a human agent, or when an issue cannot be resolved by AI tools alone. Marks ticket as Escalated and assigns to Tier 2 Human Support Agent."`
* **HTTP Method**: `POST`
* **Endpoint Path**: `/support/tickets/{ticket_id}/escalate`

---

### 8b. `escalate_support_ticket_post` (POST Endpoint with JSON Body)
* **Function Name**: `escalate_support_ticket_post`
* **Description**: `"Use this function to escalate a support ticket by sending the ticket_id inside the JSON request body payload."`
* **HTTP Method**: `POST`
* **Endpoint Path**: `/support/tickets/escalate`
* **Full URL Placeholder**: `<PUBLIC_API_URL>/support/tickets/escalate`
* **Custom Headers**: `Content-Type: application/json`, `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
* **Request Body (JSON)**:
  ```json
  {
    "ticket_id": "TKTD1536D",
    "reason": "Customer requested human assistance"
  }
  ```
* **Example Response**:
  ```json
  {
    "success": true,
    "ticket_id": "TKTD1536D",
    "customer_id": "CUST101",
    "subject": "Issue with order ORD1001",
    "category": "Issue with order ORD1001",
    "priority": "High",
    "description": "I need assistance regarding my order ORD1001.",
    "status": "Escalated",
    "assigned_to": "Tier 2 Human Support Agent",
    "order_id": null,
    "reason_for_escalation": "Customer requested human assistance",
    "escalated_at": "2026-08-14T01:55:00",
    "created_at": "2026-08-14T01:50:00",
    "message": "Ticket TKTD1536D has been escalated to human support (Tier 2 Human Support Agent). Reason: Customer requested human assistance."
  }
  ```
