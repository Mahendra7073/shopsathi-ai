/**
 * ShopSathi Login Page
 */
import { setCurrentUser } from '../store.js';
import { getCustomer } from '../services/api.js';
import { showToast } from '../components/Toast.js';
import { logoFull } from '../components/Logo.js';

const DEMO_CUSTOMERS = [
  { id: 'CUST101', name: 'Rahul Sharma', email: 'rahul.sharma@example.com' },
  { id: 'CUST102', name: 'Priya Patel', email: 'priya.patel@example.com' },
  { id: 'CUST103', name: 'Amit Kumar', email: 'amit.kumar@example.com' },
];

export async function renderLogin(container) {
  container.innerHTML = `
    <div class="page-content">
      <div class="login-page">
        <div class="login-card card card-elevated">
          <div class="text-center" style="margin-bottom:var(--space-8);">
            ${logoFull(180)}
            <p class="text-secondary" style="margin-top:var(--space-3);">Smart Shopping. Smarter Support.</p>
          </div>

          <h3 style="margin-bottom:var(--space-2);">Welcome Back</h3>
          <p class="text-secondary" style="margin-bottom:var(--space-6);">Select a customer profile to continue.</p>

          <div class="login-customers">
            ${DEMO_CUSTOMERS.map(c => `
              <button class="login-customer-btn card card-hover" data-id="${c.id}">
                <div class="profile-avatar" style="width:44px;height:44px;font-size:1rem;">
                  <span>${c.name.charAt(0)}</span>
                </div>
                <div>
                  <strong>${c.name}</strong>
                  <span class="text-secondary text-sm">${c.id} • ${c.email}</span>
                </div>
              </button>`).join('')}
          </div>

          <div class="divider"></div>

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
      await loginCustomer(btn.dataset.id);
    });
  });

  // Custom ID login
  container.querySelector('#custom-login-btn').addEventListener('click', async () => {
    const id = container.querySelector('#custom-id-input').value.trim();
    if (id) await loginCustomer(id.toUpperCase());
    else showToast('Please enter a Customer ID', 'warning');
  });

  container.querySelector('#custom-id-input').addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const id = e.target.value.trim();
      if (id) await loginCustomer(id.toUpperCase());
    }
  });
}

async function loginCustomer(customerId) {
  try {
    const customer = await getCustomer(customerId);
    setCurrentUser(customer);
    showToast(`Welcome, ${customer.name}!`, 'success');
    window.location.hash = '/';
  } catch (err) {
    showToast(err.message || 'Customer not found', 'error');
  }
}
