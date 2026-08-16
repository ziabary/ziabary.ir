<script lang="ts">
  import '../app.css';
  import '../refinement.css';
  import SiteShell from '$lib/components/SiteShell.svelte';
  import ImageLightbox from '$lib/components/ImageLightbox.svelte';
  import PageSeo from '$lib/components/PageSeo.svelte';
  export let data;

  const defaultPages: Record<string, { title: string; description: string; image: string; locale?: 'fa' | 'en' | 'es' }> = {
    '/': { title: 'مهران ضیابری | سید محمد محمدزاده ضیابری', description: 'مدیر فناوری، کارآفرین و پژوهشگر هوش مصنوعی؛ نوشته‌ها، دیدگاه‌ها، ارائه‌ها و تجربه‌های فنی مهران ضیابری.', image: '/images/profile/mehran-ziabary-formal.png' },
    '/thought/': { title: 'اندیشه | مهران ضیابری', description: 'نگاه مهران ضیابری به فناوری، هوش مصنوعی، معماری، حکمرانی و نسبت میان ابزار و مسئله.', image: '/images/profile/mehran-ziabary-formal.png' },
    '/articles/': { title: 'نوشته‌ها و یادداشت‌ها | مهران ضیابری', description: 'تحلیل‌های فنی و مدیریتی مهران ضیابری درباره هوش مصنوعی، زیرساخت، امنیت و حکمرانی فناوری.', image: '/images/articles/choosing-gpu-for-ai/cover.png' },
    '/guides/': { title: 'فنی‌جات | مهران ضیابری', description: 'مجموعه راهنماهای فنی درباره زیرساخت هوش مصنوعی، امنیت، سیستم‌عامل، اپراتور و سکوی هوش مصنوعی.', image: '/images/guides/gpu-selection.webp' },
    '/slides/': { title: 'اسلایدها و ارائه‌ها | مهران ضیابری', description: 'آرشیو اسلایدها، دوره‌ها، کارگاه‌ها و سخنرانی‌های مهران ضیابری.', image: '/slides/enterprise-ai-governance-dba/cover.jpg' },
    '/media/': { title: 'بازتاب‌ها | مهران ضیابری', description: 'گفت‌وگوها، ویدئوها، نوشته‌ها و تصاویر منتخب از بازتاب فعالیت‌های مهران ضیابری.', image: '/images/gallery/hoomas.jpg' },
    '/gallery/': { title: 'گالری | مهران ضیابری', description: 'تصاویر منتخب از گفت‌وگوها، کلاس‌ها، ارائه‌ها و حضورهای حرفه‌ای مهران ضیابری.', image: '/images/gallery/imidro.jpg' },
    '/resume/': { title: 'رزومه سید محمد محمدزاده ضیابری | مهران ضیابری', description: 'سوابق حرفه‌ای، تحصیلات، آثار، مسئولیت‌ها و افتخارات مهران ضیابری.', image: '/images/profile/mehran-ziabary-formal.png' },
    '/en/': { title: 'Mehran Ziabary | AI, systems and technology governance', description: 'Technical leader, entrepreneur and AI researcher writing about AI systems, infrastructure and governance.', image: '/images/profile/mehran-ziabary-formal.png', locale: 'en' },
    '/en/articles/': { title: 'Writing | Mehran Ziabary', description: 'English technical writing by Mehran Ziabary on AI, systems, infrastructure and security.', image: '/images/profile/mehran-ziabary-formal.png', locale: 'en' },
    '/en/guides/': { title: 'Technical guides | Mehran Ziabary', description: 'Technical guides on AI infrastructure, security and enterprise systems.', image: '/images/guides/gpu-selection.webp', locale: 'en' },
    '/en/slides/': { title: 'Slides and presentations | Mehran Ziabary', description: 'Courses, talks, workshops and presentation archives by Mehran Ziabary.', image: '/slides/enterprise-ai-governance-dba/cover.jpg', locale: 'en' },
    '/en/media/': { title: 'Media | Mehran Ziabary', description: 'Selected interviews, videos, writing and professional media appearances.', image: '/images/gallery/hoomas.jpg', locale: 'en' },
    '/en/resume/': { title: 'Resume | Mehran Ziabary', description: 'Professional background, education, publications, responsibilities and recognition.', image: '/images/profile/mehran-ziabary-formal.png', locale: 'en' },
    '/en/thought/': { title: 'Perspective | Mehran Ziabary', description: 'Mehran Ziabary’s perspective on technology, AI, systems architecture and governance.', image: '/images/profile/mehran-ziabary-formal.png', locale: 'en' },
    '/es/': { title: 'Mehran Ziabary | IA, sistemas y gobernanza tecnológica', description: 'Líder tecnológico, emprendedor e investigador de inteligencia artificial.', image: '/images/profile/mehran-ziabary-formal.png', locale: 'es' },
    '/es/articles/': { title: 'Artículos | Mehran Ziabary', description: 'Ensayos y notas técnicas de Mehran Ziabary sobre IA, sistemas e infraestructura.', image: '/images/profile/mehran-ziabary-formal.png', locale: 'es' },
    '/es/guides/': { title: 'Guías técnicas | Mehran Ziabary', description: 'Guías sobre infraestructura de IA, seguridad y sistemas empresariales.', image: '/images/guides/gpu-selection.webp', locale: 'es' },
    '/es/slides/': { title: 'Presentaciones | Mehran Ziabary', description: 'Archivo de cursos, conferencias, talleres y presentaciones.', image: '/slides/enterprise-ai-governance-dba/cover.jpg', locale: 'es' },
    '/es/media/': { title: 'Medios | Mehran Ziabary', description: 'Entrevistas, vídeos, textos y apariciones profesionales seleccionadas.', image: '/images/gallery/hoomas.jpg', locale: 'es' },
    '/es/resume/': { title: 'Currículum | Mehran Ziabary', description: 'Experiencia profesional, formación, publicaciones, responsabilidades y reconocimientos.', image: '/images/profile/mehran-ziabary-formal.png', locale: 'es' },
    '/es/thought/': { title: 'Perspectiva | Mehran Ziabary', description: 'La perspectiva de Mehran Ziabary sobre tecnología, IA, arquitectura y gobernanza.', image: '/images/profile/mehran-ziabary-formal.png', locale: 'es' }
  };

  $: defaultSeo = defaultPages[data.pathname];
</script>

{#if defaultSeo}
  <PageSeo {...defaultSeo} path={data.pathname} locale={defaultSeo.locale ?? 'fa'} />
{/if}

<SiteShell locale={data.locale} pathname={data.pathname}>
  <slot />
</SiteShell>
<ImageLightbox />
