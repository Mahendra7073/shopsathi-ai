/**
 * ShopSathi Footer
 */
import { logoFull } from './Logo.js';

export function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          ${logoFull(140)}
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
  `;
  return footer;
}
