/**
 * ShopSathi Login Page
 */
import { setCurrentUser } from '../store.js';
import { getCustomer } from '../services/api.js';
import { showToast } from '../components/Toast.js';
import { logoFull } from '../components/Logo.js';

const DEMO_CUSTOMERS = [
  { id: 'CUST101', name: 'Mahendra Gurjar', role: 'Customer / Owner Demo', email: 'mahendra.gurjar@shopsathi.ai' },
  { id: 'CUST102', name: 'ShopSathi Admin', role: 'Administrator', email: 'admin@shopsathi.ai' },
  { id: 'CUST103', name: 'ShopSathi HR', role: 'HR / Operations', email: 'hr@shopsathi.ai' },
  { id: 'CUST104', name: 'ShopSathi Team', role: 'Support Team', email: 'team@shopsathi.ai' },
  { id: 'CUST105', name: 'Guest', role: 'Guest User', email: 'guest@shopsathi.ai' },
];

export async function renderLogin(container) {
  const hash = window.location.hash;
  const qIndex = hash.indexOf('?');
  const params = qIndex !== -1 ? new URLSearchParams(hash.slice(qIndex)) : new URLSearchParams();
  const redirectTarget = params.get('redirect') || null;

  container.innerHTML = `
    <div class="page-content">
      <div class="login-page">
        <div class="login-card card card-elevated">
          <div class="text-center" style="margin-bottom:var(--space-8);">
            ${logoFull(180)}
            <p class="text-secondary" style="margin-top:var(--space-3);">Smart Shopping. Smarter Support.</p>
          </div>

          <h3 style="margin-bottom:var(--space-2);">Welcome to ShopSathi</h3>
          <p class="text-secondary" style="margin-bottom:var(--space-6);">Select a profile to enter the demo experience:</p>

          <div class="login-customers" style="display:flex;flex-direction:column;gap:var(--space-3);">
            ${DEMO_CUSTOMERS.map(c => `
              <button class="login-customer-btn card card-hover" data-id="${c.id}" style="display:flex;align-items:center;gap:var(--space-4);padding:var(--space-3) var(--space-4);width:100%;text-align:left;border:1px solid var(--color-border);background:var(--color-surface);">
                <div class="profile-avatar" style="width:42px;height:42px;font-size:1rem;flex-shrink:0;border-radius:50%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;">
                  <span>${c.name.charAt(0)}</span>
                </div>
                <div style="flex:1;">
                  <div style="display:flex;align-items:center;justify-content:space-between;">
                    <strong style="font-size:0.95rem;">${c.name}</strong>
                    <span class="badge ${c.id === 'CUST105' ? 'badge-neutral' : 'badge-primary'}" style="font-size:0.7rem;padding:2px 6px;">${c.role}</span>
                  </div>
                  <span class="text-secondary text-sm" style="font-size:0.8rem;">${c.id} • ${c.email}</span>
                </div>
              </button>`).join('')}
          </div>

          <div class="divider" style="margin:var(--space-6) 0;"></div>

          <div class="form-group">
            <label class="form-label">Or enter Customer ID</label>
            <div class="flex gap-3">
              <input type="text" id="custom-id-input" class="form-input" placeholder="e.g. CUST101">
              <button class="btn btn-primary" id="custom-login-btn">Login</button>
            </div>
          </div>

          <p class="text-secondary text-sm text-center" style="margin-top:var(--space-6);">
            <em>Demo login — select any customer profile above.</em>
          </p>
        </div>
      </div>
    </div>`;

  // Quick customer login
  container.querySelectorAll('.login-customer-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      await loginCustomer(btn.dataset.id, redirectTarget);
    });
  });

  // Custom ID login
  container.querySelector('#custom-login-btn').addEventListener('click', async () => {
    const id = container.querySelector('#custom-id-input').value.trim();
    if (id) await loginCustomer(id.toUpperCase(), redirectTarget);
    else showToast('Please enter a Customer ID', 'warning');
  });

  container.querySelector('#custom-id-input').addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const id = e.target.value.trim();
      if (id) await loginCustomer(id.toUpperCase(), redirectTarget);
    }
  });
}

async function loginCustomer(customerId, redirectTarget) {
  if (customerId === 'CUST105' || customerId === 'GUEST') {
    setCurrentUser({ id: 'CUST105', customer_id: 'CUST105', name: 'Guest', isGuest: true, role: 'Guest User', email: 'guest@shopsathi.ai' });
    showToast('Browsing as Guest', 'info');
    window.location.hash = '/products';
    return;
  }

  try {
    const customer = await getCustomer(customerId);
    setCurrentUser(customer);
    showToast(`Welcome, ${customer.name}!`, 'success');
    if (redirectTarget) {
      window.location.hash = redirectTarget;
    } else {
      window.location.hash = '/orders';
    }
  } catch (err) {
    showToast(err.message || 'Customer not found', 'error');
  }
}
