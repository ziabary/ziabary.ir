# Independent résumé editions

The English and Spanish résumé pages share `LocalizedResume.svelte` for layout,
but maintain their own content. Do not populate their experience, dates,
education or publications from the Persian résumé or from each other.

| Edition | Editorial data | Authoritative supplied CV |
|---|---|---|
| English | `src/lib/resumes/en.json` | `static/downloads/SMMZ-CV-ATS-2026.pdf` |
| Spanish | `src/lib/resumes/es.json` | `static/downloads/SMMZ-CV-ATS-2026-ES.pdf` |
| Persian | `src/routes/resume/+page.svelte` | Independently maintained Persian edition |

When a CV is replaced, review that edition's JSON and PDF download link together.
Keep intentional differences between editions. Do not infer missing dates,
language proficiency, awards or association roles from the other résumé.

On 12 September 2026, the owner explicitly requested English and Spanish
versions of the Persian page's six areas of expertise and six languages.
Those two sections now use editorial translations of the Persian entries,
including the same native, professional and basic proficiency levels.
They are stored in each edition's JSON; this addition does not change the
independent sources for experience, dates, education or publications.

The personal phone number belongs only in the downloadable CV files. Do not
copy it into résumé JSON, page content, contact links or structured data; public
web pages use email and LinkedIn instead.

The September 2026 English/Spanish update includes the seven selected roles,
product and project highlights, two qualifications, nine publications, and
contact information supplied in each PDF. Hoomas is dated September 2025 without
an invented end date; education dates are omitted because neither PDF supplies
them. Robotics results remain attached to the team role.

## Source discrepancy awaiting editorial review

For the 2006 SHI-AI paper (DOI `10.1145/1232425.1232446`), the English PDF lists
**G. Rezaei**, while the Spanish PDF lists **M. Mousakhani** in the corresponding
co-author position. Each page currently follows its own supplied PDF. Confirm
the intended credits before changing either edition or PDF.
