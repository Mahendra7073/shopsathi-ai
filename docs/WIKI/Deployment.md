# Production Deployment

## 🌐 Live Services

* **Application Base**: [https://shopsathi-ai.onrender.com](https://shopsathi-ai.onrender.com)
* **Frontend SPA**: [https://shopsathi-ai.onrender.com/app/](https://shopsathi-ai.onrender.com/app/)
* **Admin Monitoring Dashboard**: [https://shopsathi-ai.onrender.com/static/index.html](https://shopsathi-ai.onrender.com/static/index.html)
* **Interactive Swagger API Documentation**: [https://shopsathi-ai.onrender.com/docs](https://shopsathi-ai.onrender.com/docs)
* **Uptime Health**: [https://shopsathi-ai.onrender.com/health](https://shopsathi-ai.onrender.com/health)

---

## ☁️ Render Deployment Architecture

ShopSathi is deployed using **Render Web Services** via `render.yaml`:

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
The production Vite frontend SPA is pre-built in `frontend/dist/` and automatically mounted at `/app/` by FastAPI, while `/static/` serves the interactive dark admin monitoring dashboard. This enables zero-Node runtime requirements in the production cloud container.

---

## 🐳 Docker Deployment

The included production `Dockerfile` builds a lightweight container using `python:3.12-slim`:
```bash
# Build Docker image
docker build -t shopsathi-ai .

# Run container binding to port 8000
docker run -p 8000:8000 shopsathi-ai
```
Application is immediately available at `http://localhost:8000/app/`.
