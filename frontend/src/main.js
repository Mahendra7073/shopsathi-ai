/**
 * ShopSathi Frontend — Main Application Entry
 */
import './styles/global.css';
import './styles/components.css';
import './styles/pages.css';

import { registerRoute, initRouter } from './router.js';
import { renderHeader } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
import { renderAiLauncher } from './components/AiLauncher.js';

// Pages
import { renderHome } from './pages/Home.js';
import { renderProducts } from './pages/Products.js';
import { renderProductDetail } from './pages/ProductDetail.js';
import { renderCart } from './pages/Cart.js';
import { renderCheckout } from './pages/Checkout.js';
import { renderOrders } from './pages/Orders.js';
import { renderOrderDetail } from './pages/OrderDetail.js';
import { renderReturns } from './pages/Returns.js';
import { renderSupport } from './pages/Support.js';
import { renderProfile } from './pages/Profile.js';
import { renderLogin } from './pages/Login.js';

// Register routes
registerRoute('/', renderHome);
registerRoute('/products', renderProducts);
registerRoute('/products/:id', renderProductDetail);
registerRoute('/cart', renderCart);
registerRoute('/checkout', renderCheckout);
registerRoute('/orders', renderOrders);
registerRoute('/orders/:id', renderOrderDetail);
registerRoute('/returns', renderReturns);
registerRoute('/support', renderSupport);
registerRoute('/profile', renderProfile);
registerRoute('/login', renderLogin);

// Bootstrap app
const app = document.getElementById('app');

// Header
const header = renderHeader();
app.appendChild(header);

// Main content area
const main = document.createElement('main');
main.id = 'main-content';
main.setAttribute('role', 'main');
app.appendChild(main);

// Footer
const footer = renderFooter();
app.appendChild(footer);

// AI Launcher (floating)
const aiLauncher = renderAiLauncher();
document.body.appendChild(aiLauncher);

// Initialize router
initRouter(main);
