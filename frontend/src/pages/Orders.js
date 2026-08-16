/**
 * ShopSathi My Orders Page
 * Features real-time order tracking, status filters, and pagination for 50+ demo orders.
 */
import { getOrders, getCustomerOrders, getOrderStatus } from '../services/api.js';
import { getCurrentUser, isAuthenticated } from '../store.js';

const DEMO_ORDERS = ['ORD1001', 'ORD1002', 'ORD1003', 'ORD1004', 'ORD1005'];
const ORDERS_PER_PAGE = 10;

export async function renderOrders(container) {
  if (!isAuthenticated()) {
    container.innerHTML = `
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required</h3>
            <p>Please log in to view your orders and account information.</p>
            <a href="#/login?redirect=/orders" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Login to continue</a>
          </div>
        </div>
      </div>`;
    return;
  }

  container.innerHTML = `
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
    </div>`;

  const ordersContainer = container.querySelector('#orders-container');
  const lookupInput = container.querySelector('#order-lookup-input');
  const lookupBtn = container.querySelector('#order-lookup-btn');
  const statusFilter = container.querySelector('#status-filter');

  let allOrders = [];
  let currentPage = 1;
  let activeFilter = 'ALL';

  // Lookup handler
  const doLookup = () => {
    const val = lookupInput.value.trim();
    if (val) window.location.hash = `/orders/${val.toUpperCase()}`;
  };
  lookupBtn.addEventListener('click', doLookup);
  lookupInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doLookup();
  });

  statusFilter.addEventListener('change', (e) => {
    activeFilter = e.target.value;
    currentPage = 1;
    renderCurrentPage();
  });

  function getFilteredOrders() {
    if (activeFilter === 'ALL') return allOrders;
    if (activeFilter === 'Returned') {
      return allOrders.filter(o => o.status === 'Returned' || o.status === 'Return Requested');
    }
    return allOrders.filter(o => o.status === activeFilter);
  }

  function renderCurrentPage() {
    const filtered = getFilteredOrders();
    const totalOrders = filtered.length;
    const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE) || 1;

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    if (totalOrders === 0) {
      ordersContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📦</div>
          <h3>No orders found</h3>
          <p>${activeFilter !== 'ALL' ? `No orders with status "${activeFilter}".` : "When you place orders, they'll appear here."}</p>
          ${activeFilter !== 'ALL' 
            ? `<button class="btn btn-secondary" style="margin-top:var(--space-4);" id="reset-filter-btn">Show All Orders</button>` 
            : `<a href="#/products" class="btn btn-primary" style="margin-top:var(--space-4);">Start Shopping</a>`}
        </div>`;

      const resetBtn = ordersContainer.querySelector('#reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          statusFilter.value = 'ALL';
          activeFilter = 'ALL';
          renderCurrentPage();
        });
      }
      return;
    }

    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    const endIndex = Math.min(startIndex + ORDERS_PER_PAGE, totalOrders);
    const pageOrders = filtered.slice(startIndex, endIndex);

    ordersContainer.innerHTML = `
      <div class="flex items-center justify-between" style="margin-bottom:var(--space-4);flex-wrap:wrap;gap:var(--space-2);">
        <span class="text-secondary text-sm">
          Showing <strong>${startIndex + 1}–${endIndex}</strong> of <strong>${totalOrders}</strong> orders
        </span>
        <span class="badge badge-neutral">Page ${currentPage} of ${totalPages}</span>
      </div>

      <div class="orders-list">
        ${pageOrders.map(order => renderOrderCard(order)).join('')}
      </div>

      ${totalPages > 1 ? `
        <div class="pagination flex items-center justify-center gap-2" style="margin-top:var(--space-8);flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm" id="prev-page-btn" ${currentPage === 1 ? 'disabled' : ''}>← Previous</button>
          ${generatePageButtons(currentPage, totalPages)}
          <button class="btn btn-secondary btn-sm" id="next-page-btn" ${currentPage === totalPages ? 'disabled' : ''}>Next →</button>
        </div>` : ''}
    `;

    // Pagination events
    const prevBtn = ordersContainer.querySelector('#prev-page-btn');
    const nextBtn = ordersContainer.querySelector('#next-page-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderCurrentPage();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderCurrentPage();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    ordersContainer.querySelectorAll('.page-num-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const p = parseInt(e.target.dataset.page, 10);
        if (p && p !== currentPage) {
          currentPage = p;
          renderCurrentPage();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }

  // Load orders from API
  try {
    const user = getCurrentUser();
    let orders = [];
    if (user && user.customer_id) {
      try {
        orders = await getCustomerOrders(user.customer_id);
      } catch (e) {
        orders = await getOrders();
      }
    } else {
      try {
        orders = await getOrders();
      } catch (e) {
        const results = await Promise.allSettled(DEMO_ORDERS.map(id => getOrderStatus(id)));
        orders = results.filter(r => r.status === 'fulfilled').map(r => r.value);
      }
    }

    allOrders = (orders || []).sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
    renderCurrentPage();

  } catch (err) {
    ordersContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <h3>Failed to load orders</h3>
        <p>${err.message}</p>
        <button class="btn btn-primary" style="margin-top:var(--space-4);" onclick="location.reload()">Try Again</button>
      </div>`;
  }
}

