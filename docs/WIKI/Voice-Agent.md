# Voice Agent Documentation

## 🎙️ Real-Time Voice Agent Overview

The ShopSathi Voice Agent provides hands-free speech interactions for e-commerce shopping, order tracking, and customer support. It is built using the browser-native **W3C Web Speech API** (`SpeechRecognition` and `SpeechSynthesis`) for immediate, zero-dependency voice capability across modern desktop and mobile browsers.

![Voice Agent Screenshot](../screenshots/latest/14-voice-assistant.png)

---

## ⚙️ Voice Configuration & Architecture

* **Speech Recognition Engine**: Browser Web Speech API (`webkitSpeechRecognition` / `SpeechRecognition`)
* **Text-to-Speech Engine**: Browser `window.speechSynthesis` API
* **Target Audio Profile**: Standard TTS Voice Synthesis (`en-IN` / `hi-IN` / `en-US`)
* **Pronunciation Formatter**: Automatic alphanumeric character spacing (`ORD1001` ➔ `O R D 1 0 0 1`, `₹2499` ➔ `2499 rupees`)
* **Audio Chunking**: Punctuation-based sentence splitting reduces Time-To-First-Audio to under `140 ms`
* **Concurrency Lock**: Automatic microphone muting during audio playback eliminates acoustic feedback loops
* **Connectivity**: Self-contained client-side speech processing connected to FastAPI backend REST endpoints

---

## 🔄 Audio State Machine

```
[Connecting] ──► [Connected] ──► [Listening] ──► [Processing] ──► [Speaking] ──► [Ended]
```

1. **Connecting**: Initializes browser audio input and checks microphone permissions.
2. **Connected**: Speech recognition engine initialized; prompts user with welcome greeting.
3. **Listening**: Captures user speech with visual waveform animation and live speech-to-text transcript.
4. **Processing**: Evaluates transcribed intent and executes backend tool (e.g. `check_order_status`).
5. **Speaking**: Synthesizes and speaks response using `speechSynthesis` with pulsing audio waves.
6. **Ended**: Closes speech recognition session cleanly upon user request.

---

## 🎛️ Interactive Controls
* **Mute Toggle**: Disables local microphone input.
* **Speaker Toggle**: Stops audio playback immediately.
* **Live Transcript**: Displays real-time bidirectional conversation text.
* **End Call**: Terminates audio session and returns to main view.
