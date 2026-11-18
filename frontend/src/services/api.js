/**
 * ShopSathi API Service Layer
 * Centralized API client connected to existing FastAPI backend
 */

const BASE_URL = typeof window !== 'undefined' && window.__API_BASE__ 
  ? window.__API_BASE__
  : (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL !== undefined
      ? import.meta.env.VITE_API_BASE_URL
      : (typeof window !== 'undefined' && window.location.port === '5173' ? '/api' : ''));

import { getCurrentUser, isAuthenticated } from '../store/index.js';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

// In-memory cache for safe, non-personal catalog data (60s TTL)
const catalogCache = new Map();
const CATALOG_CACHE_TTL_MS = 60000;

export function clearCatalogCache() {
  catalogCache.clear();
}

// Global latency diagnostics tracking
let lastApiMetrics = {
  endpoint: null,
  durationMs: 0,
  backendProcessMs: 0,
  fromCache: false,
};

export function getLastApiMetrics() {
  return { ...lastApiMetrics };
}

async function request(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const isCatalogGet = method === 'GET' && endpoint.startsWith('/products');

  // Check safe catalog cache
  if (isCatalogGet) {
    const tCacheStart = (typeof performance !== 'undefined') ? performance.now() : Date.now();
    const cached = catalogCache.get(endpoint);
    if (cached && (Date.now() - cached.timestamp < CATALOG_CACHE_TTL_MS)) {
      const tCacheEnd = (typeof performance !== 'undefined') ? performance.now() : Date.now();
      const lookupMs = parseFloat((tCacheEnd - tCacheStart).toFixed(3));
      lastApiMetrics = {
        endpoint,
        durationMs: lookupMs,
        backendProcessMs: 0,
        fromCache: true,
      };
      return cached.data;
    }
  }

  const url = `${BASE_URL}${endpoint}`;
  const user = getCurrentUser();
  const headers = { 'Content-Type': 'application/json', ...options.headers };

  if (isAuthenticated() && user && user.customer_id) {
    headers['X-Customer-ID'] = user.customer_id;
  }

  const config = {
    ...options,
    headers,
  };

  const tStart = (typeof performance !== 'undefined') ? performance.now() : Date.now();

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    const tEnd = (typeof performance !== 'undefined') ? performance.now() : Date.now();
    const durationMs = Math.round((tEnd - tStart) * 100) / 100;
    const processHeader = response.headers ? response.headers.get('X-Process-Time') : null;
    const backendProcessMs = processHeader ? parseFloat(processHeader) : 0;

    lastApiMetrics = {
      endpoint,
      durationMs,
      backendProcessMs,
      fromCache: false,
    };

    if (!response.ok) {
      const message = data?.detail || data?.message || `Request failed`;
      throw new ApiError(message, response.status, data);
    }

    // Populate safe catalog cache
    if (isCatalogGet && data) {
      catalogCache.set(endpoint, { data, timestamp: Date.now() });
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Network error. Please check your connection and try again.', 0, null);
  }
}

// ============================================
// Products
// ============================================
export async function getProducts() {
  return request('/products');
}

export async function searchProducts(query = '', maxPrice = null, category = null) {
  const params = new URLSearchParams();
  if (query) params.set('query', query);
  if (maxPrice) params.set('max_price', maxPrice);
  if (category) params.set('category', category);
  return request(`/products/search?${params.toString()}`);
}

export async function getProduct(productId) {
  return request(`/products/${productId}`);
}

// ============================================
// Orders
// ============================================
export async function getOrders(customerId = null) {
  const params = customerId ? `?customer_id=${customerId}` : '';
  return request(`/orders${params}`);
}

export async function getOrderStatus(orderId) {
  return request(`/orders/${orderId}`);
}

export async function cancelOrder(orderId) {
  return request(`/orders/${orderId}/cancel`, { method: 'POST' });
}

export async function getCustomerOrders(customerId) {
  return request(`/customers/${customerId}/orders`);
}

// ============================================
// Returns
// ============================================
export async function checkReturnEligibility(orderId) {
  return request(`/orders/${orderId}/return-eligibility`);
}

export async function createReturnRequest(orderId, reason) {
  return request('/returns', {
    method: 'POST',
    body: JSON.stringify({ order_id: orderId, reason }),
  });
}

// ============================================
// Refunds
// ============================================
export async function checkRefundStatus(orderId) {
  return request(`/orders/${orderId}/refund`);
}

// ============================================
// Support
// ============================================
export async function createSupportTicket({ customerId, description, subject, category, priority, orderId }) {
  return request('/support/tickets', {
    method: 'POST',
    body: JSON.stringify({
      customer_id: customerId,
      description,
      subject: subject || undefined,
      category: category || undefined,
      priority: priority || 'Medium',
      order_id: orderId || undefined,
    }),
  });
}

export async function getSupportTicket(ticketId) {
  return request(`/support/tickets/${ticketId}`);
}

export async function escalateSupportTicket(ticketId, reason) {
  return request(`/support/tickets/${ticketId}/escalate`, {
    method: 'POST',
    body: JSON.stringify({ reason: reason || undefined }),
  });
}

// ============================================
// Customers
// ============================================
export async function getCustomer(customerId) {
  const cid = (customerId || '').trim().toUpperCase();
  return request(`/customers/${cid}`, {
    headers: { 'X-Customer-ID': cid }
  });
}

// ============================================
// Analytics
// ============================================
export async function getAnalytics() {
  return request('/analytics/summary');
}

// ============================================
// Health
// ============================================
export async function healthCheck() {
  return request('/health');
}
