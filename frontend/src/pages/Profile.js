/**
 * ShopSathi Profile Page
 */
import { getCurrentUser, setCurrentUser, logout } from '../store.js';
import { getCustomer } from '../services/api.js';
import { showToast } from '../components/Toast.js';

export async function renderProfile(container) {
  const user = getCurrentUser();

  if (!user) {
    container.innerHTML = `
      <div class="page-content">
        <div class="container">
          <div class="empty-state" style="min-height:60vh;">
            <div class="empty-state-icon">👤</div>
            <h3>Not Logged In</h3>
            <p>Please log in to view your profile.</p>
            <a href="#/login" class="btn btn-primary btn-lg" style="margin-top:var(--space-4);">Log In</a>
          </div>
        </div>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="page-content">
      <div class="container" style="max-width:800px;">
        <div class="page-header">
          <h1>My Profile</h1>
        </div>

        <div class="card" style="margin-bottom:var(--space-6);">
          <div class="profile-header">
            <div class="profile-avatar">
              <span>${user.name?.charAt(0)?.toUpperCase() || '?'}</span>
            </div>
            <div>
              <h2>${user.name}</h2>
              <span class="badge badge-primary">${user.customer_id}</span>
            </div>
          </div>
          <div class="divider"></div>
          <div class="detail-rows">
            <div class="detail-row">
              <span>📧 Email</span>
              <span>${user.email}</span>
            </div>
            <div class="detail-row">
              <span>📱 Phone</span>
              <span>${user.phone}</span>
            </div>
            <div class="detail-row">
              <span>🆔 Customer ID</span>
              <span>${user.customer_id}</span>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="profile-links-grid">
          <a href="#/orders" class="card card-hover profile-link">
            <span>📦</span>
            <strong>My Orders</strong>
          </a>
          <a href="#/returns" class="card card-hover profile-link">
            <span>↩️</span>
            <strong>Returns & Refunds</strong>
          </a>
          <a href="#/support" class="card card-hover profile-link">
            <span>🎫</span>
            <strong>Support Tickets</strong>
          </a>
          <a href="#/cart" class="card card-hover profile-link">
            <span>🛒</span>
            <strong>My Cart</strong>
          </a>
        </div>

        <button class="btn btn-outline" style="margin-top:var(--space-8);width:100%;" id="logout-btn">
          Log Out
        </button>
      </div>
    </div>`;

  container.querySelector('#logout-btn').addEventListener('click', () => {
    logout();
    showToast('Logged out successfully', 'info');
    window.location.hash = '/login';
  });
}
