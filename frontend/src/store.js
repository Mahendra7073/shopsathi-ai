/**
 * ShopSathi Simple State Store
 * Manages cart, user session, and app-wide state via localStorage
 */

const CART_KEY = 'shopsathi_cart';
const USER_KEY = 'shopsathi_current_customer';
const OLD_USER_KEY = 'shopsathi_user';
const listeners = new Set();

const VALID_DEMO_PROFILES = {
  'CUST101': { customer_id: 'CUST101', name: 'Mahendra Gurjar', role: 'Customer / Owner Demo', email: 'mahendra.gurjar@shopsathi.ai' },
  'CUST102': { customer_id: 'CUST102', name: 'ShopSathi Admin', role: 'Administrator', email: 'admin@shopsathi.ai' },
  'CUST103': { customer_id: 'CUST103', name: 'ShopSathi HR', role: 'HR / Operations', email: 'hr@shopsathi.ai' },
  'CUST104': { customer_id: 'CUST104', name: 'ShopSathi Team', role: 'Support Team', email: 'team@shopsathi.ai' },
  'CUST105': { customer_id: 'CUST105', name: 'Guest', role: 'Guest User', email: 'guest@shopsathi.ai', isGuest: true }
};

// ---- Event System ----
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify(event, data) {
  listeners.forEach(fn => fn(event, data));
}

// ---- User / Auth ----
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY) || localStorage.getItem(OLD_USER_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    if (!user || !user.customer_id) {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(OLD_USER_KEY);
      return null;
    }
    const cid = user.customer_id.toUpperCase();
    if (!VALID_DEMO_PROFILES[cid]) {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(OLD_USER_KEY);
      return null;
    }
    return { ...VALID_DEMO_PROFILES[cid], ...user, customer_id: cid };
  } catch {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(OLD_USER_KEY);
    return null;
  }
}

export function isAuthenticated() {
  const user = getCurrentUser();
  if (!user) return false;
  if (user.customer_id === 'CUST105' || user.isGuest) return false;
  return true;
}

export function setCurrentUser(user) {
  localStorage.removeItem(OLD_USER_KEY);
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
  notify('user-changed', user);
}

export function logout() {
  setCurrentUser(null);
}

// ---- Cart ----
export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  notify('cart-changed', cart);
}

export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.product_id === product.product_id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      quantity,
    });
  }

  saveCart(cart);
  return cart;
}

export function updateCartQuantity(productId, quantity) {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter(item => item.product_id !== productId);
  } else {
    const item = cart.find(item => item.product_id === productId);
    if (item) item.quantity = quantity;
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(productId) {
  const cart = getCart().filter(item => item.product_id !== productId);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}
