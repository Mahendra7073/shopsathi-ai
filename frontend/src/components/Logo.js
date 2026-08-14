/**
 * ShopSathi SVG Logo & Icons
 */

export function logoFull(size = 140) {
  return `<svg width="${size}" height="${Math.round(size * 0.3)}" viewBox="0 0 480 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ShopSathi logo">
    <g>
      <!-- Shopping bag icon -->
      <rect x="10" y="35" width="50" height="55" rx="8" stroke="#2563EB" stroke-width="4" fill="none"/>
      <path d="M22 35 C22 20, 48 20, 48 35" stroke="#2563EB" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- AI spark -->
      <circle cx="35" cy="58" r="6" fill="#06B6D4"/>
      <path d="M35 48 L35 44" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M35 72 L35 68" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M25 58 L21 58" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M49 58 L45 58" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <text x="75" y="82" font-family="Inter, sans-serif" font-weight="800" font-size="50" fill="#0F172A">Shop<tspan fill="#2563EB">Sathi</tspan></text>
  </svg>`;
}

export function logoCompact(size = 44) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ShopSathi icon">
    <rect x="8" y="18" width="48" height="38" rx="10" fill="#2563EB"/>
    <path d="M20 18 C20 6, 44 6, 44 18" stroke="#2563EB" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="32" cy="35" r="7" fill="white"/>
    <path d="M32 24 L32 20" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M32 50 L32 46" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M21 35 L17 35" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M47 35 L43 35" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M24 27 L21.5 24.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <path d="M40 43 L42.5 45.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

export function logoIcon(size = 32) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="9" width="24" height="19" rx="5" fill="#2563EB"/>
    <path d="M10 9 C10 3, 22 3, 22 9" stroke="#2563EB" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="16" cy="17.5" r="3.5" fill="white"/>
    <line x1="16" y1="12" x2="16" y2="10.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="16" y1="24.5" x2="16" y2="23" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="10.5" y1="17.5" x2="9" y2="17.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="23" y1="17.5" x2="21.5" y2="17.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;
}

export function aiChatIcon(size = 24) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none"/>
  </svg>`;
}

export function micIcon(size = 24) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>`;
}
