# ShopSathi AI — Professional Codebase Restructuring Report

**Project Title**: ShopSathi AI — AI-Powered E-Commerce & Customer Support Platform
**Academic Degree**: Bachelor of Technology (B.Tech) in Computer Science & Engineering
**Department**: Department of Computer Science & Engineering, Faculty of Engineering & Architecture
**Institution**: MBM University, Jodhpur, Rajasthan, India
**Semester / Year**: Semester VII / Academic Year 2026–2027
**Project Authors**:
- **Mahendra Gurjar** (Roll No: `24UCSE4018`) — Backend Architecture, Core Infrastructure, Performance Engineering
- **Kailash** (Roll No: `24UCSE4014`) — Frontend UI/UX, State Management, Voice Assistant Integration

**Target GitHub Repository**: `https://github.com/Mahendra7073/shopsathi-ai.git`
**Target Branch**: `main`
**Audit Date**: November 18, 2026
**Final Verdict**: 🟢 **READY FOR FINAL AUDIT**

---

## 1. Executive Summary

This restructuring was executed to organize the **ShopSathi AI** codebase into an intuitive, scalable, category-wise directory hierarchy following industry-standard design patterns (FastAPI enterprise layout and modular frontend architecture).

Prior to restructuring, a complete non-destructive backup was generated at:
`C:\Users\ASUS\ShopSathi-AI-Minor-Project-Backup-Restructure-20261118`

### Key Architectural Enhancements
1. **Frontend Categorization (`frontend/src/`)**:
   - UI components partitioned into `components/common/` (atomic UI), `components/layout/` (scaffolding), and `components/ai/` (dual Chat & Voice engine).
   - State management cleanly isolated in `store/index.js` with zero state leakage.
   - Dedicated `frontend/tests/` folder created with `npm test` script integration in `package.json`.
   - Backward-compatible shims preserved in `src/components/*.js` and `src/store.js` to prevent any broken references.
2. **Backend Infrastructure Isolation (`app/`)**:
   - Foundation infrastructure grouped into `app/core/` (`database.py`, `security.py`, `logging_config.py`).
   - Seeding and provisioning services isolated into `app/services/` (`seed_data.py`).
   - Declarative models (`models.py`) and schemas (`schemas.py`) retained in canonical modules to prevent micro-file circular dependency risks on Windows.
   - Backward-compatible shims maintained at `app/*.py` level.
3. **Zero Business Logic Modification**: Zero API endpoints were altered, zero database column names were modified, and zero frontend features were disabled.
4. **100% Test Pass Rate**: All 145 automated tests (80 Pytest + 10 Smoke + 55 Frontend AI QA) pass with 100% accuracy.

---

## 2. Before & After Codebase Structure

### 2.1 Before Restructuring (Original Flat Layout)
```text
ShopSathi-AI-Minor-Project/
├── app/
│   ├── database.py               # Mixed database engine & sessionmaker
│   ├── logging_config.py         # Root logging helper
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── security.py               # Root auth helper
│   ├── seed_data.py              # Root database seeder
│   ├── static/
│   └── routers/ (8 files)
├── frontend/
│   ├── test_ai_agent.js          # Uncategorized test file at root
│   ├── src/
│   │   ├── components/           # Flat list of 6 mixed components
│   │   │   ├── AiLauncher.js     # AI agent mixed with common UI
│   │   │   ├── Footer.js
│   │   │   ├── Header.js
│   │   │   ├── Logo.js
│   │   │   ├── Modal.js
│   │   │   └── Toast.js
│   │   ├── pages/ (11 files)
│   │   ├── services/api.js
│   │   ├── store.js              # Standalone store file
│   │   ├── styles/
│   │   ├── router.js
│   │   └── main.js
│   └── dist/
```

