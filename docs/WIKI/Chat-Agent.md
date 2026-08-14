# Chat Agent Documentation

## 🤖 Model & Capabilities

The ShopSathi Chat Agent is powered by **Google Gemini 3.1 Flash Lite**, configured for low-latency, deterministic function-calling in e-commerce customer workflows.

![Chat Agent Screenshot](../assets/screenshots/13-chat-agent.png)

---

## 🌐 Multilingual Processing

The Chat Agent natively understands and responds in **English, Hindi, and Hinglish**:

### User Query Examples
* **English**: *"Where is my order ORD1001?"*  
  ➔ *Invokes `check_order_status(order_id='ORD1001')`* ➔ Responds with status "Out for Delivery" and expected delivery time.
* **Hindi**: *"मेरा आर्डर ORD1001 कहाँ है?"*  
  ➔ *Invokes `check_order_status(order_id='ORD1001')`* ➔ Responds in fluent Hindi.
* **Hinglish**: *"Mera order ORD1001 kab deliver hoga?"*  
  ➔ *Invokes `check_order_status(order_id='ORD1001')`* ➔ Responds: *"Aapka order ORD1001 'Out for Delivery' hai aur aaj shaam 7:00 PM tak deliver ho jayega."*

---

## 🛡️ Zero-Hallucination Guardrails

1. **Tool Output Dependency**: The agent is strictly forbidden from inventing tracking numbers, item stock, or refund dates.
2. **Context Persistence**: Maintains order ID across multi-turn queries.
3. **Escalation Trigger**: When user friction or gateway errors occur, the agent offers immediate human escalation.
