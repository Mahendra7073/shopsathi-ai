# Kipps.AI Dependency Analysis and Gemini Migration Plan

**Project:** ShopSathi AI — B.Tech CSE Minor Project
**Date:** November 2026
**Authors:** Mahendra Gurjar (24UCSE4018), Kailash (24UCSE4014)

---

## 1. Current Kipps.AI Dependency Status

After a full code audit, the following is confirmed:

### Backend (`app/`)
| File | Kipps.AI Dependency | Status |
|---|---|---|
| `app/main.py` | Old description string only | ✅ Fixed — updated to Minor Project description |
| `app/security.py` | None | ✅ No dependency |
| `app/models.py` | None | ✅ No dependency |
| `app/schemas.py` | None | ✅ No dependency |
| `app/routers/*.py` | None | ✅ No dependency |
| `app/seed_data.py` | None | ✅ No dependency |
| `.env.example` | Kipps key variables (placeholder only) | ✅ Labelled as legacy/historical |

**Conclusion: The backend has ZERO runtime Kipps.AI dependency.**

### Frontend (`frontend/src/`)
| File | Kipps.AI Reference | Status |
|---|---|---|
| `components/Footer.js` | "Built for Kipps.AI Hackathon" text | ✅ Fixed — updated to Minor Project credit |
| `components/AiLauncher.js` | UI labels say "Gemini 3.1 Flash" / "Gemini 2.5 Audio" | ℹ️ Aspirational branding — no actual API call |
| All other frontend files | None | ✅ No dependency |

**Conclusion: The frontend has NO runtime Kipps.AI API calls. All AI functionality runs via:**
1. Rule-based NLP in `processAgentQuery()` (pure JavaScript)
2. Backend REST API tool-calls (the same APIs defined in `docs/KIPPS_FUNCTIONS_CONFIG.md`)
3. Browser Web Speech API for voice input/output

---

## 2. How the Current AI Agent Works (Without Kipps.AI)

The Chat Agent (`AiLauncher.js`) works as follows:

```
User types/speaks query
        ↓
processAgentQuery(text)   ← Pure JavaScript NLP
        ↓
Pattern matching on keywords:
  - "ORD1001" + "track/where/kaha" → getOrderStatus()
  - "ORD1003" + "return/wapas"     → checkReturnEligibility() + createReturnRequest()
  - "ORD1004" + "refund/paise"     → checkRefundStatus()
  - "cancel/radd"                  → cancelOrder()
  - "shoe/headphone/under ₹2000"  → searchProducts()
  - "human/agent/ticket/fraud"     → createSupportTicket() + escalateSupportTicket()
        ↓
Backend REST API call (with X-Customer-ID auth header)
        ↓
JSON response → formatted markdown reply
        ↓
(Voice) → speakText() via SpeechSynthesis API
```

**This architecture is functional and testable without any external AI key.**

---

## 3. What Kipps.AI Was Used For (During Hackathon)

During the Kipps.AI Hackathon (August 2026), the platform provided:
1. A hosted LLM Chat Agent connected to ShopSathi's REST APIs via "Function Tools"
2. A hosted Voice Agent with Indian accent voice models
3. A Knowledge Base for FAQ-style answers

All 8 API functions configured in Kipps.AI were standard REST endpoints:
- `check_order_status` → GET `/orders/{order_id}`
- `check_return_eligibility` → GET `/orders/{order_id}/return-eligibility`
- `create_return_request` → POST `/returns`
- `check_refund_status` → GET `/orders/{order_id}/refund`
- `search_products` → GET `/products/search`
- `cancel_order` → POST `/orders/{order_id}/cancel`
- `create_support_ticket` → POST `/support/tickets`
- `escalate_support_ticket` → POST `/support/tickets/{id}/escalate`

**These endpoints remain fully intact and are still callable by any client.**

---

## 4. Gemini API Migration Plan (Optional Future Enhancement)

If the team decides to upgrade the Chat Agent to use real AI natural language understanding:

### Option A: Server-Side Gemini Integration (Recommended)

**Step 1: Add `google-generativeai` to requirements.txt**
```
google-generativeai>=0.8.0
```

**Step 2: Create `app/routers/ai_chat.py`**
```python
import os
import google.generativeai as genai
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.security import require_current_customer

router = APIRouter(prefix="/ai", tags=["AI Chat"])

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@router.post("/chat")
async def chat(message: str, db: Session = Depends(get_db),
               customer = Depends(require_current_customer)):
    # Call Gemini with the customer's message
    # Include backend data (orders, products) as context
    # Return structured response
    pass
```

**Step 3: Update `frontend/src/services/api.js`**
Add a `chatWithGemini(message)` function that calls `POST /ai/chat`.

**Step 4: Update `AiLauncher.js`**
Replace `processAgentQuery()` with a call to the new `/ai/chat` endpoint as a fallback when pattern matching doesn't match.

**Step 5: Add `GEMINI_API_KEY` to `.env`**
```
GEMINI_API_KEY=your_key_here
```

> ⚠️ **Never expose the Gemini API key in frontend JavaScript code or commit it to GitHub.**

### Option B: Keep Current Rule-Based System (Recommended for Minor Project)

The current rule-based NLP system is:
- Fully functional for the demo use cases
- Zero external API dependency
- 100% testable offline
- Appropriate for a college project demonstration

**Recommendation: Keep the current system for the Minor Project evaluation. Document the Gemini migration as Future Scope.**

---

## 5. Summary

| Aspect | Status |
|---|---|
| Backend Kipps.AI dependency | ✅ None (never had runtime dependency) |
| Frontend Kipps.AI API calls | ✅ None (never had runtime calls) |
| Chat Agent core functionality | ✅ Working (rule-based NLP + REST tool-calling) |
| Voice Agent core functionality | ✅ Working (Web Speech API) |
| Gemini API integration | ℹ️ Documented as optional future upgrade |
| Breaking changes required | ❌ None — existing functionality preserved |
