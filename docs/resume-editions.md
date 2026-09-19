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

## E4MT publication reference

On 19 September 2026, the owner supplied the original IEEE Xplore link for
“Introducing E4MT and LMBNC: Persian pre-processing utilities”:
<https://ieeexplore.ieee.org/document/9960087>. Crossref's record for
`10.1109/ICCKE57176.2022.9960087` confirms this title, the IEEE destination and
publication on 17 November 2022. All three web editions now link the title to
IEEE; English and Spanish also display the DOI. The Persian web entry's year
was corrected from 2023 to 2022. The corresponding title line in each of the
three supplied PDFs now has an IEEE link annotation; PDF text and layout are
unchanged. The ResearchGate entry for HLMT is a different publication.

## Publication reference coverage

The 19 September 2026 reference review linked seven of the nine works in each
web edition and added matching title-line annotations to each downloadable PDF.
The supplied PDF text and layout remain unchanged.

| Work | Reference |
|---|---|
| E4MT and LMBNC | [IEEE Xplore](https://ieeexplore.ieee.org/document/9960087) |
| HLMT | [ResearchGate DOI](https://doi.org/10.13140/RG.2.1.1086.0002), matched to the [author's publication record](https://www.researchgate.net/publication/282332901_HLMT_Human-Like_Machine_Translation_Inspired_by_Bilinguals%27_Cortex_Activity_and_Translation_Behavior) |
| AUT Document Alignment | [ACL Anthology](https://aclanthology.org/W15-3412/); DOI `10.18653/v1/W15-3412` also added to EN/ES |
| AFEC | [ACL Anthology](https://aclanthology.org/2012.amta-caas14.3/) |
| SHI-AI | [ACM](https://dl.acm.org/doi/10.1145/1232425.1232446), title verified against Crossref's publisher-deposited record |
| A Novel Approach to SHI-AI | [Author's ResearchGate record](https://www.researchgate.net/publication/256706651_A_Novel_Approach_to_Semi-Human_Instinctive_Artificial_Intelligence) |
| VBScript book | [Mahdroo book record](https://mahdroo.ir/shop/product/book-384033-wizqhu), matching Mohammad Mohammadzadeh, Pejman Masnavee, Naghus, 1381/2002 and ISBN `9789645779977`; this is a bookseller catalog, not the publisher |

No independent publication record was located for Inter-Function Communication
or Design of a Cost Effective Supercomputer after searches by title, author,
co-author and Persian variants. These entries retain plain titles. Search-result
pages and unrelated papers were not used as substitutes.

## SHI-AI author discrepancy

For the 2006 SHI-AI paper (DOI `10.1145/1232425.1232446`), the English PDF lists
**G. Rezaei**, while the Spanish PDF lists **M. Mousakhani** in the corresponding
co-author position. Each page currently follows its own supplied PDF. Confirm
the intended credits before changing either edition or PDF.

Crossref's publisher-deposited record, checked on 19 September 2026, names
Morteza Mousakhani for this DOI and identifies the PCAR '06 proceedings. The
ResearchGate record names Golriz Rezaei and WAF 2006. The reference-link update
does not merge these records or silently change either résumé's author list.
