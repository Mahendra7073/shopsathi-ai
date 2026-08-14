# ShopSathi AI — Hackathon Project Descriptions

---

### 1-Line Tagline
> **"Smart Shopping. Smarter Support."**  
> *AI-powered e-commerce customer support that speaks, acts, and seamlessly escalates to human agents.*

---

### Short Description (50–100 Words)
**ShopSathi AI** is a production-ready, agentic customer support platform for modern e-commerce. Built with a responsive Vite Single Page Application and a high-performance FastAPI backend, ShopSathi integrates **Gemini 3.1 Flash Lite** (Chat) and **Gemini 2.5 Flash Native Audio** (Real-Time Voice) with 9 live backend tools. Customers can discover products, track real-time shipments across 52 realistic orders, check 7-day return policies, track refunds, and automatically escalate high-friction disputes to Tier 2 human agents in English, Hindi, and Hinglish.

---

### Detailed Description (250–300 Words)
Modern e-commerce customer service is plagued by disjointed customer experiences and rigid, scripted chatbots that only regurgitate generic FAQs. When customers have urgent operational issues—such as tracking an out-for-delivery order, checking return policy eligibility, querying a pending refund, or resolving an unverified UPI payment deduction—traditional chatbots fail, driving frustration and ballooning support ticket queues.

**ShopSathi AI** redefines e-commerce support through an **action-oriented, multi-modal Agentic AI workflow**. Rather than guessing or inventing transactional data, ShopSathi connects conversational AI agents directly to live backend APIs as their single source of truth. The platform features:

1. **Multi-Modal AI Agents**: A **Chat Agent** powered by *Gemini 3.1 Flash Lite* capable of multi-turn multilingual conversations in English, Hindi, and Hinglish, alongside a **Real-Time Voice Agent** powered by *Gemini 2.5 Flash Native Audio Preview* (Voice: Puck, Outbound Line: `+91 8031339824`) with sub-second tool execution latency.
2. **9 Core Autonomous Tool Integrations**: Live tools for product search, order status lookup, order cancellation, 7-day return policy verification, return request creation, refund payout tracking, support ticket generation, ticket status lookup, and human escalation.
3. **Deterministic Business Logic & Safety**: Built-in state machine rules prevent false cancellations (e.g., delivered orders cannot be cancelled) and enforce non-returnable hygiene policies.
4. **Intelligent AI-to-Human Handoff**: Unresolved payment failures or high-friction disputes are seamlessly packaged into structured support tickets and assigned to Tier 2 Human Support Agents.
5. **Full-Stack Production Readiness**: A complete 11-page responsive Vite SPA, 52 realistic seeded orders, 63 automated backend tests, zero-secrets security, and live deployment on Render.
