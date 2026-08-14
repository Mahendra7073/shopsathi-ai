/**
 * ShopSathi Client-Side Hash Router
 */

const routes = {};
let currentCleanup = null;

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.location.hash = path;
}

export function getCurrentRoute() {
  const hash = window.location.hash.slice(1) || '/';
  return hash.split('?')[0];
}

export function getRouteParams() {
  const hash = window.location.hash.slice(1) || '/';
  const qIndex = hash.indexOf('?');
  if (qIndex === -1) return {};
  const params = new URLSearchParams(hash.slice(qIndex));
  return Object.fromEntries(params.entries());
}

export function getPathSegments() {
  const path = getCurrentRoute();
  return path.split('/').filter(Boolean);
}

function matchRoute(path) {
  // Exact match first
  if (routes[path]) return { handler: routes[path], params: {} };

  // Pattern matching (e.g., /products/:id)
  for (const [pattern, handler] of Object.entries(routes)) {
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    if (patternParts.length !== pathParts.length) continue;

    const params = {};
    let match = true;

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        match = false;
        break;
      }
    }

    if (match) return { handler, params };
  }

  return null;
}

export function initRouter(contentEl) {
  async function handleRoute() {
    const path = getCurrentRoute();
    const result = matchRoute(path);

    // Clean up previous page if needed
    if (currentCleanup) {
      currentCleanup();
      currentCleanup = null;
    }

    if (result) {
      const cleanup = await result.handler(contentEl, result.params);
      if (typeof cleanup === 'function') {
        currentCleanup = cleanup;
      }
    } else {
      contentEl.innerHTML = `
        <div class="container page-content">
          <div class="empty-state" style="min-height: 60vh;">
            <div class="empty-state-icon">🔍</div>
            <h3>Page Not Found</h3>
            <p>The page you're looking for doesn't exist.</p>
            <a href="#/" class="btn btn-primary" style="margin-top: var(--space-4);">Go Home</a>
          </div>
        </div>`;
    }

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();

  return () => window.removeEventListener('hashchange', handleRoute);
}
