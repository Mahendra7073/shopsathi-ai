/**
 * ShopSathi Checkout Page
 */
import { getCart, getCartTotal, clearCart, isAuthenticated } from '../store.js';
import { showToast } from '../components/Toast.js';

export async function renderCheckout(container) {
  if (!isAuthenticated()) {
    container.innerHTML = `
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required for Checkout</h3>
            <p>Please log in to continue with checkout.</p>
            <a href="#/login?redirect=/checkout" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Login to continue</a>
          </div>
        </div>
      </div>`;
    return;
  }

  const cart = getCart();
  const total = getCartTotal();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🛒</div>
            <h3>Nothing to checkout</h3>
            <p>Add some products to your cart first.</p>
            <a href="#/products" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Browse Products</a>
          </div>
        </div>
      </div>`;
    return;
  }

  container.innerHTML = `
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
              ${cart.map(item => `
                <div class="summary-item">
                  <div>
                    <span class="text-sm">${item.name}</span>
                    <span class="text-secondary text-sm"> × ${item.quantity}</span>
                  </div>
                  <span class="text-sm">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>`).join('')}
              <div class="divider"></div>
              <div class="summary-row">
                <span>Subtotal</span>
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
              <button class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-6);" id="place-order-btn">
                Place Order — ₹${total.toLocaleString('en-IN')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  // Place order (demo)
  container.querySelector('#place-order-btn').addEventListener('click', () => {
    const name = container.querySelector('#checkout-name').value.trim();
    const email = container.querySelector('#checkout-email').value.trim();
    const phone = container.querySelector('#checkout-phone').value.trim();
    const address = container.querySelector('#checkout-address').value.trim();

    if (!name || !email || !phone || !address) {
      showToast('Please fill in all required fields', 'warning');
      return;
    }

    // Success!
    const orderId = 'ORD' + Math.floor(1000 + Math.random() * 9000);
    clearCart();

    container.innerHTML = `
      <div class="page-content">
        <div class="container">
          <div class="order-success-card card card-elevated text-center" style="max-width:600px;margin:var(--space-12) auto;padding:var(--space-12);">
            <div style="font-size:4rem;margin-bottom:var(--space-4);">🎉</div>
            <h2>Order Placed Successfully!</h2>
            <p class="text-secondary" style="margin-top:var(--space-3);font-size:var(--font-lg);">Thank you, ${name}! Your order <strong>${orderId}</strong> has been placed.</p>
            <p class="text-secondary" style="margin-top:var(--space-2);">You'll receive a confirmation at ${email}</p>
            <div class="flex gap-4 justify-center" style="margin-top:var(--space-8);flex-wrap:wrap;">
              <a href="#/orders" class="btn btn-primary btn-lg">View My Orders</a>
              <a href="#/products" class="btn btn-outline btn-lg">Continue Shopping</a>
            </div>
          </div>
        </div>
      </div>`;
    showToast('Order placed successfully!', 'success');
  });
}
