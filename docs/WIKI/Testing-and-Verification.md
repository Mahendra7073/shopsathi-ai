# Testing & Verification

## 🧪 Automated Backend Test Suite

ShopSathi maintains a 100% pass rate across **63 automated Pytest test suites**:

```bash
.\venv\Scripts\python -m pytest -v
```

### Test Coverage Breakdown
* `tests/test_analytics.py`: Metrics and observability summary
* `tests/test_customers.py`: Customer profiles and order history retrieval
* `tests/test_health.py`: Service uptime health verification
* `tests/test_orders.py`: Lookups, cancellation state guards, 52-order count, unique IDs
* `tests/test_products.py`: Keyword search, max price constraints, category filtering
* `tests/test_refunds.py`: Payout lookup and amount validation
* `tests/test_returns.py`: 7-day policy engine and return request creation
* `tests/test_security.py`: API key authentication and header validation
* `tests/test_support.py`: Ticket creation, lookup, and Tier 2 human escalation

---

## 🖥️ Frontend Production Build

```bash
cd frontend && npm run build
```
* **Status**: `✓ built in ~500ms`
* **Artifacts**: Minified bundle in `frontend/dist/` with hashed CSS and JS assets.

---

## 📱 Cross-Device Responsiveness
All 11 application views verified across:
* Desktop (`1920×1080`)
* Laptop (`1366×768`)
* Tablet (`768×1024`)
* Mobile (`390×844`)
