# AI Agents

ShopSathi deploys two specialized AI agents powered by Google Gemini via the Kipps.AI platform:

---

## 💬 1. ShopSathi Chat Agent

* **Model**: **Gemini 3.1 Flash Lite**
* **Role**: Primary customer support and shopping conversational assistant.
* **Languages Supported**: **English, Hindi, Hinglish**
* **Deployment**: Embedded in the floating "Ask ShopSathi" launcher on all web pages.

### Core Strengths
1. **Multi-Turn Contextual Memory**: Maintains order context across queries (e.g. asking *"Where is my order ORD1001?"* followed by *"Can I cancel it?"*).
2. **Deterministic Tool Invocation**: Automatically formats and calls backend functions (`check_order_status`, `create_return_request`, etc.).
3. **Vernacular Translation**: Interprets colloquial Indian phrases such as *"Mera refund kab aayega?"* and maps them to `check_refund_status`.

---

## 🎙️ 2. ShopSathi Real-Time Voice Agent

* **Model**: **Gemini 2.5 Flash Native Audio Preview**
* **Voice Profile**: **Puck**
* **Language**: `en-US`
* **Direct Phone Gateway**: `+91 8031339824`
* **Audio Lifecycle**: `Connecting` ➔ `Connected` ➔ `Listening` ➔ `Processing` ➔ `Speaking` ➔ `Ended`

### Core Strengths
1. **Native Audio Processing**: Speech-to-speech interaction without intermediary text translation lag.
2. **Sub-Second Responsiveness**: Fast real-time responses with backend tool latency `< 7ms`.
3. **Interactive Audio Controls**: Visual audio waveforms, live speech transcript, microphone mute/unmute, speaker audio toggle, and end call.
