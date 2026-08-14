/**
 * ShopSathi Products Page
 */
import { searchProducts, getProducts } from '../services/api.js';
import { addToCart } from '../store.js';
import { showToast } from '../components/Toast.js';

let searchTimer = null;

export async function renderProducts(container) {
  container.innerHTML = `
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
          ${renderSkeletons(6)}
        </div>
      </div>
    </div>
  `;

  const searchInput = container.querySelector('#search-input');
  const categoryFilter = container.querySelector('#category-filter');
  const maxPriceInput = container.querySelector('#max-price');
  const grid = container.querySelector('#products-grid');
  const resultCount = container.querySelector('#result-count');

  // Check URL params for initial filters
  const hash = window.location.hash;
  const qIndex = hash.indexOf('?');
  if (qIndex !== -1) {
    const params = new URLSearchParams(hash.slice(qIndex));
    if (params.get('category')) categoryFilter.value = params.get('category');
    if (params.get('query')) searchInput.value = params.get('query');
  }

  async function loadProducts() {
    const query = searchInput.value.trim();
    const category = categoryFilter.value;
    const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : null;

    grid.innerHTML = renderSkeletons(6);

    try {
      let products;
      if (query || category || maxPrice) {
        products = await searchProducts(query, maxPrice, category);
      } else {
        products = await getProducts();
      }

      if (products.length === 0) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column: 1/-1;">
            <div class="empty-state-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>`;
        resultCount.textContent = '0 products';
      } else {
        grid.innerHTML = products.map(p => renderProductCard(p)).join('');
        resultCount.textContent = `${products.length} product${products.length !== 1 ? 's' : ''} found`;
        attachCardListeners(grid);
      }
    } catch (err) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1;">
          <div class="empty-state-icon">⚠️</div>
          <h3>Failed to load products</h3>
          <p>${err.message}</p>
          <button class="btn btn-primary" style="margin-top:var(--space-4);" id="retry-btn">Try Again</button>
        </div>`;
      container.querySelector('#retry-btn')?.addEventListener('click', loadProducts);
    }
  }

  function debounceSearch() {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(loadProducts, 350);
  }

  searchInput.addEventListener('input', debounceSearch);
  categoryFilter.addEventListener('change', loadProducts);
  maxPriceInput.addEventListener('input', debounceSearch);

  // Initial load
  await loadProducts();
}

function renderProductCard(product) {
  const inStock = product.stock > 0;
  const categoryColors = {
    Electronics: 'primary',
    Footwear: 'success',
    Fashion: 'accent',
    Home: 'warning',
  };
  const badgeType = categoryColors[product.category] || 'neutral';

  return `
    <div class="product-card card card-hover" data-id="${product.product_id}">
      <div class="product-image">
        <div class="product-image-placeholder">
          ${getCategoryEmoji(product.category)}
        </div>
        <span class="badge badge-${badgeType} product-category-badge">${product.category}</span>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description || ''}</p>
        <div class="product-meta">
          <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
          <span class="badge ${inStock ? 'badge-success' : 'badge-error'}">${inStock ? `In Stock (${product.stock})` : 'Out of Stock'}</span>
        </div>
        <div class="product-actions">
          <a href="#/products/${product.product_id}" class="btn btn-outline btn-sm">View Details</a>
          <button class="btn btn-primary btn-sm add-to-cart-btn" ${!inStock ? 'disabled' : ''} data-product='${JSON.stringify(product).replace(/'/g, "&#39;")}'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>`;
}

function getCategoryEmoji(category) {
  const emojis = { Electronics: '🎧', Footwear: '👟', Fashion: '👔', Home: '🏠' };
  return `<span style="font-size:3rem;">${emojis[category] || '📦'}</span>`;
}

function renderSkeletons(count) {
  return Array(count).fill(`
    <div class="skeleton-card">
      <div class="skeleton skeleton-image" style="height:180px;margin-bottom:16px;"></div>
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-text" style="width:80%;"></div>
      <div class="skeleton skeleton-text" style="width:40%;margin-top:12px;"></div>
    </div>`).join('');
}

function attachCardListeners(grid) {
  grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const product = JSON.parse(btn.dataset.product);
      addToCart(product, 1);
      showToast(`${product.name} added to cart`, 'success');
    });
  });
}
