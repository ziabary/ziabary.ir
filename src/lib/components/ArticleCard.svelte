<script lang="ts">
  import type { ArticleMeta } from '$lib/content';
  export let article: ArticleMeta;
  export let featured = false;
</script>

<article class:featured class="article-card">
  <div class="card-art">
    <span>{article.category}</span>
    <i>{article.slug.includes('ai') ? 'AI' : '⌁'}</i>
  </div>
  <div class="card-body">
    <p>{article.faDate} · {article.readTime}</p>
    <h3><a href="/articles/{article.slug}/">{article.title}</a></h3>
    <span>{article.excerpt}</span>
    <a class="text-link" href="/articles/{article.slug}/">ادامه مطلب ←</a>
  </div>
</article>
