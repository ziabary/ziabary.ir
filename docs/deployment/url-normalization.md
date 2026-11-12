# Duplicate slashes in request paths

Production is a static build uploaded directly to S3-compatible object storage
behind ArvanCloud. On 2026-11-10, requesting
`https://ziabary.ir//guides/enterprise-ai-governance/?show-drafts=true`
returned an origin 404 (`x-amz-request-id`, `server: ArvanCloud`). The same path
with one leading slash returned the page. SvelteKit server hooks do not execute
on that hosting path, so rebuilding or deploying the site alone cannot fix it.

## Production requirement

Normalize the **path before origin lookup**, merging every run of literal `/`
characters into one. Redirect permanently to the same canonical HTTPS host,
with the query string unchanged. Leave encoded characters such as `%2F` alone.
Do not replace slashes across the full URL: that would damage `https://` and
URLs embedded in query values. Missing canonical pages must still return 404.

ArvanCloud documents [redirect page rules](https://docs.arvancloud.ir/fa/cdn/page-rules/redirect/),
including wildcard captures, but explicitly states that ordinary wildcard
redirects do **not** carry the query string over. A broad `//*` rule which drops
`show-drafts=true` is therefore insufficient. Its documented transform rules
modify headers, not request paths. Configure path normalization with query
preservation at the CDN, or have ArvanCloud apply this requirement. This
repository has no CDN management credentials and `npm run deploy` only uploads
static objects; it does not install edge rules.

If the **main site's traffic already passes through HAProxy**, these rules can
instead go in its existing HTTP frontend, before backend selection. They only
match `ziabary.ir`; do not install them solely on the `api.ziabary.ir` frontend
and expect the static website to change.

```haproxy
acl portal_host hdr(host) -i ziabary.ir ziabary.ir:443 ziabary.ir:80
acl duplicate_path_slash path_sub //
acl query_present query -m found
http-request redirect code 308 location https://ziabary.ir%[path,regsub(/+,/,g)]?%[query] if portal_host duplicate_path_slash query_present
http-request redirect code 308 location https://ziabary.ir%[path,regsub(/+,/,g)] if portal_host duplicate_path_slash !query_present
```

The fixed origin prevents host-controlled redirects; `path` excludes the query.
See HAProxy's [regsub and HTTP sample documentation](https://docs.haproxy.org/3.0/configuration.html#7.3.1-regsub).
Validate the full server configuration with `haproxy -c -f /etc/haproxy/haproxy.cfg`
before reloading it. No server or CDN configuration has been changed locally.

## Local behavior and verification

Vite development, Vite preview and `npm run preview:local` return 308 before
routing or URL parsing, using `scripts/normalize-request.mjs`. No runtime server,
SPA fallback or duplicate static pages are added to the production build.

```sh
node --test tests/request-normalization.test.mjs
curl --path-as-is -I 'http://localhost:5173//guides/enterprise-ai-governance/?show-drafts=true'
curl --path-as-is -I 'https://ziabary.ir//guides/enterprise-ai-governance/?show-drafts=true'
curl --path-as-is -I 'https://ziabary.ir/guides/enterprise-ai-governance/?show-drafts=true'
```

After the production rule is applied, the malformed URL must redirect to
`https://ziabary.ir/guides/enterprise-ai-governance/?show-drafts=true` (or the
equivalent same-origin path). The canonical URL must return 200 without looping.
Also test an internal duplicate slash, `/en/`, `/es/`, a short link, a query value
containing `https://`, and a missing page. Browser fragments are not sent to the
server; a redirect without a new fragment preserves the original fragment.
