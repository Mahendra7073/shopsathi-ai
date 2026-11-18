/**
 * Capture Genuine Screenshots of the Latest Working ShopSathi AI Application
 * Starts background FastAPI server on port 8000 and captures high-resolution screenshots.
 */

const path = require('path');
const fs = require('fs');
const { chromium } = require(path.resolve(__dirname, '../frontend/node_modules/playwright'));
const { spawn } = require('child_process');

const PORT = 8000;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const APP_URL = `${BASE_URL}/app/`;
const SCREENSHOT_DIR = path.resolve(__dirname, '../docs/screenshots/latest');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForServer(maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(`${BASE_URL}/health`);
      if (res.ok) {
        console.log('[+] Backend server is healthy on ' + BASE_URL);
        return true;
      }
    } catch (e) {
      // wait and retry
    }
    await sleep(300);
  }
  return false;
}

async function capture() {
  const rootDir = path.resolve(__dirname, '..');
  const pythonExe = path.join(rootDir, 'venv/Scripts/python.exe');

  console.log('[*] Starting background FastAPI server...');
  const server = spawn(pythonExe, ['-m', 'uvicorn', 'app.main:app', '--host', '127.0.0.1', '--port', String(PORT), '--log-level', 'warning'], {
    cwd: rootDir,
    stdio: 'ignore'
  });

  try {
    const isReady = await waitForServer();
    if (!isReady) {
      throw new Error('Server failed to start within timeout');
    }

    console.log('[*] Launching Chromium browser...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 2
    });

    const page = await context.newPage();

    // Set demo customer login in localStorage: CUST101 (Mahendra Gurjar)
    await page.goto(APP_URL, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      localStorage.setItem('shopsathi_user', JSON.stringify({
        customer_id: 'CUST101',
        name: 'Mahendra Gurjar',
        email: 'mahendra.gurjar@shopsathi.demo',
        phone: '9876543210',
        role: 'Customer / Owner Demo'
      }));
    });
    await page.reload({ waitUntil: 'networkidle' });

    const shots = [
      { name: '01-home.png', url: `${APP_URL}#/`, delay: 800 },
      { name: '02-products.png', url: `${APP_URL}#/products`, delay: 800 },
      { name: '03-product-detail.png', url: `${APP_URL}#/products/PROD001`, delay: 800 },
      { name: '04-cart.png', url: `${APP_URL}#/cart`, delay: 600 },
      { name: '05-checkout.png', url: `${APP_URL}#/checkout`, delay: 600 },
      { name: '06-orders.png', url: `${APP_URL}#/orders`, delay: 800 },
      { name: '07-order-detail.png', url: `${APP_URL}#/orders/ORD1001`, delay: 800 },
      { name: '08-returns.png', url: `${APP_URL}#/returns`, delay: 800 },
      { name: '10-support.png', url: `${APP_URL}#/support`, delay: 800 },
      { name: '11-profile.png', url: `${APP_URL}#/profile`, delay: 600 },
      { name: '12-login.png', url: `${APP_URL}#/login`, delay: 600 },
    ];

    for (const s of shots) {
      console.log(`[+] Capturing ${s.name}...`);
      await page.goto(s.url, { waitUntil: 'networkidle' });
      await sleep(s.delay);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, s.name), fullPage: false });
    }

    // 09-refund-status.png: On returns page, query refund status for ORD1004
    console.log('[+] Capturing 09-refund-status.png...');
    await page.goto(`${APP_URL}#/returns`, { waitUntil: 'networkidle' });
    await sleep(600);
    // Find refund input and trigger lookup
    const refundInput = await page.$('input[placeholder*="ORD"], #refund-order-id, input[name="order_id"]');
    if (refundInput) {
      await refundInput.fill('ORD1004');
      const refundBtn = await page.$('button:has-text("Check Refund"), button:has-text("Refund Status")');
      if (refundBtn) await refundBtn.click();
      await sleep(1000);
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09-refund-status.png'), fullPage: false });

    // 13-chat-assistant.png: Open Chat assistant
    console.log('[+] Capturing 13-chat-assistant.png...');
    await page.goto(`${APP_URL}#/products`, { waitUntil: 'networkidle' });
    await sleep(600);
    const fabBtn = await page.$('#ai-fab');
    if (fabBtn) {
      await fabBtn.click();
      await sleep(400);
      const chatOpt = await page.$('#ai-open-chat');
      if (chatOpt) {
        await chatOpt.click();
        await sleep(600);
        // Type a demo query and send
        const chatInput = await page.$('#ai-chat-input');
        const sendBtn = await page.$('#ai-chat-send');
        if (chatInput && sendBtn) {
          await chatInput.fill('Where is my order ORD1001?');
          await sendBtn.click();
          await sleep(1200);
        }
      }
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '13-chat-assistant.png'), fullPage: false });

    // 14-voice-assistant.png: Open Voice assistant modal
    console.log('[+] Capturing 14-voice-assistant.png...');
    await page.goto(`${APP_URL}#/orders`, { waitUntil: 'networkidle' });
    await sleep(600);
    await page.evaluate(() => {
      const vp = document.querySelector('#ai-voice-panel');
      if (vp) vp.classList.add('open');
      const fab = document.querySelector('#ai-fab');
      if (fab) fab.classList.add('active');
    });
    await sleep(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '14-voice-assistant.png'), fullPage: false });

    // 15-admin-dashboard.png
    console.log('[+] Capturing 15-admin-dashboard.png...');
    await page.goto(`${BASE_URL}/static/index.html`, { waitUntil: 'networkidle' });
    await sleep(800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '15-admin-dashboard.png'), fullPage: false });

    // 16-swagger-docs.png
    console.log('[+] Capturing 16-swagger-docs.png...');
    await page.goto(`${BASE_URL}/docs`, { waitUntil: 'networkidle' });
    await sleep(1000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '16-swagger-docs.png'), fullPage: false });

    // Mobile screenshots
    console.log('[*] Capturing mobile responsive views...');
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(APP_URL, { waitUntil: 'networkidle' });
    await sleep(600);
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, '17-mobile-home.png'), fullPage: false });

    await mobilePage.goto(`${APP_URL}#/orders`, { waitUntil: 'networkidle' });
    await sleep(600);
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, '18-mobile-orders.png'), fullPage: false });

    await browser.close();
    console.log(`\n[✓] All 18 latest screenshots captured successfully in ${SCREENSHOT_DIR}!`);
  } finally {
    server.kill();
    console.log('[*] Background server terminated cleanly.');
  }
}

capture().catch(err => {
  console.error('[!] Capture failed:', err);
  process.exit(1);
});
