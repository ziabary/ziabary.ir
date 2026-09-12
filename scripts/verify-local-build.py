"""Audit real prerendered HTML, without a development server or SPA fallback."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import re
import sys

root = Path(sys.argv[1] if len(sys.argv) > 1 else 'build')
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.ids, self.links, self.assets, self.alternates = path, [], [], [], []
        self.canonical, self.noindex, self.lang, self.direction = [], False, None, None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'): self.ids.append(a['id'])
        if tag == 'html': self.lang, self.direction = a.get('lang'), a.get('dir')
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag in ['img', 'script'] and a.get('src'): self.assets.append(a['src'])
        if tag == 'img' and a.get('srcset'): self.assets += [v.strip().split(' ')[0] for v in a['srcset'].split(',')]
        if tag == 'link' and a.get('rel') == 'stylesheet': self.assets.append(a['href'])
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical.append(a['href'])
        if tag == 'link' and a.get('hreflang'): self.alternates.append((a['hreflang'], a['href']))
        if tag == 'meta' and a.get('name') == 'robots' and 'noindex' in a.get('content', ''): self.noindex = True

pages = {}
for file in root.rglob('index.html'):
    url = '/' + str(file.relative_to(root)).replace('index.html', '')
    page = Page(url); page.feed(file.read_text()); pages[url] = page
errors, fragment_issues = [], []
redirects = {r['from']:r['to'] for r in json.loads(Path('config/redirects.json').read_text())}
for url, page in pages.items():
    expected = url.split('/')[1] if url.split('/')[1] in ['en','es'] else 'fa'
    if page.lang != expected or page.direction != ('rtl' if expected == 'fa' else 'ltr'): errors.append([url, 'html language/direction'])
    if len(page.canonical) != 1: errors.append([url, 'canonical count', len(page.canonical)])
    elif url != '/gallery/' and page.canonical[0] != 'https://ziabary.ir' + url: errors.append([url,'canonical mismatch',page.canonical[0]])
    duplicates = sorted({id for id in page.ids if page.ids.count(id) > 1})
    if duplicates: errors.append([url, 'duplicate IDs', duplicates])
    for locale, href in page.alternates:
        target = pages.get(urlsplit(href).path)
        if not target or target.noindex or ('fa' if locale == 'fa' else locale) != target.lang: errors.append([url, 'unavailable hreflang', href])
        elif (expected, 'https://ziabary.ir' + url) not in target.alternates: errors.append([url, 'nonreciprocal hreflang', href])
    for href in page.links + page.assets:
        parts = urlsplit(href)
        if parts.scheme or parts.netloc or not parts.path.startswith('/') and parts.path: continue
        path = unquote(parts.path or url)
        if path in redirects: continue
        if path not in pages and not (root / path.lstrip('/')).is_file(): errors.append([url, 'missing local target', href]); continue
        if parts.fragment and path in pages and unquote(parts.fragment) not in pages[path].ids:
            # The media tab is selected from its fragment on mount; panel destinations are documented.
            if path.endswith('/media/') and parts.fragment in ['photos','published','videos']: continue
            fragment_issues.append([url, href])
    if page.noindex and 'https://ziabary.ir' + url + '</loc>' in (root/'sitemap.xml').read_text(): errors.append([url, 'noindex in sitemap'])

report = {'pages':len(pages), 'errors':errors, 'fragmentIssues':fragment_issues, 'languages':{lang:sum(p.lang==lang for p in pages.values()) for lang in ['fa','en','es']}}
output = Path('docs/reviews/local-2026-09-09/static-audit.json'); output.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'pages':len(pages),'errors':len(errors),'fragmentIssues':len(fragment_issues)}))
sys.exit(1 if errors or fragment_issues else 0)
