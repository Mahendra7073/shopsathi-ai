# ShopSathi AI — Public HTTPS Cloud Deployment Guide

This guide provides step-by-step instructions to deploy the ShopSathi AI FastAPI backend to a public HTTPS URL (e.g. on Render.com or Railway) for Kipps.AI API Function integration.

---

## 1. Production Architecture & Environment Configuration

### Server Binding & Port Configuration
The application entrypoint (`app/main.py`) binds to `0.0.0.0` and dynamically reads the platform's `$PORT` environment variable:
* **Host**: `0.0.0.0`
* **Port**: `${PORT:-8000}`

### Environment Variables
Configure the following variables in your hosting provider's dashboard:

| Variable Name | Required | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | Yes | Supplied by Host (e.g. `10000`) | Network port for Uvicorn web server |
| `ALLOWED_ORIGINS` | Yes | `*` | Allowed CORS origins for dashboard/Kipps calls |
| `DATABASE_URL` | Optional | `sqlite:///./shopsathi.db` | Database connection string |
| `SHOP_SATHI_API_KEY` | Optional | `""` (Empty = Bypass) | Secret key enforcing `X-API-Key` header security |

> [!WARNING]
> Never hardcode or commit actual secrets (`SHOP_SATHI_API_KEY`) to Git repositories.

---

## 2. Step-by-Step Manual Deployment on Render (Render.com)

If automatic CLI deployment is not configured, follow these exact click-by-click steps to deploy on Render:

1. **Log into Render Dashboard**:
   * Open [https://dashboard.render.com](https://dashboard.render.com).
2. **Create New Web Service**:
   * Click **New +** button in the top right corner.
   * Select **Web Service**.
3. **Connect Repository**:
   * Connect your GitHub / GitLab account containing the `kipps ai hackathon` repository.
   * Select the repository `kipps ai hackathon`.
4. **Configure Service Settings**:
   * **Name**: `shopsathi-ai-backend`
   * **Region**: Select closest region (e.g. Singapore / Frankfurt / Oregon).
   * **Branch**: `main` (or active development branch).
   * **Root Directory**: Leave blank (or `./`).
   * **Runtime**: Select **Python** (or **Docker** if using Dockerfile).
   * **Build Command**: `pip install -r requirements.txt`
   * **Start Command**: `python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   * **Instance Type**: Select **Free** (or Starter).
5. **Set Environment Variables**:
   * Scroll down to **Environment Variables** and click **Add Environment Variable**:
     * `ALLOWED_ORIGINS` = `*`
     * `DATABASE_URL` = `sqlite:///./shopsathi.db`
     * `SHOP_SATHI_API_KEY` = `your_chosen_secret_key_here` (Optional)
6. **Deploy Web Service**:
   * Click **Create Web Service**.
   * Wait 1–3 minutes for build and deployment completion.
7. **Obtain Public HTTPS Base URL**:
   * Render will assign a public URL at the top left of the dashboard:  
     `https://shopsathi-ai-backend.onrender.com` (Example).

---

## 3. Alternative Instant Local Deployment via ngrok (Hackathon Live Demo)

If you are running the backend locally for live judging:
```bash
# Terminal 1: Run local FastAPI backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000

# Terminal 2: Expose via HTTPS tunnel
ngrok http 8000
```
* **Public URL**: `https://<random-id>.ngrok-free.app`

---

## 4. Production Health & Endpoint Verification

Once deployed, test your public URL using `curl` or browser:

### 1. Health Endpoint (Public / Unauthenticated)
```bash
curl https://<YOUR_PUBLIC_URL>/health
```
**Expected Output**:
```json
{
  "status": "healthy",
  "app_name": "ShopSathi AI",
  "version": "1.0.0",
  "timestamp": "2026-08-13T15:30:00.000000+00:00"
}
```

### 2. Protected Business Endpoints (With `X-API-Key` Header)
```bash
curl -H "X-API-Key: YOUR_SHOP_SATHI_API_KEY" https://<YOUR_PUBLIC_URL>/orders/ORD1001
curl -H "X-API-Key: YOUR_SHOP_SATHI_API_KEY" "https://<YOUR_PUBLIC_URL>/products/search?query=shoes"
curl -H "X-API-Key: YOUR_SHOP_SATHI_API_KEY" https://<YOUR_PUBLIC_URL>/orders/ORD1004/refund
```

---

## 5. Storage & Database Persistence Limitations

> [!NOTE]
> **Ephemeral Filesystem Notice**
> * On free tier cloud hosts (e.g. Render/Railway free instances) without persistent disk mounts, SQLite uses container local storage (`shopsathi.db`).
> * On container restart or redeployment, seed data (`ORD1001` through `ORD1005`) is **automatically recreated** by the startup hook (`seed_db()`).
> * Any newly created return requests or tickets will reset upon container redeployment.
> * For persistent production storage, update `DATABASE_URL` to a managed PostgreSQL database (e.g. Render PostgreSQL or Supabase).

---

## 6. Troubleshooting & Redeployment

* **Logs**: View live application logs in Render Dashboard -> **Logs**.
* **500 Errors**: Check log entries for missing env vars or schema mismatches. Global exception handler converts internal errors into clean JSON error responses.
* **Manual Redeploy**: Click **Manual Deploy** -> **Deploy latest commit** in Render dashboard.
