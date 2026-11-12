# Community Service — Install Guide

Requirements: Node.js 24, Docker Compose, and a domain with HTTPS.

## 1. Prepare

From the repository root:

```sh
cd services/community
npm run setup
cp .env.example .env
```

Run `setup` only on the first installation. Edit the private
`config/bootstrap.txt` file:

```text
Username: admin
Password: your-long-private-password
ARCAPTCHA_SITE_KEY: your-site-key
ARCAPTCHA_SECRET_KEY: your-secret-key
```

Keep `bootstrap.txt` and `secrets.json` private. The latter holds encryption keys;
keep it unchanged when updating your password or CAPTCHA settings.

## 2. Configure

Create a site in the [ARCaptcha dashboard](https://dashboard.arcaptcha.co/) and
copy its keys into `bootstrap.txt` ([integration docs](https://docs.arcaptcha.co/installation/)). Set `PUBLIC_URL` and `SITE_ORIGINS` in `.env`.
The defaults use `https://api.ziabary.ir`. Production requires HTTPS and real keys.

`SITE_URL` selects the public website used to verify pages; it defaults to the
first `SITE_ORIGINS` entry. Use the final origin; redirects are not followed.
For local use, point both at your running site
(for example, `http://localhost:5173`) and use `NODE_ENV=development`.

Point the API domain at the server and configure TLS using
[Caddyfile.example](./Caddyfile.example). Proxy requests to `127.0.0.1:8787`.
Set `TRUSTED_PROXY_CIDRS` to the proxy's actual peer address or subnet as seen by
the container; the proxy must replace incoming `X-Forwarded-For` headers.

## 3. Start

```sh
mkdir -p data
sudo chown 1000:1000 data config/secrets.json config/bootstrap.txt
sudo chmod 700 data
sudo chmod 600 config/secrets.json config/bootstrap.txt
docker compose up -d --build
docker compose ps
curl --fail https://api.ziabary.ir/health
```

Open **https://api.ziabary.ir/admin/** and sign in with your username and password.

## 4. Connect the Website

Set this in the repository root's `.env.local`, then rebuild and deploy the site:

```dotenv
PUBLIC_COMMUNITY_API_URL=https://api.ziabary.ir
```

Submit a comment, approve it in the admin panel, and confirm it appears on the
article. Visits cover every public page in Persian, English and Spanish;
comments appear only on articles. Other pages show a compact visit counter.
Both load after the page is ready and stay hidden while the service is unavailable.

## Import Earlier Article Views

With the website running, provide a Spanish GA4 page-path CSV on standard input.
The first command previews the import; `--apply` saves it:

```sh
docker compose exec -T community node tools/import-views.mjs - --multiplier 3 < /path/to/report.csv
docker compose exec -T community node tools/backup.mjs /data/community.sqlite /data/backups/before-views-import.sqlite
docker compose exec -T community node tools/import-views.mjs - --multiplier 3 --apply < /path/to/report.csv
```

Only public articles are included. Trailing-slash variants are combined. Earlier
views and per-article active-user estimates use the supplied multiplier. Repeating
the same import has no effect; rerunning an older views-only import adds its
missing visitor estimates without adding views again. Changed or overlapping
reports are rejected. URL variants are summed for per-article estimates; these
cannot be deduplicated against historical or newly observed users. Historical
counts create no browser identities, IP or daily records. Cross-article totals
are not treated as unique site visitors. The admin shows historical values
separately from newly collected data.
The import is stored in the host's `data/community.sqlite` and survives service updates.

Imports allow 15 seconds per page and retry transient failures twice. A failed
verification imports no counts; its error includes the underlying connection or
HTTP failure. Public page verification keeps its separate three-second deadline.

## Updates and Backups

New pages are registered automatically on their first visit. The service checks
the public HTML, canonical path and indexing status; comments require the site's
article comment marker. It needs no site build files, sitemap or exported list.
Publishing an article needs no service update or restart. Publication metadata is
rechecked on access with a one-minute cache; withdrawn pages retain their admin history.

After editing `bootstrap.txt`, run `docker compose restart community`.
For service code updates, run `docker compose up -d --build`.
The admin reuses IranSansX from `SITE_URL` through a same-origin font proxy;
no font files are bundled or written to the container.

Keep one service replica. `./data` is bind-mounted at `/data`; use local disk.
For an existing installation using a named volume, transfer a consistent SQLite
backup to `./data/community.sqlite` before switching mounts. Stop the old service
during the final transfer so new writes are not lost.

Dashboard charts use persistent daily summaries, updated atomically with each
visit. Upgrades backfill existing data once; daily cleanup runs automatically.
Set `ANALYTICS_RETENTION_DAYS` (default 1095) independently of
`VISIT_RETENTION_DAYS` (default 90). No external scheduler is needed.

Back up the database, `config/secrets.json` and `config/bootstrap.txt` securely:

```sh
mkdir -p backups
docker compose exec -T community node tools/backup.mjs /data/community.sqlite /data/backups/community.sqlite
docker compose cp community:/data/backups/community.sqlite ./backups/community.sqlite
```

Use a new filename for each backup; existing backups are never overwritten.
