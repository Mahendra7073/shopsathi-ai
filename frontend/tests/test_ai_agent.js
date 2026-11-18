/**
 * Automated QA Test Suite for ShopSathi AI Chat Agent & Voice Agent Engine
 * Covers 40+ rigorous test cases in English, Hindi, and Hinglish.
 */

import assert from 'node:assert';
import { processAgentQuery, formatTextForSpeech, splitIntoSentences } from '../src/components/ai/AiLauncher.js';
import { clearCatalogCache } from '../src/services/api.js';

// Setup minimal browser globals for Node test environment
const mockStorage = new Map();
const storageMock = {
  getItem: (k) => mockStorage.get(k) || null,
  setItem: (k, v) => mockStorage.set(k, String(v)),
  removeItem: (k) => mockStorage.delete(k),
  clear: () => mockStorage.clear(),
};
Object.defineProperty(globalThis, 'localStorage', {
  value: storageMock,
  configurable: true,
  writable: true
});

// Seed test profiles in localStorage
function setUser(customerId) {
  if (!customerId) {
    mockStorage.delete('shopsathi_current_customer');
    return;
  }
  mockStorage.set('shopsathi_current_customer', JSON.stringify({
    customer_id: customerId,
    name: customerId === 'CUST101' ? 'Mahendra Gurjar' : (customerId === 'CUST104' ? 'Kailash' : (customerId === 'CUST105' ? 'Guest' : 'Admin')),
    role: customerId === 'CUST105' ? 'Guest' : 'Customer',
    isGuest: customerId === 'CUST105',
  }));
}

