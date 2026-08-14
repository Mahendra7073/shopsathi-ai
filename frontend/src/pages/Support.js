/**
 * ShopSathi Support Page
 */
import { createSupportTicket, getSupportTicket, escalateSupportTicket } from '../services/api.js';
import { showToast } from '../components/Toast.js';
import { showModal } from '../components/Modal.js';
import { getCurrentUser } from '../store.js';

export async function renderSupport(container) {
  container.innerHTML = `
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
              <input type="text" id="ticket-customer-id" class="form-input" placeholder="e.g. CUST101" value="${getCurrentUser()?.customer_id || ''}">
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
    </div>`;

  // Scroll helpers
  container.querySelector('#scroll-to-ticket')?.addEventListener('click', () => {
    container.querySelector('#ticket-create-section')?.scrollIntoView({ behavior: 'smooth' });
  });
  container.querySelector('#scroll-to-check')?.addEventListener('click', () => {
    container.querySelector('#ticket-check-section')?.scrollIntoView({ behavior: 'smooth' });
  });
  container.querySelector('#open-ai-support')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-ai-panel'));
  });

  // Create ticket
  container.querySelector('#create-ticket-btn').addEventListener('click', async () => {
    const customerId = container.querySelector('#ticket-customer-id').value.trim();
    const category = container.querySelector('#ticket-category').value;
    const orderId = container.querySelector('#ticket-order-id').value.trim();
    const description = container.querySelector('#ticket-description').value.trim();
    const priority = container.querySelector('#ticket-priority').value;
    const resultEl = container.querySelector('#ticket-create-result');

    if (!customerId || !description) {
      showToast('Please fill Customer ID and Description', 'warning');
      return;
    }

    resultEl.innerHTML = '<div class="flex items-center gap-3"><div class="spinner"></div><span>Creating ticket...</span></div>';

    try {
      const result = await createSupportTicket({
        customerId,
        description,
        category: category || undefined,
        priority,
        orderId: orderId || undefined,
      });

      // Clear inputs
      container.querySelector('#ticket-description').value = '';
      const orderInput = container.querySelector('#ticket-order-id');
      if (orderInput) orderInput.value = '';

      resultEl.innerHTML = `
        <div class="return-success-card card card-elevated">
          <h4>✅ Ticket Created</h4>
          <div class="detail-rows" style="margin-top:var(--space-3);">
            <div class="detail-row"><span>Ticket ID</span><strong>${result.ticket_id}</strong></div>
            <div class="detail-row"><span>Priority</span><span class="badge badge-primary">${result.priority}</span></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-success">${result.status}</span></div>
            <div class="detail-row"><span>Assigned To</span><span>${result.assigned_to}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${result.message}</p>
        </div>`;
      showToast('Support ticket created!', 'success');
    } catch (err) {
      resultEl.innerHTML = `<div class="eligibility-card ineligible"><p>${err.message}</p></div>`;
      showToast(err.message || 'Failed to create ticket', 'error');
    }
  });

  // Check ticket
  container.querySelector('#check-ticket-btn').addEventListener('click', async () => {
    const ticketId = container.querySelector('#check-ticket-id').value.trim();
    if (!ticketId) { showToast('Please enter a Ticket ID', 'warning'); return; }

    const resultEl = container.querySelector('#ticket-check-result');
    resultEl.innerHTML = '<div class="flex items-center gap-3"><div class="spinner"></div><span>Loading ticket...</span></div>';

    try {
      const result = await getSupportTicket(ticketId);
      const statusBadge = result.status === 'Escalated' ? 'badge-warning' :
                          result.status === 'Resolved' ? 'badge-success' : 'badge-primary';

      resultEl.innerHTML = `
        <div class="card card-elevated">
          <div class="detail-rows">
            <div class="detail-row"><span>Ticket</span><strong>${result.ticket_id}</strong></div>
            <div class="detail-row"><span>Status</span><span class="badge ${statusBadge}">${result.status}</span></div>
            <div class="detail-row"><span>Priority</span><span class="badge badge-primary">${result.priority}</span></div>
            <div class="detail-row"><span>Category</span><span>${result.category}</span></div>
            <div class="detail-row"><span>Assigned To</span><span>${result.assigned_to}</span></div>
            <div class="detail-row"><span>Description</span><span class="text-sm">${result.description}</span></div>
            ${result.reason_for_escalation ? `<div class="detail-row"><span>Escalation Reason</span><span class="text-sm">${result.reason_for_escalation}</span></div>` : ''}
          </div>
        </div>`;
    } catch (err) {
      resultEl.innerHTML = `<div class="eligibility-card ineligible"><p>${err.message}</p></div>`;
    }
  });

  // Escalate
  container.querySelector('#escalate-btn').addEventListener('click', async () => {
    const ticketId = container.querySelector('#escalate-ticket-id').value.trim();
    if (!ticketId) { showToast('Please enter a Ticket ID', 'warning'); return; }

    const confirmed = await showModal({
      title: 'Escalate to Human Support?',
      message: `This will escalate ticket ${ticketId} to a Tier 2 Human Support Agent. Continue?`,
      confirmText: 'Yes, Escalate',
      type: 'primary',
    });

    if (!confirmed) return;

    const resultEl = container.querySelector('#escalate-result');
    resultEl.innerHTML = '<div class="flex items-center gap-3"><div class="spinner"></div><span>Escalating...</span></div>';

    try {
      const result = await escalateSupportTicket(ticketId);
      resultEl.innerHTML = `
        <div class="return-success-card card card-elevated">
          <h4>👨‍💼 Ticket Escalated</h4>
          <div class="detail-rows" style="margin-top:var(--space-3);">
            <div class="detail-row"><span>Ticket</span><strong>${result.ticket_id}</strong></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-warning">${result.status}</span></div>
            <div class="detail-row"><span>Assigned To</span><span>${result.assigned_to}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${result.message}</p>
        </div>`;
      showToast('Ticket escalated to human support', 'success');
    } catch (err) {
      resultEl.innerHTML = `<div class="eligibility-card ineligible"><p>${err.message}</p></div>`;
      showToast(err.message || 'Failed to escalate', 'error');
    }
  });
}
