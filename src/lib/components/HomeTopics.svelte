<script lang="ts">
  import { imageAttributes } from '$lib/images';
  import { availableTopics, topicPath } from '$lib/topics';
  export let locale: 'fa' | 'en' | 'es' = 'fa';
  const copies = {
    fa: { eyebrow: 'جغرافیای موضوعات', title: 'از سیاست‌گذاری تا پشت صحنهٔ فنی' },
    en: { eyebrow: 'Map of interests', title: 'From products to the technical foundations' },
    es: { eyebrow: 'Mapa de intereses', title: 'De los productos a los fundamentos técnicos' }
  };
  $: copy = copies[locale];
  $: base = locale === 'fa' ? '' : `/${locale}`;
</script>

<section class="topics-band" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
  <div class="wrap">
    <div class="section-head"><div><p class="eyebrow">{copy.eyebrow}</p><h2>{copy.title}</h2></div></div>
    <div class="topic-grid home-topics">
      {#each availableTopics(locale) as topic}
        <a href={topicPath(topic)}>
          <img {...imageAttributes(topic.image, '(min-width: 980px) 320px, calc(100vw - 32px)')} alt="" loading="lazy" width="640" height="360" />
          <div class="topic-copy"><b>{topic.title}</b><span>{topic.intro}</span><i>{locale === 'fa' ? 'نوشته‌های منتخب ←' : locale === 'en' ? 'Selected articles →' : 'Artículos seleccionados →'}</i></div>
        </a>
      {/each}
    </div>
  </div>
</section>
