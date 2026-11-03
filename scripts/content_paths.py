"""Source paths shared by local editorial tools; URLs are independent."""
from pathlib import Path

PROJECT = Path(__file__).resolve().parents[1]


def article_file(slug, locale=None):
    locales = [locale] if locale else ['fa', 'en', 'es']
    matches = [PROJECT / 'content/articles' / language / slug / 'index.md' for language in locales]
    matches = [path for path in matches if path.is_file()]
    if len(matches) != 1:
        raise ValueError('Expected exactly one article: ' + slug)
    return matches[0]
