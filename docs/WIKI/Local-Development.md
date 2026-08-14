# Local Development Guide

## 💻 Prerequisites
* Python 3.11+
* Node.js v18+
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
* **Interactive Admin Dashboard**: [http://localhost:8000/static/index.html](http://localhost:8000/static/index.html)
* **Swagger API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)
* **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)

### 4. Run Frontend Development Server
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
* **Frontend SPA**: [http://localhost:5173](http://localhost:5173) (or [http://localhost:8000/app/](http://localhost:8000/app/))

---

## 🧪 Running Automated Tests
```bash
.\venv\Scripts\python -m pytest -v
```
63 automated test suites verify all business logic, policy engines, and data schemas.
