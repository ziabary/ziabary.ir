<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';
  export let locale: 'en' | 'es';

  const sharedPublications = [
    'Introducing E4MT and LMBNC: Persian pre-processing utilities',
    "HLMT: Human-Like Machine Translation Inspired by Bilinguals' Cortex Activity and Translation Behavior",
    'AUT Document Alignment Framework for BUCC Workshop Shared Task — 2015',
    'Developing an open-domain English–Farsi translation system using AFEC — 2012',
    'Semi-human instinctive artificial intelligence (SHI-AI) — 2006',
    'A Novel Approach to Semi-Human Instinctive Artificial Intelligence — 2005',
    "VBScript programmer's guide — 2002",
    'Inter-Function Communication (IFC) — 2001',
    'Design of a Cost Effective Supercomputer — 2001'
  ];

  const copies = {
    en: {
      title: 'Résumé', eyebrow: 'Professional record',
      lead: 'My full legal name is Seyed Mohammad Mohammadzadeh Ziabary. I am known professionally and in the media as Mehran Ziabary.',
      summaryLabel: 'Professional summary',
      summary: 'Technology executive, entrepreneur and AI researcher with more than twenty years of experience—from digital electronics, robotics and network security to natural-language processing, product development and AI governance.',
      currentLabel: 'Current responsibilities', previousLabel: 'Previous experience', educationLabel: 'Education', expertiseLabel: 'Areas of expertise', publicationsLabel: 'Publications and works', awardsLabel: 'Awards', languagesLabel: 'Languages', updated: 'Updated: 2026',
      current: [
        ['Hoomas', 'Vice President of Technology', '2025–present', 'Industrial AI investment and venture development across industry and mining.'],
        ['Targoman Intelligent Processing', 'Co-founder and CEO', 'Co-founder since 2015; CEO since 2017', 'Natural-language processing systems and high-performance AI infrastructure.'],
        ['Tarjomyar and Toranj', 'Co-founder and Executive Director', '2016–present', 'AI-assisted translation products and platforms.'],
        ['Tehran ICT Guild', 'Chair, AI & Data Commission', '2025–present', 'Chair of the AI Infrastructure and Data Governance working group since 2020.']
      ],
      previous: [
        ['AI & Data Commission, Tehran ICT Guild', 'Vice-chair and Secretary', 'Vice-chair 2024–2025; Secretary 2018–2024'],
        ['Ministry of ICT', 'Advisor to the Deputy Minister', 'National Information Network monitoring, 2021–2023'],
        ['Ministry of ICT', 'Advisor and project lead', 'Open-access search programme, 2017–2019'],
        ['Delta Global', 'Senior Engineer, Technical Deputy and CTO', 'CTO 2006–2009; Technical Deputy 2009–2014; Senior Engineer 2014–2016']
      ],
      education: [
        ['2009–2013', 'MSc in Artificial Intelligence', 'Amirkabir University of Technology', 'Thesis: Design and development of a machine translator inspired by the behaviour of bilingual children.'],
        ['1997–2008', 'BSc in Software Engineering', 'Islamic Azad University, Central Tehran Branch', 'Thesis: Design and development of a supercomputer using decommissioned computers.']
      ],
      expertise: ['Artificial intelligence and NLP','Software systems architecture','Data and AI governance','Network and data security','Digital electronics and robotics','Technical investment assessment'],
      awards: [
        ['Fourth place, international RoboCup competition', 'IranOpen 2008 · Qazvin'],
        ['Second place, international RoboCup competition', 'RoboCup 2006 · Bremen, Germany'],
        ['Eighth place, international RoboCup competition', 'RoboCup 2005 · Osaka, Japan'],
        ['First place, combat robotics competition', 'Central Tehran · 2004']
      ],
      languages: [['Persian','Native'],['English','Professional'],['Spanish','Professional'],['Turkish','Basic'],['Italian','Basic'],['Arabic','Basic']]
    },
    es: {
      title: 'Currículum', eyebrow: 'Trayectoria profesional',
      lead: 'Mi nombre legal completo es Seyed Mohammad Mohammadzadeh Ziabary. En el ámbito profesional y en los medios se me conoce como Mehran Ziabary.',
      summaryLabel: 'Resumen profesional',
      summary: 'Directivo tecnológico, emprendedor e investigador de inteligencia artificial con más de veinte años de experiencia: desde electrónica digital, robótica y seguridad de redes hasta procesamiento del lenguaje natural, desarrollo de producto y gobernanza de IA.',
      currentLabel: 'Responsabilidades actuales', previousLabel: 'Experiencia anterior', educationLabel: 'Formación', expertiseLabel: 'Áreas de especialidad', publicationsLabel: 'Publicaciones y obras', awardsLabel: 'Reconocimientos', languagesLabel: 'Idiomas', updated: 'Actualizado: 2026',
      current: [
        ['Hoomas', 'Vicepresidente de Tecnología', '2025–actualidad', 'Inversión y desarrollo de empresas de IA industrial para industria y minería.'],
        ['Targoman Intelligent Processing', 'Cofundador y director ejecutivo', 'Cofundador desde 2015; director ejecutivo desde 2017', 'Sistemas de procesamiento del lenguaje natural e infraestructura de IA de alto rendimiento.'],
        ['Tarjomyar y Toranj', 'Cofundador y director ejecutivo', '2016–actualidad', 'Productos y plataformas de traducción asistida por inteligencia artificial.'],
        ['Gremio TIC de Teherán', 'Presidente de la Comisión de IA y Datos', '2025–actualidad', 'Responsable del grupo de infraestructura de IA y gobernanza de datos desde 2020.']
      ],
      previous: [
        ['Comisión de IA y Datos, Gremio TIC de Teherán', 'Vicepresidente y secretario', 'Vicepresidente 2024–2025; secretario 2018–2024'],
        ['Ministerio de TIC', 'Asesor del viceministro', 'Seguimiento de la Red Nacional de Información, 2021–2023'],
        ['Ministerio de TIC', 'Asesor y director de proyecto', 'Programa de acceso abierto a buscadores, 2017–2019'],
        ['Delta Global', 'Ingeniero sénior, subdirector técnico y director técnico', 'Director técnico 2006–2009; subdirector 2009–2014; ingeniero sénior 2014–2016']
      ],
      education: [
        ['2009–2013', 'Máster en Inteligencia Artificial', 'Universidad Tecnológica Amirkabir', 'Tesis: Diseño y desarrollo de un traductor automático inspirado en el comportamiento de niños bilingües.'],
        ['1997–2008', 'Ingeniería de Software', 'Universidad Islámica Azad, sede central de Teherán', 'Tesis: Diseño y desarrollo de un supercomputador mediante ordenadores retirados.']
      ],
      expertise: ['Inteligencia artificial y PLN','Arquitectura de sistemas de software','Gobernanza de datos e IA','Seguridad de redes y datos','Electrónica digital y robótica','Evaluación técnica de inversiones'],
      awards: [
        ['Cuarto puesto en competición internacional RoboCup', 'IranOpen 2008 · Qazvin'],
        ['Segundo puesto en competición internacional RoboCup', 'RoboCup 2006 · Bremen, Alemania'],
        ['Octavo puesto en competición internacional RoboCup', 'RoboCup 2005 · Osaka, Japón'],
        ['Primer puesto en competición de robots de combate', 'Teherán Central · 2004']
      ],
      languages: [['Persa','Nativo'],['Inglés','Profesional'],['Español','Profesional'],['Turco','Básico'],['Italiano','Básico'],['Árabe','Básico']]
    }
  } as const;
  $: copy = copies[locale];
