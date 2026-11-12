# Verification — 2026-11-08

## Public-page statistics in all editions

- Added a counter-only public endpoint and a compact footer counter for non-article pages. The shared layout selects counters for ordinary public pages and discussion widgets for published articles in fa/en/es. Comment endpoints still reject other pages; drafts and noindex pages remain excluded.
- Counters share the existing load/idle deferral, outage hiding and automatic recovery. They request no comment data, widget stylesheet, extra font or CAPTCHA SDK. Failed visit submissions can retry after recovery; completed visits are not resubmitted by recovery polling.
- All 62 service tests passed on host Node 22 and the actual Node 24 container image; all 397 site tests passed. Site check reported zero errors/warnings. Production build, sitemap, structured data, short links and unchanged static-source validations passed.
- Actual local Chrome review passed nine ordinary pages and three articles across all editions, including client navigation, localized counters, article-only forms, offline recovery and deduplication. Counter layouts passed at 390/1440 pixels in both themes with no runtime exceptions. Results and screenshots are ignored under `test-results/`.
- The updated local container uses the existing database volume and private configuration. Website port 5173 and API/admin port 8787 remain running. Production rollout requires updating the service image and rebuilding/deploying the static website; no production deployment was performed.

## Resilient import verification

- Import verification now allows 15 seconds per page and two fresh retries for transient connection failures or retryable HTTP statuses. Redirects, forbidden pages and publication failures do not get retried. Public verification retains its three-second timeout and failure cache.
- Connection causes and upstream HTTP status are retained in CLI errors; public API responses continue to expose only the generic error code and request ID. Counters remain all-or-nothing after verification.
- All 57 tests passed on both host Node 22 and container Node 24. The real CLI test recovered from a 503 and a 3.2-second cold response, while public timeout and error-redaction tests passed. Site check and production build passed.
- A source-only patch archive containing four files was prepared under ignored `data/preview/community-import-fix.tar.gz`; it contains no configuration, credentials or database files. Production installation remains a user-run operation.

## Compose mount correction

- Quoted the tmpfs option string so YAML does not split its comma-separated options into separate mount destinations. Replaced the local-driver volume using a relative `device` with a direct `./data:/data` bind mount. Install instructions include UID 1000 ownership for the data directory and private configuration files.
- Actual production-mode Compose startup passed in a disposable project using the exact Compose file. Docker inspection confirmed one `/tmp` tmpfs, a read-only root and the correct host data bind. SQLite appeared in the host directory and retained a test record after forced container recreation. The temporary deployment was removed; the existing local preview and its data were untouched.
- Site check passed with zero errors/warnings. Review output is private under ignored `data/preview/compose-mount-review.log`.

## Persian chart dates and chronological layout

- Daily chart and date axis run left to right, with the current day identified at the right edge. All selectable ranges fit the container without horizontal scrolling, including the seven-day mobile view. Long ranges use compact bars while preserving each day's tooltip and accessible label.
- Axis labels, short daily dates and tooltips explicitly use the Persian calendar, Persian numerals and Tehran timezone. ISO dates remain in machine-readable attributes and the API.
- Browser review passed all 7/30/90/365-day ranges at 390/1440 pixels in both themes, with a Los Angeles browser timezone. It verified visible range endpoints, left-to-right chronology, current-day placement and Persian date labels. Site check and production build passed. The rebuilt local container serves the verified chart assets; the website remains available on port 5173.

## Historical active-user estimates

- Added the CSV's `Usuarios activos` column with the same multiplier of three. The original 130-article import gained its missing per-article estimates exactly once, without reimporting views. The sum of these per-article estimates is 3036; it is not a deduplicated site visitor count.
- Public counters and the admin article table include historical visitor estimates alongside observed per-article visitors. Site-wide measured visitor totals, daily summaries and browser/IP identities remain independent of the imported estimates.
- All 54 service tests passed, including enrichment of the old view-only ledger, repeated imports, changed/invalid active-user counts, atomic rollback and preservation of live views. Browser review verified the historical estimate and combined article count in the admin table while measured period visitors and yearly charts stayed unchanged. Site check and production build passed.
- The local container was rebuilt and the supplied CSV applied, then reapplied with no changes. All 130 historical article estimates were verified through the running admin API, with sample public counters checked. Comparison with the pre-import backup confirmed that view increases came only from genuine new visits recorded during the review. Private reports are ignored under `data/preview/historical-visitors-*`.

## Daily analytics summaries

- The dashboard reads indexed daily summaries, dimension counts and identity last-seen days instead of scanning raw visits. Accepted visits update detail and summaries in one transaction; today's chart remains current. Range uniqueness is computed across the whole interval and site, rather than summing daily or per-post distinct counts.
- A transactional, one-time migration preserved legacy daily totals and backfilled retained details. Unrecoverable old unique counts remain null. The hourly maintenance cycle performs daily cleanup on Tehran calendar days; summaries default to 1095 days independently of 90-day detail retention. The yearly chart fits mobile and desktop widths.
- All 52 service tests passed, including cross-post/day uniqueness, midnight rollover, retention and expiry, one-time migration, transaction rollback, and a dashboard request after dropping the raw visit table. Site check reported zero errors/warnings; production build and publishing validators passed.
- Disposable real-browser review passed a 365-day chart and per-post filters after all raw visits expired, at 390/1440 pixels in both themes, with no overflow or runtime exceptions. Screenshots/results are ignored under `test-results/analytics-*`.
- A synthetic in-memory benchmark with 100,000 visits across 60 days produced identical view/unique counts: approximately 103.62 ms for raw dashboard queries versus 0.37 ms for summary queries (five runs each). This is a local comparison, not a production latency guarantee. The initial migration took approximately 447 ms; it is not repeated on dashboard requests or restart.
- Local migration was checked against a pre-upgrade SQLite backup: all 12 comments, nine live visit details, 12,027 historical views and 12,036 lifetime views were preserved. Aggregate totals and unique counts matched raw data globally and for each visited page. Reports/logs remain ignored under `data/preview/analytics-*`.

