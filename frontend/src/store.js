/**
 * ShopSathi Simple State Store
 * Manages cart, user session, and app-wide state via localStorage
 */

const CART_KEY = 'shopsathi_cart';
const USER_KEY = 'shopsathi_user';
const listeners = new Set();

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
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
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
