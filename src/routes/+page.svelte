<script lang="ts">
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { articles } from '$lib/content';
  import HomeTopics from '$lib/components/HomeTopics.svelte';
  import HomePresentation from '$lib/components/HomePresentation.svelte';
  import '$lib/components/home-previews.css';
  import { mediaItems, mediaSources } from '$lib/news';
  const featured = articles.filter((article) => article.lang === 'fa').slice(0, 3);
  const latestMedia = [...mediaItems].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
</script>

<svelte:head>
  <title>مهران ضیابری | سید محمد محمدزاده ضیابری</title>
  <meta name="description" content="سید محمد محمدزاده ضیابری، شناخته‌شده با نام مهران ضیابری؛ مدیر فناوری، کارآفرین و پژوهشگر هوش مصنوعی." />
</svelte:head>

<main>
  <section class="hero wrap">
    <div class="hero-copy">
      <p class="eyebrow">فناوری، حکمرانی و ساختن</p>
      <h1>مهران ضیابری</h1>
      <p class="hero-lead">مدیر فناوری و پژوهشگر هوش مصنوعی؛ با تمرکز بر معماری سامانه‌ها، تصمیم‌گیری سازمانی و حکمرانی فناوری.</p>
      <div class="hero-roles">
        <div class="hero-role-card commission-role">
          <img src="/images/organizations/nezamsenfi-ai.png" alt="نشان کمیسیون هوش مصنوعی و علم‌داده نصر تهران" />
          <div><b>رئیس کمیسیون هوش مصنوعی و علم‌داده</b><span>سازمان نظام صنفی رایانه‌ای استان تهران</span></div>
        </div>
        <div class="hero-role-card targoman-role">
          <img src="/images/organizations/targoman-logo.png" alt="نشان شرکت پردازش هوشمند ترگمان" />
          <div><b>هم‌بنیان‌گذار و مدیرعامل</b><span>شرکت دانش‌بنیان پردازش هوشمند ترگمان</span></div>
        </div>
        <div class="hero-role-card hoomas-role">
          <img src="/images/organizations/hoomas-logo.png" alt="نشان شرکت تسهیلگران صادرات هوش مصنوعی" />
          <div><b>معاون فنی</b><span>شرکت تسهیلگران صادرات هوش مصنوعی (هومص)</span></div>
        </div>
      </div>
      <div class="actions"><a class="button primary" href="/articles/">خواندن نوشته‌ها</a><a class="button ghost" href="/resume/">رزومه</a></div>
    </div>
    <figure class="portrait-card">
      <img src="/images/profile/mehran-ziabary-formal.png" alt="پرتره رسمی مهران ضیابری" />
      <figcaption><b>بیش از ۲۸ سال تجربه</b><span>از الکترونیک و رباتیک تا امنیت شبکه، هوش مصنوعی و حکمرانی فناوری</span></figcaption>
    </figure>
  </section>

  <section class="statement-section"><div class="wrap statement-grid"><p class="section-no">۰۱ / اندیشه</p><div><blockquote>هر فناوری از یک فلسفه سرچشمه می‌گیرد؛ از نوع نگاه به مسئله، انسان، اختیار و مسئولیت. به‌کارگیری فناوری بدون شناخت این لایه‌های عمیق، هرقدر هم پیچیده و پرهزینه باشد، در نهایت چیزی بیش از سرگرمی با ابزارهای تازه نیست.</blockquote><a class="text-link" href="/thought/">چگونه به فناوری می‌نگرم ←</a></div></div></section>

  <section class="wrap section">
    <div class="section-head"><div><p class="eyebrow">تازه‌ترین نوشته‌ها</p><h2>یادداشت و تحلیل</h2></div><a class="text-link" href="/articles/">آرشیو همه نوشته‌ها ←</a></div>
    <div class="article-grid">{#each featured as article, index}<ArticleCard {article} featured={index === 0} />{/each}</div>
  </section>

  <HomeTopics />
  <HomePresentation />

  <section class="media-strip">
    <div class="wrap">
      <div class="section-head"><div><p class="eyebrow">بازتاب‌ها</p><h2>نوشته‌ها و گفت‌وگوهای منتشرشده</h2></div><a class="text-link" href="/media/">همه موارد ←</a></div>
      <div class="media-row home-media">
        {#each latestMedia as item}
          <a href={item.url} target="_blank" rel="noreferrer">
            <div class="home-media-cover" class:source-cover={!item.coverImage}>
              {#if item.coverImage}
                <img src={item.coverImage} alt={item.coverImageAlt ?? item.title} loading="lazy" width="640" height="360" />
              {:else if mediaSources[item.source]}
                <img src={mediaSources[item.source].logo} alt={`نشان ${item.source}`} loading="lazy" width="160" height="160" />
              {:else}
                <i class="fa-regular fa-newspaper" aria-hidden="true"></i>
              {/if}
            </div>
            <div class="home-media-copy">
              <span class="media-row-source">{#if mediaSources[item.source]}<img src={mediaSources[item.source].logo} alt="" loading="lazy" />{/if}<strong>{item.source}</strong><small>{item.kind}</small></span>
              <b>{item.title}</b>
              <p class="home-media-summary">{item.summary}</p>
              <div class="home-media-meta"><time datetime={item.date}>{item.faDate}</time><span>خواندن در {item.source} ↗</span></div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </section>
</main>