## Admin conversation threads

- Admin comment results now contain whole threads, including administrator replies, pending members and moderated ancestors. A status filter matches any thread member and retains the full context; `all` is also available.
- Results are ordered by the latest member update, with root IDs breaking timestamp ties. Cursor pagination returns ten complete threads at a time. A parent index supports recursive lookups, and private IP/hash/request fields are excluded explicitly.
- All 46 service tests passed, including complete 101-comment threads, tied-time pagination without duplicates, reply/moderation reordering, archived post filters and invalid cursors. Site check and production build passed with all publishing validators.
- Disposable browser review passed moderation, admin replies, 21 conversations across three batches, complete context and safe text rendering. Four nested levels retained their DOM ancestry and RTL indentation at 390/1440 pixels in both themes, with no horizontal overflow or JavaScript exceptions. Screenshots/results are ignored under `test-results/admin-threads-*`.

## Historical article views

- Imported the supplied GA4 page-path report for 2026-08-01 through 2026-11-08 into the persistent local container: 130 public articles, 12,027 historical views after multiplication by three. Slash variants were combined; four drafts and one nonexistent URL were excluded.
- A consistent pre-import SQLite backup was retained in the local data volume. All 12 comments and nine live visit records were preserved; total views became 12,036. No historical visitor, IP or daily records were synthesized.
- Actual container preview, apply, duplicate apply and restart passed. Admin API totals were checked for every imported article, with public counters checked on three sample articles. Repeating the import added nothing.
- 42 service tests passed, including CSV validation, overlap protection, transactional rollback, preservation of live counters, private-page exclusion and stdin CLI import. Site check reported zero errors/warnings; the production build and all publishing validators passed.
- Site and healthy container remain running on ports 5173 and 8787. Import results and verification reports are private under ignored `data/preview/historical-views-*`. Production import commands are in the install guide; no production deployment was performed.

## ARCaptcha and password login

- Replaced Turnstile with ARCaptcha's official widget and JSON verification endpoint. Official development credentials were verified against the live provider.
- Removed TOTP from runtime authentication, setup and admin UI. The editable private `bootstrap.txt` now supplies username, password and both ARCaptcha keys; data-encryption keys remain separate and unchanged.
- Admin IranSansX is read from the site's existing regular/bold WOFF2 files through a bounded same-origin proxy. No font binaries are bundled or written to the container.
- The official loader currently exposes unresolved testing placeholders. Only for the documented test key on loopback development sites, the client fills those placeholders. Production rejects the test keys and never enables this adapter.
- Real-browser verification passed: first and repeated ARCaptcha submissions, server verification, pending-comment privacy, password-only login, moderation, and loaded IranSansX faces at mobile/desktop sizes. The widget token is read through the documented API/hidden field and each submission gets a fresh widget.
- 36 service tests and 397 site tests passed. Svelte check reported zero errors/warnings; the production build and its sitemap, structured-data, short-link and static-source validations passed.
- The local site remains on port 5173 and the updated container on 8787, using the existing data volume and password. Current screenshots/results are under ignored `data/preview/arcaptcha-*`.

## Earlier verification

- Removed the build/sitemap catalogue, exporter command and catalogue container mount. Startup requires no site files or network access.
- Pages are discovered from public HTTP HTML on demand, with canonical-path and noindex checks, a one-minute positive cache, bounded requests/body sizes and a three-second deadline. Redirects and arbitrary fetch origins are rejected. The permanently private note is blocked before fetching.
- 31 service tests passed, including publishing after startup, title updates, withdrawal/republishing with retained history, slow-site isolation, timeout recovery, fixed-origin validation and reuse of the official dummy CAPTCHA token only in local development.
- Real Docker test passed without a catalogue: automatic registration after publication, official Turnstile test-key validation, moderation and persistence after restart. The website fixture and all test containers/volumes were disposable.
- All 275 current public HTML pages passed publication parsing; 186 article comment markers were recognized.
- Site check: zero errors and warnings. All 397 site tests passed. Production build, sitemap, structured data, 332 short links and 148 unchanged static sources passed.

## Persistent local preview — 2026-11-08

- Website left running at `http://localhost:5173`; container `ziabary-community-local` left running and healthy at `http://localhost:8787`. Credentials, logs, screenshots and the separate local database remain ignored/private.
- Real-browser test used the actual Docker API and Cloudflare official test widget/Siteverify without mocks. MFA login, moderation, four reply levels, pending privacy, IP statistics and fa/en/es interfaces passed. Layouts passed at 390/1440 pixels in light/dark themes.
- A temporary Docker pause hid comments; unpause restored the form with its draft intact. Final API health was healthy. Five approved sample comments/replies and one pending sample were retained for manual inspection; local test rate-limit counters were cleared afterward.
- Final local navigation: first contentful paint 112 ms, load completion 131.7 ms and first health request 305.4 ms. The service request started after page load. No application JavaScript exceptions were recorded.
- Site checks and production build passed again, including all 397 site tests and the static publishing validators.

## Initial verification — 2026-11-04

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

No production deployment or real administrator/CAPTCHA credentials were created. Production activation requires DNS/TLS and a host for the independent container, generated private credentials and real Turnstile keys as described in `README.md`.
