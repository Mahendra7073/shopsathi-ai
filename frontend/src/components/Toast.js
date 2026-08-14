/**
 * ShopSathi Toast Notification System
 */

let container = null;

function ensureContainer() {
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('role', 'alert');
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }
  return container;
}

export function showToast(message, type = 'info', duration = 4000) {
  const c = ensureContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
  toast.innerHTML = `
    <span style="font-size: 1.1rem; flex-shrink: 0;">${icons[type] || icons.info}</span>
    <span style="flex: 1;">${message}</span>
    <button class="btn-ghost" style="padding: 2px 6px; font-size: 1.1rem; opacity: 0.6;" aria-label="Close">&times;</button>
  `;

  toast.querySelector('button').addEventListener('click', () => dismiss(toast));
  c.appendChild(toast);

  const timer = setTimeout(() => dismiss(toast), duration);
  toast._timer = timer;
}

function dismiss(toast) {
  clearTimeout(toast._timer);
  toast.classList.add('toast-exit');
  toast.addEventListener('animationend', () => toast.remove());
}

export default { showToast };
