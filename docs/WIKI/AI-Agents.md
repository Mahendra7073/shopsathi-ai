# AI Agents

ShopSathi AI includes two built-in AI assistants that operate entirely within the browser and the ShopSathi backend — no external AI service subscription is required.

---

## 💬 1. ShopSathi Chat Agent

* **Type**: Rule-based NLP with backend REST API tool-calling
* **Role**: Primary customer support and shopping conversational assistant
* **Languages Supported**: **English, Hindi, Hinglish**
* **Deployment**: Embedded in the floating "Ask ShopSathi" launcher on all web pages

### How It Works

The Chat Agent uses a JavaScript NLP engine (`processAgentQuery()` in `AiLauncher.js`) that:

1. Detects intent from the user's typed message using keyword and pattern matching
2. Extracts parameters (e.g., Order ID like `ORD1001`, budget like `₹2000`)
3. Calls the appropriate ShopSathi backend REST API (e.g., `GET /orders/ORD1001`)
4. Formats the JSON response into a natural-language reply
5. Presents action buttons for further navigation

### Supported Intents

| Intent | Sample Query | Backend Tool Called |
|---|---|---|
| Order tracking | "Where is my order ORD1001?" | `GET /orders/{id}` |
| Order cancellation | "Cancel ORD1005" | `POST /orders/{id}/cancel` |
| Return request | "ORD1003 return karna hai" | `POST /returns` |
| Refund status | "ORD1004 ka refund status" | `GET /orders/{id}/refund` |
| Product search | "Show running shoes under ₹2000" | `GET /products/search` |
| Support ticket | "Talk to human agent" | `POST /support/tickets` + escalate |

### Core Strengths
1. **Multilingual**: Understands English, Hindi, and Hinglish queries
2. **Deterministic Tool Invocation**: Always calls the actual backend API — no hallucination
3. **Authentication-aware**: Checks login state; redirects to login for private data

---

## 🎙️ 2. ShopSathi Voice Assistant

* **Type**: Browser Web Speech API (SpeechRecognition + SpeechSynthesis)
* **Language**: `en-IN` (Indian English, with Hindi/Hinglish input support)
* **Audio Lifecycle**: `Ready` → `Connecting` → `Connected` → `Listening` → `Processing` → `Speaking` → `Ended`

### How It Works

The Voice Assistant uses standard browser APIs — no external voice service required:

1. **SpeechRecognition API** — Captures the user's spoken query
2. **Same `processAgentQuery()` logic** as the Chat Agent processes the transcribed text
3. **SpeechSynthesis API** — Speaks the response back to the user

### Core Strengths
1. **No external service dependency**: Works in any modern browser with microphone access
2. **Same AI logic as Chat**: Both agents share identical backend tool-calling logic
3. **Interactive controls**: Mute/unmute microphone, stop audio, visual state badges

> **Note:** Chrome or Edge is recommended for the Voice Assistant as they provide the most reliable SpeechRecognition implementation.
