export type MediaItem = {
  title: string;
  source: string;
  kind: string;
  summary: string;
  url: string;
  date: string;
  faDate: string;
};

export type VideoItem = MediaItem & {
  thumbnail?: string;
  icon: string;
};

export const mediaSources: Record<string, { logo: string }> = {
  'پیوست': { logo: 'https://peivast.com/wp-content/uploads/logo-1.png' },
  'تسنیم': { logo: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tasnim_News_Agency_logo_2color_rounded_square.png' },
  'دیجیاتو': { logo: 'https://digiato.com/wp-content/themes/digiato/assets/img/svg/mini-logo.svg' },
  'همشهری': { logo: 'https://www.hamshahrionline.ir/resources/theme/hamshahri/img/nastooh-logo.png' },
  'خبرگزاری فارس': { logo: 'https://farsnews.ir/asset/logo-default.4c94f33.png' }
};

// Reports, interviews and other coverage about or quoting Mehran. Authored
// pieces live in article frontmatter and are merged into the media page there.
export const mediaItems: MediaItem[] = [
  { title: 'بخش خصوصی در همه مراحل تدوین طرح ملی هوش مصنوعی نقش داشت', source: 'خبرگزاری صداوسیما', kind: 'گفت‌وگو', summary: 'گفت‌وگویی تفصیلی درباره جایگاه بخش خصوصی در شورای راهبری، تعدد متولیان، حکمرانی داده، زیرساخت و تفاوت سکوی عمومی با سکوهای صنعتی هوش مصنوعی.', url: 'https://www.irib-news.ir/fa/news/5615625/', date: '2025-11-03', faDate: '۱۲ آبان ۱۴۰۴' },
  { title: 'انتقاد نصر تهران از رویکرد انحصاری معاونت علمی در هوش مصنوعی', source: 'تسنیم', kind: 'گفت‌وگو', summary: 'گفت‌وگویی درباره پروانه اپراتور هوش مصنوعی، سکوی ملی، نقش بخش خصوصی و فاصله میان تولید علم و تجاری‌سازی هوش مصنوعی در ایران.', url: 'https://www.tasnimnews.ir/fa/news/1405/05/06/3657874/', date: '2026-07-28', faDate: '۶ مرداد ۱۴۰۵' },
  { title: 'هوش مصنوعی‌های ایرانی باز هم در آزمون اینترنت ملی مردود شدند', source: 'پیوست', kind: 'گزارش', summary: 'گزارشی از وابستگی سرویس‌های هوش مصنوعی ایرانی به زیرساخت‌های خارجی، همراه با تحلیل مهران ضیابری از وضعیت بازار.', url: 'https://peivast.com/p/253197', date: '2026-01-28', faDate: '۸ بهمن ۱۴۰۴' },
  { title: 'هوش مصنوعی تا ۳۰ درصد هزینه حفاری معدن را کاهش می‌دهد', source: 'پیوست', kind: 'گزارش', summary: 'گزارشی از کاربرد هوش مصنوعی در حفاری و اکتشاف معدن و نقش هکاتون‌های تخصصی در پیوند فناوری با مسئله‌های واقعی صنعت.', url: 'https://peivast.com/p/251486', date: '2025-12-29', faDate: '۸ دی ۱۴۰۴' },
  { title: 'هوش مصنوعی؛ فرصت یک دهه آینده ایران یا تهدید عقب‌ماندگی استراتژیک', source: 'پیوست', kind: 'گزارش', summary: 'بررسی فاصله ایران با کشورهای پیشرو، نقش نهاد ملی پاسخگو و لزوم تغییر نگاه سیاست‌گذاران به هوش مصنوعی.', url: 'https://peivast.com/p/248326', date: '2025-11-19', faDate: '۲۸ آبان ۱۴۰۴' },
  { title: 'بلاتکلیفی حکمرانی هوش مصنوعی میان سازمان، شورا و ستاد', source: 'ایسنا', kind: 'گفت‌وگو', summary: 'تشریح تفاوت جایگاه حقوقی ستاد، شورای راهبری و سازمان ملی هوش مصنوعی و اینکه چرا حکمرانی این حوزه به نهادی قانونی، پاسخ‌گو و قابل استناد نیاز دارد.', url: 'https://www.isna.ir/news/1404072918478/', date: '2025-10-21', faDate: '۲۹ مهر ۱۴۰۴' },
  { title: 'همکاری شرکت‌های هوش مصنوعی و صنایع تخصصی، کلید پروژه‌های کاربردی', source: 'ایسنا', kind: 'سخنرانی', summary: 'روایت کامل‌تر نشست آب، انرژی و امداد و نجات؛ از لزوم همکاری میان‌بخشی تا مشارکت تضامنی، مسئولیت مشترک و توزیع حقوق مالکیت معنوی در قراردادهای هوش مصنوعی.', url: 'https://www.isna.ir/news/1404072817946/', date: '2025-10-20', faDate: '۲۸ مهر ۱۴۰۴' },
  { title: 'نقش بخش خصوصی در سیاست‌های هوش مصنوعی معاونت علمی چیست؟', source: 'پیوست', kind: 'گزارش', summary: 'گزارشی از مشارکت بخش خصوصی در سیاست‌های هوش مصنوعی، محدودیت زیرساخت‌ها و الزام بازنگری مستمر سند ملی.', url: 'https://peivast.com/p/241584', date: '2025-10-01', faDate: '۹ مهر ۱۴۰۴' },
  { title: 'آیا سکوی ملی هوش مصنوعی فقط یک نمایش دولتی است؟', source: 'پیوست', kind: 'گزارش', summary: 'بررسی نقاط ابهام سکوی ملی، از کمبود GPU و معماری زیرساخت تا ظرفیت تولید داخلی و حکمرانی داده.', url: 'https://peivast.com/p/243321', date: '2025-09-29', faDate: '۷ مهر ۱۴۰۴' },
  { title: 'باید هوش مصنوعی را برای مردم معنا کنیم', source: 'خبرگزاری مهر', kind: 'سخنرانی', summary: 'تأکید بر اینکه نهادینه‌شدن هوش مصنوعی فقط با داوری علمی و جوایز تخصصی ممکن نیست و به پیوست فرهنگی، اعتبار مردمی و آشناکردن جامعه با واقعیت‌های این فناوری نیاز دارد.', url: 'https://www.mehrnews.com/news/6549744/', date: '2025-08-03', faDate: '۱۲ مرداد ۱۴۰۴' },
  { title: 'اولین صندوق تخصصی هوش مصنوعی کشور تشکیل می‌شود', source: 'خبرگزاری فارس', kind: 'نشست', summary: 'گزارش نشست فعالان هوش مصنوعی با معاونت علمی؛ همراه با پیشنهادهای مهران ضیابری درباره میزها و هاب‌های هوش مصنوعی صنعتی، مانع‌زدایی از امنیتی‌سازی داده و رویکرد صنعت‌محور.', url: 'https://farsnews.ir/Razieh_Belali/1748675186535766082', date: '2025-05-31', faDate: '۱۰ خرداد ۱۴۰۴' },
  { title: 'تأمین زیرساخت از مهم‌ترین اولویت‌های توسعه هوش مصنوعی است', source: 'پیوست', kind: 'خبر', summary: 'گزارشی از تفاهم نصر و سازمان ملی هوش مصنوعی و اولویت تأمین زیرساخت برای توسعه کاربردی این فناوری.', url: 'https://peivast.com/p/215394', date: '2024-11-26', faDate: '۶ آذر ۱۴۰۳' },
  { title: 'کار و زندگی مهران ضیابری، موسس ترگمان؛ هوش مصنوعی در برابر هوش تجاری', source: 'پیوست', kind: 'پرونده', summary: 'روایتی بلند از زندگی و مسیر حرفه‌ای؛ از الکترونیک و شبکه تا شکل‌گیری ترگمان و فعالیت در هوش مصنوعی.', url: 'https://peivast.com/p/209982', date: '2024-09-30', faDate: '۹ مهر ۱۴۰۳' },
  { title: 'نسخه صوتی مروری بر ماهنامه پیوست شماره ۱۲۷', source: 'پیوست', kind: 'صوت', summary: 'مرور صوتی ماهنامه‌ای که پرونده «کار و زندگی مهران ضیابری» نیز در آن منتشر شده است.', url: 'https://peivast.com/p/213184', date: '2024-09-26', faDate: '۵ مهر ۱۴۰۳' },
  { title: 'آیا سند ملی هوش مصنوعی منطبق با شرایط ایران است؟', source: 'پیوست', kind: 'گزارش', summary: 'گزارشی از نقدهای فعالان و کارشناسان، از جمله مهران ضیابری، به اجرایی‌بودن، هدف‌گذاری و متولی سند ملی هوش مصنوعی.', url: 'https://peivast.com/p/205334', date: '2024-08-12', faDate: '۲۲ مرداد ۱۴۰۳' },
  { title: 'غلط‌نویسی به کتاب‌ها و مطبوعات نیز تسری کرده است', source: 'ایبنا', kind: 'سخنرانی', summary: 'گزارش نشست «تقابل و تعامل هوش مصنوعی با خط و زبان فارسی»؛ از نبود متن مرجع پاک و شتاب زبان‌سازی نسل Z تا تأثیر کیفیت دادگان فارسی بر مدل‌های هوش مصنوعی.', url: 'https://www.ibna.ir/news/503093/', date: '2023-12-22', faDate: '۱ دی ۱۴۰۲' },
  { title: 'دسترسی نداشتن به داده فارسی، چالش اصلی توسعه هوش مصنوعی در ایران', source: 'پیوست', kind: 'گزارش', summary: 'بررسی محدودیت دسترسی به داده‌های فارسی، زیرساخت، چارچوب حقوقی و نگهداشت نیروی انسانی برای توسعه هوش مصنوعی مولد.', url: 'https://peivast.com/p/203368', date: '2024-07-23', faDate: '۲ مرداد ۱۴۰۳' },
  { title: 'سکوی هوش مصنوعی؛ صنعتی و نه دانشگاهی', source: 'خبرگزاری فارس', kind: 'گزارش', summary: 'بازتاب دیدگاه مهران ضیابری درباره ماهیت مهندسی سکوی هوش مصنوعی و ضرورت سپردن توسعه و بهره‌برداری آن به بخش خصوصی.', url: 'https://farsnews.ir/Razieh_Belali/1742305002984869277', date: '2025-03-18', faDate: '۲۸ اسفند ۱۴۰۳' },
  { title: 'ابرانسان‌ها در انتظار دستورالعمل برای ظاهر شدن!', source: 'پیوست', kind: 'پرونده', summary: 'پرونده‌ای درباره سندها و سیاست‌های توسعه هوش مصنوعی با دیدگاه چند فعال و متخصص این حوزه.', url: 'https://peivast.com/p/195810', date: '2024-04-28', faDate: '۹ اردیبهشت ۱۴۰۳' },
  { title: 'کاهش فروش ۷۰ درصدی سرویس ترجمیار پس از اختلال در اینترنت', source: 'پیوست', kind: 'گفت‌وگو', summary: 'گفت‌وگویی درباره اثر اختلال‌های اینترنت بر فروش ترجمیار، کیفیت سرویس ترگمان و دسترسی به زیرساخت‌های مورد نیاز.', url: 'https://peivast.com/p/145981', date: '2022-11-05', faDate: '۱۴ آبان ۱۴۰۱' },
  { title: 'بخش خصوصی برای پیشبرد پروژه شبکه ملی اطلاعات تعامل جدیدی را با حاکمیت شکل دهد', source: 'پیوست', kind: 'نشست', summary: 'گزارش نشستی از فعالان بخش خصوصی درباره مسیر شبکه ملی اطلاعات، نقش حاکمیت و نحوه مشارکت صنف.', url: 'https://peivast.com/p/114170', date: '2021-10-21', faDate: '۲۹ مهر ۱۴۰۰' },
  { title: 'آیا مترجم گوگل از مترجم ترگمان استفاده می‌کند؟', source: 'پیوست', kind: 'گفت‌وگو', summary: 'روایت تیم ترگمان و توضیح مهران ضیابری درباره تکرار خطاهای اختصاصی ترگمان در خروجی مترجم گوگل.', url: 'https://peivast.com/p/113320', date: '2021-10-09', faDate: '۱۷ مهر ۱۴۰۰' },
  { title: 'نباید طرح صیانت از حقوق کاربران مشمول اصل ۸۵ شود', source: 'پیوست', kind: 'نشست', summary: 'گزارش نشست فعالان فناوری درباره طرح صیانت، رسیدگی غیرعلنی ذیل اصل ۸۵ و پیامدهای آن برای کسب‌وکارها و کاربران.', url: 'https://peivast.com/p/105349', date: '2021-07-01', faDate: '۱۰ تیر ۱۴۰۰' },
  { title: 'واژه به واژه تا ملاقات ترجمه', source: 'پیوست', kind: 'کسب‌وکار', summary: 'روایتی از شرکت ترگمان، مسیر شکل‌گیری آن و تلاش تیم برای ساخت موتور ترجمه ماشینی فارسی.', url: 'https://peivast.com/p/59954', date: '2019-12-18', faDate: '۲۷ آذر ۱۳۹۸' }
];

// Long-form recordings and selected clips. Duplicate mirrors and social
// reposts are deliberately omitted in favour of the most complete source.
export const videoItems: VideoItem[] = [
  { title: 'هوش مصنوعی ایران برای اولین بار طلایی شد', source: 'همشهری', kind: 'ویدئو', summary: 'گفت‌وگو درباره نخستین مدال طلای ایران در المپیاد جهانی هوش مصنوعی و دستاورد تیم ملی در سومین دوره رقابت‌ها.', url: 'https://www.hamshahrionline.ir/news/1059157/', date: '2026-08-08', faDate: '۱۷ مرداد ۱۴۰۵', icon: 'fa-solid fa-play' },
  { title: 'ورق ترجمه؛ از دوره ذبیح‌الله منصوری تا هوش مصنوعی', source: 'رادیو تهران', kind: 'صوت', summary: 'بحث برنامه «چراغ» درباره مسیر ترجمه، تغییر نقش مترجم و اثر هوش مصنوعی بر آینده زبان و صنعت ترجمه.', url: 'http://radiotehran.ir/videodetails/?m=100009&n=1568869', date: '2025-11-22', faDate: '۱ آذر ۱۴۰۴', icon: 'fa-solid fa-headphones' },
  { title: 'صداوسیما به سمت هوشمندسازی رسانه با داده‌های ملی حرکت می‌کند', source: 'رادیو تهران', kind: 'صوت', summary: 'گفت‌وگوی برنامه «چراغ» درباره داده‌های رسانه ملی، اجرانشدن کامل قانون مدیریت داده‌ها و ضرورت زیرساخت پردازشی و مهندسی کاربردی.', url: 'http://radiotehran.ir/videodetails/?m=100009&n=1555741', date: '2025-10-16', faDate: '۲۴ مهر ۱۴۰۴', icon: 'fa-solid fa-headphones' },
  { title: 'گفت‌وگو درباره مانع داده و کاربردی‌سازی هوش مصنوعی', source: 'آینو', kind: 'ویدئوی کوتاه', summary: 'گفت‌وگویی کوتاه درباره کمبود داده‌های متمرکز، نقش فرهنگ‌سازی کمیسیون و مسیر اتصال هوش مصنوعی به مسئله‌های صنعت و کشاورزی.', url: 'https://www.instagram.com/reel/DPqqXOVDbD1/', date: '2025-10-11', faDate: '۱۹ مهر ۱۴۰۴', icon: 'fa-brands fa-instagram' },
  { title: 'زیرساخت هوش مصنوعی در ایران؛ از سند ملی تا واقعیت کمبودها', source: 'پادکست دی‌باگر', kind: 'ویدئو پادکست', summary: 'گفت‌وگویی یک‌ساعته درباره فاصله سند ملی با واقعیت، کمبود برق و اینترنت، زیرساخت GPU، سکوی ملی و راه جبران عقب‌ماندگی ایران.', url: 'https://www.youtube.com/watch?v=wOwhJSIr-2E', date: '2025-09-28', faDate: '۶ مهر ۱۴۰۴', thumbnail: 'https://i.ytimg.com/vi/wOwhJSIr-2E/hqdefault.jpg', icon: 'fa-brands fa-youtube' },
  { title: 'تجاری‌سازی هوش مصنوعی و ارائه خدمات به‌صورت سرویس ابری', source: 'الکامپ', kind: 'سخنرانی', summary: 'سخنرانی تخصصی در الکامپ درباره مدل سرویس ابری، مسیر تجاری‌سازی و پیش‌نیازهای تبدیل فناوری هوش مصنوعی به خدمتی قابل ارائه.', url: 'https://www.youtube.com/watch?v=Squ-9odTru4', date: '2025-09-25', faDate: '۳ مهر ۱۴۰۴', thumbnail: 'https://i.ytimg.com/vi/Squ-9odTru4/hqdefault.jpg', icon: 'fa-brands fa-youtube' },
  { title: 'جنگ بی‌صدا؛ نبرد هوش مصنوعی علیه هوش مصنوعی', source: 'رادیو تهران', kind: 'صوت', summary: 'بحث برنامه «چراغ» درباره حمله‌های هوشمند، تقابل مدل‌ها و اینکه هوش مصنوعی چگونه هم‌زمان ابزار حمله و دفاع در محیط‌های متخاصم می‌شود.', url: 'http://radiotehran.ir/videodetails/?m=100009&n=1538073', date: '2025-08-31', faDate: '۹ شهریور ۱۴۰۴', icon: 'fa-solid fa-headphones' },
  { title: 'هوش مصنوعی، تعصب الگوریتم‌ها و تبعیض پنهان', source: 'رادیو تهران', kind: 'صوت', summary: 'گفت‌وگوی برنامه «چراغ» درباره سوگیری الگوریتمی، تبعیض دیجیتال و مسئولیت طراحان و بهره‌برداران در برابر آسیب‌های پنهان سامانه‌های هوشمند.', url: 'http://radiotehran.ir/videodetails/?m=100009&n=1530170', date: '2025-08-03', faDate: '۱۲ مرداد ۱۴۰۴', icon: 'fa-solid fa-headphones' },
  { title: 'ربات‌های انسان‌نما و انقلاب‌های صنعتی', source: 'رادیو تهران', kind: 'صوت', summary: 'گفت‌وگو درباره جایگاه ربات‌های انسان‌نما در زنجیره تحولات صنعتی، تفاوت نمایش فناورانه با کاربرد و آینده تعامل انسان و ماشین.', url: 'http://radiotehran.ir/videodetails/?m=100009&n=1526117', date: '2025-07-21', faDate: '۳۰ تیر ۱۴۰۴', icon: 'fa-solid fa-headphones' },
  { title: 'حکومت داده‌ها دست کیست؟', source: 'برنامه چراغ', kind: 'ویدئوی کوتاه', summary: 'بحثی درباره مالکیت، دسترسی و حکمرانی داده؛ با حضور مهران ضیابری و محمد غلامی در برنامه «چراغ» رادیو تهران.', url: 'https://www.instagram.com/reel/DL9Aa3EItyJ/', date: '2025-07-15', faDate: 'تیر ۱۴۰۴', icon: 'fa-brands fa-instagram' },
  { title: 'آینده هوش مصنوعی', source: 'فیوتاک', kind: 'گفت‌وگوی ویدئویی', summary: 'گفت‌وگوی ۵۲ دقیقه‌ای دکتر مهدی محمدی با مهران ضیابری درباره آینده هوش مصنوعی، تجاری‌سازی، دغدغه‌های ملی و تجربه ساخت ترگمان.', url: 'https://www.youtube.com/watch?v=HO7Cawjkog8', date: '2024-12-24', faDate: '۴ دی ۱۴۰۳', thumbnail: 'https://i.ytimg.com/vi/HO7Cawjkog8/hqdefault.jpg', icon: 'fa-brands fa-youtube' },
  { title: 'هوش مصنوعی چه مشاغلی را از بین می‌برد؟', source: 'کارگاه', kind: 'پادکست', summary: 'گفت‌وگوی ۸۶ دقیقه‌ای درباره آینده کار، مشاغل در معرض تغییر و مرز میان جایگزینی انسان و تغییر شکل مهارت‌ها پس از همه‌گیرشدن ChatGPT.', url: 'https://shows.acast.com/kargah/episodes/639cd492f6e39d00116bb8cd', date: '2022-12-17', faDate: '۲۶ آذر ۱۴۰۱', icon: 'fa-solid fa-podcast' }
];

export const courses = [
  {
    slug: 'enterprise-ai-governance-dba',
    title: 'حکمرانی هوش مصنوعی سازمانی',
    meta: 'دوره DBA · ۱۶ ساعت · ۱۴۰۵',
    summary: 'تبدیل پروژه هوش مصنوعی به قابلیت سازمانی؛ از حق تصمیم و صورت‌بندی مسئله تا معماری، امنیت، قرارداد و پذیرش.',
    slides: '۱۱۴ اسلاید',
    modules: [
      'مدل عملیاتی حکمرانی و حق تصمیم',
      'مرز قلمرو حکمرانی و AI-washing',
      'حکمرانی مسئله و سبد سرمایه‌گذاری',
      'معماری، داده و تأمین‌کننده',
      'امنیت، مسئولیت و نظارت انسانی',
      'قرارداد، پذیرش و ارزیابی پروژه'
    ]
  },
  {
    slug: 'behind-ai',
    title: 'پشت صحنه هوش مصنوعی برای مدیران',
    meta: 'کارگاه یک‌روزه · محتوای موقت',
    summary: 'مروری فشرده بر داده، مدل، زیرساخت، عملیات و محدودیت‌هایی که در یک دموی ساده دیده نمی‌شوند.',
    slides: 'در حال آماده‌سازی',
    modules: ['داده و کیفیت', 'مدل و بازیابی', 'زیرساخت و مقیاس', 'MLOps و پایش']
  },
  {
    slug: 'secure-organizational-assistant',
    title: 'طراحی دستیار هوشمند امن',
    meta: 'ارائه تخصصی · محتوای موقت',
    summary: 'از معماری RAG تا کنترل دسترسی در زمان اجرا و مدیریت رخدادهای امنیتی.',
    slides: 'نسخه اولیه',
    modules: ['سطح حمله', 'کنترل بازیابی', 'کنترل اجرا', 'شواهد و پاسخ‌گویی']
  }
];

export const socialLinks = [
  { label: 'X / Twitter', value: '@ziabary', url: 'https://x.com/ziabary', icon: 'fa-brands fa-twitter' },
  { label: 'LinkedIn', value: 'Mehran Ziabary', url: 'https://ir.linkedin.com/in/mehranziabary', icon: 'fa-brands fa-linkedin-in' },
  { label: 'GitHub', value: '@ziabary', url: 'https://github.com/ziabary', icon: 'fa-brands fa-github' },
  { label: 'Virgool', value: '@mehran.ziabary', url: 'https://virgool.io/@mehran.ziabary', icon: 'fa-solid fa-pen-nib' }
];

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  date: string;
  faDate: string;
  images: GalleryImage[];
};