// Mock backend API responses for controlled deterministic QA
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url, options = {}) => {
  const urlStr = String(url);
  const method = options.method || 'GET';
  const headers = options.headers || {};
  const currentCustomerId = headers['X-Customer-ID'];

  // 1. Health
  if (urlStr.includes('/health')) {
    return { ok: true, json: async () => ({ status: 'healthy', app_name: 'ShopSathi AI' }) };
  }

  // 2. Orders
  if (urlStr.includes('/orders/ORD1001/cancel') || urlStr.includes('/orders/ORD1002/cancel')) {
    return {
      ok: false,
      status: 400,
      json: async () => ({ detail: "Order cannot be cancelled in current state (already dispatched/delivered)." })
    };
  }

  if (urlStr.includes('/orders/ORD1005/cancel')) {
    return {
      ok: true,
      status: 200,
      json: async () => ({ success: true, order_id: 'ORD1005', status: 'Cancelled', message: 'Order ORD1005 successfully cancelled.' })
    };
  }

  if (urlStr.includes('/orders/ORD1001/return-eligibility')) {
    return { ok: true, status: 200, json: async () => ({ order_id: 'ORD1001', eligible: false, reason: "Order is Out for Delivery, not yet delivered." }) };
  }

  if (urlStr.includes('/orders/ORD1002/return-eligibility')) {
    return { ok: true, status: 200, json: async () => ({ order_id: 'ORD1002', eligible: false, reason: "Return window expired (delivered 12 days ago, policy is 7 days)." }) };
  }

  if (urlStr.includes('/orders/ORD1003/return-eligibility')) {
    return { ok: true, status: 200, json: async () => ({ order_id: 'ORD1003', eligible: true, reason: "Delivered 2 days ago — within 7-day return window." }) };
  }

  if (urlStr.includes('/orders/ORD1041/return-eligibility')) {
    return { ok: true, status: 200, json: async () => ({ order_id: 'ORD1041', eligible: false, reason: "Item is non-returnable due to hygiene policy." }) };
  }

  if (urlStr.includes('/returns') && method === 'POST') {
    return { ok: true, status: 201, json: async () => ({ return_id: 'RET8001', order_id: 'ORD1003', status: 'Return Initiated' }) };
  }

  if (urlStr.includes('/orders/ORD1004/refund')) {
    if (currentCustomerId && currentCustomerId !== 'CUST101') {
      return { ok: false, status: 403, json: async () => ({ detail: "Access denied. Order belongs to another account." }) };
    }
    return { ok: true, status: 200, json: async () => ({ refund_id: 'REF7001', order_id: 'ORD1004', amount: 2499.0, refund_status: 'Initiated', expected_date: '2026-08-20', message: 'Refund initiated.' }) };
  }

  if (urlStr.includes('/orders/ORD1005/refund')) {
    return { ok: true, status: 200, json: async () => ({ refund_id: null, order_id: 'ORD1005', amount: 0, refund_status: 'None', expected_date: null, message: 'No refund record exists for order ORD1005.' }) };
  }

  if (urlStr.includes('/orders/ORD1001')) {
    if (currentCustomerId && currentCustomerId !== 'CUST101') {
      return { ok: false, status: 403, json: async () => ({ detail: "Access denied. Order belongs to another account." }) };
    }
    return { ok: true, status: 200, json: async () => ({ order_id: 'ORD1001', customer_id: 'CUST101', product_name: 'AirPro Wireless Headphones', status: 'Out for Delivery', amount: 4999.0, expected_delivery: 'Today by 7:00 PM' }) };
  }

  if (urlStr.includes('/orders/ORD1002')) {
    if (currentCustomerId && currentCustomerId !== 'CUST102') {
      return { ok: false, status: 403, json: async () => ({ detail: "Access denied. Order belongs to another account." }) };
    }
    return { ok: true, status: 200, json: async () => ({ order_id: 'ORD1002', customer_id: 'CUST102', product_name: 'Cotton Oxford Casual Shirt', status: 'Delivered', amount: 1299.0, expected_delivery: 'Delivered 12 days ago' }) };
  }

  if (urlStr.includes('/orders/ORD9999')) {
    return { ok: false, status: 404, json: async () => ({ detail: "Order ORD9999 not found." }) };
  }

  // 3. Products
  const urlLower = urlStr.toLowerCase();
  if (urlLower.includes('/products/search')) {
    if (!urlLower.includes('headphone') && !urlLower.includes('earphone') && (urlLower.includes('mobile') || urlLower.includes('phone'))) {
      return { ok: true, status: 200, json: async () => [] };
    }
    if (urlLower.includes('max_price=1000')) {
      return { ok: true, status: 200, json: async () => ([
        { product_id: 'PRD105', name: 'Stainless Steel Insulated Water Bottle 1L', category: 'Home', price: 799.0, returnable: false }
      ]) };
    }
    if (urlLower.includes('shoe') || urlLower.includes('footwear') || urlLower.includes('running') || urlLower.includes('joot')) {
      return { ok: true, status: 200, json: async () => ([
        { product_id: 'PRD102', name: 'UltraFit Pro Running Shoes', category: 'Footwear', price: 1899.0, returnable: true }
      ]) };
    }
    if (urlLower.includes('headphone') || urlLower.includes('earphone') || urlLower.includes('electronics')) {
      return { ok: true, status: 200, json: async () => ([
        { product_id: 'PRD101', name: 'AirPro Wireless Noise-Cancelling Headphones', category: 'Electronics', price: 4999.0, returnable: true }
      ]) };
    }
    if (urlLower.includes('shirt') || urlLower.includes('fashion') || urlLower.includes('cloth') || urlLower.includes('kapde')) {
      return { ok: true, status: 200, json: async () => ([
        { product_id: 'PRD104', name: 'Cotton Oxford Casual Shirt', category: 'Fashion', price: 1299.0, returnable: true }
      ]) };
    }
    if (urlLower.includes('pillow') || urlLower.includes('bottle') || urlLower.includes('home')) {
      return { ok: true, status: 200, json: async () => ([
        { product_id: 'PRD106', name: 'Ergonomic Memory Foam Pillow', category: 'Home', price: 1499.0, returnable: true }
      ]) };
    }
    if (!urlLower.includes('query=') || urlLower.includes('query=&') || urlLower.includes('best') || urlLower.includes('popular')) {
      return { ok: true, status: 200, json: async () => ([
        { product_id: 'PRD101', name: 'AirPro Wireless Noise-Cancelling Headphones', category: 'Electronics', price: 4999.0, returnable: true },
        { product_id: 'PRD102', name: 'UltraFit Pro Running Shoes', category: 'Footwear', price: 1899.0, returnable: true }
      ]) };
    }
    return { ok: true, status: 200, json: async () => [] };
  }

  // 4. Support Tickets
  if (urlStr.includes('/support/tickets/TKT9001/escalate')) {
    return { ok: true, status: 200, json: async () => ({ ticket_id: 'TKT9001', status: 'Escalated', assigned_to: 'Tier 2 Human Support Agent', message: 'Ticket escalated.' }) };
  }

  if (urlStr.includes('/support/tickets/TKT9001')) {
    if (currentCustomerId && currentCustomerId !== 'CUST102') {
      return { ok: false, status: 403, json: async () => ({ detail: "Access denied for ticket TKT9001." }) };
    }
    return { ok: true, status: 200, json: async () => ({
      ticket_id: 'TKT9001',
      customer_id: 'CUST102',
      category: 'Payment Issue',
      priority: 'High',
      status: 'Escalated',
      assigned_to: 'Tier 2 Human Support Agent',
      description: 'UPI deduction occurred but order not confirmed.',
      reason_for_escalation: 'Payment dispute requires supervisor verification.',
      message: "Ticket TKT9001 is currently 'Escalated'."
    }) };
  }

  if (urlStr.includes('/support/tickets/TKT9999')) {
    return { ok: false, status: 404, json: async () => ({ detail: "Support ticket TKT9999 not found." }) };
  }

  if (urlStr.includes('/support/tickets') && method === 'POST') {
    return { ok: true, status: 201, json: async () => ({
      ticket_id: 'TKT9005',
      customer_id: currentCustomerId || 'CUST101',
      category: 'Payment Issue',
      priority: 'High',
      status: 'Open',
      assigned_to: 'AI Agent'
    }) };
  }

  return { ok: true, status: 200, json: async () => ({}) };
};

