# ShopSathi AI — Screenshot Catalog & Visual Demonstration

This catalog contains high-resolution, working screenshots of the **ShopSathi AI** platform captured directly from the live production application and local environment.

---

## 🖥️ Core Desktop Experience (1440×900)

### 1. Home Page
![01-home.png](screenshots/01-home.png)
* **Route**: `#/`
* **Features**: ShopSathi branding, hero value proposition ("Smart Shopping. Smarter Support."), quick-action CTAs, feature cards, and floating dual AI launcher.

### 2. Product Catalog & Search
![02-products.png](screenshots/02-products.png)
* **Route**: `#/products`
* **Features**: Real-time debounced catalog search, category buttons (Electronics, Footwear, Fashion, Home), budget filter slider, and in-stock badges.

### 3. Product Details
![03-product-detail.png](screenshots/03-product-detail.png)
* **Route**: `#/products/PRD101`
* **Features**: High-resolution product showcase, pricing, 7-day return policy tag, quantity selector, and "Add to Cart" action.

### 4. Shopping Cart
![04-cart.png](screenshots/04-cart.png)
* **Route**: `#/cart`
* **Features**: Persistent `localStorage` item table, live quantity controls, subtotal & tax calculation, clear-cart modal, and checkout trigger.

### 5. Checkout Experience
![05-checkout.png](screenshots/05-checkout.png)
* **Route**: `#/checkout`
* **Features**: Customer delivery address form (City, State, PIN), live order summary, and payment mode selector (Cash on Delivery, UPI, Credit/Debit Card).

### 6. My Orders (52-Order Dataset & Pagination)
![06-orders.png](screenshots/06-orders.png)
* **Route**: `#/orders`
* **Features**: Order lookup bar, responsive 10-per-page pagination, and status filter dropdown across all 52 seeded orders (`ORD1001`–`ORD1052`).

### 7. Order Tracking & 6-Step Visual Timeline
![07-order-detail.png](screenshots/07-order-detail.png)
* **Route**: `#/orders/ORD1001`
* **Features**: Real-time delivery timeline (`Placed` ➔ `Confirmed` ➔ `Packed` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`), delivery estimate ("Today by 7:00 PM"), and cancellation state guards.

### 8. 7-Day Return Policy Wizard
![08-returns.png](screenshots/08-returns.png)
* **Route**: `#/returns`
* **Features**: 4-step return wizard evaluating order delivery timestamp against the 7-day policy window (`ORD1003` eligible=True).

### 9. Refund Status Tracker
![09-refund-status.png](screenshots/09-refund-status.png)
* **Route**: `#/returns` (Refund Section)
* **Features**: Real-time bank refund lookup (`REF7001` for `ORD1004`, ₹2,499.0, status `Initiated`).

### 10. Support Center & Human Escalation
![10-support.png](screenshots/10-support.png)
* **Route**: `#/support`
* **Features**: 8 quick-action cards, support ticket generator (`TKTXXXX`), ticket status lookup, and Tier 2 human escalation handoff.

### 11. Customer Profile
![11-profile.png](screenshots/11-profile.png)
* **Route**: `#/profile`
* **Features**: Customer avatar, name (`Mahendra Gurjar`), role badge (`Customer / Owner Demo`), customer ID (`CUST101`), email, phone, and quick navigation links.

### 12. Demo Profile Login Switcher
![12-login.png](screenshots/12-login.png)
* **Route**: `#/login`
* **Features**: 5 clean profile cards (`Mahendra Gurjar`, `ShopSathi Admin`, `ShopSathi HR`, `ShopSathi Team`, `Guest`) with role badges and custom ID login.

---

## 🤖 AI Conversational Agents

### 13. Multilingual Chat Agent (Gemini 3.1 Flash Lite)
![13-chat-agent.png](screenshots/13-chat-agent.png)
* **Features**: Welcome greeting with language hints (English, Hindi, Hinglish), quick suggested chips, and live backend tool execution.

### 14. Chat Order Tracking Action
![14-chat-order-tracking.png](screenshots/14-chat-order-tracking.png)
* **Query**: *"Where is my order ORD1001?"*
* **Features**: Real-time invocation of `check_order_status` displaying live "Out for Delivery" state and expected delivery window.

### 15. Chat Return Eligibility Action
![15-chat-return.png](screenshots/15-chat-return.png)
* **Query**: *"Can I return ORD1003?"*
* **Features**: Invocation of `check_return_eligibility` verifying 7-day return policy.

### 16. Chat Refund Status Action
![16-chat-refund.png](screenshots/16-chat-refund.png)
* **Query**: *"What is the refund status of ORD1004?"*
* **Features**: Invocation of `check_refund_status` returning `REF7001` payout details.

### 17. Chat Human Support Escalation
![17-chat-support-escalation.png](screenshots/17-chat-support-escalation.png)
* **Query**: *"Payment issue for ORD1005, escalate to human supervisor"*
* **Features**: Invocation of `create_support_ticket` + `escalate_support_ticket`, assigning dispute to Tier 2 Human Support Agent.

---

## 🎙️ Real-Time Voice Agent (Gemini 2.5 Flash Audio)

### 18. Voice Agent Panel
![18-voice-agent.png](screenshots/18-voice-agent.png)
* **Features**: Voice interface modal, connection badge, Puck voice profile, and direct phone link (`+91 8031339824`).

### 19. Voice Listening State
![19-voice-listening.png](screenshots/19-voice-listening.png)
* **Features**: Pulsing audio waveform ring, active listening indicator, and microphone toggle.

### 20. Voice Bidirectional Transcript
![20-voice-transcript.png](screenshots/20-voice-transcript.png)
* **Features**: Real-time live speech-to-text transcript displaying user speech and ShopSathi voice responses.

---

## 📱 Mobile Responsiveness (390×844)

### 21. Mobile Home View
![21-mobile-home.png](screenshots/21-mobile-home.png)
* **Features**: Single-column hero layout, touch-friendly navigation drawer, and floating AI button with zero horizontal overflow.

### 22. Mobile Products Catalog
![22-mobile-products.png](screenshots/22-mobile-products.png)
* **Features**: Full-width product cards, mobile filter bar, and sticky add-to-cart controls.

### 23. Mobile Orders & Pagination
![23-mobile-orders.png](screenshots/23-mobile-orders.png)
* **Features**: Responsive order cards, touch-optimized page buttons, and status badges.

---

## 🌐 Production & Infrastructure

### 24. Live Production Web App
![24-production-app.png](screenshots/24-production-app.png)
* **URL**: [https://shopsathi-ai.onrender.com/app/](https://shopsathi-ai.onrender.com/app/)

### 25. Interactive Admin Dashboard
![25-admin-dashboard.png](screenshots/25-admin-dashboard.png)
* **URL**: [https://shopsathi-ai.onrender.com/static/index.html](https://shopsathi-ai.onrender.com/static/index.html)
* **Features**: Live analytics metrics, function testing console, and structured audit log viewer.

### 26. Swagger OpenAPI Documentation
![26-swagger-api.png](screenshots/26-swagger-api.png)
* **URL**: [https://shopsathi-ai.onrender.com/docs](https://shopsathi-ai.onrender.com/docs)
* **Features**: Interactive API documentation for all 15 REST endpoints.

### 27. GitHub Source Code Repository
![27-github-repository.png](screenshots/27-github-repository.png)
* **URL**: [https://github.com/Mahendra7073/shopsathi-ai](https://github.com/Mahendra7073/shopsathi-ai)
