# Content model

## Languages

Persian, English and Spanish are separate editorial streams. An article does
not need to exist in every language. If translations are later related, add an
optional translationKey to their frontmatter.

## Main sections

- thought: a stable statement of intellectual direction, not a blog.
- articles: chronological, searchable writing.
- guides: technical articles selected by category.
- media: summaries that link to the original publisher.
- slides: courses, individual deliveries and versioned slide decks.
- resume: factual roles, experience and skills.
- gallery: selected event, classroom and media photos.

## Related-reading stream

The related frontmatter field is ordered and manual. Individual article URLs
remain independent. The article page automatically reveals the first two
related items and leaves the next one behind an explicit continue link.

## Courses and slide decks

The current prototype stores course metadata in src/lib/data.ts. When real
files are added, use:

    static/slides/<course-slug>/<version>.pdf

Each delivery keeps its own date, venue, audience and notes while pointing to a
versioned deck.
