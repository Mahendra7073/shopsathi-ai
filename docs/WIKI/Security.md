# Security & Data Privacy

## 🔒 Security & Privacy Architecture

ShopSathi is designed following e-commerce industry privacy and zero-trust security standards (equivalent to Flipkart and Amazon):

1. **Customer Authentication & Isolation (`X-Customer-ID`)**: Private customer endpoints (`/orders`, `/customers`, `/returns`, `/refunds`, `/support`) require an authenticated customer identity via `X-Customer-ID` HTTP header. Missing headers or Guest sessions (`CUST105`) return `401 Unauthorized`.
2. **Customer Data Isolation (403 Forbidden)**: Authenticated customers can strictly only view or manage orders and support tickets associated with their own account ID. Accessing another customer's data returns `403 Forbidden`.
3. **Public Storefront Browsing**: Guest users can freely browse Home, search Product catalogs, and manage local Cart items without logging in.
4. **Zero Client-Side Secrets**: No API keys, Gemini keys, OpenAI keys, or database credentials are embedded in client-side code, frontend bundles, or public git commits.
5. **Server-Side Key Isolation**: All LLM interactions (`GEMINI_API_KEY`, `KIPPS_API_KEY`) occur strictly between backend servers and Google AI endpoints.
6. **API Key Authentication**: Backend functions support optional header-based API key verification (`X-API-Key`) with constant-time cryptographic comparison (`secrets.compare_digest`) to prevent timing attacks.
7. **Input Sanitization**: Pydantic v2 validates all incoming payloads with strict type constraints, regex filtering, and character limit checks.
8. **Database Protection**: Relational models use parameterized queries via SQLAlchemy ORM, fully preventing SQL injection vulnerabilities.