### 2.2 After Restructuring (Professional Category-Wise Layout)
```text
ShopSathi-AI-Minor-Project/
├── .github/
│   └── workflows/
│       └── ci.yml                # CI/CD pipeline executing backend & frontend tests
├── app/                          # FastAPI Backend Application
│   ├── main.py                   # ASGI application entry point & router mounting
│   ├── models.py                 # 7 SQLAlchemy ORM database models
│   ├── schemas.py                # Pydantic v2 validation contracts
│   ├── database.py               # [Shim] Backward-compatible export -> app.core.database
│   ├── security.py               # [Shim] Backward-compatible export -> app.core.security
│   ├── logging_config.py         # [Shim] Backward-compatible export -> app.core.logging_config
│   ├── seed_data.py              # [Shim] Backward-compatible export -> app.services.seed_data
│   ├── core/                     # Core Infrastructure Layer
│   │   ├── __init__.py
│   │   ├── database.py           # Database engine, SessionLocal & WAL pragmas
│   │   ├── security.py           # X-Customer-ID authorization & API key validation
│   │   └── logging_config.py     # Request/Response audit logger & observability
│   ├── services/                 # Business & Data Services Layer
│   │   ├── __init__.py
│   │   └── seed_data.py          # Database seeding service (52 orders, 5 profiles)
│   ├── static/                   # Static Admin Operations Dashboard
│   │   ├── index.html
│   │   ├── style.css
│   │   └── app.js
│   └── routers/                  # 8 Modular REST API Routers
│       ├── health.py             # GET /health, GET /
│       ├── products.py           # Catalog search & price filtering
│       ├── orders.py             # Order tracking & cancellation state machine
│       ├── customers.py          # Customer profiles & customer order histories
│       ├── returns.py            # 7-day return eligibility & request creation
│       ├── refunds.py            # Refund lifecycle status tracking
│       ├── support.py            # Support ticketing & Tier-2 human escalation
│       └── analytics.py          # Operational metrics & AI request statistics
├── frontend/                     # Vite Single Page Application (SPA)
│   ├── index.html                # HTML entry point
│   ├── vite.config.js            # Vite build configuration (base: './')
│   ├── package.json              # Manifest with "test": "node tests/test_ai_agent.js"
│   ├── package-lock.json
│   ├── test_ai_agent.js          # [Shim] Root delegation entry point -> tests/test_ai_agent.js
│   ├── tests/                    # Frontend Automated QA Suites
│   │   └── test_ai_agent.js      # 55-test multilingual Chat & Voice QA test suite
│   ├── public/
│   │   └── favicon.svg           # Storefront branding icon
│   ├── dist/                     # Optimized production bundle (served at /app/)
│   │   ├── index.html
│   │   ├── favicon.svg
│   │   └── assets/
│   │       ├── index-D-L9Uho_.css
│   │       └── index-CxDOEQ9m.js
│   └── src/                      # Frontend Source Code
│       ├── main.js               # Application bootstrap & router initialization
│       ├── router.js             # Client-side hash router
│       ├── store.js              # [Shim] Backward-compatible export -> src/store/index.js
│       ├── store/                # Reactive State Management
│       │   └── index.js          # Cart, customer session, demo profiles & event bus
│       ├── services/             # API Services
│       │   └── api.js            # HTTP client with in-flight catalog caching
│       ├── components/           # Category-Wise UI Components
│       │   ├── common/           # Reusable Atomic UI Elements
│       │   │   ├── Logo.js       # SVG logos (Full, Compact, Icon)
│       │   │   ├── Modal.js      # Confirmation & detail dialogs
│       │   │   └── Toast.js      # Feedback notification toasts
│       │   ├── layout/           # Application Scaffolding
│       │   │   ├── Header.js     # Top navigation bar, cart badge & mobile drawer
│       │   │   └── Footer.js     # Academic footer & navigation links
│       │   ├── ai/               # AI Assistant Module
│       │   │   └── AiLauncher.js # Regex NLP Chat Agent & Web Speech API Voice HUD
│       │   ├── Logo.js           # [Shim] Backward-compatible export
│       │   ├── Modal.js          # [Shim] Backward-compatible export
│       │   ├── Toast.js          # [Shim] Backward-compatible export
│       │   ├── Header.js         # [Shim] Backward-compatible export
│       │   ├── Footer.js         # [Shim] Backward-compatible export
│       │   └── AiLauncher.js     # [Shim] Backward-compatible export
│       ├── pages/                # 11 Dedicated Application Views
│       │   ├── Home.js           # Storefront home page with dual AI triggers
│       │   ├── Products.js       # Searchable & filterable product catalog
│       │   ├── ProductDetail.js  # Product specifications & stock indicators
│       │   ├── Cart.js           # Interactive cart & price calculations
│       │   ├── Checkout.js       # Address capture & payment mode selection
│       │   ├── Orders.js         # Customer order history
│       │   ├── OrderDetail.js    # Visual delivery timeline & cancellation
│       │   ├── Returns.js        # Return policy validation & refund tracking
│       │   ├── Support.js        # Support ticket creation & escalation
│       │   ├── Profile.js        # Customer persona info & switcher
│       │   └── Login.js          # Demo persona switcher (CUST101–CUST104)
│       └── styles/               # Design System Styles
│           ├── variables.css     # CSS custom property tokens
│           ├── global.css        # Reset, typography & utility classes
│           ├── components.css    # Header, footer, AI launcher & modal styling
│           └── pages.css         # Page-specific responsive layout styling
├── tests/                        # Backend Pytest Test Suite (80 Tests)
│   ├── conftest.py               # Shared fixtures & test database setup
│   ├── test_health.py            # Health endpoint tests
│   ├── test_products.py          # Product catalog & search tests
│   ├── test_orders.py            # Order lookup & cancellation tests
│   ├── test_customers.py         # Customer authentication & profile tests
│   ├── test_returns.py           # Return eligibility & policy tests
│   ├── test_refunds.py           # Refund tracking tests
│   ├── test_support.py           # Support ticketing & escalation tests
│   ├── test_security.py          # Security, API key & isolation tests
│   └── test_analytics.py         # Observability metrics tests
├── scripts/                      # Verification & Operational Scripts
│   ├── benchmark_backend.py      # 100-request live backend performance benchmark
│   ├── capture_latest_screenshots.js # Playwright screenshot capture automation
│   └── smoke_test.py             # 10-point backend sanity & isolation smoke test
├── docs/                         # Academic Documentation & Technical Reports
│   ├── ARCHITECTURE.md           # System architecture, data flow & security design
│   ├── DEPLOYMENT.md             # Render, Docker & local deployment guides
│   ├── API_TEST_COMMANDS.md      # Copy-pasteable curl & PowerShell test commands
│   ├── CODEBASE_STRUCTURE_REPORT.md # This codebase restructuring report
│   ├── PRE_PUSH_AUDIT.md         # Final pre-push verification audit report
│   ├── VOICE_ASSISTANT_PERFORMANCE_QA.md  # Voice Agent latency & benchmark audit
│   ├── CHAT_VOICE_AGENT_QA_REPORT.md      # End-to-end Chat & Voice QA audit report
│   ├── REPOSITORY_CLEANUP_REPORT.md       # Repository file audit & cleanup log
│   ├── SHOP_SATHI_KNOWLEDGE_BASE.md       # Domain rules, return policies & FAQs
│   ├── SCREENSHOTS.md            # Screenshot catalog with visual walkthrough
│   ├── assets/                   # Architecture diagrams
│   ├── screenshots/              # Application screenshots
│   │   └── latest/               # 18 genuine high-resolution screenshots
│   ├── WIKI/                     # 20 detailed GitHub wiki pages
│   └── archive/                  # Legacy hackathon documentation (historical record)
├── .env.example                  # Environment configuration template
├── .gitignore                    # Git ignore rules (venv, node_modules, *.db, cache)
├── requirements.txt              # Python production dependencies (7 packages)
├── Dockerfile                    # Containerization manifest
├── Procfile                      # Process configuration
├── render.yaml                   # Infrastructure-as-Code deployment specification
└── README.md                     # Master B.Tech Minor Project documentation
```

