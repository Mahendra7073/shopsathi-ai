# Kipps.AI Manual Setup & Dashboard Configuration Guide

This document provides step-by-step instructions for configuring the ShopSathi AI backend inside your Kipps.AI dashboard.

> **UI Disclaimer**: Where exact Kipps dashboard UI label names depend on platform updates, steps are marked with `[VERIFY IN KIPPS DASHBOARD]`.

---

## 1. Exposing Your Backend API

### Option A: Local Tunnel (Recommended for Hackathon Demo)
Expose local port 8000 using `ngrok`:
```bash
ngrok http 8000
```
Copy your public HTTPS forwarding URL: `https://<YOUR_SUBDOMAIN>.ngrok-free.app`

### Option B: Cloud Hosting (Render / Railway)
Deploy via Dockerfile / render.yaml to get a public URL: `https://shopsathi-api.onrender.com`

*Public Health Verification*:
```bash
curl https://<YOUR_PUBLIC_URL>/health
# Expected Output: {"status": "healthy", ...}
```

---

## 2. Step-by-Step Kipps Dashboard Configuration

### Step A: Create & Upload Knowledge Base
1. Open Kipps Dashboard -> Navigate to **Knowledge Base** `[VERIFY IN KIPPS DASHBOARD]`.
2. Click **Create Knowledge Base** -> Name: `ShopSathi Support Knowledge Base`.
3. Upload document or copy text from: `docs/SHOP_SATHI_KNOWLEDGE_BASE.md`.
4. Click **Index / Train Knowledge Base**.
5. Save `KIPPS_KNOWLEDGE_BASE_ID`.

### Step B: Configure API Security Header (Custom Headers)
In Kipps.AI Function tool configuration, under **Custom Headers** `[VERIFY IN KIPPS DASHBOARD]`:
* Header Name: `X-API-Key`
* Header Value: `YOUR_SHOP_SATHI_API_KEY` (as set in `.env` `SHOP_SATHI_API_KEY`)

### Step C: Configure API Functions (Tools)
Navigate to **Tools / Functions** -> **Add New Function** `[VERIFY IN KIPPS DASHBOARD]`. Create the 8 functions using specifications from `docs/KIPPS_FUNCTIONS_CONFIG.md`:

1. **`check_order_status`**:
   - Method: `GET`
   - URL: `https://<YOUR_PUBLIC_URL>/orders/{order_id}`
   - Header: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
2. **`check_return_eligibility`**:
   - Method: `GET`
   - URL: `https://<YOUR_PUBLIC_URL>/orders/{order_id}/return-eligibility`
   - Header: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
3. **`create_return_request`**:
   - Method: `POST`
   - URL: `https://<YOUR_PUBLIC_URL>/returns`
   - Header: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
4. **`check_refund_status`**:
   - Method: `GET`
   - URL: `https://<YOUR_PUBLIC_URL>/orders/{order_id}/refund`
   - Header: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
5. **`search_products`**:
   - Method: `GET`
   - URL: `https://<YOUR_PUBLIC_URL>/products/search`
   - Header: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
6. **`cancel_order`**:
   - Method: `POST`
   - URL: `https://<YOUR_PUBLIC_URL>/orders/{order_id}/cancel`
   - Header: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
7. **`create_support_ticket`**:
   - Method: `POST`
   - URL: `https://<YOUR_PUBLIC_URL>/support/tickets`
   - Header: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`
8. **`escalate_support_ticket`**:
   - Method: `POST`
   - URL: `https://<YOUR_PUBLIC_URL>/support/tickets/{ticket_id}/escalate`
   - Header: `X-API-Key: YOUR_SHOP_SATHI_API_KEY`

### Step D: Configure Chat Agent
1. Go to **Agents** -> **Create Chat Agent** `[VERIFY IN KIPPS DASHBOARD]`.
2. Name: `ShopSathi AI Chat Agent`.
3. Copy system prompt from `docs/KIPPS_CHAT_AGENT_PROMPT.md`.
4. Attach `ShopSathi Support Knowledge Base`.
5. Attach all 8 API Functions.
6. Publish Agent and test in Chat Playground.

### Step E: Prepare Voice Agent
1. Go to **Agents** -> **Create Voice Agent** `[VERIFY IN KIPPS DASHBOARD]`.
2. Name: `ShopSathi AI Voice Agent`.
3. Copy system prompt from `docs/KIPPS_VOICE_AGENT_PROMPT.md`.
4. Attach all 8 API Functions.
5. Select Indian Accent / Voice model.
6. Save for Voice Call testing.
