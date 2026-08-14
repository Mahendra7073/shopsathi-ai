/**
 * ShopSathi Product Detail Page
 */
import { getProduct } from '../services/api.js';
import { addToCart } from '../store.js';
import { showToast } from '../components/Toast.js';

export async function renderProductDetail(container, params) {
  const productId = params.id;
  container.innerHTML = `
    <div class="page-content">
      <div class="container">
        <div class="loading-container"><div class="spinner spinner-lg"></div><p>Loading product...</p></div>
      </div>
    </div>`;

  try {
    const product = await getProduct(productId);
    const inStock = product.stock > 0;
    const emojis = { Electronics: '🎧', Footwear: '👟', Fashion: '👔', Home: '🏠' };

    container.innerHTML = `
      <div class="page-content">
        <div class="container">
          <a href="#/products" class="back-link">&larr; Back to Products</a>
          <div class="product-detail">
            <div class="product-detail-image">
              <div class="product-image-placeholder-lg">
                <span style="font-size:6rem;">${emojis[product.category] || '📦'}</span>
              </div>
            </div>
            <div class="product-detail-info">
              <span class="badge badge-primary">${product.category}</span>
              <h1 style="margin-top:var(--space-3);">${product.name}</h1>
              <p class="product-detail-price">₹${product.price.toLocaleString('en-IN')}</p>
              <p class="product-detail-desc">${product.description || 'No description available.'}</p>

              <div class="product-detail-meta">
                <div class="meta-item">
                  <span class="meta-label">Availability</span>
                  <span class="badge ${inStock ? 'badge-success' : 'badge-error'}">${inStock ? `In Stock (${product.stock} units)` : 'Out of Stock'}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Return Policy</span>
                  <span class="badge ${product.returnable ? 'badge-success' : 'badge-warning'}">${product.returnable ? '7-Day Returns' : 'Non-Returnable'}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Product ID</span>
                  <span class="text-secondary">${product.product_id}</span>
                </div>
              </div>

              <div class="product-detail-qty">
                <label class="form-label">Quantity</label>
                <div class="qty-selector">
                  <button class="btn btn-ghost qty-btn" id="qty-minus" aria-label="Decrease">−</button>
                  <input type="number" id="qty-input" class="form-input" value="1" min="1" max="${product.stock}" style="width:60px;text-align:center;">
                  <button class="btn btn-ghost qty-btn" id="qty-plus" aria-label="Increase">+</button>
                </div>
              </div>

              <div class="product-detail-actions">
                <button class="btn btn-primary btn-lg" id="add-to-cart-btn" ${!inStock ? 'disabled' : ''} style="flex:1;">
                  🛒 Add to Cart
                </button>
                <button class="btn btn-secondary btn-lg" id="buy-now-btn" ${!inStock ? 'disabled' : ''} style="flex:1;">
                  ⚡ Buy Now
                </button>
              </div>

              <button class="product-ai-help" id="ask-ai-btn">
                💬 Ask ShopSathi about this product
              </button>
            </div>
          </div>
        </div>
      </div>`;

    // Quantity selector
    const qtyInput = container.querySelector('#qty-input');
    container.querySelector('#qty-minus').addEventListener('click', () => {
      const v = parseInt(qtyInput.value) || 1;
      if (v > 1) qtyInput.value = v - 1;
    });
    container.querySelector('#qty-plus').addEventListener('click', () => {
      const v = parseInt(qtyInput.value) || 1;
      if (v < product.stock) qtyInput.value = v + 1;
    });

    // Add to cart
    container.querySelector('#add-to-cart-btn').addEventListener('click', () => {
      const qty = parseInt(qtyInput.value) || 1;
      addToCart(product, qty);
      showToast(`${product.name} (x${qty}) added to cart`, 'success');
    });

    // Buy now
    container.querySelector('#buy-now-btn').addEventListener('click', () => {
      const qty = parseInt(qtyInput.value) || 1;
      addToCart(product, qty);
      window.location.hash = '/checkout';
    });

    // AI help
    container.querySelector('#ask-ai-btn').addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('open-ai-panel'));
    });

  } catch (err) {
    container.innerHTML = `
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">⚠️</div>
            <h3>Product not found</h3>
            <p>${err.message}</p>
            <a href="#/products" class="btn btn-primary" style="margin-top:var(--space-4);">Browse Products</a>
          </div>
        </div>
      </div>`;
  }
}
