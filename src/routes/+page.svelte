<script lang="ts">
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { articles } from '$lib/content';
  import { courses, mediaItems } from '$lib/data';
  const featured = articles.slice(0, 3);
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
      <p class="official-name">نام رسمی: سید محمد محمدزاده ضیابری</p>
      <p class="hero-lead">مدیر فناوری و پژوهشگر هوش مصنوعی؛ در نقطه‌ای که معماری فنی، تصمیم مدیریتی و اثر اجتماعی به هم می‌رسند.</p>
      <div class="hero-role"><b>مدیرعامل ترجمان</b><span>رئیس کمیسیون هوش مصنوعی و علم‌داده نصر تهران</span><a href="/resume/">سایر مسئولیت‌ها و سوابق ←</a></div>
      <div class="actions"><a class="button primary" href="/articles/">خواندن نوشته‌ها</a><a class="button ghost" href="/resume/">رزومه و سوابق</a></div>
    </div>
    <figure class="portrait-card">
      <img src="/images/profile/mehran-ziabary-formal.png" alt="پرتره رسمی مهران ضیابری" />
      <figcaption><b>بیش از ۲۰ سال تجربه</b><span>از الکترونیک و رباتیک تا امنیت شبکه و هوش مصنوعی</span></figcaption>
    </figure>
  </section>

  <section class="statement-section"><div class="wrap statement-grid"><p class="section-no">۰۱ / اندیشه</p><div><blockquote>فناوری وقتی جدی می‌شود که بتوان درباره مالکیت، مسئولیت، معماری و پیامدهای تصمیم‌هایش حرف زد؛ نه فقط درباره دموهای جذابش.</blockquote><a class="text-link" href="/thought/">جهت‌گیری فکری من ←</a></div></div></section>

  <section class="wrap section">
    <div class="section-head"><div><p class="eyebrow">تازه‌ترین نوشته‌ها</p><h2>یادداشت و تحلیل</h2></div><a class="text-link" href="/articles/">آرشیو همه نوشته‌ها ←</a></div>
    <div class="article-grid">{#each featured as article, index}<ArticleCard {article} featured={index === 0} />{/each}</div>
  </section>

  <section class="topics-band"><div class="wrap"><div class="section-head"><div><p class="eyebrow">جغرافیای موضوعات</p><h2>از سیاست‌گذاری تا پشت صحنهٔ فنی</h2></div></div><div class="topic-grid"><a href="/articles/"><b>حکمرانی هوش مصنوعی</b><span>حق تصمیم، مسئولیت و تنظیم‌گری</span><i>نوشته‌ها</i></a><a href="/guides/"><b>معماری و امنیت</b><span>RAG، عامل‌ها، زیرساخت و ZTAI</span><i>راهنماها</i></a><a href="/articles/"><b>سرمایه‌گذاری فناوری</b><span>ارزیابی مسئله، محصول و ظرفیت اجرا</span><i>تحلیل‌ها</i></a><a href="/thought/"><b>فناوری و جامعه</b><span>نگاهی سیستمی به اثر فناوری</span><i>صفحه اندیشه</i></a></div></div></section>

  <section class="wrap section teaching-preview">
    <div class="course-visual"><span>۱۱۴</span><small>اسلاید</small><div class="course-lines"></div></div>
    <div><p class="eyebrow">اسلایدها و دوره‌ها</p><h2>{courses[0].title}</h2><p>{courses[0].summary}</p><div class="metrics"><span><b>۱۶</b> ساعت</span><span><b>۶</b> بخش</span><span><b>DBA</b> مدیران</span></div><a class="button primary" href="/slides/{courses[0].slug}/">مشاهده و دریافت اسلایدها</a></div>
  </section>

  <section class="media-strip"><div class="wrap"><div class="section-head"><div><p class="eyebrow">رسانه</p><h2>گفت‌وگوها و مطالب منتشرشده</h2></div><a class="text-link" href="/media/">همه موارد ←</a></div><div class="media-row">{#each mediaItems.slice(0, 3) as item}<a href={item.url} target="_blank" rel="noreferrer"><small>{item.source} · {item.kind}</small><b>{item.title}</b><span>{item.summary}</span></a>{/each}</div></div></section>
</main>
