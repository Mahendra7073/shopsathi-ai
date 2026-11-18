# Testing & Verification

## 🧪 Comprehensive Automated Test Strategy

ShopSathi maintains a **100% pass rate** across **145 automated test cases** covering backend REST APIs, customer security boundaries, multilingual NLP parsing, and end-to-end server smoke tests.

---

## 📊 Test Suite Summary

| Test Suite | Framework / Tool | Test Count | Verified Status |
|---|---|:---:|:---:|
| **Backend Integration & Unit Tests** | `pytest` + `httpx` / Starlette | **80 Tests** | **100% Passed (80/80)** |
| **Frontend AI Agent QA Suite** | `node test_ai_agent.js` | **55 Tests** | **100% Passed (55/55)** |
| **Backend API Smoke Tests** | `python scripts/smoke_test.py` | **10 Tests** | **100% Passed (10/10)** |
| **Total Automated Tests** | Multi-Tier Verification | **145 Tests** | **100% Green** |

---

## 1. Backend Pytest Suite (80 Tests)

Execute the full backend test suite:
```bash
venv\Scripts\activate
pytest tests/ -v
```

### Coverage Breakdown
* `tests/test_health.py`: Service uptime health verification (`GET /health`).
* `tests/test_products.py`: Catalog search, budget slider filtering, no-match fallback.
* `tests/test_orders.py`: Order tracking, cancellation state guards, 52-order integrity, customer data boundaries.
* `tests/test_customers.py`: Profile authentication, multi-customer data isolation.
* `tests/test_returns.py`: 7-day policy engine, defective reason submission, hygiene item non-returnable guards.
* `tests/test_refunds.py`: Payout lookup, initiated status, and refund calculation.
* `tests/test_support.py`: Support ticket creation, priority assignment, and Tier-2 human escalation.
* `tests/test_security.py`: API key enforcement, public route bypass, 401/403 barrier validation.
* `tests/test_analytics.py`: Real-time observability and audit log summary.

---

## 2. Frontend AI Agent Automated Suite (55 Tests)

Execute the standalone AI regression suite:
```bash
cd frontend
node test_ai_agent.js
```

### Coverage Breakdown
* **TC01–TC04**: Multilingual greetings and system capability prompts (English, Hindi, Hinglish).
* **TC05–TC09**: Product queries with price ceilings and category matching.
* **TC10–TC15**: Order tracking with alphanumeric spacing, invalid IDs, and missing parameters.
* **TC16–TC19**: Order cancellations, delivered order protection, and syntax variations.
* **TC20–TC23**: Return requests, 7-day expiration checks, and hygiene item exclusions.
* **TC24–TC26**: Refund status tracking and order isolation.
* **TC27–TC31**: Support tickets, human escalation, and critical priority routing.
* **TC32–TC36**: Security barriers (Guest user blocks, cross-customer 403 blocks).
* **TC37–TC48**: Edge cases, whitespaces, unsupported questions, store policies.
* **TC49–TC51**: TTS alphanumeric character pronunciation spacing and fast sentence streaming.
* **TC52–TC55**: Sub-millisecond latency benchmarks, catalog caching, and memory stability.

---

## 3. Backend API Smoke Tests (10 Tests)

Verify live server health, database record counts, and endpoint responses:
```bash
venv\Scripts\python.exe scripts/smoke_test.py
```

---

## 4. Frontend Production Build

```bash
cd frontend
npm run build
```
* **Status**: Clean build in under 500ms
* **Artifacts**: Minified bundle in `frontend/dist/` (`index-CxDOEQ9m.js` 130 kB).

---

## 5. Continuous Integration (CI/CD)

The automated GitHub Actions workflow (`.github/workflows/ci.yml`) automatically executes on every push and pull request to `main`:
1. Installs Python 3.12 dependencies and runs Pytest.
2. Executes backend smoke tests.
3. Sets up Node.js 20 and runs the frontend production build.
4. Executes the 55-test AI agent automated suite.
