# Production Deployment

## 🌐 Live Services

* **Application Base**: [https://shopsathi-ai.onrender.com](https://shopsathi-ai.onrender.com)
* **Frontend SPA**: [https://shopsathi-ai.onrender.com/app/](https://shopsathi-ai.onrender.com/app/)
* **Admin Monitoring Dashboard**: [https://shopsathi-ai.onrender.com/static/index.html](https://shopsathi-ai.onrender.com/static/index.html)
* **API Documentation**: [https://shopsathi-ai.onrender.com/docs](https://shopsathi-ai.onrender.com/docs)
* **Uptime Health**: [https://shopsathi-ai.onrender.com/health](https://shopsathi-ai.onrender.com/health)

---

## ☁️ Render Deployment Architecture

ShopSathi is deployed using **Render Web Services**:

```yaml
services:
  - type: web
    name: shopsathi-ai-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: DATABASE_URL
        value: sqlite:///./shopsathi.db
      - key: ALLOWED_ORIGINS
        value: "*"
```

### Static Asset Mounting
The production Vite frontend SPA is pre-built in `frontend/dist/` and automatically mounted at `/app/` by FastAPI, while `/static/` serves the interactive dark admin monitoring dashboard.