---

## 3. Files Moved and Reorganized

| # | Old Path | New Canonical Path | Category / Purpose |
|:---:|:---|:---|:---|
| 1 | `frontend/src/components/Logo.js` | `frontend/src/components/common/Logo.js` | Atomic UI: Storefront SVG icons |
| 2 | `frontend/src/components/Modal.js` | `frontend/src/components/common/Modal.js` | Atomic UI: Dialog popups |
| 3 | `frontend/src/components/Toast.js` | `frontend/src/components/common/Toast.js` | Atomic UI: Notification toasts |
| 4 | `frontend/src/components/Header.js` | `frontend/src/components/layout/Header.js` | Layout: Top navigation & mobile drawer |
| 5 | `frontend/src/components/Footer.js` | `frontend/src/components/layout/Footer.js` | Layout: Site footer & credits |
| 6 | `frontend/src/components/AiLauncher.js` | `frontend/src/components/ai/AiLauncher.js` | AI: Chat Agent panel & Voice HUD |
| 7 | `frontend/src/store.js` | `frontend/src/store/index.js` | State: Cart & customer session store |
| 8 | `frontend/test_ai_agent.js` | `frontend/tests/test_ai_agent.js` | QA: Standalone automated AI test suite |
| 9 | `app/database.py` | `app/core/database.py` | Infrastructure: SQLAlchemy engine & WAL pragmas |
| 10 | `app/security.py` | `app/core/security.py` | Infrastructure: Customer authorization & API keys |
| 11 | `app/logging_config.py` | `app/core/logging_config.py` | Infrastructure: Audit logging & observability |
| 12 | `app/seed_data.py` | `app/services/seed_data.py` | Service: Demo database seeding |

