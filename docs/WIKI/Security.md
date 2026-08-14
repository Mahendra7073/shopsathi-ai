# Security & Data Privacy

## 🔒 Security Architecture

ShopSathi is designed following zero-trust, privacy-first security principles:

1. **Zero Client-Side Secrets**: No API keys, Gemini keys, OpenAI keys, or database credentials are embedded in client-side code, frontend bundles, or public git commits.
2. **Server-Side Key Isolation**: All LLM interactions (`GEMINI_API_KEY`, `KIPPS_API_KEY`) occur strictly between backend servers and Google AI endpoints.
3. **API Key Authentication**: Backend functions support header-based API key verification (`X-API-Key`) with constant-time cryptographic comparison (`secrets.compare_digest`) to prevent timing attacks.
4. **Input Sanitization**: Pydantic v2 validates all incoming payloads with strict type constraints, regex filtering, and character limit checks.
5. **Database Protection**: Relational models use parameterized queries via SQLAlchemy ORM, fully preventing SQL injection vulnerabilities.
