<script lang="ts">
  import { imageAttributes } from '$lib/images';
  import resume from '$lib/resumes/fa.json';
  const { currentRoles, experience, publications, awards } = resume;
  import PageHero from '$lib/components/PageHero.svelte';








</script>

<svelte:head>
  <title>رزومه سید محمد محمدزاده ضیابری | مهران ضیابری</title>
  <meta name="description" content="رزومه سید محمد محمدزاده ضیابری، شناخته‌شده با نام مهران ضیابری؛ سوابق حرفه‌ای، تحصیلات، آثار و افتخارات." />
</svelte:head>

<main class="resume-page">
  <PageHero
    eyebrow="سوابق حرفه‌ای"
    title="رزومه"
    lead="نام کامل و رسمی من «سید محمد محمدزاده ضیابری» است و در فضای حرفه‌ای و رسانه‌ای با نام «مهران ضیابری» شناخته می‌شوم."
  />

  <section class="wrap resume-intro">
    <div class="resume-photo">
      <img {...imageAttributes('/images/profile/mehran-ziabary.jpg', '(min-width: 1200px) 740px, calc(100vw - 32px)')} alt="مهران ضیابری" />
    </div>
    <div>
      <p class="eyebrow">خلاصه حرفه‌ای</p>
      <h2>سید محمد محمدزاده ضیابری <span>«مهران ضیابری»</span></h2>
      <p>مدیر فناوری، کارآفرین و پژوهشگر هوش مصنوعی با تجربه در توسعهٔ فناوری و ساخت محصول؛ از الکترونیک دیجیتال، رباتیک و امنیت شبکه تا پردازش زبان طبیعی، ساخت محصول و حکمرانی هوش مصنوعی.</p>
      <div class="resume-contact">
        <a href="mailto:ziabary@targoman.com">ziabary@targoman.com</a>
        <a href="https://www.linkedin.com/in/mehranziabary" target="_blank" rel="noreferrer">LinkedIn ↗</a>
      </div>
      <a class="button primary" href="/downloads/seyed-mohammad-mohammadzadeh-ziabary-cv-fa.pdf" download>دریافت رزومه PDF</a>
    </div>
  </section>

  <section class="wrap resume-sections">
    <section>
      <div><p class="eyebrow">مسئولیت‌های فعلی</p><small class="section-hint">به‌روزرسانی: ۱۴۰۵</small></div>
      <div class="resume-rows">
        {#each currentRoles as item}
          <div><span>{item.organization}</span><b>{item.role}</b><small><strong>{item.period}</strong>{item.detail}</small></div>
        {/each}
      </div>
    </section>

    <section>
      <p class="eyebrow">سوابق پیشین</p>
      <div class="resume-rows">
        {#each experience as item}
          <div><span>{item.organization}</span><b>{item.role}</b><small>{item.period}</small></div>
        {/each}
      </div>
    </section>

    <section>
      <p class="eyebrow">تحصیلات</p>
      <div class="resume-rows education-rows">
        <div><span>۱۳۸۸ تا ۱۳۹۲</span><b>کارشناسی ارشد هوش مصنوعی</b><small><strong>دانشگاه صنعتی امیرکبیر</strong>پایان‌نامه: طراحی و توسعه مترجم ماشینی مبتنی بر شبیه‌سازی عملکرد مغز کودکان دوزبانه</small></div>
        <div><span>۱۳۷۶ تا ۱۳۸۸</span><b>کارشناسی مهندسی نرم‌افزار</b><small><strong>دانشگاه آزاد اسلامی واحد تهران مرکزی</strong>پایان‌نامه: طراحی و توسعه ابررایانه مبتنی بر استفاده از رایانه‌های از رده خارج</small></div>
      </div>
    </section>

    <section>
      <p class="eyebrow">حوزه‌های تخصصی</p>
      <div class="expertise-list">
        <span>هوش مصنوعی و پردازش زبان طبیعی</span><span>معماری سامانه‌های نرم‌افزاری</span>
        <span>حکمرانی داده و هوش مصنوعی</span><span>امنیت شبکه و داده</span>
        <span>الکترونیک دیجیتال و رباتیک</span><span>ارزیابی فنی سرمایه‌گذاری</span>
      </div>
    </section>

    <section>
      <p class="eyebrow">آثار و مقالات</p>
      <ol class="publication-list">
        {#each publications as publication, index}<li><span>{String(index + 1).padStart(2, '0')}</span><b dir="ltr">{publication}</b></li>{/each}
      </ol>
    </section>

    <section>
      <p class="eyebrow">افتخارات</p>
      <div class="award-grid">
        {#each awards as award}<div><b>{award[0]}</b><span>{award[1]}</span></div>{/each}
      </div>
    </section>

    <section>
      <p class="eyebrow">زبان‌ها</p>
      <div class="language-list">
        <span><b>فارسی</b> زبان مادری</span><span><b>انگلیسی</b> حرفه‌ای</span><span><b>اسپانیایی</b> حرفه‌ای</span>
        <span><b>ترکی استانبولی</b> پایه</span><span><b>ایتالیایی</b> پایه</span><span><b>عربی</b> پایه</span>
      </div>
    </section>
  </section>
</main>