*Note: All old locations contain lightweight backward-compatible re-export shims to prevent breaking any dynamic imports or legacy scripts.*

---

## 4. Files Intentionally Left Unchanged

1. **`app/models.py` & `app/schemas.py`**:
   - *Rationale*: All 7 SQLAlchemy database models (`Product`, `Customer`, `Order`, `ReturnRequest`, `Refund`, `SupportTicket`, `AuditLog`) are interdependent with foreign-key relationships. Keeping them in a single, cohesive `models.py` avoids circular import issues and prevents fragmentation into micro-files on Windows filesystems.
2. **`app/routers/*.py` (8 Files)**:
   - *Rationale*: The `app/routers/` directory is already clean, domain-separated, and adheres strictly to FastAPI router best practices.
3. **`app/static/` (3 Files)**:
   - *Rationale*: Static admin dashboard files (`app.js`, `index.html`, `style.css`) are served directly by FastAPI's `StaticFiles` mount at `/static/`. Moving them would complicate production routing in Render and Docker.
4. **`frontend/dist/`**:
   - *Rationale*: Pre-built production bundle served directly by FastAPI at `/app/`. Essential for Docker and Render environments that run without Node.js.
5. **Root Configuration Files (`Dockerfile`, `Procfile`, `render.yaml`, `requirements.txt`)**:
   - *Rationale*: Deployment platforms (Render, Docker, Heroku) require these configuration files at the repository root. Moving them would break cloud build pipelines.

---

## 5. Test Suite Verification & Performance Results

Following restructuring, all test suites and builds were executed and verified:

| Suite # | Component | Command | Result | Pass Rate |
|:---:|:---|:---|:---:|:---:|
| 1 | Frontend AI QA Suite | `npm test` (or `node tests/test_ai_agent.js`) | 55 / 55 Passed | 🟢 100% |
| 2 | Backend Pytest Suite | `python -m pytest tests/ -v` | 80 / 80 Passed | 🟢 100% |
| 3 | Backend API Smoke Tests | `python scripts/smoke_test.py` | 10 / 10 Passed | 🟢 100% |
| 4 | Frontend Production Build | `npm run build` | 26 modules (544ms) | 🟢 100% |
| 5 | Whitespace & Format Check | `git diff --check` | 0 errors | 🟢 100% |
| 6 | Live Backend Benchmark | `python scripts/benchmark_backend.py` | 100 / 100 HTTP 200 | 🟢 100% |
| **TOTAL** | **Automated Tests** | — | **145 / 145 Passed** | **🟢 100%** |

### Benchmark Metrics (Post-Restructuring)
- **Mean Client Roundtrip Latency**: `16.19 ms`
- **Median (p50) Roundtrip Latency**: `13.61 ms`
- **95th Percentile (p95) Latency**: `37.03 ms`
- **FastAPI Server Time (X-Process-Time)**: Mean `5.44 ms` (Median `4.54 ms`)

---

## 6. Deployment & Runtime Verification

1. **Docker Compatibility**: `Dockerfile` copies `app/` and `frontend/dist/` and launches `uvicorn app.main:app`. Verified functional.
2. **Render Cloud Service**: `render.yaml` points to `app.main:app` and uses `requirements.txt`. Pathing confirmed.
3. **FastAPI Static Mounts**:
   - `/app/` cleanly serves `frontend/dist/index.html` and bundled assets (`index-CxDOEQ9m.js`, `index-D-L9Uho_.css`).
   - `/static/` cleanly serves admin operations UI (`app/static/index.html`).
4. **GitHub Actions CI**: Updated `.github/workflows/ci.yml` runs `npm test` inside `frontend/` and `pytest tests/ -v`.

---

## 7. Final Verdict

### 🟢 READY FOR FINAL AUDIT

The ShopSathi AI repository structure is now clean, category-wise, beginner-friendly, and production-ready for academic evaluation at MBM University, Jodhpur.
