/**
 * ShopSathi Home Page
 */
import { logoIcon, aiChatIcon, micIcon } from '../components/Logo.js';

export async function renderHome(container) {
  container.innerHTML = `
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
                  ${aiChatIcon(18)} Ask ShopSathi
                </button>
              </div>
              <button class="hero-voice-cta" id="hero-voice-btn">
                ${micIcon(16)}
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
                  <div class="hero-card-icon">${logoIcon(28)}</div>
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
                  <div class="ai-avatar" style="width:28px;height:28px;">${logoIcon(24)}</div>
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
  `;

  // Event handlers
  const openAI = () => window.dispatchEvent(new CustomEvent('open-ai-panel'));
  container.querySelector('#hero-ai-btn')?.addEventListener('click', openAI);
  container.querySelector('#hero-voice-btn')?.addEventListener('click', openAI);
  container.querySelector('#cta-chat-btn')?.addEventListener('click', openAI);
  container.querySelector('#cta-voice-btn')?.addEventListener('click', openAI);
  container.querySelector('#feature-voice-card')?.addEventListener('click', openAI);
}
