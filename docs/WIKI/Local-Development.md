# Local Development Guide

## 💻 Prerequisites
* Python 3.11 or 3.12
* Node.js v18 or v20+
* Git

---

## 🛠️ Step-by-Step Local Setup

### 1. Clone & Set Up Backend Environment
```bash
# Clone the repository
git clone https://github.com/Mahendra7073/shopsathi-ai.git
cd shopsathi-ai

# Create and activate Python virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Run FastAPI Backend Server
```bash
python -m uvicorn app.main:app --reload --port 8000
```
* **Production SPA on FastAPI**: [http://localhost:8000/app/](http://localhost:8000/app/)
* **Interactive Admin Dashboard**: [http://localhost:8000/static/index.html](http://localhost:8000/static/index.html)
* **Interactive Swagger Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)
* **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)

### 4. Run Frontend Development Server (Optional)
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
* **Frontend Dev Server**: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Running Verification Test Suites

### 1. Backend Pytest Suite (80 Tests)
```bash
pytest tests/ -v
```

### 2. Frontend AI Agent Automated Suite (55 Tests)
```bash
cd frontend
node test_ai_agent.js
```

### 3. Backend API Smoke Tests (10 Tests)
```bash
python scripts/smoke_test.py
```

### 4. Live Latency Benchmark (100 Requests)
```bash
python scripts/benchmark_backend.py
```
Total: **145 / 145 automated tests (100% pass rate)**.
