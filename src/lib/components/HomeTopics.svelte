<script lang="ts">
  export let locale: 'fa' | 'en' | 'es' = 'fa';
  const images = ['/images/guides/ai-operator.webp', '/images/guides/zero-trust-ai.webp', '/images/guides/ai-platform.webp', '/images/articles/ai-cosmetic-surgery-or-chemotherapy/cover.webp'];
  const copies = {
    fa: {
      eyebrow: 'جغرافیای موضوعات', title: 'از سیاست‌گذاری تا پشت صحنهٔ فنی',
      topics: [
        ['حکمرانی هوش مصنوعی', 'حق تصمیم، مسئولیت و تنظیم‌گری', 'نوشته‌ها', '/articles/'],
        ['معماری و امنیت', 'RAG، عامل‌ها، زیرساخت و ZTAI', 'راهنماها', '/guides/'],
        ['سرمایه‌گذاری فناوری', 'ارزیابی مسئله، محصول و ظرفیت اجرا', 'تحلیل‌ها', '/articles/'],
        ['فناوری و جامعه', 'نگاهی سیستمی به اثر فناوری', 'صفحه اندیشه', '/thought/']
      ]
    },
    en: {
      eyebrow: 'Map of interests', title: 'From policy to the technical foundations',
      topics: [
        ['AI governance', 'Decision rights, responsibility and regulation', 'Articles', '/articles/'],
        ['Architecture & security', 'RAG, agents, infrastructure and ZTAI', 'Technical notes', '/guides/'],
        ['Technology investment', 'Assessing the problem, the product and the ability to deliver', 'Analysis', '/articles/'],
        ['Technology & society', 'A systems view of technology’s impact', 'Thought', '/thought/']
      ]
    },
    es: {
      eyebrow: 'Mapa de intereses', title: 'De las políticas públicas a los fundamentos técnicos',
      topics: [
        ['Gobernanza de IA', 'Derechos de decisión, responsabilidad y regulación', 'Artículos', '/articles/'],
        ['Arquitectura y seguridad', 'RAG, agentes, infraestructura y ZTAI', 'Notas técnicas', '/guides/'],
        ['Inversión tecnológica', 'Evaluar el problema, el producto y la capacidad de ejecución', 'Análisis', '/articles/'],
        ['Tecnología y sociedad', 'Una visión sistémica del impacto de la tecnología', 'Pensamiento', '/thought/']
      ]
    }
  };
  $: copy = copies[locale];
  $: base = locale === 'fa' ? '' : `/${locale}`;
</script>

<section class="topics-band" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow">{copy.eyebrow}</p><h2>{copy.title}</h2></div></div>
    <div class="topic-grid home-topics">
      {#each copy.topics as topic, index}
        <a href={`${base}${topic[3]}`}>
          <img src={images[index]} alt="" loading="lazy" width="640" height="360" />
          <div class="topic-copy"><b>{topic[0]}</b><span>{topic[1]}</span><i>{topic[2]} {locale === 'fa' ? '←' : '→'}</i></div>
        </a>
      {/each}
    </div>
  </div>
</section>
