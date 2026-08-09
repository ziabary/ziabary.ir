<script lang="ts">
  import PageHero from '$lib/components/PageHero.svelte';

  const currentRoles = [
    {
      organization: 'هومص',
      role: 'معاون فنی',
      period: '۱۴۰۴ تاکنون',
      detail: 'شرکت تسهیلگران صادرات هوش مصنوعی صنعتی؛ سرمایه‌گذاری بر استارتاپ‌های هوش مصنوعی در صنعت و معدن'
    },
    {
      organization: 'پردازش هوشمند ترگمان',
      role: 'هم‌بنیان‌گذار و مدیرعامل',
      period: 'هم‌بنیان‌گذار از ۱۳۹۴؛ مدیرعامل از ۱۳۹۶ تاکنون',
      detail: 'سامانه‌های پردازش زبان طبیعی و زیرساخت‌های پردازش سریع هوش مصنوعی'
    },
    {
      organization: 'سازمان نظام صنفی استان تهران',
      role: 'رئیس کمیسیون هوش مصنوعی و علم‌داده',
      period: '۱۴۰۴ تاکنون',
      detail: 'رئیس کارگروه حکمرانی داده و زیرساخت‌های هوش مصنوعی از ۱۳۹۹ تاکنون'
    }
  ];

  const experience = [
    {
      organization: 'سازمان نظام صنفی استان تهران',
      role: 'نایب‌رئیس و دبیر کمیسیون هوش مصنوعی و علم‌داده',
      period: 'نایب‌رئیس ۱۴۰۳ تا ۱۴۰۴؛ دبیر ۱۳۹۷ تا ۱۴۰۳'
    },
    {
      organization: 'وزارت ارتباطات و فناوری اطلاعات',
      role: 'مشاور معاون وزیر',
      period: 'رصد و پایش شبکه ملی اطلاعات، ۱۴۰۰ تا ۱۴۰۲'
    },
    {
      organization: 'وزارت ارتباطات و فناوری اطلاعات',
      role: 'مشاور و مجری طرح آزادرسانی جویشگر',
      period: '۱۳۹۶ تا ۱۳۹۸'
    },
    {
      organization: 'دلتاگلوبال',
      role: 'مهندس ارشد، معاون فنی و مدیر فنی',
      period: 'مدیر فنی ۱۳۸۵ تا ۱۳۸۸؛ معاون فنی ۱۳۸۸ تا ۱۳۹۳؛ مهندس ارشد ۱۳۹۳ تا ۱۳۹۵'
    }
  ];

  const publications = [
    'Introducing E4MT and LMBNC: Persian pre-processing utilities, 2023',
    "HLMT: Human-Like Machine Translation Inspired by Bilinguals' Cortex Activity and Translation Behavior, 2015",
    'AUT Document Alignment Framework for BUCC Workshop Shared Task — 2015',
    'Developing an open-domain English-Farsi translation system using AFEC — 2012',
    'Semi-human instinctive artificial intelligence (SHI-AI) — 2006',
    'A Novel Approach to Semi-Human Instinctive Artificial Intelligence — 2005',
    "VBScript programmer's guide — 2002",
    'Inter-Function Communication (IFC) — 2001',
    'Design of a Cost Effective Supercomputer — 2001'
  ];

  const awards = [
    ['مقام چهارم مسابقات بین‌المللی روبوکاپ', 'IranOpen 2008 · قزوین · ۱۳۸۷'],
    ['مقام دوم مسابقات بین‌المللی روبوکاپ', 'RoboCup 2006 · برمن، آلمان · ۱۳۸۵'],
    ['مقام هشتم مسابقات بین‌المللی روبوکاپ', 'RoboCup 2005 · اوزاکا، ژاپن · ۱۳۸۴'],
    ['مقام اول مسابقات ربات‌های جنگجو', 'دانشگاه آزاد تهران مرکزی · ۱۳۸۳']
  ];
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
      <img src="/images/gallery/mehran-ziabary-headshot.jpg" alt="مهران ضیابری" />
    </div>
    <div>
      <p class="eyebrow">خلاصه حرفه‌ای</p>
      <h2>سید محمد محمدزاده ضیابری <span>«مهران ضیابری»</span></h2>
      <p>مدیر فناوری، کارآفرین و پژوهشگر هوش مصنوعی با بیش از ۲۰ سال تجربه؛ از الکترونیک دیجیتال، رباتیک و امنیت شبکه تا پردازش زبان طبیعی، ساخت محصول و حکمرانی هوش مصنوعی.</p>
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
