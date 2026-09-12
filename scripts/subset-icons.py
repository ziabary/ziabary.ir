"""Optional asset maintenance: python3 -m pip install fonttools brotli, then run this script.
Preserves bundled originals and their licenses. Build consumes the committed subset.
"""
import json
import re
from pathlib import Path
from fontTools import subset

base = Path('static/fonts/fontawesome/v6.2.0')
css = (base / 'all.min.css').read_text()
used = set()
for path in Path('src').rglob('*'):
    if path.is_file() and path.suffix in ['.svelte', '.ts', '.html', '.md']:
        used.update(re.findall(r'\bfa-[a-z0-9-]+', path.read_text()))
icons = {}
for selectors, body in re.findall(r'([^{}]+)\{([^{}]+)\}', css):
    names = set(re.findall(r'\.((?:fa-)[a-z0-9-]+):before', selectors)) & used
    content = re.search(r'content:"\\([0-9a-f]+)"', body)
    if content:
        for name in names:
            icons[name] = content.group(1)
output = Path('static/fonts/icons')
output.mkdir(exist_ok=True)
rules = [css[:css.index('*/') + 2]]
for style, weight in [('solid', 900), ('regular', 400), ('brands', 400)]:
    options = subset.Options()
    options.flavor = 'woff2'
    font = subset.load_font(str(base / 'webfonts' / ('fa-%s-%s.ttf' % (style, weight))), options)
    worker = subset.Subsetter(options=options)
    worker.populate(unicodes=[int(value, 16) for value in icons.values()])
    worker.subset(font)
    subset.save_font(font, str(output / (style + '.woff2')), options)
    rules.append('@font-face{font-family:SiteIcons-%s;font-style:normal;font-weight:%s;font-display:block;src:url(%s.woff2) format("woff2")}.fa-%s{font-family:SiteIcons-%s;font-weight:%s}' % (style, weight, style, style, style, weight))
rules.append('.fa-solid,.fa-regular,.fa-brands{display:inline-block;font-style:normal;font-variant:normal;line-height:1;text-rendering:auto;-webkit-font-smoothing:antialiased}')
for name, codepoint in sorted(icons.items()):
    rules.append('.%s:before{content:"\\%s"}' % (name, codepoint))
(output / 'icons.css').write_text('\n'.join(rules) + '\n')
print('Subset %s icons; %s font bytes.' % (len(icons), sum(p.stat().st_size for p in output.glob('*.woff2'))))
