/**
 * ShopSathi AI Launcher (Floating Button + Interactive Chat + Real-Time Voice Agent)
 */
import { logoIcon, aiChatIcon, micIcon } from '../common/Logo.js';
import {
  getOrderStatus,
  cancelOrder,
  checkReturnEligibility,
  createReturnRequest,
  checkRefundStatus,
  searchProducts,
  createSupportTicket,
  getSupportTicket,
  escalateSupportTicket,
  getLastApiMetrics,
} from '../../services/api.js';
import { getCurrentUser, isAuthenticated } from '../../store/index.js';

// ============================================================================
// Precompiled Regular Expressions for High-Performance Intent Matching (<50ms)
// ============================================================================
const REGEX_ORDER_ID = /\bORD\s*(\d{4})\b/i;
const REGEX_TICKET_ID = /\bTKT\s*([A-Z0-9]{4,8})\b/i;

const REGEX_GREETING = /^(hi|hello|hey|namaste|namaskar|pranam|hola|greetings)\b/i;
const REGEX_GREETING_UNICODE = /^(नमस्ते|नमस्कार|सुप्रभात|प्रणाम)/u;
const REGEX_THANKS = /\b(thank\s*you|thanks|dhanyawad|dhanyavaad|shukriya|shukran)\b/i;
const REGEX_THANKS_UNICODE = /(धन्यवाद|शुक्रिया)/u;
const REGEX_GOODBYE = /\b(bye|goodbye|tata|see\s*you|alvida)\b/i;
const REGEX_GOODBYE_UNICODE = /(अलविदा|बाय)/u;
const REGEX_HELP = /\b(help|madad|kya\s*kar\s*sakte|what\s*can\s*you\s*do|capabilities|who\s*are\s*you|kaun\s*ho)\b/i;

const REGEX_NOISE_CANCEL = /\bnoise\s*[- ]?cancell?ing\b/i;
const REGEX_CANCEL = /\b(cancel|cancellation|cancelled|canceling|radd|band\s*karo|rokna)\b/i;
const REGEX_CANCEL_UNICODE = /(रद्द|कैंसिल|रोकना)/u;
const REGEX_RETURN = /\b(return|wapas|exchange|lautana|badalna)\b/i;
const REGEX_RETURN_UNICODE = /(वापस|लौटाना|रिटर्न|बदलना)/u;
const REGEX_REFUND = /\b(refund|paise|money\s*back|amount\s*back|paisa)\b/i;
const REGEX_REFUND_UNICODE = /(रिफंड|पैसे|वापसी)/u;
const REGEX_TRACKING = /\b(track|where|kaha|kahan|kidhar|status|delivery|kab\s*aayega|kab\s*deliver|kab\s*pahuchega)\b/i;
const REGEX_TRACKING_UNICODE = /(कहाँ|कहा|ट्रैक|स्थिति|पहुंचेगा|कब\s*आएगा|आर्डर)/u;
const REGEX_SUPPORT = /\b(human|agent|dispute|complain|complaint|shikayat|fraud|deduct|insan|madad|adhikari|baat\s*karni|customer\s*care|escalat)\b/i;
const REGEX_SUPPORT_UNICODE = /(शिकायत|मदद)/u;
const REGEX_POLICY = /\b(policy|rule|rules|shartein|terms|return\s*policy|refund\s*policy|cancellation\s*policy)\b/i;

const REGEX_PRICE = /(?:under|below|less\s*than|within|₹|rs\.?)\s*(\d+)/i;
const REGEX_PRICE_ALT = /(\d+)\s*(?:rs|rupees|tak|se\s*kam)/i;
const REGEX_CATALOG_FILTER = /\b(shoe|shoes|sneaker|footwear|running|headphone|headphones|earphone|earphones|shirt|shirts|cloth|clothes|fashion|watch|smartwatch|bottle|bottles|pillow|pillows|product|products|item|items|find|search|under|below|budget|sasta|dikh|dikhao|batao|chahiye|joote|joota|kapde|kapda|botal|takiya|phone|phones|mobile|mobiles|best|available|popular)\b/i;
const REGEX_CATALOG_UNICODE = /(जूते|कपड़े|कपड़े|बोतल|तकिया)/u;
const REGEX_SEARCH_STRIP = /(?:show|me|find|search|please|give|under|below|less than|within|rs\.?|₹|\d+|tak|se kam|kuch|achha|achhe|ache|batao|dikhao|chahiye|product|saman|best|available|top|popular)/gi;

/**
 * Format markdown response into clean, natural spoken speech for TTS.
 * Spells out alphanumeric IDs (ORD1001 -> O R D 1 0 0 1) and removes markdown.
 */