const galleryEntries: GalleryItem[] = [
  {
    id: 'itrc-president-visit',
    title: 'ارایه گزارش به رئیس جمهوری',
    caption: 'بازدید رئیس جمهوری از مرکز تحقیقات فناوری اطلاعات و ارتباطات و ارائه گزارش درباره پروژه‌های هوش مصنوعی و دست‌آوردهای شبکه ملی اطلاعات.',
    date: '2023-05-17',
    faDate: '۲۷ اردیبهشت ۱۴۰۲',
    images: [
      {
        src: '/images/gallery/itrc-president.jpg',
        alt: 'بازدید رئیس جمهوری از مرکز تحقیقات فناوری اطلاعات و ارتباطات'
      }
    ]
  },
  {
    id: 'bonyad-ai-event',
    title: 'ارایه در نمایشگاه',
    caption: 'نمایشگاه و رویداد تجربه‌محور هوش مصنوعی در صنعت بنیاد مستضعفان؛ معرفی سکوی هوش مصنوعی امن دماوند و سخنرانی درباره کاربردهای صنعتی هوش مصنوعی.',
    date: '2024-01-30',
    faDate: '۱۰ بهمن ۱۴۰۲',
    images: [
      {
        src: '/images/gallery/bonyad-dehghan.jpeg',
        alt: 'بازدید سردار دکتر دهقان از غرفه ترگمان در نمایشگاه هوش مصنوعی بنیاد مستضعفان',
        caption: 'معرفی ویژگی‌های سکوی هوش مصنوعی امن دماوند در جریان بازدید دکتر حسین دهقان.'
      },
      {
        src: '/images/gallery/bonyad-1.jpeg',
        alt: 'سخنرانی درباره هوش مصنوعی در بنیاد مستضعفان',
        caption: 'سخنرانی تخصصی درباره هوش مصنوعی و کاربردهای آن در صنعت.'
      }
    ]
  },
  {
    id: 'imam-hossein-ai-governance',
    title: 'ارائه و سخنرانی تخصصی',
    caption: 'سخنرانی تخصصی درباره حکمرانی هوش مصنوعی در دانشگاه امام حسین.',
    date: '2025-01-08',
    faDate: '۱۹ دی ۱۴۰۳',
    images: [
      {
        src: '/images/gallery/imamhossein.jpg',
        alt: 'سخنرانی در حوزه حکمرانی هوش مصنوعی در دانشگاه امام حسین'
      }
    ]
  },
  {
    id: 'imidro-digital-transformation',
    title: 'ارائه و سخنرانی تخصصی',
    caption: 'ارایه سکوی هوش مصنوعی امن دماوند در همایش تحول دیجیتال معادن و صنایع معدنی.',
    date: '2025-02-26',
    faDate: '۸ اسفند ۱۴۰۳',
    images: [
      {
        src: '/images/gallery/imidro.jpg',
        alt: 'ارایه سکوی دماوند در همایش تحول دیجیتال معادن و صنایع معدنی'
      }
    ]
  },
  {
    id: 'filoger-ai-governance-panel',
    title: 'ارائه و سخنرانی تخصصی',
    caption: 'پنل «راهبرد ایران در عصر هوش مصنوعی از نگاه تصمیم‌گیران» در رویداد AI Summit 2025 دانشگاه تهران.',
    date: '2025-11-18',
    faDate: '۲۷ آبان ۱۴۰۴',
    images: [
      {
        src: '/images/gallery/filoger.jpeg',
        alt: 'پنل حکمرانی هوش مصنوعی در دانشگاه تهران'
      }
    ]
  }
];

// Gallery chronology is data-driven so new entries never need to be inserted
// at a particular array position. ISO dates make the ordering deterministic.
export const galleryItems = [...galleryEntries].sort((a, b) => b.date.localeCompare(a.date));