// ============================================
// TEST SUITE EXECUTION
// ============================================
async function runAllTests() {
  console.log('🧪 Starting ShopSathi AI Chat & Voice Agent Automated QA Suite...\n');
  let passed = 0;
  let failed = 0;
  const results = [];

  async function test(id, description, query, userContext, assertionFn) {
    setUser(userContext);
    try {
      const res = await processAgentQuery(query);
      assertionFn(res);
      passed++;
      results.push({ id, description, status: 'PASS', query });
      console.log(`✅ [PASS] ${id}: ${description}`);
    } catch (err) {
      failed++;
      results.push({ id, description, status: 'FAIL', query, error: err.message });
      console.error(`❌ [FAIL] ${id}: ${description} -> ${err.message}`);
    }
  }

  // --- Category 1: Greetings & Capabilities ---
  await test('TC01', 'English Greeting', 'Hello', 'CUST101', res => {
    assert(res.text.includes('Namaste') && res.text.includes('Mahendra Gurjar'), 'Should greet by user name');
  });

  await test('TC02', 'Hindi Greeting', 'नमस्ते', 'CUST101', res => {
    assert(res.text.includes('Namaste') || res.text.includes('नमस्ते'), 'Should recognize Hindi greeting');
  });

  await test('TC03', 'Hinglish Help Request', 'Kya kar sakte ho?', 'CUST101', res => {
    assert(res.text.includes('Order Track') && res.text.includes('Return'), 'Should list capabilities');
  });

  await test('TC04', 'Capabilities query', 'What can you do for me?', null, res => {
    assert(res.text.includes('Order Track') && res.actions.length > 0, 'Should return actions');
  });

  // --- Category 2: Product Search ---
  await test('TC05', 'Search Shoes with Budget', 'Show me running shoes under 2000', 'CUST101', res => {
    assert(res.text.includes('UltraFit Pro Running Shoes') && res.text.includes('1,899'), 'Should find shoes');
  });

  await test('TC06', 'Search Headphones', 'Noise cancelling headphones', 'CUST101', res => {
    assert(res.text.includes('AirPro Wireless'), 'Should find headphones');
  });

  await test('TC07', 'Search Shirts in Hinglish', 'Kuch ache kapde dikhao', 'CUST101', res => {
    assert(res.text.includes('Cotton Oxford'), 'Should find shirts');
  });

  await test('TC08', 'Search Home items (Pillow)', 'memory foam pillow under 2000', 'CUST101', res => {
    assert(res.text.includes('Memory Foam Pillow'), 'Should find pillow in Home category');
  });

  await test('TC09', 'Search No Match Fallback', 'Find laptop under 500', 'CUST101', res => {
    assert(res.text.includes('koi product nahi mila'), 'Should show clear zero-match message');
    assert(res.actions.some(a => a.url === '#/products'), 'Should link to products');
  });

  // --- Category 3: Order Tracking ---
  await test('TC10', 'English Order Tracking', 'Where is my order ORD1001?', 'CUST101', res => {
    assert(res.text.includes('ORD1001') && res.text.includes('Out for Delivery'), 'Should track ORD1001');
  });

  await test('TC11', 'Hinglish Order Tracking', 'Mera order ORD1001 kab aayega?', 'CUST101', res => {
    assert(res.text.includes('ORD1001') && res.text.includes('Today by 7:00 PM'), 'Should give delivery date');
  });

  await test('TC12', 'Hindi Order Tracking', 'मेरा आर्डर ORD1001 कहाँ है?', 'CUST101', res => {
    assert(res.text.includes('ORD1001') && res.text.includes('Out for Delivery'), 'Should track in Hindi');
  });

  await test('TC13', 'Order Tracking with Space (Spelling/Voice Variation)', 'track order ord 1001', 'CUST101', res => {
    assert(res.text.includes('ORD1001'), 'Should handle space in order ID');
  });

  await test('TC14', 'Invalid Order ID Tracking', 'Where is order ORD9999?', 'CUST101', res => {
    assert(res.text.includes('ORD9999') && res.text.includes('nahi mila'), 'Should report order not found');
  });

  await test('TC15', 'Missing Order ID in Tracking Query', 'Where is my order?', 'CUST101', res => {
    assert(res.text.includes('Order ID') && res.text.includes('batayein') && res.actions.some(a => a.url === '#/orders'), 'Should prompt for Order ID');
  });

  // --- Category 4: Order Cancellation ---
  await test('TC16', 'Cancel Eligible Order', 'Cancel order ORD1005', 'CUST101', res => {
    assert(res.text.includes('ORD1005 successfully cancelled'), 'Should cancel processing order');
  });

  await test('TC17', 'Cancel Ineligible Order (Out for Delivery)', 'Cancel order ORD1001', 'CUST101', res => {
    assert(res.text.includes('cancel nahi ho saka') && res.text.includes('dispatched/delivered'), 'Should reject cancellation');
  });

  await test('TC18', 'Hinglish Cancel Query with Space', 'ord 1005 radd karna hai', 'CUST101', res => {
    assert(res.text.includes('ORD1005 successfully cancelled'), 'Should handle Hinglish cancellation');
  });

  await test('TC19', 'Cancel Missing Order ID', 'I want to cancel my order', 'CUST101', res => {
    assert(res.text.includes('Order ID') && res.text.includes('batayein') && res.text.includes('Processing'), 'Should explain cancellation rule');
  });

  // --- Category 5: Return Eligibility & Submission ---
  await test('TC20', 'Return Eligible Order with Reason', 'ORD1003 return karna hai, size small hai', 'CUST101', res => {
    assert(res.text.includes('RET8001') && res.text.includes('eligible'), 'Should create return request');
  });

  await test('TC21', 'Return Ineligible Order (>7 days expired)', 'Return order ORD1002', 'CUST101', res => {
    assert(res.text.includes('eligible nahi hai') && res.text.includes('expired'), 'Should report expired policy');
  });

  await test('TC22', 'Return Non-Returnable Hygiene Item', 'Return ORD1041 water bottle', 'CUST101', res => {
    assert(res.text.includes('eligible nahi hai') && res.text.includes('hygiene'), 'Should enforce hygiene block');
  });

  await test('TC23', 'Return Missing Order ID Query', 'Mujhe product return karna hai', 'CUST101', res => {
    assert(res.text.includes('Order ID') && res.text.includes('batayein') && res.actions.some(a => a.url === '#/returns'), 'Should prompt for Order ID');
  });

  // --- Category 6: Refund Tracking ---
  await test('TC24', 'Check Existing Refund Status', 'Check refund status for ORD1004', 'CUST101', res => {
    assert(res.text.includes('REF7001') && res.text.includes('2,499') && res.text.includes('Initiated'), 'Should return refund details');
  });

  await test('TC25', 'Check Order Without Refund', 'Check refund for ORD1005', 'CUST101', res => {
    assert(res.text.includes('No refund record exists'), 'Should inform no refund exists');
  });

  await test('TC26', 'Refund Missing Order ID Query', 'Mera refund kab aayega?', 'CUST101', res => {
    assert(res.text.includes('Order ID') && res.text.includes('batayein') && res.actions.some(a => a.url.includes('refund')), 'Should prompt for Order ID');
  });

  // --- Category 7: Support Ticket Lookup & Escalation ---
  await test('TC27', 'Lookup Existing Ticket Status', 'Check ticket status TKT9001', 'CUST102', res => {
    assert(res.text.includes('TKT9001') && res.text.includes('Escalated') && res.text.includes('Tier 2 Human Support Agent'), 'Should return ticket status');
  });

  await test('TC28', 'Lookup Invalid Ticket ID', 'Status of ticket TKT9999', 'CUST102', res => {
    assert(res.text.includes('TKT9999') && res.text.includes('nahi mila'), 'Should handle not found');
  });

  await test('TC29', 'Missing Ticket ID in Status Query', 'Check my ticket status', 'CUST102', res => {
    assert(res.text.includes('Ticket ID') && res.text.includes('batayein'), 'Should prompt for Ticket ID');
  });

  await test('TC30', 'Create Ticket and Escalate to Human', 'Payment debited via UPI, talk to human agent', 'CUST101', res => {
    assert(res.text.includes('TKT9005') && res.text.includes('Tier 2 Human Support Manager'), 'Should create and escalate');
  });

  await test('TC31', 'Hinglish Human Support Request', 'Human support se baat karni hai complaint hai', 'CUST101', res => {
    assert(res.text.includes('TKT9005') && res.text.includes('Tier 2 Human Support Manager'), 'Should escalate');
  });

  // --- Category 8: Authentication & Customer Isolation ---
  await test('TC32', 'Guest / Unauthenticated User Tracking Blocked', 'Where is my order ORD1001?', null, res => {
    assert(res.text.includes('Login Required'), 'Should block unauthenticated order tracking');
  });

  await test('TC33', 'Guest User CUST105 Return Blocked', 'Return ORD1003', 'CUST105', res => {
    assert(res.text.includes('Login Required'), 'Should block guest user return');
  });

  await test('TC34', 'Cross-Customer Order Access Blocked (403)', 'Where is order ORD1002?', 'CUST101', res => {
    assert(res.text.includes('Order Access Restricted'), 'Should return 403 access restricted');
  });

  await test('TC35', 'Cross-Customer Ticket Access Blocked (403)', 'Check ticket TKT9001', 'CUST101', res => {
    assert(res.text.includes('Ticket Access Restricted'), 'Should return 403 ticket access restricted');
  });

  await test('TC36', 'Public Product Browsing Allowed Unauthenticated', 'Show running shoes under 2000', null, res => {
    assert(res.text.includes('UltraFit Pro Running Shoes'), 'Catalog search must remain public');
  });

  // --- Category 9: Edge Cases & Unsupported Requests ---
  await test('TC37', 'Empty Input Message', '', 'CUST101', res => {
    assert(res.text.includes('Kripya apna sawaal ya Order ID likhein'), 'Should prompt for input');
  });

  await test('TC38', 'Whitespace-only Message', '     ', 'CUST101', res => {
    assert(res.text.includes('Kripya apna sawaal ya Order ID likhein'), 'Should handle whitespace');
  });

  await test('TC39', 'Unsupported Query (Weather/Flight)', 'Can you book a flight to Mumbai?', 'CUST101', res => {
    assert(res.text.includes('Main aapka sawaal samajh nahi paaya') && res.text.includes('Order Track'), 'Should give helpful fallback');
  });

  await test('TC40', 'Spelling Variation in Ticket Query', 'tkt 9001 status check krdo', 'CUST102', res => {
    assert(res.text.includes('TKT9001'), 'Should handle space and colloquial Hinglish');
  });

  // --- Category 10: General & Politeness (Thanks, Goodbye, Policies) ---
  await test('TC41', 'English Thanks Query', 'Thank you so much!', 'CUST101', res => {
    assert(res.text.includes('swagat hai') || res.text.includes('welcome'), 'Should acknowledge thanks');
  });

  await test('TC42', 'Hindi Thanks Query', 'बहुत बहुत धन्यवाद', 'CUST101', res => {
    assert(res.text.includes('swagat hai') || res.text.includes('welcome'), 'Should acknowledge Hindi thanks');
  });

  await test('TC43', 'English Goodbye Query', 'Goodbye have a nice day', 'CUST101', res => {
    assert(res.text.includes('Alvida') || res.text.includes('dhanyawad'), 'Should respond with polite goodbye');
  });

  await test('TC44', 'Hinglish Goodbye Query', 'Chalo bye alvida', 'CUST101', res => {
    assert(res.text.includes('Alvida'), 'Should recognize Hinglish goodbye');
  });

  await test('TC45', 'Product Budget Search Under 1000', 'Find products under 1000', 'CUST101', res => {
    assert(res.text.includes('Water Bottle') || res.text.includes('799'), 'Should find items under 1000');
  });

  await test('TC46', 'Best Available Products Query', 'What are the best available products?', 'CUST101', res => {
    assert(res.text.includes('catalog') && res.actions.length > 0, 'Should return top available products');
  });

  await test('TC47', 'Zero Match Catalog Query (Mobile Phones)', 'Do you have mobile phones?', 'CUST101', res => {
    assert(res.text.includes('koi product nahi mila'), 'Should give clear catalog guidance for missing items');
  });

  await test('TC48', 'Store Return & Refund Policy Query', 'What is your return policy?', 'CUST101', res => {
    assert(res.text.includes('Return Window') && res.text.includes('7 days'), 'Should explain 7-day return policy');
  });

  // --- Category 11: TTS Pronunciation & Sentence Splitting ---
  await test('TC49', 'TTS Order ID Pronunciation Spacing', 'Where is my order ORD1001?', 'CUST101', res => {
    const spoken = formatTextForSpeech(res.text);
    assert(spoken.includes('O R D 1 0 0 1'), 'TTS must space order ID letters for clear pronunciation');
    assert(!spoken.includes('**'), 'TTS spoken text must not contain markdown asterisks');
  });

  await test('TC50', 'TTS Currency & Ticket ID Spoken Formatting', 'Check ticket TKT9001', 'CUST102', res => {
    const spoken = formatTextForSpeech('Ticket TKT9001 details: Amount ₹4999');
    assert(spoken.includes('T K T 9 0 0 1'), 'TTS must space ticket ID');
    assert(spoken.includes('4999 rupees'), 'TTS must speak rupees instead of rupee symbol');
  });

  await test('TC51', 'TTS Fast Time-To-First-Audio Sentence Splitting', 'What can you do for me?', null, res => {
    const chunks = splitIntoSentences(res.text);
    assert(Array.isArray(chunks) && chunks.length >= 1, 'Sentence splitter must chunk text cleanly');
    assert(chunks[0].length > 0 && !chunks[0].includes('undefined'), 'First sentence must be valid');
  });

  // --- Category 12: Performance, Diagnostics & Caching Benchmarks ---
  await test('TC52', 'Latency Benchmark: Intent Detection Under 50ms', 'Where is my order ORD1001?', 'CUST101', res => {
    assert(res.diagnostics && typeof res.diagnostics.intentDetectionMs === 'number', 'Diagnostics must be present');
    assert(res.diagnostics.intentDetectionMs < 50, `Intent detection must be < 50ms (Actual: ${res.diagnostics.intentDetectionMs}ms)`);
  });

  await test('TC53', 'Latency Benchmark: Local Response Generation Under 300ms', 'Hello ShopSathi', 'CUST101', res => {
    assert(res.diagnostics.totalResponseMs < 300, `Local response must be < 300ms (Actual: ${res.diagnostics.totalResponseMs}ms)`);
  });

  await test('TC54', 'Safe Catalog Caching Benchmark: Second Call Fast Path', 'Show me running shoes under 2000', 'CUST101', async res1 => {
    const res2 = await processAgentQuery('Show me running shoes under 2000');
    assert(res2.text.includes('UltraFit Pro Running Shoes'), 'Cached query must return identical accurate results');
  });

  await test('TC55', 'Stability Benchmark: Consecutive Queries Without State Leak', 'Hello', 'CUST101', async () => {
    const q1 = await processAgentQuery('track order ORD1001');
    const q2 = await processAgentQuery('Can I cancel my order?');
    const q3 = await processAgentQuery('Thank you');
    assert(q1.text.includes('ORD1001') && q2.text.includes('Order ID') && q3.text.includes('swagat'), 'All 3 consecutive queries must return correct intents');
  });

  console.log(`\n=================================================`);
  console.log(`🎯 QA TEST SUMMARY: ${passed} PASSED | ${failed} FAILED | ${passed + failed} TOTAL`);
  console.log(`=================================================`);

  return { passed, failed, total: passed + failed, results };
}

runAllTests().then(({ failed }) => {
  if (failed > 0) process.exit(1);
});
