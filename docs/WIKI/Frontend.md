# Frontend Application

## 🖥️ Architecture & Design System

The ShopSathi frontend is a high-performance, single-page application built with **Vite** and **Vanilla JavaScript ES6** using custom CSS design tokens:

* **Primary Palette**: Primary `#2563EB`, Dark `#0F172A`, Accent `#06B6D4`, Success `#16A34A`, Warning `#F59E0B`, Error `#DC2626`, Background `#F8FAFC`.
* **Typography**: Inter (Google Fonts) with standardized scale tokens.
* **Build Tooling**: Vite v6.4 (Production build time: ~500ms).

---

## 📄 11 Verified Application Views

1. **Home (`#/`)**: Hero banner, quick-action cards, live system counters, and dual AI launcher.
2. **Products (`#/products`)**: Real-time debounced catalog search, category buttons, budget slider, and stock indicators.
3. **Product Detail (`#/products/:id`)**: High-resolution gallery, specifications, 7-day policy tags, and quantity selector.
4. **Cart (`#/cart`)**: Persistent `localStorage` store, live subtotal & tax computation, item removal, and checkout trigger.
5. **Checkout (`#/checkout`)**: Delivery address input, order summary, and payment mode selector (COD, UPI, Card).
6. **My Orders (`#/orders`)**: Real-time order lookup, 10-per-page client pagination, and status filter dropdown across 52 orders.
7. **Order Detail (`#/orders/:id`)**: 6-step visual delivery timeline (`Order Placed` ➔ `Confirmed` ➔ `Packed` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`) with cancellation actions.
8. **Returns & Refunds (`#/returns`)**: 4-step return wizard (order input, eligibility check, reason selection, submission) and refund status tracker.
9. **Support Center (`#/support`)**: 8 quick-action navigation cards, ticket creation form, status checker, and human escalation trigger.
10. **Customer Profile (`#/profile`)**: User information, customer ID, order counts, and navigation shortcuts.
11. **Login Switcher (`#/login`)**: Fast demo switcher between customers (`CUST101`–`CUST105`) and custom ID login.

---

## 📱 Mobile Responsiveness
All views are fully responsive with **zero horizontal scrolling** across:
* **Desktop**: `1920×1080`
* **Laptop**: `1366×768`
* **Tablet**: `768×1024`
* **Mobile**: `390×844`
