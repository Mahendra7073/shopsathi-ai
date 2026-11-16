# ShopSathi AI — Project Audit Report

**Date**: August 13, 2026  
**Project**: ShopSathi AI — AI-Powered E-Commerce Customer Support System  
**Hackathon**: Kipps.AI Developer Hackathon 2026  

---

## 1. Executive Summary

An audit of the workspace (`c:\Users\ASUS\kipps ai hackathon`) was performed prior to system construction.

* **Workspace Status**: Fresh, clean workspace (empty directory).
* **Existing Project Artifacts**: None.
* **Target Stack**: Python 3.11+, FastAPI, SQLite (with SQLAlchemy ORM), Pydantic v2, Pytest, HTML5/CSS3/Vanilla JS (Modern Dark Mode Demo Dashboard).

Since this is a fresh setup, we have complete architectural freedom to design a high-performance, robust, and clean REST backend tailored specifically to serve Kipps.AI Chat & Voice Agents and support durable multi-agent customer workflows.

---

## 2. Technical Stack Audit & Architecture Choice

| Component | Selected Technology | Rationale |
| :--- | :--- | :--- |
| **Backend Framework** | **FastAPI** (Python 3.11+) | Asynchronous, high performance, automatic OpenAPI documentation for easy Kipps.AI Function mapping, native Pydantic validation. |
| **Database & ORM** | **SQLite + SQLAlchemy ORM** | Zero-config, persistent, file-backed storage ideal for local hackathon demo while easily migratable to PostgreSQL for production. |
| **Data Validation** | **Pydantic v2** | Strong typing and clear schema errors preventing silent API failures during LLM function calling. |
| **Dashboard UI** | **Vanilla HTML5/CSS3/JS** | Lightweight, high-impact dark mode dashboard with zero complex build pipeline overhead, focusing execution time on agentic workflows. |
| **Observability** | **Structured JSON Logging + Analytics Endpoint** | In-memory + persistent request logs capturing intent, tool call parameters, response times, and human escalation metrics (`GET /analytics/summary`). |
| **Testing** | **Pytest + TestClient** | Automated regression testing covering health checks, happy paths, error paths, and edge cases. |

---

## 3. Existing vs Missing Components

### Existing Components
* Clean workspace environment ready for initialization.

### Missing Components (To Be Built)
1. **Core Backend Application**:
   * FastAPI app initialization with CORS support (`app/main.py`).
   * Database ORM models (`app/models.py`) and Pydantic schemas (`app/schemas.py`).
   * Realistic demo data generator and database seed script (`app/seed_data.py`).
   * Modular API routers: Orders, Products, Returns, Refunds, Support Tickets, Analytics (`app/routers/`).
   * Observability middleware & structured logging system (`app/logging_config.py`).
2. **Knowledge Base & Prompts**:
   * Knowledge Base Document (`docs/SHOP_SATHI_KNOWLEDGE_BASE.md`).
   * Chat Agent System Prompt (`docs/KIPPS_CHAT_AGENT_PROMPT.md`).
   * Voice Agent System Prompt (`docs/KIPPS_VOICE_AGENT_PROMPT.md`).
3. **Kipps.AI Integration Documentation**:
   * Step-by-step Kipps Setup & Function Definition Guide (`docs/KIPPS_SETUP.md`).
   * Hackathon Demo Script with exact testing scenarios (`docs/DEMO_SCRIPT.md`).
   * System Architecture Breakdown (`docs/ARCHITECTURE.md`).
4. **Dashboard & Demo UI**:
   * Modern dark-themed dashboard (`app/static/index.html`, `style.css`, `app.js`) displaying live metrics, active support tickets, and direct API testing interface.
5. **Testing Suite**:
   * Comprehensive Pytest unit & integration test suite (`tests/`).

---

## 4. Risks & Mitigations

| Risk Factor | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **LLM Hallucination on Live Order Data** | High | Strictly enforce in prompt rules that live data must come *only* from API tool outputs, not model parameter weights. |
| **Multilingual Ambiguity (Hinglish/Hindi/English)** | Medium | Design language-agnostic API function schemas (e.g. `order_id` is always alphanumeric `ORDxxxx`). The LLM translates input/output while APIs process deterministic IDs. |
| **Kipps.AI Function Schema Mismatch** | Medium | Provide exact JSON schemas and OpenAPI endpoint specs matching standard Kipps.AI function input signatures in `docs/KIPPS_SETUP.md`. |
| **Voice Agent Latency & Brevity** | Medium | Author specialized voice prompt instructions (`docs/KIPPS_VOICE_AGENT_PROMPT.md`) enforcing concise single-sentence turns, phonetic number clarification, and immediate tool dispatch. |

---

## 5. Recommended Implementation Roadmap

1. **Phase 1**: Workspace Audit & Setup (Completed - this document & plan).
2. **Phase 2**: Core Architecture & Comprehensive Documentation (Knowledge Base, Agent Prompts, Kipps Setup Guide).
3. **Phase 3 & 4**: Backend API & Database Implementation (FastAPI, SQLite, Seed Data, REST endpoints for Orders, Returns, Refunds, Support, Analytics).
4. **Phase 5 & 6**: Automated Testing (Pytest suite covering all 12 minimum required test cases).
5. **Phase 7**: Lightweight Interactive Hackathon Dashboard (Real-time metrics, ticket tracking, API runner).
6. **Phase 8**: Demo Script, Environment Setup (`.env.example`), and Final Demo Validation.

---

## 6. Manual Kipps.AI Configuration Requirements

The following actions must be performed on the Kipps.AI platform following backend startup:
1. Upload `docs/SHOP_SATHI_KNOWLEDGE_BASE.md` to Kipps.AI Knowledge Base.
2. Create Kipps Chat Agent and apply system prompt from `docs/KIPPS_CHAT_AGENT_PROMPT.md`.
3. Create Kipps Voice Agent and apply system prompt from `docs/KIPPS_VOICE_AGENT_PROMPT.md`.
4. Configure 8 Kipps Functions pointing to backend REST APIs (or local tunnel e.g. ngrok / localhost).
5. Test agentic decision flows end-to-end.
