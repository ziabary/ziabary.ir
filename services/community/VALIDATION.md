# Verification — 2026-11-04

Implemented on `feat/community-service` from the prepared `main` branch.

- Static site: `npm run check` — zero errors and warnings; `npm run build` — passed, including sitemap, structured data, short links and unchanged static-source checks.
- Existing site tests: 384 passed.
- Independent service: 23 tests passed, covering mandatory/replayed CAPTCHA, hostname/action checks, moderation, nested replies, ancestor withdrawal, asynchronous moderation races, origins/CSRF, MFA/replay, session expiry, persistent limits, encrypted IP, visitor deduplication, retained totals, bounded database size, backup and load/idle/offline behavior.
- Production Compose configuration validated.
- Actual Docker runtime: uid 1000, read-only root, removed capabilities, resource limits, persistent volume; successful official Turnstile test-key validation, pending comment, explicit approval and persistence through restart. Disposable review containers and volumes were removed.
- Actual built Svelte integration targeting `https://api.ziabary.ir`: browser tested with API responses routed to a loopback fixture. It hid the section while unavailable, recovered automatically, preserved a draft through an offline event, rendered four reply levels and displayed malicious HTML as text. Admin login with MFA, approval, aggregate statistics and IP detail were exercised. CAPTCHA was an explicit browser test double; actual provider validation was independently exercised in Docker.
- Widget checked at 390/1440 pixels in light/dark themes; admin checked at both widths. No horizontal page overflow or JavaScript runtime exceptions. Screenshots and performance results are local under ignored `test-results/`.
- Measured review navigation: first contentful paint before page load completion; the service health request started after load/idle. External service requests are absent from prerendering.

The checkout lacked its ignored résumé PDFs; the existing public copies were restored to `static/downloads/`. A pre-existing placeholder link in the technical Kazan note was corrected so the required full build could pass. Those PDFs remain ignored.

No production deployment or real administrator/CAPTCHA credentials were created. Production activation requires DNS/TLS and a host for the independent container, a published catalogue, generated private credentials and real Turnstile keys as described in `README.md`.
