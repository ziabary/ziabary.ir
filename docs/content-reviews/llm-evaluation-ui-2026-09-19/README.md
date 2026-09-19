# Evaluation section cleanup — 19 September 2026

The standalone language banner above the tables was removed. Existing language
filters now appear only with their own evaluation tables. Legacy
`target-language` URLs retain their defaults; each table's selection and source
links remain shareable. The copy-link action sits beside the evaluation section,
separate from its quality/performance tabs. The Persian section title is now
«نتایج آزمون‌ها»; its anchor remains `#benchmarks`.

Presentation changes:

- Omit unavailable settings, document/weight revisions and empty detail fields.
  Keep numeric zero and boolean false: both can be meaningful test settings.
- Omit performance columns when the selected report has no values for them.
- Localize generic score and unit labels without inventing a metric definition.
- Remove internal comparison identifiers and repeated import/provenance fields
  from the result details; source links and specific test conditions remain.
- Place the comparison commentary in the optional explanatory disclosure.
- Retain source attribution and result-specific limitations. Original records,
  exports and conservative comparison rules are unchanged.
- Keep reference tables scrollable on narrow screens rather than squeezing
  their headings into single-word columns.

Validation: `npm run check`, `npm run build`, the evaluation-display and
multilingual evaluation tests, and a dedicated browser review in FA/EN/ES at
1440 and 390 pixels. The browser review checks local language filtering and URL
restoration, generic-score labels, missing metadata, numeric results, the
performance tab, absence of the old banner, no page overflow, and draft noindex.
Screenshots and measured row counts are stored beside this report. No deploy.
