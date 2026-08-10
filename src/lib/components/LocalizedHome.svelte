<script lang="ts">
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { articles } from '$lib/content';
  export let locale: 'en' | 'es';

  const copies = {
    en: {
      title: 'Mehran Ziabary | Technology, AI and governance',
      description: 'Mehran Ziabary—technology executive, entrepreneur and AI researcher working across systems architecture, organisational decisions and technology governance.',
      eyebrow: 'Technology · Governance · Building',
      lead: 'Technology executive and AI researcher focused on systems architecture, organisational decision-making and technology governance.',
      official: 'Full legal name: Seyed Mohammad Mohammadzadeh Ziabary',
      commissionRole: 'Chair, AI & Data Commission', commissionOrg: 'Tehran ICT Guild Organization',
      targomanRole: 'Co-founder and CEO', targomanOrg: 'Targoman Intelligent Processing',
      writingButton: 'Read my writing', resumeButton: 'Résumé',
      experience: 'More than 20 years of experience', experienceLine: 'From electronics and robotics to network security and artificial intelligence',
      thoughtNo: '01 / Thought',
      statement: 'Every technology springs from a philosophy: a way of seeing the problem, the human being, agency and responsibility. Using technology without understanding these deeper layers, however complex or expensive it may be, ultimately amounts to little more than playing with new tools.',
      thoughtLink: 'How I look at technology →',
      latest: 'Latest writing', analysis: 'Essays & field notes', allWriting: 'Browse all writing →',
      topicsEyebrow: 'Map of interests', topicsTitle: 'From governance to the technical machinery',
      topics: [
        ['AI governance','Decision rights, responsibility and institutional design','Writing','/en/articles/'],
        ['Architecture & security','Systems, infrastructure and operational constraints','Technical notes','/en/guides/'],
        ['Building technology','Products, teams and changing technical models','Field notes','/en/articles/'],
        ['Technology & society','A systems view of choice, power and consequences','Thought','/en/thought/']
      ],
      slidesEyebrow: 'Slides & courses', courseTitle: 'Enterprise AI Governance',
      courseSummary: 'Turning an AI project into an organisational capability—from decision rights and problem framing to architecture, security, contracts and acceptance.',
      hour: 'hours', sections: 'sections', audience: 'executives', deckButton: 'Open course archive', deckVersion: '2026 edition',
      mediaEyebrow: 'Media', mediaTitle: 'Published work available in English', mediaAll: 'Open media page →', edition: 'International edition'
    },
    es: {
      title: 'Mehran Ziabary | Tecnología, IA y gobernanza',
      description: 'Mehran Ziabary—directivo tecnológico, emprendedor e investigador de IA dedicado a arquitectura de sistemas, decisiones organizativas y gobernanza tecnológica.',
      eyebrow: 'Tecnología · Gobernanza · Construir',
      lead: 'Directivo tecnológico e investigador de inteligencia artificial centrado en arquitectura de sistemas, toma de decisiones organizativa y gobernanza tecnológica.',
      official: 'Nombre legal completo: Seyed Mohammad Mohammadzadeh Ziabary',
      commissionRole: 'Presidente de la Comisión de IA y Datos', commissionOrg: 'Organización del Gremio TIC de Teherán',
      targomanRole: 'Cofundador y director ejecutivo', targomanOrg: 'Targoman Intelligent Processing',
      writingButton: 'Leer artículos', resumeButton: 'Currículum',
      experience: 'Más de 20 años de experiencia', experienceLine: 'De la electrónica y la robótica a la seguridad de redes y la inteligencia artificial',
      thoughtNo: '01 / Pensamiento',
      statement: 'Toda tecnología nace de una filosofía: de una forma de mirar el problema, al ser humano, la capacidad de elegir y la responsabilidad. Emplear tecnología sin comprender estas capas profundas, por compleja o costosa que sea, termina siendo poco más que jugar con herramientas nuevas.',
      thoughtLink: 'Cómo entiendo la tecnología →',
      latest: 'Últimos artículos', analysis: 'Ensayos y experiencias', allWriting: 'Ver todos los artículos →',
      topicsEyebrow: 'Mapa de intereses', topicsTitle: 'De la gobernanza a la maquinaria técnica',
      topics: [
        ['Gobernanza de IA','Derechos de decisión, responsabilidad y diseño institucional','Artículos','/es/articles/'],
        ['Arquitectura y seguridad','Sistemas, infraestructura y límites operativos','Notas técnicas','/es/guides/'],
        ['Construir tecnología','Productos, equipos y modelos técnicos que cambian','Experiencias','/es/articles/'],
        ['Tecnología y sociedad','Una mirada sistémica a elección, poder y consecuencias','Pensamiento','/es/thought/']
      ],
      slidesEyebrow: 'Diapositivas y cursos', courseTitle: 'Gobernanza empresarial de la IA',
      courseSummary: 'Convertir un proyecto de IA en capacidad organizativa: derechos de decisión, formulación del problema, arquitectura, seguridad, contratos y aceptación.',
      hour: 'horas', sections: 'secciones', audience: 'directivos', deckButton: 'Abrir archivo de cursos', deckVersion: 'edición 2026',
      mediaEyebrow: 'Medios', mediaTitle: 'Trabajo publicado disponible en español', mediaAll: 'Abrir página de medios →', edition: 'Edición internacional'
    }
  } as const;

  $: copy = copies[locale];
  $: localizedArticles = articles.filter((article) => article.lang === locale);
  $: featured = localizedArticles.slice(0, 3);
  $: base = `/${locale}`;
