# Security & Data Privacy

## 🔒 Security & Privacy Architecture

ShopSathi AI is designed following e-commerce zero-trust security and customer data privacy standards:

1. **Customer Authentication & Isolation (`X-Customer-ID`)**: Private customer endpoints (`/orders`, `/customers`, `/returns`, `/refunds`, `/support`) require an authenticated customer identity via the `X-Customer-ID` HTTP header. Missing headers or Guest sessions (`CUST105`) return `401 Unauthorized`.
2. **Customer Data Isolation (`403 Forbidden`)**: Authenticated customers can strictly only view or manage orders and support tickets associated with their own account ID. Accessing another customer's data returns `403 Forbidden`.
3. **Public Storefront Browsing**: Guest users can freely browse Home, search product catalogs, and manage local cart items without logging in.
4. **Zero Client-Side Secrets**: No API keys, passwords, database credentials, or secret tokens are embedded in client-side code, frontend bundles, or public git commits.
5. **API Key Authentication**: Backend functions support optional header-based API key verification (`X-API-Key`) with constant-time cryptographic comparison (`secrets.compare_digest`) to prevent timing attacks.
6. **Input Sanitization**: Pydantic v2 validates all incoming payloads with strict type constraints, regex filtering, and character limit checks.
7. **Database Protection**: Relational models use parameterized queries via SQLAlchemy ORM, fully eliminating SQL injection vulnerabilities.
8. **Sensitive Data Caching Policy**: Catalog GET queries are safely cached for 60s, while customer private endpoints (`/orders`, `/returns`, `/refunds`, `/support`) are **strictly never cached**.
