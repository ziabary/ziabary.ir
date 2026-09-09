<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  import englishResume from '$lib/resumes/en.json';
  import spanishResume from '$lib/resumes/es.json';

  export let locale: 'en' | 'es';
  // Independent editorial editions sourced from their respective CV PDFs.
  // Sharing the view does not imply that either résumé mirrors Persian.
  const resumes = { en: englishResume, es: spanishResume };
  $: copy = resumes[locale];
</script>

<svelte:head>
  <title>{copy.title} | Mehran Ziabary</title>
  <meta name="description" content={copy.summary[1]} />
</svelte:head>

<main class="resume-page localized-resume" dir="ltr">
  <PageHero eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
  <section class="wrap resume-intro">
    <div class="resume-photo"><img src="/images/profile/mehran-ziabary.jpg" alt={copy.name} /></div>
    <div>
      <p class="eyebrow">{copy.summaryLabel}</p>
      <h2>{copy.name}<span>{copy.legalName}</span></h2>
      <p class="motto" lang="en">“{copy.motto}”</p>
      {#each copy.summary as paragraph}<p>{paragraph}</p>{/each}
      <div class="resume-contact">
        <a href={`mailto:${copy.email}`}>{copy.email}</a>
        <a href={copy.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
      </div>
      <a class="button primary cv-download" href={copy.download} download>{copy.downloadLabel}</a>
    </div>
  </section>
  <div class="wrap resume-sections">
    <section aria-labelledby="experience-heading">
      <div><h2 class="eyebrow" id="experience-heading">{copy.experienceLabel}</h2><small class="section-hint">{copy.updated}</small></div>
      <div class="experience-list">
        {#each copy.experience as role}
          <article class="experience-entry">
            <p class="dates">{role.dates}</p>
            <div>
              <h3>{role.company}</h3>
              <p class="role-title">{role.title}</p>
              {#if role.description}<p>{role.description}</p>{/if}
              {#if role.highlights.length}<ul>{#each role.highlights as highlight}<li>{highlight}</li>{/each}</ul>{/if}
            </div>
          </article>
        {/each}
      </div>
    </section>
    <section aria-labelledby="education-heading">
      <h2 class="eyebrow" id="education-heading">{copy.educationLabel}</h2>
      <div class="education-list">
        {#each copy.education as education}
          <article><h3>{education.institution}</h3><p class="role-title">{education.degree}</p><p>{education.thesis}</p></article>
        {/each}
      </div>
    </section>
    <section aria-labelledby="publications-heading">
      <h2 class="eyebrow" id="publications-heading">{copy.publicationsLabel}</h2>
      <ol class="cv-publications">
        {#each copy.publications as publication}
          <li>
            <span class="publication-year">{publication.year}</span>
            <div>
              <h3>{publication.title}</h3>
              <p>{publication.authors}</p>
              {#if publication.venue}<p>{publication.venue}</p>{/if}
              {#if publication.doi}<a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noreferrer">DOI: {publication.doi} ↗</a>{/if}
            </div>
          </li>
        {/each}
      </ol>
    </section>
  </div>
</main>

<style>
  .localized-resume { text-align: left; }
  .resume-intro { align-items: start; }
  .resume-intro h2 { overflow-wrap: anywhere; }
  .resume-intro h2 span { font-size: 16px; line-height: 1.7; }
  .resume-intro .motto { color: var(--ink); font-weight: 700; }
  .resume-contact { flex-wrap: wrap; }
  .cv-download { max-width: 100%; box-sizing: border-box; white-space: normal; text-align: center; }
  .resume-sections h2 { margin: 0; font-size: 13px; line-height: 1.8; }
  .experience-list, .education-list, .cv-publications { min-width: 0; }
  .experience-entry { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 24px; padding-block: 24px; border-bottom: 1px solid var(--line); }
  .experience-entry:first-child, .education-list article:first-child, .cv-publications li:first-child { padding-top: 0; }
  .experience-entry h3, .education-list h3, .cv-publications h3 { font-size: 17px; line-height: 1.6; margin: 0 0 8px; overflow-wrap: anywhere; }
  .experience-entry p, .experience-entry li, .education-list p { color: var(--muted); font-size: 14px; line-height: 1.9; }
  .experience-entry p, .education-list p { margin: 8px 0; }
  .experience-entry .dates { font-size: 12px; margin-top: 3px; color: var(--teal); }
  .experience-entry .role-title, .education-list .role-title { color: var(--ink); font-weight: 600; }
  .experience-entry ul { padding-inline-start: 20px; margin: 12px 0 0; }
  .experience-entry li { margin-block: 8px; }
  .education-list article { padding-block: 22px; border-bottom: 1px solid var(--line); }
  .cv-publications { padding: 0; margin: 0; list-style: none; }
  .cv-publications li { display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: 18px; padding-block: 22px; border-bottom: 1px solid var(--line); }
  .publication-year { color: var(--teal); font-size: 12px; padding-top: 3px; }
  .cv-publications h3 { font-size: 15px; }
  .cv-publications p { font-size: 13px; line-height: 1.8; color: var(--muted); margin: 6px 0; }
  .cv-publications a { display: inline-block; font-size: 12px; color: var(--teal); overflow-wrap: anywhere; }
  @media(max-width: 980px) { .experience-entry { grid-template-columns: minmax(0, 1fr); gap: 4px; } }
  @media(max-width: 680px) { .resume-intro { padding-block: 36px; } .resume-photo { max-width: 320px; height: 360px; } }
</style>