function generatePageButtons(current, total) {
  let btns = '';
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      btns += `<button class="btn btn-sm ${i === current ? 'btn-primary' : 'btn-secondary'} page-num-btn" data-page="${i}">${i}</button>`;
    } else if (i === current - 2 || i === current + 2) {
      btns += `<span class="text-secondary" style="padding:0 0.3rem;">...</span>`;
    }
  }
  return btns;
}

function renderOrderCard(order) {
  const statusConfig = getStatusConfig(order.status);
  const date = new Date(order.order_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return `
    <div class="order-card card card-hover" style="cursor:pointer;" onclick="location.hash='/orders/${order.order_id}'">
      <div class="order-card-top">
        <div>
          <span class="text-secondary text-sm">Order</span>
          <h4 style="margin-top:2px;">${order.order_id}</h4>
        </div>
        <span class="badge ${statusConfig.badge}">${statusConfig.icon} ${order.status}</span>
      </div>
      <div class="order-card-body">
        <div class="order-product-info">
          <span style="font-size:1.5rem;">${getCategoryEmoji(order.product_name)}</span>
          <div>
            <strong>${order.product_name}</strong>
            <div class="text-secondary text-sm">Qty: ${order.quantity} • ${date}</div>
          </div>
        </div>
        <div class="order-amount">
          <span class="text-secondary text-sm">Amount</span>
          <strong>₹${order.amount.toLocaleString('en-IN')}</strong>
        </div>
      </div>
      <div class="order-card-footer">
        <span class="text-secondary text-sm">${order.expected_delivery || ''}</span>
        <span class="btn btn-ghost btn-sm">View Details →</span>
      </div>
    </div>`;
}

function getStatusConfig(status) {
  const configs = {
    'Processing': { badge: 'badge-primary', icon: '🔄' },
    'Order Placed': { badge: 'badge-primary', icon: '📋' },
    'Confirmed': { badge: 'badge-primary', icon: '✅' },
    'Packed': { badge: 'badge-accent', icon: '📦' },
    'Shipped': { badge: 'badge-accent', icon: '🚛' },
    'Out for Delivery': { badge: 'badge-warning', icon: '🚚' },
    'Delivered': { badge: 'badge-success', icon: '✅' },
    'Cancelled': { badge: 'badge-error', icon: '❌' },
    'Returned': { badge: 'badge-neutral', icon: '↩️' },
    'Return Requested': { badge: 'badge-warning', icon: '↩️' },
  };
  return configs[status] || { badge: 'badge-neutral', icon: '📋' };
}

function getCategoryEmoji(productName) {
  if (!productName) return '📦';
  const lower = productName.toLowerCase();
  if (lower.includes('headphone') || lower.includes('watch') || lower.includes('smart')) return '🎧';
  if (lower.includes('shoe') || lower.includes('running')) return '👟';
  if (lower.includes('shirt') || lower.includes('cotton')) return '👔';
  if (lower.includes('bottle') || lower.includes('pillow')) return '🏠';
  return '📦';
}
