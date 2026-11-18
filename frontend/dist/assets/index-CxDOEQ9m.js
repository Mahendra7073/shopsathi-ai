(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const ie={};let se=null;function M(e,a){ie[e]=a}function st(){return(window.location.hash.slice(1)||"/").split("?")[0]}function it(e){if(ie[e])return{handler:ie[e],params:{}};for(const[a,n]of Object.entries(ie)){const t=a.split("/").filter(Boolean),i=e.split("/").filter(Boolean);if(t.length!==i.length)continue;const s={};let o=!0;for(let r=0;r<t.length;r++)if(t[r].startsWith(":"))s[t[r].slice(1)]=i[r];else if(t[r]!==i[r]){o=!1;break}if(o)return{handler:n,params:s}}return null}function nt(e){async function a(){const n=st(),t=it(n);if(se&&(se(),se=null),t){const i=await t.handler(e,t.params);typeof i=="function"&&(se=i)}else e.innerHTML=`
        <div class="container page-content">
          <div class="empty-state" style="min-height: 60vh;">
            <div class="empty-state-icon">🔍</div>
            <h3>Page Not Found</h3>
            <p>The page you're looking for doesn't exist.</p>
            <a href="#/" class="btn btn-primary" style="margin-top: var(--space-4);">Go Home</a>
          </div>
        </div>`;window.scrollTo({top:0,behavior:"instant"})}return window.addEventListener("hashchange",a),a(),()=>window.removeEventListener("hashchange",a)}function we(e=140){return`<svg width="${e}" height="${Math.round(e*.3)}" viewBox="0 0 480 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ShopSathi logo">
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
    <text x="75" y="82" font-family="Inter, sans-serif" font-weight="800" font-size="46" fill="#0F172A">Shop<tspan fill="#2563EB">Sathi</tspan> <tspan fill="#06B6D4">AI</tspan></text>
  </svg>`}function rt(e=44){return`<svg width="${e}" height="${e}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ShopSathi icon">
    <rect x="8" y="18" width="48" height="38" rx="10" fill="#2563EB"/>
    <path d="M20 18 C20 6, 44 6, 44 18" stroke="#2563EB" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="32" cy="35" r="7" fill="white"/>
    <path d="M32 24 L32 20" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 50 L32 46" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M21 35 L17 35" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M47 35 L43 35" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M24 27 L21.5 24.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <path d="M40 43 L42.5 45.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
  </svg>`}function F(e=32){return`<svg width="${e}" height="${e}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="9" width="24" height="19" rx="5" fill="#2563EB"/>
    <path d="M10 9 C10 3, 22 3, 22 9" stroke="#2563EB" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="16" cy="17.5" r="3.5" fill="white"/>
    <line x1="16" y1="12" x2="16" y2="10.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="16" y1="24.5" x2="16" y2="23" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="10.5" y1="17.5" x2="9" y2="17.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="23" y1="17.5" x2="21.5" y2="17.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`}function Ne(e=24){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none"/>
  </svg>`}function ne(e=24){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>`}const Ue="shopsathi_cart",J="shopsathi_current_customer",te="shopsathi_user",fe=new Set,Ie={CUST101:{customer_id:"CUST101",name:"Mahendra Gurjar",role:"Customer / Owner Demo",email:"mahendra.gurjar@shopsathi.ai"},CUST102:{customer_id:"CUST102",name:"ShopSathi Admin",role:"Administrator",email:"admin@shopsathi.ai"},CUST103:{customer_id:"CUST103",name:"ShopSathi HR",role:"HR / Operations",email:"hr@shopsathi.ai"},CUST104:{customer_id:"CUST104",name:"Kailash",role:"Team Member (24UCSE4014)",email:"kailash@shopsathi.ai"},CUST105:{customer_id:"CUST105",name:"Guest",role:"Guest User",email:"guest@shopsathi.ai",isGuest:!0}};function ot(e){return fe.add(e),()=>fe.delete(e)}function Fe(e,a){fe.forEach(n=>n(e,a))}function V(){try{const e=localStorage.getItem(J)||localStorage.getItem(te);if(!e)return null;const a=JSON.parse(e);if(!a||!a.customer_id)return localStorage.removeItem(J),localStorage.removeItem(te),null;const n=a.customer_id.toUpperCase();return Ie[n]?{...Ie[n],...a,customer_id:n}:(localStorage.removeItem(J),localStorage.removeItem(te),null)}catch{return localStorage.removeItem(J),localStorage.removeItem(te),null}}function D(){const e=V();return!(!e||e.customer_id==="CUST105"||e.isGuest)}function be(e){localStorage.removeItem(te),e?localStorage.setItem(J,JSON.stringify(e)):localStorage.removeItem(J),Fe("user-changed",e)}function ct(){be(null)}function G(){try{return JSON.parse(localStorage.getItem(Ue))||[]}catch{return[]}}function re(e){localStorage.setItem(Ue,JSON.stringify(e)),Fe("cart-changed",e)}function ke(e,a=1){const n=G(),t=n.find(i=>i.product_id===e.product_id);return t?t.quantity+=a:n.push({product_id:e.product_id,name:e.name,price:e.price,category:e.category,description:e.description,quantity:a}),re(n),n}function Pe(e,a){let n=G();if(a<=0)n=n.filter(t=>t.product_id!==e);else{const t=n.find(i=>i.product_id===e);t&&(t.quantity=a)}return re(n),n}function lt(e){const a=G().filter(n=>n.product_id!==e);return re(a),a}function Ge(){re([])}function dt(){return G().reduce((e,a)=>e+a.quantity,0)}function je(){return G().reduce((e,a)=>e+a.price*a.quantity,0)}function ut(){const e=document.createElement("header");e.className="site-header";function a(){const s=D(),o=V(),r=s?`
      <a href="#/" class="nav-link" data-route="/">Home</a>
      <a href="#/products" class="nav-link" data-route="/products">Products</a>
      <a href="#/orders" class="nav-link" data-route="/orders">My Orders</a>
      <a href="#/returns" class="nav-link" data-route="/returns">Returns</a>
      <a href="#/support" class="nav-link" data-route="/support">Support</a>
    `:`
      <a href="#/" class="nav-link" data-route="/">Home</a>
      <a href="#/products" class="nav-link" data-route="/products">Products</a>
    `,d=s?`
      <a href="#/" class="mobile-nav-link">🏠 Home</a>
      <a href="#/products" class="mobile-nav-link">🛍️ Products</a>
      <a href="#/orders" class="mobile-nav-link">📦 My Orders</a>
      <a href="#/returns" class="mobile-nav-link">↩️ Returns</a>
      <a href="#/support" class="mobile-nav-link">🎫 Support</a>
      <a href="#/cart" class="mobile-nav-link">🛒 Cart</a>
      <a href="#/profile" class="mobile-nav-link">👤 Profile (${(o==null?void 0:o.name)||"Account"})</a>
    `:`
      <a href="#/" class="mobile-nav-link">🏠 Home</a>
      <a href="#/products" class="mobile-nav-link">🛍️ Products</a>
      <a href="#/cart" class="mobile-nav-link">🛒 Cart</a>
      <a href="#/login" class="mobile-nav-link" style="color:var(--color-primary);font-weight:600;">🔑 Login / Profiles</a>
    `,u=s?`
      <a href="#/profile" class="btn-icon header-profile-btn" aria-label="Profile" title="Profile (${o==null?void 0:o.name})">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </a>
    `:`
      <a href="#/login" class="btn btn-outline btn-sm header-login-btn" style="padding:4px 12px;font-size:0.85rem;">Login</a>
    `;e.innerHTML=`
      <div class="header-inner container">
        <a href="#/" class="header-logo" aria-label="ShopSathi Home">
          <span class="header-logo-full">${we(160)}</span>
          <span class="header-logo-compact">${rt(36)}</span>
        </a>

        <nav class="header-nav" id="main-nav" aria-label="Main navigation">
          ${r}
        </nav>

        <div class="header-actions">
          <a href="#/products" class="btn-icon header-search-btn" aria-label="Search products" title="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </a>
          <a href="#/cart" class="btn-icon header-cart-btn" aria-label="Cart" title="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span class="cart-badge" id="header-cart-badge" style="display: none;">0</span>
          </a>
          ${u}
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
        ${d}
        <div class="divider"></div>
        <button class="btn btn-primary btn-lg" style="width:100%;" id="mobile-ai-btn">💬 Ask ShopSathi</button>
      </div>
    `,n()}function n(){var d,u;t(),i();const s=e.querySelector("#hamburger-btn"),o=e.querySelector("#mobile-nav");s==null||s.addEventListener("click",()=>{const c=s.getAttribute("aria-expanded")==="true";s.setAttribute("aria-expanded",!c),s.classList.toggle("open"),o.classList.toggle("open")}),o==null||o.querySelectorAll("a").forEach(c=>{c.addEventListener("click",()=>{s.setAttribute("aria-expanded","false"),s.classList.remove("open"),o.classList.remove("open")})});const r=()=>{window.dispatchEvent(new CustomEvent("open-ai-panel")),s==null||s.setAttribute("aria-expanded","false"),s==null||s.classList.remove("open"),o==null||o.classList.remove("open")};(d=e.querySelector("#header-ai-btn"))==null||d.addEventListener("click",r),(u=e.querySelector("#mobile-ai-btn"))==null||u.addEventListener("click",r)}function t(){const s=dt(),o=e.querySelector("#header-cart-badge");o&&(o.textContent=s,o.style.display=s>0?"flex":"none")}function i(){const s=window.location.hash.slice(1)||"/";e.querySelectorAll(".nav-link, .mobile-nav-link").forEach(o=>{var d;const r=((d=o.getAttribute("href"))==null?void 0:d.replace("#",""))||"";o.classList.toggle("active",s===r||r!=="/"&&s.startsWith(r))})}return a(),ot(s=>{s==="cart-changed"&&t(),s==="user-changed"&&a()}),window.addEventListener("hashchange",i),e}function pt(){const e=document.createElement("footer");return e.className="site-footer",e.innerHTML=`
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          ${we(140)}
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
        <p>&copy; ${new Date().getFullYear()} ShopSathi AI — B.Tech CSE Minor Project | MBM University, Jodhpur | Mahendra Gurjar (24UCSE4018) &amp; Kailash (24UCSE4014)</p>
      </div>
    </div>
  `,e}const vt=typeof window<"u"&&window.__API_BASE__?window.__API_BASE__:typeof window<"u"&&window.location.port==="5173"?"/api":"";class ve extends Error{constructor(a,n,t){super(a),this.status=n,this.data=t}}const qe=new Map,ht=6e4;let Se={endpoint:null,durationMs:0,backendProcessMs:0,fromCache:!1};function mt(){return{...Se}}async function O(e,a={}){const t=(a.method||"GET").toUpperCase()==="GET"&&e.startsWith("/products");if(t){const u=typeof performance<"u"?performance.now():Date.now(),c=qe.get(e);if(c&&Date.now()-c.timestamp<ht){const p=typeof performance<"u"?performance.now():Date.now(),g=parseFloat((p-u).toFixed(3));return Se={endpoint:e,durationMs:g,backendProcessMs:0,fromCache:!0},c.data}}const i=`${vt}${e}`,s=V(),o={"Content-Type":"application/json",...a.headers};D()&&s&&s.customer_id&&(o["X-Customer-ID"]=s.customer_id);const r={...a,headers:o},d=typeof performance<"u"?performance.now():Date.now();try{const u=await fetch(i,r),c=await u.json().catch(()=>null),p=typeof performance<"u"?performance.now():Date.now(),g=Math.round((p-d)*100)/100,f=u.headers?u.headers.get("X-Process-Time"):null,x=f?parseFloat(f):0;if(Se={endpoint:e,durationMs:g,backendProcessMs:x,fromCache:!1},!u.ok){const w=(c==null?void 0:c.detail)||(c==null?void 0:c.message)||"Request failed";throw new ve(w,u.status,c)}return t&&c&&qe.set(e,{data:c,timestamp:Date.now()}),c}catch(u){throw u instanceof ve?u:new ve("Network error. Please check your connection and try again.",0,null)}}async function gt(){return O("/products")}async function ze(e="",a=null,n=null){const t=new URLSearchParams;return e&&t.set("query",e),a&&t.set("max_price",a),n&&t.set("category",n),O(`/products/search?${t.toString()}`)}async function yt(e){return O(`/products/${e}`)}async function Ae(e=null){const a=e?`?customer_id=${e}`:"";return O(`/orders${a}`)}async function oe(e){return O(`/orders/${e}`)}async function Be(e){return O(`/orders/${e}/cancel`,{method:"POST"})}async function ft(e){return O(`/customers/${e}/orders`)}async function Ve(e){return O(`/orders/${e}/return-eligibility`)}async function Ke(e,a){return O("/returns",{method:"POST",body:JSON.stringify({order_id:e,reason:a})})}async function Xe(e){return O(`/orders/${e}/refund`)}async function Ye({customerId:e,description:a,subject:n,category:t,priority:i,orderId:s}){return O("/support/tickets",{method:"POST",body:JSON.stringify({customer_id:e,description:a,subject:n||void 0,category:t||void 0,priority:i||"Medium",order_id:s||void 0})})}async function We(e){return O(`/support/tickets/${e}`)}async function Qe(e,a){return O(`/support/tickets/${e}/escalate`,{method:"POST",body:JSON.stringify({reason:a||void 0})})}async function bt(e){const a=(e||"").trim().toUpperCase();return O(`/customers/${a}`,{headers:{"X-Customer-ID":a}})}const kt=/\bORD\s*(\d{4})\b/i,St=/\bTKT\s*([A-Z0-9]{4,8})\b/i,wt=/^(hi|hello|hey|namaste|namaskar|pranam|hola|greetings)\b/i,xt=/^(नमस्ते|नमस्कार|सुप्रभात|प्रणाम)/u,Ct=/\b(thank\s*you|thanks|dhanyawad|dhanyavaad|shukriya|shukran)\b/i,Lt=/(धन्यवाद|शुक्रिया)/u,$t=/\b(bye|goodbye|tata|see\s*you|alvida)\b/i,Et=/(अलविदा|बाय)/u,Rt=/\b(help|madad|kya\s*kar\s*sakte|what\s*can\s*you\s*do|capabilities|who\s*are\s*you|kaun\s*ho)\b/i,Tt=/\bnoise\s*[- ]?cancell?ing\b/i,Ot=/\b(cancel|cancellation|cancelled|canceling|radd|band\s*karo|rokna)\b/i,It=/(रद्द|कैंसिल|रोकना)/u,Pt=/\b(return|wapas|exchange|lautana|badalna)\b/i,qt=/(वापस|लौटाना|रिटर्न|बदलना)/u,At=/\b(refund|paise|money\s*back|amount\s*back|paisa)\b/i,Dt=/(रिफंड|पैसे|वापसी)/u,Mt=/\b(track|where|kaha|kahan|kidhar|status|delivery|kab\s*aayega|kab\s*deliver|kab\s*pahuchega)\b/i,_t=/(कहाँ|कहा|ट्रैक|स्थिति|पहुंचेगा|कब\s*आएगा|आर्डर)/u,Ht=/\b(human|agent|dispute|complain|complaint|shikayat|fraud|deduct|insan|madad|adhikari|baat\s*karni|customer\s*care|escalat)\b/i,Nt=/(शिकायत|मदद)/u,Ut=/\b(policy|rule|rules|shartein|terms|return\s*policy|refund\s*policy|cancellation\s*policy)\b/i,Ft=/(?:under|below|less\s*than|within|₹|rs\.?)\s*(\d+)/i,Gt=/(\d+)\s*(?:rs|rupees|tak|se\s*kam)/i,jt=/\b(shoe|shoes|sneaker|footwear|running|headphone|headphones|earphone|earphones|shirt|shirts|cloth|clothes|fashion|watch|smartwatch|bottle|bottles|pillow|pillows|product|products|item|items|find|search|under|below|budget|sasta|dikh|dikhao|batao|chahiye|joote|joota|kapde|kapda|botal|takiya|phone|phones|mobile|mobiles|best|available|popular)\b/i,zt=/(जूते|कपड़े|कपड़े|बोतल|तकिया)/u,Bt=/(?:show|me|find|search|please|give|under|below|less than|within|rs\.?|₹|\d+|tak|se kam|kuch|achha|achhe|ache|batao|dikhao|chahiye|product|saman|best|available|top|popular)/gi;function Vt(e){return e?e.replace(/\bORD\s*(\d)(\d)(\d)(\d)\b/gi,"O R D $1 $2 $3 $4").replace(/\bORD\s*(\d{4})\b/gi,(a,n)=>`O R D ${n.split("").join(" ")}`).replace(/\bTKT\s*([A-Z0-9]+)\b/gi,(a,n)=>`T K T ${n.split("").join(" ")}`).replace(/\bRET\s*(\d+)\b/gi,(a,n)=>`R E T ${n.split("").join(" ")}`).replace(/\bREF\s*(\d+)\b/gi,(a,n)=>`R E F ${n.split("").join(" ")}`).replace(/₹\s*([0-9,]+)/g,"$1 rupees").replace(/rs\.?\s*([0-9,]+)/gi,"$1 rupees").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/[*_#•`~>]/g,"").replace(/\s+/g," ").trim():""}async function De(e){const a=typeof performance<"u"?performance.now():Date.now();if(!e||typeof e!="string"||!e.trim())return{text:"Kripya apna sawaal ya Order ID likhein (jaise: *'Where is my order ORD1001?'* ya *'Running shoes under 2000'*).",diagnostics:{intentDetectionMs:.1,apiLatencyMs:0,backendProcessMs:0,fromCache:!1,totalResponseMs:.2}};const n=e.trim(),t=n.toLowerCase(),i=n.match(kt),s=i?`ORD${i[1]}`:null,o=n.match(St),r=o?`TKT${o[1].toUpperCase()}`:null,d=wt.test(t)||xt.test(t)||Rt.test(t),u=Mt.test(t)||_t.test(t),c=Pt.test(t)||qt.test(t),p=At.test(t)||Dt.test(t),f=!Tt.test(t)&&(Ot.test(t)||It.test(t)),x=Ht.test(t)||Nt.test(t),w=Ct.test(t)||Lt.test(t),Y=$t.test(t)||Et.test(t),W=Ut.test(t),j=jt.test(t)||zt.test(t),$=(typeof performance<"u"?performance.now():Date.now())-a,K=$<.001?.001:parseFloat($.toFixed(3));function h(l,C=[]){const z=(typeof performance<"u"?performance.now():Date.now())-a,N=z<.001?.001:parseFloat(z.toFixed(3)),I=mt();return{text:l,actions:C,diagnostics:{intentDetectionMs:K,apiLatencyMs:I.durationMs||0,backendProcessMs:I.backendProcessMs||0,fromCache:I.fromCache||!1,totalResponseMs:N}}}if(w&&!s&&!r&&!c&&!f&&!p)return h("Aapka swagat hai! (You're welcome!) 🙏 ShopSathi aapki sewa me hamesha hazir hai. Kya aapko kisi aur cheez me madad chahiye?",[{label:"📦 My Orders",url:"#/orders"},{label:"🛍️ Shop Products",url:"#/products"}]);if(Y&&!s&&!r)return h("Alvida! ShopSathi use karne ke liye dhanyawad. Have a wonderful day ahead! 🙏",[{label:"🛍️ Return to Store",url:"#/"}]);if(W&&!s&&!r)return h(`📜 **ShopSathi Store Policies**:

• **Return Window**: 7 days from the delivery date for eligible categories.
• **Condition**: Product must be unused with original packaging and tags intact.
• **Non-Returnable Items**: Water bottles, pillows, and personal hygiene items.
• **Refund Timeline**: 3-5 working days directly to source payment account upon QC verification.
• **Cancellation**: Orders in *Processing* or *Confirmed* state can be cancelled instantly with full refund.`,[{label:"↩️ Returns Page",url:"#/returns"},{label:"📦 View Orders",url:"#/orders"}]);if(d&&!s&&!r&&!c&&!f&&!p){const l=V(),C=D()&&l&&l.name?` **${l.name}**`:"";return h(`Namaste${C}! Main ShopSathi AI Assistant hoon. 🙏

Main aapki in sabhi cheezon me madad kar sakta hoon:
• **Order Track**: *'Where is my order ORD1001?'* ya *'ORD1001 kaha hai?'*
• **Return & Exchange**: *'ORD1003 return karna hai'*
• **Refund Status**: *'Check refund for ORD1004'*
• **Order Cancellation**: *'Cancel order ORD1005'*
• **Product Search**: *'Running shoes under 2000'* ya *'Noise cancelling headphones'*
• **Ticket Status**: *'Check ticket TKT9001'*
• **Human Escalation**: *'Payment issue, talk to human agent'*`,[{label:"📦 Track ORD1001",url:"#/orders/ORD1001"},{label:"👟 Shoes under ₹2000",url:"#/products?category=Footwear"},{label:"🎫 Support Center",url:"#/support"}])}const Q=s||r||u||c||p||f||t.includes("ticket");if(!D()&&Q&&!j)return h(`🔒 **Login Required**

Apne orders, returns, refunds ya support tickets access karne ke liye kripya login karein.`,[{label:"🔑 Login to continue",url:"#/login?redirect=/orders"}]);if(r&&(u||t.includes("ticket")||t.includes("check")||t.includes("status")||t.includes("kya hai")||t.includes("detail")))try{const l=await We(r);return h(`🎫 **Support Ticket Details (${l.ticket_id})**

- **Category**: ${l.category||l.subject}
- **Priority**: ${l.priority}
- **Status**: **${l.status}**
- **Assigned To**: ${l.assigned_to||"AI Support"}
${l.order_id?`- **Linked Order**: ${l.order_id}
`:""}- **Description**: ${l.description}
${l.reason_for_escalation?`- **Escalation Reason**: ${l.reason_for_escalation}
`:""}
${l.message||""}`,[{label:"View in Support Center",url:"#/support"}])}catch(l){return l.status===401?h(`🔒 **Login Required**

Please log in to view ticket details.`,[{label:"Login to continue",url:"#/login?redirect=/support"}]):l.status===403?h(`🔒 **Ticket Access Restricted**

Aap sirf apne account ke create kiye hue support tickets dekh sakte hain.`):h(`Ticket **${r}** nahi mila. Kripya apna Ticket ID check karein ya [Support Center](#/support) me naya ticket banayein.`)}if(s&&u&&!c&&!p&&!f)try{const l=await oe(s);return h(`Aapka order **${l.order_id}** (${l.product_name}) filhaal **${l.status}** hai.

📅 Expected Delivery: **${l.expected_delivery||"Soon"}**
💰 Amount: ₹${l.amount.toLocaleString("en-IN")}
📍 Shipping Partner: BlueDart Express`,[{label:`View Timeline for ${l.order_id}`,url:`#/orders/${l.order_id}`}])}catch(l){return l.status===401?h(`🔒 **Login Required**

Please log in to access your order information.`,[{label:"Login to continue",url:"#/login"}]):l.status===403?h(`🔒 **Order Access Restricted**

You can only view orders associated with your account.`):h(`Order **${s}** nahi mila. Kripya apna Order ID check karein.`)}if(s&&c)try{const l=await Ve(s);if(l.eligible){const C=n.replace(new RegExp(`.*${s}`,"i"),"").replace(/(?:return|wapas|exchange|karna|hai|please|karo|chahiye|de do|reason|size)/gi,"").trim()||"Size issue / Not as expected",T=await Ke(s,C);return h(`✅ Order **${s}** return ke liye eligible hai!

Maine aapka Return Request submit kar diya hai:
🆔 **Return ID: ${T.return_id}**
📝 **Reason**: ${C}
🚚 Pickup agle 24-48 ghanto me schedule ho jayega.`,[{label:"Check Returns & Refunds",url:`#/returns?order=${s}`}])}else return h(`⚠️ Order **${s}** return ke liye eligible nahi hai.

**Reason**: ${l.reason}`,[{label:"View Return Policy",url:"#/returns"}])}catch(l){return l.status===401?h(`🔒 **Login Required**

Please log in to request returns.`,[{label:"Login to continue",url:"#/login"}]):l.status===403?h(`🔒 **Order Access Restricted**

You can only return orders associated with your account.`):h(`Return check failed: ${l.message}`)}if(s&&p)try{const l=await Xe(s);return h(`💰 **Refund Status for ${s}**

- Refund ID: **${l.refund_id}**
- Amount: **₹${l.amount.toLocaleString("en-IN")}**
- Status: **${l.refund_status}**
- Expected Date: **${l.expected_date||"N/A"}**

${l.message}`,[{label:"View Refund Details",url:`#/returns?order=${s}&action=refund`}])}catch(l){return l.status===401?h(`🔒 **Login Required**

Please log in to check refund status.`,[{label:"Login to continue",url:"#/login"}]):l.status===403?h(`🔒 **Order Access Restricted**

You can only check refunds for orders associated with your account.`):h(`Order **${s}** ke liye refund details: ${l.message}`)}if(s&&f)try{const l=await Be(s);return h(`❌ ${l.message}

Agar payment ho chuka tha toh 3-5 working days me aapke source account me refund aa jayega.`,[{label:"View Order Status",url:`#/orders/${s}`}])}catch(l){return l.status===401?h(`🔒 **Login Required**

Please log in to cancel orders.`,[{label:"Login to continue",url:"#/login"}]):l.status===403?h(`🔒 **Order Access Restricted**

You can only cancel orders associated with your account.`):h(`Order **${s}** cancel nahi ho saka: ${l.message}`)}if(!s&&!r){if(u&&(t.includes("order")||t.includes("parcel")||t.includes("package")||t.includes("saman")||t.includes("shipment")))return h("Aapko kaunsa order track karna hai? Kripya apna **Order ID** batayein (jaise **ORD1001**), ya [My Orders](#/orders) page par apna order select karein.",[{label:"📦 Open My Orders",url:"#/orders"}]);if(c)return h("Aapko kaunsa product return karna hai? Kripya apna **Order ID** batayein (jaise **ORD1003**), ya [Returns & Refunds](#/returns) page par return initiate karein.",[{label:"↩️ Open Returns Page",url:"#/returns"}]);if(f)return h("Aap kaunsa order cancel karna chahte hain? Kripya apna **Order ID** batayein (jaise **ORD1005**). Dhyan rahe sirf **Processing** aur **Confirmed** orders hi cancel ho sakte hain.",[{label:"📦 View Orders to Cancel",url:"#/orders"}]);if(p)return h("Refund status check karne ke liye kripya apna **Order ID** batayein (jaise **ORD1004**), ya [Returns & Refunds](#/returns) page par refund status check karein.",[{label:"💰 Check Refunds",url:"#/returns?action=refund"}]);if(t.includes("ticket status")||t.includes("check ticket")||t.includes("ticket check")||t.includes("mera ticket"))return h("Kripya apna **Ticket ID** batayein (jaise **TKT9001**), ya [Support Center](#/support) page par apne active tickets dekhein.",[{label:"🎫 Open Support Center",url:"#/support"}])}if((j||t.includes("batao")||t.includes("chahiye")||t.includes("dikhao")||t.includes("sasta")||t.includes("price")||t.includes("cost")||t.includes("range")||t.includes("best")||t.includes("popular"))&&!c&&!f&&!p&&!r){const l=n.match(Ft)||n.match(Gt),C=l?parseFloat(l[1]):null;let T=null;t.includes("shoe")||t.includes("footwear")||t.includes("sneaker")||t.includes("running")||t.includes("joote")||t.includes("joota")||t.includes("जूते")?T="Footwear":t.includes("headphone")||t.includes("earphone")||t.includes("audio")||t.includes("watch")||t.includes("smartwatch")||t.includes("electronics")||t.includes("gadget")||t.includes("ghadi")||t.includes("घड़ी")||t.includes("phone")||t.includes("mobile")?T="Electronics":t.includes("shirt")||t.includes("cloth")||t.includes("clothes")||t.includes("fashion")||t.includes("apparel")||t.includes("casual")||t.includes("kapde")||t.includes("tshirt")||t.includes("kurta")||t.includes("कपड़े")||t.includes("कपड़े")?T="Fashion":(t.includes("bottle")||t.includes("pillow")||t.includes("foam")||t.includes("botal")||t.includes("takiya")||t.includes("home")||t.includes("बोतल")||t.includes("तकिया"))&&(T="Home");const z=n.replace(Bt,"").trim();try{const N=await ze(z,C,T);if(N&&N.length>0){const I=N.slice(0,3).map(U=>`• **${U.name}** — ₹${U.price.toLocaleString("en-IN")} (*${U.category}*)`).join(`
`);return h(`Here is what I found for you in our catalog:

${I}`,[...N.slice(0,2).map(U=>({label:`View ${U.name.slice(0,20)}...`,url:`#/products/${U.product_id}`})),{label:"🛍️ All Products",url:"#/products"}])}else return h("Aapke search ke anusaar koi product nahi mila. Aap hamare catalog me **Shoes**, **Headphones**, **Smartwatches**, **Shirts**, ya **Memory Foam Pillows** search kar sakte hain.",[{label:"🛍️ Browse All Products",url:"#/products"}])}catch{}}if(x){const l=V();if(!D()||!l||!l.customer_id)return h(`🔒 **Login Required**

Support ticket create karne ya human agent se judne ke liye kripya login karein.`,[{label:"🔑 Login to continue",url:"#/login?redirect=/support"}]);try{const C=await Ye({customerId:l.customer_id,description:n,category:t.includes("payment")?"Payment Issue":t.includes("ship")||t.includes("delay")?"Shipping Delay":"General Support",priority:"High",orderId:s||void 0});return t.includes("human")||t.includes("agent")||t.includes("escalate")||t.includes("baat karni")||t.includes("insan")||t.includes("adhikari")?(await Qe(C.ticket_id,"Customer explicitly requested Tier 2 Human Support assistance."),h(`I understand your concern. I have created **Support Ticket ${C.ticket_id}** and escalated it directly to our **Tier 2 Human Support Manager**.

A human representative will review your issue and reach out shortly.`,[{label:`Check Ticket ${C.ticket_id}`,url:"#/support"}])):h(`I have created Support Ticket **${C.ticket_id}** for you with High priority.

Status: **${C.status}** (Assigned to: ${C.assigned_to})`,[{label:"View in Support Center",url:"#/support"}])}catch(C){return h(`Ticket note: ${C.message}`)}}return h(`Main aapka sawaal samajh nahi paaya. Main ShopSathi AI Assistant hoon, aur main in cheezon me madad kar sakta hoon:

• **Order Track**: *'Where is my order ORD1001?'*
• **Return Item**: *'ORD1003 return karna hai'*
• **Refund Status**: *'Check refund for ORD1004'*
• **Cancel Order**: *'Cancel order ORD1005'*
• **Search Products**: *'Show running shoes under 2000'*
• **Ticket Status**: *'Check ticket TKT9001'*
• **Human Agent**: *'Talk to human support'*`,[{label:"📦 My Orders",url:"#/orders"},{label:"🛍️ Explore Catalog",url:"#/products"},{label:"🎫 Support Center",url:"#/support"}])}function Kt(){const e=document.createElement("div");e.className="ai-launcher-wrapper",e.innerHTML=`
    <!-- Floating Button -->
    <button class="ai-fab" id="ai-fab" aria-label="Ask ShopSathi AI">
      <span class="ai-fab-icon">${Ne(24)}</span>
      <span class="ai-fab-label">Ask ShopSathi</span>
    </button>

    <!-- Quick menu -->
    <div class="ai-menu" id="ai-menu">
      <div class="ai-menu-header">
        <div class="flex items-center gap-3">
          ${F(28)}
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
            <span>AI Assistant • Instant API actions</span>
          </div>
        </button>
        <button class="ai-option-btn" id="ai-open-voice">
          <span class="ai-option-icon">🎙️</span>
          <div>
            <strong>Talk to ShopSathi Voice</strong>
            <span>Web Speech Engine • Hands-Free Voice</span>
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
          ${F(28)}
          <div>
            <h4 style="margin:0;font-size:0.95rem;">ShopSathi Chat Agent</h4>
            <div class="flex items-center gap-1">
              <span class="badge badge-success" style="font-size:0.65rem;padding:2px 6px;">● Online</span>
              <span style="font-size:0.65rem;color:var(--color-text-tertiary);">Interactive Assistant</span>
            </div>
          </div>
        </div>
        <div class="flex gap-1 items-center">
          <button class="btn-icon" id="ai-panel-voice" aria-label="Switch to voice" title="Switch to Real-Time Voice" style="color:var(--color-accent);">${ne(18)}</button>
          <button class="btn-icon" id="ai-panel-close" aria-label="Close" style="font-size:1.3rem;opacity:0.6;">&times;</button>
        </div>
      </div>
      <div class="ai-panel-body" id="ai-chat-body">
        <div class="ai-message ai-message-bot">
          <div class="ai-avatar">${F(24)}</div>
          <div class="ai-bubble">
            <p>Namaste! I'm <strong>ShopSathi</strong>, your smart shopping & support assistant. 🙏</p>
            <p style="margin-top:8px;">You can ask me in English, Hindi, or Hinglish to:</p>
            <ul style="margin-top:6px;padding-left:16px;font-size:0.85rem;line-height:1.6;">
              <li>Track order: <em>"Mera order ORD1001 kaha hai?"</em></li>
              <li>Return product: <em>"ORD1003 return karna hai"</em></li>
              <li>Check refund: <em>"ORD1004 ka refund status kya hai?"</em></li>
              <li>Search products: <em>"Show running shoes under 2000"</em></li>
              <li>Check ticket: <em>"Status of ticket TKT9001"</em></li>
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
        <button class="ai-chip" data-msg="Check ticket status TKT9001">🎫 Ticket TKT9001</button>
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
          ${F(28)}
          <div>
            <h4 style="margin:0;font-size:0.95rem;">ShopSathi Voice Agent</h4>
            <div class="flex items-center gap-1">
              <span class="badge badge-accent" style="font-size:0.65rem;padding:2px 6px;">Real-Time Voice</span>
              <span style="font-size:0.65rem;color:var(--color-text-tertiary);">Web Speech API</span>
            </div>
          </div>
        </div>
        <button class="btn-icon" id="ai-voice-close" aria-label="Close" style="font-size:1.3rem;opacity:0.6;">&times;</button>
      </div>
      <div class="ai-voice-body">
        <!-- Voice Language Selector -->
        <div class="voice-lang-bar" style="display:flex;gap:8px;justify-content:center;margin-bottom:12px;">
          <button class="btn btn-sm btn-primary voice-lang-btn" id="lang-en" data-lang="en-IN" style="font-size:0.75rem;padding:3px 10px;">English / Hinglish (en-IN)</button>
          <button class="btn btn-sm btn-outline voice-lang-btn" id="lang-hi" data-lang="hi-IN" style="font-size:0.75rem;padding:3px 10px;">हिंदी (hi-IN)</button>
        </div>

        <div class="ai-voice-visual">
          <div class="ai-voice-ring" id="voice-ring"></div>
          <div class="ai-voice-icon" id="voice-icon">${ne(44)}</div>
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
            ${ne(20)} Start Conversation
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
          <span style="font-size:0.75rem;color:var(--color-text-tertiary);">For further assistance, contact support:</span>
          <span class="voice-phone-link" style="font-size:0.85rem;font-weight:600;color:var(--color-primary);">
            📧 support@shopsathi.ai
          </span>
        </div>

        <div class="ai-voice-info-chips">
          <button class="ai-chip voice-demo-chip" data-speak="Mera order ORD1001 kaha hai?">"Mera order ORD1001 kaha hai?"</button>
          <button class="ai-chip voice-demo-chip" data-speak="ORD1003 return karna hai">"ORD1003 return karna hai"</button>
          <button class="ai-chip voice-demo-chip" data-speak="Check refund status for ORD1004">"Check refund for ORD1004"</button>
          <button class="ai-chip voice-demo-chip" data-speak="Show me running shoes under 2000">"Shoes under 2000"</button>
          <button class="ai-chip voice-demo-chip" data-speak="Human support se baat karni hai">"Human agent se baat karni hai"</button>
        </div>
      </div>
    </div>
  `;let a=!1,n=!1,t=!1,i=!1,s=!1,o=!1,r=!1,d="en-IN",u=null,c=typeof window<"u"?window.speechSynthesis:null;const p=e.querySelector("#ai-fab"),g=e.querySelector("#ai-menu"),f=e.querySelector("#ai-panel"),x=e.querySelector("#ai-voice-panel");function w(){a=n=t=!1,g.classList.remove("open"),f.classList.remove("open"),x.classList.remove("open"),p.classList.remove("active"),i&&ee(!0)}function Y(){w(),a=!0,g.classList.add("open"),p.classList.add("active")}function W(){var v;w(),n=!0,f.classList.add("open"),p.classList.add("active"),(v=e.querySelector("#ai-chat-input"))==null||v.focus()}function j(){w(),t=!0,x.classList.add("open"),p.classList.add("active")}p.addEventListener("click",()=>{a||n||t?w():Y()}),e.querySelector("#ai-menu-close").addEventListener("click",w),e.querySelector("#ai-panel-close").addEventListener("click",w),e.querySelector("#ai-voice-close").addEventListener("click",w),e.querySelector("#ai-open-chat").addEventListener("click",W),e.querySelector("#ai-open-voice").addEventListener("click",j),e.querySelector("#ai-panel-voice").addEventListener("click",j),e.querySelectorAll(".ai-menu-options + .ai-quick-actions .ai-chip").forEach(v=>{v.addEventListener("click",()=>{const m=v.dataset.action;w();const y={track:"#/orders",cancel:"#/orders",return:"#/returns",refund:"#/returns",search:"#/products",ticket:"#/support"};y[m]&&(window.location.hash=y[m])})});const q=e.querySelector("#ai-chat-input"),$=e.querySelector("#ai-chat-body"),K=e.querySelector("#ai-send-btn");async function h(v){if(!v||!v.trim())return;const m=v.trim(),y=document.createElement("div");y.className="ai-message ai-message-user",y.innerHTML=`<div class="ai-bubble">${he(m)}</div>`,$.appendChild(y),q.value="",$.scrollTop=$.scrollHeight;const b=document.createElement("div");b.className="ai-message ai-message-bot",b.innerHTML=`<div class="ai-avatar">${F(24)}</div><div class="ai-bubble ai-typing"><span></span><span></span><span></span></div>`,$.appendChild(b),$.scrollTop=$.scrollHeight;try{const k=await De(m);b.remove();const A=document.createElement("div");A.className="ai-message ai-message-bot";let at=Xt(k.text),Te="";k.actions&&k.actions.length>0&&(Te=`<div class="ai-bubble-actions" style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;">
          ${k.actions.map(Oe=>`<a href="${Oe.url}" class="btn btn-outline btn-sm" style="font-size:0.75rem;padding:4px 8px;">${Oe.label}</a>`).join("")}
        </div>`),A.innerHTML=`
        <div class="ai-avatar">${F(24)}</div>
        <div class="ai-bubble">
          ${at}
          ${Te}
        </div>`,$.appendChild(A),$.scrollTop=$.scrollHeight}catch{b.remove();const A=document.createElement("div");A.className="ai-message ai-message-bot",A.innerHTML=`
        <div class="ai-avatar">${F(24)}</div>
        <div class="ai-bubble" style="border-left:3px solid var(--color-error);">
          <p>Sorry, I encountered an issue processing that. Please try again or check your connection.</p>
        </div>`,$.appendChild(A),$.scrollTop=$.scrollHeight}}K.addEventListener("click",()=>h(q.value)),q.addEventListener("keydown",v=>{v.key==="Enter"&&h(q.value)}),e.querySelectorAll(".ai-panel-chips .ai-chip").forEach(v=>{v.addEventListener("click",()=>h(v.dataset.msg))});const Q=e.querySelector("#voice-start-btn"),Ce=e.querySelector("#voice-stop-btn"),l=e.querySelector("#voice-mute-btn"),C=e.querySelector("#mute-label"),T=e.querySelector("#voice-speaker-btn"),z=e.querySelector("#voice-active-controls"),N=e.querySelector("#voice-status"),I=e.querySelector("#voice-hint"),U=e.querySelector("#voice-state-badge"),ae=e.querySelector("#voice-ring"),Le=e.querySelector("#voice-transcript-box"),Ze=e.querySelector("#voice-user-transcript"),et=e.querySelector("#voice-agent-transcript"),E=e.querySelector("#lang-en"),R=e.querySelector("#lang-hi");let B=!1,P=!1,_=[];function de(){c&&c.getVoices&&(_=c.getVoices()||[])}c&&(de(),typeof c.onvoiceschanged<"u"&&(c.onvoiceschanged=()=>de()));function tt(v){if((!_||_.length===0)&&de(),!_||_.length===0)return null;const m=(v||"en-IN").toLowerCase(),y=m.split("-")[0];let b=_.find(k=>k.lang&&k.lang.toLowerCase()===m);return b||(b=_.find(k=>k.lang&&k.lang.toLowerCase().startsWith(y)),b)||y==="en"&&(b=_.find(k=>k.lang&&(k.lang.includes("en-GB")||k.lang.includes("en-US"))),b)?b:_.find(k=>k.default)||_[0]||null}function $e(v){if(d=v,v==="hi-IN"?(R==null||R.classList.remove("btn-outline"),R==null||R.classList.add("btn-primary"),E==null||E.classList.remove("btn-primary"),E==null||E.classList.add("btn-outline"),I&&(I.textContent="हिंदी वॉइस इनपुट सक्रिय (hi-IN)")):(E==null||E.classList.remove("btn-outline"),E==null||E.classList.add("btn-primary"),R==null||R.classList.remove("btn-primary"),R==null||R.classList.add("btn-outline"),I&&(I.textContent="Supports English & Hinglish voice input (en-IN)")),u){const m=B;Z(),u.lang=d,m&&i&&!s&&!P&&!r&&setTimeout(()=>H(),100)}}E==null||E.addEventListener("click",()=>$e("en-IN")),R==null||R.addEventListener("click",()=>$e("hi-IN"));function L(v,m,y){const b={Ready:"badge-neutral",Connecting:"badge-warning",Connected:"badge-success",Listening:"badge-accent",Processing:"badge-primary",Speaking:"badge-success",Error:"badge-error",Ended:"badge-neutral"};U.className=`badge ${b[v]||"badge-neutral"}`,U.textContent=v,m&&(N.textContent=m),y&&(I.textContent=y),ae.className="ai-voice-ring",v==="Connecting"||v==="Processing"?ae.classList.add("active"):v==="Listening"?ae.classList.add("listening"):v==="Speaking"&&ae.classList.add("speaking")}function H(){if(!(!i||s||P||r||B)&&!(!u&&(u=Ee(),!u)))try{u.start()}catch{}}function Z(){if(u&&B)try{u.stop()}catch{}B=!1}async function ue(v,m){if(et.innerHTML=`<strong>ShopSathi:</strong> ${he(v)}`,o||!c){P=!1,r=!1,i&&!s&&(L("Listening",o?"Speaker Muted (Text Displayed)":"Speech Output Unavailable","Listening for your voice..."),H()),m&&m();return}c.cancel(),P=!0,Z(),L("Speaking","ShopSathi is speaking...","Voice Agent Active • Synthesizing Speech");const y=Vt(v),b=new SpeechSynthesisUtterance(y);b.lang=d,b.rate=1,b.pitch=1;const k=tt(d);k&&(b.voice=k),b.onend=()=>{P=!1,r=!1,i&&!s&&(L("Listening","Listening for your voice...","Speak in English, Hindi, or Hinglish"),H()),m&&m()},b.onerror=()=>{P=!1,r=!1,i&&!s&&(L("Listening","Listening...","Tap mute or speak"),H()),m&&m()},c.speak(b)}async function pe(v){if(!v||!v.trim()||r)return;const m=typeof performance<"u"?performance.now():Date.now();r=!0,Z(),L("Processing","Processing with ShopSathi AI...","Executing API tools..."),Ze.innerHTML=`<strong>You:</strong> "${he(v)}"`,Le.style.display="block";try{const y=await De(v),b=typeof performance<"u"?performance.now():Date.now(),k=Math.round(b-m);I&&y.diagnostics&&(I.textContent=`⚡ E2E Latency: ${k}ms (Intent: ${y.diagnostics.intentDetectionMs}ms | API: ${y.diagnostics.apiLatencyMs}ms)`),await ue(y.text)}catch{r=!1,await ue("Sorry, I encountered an issue processing that. Please try again.")}}function Ee(){const v=typeof window<"u"?window.SpeechRecognition||window.webkitSpeechRecognition:null;if(!v)return L("Error","Speech Recognition Not Supported","Browser does not support Web Speech API. Please use Google Chrome or Microsoft Edge."),null;try{const m=new v;return m.continuous=!0,m.interimResults=!1,m.lang=d,m.onstart=()=>{B=!0,!P&&!r&&L("Listening","Listening for your voice...","Speak in English, Hindi, or Hinglish")},m.onresult=y=>{if(!y.results||y.results.length===0)return;const b=y.results.length-1,k=y.results[b];if(!k||!k[0])return;const A=k[0].transcript;A&&A.trim()&&!r&&pe(A.trim())},m.onerror=y=>{B=!1,y.error==="not-allowed"||y.error==="permission-denied"?(L("Error","Microphone Access Denied","Please allow microphone access in your browser settings (click the lock/mic icon in the address bar)."),ee(!1)):y.error==="audio-capture"?(L("Error","No Microphone Detected","No audio capture device found. Please connect a microphone."),ee(!1)):y.error==="network"?(L("Error","Network Error","Speech recognition requires an active internet connection."),ee(!1)):y.error==="no-speech"?i&&!s&&!r&&!P&&(L("Listening","Listening for speech...","Please speak clearly into your microphone"),H()):i&&!P&&!r&&H()},m.onend=()=>{B=!1,i&&!s&&!r&&!P&&setTimeout(()=>H(),150)},m}catch(m){return L("Error","Microphone Initialization Failed",m.message),null}}function Re(){if(i=!0,s=!1,r=!1,P=!1,B=!1,Le.style.display="block",!(typeof window<"u"?window.SpeechRecognition||window.webkitSpeechRecognition:null)){i=!1,L("Error","Speech Recognition Not Supported","Browser does not support Web Speech API. Please use Google Chrome or Microsoft Edge.");return}if(Q.style.display="none",z.style.display="flex",L("Connecting","Initializing Voice Agent...","Requesting microphone permission..."),u=Ee(),!u){i=!1,z.style.display="none",Q.style.display="inline-flex";return}ue(d==="hi-IN"?"नमस्ते! शॉपसाथी वॉइस सपोर्ट में आपका स्वागत है। मैं आपकी क्या मदद कर सकता हूँ?":"Namaste! ShopSathi Voice Support is active. How can I help you today?",()=>{H()})}function ee(v=!0){i=!1,r=!1,P=!1,c&&c.cancel(),Z(),u=null,z.style.display="none",Q.style.display="inline-flex",v&&L("Ended","Call ended","Tap Start Conversation to reconnect")}return Q.addEventListener("click",Re),Ce.addEventListener("click",()=>ee(!0)),l.addEventListener("click",()=>{s=!s,s?(C.textContent="Unmute",l.classList.add("btn-danger"),Z(),L("Connected","Microphone Muted","Tap Unmute to speak")):(C.textContent="Mute",l.classList.remove("btn-danger"),L("Listening","Listening...","Speak now"),H())}),T.addEventListener("click",()=>{o=!o,o?(T.innerHTML="🔇 Speaker Off",T.classList.add("btn-warning"),c&&c.speaking&&c.cancel(),P=!1,L("Listening","Speaker Muted","Audio responses will appear as text only"),H()):(T.innerHTML="🔊 Speaker",T.classList.remove("btn-warning"),L("Listening","Speaker Active","Listening for speech"))}),e.querySelectorAll(".voice-demo-chip").forEach(v=>{v.addEventListener("click",()=>{const m=v.dataset.speak;i?pe(m):(Re(),setTimeout(()=>pe(m),1500))})}),window.addEventListener("open-ai-panel",()=>{n||t||Y()}),e}function he(e){if(!e)return"";const a=document.createElement("div");return a.textContent=e,a.innerHTML}function Xt(e){return e?e.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"<br><br>").replace(/\n/g,"<br>"):""}async function Yt(e){var n,t,i,s,o;e.innerHTML=`
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
                  ${Ne(18)} Ask ShopSathi
                </button>
              </div>
              <button class="hero-voice-cta" id="hero-voice-btn">
                ${ne(16)}
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
                  <div class="hero-card-icon">${F(28)}</div>
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
                  <div class="ai-avatar" style="width:28px;height:28px;">${F(24)}</div>
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
  `;const a=()=>window.dispatchEvent(new CustomEvent("open-ai-panel"));(n=e.querySelector("#hero-ai-btn"))==null||n.addEventListener("click",a),(t=e.querySelector("#hero-voice-btn"))==null||t.addEventListener("click",a),(i=e.querySelector("#cta-chat-btn"))==null||i.addEventListener("click",a),(s=e.querySelector("#cta-voice-btn"))==null||s.addEventListener("click",a),(o=e.querySelector("#feature-voice-card"))==null||o.addEventListener("click",a)}let X=null;function Wt(){return X||(X=document.createElement("div"),X.className="toast-container",X.setAttribute("role","alert"),X.setAttribute("aria-live","polite"),document.body.appendChild(X)),X}function S(e,a="info",n=4e3){const t=Wt(),i=document.createElement("div");i.className=`toast toast-${a}`;const s={success:"✓",error:"✕",warning:"⚠",info:"ℹ"};i.innerHTML=`
    <span style="font-size: 1.1rem; flex-shrink: 0;">${s[a]||s.info}</span>
    <span style="flex: 1;">${e}</span>
    <button class="btn-ghost" style="padding: 2px 6px; font-size: 1.1rem; opacity: 0.6;" aria-label="Close">&times;</button>
  `,i.querySelector("button").addEventListener("click",()=>Me(i)),t.appendChild(i);const o=setTimeout(()=>Me(i),n);i._timer=o}function Me(e){clearTimeout(e._timer),e.classList.add("toast-exit"),e.addEventListener("animationend",()=>e.remove())}let _e=null;async function Qt(e){e.innerHTML=`
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
          ${He(6)}
        </div>
      </div>
    </div>
  `;const a=e.querySelector("#search-input"),n=e.querySelector("#category-filter"),t=e.querySelector("#max-price"),i=e.querySelector("#products-grid"),s=e.querySelector("#result-count"),o=window.location.hash,r=o.indexOf("?");if(r!==-1){const c=new URLSearchParams(o.slice(r));c.get("category")&&(n.value=c.get("category")),c.get("query")&&(a.value=c.get("query"))}async function d(){var f;const c=a.value.trim(),p=n.value,g=t.value?parseFloat(t.value):null;i.innerHTML=He(6);try{let x;c||p||g?x=await ze(c,g,p):x=await gt(),x.length===0?(i.innerHTML=`
          <div class="empty-state" style="grid-column: 1/-1;">
            <div class="empty-state-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>`,s.textContent="0 products"):(i.innerHTML=x.map(w=>Jt(w)).join(""),s.textContent=`${x.length} product${x.length!==1?"s":""} found`,ea(i))}catch(x){i.innerHTML=`
        <div class="empty-state" style="grid-column: 1/-1;">
          <div class="empty-state-icon">⚠️</div>
          <h3>Failed to load products</h3>
          <p>${x.message}</p>
          <button class="btn btn-primary" style="margin-top:var(--space-4);" id="retry-btn">Try Again</button>
        </div>`,(f=e.querySelector("#retry-btn"))==null||f.addEventListener("click",d)}}function u(){clearTimeout(_e),_e=setTimeout(d,350)}a.addEventListener("input",u),n.addEventListener("change",d),t.addEventListener("input",u),await d()}function Jt(e){const a=e.stock>0,t={Electronics:"primary",Footwear:"success",Fashion:"accent",Home:"warning"}[e.category]||"neutral";return`
    <div class="product-card card card-hover" data-id="${e.product_id}">
      <div class="product-image">
        <div class="product-image-placeholder">
          ${Zt(e.category)}
        </div>
        <span class="badge badge-${t} product-category-badge">${e.category}</span>
      </div>
      <div class="product-info">
        <h3 class="product-name">${e.name}</h3>
        <p class="product-desc">${e.description||""}</p>
        <div class="product-meta">
          <span class="product-price">₹${e.price.toLocaleString("en-IN")}</span>
          <span class="badge ${a?"badge-success":"badge-error"}">${a?`In Stock (${e.stock})`:"Out of Stock"}</span>
        </div>
        <div class="product-actions">
          <a href="#/products/${e.product_id}" class="btn btn-outline btn-sm">View Details</a>
          <button class="btn btn-primary btn-sm add-to-cart-btn" ${a?"":"disabled"} data-product='${JSON.stringify(e).replace(/'/g,"&#39;")}'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>`}function Zt(e){return`<span style="font-size:3rem;">${{Electronics:"🎧",Footwear:"👟",Fashion:"👔",Home:"🏠"}[e]||"📦"}</span>`}function He(e){return Array(e).fill(`
    <div class="skeleton-card">
      <div class="skeleton skeleton-image" style="height:180px;margin-bottom:16px;"></div>
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-text" style="width:80%;"></div>
      <div class="skeleton skeleton-text" style="width:40%;margin-top:12px;"></div>
    </div>`).join("")}function ea(e){e.querySelectorAll(".add-to-cart-btn").forEach(a=>{a.addEventListener("click",n=>{n.stopPropagation();const t=JSON.parse(a.dataset.product);ke(t,1),S(`${t.name} added to cart`,"success")})})}async function ta(e,a){const n=a.id;e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <div class="loading-container"><div class="spinner spinner-lg"></div><p>Loading product...</p></div>
      </div>
    </div>`;try{const t=await yt(n),i=t.stock>0,s={Electronics:"🎧",Footwear:"👟",Fashion:"👔",Home:"🏠"};e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <a href="#/products" class="back-link">&larr; Back to Products</a>
          <div class="product-detail">
            <div class="product-detail-image">
              <div class="product-image-placeholder-lg">
                <span style="font-size:6rem;">${s[t.category]||"📦"}</span>
              </div>
            </div>
            <div class="product-detail-info">
              <span class="badge badge-primary">${t.category}</span>
              <h1 style="margin-top:var(--space-3);">${t.name}</h1>
              <p class="product-detail-price">₹${t.price.toLocaleString("en-IN")}</p>
              <p class="product-detail-desc">${t.description||"No description available."}</p>

              <div class="product-detail-meta">
                <div class="meta-item">
                  <span class="meta-label">Availability</span>
                  <span class="badge ${i?"badge-success":"badge-error"}">${i?`In Stock (${t.stock} units)`:"Out of Stock"}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Return Policy</span>
                  <span class="badge ${t.returnable?"badge-success":"badge-warning"}">${t.returnable?"7-Day Returns":"Non-Returnable"}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Product ID</span>
                  <span class="text-secondary">${t.product_id}</span>
                </div>
              </div>

              <div class="product-detail-qty">
                <label class="form-label">Quantity</label>
                <div class="qty-selector">
                  <button class="btn btn-ghost qty-btn" id="qty-minus" aria-label="Decrease">−</button>
                  <input type="number" id="qty-input" class="form-input" value="1" min="1" max="${t.stock}" style="width:60px;text-align:center;">
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
      </div>`;const o=e.querySelector("#qty-input");e.querySelector("#qty-minus").addEventListener("click",()=>{const r=parseInt(o.value)||1;r>1&&(o.value=r-1)}),e.querySelector("#qty-plus").addEventListener("click",()=>{const r=parseInt(o.value)||1;r<t.stock&&(o.value=r+1)}),e.querySelector("#add-to-cart-btn").addEventListener("click",()=>{const r=parseInt(o.value)||1;ke(t,r),S(`${t.name} (x${r}) added to cart`,"success")}),e.querySelector("#buy-now-btn").addEventListener("click",()=>{const r=parseInt(o.value)||1;ke(t,r),window.location.hash="/checkout"}),e.querySelector("#ask-ai-btn").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-ai-panel"))})}catch(t){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">⚠️</div>
            <h3>Product not found</h3>
            <p>${t.message}</p>
            <a href="#/products" class="btn btn-primary" style="margin-top:var(--space-4);">Browse Products</a>
          </div>
        </div>
      </div>`}}function ce({title:e,message:a,confirmText:n="Confirm",cancelText:t="Cancel",type:i="danger"}){return new Promise(s=>{const o=document.createElement("div");o.className="modal-overlay",o.innerHTML=`
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <h3 id="modal-title">${e}</h3>
        </div>
        <div class="modal-body">
          <p>${a}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="modal-cancel">${t}</button>
          <button class="btn btn-${i}" id="modal-confirm">${n}</button>
        </div>
      </div>
    `,document.body.appendChild(o);const r=()=>{o.style.opacity="0",setTimeout(()=>o.remove(),200)};o.querySelector("#modal-confirm").addEventListener("click",()=>{r(),s(!0)}),o.querySelector("#modal-cancel").addEventListener("click",()=>{r(),s(!1)}),o.addEventListener("click",d=>{d.target===o&&(r(),s(!1))}),setTimeout(()=>o.querySelector("#modal-cancel").focus(),100)})}async function aa(e){function a(){var i;const n=G(),t=je();if(n.length===0){e.innerHTML=`
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
                    <span style="font-size:2rem;">${sa(s.category)}</span>
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
                <span>Subtotal (${n.reduce((s,o)=>s+o.quantity,0)} items)</span>
                <span>₹${t.toLocaleString("en-IN")}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span class="text-success" style="font-weight:600;">Free</span>
              </div>
              <div class="divider"></div>
              <div class="summary-row summary-total">
                <span>Total</span>
                <span>₹${t.toLocaleString("en-IN")}</span>
              </div>
              <a href="#/checkout" class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4);">Proceed to Checkout</a>
              <button class="btn btn-ghost" style="width:100%;margin-top:var(--space-2);font-size:var(--font-sm);" id="clear-cart-btn">Clear Cart</button>
            </div>
          </div>
        </div>
      </div>`,e.querySelectorAll(".qty-dec").forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.id,r=G().find(d=>d.product_id===o);r&&r.quantity>1&&(Pe(o,r.quantity-1),a())})}),e.querySelectorAll(".qty-inc").forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.id,r=G().find(d=>d.product_id===o);r&&(Pe(o,r.quantity+1),a())})}),e.querySelectorAll(".cart-remove-btn").forEach(s=>{s.addEventListener("click",()=>{lt(s.dataset.id),S("Item removed from cart","info"),a()})}),(i=e.querySelector("#clear-cart-btn"))==null||i.addEventListener("click",async()=>{await ce({title:"Clear Cart",message:"Are you sure you want to remove all items from your cart?",confirmText:"Clear All",type:"danger"})&&(Ge(),S("Cart cleared","info"),a())})}a()}function sa(e){return{Electronics:"🎧",Footwear:"👟",Fashion:"👔",Home:"🏠"}[e]||"📦"}async function ia(e){if(!D()){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required for Checkout</h3>
            <p>Please log in to continue with checkout.</p>
            <a href="#/login?redirect=/checkout" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Login to continue</a>
          </div>
        </div>
      </div>`;return}const a=G(),n=je();if(a.length===0){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🛒</div>
            <h3>Nothing to checkout</h3>
            <p>Add some products to your cart first.</p>
            <a href="#/products" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Browse Products</a>
          </div>
        </div>
      </div>`;return}const t=getCurrentUser();e.innerHTML=`
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
                <input type="text" id="checkout-name" class="form-input" value="${(t==null?void 0:t.name)||""}" placeholder="e.g. Mahendra Gurjar">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input type="email" id="checkout-email" class="form-input" value="${(t==null?void 0:t.email)||""}" placeholder="mahendra.gurjar@shopsathi.ai">
                </div>
                <div class="form-group">
                  <label class="form-label">Phone</label>
                  <input type="tel" id="checkout-phone" class="form-input" value="${(t==null?void 0:t.phone)||"+91 98765 43210"}" placeholder="+91 98765 43210">
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
              ${a.map(i=>`
                <div class="summary-item">
                  <div>
                    <span class="text-sm">${i.name}</span>
                    <span class="text-secondary text-sm"> × ${i.quantity}</span>
                  </div>
                  <span class="text-sm">₹${(i.price*i.quantity).toLocaleString("en-IN")}</span>
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
    </div>`,e.querySelector("#place-order-btn").addEventListener("click",()=>{const i=e.querySelector("#checkout-name").value.trim(),s=e.querySelector("#checkout-email").value.trim(),o=e.querySelector("#checkout-phone").value.trim(),r=e.querySelector("#checkout-address").value.trim();if(!i||!s||!o||!r){S("Please fill in all required fields","warning");return}const d="ORD"+Math.floor(1e3+Math.random()*9e3);Ge(),e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="order-success-card card card-elevated text-center" style="max-width:600px;margin:var(--space-12) auto;padding:var(--space-12);">
            <div style="font-size:4rem;margin-bottom:var(--space-4);">🎉</div>
            <h2>Order Placed Successfully!</h2>
            <p class="text-secondary" style="margin-top:var(--space-3);font-size:var(--font-lg);">Thank you, ${i}! Your order <strong>${d}</strong> has been placed.</p>
            <p class="text-secondary" style="margin-top:var(--space-2);">You'll receive a confirmation at ${s}</p>
            <div class="flex gap-4 justify-center" style="margin-top:var(--space-8);flex-wrap:wrap;">
              <a href="#/orders" class="btn btn-primary btn-lg">View My Orders</a>
              <a href="#/products" class="btn btn-outline btn-lg">Continue Shopping</a>
            </div>
          </div>
        </div>
      </div>`,S("Order placed successfully!","success")})}const na=["ORD1001","ORD1002","ORD1003","ORD1004","ORD1005"],me=10;async function ra(e){if(!D()){e.innerHTML=`
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
    </div>`;const a=e.querySelector("#orders-container"),n=e.querySelector("#order-lookup-input"),t=e.querySelector("#order-lookup-btn"),i=e.querySelector("#status-filter");let s=[],o=1,r="ALL";const d=()=>{const p=n.value.trim();p&&(window.location.hash=`/orders/${p.toUpperCase()}`)};t.addEventListener("click",d),n.addEventListener("keydown",p=>{p.key==="Enter"&&d()}),i.addEventListener("change",p=>{r=p.target.value,o=1,c()});function u(){return r==="ALL"?s:r==="Returned"?s.filter(p=>p.status==="Returned"||p.status==="Return Requested"):s.filter(p=>p.status===r)}function c(){const p=u(),g=p.length,f=Math.ceil(g/me)||1;if(o>f&&(o=f),o<1&&(o=1),g===0){a.innerHTML=`
        <div class="empty-state">
          <div class="empty-state-icon">📦</div>
          <h3>No orders found</h3>
          <p>${r!=="ALL"?`No orders with status "${r}".`:"When you place orders, they'll appear here."}</p>
          ${r!=="ALL"?'<button class="btn btn-secondary" style="margin-top:var(--space-4);" id="reset-filter-btn">Show All Orders</button>':'<a href="#/products" class="btn btn-primary" style="margin-top:var(--space-4);">Start Shopping</a>'}
        </div>`;const q=a.querySelector("#reset-filter-btn");q&&q.addEventListener("click",()=>{i.value="ALL",r="ALL",c()});return}const x=(o-1)*me,w=Math.min(x+me,g),Y=p.slice(x,w);a.innerHTML=`
      <div class="flex items-center justify-between" style="margin-bottom:var(--space-4);flex-wrap:wrap;gap:var(--space-2);">
        <span class="text-secondary text-sm">
          Showing <strong>${x+1}–${w}</strong> of <strong>${g}</strong> orders
        </span>
        <span class="badge badge-neutral">Page ${o} of ${f}</span>
      </div>

      <div class="orders-list">
        ${Y.map(q=>ca(q)).join("")}
      </div>

      ${f>1?`
        <div class="pagination flex items-center justify-center gap-2" style="margin-top:var(--space-8);flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm" id="prev-page-btn" ${o===1?"disabled":""}>← Previous</button>
          ${oa(o,f)}
          <button class="btn btn-secondary btn-sm" id="next-page-btn" ${o===f?"disabled":""}>Next →</button>
        </div>`:""}
    `;const W=a.querySelector("#prev-page-btn"),j=a.querySelector("#next-page-btn");W&&W.addEventListener("click",()=>{o>1&&(o--,c(),window.scrollTo({top:0,behavior:"smooth"}))}),j&&j.addEventListener("click",()=>{o<f&&(o++,c(),window.scrollTo({top:0,behavior:"smooth"}))}),a.querySelectorAll(".page-num-btn").forEach(q=>{q.addEventListener("click",$=>{const K=parseInt($.target.dataset.page,10);K&&K!==o&&(o=K,c(),window.scrollTo({top:0,behavior:"smooth"}))})})}try{const p=V();let g=[];if(p&&p.customer_id)try{g=await ft(p.customer_id)}catch{g=await Ae()}else try{g=await Ae()}catch{g=(await Promise.allSettled(na.map(w=>oe(w)))).filter(w=>w.status==="fulfilled").map(w=>w.value)}s=(g||[]).sort((f,x)=>new Date(x.order_date)-new Date(f.order_date)),c()}catch(p){a.innerHTML=`
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h3>Failed to load orders</h3>
        <p>${p.message}</p>
        <button class="btn btn-primary" style="margin-top:var(--space-4);" onclick="location.reload()">Try Again</button>
      </div>`}}function oa(e,a){let n="";for(let t=1;t<=a;t++)t===1||t===a||t>=e-1&&t<=e+1?n+=`<button class="btn btn-sm ${t===e?"btn-primary":"btn-secondary"} page-num-btn" data-page="${t}">${t}</button>`:(t===e-2||t===e+2)&&(n+='<span class="text-secondary" style="padding:0 0.3rem;">...</span>');return n}function ca(e){const a=la(e.status),n=new Date(e.order_date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});return`
    <div class="order-card card card-hover" style="cursor:pointer;" onclick="location.hash='/orders/${e.order_id}'">
      <div class="order-card-top">
        <div>
          <span class="text-secondary text-sm">Order</span>
          <h4 style="margin-top:2px;">${e.order_id}</h4>
        </div>
        <span class="badge ${a.badge}">${a.icon} ${e.status}</span>
      </div>
      <div class="order-card-body">
        <div class="order-product-info">
          <span style="font-size:1.5rem;">${da(e.product_name)}</span>
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
    </div>`}function la(e){return{Processing:{badge:"badge-primary",icon:"🔄"},"Order Placed":{badge:"badge-primary",icon:"📋"},Confirmed:{badge:"badge-primary",icon:"✅"},Packed:{badge:"badge-accent",icon:"📦"},Shipped:{badge:"badge-accent",icon:"🚛"},"Out for Delivery":{badge:"badge-warning",icon:"🚚"},Delivered:{badge:"badge-success",icon:"✅"},Cancelled:{badge:"badge-error",icon:"❌"},Returned:{badge:"badge-neutral",icon:"↩️"},"Return Requested":{badge:"badge-warning",icon:"↩️"}}[e]||{badge:"badge-neutral",icon:"📋"}}function da(e){if(!e)return"📦";const a=e.toLowerCase();return a.includes("headphone")||a.includes("watch")||a.includes("smart")?"🎧":a.includes("shoe")||a.includes("running")?"👟":a.includes("shirt")||a.includes("cotton")?"👔":a.includes("bottle")||a.includes("pillow")?"🏠":"📦"}const ua=["Order Placed","Confirmed","Packed","Shipped","Out for Delivery","Delivered"];async function pa(e,a){var t;const n=(t=a.id)==null?void 0:t.toUpperCase();if(!D()){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required</h3>
            <p>Please log in to view your orders and account information.</p>
            <a href="#/login?redirect=/orders/${n}" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Login to continue</a>
          </div>
        </div>
      </div>`;return}e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <div class="loading-container"><div class="spinner spinner-lg"></div><p>Checking your order...</p></div>
      </div>
    </div>`;try{const i=await oe(n);Je(e,i)}catch(i){const s=i.status===403||i.message&&i.message.includes("Access denied");e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <a href="#/orders" class="back-link">&larr; Back to Orders</a>
          <div class="empty-state" style="min-height:50vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>${s?"Order Access Restricted":"Order not found"}</h3>
            <p>${s?"You can only view orders associated with your account.":i.message||"Order not found."}</p>
            <a href="#/orders" class="btn btn-primary" style="margin-top:var(--space-4);">View My Orders</a>
          </div>
        </div>
      </div>`}}function Je(e,a){var r,d;const n=va(a.status),t=["Processing","Order Placed","Preparing to Ship"].includes(a.status),i=a.status==="Delivered",s=new Date(a.order_date).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}),o=ha(a.status);e.innerHTML=`
    <div class="page-content">
      <div class="container">
        <a href="#/orders" class="back-link">&larr; Back to Orders</a>

        <div class="order-detail-header">
          <div>
            <h1>Order ${a.order_id}</h1>
            <p class="text-secondary">Placed on ${s}</p>
          </div>
          <span class="badge ${n.badge}" style="font-size:var(--font-sm);padding:8px 16px;">${n.icon} ${a.status}</span>
        </div>

        <!-- Timeline -->
        <div class="card" style="margin-bottom:var(--space-6);">
          <h3 style="margin-bottom:var(--space-6);">Order Timeline</h3>
          <div class="order-timeline">
            ${ua.map((u,c)=>{const p=c<=o,g=c===o,f=a.status==="Cancelled";return a.status==="Returned"||a.status,f&&c>0?c===1?`
                  <div class="timeline-step cancelled">
                    <div class="timeline-dot cancelled"></div>
                    <div class="timeline-label">
                      <strong>Cancelled</strong>
                      <span>Order has been cancelled</span>
                    </div>
                  </div>`:"":`
                <div class="timeline-step ${p?"complete":""} ${g?"current":""}">
                  <div class="timeline-dot ${p?"complete":""} ${g?"current":""}"></div>
                  <div class="timeline-label">
                    <strong>${u}</strong>
                    ${g?'<span class="text-primary" style="font-size:0.75rem;">Current</span>':""}
                  </div>
                </div>`}).join("")}
            ${a.status==="Returned"||a.status==="Return Requested"?`
              <div class="timeline-step current">
                <div class="timeline-dot current" style="background:var(--color-warning);"></div>
                <div class="timeline-label"><strong>${a.status}</strong></div>
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
                <a href="#/products/${a.product_id}"><strong>${a.product_name}</strong></a>
              </div>
              <div class="detail-row">
                <span>Quantity</span>
                <span>${a.quantity}</span>
              </div>
              <div class="detail-row">
                <span>Amount</span>
                <strong>₹${a.amount.toLocaleString("en-IN")}</strong>
              </div>
              <div class="detail-row">
                <span>Customer</span>
                <span>${a.customer_id}</span>
              </div>
              <div class="detail-row">
                <span>Expected Delivery</span>
                <span>${a.expected_delivery||"N/A"}</span>
              </div>
              ${a.delivered_date?`<div class="detail-row">
                <span>Delivered</span>
                <span>${new Date(a.delivered_date).toLocaleDateString("en-IN")}</span>
              </div>`:""}
            </div>
          </div>

          <!-- Actions -->
          <div class="card">
            <h3 style="margin-bottom:var(--space-4);">Actions</h3>
            <div class="order-actions-list">
              ${t?`
                <button class="btn btn-danger" id="cancel-order-btn" style="width:100%;">
                  ❌ Cancel This Order
                </button>`:""}
              ${i?`
                <a href="#/returns?order=${a.order_id}" class="btn btn-outline" style="width:100%;">
                  ↩️ Return This Order
                </a>`:""}
              <a href="#/returns?order=${a.order_id}&action=refund" class="btn btn-ghost" style="width:100%;">
                💰 Check Refund Status
              </a>
              <a href="#/support" class="btn btn-ghost" style="width:100%;">
                🎫 Create Support Ticket
              </a>
              <button class="btn btn-ghost" id="ask-ai-order" style="width:100%;">
                💬 Ask ShopSathi About This Order
              </button>
            </div>
            ${!t&&a.status!=="Delivered"&&a.status!=="Cancelled"?`
              <p class="text-secondary text-sm" style="margin-top:var(--space-3);">
                This order cannot be cancelled in its current state (${a.status}).
              </p>`:""}
          </div>
        </div>
      </div>
    </div>`,(r=e.querySelector("#cancel-order-btn"))==null||r.addEventListener("click",async()=>{if(await ce({title:`Cancel Order ${a.order_id}?`,message:`Are you sure you want to cancel order ${a.order_id}? Any charged amount will be refunded within 3-5 business days.`,confirmText:"Yes, Cancel Order",type:"danger"}))try{const c=await Be(a.order_id);S(c.message||"Order cancelled successfully","success");const p=await oe(a.order_id);Je(e,p)}catch(c){S(c.message||"Failed to cancel order","error")}}),(d=e.querySelector("#ask-ai-order"))==null||d.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-ai-panel"))})}function va(e){return{Processing:{badge:"badge-primary",icon:"🔄"},"Order Placed":{badge:"badge-primary",icon:"📋"},Confirmed:{badge:"badge-primary",icon:"✅"},Packed:{badge:"badge-accent",icon:"📦"},Shipped:{badge:"badge-accent",icon:"🚛"},"Out for Delivery":{badge:"badge-warning",icon:"🚚"},Delivered:{badge:"badge-success",icon:"✅"},Cancelled:{badge:"badge-error",icon:"❌"},Returned:{badge:"badge-neutral",icon:"↩️"},"Return Requested":{badge:"badge-warning",icon:"↩️"}}[e]||{badge:"badge-neutral",icon:"📋"}}function ha(e){return{"Order Placed":0,Processing:0,Confirmed:1,Packed:2,Shipped:3,"Out for Delivery":4,Delivered:5}[e]??-1}async function ma(e){if(!D()){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required</h3>
            <p>Please log in to view return eligibility and refund details.</p>
            <a href="#/login?redirect=/returns" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Login to continue</a>
          </div>
        </div>
      </div>`;return}const a=window.location.hash,n=a.indexOf("?"),t=n!==-1?new URLSearchParams(a.slice(n)):new URLSearchParams,i=t.get("order")||"",s=t.get("action")||"";e.innerHTML=`
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
    </div>`;let o="";e.querySelector("#check-eligibility-btn").addEventListener("click",async()=>{const r=e.querySelector("#return-order-id").value.trim().toUpperCase();if(!r){S("Please enter an Order ID","warning");return}o=r;const d=e.querySelector("#eligibility-result"),u=e.querySelector("#return-step-2"),c=e.querySelector("#return-step-3"),p=e.querySelector("#return-result");u.style.display="block",c.style.display="none",p.style.display="none",d.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Checking eligibility...</span></div>';try{const g=await Ve(r);g.eligible?(d.innerHTML=`
          <div class="eligibility-card eligible">
            <span class="badge badge-success">✅ Eligible for Return</span>
            <p style="margin-top:var(--space-2);">${g.reason}</p>
            ${g.days_since_delivery!==null?`<p class="text-secondary text-sm">Days since delivery: ${g.days_since_delivery}</p>`:""}
          </div>`,c.style.display="block"):d.innerHTML=`
          <div class="eligibility-card ineligible">
            <span class="badge badge-error">❌ Not Eligible</span>
            <p style="margin-top:var(--space-2);">${g.reason}</p>
          </div>`}catch(g){d.innerHTML=`<div class="eligibility-card ineligible"><span class="badge badge-error">Error</span><p>${g.message}</p></div>`}}),e.querySelector("#submit-return-btn").addEventListener("click",async()=>{const r=e.querySelector("#return-reason").value.trim();if(!r){S("Please enter a reason for return","warning");return}if(!await ce({title:"Create Return Request?",message:`Are you sure you want to create a return request for order ${o}?`,confirmText:"Yes, Submit Return",type:"primary"}))return;const u=e.querySelector("#return-result");u.style.display="block",u.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Submitting return request...</span></div>';try{const c=await Ke(o,r);e.querySelector("#return-reason").value="",u.innerHTML=`
        <div class="return-success-card card card-elevated" style="margin-top:var(--space-4);">
          <span style="font-size:2rem;">🎉</span>
          <h3>Return Request Submitted!</h3>
          <div class="detail-rows" style="margin-top:var(--space-3);">
            <div class="detail-row"><span>Return ID</span><strong>${c.return_id}</strong></div>
            <div class="detail-row"><span>Order</span><span>${c.order_id}</span></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-success">${c.status}</span></div>
            <div class="detail-row"><span>Reason</span><span>${c.reason}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${c.message}</p>
        </div>`,S("Return request submitted successfully!","success")}catch(c){u.innerHTML=`<div class="eligibility-card ineligible"><span class="badge badge-error">Error</span><p>${c.message}</p></div>`,S(c.message||"Failed to create return","error")}}),e.querySelector("#check-refund-btn").addEventListener("click",async()=>{const r=e.querySelector("#refund-order-id").value.trim().toUpperCase();if(!r){S("Please enter an Order ID","warning");return}const d=e.querySelector("#refund-result");d.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Checking refund status...</span></div>';try{const u=await Xe(r);d.innerHTML=`
        <div class="refund-card card card-elevated">
          <div class="flex items-center gap-3" style="margin-bottom:var(--space-3);">
            <span style="font-size:1.5rem;">💰</span>
            <h4>Refund Status</h4>
          </div>
          <div class="detail-rows">
            <div class="detail-row"><span>Refund ID</span><strong>${u.refund_id}</strong></div>
            <div class="detail-row"><span>Amount</span><strong>₹${u.amount.toLocaleString("en-IN")}</strong></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-primary">${u.refund_status}</span></div>
            <div class="detail-row"><span>Expected</span><span>${u.expected_date||"N/A"}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${u.message}</p>
        </div>`}catch(u){d.innerHTML=`<div class="eligibility-card ineligible"><p>${u.message}</p></div>`}}),e.querySelector("#return-ai-btn").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-ai-panel"))}),i&&s!=="refund"&&e.querySelector("#check-eligibility-btn").click(),i&&s==="refund"&&e.querySelector("#check-refund-btn").click()}async function ga(e){var a,n,t,i;if(!D()){e.innerHTML=`
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
              <input type="text" id="ticket-customer-id" class="form-input" placeholder="e.g. CUST101" value="${((a=V())==null?void 0:a.customer_id)||""}">
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
    </div>`,(n=e.querySelector("#scroll-to-ticket"))==null||n.addEventListener("click",()=>{var s;(s=e.querySelector("#ticket-create-section"))==null||s.scrollIntoView({behavior:"smooth"})}),(t=e.querySelector("#scroll-to-check"))==null||t.addEventListener("click",()=>{var s;(s=e.querySelector("#ticket-check-section"))==null||s.scrollIntoView({behavior:"smooth"})}),(i=e.querySelector("#open-ai-support"))==null||i.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-ai-panel"))}),e.querySelector("#create-ticket-btn").addEventListener("click",async()=>{const s=e.querySelector("#ticket-customer-id").value.trim(),o=e.querySelector("#ticket-category").value,r=e.querySelector("#ticket-order-id").value.trim(),d=e.querySelector("#ticket-description").value.trim(),u=e.querySelector("#ticket-priority").value,c=e.querySelector("#ticket-create-result");if(!s||!d){S("Please fill Customer ID and Description","warning");return}c.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Creating ticket...</span></div>';try{const p=await Ye({customerId:s,description:d,category:o||void 0,priority:u,orderId:r||void 0});e.querySelector("#ticket-description").value="";const g=e.querySelector("#ticket-order-id");g&&(g.value=""),c.innerHTML=`
        <div class="return-success-card card card-elevated">
          <h4>✅ Ticket Created</h4>
          <div class="detail-rows" style="margin-top:var(--space-3);">
            <div class="detail-row"><span>Ticket ID</span><strong>${p.ticket_id}</strong></div>
            <div class="detail-row"><span>Priority</span><span class="badge badge-primary">${p.priority}</span></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-success">${p.status}</span></div>
            <div class="detail-row"><span>Assigned To</span><span>${p.assigned_to}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${p.message}</p>
        </div>`,S("Support ticket created!","success")}catch(p){c.innerHTML=`<div class="eligibility-card ineligible"><p>${p.message}</p></div>`,S(p.message||"Failed to create ticket","error")}}),e.querySelector("#check-ticket-btn").addEventListener("click",async()=>{const s=e.querySelector("#check-ticket-id").value.trim();if(!s){S("Please enter a Ticket ID","warning");return}const o=e.querySelector("#ticket-check-result");o.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Loading ticket...</span></div>';try{const r=await We(s),d=r.status==="Escalated"?"badge-warning":r.status==="Resolved"?"badge-success":"badge-primary";o.innerHTML=`
        <div class="card card-elevated">
          <div class="detail-rows">
            <div class="detail-row"><span>Ticket</span><strong>${r.ticket_id}</strong></div>
            <div class="detail-row"><span>Status</span><span class="badge ${d}">${r.status}</span></div>
            <div class="detail-row"><span>Priority</span><span class="badge badge-primary">${r.priority}</span></div>
            <div class="detail-row"><span>Category</span><span>${r.category}</span></div>
            <div class="detail-row"><span>Assigned To</span><span>${r.assigned_to}</span></div>
            <div class="detail-row"><span>Description</span><span class="text-sm">${r.description}</span></div>
            ${r.reason_for_escalation?`<div class="detail-row"><span>Escalation Reason</span><span class="text-sm">${r.reason_for_escalation}</span></div>`:""}
          </div>
        </div>`}catch(r){o.innerHTML=`<div class="eligibility-card ineligible"><p>${r.message}</p></div>`}}),e.querySelector("#escalate-btn").addEventListener("click",async()=>{const s=e.querySelector("#escalate-ticket-id").value.trim();if(!s){S("Please enter a Ticket ID","warning");return}if(!await ce({title:"Escalate to Human Support?",message:`This will escalate ticket ${s} to a Tier 2 Human Support Agent. Continue?`,confirmText:"Yes, Escalate",type:"primary"}))return;const r=e.querySelector("#escalate-result");r.innerHTML='<div class="flex items-center gap-3"><div class="spinner"></div><span>Escalating...</span></div>';try{const d=await Qe(s);r.innerHTML=`
        <div class="return-success-card card card-elevated">
          <h4>👨‍💼 Ticket Escalated</h4>
          <div class="detail-rows" style="margin-top:var(--space-3);">
            <div class="detail-row"><span>Ticket</span><strong>${d.ticket_id}</strong></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-warning">${d.status}</span></div>
            <div class="detail-row"><span>Assigned To</span><span>${d.assigned_to}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${d.message}</p>
        </div>`,S("Ticket escalated to human support","success")}catch(d){r.innerHTML=`<div class="eligibility-card ineligible"><p>${d.message}</p></div>`,S(d.message||"Failed to escalate","error")}})}async function ya(e){var i,s;const a=V();if(!D()||!a){e.innerHTML=`
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required</h3>
            <p>Please log in to view your account profile.</p>
            <a href="#/login?redirect=/profile" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Log In</a>
          </div>
        </div>
      </div>`;return}const t={CUST101:"Customer / Owner Demo",CUST102:"Administrator",CUST103:"HR / Operations",CUST104:"Support Team",CUST105:"Guest User"}[a.customer_id]||"Customer";e.innerHTML=`
    <div class="page-content">
      <div class="container" style="max-width:800px;">
        <div class="page-header">
          <h1>My Profile</h1>
        </div>

        <div class="card" style="margin-bottom:var(--space-6);">
          <div class="profile-header">
            <div class="profile-avatar">
              <span>${((s=(i=a.name)==null?void 0:i.charAt(0))==null?void 0:s.toUpperCase())||"?"}</span>
            </div>
            <div>
              <h2>${a.name}</h2>
              <div class="flex items-center gap-2" style="margin-top:var(--space-1);">
                <span class="badge badge-primary">${a.customer_id}</span>
                <span class="badge badge-accent">${t}</span>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="detail-rows">
            <div class="detail-row">
              <span>🎭 Role</span>
              <strong>${t}</strong>
            </div>
            <div class="detail-row">
              <span>📧 Email</span>
              <span>${a.email}</span>
            </div>
            <div class="detail-row">
              <span>📱 Phone</span>
              <span>${a.phone}</span>
            </div>
            <div class="detail-row">
              <span>🆔 Customer ID</span>
              <span>${a.customer_id}</span>
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
    </div>`,e.querySelector("#logout-btn").addEventListener("click",()=>{ct(),S("Logged out successfully","info"),window.location.hash="/login"})}const fa=[{id:"CUST101",name:"Mahendra Gurjar",role:"Customer / Owner Demo",email:"mahendra.gurjar@shopsathi.ai"},{id:"CUST102",name:"ShopSathi Admin",role:"Administrator",email:"admin@shopsathi.ai"},{id:"CUST103",name:"ShopSathi HR",role:"HR / Operations",email:"hr@shopsathi.ai"},{id:"CUST104",name:"Kailash",role:"Team Member (24UCSE4014)",email:"kailash@shopsathi.ai"},{id:"CUST105",name:"Guest",role:"Guest User",email:"guest@shopsathi.ai"}],ge={CUST101:{customer_id:"CUST101",name:"Mahendra Gurjar",role:"Customer / Owner Demo",email:"mahendra.gurjar@shopsathi.ai"},CUST102:{customer_id:"CUST102",name:"ShopSathi Admin",role:"Administrator",email:"admin@shopsathi.ai"},CUST103:{customer_id:"CUST103",name:"ShopSathi HR",role:"HR / Operations",email:"hr@shopsathi.ai"},CUST104:{customer_id:"CUST104",name:"Kailash",role:"Team Member (24UCSE4014)",email:"kailash@shopsathi.ai"},CUST105:{customer_id:"CUST105",name:"Guest",role:"Guest User",email:"guest@shopsathi.ai",isGuest:!0}};async function ba(e){const a=window.location.hash,n=a.indexOf("?"),i=(n!==-1?new URLSearchParams(a.slice(n)):new URLSearchParams).get("redirect")||null;e.innerHTML=`
    <div class="page-content">
      <div class="login-page">
        <div class="login-card card card-elevated">
          <div class="text-center" style="margin-bottom:var(--space-6);">
            ${we(180)}
            <p class="text-secondary" style="margin-top:var(--space-2);">Smart Shopping. Smarter Support.</p>
          </div>

          <div style="text-center;margin-bottom:var(--space-6);">
            <span class="badge badge-primary" style="font-size:0.75rem;padding:4px 10px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:var(--space-2);display:inline-block;">Demo Login</span>
            <h3 style="margin-bottom:var(--space-2);">Welcome to ShopSathi</h3>
            <p class="text-secondary" style="font-size:0.9rem;">Select a profile or enter a valid Customer ID to continue.</p>
          </div>

          <div class="login-customers" style="display:flex;flex-direction:column;gap:var(--space-3);">
            ${fa.map(s=>`
              <button class="login-customer-btn card card-hover" data-id="${s.id}" style="display:flex;align-items:center;gap:var(--space-4);padding:var(--space-3) var(--space-4);width:100%;text-align:left;border:1px solid var(--color-border);background:var(--color-surface);">
                <div class="profile-avatar" style="width:42px;height:42px;font-size:1rem;flex-shrink:0;border-radius:50%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;">
                  <span>${s.name.charAt(0)}</span>
                </div>
                <div style="flex:1;">
                  <div style="display:flex;align-items:center;justify-content:space-between;">
                    <strong style="font-size:0.95rem;">${s.name}</strong>
                    <span class="badge ${s.id==="CUST105"?"badge-neutral":"badge-primary"}" style="font-size:0.7rem;padding:2px 6px;">${s.role}</span>
                  </div>
                  <span class="text-secondary text-sm" style="font-size:0.8rem;">${s.id} • ${s.email}</span>
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
            <em>Demo Login — select any profile above or enter a valid Customer ID (CUST101–CUST105).</em>
          </p>
        </div>
      </div>
    </div>`,e.querySelectorAll(".login-customer-btn").forEach(s=>{s.addEventListener("click",async()=>{await ye(s.dataset.id,i)})}),e.querySelector("#custom-login-btn").addEventListener("click",async()=>{const s=e.querySelector("#custom-id-input").value.trim();await ye(s,i)}),e.querySelector("#custom-id-input").addEventListener("keydown",async s=>{if(s.key==="Enter"){const o=s.target.value.trim();await ye(o,i)}})}async function ye(e,a){const n=(e||"").trim().toUpperCase();if(!n){S("Invalid Customer ID. Please select a demo profile or enter a valid Customer ID.","error");return}if(n==="CUST105"||n==="GUEST"){be(ge.CUST105),S("Browsing as Guest","info"),window.location.hash="/products";return}if(!ge[n]){S("Invalid Customer ID. Please select a demo profile or enter a valid Customer ID.","error");return}try{const t=await bt(n),i={...ge[n],...t,customer_id:n};be(i),S(`Welcome, ${i.name}`,"success"),a?window.location.hash=a:window.location.hash="/"}catch{S("Invalid Customer ID. Please select a demo profile or enter a valid Customer ID.","error")}}M("/",Yt);M("/products",Qt);M("/products/:id",ta);M("/cart",aa);M("/checkout",ia);M("/orders",ra);M("/orders/:id",pa);M("/returns",ma);M("/support",ga);M("/profile",ya);M("/login",ba);const xe=document.getElementById("app"),ka=ut();xe.appendChild(ka);const le=document.createElement("main");le.id="main-content";le.setAttribute("role","main");xe.appendChild(le);const Sa=pt();xe.appendChild(Sa);const wa=Kt();document.body.appendChild(wa);nt(le);