export function formatTextForSpeech(text) {
  if (!text) return '';
  return text
    .replace(/\bORD\s*(\d)(\d)(\d)(\d)\b/gi, 'O R D $1 $2 $3 $4')
    .replace(/\bORD\s*(\d{4})\b/gi, (m, p1) => `O R D ${p1.split('').join(' ')}`)
    .replace(/\bTKT\s*([A-Z0-9]+)\b/gi, (m, p1) => `T K T ${p1.split('').join(' ')}`)
    .replace(/\bRET\s*(\d+)\b/gi, (m, p1) => `R E T ${p1.split('').join(' ')}`)
    .replace(/\bREF\s*(\d+)\b/gi, (m, p1) => `R E F ${p1.split('').join(' ')}`)
    .replace(/₹\s*([0-9,]+)/g, '$1 rupees')
    .replace(/rs\.?\s*([0-9,]+)/gi, '$1 rupees')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_#•`~>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Split long spoken text into manageable sentence chunks for fast Time-To-First-Audio.
 */
export function splitIntoSentences(text) {
  if (!text) return [];
  const sentences = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  return sentences.length > 0 ? sentences : [text];
}

/**
 * Core Agent NLP & Tool Calling Engine
 * Exported for automated unit testing and browser UI execution.
 */
export async function processAgentQuery(queryText) {
  const tStart = (typeof performance !== 'undefined') ? performance.now() : Date.now();

  if (!queryText || typeof queryText !== 'string' || !queryText.trim()) {
    return {
      text: "Kripya apna sawaal ya Order ID likhein (jaise: *'Where is my order ORD1001?'* ya *'Running shoes under 2000'*).",
      diagnostics: { intentDetectionMs: 0.1, apiLatencyMs: 0, backendProcessMs: 0, fromCache: false, totalResponseMs: 0.2 }
    };
  }

  const raw = queryText.trim();
  const lower = raw.toLowerCase();

  // 1. Entity Extraction with precompiled regexes
  const orderRegexMatch = raw.match(REGEX_ORDER_ID);
  const orderId = orderRegexMatch ? `ORD${orderRegexMatch[1]}` : null;

  const ticketRegexMatch = raw.match(REGEX_TICKET_ID);
  const ticketId = ticketRegexMatch ? `TKT${ticketRegexMatch[1].toUpperCase()}` : null;

  // 2. High-Speed Precompiled Intent Classification
  const isGreetingIntent = REGEX_GREETING.test(lower) || REGEX_GREETING_UNICODE.test(lower) || REGEX_HELP.test(lower);
  const isTrackingIntent = REGEX_TRACKING.test(lower) || REGEX_TRACKING_UNICODE.test(lower);
  const isReturnIntent = REGEX_RETURN.test(lower) || REGEX_RETURN_UNICODE.test(lower);
  const isRefundIntent = REGEX_REFUND.test(lower) || REGEX_REFUND_UNICODE.test(lower);
  const isNoiseCancelling = REGEX_NOISE_CANCEL.test(lower);
  const isCancelIntent = !isNoiseCancelling && (REGEX_CANCEL.test(lower) || REGEX_CANCEL_UNICODE.test(lower));
  const isSupportIntent = REGEX_SUPPORT.test(lower) || REGEX_SUPPORT_UNICODE.test(lower);
  const isThanksIntent = REGEX_THANKS.test(lower) || REGEX_THANKS_UNICODE.test(lower);
  const isGoodbyeIntent = REGEX_GOODBYE.test(lower) || REGEX_GOODBYE_UNICODE.test(lower);
  const isPolicyIntent = REGEX_POLICY.test(lower);
  const isCatalogQuery = REGEX_CATALOG_FILTER.test(lower) || REGEX_CATALOG_UNICODE.test(lower);

  const tIntent = (typeof performance !== 'undefined') ? performance.now() : Date.now();
  const rawIntentDelta = tIntent - tStart;
  const intentDetectionMs = rawIntentDelta < 0.001 ? 0.001 : parseFloat(rawIntentDelta.toFixed(3));

  function buildResult(text, actions = []) {
    const tEnd = (typeof performance !== 'undefined') ? performance.now() : Date.now();
    const rawTotalDelta = tEnd - tStart;
    const totalResponseMs = rawTotalDelta < 0.001 ? 0.001 : parseFloat(rawTotalDelta.toFixed(3));
    const apiMetrics = getLastApiMetrics();
    return {
      text,
      actions,
      diagnostics: {
        intentDetectionMs,
        apiLatencyMs: apiMetrics.durationMs || 0,
        backendProcessMs: apiMetrics.backendProcessMs || 0,
        fromCache: apiMetrics.fromCache || false,
        totalResponseMs,
      }
    };
  }

  // ----------------------------------------------------
  // Intent: Thanks / Gratitude
  // ----------------------------------------------------
  if (isThanksIntent && !orderId && !ticketId && !isReturnIntent && !isCancelIntent && !isRefundIntent) {
    return buildResult(
      `Aapka swagat hai! (You're welcome!) 🙏 ShopSathi aapki sewa me hamesha hazir hai. Kya aapko kisi aur cheez me madad chahiye?`,
      [
        { label: '📦 My Orders', url: '#/orders' },
        { label: '🛍️ Shop Products', url: '#/products' }
      ]
    );
  }

  // ----------------------------------------------------
  // Intent: Goodbye / Exit
  // ----------------------------------------------------
  if (isGoodbyeIntent && !orderId && !ticketId) {
    return buildResult(
      `Alvida! ShopSathi use karne ke liye dhanyawad. Have a wonderful day ahead! 🙏`,
      [
        { label: '🛍️ Return to Store', url: '#/' }
      ]
    );
  }

  // ----------------------------------------------------
  // Intent: General Return / Refund / Cancellation Policy
  // ----------------------------------------------------
  if (isPolicyIntent && !orderId && !ticketId) {
    return buildResult(
      `📜 **ShopSathi Store Policies**:\n\n• **Return Window**: 7 days from the delivery date for eligible categories.\n• **Condition**: Product must be unused with original packaging and tags intact.\n• **Non-Returnable Items**: Water bottles, pillows, and personal hygiene items.\n• **Refund Timeline**: 3-5 working days directly to source payment account upon QC verification.\n• **Cancellation**: Orders in *Processing* or *Confirmed* state can be cancelled instantly with full refund.`,
      [
        { label: '↩️ Returns Page', url: '#/returns' },
        { label: '📦 View Orders', url: '#/orders' }
      ]
    );
  }

  // ----------------------------------------------------
  // Intent 1: Greetings & Capabilities
  // ----------------------------------------------------
  if (isGreetingIntent && !orderId && !ticketId && !isReturnIntent && !isCancelIntent && !isRefundIntent) {
    const user = getCurrentUser();
    const nameGreeting = (isAuthenticated() && user && user.name) ? ` **${user.name}**` : '';
    return buildResult(
      `Namaste${nameGreeting}! Main ShopSathi AI Assistant hoon. 🙏\n\nMain aapki in sabhi cheezon me madad kar sakta hoon:\n• **Order Track**: *'Where is my order ORD1001?'* ya *'ORD1001 kaha hai?'*\n• **Return & Exchange**: *'ORD1003 return karna hai'*\n• **Refund Status**: *'Check refund for ORD1004'*\n• **Order Cancellation**: *'Cancel order ORD1005'*\n• **Product Search**: *'Running shoes under 2000'* ya *'Noise cancelling headphones'*\n• **Ticket Status**: *'Check ticket TKT9001'*\n• **Human Escalation**: *'Payment issue, talk to human agent'*`,
      [
        { label: '📦 Track ORD1001', url: '#/orders/ORD1001' },
        { label: '👟 Shoes under ₹2000', url: '#/products?category=Footwear' },
        { label: '🎫 Support Center', url: '#/support' }
      ]
    );
  }

  // ----------------------------------------------------
  // Intent 2: Authentication Check for Private Operations
  // ----------------------------------------------------
  const isPrivateQuery = (orderId || ticketId || isTrackingIntent || isReturnIntent || isRefundIntent || isCancelIntent || lower.includes('ticket'));

  if (!isAuthenticated() && isPrivateQuery && !isCatalogQuery) {
    return buildResult(
      `🔒 **Login Required**\n\nApne orders, returns, refunds ya support tickets access karne ke liye kripya login karein.`,
      [
        { label: '🔑 Login to continue', url: '#/login?redirect=/orders' }
      ]
    );
  }

  // ----------------------------------------------------
  // Intent 3: Support Ticket Status Lookup (e.g. TKT9001)
  // ----------------------------------------------------
  if (ticketId && (isTrackingIntent || lower.includes('ticket') || lower.includes('check') || lower.includes('status') || lower.includes('kya hai') || lower.includes('detail'))) {
    try {
      const ticket = await getSupportTicket(ticketId);
      return buildResult(
        `🎫 **Support Ticket Details (${ticket.ticket_id})**\n\n- **Category**: ${ticket.category || ticket.subject}\n- **Priority**: ${ticket.priority}\n- **Status**: **${ticket.status}**\n- **Assigned To**: ${ticket.assigned_to || 'AI Support'}\n${ticket.order_id ? `- **Linked Order**: ${ticket.order_id}\n` : ''}- **Description**: ${ticket.description}\n${ticket.reason_for_escalation ? `- **Escalation Reason**: ${ticket.reason_for_escalation}\n` : ''}\n${ticket.message || ''}`,
        [
          { label: 'View in Support Center', url: '#/support' }
        ]
      );
    } catch (err) {
      if (err.status === 401) {
        return buildResult(`🔒 **Login Required**\n\nPlease log in to view ticket details.`, [{ label: 'Login to continue', url: '#/login?redirect=/support' }]);
      }
      if (err.status === 403) {
        return buildResult(`🔒 **Ticket Access Restricted**\n\nAap sirf apne account ke create kiye hue support tickets dekh sakte hain.`);
      }
      return buildResult(`Ticket **${ticketId}** nahi mila. Kripya apna Ticket ID check karein ya [Support Center](#/support) me naya ticket banayein.`);
    }
  }

  // ----------------------------------------------------
  // Intent 4: Order Tracking (e.g. ORD1001)
  // ----------------------------------------------------
  if (orderId && isTrackingIntent && !isReturnIntent && !isRefundIntent && !isCancelIntent) {
    try {
      const order = await getOrderStatus(orderId);
      return buildResult(
        `Aapka order **${order.order_id}** (${order.product_name}) filhaal **${order.status}** hai.\n\n📅 Expected Delivery: **${order.expected_delivery || 'Soon'}**\n💰 Amount: ₹${order.amount.toLocaleString('en-IN')}\n📍 Shipping Partner: BlueDart Express`,
        [
          { label: `View Timeline for ${order.order_id}`, url: `#/orders/${order.order_id}` }
        ]
      );
    } catch (err) {
      if (err.status === 401) {
        return buildResult(`🔒 **Login Required**\n\nPlease log in to access your order information.`, [{ label: 'Login to continue', url: '#/login' }]);
      }
      if (err.status === 403) {
        return buildResult(`🔒 **Order Access Restricted**\n\nYou can only view orders associated with your account.`);
      }
      return buildResult(`Order **${orderId}** nahi mila. Kripya apna Order ID check karein.`);
    }
  }

  // ----------------------------------------------------
  // Intent 5: Return Eligibility & Submission (e.g. ORD1003)
  // ----------------------------------------------------
  if (orderId && isReturnIntent) {
    try {
      const elig = await checkReturnEligibility(orderId);
      if (elig.eligible) {
        const reasonClean = raw
          .replace(new RegExp(`.*${orderId}`, 'i'), '')
          .replace(/(?:return|wapas|exchange|karna|hai|please|karo|chahiye|de do|reason|size)/gi, '')
          .trim() || 'Size issue / Not as expected';
        const returnRes = await createReturnRequest(orderId, reasonClean);
        return buildResult(
          `✅ Order **${orderId}** return ke liye eligible hai!\n\nMaine aapka Return Request submit kar diya hai:\n🆔 **Return ID: ${returnRes.return_id}**\n📝 **Reason**: ${reasonClean}\n🚚 Pickup agle 24-48 ghanto me schedule ho jayega.`,
          [
            { label: 'Check Returns & Refunds', url: `#/returns?order=${orderId}` }
          ]
        );
      } else {
        return buildResult(
          `⚠️ Order **${orderId}** return ke liye eligible nahi hai.\n\n**Reason**: ${elig.reason}`,
          [
            { label: 'View Return Policy', url: '#/returns' }
          ]
        );
      }
    } catch (err) {
      if (err.status === 401) return buildResult(`🔒 **Login Required**\n\nPlease log in to request returns.`, [{ label: 'Login to continue', url: '#/login' }]);
      if (err.status === 403) return buildResult(`🔒 **Order Access Restricted**\n\nYou can only return orders associated with your account.`);
      return buildResult(`Return check failed: ${err.message}`);
    }
  }

  // ----------------------------------------------------
  // Intent 6: Refund Status Check (e.g. ORD1004)
  // ----------------------------------------------------
  if (orderId && isRefundIntent) {
    try {
      const ref = await checkRefundStatus(orderId);
      return buildResult(
        `💰 **Refund Status for ${orderId}**\n\n- Refund ID: **${ref.refund_id}**\n- Amount: **₹${ref.amount.toLocaleString('en-IN')}**\n- Status: **${ref.refund_status}**\n- Expected Date: **${ref.expected_date || 'N/A'}**\n\n${ref.message}`,
        [
          { label: 'View Refund Details', url: `#/returns?order=${orderId}&action=refund` }
        ]
      );
    } catch (err) {
      if (err.status === 401) return buildResult(`🔒 **Login Required**\n\nPlease log in to check refund status.`, [{ label: 'Login to continue', url: '#/login' }]);
      if (err.status === 403) return buildResult(`🔒 **Order Access Restricted**\n\nYou can only check refunds for orders associated with your account.`);
      return buildResult(`Order **${orderId}** ke liye refund details: ${err.message}`);
    }
  }

  // ----------------------------------------------------
  // Intent 7: Order Cancellation (e.g. ORD1005)
  // ----------------------------------------------------
  if (orderId && isCancelIntent) {
    try {
      const cancelRes = await cancelOrder(orderId);
      return buildResult(
        `❌ ${cancelRes.message}\n\nAgar payment ho chuka tha toh 3-5 working days me aapke source account me refund aa jayega.`,
        [
          { label: 'View Order Status', url: `#/orders/${orderId}` }
        ]
      );
    } catch (err) {
      if (err.status === 401) return buildResult(`🔒 **Login Required**\n\nPlease log in to cancel orders.`, [{ label: 'Login to continue', url: '#/login' }]);
      if (err.status === 403) return buildResult(`🔒 **Order Access Restricted**\n\nYou can only cancel orders associated with your account.`);
      return buildResult(`Order **${orderId}** cancel nahi ho saka: ${err.message}`);
    }
  }

  // ----------------------------------------------------
  // Intent 8: Missing Order ID / Incomplete Queries
  // ----------------------------------------------------
  if (!orderId && !ticketId) {
    if (isTrackingIntent && (lower.includes('order') || lower.includes('parcel') || lower.includes('package') || lower.includes('saman') || lower.includes('shipment'))) {
      return buildResult(
        `Aapko kaunsa order track karna hai? Kripya apna **Order ID** batayein (jaise **ORD1001**), ya [My Orders](#/orders) page par apna order select karein.`,
        [
          { label: '📦 Open My Orders', url: '#/orders' }
        ]
      );
    }
    if (isReturnIntent) {
      return buildResult(
        `Aapko kaunsa product return karna hai? Kripya apna **Order ID** batayein (jaise **ORD1003**), ya [Returns & Refunds](#/returns) page par return initiate karein.`,
        [
          { label: '↩️ Open Returns Page', url: '#/returns' }
        ]
      );
    }
    if (isCancelIntent) {
      return buildResult(
        `Aap kaunsa order cancel karna chahte hain? Kripya apna **Order ID** batayein (jaise **ORD1005**). Dhyan rahe sirf **Processing** aur **Confirmed** orders hi cancel ho sakte hain.`,
        [
          { label: '📦 View Orders to Cancel', url: '#/orders' }
        ]
      );
    }
    if (isRefundIntent) {
      return buildResult(
        `Refund status check karne ke liye kripya apna **Order ID** batayein (jaise **ORD1004**), ya [Returns & Refunds](#/returns) page par refund status check karein.`,
        [
          { label: '💰 Check Refunds', url: '#/returns?action=refund' }
        ]
      );
    }
    if (lower.includes('ticket status') || lower.includes('check ticket') || lower.includes('ticket check') || lower.includes('mera ticket')) {
      return buildResult(
        `Kripya apna **Ticket ID** batayein (jaise **TKT9001**), ya [Support Center](#/support) page par apne active tickets dekhein.`,
        [
          { label: '🎫 Open Support Center', url: '#/support' }
        ]
      );
    }
  }

  // ----------------------------------------------------
  // Intent 9: Product Search by Name, Category, Budget, or "Best available"
  // ----------------------------------------------------
  const isProductSearch = isCatalogQuery || lower.includes('batao') || lower.includes('chahiye') || lower.includes('dikhao') ||
    lower.includes('sasta') || lower.includes('price') || lower.includes('cost') || lower.includes('range') ||
    lower.includes('best') || lower.includes('popular');

  if (isProductSearch && !isReturnIntent && !isCancelIntent && !isRefundIntent && !ticketId) {
    const priceMatch = raw.match(REGEX_PRICE) || raw.match(REGEX_PRICE_ALT);
    const maxPrice = priceMatch ? parseFloat(priceMatch[1]) : null;

    let cat = null;
    if (lower.includes('shoe') || lower.includes('footwear') || lower.includes('sneaker') || lower.includes('running') || lower.includes('joote') || lower.includes('joota') || lower.includes('जूते')) {
      cat = 'Footwear';
    } else if (lower.includes('headphone') || lower.includes('earphone') || lower.includes('audio') || lower.includes('watch') || lower.includes('smartwatch') || lower.includes('electronics') || lower.includes('gadget') || lower.includes('ghadi') || lower.includes('घड़ी') || lower.includes('phone') || lower.includes('mobile')) {
      cat = 'Electronics';
    } else if (lower.includes('shirt') || lower.includes('cloth') || lower.includes('clothes') || lower.includes('fashion') || lower.includes('apparel') || lower.includes('casual') || lower.includes('kapde') || lower.includes('tshirt') || lower.includes('kurta') || lower.includes('कपड़े') || lower.includes('कपड़े')) {
      cat = 'Fashion';
    } else if (lower.includes('bottle') || lower.includes('pillow') || lower.includes('foam') || lower.includes('botal') || lower.includes('takiya') || lower.includes('home') || lower.includes('बोतल') || lower.includes('तकिया')) {
      cat = 'Home';
    }

    const searchTerms = raw.replace(REGEX_SEARCH_STRIP, '').trim();

    try {
      const products = await searchProducts(searchTerms, maxPrice, cat);
      if (products && products.length > 0) {
        const listStr = products.slice(0, 3).map(p => `• **${p.name}** — ₹${p.price.toLocaleString('en-IN')} (*${p.category}*)`).join('\n');
        return buildResult(
          `Here is what I found for you in our catalog:\n\n${listStr}`,
          [
            ...products.slice(0, 2).map(p => ({
              label: `View ${p.name.slice(0, 20)}...`,
              url: `#/products/${p.product_id}`
            })),
            { label: '🛍️ All Products', url: '#/products' }
          ]
        );
      } else {
        return buildResult(
          `Aapke search ke anusaar koi product nahi mila. Aap hamare catalog me **Shoes**, **Headphones**, **Smartwatches**, **Shirts**, ya **Memory Foam Pillows** search kar sakte hain.`,
          [
            { label: '🛍️ Browse All Products', url: '#/products' }
          ]
        );
      }
    } catch (e) {
      // Fallback
    }
  }

  // ----------------------------------------------------
  // Intent 10: Support Ticket Creation & Human Escalation
  // ----------------------------------------------------
  if (isSupportIntent) {
    const user = getCurrentUser();
    if (!isAuthenticated() || !user || !user.customer_id) {
      return buildResult(
        `🔒 **Login Required**\n\nSupport ticket create karne ya human agent se judne ke liye kripya login karein.`,
        [
          { label: '🔑 Login to continue', url: '#/login?redirect=/support' }
        ]
      );
    }

    try {
      const tkt = await createSupportTicket({
        customerId: user.customer_id,
        description: raw,
        category: lower.includes('payment') ? 'Payment Issue' : (lower.includes('ship') || lower.includes('delay') ? 'Shipping Delay' : 'General Support'),
        priority: 'High',
        orderId: orderId || undefined
      });

      // Auto-escalate if human agent explicitly requested
      if (lower.includes('human') || lower.includes('agent') || lower.includes('escalate') || lower.includes('baat karni') || lower.includes('insan') || lower.includes('adhikari')) {
        await escalateSupportTicket(tkt.ticket_id, 'Customer explicitly requested Tier 2 Human Support assistance.');
        return buildResult(
          `I understand your concern. I have created **Support Ticket ${tkt.ticket_id}** and escalated it directly to our **Tier 2 Human Support Manager**.\n\nA human representative will review your issue and reach out shortly.`,
          [
            { label: `Check Ticket ${tkt.ticket_id}`, url: '#/support' }
          ]
        );
      }

      return buildResult(
        `I have created Support Ticket **${tkt.ticket_id}** for you with High priority.\n\nStatus: **${tkt.status}** (Assigned to: ${tkt.assigned_to})`,
        [
          { label: 'View in Support Center', url: '#/support' }
        ]
      );
    } catch (err) {
      return buildResult(`Ticket note: ${err.message}`);
    }
  }

  // ----------------------------------------------------
  // Intent 11: Unknown / Unsupported Questions Clarification
  // ----------------------------------------------------
  return buildResult(
    `Main aapka sawaal samajh nahi paaya. Main ShopSathi AI Assistant hoon, aur main in cheezon me madad kar sakta hoon:\n\n• **Order Track**: *'Where is my order ORD1001?'*\n• **Return Item**: *'ORD1003 return karna hai'*\n• **Refund Status**: *'Check refund for ORD1004'*\n• **Cancel Order**: *'Cancel order ORD1005'*\n• **Search Products**: *'Show running shoes under 2000'*\n• **Ticket Status**: *'Check ticket TKT9001'*\n• **Human Agent**: *'Talk to human support'*`,
    [
      { label: '📦 My Orders', url: '#/orders' },
      { label: '🛍️ Explore Catalog', url: '#/products' },
      { label: '🎫 Support Center', url: '#/support' }
    ]
  );
}

/**
 * Main AI Launcher Component
 */
export function renderAiLauncher() {
  const wrapper = document.createElement('div');
  wrapper.className = 'ai-launcher-wrapper';
  wrapper.innerHTML = `
    <!-- Floating Button -->
    <button class="ai-fab" id="ai-fab" aria-label="Ask ShopSathi AI">
      <span class="ai-fab-icon">${aiChatIcon(24)}</span>
      <span class="ai-fab-label">Ask ShopSathi</span>
    </button>

    <!-- Quick menu -->
    <div class="ai-menu" id="ai-menu">
      <div class="ai-menu-header">
        <div class="flex items-center gap-3">
          ${logoIcon(28)}
          <div>
            <h4 style="margin:0;font-size:0.95rem;">Ask ShopSathi</h4>
            <p style="margin:0;font-size:0.75rem;color:var(--color-text-tertiary);">AI Shopping & Customer Support</p>
          </div>
        </div>
        <button class="btn-icon" id="ai-menu-close" aria-label="Close" style="font-size:1.2rem;opacity:0.6;">&times;</button>
      </div>
      <div class="ai-menu-options">
        <button class="ai-option-btn" id="ai-open-chat">
          <span class="ai-option-icon">💬</span>
          <div>
            <strong>Chat with ShopSathi</strong>
            <span>AI Assistant • Instant API actions</span>
          </div>
        </button>
        <button class="ai-option-btn" id="ai-open-voice">
          <span class="ai-option-icon">🎙️</span>
          <div>
            <strong>Talk to ShopSathi Voice</strong>
            <span>Web Speech Engine • Hands-Free Voice</span>
          </div>
        </button>
      </div>
      <div class="ai-quick-actions">
        <span class="ai-quick-label">Quick Actions</span>
        <div class="ai-chips">
          <button class="ai-chip" data-action="track">📦 Track order</button>
          <button class="ai-chip" data-action="cancel">❌ Cancel order</button>
          <button class="ai-chip" data-action="return">↩️ Return item</button>
          <button class="ai-chip" data-action="refund">💰 Check refund</button>
          <button class="ai-chip" data-action="search">🔍 Find product</button>
          <button class="ai-chip" data-action="ticket">🎫 Support ticket</button>
        </div>
      </div>
    </div>

    <!-- Chat Panel -->
    <div class="ai-panel" id="ai-panel">
      <div class="ai-panel-header">
        <div class="flex items-center gap-3">
          ${logoIcon(28)}
          <div>
            <h4 style="margin:0;font-size:0.95rem;">ShopSathi Chat Agent</h4>
            <div class="flex items-center gap-1">
              <span class="badge badge-success" style="font-size:0.65rem;padding:2px 6px;">● Online</span>
              <span style="font-size:0.65rem;color:var(--color-text-tertiary);">Interactive Assistant</span>
            </div>
          </div>
        </div>
        <div class="flex gap-1 items-center">
          <button class="btn-icon" id="ai-panel-voice" aria-label="Switch to voice" title="Switch to Real-Time Voice" style="color:var(--color-accent);">${micIcon(18)}</button>
          <button class="btn-icon" id="ai-panel-close" aria-label="Close" style="font-size:1.3rem;opacity:0.6;">&times;</button>
        </div>
      </div>
      <div class="ai-panel-body" id="ai-chat-body">
        <div class="ai-message ai-message-bot">
          <div class="ai-avatar">${logoIcon(24)}</div>
          <div class="ai-bubble">
            <p>Namaste! I'm <strong>ShopSathi</strong>, your smart shopping & support assistant. 🙏</p>
            <p style="margin-top:8px;">You can ask me in English, Hindi, or Hinglish to:</p>
            <ul style="margin-top:6px;padding-left:16px;font-size:0.85rem;line-height:1.6;">
              <li>Track order: <em>"Mera order ORD1001 kaha hai?"</em></li>
              <li>Return product: <em>"ORD1003 return karna hai"</em></li>
              <li>Check refund: <em>"ORD1004 ka refund status kya hai?"</em></li>
              <li>Search products: <em>"Show running shoes under 2000"</em></li>
              <li>Check ticket: <em>"Status of ticket TKT9001"</em></li>
              <li>Human support: <em>"Payment issue, talk to human agent"</em></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="ai-panel-chips">
        <button class="ai-chip" data-msg="Where is my order ORD1001?">📦 Track ORD1001</button>
        <button class="ai-chip" data-msg="ORD1003 return karna hai, size small hai">↩️ Return ORD1003</button>
        <button class="ai-chip" data-msg="Check refund status for ORD1004">💰 Refund ORD1004</button>
        <button class="ai-chip" data-msg="Show me running shoes under 2000">👟 Shoes under ₹2000</button>
        <button class="ai-chip" data-msg="Check ticket status TKT9001">🎫 Ticket TKT9001</button>
      </div>
      <div class="ai-panel-input">
        <input type="text" id="ai-chat-input" class="form-input" placeholder="Type in English, Hindi, or Hinglish..." aria-label="Chat message">
        <button class="btn btn-primary btn-icon" id="ai-send-btn" aria-label="Send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>

    <!-- Voice Panel -->
    <div class="ai-voice-panel" id="ai-voice-panel">
      <div class="ai-panel-header">
        <div class="flex items-center gap-3">
          ${logoIcon(28)}
          <div>
            <h4 style="margin:0;font-size:0.95rem;">ShopSathi Voice Agent</h4>
            <div class="flex items-center gap-1">
              <span class="badge badge-accent" style="font-size:0.65rem;padding:2px 6px;">Real-Time Voice</span>
              <span style="font-size:0.65rem;color:var(--color-text-tertiary);">Web Speech API</span>
            </div>
          </div>
        </div>
        <button class="btn-icon" id="ai-voice-close" aria-label="Close" style="font-size:1.3rem;opacity:0.6;">&times;</button>
      </div>
      <div class="ai-voice-body">
        <!-- Voice Language Selector -->
        <div class="voice-lang-bar" style="display:flex;gap:8px;justify-content:center;margin-bottom:12px;">
          <button class="btn btn-sm btn-primary voice-lang-btn" id="lang-en" data-lang="en-IN" style="font-size:0.75rem;padding:3px 10px;">English / Hinglish (en-IN)</button>
          <button class="btn btn-sm btn-outline voice-lang-btn" id="lang-hi" data-lang="hi-IN" style="font-size:0.75rem;padding:3px 10px;">हिंदी (hi-IN)</button>
        </div>

        <div class="ai-voice-visual">
          <div class="ai-voice-ring" id="voice-ring"></div>
          <div class="ai-voice-icon" id="voice-icon">${micIcon(44)}</div>
        </div>

        <div class="ai-voice-status-wrap">
          <span class="badge badge-neutral" id="voice-state-badge">Ready</span>
          <p class="ai-voice-status" id="voice-status">Tap Start Conversation to speak</p>
          <p class="ai-voice-hint" id="voice-hint">Supports English, Hindi & Hinglish voice input</p>
        </div>

        <!-- Voice Live Transcript Box -->
        <div class="voice-transcript-box" id="voice-transcript-box" style="display:none;">
          <div class="voice-transcript-line" id="voice-user-transcript"></div>
          <div class="voice-transcript-line bot" id="voice-agent-transcript"></div>
        </div>

        <div class="ai-voice-controls">
          <button class="btn btn-lg btn-primary ai-voice-start" id="voice-start-btn">
            ${micIcon(20)} Start Conversation
          </button>
          <div class="flex gap-2 justify-center" id="voice-active-controls" style="display:none;width:100%;">
            <button class="btn btn-outline btn-sm" id="voice-mute-btn" title="Mute Microphone">
              🎙️ <span id="mute-label">Mute</span>
            </button>
            <button class="btn btn-outline btn-sm" id="voice-speaker-btn" title="Toggle Audio Output">
              🔊 Speaker
            </button>
            <button class="btn btn-danger btn-sm" id="voice-stop-btn">
              End Call
            </button>
          </div>
        </div>

        <div class="ai-voice-phone-bar">
          <span style="font-size:0.75rem;color:var(--color-text-tertiary);">For further assistance, contact support:</span>
          <span class="voice-phone-link" style="font-size:0.85rem;font-weight:600;color:var(--color-primary);">
            📧 support@shopsathi.ai
          </span>
        </div>

        <div class="ai-voice-info-chips">
          <button class="ai-chip voice-demo-chip" data-speak="Mera order ORD1001 kaha hai?">"Mera order ORD1001 kaha hai?"</button>
          <button class="ai-chip voice-demo-chip" data-speak="ORD1003 return karna hai">"ORD1003 return karna hai"</button>
          <button class="ai-chip voice-demo-chip" data-speak="Check refund status for ORD1004">"Check refund for ORD1004"</button>
          <button class="ai-chip voice-demo-chip" data-speak="Show me running shoes under 2000">"Shoes under 2000"</button>
          <button class="ai-chip voice-demo-chip" data-speak="Human support se baat karni hai">"Human agent se baat karni hai"</button>
        </div>
      </div>
    </div>
  `;

  // State
  let menuOpen = false;
  let chatOpen = false;
  let voiceOpen = false;
  let voiceActive = false;
  let isMuted = false;
  let isSpeakerMuted = false;
  let isVoiceProcessing = false;
  let currentVoiceLang = 'en-IN';
  let recognition = null;
  let synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  const fab = wrapper.querySelector('#ai-fab');
  const menu = wrapper.querySelector('#ai-menu');
  const panel = wrapper.querySelector('#ai-panel');
  const voicePanel = wrapper.querySelector('#ai-voice-panel');

  function closeAll() {
    menuOpen = chatOpen = voiceOpen = false;
    menu.classList.remove('open');
    panel.classList.remove('open');
    voicePanel.classList.remove('open');
    fab.classList.remove('active');
    if (voiceActive) stopVoiceSession(true);
  }

  function openMenu() {
    closeAll();
    menuOpen = true;
    menu.classList.add('open');
    fab.classList.add('active');
  }

  function openChat() {
    closeAll();
    chatOpen = true;
    panel.classList.add('open');
    fab.classList.add('active');
    wrapper.querySelector('#ai-chat-input')?.focus();
  }

  function openVoice() {
    closeAll();
    voiceOpen = true;
    voicePanel.classList.add('open');
    fab.classList.add('active');
  }

  fab.addEventListener('click', () => {
    if (menuOpen || chatOpen || voiceOpen) closeAll();
    else openMenu();
  });

  wrapper.querySelector('#ai-menu-close').addEventListener('click', closeAll);
  wrapper.querySelector('#ai-panel-close').addEventListener('click', closeAll);
  wrapper.querySelector('#ai-voice-close').addEventListener('click', closeAll);

  wrapper.querySelector('#ai-open-chat').addEventListener('click', openChat);
  wrapper.querySelector('#ai-open-voice').addEventListener('click', openVoice);
  wrapper.querySelector('#ai-panel-voice').addEventListener('click', openVoice);

  // Quick action chips in menu
  wrapper.querySelectorAll('.ai-menu-options + .ai-quick-actions .ai-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const action = chip.dataset.action;
      closeAll();
      const routes = {
        track: '#/orders',
        cancel: '#/orders',
        return: '#/returns',
        refund: '#/returns',
        search: '#/products',
        ticket: '#/support',
      };
      if (routes[action]) window.location.hash = routes[action];
    });
  });

  // ==========================================
  // Interactive Chat Agent Logic
  // ==========================================
  const chatInput = wrapper.querySelector('#ai-chat-input');
  const chatBody = wrapper.querySelector('#ai-chat-body');
  const sendBtn = wrapper.querySelector('#ai-send-btn');

  async function sendMessage(text) {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-message ai-message-user';
    userMsg.innerHTML = `<div class="ai-bubble">${escapeHtml(cleanText)}</div>`;
    chatBody.appendChild(userMsg);
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Typing bubble
    const typingEl = document.createElement('div');
    typingEl.className = 'ai-message ai-message-bot';
    typingEl.innerHTML = `<div class="ai-avatar">${logoIcon(24)}</div><div class="ai-bubble ai-typing"><span></span><span></span><span></span></div>`;
    chatBody.appendChild(typingEl);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Execute through agent logic
    try {
      const response = await processAgentQuery(cleanText);
      typingEl.remove();

      const botMsg = document.createElement('div');
      botMsg.className = 'ai-message ai-message-bot';

      let formattedHtml = markdownToHtml(response.text);
      let actionsHtml = '';
      if (response.actions && response.actions.length > 0) {
        actionsHtml = `<div class="ai-bubble-actions" style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;">
          ${response.actions.map(a => `<a href="${a.url}" class="btn btn-outline btn-sm" style="font-size:0.75rem;padding:4px 8px;">${a.label}</a>`).join('')}
        </div>`;
      }

      botMsg.innerHTML = `
        <div class="ai-avatar">${logoIcon(24)}</div>
        <div class="ai-bubble">
          ${formattedHtml}
          ${actionsHtml}
        </div>`;
      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    } catch (err) {
      typingEl.remove();
      const errEl = document.createElement('div');
      errEl.className = 'ai-message ai-message-bot';
      errEl.innerHTML = `
        <div class="ai-avatar">${logoIcon(24)}</div>
        <div class="ai-bubble" style="border-left:3px solid var(--color-error);">
          <p>Sorry, I encountered an issue processing that. Please try again or check your connection.</p>
        </div>`;
      chatBody.appendChild(errEl);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  sendBtn.addEventListener('click', () => sendMessage(chatInput.value));
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage(chatInput.value);
  });

  // Chat chips
  wrapper.querySelectorAll('.ai-panel-chips .ai-chip').forEach(chip => {
    chip.addEventListener('click', () => sendMessage(chip.dataset.msg));
  });

  // ==========================================
  // Real-Time Voice Agent Engine (Optimized & Hardened)
  // ==========================================
  const voiceStartBtn = wrapper.querySelector('#voice-start-btn');
  const voiceStopBtn = wrapper.querySelector('#voice-stop-btn');
  const voiceMuteBtn = wrapper.querySelector('#voice-mute-btn');
  const muteLabel = wrapper.querySelector('#mute-label');
  const voiceSpeakerBtn = wrapper.querySelector('#voice-speaker-btn');
  const voiceActiveControls = wrapper.querySelector('#voice-active-controls');
  const voiceStatus = wrapper.querySelector('#voice-status');
  const voiceHint = wrapper.querySelector('#voice-hint');
  const voiceStateBadge = wrapper.querySelector('#voice-state-badge');
  const voiceRing = wrapper.querySelector('#voice-ring');
  const transcriptBox = wrapper.querySelector('#voice-transcript-box');
  const userTranscript = wrapper.querySelector('#voice-user-transcript');
  const agentTranscript = wrapper.querySelector('#voice-agent-transcript');
  const langEnBtn = wrapper.querySelector('#lang-en');
  const langHiBtn = wrapper.querySelector('#lang-hi');

  let isRecognizing = false;
  let isSpeaking = false;
  let cachedVoices = [];

  function loadCachedVoices() {
    if (synth && synth.getVoices) {
      cachedVoices = synth.getVoices() || [];
    }
  }

  if (synth) {
    loadCachedVoices();
    if (typeof synth.onvoiceschanged !== 'undefined') {
      synth.onvoiceschanged = () => loadCachedVoices();
    }
  }

  function selectBestVoice(targetLang) {
    if (!cachedVoices || cachedVoices.length === 0) loadCachedVoices();
    if (!cachedVoices || cachedVoices.length === 0) return null;

    const lowerLang = (targetLang || 'en-IN').toLowerCase();
    const prefix = lowerLang.split('-')[0];

    // 1. Exact match (e.g. hi-IN or en-IN)
    let match = cachedVoices.find(v => v.lang && v.lang.toLowerCase() === lowerLang);
    if (match) return match;

    // 2. Prefix match (e.g. 'hi' for Hindi, 'en' for English)
    match = cachedVoices.find(v => v.lang && v.lang.toLowerCase().startsWith(prefix));
    if (match) return match;

    // 3. Fallback for Indian English
    if (prefix === 'en') {
      match = cachedVoices.find(v => v.lang && (v.lang.includes('en-GB') || v.lang.includes('en-US')));
      if (match) return match;
    }

    return cachedVoices.find(v => v.default) || cachedVoices[0] || null;
  }

  function setVoiceLanguage(lang) {
    currentVoiceLang = lang;
    if (lang === 'hi-IN') {
      langHiBtn?.classList.remove('btn-outline');
      langHiBtn?.classList.add('btn-primary');
      langEnBtn?.classList.remove('btn-primary');
      langEnBtn?.classList.add('btn-outline');
      if (voiceHint) voiceHint.textContent = 'हिंदी वॉइस इनपुट सक्रिय (hi-IN)';
    } else {
      langEnBtn?.classList.remove('btn-outline');
      langEnBtn?.classList.add('btn-primary');
      langHiBtn?.classList.remove('btn-primary');
      langHiBtn?.classList.add('btn-outline');
      if (voiceHint) voiceHint.textContent = 'Supports English & Hinglish voice input (en-IN)';
    }

    // Switch recognition language live without refreshing
    if (recognition) {
      const wasRecognizing = isRecognizing;
      safeStopRecognition();
      recognition.lang = currentVoiceLang;
      if (wasRecognizing && voiceActive && !isMuted && !isSpeaking && !isVoiceProcessing) {
        setTimeout(() => safeStartRecognition(), 100);
      }
    }
  }

  langEnBtn?.addEventListener('click', () => setVoiceLanguage('en-IN'));
  langHiBtn?.addEventListener('click', () => setVoiceLanguage('hi-IN'));

  function setVoiceState(state, message, hint) {
    const badgeMap = {
      'Ready': 'badge-neutral',
      'Connecting': 'badge-warning',
      'Connected': 'badge-success',
      'Listening': 'badge-accent',
      'Processing': 'badge-primary',
      'Speaking': 'badge-success',
      'Error': 'badge-error',
      'Ended': 'badge-neutral',
    };

    voiceStateBadge.className = `badge ${badgeMap[state] || 'badge-neutral'}`;
    voiceStateBadge.textContent = state;
    if (message) voiceStatus.textContent = message;
    if (hint) voiceHint.textContent = hint;

    // Visual ring animations
    voiceRing.className = 'ai-voice-ring';
    if (state === 'Connecting' || state === 'Processing') {
      voiceRing.classList.add('active');
    } else if (state === 'Listening') {
      voiceRing.classList.add('listening');
    } else if (state === 'Speaking') {
      voiceRing.classList.add('speaking');
    }
  }

  function safeStartRecognition() {
    if (!voiceActive || isMuted || isSpeaking || isVoiceProcessing || isRecognizing) return;
    if (!recognition) {
      recognition = initSpeechRecognition();
      if (!recognition) return;
    }
    try {
      recognition.start();
    } catch (err) {
      // Ignore if recognition already active
    }
  }

  function safeStopRecognition() {
    if (recognition && isRecognizing) {
      try {
        recognition.stop();
      } catch (err) {}
    }
    isRecognizing = false;
  }

  async function speakText(text, onComplete) {
    agentTranscript.innerHTML = `<strong>ShopSathi:</strong> ${escapeHtml(text)}`;

    if (isSpeakerMuted || !synth) {
      isSpeaking = false;
      isVoiceProcessing = false;
      if (voiceActive && !isMuted) {
        setVoiceState('Listening', isSpeakerMuted ? 'Speaker Muted (Text Displayed)' : 'Speech Output Unavailable', 'Listening for your voice...');
        safeStartRecognition();
      }
      if (onComplete) onComplete();
      return;
    }

    // Cancel any prior speech
    synth.cancel();
    isSpeaking = true;

    // Concurrency Lock: Stop mic during speech output to prevent acoustic feedback loop
    safeStopRecognition();

    setVoiceState('Speaking', 'ShopSathi is speaking...', 'Voice Agent Active • Synthesizing Speech');

    const cleanSpoken = formatTextForSpeech(text);
    const utter = new SpeechSynthesisUtterance(cleanSpoken);
    utter.lang = currentVoiceLang;
    utter.rate = 1.0;
    utter.pitch = 1.0;

    const matchedVoice = selectBestVoice(currentVoiceLang);
    if (matchedVoice) utter.voice = matchedVoice;

    utter.onend = () => {
      isSpeaking = false;
      isVoiceProcessing = false;
      if (voiceActive && !isMuted) {
        setVoiceState('Listening', 'Listening for your voice...', 'Speak in English, Hindi, or Hinglish');
        safeStartRecognition();
      }
      if (onComplete) onComplete();
    };

    utter.onerror = () => {
      isSpeaking = false;
      isVoiceProcessing = false;
      if (voiceActive && !isMuted) {
        setVoiceState('Listening', 'Listening...', 'Tap mute or speak');
        safeStartRecognition();
      }
      if (onComplete) onComplete();
    };

    synth.speak(utter);
  }

  async function handleVoiceInput(spokenText) {
    if (!spokenText || !spokenText.trim() || isVoiceProcessing) return;
    const tSpeechEnd = (typeof performance !== 'undefined') ? performance.now() : Date.now();
    isVoiceProcessing = true;

    safeStopRecognition();
    setVoiceState('Processing', 'Processing with ShopSathi AI...', 'Executing API tools...');
    userTranscript.innerHTML = `<strong>You:</strong> "${escapeHtml(spokenText)}"`;
    transcriptBox.style.display = 'block';

    try {
      const response = await processAgentQuery(spokenText);
      const tResponseReady = (typeof performance !== 'undefined') ? performance.now() : Date.now();
      const e2eLatencyMs = Math.round(tResponseReady - tSpeechEnd);

      if (voiceHint && response.diagnostics) {
        voiceHint.textContent = `⚡ E2E Latency: ${e2eLatencyMs}ms (Intent: ${response.diagnostics.intentDetectionMs}ms | API: ${response.diagnostics.apiLatencyMs}ms)`;
      }

      await speakText(response.text);
    } catch (err) {
      isVoiceProcessing = false;
      await speakText('Sorry, I encountered an issue processing that. Please try again.');
    }
  }

  function initSpeechRecognition() {
    const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
    if (!SpeechRecognition) {
      setVoiceState('Error', 'Speech Recognition Not Supported', 'Browser does not support Web Speech API. Please use Google Chrome or Microsoft Edge.');
      return null;
    }

    try {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = currentVoiceLang;

      rec.onstart = () => {
        isRecognizing = true;
        if (!isSpeaking && !isVoiceProcessing) {
          setVoiceState('Listening', 'Listening for your voice...', 'Speak in English, Hindi, or Hinglish');
        }
      };

      rec.onresult = (event) => {
        if (!event.results || event.results.length === 0) return;
        const lastIndex = event.results.length - 1;
        const result = event.results[lastIndex];
        if (!result || !result[0]) return;
        const text = result[0].transcript;
        if (text && text.trim() && !isVoiceProcessing) {
          handleVoiceInput(text.trim());
        }
      };

      rec.onerror = (e) => {
        isRecognizing = false;
        if (e.error === 'not-allowed' || e.error === 'permission-denied') {
          setVoiceState('Error', 'Microphone Access Denied', 'Please allow microphone access in your browser settings (click the lock/mic icon in the address bar).');
          stopVoiceSession(false);
        } else if (e.error === 'audio-capture') {
          setVoiceState('Error', 'No Microphone Detected', 'No audio capture device found. Please connect a microphone.');
          stopVoiceSession(false);
        } else if (e.error === 'network') {
          setVoiceState('Error', 'Network Error', 'Speech recognition requires an active internet connection.');
          stopVoiceSession(false);
        } else if (e.error === 'no-speech') {
          if (voiceActive && !isMuted && !isVoiceProcessing && !isSpeaking) {
            setVoiceState('Listening', 'Listening for speech...', 'Please speak clearly into your microphone');
            safeStartRecognition();
          }
        } else if (voiceActive && !isSpeaking && !isVoiceProcessing) {
          safeStartRecognition();
        }
      };

      rec.onend = () => {
        isRecognizing = false;
        if (voiceActive && !isMuted && !isVoiceProcessing && !isSpeaking) {
          setTimeout(() => safeStartRecognition(), 150);
        }
      };

      return rec;
    } catch (err) {
      setVoiceState('Error', 'Microphone Initialization Failed', err.message);
      return null;
    }
  }

  function startVoiceSession() {
    voiceActive = true;
    isMuted = false;
    isVoiceProcessing = false;
    isSpeaking = false;
    isRecognizing = false;
    transcriptBox.style.display = 'block';

    const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
    if (!SpeechRecognition) {
      voiceActive = false;
      setVoiceState('Error', 'Speech Recognition Not Supported', 'Browser does not support Web Speech API. Please use Google Chrome or Microsoft Edge.');
      return;
    }

    voiceStartBtn.style.display = 'none';
    voiceActiveControls.style.display = 'flex';
    setVoiceState('Connecting', 'Initializing Voice Agent...', 'Requesting microphone permission...');

    recognition = initSpeechRecognition();
    if (!recognition) {
      voiceActive = false;
      voiceActiveControls.style.display = 'none';
      voiceStartBtn.style.display = 'inline-flex';
      return;
    }

    const welcomeMsg = currentVoiceLang === 'hi-IN'
      ? 'नमस्ते! शॉपसाथी वॉइस सपोर्ट में आपका स्वागत है। मैं आपकी क्या मदद कर सकता हूँ?'
      : 'Namaste! ShopSathi Voice Support is active. How can I help you today?';

    // Speak welcome message first, then start listening cleanly upon completion
    speakText(welcomeMsg, () => {
      safeStartRecognition();
    });
  }

  function stopVoiceSession(resetBadge = true) {
    voiceActive = false;
    isVoiceProcessing = false;
    isSpeaking = false;
    if (synth) synth.cancel();
    safeStopRecognition();
    recognition = null;
    voiceActiveControls.style.display = 'none';
    voiceStartBtn.style.display = 'inline-flex';
    if (resetBadge) {
      setVoiceState('Ended', 'Call ended', 'Tap Start Conversation to reconnect');
    }
  }

  voiceStartBtn.addEventListener('click', startVoiceSession);
  voiceStopBtn.addEventListener('click', () => stopVoiceSession(true));

  voiceMuteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    if (isMuted) {
      muteLabel.textContent = 'Unmute';
      voiceMuteBtn.classList.add('btn-danger');
      safeStopRecognition();
      setVoiceState('Connected', 'Microphone Muted', 'Tap Unmute to speak');
    } else {
      muteLabel.textContent = 'Mute';
      voiceMuteBtn.classList.remove('btn-danger');
      setVoiceState('Listening', 'Listening...', 'Speak now');
      safeStartRecognition();
    }
  });

  voiceSpeakerBtn.addEventListener('click', () => {
    isSpeakerMuted = !isSpeakerMuted;
    if (isSpeakerMuted) {
      voiceSpeakerBtn.innerHTML = '🔇 Speaker Off';
      voiceSpeakerBtn.classList.add('btn-warning');
      if (synth && synth.speaking) synth.cancel();
      isSpeaking = false;
      setVoiceState('Listening', 'Speaker Muted', 'Audio responses will appear as text only');
      safeStartRecognition();
    } else {
      voiceSpeakerBtn.innerHTML = '🔊 Speaker';
      voiceSpeakerBtn.classList.remove('btn-warning');
      setVoiceState('Listening', 'Speaker Active', 'Listening for speech');
    }
  });

  // Voice demo chips
  wrapper.querySelectorAll('.voice-demo-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.dataset.speak;
      if (!voiceActive) {
        startVoiceSession();
        setTimeout(() => handleVoiceInput(text), 1500);
      } else {
        handleVoiceInput(text);
      }
    });
  });

  // Listen for global open requests
  window.addEventListener('open-ai-panel', () => {
    if (chatOpen || voiceOpen) return;
    openMenu();
  });

  return wrapper;
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function markdownToHtml(md) {
  if (!md) return '';
  return md
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}