</script>

<svelte:head><title>{copy.title} | Mehran Ziabary</title><meta name="description" content={copy.summary} /></svelte:head>

<main class="resume-page localized-resume" dir="ltr">
  <PageHero eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
  <section class="wrap resume-intro">
    <div class="resume-photo"><img src="/images/gallery/mehran-ziabary-headshot.jpg" alt="Mehran Ziabary" /></div>
    <div>
      <p class="eyebrow">{copy.summaryLabel}</p>
      <h2>Seyed Mohammad Mohammadzadeh Ziabary <span>“Mehran Ziabary”</span></h2>
      <p>{copy.summary}</p>
      <div class="resume-contact"><a href="mailto:ziabary@targoman.com">ziabary@targoman.com</a><a href="https://www.linkedin.com/in/mehranziabary" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
    </div>
  </section>
  <section class="wrap resume-sections">
    <section><div><p class="eyebrow">{copy.currentLabel}</p><small class="section-hint">{copy.updated}</small></div><div class="resume-rows">{#each copy.current as item}<div><span>{item[0]}</span><b>{item[1]}</b><small><strong>{item[2]}</strong>{item[3]}</small></div>{/each}</div></section>
    <section><p class="eyebrow">{copy.previousLabel}</p><div class="resume-rows">{#each copy.previous as item}<div><span>{item[0]}</span><b>{item[1]}</b><small>{item[2]}</small></div>{/each}</div></section>
    <section><p class="eyebrow">{copy.educationLabel}</p><div class="resume-rows education-rows">{#each copy.education as item}<div><span>{item[0]}</span><b>{item[1]}</b><small><strong>{item[2]}</strong>{item[3]}</small></div>{/each}</div></section>
    <section><p class="eyebrow">{copy.expertiseLabel}</p><div class="expertise-list">{#each copy.expertise as item}<span>{item}</span>{/each}</div></section>
    <section><p class="eyebrow">{copy.publicationsLabel}</p><ol class="publication-list">{#each sharedPublications as publication, index}<li><span>{String(index + 1).padStart(2,'0')}</span><b>{publication}</b></li>{/each}</ol></section>
    <section><p class="eyebrow">{copy.awardsLabel}</p><div class="award-grid">{#each copy.awards as award}<div><b>{award[0]}</b><span>{award[1]}</span></div>{/each}</div></section>
    <section><p class="eyebrow">{copy.languagesLabel}</p><div class="language-list">{#each copy.languages as language}<span><b>{language[0]}</b> {language[1]}</span>{/each}</div></section>
  </section>
</main>

<style>
  .localized-resume :global(.page-hero),.localized-resume :global(.resume-intro),.localized-resume :global(.resume-sections){text-align:left}
  .localized-resume :global(.resume-rows>div),.localized-resume :global(.education-rows>div){direction:ltr}
</style>
