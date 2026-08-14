/**
 * ShopSathi Order Detail / Tracking Page
 */
import { getOrderStatus, cancelOrder } from '../services/api.js';
import { showToast } from '../components/Toast.js';
import { showModal } from '../components/Modal.js';

const TIMELINE_STEPS = ['Order Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

export async function renderOrderDetail(container, params) {
  const orderId = params.id?.toUpperCase();

  container.innerHTML = `
    <div class="page-content">
      <div class="container">
        <div class="loading-container"><div class="spinner spinner-lg"></div><p>Checking your order...</p></div>
      </div>
    </div>`;

  try {
    const order = await getOrderStatus(orderId);
    renderOrderPage(container, order);
  } catch (err) {
    container.innerHTML = `
      <div class="page-content">
        <div class="container">
          <a href="#/orders" class="back-link">&larr; Back to Orders</a>
          <div class="empty-state" style="min-height:50vh;">
            <div class="empty-state-icon">⚠️</div>
            <h3>Order not found</h3>
            <p>${err.message}</p>
            <a href="#/orders" class="btn btn-primary" style="margin-top:var(--space-4);">View All Orders</a>
          </div>
        </div>
      </div>`;
  }
}

function renderOrderPage(container, order) {
  const statusConfig = getStatusConfig(order.status);
  const cancellable = ['Processing', 'Order Placed', 'Preparing to Ship'].includes(order.status);
  const returnable = order.status === 'Delivered';
  const date = new Date(order.order_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const currentStep = getTimelineStep(order.status);

  container.innerHTML = `
    <div class="page-content">
      <div class="container">
        <a href="#/orders" class="back-link">&larr; Back to Orders</a>

        <div class="order-detail-header">
          <div>
            <h1>Order ${order.order_id}</h1>
            <p class="text-secondary">Placed on ${date}</p>
          </div>
          <span class="badge ${statusConfig.badge}" style="font-size:var(--font-sm);padding:8px 16px;">${statusConfig.icon} ${order.status}</span>
        </div>

        <!-- Timeline -->
        <div class="card" style="margin-bottom:var(--space-6);">
          <h3 style="margin-bottom:var(--space-6);">Order Timeline</h3>
          <div class="order-timeline">
            ${TIMELINE_STEPS.map((step, i) => {
              const isComplete = i <= currentStep;
              const isCurrent = i === currentStep;
              const isCancelled = order.status === 'Cancelled';
              const isReturned = order.status === 'Returned' || order.status === 'Return Requested';

              if (isCancelled && i > 0) {
                return i === 1 ? `
                  <div class="timeline-step cancelled">
                    <div class="timeline-dot cancelled"></div>
                    <div class="timeline-label">
                      <strong>Cancelled</strong>
                      <span>Order has been cancelled</span>
                    </div>
                  </div>` : '';
              }

              return `
                <div class="timeline-step ${isComplete ? 'complete' : ''} ${isCurrent ? 'current' : ''}">
                  <div class="timeline-dot ${isComplete ? 'complete' : ''} ${isCurrent ? 'current' : ''}"></div>
                  <div class="timeline-label">
                    <strong>${step}</strong>
                    ${isCurrent ? `<span class="text-primary" style="font-size:0.75rem;">Current</span>` : ''}
                  </div>
                </div>`;
            }).join('')}
            ${order.status === 'Returned' || order.status === 'Return Requested' ? `
              <div class="timeline-step current">
                <div class="timeline-dot current" style="background:var(--color-warning);"></div>
                <div class="timeline-label"><strong>${order.status}</strong></div>
              </div>` : ''}
          </div>
        </div>

        <div class="order-detail-grid">
          <!-- Order Info -->
          <div class="card">
            <h3 style="margin-bottom:var(--space-4);">Order Details</h3>
            <div class="detail-rows">
              <div class="detail-row">
                <span>Product</span>
                <a href="#/products/${order.product_id}"><strong>${order.product_name}</strong></a>
              </div>
              <div class="detail-row">
                <span>Quantity</span>
                <span>${order.quantity}</span>
              </div>
              <div class="detail-row">
                <span>Amount</span>
                <strong>₹${order.amount.toLocaleString('en-IN')}</strong>
              </div>
              <div class="detail-row">
                <span>Customer</span>
                <span>${order.customer_id}</span>
              </div>
              <div class="detail-row">
                <span>Expected Delivery</span>
                <span>${order.expected_delivery || 'N/A'}</span>
              </div>
              ${order.delivered_date ? `<div class="detail-row">
                <span>Delivered</span>
                <span>${new Date(order.delivered_date).toLocaleDateString('en-IN')}</span>
              </div>` : ''}
            </div>
          </div>

          <!-- Actions -->
          <div class="card">
            <h3 style="margin-bottom:var(--space-4);">Actions</h3>
            <div class="order-actions-list">
              ${cancellable ? `
                <button class="btn btn-danger" id="cancel-order-btn" style="width:100%;">
                  ❌ Cancel This Order
                </button>` : ''}
              ${returnable ? `
                <a href="#/returns?order=${order.order_id}" class="btn btn-outline" style="width:100%;">
                  ↩️ Return This Order
                </a>` : ''}
              <a href="#/returns?order=${order.order_id}&action=refund" class="btn btn-ghost" style="width:100%;">
                💰 Check Refund Status
              </a>
              <a href="#/support" class="btn btn-ghost" style="width:100%;">
                🎫 Create Support Ticket
              </a>
              <button class="btn btn-ghost" id="ask-ai-order" style="width:100%;">
                💬 Ask ShopSathi About This Order
              </button>
            </div>
            ${!cancellable && order.status !== 'Delivered' && order.status !== 'Cancelled' ? `
              <p class="text-secondary text-sm" style="margin-top:var(--space-3);">
                This order cannot be cancelled in its current state (${order.status}).
              </p>` : ''}
          </div>
        </div>
      </div>
    </div>`;

  // Cancel order
  container.querySelector('#cancel-order-btn')?.addEventListener('click', async () => {
    const confirmed = await showModal({
      title: `Cancel Order ${order.order_id}?`,
      message: `Are you sure you want to cancel order ${order.order_id}? Any charged amount will be refunded within 3-5 business days.`,
      confirmText: 'Yes, Cancel Order',
      type: 'danger',
    });

    if (confirmed) {
      try {
        const result = await cancelOrder(order.order_id);
        showToast(result.message || 'Order cancelled successfully', 'success');
        // Reload the page
        const updated = await getOrderStatus(order.order_id);
        renderOrderPage(container, updated);
      } catch (err) {
        showToast(err.message || 'Failed to cancel order', 'error');
      }
    }
  });

  // AI help
  container.querySelector('#ask-ai-order')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-ai-panel'));
  });
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

function getTimelineStep(status) {
  const map = {
    'Order Placed': 0, 'Processing': 0, 'Confirmed': 1, 'Packed': 2,
    'Shipped': 3, 'Out for Delivery': 4, 'Delivered': 5,
  };
  return map[status] ?? -1;
}
