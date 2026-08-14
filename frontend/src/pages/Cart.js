/**
 * ShopSathi Cart Page
 */
import { getCart, updateCartQuantity, removeFromCart, clearCart, getCartTotal } from '../store.js';
import { showToast } from '../components/Toast.js';
import { showModal } from '../components/Modal.js';

export async function renderCart(container) {
  function render() {
    const cart = getCart();
    const total = getCartTotal();

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="page-content">
          <div class="container">
            <div class="empty-state" style="min-height:60vh;">
              <div class="empty-state-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <a href="#/products" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Explore Products</a>
            </div>
          </div>
        </div>`;
      return;
    }

    container.innerHTML = `
      <div class="page-content">
        <div class="container">
          <div class="page-header">
            <h1>Shopping Cart</h1>
            <p>${cart.length} item${cart.length !== 1 ? 's' : ''} in your cart</p>
          </div>

          <div class="cart-layout">
            <div class="cart-items">
              ${cart.map(item => `
                <div class="cart-item card" data-id="${item.product_id}">
                  <div class="cart-item-image">
                    <span style="font-size:2rem;">${getEmoji(item.category)}</span>
                  </div>
                  <div class="cart-item-info">
                    <h4><a href="#/products/${item.product_id}">${item.name}</a></h4>
                    <p class="text-secondary text-sm">${item.category || ''}</p>
                    <span class="product-price">₹${item.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div class="cart-item-qty">
                    <div class="qty-selector">
                      <button class="btn btn-ghost qty-btn qty-dec" data-id="${item.product_id}" aria-label="Decrease">−</button>
                      <span class="qty-value">${item.quantity}</span>
                      <button class="btn btn-ghost qty-btn qty-inc" data-id="${item.product_id}" aria-label="Increase">+</button>
                    </div>
                  </div>
                  <div class="cart-item-total">
                    <strong>₹${(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                  </div>
                  <button class="btn btn-ghost cart-remove-btn" data-id="${item.product_id}" aria-label="Remove">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>`).join('')}
            </div>

            <div class="cart-summary card card-elevated">
              <h3 style="margin-bottom:var(--space-4);">Order Summary</h3>
              <div class="summary-row">
                <span>Subtotal (${cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>₹${total.toLocaleString('en-IN')}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span class="text-success" style="font-weight:600;">Free</span>
              </div>
              <div class="divider"></div>
              <div class="summary-row summary-total">
                <span>Total</span>
                <span>₹${total.toLocaleString('en-IN')}</span>
              </div>
              <a href="#/checkout" class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-4);">Proceed to Checkout</a>
              <button class="btn btn-ghost" style="width:100%;margin-top:var(--space-2);font-size:var(--font-sm);" id="clear-cart-btn">Clear Cart</button>
            </div>
          </div>
        </div>
      </div>`;

    // Attach events
    container.querySelectorAll('.qty-dec').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = getCart().find(i => i.product_id === id);
        if (item && item.quantity > 1) {
          updateCartQuantity(id, item.quantity - 1);
          render();
        }
      });
    });

    container.querySelectorAll('.qty-inc').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = getCart().find(i => i.product_id === id);
        if (item) {
          updateCartQuantity(id, item.quantity + 1);
          render();
        }
      });
    });

    container.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.dataset.id);
        showToast('Item removed from cart', 'info');
        render();
      });
    });

    container.querySelector('#clear-cart-btn')?.addEventListener('click', async () => {
      const confirmed = await showModal({
        title: 'Clear Cart',
        message: 'Are you sure you want to remove all items from your cart?',
        confirmText: 'Clear All',
        type: 'danger',
      });
      if (confirmed) {
        clearCart();
        showToast('Cart cleared', 'info');
        render();
      }
    });
  }

  render();
}

function getEmoji(category) {
  const e = { Electronics: '🎧', Footwear: '👟', Fashion: '👔', Home: '🏠' };
  return e[category] || '📦';
}
