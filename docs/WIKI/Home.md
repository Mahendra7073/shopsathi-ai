# ShopSathi AI — Project Wiki

> **"Smart Shopping. Smarter Support."**
> *An AI-powered e-commerce and customer support platform.*

[![Backend Tests](https://img.shields.io/badge/Backend%20Tests-80%2F80%20Passed-16a34a?style=flat-square&logo=pytest)](https://github.com/Mahendra7073/shopsathi-ai)
[![Frontend AI Tests](https://img.shields.io/badge/AI%20Tests-55%2F55%20Passed-2563eb?style=flat-square&logo=node.js)](https://github.com/Mahendra7073/shopsathi-ai)
[![Smoke Tests](https://img.shields.io/badge/Smoke%20Tests-10%2F10%20Passed-06b6d4?style=flat-square)](https://github.com/Mahendra7073/shopsathi-ai)
[![Production Live](https://img.shields.io/badge/Production-Live%20on%20Render-8b5cf6?style=flat-square&logo=render)](https://shopsathi-ai.onrender.com/app/)

---

## 🌟 Welcome to the ShopSathi AI Documentation Wiki

**ShopSathi AI** is a full-stack, AI-powered e-commerce and customer support platform developed as a **B.Tech CSE Minor Project** at **MBM University, Jodhpur**. ShopSathi unifies product discovery, real-time order tracking, 7-day return policy enforcement, refund tracking, automated support ticketing, and AI-assisted human escalation into a seamless multi-modal experience.

**Project Developers:**
- **Mahendra Gurjar** — Roll No. 24UCSE4018
- **Kailash** — Roll No. 24UCSE4014
- Department of Computer Science and Engineering, MBM University, Jodhpur (Semester VII)

---

## 🚀 Live Services & Endpoints

* 🛍️ **Production Web Application**: [https://shopsathi-ai.onrender.com/app/](https://shopsathi-ai.onrender.com/app/)
* 📊 **Admin Monitoring Dashboard**: [https://shopsathi-ai.onrender.com/static/index.html](https://shopsathi-ai.onrender.com/static/index.html)
* 📖 **Interactive Swagger API Documentation**: [https://shopsathi-ai.onrender.com/docs](https://shopsathi-ai.onrender.com/docs)
* 🩺 **Uptime Health Check API**: [https://shopsathi-ai.onrender.com/health](https://shopsathi-ai.onrender.com/health)
* 🐙 **GitHub Repository**: [https://github.com/Mahendra7073/shopsathi-ai](https://github.com/Mahendra7073/shopsathi-ai)

---

## 📚 Wiki Table of Contents

### 1. Product & Architecture
* [[Project-Overview]] — What is ShopSathi AI, target audience, and key benefits
* [[Problem-Statement]] — The fragmented customer support dilemma
* [[Solution]] — The AI-integrated e-commerce workflow
* [[System-Architecture]] — System components, data flows, and layer separation

### 2. AI Agents & Autonomous Tools
* [[AI-Agents]] — Overview of Chat Agent and Voice Assistant
* [[AI-Functions]] — Specification of the 8 core backend tool functions
* [[Chat-Agent]] — Multilingual (English, Hindi, Hinglish) text support
* [[Voice-Agent]] — Real-time browser-based voice assistant (W3C Web Speech API)

### 3. Application Components & Workflows
* [[Frontend]] — 11-page responsive Vite Single Page Application
* [[Backend-API]] — FastAPI endpoints, schemas, and error handling
* [[Database]] — SQLAlchemy ORM schema, entities, and ER relationships
* [[Order-and-Return-Workflow]] — Tracking, cancellation guards, and 7-day return policy
* [[Support-and-Escalation-Workflow]] — Ticket generation and Tier 2 human handoff

### 4. Operations, Testing & Deployment
* [[Demo-Scenarios]] — Verified test records across 52 orders (`ORD1001`–`ORD1052`)
* [[Testing-and-Verification]] — 145 automated tests (Pytest, AI agent suite, smoke tests)
* [[Deployment]] — Render Web Services configuration and continuous delivery
* [[Security]] — Customer data isolation (401/403) and zero-secrets architecture
* [[Local-Development]] — Setup and execution instructions
* [[Future-Scope]] — Roadmap and next-phase capabilities

---

## 📢 Note on Wiki Publishing

This directory (`docs/WIKI/`) serves as the offline Git-tracked source of truth for the GitHub Wiki. GitHub maintains Wiki pages in a dedicated parallel Git repository (`https://github.com/Mahendra7073/shopsathi-ai.wiki.git`). To publish updates to the live web wiki:
```bash
git clone https://github.com/Mahendra7073/shopsathi-ai.wiki.git
cp docs/WIKI/*.md shopsathi-ai.wiki/
cd shopsathi-ai.wiki
git add . && git commit -m "docs: sync wiki pages" && git push origin master
```
