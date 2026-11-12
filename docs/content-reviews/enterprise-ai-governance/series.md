# Enterprise AI governance DBA series

This reading collection contains articles based on the taught DBA course and its
slides, rather than the wider AI policy/governance archive.

Explain the fundamentals through an ongoing organizational story in language
accessible to technical and nontechnical readers. The primary audience is
organizational managers, especially senior executives and IT managers; keep the
lessons useful to readers without management roles as well. Preserve this
positioning in the collection introduction and future lessons.

Keep `روایت بالا فقط یک قصه نیست.` in the first lesson only. Each later lesson
continues the same story: after its opening scene, briefly recap what readers
learned in the immediately preceding lesson, linking to that lesson, then connect
the specific event in the new scene to the current question. Keep the scene first
and the lesson prompt after this bridge. Vary the transition naturally; do not
replace the old sentence with another repeated formula or duplicate the recap.

Add selective, contextual links to the author's published specialist articles
where they offer deeper treatment of a concept. Explain what the reader can
learn there, using natural prose in the analytical sections. Check the target
content and publication status; preserve the narrative scenes, opening recaps
and manual frontmatter relationships. Avoid a fixed link quota or a generic
reading list repeated across lessons.

- Collection: `/guides/enterprise-ai-governance/`.
- Dedicated tag: `حکمرانی هوش مصنوعی در سازمان`.
- Each chapter sets `series: enterprise-ai-governance` and includes that tag.
- Keep chapter order explicit in `content/guides/fa/collections.json`. Add each
  new chapter there in course reading order; do not sort by publication date.
- When publication and update dates tie, the articles archive reverses the
  editorial order: closing supplement, lesson sixteen, down to lesson one.
  The course reader retains first-to-last reading order. Never invent
  publication times to order lessons.
- Keep each Persian collection item subtitle starting with its lesson label
  (`درس اول؛ …`). The desktop and mobile contents menus use that label before
  the lesson title, without changing the article title or URL.
- The closing narrative `enterprise-ai-governance-from-decision-to-practice`
  is an unnumbered supplement, not lesson seventeen. Its collection item sets
  `role: supplement`; the course card counts it separately from the sixteen
  lessons. Its practical worksheets belong at the end of the same article.
- Drafts stay hidden in public collection HTML. Use `?show-drafts=true` to read
  all available chapters together. Publishing still requires changing the
  article's own draft status.
- Source slides: `/slides/enterprise-ai-governance-dba/`.
- Lesson titles in the collection open their text in place. Standalone lessons
  provide a visible return link to `?view=continuous#<lesson-slug>`, opening all
  lessons and landing at the current one. Preserve `show-drafts=true` when
  returning from an explicit preview.
- Write each lesson as teaching material: wrap narrative scenes in
  `<section class="lesson-story" aria-label="روایت جلسه">` with blank lines
  around its Markdown paragraphs and a short `lesson-story-label` paragraph.
  Keep explanations outside these scenes and use Markdown blockquotes for key
  teaching points. Both the article and collection reader use `src/lib/lesson.css`.

Card image: `content/guides/images/enterprise-ai-governance.png` (ignored media).
Created with the built-in Imagegen tool from the existing DBA cover slide. The
original slide remains unchanged. The current cover fills the full frame with the
meeting and operations scenes, without a blank title panel. Current editing prompt:

> Use case: precise-object-edit. Edit the supplied website cover. Remove the entire empty dark blue/navy title panel on the right. This cover will contain NO overlaid title, so no empty text space is needed anywhere. Reframe and recompose the EXISTING two-level office scene to fill the ENTIRE 16:9 landscape image edge to edge: the boardroom meeting with mountains and city through the windows across the upper part, and the technical operations teams with desks, laptops and dashboard monitors across the lower part. Preserve the existing people, clothing, their activities, professional Iranian office setting, photographic illustration style, realistic proportions, colors and lighting. Bring the existing office scene across the former empty right area through sensible framing and natural continuation of the same interior; do not add extra people. The right edge must show the office scene, not a flat navy panel, empty gradient, fading vignette or blank wall reserved for text. Keep both management and engineering visually prominent. No text, title, logo, watermark, labels, banner or university emblem. No decorative frames. Opaque background.
