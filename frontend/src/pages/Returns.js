/**
 * ShopSathi Returns & Refunds Page
 */
import { checkReturnEligibility, createReturnRequest, checkRefundStatus } from '../services/api.js';
import { showToast } from '../components/Toast.js';
import { showModal } from '../components/Modal.js';
import { isAuthenticated } from '../store.js';

export async function renderReturns(container) {
  if (!isAuthenticated()) {
    container.innerHTML = `
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">🔒</div>
            <h3>Login Required</h3>
            <p>Please log in to view return eligibility and refund details.</p>
            <a href="#/login?redirect=/returns" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Login to continue</a>
          </div>
        </div>
      </div>`;
    return;
  }

  // Check URL params
  const hash = window.location.hash;
  const qIndex = hash.indexOf('?');
  const params = qIndex !== -1 ? new URLSearchParams(hash.slice(qIndex)) : new URLSearchParams();
  const prefillOrder = params.get('order') || '';
  const action = params.get('action') || '';

  container.innerHTML = `
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <h1>Returns & Refunds</h1>
          <p>Easy returns and refund tracking.</p>
        </div>

        <div class="returns-layout">
          <!-- Return Flow -->
          <div class="returns-main">
            <div class="card" style="margin-bottom:var(--space-6);" id="return-section">
              <h3>↩️ Return an Order</h3>
              <p class="text-secondary" style="margin-bottom:var(--space-4);">Check eligibility and create a return request in 3 easy steps.</p>

              <!-- Step 1: Enter Order ID -->
              <div class="return-step" id="return-step-1">
                <div class="step-label"><span class="step-num">1</span> Enter Order ID</div>
                <div class="flex gap-3" style="flex-wrap:wrap;">
                  <input type="text" id="return-order-id" class="form-input" placeholder="e.g. ORD1003" value="${prefillOrder}" style="max-width:250px;">
                  <button class="btn btn-primary" id="check-eligibility-btn">Check Eligibility</button>
                </div>
              </div>

              <!-- Step 2: Eligibility Result -->
              <div class="return-step" id="return-step-2" style="display:none;">
                <div class="step-label"><span class="step-num">2</span> Eligibility Check</div>
                <div id="eligibility-result"></div>
              </div>

              <!-- Step 3: Create Return -->
              <div class="return-step" id="return-step-3" style="display:none;">
                <div class="step-label"><span class="step-num">3</span> Submit Return Request</div>
                <div class="form-group" style="margin-bottom:var(--space-4);">
                  <label class="form-label">Reason for Return *</label>
                  <textarea id="return-reason" class="form-input" placeholder="e.g. Size too small, Product damaged, Wrong item received..." rows="3"></textarea>
                </div>
                <button class="btn btn-primary" id="submit-return-btn">Submit Return Request</button>
              </div>

              <!-- Result -->
              <div id="return-result" style="display:none;"></div>
            </div>

            <!-- Refund Section -->
            <div class="card" id="refund-section">
              <h3>💰 Check Refund Status</h3>
              <p class="text-secondary" style="margin-bottom:var(--space-4);">Track your refund for returned or cancelled orders.</p>
              <div class="flex gap-3" style="flex-wrap:wrap;">
                <input type="text" id="refund-order-id" class="form-input" placeholder="e.g. ORD1004" value="${action === 'refund' ? prefillOrder : ''}" style="max-width:250px;">
                <button class="btn btn-primary" id="check-refund-btn">Check Refund</button>
              </div>
              <div id="refund-result" style="margin-top:var(--space-4);"></div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="returns-sidebar">
            <div class="card">
              <h4 style="margin-bottom:var(--space-3);">📋 Return Policy</h4>
              <ul class="policy-list">
                <li>Returns accepted within <strong>7 days</strong> of delivery</li>
                <li>Product must be in original condition</li>
                <li>Some hygiene items are <strong>non-returnable</strong></li>
                <li>Refunds processed within <strong>3-5 business days</strong></li>
                <li>Pickup scheduled within 24-48 hours</li>
              </ul>
            </div>
            <div class="card" style="margin-top:var(--space-4);">
              <h4 style="margin-bottom:var(--space-3);">Need Help?</h4>
              <button class="btn btn-outline" style="width:100%;" id="return-ai-btn">💬 Ask ShopSathi</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  let currentOrderId = '';

  // Check eligibility
  container.querySelector('#check-eligibility-btn').addEventListener('click', async () => {
    const orderId = container.querySelector('#return-order-id').value.trim().toUpperCase();
    if (!orderId) { showToast('Please enter an Order ID', 'warning'); return; }

    currentOrderId = orderId;
    const resultEl = container.querySelector('#eligibility-result');
    const step2 = container.querySelector('#return-step-2');
    const step3 = container.querySelector('#return-step-3');
    const returnResult = container.querySelector('#return-result');

    step2.style.display = 'block';
    step3.style.display = 'none';
    returnResult.style.display = 'none';
    resultEl.innerHTML = '<div class="flex items-center gap-3"><div class="spinner"></div><span>Checking eligibility...</span></div>';

    try {
      const result = await checkReturnEligibility(orderId);

      if (result.eligible) {
        resultEl.innerHTML = `
          <div class="eligibility-card eligible">
            <span class="badge badge-success">✅ Eligible for Return</span>
            <p style="margin-top:var(--space-2);">${result.reason}</p>
            ${result.days_since_delivery !== null ? `<p class="text-secondary text-sm">Days since delivery: ${result.days_since_delivery}</p>` : ''}
          </div>`;
        step3.style.display = 'block';
      } else {
        resultEl.innerHTML = `
          <div class="eligibility-card ineligible">
            <span class="badge badge-error">❌ Not Eligible</span>
            <p style="margin-top:var(--space-2);">${result.reason}</p>
          </div>`;
      }
    } catch (err) {
      resultEl.innerHTML = `<div class="eligibility-card ineligible"><span class="badge badge-error">Error</span><p>${err.message}</p></div>`;
    }
  });

  // Submit return
  container.querySelector('#submit-return-btn').addEventListener('click', async () => {
    const reason = container.querySelector('#return-reason').value.trim();
    if (!reason) { showToast('Please enter a reason for return', 'warning'); return; }

    const confirmed = await showModal({
      title: 'Create Return Request?',
      message: `Are you sure you want to create a return request for order ${currentOrderId}?`,
      confirmText: 'Yes, Submit Return',
      type: 'primary',
    });

    if (!confirmed) return;

    const returnResult = container.querySelector('#return-result');
    returnResult.style.display = 'block';
    returnResult.innerHTML = '<div class="flex items-center gap-3"><div class="spinner"></div><span>Submitting return request...</span></div>';

    try {
      const result = await createReturnRequest(currentOrderId, reason);
      container.querySelector('#return-reason').value = '';
      returnResult.innerHTML = `
        <div class="return-success-card card card-elevated" style="margin-top:var(--space-4);">
          <span style="font-size:2rem;">🎉</span>
          <h3>Return Request Submitted!</h3>
          <div class="detail-rows" style="margin-top:var(--space-3);">
            <div class="detail-row"><span>Return ID</span><strong>${result.return_id}</strong></div>
            <div class="detail-row"><span>Order</span><span>${result.order_id}</span></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-success">${result.status}</span></div>
            <div class="detail-row"><span>Reason</span><span>${result.reason}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${result.message}</p>
        </div>`;
      showToast('Return request submitted successfully!', 'success');
    } catch (err) {
      returnResult.innerHTML = `<div class="eligibility-card ineligible"><span class="badge badge-error">Error</span><p>${err.message}</p></div>`;
      showToast(err.message || 'Failed to create return', 'error');
    }
  });

  // Check refund
  container.querySelector('#check-refund-btn').addEventListener('click', async () => {
    const orderId = container.querySelector('#refund-order-id').value.trim().toUpperCase();
    if (!orderId) { showToast('Please enter an Order ID', 'warning'); return; }

    const resultEl = container.querySelector('#refund-result');
    resultEl.innerHTML = '<div class="flex items-center gap-3"><div class="spinner"></div><span>Checking refund status...</span></div>';

    try {
      const result = await checkRefundStatus(orderId);
      resultEl.innerHTML = `
        <div class="refund-card card card-elevated">
          <div class="flex items-center gap-3" style="margin-bottom:var(--space-3);">
            <span style="font-size:1.5rem;">💰</span>
            <h4>Refund Status</h4>
          </div>
          <div class="detail-rows">
            <div class="detail-row"><span>Refund ID</span><strong>${result.refund_id}</strong></div>
            <div class="detail-row"><span>Amount</span><strong>₹${result.amount.toLocaleString('en-IN')}</strong></div>
            <div class="detail-row"><span>Status</span><span class="badge badge-primary">${result.refund_status}</span></div>
            <div class="detail-row"><span>Expected</span><span>${result.expected_date || 'N/A'}</span></div>
          </div>
          <p class="text-secondary text-sm" style="margin-top:var(--space-3);">${result.message}</p>
        </div>`;
    } catch (err) {
      resultEl.innerHTML = `<div class="eligibility-card ineligible"><p>${err.message}</p></div>`;
    }
  });

  // AI help
  container.querySelector('#return-ai-btn').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('open-ai-panel'));
  });

  // Auto-trigger if params exist
  if (prefillOrder && action !== 'refund') {
    container.querySelector('#check-eligibility-btn').click();
  }
  if (prefillOrder && action === 'refund') {
    container.querySelector('#check-refund-btn').click();
  }
}
