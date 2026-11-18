# ShopSathi AI — Screenshot Catalog & Visual Demonstration

**Project Title:** ShopSathi AI — An AI-Powered E-Commerce and Customer Support Platform
**Academic Context:** B.Tech CSE Minor Project — MBM University, Jodhpur
**Developers:** Mahendra Gurjar (24UCSE4018) · Kailash (24UCSE4014) — Semester VII

This catalog presents genuine, high-resolution screenshots of the **ShopSathi AI** platform captured directly from the live running application (`http://localhost:8000/app/` and `https://shopsathi-ai.onrender.com/app/`).

---

## 🖥️ Core Desktop Experience (1280×800)

### 1. Home Page
![01-home.png](screenshots/latest/01-home.png)
* **Route**: `#/`
* **Features**: ShopSathi branding, hero banner ("Smart Shopping. Smarter Support."), quick-action category CTAs, feature pillars, and floating dual AI launcher.

### 2. Product Catalog & Search
![02-products.png](screenshots/latest/02-products.png)
* **Route**: `#/products`
* **Features**: Real-time debounced catalog search, category buttons (All, Electronics, Footwear, Fashion, Home), budget price filter, and in-stock badges.

### 3. Product Details
![03-product-detail.png](screenshots/latest/03-product-detail.png)
* **Route**: `#/products/PROD001`
* **Features**: Product showcase, price display, returnable/non-returnable policy badge, quantity counter, and "Add to Cart" button.

### 4. Shopping Cart
![04-cart.png](screenshots/latest/04-cart.png)
* **Route**: `#/cart`
* **Features**: Persistent `localStorage` cart state, live item count updates, subtotal and estimated total calculation, and proceed to checkout action.

### 5. Checkout Experience
![05-checkout.png](screenshots/latest/05-checkout.png)
* **Route**: `#/checkout`
* **Features**: Customer delivery shipping form, order summary breakdown, and simulated payment methods (UPI, Cash on Delivery, Card).

### 6. Order History (Customer CUST101)
![06-orders.png](screenshots/latest/06-orders.png)
* **Route**: `#/orders`
* **Features**: Seeded customer order list displaying order IDs, status badges (Delivered, Out for Delivery, Processing, Cancelled), total amounts, and view-details triggers.

### 7. Order Details & Tracking Timeline
![07-order-detail.png](screenshots/latest/07-order-detail.png)
* **Route**: `#/orders/ORD1001`
* **Features**: Complete lifecycle tracking timeline (Order Placed → Processing → Shipped → Out for Delivery → Delivered), delivery dates, courier info, and self-service cancellation guard.

### 8. Returns & Exchanges
![08-returns.png](screenshots/latest/08-returns.png)
* **Route**: `#/returns`
* **Features**: Return request submission form, order ID selection, reason dropdown (Defective, Size Issue, Wrong Item), and return eligibility validation.

### 9. Refund Status Tracker
![09-refund-status.png](screenshots/latest/09-refund-status.png)
* **Route**: `#/returns` (Refund Status Section)
* **Features**: Real-time lookup of payout state, refund ID, amount (₹2,499), and estimated refund arrival date.

### 10. Customer Support & Escalation
![10-support.png](screenshots/latest/10-support.png)
* **Route**: `#/support`
* **Features**: Support ticket generation form, category selector (Payment Issue, Return Dispute, Shipping Delay), priority level, and escalation to human agent.

### 11. Customer Profile
![11-profile.png](screenshots/latest/11-profile.png)
* **Route**: `#/profile`
* **Features**: Authenticated customer card (Mahendra Gurjar, `CUST101`), email, phone, role badge, and active order count.

### 12. Profile Switcher (Login)
![12-login.png](screenshots/latest/12-login.png)
* **Route**: `#/login`
* **Features**: Fast multi-persona profile switcher for evaluation and demo (`CUST101` Mahendra Gurjar, `CUST102` Admin, `CUST103` HR, `CUST104` Team, `CUST105` Guest).

---

## 🤖 AI Assistant Capabilities

### 13. Multilingual Chat Agent
![13-chat-assistant.png](screenshots/latest/13-chat-assistant.png)
* **Interface**: Floating slide-out chat drawer (`#ai-panel`)
* **Features**: Dual-mode quick actions, real-time tool calling (`GET /orders/ORD1001`), natural language response, and quick action suggestion pills. Supports English, Hindi, and Hinglish.

### 14. Real-Time Voice Assistant
![14-voice-assistant.png](screenshots/latest/14-voice-assistant.png)
* **Interface**: Full interactive audio modal (`#ai-voice-panel`)
* **Features**: W3C Web Speech API integration, visual audio wave animation, connection status badge, live speech-to-text transcript display, and mute/stop controls.

---

## 📊 Operations & Administration

### 15. Operations & Admin Monitoring Dashboard
![15-admin-dashboard.png](screenshots/latest/15-admin-dashboard.png)
* **URL**: `http://localhost:8000/static/index.html`
* **Features**: Aggregated real-time metrics (Total requests, AI resolved vs escalated, average latency in ms), and live structured audit log stream.

### 16. Interactive Swagger API Documentation
![16-swagger-docs.png](screenshots/latest/16-swagger-docs.png)
* **URL**: `http://localhost:8000/docs`
* **Features**: Interactive OpenAPI 3.0 specification for all 8 routers and 18 REST endpoints with schema models and live "Try it out" testing.

---

## 📱 Mobile Responsive Views (375×812)

### 17. Mobile Home Page
![17-mobile-home.png](screenshots/latest/17-mobile-home.png)
* **Viewport**: iPhone / Android mobile display (375×812)
* **Features**: Collapsible mobile navigation, touch-friendly product cards, and responsive floating AI trigger button.

### 18. Mobile Order Tracking
![18-mobile-orders.png](screenshots/latest/18-mobile-orders.png)
* **Viewport**: Mobile display (375×812)
* **Features**: Compact order status cards and mobile timeline tracking.
