/**
 * ShopSathi Confirmation Modal
 */

export function showModal({ title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger' }) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <h3 id="modal-title">${title}</h3>
        </div>
        <div class="modal-body">
          <p>${message}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="modal-cancel">${cancelText}</button>
          <button class="btn btn-${type}" id="modal-confirm">${confirmText}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const cleanup = () => {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 200);
    };

    overlay.querySelector('#modal-confirm').addEventListener('click', () => {
      cleanup();
      resolve(true);
    });

    overlay.querySelector('#modal-cancel').addEventListener('click', () => {
      cleanup();
      resolve(false);
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        cleanup();
        resolve(false);
      }
    });

    // Focus the confirm button
    setTimeout(() => overlay.querySelector('#modal-cancel').focus(), 100);
  });
}
