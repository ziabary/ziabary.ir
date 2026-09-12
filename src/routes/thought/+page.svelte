<script lang="ts">
  import { onMount } from "svelte";
  import PageHero from "$lib/components/PageHero.svelte";

  const navigation = [
    { id: "question", label: "پیش از ابزار، مسئله" },
    { id: "models", label: "مدل را باید بتوان عوض کرد" },
    { id: "knowing", label: "دانستن و امکان تردید" },
    { id: "freedom", label: "امکان انتخاب دوباره" },
    { id: "authority", label: "اختیار و مسئولیت" },
    { id: "making", label: "ساختن، محک اندیشه" },
  ];

  let activeSection = navigation[0].id;

  onMount(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".thought-chapter[id]"),
    );
    let ticking = false;

    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.34;
      let current = sections[0]?.id ?? navigation[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine)
          current = section.id;
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
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
    lead="این صفحه خلاصه‌ای از اصولی است که در سال‌ها ساختن، شکست‌خوردن، تغییر مسیر دادن و دوباره ساختن به آن‌ها رسیده‌ام. این اصول را پاسخ‌های نهایی نمی‌دانم؛ بیشتر معیارهایی‌اند که با آن‌ها تصمیم‌ها، باورها و مسیر خودم را می‌سنجم."
  />

  <section class="wrap thought-layout thought-layout--manifesto">
    <aside class="thought-navigation">
      <span>در یک نگاه</span>
      {#each navigation as item}
        <a
          href={`#${item.id}`}
          class:active={activeSection === item.id}
          aria-current={activeSection === item.id ? "location" : undefined}
          >{item.label}</a
        >
      {/each}
    </aside>

    <div class="thought-body thought-body--manifesto">
      <blockquote class="thought-opening">
        برای من، فناوری هرگز فقط مجموعه‌ای از ابزارها نبوده است. پشت هر انتخاب
        فنی، آشکار یا پنهان، نگاهی به مسئله، انسان، اختیار و مسئولیت وجود دارد.
        اگر این لایه دیده نشود، پیچیده‌ترین ابزارها هم ممکن است فقط ما را در
        پاسخ‌دادن به پرسشی اشتباه، سریع‌تر و دقیق‌تر کنند.
      </blockquote>

      <div class="thought-axes" aria-label="چهار محور این نگاه">
        <div><small>۰۱</small><b>مسئله</b><span>پیش از انتخاب ابزار</span></div>
        <div>
          <small>۰۲</small><b>واقعیت</b><span>پیش از وفاداری به مدل</span>
        </div>
        <div><small>۰۳</small><b>اختیار</b><span>همراه با مسئولیت</span></div>
        <div><small>۰۴</small><b>ساختن</b><span>پیش از ادعا</span></div>
      </div>

      <section id="question" class="thought-chapter">
        <header class="thought-chapter-head">
          <small>۰۱</small>
          <h2>از مسئله شروع می‌کنم، نه از ابزار</h2>
        </header>

        <p>
          سال‌ها کار در الکترونیک، رباتیک، امنیت شبکه و هوش مصنوعی به من آموخته
          است که فناوری‌ها عوض می‌شوند، اما یک خطا تقریباً همیشه تکرار می‌شود:
          پاسخ را زودتر از مسئله انتخاب می‌کنیم.
        </p>

        <p>
          معمولاً فناوری از جایی دیده می‌شود که پاسخ آماده شده است؛ محصول،
          سامانه، الگوریتم یا دستگاهی که کار می‌کند. اما تصمیم اصلی بسیار پیش‌تر
          گرفته شده، همان‌جا که مسئله صورت‌بندی شده است. این صورت‌بندی تعیین
          می‌کند چه چیزی دیده شود، چه چیزی نادیده بماند و کدام پاسخ اصلاً فرصت
          ظهور پیدا کند.
        </p>

        <p>
          گاهی حتی نام پروژه، پاسخ را از پیش تعیین کرده است: «پروژهٔ هوش
          مصنوعی»، «سامانهٔ بلاک‌چینی» یا هر عنوان جذاب دیگری که ابزار را پیش از
          مسئله روی میز می‌گذارد. از آن لحظه به بعد، به‌جای آنکه ابزار را برای
          مسئله انتخاب کنیم، مسئله‌ای پیدا می‌کنیم که ابزار انتخاب‌شده را توجیه
          کند.
        </p>

        <p>
          برای همین انتخاب ابزار را آخرین مرحلهٔ اندیشیدن به فناوری می‌دانم، نه
          نخستین مرحلهٔ آن.
        </p>

        <p class="thought-pull">
          وقتی پرسش اشتباه باشد، بهترین فناوری فقط پاسخ دقیق‌تری به پرسشی غلط
          می‌دهد.
        </p>
      </section>

      <section id="models" class="thought-chapter">
        <header class="thought-chapter-head">
          <small>۰۲</small>
          <h2>مدل را باید بتوان عوض کرد</h2>
        </header>

        <p>
          برای فهم جهان ناچار به ساختن مدل هستیم. این مدل‌ها ممکن است ریاضی،
          مفهومی، علّی یا سازمانی باشند. بدون مدل نمی‌توان پیچیدگی را مهار کرد،
          تصمیم گرفت یا چیزی ساخت.
        </p>

        <p>
          اما هیچ مدلی تمام واقعیت نیست؛ هر مدل چیزی را آشکار می‌کند و چیزهایی
          را کنار می‌گذارد.
        </p>

        <p>
          به مدل‌ها علاقه دارم، اما به هیچ مدلی وفاداری دائمی ندارم. مشکل از
          جایی آغاز می‌شود که فراموش کنیم مدل فقط یکی از راه‌های دیدن است و آن
          را جای حقیقت بنشانیم. موفقیت‌های گذشته این خطر را بیشتر می‌کنند؛ مدلی
          که چند بار درست پاسخ داده، آرام‌آرام از یک امکان به تنها امکان تبدیل
          می‌شود.
        </p>

        <p>
          این نگاه فقط دربارهٔ انتخاب الگوریتم یا فناوری نیست. هماهنگی را نیز با
          هم‌شکل‌کردن اشتباه نمی‌گیرم. زبان‌ها، حوزه‌ها، سازمان‌ها و حتی تیم‌ها
          لزوماً با یک نسخهٔ واحد بهتر نمی‌شوند. گاهی تفاوت، نقصی نیست که باید
          برطرف شود؛ بخشی از همان واقعیتی است که مدل باید توان دیدن و حفظ‌کردن
          آن را داشته باشد.
        </p>

        <p>
          یکپارچگی برای همکاری لازم است، اما یکسان‌سازی می‌تواند اطلاعات نهفته
          در تفاوت‌ها را از میان ببرد. مدل خوب باید به‌اندازه‌ای مشترک باشد که
          فهم و همکاری را ممکن کند و به‌اندازه‌ای انعطاف‌پذیر بماند که
          واقعیت‌های متفاوت را انکار نکند.
        </p>

        <p>
          در مسیر ترگمان زمانی رسید که ادامه‌دادن موتور آماری، با وجود
          قراردادها، برنامه‌ها و هزینه‌ای که برایش شده بود، دیگر قابل دفاع نبود.
          این برای من یک بحث نظری نبود؛ باید میان حفظ مسیری که برایش
          سرمایه‌گذاری کرده بودیم و پذیرفتن واقعیتی تازه انتخاب می‌کردیم. واقعیت
          فنی تغییر کرده بود و برنامه نیز باید تغییر می‌کرد.
        </p>

        <p class="thought-pull">هنر در عوض‌کردن مدل است، نه در پرستیدن آن.</p>
      </section>

      <section id="knowing" class="thought-chapter">
        <header class="thought-chapter-head">
          <small>۰۳</small>
          <h2>دانستن باید امکان تردید را حفظ کند</h2>
        </header>

        <p>تخصص برای من مسئله‌ای دووجهی است.
          از یک سو مسیرهای طولانی را کوتاه می‌کند، خطاهای تکراری را کاهش می‌دهد
          و امکان ساختن چیزهای پیچیده را فراهم می‌آورد. از سوی دیگر، همراه هر
          دانشی مجموعه‌ای از محدودیت‌های ذهنی نیز شکل می‌گیرد: این کار شدنی
          نیست، این مسئله قبلاً حل شده یا این‌گونه انجام نمی‌شود.

          بسیاری از این محدودیت‌ها زمانی درست بوده‌اند و دقیقاً به همین دلیل
          به‌سختی دوباره بررسی می‌شوند. شرایط تغییر می‌کند، اما ناممکن‌هایی که
          در ذهن متخصص ساخته شده‌اند ممکن است باقی بمانند.
        </p>

        <p>
          خودم را هم از این خطا مصون نمی‌دانم. هرچه تجربه بیشتر می‌شود، تشخیص
          مرز میان چیزی که می‌دانم و چیزی که فقط به آن عادت کرده‌ام دشوارتر
          می‌شود.

          تردید البته به معنای برابر دانستن همهٔ نظرها نیست. همهٔ ادعاها وزن
          یکسانی ندارند و نادانستن فضیلت نیست. تردید یعنی هیچ ادعایی، حتی ادعای
          یک متخصص، از توضیح، استدلال و مواجهه با شواهد معاف نباشد.
        </p>

        <p>
          مشکلم با متخصص نیست؛ با متخصص‌پرستی است. سخن مولای متقیان، <strong
            >«انظر الی ما قال، لا تنظر الی من قال»</strong
          >، برایم فقط یک توصیهٔ اخلاقی نیست؛ شرط زنده‌ماندن فکر است. اعتبار و
          سابقه می‌توانند دلیلی برای دقیق‌تر شنیدن یک سخن باشند، اما نباید جای
          دلیل را بگیرند.
        </p>

        <p>
          در یک گفت‌وگوی واقعی مهم نیست ایده نخست از کجا آمده است. مهم این است
          که پس از نقد و اصلاح، توضیح بهتر اکنون کجا ایستاده باشد. کنارگذاشتن یک
          باور شکست نیست؛ ناتوانی در کنارگذاشتن آن شکست است.
        </p>

                <p class="thought-pull">«انظر الی ما قال، لا تنظر الی من قال» <small>علی بن ابی‌طالب (علیه‌السلام)</small></p>

      </section>

      <section id="freedom" class="thought-chapter">
        <header class="thought-chapter-head">
          <small>۰۴</small>
          <h2>آزادی را در امکان انتخاب دوباره می‌بینم</h2>
        </header>

        <p>
          وابستگی فنی معمولاً ناگهانی شکل نمی‌گیرد. تصمیم‌های کوچک روی هم
          انباشته می‌شوند: انتخاب یک ابزار، یک تأمین‌کننده، یک قالب داده یا
          معماری‌ای که در ابتدا کاملاً منطقی به نظر می‌رسد. مدتی بعد هنوز روی
          کاغذ حق انتخاب داریم، اما هزینهٔ تغییر آن‌قدر بالا رفته است که راه
          دیگری عملاً باقی نمانده.
        </p>

        <p>
          من آزادی در فناوری را نبود ساختار نمی‌دانم. بدون ساختار، همکاری، مقیاس
          و استمرار ممکن نمی‌شود. مسئله زمانی پدید می‌آید که ساختار از وسیله‌ای
          برای همکاری به سازوکاری برای حذف امکان‌های دیگر تبدیل شود.
        </p>

        <p>
          ارزش متن‌باز نیز برایم صرفاً در رایگان‌بودن یا مشاهدهٔ کد نیست؛ اهمیت
          اصلی آن در حفظ امکان فهمیدن، تغییر‌دادن، رقابت و خروج است. البته
          بازبودن کد به‌تنهایی چنین آزادی‌ای را تضمین نمی‌کند. وابستگی می‌تواند
          در داده، زیرساخت، دانش فنی یا هزینهٔ مهاجرت دوباره ساخته شود.
        </p>

        <p>
          به همین دلیل هیچ‌وقت حمایت از فناوری داخلی را مترادف حذف رقیب
          ندانسته‌ام. در <a href="/articles/targoman-without-rent/">ترگمان</a> آگاهانه
          نخواستیم نمونهٔ خارجی محدود شود تا محصول داخلی دیده شود. اگر کاری ارزشمند
          است، باید بتواند در میدان انتخاب آزاد و با اتکا به کیفیت خودش بایستد.
        </p>

                        <p class="thought-pull">
                                  آزادی فنی برای من یعنی انتخاب امروز، حق انتخاب فردا را از میان نبرد.
                        </p>

      </section>

      <section id="authority" class="thought-chapter">
        <header class="thought-chapter-head">
          <small>۰۵</small>
          <h2>اختیار و مسئولیت باید کنار هم بمانند</h2>
        </header>

        <p>
          در امنیت، یک مجوز هیچ‌وقت فقط یک تنظیم فنی نیست. هر مجوز تعیین می‌کند
          چه کسی چه چیزی را ببیند، چه تغییری ایجاد کند و تا کجا بتواند بر دیگران
          یا بر کل سامانه اثر بگذارد.
        </p>

        <p>
          کار روی شبکه‌ها و سامانه‌های پیچیده به من نشان داده است که معماری،
          آشکار یا پنهان، اختیار را میان اجزای سیستم توزیع می‌کند. بعضی
          می‌توانند داده را ببینند، بعضی قواعد را تغییر دهند، بعضی تصمیمی را
          متوقف کنند و بعضی باید پاسخ‌گوی نتیجه باشند. اگر این نسبت درست طراحی
          نشده باشد، مشکل فقط یک آسیب‌پذیری فنی نیست؛ ساختار مسئولیت نیز از کار
          افتاده است.
        </p>

        <p>
          اصل حداقل دسترسی را به همین دلیل صرفاً یک قاعدهٔ امنیتی نمی‌بینم. هر
          فرد، خدمت یا عامل هوشمند باید به‌اندازهٔ مسئولیتی که بر عهده دارد
          اختیار داشته باشد؛ نه کمتر، تا مسئولیتش نمایشی نشود، و نه بیشتر، تا
          قدرتش بدون پاسخ‌گویی باقی نماند.
        </p>

        <p>
          نمی‌توان کسی را مسئول نتیجه دانست، اما امکان دیدن اطلاعات، فهمیدن
          تصمیم یا مداخله در آن را از او گرفت. به همان اندازه نیز نمی‌توان
          اختیار گسترده‌ای به یک مدیر، سامانه یا مدل هوش مصنوعی داد و هنگام بروز
          خطا، مسئولیت را میان اجزای سیستم گم کرد.
        </p>

        <p>
          از همین‌جا به این نتیجه رسیده‌ام که معماری را نمی‌توان از حکمرانی جدا
          کرد. حکمرانی چیزی نیست که پس از ساخته‌شدن سامانه با چند آیین‌نامه به
          آن اضافه شود؛ از لحظه‌ای آغاز می‌شود که حدود دسترسی، حق مداخله، امکان
          ثبت و مشاهده، مسیر اعتراض و شیوهٔ لغو اختیار را طراحی می‌کنیم.
        </p>

        <p>
          به دوگانه‌های ساده هم بدگمانم: داده یا باید کاملاً باز باشد یا کاملاً
          بسته؛ هوش مصنوعی یا باید آزاد باشد یا ممنوع؛ تصمیم یا باید با انسان
          باشد یا با ماشین. این دوگانه‌ها اغلب بیش از آنکه واقعیت را توضیح دهند،
          ضعف ما در طراحی را پنهان می‌کنند.
        </p>

        <p>
          راه دیگر الزاماً حد وسطی مبهم میان دو سوی مسئله نیست. می‌توان دسترسی
          به داده را محدود، مشروط، قابل‌مشاهده و قابل‌لغو کرد. می‌توان اختیار یک
          سامانهٔ هوشمند را با پیامد تصمیمش متناسب ساخت و مداخلهٔ انسان را
          دقیقاً جایی قرار داد که اثر واقعی داشته باشد.
        </p>

        <p>
          امنیتی که فقط با بستن همهٔ راه‌ها به دست آید، مسئله را حل نکرده است.
          آزادی‌ای هم که برای کارکردن ناچار به حذف همهٔ کنترل‌ها باشد، پایدار
          نمی‌ماند.
        </p>

        <p class="thought-pull">
          اختیار بدون مسئولیت خطرناک است؛ مسئولیت بدون اختیار، نمایشی است.
        </p>
      </section>

      <section id="making" class="thought-chapter">
        <header class="thought-chapter-head">
          <small>۰۶</small>
          <h2>ساختن، محک اندیشه است</h2>
        </header>

        <p>
          مسیر زندگی و کارم خط مستقیم و تمیزی نبوده است. از نرم‌افزار به
          الکترونیک، از رباتیک به امنیت شبکه و از آنجا به هوش مصنوعی رسیده‌ام.
        </p>

        <p>
          <a href="/articles/longest-bachelors-degree/"
            >دورهٔ کارشناسی‌ام یازده سال طول کشید</a
          >.
        </p>

        <p>
          این طولانی‌شدن‌ها و شکست‌ها را به‌خودی‌خود فضیلت نمی‌دانم و قصد ندارم
          آن‌ها را به روایتی قهرمانانه تبدیل کنم. اما بسیاری از چیزهایی که
          آموخته‌ام، نه در امتداد یک مسیر مرتب، بلکه هنگام توقف، اشتباه و
          ناچارشدن به تغییر مسیر شکل گرفته‌اند.
        </p>

        <p>
          فلسفه اگر هیچ‌گاه با محدودیت واقعی روبه‌رو نشود، ممکن است به بازی با
          واژه‌ها تبدیل شود؛ همان‌طور که فناوری بدون فلسفه می‌تواند به بازی با
          ابزارها تقلیل پیدا کند. ساختن جایی است که مدل‌های ذهنی در برابر ماده،
          زمان، هزینه، انسان و محیط آزموده می‌شوند.
        </p>

        <p>
          البته هر چیزی که کار می‌کند لزوماً درست، مفید یا اخلاقی نیست. یک
          سامانه ممکن است از نظر فنی موفق باشد، اما مسئله‌ای کم‌اهمیت را حل کند
          یا هزینهٔ تصمیم را بر دوش کسانی بگذارد که در آن نقشی نداشته‌اند. ساختن
          فقط امکان اجرا را نشان نمی‌دهد؛ فرض‌های پنهان و پیامدهای واقعی یک
          اندیشه را نیز آشکار می‌کند.
        </p>

        <p>
          در آموزش هم آنچه برایم اهمیت دارد نام ابزارها و دستورها نیست؛ این‌ها
          تغییر می‌کنند. آنچه ارزش انتقال دارد، توان شکستن مسئله، پیداکردن
          فرض‌های پنهان و بازتعریف پرسشی است که همه برای آن پاسخی آماده دارند.
        </p>
      </section>

      <div class="thought-coda">
        <p>
          برای من، آنچه این شش اصل را به هم پیوند می‌دهد، آمادگی برای بازبینی
          است. مسئله، مدل، تخصص، ساختار، اختیار و ساختن همگی برای فهمیدن و
          عمل‌کردن لازم‌اند؛ اما هیچ‌کدام نباید چنان با ما یکی شوند که تغییرشان
          در برابر واقعیت، شکست به نظر برسد.
        </p>

        <p>
          این‌ها پاسخ‌های نهایی من نیستند؛ معیارهایی‌اند که با آن‌ها سعی می‌کنم
          پاسخ‌های خودم را دوباره بررسی کنم.
        </p>

        <strong class="thought-final"
          >لازم نیست باورت را عوض کنی؛ فقط مطمئن شو هنوز می‌توانی آن را در برابر
          واقعیت عوض کنی.</strong
        >
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
    transition:
      color 0.2s,
      transform 0.2s;
  }

  .thought-navigation a::before {
    content: "";
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
    font-size: clamp(18px, 2.2vw, 28px);
    line-height: 1.95;
  }

  /* The opening used to carry a decorative guillemet that rendered as “A” with
     some cached font/CSS combinations. Keep the block deliberately typographic. */
  .thought-opening::before,
  .thought-opening::after {
    content: none !important;
    display: none !important;
  }

  .thought-axes {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    border-bottom: 1px solid var(--line);
    margin-bottom: 65px;
  }

  .thought-axes > div {
    display: grid;
    min-width: 0;
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

  .thought-coda > p {
    margin: 0 0 34px;
    color: #d0dfdd;
    font-size: 15px;
    line-height: 2.2;
  }

  .thought-coda .thought-final {
    display: block;
    margin: 0;
    padding-top: 28px;
    border-top: 1px solid rgba(142, 219, 213, 0.38);
    color: #fff;
    font-size: clamp(23px, 3vw, 33px);
    font-weight: 800;
    line-height: 1.85;
  }

  @media (max-width: 980px) {
    .thought-layout--manifesto {
      grid-template-columns: 180px minmax(0, 1fr);
      gap: 42px;
    }

    .thought-chapter > p,
    .thought-chapter > p.thought-pull {
      margin-inline: 48px;
    }

    .thought-axes {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .thought-axes > div:nth-child(odd) {
      border-inline-start: 0;
    }

    .thought-axes > div:nth-child(n + 3) {
      border-top: 1px solid var(--line);
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