</script>

<svelte:head><title>{copy.title}</title><meta name="description" content={copy.description} /></svelte:head>

<main class="localized-home" dir="ltr">
  <section class="hero wrap">
    <div class="hero-copy">
      <p class="eyebrow">{copy.eyebrow}</p>
      <h1>Mehran Ziabary</h1>
      <small class="official-name">{copy.official}</small>
      <p class="hero-lead">{copy.lead}</p>
      <div class="hero-roles">
        <div class="hero-role-card commission-role"><img src="/images/organizations/nezamsenfi-ai.png" alt="" /><div><b>{copy.commissionRole}</b><span>{copy.commissionOrg}</span></div></div>
        <div class="hero-role-card targoman-role"><img src="/images/organizations/targoman-logo.png" alt="" /><div><b>{copy.targomanRole}</b><span>{copy.targomanOrg}</span></div></div>
      </div>
      <div class="actions"><a class="button primary" href="{base}/articles/">{copy.writingButton}</a><a class="button ghost" href="{base}/resume/">{copy.resumeButton}</a></div>
    </div>
    <figure class="portrait-card"><img src="/images/profile/mehran-ziabary-formal.png" alt="Mehran Ziabary" /><figcaption><b>{copy.experience}</b><span>{copy.experienceLine}</span></figcaption></figure>
  </section>

  <section class="statement-section"><div class="wrap statement-grid"><p class="section-no">{copy.thoughtNo}</p><div><blockquote>{copy.statement}</blockquote><a class="text-link" href="{base}/thought/">{copy.thoughtLink}</a></div></div></section>

  <section class="wrap section">
    <div class="section-head"><div><p class="eyebrow">{copy.latest}</p><h2>{copy.analysis}</h2></div><a class="text-link" href="{base}/articles/">{copy.allWriting}</a></div>
    <div class="article-grid" class:two-items={featured.length === 2}>{#each featured as article,index}<ArticleCard {article} {locale} featured={index === 0} />{/each}</div>
  </section>

  <section class="topics-band"><div class="wrap"><div class="section-head"><div><p class="eyebrow">{copy.topicsEyebrow}</p><h2>{copy.topicsTitle}</h2></div></div><div class="topic-grid">{#each copy.topics as topic}<a href={topic[3]}><b>{topic[0]}</b><span>{topic[1]}</span><i>{topic[2]}</i></a>{/each}</div></div></section>

  <section class="wrap section teaching-preview">
    <div class="course-visual"><div class="deck-kicker">DBA · 16 HOURS</div><strong class="deck-title">{copy.courseTitle}</strong><div class="deck-meta"><span>114 SLIDES</span><span>{copy.deckVersion}</span></div><div class="course-lines"></div></div>
    <div><p class="eyebrow">{copy.slidesEyebrow}</p><h2>{copy.courseTitle}</h2><p>{copy.courseSummary}</p><div class="metrics"><span><b>16</b> {copy.hour}</span><span><b>6</b> {copy.sections}</span><span><b>DBA</b> {copy.audience}</span></div><a class="button primary" href="{base}/slides/">{copy.deckButton}</a></div>
  </section>

  <section class="media-strip"><div class="wrap"><div class="section-head"><div><p class="eyebrow">{copy.mediaEyebrow}</p><h2>{copy.mediaTitle}</h2></div><a class="text-link" href="{base}/media/">{copy.mediaAll}</a></div><div class="media-row" class:two-items={localizedArticles.length === 2}>{#each localizedArticles.slice(0,3) as article}<a href="{base}/articles/{article.slug}/"><span class="media-row-source"><strong>{copy.edition}</strong><small>{article.category}</small></span><b>{article.title}</b><span>{article.excerpt}</span></a>{/each}</div></div></section>
</main>

<style>
  .localized-home{text-align:left}.localized-home .official-name{display:block;color:var(--teal);font-size:10px;margin:-12px 0 18px}
  .localized-home .hero-lead{max-width:720px}.localized-home .hero-role-card{text-align:left}
  .localized-home .statement-grid blockquote{line-height:1.55}.localized-home .deck-title{text-align:center;line-height:1.35;padding-inline:30px}
  .localized-home .article-grid.two-items{grid-template-columns:1.25fr 1fr}.localized-home .media-row.two-items{grid-template-columns:repeat(2,1fr)}
  @media(max-width:680px){.localized-home .statement-grid blockquote{line-height:1.6}.localized-home .article-grid.two-items,.localized-home .media-row.two-items{grid-template-columns:1fr}}
</style>
