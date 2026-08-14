# Voice Agent Documentation

## 🎙️ Real-Time Voice Agent Overview

The ShopSathi Voice Agent is powered by **Google Gemini 2.5 Flash Native Audio Preview**, providing natural real-time speech conversations for hands-free shopping and customer support.

![Voice Agent Screenshot](../assets/screenshots/14-voice-agent.png)

---

## ⚙️ Voice Configuration & Telephony

* **Model**: `gemini-2.5-flash-native-audio-preview`
* **Voice Profile**: **Puck** (`en-US`)
* **PSTN Telephony Line**: `+91 8031339824`
* **Average Tool Execution Latency**: `< 7ms`

---

## 🔄 7-Stage Audio State Machine

```
[Connecting] ──► [Connected] ──► [Listening] ──► [Processing] ──► [Speaking] ──► [Ended]
```

1. **Connecting**: Negotiates WebRTC/telephony audio channels and requests microphone permissions.
2. **Connected**: Channel ready; prompts user with initial welcome greeting.
3. **Listening**: Captures user speech with visual listening wave animation and live speech-to-text transcript.
4. **Processing**: Evaluates intent and executes backend tool (e.g. `check_order_status`).
5. **Speaking**: Plays native speech audio with pulsing waveform animations.
6. **Ended**: Closes connection cleanly upon user completion.

---

## 🎛️ Interactive Controls
* **Mute Toggle**: Disables local microphone input.
* **Speaker Toggle**: Mutes audio playback.
* **Live Transcript**: Displays real-time bidirectional conversation text.
* **End Call**: Terminates audio session and returns to main view.
