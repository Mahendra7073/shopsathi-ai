import { logoFull, logoCompact } from './Logo.js';
import { getCartCount, getCurrentUser, isAuthenticated, subscribe } from '../store.js';

export function renderHeader() {
  const header = document.createElement('header');
  header.className = 'site-header';

  function updateHeaderContent() {
    const authed = isAuthenticated();
    const user = getCurrentUser();

    const navLinksHtml = authed ? `
      <a href="#/" class="nav-link" data-route="/">Home</a>
      <a href="#/products" class="nav-link" data-route="/products">Products</a>
      <a href="#/orders" class="nav-link" data-route="/orders">My Orders</a>
      <a href="#/returns" class="nav-link" data-route="/returns">Returns</a>
      <a href="#/support" class="nav-link" data-route="/support">Support</a>
    ` : `
      <a href="#/" class="nav-link" data-route="/">Home</a>
      <a href="#/products" class="nav-link" data-route="/products">Products</a>
    `;

    const mobileNavLinksHtml = authed ? `
      <a href="#/" class="mobile-nav-link">🏠 Home</a>
      <a href="#/products" class="mobile-nav-link">🛍️ Products</a>
      <a href="#/orders" class="mobile-nav-link">📦 My Orders</a>
      <a href="#/returns" class="mobile-nav-link">↩️ Returns</a>
      <a href="#/support" class="mobile-nav-link">🎫 Support</a>
      <a href="#/cart" class="mobile-nav-link">🛒 Cart</a>
      <a href="#/profile" class="mobile-nav-link">👤 Profile (${user?.name || 'Account'})</a>
    ` : `
      <a href="#/" class="mobile-nav-link">🏠 Home</a>
      <a href="#/products" class="mobile-nav-link">🛍️ Products</a>
      <a href="#/cart" class="mobile-nav-link">🛒 Cart</a>
      <a href="#/login" class="mobile-nav-link" style="color:var(--color-primary);font-weight:600;">🔑 Login / Profiles</a>
    `;

    const profileBtnHtml = authed ? `
      <a href="#/profile" class="btn-icon header-profile-btn" aria-label="Profile" title="Profile (${user?.name})">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </a>
    ` : `
      <a href="#/login" class="btn btn-outline btn-sm header-login-btn" style="padding:4px 12px;font-size:0.85rem;">Login</a>
    `;

    header.innerHTML = `
      <div class="header-inner container">
        <a href="#/" class="header-logo" aria-label="ShopSathi Home">
          <span class="header-logo-full">${logoFull(160)}</span>
          <span class="header-logo-compact">${logoCompact(36)}</span>
        </a>

        <nav class="header-nav" id="main-nav" aria-label="Main navigation">
          ${navLinksHtml}
        </nav>

        <div class="header-actions">
          <a href="#/products" class="btn-icon header-search-btn" aria-label="Search products" title="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </a>
          <a href="#/cart" class="btn-icon header-cart-btn" aria-label="Cart" title="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span class="cart-badge" id="header-cart-badge" style="display: none;">0</span>
          </a>
          ${profileBtnHtml}
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
        ${mobileNavLinksHtml}
        <div class="divider"></div>
        <button class="btn btn-primary btn-lg" style="width:100%;" id="mobile-ai-btn">💬 Ask ShopSathi</button>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    updateBadge();
    updateActiveNav();

    const hamburger = header.querySelector('#hamburger-btn');
    const mobileNav = header.querySelector('#mobile-nav');
    hamburger?.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    mobileNav?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });

    const openAI = () => {
      window.dispatchEvent(new CustomEvent('open-ai-panel'));
      hamburger?.setAttribute('aria-expanded', 'false');
      hamburger?.classList.remove('open');
      mobileNav?.classList.remove('open');
    };
    header.querySelector('#header-ai-btn')?.addEventListener('click', openAI);
    header.querySelector('#mobile-ai-btn')?.addEventListener('click', openAI);
  }

  function updateBadge() {
    const count = getCartCount();
    const badge = header.querySelector('#header-cart-badge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  function updateActiveNav() {
    const route = window.location.hash.slice(1) || '/';
    header.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '') || '';
      link.classList.toggle('active', route === href || (href !== '/' && route.startsWith(href)));
    });
  }

  updateHeaderContent();

  subscribe((event) => {
    if (event === 'cart-changed') updateBadge();
    if (event === 'user-changed') updateHeaderContent();
  });

  window.addEventListener('hashchange', updateActiveNav);

  return header;
}
