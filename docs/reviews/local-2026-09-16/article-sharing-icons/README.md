# Share dialog with local service logos

Local revision, 2026-09-16.

- Replaced the text destination tiles with equally sized logo buttons, accessible names, keyboard focus and tooltips.
- Persian articles include Bale and Eitaa alongside Telegram, WhatsApp, X and email. English and Spanish retain the international destinations.
- Short URL has its own copy control. Full title, summary and short URL remain available for copying, native sharing and destination-specific payloads.
- Message preview is collapsed initially and opens on clipboard failure. The dialog and textarea use theme-aware thin scrollbars.
- No messages were sent to any service, and no deployment was performed.

## Assets and share routes

All assets are served locally under `static/images/social/`.

- `bale-white.svg` and `x-white.svg`: reuse the existing site assets.
- `eitaa.svg`: official https://eitaa.com/img/eitaa_logo.svg, retaining the original shapes/colors; XML declaration and external DTD removed.
- `telegram-white.svg`, `whatsapp-white.svg`: Font Awesome Free 6.x brand SVGs from https://github.com/FortAwesome/Font-Awesome/tree/6.x/svgs/brands (CC BY 4.0; attribution/license comments retained), white path fill for colored buttons.

Verified the official, unauthenticated share landing pages by GET only:

- `https://ble.ir/share/url?url=…&text=…` returned HTTP 200 and a matching `https://web.bale.ai/share/url?url=…&text=…` link.
- `https://eitaa.com/share/url?url=…&text=…` returned HTTP 200 and `et://msg_url?url=…&text=…` plus a web-app link.

No bot API, API keys, external image requests or external icon-font dependency were added.

## Validation

- `node --test tests/article-sharing.test.mjs`: short URLs, summary payloads and encoding for all destinations, including Bale/Eitaa.
- `tests/article-sharing.review.mjs`: local logo loading, compact layout, Persian/English/Spanish directions, copy short/full text, clipboard fallback/error, native share/cancel/error and focus restoration.
- `npm run check` and `npm run build`.

Results: unit checks and browser review passed; `npm run check` reported zero errors/warnings, and `npm run build` validated 186 sitemap pages, 196 JSON-LD blocks and 221 short-link destinations. Persian layout was checked at 320, 390 and 1440 pixels, with dark/light screenshots. Logo buttons stay at least 44×44 pixels; all SVGs loaded locally.
