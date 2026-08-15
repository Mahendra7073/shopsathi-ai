(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const z={};let B=null;function C(e,t){z[e]=t}function Ne(){return(window.location.hash.slice(1)||"/").split("?")[0]}function Fe(e){if(z[e])return{handler:z[e],params:{}};for(const[t,n]of Object.entries(z)){const a=t.split("/").filter(Boolean),i=e.split("/").filter(Boolean);if(a.length!==i.length)continue;const s={};let r=!0;for(let o=0;o<a.length;o++)if(a[o].startsWith(":"))s[a[o].slice(1)]=i[o];else if(a[o]!==i[o]){r=!1;break}if(r)return{handler:n,params:s}}return null}function Be(e){async function t(){const n=Ne(),a=Fe(n);if(B&&(B(),B=null),a){const i=await a.handler(e,a.params);typeof i=="function"&&(B=i)}else e.innerHTML=`
        <div class="container page-content">
          <div class="empty-state" style="min-height: 60vh;">
            <div class="empty-state-icon">🔍</div>
            <h3>Page Not Found</h3>
            <p>The page you're looking for doesn't exist.</p>
            <a href="#/" class="btn btn-primary" style="margin-top: var(--space-4);">Go Home</a>
          </div>
        </div>`;window.scrollTo({top:0,behavior:"instant"})}return window.addEventListener("hashchange",t),t(),()=>window.removeEventListener("hashchange",t)}function ae(e=140){return`<svg width="${e}" height="${Math.round(e*.3)}" viewBox="0 0 480 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ShopSathi logo">
    <g>
      <!-- Shopping bag icon -->
      <rect x="10" y="35" width="50" height="55" rx="8" stroke="#2563EB" stroke-width="4" fill="none"/>
      <path d="M22 35 C22 20, 48 20, 48 35" stroke="#2563EB" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- AI spark -->
      <circle cx="35" cy="58" r="6" fill="#06B6D4"/>
      <path d="M35 48 L35 44" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M35 72 L35 68" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M25 58 L21 58" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M49 58 L45 58" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <text x="75" y="82" font-family="Inter, sans-serif" font-weight="800" font-size="50" fill="#0F172A">Shop<tspan fill="#2563EB">Sathi</tspan></text>
  </svg>`}function ze(e=44){return`<svg width="${e}" height="${e}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ShopSathi icon">
    <rect x="8" y="18" width="48" height="38" rx="10" fill="#2563EB"/>
    <path d="M20 18 C20 6, 44 6, 44 18" stroke="#2563EB" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="32" cy="35" r="7" fill="white"/>
    <path d="M32 24 L32 20" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 50 L32 46" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M21 35 L17 35" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M47 35 L43 35" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M24 27 L21.5 24.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <path d="M40 43 L42.5 45.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
  </svg>`}function R(e=32){return`<svg width="${e}" height="${e}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="9" width="24" height="19" rx="5" fill="#2563EB"/>
    <path d="M10 9 C10 3, 22 3, 22 9" stroke="#2563EB" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="16" cy="17.5" r="3.5" fill="white"/>
    <line x1="16" y1="12" x2="16" y2="10.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="16" y1="24.5" x2="16" y2="23" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="10.5" y1="17.5" x2="9" y2="17.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="23" y1="17.5" x2="21.5" y2="17.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`}function be(e=24){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none"/>
  </svg>`}function U(e=24){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>`}const fe="shopsathi_cart",Z="shopsathi_user",ee=new Set;function Ue(e){return ee.add(e),()=>ee.delete(e)}function ke(e,t){ee.forEach(n=>n(e,t))}function se(){try{return JSON.parse(localStorage.getItem(Z))}catch{return null}}function we(e){e?localStorage.setItem(Z,JSON.stringify(e)):localStorage.removeItem(Z),ke("user-changed",e)}function Ve(){we(null)}function O(){try{return JSON.parse(localStorage.getItem(fe))||[]}catch{return[]}}function V(e){localStorage.setItem(fe,JSON.stringify(e)),ke("cart-changed",e)}function te(e,t=1){const n=O(),a=n.find(i=>i.product_id===e.product_id);return a?a.quantity+=t:n.push({product_id:e.product_id,name:e.name,price:e.price,category:e.category,description:e.description,quantity:t}),V(n),n}function ve(e,t){let n=O();if(t<=0)n=n.filter(a=>a.product_id!==e);else{const a=n.find(i=>i.product_id===e);a&&(a.quantity=t)}return V(n),n}function je(e){const t=O().filter(n=>n.product_id!==e);return V(t),t}function Se(){V([])}function Ge(){return O().reduce((e,t)=>e+t.quantity,0)}function xe(){return O().reduce((e,t)=>e+t.price*t.quantity,0)}function Ye(){var r,o;const e=document.createElement("header");e.className="site-header",e.innerHTML=`
    <div class="header-inner container">
      <a href="#/" class="header-logo" aria-label="ShopSathi Home">
        <span class="header-logo-full">${ae(160)}</span>
        <span class="header-logo-compact">${ze(36)}</span>
      </a>

      <nav class="header-nav" id="main-nav" aria-label="Main navigation">
        <a href="#/" class="nav-link" data-route="/">Home</a>
        <a href="#/products" class="nav-link" data-route="/products">Products</a>
        <a href="#/orders" class="nav-link" data-route="/orders">My Orders</a>
        <a href="#/returns" class="nav-link" data-route="/returns">Returns</a>
        <a href="#/support" class="nav-link" data-route="/support">Support</a>
      </nav>

      <div class="header-actions">
        <a href="#/products" class="btn-icon header-search-btn" aria-label="Search products" title="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </a>
        <a href="#/cart" class="btn-icon header-cart-btn" aria-label="Cart" title="Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span class="cart-badge" id="header-cart-badge" style="display: none;">0</span>
        </a>
        <a href="#/profile" class="btn-icon header-profile-btn" aria-label="Profile" title="Profile">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </a>
        <button class="btn btn-primary btn-sm header-ai-btn" id="header-ai-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Ask ShopSathi
        </button>
        <button class="header-hamburger" id="hamburger-btn" aria-label="Menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Mobile nav -->
    <div class="mobile-nav" id="mobile-nav">
      <a href="#/" class="mobile-nav-link">🏠 Home</a>
      <a href="#/products" class="mobile-nav-link">🛍️ Products</a>
      <a href="#/orders" class="mobile-nav-link">📦 My Orders</a>
      <a href="#/returns" class="mobile-nav-link">↩️ Returns</a>
      <a href="#/support" class="mobile-nav-link">🎫 Support</a>
      <a href="#/cart" class="mobile-nav-link">🛒 Cart</a>
      <a href="#/profile" class="mobile-nav-link">👤 Profile</a>
      <div class="divider"></div>
      <button class="btn btn-primary btn-lg" style="width:100%;" id="mobile-ai-btn">💬 Ask ShopSathi</button>
    </div>
  `;function t(){const l=Ge(),g=e.querySelector("#header-cart-badge");g&&(g.textContent=l,g.style.display=l>0?"flex":"none")}t(),Ue(l=>{l==="cart-changed"&&t()});function n(){const l=window.location.hash.slice(1)||"/";e.querySelectorAll(".nav-link, .mobile-nav-link").forEach(g=>{var p;const d=((p=g.getAttribute("href"))==null?void 0:p.replace("#",""))||"";g.classList.toggle("active",l===d||d!=="/"&&l.startsWith(d))})}n(),window.addEventListener("hashchange",n);const a=e.querySelector("#hamburger-btn"),i=e.querySelector("#mobile-nav");a==null||a.addEventListener("click",()=>{const l=a.getAttribute("aria-expanded")==="true";a.setAttribute("aria-expanded",!l),a.classList.toggle("open"),i.classList.toggle("open")}),i==null||i.querySelectorAll("a").forEach(l=>{l.addEventListener("click",()=>{a.setAttribute("aria-expanded","false"),a.classList.remove("open"),i.classList.remove("open")})});const s=()=>{window.dispatchEvent(new CustomEvent("open-ai-panel")),a==null||a.setAttribute("aria-expanded","false"),a==null||a.classList.remove("open"),i==null||i.classList.remove("open")};return(r=e.querySelector("#header-ai-btn"))==null||r.addEventListener("click",s),(o=e.querySelector("#mobile-ai-btn"))==null||o.addEventListener("click",s),e}function Qe(){const e=document.createElement("footer");return e.className="site-footer",e.innerHTML=`
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          ${ae(140)}
          <p>Smart Shopping. Smarter Support.</p>
          <p class="footer-desc">AI-powered e-commerce support for seamless shopping, order tracking, returns, and instant assistance.</p>
        </div>
        <div class="footer-links">
          <h4>Shop</h4>
          <a href="#/products">All Products</a>
          <a href="#/products?category=Electronics">Electronics</a>
          <a href="#/products?category=Footwear">Footwear</a>
          <a href="#/products?category=Fashion">Fashion</a>
        </div>
        <div class="footer-links">
          <h4>Support</h4>
          <a href="#/orders">Track Order</a>
          <a href="#/returns">Returns & Refunds</a>
          <a href="#/support">Help Center</a>
          <a href="#/support?action=ticket">Create Ticket</a>
        </div>
        <div class="footer-links">
          <h4>Company</h4>
          <a href="#/">About ShopSathi</a>
          <a href="#/">Privacy Policy</a>
          <a href="#/">Terms of Service</a>
          <a href="#/">Contact</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} ShopSathi. Built with ❤️ for Kipps.AI Hackathon.</p>
      </div>
    </div>
  `,e}const Je=typeof window<"u"&&window.__API_BASE__?window.__API_BASE__:typeof window<"u"&&window.location.port==="5173"?"/api":"";class J extends Error{constructor(t,n,a){super(t),this.status=n,this.data=a}}async function x(e,t={}){const n=`${Je}${e}`,a={headers:{"Content-Type":"application/json",...t.headers},...t};try{const i=await fetch(n,a),s=await i.json().catch(()=>null);if(!i.ok){const r=(s==null?void 0:s.detail)||(s==null?void 0:s.message)||"Request failed";throw new J(r,i.status,s)}return s}catch(i){throw i instanceof J?i:new J("Network error. Please check your connection and try again.",0,null)}}async function We(){return x("/products")}async function $e(e="",t=null,n=null){const a=new URLSearchParams;return e&&a.set("query",e),t&&a.set("max_price",t),n&&a.set("category",n),x(`/products/search?${a.toString()}`)}async function Ke(e){return x(`/products/${e}`)}async function he(e=null){const t=e?`?customer_id=${e}`:"";return x(`/orders${t}`)}async function j(e){return x(`/orders/${e}`)}async function Le(e){return x(`/orders/${e}/cancel`,{method:"POST"})}async function Xe(e){return x(`/customers/${e}/orders`)}async function Ce(e){return x(`/orders/${e}/return-eligibility`)}async function Ee(e,t){return x("/returns",{method:"POST",body:JSON.stringify({order_id:e,reason:t})})}async function Te(e){return x(`/orders/${e}/refund`)}async function qe({customerId:e,description:t,subject:n,category:a,priority:i,orderId:s}){return x("/support/tickets",{method:"POST",body:JSON.stringify({customer_id:e,description:t,subject:n||void 0,category:a||void 0,priority:i||"Medium",order_id:s||void 0})})}async function Ze(e){return x(`/support/tickets/${e}`)}async function Re(e,t){return x(`/support/tickets/${e}/escalate`,{method:"POST",body:JSON.stringify({reason:t||void 0})})}async function et(e){return x(`/customers/${e}`)}function tt(){const e=document.createElement("div");e.className="ai-launcher-wrapper",e.innerHTML=`
    <!-- Floating Button -->
    <button class="ai-fab" id="ai-fab" aria-label="Ask ShopSathi AI">
      <span class="ai-fab-icon">${be(24)}</span>
      <span class="ai-fab-label">Ask ShopSathi</span>
    </button>

    <!-- Quick menu -->
    <div class="ai-menu" id="ai-menu">
      <div class="ai-menu-header">
        <div class="flex items-center gap-3">
          ${R(28)}
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
          ${R(28)}
          <div>
            <h4 style="margin:0;font-size:0.95rem;">ShopSathi Chat Agent</h4>
            <div class="flex items-center gap-1">
              <span class="badge badge-success" style="font-size:0.65rem;padding:2px 6px;">● Online</span>
              <span style="font-size:0.65rem;color:var(--color-text-tertiary);">Gemini 3.1 Flash</span>
            </div>
          </div>
        </div>
        <div class="flex gap-1 items-center">
          <button class="btn-icon" id="ai-panel-voice" aria-label="Switch to voice" title="Switch to Real-Time Voice" style="color:var(--color-accent);">${U(18)}</button>
          <button class="btn-icon" id="ai-panel-close" aria-label="Close" style="font-size:1.3rem;opacity:0.6;">&times;</button>
        </div>
      </div>
      <div class="ai-panel-body" id="ai-chat-body">
        <div class="ai-message ai-message-bot">
          <div class="ai-avatar">${R(24)}</div>
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
          ${R(28)}
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
          <div class="ai-voice-icon" id="voice-icon">${U(44)}</div>
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
            ${U(20)} Start Conversation
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
  `;let t=!1,n=!1,a=!1,i=!1,s=!1,r=null,o=window.speechSynthesis||null;const l=e.querySelector("#ai-fab"),g=e.querySelector("#ai-menu"),d=e.querySelector("#ai-panel"),p=e.querySelector("#ai-voice-panel");function h(){t=n=a=!1,g.classList.remove("open"),d.classList.remove("open"),p.classList.remove("open"),l.classList.remove("active"),i&&ue()}function k(){h(),t=!0,g.classList.add("open"),l.classList.add("active")}function w(){var u;h(),n=!0,d.classList.add("open"),l.classList.add("active"),(u=e.querySelector("#ai-chat-input"))==null||u.focus()}function $(){h(),a=!0,p.classList.add("open"),l.classList.add("active")}l.addEventListener("click",()=>{t||n||a?h():k()}),e.querySelector("#ai-menu-close").addEventListener("click",h),e.querySelector("#ai-panel-close").addEventListener("click",h),e.querySelector("#ai-voice-close").addEventListener("click",h),e.querySelector("#ai-open-chat").addEventListener("click",w),e.querySelector("#ai-open-voice").addEventListener("click",$),e.querySelector("#ai-panel-voice").addEventListener("click",$),e.querySelectorAll(".ai-menu-options + .ai-quick-actions .ai-chip").forEach(u=>{u.addEventListener("click",()=>{const m=u.dataset.action;h();const c={track:"#/orders",cancel:"#/orders",return:"#/returns",refund:"#/returns",search:"#/products",ticket:"#/support"};c[m]&&(window.location.hash=c[m])})});const I=e.querySelector("#ai-chat-input"),S=e.querySelector("#ai-chat-body"),N=e.querySelector("#ai-send-btn");async function T(u){const m=u.trim(),c=m.toLowerCase(),f=m.match(/ORD\d{4}/i),E=c.includes("track")||c.includes("where")||c.includes("kaha")||c.includes("status")||c.includes("delivery");if(f&&E&&!c.includes("return")&&!c.includes("refund")&&!c.includes("cancel")){const v=f[0].toUpperCase();try{const y=await j(v);return{text:`Aapka order **${y.order_id}** (${y.product_name}) filhaal **${y.status}** hai.

📅 Expected Delivery: **${y.expected_delivery||"Soon"}**
💰 Amount: ₹${y.amount.toLocaleString("en-IN")}`,actions:[{label:`View Timeline for ${y.order_id}`,url:`#/orders/${y.order_id}`}]}}catch{return{text:`Order **${v}** nahi mila. Kripya apna Order ID check karein.`}}}if(f&&(c.includes("return")||c.includes("wapas")||c.includes("exchange"))){const v=f[0].toUpperCase();try{const y=await Ce(v);if(y.eligible){const q=m.replace(new RegExp(`.*${v}`,"i"),"").trim()||"Size issue / Not as expected",M=await Ee(v,q);return{text:`✅ Order **${v}** return ke liye eligible hai!

Maine aapka Return Request submit kar diya hai.
🆔 **Return ID: ${M.return_id}**
🚚 Pickup agle 24-48 ghanto me schedule ho jayega.`,actions:[{label:"Check Returns & Refunds",url:`#/returns?order=${v}`}]}}else return{text:`⚠️ Order **${v}** return ke liye eligible nahi hai.

**Reason**: ${y.reason}`,actions:[{label:"View Return Policy",url:"#/returns"}]}}catch(y){return{text:`Return check failed: ${y.message}`}}}if(f&&(c.includes("refund")||c.includes("paise")||c.includes("money back"))){const v=f[0].toUpperCase();try{const y=await Te(v);return{text:`💰 **Refund Status for ${v}**

- Refund ID: **${y.refund_id}**
- Amount: **₹${y.amount.toLocaleString("en-IN")}**
- Status: **${y.refund_status}**
- Expected Date: **${y.expected_date||"N/A"}**

${y.message}`,actions:[{label:"View Refund Details",url:`#/returns?order=${v}&action=refund`}]}}catch(y){return{text:`Order **${v}** ke liye refund details: ${y.message}`}}}if(f&&(c.includes("cancel")||c.includes("radd")||c.includes("band"))){const v=f[0].toUpperCase();try{return{text:`❌ ${(await Le(v)).message}

Agar payment ho chuka tha toh 3-5 working days me aapke source account me refund aa jayega.`,actions:[{label:"View Order Status",url:`#/orders/${v}`}]}}catch(y){return{text:`Order **${v}** cancel nahi ho saka: ${y.message}`}}}if(c.includes("shoe")||c.includes("headphone")||c.includes("shirt")||c.includes("watch")||c.includes("product")||c.includes("dikh")||c.includes("find")||c.includes("search")||c.includes("under")||c.includes("budget")){const v=m.match(/(?:under|below|less than|₹|rs\.?)\s*(\d+)/i)||m.match(/(\d+)\s*(?:rs|rupees|tak)/i),y=v?parseFloat(v[1]):null;let q=null;c.includes("shoe")||c.includes("footwear")?q="Footwear":c.includes("headphone")||c.includes("earphone")||c.includes("audio")||c.includes("watch")?q="Electronics":(c.includes("shirt")||c.includes("cloth")||c.includes("fashion"))&&(q="Fashion");const M=m.replace(/(?:show|me|find|search|please|give|under|below|less than|rs\.?|₹|\d+|tak|kuch|achha)/gi,"").trim();try{const _=await $e(M,y,q);if(_&&_.length>0)return{text:`Here is what I found for you in our catalog:

${_.slice(0,3).map(H=>`• **${H.name}** — ₹${H.price.toLocaleString("en-IN")} (${H.category})`).join(`
`)}`,actions:_.slice(0,2).map(H=>({label:`View ${H.name}`,url:`#/products/${H.product_id}`}))}}catch{}}if(c.includes("human")||c.includes("agent")||c.includes("ticket")||c.includes("dispute")||c.includes("complain")||c.includes("fraud")||c.includes("deduct"))try{const v=await qe({customerId:"CUST101",description:m,category:c.includes("payment")?"Payment Issue":"General Support",priority:"High",orderId:f?f[0].toUpperCase():void 0});return c.includes("human")||c.includes("agent")||c.includes("escalate")?(await Re(v.ticket_id,"Customer explicitly requested Tier 2 Human Support assistance."),{text:`I understand your concern. I have created **Support Ticket ${v.ticket_id}** and escalated it directly to our **Tier 2 Human Support Manager**.

A human representative will review your issue and reach out shortly.`,actions:[{label:`Check Ticket ${v.ticket_id}`,url:"#/support"}]}):{text:`I have created Support Ticket **${v.ticket_id}** for you with High priority.

Status: ${v.status} (Assigned to: ${v.assigned_to})`,actions:[{label:"View Ticket",url:"#/support"}]}}catch(v){return{text:`Ticket creation note: ${v.message}`}}return{text:"I'm ShopSathi AI Assistant! You can ask me to track orders (e.g. *ORD1001*), manage returns (e.g. *ORD1003*), check refund status (*ORD1004*), search products under your budget, or connect you with human support."}}async function D(u){if(!u||!u.trim())return;const m=u.trim(),c=document.createElement("div");c.className="ai-message ai-message-user",c.innerHTML=`<div class="ai-bubble">${W(m)}</div>`,S.appendChild(c),I.value="",S.scrollTop=S.scrollHeight;const f=document.createElement("div");f.className="ai-message ai-message-bot",f.innerHTML=`<div class="ai-avatar">${R(24)}</div><div class="ai-bubble ai-typing"><span></span><span></span><span></span></div>`,S.appendChild(f),S.scrollTop=S.scrollHeight;try{const E=await T(m);f.remove();const v=document.createElement("div");v.className="ai-message ai-message-bot";let y=at(E.text),q="";E.actions&&E.actions.length>0&&(q=`<div class="ai-bubble-actions" style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;">
          ${E.actions.map(M=>`<a href="${M.url}" class="btn btn-outline btn-sm" style="font-size:0.75rem;padding:4px 8px;">${M.label}</a>`).join("")}
        </div>`),v.innerHTML=`
        <div class="ai-avatar">${R(24)}</div>
        <div class="ai-bubble">
          ${y}
          ${q}
        </div>`,S.appendChild(v),S.scrollTop=S.scrollHeight}catch{f.remove();const v=document.createElement("div");v.className="ai-message ai-message-bot",v.innerHTML=`
        <div class="ai-avatar">${R(24)}</div>
        <div class="ai-bubble" style="border-left:3px solid var(--color-error);">
          <p>Sorry, I encountered an issue processing that. Please try again or check your connection.</p>
        </div>`,S.appendChild(v),S.scrollTop=S.scrollHeight}}N.addEventListener("click",()=>D(I.value)),I.addEventListener("keydown",u=>{u.key==="Enter"&&D(I.value)}),e.querySelectorAll(".ai-panel-chips .ai-chip").forEach(u=>{u.addEventListener("click",()=>D(u.dataset.msg))});const P=e.querySelector("#voice-start-btn"),Pe=e.querySelector("#voice-stop-btn"),Q=e.querySelector("#voice-mute-btn"),re=e.querySelector("#mute-label"),Ae=e.querySelector("#voice-speaker-btn"),ne=e.querySelector("#voice-active-controls"),Ie=e.querySelector("#voice-status"),Me=e.querySelector("#voice-hint"),oe=e.querySelector("#voice-state-badge"),F=e.querySelector("#voice-ring");e.querySelector("#voice-icon");const ce=e.querySelector("#voice-transcript-box"),He=e.querySelector("#voice-user-transcript"),De=e.querySelector("#voice-agent-transcript");function L(u,m,c){const f={Ready:"badge-neutral",Connecting:"badge-warning",Connected:"badge-success",Listening:"badge-accent",Processing:"badge-primary",Speaking:"badge-success",Error:"badge-error",Ended:"badge-neutral"};oe.className=`badge ${f[u]||"badge-neutral"}`,oe.textContent=u,m&&(Ie.textContent=m),c&&(Me.textContent=c),F.className="ai-voice-ring",u==="Connecting"||u==="Processing"?F.classList.add("active"):u==="Listening"?F.classList.add("listening"):u==="Speaking"&&F.classList.add("speaking")}async function le(u){if(!o)return;o.cancel(),L("Speaking","ShopSathi is speaking...","Voice Agent Active (Gemini 2.5 Audio)"),De.innerHTML=`<strong>ShopSathi:</strong> ${W(u)}`;const m=new SpeechSynthesisUtterance(u.replace(/[*_#•]/g,""));m.lang="en-IN",m.rate=1,m.pitch=1,m.onend=()=>{i&&!s&&L("Listening","Listening for your voice...","Speak in English, Hindi, or Hinglish")},m.onerror=()=>{i&&L("Listening","Listening...","Tap mute or speak")},o.speak(m)}async function de(u){if(!u.trim())return;L("Processing","Processing with ShopSathi AI...","Executing API tools..."),He.innerHTML=`<strong>You:</strong> "${W(u)}"`,ce.style.display="block";const m=await T(u);await le(m.text)}function _e(){const u=window.SpeechRecognition||window.webkitSpeechRecognition;if(!u)return null;const m=new u;return m.continuous=!0,m.interimResults=!1,m.lang="en-IN",m.onresult=c=>{const f=c.results.length-1,E=c.results[f][0].transcript;E&&de(E)},m.onerror=c=>{i&&c.error!=="no-speech"&&L("Connected","Microphone active","You can speak anytime")},m}function pe(){i=!0,s=!1,P.style.display="none",ne.style.display="flex",ce.style.display="block",L("Connecting","Connecting to Real-Time Voice Agent...","Provider: Gemini 2.5 Flash Audio Preview (Voice: Puck)"),setTimeout(()=>{if(L("Connected","Voice Session Connected!","Ready for spoken conversation"),r=_e(),r)try{r.start()}catch{}le("Namaste! ShopSathi Real-Time Voice Support is active. How can I help you today?")},1200)}function ue(){if(i=!1,o&&o.cancel(),r){try{r.stop()}catch{}r=null}ne.style.display="none",P.style.display="inline-flex",L("Ended","Call ended","Tap Start Conversation to reconnect")}return P.addEventListener("click",pe),Pe.addEventListener("click",ue),Q.addEventListener("click",()=>{if(s=!s,s){if(re.textContent="Unmute",Q.classList.add("btn-danger"),r)try{r.stop()}catch{}L("Connected","Microphone Muted","Tap Unmute to speak")}else{if(re.textContent="Mute",Q.classList.remove("btn-danger"),r)try{r.start()}catch{}L("Listening","Listening...","Speak now")}}),Ae.addEventListener("click",()=>{o&&o.speaking&&(o.cancel(),L("Listening","Audio stopped","Listening for speech"))}),e.querySelectorAll(".voice-demo-chip").forEach(u=>{u.addEventListener("click",()=>{const m=u.dataset.speak;i||pe(),setTimeout(()=>de(m),1500)})}),window.addEventListener("open-ai-panel",()=>{n||a||k()}),e}function W(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}function at(e){return e?e.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"<br><br>").replace(/\n/g,"<br>"):""}async function st(e){var n,a,i,s,r;e.innerHTML=`
    <div class="page-content">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <div class="hero-badge">
                <span class="badge badge-primary" style="font-size:0.8rem;padding:6px 14px;">🤖 AI-Powered Shopping Assistant</span>
              </div>
              <h1 class="hero-title">Shop Smarter with <span class="text-gradient">ShopSathi</span></h1>
              <p class="hero-subtitle">Find products, track orders, manage returns, and get instant AI-powered support — all in one place.</p>
              <div class="hero-actions">
                <a href="#/products" class="btn btn-primary btn-lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  Explore Products
                </a>
                <button class="btn btn-outline btn-lg" id="hero-ai-btn">
                  ${be(18)} Ask ShopSathi
                </button>
              </div>
              <button class="hero-voice-cta" id="hero-voice-btn">
                ${U(16)}
                <span>🎙️ Talk to ShopSathi — Voice Assistant</span>
              </button>
            </div>
            <div class="hero-visual">
              <div class="hero-illustration">
                <div class="hero-card hero-card-1">
                  <div class="hero-card-icon">📦</div>
                  <div>
                    <strong>Order ORD1001</strong>
                    <span class="badge badge-success" style="font-size:0.65rem;">Out for Delivery</span>
                  </div>
                </div>
                <div class="hero-card hero-card-2">
                  <div class="hero-card-icon">🎧</div>
                  <div>
                    <strong>AirPro Headphones</strong>
                    <span style="color:var(--color-text-secondary);font-size:0.8rem;">₹4,999</span>
                  </div>
                </div>
                <div class="hero-card hero-card-3">
                  <div class="hero-card-icon">${R(28)}</div>
                  <div class="ai-typing-demo"><span></span><span></span><span></span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-bg-gradient"></div>
      </section>

      <!-- Features Section -->
      <section class="section features-section">
        <div class="container">
          <div class="text-center" style="margin-bottom:var(--space-12);">
            <h2>Everything You Need, One Place</h2>
            <p class="text-secondary" style="font-size:var(--font-lg);max-width:600px;margin:var(--space-3) auto 0;">ShopSathi combines smart product discovery with intelligent customer support.</p>
          </div>
          <div class="features-grid">
            <a href="#/products" class="feature-card card card-hover">
              <div class="feature-icon" style="background:var(--color-primary-light);color:var(--color-primary);">🛍️</div>
              <h3>Smart Product Search</h3>
              <p>Find exactly what you're looking for with intelligent search, category filters, and budget-friendly recommendations.</p>
            </a>
            <a href="#/orders" class="feature-card card card-hover">
              <div class="feature-icon" style="background:var(--color-success-light);color:var(--color-success);">📦</div>
              <h3>Real-Time Tracking</h3>
              <p>Track your order in real time with live status updates, expected delivery dates, and step-by-step timeline.</p>
            </a>
            <a href="#/returns" class="feature-card card card-hover">
              <div class="feature-icon" style="background:var(--color-warning-light);color:#92400E;">↩️</div>
              <h3>Easy Returns & Refunds</h3>
              <p>Hassle-free returns with instant eligibility checks and transparent refund tracking — all within 7 days.</p>
            </a>
            <a href="#/support" class="feature-card card card-hover">
              <div class="feature-icon" style="background:var(--color-accent-light);color:#0E7490;">🤖</div>
              <h3>AI-Powered Support</h3>
              <p>Get instant answers via chat or voice. ShopSathi understands English, Hindi, and Hinglish — and takes real actions.</p>
            </a>
            <a href="#/support" class="feature-card card card-hover">
              <div class="feature-icon" style="background:var(--color-error-light);color:var(--color-error);">🎫</div>
              <h3>Support Tickets</h3>
              <p>Create and track support tickets. Complex issues are automatically escalated to human support agents.</p>
            </a>
            <div class="feature-card card card-hover" style="cursor:pointer;" id="feature-voice-card">
              <div class="feature-icon" style="background:#F0E7FE;color:#7C3AED;">🎙️</div>
              <h3>Voice Assistant</h3>
              <p>Speak naturally in your language. ShopSathi's voice agent handles order queries, returns, and support calls.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- AI CTA Section -->
      <section class="section ai-cta-section">
        <div class="container">
          <div class="ai-cta-card">
            <div class="ai-cta-content">
              <h2>Need Help? Ask ShopSathi</h2>
              <p>Our AI assistant can track orders, process returns, search products, and resolve issues instantly — available 24/7 in English, Hindi & Hinglish.</p>
              <div class="flex gap-4" style="flex-wrap:wrap;">
                <button class="btn btn-primary btn-lg" id="cta-chat-btn">💬 Chat with ShopSathi</button>
                <button class="btn btn-accent btn-lg" id="cta-voice-btn">🎙️ Talk to ShopSathi</button>
              </div>
            </div>
            <div class="ai-cta-visual">
              <div class="ai-cta-demo">
                <div class="ai-message ai-message-user"><div class="ai-bubble" style="font-size:0.85rem;">Where is my order ORD1001?</div></div>
                <div class="ai-message ai-message-bot">
                  <div class="ai-avatar" style="width:28px;height:28px;">${R(24)}</div>
                  <div class="ai-bubble" style="font-size:0.85rem;">Your order ORD1001 (AirPro Headphones) is <strong>Out for Delivery</strong> and expected today by 7:00 PM! 🚚</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="section" style="padding-bottom:var(--space-20);">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-card">
              <span class="stat-value">9</span>
              <span class="stat-label">AI Functions</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">3</span>
              <span class="stat-label">Languages</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">24/7</span>
              <span class="stat-label">Available</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">&lt;2s</span>
              <span class="stat-label">Response Time</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;const t=()=>window.dispatchEvent(new CustomEvent("open-ai-panel"));(n=e.querySelector("#hero-ai-btn"))==null||n.addEventListener("click",t),(a=e.querySelector("#hero-voice-btn"))==null||a.addEventListener("click",t),(i=e.querySelector("#cta-chat-btn"))==null||i.addEventListener("click",t),(s=e.querySelector("#cta-voice-btn"))==null||s.addEventListener("click",t),(r=e.querySelector("#feature-voice-card"))==null||r.addEventListener("click",t)}let A=null;function it(){return A||(A=document.createElement("div"),A.className="toast-container",A.setAttribute("role","alert"),A.setAttribute("aria-live","polite"),document.body.appendChild(A)),A}function b(e,t="info",n=4e3){const a=it(),i=document.createElement("div");i.className=`toast toast-${t}`;const s={success:"✓",error:"✕",warning:"⚠",info:"ℹ"};i.innerHTML=`
    <span style="font-size: 1.1rem; flex-shrink: 0;">${s[t]||s.info}</span>
    <span style="flex: 1;">${e}</span>
    <button class="btn-ghost" style="padding: 2px 6px; font-size: 1.1rem; opacity: 0.6;" aria-label="Close">&times;</button>
  `,i.querySelector("button").addEventListener("click",()=>ge(i)),a.appendChild(i);const r=setTimeout(()=>ge(i),n);i._timer=r}function ge(e){clearTimeout(e._timer),e.classList.add("toast-exit"),e.addEventListener("animationend",()=>e.remove())}let me=null;async function rt(e){e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <h1>Products</h1>
          <p>Find what you're looking for...</p>
        </div>

        <!-- Search & Filters -->
        <div class="products-filters card" style="margin-bottom:var(--space-8);">
          <div class="filters-row">
            <div class="search-field">
              <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="search-input" class="form-input" placeholder="Search products..." style="padding-left:40px;" aria-label="Search products">
            </div>
            <select id="category-filter" class="form-select" aria-label="Category">
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Footwear">Footwear</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
            </select>
            <div class="price-filter">
              <input type="number" id="max-price" class="form-input" placeholder="Max price (₹)" aria-label="Maximum price" min="0" step="100">
            </div>
          </div>
          <div class="filters-info">
            <span id="result-count" class="text-secondary text-sm"></span>
          </div>
        </div>

        <!-- Product Grid -->
        <div id="products-grid" class="products-grid">
          ${ye(6)}
        </div>
      </div>
    </div>
  `;const t=e.querySelector("#search-input"),n=e.querySelector("#category-filter"),a=e.querySelector("#max-price"),i=e.querySelector("#products-grid"),s=e.querySelector("#result-count"),r=window.location.hash,o=r.indexOf("?");if(o!==-1){const d=new URLSearchParams(r.slice(o));d.get("category")&&(n.value=d.get("category")),d.get("query")&&(t.value=d.get("query"))}async function l(){var k;const d=t.value.trim(),p=n.value,h=a.value?parseFloat(a.value):null;i.innerHTML=ye(6);try{let w;d||p||h?w=await $e(d,h,p):w=await We(),w.length===0?(i.innerHTML=`
          <div class="empty-state" style="grid-column: 1/-1;">
            <div class="empty-state-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>`,s.textContent="0 products"):(i.innerHTML=w.map($=>nt($)).join(""),s.textContent=`${w.length} product${w.length!==1?"s":""} found`,ct(i))}catch(w){i.innerHTML=`
        <div class="empty-state" style="grid-column: 1/-1;">
          <div class="empty-state-icon">⚠️</div>
          <h3>Failed to load products</h3>
          <p>${w.message}</p>
          <button class="btn btn-primary" style="margin-top:var(--space-4);" id="retry-btn">Try Again</button>
        </div>`,(k=e.querySelector("#retry-btn"))==null||k.addEventListener("click",l)}}function g(){clearTimeout(me),me=setTimeout(l,350)}t.addEventListener("input",g),n.addEventListener("change",l),a.addEventListener("input",g),await l()}function nt(e){const t=e.stock>0,a={Electronics:"primary",Footwear:"success",Fashion:"accent",Home:"warning"}[e.category]||"neutral";return`
    <div class="product-card card card-hover" data-id="${e.product_id}">
      <div class="product-image">
        <div class="product-image-placeholder">
          ${ot(e.category)}
        </div>
        <span class="badge badge-${a} product-category-badge">${e.category}</span>
      </div>
      <div class="product-info">
        <h3 class="product-name">${e.name}</h3>
        <p class="product-desc">${e.description||""}</p>
        <div class="product-meta">
          <span class="product-price">₹${e.price.toLocaleString("en-IN")}</span>
          <span class="badge ${t?"badge-success":"badge-error"}">${t?`In Stock (${e.stock})`:"Out of Stock"}</span>
        </div>
        <div class="product-actions">
          <a href="#/products/${e.product_id}" class="btn btn-outline btn-sm">View Details</a>
          <button class="btn btn-primary btn-sm add-to-cart-btn" ${t?"":"disabled"} data-product='${JSON.stringify(e).replace(/'/g,"&#39;")}'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>`}function ot(e){return`<span style="font-size:3rem;">${{Electronics:"🎧",Footwear:"👟",Fashion:"👔",Home:"🏠"}[e]||"📦"}</span>`}function ye(e){return Array(e).fill(`
    <div class="skeleton-card">
      <div class="skeleton skeleton-image" style="height:180px;margin-bottom:16px;"></div>
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-text" style="width:80%;"></div>
      <div class="skeleton skeleton-text" style="width:40%;margin-top:12px;"></div>
    </div>`).join("")}function ct(e){e.querySelectorAll(".add-to-cart-btn").forEach(t=>{t.addEventListener("click",n=>{n.stopPropagation();const a=JSON.parse(t.dataset.product);te(a,1),b(`${a.name} added to cart`,"success")})})}async function lt(e,t){const n=t.id;e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <div class="loading-container"><div class="spinner spinner-lg"></div><p>Loading product...</p></div>
      </div>
    </div>`;try{const a=await Ke(n),i=a.stock>0,s={Electronics:"🎧",Footwear:"👟",Fashion:"👔",Home:"🏠"};e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <a href="#/products" class="back-link">&larr; Back to Products</a>
          <div class="product-detail">
            <div class="product-detail-image">
              <div class="product-image-placeholder-lg">
                <span style="font-size:6rem;">${s[a.category]||"📦"}</span>
              </div>
            </div>
            <div class="product-detail-info">
              <span class="badge badge-primary">${a.category}</span>
              <h1 style="margin-top:var(--space-3);">${a.name}</h1>
              <p class="product-detail-price">₹${a.price.toLocaleString("en-IN")}</p>
              <p class="product-detail-desc">${a.description||"No description available."}</p>

              <div class="product-detail-meta">
                <div class="meta-item">
                  <span class="meta-label">Availability</span>
                  <span class="badge ${i?"badge-success":"badge-error"}">${i?`In Stock (${a.stock} units)`:"Out of Stock"}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Return Policy</span>
                  <span class="badge ${a.returnable?"badge-success":"badge-warning"}">${a.returnable?"7-Day Returns":"Non-Returnable"}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Product ID</span>
                  <span class="text-secondary">${a.product_id}</span>
                </div>
              </div>

              <div class="product-detail-qty">
                <label class="form-label">Quantity</label>
                <div class="qty-selector">
                  <button class="btn btn-ghost qty-btn" id="qty-minus" aria-label="Decrease">−</button>
                  <input type="number" id="qty-input" class="form-input" value="1" min="1" max="${a.stock}" style="width:60px;text-align:center;">
                  <button class="btn btn-ghost qty-btn" id="qty-plus" aria-label="Increase">+</button>
                </div>
              </div>

              <div class="product-detail-actions">
                <button class="btn btn-primary btn-lg" id="add-to-cart-btn" ${i?"":"disabled"} style="flex:1;">
                  🛒 Add to Cart
                </button>
                <button class="btn btn-secondary btn-lg" id="buy-now-btn" ${i?"":"disabled"} style="flex:1;">
                  ⚡ Buy Now
                </button>
              </div>

              <button class="product-ai-help" id="ask-ai-btn">
                💬 Ask ShopSathi about this product
              </button>
            </div>
          </div>
        </div>
      </div>`;const r=e.querySelector("#qty-input");e.querySelector("#qty-minus").addEventListener("click",()=>{const o=parseInt(r.value)||1;o>1&&(r.value=o-1)}),e.querySelector("#qty-plus").addEventListener("click",()=>{const o=parseInt(r.value)||1;o<a.stock&&(r.value=o+1)}),e.querySelector("#add-to-cart-btn").addEventListener("click",()=>{const o=parseInt(r.value)||1;te(a,o),b(`${a.name} (x${o}) added to cart`,"success")}),e.querySelector("#buy-now-btn").addEventListener("click",()=>{const o=parseInt(r.value)||1;te(a,o),window.location.hash="/checkout"}),e.querySelector("#ask-ai-btn").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-ai-panel"))})}catch(a){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">⚠️</div>
            <h3>Product not found</h3>
            <p>${a.message}</p>
            <a href="#/products" class="btn btn-primary" style="margin-top:var(--space-4);">Browse Products</a>
          </div>
        </div>
      </div>`}}function G({title:e,message:t,confirmText:n="Confirm",cancelText:a="Cancel",type:i="danger"}){return new Promise(s=>{const r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <h3 id="modal-title">${e}</h3>
        </div>
        <div class="modal-body">
          <p>${t}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="modal-cancel">${a}</button>
          <button class="btn btn-${i}" id="modal-confirm">${n}</button>
        </div>
      </div>
    `,document.body.appendChild(r);const o=()=>{r.style.opacity="0",setTimeout(()=>r.remove(),200)};r.querySelector("#modal-confirm").addEventListener("click",()=>{o(),s(!0)}),r.querySelector("#modal-cancel").addEventListener("click",()=>{o(),s(!1)}),r.addEventListener("click",l=>{l.target===r&&(o(),s(!1))}),setTimeout(()=>r.querySelector("#modal-cancel").focus(),100)})}async function dt(e){function t(){var i;const n=O(),a=xe();if(n.length===0){e.innerHTML=`
        <div class="page-content">
          <div class="container">
            <div class="empty-state" style="min-height:60vh;">
              <div class="empty-state-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <a href="#/products" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Explore Products</a>
            </div>
          </div>
        </div>`;return}e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="page-header">
            <h1>Shopping Cart</h1>
            <p>${n.length} item${n.length!==1?"s":""} in your cart</p>
          </div>

          <div class="cart-layout">
            <div class="cart-items">
              ${n.map(s=>`
                <div class="cart-item card" data-id="${s.product_id}">
                  <div class="cart-item-image">
                    <span style="font-size:2rem;">${pt(s.category)}</span>
                  </div>
                  <div class="cart-item-info">
                    <h4><a href="#/products/${s.product_id}">${s.name}</a></h4>
                    <p class="text-secondary text-sm">${s.category||""}</p>
                    <span class="product-price">₹${s.price.toLocaleString("en-IN")}</span>
                  </div>
                  <div class="cart-item-qty">
                    <div class="qty-selector">
                      <button class="btn btn-ghost qty-btn qty-dec" data-id="${s.product_id}" aria-label="Decrease">−</button>
                      <span class="qty-value">${s.quantity}</span>
                      <button class="btn btn-ghost qty-btn qty-inc" data-id="${s.product_id}" aria-label="Increase">+</button>
                    </div>
                  </div>
                  <div class="cart-item-total">
                    <strong>₹${(s.price*s.quantity).toLocaleString("en-IN")}</strong>
                  </div>
                  <button class="btn btn-ghost cart-remove-btn" data-id="${s.product_id}" aria-label="Remove">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>`).join("")}
            </div>

            <div class="cart-summary card card-elevated">
              <h3 style="margin-bottom:var(--space-4);">Order Summary</h3>
              <div class="summary-row">
                <span>Subtotal (${n.reduce((s,r)=>s+r.quantity,0)} items)</span>
                <span>₹${a.toLocaleString("en-IN")}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span class="text-success" style="font-weight:600;">Free</span>
              </div>
              <div class="divider"></div>
              <div class="summary-row summary-total">
                <span>Total</span>
                <span>₹${a.toLocaleString("en-IN")}</span>
              </div>
              <a href="#/checkout" class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4);">Proceed to Checkout</a>
              <button class="btn btn-ghost" style="width:100%;margin-top:var(--space-2);font-size:var(--font-sm);" id="clear-cart-btn">Clear Cart</button>
            </div>
          </div>
        </div>
      </div>`,e.querySelectorAll(".qty-dec").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.id,o=O().find(l=>l.product_id===r);o&&o.quantity>1&&(ve(r,o.quantity-1),t())})}),e.querySelectorAll(".qty-inc").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.id,o=O().find(l=>l.product_id===r);o&&(ve(r,o.quantity+1),t())})}),e.querySelectorAll(".cart-remove-btn").forEach(s=>{s.addEventListener("click",()=>{je(s.dataset.id),b("Item removed from cart","info"),t()})}),(i=e.querySelector("#clear-cart-btn"))==null||i.addEventListener("click",async()=>{await G({title:"Clear Cart",message:"Are you sure you want to remove all items from your cart?",confirmText:"Clear All",type:"danger"})&&(Se(),b("Cart cleared","info"),t())})}t()}function pt(e){return{Electronics:"🎧",Footwear:"👟",Fashion:"👔",Home:"🏠"}[e]||"📦"}async function ut(e){const t=O(),n=xe();if(t.length===0){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🛒</div>
            <h3>Nothing to checkout</h3>
            <p>Add some products to your cart first.</p>
            <a href="#/products" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Browse Products</a>
          </div>
        </div>
      </div>`;return}e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <a href="#/cart" class="back-link">&larr; Back to Cart</a>
        <div class="page-header">
          <h1>Checkout</h1>
        </div>

        <div class="checkout-layout">
          <div class="checkout-form">
            <!-- Customer Info -->
            <div class="card" style="margin-bottom:var(--space-6);">
              <h3 style="margin-bottom:var(--space-4);">Customer Information</h3>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="checkout-name">Full Name *</label>
                  <input type="text" id="checkout-name" class="form-input" placeholder="Enter your full name" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="checkout-email">Email *</label>
                  <input type="email" id="checkout-email" class="form-input" placeholder="your@email.com" required>
                </div>
              </div>
              <div class="form-group" style="margin-top:var(--space-4);">
                <label class="form-label" for="checkout-phone">Phone Number *</label>
                <input type="tel" id="checkout-phone" class="form-input" placeholder="10-digit mobile number" required>
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="card" style="margin-bottom:var(--space-6);">
              <h3 style="margin-bottom:var(--space-4);">Shipping Address</h3>
              <div class="form-group">
                <label class="form-label" for="checkout-address">Address Line 1 *</label>
                <input type="text" id="checkout-address" class="form-input" placeholder="House/Flat No., Street" required>
              </div>
              <div class="form-group" style="margin-top:var(--space-4);">
                <label class="form-label" for="checkout-address2">Address Line 2</label>
                <input type="text" id="checkout-address2" class="form-input" placeholder="Landmark, Area">
              </div>
              <div class="form-row" style="margin-top:var(--space-4);">
                <div class="form-group">
                  <label class="form-label" for="checkout-city">City *</label>
                  <input type="text" id="checkout-city" class="form-input" placeholder="City" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="checkout-state">State *</label>
                  <input type="text" id="checkout-state" class="form-input" placeholder="State" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="checkout-pin">PIN Code *</label>
                  <input type="text" id="checkout-pin" class="form-input" placeholder="6-digit PIN" required>
                </div>
              </div>
            </div>

            <!-- Payment -->
            <div class="card">
              <h3 style="margin-bottom:var(--space-4);">Payment Method</h3>
              <div class="payment-options">
                <label class="payment-option">
                  <input type="radio" name="payment" value="cod" checked>
                  <div class="payment-card">
                    <span>💵</span>
                    <div>
                      <strong>Cash on Delivery</strong>
                      <span class="text-secondary text-sm">Pay when your order arrives</span>
                    </div>
                  </div>
                </label>
                <label class="payment-option">
                  <input type="radio" name="payment" value="upi">
                  <div class="payment-card">
                    <span>📱</span>
                    <div>
                      <strong>UPI Payment</strong>
                      <span class="text-secondary text-sm">GPay, PhonePe, Paytm</span>
                    </div>
                  </div>
                </label>
                <label class="payment-option">
                  <input type="radio" name="payment" value="card">
                  <div class="payment-card">
                    <span>💳</span>
                    <div>
                      <strong>Card Payment</strong>
                      <span class="text-secondary text-sm">Credit / Debit card</span>
                    </div>
                  </div>
                </label>
              </div>
              <p class="text-secondary text-sm" style="margin-top:var(--space-4);"><em>Payment gateway integration coming soon. Demo orders use COD.</em></p>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="checkout-summary">
            <div class="card card-elevated" style="position:sticky;top:calc(var(--header-height) + var(--space-4));">
              <h3 style="margin-bottom:var(--space-4);">Order Summary</h3>
              ${t.map(a=>`
                <div class="summary-item">
                  <div>
                    <span class="text-sm">${a.name}</span>
                    <span class="text-secondary text-sm"> × ${a.quantity}</span>
                  </div>
                  <span class="text-sm">₹${(a.price*a.quantity).toLocaleString("en-IN")}</span>
                </div>`).join("")}
              <div class="divider"></div>
              <div class="summary-row">
                <span>Subtotal</span>
                <span>₹${n.toLocaleString("en-IN")}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span class="text-success" style="font-weight:600;">Free</span>
              </div>
              <div class="divider"></div>
              <div class="summary-row summary-total">
                <span>Total</span>
                <span>₹${n.toLocaleString("en-IN")}</span>
              </div>
              <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-6);" id="place-order-btn">
                Place Order — ₹${n.toLocaleString("en-IN")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`,e.querySelector("#place-order-btn").addEventListener("click",()=>{const a=e.querySelector("#checkout-name").value.trim(),i=e.querySelector("#checkout-email").value.trim(),s=e.querySelector("#checkout-phone").value.trim(),r=e.querySelector("#checkout-address").value.trim();if(!a||!i||!s||!r){b("Please fill in all required fields","warning");return}const o="ORD"+Math.floor(1e3+Math.random()*9e3);Se(),e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="order-success-card card card-elevated text-center" style="max-width:600px;margin:var(--space-12) auto;padding:var(--space-12);">
            <div style="font-size:4rem;margin-bottom:var(--space-4);">🎉</div>
            <h2>Order Placed Successfully!</h2>
            <p class="text-secondary" style="margin-top:var(--space-3);font-size:var(--font-lg);">Thank you, ${a}! Your order <strong>${o}</strong> has been placed.</p>
            <p class="text-secondary" style="margin-top:var(--space-2);">You'll receive a confirmation at ${i}</p>
            <div class="flex gap-4 justify-center" style="margin-top:var(--space-8);flex-wrap:wrap;">
              <a href="#/orders" class="btn btn-primary btn-lg">View My Orders</a>
              <a href="#/products" class="btn btn-outline btn-lg">Continue Shopping</a>
            </div>
          </div>
        </div>
      </div>`,b("Order placed successfully!","success")})}const vt=["ORD1001","ORD1002","ORD1003","ORD1004","ORD1005"],K=10;async function ht(e){e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <h1>My Orders</h1>
          <p>Track your orders in real time with live delivery updates.</p>
        </div>

        <!-- Order Lookup & Filter Bar -->
        <div class="card" style="margin-bottom:var(--space-6);">
          <div class="flex items-center justify-between gap-4" style="flex-wrap:wrap;">
            <div class="flex gap-3" style="flex:1;min-width:280px;">
              <input type="text" id="order-lookup-input" class="form-input" placeholder="Enter Order ID (e.g. ORD1001)" style="max-width:320px;">
              <button class="btn btn-primary" id="order-lookup-btn">Track Order</button>
            </div>
            <div class="flex items-center gap-2" style="flex-wrap:wrap;">
              <span class="text-secondary text-sm">Filter:</span>
              <select id="status-filter" class="form-input" style="padding:0.4rem 0.8rem;font-size:var(--font-size-sm);width:auto;">
                <option value="ALL">All Statuses</option>
                <option value="Processing">Processing</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Returned">Returned / Return Requested</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Orders List Container -->
        <div id="orders-container">
          <div class="loading-container"><div class="spinner spinner-lg"></div><p>Loading orders...</p></div>
        </div>
      </div>
    </div>`;const t=e.querySelector("#orders-container"),n=e.querySelector("#order-lookup-input"),a=e.querySelector("#order-lookup-btn"),i=e.querySelector("#status-filter");let s=[],r=1,o="ALL";const l=()=>{const p=n.value.trim();p&&(window.location.hash=`/orders/${p.toUpperCase()}`)};a.addEventListener("click",l),n.addEventListener("keydown",p=>{p.key==="Enter"&&l()}),i.addEventListener("change",p=>{o=p.target.value,r=1,d()});function g(){return o==="ALL"?s:o==="Returned"?s.filter(p=>p.status==="Returned"||p.status==="Return Requested"):s.filter(p=>p.status===o)}function d(){const p=g(),h=p.length,k=Math.ceil(h/K)||1;if(r>k&&(r=k),r<1&&(r=1),h===0){t.innerHTML=`
        <div class="empty-state">
          <div class="empty-state-icon">📦</div>
          <h3>No orders found</h3>
          <p>${o!=="ALL"?`No orders with status "${o}".`:"When you place orders, they'll appear here."}</p>
          ${o!=="ALL"?'<button class="btn btn-secondary" style="margin-top:var(--space-4);" id="reset-filter-btn">Show All Orders</button>':'<a href="#/products" class="btn btn-primary" style="margin-top:var(--space-4);">Start Shopping</a>'}
        </div>`;const T=t.querySelector("#reset-filter-btn");T&&T.addEventListener("click",()=>{i.value="ALL",o="ALL",d()});return}const w=(r-1)*K,$=Math.min(w+K,h),I=p.slice(w,$);t.innerHTML=`
      <div class="flex items-center justify-between" style="margin-bottom:var(--space-4);flex-wrap:wrap;gap:var(--space-2);">
        <span class="text-secondary text-sm">
          Showing <strong>${w+1}–${$}</strong> of <strong>${h}</strong> orders
        </span>
        <span class="badge badge-neutral">Page ${r} of ${k}</span>
      </div>

      <div class="orders-list">
        ${I.map(T=>mt(T)).join("")}
      </div>

      ${k>1?`
        <div class="pagination flex items-center justify-center gap-2" style="margin-top:var(--space-8);flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm" id="prev-page-btn" ${r===1?"disabled":""}>← Previous</button>
          ${gt(r,k)}
          <button class="btn btn-secondary btn-sm" id="next-page-btn" ${r===k?"disabled":""}>Next →</button>
        </div>`:""}
    `;const S=t.querySelector("#prev-page-btn"),N=t.querySelector("#next-page-btn");S&&S.addEventListener("click",()=>{r>1&&(r--,d(),window.scrollTo({top:0,behavior:"smooth"}))}),N&&N.addEventListener("click",()=>{r<k&&(r++,d(),window.scrollTo({top:0,behavior:"smooth"}))}),t.querySelectorAll(".page-num-btn").forEach(T=>{T.addEventListener("click",D=>{const P=parseInt(D.target.dataset.page,10);P&&P!==r&&(r=P,d(),window.scrollTo({top:0,behavior:"smooth"}))})})}try{const p=se();let h=[];if(p&&p.customer_id)try{h=await Xe(p.customer_id)}catch{h=await he()}else try{h=await he()}catch{h=(await Promise.allSettled(vt.map($=>j($)))).filter($=>$.status==="fulfilled").map($=>$.value)}s=(h||[]).sort((k,w)=>new Date(w.order_date)-new Date(k.order_date)),d()}catch(p){t.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h3>Failed to load orders</h3>
        <p>${p.message}</p>
        <button class="btn btn-primary" style="margin-top:var(--space-4);" onclick="location.reload()">Try Again</button>
      </div>`}}function gt(e,t){let n="";for(let a=1;a<=t;a++)a===1||a===t||a>=e-1&&a<=e+1?n+=`<button class="btn btn-sm ${a===e?"btn-primary":"btn-secondary"} page-num-btn" data-page="${a}">${a}</button>`:(a===e-2||a===e+2)&&(n+='<span class="text-secondary" style="padding:0 0.3rem;">...</span>');return n}function mt(e){const t=yt(e.status),n=new Date(e.order_date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});return`
    <div class="order-card card card-hover" style="cursor:pointer;" onclick="location.hash='/orders/${e.order_id}'">
      <div class="order-card-top">
        <div>
          <span class="text-secondary text-sm">Order</span>
          <h4 style="margin-top:2px;">${e.order_id}</h4>
        </div>
        <span class="badge ${t.badge}">${t.icon} ${e.status}</span>
      </div>
      <div class="order-card-body">
        <div class="order-product-info">
          <span style="font-size:1.5rem;">${bt(e.product_name)}</span>
          <div>
            <strong>${e.product_name}</strong>
            <div class="text-secondary text-sm">Qty: ${e.quantity} • ${n}</div>
          </div>
        </div>
        <div class="order-amount">
          <span class="text-secondary text-sm">Amount</span>
          <strong>₹${e.amount.toLocaleString("en-IN")}</strong>
        </div>
      </div>
      <div class="order-card-footer">
        <span class="text-secondary text-sm">${e.expected_delivery||""}</span>
        <span class="btn btn-ghost btn-sm">View Details →</span>
      </div>
    </div>`}function yt(e){return{Processing:{badge:"badge-primary",icon:"🔄"},"Order Placed":{badge:"badge-primary",icon:"📋"},Confirmed:{badge:"badge-primary",icon:"✅"},Packed:{badge:"badge-accent",icon:"📦"},Shipped:{badge:"badge-accent",icon:"🚛"},"Out for Delivery":{badge:"badge-warning",icon:"🚚"},Delivered:{badge:"badge-success",icon:"✅"},Cancelled:{badge:"badge-error",icon:"❌"},Returned:{badge:"badge-neutral",icon:"↩️"},"Return Requested":{badge:"badge-warning",icon:"↩️"}}[e]||{badge:"badge-neutral",icon:"📋"}}function bt(e){if(!e)return"📦";const t=e.toLowerCase();return t.includes("headphone")||t.includes("watch")||t.includes("smart")?"🎧":t.includes("shoe")||t.includes("running")?"👟":t.includes("shirt")||t.includes("cotton")?"👔":t.includes("bottle")||t.includes("pillow")?"🏠":"📦"}const ft=["Order Placed","Confirmed","Packed","Shipped","Out for Delivery","Delivered"];async function kt(e,t){var a;const n=(a=t.id)==null?void 0:a.toUpperCase();e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <div class="loading-container"><div class="spinner spinner-lg"></div><p>Checking your order...</p></div>
      </div>
    </div>`;try{const i=await j(n);Oe(e,i)}catch(i){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <a href="#/orders" class="back-link">&larr; Back to Orders</a>
          <div class="empty-state" style="min-height:50vh;">
            <div class="empty-state-icon">⚠️</div>
            <h3>Order not found</h3>
            <p>${i.message}</p>
            <a href="#/orders" class="btn btn-primary" style="margin-top:var(--space-4);">View All Orders</a>
          </div>
        </div>
      </div>`}}function Oe(e,t){var o,l;const n=wt(t.status),a=["Processing","Order Placed","Preparing to Ship"].includes(t.status),i=t.status==="Delivered",s=new Date(t.order_date).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}),r=St(t.status);e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <a href="#/orders" class="back-link">&larr; Back to Orders</a>

        <div class="order-detail-header">
          <div>
            <h1>Order ${t.order_id}</h1>
            <p class="text-secondary">Placed on ${s}</p>
          </div>
          <span class="badge ${n.badge}" style="font-size:var(--font-sm);padding:8px 16px;">${n.icon} ${t.status}</span>
        </div>

        <!-- Timeline -->
        <div class="card" style="margin-bottom:var(--space-6);">
          <h3 style="margin-bottom:var(--space-6);">Order Timeline</h3>
          <div class="order-timeline">
            ${ft.map((g,d)=>{const p=d<=r,h=d===r,k=t.status==="Cancelled";return t.status==="Returned"||t.status,k&&d>0?d===1?`
                  <div class="timeline-step cancelled">
                    <div class="timeline-dot cancelled"></div>
                    <div class="timeline-label">
                      <strong>Cancelled</strong>
                      <span>Order has been cancelled</span>
                    </div>
                  </div>`:"":`
                <div class="timeline-step ${p?"complete":""} ${h?"current":""}">
                  <div class="timeline-dot ${p?"complete":""} ${h?"current":""}"></div>
                  <div class="timeline-label">
                    <strong>${g}</strong>
                    ${h?'<span class="text-primary" style="font-size:0.75rem;">Current</span>':""}
                  </div>
                </div>`}).join("")}
            ${t.status==="Returned"||t.status==="Return Requested"?`
              <div class="timeline-step current">
                <div class="timeline-dot current" style="background:var(--color-warning);"></div>
                <div class="timeline-label"><strong>${t.status}</strong></div>
              </div>`:""}
          </div>
        </div>

        <div class="order-detail-grid">
          <!-- Order Info -->
          <div class="card">
            <h3 style="margin-bottom:var(--space-4);">Order Details</h3>
            <div class="detail-rows">
              <div class="detail-row">
                <span>Product</span>
                <a href="#/products/${t.product_id}"><strong>${t.product_name}</strong></a>
              </div>
              <div class="detail-row">
                <span>Quantity</span>
                <span>${t.quantity}</span>
              </div>
              <div class="detail-row">
                <span>Amount</span>
                <strong>₹${t.amount.toLocaleString("en-IN")}</strong>
              </div>
              <div class="detail-row">
                <span>Customer</span>
                <span>${t.customer_id}</span>
              </div>
              <div class="detail-row">
                <span>Expected Delivery</span>
                <span>${t.expected_delivery||"N/A"}</span>
              </div>
              ${t.delivered_date?`<div class="detail-row">
                <span>Delivered</span>
                <span>${new Date(t.delivered_date).toLocaleDateString("en-IN")}</span>
              </div>`:""}
            </div>
          </div>

          <!-- Actions -->
          <div class="card">
            <h3 style="margin-bottom:var(--space-4);">Actions</h3>
            <div class="order-actions-list">
              ${a?`
                <button class="btn btn-danger" id="cancel-order-btn" style="width:100%;">
                  ❌ Cancel This Order
                </button>`:""}
              ${i?`
                <a href="#/returns?order=${t.order_id}" class="btn btn-outline" style="width:100%;">
                  ↩️ Return This Order
                </a>`:""}
              <a href="#/returns?order=${t.order_id}&action=refund" class="btn btn-ghost" style="width:100%;">
                💰 Check Refund Status
              </a>
              <a href="#/support" class="btn btn-ghost" style="width:100%;">
                🎫 Create Support Ticket
              </a>
              <button class="btn btn-ghost" id="ask-ai-order" style="width:100%;">
                💬 Ask ShopSathi About This Order
              </button>
            </div>
            ${!a&&t.status!=="Delivered"&&t.status!=="Cancelled"?`
              <p class="text-secondary text-sm" style="margin-top:var(--space-3);">
                This order cannot be cancelled in its current state (${t.status}).
              </p>`:""}
          </div>
        </div>
      </div>
    </div>`,(o=e.querySelector("#cancel-order-btn"))==null||o.addEventListener("click",async()=>{if(await G({title:`Cancel Order ${t.order_id}?`,message:`Are you sure you want to cancel order ${t.order_id}? Any charged amount will be refunded within 3-5 business days.`,confirmText:"Yes, Cancel Order",type:"danger"}))try{const d=await Le(t.order_id);b(d.message||"Order cancelled successfully","success");const p=await j(t.order_id);Oe(e,p)}catch(d){b(d.message||"Failed to cancel order","error")}}),(l=e.querySelector("#ask-ai-order"))==null||l.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-ai-panel"))})}function wt(e){return{Processing:{badge:"badge-primary",icon:"🔄"},"Order Placed":{badge:"badge-primary",icon:"📋"},Confirmed:{badge:"badge-primary",icon:"✅"},Packed:{badge:"badge-accent",icon:"📦"},Shipped:{badge:"badge-accent",icon:"🚛"},"Out for Delivery":{badge:"badge-warning",icon:"🚚"},Delivered:{badge:"badge-success",icon:"✅"},Cancelled:{badge:"badge-error",icon:"❌"},Returned:{badge:"badge-neutral",icon:"↩️"},"Return Requested":{badge:"badge-warning",icon:"↩️"}}[e]||{badge:"badge-neutral",icon:"📋"}}function St(e){return{"Order Placed":0,Processing:0,Confirmed:1,Packed:2,Shipped:3,"Out for Delivery":4,Delivered:5}[e]??-1}async function xt(e){const t=window.location.hash,n=t.indexOf("?"),a=n!==-1?new URLSearchParams(t.slice(n)):new URLSearchParams,i=a.get("order")||"",s=a.get("action")||"";e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <h1>Returns & Refunds</h1>
          <p>Easy returns and refund tracking.</p>
        </div>

        <div class="returns-layout">
          <!-- Return Flow -->
          <div class="returns-main">
            <div class="card" style="margin-bottom:var(--space-6);" id="return-section">
              <h3>↩️ Return an Order</h3>
              <p class="text-secondary" style="margin-bottom:var(--space-4);">Check eligibility and create a return request in 3 easy steps.</p>

              <!-- Step 1: Enter Order ID -->
              <div class="return-step" id="return-step-1">
                <div class="step-label"><span class="step-num">1</span> Enter Order ID</div>
                <div class="flex gap-3" style="flex-wrap:wrap;">
                  <input type="text" id="return-order-id" class="form-input" placeholder="e.g. ORD1003" value="${i}" style="max-width:250px;">
                  <button class="btn btn-primary" id="check-eligibility-btn">Check Eligibility</button>
                </div>
              </div>

              <!-- Step 2: Eligibility Result -->
              <div class="return-step" id="return-step-2" style="display:none;">
                <div class="step-label"><span class="step-num">2</span> Eligibility Check</div>
                <div id="eligibility-result"></div>
              </div>

              <!-- Step 3: Create Return -->
              <div class="return-step" id="return-step-3" style="display:none;">
                <div class="step-label"><span class="step-num">3</span> Submit Return Request</div>
                <div class="form-group" style="margin-bottom:var(--space-4);">
                  <label class="form-label">Reason for Return *</label>
                  <textarea id="return-reason" class="form-input" placeholder="e.g. Size too small, Product damaged, Wrong item received..." rows="3"></textarea>
                </div>
                <button class="btn btn-primary" id="submit-return-btn">Submit Return Request</button>
              </div>

              <!-- Result -->
              <div id="return-result" style="display:none;"></div>
            </div>

            <!-- Refund Section -->
            <div class="card" id="refund-section">
              <h3>💰 Check Refund Status</h3>
              <p class="text-secondary" style="margin-bottom:var(--space-4);">Track your refund for returned or cancelled orders.</p>
              <div class="flex gap-3" style="flex-wrap:wrap;">
                <input type="text" id="refund-order-id" class="form-input" placeholder="e.g. ORD1004" value="${s==="refund"?i:""}" style="max-width:250px;">
                <button class="btn btn-primary" id="check-refund-btn">Check Refund</button>
              </div>
              <div id="refund-result" style="margin-top:var(--space-4);"></div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="returns-sidebar">
            <div class="card">
              <h4 style="margin-bottom:var(--space-3);">📋 Return Policy</h4>
              <ul class="policy-list">
                <li>Returns accepted within <strong>7 days</strong> of delivery</li>
                <li>Product must be in original condition</li>
                <li>Some hygiene items are <strong>non-returnable</strong></li>
                <li>Refunds processed within <strong>3-5 business days</strong></li>
                <li>Pickup scheduled within 24-48 hours</li>
              </ul>
            </div>
            <div class="card" style="margin-top:var(--space-4);">
              <h4 style="margin-bottom:var(--space-3);">Need Help?</h4>
              <button class="btn btn-outline" style="width:100%;" id="return-ai-btn">💬 Ask ShopSathi</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;let r="";e.querySelector("#check-eligibility-btn").addEventListener("click",async()=>{const o=e.querySelector("#return-order-id").value.trim().toUpperCase();if(!o){b("Please enter an Order ID","warning");return}r=o;const l=e.querySelector("#eligibility-result"),g=e.querySelector("#return-step-2"),d=e.querySelector("#return-step-3"),p=e.querySelector("#return-result");g.style.display="block",d.style.display="none",p.style.display="none",l.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Checking eligibility...</span></div>';try{const h=await Ce(o);h.eligible?(l.innerHTML=`
          <div class="eligibility-card eligible">
            <span class="badge badge-success">✅ Eligible for Return</span>
            <p style="margin-top:var(--space-2);">${h.reason}</p>
            ${h.days_since_delivery!==null?`<p class="text-secondary text-sm">Days since delivery: ${h.days_since_delivery}</p>`:""}
          </div>`,d.style.display="block"):l.innerHTML=`
          <div class="eligibility-card ineligible">
            <span class="badge badge-error">❌ Not Eligible</span>
            <p style="margin-top:var(--space-2);">${h.reason}</p>
          </div>`}catch(h){l.innerHTML=`<div class="eligibility-card ineligible"><span class="badge badge-error">Error</span><p>${h.message}</p></div>`}}),e.querySelector("#submit-return-btn").addEventListener("click",async()=>{const o=e.querySelector("#return-reason").value.trim();if(!o){b("Please enter a reason for return","warning");return}if(!await G({title:"Create Return Request?",message:`Are you sure you want to create a return request for order ${r}?`,confirmText:"Yes, Submit Return",type:"primary"}))return;const g=e.querySelector("#return-result");g.style.display="block",g.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Submitting return request...</span></div>';try{const d=await Ee(r,o);e.querySelector("#return-reason").value="",g.innerHTML=`
        <div class="return-success-card card card-elevated" style="margin-top:var(--space-4);">
          <span style="font-size:2rem;">🎉</span>
          <h3>Return Request Submitted!</h3>
          <div class="detail-rows" style="margin-top:var(--space-3);">
            <div class="detail-row"><span>Return ID</span><strong>${d.return_id}</strong></div>
            <div class="detail-row"><span>Order</span><span>${d.order_id}</span></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-success">${d.status}</span></div>
            <div class="detail-row"><span>Reason</span><span>${d.reason}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${d.message}</p>
        </div>`,b("Return request submitted successfully!","success")}catch(d){g.innerHTML=`<div class="eligibility-card ineligible"><span class="badge badge-error">Error</span><p>${d.message}</p></div>`,b(d.message||"Failed to create return","error")}}),e.querySelector("#check-refund-btn").addEventListener("click",async()=>{const o=e.querySelector("#refund-order-id").value.trim().toUpperCase();if(!o){b("Please enter an Order ID","warning");return}const l=e.querySelector("#refund-result");l.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Checking refund status...</span></div>';try{const g=await Te(o);l.innerHTML=`
        <div class="refund-card card card-elevated">
          <div class="flex items-center gap-3" style="margin-bottom:var(--space-3);">
            <span style="font-size:1.5rem;">💰</span>
            <h4>Refund Status</h4>
          </div>
          <div class="detail-rows">
            <div class="detail-row"><span>Refund ID</span><strong>${g.refund_id}</strong></div>
            <div class="detail-row"><span>Amount</span><strong>₹${g.amount.toLocaleString("en-IN")}</strong></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-primary">${g.refund_status}</span></div>
            <div class="detail-row"><span>Expected</span><span>${g.expected_date||"N/A"}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${g.message}</p>
        </div>`}catch(g){l.innerHTML=`<div class="eligibility-card ineligible"><p>${g.message}</p></div>`}}),e.querySelector("#return-ai-btn").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-ai-panel"))}),i&&s!=="refund"&&e.querySelector("#check-eligibility-btn").click(),i&&s==="refund"&&e.querySelector("#check-refund-btn").click()}async function $t(e){var t,n,a,i;e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <div class="page-header text-center" style="margin-bottom:var(--space-12);">
          <h1>How can ShopSathi help you?</h1>
          <p>Choose an option below or create a support ticket.</p>
        </div>

        <!-- Quick Actions Grid -->
        <div class="support-actions-grid">
          <a href="#/orders" class="support-action-card card card-hover">
            <span class="support-action-icon">📦</span>
            <strong>Track an Order</strong>
            <span class="text-secondary text-sm">Check live delivery status</span>
          </a>
          <a href="#/orders" class="support-action-card card card-hover">
            <span class="support-action-icon">❌</span>
            <strong>Cancel an Order</strong>
            <span class="text-secondary text-sm">Cancel processing orders</span>
          </a>
          <a href="#/returns" class="support-action-card card card-hover">
            <span class="support-action-icon">↩️</span>
            <strong>Return an Order</strong>
            <span class="text-secondary text-sm">Easy 7-day return process</span>
          </a>
          <a href="#/returns?action=refund" class="support-action-card card card-hover">
            <span class="support-action-icon">💰</span>
            <strong>Check Refund</strong>
            <span class="text-secondary text-sm">Track your refund status</span>
          </a>
          <a href="#/products" class="support-action-card card card-hover">
            <span class="support-action-icon">🛍️</span>
            <strong>Find Products</strong>
            <span class="text-secondary text-sm">Search & browse catalog</span>
          </a>
          <button class="support-action-card card card-hover" id="scroll-to-ticket" style="text-align:left;">
            <span class="support-action-icon">🎫</span>
            <strong>Create Support Ticket</strong>
            <span class="text-secondary text-sm">Report an issue</span>
          </button>
          <button class="support-action-card card card-hover" id="scroll-to-check" style="text-align:left;">
            <span class="support-action-icon">🔎</span>
            <strong>Check Support Ticket</strong>
            <span class="text-secondary text-sm">View ticket status</span>
          </button>
          <button class="support-action-card card card-hover" id="open-ai-support" style="text-align:left;">
            <span class="support-action-icon">💬</span>
            <strong>Talk to ShopSathi AI</strong>
            <span class="text-secondary text-sm">Instant AI assistance</span>
          </button>
        </div>

        <div class="support-forms-layout">
          <!-- Create Ticket -->
          <div class="card" id="ticket-create-section">
            <h3 style="margin-bottom:var(--space-4);">🎫 Create Support Ticket</h3>
            <div class="form-group">
              <label class="form-label">Customer ID *</label>
              <input type="text" id="ticket-customer-id" class="form-input" placeholder="e.g. CUST101" value="${((t=se())==null?void 0:t.customer_id)||""}">
            </div>
            <div class="form-group" style="margin-top:var(--space-4);">
              <label class="form-label">Issue Category</label>
              <select id="ticket-category" class="form-select">
                <option value="">Select category...</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Shipping Delay">Shipping Delay</option>
                <option value="Return Dispute">Return Dispute</option>
                <option value="Cancellation">Cancellation</option>
                <option value="Product Quality">Product Quality</option>
                <option value="General">General Inquiry</option>
              </select>
            </div>
            <div class="form-group" style="margin-top:var(--space-4);">
              <label class="form-label">Order ID (optional)</label>
              <input type="text" id="ticket-order-id" class="form-input" placeholder="e.g. ORD1001">
            </div>
            <div class="form-group" style="margin-top:var(--space-4);">
              <label class="form-label">Description *</label>
              <textarea id="ticket-description" class="form-input" placeholder="Describe your issue in detail..." rows="4"></textarea>
            </div>
            <div class="form-group" style="margin-top:var(--space-4);">
              <label class="form-label">Priority</label>
              <select id="ticket-priority" class="form-select">
                <option value="Low">Low</option>
                <option value="Medium" selected>Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <button class="btn btn-primary" style="margin-top:var(--space-6);" id="create-ticket-btn">Create Ticket</button>
            <div id="ticket-create-result" style="margin-top:var(--space-4);"></div>
          </div>

          <!-- Check / Escalate Ticket -->
          <div>
            <div class="card" id="ticket-check-section">
              <h3 style="margin-bottom:var(--space-4);">🔎 Check Ticket Status</h3>
              <div class="flex gap-3" style="flex-wrap:wrap;">
                <input type="text" id="check-ticket-id" class="form-input" placeholder="e.g. TKT9001" style="max-width:250px;">
                <button class="btn btn-primary" id="check-ticket-btn">Check Status</button>
              </div>
              <div id="ticket-check-result" style="margin-top:var(--space-4);"></div>
            </div>

            <div class="card" style="margin-top:var(--space-6);" id="ticket-escalate-section">
              <h3 style="margin-bottom:var(--space-4);">👨‍💼 Escalate to Human Support</h3>
              <p class="text-secondary text-sm" style="margin-bottom:var(--space-4);">If AI cannot resolve your issue, escalate to a Tier 2 human support agent.</p>
              <div class="flex gap-3" style="flex-wrap:wrap;">
                <input type="text" id="escalate-ticket-id" class="form-input" placeholder="Ticket ID e.g. TKT9001" style="max-width:250px;">
                <button class="btn btn-danger" id="escalate-btn">Escalate Ticket</button>
              </div>
              <div id="escalate-result" style="margin-top:var(--space-4);"></div>
            </div>
          </div>
        </div>
      </div>
    </div>`,(n=e.querySelector("#scroll-to-ticket"))==null||n.addEventListener("click",()=>{var s;(s=e.querySelector("#ticket-create-section"))==null||s.scrollIntoView({behavior:"smooth"})}),(a=e.querySelector("#scroll-to-check"))==null||a.addEventListener("click",()=>{var s;(s=e.querySelector("#ticket-check-section"))==null||s.scrollIntoView({behavior:"smooth"})}),(i=e.querySelector("#open-ai-support"))==null||i.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-ai-panel"))}),e.querySelector("#create-ticket-btn").addEventListener("click",async()=>{const s=e.querySelector("#ticket-customer-id").value.trim(),r=e.querySelector("#ticket-category").value,o=e.querySelector("#ticket-order-id").value.trim(),l=e.querySelector("#ticket-description").value.trim(),g=e.querySelector("#ticket-priority").value,d=e.querySelector("#ticket-create-result");if(!s||!l){b("Please fill Customer ID and Description","warning");return}d.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Creating ticket...</span></div>';try{const p=await qe({customerId:s,description:l,category:r||void 0,priority:g,orderId:o||void 0});e.querySelector("#ticket-description").value="";const h=e.querySelector("#ticket-order-id");h&&(h.value=""),d.innerHTML=`
        <div class="return-success-card card card-elevated">
          <h4>✅ Ticket Created</h4>
          <div class="detail-rows" style="margin-top:var(--space-3);">
            <div class="detail-row"><span>Ticket ID</span><strong>${p.ticket_id}</strong></div>
            <div class="detail-row"><span>Priority</span><span class="badge badge-primary">${p.priority}</span></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-success">${p.status}</span></div>
            <div class="detail-row"><span>Assigned To</span><span>${p.assigned_to}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${p.message}</p>
        </div>`,b("Support ticket created!","success")}catch(p){d.innerHTML=`<div class="eligibility-card ineligible"><p>${p.message}</p></div>`,b(p.message||"Failed to create ticket","error")}}),e.querySelector("#check-ticket-btn").addEventListener("click",async()=>{const s=e.querySelector("#check-ticket-id").value.trim();if(!s){b("Please enter a Ticket ID","warning");return}const r=e.querySelector("#ticket-check-result");r.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Loading ticket...</span></div>';try{const o=await Ze(s),l=o.status==="Escalated"?"badge-warning":o.status==="Resolved"?"badge-success":"badge-primary";r.innerHTML=`
        <div class="card card-elevated">
          <div class="detail-rows">
            <div class="detail-row"><span>Ticket</span><strong>${o.ticket_id}</strong></div>
            <div class="detail-row"><span>Status</span><span class="badge ${l}">${o.status}</span></div>
            <div class="detail-row"><span>Priority</span><span class="badge badge-primary">${o.priority}</span></div>
            <div class="detail-row"><span>Category</span><span>${o.category}</span></div>
            <div class="detail-row"><span>Assigned To</span><span>${o.assigned_to}</span></div>
            <div class="detail-row"><span>Description</span><span class="text-sm">${o.description}</span></div>
            ${o.reason_for_escalation?`<div class="detail-row"><span>Escalation Reason</span><span class="text-sm">${o.reason_for_escalation}</span></div>`:""}
          </div>
        </div>`}catch(o){r.innerHTML=`<div class="eligibility-card ineligible"><p>${o.message}</p></div>`}}),e.querySelector("#escalate-btn").addEventListener("click",async()=>{const s=e.querySelector("#escalate-ticket-id").value.trim();if(!s){b("Please enter a Ticket ID","warning");return}if(!await G({title:"Escalate to Human Support?",message:`This will escalate ticket ${s} to a Tier 2 Human Support Agent. Continue?`,confirmText:"Yes, Escalate",type:"primary"}))return;const o=e.querySelector("#escalate-result");o.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Escalating...</span></div>';try{const l=await Re(s);o.innerHTML=`
        <div class="return-success-card card card-elevated">
          <h4>👨‍💼 Ticket Escalated</h4>
          <div class="detail-rows" style="margin-top:var(--space-3);">
            <div class="detail-row"><span>Ticket</span><strong>${l.ticket_id}</strong></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-warning">${l.status}</span></div>
            <div class="detail-row"><span>Assigned To</span><span>${l.assigned_to}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${l.message}</p>
        </div>`,b("Ticket escalated to human support","success")}catch(l){o.innerHTML=`<div class="eligibility-card ineligible"><p>${l.message}</p></div>`,b(l.message||"Failed to escalate","error")}})}async function Lt(e){var i,s;const t=se();if(!t){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">👤</div>
            <h3>Not Logged In</h3>
            <p>Please log in to view your profile.</p>
            <a href="#/login" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Log In</a>
          </div>
        </div>
      </div>`;return}const a={CUST101:"Customer / Owner Demo",CUST102:"Administrator",CUST103:"HR / Operations",CUST104:"Support Team",CUST105:"Guest User"}[t.customer_id]||"Customer";e.innerHTML=`
    <div class="page-content">
      <div class="container" style="max-width:800px;">
        <div class="page-header">
          <h1>My Profile</h1>
        </div>

        <div class="card" style="margin-bottom:var(--space-6);">
          <div class="profile-header">
            <div class="profile-avatar">
              <span>${((s=(i=t.name)==null?void 0:i.charAt(0))==null?void 0:s.toUpperCase())||"?"}</span>
            </div>
            <div>
              <h2>${t.name}</h2>
              <div class="flex items-center gap-2" style="margin-top:var(--space-1);">
                <span class="badge badge-primary">${t.customer_id}</span>
                <span class="badge badge-accent">${a}</span>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="detail-rows">
            <div class="detail-row">
              <span>🎭 Role</span>
              <strong>${a}</strong>
            </div>
            <div class="detail-row">
              <span>📧 Email</span>
              <span>${t.email}</span>
            </div>
            <div class="detail-row">
              <span>📱 Phone</span>
              <span>${t.phone}</span>
            </div>
            <div class="detail-row">
              <span>🆔 Customer ID</span>
              <span>${t.customer_id}</span>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="profile-links-grid">
          <a href="#/orders" class="card card-hover profile-link">
            <span>📦</span>
            <strong>My Orders</strong>
          </a>
          <a href="#/returns" class="card card-hover profile-link">
            <span>↩️</span>
            <strong>Returns & Refunds</strong>
          </a>
          <a href="#/support" class="card card-hover profile-link">
            <span>🎫</span>
            <strong>Support Tickets</strong>
          </a>
          <a href="#/cart" class="card card-hover profile-link">
            <span>🛒</span>
            <strong>My Cart</strong>
          </a>
        </div>

        <button class="btn btn-outline" style="margin-top:var(--space-8);width:100%;" id="logout-btn">
          Log Out
        </button>
      </div>
    </div>`,e.querySelector("#logout-btn").addEventListener("click",()=>{Ve(),b("Logged out successfully","info"),window.location.hash="/login"})}const Ct=[{id:"CUST101",name:"Mahendra Gurjar",role:"Customer / Owner Demo",email:"mahendra.gurjar@shopsathi.ai"},{id:"CUST102",name:"ShopSathi Admin",role:"Administrator",email:"admin@shopsathi.ai"},{id:"CUST103",name:"ShopSathi HR",role:"HR / Operations",email:"hr@shopsathi.ai"},{id:"CUST104",name:"ShopSathi Team",role:"Support Team",email:"team@shopsathi.ai"},{id:"CUST105",name:"Guest",role:"Guest User",email:"guest@shopsathi.ai"}];async function Et(e){e.innerHTML=`
    <div class="page-content">
      <div class="login-page">
        <div class="login-card card card-elevated">
          <div class="text-center" style="margin-bottom:var(--space-8);">
            ${ae(180)}
            <p class="text-secondary" style="margin-top:var(--space-3);">Smart Shopping. Smarter Support.</p>
          </div>

          <h3 style="margin-bottom:var(--space-2);">Welcome to ShopSathi</h3>
          <p class="text-secondary" style="margin-bottom:var(--space-6);">Select a profile to enter the demo experience:</p>

          <div class="login-customers" style="display:flex;flex-direction:column;gap:var(--space-3);">
            ${Ct.map(t=>`
              <button class="login-customer-btn card card-hover" data-id="${t.id}" style="display:flex;align-items:center;gap:var(--space-4);padding:var(--space-3) var(--space-4);width:100%;text-align:left;border:1px solid var(--color-border);background:var(--color-surface);">
                <div class="profile-avatar" style="width:42px;height:42px;font-size:1rem;flex-shrink:0;border-radius:50%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;">
                  <span>${t.name.charAt(0)}</span>
                </div>
                <div style="flex:1;">
                  <div style="display:flex;align-items:center;justify-content:space-between;">
                    <strong style="font-size:0.95rem;">${t.name}</strong>
                    <span class="badge badge-primary" style="font-size:0.7rem;padding:2px 6px;">${t.role}</span>
                  </div>
                  <span class="text-secondary text-sm" style="font-size:0.8rem;">${t.id} • ${t.email}</span>
                </div>
              </button>`).join("")}
          </div>

          <div class="divider" style="margin:var(--space-6) 0;"></div>

          <div class="form-group">
            <label class="form-label">Or enter Customer ID</label>
            <div class="flex gap-3">
              <input type="text" id="custom-id-input" class="form-input" placeholder="e.g. CUST101">
              <button class="btn btn-primary" id="custom-login-btn">Login</button>
            </div>
          </div>

          <p class="text-secondary text-sm text-center" style="margin-top:var(--space-6);">
            <em>Demo login — select any customer profile above.</em>
          </p>
        </div>
      </div>
    </div>`,e.querySelectorAll(".login-customer-btn").forEach(t=>{t.addEventListener("click",async()=>{await X(t.dataset.id)})}),e.querySelector("#custom-login-btn").addEventListener("click",async()=>{const t=e.querySelector("#custom-id-input").value.trim();t?await X(t.toUpperCase()):b("Please enter a Customer ID","warning")}),e.querySelector("#custom-id-input").addEventListener("keydown",async t=>{if(t.key==="Enter"){const n=t.target.value.trim();n&&await X(n.toUpperCase())}})}async function X(e){try{const t=await et(e);we(t),b(`Welcome, ${t.name}!`,"success"),window.location.hash="/"}catch(t){b(t.message||"Customer not found","error")}}C("/",st);C("/products",rt);C("/products/:id",lt);C("/cart",dt);C("/checkout",ut);C("/orders",ht);C("/orders/:id",kt);C("/returns",xt);C("/support",$t);C("/profile",Lt);C("/login",Et);const ie=document.getElementById("app"),Tt=Ye();ie.appendChild(Tt);const Y=document.createElement("main");Y.id="main-content";Y.setAttribute("role","main");ie.appendChild(Y);const qt=Qe();ie.appendChild(qt);const Rt=tt();document.body.appendChild(Rt);Be(Y);
