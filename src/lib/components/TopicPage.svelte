<script lang="ts">
  import PageHero from './PageHero.svelte';
  import PageSeo from './PageSeo.svelte';
  import ArticleCard from './ArticleCard.svelte';
  import { topicArticles, topicPath, type topics } from '$lib/topics';
  export let topic: typeof topics[number];
</script>
<PageSeo locale={topic.locale} title={`${topic.title} | ${topic.locale === 'fa' ? 'مهران ضیابری' : 'Mehran Ziabary'}`} description={topic.intro} path={topicPath(topic)} image={topic.image} />
<main dir={topic.locale === 'fa' ? 'rtl' : 'ltr'}>
  <PageHero eyebrow={topic.locale === 'fa' ? 'جغرافیای موضوعات' : topic.locale === 'en' ? 'Selected reading' : 'Lecturas seleccionadas'} title={topic.title} lead={topic.intro} />
  <section class="wrap article-grid">{#each topicArticles(topic) as article}<ArticleCard {article} locale={topic.locale} />{/each}</section>
</main>
