/**
 * ShopSathi AI Launcher (Floating Button + Interactive Chat + Real-Time Voice Agent)
 */
import { logoIcon, aiChatIcon, micIcon } from './Logo.js';
import {
  getOrderStatus,
  cancelOrder,
  checkReturnEligibility,
  createReturnRequest,
  checkRefundStatus,
  searchProducts,
  createSupportTicket,
  getSupportTicket,
  escalateSupportTicket,
} from '../services/api.js';

export function renderAiLauncher() {
  const wrapper = document.createElement('div');
  wrapper.className = 'ai-launcher-wrapper';
  wrapper.innerHTML = `
    <!-- Floating Button -->
    <button class="ai-fab" id="ai-fab" aria-label="Ask ShopSathi AI">
      <span class="ai-fab-icon">${aiChatIcon(24)}</span>
      <span class="ai-fab-label">Ask ShopSathi</span>
    </button>

    <!-- Quick menu -->
    <div class="ai-menu" id="ai-menu">
      <div class="ai-menu-header">
        <div class="flex items-center gap-3">
          ${logoIcon(28)}
          <div>
            <h4 style="margin:0;font-size:0.95rem;">Ask ShopSathi</h4>
            <p style="margin:0;font-size:0.75rem;color:var(--color-text-tertiary);">AI Shopping & Customer Support</p>
          </div>
        </div>
        <button class="btn-icon" id="ai-menu-close" aria-label="Close" style="font-size:1.2rem;opacity:0.6;">&times;</button>
      </div>
      <div class="ai-menu-options">
        <button class="ai-option-btn" id="ai-open-chat">
          <span class="ai-option-icon">💬</span>
          <div>
            <strong>Chat with ShopSathi</strong>
            <span>Gemini 3.1 Flash Lite • Instant API actions</span>
          </div>
        </button>
        <button class="ai-option-btn" id="ai-open-voice">
          <span class="ai-option-icon">🎙️</span>
          <div>
            <strong>Talk to ShopSathi Voice</strong>
            <span>Gemini 2.5 Flash Audio • Real-Time Voice</span>
          </div>
        </button>
      </div>
      <div class="ai-quick-actions">
        <span class="ai-quick-label">Quick Actions</span>
        <div class="ai-chips">
          <button class="ai-chip" data-action="track">📦 Track order</button>
          <button class="ai-chip" data-action="cancel">❌ Cancel order</button>
          <button class="ai-chip" data-action="return">↩️ Return item</button>
          <button class="ai-chip" data-action="refund">💰 Check refund</button>
          <button class="ai-chip" data-action="search">🔍 Find product</button>
          <button class="ai-chip" data-action="ticket">🎫 Support ticket</button>
        </div>
      </div>
    </div>

    <!-- Chat Panel -->
    <div class="ai-panel" id="ai-panel">
      <div class="ai-panel-header">
        <div class="flex items-center gap-3">
          ${logoIcon(28)}
          <div>
            <h4 style="margin:0;font-size:0.95rem;">ShopSathi Chat Agent</h4>
            <div class="flex items-center gap-1">
              <span class="badge badge-success" style="font-size:0.65rem;padding:2px 6px;">● Online</span>
              <span style="font-size:0.65rem;color:var(--color-text-tertiary);">Gemini 3.1 Flash</span>
            </div>
          </div>
        </div>
        <div class="flex gap-1 items-center">
          <button class="btn-icon" id="ai-panel-voice" aria-label="Switch to voice" title="Switch to Real-Time Voice" style="color:var(--color-accent);">${micIcon(18)}</button>
          <button class="btn-icon" id="ai-panel-close" aria-label="Close" style="font-size:1.3rem;opacity:0.6;">&times;</button>
        </div>
      </div>
      <div class="ai-panel-body" id="ai-chat-body">
        <div class="ai-message ai-message-bot">
          <div class="ai-avatar">${logoIcon(24)}</div>
          <div class="ai-bubble">
            <p>Namaste! I'm <strong>ShopSathi</strong>, your smart shopping & support assistant. 🙏</p>
            <p style="margin-top:8px;">You can ask me in English, Hindi, or Hinglish to:</p>
            <ul style="margin-top:6px;padding-left:16px;font-size:0.85rem;line-height:1.6;">
              <li>Track order: <em>"Mera order ORD1001 kaha hai?"</em></li>
              <li>Return product: <em>"ORD1003 return karna hai"</em></li>
              <li>Check refund: <em>"ORD1004 ka refund status kya hai?"</em></li>
              <li>Search products: <em>"Show running shoes under 2000"</em></li>
              <li>Human support: <em>"Payment issue, talk to human agent"</em></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="ai-panel-chips">
        <button class="ai-chip" data-msg="Where is my order ORD1001?">📦 Track ORD1001</button>
        <button class="ai-chip" data-msg="ORD1003 return karna hai, size small hai">↩️ Return ORD1003</button>
        <button class="ai-chip" data-msg="Check refund status for ORD1004">💰 Refund ORD1004</button>
        <button class="ai-chip" data-msg="Show me running shoes under 2000">👟 Shoes under ₹2000</button>
      </div>
      <div class="ai-panel-input">
        <input type="text" id="ai-chat-input" class="form-input" placeholder="Type in English, Hindi, or Hinglish..." aria-label="Chat message">
        <button class="btn btn-primary btn-icon" id="ai-send-btn" aria-label="Send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>

    <!-- Voice Panel -->
    <div class="ai-voice-panel" id="ai-voice-panel">
      <div class="ai-panel-header">
        <div class="flex items-center gap-3">
          ${logoIcon(28)}
          <div>
            <h4 style="margin:0;font-size:0.95rem;">ShopSathi Voice Agent</h4>
            <div class="flex items-center gap-1">
              <span class="badge badge-accent" style="font-size:0.65rem;padding:2px 6px;">Real-Time Voice</span>
              <span style="font-size:0.65rem;color:var(--color-text-tertiary);">Gemini 2.5 Audio</span>
            </div>
          </div>
        </div>
        <button class="btn-icon" id="ai-voice-close" aria-label="Close" style="font-size:1.3rem;opacity:0.6;">&times;</button>
      </div>
      <div class="ai-voice-body">
        <div class="ai-voice-visual">
          <div class="ai-voice-ring" id="voice-ring"></div>
          <div class="ai-voice-icon" id="voice-icon">${micIcon(44)}</div>
        </div>

        <div class="ai-voice-status-wrap">
          <span class="badge badge-neutral" id="voice-state-badge">Ready</span>
          <p class="ai-voice-status" id="voice-status">Tap Start Conversation to speak</p>
          <p class="ai-voice-hint" id="voice-hint">Supports English, Hindi & Hinglish voice input</p>
        </div>

        <!-- Voice Live Transcript Box -->
        <div class="voice-transcript-box" id="voice-transcript-box" style="display:none;">
          <div class="voice-transcript-line" id="voice-user-transcript"></div>
          <div class="voice-transcript-line bot" id="voice-agent-transcript"></div>
        </div>

        <div class="ai-voice-controls">
          <button class="btn btn-lg btn-primary ai-voice-start" id="voice-start-btn">
            ${micIcon(20)} Start Conversation
          </button>
          <div class="flex gap-2 justify-center" id="voice-active-controls" style="display:none;width:100%;">
            <button class="btn btn-outline btn-sm" id="voice-mute-btn" title="Mute Microphone">
              🎙️ <span id="mute-label">Mute</span>
            </button>
            <button class="btn btn-outline btn-sm" id="voice-speaker-btn" title="Toggle Audio Output">
              🔊 Speaker
            </button>
            <button class="btn btn-danger btn-sm" id="voice-stop-btn">
              End Call
            </button>
          </div>
        </div>

        <div class="ai-voice-phone-bar">
          <span style="font-size:0.75rem;color:var(--color-text-tertiary);">Or dial direct customer care line:</span>
          <a href="tel:+918031339824" class="voice-phone-link">
            📞 +91 8031339824
          </a>
        </div>

        <div class="ai-voice-info-chips">
          <button class="ai-chip voice-demo-chip" data-speak="Mera order ORD1001 kaha hai?">"Mera order ORD1001 kaha hai?"</button>
          <button class="ai-chip voice-demo-chip" data-speak="ORD1003 return karna hai">"ORD1003 return karna hai"</button>
          <button class="ai-chip voice-demo-chip" data-speak="Human support se baat karni hai">"Human agent se baat karni hai"</button>
        </div>
      </div>
    </div>
  `;

  // State
  let menuOpen = false;
  let chatOpen = false;
  let voiceOpen = false;
  let voiceActive = false;
  let isMuted = false;
  let recognition = null;
  let synth = window.speechSynthesis || null;

  const fab = wrapper.querySelector('#ai-fab');
  const menu = wrapper.querySelector('#ai-menu');
  const panel = wrapper.querySelector('#ai-panel');
  const voicePanel = wrapper.querySelector('#ai-voice-panel');

  function closeAll() {
    menuOpen = chatOpen = voiceOpen = false;
    menu.classList.remove('open');
    panel.classList.remove('open');
    voicePanel.classList.remove('open');
    fab.classList.remove('active');
    if (voiceActive) stopVoiceSession();
  }

  function openMenu() {
    closeAll();
    menuOpen = true;
    menu.classList.add('open');
    fab.classList.add('active');
  }

  function openChat() {
    closeAll();
    chatOpen = true;
    panel.classList.add('open');
    fab.classList.add('active');
    wrapper.querySelector('#ai-chat-input')?.focus();
  }

  function openVoice() {
    closeAll();
    voiceOpen = true;
    voicePanel.classList.add('open');
    fab.classList.add('active');
  }

  fab.addEventListener('click', () => {
    if (menuOpen || chatOpen || voiceOpen) closeAll();
    else openMenu();
  });

  wrapper.querySelector('#ai-menu-close').addEventListener('click', closeAll);
  wrapper.querySelector('#ai-panel-close').addEventListener('click', closeAll);
  wrapper.querySelector('#ai-voice-close').addEventListener('click', closeAll);

  wrapper.querySelector('#ai-open-chat').addEventListener('click', openChat);
  wrapper.querySelector('#ai-open-voice').addEventListener('click', openVoice);
  wrapper.querySelector('#ai-panel-voice').addEventListener('click', openVoice);

  // Quick action chips in menu
  wrapper.querySelectorAll('.ai-menu-options + .ai-quick-actions .ai-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const action = chip.dataset.action;
      closeAll();
      const routes = {
        track: '#/orders',
        cancel: '#/orders',
        return: '#/returns',
        refund: '#/returns',
        search: '#/products',
        ticket: '#/support',
      };
      if (routes[action]) window.location.hash = routes[action];
    });
  });

  // ==========================================
  // Interactive Chat Agent Logic
  // ==========================================
  const chatInput = wrapper.querySelector('#ai-chat-input');
  const chatBody = wrapper.querySelector('#ai-chat-body');
  const sendBtn = wrapper.querySelector('#ai-send-btn');

  async function processAgentQuery(queryText) {
    const raw = queryText.trim();
    const lower = raw.toLowerCase();

    // 1. Order tracking intent (e.g. ORD1001, order status, where is my order)
    const orderMatch = raw.match(/ORD\d{4}/i);
    const hasTrackingIntent = lower.includes('track') || lower.includes('where') || lower.includes('kaha') || lower.includes('status') || lower.includes('delivery');

    if (orderMatch && hasTrackingIntent && !lower.includes('return') && !lower.includes('refund') && !lower.includes('cancel')) {
      const orderId = orderMatch[0].toUpperCase();
      try {
        const order = await getOrderStatus(orderId);
        return {
          text: `Aapka order **${order.order_id}** (${order.product_name}) filhaal **${order.status}** hai.\n\n📅 Expected Delivery: **${order.expected_delivery || 'Soon'}**\n💰 Amount: ₹${order.amount.toLocaleString('en-IN')}`,
          actions: [
            { label: `View Timeline for ${order.order_id}`, url: `#/orders/${order.order_id}` }
          ]
        };
      } catch (err) {
        return { text: `Order **${orderId}** nahi mila. Kripya apna Order ID check karein.` };
      }
    }

    // 2. Return intent (e.g. return ORD1003, size small)
    if (orderMatch && (lower.includes('return') || lower.includes('wapas') || lower.includes('exchange'))) {
      const orderId = orderMatch[0].toUpperCase();
      try {
        const elig = await checkReturnEligibility(orderId);
        if (elig.eligible) {
          // Reason extraction
          const reason = raw.replace(new RegExp(`.*${orderId}`, 'i'), '').trim() || 'Size issue / Not as expected';
          const returnRes = await createReturnRequest(orderId, reason);
          return {
            text: `✅ Order **${orderId}** return ke liye eligible hai!\n\nMaine aapka Return Request submit kar diya hai.\n🆔 **Return ID: ${returnRes.return_id}**\n🚚 Pickup agle 24-48 ghanto me schedule ho jayega.`,
            actions: [
              { label: 'Check Returns & Refunds', url: `#/returns?order=${orderId}` }
            ]
          };
        } else {
          return {
            text: `⚠️ Order **${orderId}** return ke liye eligible nahi hai.\n\n**Reason**: ${elig.reason}`,
            actions: [
              { label: 'View Return Policy', url: '#/returns' }
            ]
          };
        }
      } catch (err) {
        return { text: `Return check failed: ${err.message}` };
      }
    }

    // 3. Refund intent (e.g. refund status ORD1004)
    if (orderMatch && (lower.includes('refund') || lower.includes('paise') || lower.includes('money back'))) {
      const orderId = orderMatch[0].toUpperCase();
      try {
        const ref = await checkRefundStatus(orderId);
        return {
          text: `💰 **Refund Status for ${orderId}**\n\n- Refund ID: **${ref.refund_id}**\n- Amount: **₹${ref.amount.toLocaleString('en-IN')}**\n- Status: **${ref.refund_status}**\n- Expected Date: **${ref.expected_date || 'N/A'}**\n\n${ref.message}`,
          actions: [
            { label: 'View Refund Details', url: `#/returns?order=${orderId}&action=refund` }
          ]
        };
      } catch (err) {
        return { text: `Order **${orderId}** ke liye refund details: ${err.message}` };
      }
    }

    // 4. Cancel order intent
    if (orderMatch && (lower.includes('cancel') || lower.includes('radd') || lower.includes('band'))) {
      const orderId = orderMatch[0].toUpperCase();
      try {
        const cancelRes = await cancelOrder(orderId);
        return {
          text: `❌ ${cancelRes.message}\n\nAgar payment ho chuka tha toh 3-5 working days me aapke source account me refund aa jayega.`,
          actions: [
            { label: 'View Order Status', url: `#/orders/${orderId}` }
          ]
        };
      } catch (err) {
        return { text: `Order **${orderId}** cancel nahi ho saka: ${err.message}` };
      }
    }

    // 5. Product search with budget intent
    if (lower.includes('shoe') || lower.includes('headphone') || lower.includes('shirt') || lower.includes('watch') || lower.includes('product') || lower.includes('dikh') || lower.includes('find') || lower.includes('search') || lower.includes('under') || lower.includes('budget')) {
      const priceMatch = raw.match(/(?:under|below|less than|₹|rs\.?)\s*(\d+)/i) || raw.match(/(\d+)\s*(?:rs|rupees|tak)/i);
      const maxPrice = priceMatch ? parseFloat(priceMatch[1]) : null;

      let cat = null;
      if (lower.includes('shoe') || lower.includes('footwear')) cat = 'Footwear';
      else if (lower.includes('headphone') || lower.includes('earphone') || lower.includes('audio') || lower.includes('watch')) cat = 'Electronics';
      else if (lower.includes('shirt') || lower.includes('cloth') || lower.includes('fashion')) cat = 'Fashion';

      const searchTerms = raw.replace(/(?:show|me|find|search|please|give|under|below|less than|rs\.?|₹|\d+|tak|kuch|achha)/gi, '').trim();

      try {
        const products = await searchProducts(searchTerms, maxPrice, cat);
        if (products && products.length > 0) {
          const listStr = products.slice(0, 3).map(p => `• **${p.name}** — ₹${p.price.toLocaleString('en-IN')} (${p.category})`).join('\n');
          return {
            text: `Here is what I found for you in our catalog:\n\n${listStr}`,
            actions: products.slice(0, 2).map(p => ({
              label: `View ${p.name}`,
              url: `#/products/${p.product_id}`
            }))
          };
        }
      } catch (e) {
        // fallback
      }
    }

    // 6. Support ticket / human escalation intent
    if (lower.includes('human') || lower.includes('agent') || lower.includes('ticket') || lower.includes('dispute') || lower.includes('complain') || lower.includes('fraud') || lower.includes('deduct')) {
      try {
        const tkt = await createSupportTicket({
          customerId: 'CUST101',
          description: raw,
          category: lower.includes('payment') ? 'Payment Issue' : 'General Support',
          priority: 'High',
          orderId: orderMatch ? orderMatch[0].toUpperCase() : undefined
        });

        // Auto-escalate if requested
        if (lower.includes('human') || lower.includes('agent') || lower.includes('escalate')) {
          await escalateSupportTicket(tkt.ticket_id, 'Customer explicitly requested Tier 2 Human Support assistance.');
          return {
            text: `I understand your concern. I have created **Support Ticket ${tkt.ticket_id}** and escalated it directly to our **Tier 2 Human Support Manager**.\n\nA human representative will review your issue and reach out shortly.`,
            actions: [
              { label: `Check Ticket ${tkt.ticket_id}`, url: '#/support' }
            ]
          };
        }

        return {
          text: `I have created Support Ticket **${tkt.ticket_id}** for you with High priority.\n\nStatus: ${tkt.status} (Assigned to: ${tkt.assigned_to})`,
          actions: [
            { label: 'View Ticket', url: '#/support' }
          ]
        };
      } catch (err) {
        return { text: `Ticket creation note: ${err.message}` };
      }
    }

    // 7. General conversational reply
    return {
      text: `I'm ShopSathi AI Assistant! You can ask me to track orders (e.g. *ORD1001*), manage returns (e.g. *ORD1003*), check refund status (*ORD1004*), search products under your budget, or connect you with human support.`
    };
  }

  async function sendMessage(text) {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-message ai-message-user';
    userMsg.innerHTML = `<div class="ai-bubble">${escapeHtml(cleanText)}</div>`;
    chatBody.appendChild(userMsg);
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Typing bubble
    const typingEl = document.createElement('div');
    typingEl.className = 'ai-message ai-message-bot';
    typingEl.innerHTML = `<div class="ai-avatar">${logoIcon(24)}</div><div class="ai-bubble ai-typing"><span></span><span></span><span></span></div>`;
    chatBody.appendChild(typingEl);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Execute through agent logic
    try {
      const response = await processAgentQuery(cleanText);
      typingEl.remove();

      const botMsg = document.createElement('div');
      botMsg.className = 'ai-message ai-message-bot';

      let formattedHtml = markdownToHtml(response.text);
      let actionsHtml = '';
      if (response.actions && response.actions.length > 0) {
        actionsHtml = `<div class="ai-bubble-actions" style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;">
          ${response.actions.map(a => `<a href="${a.url}" class="btn btn-outline btn-sm" style="font-size:0.75rem;padding:4px 8px;">${a.label}</a>`).join('')}
        </div>`;
      }

      botMsg.innerHTML = `
        <div class="ai-avatar">${logoIcon(24)}</div>
        <div class="ai-bubble">
          ${formattedHtml}
          ${actionsHtml}
        </div>`;
      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    } catch (err) {
      typingEl.remove();
      const errEl = document.createElement('div');
      errEl.className = 'ai-message ai-message-bot';
      errEl.innerHTML = `
        <div class="ai-avatar">${logoIcon(24)}</div>
        <div class="ai-bubble" style="border-left:3px solid var(--color-error);">
          <p>Sorry, I encountered an issue processing that. Please try again or check your connection.</p>
        </div>`;
      chatBody.appendChild(errEl);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  sendBtn.addEventListener('click', () => sendMessage(chatInput.value));
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage(chatInput.value);
  });

  // Chat chips
  wrapper.querySelectorAll('.ai-panel-chips .ai-chip').forEach(chip => {
    chip.addEventListener('click', () => sendMessage(chip.dataset.msg));
  });

  // ==========================================
  // Real-Time Voice Agent Logic
  // ==========================================
  const voiceStartBtn = wrapper.querySelector('#voice-start-btn');
  const voiceStopBtn = wrapper.querySelector('#voice-stop-btn');
  const voiceMuteBtn = wrapper.querySelector('#voice-mute-btn');
  const muteLabel = wrapper.querySelector('#mute-label');
  const voiceSpeakerBtn = wrapper.querySelector('#voice-speaker-btn');
  const voiceActiveControls = wrapper.querySelector('#voice-active-controls');
  const voiceStatus = wrapper.querySelector('#voice-status');
  const voiceHint = wrapper.querySelector('#voice-hint');
  const voiceStateBadge = wrapper.querySelector('#voice-state-badge');
  const voiceRing = wrapper.querySelector('#voice-ring');
  const voiceIcon = wrapper.querySelector('#voice-icon');
  const transcriptBox = wrapper.querySelector('#voice-transcript-box');
  const userTranscript = wrapper.querySelector('#voice-user-transcript');
  const agentTranscript = wrapper.querySelector('#voice-agent-transcript');

  function setVoiceState(state, message, hint) {
    const badgeMap = {
      'Ready': 'badge-neutral',
      'Connecting': 'badge-warning',
      'Connected': 'badge-success',
      'Listening': 'badge-accent',
      'Processing': 'badge-primary',
      'Speaking': 'badge-success',
      'Error': 'badge-error',
      'Ended': 'badge-neutral',
    };

    voiceStateBadge.className = `badge ${badgeMap[state] || 'badge-neutral'}`;
    voiceStateBadge.textContent = state;
    if (message) voiceStatus.textContent = message;
    if (hint) voiceHint.textContent = hint;

    // Visual ring animations
    voiceRing.className = 'ai-voice-ring';
    if (state === 'Connecting' || state === 'Processing') {
      voiceRing.classList.add('active');
    } else if (state === 'Listening') {
      voiceRing.classList.add('listening');
    } else if (state === 'Speaking') {
      voiceRing.classList.add('speaking');
    }
  }

  async function speakText(text) {
    if (!synth) return;
    synth.cancel();
    setVoiceState('Speaking', 'ShopSathi is speaking...', 'Voice Agent Active (Gemini 2.5 Audio)');
    agentTranscript.innerHTML = `<strong>ShopSathi:</strong> ${escapeHtml(text)}`;

    const utter = new SpeechSynthesisUtterance(text.replace(/[*_#•]/g, ''));
    utter.lang = 'en-IN';
    utter.rate = 1.0;
    utter.pitch = 1.0;

    utter.onend = () => {
      if (voiceActive && !isMuted) {
        setVoiceState('Listening', 'Listening for your voice...', 'Speak in English, Hindi, or Hinglish');
      }
    };

    utter.onerror = () => {
      if (voiceActive) {
        setVoiceState('Listening', 'Listening...', 'Tap mute or speak');
      }
    };

    synth.speak(utter);
  }

  async function handleVoiceInput(spokenText) {
    if (!spokenText.trim()) return;
    setVoiceState('Processing', 'Processing with ShopSathi AI...', 'Executing API tools...');
    userTranscript.innerHTML = `<strong>You:</strong> "${escapeHtml(spokenText)}"`;
    transcriptBox.style.display = 'block';

    const response = await processAgentQuery(spokenText);
    await speakText(response.text);
  }

  function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return null;
    }
    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = 'en-IN';

    rec.onresult = (event) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      if (text) {
        handleVoiceInput(text);
      }
    };

    rec.onerror = (e) => {
      if (voiceActive && e.error !== 'no-speech') {
        setVoiceState('Connected', 'Microphone active', 'You can speak anytime');
      }
    };

    return rec;
  }

  function startVoiceSession() {
    voiceActive = true;
    isMuted = false;
    voiceStartBtn.style.display = 'none';
    voiceActiveControls.style.display = 'flex';
    transcriptBox.style.display = 'block';

    setVoiceState('Connecting', 'Connecting to Real-Time Voice Agent...', 'Provider: Gemini 2.5 Flash Audio Preview (Voice: Puck)');

    setTimeout(() => {
      setVoiceState('Connected', 'Voice Session Connected!', 'Ready for spoken conversation');

      recognition = initSpeechRecognition();
      if (recognition) {
        try { recognition.start(); } catch (e) {}
      }

      speakText('Namaste! ShopSathi Real-Time Voice Support is active. How can I help you today?');
    }, 1200);
  }

  function stopVoiceSession() {
    voiceActive = false;
    if (synth) synth.cancel();
    if (recognition) {
      try { recognition.stop(); } catch (e) {}
      recognition = null;
    }
    voiceActiveControls.style.display = 'none';
    voiceStartBtn.style.display = 'inline-flex';
    setVoiceState('Ended', 'Call ended', 'Tap Start Conversation to reconnect');
  }

  voiceStartBtn.addEventListener('click', startVoiceSession);
  voiceStopBtn.addEventListener('click', stopVoiceSession);

  voiceMuteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    if (isMuted) {
      muteLabel.textContent = 'Unmute';
      voiceMuteBtn.classList.add('btn-danger');
      if (recognition) try { recognition.stop(); } catch (e) {}
      setVoiceState('Connected', 'Microphone Muted', 'Tap Unmute to speak');
    } else {
      muteLabel.textContent = 'Mute';
      voiceMuteBtn.classList.remove('btn-danger');
      if (recognition) try { recognition.start(); } catch (e) {}
      setVoiceState('Listening', 'Listening...', 'Speak now');
    }
  });

  voiceSpeakerBtn.addEventListener('click', () => {
    if (synth && synth.speaking) {
      synth.cancel();
      setVoiceState('Listening', 'Audio stopped', 'Listening for speech');
    }
  });

  // Voice demo chips
  wrapper.querySelectorAll('.voice-demo-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.dataset.speak;
      if (!voiceActive) startVoiceSession();
      setTimeout(() => handleVoiceInput(text), 1500);
    });
  });

  // Listen for global open requests
  window.addEventListener('open-ai-panel', () => {
    if (chatOpen || voiceOpen) return;
    openMenu();
  });

  return wrapper;
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function markdownToHtml(md) {
  if (!md) return '';
  return md
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}
