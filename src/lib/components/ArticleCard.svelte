<script lang="ts">
  import type { ArticleMeta } from '$lib/content';
  export let article: ArticleMeta;
  export let featured = false;
  export let locale: 'fa' | 'en' | 'es' = 'fa';

  $: base = locale === 'fa' ? '/articles' : `/${locale}/articles`;
  $: readMore = locale === 'fa' ? 'ادامه مطلب ←' : locale === 'es' ? 'Leer artículo →' : 'Read article →';
  $: labels = locale === 'fa' ? { published: 'انتشار', updated: 'بازبینی' }
    : locale === 'es' ? { published: 'Publicado', updated: 'Actualizado' }
    : { published: 'Published', updated: 'Updated' };
  $: dateFormat = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const localizedDate = (date: string) => dateFormat.format(new Date(date));
</script>

<article class:featured class="article-card">
  <div class:has-image={Boolean(article.cover)} class="card-art">
    {#if article.cover}
      <img src={article.cover} alt="" loading="lazy" />
    {/if}
    <span>{article.category}</span>
    {#if !article.cover}<i>{article.slug.includes('ai') ? 'AI' : '⌁'}</i>{/if}
  </div>
  <div class="card-body">
    <p>
      {labels.published} {locale === 'fa' ? article.faDate : localizedDate(article.date)}
      {#if article.updated && (locale !== 'fa' || article.faUpdated)} · {labels.updated} {locale === 'fa' ? article.faUpdated : localizedDate(article.updated)}{/if}
      · {article.readTime}
    </p>
    <h3><a href="{base}/{article.slug}/">{article.title}</a></h3>
    <span>{article.excerpt}</span>
    <a class="text-link" href="{base}/{article.slug}/">{readMore}</a>
  </div>
</article>
