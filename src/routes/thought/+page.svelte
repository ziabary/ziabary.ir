<script lang="ts">
  import { onMount } from 'svelte';
  import PageHero from '$lib/components/PageHero.svelte';

  const navigation = [
    { id: 'question', label: 'پیش از ابزار، مسئله' },
    { id: 'models', label: 'مدل را باید بتوان عوض کرد' },
    { id: 'knowing', label: 'دانستن و امکان تردید' },
    { id: 'freedom', label: 'امکان انتخاب دوباره' },
    { id: 'making', label: 'ساختن، محک اندیشه' }
  ];

  let activeSection = navigation[0].id;

  onMount(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.thought-chapter[id]'));
    let ticking = false;

    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.34;
      let current = sections[0]?.id ?? navigation[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section.id;
        else break;
      }

      activeSection = current;
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  });
</script>

<svelte:head>
  <title>اندیشه | مهران ضیابری</title>
</svelte:head>

<main>
  <PageHero
    eyebrow="پیش از ابزار"
    title="اندیشه"
    lead="این صفحه خلاصه‌ای از اصولی است که در سال‌ها ساختن، شکست خوردن، تغییر مسیر دادن و دوباره ساختن به آن‌ها رسیده‌ام؛ نه مجموعه‌ای از پاسخ‌های قطعی."
  />

  <section class="wrap thought-layout thought-layout--manifesto">
    <aside class="thought-navigation">
      <span>در یک نگاه</span>
      {#each navigation as item}
        <a
          href={`#${item.id}`}
          class:active={activeSection === item.id}
          aria-current={activeSection === item.id ? 'location' : undefined}
        >{item.label}</a>
      {/each}
    </aside>


    <div class="thought-body thought-body--manifesto">
      <blockquote class="thought-opening">
        هر فناوری از یک فلسفه سرچشمه می‌گیرد؛ از نوع نگاه به مسئله، انسان، اختیار و مسئولیت. به‌کارگیری فناوری بدون شناخت این لایه‌های عمیق، هرقدر هم پیچیده و پرهزینه باشد، در نهایت چیزی بیش از سرگرمی با ابزارهای تازه نیست.
      </blockquote>

      <div class="thought-axes" aria-label="سه محور این نگاه">
        <div><small>۰۱</small><b>مسئله</b><span>پیش از انتخاب ابزار</span></div>
        <div><small>۰۲</small><b>واقعیت</b><span>پیش از وفاداری به مدل</span></div>
        <div><small>۰۳</small><b>ساختن</b><span>پیش از ادعا</span></div>
      </div>

      <section id="question" class="thought-chapter">
        <header class="thought-chapter-head"><small>۰۱</small><h2>از مسئله شروع می‌کنم، نه از ابزار</h2></header>
        <p>سال‌ها کار در الکترونیک، رباتیک، امنیت شبکه و هوش مصنوعی به من آموخته است که فناوری‌ها عوض می‌شوند، اما یک خطا تقریباً همیشه تکرار می‌شود: پاسخ را زودتر از مسئله انتخاب می‌کنیم.</p>
        <p>معمولاً فناوری از جایی دیده می‌شود که پاسخ آماده شده است؛ محصول، سامانه، الگوریتم یا دستگاهی که کار می‌کند. اما تصمیم اصلی بسیار پیش‌تر گرفته شده، همان‌جا که مسئله صورت‌بندی شده است. صورت‌بندی مسئله تعیین می‌کند چه چیزی دیده شود، چه چیزی نادیده بماند و کدام پاسخ اصلاً فرصت ظهور پیدا کند.</p>
        <p>معتقدم وقتی پرسش اشتباه باشد، بهترین فناوری فقط پاسخ دقیق‌تری به پرسشی غلط می‌دهد. برای همین انتخاب ابزار را آخرین مرحلهٔ اندیشیدن به فناوری می‌دانم، نه نخستین مرحلهٔ آن.</p>
      </section>

      <section id="models" class="thought-chapter">
        <header class="thought-chapter-head"><small>۰۲</small><h2>مدل را باید بتوان عوض کرد</h2></header>
        <p>برای فهم جهان ناچار به ساختن مدل هستیم؛ ابزار مدل‌سازی هم ریاضی است. بدون مدل نمی‌توان پیچیدگی را مهار کرد، تصمیم گرفت یا چیزی ساخت. اما هر مدل، هم‌زمان با آنکه بخشی از واقعیت را آشکار می‌کند، بخش‌های دیگری را کنار می‌گذارد.</p>
        <p>به مدل‌ها علاقه دارم، اما به هیچ مدلی وفاداری دائمی ندارم. باور دارم، مشکل از جایی آغاز می‌شود که فراموش کنیم مدل فقط یکی از راه‌های دیدن است و آن را جای حقیقت می‌نشانیم. موفقیت‌های گذشته این خطر را بیشتر می‌کنند؛ مدلی که چند بار درست پاسخ داده، آرام‌آرام از یک امکان به تنها امکان تبدیل می‌شود.</p>
        <p>این موضوع برایم یک بحث انتزاعی نیست. در مسیر ترگمان زمانی رسید که ادامه دادن موتور آماری، با وجود قرارداد، برنامه و هزینه‌ای که برایش شده بود، دیگر قابل دفاع نبود. واقعیت فنی تغییر کرده بود و برنامه نیز باید تغییر می‌کرد. اصرار بر پاسخ دیروز، به‌صرف آنکه برایش سرمایه‌گذاری کرده‌ایم، فضیلت نیست.</p>
        <p class="thought-pull">هنر در عوض کردن مدل است، نه در پرستیدن آن.</p>
      </section>

      <section id="knowing" class="thought-chapter">
        <header class="thought-chapter-head"><small>۰۳</small><h2>دانستن باید امکان تردید را حفظ کند</h2></header>
        <p>تخصص ارزشمند است. مسیرهای طولانی را کوتاه می‌کند، خطاهای تکراری را کاهش می‌دهد و امکان ساختن چیزهای پیچیده را فراهم می‌آورد. اما تخصص همراه با دانش، مجموعه‌ای از محدودیت‌های ذهنی هم می‌سازد: این کار شدنی نیست، این مسئله قبلاً حل شده یا این‌گونه انجام نمی‌شود.</p>
        <p>بسیاری از این محدودیت‌ها زمانی درست بوده‌اند و دقیقاً به همین دلیل به‌سختی دیده می‌شوند. نادانستن فضیلت نیست؛ همان‌طور که دانستن نیز تضمین دیدن نیست. ارزش تخصص زمانی حفظ می‌شود که متخصص بتواند به دانسته‌های خودش هم به چشم یک مدل موقت نگاه کند.</p>
        <p>مشکلم با متخصص نیست؛ مشکلم با متخصص‌پرستی است. معتقدم اعتبار یک ایده باید از استدلال، شواهد و توان توضیح‌دادن واقعیت بیاید، نه از نام و جایگاه گوینده. «انظر الی ما قال، لا تنظر الی من قال» برایم فقط یک توصیهٔ اخلاقی نیست؛ شرط زنده ماندن فکر است.</p>
        <p>در یک گفت‌وگوی واقعی، مهم نیست ایده نخست از کجا آمده یا چه کسی زودتر به آن رسیده است. مهم این است که پس از نقد، اصلاح و کنار گذاشتن بخش‌های نادرست، حقیقت اکنون کجا ایستاده است. کنار گذاشتن یک باور شکست نیست؛ ناتوانی در کنار گذاشتن آن شکست است.</p>
        <p>مولای متقیان می‌فرمایند: <strong>«انظر الی ما قال، لا تنظر الی من قال»</strong> </p> 
      </section>

      <section id="freedom" class="thought-chapter">
        <header class="thought-chapter-head"><small>۰۴</small><h2>آزادی را در امکان انتخاب می‌بینم</h2></header>
        <p>آزادی در فناوری به معنای نبود ساختار نیست. بدون ساختار، همکاری، مقیاس و استمرار ممکن نمی‌شود. مسئله زمانی پدید می‌آید که ساختار از وسیله به مرجع حقیقت تبدیل شود و راه‌های دیگر را پیش از آزموده‌شدن حذف کند.</p>
        <p>برای من، ارزش متن‌باز صرفاً در رایگان بودن یا دسترسی به کد نیست. اهمیت اصلی آن در حفظ امکان رقابت مدل‌هاست؛ اینکه یک پاسخ نتواند خود را به تنها پاسخ ممکن تبدیل کند و امکان انتخاب، حتی اگر امروز از آن استفاده نشود، همچنان باقی بماند.</p>
        <p>به همین دلیل هیچ‌وقت حمایت از فناوری داخلی را مترادف حذف رقیب ندانسته‌ام. در ترگمان آگاهانه نخواستیم نمونهٔ خارجی محدود شود تا محصول داخلی دیده شود. باور دارم اگر کاری ارزشمند است، باید بتواند در میدان انتخاب آزاد و با اتکا به کیفیت خودش بایستد.</p>
        <p class="thought-pull">مشکل با ساختار نیست؛ مشکل با مقدس‌شدن ساختار است.</p>
      </section>

      <section id="making" class="thought-chapter">
        <header class="thought-chapter-head"><small>۰۵</small><h2>ساختن، محک اندیشه است</h2></header>
        <p>مسیر زندگی و کارم خط مستقیم و تمیزی نبوده است. از نرم‌افزار به الکترونیک، از رباتیک به امنیت شبکه و از آنجا به هوش مصنوعی رسیده‌ام؛ حتی دورهٔ کارشناسی‌ام یازده سال طول کشید. معتقد نیستم طولانی‌شدن راه یا شکست‌خوردن به‌خودی‌خود فضیلت است، اما بسیاری از چیزهایی که آموخته‌ام در همین تغییر مسیرها شکل گرفته‌اند.</p>
        <p>فلسفه اگر هیچ‌گاه با محدودیت واقعی روبه‌رو نشود، ممکن است به بازی با واژه‌ها تبدیل شود؛ همان‌طور که فناوری بدون فلسفه می‌تواند به بازی با ابزارها تقلیل پیدا کند. ساختن جایی است که مدل‌های ذهنی در برابر ماده، زمان، هزینه، انسان و محیط آزموده می‌شوند.</p>
        <p>برای همین میان یک ایدهٔ زیبا و سامانه‌ای که باید فردا صبح کار کند تفاوت جدی می‌بینم. همین تفاوت دربارهٔ اخلاق هم وجود دارد. شفافیت، رقابت سالم یا مقابله با فساد تا زمانی که در شیوهٔ کار، کیفیت خروجی و پذیرش مسئولیت دیده نشوند، چیزی بیش از موضع‌گیری نیستند.</p>
        <p>در آموزش نیز آنچه ماندگار می‌ماند معمولاً نام ابزارها و دستورها نیست؛ ابزارها تغییر می‌کنند. آنچه ارزش انتقال دارد، توان شکستن مسئله، پیدا کردن فرض‌های پنهان و بازتعریف پرسشی است که همه برای آن پاسخی آماده دارند.</p>
      </section>

      <div class="thought-coda">
        <span>یک پرسش برای باز ماندن پنجره</span>
        <p>این نگاه قرار نیست به مکتب، قبیله یا پاسخ نهایی تبدیل شود؛ چون همان لحظه خودش به زندانی تازه بدل خواهد شد. هدف، نابود کردن مدل، ساختار یا تخصص نیست؛ فقط نباید فراموش کرد که هرکدام یکی از راه‌های دیدن‌اند، نه خود جهان.</p>
        <strong>آیا راه دیگری برای دیدن این مسئله وجود دارد؟</strong>
        <p class="thought-final">لازم نیست باورت را عوض کنی؛ فقط مطمئن شو هنوز می‌توانی عوضش کنی.</p>
      </div>
    </div>
  </section>
</main>

<style>
  .thought-layout--manifesto {
    grid-template-columns: 210px minmax(0, 780px);
    gap: 80px;
    align-items: start;
  }

  .thought-navigation {
    border-right: 0;
    border-inline-end: 1px solid var(--line);
    padding-right: 0;
    padding-inline-end: 22px;
  }

  .thought-navigation a {
    position: relative;
    transition: color 0.2s, transform 0.2s;
  }

  .thought-navigation a::before {
    content: '';
    position: absolute;
    inset-inline-end: -23px;
    top: 50%;
    width: 2px;
    height: 0;
    background: var(--teal);
    transform: translateY(-50%);
    transition: height 0.2s;
  }

  .thought-navigation a.active {
    color: var(--teal);
    font-weight: 700;
    transform: translateX(-4px);
  }

  .thought-navigation a.active::before {
    height: 22px;
  }

  .thought-body--manifesto {
    max-width: 780px;
  }

  .thought-opening {
    position: relative;
    margin: 0 0 44px;
    padding: 36px 0;
    border-block: 2px solid var(--ink);
    font-size: clamp(23px, 2.7vw, 33px);
    line-height: 1.95;
  }

  .thought-opening::before {
    content: '«';
    position: absolute;
    inset-inline-start: -44px;
    top: 20px;
    color: color-mix(in srgb, var(--teal) 35%, transparent);
    font-size: 78px;
    line-height: 1;
  }

  .thought-axes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid var(--line);
    margin-bottom: 65px;
  }

  .thought-axes > div {
    display: grid;
    gap: 3px;
    padding: 18px 20px 22px;
  }

  .thought-axes > div + div {
    border-inline-start: 1px solid var(--line);
  }

  .thought-axes small {
    font-size: 9px;
    color: var(--teal);
  }

  .thought-axes b {
    font-size: 17px;
    color: var(--ink);
  }

  .thought-axes span {
    font-size: 10px;
    color: var(--muted);
  }

  .thought-chapter {
    scroll-margin-top: 105px;
    position: relative;
    margin: 0;
    padding: 68px 0;
    border-top: 1px solid var(--line);
  }

  .thought-chapter-head {
    display: grid;
    grid-template-columns: 72px 1fr;
    align-items: start;
    margin-bottom: 26px;
  }

  .thought-chapter-head small {
    font-size: 38px;
    line-height: 1.15;
    color: color-mix(in srgb, var(--teal) 45%, var(--line));
  }

  .thought-chapter-head h2 {
    margin: 0;
    font-size: clamp(25px, 3vw, 34px);
    line-height: 1.55;
  }

  .thought-chapter > p {
    margin: 0 72px 17px 0;
    color: color-mix(in srgb, var(--ink) 78%, var(--muted));
    font-size: 14px;
    line-height: 2.25;
  }

  .thought-chapter > p.thought-pull {
    margin: 38px 72px 0 0;
    padding: 24px 28px;
    border-block: 1px solid var(--ink);
    color: var(--ink);
    font-size: 20px;
    font-weight: 800;
    line-height: 1.9;
  }

  .thought-coda {
    margin-top: 24px;
    padding: 52px 56px 48px;
    background: #0b343b;
    color: #eaf5f3;
    border-top: 5px solid #24b5ad;
  }

  .thought-coda > span {
    display: block;
    margin-bottom: 22px;
    color: #8edbd5;
    font-size: 11px;
    font-weight: 700;
  }

  .thought-coda > p:not(.thought-final) {
    margin: 0 0 36px;
    color: #d0dfdd;
    font-size: 14px;
    line-height: 2.2;
  }

  .thought-coda strong {
    display: block;
    margin-bottom: 34px;
    color: #fff;
    font-size: clamp(25px, 3.2vw, 36px);
    line-height: 1.75;
  }

  .thought-coda .thought-final {
    display: block;
    margin: 0;
    padding-top: 26px;
    border-top: 1px solid rgba(142, 219, 213, 0.38);
    color: #f3fbfa;
    font-size: clamp(17px, 2vw, 21px);
    font-weight: 800;
    line-height: 1.9;
  }

  @media (max-width: 980px) {
    .thought-layout--manifesto {
      grid-template-columns: 180px minmax(0, 1fr);
      gap: 42px;
    }

    .thought-opening::before {
      display: none;
    }

    .thought-chapter > p,
    .thought-chapter > p.thought-pull {
      margin-inline: 48px;
    }
  }

  @media (max-width: 680px) {
    .thought-layout--manifesto {
      display: block;
      padding-block: 45px;
    }

    .thought-navigation {
      display: none;
    }

    .thought-axes {
      grid-template-columns: 1fr;
    }

    .thought-axes > div + div {
      border-inline-start: 0;
      border-top: 1px solid var(--line);
    }

    .thought-opening {
      margin-bottom: 32px;
      padding: 28px 0;
    }

    .thought-chapter {
      padding: 50px 0;
    }

    .thought-chapter-head {
      grid-template-columns: 52px 1fr;
      margin-bottom: 20px;
    }

    .thought-chapter-head small {
      font-size: 29px;
    }

    .thought-chapter > p,
    .thought-chapter > p.thought-pull {
      margin-inline: 0;
    }

    .thought-chapter > p.thought-pull {
      padding: 20px 8px;
      font-size: 17px;
    }

    .thought-coda {
      padding: 38px 28px 34px;
    }
  }
</style>
