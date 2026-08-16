(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();const G={};let V=null;function C(e,t){G[e]=t}function ze(){return(window.location.hash.slice(1)||"/").split("?")[0]}function je(e){if(G[e])return{handler:G[e],params:{}};for(const[t,o]of Object.entries(G)){const s=t.split("/").filter(Boolean),r=e.split("/").filter(Boolean);if(s.length!==r.length)continue;const a={};let i=!0;for(let n=0;n<s.length;n++)if(s[n].startsWith(":"))a[s[n].slice(1)]=r[n];else if(s[n]!==r[n]){i=!1;break}if(i)return{handler:o,params:a}}return null}function Ve(e){async function t(){const o=ze(),s=je(o);if(V&&(V(),V=null),s){const r=await s.handler(e,s.params);typeof r=="function"&&(V=r)}else e.innerHTML=`
        <div class="container page-content">
          <div class="empty-state" style="min-height: 60vh;">
            <div class="empty-state-icon">🔍</div>
            <h3>Page Not Found</h3>
            <p>The page you're looking for doesn't exist.</p>
            <a href="#/" class="btn btn-primary" style="margin-top: var(--space-4);">Go Home</a>
          </div>
        </div>`;window.scrollTo({top:0,behavior:"instant"})}return window.addEventListener("hashchange",t),t(),()=>window.removeEventListener("hashchange",t)}function oe(e=140){return`<svg width="${e}" height="${Math.round(e*.3)}" viewBox="0 0 480 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ShopSathi logo">
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
  </svg>`}function Ge(e=44){return`<svg width="${e}" height="${e}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ShopSathi icon">
    <rect x="8" y="18" width="48" height="38" rx="10" fill="#2563EB"/>
    <path d="M20 18 C20 6, 44 6, 44 18" stroke="#2563EB" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="32" cy="35" r="7" fill="white"/>
    <path d="M32 24 L32 20" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 50 L32 46" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M21 35 L17 35" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M47 35 L43 35" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M24 27 L21.5 24.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <path d="M40 43 L42.5 45.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
  </svg>`}function O(e=32){return`<svg width="${e}" height="${e}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="9" width="24" height="19" rx="5" fill="#2563EB"/>
    <path d="M10 9 C10 3, 22 3, 22 9" stroke="#2563EB" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="16" cy="17.5" r="3.5" fill="white"/>
    <line x1="16" y1="12" x2="16" y2="10.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="16" y1="24.5" x2="16" y2="23" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="10.5" y1="17.5" x2="9" y2="17.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="23" y1="17.5" x2="21.5" y2="17.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`}function xe(e=24){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none"/>
  </svg>`}function Y(e=24){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>`}const $e="shopsathi_cart",U="shopsathi_current_customer",B="shopsathi_user",ie=new Set,ye={CUST101:{customer_id:"CUST101",name:"Mahendra Gurjar",role:"Customer / Owner Demo",email:"mahendra.gurjar@shopsathi.ai"},CUST102:{customer_id:"CUST102",name:"ShopSathi Admin",role:"Administrator",email:"admin@shopsathi.ai"},CUST103:{customer_id:"CUST103",name:"ShopSathi HR",role:"HR / Operations",email:"hr@shopsathi.ai"},CUST104:{customer_id:"CUST104",name:"ShopSathi Team",role:"Support Team",email:"team@shopsathi.ai"},CUST105:{customer_id:"CUST105",name:"Guest",role:"Guest User",email:"guest@shopsathi.ai",isGuest:!0}};function Ye(e){return ie.add(e),()=>ie.delete(e)}function Le(e,t){ie.forEach(o=>o(e,t))}function M(){try{const e=localStorage.getItem(U)||localStorage.getItem(B);if(!e)return null;const t=JSON.parse(e);if(!t||!t.customer_id)return localStorage.removeItem(U),localStorage.removeItem(B),null;const o=t.customer_id.toUpperCase();return ye[o]?{...ye[o],...t,customer_id:o}:(localStorage.removeItem(U),localStorage.removeItem(B),null)}catch{return localStorage.removeItem(U),localStorage.removeItem(B),null}}function E(){const e=M();return!(!e||e.customer_id==="CUST105"||e.isGuest)}function re(e){localStorage.removeItem(B),e?localStorage.setItem(U,JSON.stringify(e)):localStorage.removeItem(U),Le("user-changed",e)}function Qe(){re(null)}function P(){try{return JSON.parse(localStorage.getItem($e))||[]}catch{return[]}}function Q(e){localStorage.setItem($e,JSON.stringify(e)),Le("cart-changed",e)}function ne(e,t=1){const o=P(),s=o.find(r=>r.product_id===e.product_id);return s?s.quantity+=t:o.push({product_id:e.product_id,name:e.name,price:e.price,category:e.category,description:e.description,quantity:t}),Q(o),o}function be(e,t){let o=P();if(t<=0)o=o.filter(s=>s.product_id!==e);else{const s=o.find(r=>r.product_id===e);s&&(s.quantity=t)}return Q(o),o}function Je(e){const t=P().filter(o=>o.product_id!==e);return Q(t),t}function Ce(){Q([])}function Ke(){return P().reduce((e,t)=>e+t.quantity,0)}function Te(){return P().reduce((e,t)=>e+t.price*t.quantity,0)}function We(){const e=document.createElement("header");e.className="site-header";function t(){const a=E(),i=M(),n=a?`
      <a href="#/" class="nav-link" data-route="/">Home</a>
      <a href="#/products" class="nav-link" data-route="/products">Products</a>
      <a href="#/orders" class="nav-link" data-route="/orders">My Orders</a>
      <a href="#/returns" class="nav-link" data-route="/returns">Returns</a>
      <a href="#/support" class="nav-link" data-route="/support">Support</a>
    `:`
      <a href="#/" class="nav-link" data-route="/">Home</a>
      <a href="#/products" class="nav-link" data-route="/products">Products</a>
    `,l=a?`
      <a href="#/" class="mobile-nav-link">🏠 Home</a>
      <a href="#/products" class="mobile-nav-link">🛍️ Products</a>
      <a href="#/orders" class="mobile-nav-link">📦 My Orders</a>
      <a href="#/returns" class="mobile-nav-link">↩️ Returns</a>
      <a href="#/support" class="mobile-nav-link">🎫 Support</a>
      <a href="#/cart" class="mobile-nav-link">🛒 Cart</a>
      <a href="#/profile" class="mobile-nav-link">👤 Profile (${(i==null?void 0:i.name)||"Account"})</a>
    `:`
      <a href="#/" class="mobile-nav-link">🏠 Home</a>
      <a href="#/products" class="mobile-nav-link">🛍️ Products</a>
      <a href="#/cart" class="mobile-nav-link">🛒 Cart</a>
      <a href="#/login" class="mobile-nav-link" style="color:var(--color-primary);font-weight:600;">🔑 Login / Profiles</a>
    `,y=a?`
      <a href="#/profile" class="btn-icon header-profile-btn" aria-label="Profile" title="Profile (${i==null?void 0:i.name})">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </a>
    `:`
      <a href="#/login" class="btn btn-outline btn-sm header-login-btn" style="padding:4px 12px;font-size:0.85rem;">Login</a>
    `;e.innerHTML=`
      <div class="header-inner container">
        <a href="#/" class="header-logo" aria-label="ShopSathi Home">
          <span class="header-logo-full">${oe(160)}</span>
          <span class="header-logo-compact">${Ge(36)}</span>
        </a>

        <nav class="header-nav" id="main-nav" aria-label="Main navigation">
          ${n}
        </nav>

        <div class="header-actions">
          <a href="#/products" class="btn-icon header-search-btn" aria-label="Search products" title="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </a>
          <a href="#/cart" class="btn-icon header-cart-btn" aria-label="Cart" title="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span class="cart-badge" id="header-cart-badge" style="display: none;">0</span>
          </a>
          ${y}
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
        ${l}
        <div class="divider"></div>
        <button class="btn btn-primary btn-lg" style="width:100%;" id="mobile-ai-btn">💬 Ask ShopSathi</button>
      </div>
    `,o()}function o(){var l,y;s(),r();const a=e.querySelector("#hamburger-btn"),i=e.querySelector("#mobile-nav");a==null||a.addEventListener("click",()=>{const d=a.getAttribute("aria-expanded")==="true";a.setAttribute("aria-expanded",!d),a.classList.toggle("open"),i.classList.toggle("open")}),i==null||i.querySelectorAll("a").forEach(d=>{d.addEventListener("click",()=>{a.setAttribute("aria-expanded","false"),a.classList.remove("open"),i.classList.remove("open")})});const n=()=>{window.dispatchEvent(new CustomEvent("open-ai-panel")),a==null||a.setAttribute("aria-expanded","false"),a==null||a.classList.remove("open"),i==null||i.classList.remove("open")};(l=e.querySelector("#header-ai-btn"))==null||l.addEventListener("click",n),(y=e.querySelector("#mobile-ai-btn"))==null||y.addEventListener("click",n)}function s(){const a=Ke(),i=e.querySelector("#header-cart-badge");i&&(i.textContent=a,i.style.display=a>0?"flex":"none")}function r(){const a=window.location.hash.slice(1)||"/";e.querySelectorAll(".nav-link, .mobile-nav-link").forEach(i=>{var l;const n=((l=i.getAttribute("href"))==null?void 0:l.replace("#",""))||"";i.classList.toggle("active",a===n||n!=="/"&&a.startsWith(n))})}return t(),Ye(a=>{a==="cart-changed"&&s(),a==="user-changed"&&t()}),window.addEventListener("hashchange",r),e}function Xe(){const e=document.createElement("footer");return e.className="site-footer",e.innerHTML=`
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          ${oe(140)}
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
  `,e}const Ze=typeof window<"u"&&window.__API_BASE__?window.__API_BASE__:typeof window<"u"&&window.location.port==="5173"?"/api":"";class Z extends Error{constructor(t,o,s){super(t),this.status=o,this.data=s}}async function x(e,t={}){const o=`${Ze}${e}`,s=M(),r={"Content-Type":"application/json",...t.headers};E()&&s&&s.customer_id&&(r["X-Customer-ID"]=s.customer_id);const a={...t,headers:r};try{const i=await fetch(o,a),n=await i.json().catch(()=>null);if(!i.ok){const l=(n==null?void 0:n.detail)||(n==null?void 0:n.message)||"Request failed";throw new Z(l,i.status,n)}return n}catch(i){throw i instanceof Z?i:new Z("Network error. Please check your connection and try again.",0,null)}}async function et(){return x("/products")}async function Ee(e="",t=null,o=null){const s=new URLSearchParams;return e&&s.set("query",e),t&&s.set("max_price",t),o&&s.set("category",o),x(`/products/search?${s.toString()}`)}async function tt(e){return x(`/products/${e}`)}async function fe(e=null){const t=e?`?customer_id=${e}`:"";return x(`/orders${t}`)}async function J(e){return x(`/orders/${e}`)}async function qe(e){return x(`/orders/${e}/cancel`,{method:"POST"})}async function at(e){return x(`/customers/${e}/orders`)}async function Re(e){return x(`/orders/${e}/return-eligibility`)}async function Oe(e,t){return x("/returns",{method:"POST",body:JSON.stringify({order_id:e,reason:t})})}async function Pe(e){return x(`/orders/${e}/refund`)}async function Ie({customerId:e,description:t,subject:o,category:s,priority:r,orderId:a}){return x("/support/tickets",{method:"POST",body:JSON.stringify({customer_id:e,description:t,subject:o||void 0,category:s||void 0,priority:r||"Medium",order_id:a||void 0})})}async function st(e){return x(`/support/tickets/${e}`)}async function Ae(e,t){return x(`/support/tickets/${e}/escalate`,{method:"POST",body:JSON.stringify({reason:t||void 0})})}async function it(e){const t=(e||"").trim().toUpperCase();return x(`/customers/${t}`,{headers:{"X-Customer-ID":t}})}function rt(){const e=document.createElement("div");e.className="ai-launcher-wrapper",e.innerHTML=`
    <!-- Floating Button -->
    <button class="ai-fab" id="ai-fab" aria-label="Ask ShopSathi AI">
      <span class="ai-fab-icon">${xe(24)}</span>
      <span class="ai-fab-label">Ask ShopSathi</span>
    </button>

    <!-- Quick menu -->
    <div class="ai-menu" id="ai-menu">
      <div class="ai-menu-header">
        <div class="flex items-center gap-3">
          ${O(28)}
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
          ${O(28)}
          <div>
            <h4 style="margin:0;font-size:0.95rem;">ShopSathi Chat Agent</h4>
            <div class="flex items-center gap-1">
              <span class="badge badge-success" style="font-size:0.65rem;padding:2px 6px;">● Online</span>
              <span style="font-size:0.65rem;color:var(--color-text-tertiary);">Gemini 3.1 Flash</span>
            </div>
          </div>
        </div>
        <div class="flex gap-1 items-center">
          <button class="btn-icon" id="ai-panel-voice" aria-label="Switch to voice" title="Switch to Real-Time Voice" style="color:var(--color-accent);">${Y(18)}</button>
          <button class="btn-icon" id="ai-panel-close" aria-label="Close" style="font-size:1.3rem;opacity:0.6;">&times;</button>
        </div>
      </div>
      <div class="ai-panel-body" id="ai-chat-body">
        <div class="ai-message ai-message-bot">
          <div class="ai-avatar">${O(24)}</div>
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
          ${O(28)}
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
          <div class="ai-voice-icon" id="voice-icon">${Y(44)}</div>
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
            ${Y(20)} Start Conversation
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
  `;let t=!1,o=!1,s=!1,r=!1,a=!1,i=null,n=window.speechSynthesis||null;const l=e.querySelector("#ai-fab"),y=e.querySelector("#ai-menu"),d=e.querySelector("#ai-panel"),u=e.querySelector("#ai-voice-panel");function h(){t=o=s=!1,y.classList.remove("open"),d.classList.remove("open"),u.classList.remove("open"),l.classList.remove("active"),r&&ge()}function k(){h(),t=!0,y.classList.add("open"),l.classList.add("active")}function S(){var v;h(),o=!0,d.classList.add("open"),l.classList.add("active"),(v=e.querySelector("#ai-chat-input"))==null||v.focus()}function $(){h(),s=!0,u.classList.add("open"),l.classList.add("active")}l.addEventListener("click",()=>{t||o||s?h():k()}),e.querySelector("#ai-menu-close").addEventListener("click",h),e.querySelector("#ai-panel-close").addEventListener("click",h),e.querySelector("#ai-voice-close").addEventListener("click",h),e.querySelector("#ai-open-chat").addEventListener("click",S),e.querySelector("#ai-open-voice").addEventListener("click",$),e.querySelector("#ai-panel-voice").addEventListener("click",$),e.querySelectorAll(".ai-menu-options + .ai-quick-actions .ai-chip").forEach(v=>{v.addEventListener("click",()=>{const m=v.dataset.action;h();const c={track:"#/orders",cancel:"#/orders",return:"#/returns",refund:"#/returns",search:"#/products",ticket:"#/support"};c[m]&&(window.location.hash=c[m])})});const H=e.querySelector("#ai-chat-input"),w=e.querySelector("#ai-chat-body"),z=e.querySelector("#ai-send-btn");async function q(v){const m=v.trim(),c=m.toLowerCase(),f=m.match(/ORD\d{4}/i),T=c.includes("track")||c.includes("where")||c.includes("kaha")||c.includes("status")||c.includes("delivery");if(!E()&&(f||c.includes("ticket")||c.includes("order")||c.includes("return")||c.includes("refund")||c.includes("cancel"))&&!c.includes("shoe")&&!c.includes("headphone")&&!c.includes("shirt")&&!c.includes("watch")&&!c.includes("product")&&!c.includes("find")&&!c.includes("search")&&!c.includes("under"))return{text:`🔒 **Login Required**

Please log in to access your order information.`,actions:[{label:"Login to continue",url:"#/login?redirect=/orders"}]};if(f&&T&&!c.includes("return")&&!c.includes("refund")&&!c.includes("cancel")){const g=f[0].toUpperCase();try{const p=await J(g);return{text:`Aapka order **${p.order_id}** (${p.product_name}) filhaal **${p.status}** hai.

📅 Expected Delivery: **${p.expected_delivery||"Soon"}**
💰 Amount: ₹${p.amount.toLocaleString("en-IN")}`,actions:[{label:`View Timeline for ${p.order_id}`,url:`#/orders/${p.order_id}`}]}}catch(p){return p.status===401?{text:`🔒 **Login Required**

Please log in to access your order information.`,actions:[{label:"Login to continue",url:"#/login"}]}:p.status===403?{text:`🔒 **Order Access Restricted**

You can only view orders associated with your account.`}:{text:`Order **${g}** nahi mila. Kripya apna Order ID check karein.`}}}if(f&&(c.includes("return")||c.includes("wapas")||c.includes("exchange"))){const g=f[0].toUpperCase();try{const p=await Re(g);if(p.eligible){const R=m.replace(new RegExp(`.*${g}`,"i"),"").trim()||"Size issue / Not as expected",_=await Oe(g,R);return{text:`✅ Order **${g}** return ke liye eligible hai!

Maine aapka Return Request submit kar diya hai.
🆔 **Return ID: ${_.return_id}**
🚚 Pickup agle 24-48 ghanto me schedule ho jayega.`,actions:[{label:"Check Returns & Refunds",url:`#/returns?order=${g}`}]}}else return{text:`⚠️ Order **${g}** return ke liye eligible nahi hai.

**Reason**: ${p.reason}`,actions:[{label:"View Return Policy",url:"#/returns"}]}}catch(p){return p.status===401?{text:`🔒 **Login Required**

Please log in to request returns.`,actions:[{label:"Login to continue",url:"#/login"}]}:p.status===403?{text:`🔒 **Order Access Restricted**

You can only return orders associated with your account.`}:{text:`Return check failed: ${p.message}`}}}if(f&&(c.includes("refund")||c.includes("paise")||c.includes("money back"))){const g=f[0].toUpperCase();try{const p=await Pe(g);return{text:`💰 **Refund Status for ${g}**

- Refund ID: **${p.refund_id}**
- Amount: **₹${p.amount.toLocaleString("en-IN")}**
- Status: **${p.refund_status}**
- Expected Date: **${p.expected_date||"N/A"}**

${p.message}`,actions:[{label:"View Refund Details",url:`#/returns?order=${g}&action=refund`}]}}catch(p){return p.status===401?{text:`🔒 **Login Required**

Please log in to check refund status.`,actions:[{label:"Login to continue",url:"#/login"}]}:p.status===403?{text:`🔒 **Order Access Restricted**

You can only check refunds for orders associated with your account.`}:{text:`Order **${g}** ke liye refund details: ${p.message}`}}}if(f&&(c.includes("cancel")||c.includes("radd")||c.includes("band"))){const g=f[0].toUpperCase();try{return{text:`❌ ${(await qe(g)).message}

Agar payment ho chuka tha toh 3-5 working days me aapke source account me refund aa jayega.`,actions:[{label:"View Order Status",url:`#/orders/${g}`}]}}catch(p){return p.status===401?{text:`🔒 **Login Required**

Please log in to cancel orders.`,actions:[{label:"Login to continue",url:"#/login"}]}:p.status===403?{text:`🔒 **Order Access Restricted**

You can only cancel orders associated with your account.`}:{text:`Order **${g}** cancel nahi ho saka: ${p.message}`}}}if(c.includes("shoe")||c.includes("headphone")||c.includes("shirt")||c.includes("watch")||c.includes("product")||c.includes("dikh")||c.includes("find")||c.includes("search")||c.includes("under")||c.includes("budget")){const g=m.match(/(?:under|below|less than|₹|rs\.?)\s*(\d+)/i)||m.match(/(\d+)\s*(?:rs|rupees|tak)/i),p=g?parseFloat(g[1]):null;let R=null;c.includes("shoe")||c.includes("footwear")?R="Footwear":c.includes("headphone")||c.includes("earphone")||c.includes("audio")||c.includes("watch")?R="Electronics":(c.includes("shirt")||c.includes("cloth")||c.includes("fashion"))&&(R="Fashion");const _=m.replace(/(?:show|me|find|search|please|give|under|below|less than|rs\.?|₹|\d+|tak|kuch|achha)/gi,"").trim();try{const F=await Ee(_,p,R);if(F&&F.length>0)return{text:`Here is what I found for you in our catalog:

${F.slice(0,3).map(D=>`• **${D.name}** — ₹${D.price.toLocaleString("en-IN")} (${D.category})`).join(`
`)}`,actions:F.slice(0,2).map(D=>({label:`View ${D.name}`,url:`#/products/${D.product_id}`}))}}catch{}}if(c.includes("human")||c.includes("agent")||c.includes("ticket")||c.includes("dispute")||c.includes("complain")||c.includes("fraud")||c.includes("deduct")){const g=M();if(!E()||!g||!g.customer_id)return{text:`🔒 **Login Required**

Please log in to create a support ticket.`,actions:[{label:"Login to continue",url:"#/login?redirect=/support"}]};try{const p=await Ie({customerId:g.customer_id,description:m,category:c.includes("payment")?"Payment Issue":"General Support",priority:"High",orderId:f?f[0].toUpperCase():void 0});return c.includes("human")||c.includes("agent")||c.includes("escalate")?(await Ae(p.ticket_id,"Customer explicitly requested Tier 2 Human Support assistance."),{text:`I understand your concern. I have created **Support Ticket ${p.ticket_id}** and escalated it directly to our **Tier 2 Human Support Manager**.

A human representative will review your issue and reach out shortly.`,actions:[{label:`Check Ticket ${p.ticket_id}`,url:"#/support"}]}):{text:`I have created Support Ticket **${p.ticket_id}** for you with High priority.

Status: ${p.status} (Assigned to: ${p.assigned_to})`,actions:[{label:"View Ticket",url:"#/support"}]}}catch(p){return{text:`Ticket creation note: ${p.message}`}}}return{text:"I'm ShopSathi AI Assistant! You can ask me to track orders (e.g. *ORD1001*), manage returns (e.g. *ORD1003*), check refund status (*ORD1004*), search products under your budget, or connect you with human support."}}async function N(v){if(!v||!v.trim())return;const m=v.trim(),c=document.createElement("div");c.className="ai-message ai-message-user",c.innerHTML=`<div class="ai-bubble">${ee(m)}</div>`,w.appendChild(c),H.value="",w.scrollTop=w.scrollHeight;const f=document.createElement("div");f.className="ai-message ai-message-bot",f.innerHTML=`<div class="ai-avatar">${O(24)}</div><div class="ai-bubble ai-typing"><span></span><span></span><span></span></div>`,w.appendChild(f),w.scrollTop=w.scrollHeight;try{const T=await q(m);f.remove();const g=document.createElement("div");g.className="ai-message ai-message-bot";let p=nt(T.text),R="";T.actions&&T.actions.length>0&&(R=`<div class="ai-bubble-actions" style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;">
          ${T.actions.map(_=>`<a href="${_.url}" class="btn btn-outline btn-sm" style="font-size:0.75rem;padding:4px 8px;">${_.label}</a>`).join("")}
        </div>`),g.innerHTML=`
        <div class="ai-avatar">${O(24)}</div>
        <div class="ai-bubble">
          ${p}
          ${R}
        </div>`,w.appendChild(g),w.scrollTop=w.scrollHeight}catch{f.remove();const g=document.createElement("div");g.className="ai-message ai-message-bot",g.innerHTML=`
        <div class="ai-avatar">${O(24)}</div>
        <div class="ai-bubble" style="border-left:3px solid var(--color-error);">
          <p>Sorry, I encountered an issue processing that. Please try again or check your connection.</p>
        </div>`,w.appendChild(g),w.scrollTop=w.scrollHeight}}z.addEventListener("click",()=>N(H.value)),H.addEventListener("keydown",v=>{v.key==="Enter"&&N(H.value)}),e.querySelectorAll(".ai-panel-chips .ai-chip").forEach(v=>{v.addEventListener("click",()=>N(v.dataset.msg))});const I=e.querySelector("#voice-start-btn"),He=e.querySelector("#voice-stop-btn"),X=e.querySelector("#voice-mute-btn"),le=e.querySelector("#mute-label"),_e=e.querySelector("#voice-speaker-btn"),de=e.querySelector("#voice-active-controls"),De=e.querySelector("#voice-status"),Ue=e.querySelector("#voice-hint"),pe=e.querySelector("#voice-state-badge"),j=e.querySelector("#voice-ring");e.querySelector("#voice-icon");const ue=e.querySelector("#voice-transcript-box"),Ne=e.querySelector("#voice-user-transcript"),Fe=e.querySelector("#voice-agent-transcript");function L(v,m,c){const f={Ready:"badge-neutral",Connecting:"badge-warning",Connected:"badge-success",Listening:"badge-accent",Processing:"badge-primary",Speaking:"badge-success",Error:"badge-error",Ended:"badge-neutral"};pe.className=`badge ${f[v]||"badge-neutral"}`,pe.textContent=v,m&&(De.textContent=m),c&&(Ue.textContent=c),j.className="ai-voice-ring",v==="Connecting"||v==="Processing"?j.classList.add("active"):v==="Listening"?j.classList.add("listening"):v==="Speaking"&&j.classList.add("speaking")}async function ve(v){if(!n)return;n.cancel(),L("Speaking","ShopSathi is speaking...","Voice Agent Active (Gemini 2.5 Audio)"),Fe.innerHTML=`<strong>ShopSathi:</strong> ${ee(v)}`;const m=new SpeechSynthesisUtterance(v.replace(/[*_#•]/g,""));m.lang="en-IN",m.rate=1,m.pitch=1,m.onend=()=>{r&&!a&&L("Listening","Listening for your voice...","Speak in English, Hindi, or Hinglish")},m.onerror=()=>{r&&L("Listening","Listening...","Tap mute or speak")},n.speak(m)}async function he(v){if(!v.trim())return;L("Processing","Processing with ShopSathi AI...","Executing API tools..."),Ne.innerHTML=`<strong>You:</strong> "${ee(v)}"`,ue.style.display="block";const m=await q(v);await ve(m.text)}function Be(){const v=window.SpeechRecognition||window.webkitSpeechRecognition;if(!v)return null;const m=new v;return m.continuous=!0,m.interimResults=!1,m.lang="en-IN",m.onresult=c=>{const f=c.results.length-1,T=c.results[f][0].transcript;T&&he(T)},m.onerror=c=>{r&&c.error!=="no-speech"&&L("Connected","Microphone active","You can speak anytime")},m}function me(){r=!0,a=!1,I.style.display="none",de.style.display="flex",ue.style.display="block",L("Connecting","Connecting to Real-Time Voice Agent...","Provider: Gemini 2.5 Flash Audio Preview (Voice: Puck)"),setTimeout(()=>{if(L("Connected","Voice Session Connected!","Ready for spoken conversation"),i=Be(),i)try{i.start()}catch{}ve("Namaste! ShopSathi Real-Time Voice Support is active. How can I help you today?")},1200)}function ge(){if(r=!1,n&&n.cancel(),i){try{i.stop()}catch{}i=null}de.style.display="none",I.style.display="inline-flex",L("Ended","Call ended","Tap Start Conversation to reconnect")}return I.addEventListener("click",me),He.addEventListener("click",ge),X.addEventListener("click",()=>{if(a=!a,a){if(le.textContent="Unmute",X.classList.add("btn-danger"),i)try{i.stop()}catch{}L("Connected","Microphone Muted","Tap Unmute to speak")}else{if(le.textContent="Mute",X.classList.remove("btn-danger"),i)try{i.start()}catch{}L("Listening","Listening...","Speak now")}}),_e.addEventListener("click",()=>{n&&n.speaking&&(n.cancel(),L("Listening","Audio stopped","Listening for speech"))}),e.querySelectorAll(".voice-demo-chip").forEach(v=>{v.addEventListener("click",()=>{const m=v.dataset.speak;r||me(),setTimeout(()=>he(m),1500)})}),window.addEventListener("open-ai-panel",()=>{o||s||k()}),e}function ee(e){if(!e)return"";const t=document.createElement("div");return t.textContent=e,t.innerHTML}function nt(e){return e?e.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"<br><br>").replace(/\n/g,"<br>"):""}async function ot(e){var o,s,r,a,i;e.innerHTML=`
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
                  ${xe(18)} Ask ShopSathi
                </button>
              </div>
              <button class="hero-voice-cta" id="hero-voice-btn">
                ${Y(16)}
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
                  <div class="hero-card-icon">${O(28)}</div>
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
                  <div class="ai-avatar" style="width:28px;height:28px;">${O(24)}</div>
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
  `;const t=()=>window.dispatchEvent(new CustomEvent("open-ai-panel"));(o=e.querySelector("#hero-ai-btn"))==null||o.addEventListener("click",t),(s=e.querySelector("#hero-voice-btn"))==null||s.addEventListener("click",t),(r=e.querySelector("#cta-chat-btn"))==null||r.addEventListener("click",t),(a=e.querySelector("#cta-voice-btn"))==null||a.addEventListener("click",t),(i=e.querySelector("#feature-voice-card"))==null||i.addEventListener("click",t)}let A=null;function ct(){return A||(A=document.createElement("div"),A.className="toast-container",A.setAttribute("role","alert"),A.setAttribute("aria-live","polite"),document.body.appendChild(A)),A}function b(e,t="info",o=4e3){const s=ct(),r=document.createElement("div");r.className=`toast toast-${t}`;const a={success:"✓",error:"✕",warning:"⚠",info:"ℹ"};r.innerHTML=`
    <span style="font-size: 1.1rem; flex-shrink: 0;">${a[t]||a.info}</span>
    <span style="flex: 1;">${e}</span>
    <button class="btn-ghost" style="padding: 2px 6px; font-size: 1.1rem; opacity: 0.6;" aria-label="Close">&times;</button>
  `,r.querySelector("button").addEventListener("click",()=>ke(r)),s.appendChild(r);const i=setTimeout(()=>ke(r),o);r._timer=i}function ke(e){clearTimeout(e._timer),e.classList.add("toast-exit"),e.addEventListener("animationend",()=>e.remove())}let Se=null;async function lt(e){e.innerHTML=`
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
          ${we(6)}
        </div>
      </div>
    </div>
  `;const t=e.querySelector("#search-input"),o=e.querySelector("#category-filter"),s=e.querySelector("#max-price"),r=e.querySelector("#products-grid"),a=e.querySelector("#result-count"),i=window.location.hash,n=i.indexOf("?");if(n!==-1){const d=new URLSearchParams(i.slice(n));d.get("category")&&(o.value=d.get("category")),d.get("query")&&(t.value=d.get("query"))}async function l(){var k;const d=t.value.trim(),u=o.value,h=s.value?parseFloat(s.value):null;r.innerHTML=we(6);try{let S;d||u||h?S=await Ee(d,h,u):S=await et(),S.length===0?(r.innerHTML=`
          <div class="empty-state" style="grid-column: 1/-1;">
            <div class="empty-state-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>`,a.textContent="0 products"):(r.innerHTML=S.map($=>dt($)).join(""),a.textContent=`${S.length} product${S.length!==1?"s":""} found`,ut(r))}catch(S){r.innerHTML=`
        <div class="empty-state" style="grid-column: 1/-1;">
          <div class="empty-state-icon">⚠️</div>
          <h3>Failed to load products</h3>
          <p>${S.message}</p>
          <button class="btn btn-primary" style="margin-top:var(--space-4);" id="retry-btn">Try Again</button>
        </div>`,(k=e.querySelector("#retry-btn"))==null||k.addEventListener("click",l)}}function y(){clearTimeout(Se),Se=setTimeout(l,350)}t.addEventListener("input",y),o.addEventListener("change",l),s.addEventListener("input",y),await l()}function dt(e){const t=e.stock>0,s={Electronics:"primary",Footwear:"success",Fashion:"accent",Home:"warning"}[e.category]||"neutral";return`
    <div class="product-card card card-hover" data-id="${e.product_id}">
      <div class="product-image">
        <div class="product-image-placeholder">
          ${pt(e.category)}
        </div>
        <span class="badge badge-${s} product-category-badge">${e.category}</span>
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
    </div>`}function pt(e){return`<span style="font-size:3rem;">${{Electronics:"🎧",Footwear:"👟",Fashion:"👔",Home:"🏠"}[e]||"📦"}</span>`}function we(e){return Array(e).fill(`
    <div class="skeleton-card">
      <div class="skeleton skeleton-image" style="height:180px;margin-bottom:16px;"></div>
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-text" style="width:80%;"></div>
      <div class="skeleton skeleton-text" style="width:40%;margin-top:12px;"></div>
    </div>`).join("")}function ut(e){e.querySelectorAll(".add-to-cart-btn").forEach(t=>{t.addEventListener("click",o=>{o.stopPropagation();const s=JSON.parse(t.dataset.product);ne(s,1),b(`${s.name} added to cart`,"success")})})}async function vt(e,t){const o=t.id;e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <div class="loading-container"><div class="spinner spinner-lg"></div><p>Loading product...</p></div>
      </div>
    </div>`;try{const s=await tt(o),r=s.stock>0,a={Electronics:"🎧",Footwear:"👟",Fashion:"👔",Home:"🏠"};e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <a href="#/products" class="back-link">&larr; Back to Products</a>
          <div class="product-detail">
            <div class="product-detail-image">
              <div class="product-image-placeholder-lg">
                <span style="font-size:6rem;">${a[s.category]||"📦"}</span>
              </div>
            </div>
            <div class="product-detail-info">
              <span class="badge badge-primary">${s.category}</span>
              <h1 style="margin-top:var(--space-3);">${s.name}</h1>
              <p class="product-detail-price">₹${s.price.toLocaleString("en-IN")}</p>
              <p class="product-detail-desc">${s.description||"No description available."}</p>

              <div class="product-detail-meta">
                <div class="meta-item">
                  <span class="meta-label">Availability</span>
                  <span class="badge ${r?"badge-success":"badge-error"}">${r?`In Stock (${s.stock} units)`:"Out of Stock"}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Return Policy</span>
                  <span class="badge ${s.returnable?"badge-success":"badge-warning"}">${s.returnable?"7-Day Returns":"Non-Returnable"}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Product ID</span>
                  <span class="text-secondary">${s.product_id}</span>
                </div>
              </div>

              <div class="product-detail-qty">
                <label class="form-label">Quantity</label>
                <div class="qty-selector">
                  <button class="btn btn-ghost qty-btn" id="qty-minus" aria-label="Decrease">−</button>
                  <input type="number" id="qty-input" class="form-input" value="1" min="1" max="${s.stock}" style="width:60px;text-align:center;">
                  <button class="btn btn-ghost qty-btn" id="qty-plus" aria-label="Increase">+</button>
                </div>
              </div>

              <div class="product-detail-actions">
                <button class="btn btn-primary btn-lg" id="add-to-cart-btn" ${r?"":"disabled"} style="flex:1;">
                  🛒 Add to Cart
                </button>
                <button class="btn btn-secondary btn-lg" id="buy-now-btn" ${r?"":"disabled"} style="flex:1;">
                  ⚡ Buy Now
                </button>
              </div>

              <button class="product-ai-help" id="ask-ai-btn">
                💬 Ask ShopSathi about this product
              </button>
            </div>
          </div>
        </div>
      </div>`;const i=e.querySelector("#qty-input");e.querySelector("#qty-minus").addEventListener("click",()=>{const n=parseInt(i.value)||1;n>1&&(i.value=n-1)}),e.querySelector("#qty-plus").addEventListener("click",()=>{const n=parseInt(i.value)||1;n<s.stock&&(i.value=n+1)}),e.querySelector("#add-to-cart-btn").addEventListener("click",()=>{const n=parseInt(i.value)||1;ne(s,n),b(`${s.name} (x${n}) added to cart`,"success")}),e.querySelector("#buy-now-btn").addEventListener("click",()=>{const n=parseInt(i.value)||1;ne(s,n),window.location.hash="/checkout"}),e.querySelector("#ask-ai-btn").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-ai-panel"))})}catch(s){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">⚠️</div>
            <h3>Product not found</h3>
            <p>${s.message}</p>
            <a href="#/products" class="btn btn-primary" style="margin-top:var(--space-4);">Browse Products</a>
          </div>
        </div>
      </div>`}}function K({title:e,message:t,confirmText:o="Confirm",cancelText:s="Cancel",type:r="danger"}){return new Promise(a=>{const i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <h3 id="modal-title">${e}</h3>
        </div>
        <div class="modal-body">
          <p>${t}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="modal-cancel">${s}</button>
          <button class="btn btn-${r}" id="modal-confirm">${o}</button>
        </div>
      </div>
    `,document.body.appendChild(i);const n=()=>{i.style.opacity="0",setTimeout(()=>i.remove(),200)};i.querySelector("#modal-confirm").addEventListener("click",()=>{n(),a(!0)}),i.querySelector("#modal-cancel").addEventListener("click",()=>{n(),a(!1)}),i.addEventListener("click",l=>{l.target===i&&(n(),a(!1))}),setTimeout(()=>i.querySelector("#modal-cancel").focus(),100)})}async function ht(e){function t(){var r;const o=P(),s=Te();if(o.length===0){e.innerHTML=`
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
            <p>${o.length} item${o.length!==1?"s":""} in your cart</p>
          </div>

          <div class="cart-layout">
            <div class="cart-items">
              ${o.map(a=>`
                <div class="cart-item card" data-id="${a.product_id}">
                  <div class="cart-item-image">
                    <span style="font-size:2rem;">${mt(a.category)}</span>
                  </div>
                  <div class="cart-item-info">
                    <h4><a href="#/products/${a.product_id}">${a.name}</a></h4>
                    <p class="text-secondary text-sm">${a.category||""}</p>
                    <span class="product-price">₹${a.price.toLocaleString("en-IN")}</span>
                  </div>
                  <div class="cart-item-qty">
                    <div class="qty-selector">
                      <button class="btn btn-ghost qty-btn qty-dec" data-id="${a.product_id}" aria-label="Decrease">−</button>
                      <span class="qty-value">${a.quantity}</span>
                      <button class="btn btn-ghost qty-btn qty-inc" data-id="${a.product_id}" aria-label="Increase">+</button>
                    </div>
                  </div>
                  <div class="cart-item-total">
                    <strong>₹${(a.price*a.quantity).toLocaleString("en-IN")}</strong>
                  </div>
                  <button class="btn btn-ghost cart-remove-btn" data-id="${a.product_id}" aria-label="Remove">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>`).join("")}
            </div>

            <div class="cart-summary card card-elevated">
              <h3 style="margin-bottom:var(--space-4);">Order Summary</h3>
              <div class="summary-row">
                <span>Subtotal (${o.reduce((a,i)=>a+i.quantity,0)} items)</span>
                <span>₹${s.toLocaleString("en-IN")}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span class="text-success" style="font-weight:600;">Free</span>
              </div>
              <div class="divider"></div>
              <div class="summary-row summary-total">
                <span>Total</span>
                <span>₹${s.toLocaleString("en-IN")}</span>
              </div>
              <a href="#/checkout" class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4);">Proceed to Checkout</a>
              <button class="btn btn-ghost" style="width:100%;margin-top:var(--space-2);font-size:var(--font-sm);" id="clear-cart-btn">Clear Cart</button>
            </div>
          </div>
        </div>
      </div>`,e.querySelectorAll(".qty-dec").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.id,n=P().find(l=>l.product_id===i);n&&n.quantity>1&&(be(i,n.quantity-1),t())})}),e.querySelectorAll(".qty-inc").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.id,n=P().find(l=>l.product_id===i);n&&(be(i,n.quantity+1),t())})}),e.querySelectorAll(".cart-remove-btn").forEach(a=>{a.addEventListener("click",()=>{Je(a.dataset.id),b("Item removed from cart","info"),t()})}),(r=e.querySelector("#clear-cart-btn"))==null||r.addEventListener("click",async()=>{await K({title:"Clear Cart",message:"Are you sure you want to remove all items from your cart?",confirmText:"Clear All",type:"danger"})&&(Ce(),b("Cart cleared","info"),t())})}t()}function mt(e){return{Electronics:"🎧",Footwear:"👟",Fashion:"👔",Home:"🏠"}[e]||"📦"}async function gt(e){if(!E()){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required for Checkout</h3>
            <p>Please log in to continue with checkout.</p>
            <a href="#/login?redirect=/checkout" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Login to continue</a>
          </div>
        </div>
      </div>`;return}const t=P(),o=Te();if(t.length===0){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🛒</div>
            <h3>Nothing to checkout</h3>
            <p>Add some products to your cart first.</p>
            <a href="#/products" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Browse Products</a>
          </div>
        </div>
      </div>`;return}const s=getCurrentUser();e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <a href="#/cart" class="back-link">&larr; Back to Cart</a>
        <div class="page-header">
          <h1>Checkout</h1>
        </div>

        <div class="checkout-grid">
          <!-- Shipping Form -->
          <div class="checkout-form-col">
            <div class="card card-elevated" style="margin-bottom:var(--space-6);">
              <h3 style="margin-bottom:var(--space-4);">Shipping Address</h3>
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" id="checkout-name" class="form-input" value="${(s==null?void 0:s.name)||""}" placeholder="e.g. Mahendra Gurjar">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input type="email" id="checkout-email" class="form-input" value="${(s==null?void 0:s.email)||""}" placeholder="mahendra.gurjar@shopsathi.ai">
                </div>
                <div class="form-group">
                  <label class="form-label">Phone</label>
                  <input type="tel" id="checkout-phone" class="form-input" value="${(s==null?void 0:s.phone)||"+91 98765 43210"}" placeholder="+91 98765 43210">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Address</label>
                <input type="text" id="checkout-address" class="form-input" value="123 Tech Park, MG Road, Jaipur, Rajasthan 302001" placeholder="House no, Street, Area">
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
              ${t.map(r=>`
                <div class="summary-item">
                  <div>
                    <span class="text-sm">${r.name}</span>
                    <span class="text-secondary text-sm"> × ${r.quantity}</span>
                  </div>
                  <span class="text-sm">₹${(r.price*r.quantity).toLocaleString("en-IN")}</span>
                </div>`).join("")}
              <div class="divider"></div>
              <div class="summary-row">
                <span>Subtotal</span>
                <span>₹${o.toLocaleString("en-IN")}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span class="text-success" style="font-weight:600;">Free</span>
              </div>
              <div class="divider"></div>
              <div class="summary-row summary-total">
                <span>Total</span>
                <span>₹${o.toLocaleString("en-IN")}</span>
              </div>
              <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-6);" id="place-order-btn">
                Place Order — ₹${o.toLocaleString("en-IN")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`,e.querySelector("#place-order-btn").addEventListener("click",()=>{const r=e.querySelector("#checkout-name").value.trim(),a=e.querySelector("#checkout-email").value.trim(),i=e.querySelector("#checkout-phone").value.trim(),n=e.querySelector("#checkout-address").value.trim();if(!r||!a||!i||!n){b("Please fill in all required fields","warning");return}const l="ORD"+Math.floor(1e3+Math.random()*9e3);Ce(),e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="order-success-card card card-elevated text-center" style="max-width:600px;margin:var(--space-12) auto;padding:var(--space-12);">
            <div style="font-size:4rem;margin-bottom:var(--space-4);">🎉</div>
            <h2>Order Placed Successfully!</h2>
            <p class="text-secondary" style="margin-top:var(--space-3);font-size:var(--font-lg);">Thank you, ${r}! Your order <strong>${l}</strong> has been placed.</p>
            <p class="text-secondary" style="margin-top:var(--space-2);">You'll receive a confirmation at ${a}</p>
            <div class="flex gap-4 justify-center" style="margin-top:var(--space-8);flex-wrap:wrap;">
              <a href="#/orders" class="btn btn-primary btn-lg">View My Orders</a>
              <a href="#/products" class="btn btn-outline btn-lg">Continue Shopping</a>
            </div>
          </div>
        </div>
      </div>`,b("Order placed successfully!","success")})}const yt=["ORD1001","ORD1002","ORD1003","ORD1004","ORD1005"],te=10;async function bt(e){if(!E()){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required</h3>
            <p>Please log in to view your orders and account information.</p>
            <a href="#/login?redirect=/orders" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Login to continue</a>
          </div>
        </div>
      </div>`;return}e.innerHTML=`
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
    </div>`;const t=e.querySelector("#orders-container"),o=e.querySelector("#order-lookup-input"),s=e.querySelector("#order-lookup-btn"),r=e.querySelector("#status-filter");let a=[],i=1,n="ALL";const l=()=>{const u=o.value.trim();u&&(window.location.hash=`/orders/${u.toUpperCase()}`)};s.addEventListener("click",l),o.addEventListener("keydown",u=>{u.key==="Enter"&&l()}),r.addEventListener("change",u=>{n=u.target.value,i=1,d()});function y(){return n==="ALL"?a:n==="Returned"?a.filter(u=>u.status==="Returned"||u.status==="Return Requested"):a.filter(u=>u.status===n)}function d(){const u=y(),h=u.length,k=Math.ceil(h/te)||1;if(i>k&&(i=k),i<1&&(i=1),h===0){t.innerHTML=`
        <div class="empty-state">
          <div class="empty-state-icon">📦</div>
          <h3>No orders found</h3>
          <p>${n!=="ALL"?`No orders with status "${n}".`:"When you place orders, they'll appear here."}</p>
          ${n!=="ALL"?'<button class="btn btn-secondary" style="margin-top:var(--space-4);" id="reset-filter-btn">Show All Orders</button>':'<a href="#/products" class="btn btn-primary" style="margin-top:var(--space-4);">Start Shopping</a>'}
        </div>`;const q=t.querySelector("#reset-filter-btn");q&&q.addEventListener("click",()=>{r.value="ALL",n="ALL",d()});return}const S=(i-1)*te,$=Math.min(S+te,h),H=u.slice(S,$);t.innerHTML=`
      <div class="flex items-center justify-between" style="margin-bottom:var(--space-4);flex-wrap:wrap;gap:var(--space-2);">
        <span class="text-secondary text-sm">
          Showing <strong>${S+1}–${$}</strong> of <strong>${h}</strong> orders
        </span>
        <span class="badge badge-neutral">Page ${i} of ${k}</span>
      </div>

      <div class="orders-list">
        ${H.map(q=>kt(q)).join("")}
      </div>

      ${k>1?`
        <div class="pagination flex items-center justify-center gap-2" style="margin-top:var(--space-8);flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm" id="prev-page-btn" ${i===1?"disabled":""}>← Previous</button>
          ${ft(i,k)}
          <button class="btn btn-secondary btn-sm" id="next-page-btn" ${i===k?"disabled":""}>Next →</button>
        </div>`:""}
    `;const w=t.querySelector("#prev-page-btn"),z=t.querySelector("#next-page-btn");w&&w.addEventListener("click",()=>{i>1&&(i--,d(),window.scrollTo({top:0,behavior:"smooth"}))}),z&&z.addEventListener("click",()=>{i<k&&(i++,d(),window.scrollTo({top:0,behavior:"smooth"}))}),t.querySelectorAll(".page-num-btn").forEach(q=>{q.addEventListener("click",N=>{const I=parseInt(N.target.dataset.page,10);I&&I!==i&&(i=I,d(),window.scrollTo({top:0,behavior:"smooth"}))})})}try{const u=M();let h=[];if(u&&u.customer_id)try{h=await at(u.customer_id)}catch{h=await fe()}else try{h=await fe()}catch{h=(await Promise.allSettled(yt.map($=>J($)))).filter($=>$.status==="fulfilled").map($=>$.value)}a=(h||[]).sort((k,S)=>new Date(S.order_date)-new Date(k.order_date)),d()}catch(u){t.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h3>Failed to load orders</h3>
        <p>${u.message}</p>
        <button class="btn btn-primary" style="margin-top:var(--space-4);" onclick="location.reload()">Try Again</button>
      </div>`}}function ft(e,t){let o="";for(let s=1;s<=t;s++)s===1||s===t||s>=e-1&&s<=e+1?o+=`<button class="btn btn-sm ${s===e?"btn-primary":"btn-secondary"} page-num-btn" data-page="${s}">${s}</button>`:(s===e-2||s===e+2)&&(o+='<span class="text-secondary" style="padding:0 0.3rem;">...</span>');return o}function kt(e){const t=St(e.status),o=new Date(e.order_date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});return`
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
          <span style="font-size:1.5rem;">${wt(e.product_name)}</span>
          <div>
            <strong>${e.product_name}</strong>
            <div class="text-secondary text-sm">Qty: ${e.quantity} • ${o}</div>
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
    </div>`}function St(e){return{Processing:{badge:"badge-primary",icon:"🔄"},"Order Placed":{badge:"badge-primary",icon:"📋"},Confirmed:{badge:"badge-primary",icon:"✅"},Packed:{badge:"badge-accent",icon:"📦"},Shipped:{badge:"badge-accent",icon:"🚛"},"Out for Delivery":{badge:"badge-warning",icon:"🚚"},Delivered:{badge:"badge-success",icon:"✅"},Cancelled:{badge:"badge-error",icon:"❌"},Returned:{badge:"badge-neutral",icon:"↩️"},"Return Requested":{badge:"badge-warning",icon:"↩️"}}[e]||{badge:"badge-neutral",icon:"📋"}}function wt(e){if(!e)return"📦";const t=e.toLowerCase();return t.includes("headphone")||t.includes("watch")||t.includes("smart")?"🎧":t.includes("shoe")||t.includes("running")?"👟":t.includes("shirt")||t.includes("cotton")?"👔":t.includes("bottle")||t.includes("pillow")?"🏠":"📦"}const xt=["Order Placed","Confirmed","Packed","Shipped","Out for Delivery","Delivered"];async function $t(e,t){var s;const o=(s=t.id)==null?void 0:s.toUpperCase();if(!E()){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required</h3>
            <p>Please log in to view your orders and account information.</p>
            <a href="#/login?redirect=/orders/${o}" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Login to continue</a>
          </div>
        </div>
      </div>`;return}e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <div class="loading-container"><div class="spinner spinner-lg"></div><p>Checking your order...</p></div>
      </div>
    </div>`;try{const r=await J(o);Me(e,r)}catch(r){const a=r.status===403||r.message&&r.message.includes("Access denied");e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <a href="#/orders" class="back-link">&larr; Back to Orders</a>
          <div class="empty-state" style="min-height:50vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>${a?"Order Access Restricted":"Order not found"}</h3>
            <p>${a?"You can only view orders associated with your account.":r.message||"Order not found."}</p>
            <a href="#/orders" class="btn btn-primary" style="margin-top:var(--space-4);">View My Orders</a>
          </div>
        </div>
      </div>`}}function Me(e,t){var n,l;const o=Lt(t.status),s=["Processing","Order Placed","Preparing to Ship"].includes(t.status),r=t.status==="Delivered",a=new Date(t.order_date).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}),i=Ct(t.status);e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <a href="#/orders" class="back-link">&larr; Back to Orders</a>

        <div class="order-detail-header">
          <div>
            <h1>Order ${t.order_id}</h1>
            <p class="text-secondary">Placed on ${a}</p>
          </div>
          <span class="badge ${o.badge}" style="font-size:var(--font-sm);padding:8px 16px;">${o.icon} ${t.status}</span>
        </div>

        <!-- Timeline -->
        <div class="card" style="margin-bottom:var(--space-6);">
          <h3 style="margin-bottom:var(--space-6);">Order Timeline</h3>
          <div class="order-timeline">
            ${xt.map((y,d)=>{const u=d<=i,h=d===i,k=t.status==="Cancelled";return t.status==="Returned"||t.status,k&&d>0?d===1?`
                  <div class="timeline-step cancelled">
                    <div class="timeline-dot cancelled"></div>
                    <div class="timeline-label">
                      <strong>Cancelled</strong>
                      <span>Order has been cancelled</span>
                    </div>
                  </div>`:"":`
                <div class="timeline-step ${u?"complete":""} ${h?"current":""}">
                  <div class="timeline-dot ${u?"complete":""} ${h?"current":""}"></div>
                  <div class="timeline-label">
                    <strong>${y}</strong>
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
              ${s?`
                <button class="btn btn-danger" id="cancel-order-btn" style="width:100%;">
                  ❌ Cancel This Order
                </button>`:""}
              ${r?`
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
            ${!s&&t.status!=="Delivered"&&t.status!=="Cancelled"?`
              <p class="text-secondary text-sm" style="margin-top:var(--space-3);">
                This order cannot be cancelled in its current state (${t.status}).
              </p>`:""}
          </div>
        </div>
      </div>
    </div>`,(n=e.querySelector("#cancel-order-btn"))==null||n.addEventListener("click",async()=>{if(await K({title:`Cancel Order ${t.order_id}?`,message:`Are you sure you want to cancel order ${t.order_id}? Any charged amount will be refunded within 3-5 business days.`,confirmText:"Yes, Cancel Order",type:"danger"}))try{const d=await qe(t.order_id);b(d.message||"Order cancelled successfully","success");const u=await J(t.order_id);Me(e,u)}catch(d){b(d.message||"Failed to cancel order","error")}}),(l=e.querySelector("#ask-ai-order"))==null||l.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-ai-panel"))})}function Lt(e){return{Processing:{badge:"badge-primary",icon:"🔄"},"Order Placed":{badge:"badge-primary",icon:"📋"},Confirmed:{badge:"badge-primary",icon:"✅"},Packed:{badge:"badge-accent",icon:"📦"},Shipped:{badge:"badge-accent",icon:"🚛"},"Out for Delivery":{badge:"badge-warning",icon:"🚚"},Delivered:{badge:"badge-success",icon:"✅"},Cancelled:{badge:"badge-error",icon:"❌"},Returned:{badge:"badge-neutral",icon:"↩️"},"Return Requested":{badge:"badge-warning",icon:"↩️"}}[e]||{badge:"badge-neutral",icon:"📋"}}function Ct(e){return{"Order Placed":0,Processing:0,Confirmed:1,Packed:2,Shipped:3,"Out for Delivery":4,Delivered:5}[e]??-1}async function Tt(e){if(!E()){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required</h3>
            <p>Please log in to view return eligibility and refund details.</p>
            <a href="#/login?redirect=/returns" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Login to continue</a>
          </div>
        </div>
      </div>`;return}const t=window.location.hash,o=t.indexOf("?"),s=o!==-1?new URLSearchParams(t.slice(o)):new URLSearchParams,r=s.get("order")||"",a=s.get("action")||"";e.innerHTML=`
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
                  <input type="text" id="return-order-id" class="form-input" placeholder="e.g. ORD1003" value="${r}" style="max-width:250px;">
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
                <input type="text" id="refund-order-id" class="form-input" placeholder="e.g. ORD1004" value="${a==="refund"?r:""}" style="max-width:250px;">
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
    </div>`;let i="";e.querySelector("#check-eligibility-btn").addEventListener("click",async()=>{const n=e.querySelector("#return-order-id").value.trim().toUpperCase();if(!n){b("Please enter an Order ID","warning");return}i=n;const l=e.querySelector("#eligibility-result"),y=e.querySelector("#return-step-2"),d=e.querySelector("#return-step-3"),u=e.querySelector("#return-result");y.style.display="block",d.style.display="none",u.style.display="none",l.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Checking eligibility...</span></div>';try{const h=await Re(n);h.eligible?(l.innerHTML=`
          <div class="eligibility-card eligible">
            <span class="badge badge-success">✅ Eligible for Return</span>
            <p style="margin-top:var(--space-2);">${h.reason}</p>
            ${h.days_since_delivery!==null?`<p class="text-secondary text-sm">Days since delivery: ${h.days_since_delivery}</p>`:""}
          </div>`,d.style.display="block"):l.innerHTML=`
          <div class="eligibility-card ineligible">
            <span class="badge badge-error">❌ Not Eligible</span>
            <p style="margin-top:var(--space-2);">${h.reason}</p>
          </div>`}catch(h){l.innerHTML=`<div class="eligibility-card ineligible"><span class="badge badge-error">Error</span><p>${h.message}</p></div>`}}),e.querySelector("#submit-return-btn").addEventListener("click",async()=>{const n=e.querySelector("#return-reason").value.trim();if(!n){b("Please enter a reason for return","warning");return}if(!await K({title:"Create Return Request?",message:`Are you sure you want to create a return request for order ${i}?`,confirmText:"Yes, Submit Return",type:"primary"}))return;const y=e.querySelector("#return-result");y.style.display="block",y.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Submitting return request...</span></div>';try{const d=await Oe(i,n);e.querySelector("#return-reason").value="",y.innerHTML=`
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
        </div>`,b("Return request submitted successfully!","success")}catch(d){y.innerHTML=`<div class="eligibility-card ineligible"><span class="badge badge-error">Error</span><p>${d.message}</p></div>`,b(d.message||"Failed to create return","error")}}),e.querySelector("#check-refund-btn").addEventListener("click",async()=>{const n=e.querySelector("#refund-order-id").value.trim().toUpperCase();if(!n){b("Please enter an Order ID","warning");return}const l=e.querySelector("#refund-result");l.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Checking refund status...</span></div>';try{const y=await Pe(n);l.innerHTML=`
        <div class="refund-card card card-elevated">
          <div class="flex items-center gap-3" style="margin-bottom:var(--space-3);">
            <span style="font-size:1.5rem;">💰</span>
            <h4>Refund Status</h4>
          </div>
          <div class="detail-rows">
            <div class="detail-row"><span>Refund ID</span><strong>${y.refund_id}</strong></div>
            <div class="detail-row"><span>Amount</span><strong>₹${y.amount.toLocaleString("en-IN")}</strong></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-primary">${y.refund_status}</span></div>
            <div class="detail-row"><span>Expected</span><span>${y.expected_date||"N/A"}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${y.message}</p>
        </div>`}catch(y){l.innerHTML=`<div class="eligibility-card ineligible"><p>${y.message}</p></div>`}}),e.querySelector("#return-ai-btn").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-ai-panel"))}),r&&a!=="refund"&&e.querySelector("#check-eligibility-btn").click(),r&&a==="refund"&&e.querySelector("#check-refund-btn").click()}async function Et(e){var t,o,s,r;if(!E()){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required</h3>
            <p>Please log in to create and manage support tickets.</p>
            <a href="#/login?redirect=/support" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Login to continue</a>
          </div>
        </div>
      </div>`;return}e.innerHTML=`
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
              <input type="text" id="ticket-customer-id" class="form-input" placeholder="e.g. CUST101" value="${((t=M())==null?void 0:t.customer_id)||""}">
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
    </div>`,(o=e.querySelector("#scroll-to-ticket"))==null||o.addEventListener("click",()=>{var a;(a=e.querySelector("#ticket-create-section"))==null||a.scrollIntoView({behavior:"smooth"})}),(s=e.querySelector("#scroll-to-check"))==null||s.addEventListener("click",()=>{var a;(a=e.querySelector("#ticket-check-section"))==null||a.scrollIntoView({behavior:"smooth"})}),(r=e.querySelector("#open-ai-support"))==null||r.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-ai-panel"))}),e.querySelector("#create-ticket-btn").addEventListener("click",async()=>{const a=e.querySelector("#ticket-customer-id").value.trim(),i=e.querySelector("#ticket-category").value,n=e.querySelector("#ticket-order-id").value.trim(),l=e.querySelector("#ticket-description").value.trim(),y=e.querySelector("#ticket-priority").value,d=e.querySelector("#ticket-create-result");if(!a||!l){b("Please fill Customer ID and Description","warning");return}d.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Creating ticket...</span></div>';try{const u=await Ie({customerId:a,description:l,category:i||void 0,priority:y,orderId:n||void 0});e.querySelector("#ticket-description").value="";const h=e.querySelector("#ticket-order-id");h&&(h.value=""),d.innerHTML=`
        <div class="return-success-card card card-elevated">
          <h4>✅ Ticket Created</h4>
          <div class="detail-rows" style="margin-top:var(--space-3);">
            <div class="detail-row"><span>Ticket ID</span><strong>${u.ticket_id}</strong></div>
            <div class="detail-row"><span>Priority</span><span class="badge badge-primary">${u.priority}</span></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-success">${u.status}</span></div>
            <div class="detail-row"><span>Assigned To</span><span>${u.assigned_to}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${u.message}</p>
        </div>`,b("Support ticket created!","success")}catch(u){d.innerHTML=`<div class="eligibility-card ineligible"><p>${u.message}</p></div>`,b(u.message||"Failed to create ticket","error")}}),e.querySelector("#check-ticket-btn").addEventListener("click",async()=>{const a=e.querySelector("#check-ticket-id").value.trim();if(!a){b("Please enter a Ticket ID","warning");return}const i=e.querySelector("#ticket-check-result");i.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Loading ticket...</span></div>';try{const n=await st(a),l=n.status==="Escalated"?"badge-warning":n.status==="Resolved"?"badge-success":"badge-primary";i.innerHTML=`
        <div class="card card-elevated">
          <div class="detail-rows">
            <div class="detail-row"><span>Ticket</span><strong>${n.ticket_id}</strong></div>
            <div class="detail-row"><span>Status</span><span class="badge ${l}">${n.status}</span></div>
            <div class="detail-row"><span>Priority</span><span class="badge badge-primary">${n.priority}</span></div>
            <div class="detail-row"><span>Category</span><span>${n.category}</span></div>
            <div class="detail-row"><span>Assigned To</span><span>${n.assigned_to}</span></div>
            <div class="detail-row"><span>Description</span><span class="text-sm">${n.description}</span></div>
            ${n.reason_for_escalation?`<div class="detail-row"><span>Escalation Reason</span><span class="text-sm">${n.reason_for_escalation}</span></div>`:""}
          </div>
        </div>`}catch(n){i.innerHTML=`<div class="eligibility-card ineligible"><p>${n.message}</p></div>`}}),e.querySelector("#escalate-btn").addEventListener("click",async()=>{const a=e.querySelector("#escalate-ticket-id").value.trim();if(!a){b("Please enter a Ticket ID","warning");return}if(!await K({title:"Escalate to Human Support?",message:`This will escalate ticket ${a} to a Tier 2 Human Support Agent. Continue?`,confirmText:"Yes, Escalate",type:"primary"}))return;const n=e.querySelector("#escalate-result");n.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Escalating...</span></div>';try{const l=await Ae(a);n.innerHTML=`
        <div class="return-success-card card card-elevated">
          <h4>👨‍💼 Ticket Escalated</h4>
          <div class="detail-rows" style="margin-top:var(--space-3);">
            <div class="detail-row"><span>Ticket</span><strong>${l.ticket_id}</strong></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-warning">${l.status}</span></div>
            <div class="detail-row"><span>Assigned To</span><span>${l.assigned_to}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${l.message}</p>
        </div>`,b("Ticket escalated to human support","success")}catch(l){n.innerHTML=`<div class="eligibility-card ineligible"><p>${l.message}</p></div>`,b(l.message||"Failed to escalate","error")}})}async function qt(e){var r,a;const t=M();if(!E()||!t){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required</h3>
            <p>Please log in to view your account profile.</p>
            <a href="#/login?redirect=/profile" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Log In</a>
          </div>
        </div>
      </div>`;return}const s={CUST101:"Customer / Owner Demo",CUST102:"Administrator",CUST103:"HR / Operations",CUST104:"Support Team",CUST105:"Guest User"}[t.customer_id]||"Customer";e.innerHTML=`
    <div class="page-content">
      <div class="container" style="max-width:800px;">
        <div class="page-header">
          <h1>My Profile</h1>
        </div>

        <div class="card" style="margin-bottom:var(--space-6);">
          <div class="profile-header">
            <div class="profile-avatar">
              <span>${((a=(r=t.name)==null?void 0:r.charAt(0))==null?void 0:a.toUpperCase())||"?"}</span>
            </div>
            <div>
              <h2>${t.name}</h2>
              <div class="flex items-center gap-2" style="margin-top:var(--space-1);">
                <span class="badge badge-primary">${t.customer_id}</span>
                <span class="badge badge-accent">${s}</span>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="detail-rows">
            <div class="detail-row">
              <span>🎭 Role</span>
              <strong>${s}</strong>
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
    </div>`,e.querySelector("#logout-btn").addEventListener("click",()=>{Qe(),b("Logged out successfully","info"),window.location.hash="/login"})}const Rt=[{id:"CUST101",name:"Mahendra Gurjar",role:"Customer / Owner Demo",email:"mahendra.gurjar@shopsathi.ai"},{id:"CUST102",name:"ShopSathi Admin",role:"Administrator",email:"admin@shopsathi.ai"},{id:"CUST103",name:"ShopSathi HR",role:"HR / Operations",email:"hr@shopsathi.ai"},{id:"CUST104",name:"ShopSathi Team",role:"Support Team",email:"team@shopsathi.ai"},{id:"CUST105",name:"Guest",role:"Guest User",email:"guest@shopsathi.ai"}],ae={CUST101:{customer_id:"CUST101",name:"Mahendra Gurjar",role:"Customer / Owner Demo",email:"mahendra.gurjar@shopsathi.ai"},CUST102:{customer_id:"CUST102",name:"ShopSathi Admin",role:"Administrator",email:"admin@shopsathi.ai"},CUST103:{customer_id:"CUST103",name:"ShopSathi HR",role:"HR / Operations",email:"hr@shopsathi.ai"},CUST104:{customer_id:"CUST104",name:"ShopSathi Team",role:"Support Team",email:"team@shopsathi.ai"},CUST105:{customer_id:"CUST105",name:"Guest",role:"Guest User",email:"guest@shopsathi.ai",isGuest:!0}};async function Ot(e){const t=window.location.hash,o=t.indexOf("?"),r=(o!==-1?new URLSearchParams(t.slice(o)):new URLSearchParams).get("redirect")||null;e.innerHTML=`
    <div class="page-content">
      <div class="login-page">
        <div class="login-card card card-elevated">
          <div class="text-center" style="margin-bottom:var(--space-6);">
            ${oe(180)}
            <p class="text-secondary" style="margin-top:var(--space-2);">Smart Shopping. Smarter Support.</p>
          </div>

          <div style="text-center;margin-bottom:var(--space-6);">
            <span class="badge badge-primary" style="font-size:0.75rem;padding:4px 10px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:var(--space-2);display:inline-block;">Demo Login</span>
            <h3 style="margin-bottom:var(--space-2);">Welcome to ShopSathi</h3>
            <p class="text-secondary" style="font-size:0.9rem;">Select a profile or enter a valid Customer ID to continue.</p>
          </div>

          <div class="login-customers" style="display:flex;flex-direction:column;gap:var(--space-3);">
            ${Rt.map(a=>`
              <button class="login-customer-btn card card-hover" data-id="${a.id}" style="display:flex;align-items:center;gap:var(--space-4);padding:var(--space-3) var(--space-4);width:100%;text-align:left;border:1px solid var(--color-border);background:var(--color-surface);">
                <div class="profile-avatar" style="width:42px;height:42px;font-size:1rem;flex-shrink:0;border-radius:50%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;">
                  <span>${a.name.charAt(0)}</span>
                </div>
                <div style="flex:1;">
                  <div style="display:flex;align-items:center;justify-content:space-between;">
                    <strong style="font-size:0.95rem;">${a.name}</strong>
                    <span class="badge ${a.id==="CUST105"?"badge-neutral":"badge-primary"}" style="font-size:0.7rem;padding:2px 6px;">${a.role}</span>
                  </div>
                  <span class="text-secondary text-sm" style="font-size:0.8rem;">${a.id} • ${a.email}</span>
                </div>
              </button>`).join("")}
          </div>

          <div class="divider" style="margin:var(--space-6) 0;"></div>

          <div class="form-group">
            <label class="form-label" style="font-weight:600;">Customer ID</label>
            <div class="flex gap-3">
              <input type="text" id="custom-id-input" class="form-input" placeholder="e.g. CUST101">
              <button class="btn btn-primary" id="custom-login-btn">Login</button>
            </div>
          </div>

          <p class="text-secondary text-sm text-center" style="margin-top:var(--space-6);">
            <em>Hackathon Demo Authentication — select any profile above or enter a valid Customer ID.</em>
          </p>
        </div>
      </div>
    </div>`,e.querySelectorAll(".login-customer-btn").forEach(a=>{a.addEventListener("click",async()=>{await se(a.dataset.id,r)})}),e.querySelector("#custom-login-btn").addEventListener("click",async()=>{const a=e.querySelector("#custom-id-input").value.trim();await se(a,r)}),e.querySelector("#custom-id-input").addEventListener("keydown",async a=>{if(a.key==="Enter"){const i=a.target.value.trim();await se(i,r)}})}async function se(e,t){const o=(e||"").trim().toUpperCase();if(!o){b("Invalid Customer ID. Please select a demo profile or enter a valid Customer ID.","error");return}if(o==="CUST105"||o==="GUEST"){re(ae.CUST105),b("Browsing as Guest","info"),window.location.hash="/products";return}if(!ae[o]){b("Invalid Customer ID. Please select a demo profile or enter a valid Customer ID.","error");return}try{const s=await it(o),r={...ae[o],...s,customer_id:o};re(r),b(`Welcome, ${r.name}`,"success"),t?window.location.hash=t:window.location.hash="/"}catch{b("Invalid Customer ID. Please select a demo profile or enter a valid Customer ID.","error")}}C("/",ot);C("/products",lt);C("/products/:id",vt);C("/cart",ht);C("/checkout",gt);C("/orders",bt);C("/orders/:id",$t);C("/returns",Tt);C("/support",Et);C("/profile",qt);C("/login",Ot);const ce=document.getElementById("app"),Pt=We();ce.appendChild(Pt);const W=document.createElement("main");W.id="main-content";W.setAttribute("role","main");ce.appendChild(W);const It=Xe();ce.appendChild(It);const At=rt();document.body.appendChild(At);Ve(W);
