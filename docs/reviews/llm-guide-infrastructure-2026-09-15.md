# گزارش فنی زیرساخت راهنمای انتخاب و اجرای مدل‌های زبانی

تاریخ بازبینی: ۱۴۰۵/۰۶/۲۴ (2026-09-15)

## جمع‌بندی اجرایی

زیرساخت `/guides/llm/` در حالت پیش‌نویس پیاده شده است. ساختار نهایی هفت بخش اصلی و هشت جدول/ماتریس دارد؛ بخش چهارم دو زیرنمای مستقل «مقایسهٔ نرم‌افزارها» و «سازگاری مدل و پیکربندی اجرا» دارد. مخزن محتوایی عمداً خالی است و هیچ مدل، بنچمارک، قیمت، رتبه‌بندی یا بدنهٔ مقالهٔ واقعی ساخته نشده است.

مرحلهٔ تثبیت محدود بعدی نیز انجام شد: presetهای محدودکننده حذف شدند، ماتریس سخت‌افزار به ردیف منطقی چندسخت‌افزاری تبدیل شد، مشترک‌بودن backend به محور مقایسه وابسته شد، قرارداد `not-reviewed` اصلاح شد و مسیر canonical تا رابط پُر با fixture مرورگری آزموده شد. هفت بخش، هشت نما، پنج مسیر شروع و ۱۴ مقالهٔ برنامه‌ریزی‌شده بدون گسترش دامنه حفظ شده‌اند.

build کامل همچنان **BLOCKED** است. compile کل client/SSR موفق است، اما prerender به نخستین ارجاع دارایی واقعی غایب، `/slides/behind-ai-dba/cover.jpg`، با 404 می‌رسد. دو مجموعهٔ `static/slides/` و `static/images/gallery/` خارج Git هستند و منبع بازیابی read-only در checkout، شاخهٔ remote یا مستندات مخزن پیدا نشد. placeholder، حذف ارجاع، کاهش validation، deploy یا بازیابی از میزبان اجرا نشده است.

## ممیزی شش اصلاح مرحلهٔ تثبیت

| موضوع | رفتار پیشین و تشخیص | تغییر نهایی | آزمون یا شاهد | محدودیت باقی‌مانده |
| --- | --- | --- | --- | --- |
| ۱. مسیرهای شروع | اشکال در کد تأیید شد: `task-first` نوع مولد، `software-choice` نیاز API تیمی/نقش API server و `memory-constrained` فقط مسیرهای offload/layer-wise را فعال می‌کردند. | هر سه preset اکنون `selections: {}` دارند و فقط مقصد و راه شروع را توضیح می‌دهند. تغییر `config.id:presetId` تمام state فیلتر، جست‌وجو، sort، جزئیات و مقایسه را reset می‌کند؛ نمای بخش چهارم نیز با کلید view بازساخته می‌شود. | subtest «all three general start presets…» PASS؛ مرورگر برای هر سه مسیر صفر input فیلتر checked و «همهٔ ردیف‌ها» ثبت کرد، سپس یک فیلتر نرم‌افزار را فعال و بعد از رفتن به مسیر دیگر/بازگشت صفر فیلتر یافت. `show-drafts=true` در هر چهار URL باقی ماند. | preset کاربرد را از طرف کاربر حدس نمی‌زند؛ انتخاب کاربرد/نوع/کوانت عمداً با کنترل‌های موجود انجام می‌شود. |
| ۲. ماتریس سخت‌افزار | اشکال در adapter و گزارش تأیید شد: هر feasibility متصل به deployment سخت‌افزارمند، ردیف مستقل می‌ساخت و در نتیجه ماتریس عملاً تک‌خانه‌ای می‌شد. | ردیف با کلید صریح شرایط مؤثر مشترک ساخته می‌شود؛ hardware و deployment/result ID از کلید خارج‌اند. هر خانه `results[]` مستقل با deployment، status، تنظیمات، حافظه/دیسک، محدودیت و منبع خودش دارد؛ چند نتیجه overwrite یا میانگین نمی‌شوند. | fixture دو GPU را در یک ردیف با دو خانه پُر می‌سازد؛ خانهٔ RTX 3090 دو نتیجهٔ مستقل و خانهٔ RTX 4090 deployment/source خودش را دارد. deployment با روش offload ردیف جدا می‌سازد. فیلتر hardware، ترکیب hardware+method و انتخاب دو ردیف برای مقایسه PASS هستند. مرورگر نیز دو خانه، بازشدن جزئیات و شناسهٔ منبع همان خانه را تأیید کرد. | ردیف جمع‌شده یک مشاهدهٔ عددی ترکیبی تولید نمی‌کند؛ تحلیل نسبت/برتری همچنان به شرایط و شواهد کامل نیاز دارد. |
| ۳. backend و محور مقایسه | اشکال در policy تأیید شد: backend برای محور کلی product/release هم shared بود و مقایسهٔ خود موتورهای متفاوت را نامعتبر می‌کرد. | در نرم‌افزار، سازگاری و بنچمارک دو محور مستقل وجود دارد: `service-layer` با backend ثابت، و محور کل `software-stack`/`software` که stack و backend را متغیر می‌گیرد. سایر شرایط مؤثر همچنان shared هستند. | دو backend با hardware/workload مشترک در محور `software` معتبر و backend در differences است؛ همان دو ردیف در `service-layer` نامعتبرند. workload متفاوت `invalid` و workload نامعلوم `needs-more-data` می‌شود؛ side-by-side همچنان `display-only` و آزاد است. | انتخاب محور فقط تفاوت‌های نام‌برده را آزاد می‌کند؛ سازگاری محتوایی workload/metric هنوز به دادهٔ واقعی و review انسانی وابسته است. |
| ۴. بررسی‌نشده و شاهد | اشکال در validator و عبارت گزارش تأیید شد: الزام evidence به همهٔ capability/API statusها، ثبت بررسی‌نشدهٔ بی‌شاهد را هم رد می‌کرد. | فقط `supported`، `conditional` و `not-supported` بدون evidence رد می‌شوند. `not-reviewed` بدون evidence مجاز است. `not-applicable` مستقل است و `statusReason` اجباری دارد. نبود کل رکورد با Datum نامعلوم و متن خنثی نمایش داده می‌شود. | fixture دارای capability و API با `not-reviewed`/بدون evidence معتبر است؛ supported بدون evidence رد می‌شود؛ N/A بدون دلیل رد می‌شود؛ adapter نبود API record را «رکورد بررسی ثبت نشده؛ نتیجهٔ مثبت یا منفی ندارد» نمایش می‌دهد. | این تسهیل فقط برای نبود ادعای factual است؛ locator و evidence ادعاهای مثبت، مشروط و منفی همچنان اجباری‌اند. |
| ۵. آزمون رابط پُر | کمبود شاهد تأیید شد، نه الزاماً باگ UI: بررسی قبلی صفحهٔ production را با repository خالی می‌دید و مسیر canonical→adapter→کامپوننت را در مرورگر با ردیف پُر اثبات نمی‌کرد. | harness فقط‌آزمایشی، همان `LlmDataView` محصول را برای هر هشت config با خروجی `buildLlmViewRows(syntheticLlmRepository)` mount می‌کند. route عمومی ساخته نشده است. | مرورگر: شمار ردیف‌ها `2/1/3/3/3/3/2/1` در هشت نما؛ دو خانهٔ ماتریس؛ جزئیات/منابع؛ دو ردیف مقایسه و status معتبر؛ جست‌وجوی دارای نتیجه/بی‌نتیجه/reset؛ متن بلند فارسی/لاتین؛ desktop و 390×844؛ RTL؛ dark؛ table scroll؛ بدون page overflow یا exception—همه PASS. | audit دستی screen reader انجام نشده؛ داده‌ها صریحاً synthetic و برای نتیجه‌گیری محتوایی ممنوع‌اند. |
| ۶. build و static output | مانع قبلی واقعی بود، ولی عبارت قدیمی گزارش دربارهٔ توقف `prepare-assets` دیگر دقیق نبود: اکنون پوشهٔ خالی slides وجود دارد و مرحلهٔ آماده‌سازی می‌گذرد، اما فایل‌های واقعی حاضر نیستند. | منابع محلی، `.gitignore`، `origin/main` و مستندات بررسی و build کامل دوباره اجرا شد. compile موفق بود؛ prerender روی نخستین cover غایب شکست خورد. فایل‌های generated که اجرای ناقص بازتولید کرده بود به نسخهٔ پیش از فرمان بازگردانده شد. | `npm run build`: BLOCKED/exit 1 در prerender با 404؛ `npm test`: 71 PASS، 6 FAIL وابسته به نبود `build/`/PDF، 1 SKIP؛ scan bundleهای compile‌شده هیچ marker fixture نیافت. | تا بازیابی snapshot واقعی هر دو media tree، HTML نهایی، sitemap و structured-data خروجی تازه قابل تأیید نیستند. |

## فایل‌ها و مسئولیت‌ها

| مسیر | وضعیت | مسئولیت |
| --- | --- | --- |
| `src/lib/llm/schema.ts` | ایجاد/اصلاح | قرارداد canonical برای مدل، artifact، نرم‌افزار نسخه‌مند، backend، ServingStack، deployment، قابلیت، سازگاری API، شواهد، بنچمارک و اقتصاد |
| `src/lib/llm/guide.ts` | ایجاد/اصلاح | metadata مجموعه، taxonomy کاربرد/اندازه/نرم‌افزار، پنج مسیر شروع، ۱۴ مقالهٔ planned و mapping مطالب موجود؛ repository انتشار خالی |
| `src/lib/llm/views.ts` | ایجاد/اصلاح | پیکربندی هفت بخش/هشت نما، ستون‌ها، جزئیات، فیلترها، presetها و قواعد مقایسهٔ هر نما |
| `src/lib/llm/filtering.ts` | ایجاد/اصلاح | جست‌وجوی نرمال‌شدهٔ فارسی/لاتین، AND بین فیلترها، OR داخل multi، range، missing و sort عددی؛ انتخاب آزاد ردیف مقایسه |
| `src/lib/llm/comparison.ts` | ایجاد | ممیزی سه حالت مقایسه، محور، شرایط مشترک، تفاوت‌ها، دادهٔ ناقص و مجوز مستقل نسبت/رتبه/ادعای برتری |
| `src/lib/llm/adapters.ts` | ایجاد | هشت adapter واقعی، تبدیل واحد حافظه، ساخت matrix cell، اتصال جزئیات و منابع و اعتبارسنجی روابط canonical |
| `src/lib/components/LlmDataView.svelte` | ایجاد/اصلاح | جدول عمومی، فیلتر پایه/پیشرفته، sort، جزئیات، matrix cell، سه حالت مقایسه و گزارش تفاوت/اعتبار محاسبه |
| `src/lib/components/LlmGuidePage.svelte` | ایجاد/اصلاح | رابط فارسی/RTL، ناوبری هفت‌بخشی، تب‌های بخش چهارم، پنج مسیر شروع، ۱۴ عنوان و مطالب مرتبط |
| `src/lib/draft-preview.mjs` | ایجاد | پذیرش فقط مقدار دقیق `show-drafts=true` و ساخت لینک preview |
| `src/routes/guides/llm/+page.svelte` | ایجاد | پوستهٔ prerender‌شوندهٔ noindex/نمای یافت‌نشد و dynamic import محتوای پیش‌نویس فقط در مرورگر |
| `src/routes/guides/+page.svelte` | اصلاح | dynamic import کارت پیش‌نویس فقط با query دقیق |
| `src/lib/guides.ts` | اصلاح | قرارداد `status` مجموعه‌ها؛ LLM وارد آرایهٔ عمومی نشده است |
| `src/lib/components/GuideCollectionCard.svelte` | اصلاح | نشان draft و لینک دارای query بدون تغییر زبان بصری کارت‌ها |
| `src/lib/components/GuideCollectionsGrid.svelte` | اصلاح | پشتیبانی از collection تزریق‌شدهٔ preview |
| `static/images/guides/llm.png` و پنج variant در `static/images/responsive/70da4fe2f2811f91-*` | ایجاد | تصویر کارت و اندازه‌های responsive موجود در قرارداد asset سایت |
| `src/lib/generated/image-sources.json` و `image-variants.json` | تولیدشده | ثبت تصویر LLM در pipeline موجود تصویر؛ دستی hard-code نشده است |
| `tests/fixtures/llm-synthetic.ts` | ایجاد | fixture صریحاً مصنوعی و test-only برای مسیر کامل canonical تا UI row |
| `tests/fixtures/LlmDataViewHarness.svelte` | ایجاد | mount همان کامپوننت محصول برای هر هشت نما با repository مصنوعی؛ فقط در آزمون |
| `tests/fixtures/llm-ui-harness.ts` | ایجاد | ورودی dynamic مرورگر برای mount/unmount کردن harness بدون route عمومی |
| `tests/fixtures/vite.llm-ui.config.mjs` | ایجاد | پیکربندی dev test-only برای دسترسی Vite به harness زیر `tests/fixtures/` |
| `tests/llm-guide-ui.review.mjs` | ایجاد/اصلاح | سناریوی CDP مسیرهای شروع، رابط پُر، ماتریس، جزئیات، منابع، مقایسه، فیلتر، desktop/mobile، RTL و dark |
| `tests/llm-guide.test.mjs` | ایجاد/اصلاح | ۱۳ گروه آزمون هدفمند draft، taxonomy، adapter، فیلتر، مقایسه، provenance، روابط و خروجی استاتیک |
| `docs/reviews/llm-guide-infrastructure-2026-09-15.md` | اصلاح | همین گزارش قابل ممیزی |

فایل‌های محتوای مقاله‌های موجود برای backlink تغییر نکرده‌اند. فایل‌های `static/images/guides/10.png` تا `13.png` تغییرات هم‌زمان کاربرند و در این کار دست‌کاری یا مصرف نشده‌اند.

## استفادهٔ مجدد از راهنمای GPU و قرارداد مخزن

- ظاهر صفحه، متغیرهای CSS، فونت، تم، RTL، کارت مجموعه، hero، grid و الگوی جدول/جزئیات از اجزای جاری سایت تبعیت می‌کنند؛ Tailwind یا dependency جدیدی اضافه نشده است.
- `hardwareTargets` مشخصات پایهٔ GPU را با `gpuRecords.find` از `src/lib/gpu-data.ts` می‌گیرد. H100/H200، RTX 3090/4090/5090، کارت‌های حرفه‌ای، 4090 اصلاح‌شده، CPU/RAM و چندکارت پوشش taxonomy دارند؛ کاتالوگ GPU موازی ساخته نشده است.
- جست‌وجو، sort، chips، فیلتر پیشرفته، empty state، مقایسه و horizontal scroll با الگوی تعاملی راهنمای GPU سازگارند، اما منطق دامنه‌ای LLM در فایل‌های مستقل و typed نگه‌داری می‌شود.
- نسخه‌های نصب‌شدهٔ مخزن مبنا هستند: SvelteKit `^2.37.0`، Svelte `^5.38.0`، adapter-static `^3.0.9` و TypeScript `^5.9.2`.

## مدل موجودیت‌ها و روابط

```text
ModelFamily
  └─ ModelVersion (revision، stage، Dense/MoE/Hybrid، total/active params)
       └─ ModelArtifact (artifact revision، format، weight quant، authority)
            └─ QualityEvaluation (انتساب دقیق model/artifact/revision)

SoftwareProduct (taxonomy)
  └─ SoftwareRelease (نسخه، چند نقش، محیط، مجوز، maintenance)
       ├─ SoftwareCapabilityClaim (status + provision + scope + evidence)
       ├─ ApiCompatibilityClaim (protocol + endpoint + capability + scope)
       └─ ServingStackComponent
             ├─ roles[]
             └─ ExecutionEngine (backend واقعی + نسخه)

ServingStack (چند component + ارتباط + effective settings)
  └─ DeploymentConfiguration
       ├─ ModelVersion + model revision
       ├─ ModelArtifact
       ├─ ServingStack + backend واقعی
       ├─ execution method + weight quant + KV precision + parallelism
       ├─ HardwareConfiguration
       └─ WorkloadScenario
            ├─ DeploymentCompatibility / ExecutionFeasibility
            ├─ BenchmarkRun
            └─ CostScenario
```

شناسه‌ها prefixدار و پایدارند: `family:*`، `model:*`، `artifact:*`، `software-product:*`، `software-release:*`، `engine:*`، `serving-stack:*`، `deployment:*`، `hardware:*`، `workload:*`، `quality:*`، `benchmark:*`، `cost:*`، `evidence:*` و `claim:*`.

### تفکیک نرم‌افزار و اجرا

- `SoftwareProduct` نام محصول است و حضورش در taxonomy هیچ capability تأییدشده‌ای نمی‌سازد.
- `SoftwareRelease` واحد ردیف جدول نرم‌افزار است و نسخه، چند نقش غیرمانعةالجمع، محیط، OS/hardware، local/cloud/offline، مجوز و maintenance را نگه می‌دارد.
- `ExecutionEngine` backend محاسباتی واقعی و نسخهٔ آن است؛ gateway یا UI با engine هم‌معنا نیست.
- `ServingStack` اجزای نسخه‌مند را با نقش، backend، اتصال اجزا و effective settings ترکیب می‌کند. نام/نسخه از مرجع normalized به `SoftwareRelease` می‌آید.
- `DeploymentConfiguration` ترکیب اجرایی دقیق و مرجع مشترک compatibility، benchmark و cost است.
- روش اجرا، کوانت وزن، precision حافظهٔ KV و parallelism چهار فیلد مستقل‌اند.

نقش‌های قابل ثبت: موتور/کتابخانهٔ استنتاج، API server، مدیریت مدل، gateway، رابط کاربری و مدیریت استقرار. taxonomy حداقل Ollama، vLLM، SGLang، llama.cpp/llama-server، LM Studio، TensorRT-LLM، Triton، TEI، AirLLM، Transformers، LiteLLM، Open WebUI و TGI را دارد. role hintها با مستندات رسمی مرور شده‌اند، اما ردیف قابلیت واقعی نیستند. برای TGI فقط یک `maintenanceHint` با تاریخ بازبینی و URL رسمی ثبت شده؛ هیچ نتیجهٔ عملکردی از آن ساخته نشده است.

## هفت بخش و هشت جدول

| بخش/نما | واحد ردیف | ستون‌های پیش‌فرض | گروه‌های جزئیات | فیلترهای اصلی |
| --- | --- | --- | --- | --- |
| ۱. شناسنامهٔ مدل | یک `ModelVersion` | مدل/شناسه؛ خانواده/ناشر؛ نوع/مرحله؛ total/active params؛ معماری؛ context اعلام/ارزیابی؛ وضعیت/بازبینی | lineage؛ modality؛ کاربرد؛ زبان؛ مجوز؛ تاریخ؛ منبع | خانواده؛ ناشر؛ نوع؛ مرحله؛ total params |
| ۲. مدل × کاربرد | model revision + artifact اختیاری؛ خانهٔ ماتریس یک assessment | مدل/artifact؛ نسخهٔ ارزیابی؛ هفت ستون کاربرد | basis؛ زیرکاربرد؛ زبان؛ quality evaluation؛ محدودیت؛ source locator | کاربرد؛ basis؛ total params |
| ۳. امکان اجرا | یک پیکربندی منطقی با شرایط مؤثر مشترک؛ خانهٔ ماتریس شامل deployment و یک یا چند feasibility همان hardware target | artifact/stack/method/quant؛ workload؛ ستون‌های سخت‌افزار | VRAM؛ RAM؛ checkpoint/extra/temp disk؛ context/batch/concurrency؛ offload؛ محدودیت؛ منبع هر نتیجه | سخت‌افزار؛ GPU count؛ feasibility status |
| ۴.۱ مقایسهٔ نرم‌افزارها | یک `SoftwareRelease` | نام/نسخه؛ نقش‌ها؛ محیط/backend؛ API؛ امکانات سرویس؛ maintenance/review؛ evidence/limitations | OS/hardware تا API endpoint و مجوز؛ فهرست کامل پایین | **فقط** نوع نیاز؛ محیط اجرا؛ نقش نرم‌افزار |
| ۴.۲ سازگاری استقرار | یک `DeploymentCompatibility` برای deployment دقیق | مدل/revision؛ artifact؛ stack/versions؛ hardware/workload؛ method/quant/parallelism؛ status | backend/settings؛ KV؛ memory؛ disk؛ AirLLM؛ startup؛ latency؛ workload؛ limitations؛ evidence | مدل/artifact؛ نرم‌افزار؛ status |
| ۵. بنچمارک | یک `BenchmarkRun` متصل به deployment | run/model/artifact؛ stack/hardware؛ dataset/language/workload؛ TTFT؛ TPOT؛ per-request/aggregate throughput؛ goodput/SLO | revisions؛ environment؛ length distributions؛ load؛ reasoning؛ optimization؛ statistics؛ outcomes؛ resources؛ run-state؛ quality؛ raw provenance | مدل/artifact؛ سخت‌افزار؛ workload |
| ۶. اقتصاد | scenario + deployment | scenario/deployment؛ need/quality/latency؛ acquisition؛ currency/basis date؛ TCO؛ accepted-request cost؛ break-even | traffic/hours/users؛ price observations؛ software lifecycle؛ system/operations؛ utilization/redundancy؛ period؛ license؛ token cost؛ ROI؛ derivation؛ evidence | کاربرد؛ acquisition؛ calculation period |
| ۷. مدل تخصصی | یک `SpecializedModelAssessment` | مدل/kind؛ task؛ total params؛ task-specific quality؛ task-specific rate؛ evidence | language/dataset؛ artifact؛ workload/unit؛ generative alternative؛ limitations؛ sources | kind؛ کاربرد؛ total params |

### کلید گروه‌بندی نمای سخت‌افزار

`hardwareFeasibilityGroupKey()` یک serialization پایدار با ترتیب کلید قطعی از این dimensionها می‌سازد:

```text
modelVersionId + modelRevision + artifactId
+ servingStackId + backendEngineId
+ method + weightQuantization + kvCachePrecision + parallelism
+ contextLength + batchSize + concurrency + offloadAllowed
+ workloadId + effectiveSettings
```

`hardwareConfigId`، hardware target، `deployment.id`، `feasibility.id` و evidence ID عمداً در کلید نیستند؛ بنابراین فقط تفاوت سخت‌افزار، نتیجه را به ستون دیگر همان ردیف می‌برد. در مقابل artifact، کوانت، workload، method یا هر تنظیم مؤثر دیگر کلید را عوض و ردیف جدا ایجاد می‌کند. هر خانه `results[]` دارد و برای هر نتیجه `id`، `deploymentConfigId`، مقدار، جزئیات و `sourceIds` را مستقل نگه می‌دارد؛ خلاصهٔ چند نتیجه صرفاً فهرست statusهاست و جای دادهٔ اصلی، انتخاب خودکار یا میانگین را نمی‌گیرد.

### فیلترهای کامل بخش ۴.۱

فیلترهای اصلی دقیقاً سه موردند:

1. `need-type`، multi: اجرای محلی تعاملی، API تیمی، سرویس پرترافیک، وظیفهٔ تخصصی، سرویس چندجزئی.
2. `environment`، multi: desktop، workstation، server، container، Kubernetes، cloud service، offline/air-gapped و other.
3. `software-role`، multi: engine/library، API server، model manager، gateway، UI و deployment manager.

فیلترهای پیشرفته: محصول، نسخه، backend/version، OS، hardware family، local/cloud/hybrid، offline؛ وظیفه‌ها؛ queue؛ concurrency؛ continuous batching؛ admission control؛ load/unload؛ multi-model؛ cold start؛ prefix caching؛ speculative decoding؛ CPU/GPU و KV offload؛ multi-GPU sharding؛ independent replicas؛ streaming؛ structured output؛ tool use؛ reasoning control؛ model/template scope؛ parser scope؛ monitoring؛ metrics؛ health check؛ authentication؛ rate limiting؛ روش تأمین capability؛ مجوز نرم‌افزار؛ maintenance و review date.

هر capability پنج status دارد: `supported`، `conditional`، `not-supported`، `not-reviewed` و `not-applicable`. سه وضعیت factual اول evidence می‌خواهند؛ `not-reviewed` بدون evidence قابل ثبت است؛ `not-applicable` با دلیل صریح `statusReason` از آن جدا می‌ماند. نبود رکورد نیز Datum نامعلوم با پیام خنثی است، نه `not-supported`. روش تأمین جداست: `native`، `plugin`، `external-component` و `not-applicable`. سازگاری API یک boolean کلی نیست و `protocol + endpoint + capability + status + provision + scope + evidence` دارد.

### فیلترهای کامل بخش ۴.۲

اصلی: مدل/artifact، محصول نرم‌افزاری و status سازگاری.

پیشرفته: hardware، workload، backend/version، execution method، weight quant، KV precision، parallelism، context، concurrency، peak VRAM، peak RAM، peak temporary storage، provision و evidence kind.

### رفتار عمومی فیلتر و sort

- جست‌وجو روی عنوان فارسی/لاتین، alias و ID با نرمال‌سازی «ی/ک» و ارقام فارسی/عربی انجام می‌شود.
- میان فیلترهای فعال AND و داخل یک multi-select، OR برقرار است.
- فیلتر عددی فقط مقدار known و واحد canonical سازگار را می‌پذیرد. مقدار نامعلوم با فیلتر عددی عبور نمی‌کند.
- گزینهٔ صریح missing برای فیلترهای شواهد/وضعیت وجود دارد؛ unknown، not-measured و N/A در نمایش از هم جدا هستند.
- صفر واقعی known است، sort می‌شود و missing محسوب نمی‌شود. missing در هر دو جهت sort در انتها می‌ماند.
- empty repository پیام «هنوز داده نداریم» و دادهٔ موجود بدون match پیام «با این فیلتر نتیجه‌ای پیدا نشد» می‌دهد.
- مجوز مدل یا نرم‌افزار فیلتر opt-in است و هیچ حذف یا جریمهٔ پیش‌فرض ایجاد نمی‌کند.

## SLM، MoE و مدل تخصصی

- معیار عددی اصلی total parameter و active parameter دو Datum مستقل‌اند.
- پنج بازهٔ بدون هم‌پوشانی صریحاً «رده‌بندی همین راهنما» نامیده شده‌اند؛ ادعای مرز جهانی SLM وجود ندارد.
- placement یک MoE در ردهٔ اندازه از total parameters می‌آید؛ active parameters فقط فیلتر/فیلد مستقل است. بنابراین 30B total/3B active به‌عنوان 3B طبقه‌بندی نمی‌شود.
- kind مستقل از اندازه است: generative، embedding، reranker، encoder/classifier، vision-language و other.
- نمای هفتم metric name/unit آزاد و task-specific دارد؛ document/s، query/s و retrieval quality به token/s تبدیل ضمنی نمی‌شوند.

## AirLLM و اجرای کم‌حافظه

AirLLM در سه جایگاه صریح قرار دارد: taxonomy نرم‌افزار، release/component قابل ثبت در ServingStack و `AirLlmExecutionEvidence` متصل به یک compatibility دقیق. فیلدهای نسخهٔ AirLLM، معماری، model revision، artifact، stack، dependency، layer loading، peak VRAM/RAM، checkpoint اصلی، converted layers، peak temporary disk، storage type/speed، preparation/startup، TTFT، generation throughput، total time، batch، concurrency، compression/quantization، workload، evidence kind و limitations حفظ شده‌اند.

adapter فقط این داده‌ها را نمایش می‌دهد و از «مدل بار می‌شود» نتیجهٔ «برای چت تعاملی مناسب است» یا «بدون افت سرعت» نمی‌گیرد. RAM، VRAM و سه نوع فضای دیسک مستقل‌اند. compatibility یک نسخه/مدل/stack به نسخه یا معماری دیگر تعمیم داده نمی‌شود.

## قواعد سه‌حالتهٔ مقایسه

### قرارداد مشترک

1. **مشاهدهٔ مشخصات کنار هم:** انتخاب هر ردیف تا سقف چهار ردیف مجاز است. تفاوت‌ها نمایش داده می‌شوند. نسبت، ranking و ادعای برتری همیشه غیرفعال‌اند.
2. **آزمایش کنترل‌شده:** کاربر محور را انتخاب می‌کند. dimensionهای محور می‌توانند متفاوت باشند؛ shared dimensionهای همان محور باید known و یکسان باشند. اختلاف shared محاسبه را `invalid` و نبود داده آن را `needs-more-data` می‌کند، اما نمایش را مسدود نمی‌کند.
3. **انتخاب راهکار:** need/application، workload، quality floor و latency target مشترک‌اند؛ مدل، stack و hardware می‌توانند متفاوت باشند. در اقتصاد، currency، calculation-basis date و period نیز مشترک لازم‌اند.

خروجی evaluator شامل axis، shared dimensions، differences، missing shared، mismatched shared، limitations، calculation status و سه permission مستقل ratio/ranking/superiority است.

| نما | محور کنترل‌شده | شرایط مشترک اصلی | نمونهٔ مجاز | نامعتبر برای محاسبه | نیازمند دادهٔ بیشتر |
| --- | --- | --- | --- | --- | --- |
| شناسنامه | اندازه/مدل | kind، stage، metric، unit | مدل کوچک و بزرگ کنار هم | انتساب کیفیت artifact دیگر | پارامتر/واحد نامعلوم |
| تناسب | مدل/artifact | application، language، dataset، test version، metric، unit | دو مدل روی آزمون فارسی واحد | جمع ستاره‌ای ادعا و اندازه‌گیری | نسخه یا زبان ناقص |
| سخت‌افزار | hardware | artifact، stack، method، workload، context، concurrency، unit | یک deployment منطقی روی دو GPU | نسبت سرعت workload متفاوت | feasibility یا VRAM نامعلوم |
| نرم‌افزار | `service-layer` یا `software-stack` | در service-layer: backend + need/environment/role/workload/model/metric/unit؛ در software-stack همان شرایط به‌جز backend | wrapperها با backend ثابت، یا دو ترکیب/موتور با backend متفاوت | ranking از capabilityهای ناهم‌دامنه یا workload متفاوت | release/scope/شرط مشترک بررسی‌نشده |
| سازگاری | `service-layer`، `software-stack` یا hardware | در service-layer backend مشترک؛ در software-stack، stack/backend متغیر؛ مدل/revision، artifact، workload، method، quant، KV، parallelism، context، batch، concurrency و settings غیرمحور مشترک | یک artifact روی دو stack/backend یا دو GPU | تعمیم load در AirLLM به interactive service یا اختلاف شرط غیرمحور | RAM/disk/dependency یا شرط مشترک ناقص |
| بنچمارک | `service-layer`، software، hardware یا model | backend فقط در service-layer/hardware/model مشترک است؛ workload، method، quant، KV، context، batch، concurrency، arrival، reasoning، caching، settings، metric، statistic و unit مطابق محور کنترل می‌شوند | دو backend روی GPU/workload یکسان | TTFT در برابر aggregate throughput یا workload دیگر | statistic/unit/settings/شرط مشترک ناقص |
| اقتصاد | acquisition/deployment | need، workload، quality، latency، currency، market، basis date، period، unit | مشاهدهٔ دو قیمت با observation date متفاوت | ROI بدون ارزش یا ارز نامشترک | maintenance/basis ناقص |
| تخصصی | model/artifact | task، dataset، language، metric، unit، workload | دو reranker روی دادهٔ واحد | retrieval score در برابر token/s | dataset/unit نامعلوم |

در هر سه نمای نرم‌افزاری، `service-layer` برای سنجش wrapper/API/gateway روی backend ثابت است؛ محور کل ترکیب، خود stack و backend را dimension متغیر می‌داند. این استثنا سایر shared dimensionها را آزاد نمی‌کند. evaluator اختلاف known در شرط مشترک را `invalid`، نبود مقدار مشترک را `needs-more-data` و مشاهدهٔ کنارهم را همیشه `display-only` می‌کند؛ سه مجوز ratio، ranking و superiority نیز جدا برگردانده می‌شوند.

## adapterها و مسیر کامل داده

`buildLlmViewRows(repository)` هشت تابع مستقل را فراخوانی می‌کند:

- `adaptModelCatalog`
- `adaptModelSuitability`
- `adaptHardwareFeasibility`
- `adaptSoftwareProducts`
- `adaptDeploymentCompatibility`
- `adaptBenchmarks`
- `adaptEconomics`
- `adaptSpecializedModels`

adapterها lookupهای ID، label، search text، cell، matrix cell، facets، details، evidence IDs و comparison dimensions را از repository canonical می‌سازند. حافظهٔ MB/MiB/GB/GiB/TB/TiB برای فیلتر/sort به GiB canonical تبدیل می‌شود و display واحد اصلی را نگه می‌دارد.

fixture آزمایشی سه software release، دو backend، دو ServingStack شامل gateway+server، دو سخت‌افزار، چهار deployment، پنج feasibility، سه benchmark و دو cost scenario دارد. نام‌ها و URLها صریحاً synthetic/invalid هستند. آزمون این موارد را پوشش می‌دهد:

- پرشدن هر هشت view از canonical entities و شمار مرورگری `2/1/3/3/3/3/2/1`؛
- یک ردیف سخت‌افزار با دو ستون پُر، دو نتیجهٔ مستقل در یک خانه، جزئیات و منبع scoped هر نتیجه؛
- جداشدن deployment دارای روش اجرای متفاوت، فیلتر hardware و ترکیب AND با method؛
- فیلتر AND/OR، sort و رفتار نتیجه/بی‌نتیجه/reset؛
- ServingStack چندجزئی؛
- مقایسهٔ دو backend با hardware/workload مشترک؛
- مقایسهٔ دو hardware با محور hardware؛
- invalid شدن محاسبه با محور نادرست و باقی‌ماندن side-by-side؛
- تمایز zero، unknown، not-measured و not-applicable؛
- تفاوت observation date قیمت و اشتراک calculation basis؛
- جدا بودن registered users از concurrency.

production repository در `guide.ts` برای همهٔ collectionها خالی است. `LlmDataViewHarness.svelte` و ورودی mount آن فقط زیر `tests/fixtures/` هستند و route عمومی ندارند. جست‌وجوی source و scan خروجی compile‌شده نیز تضمین می‌کنند `src/` و bundle محصول هیچ import یا marker fixture ندارند.

## provenance و اعتبارسنجی علمی

- هر `Evidence` URL، عنوان، نویسنده/سازمان، publication/access date، revision/commit، locator دقیق، evidence kind، primary/secondary، scope، limitation و commercial interest اختیاری دارد.
- هویت publisher (`organization`) از ماهیت ادعا (`kind`/`nature`) جداست؛ گزارش تجاری می‌تواند direct measurement باشد.
- `ClaimRecord` مقدار factual را با `subjectId + fieldPath + value + nature + scope + evidenceIds` به شاهد متصل می‌کند.
- هر Datum و metric observation می‌تواند evidence IDs خودش را داشته باشد؛ matrix cell نیز source IDs مستقل دارد.
- دادهٔ مشتق‌شده `inputs[]` با field/value/unit/evidenceId/locator، formula/procedure، assumptions و rounding اجباری دارد.
- capability و API claim با statusهای factual یعنی `supported`، `conditional` و `not-supported` بدون evidence مردود است؛ `not-reviewed` ادعا نیست و بدون evidence مجاز است؛ `not-applicable` به `statusReason` نیاز دارد. scope شامل release، backend، model، artifact، hardware، OS، endpoint، message format، template، parser و conditions است.
- validator یکتایی ID، همهٔ foreign keyها، locator، derivation input، نقش component، اتصال component، حضور backend در stack و زنجیرهٔ deployment را بررسی می‌کند.
- quality evaluation مربوط به artifact باید همان model ID، artifact ID و artifact revision را داشته باشد. فهرست evaluation روی artifact نیز همین انتساب دقیق را کنترل می‌کند؛ کیفیت مدل پایه/BF16 یا نسخهٔ distilled خودکار منتقل نمی‌شود.

## اقتصاد سناریو

- `Money.observedOn` تاریخ مشاهدهٔ هر ورودی قیمت و `CostScenario.calculationBasisDate` تاریخ normalize محاسبه‌اند.
- software lifecycle شامل initial setup، model preparation، model load operations، ongoing maintenance و supporting resources است.
- traffic، operating hours، utilization و redundancy مستقل‌اند. `registeredUsers` در workload از `concurrency` جداست.
- TCO، operating cost، accepted-request cost، token cost، break-even و ROI فیلدهای مستقل‌اند.
- ROI فقط با `economicValueAssumption` مجاز است؛ adapter نبود آن را N/A نشان می‌دهد.
- license cost حالت‌های included، excluded-not-free، free، unknown و N/A دارد؛ «لحاظ نشده» معادل «رایگان» نیست.

## پنج مسیر شروع و preset

| مسیر | مقصد | preset |
| --- | --- | --- |
| برای کارم چه مدلی کافی است؟ | مدل × کاربرد | `task-first`؛ بدون انتخاب اولیهٔ kind؛ کاربرد، kind و بازهٔ پارامتر با کنترل‌های موجود انتخاب می‌شوند |
| با سخت‌افزار موجود چه می‌توانم اجرا کنم؟ | امکان اجرا | `existing-hardware`؛ کاربر سخت‌افزار خودش را انتخاب می‌کند و فرض پنهان اعمال نمی‌شود |
| چگونه با حافظهٔ کمتر اجرا کنم؟ | سازگاری استقرار | `memory-constrained`؛ بدون انتخاب اولیه؛ مدل کوچک‌تر، کوانت، اجرای کامل/CPU، offload و layer-wise از کنترل‌های موجود قابل بررسی‌اند |
| کدام پیکربندی هزینهٔ مناسب‌تری دارد؟ | اقتصاد | `cost-scenario`؛ کاربر need/basis را تعیین می‌کند و عدد فرضی اعمال نمی‌شود |
| با چه نرم‌افزاری مدل را اجرا و سرویس‌دهی کنم؟ | مقایسهٔ نرم‌افزارها | `software-choice`؛ بدون انتخاب اولیهٔ need/environment/role؛ انتخاب مدل نیز الزامی نیست |

هر سه preset عمومی اصلاح‌شده `selections: {}` دارند. فیلترها همچنان آشکار و قابل پاک‌کردن‌اند، اما ورود اولیه چیزی را حذف نمی‌کند. در browser test، هر سه با صفر فیلتر فعال و متن «همهٔ ردیف‌ها» باز شدند؛ پس از فعال‌کردن یک فیلتر نرم‌افزار و جابه‌جایی به مسیر کم‌حافظه/بازگشت بدون preset، state قبلی باقی نماند. `show-drafts=true` در URL همهٔ این ناوبری‌ها حفظ شد.

## مقاله‌های برنامه‌ریزی‌شده و mapping

| # | ID | slug رزروشده | وضعیت | مطالب موجود مرتبط |
| ---: | --- | --- | --- | --- |
| 1 | `planned-article:right-model-size` | `right-model-size-for-the-task` | planned | choosing GPU؛ GPU types؛ Targoman update |
| 2 | `planned-article:total-vs-active-parameters` | `total-vs-active-model-parameters` | planned | INT8/FP8؛ latency/throughput |
| 3 | `planned-article:rtx-4090-24-vs-48` | `llms-on-rtx-4090-24gb-vs-48gb` | planned | GPU types؛ choosing GPU؛ server selection |
| 4 | `planned-article:four-bit-quantization` | `four-bit-model-quantization` | planned | INT8/FP8؛ latency/throughput |
| 5 | `planned-article:airllm-layer-wise` | `airllm-layer-wise-inference` | planned | latency؛ server components؛ INT8/FP8 |
| 6 | `planned-article:enterprise-rag-model-stack` | `enterprise-rag-model-embedding-reranker` | planned | indirect access؛ ZTAI controls؛ MLOps |
| 7 | `planned-article:coding-model-needs` | `code-completion-assistant-and-agent` | planned | AI platform؛ latency؛ ZTAI controls |
| 8 | `planned-article:evaluating-persian-models` | `evaluating-language-models-for-persian` | planned | Targoman update؛ choosing GPU |
| 9 | `planned-article:which-deepseek` | `which-deepseek-on-personal-gpu` | planned | GPU types؛ INT8/FP8؛ choosing GPU |
| 10 | `planned-article:single-user-to-service` | `single-user-to-enterprise-llm-serving` | planned | latency/capacity؛ PCIe/SXM؛ DGX/HGX |
| 11 | `planned-article:llm-cost-buy-rent-api` | `true-llm-cost-buy-rent-or-api` | planned | choosing GPU؛ server components/selection |
| 12 | `planned-article:model-licenses` | `open-weight-open-source-commercial-model-licenses` | planned | AI platform؛ MLOps؛ infrastructure security |
| 13 | `planned-article:serving-software-selection` | `ollama-vllm-sglang-or-llama-cpp` | planned | latency/capacity؛ server components؛ MLOps |
| 14 | `planned-article:serving-stack-roles` | `model-engine-api-and-chat-ui-roles` | planned | MLOps؛ ZTAI controls؛ indirect access |

عنوان کامل هر ۱۴ مقاله در `plannedArticles` ثبت و در UI فقط title + status نشان داده می‌شود. هیچ body، excerpt، date، readTime، href، Markdown یا route برای آن‌ها وجود ندارد.

مرز مقالهٔ ۱۰ ظرفیت/صف/concurrency/replica و رشد سرویس است؛ مقالهٔ ۱۳ انتخاب محصول و trade-off نرم‌افزار را پوشش می‌دهد؛ مقالهٔ ۱۴ تفکیک نقش model، engine، API، gateway و UI را. بنابراین mappingها overlap مفهومی مفید دارند اما موضوع مقاله‌ها یکی نیست.

anchorهای ذخیره‌شده با headingهای Markdown منتشرشده آزمون می‌شوند. backlink آینده، بدون تغییر فعلی مقاله‌ها، برای latency/throughput، server components، MLOps، ZTAI controls و indirect access پیشنهاد می‌شود.

## شرط پیش‌نویس، prerender و SEO

| URL | رفتار آزموده‌شده |
| --- | --- |
| `/guides/` | کارت LLM وجود ندارد |
| `/guides/?show-drafts=true` | کارت وجود دارد و به `/guides/llm/?show-drafts=true` می‌رود |
| `/guides/llm/` | نمای یافت‌نشد؛ صفر `.llm-view` |
| `/guides/llm/?show-drafts=true` | محتوای کامل preview |
| مقدار خالی، `false`، `1` و `TRUE` | نمای یافت‌نشد؛ صفر `.llm-view` |

- `browser && hasDraftPreview(searchParams)` شرط هر دو route است؛ فقط رشتهٔ دقیق `true` پذیرفته می‌شود.
- کارت و کل راهنما dynamic import می‌شوند. HTML SSR/prerender عمومی فقط پوستهٔ یافت‌نشد و `noindex,follow` دارد؛ عنوان‌ها، ردیف‌ها و planned metadata در initial HTML/data نیستند.
- حذف query و Back/Forward در browser test بلافاصله صفر/هفت view را جابه‌جا کرد؛ localStorage/cookie وجود ندارد.
- canonical ثابت `/guides/llm/` است و query preview وارد canonical نمی‌شود.
- هیچ Article schema یا JSON-LD در preview تولید نشده است. راهنما به collections عمومی، search/RSS یا sitemap source اضافه نشده است.
- خود JS chunk پیش‌نویس روی میزبان عمومی قابل دریافت است؛ این feature احراز هویت یا محرمانگی نیست.
- adapter-static برای فایل موجود معمولاً HTTP 200 برمی‌گرداند؛ «یافت‌نشد» در این route یک نمای UI است، نه تضمین status واقعی 404 روی همهٔ object storageها.

## نتایج اعتبارسنجی

| بررسی | نتیجه | جزئیات |
| --- | --- | --- |
| `npm run check` | PASS | صفر error و صفر warning |
| lint/typecheck مستقل | موجود نیست | مخزن script جداگانه‌ای با نام `lint` یا `typecheck` ندارد؛ قرارداد TypeScript/Svelte با `npm run check` اجرا شد |
| `node tests/llm-guide.test.mjs` | PASS/SKIP | ۱۲ از ۱۳ subtest هدفمند pass؛ فقط تست HTML نهایی در نبود build skip است |
| `npm test` خارج از sandbox | FAIL وابسته به build | ۷۸ کل: ۷۱ PASS، ۶ FAIL و ۱ SKIP؛ هر شش failure متعلق به `static-output` و ناشی از نبود `build/`/sitemap و PDF واقعی است؛ همهٔ آزمون‌های مستقل از خروجی نهایی PASS شدند |
| `node tests/editorial-core.test.mjs` | PASS | ۶ از ۶ |
| `npm test` داخل sandbox | محدودیت runner | `editorial-core` به علت منع ایجاد فرایند تو‌در‌تو با `spawnSync /usr/bin/node20 EPERM` قابل اتکا نبود؛ بازاجرای خارج sandbox نتیجهٔ بالا را داد |
| Vite compile در `npm run build` | PASS | ۴۶۷ module؛ client و SSR bundle ساخته شدند و chunk مستقل `LlmGuidePage` تولید شد |
| prerender در `npm run build` | BLOCKED | نخستین خطا: `404 /slides/behind-ai-dba/cover.jpg (linked from /)`؛ build با exit 1 تمام شد و `build/` ساخته نشد |
| `npm run build` کامل | BLOCKED | prepare content و compile گذشتند؛ prerender به علت media واقعی غایب متوقف شد؛ generate/verify sitemap، verify structured data و verify short links پس از build اجرا نشدند |
| browser مسیرهای شروع | PASS | سه preset اصلاح‌شده بدون فیلتر پیش‌فرض؛ reset پس از تعویض مسیر؛ حفظ `show-drafts=true` |
| browser fixture پُر، desktop | PASS | هر هشت نما با شمار `2/1/3/3/3/3/2/1`، دو خانهٔ سخت‌افزار، نتایج تکراری بدون overwrite، جزئیات/source، مقایسهٔ دو ردیف، filter match/no-match/reset، متن بلند و بدون exception/overflow |
| browser fixture پُر، mobile 390×844 | PASS | RTL، dark mode، table scroll، جزئیات و پنل مقایسه؛ بدون page overflow |
| draft query/Back/Forward | PASS | exact true، چهار مقدار نامعتبر، حذف query، back و forward |
| خروج fixture از bundle | PASS | هیچ‌یک از markerهای fixture مصنوعی در `.svelte-kit/output/client` یا `server` مرحلهٔ compile یافت نشد |
| `git diff --check` | PASS | خطای whitespace وجود ندارد |
| HTML/sitemap/search/structured خروجی نهایی | BLOCKED/SKIP | تست آماده است و به نبود `build/guides/llm/index.html` به‌درستی SKIP شد؛ source exclusion برقرار است، اما خروجی استاتیک تازه برای ادعای PASS وجود ندارد |

هشدارهای Vite مربوط به `tabindex` در Markdownهای قدیمی موجود بودند و از فایل‌های LLM نبودند؛ `npm run check` برای کد فعلی صفر warning است.

### تفکیک صریح نتیجه‌ها

- **PASS:** `npm run check`؛ ۱۲ subtest مستقل LLM؛ مرورگر مسیرهای شروع؛ مرورگر fixture پُر در desktop/mobile/RTL/dark؛ compile client/SSR؛ scan نبود fixture؛ `git diff --check`.
- **FAIL:** شش subtest از `tests/static-output.test.mjs`، همگی در اثر نبود خروجی build/PDF؛ failure مستقل LLM ثبت نشد.
- **SKIP:** یک subtest LLM برای HTML/noindex/sitemap خروجی نهایی، چون `build/guides/llm/index.html` وجود ندارد.
- **BLOCKED:** `npm run build` در prerender و در نتیجه ممیزی HTML اولیه، sitemap و structured data تازه؛ علت، media واقعی ignored و غایب است.

### تحلیل مانع دارایی‌ها

`.gitignore` هر دو مسیر `/static/slides/` و `/static/images/gallery/` را به‌عنوان large media خارج Git نگه می‌دارد. `git ls-tree origin/main` برای این دو مسیر ورودی tracked برنگرداند و جست‌وجوی فایل‌های نمونهٔ لازم (`Behind-AI.pdf` و تصویر `elecomp-1405/ai-ds/29.jpg`) در فضای محلی کاربر نتیجه‌ای نداشت. `docs/adding-slides.md` فقط روش افزودن فایل واقعی را توضیح می‌دهد و دستور، backup path یا remote read-only برای بازیابی تعریف نمی‌کند. deploy script فقط مسیر upload/delete با credential است و recovery read-only نیست؛ برای جلوگیری از اثر بیرونی یا افشای credential اجرا نشد.

در اجرای نهایی این بازبینی، `prepare-assets` به‌دلیل وجود پوشهٔ خالی `static/slides/` عبور کرد و «۰ PDF» گزارش داد؛ این موفقیت به معنی وجود asset نیست. Vite هر دو bundle را ساخت و prerender در اولین ارجاع غایب، `/slides/behind-ai-dba/cover.jpg`، متوقف شد. ممکن است پس از بازیابی این فایل، ارجاع‌های غایب بعدی از gallery یا PDF نیز ظاهر شوند؛ فهرست کامل فقط با media tree واقعی قابل اثبات است.

برای بازکردن gate نهایی باید snapshot واقعی هر دو پوشه از نگه‌داری محلی/پشتیبان پروژه بازیابی شود. سپس این فرمان‌ها اجرا شوند:

```sh
npm run build
npm test
```

پس از آن باید `build/guides/llm/index.html`، sitemap، search و structured-data verification دوباره بررسی شوند. placeholder، حذف reference یا کاهش validation راه‌حل قابل قبول نیست.

## نیازمندی ← محل پیاده‌سازی ← وضعیت ← محدودیت

| نیازمندی | محل پیاده‌سازی | وضعیت | محدودیت |
| --- | --- | --- | --- |
| هفت بخش/هشت جدول | `views.ts`، `LlmGuidePage.svelte` | انجام شد | هم‌زمان فقط tab فعال بخش ۴ mount می‌شود |
| انتخاب نرم‌افزار بدون مدل | نمای `software-products` | انجام شد | دادهٔ واقعی عمداً خالی |
| پنج مسیر شروع بدون حذف پیش‌فرض | `LlmGuidePage.svelte` + presets + reset در `LlmDataView.svelte` | انجام شد/مرورگر PASS | انتخاب معیارها عمداً به کاربر واگذار شده است |
| ردیف منطقی ماتریس سخت‌افزار | `hardwareFeasibilityGroupKey` و `adaptHardwareFeasibility` | انجام شد/fixture+مرورگر PASS | نتیجهٔ عددی ادغام یا میانگین نمی‌شود |
| چند نتیجه در یک خانه | `LlmMatrixCell.results[]` و UI جزئیات خانه | انجام شد/مرورگر PASS | تفسیر اختلاف نتایج نیازمند review محتوایی است |
| محصول/نسخه/نقش‌های چندگانه | `schema.ts` | انجام شد | capability factual نیازمند release و evidence است؛ not-reviewed ادعا نیست |
| backend واقعی و ServingStack | `schema.ts`، adapters | انجام شد | orchestration عمومی/پیچیده ساخته نشده |
| endpoint-level API | `ApiCompatibilityClaim` | انجام شد | هیچ ادعای واقعی وارد نشده |
| AirLLM و هزینهٔ RAM/disk | `AirLlmExecutionEvidence` | انجام شد | benchmark/install انجام نشده |
| SLM/MoE/specialized | model schema + نماهای ۱/۲/۷ | انجام شد | رده‌بندی محلی، نه استاندارد جهانی |
| سه حالت و backend وابسته به محور | `comparison.ts`، policy سه نمای نرم‌افزاری و UI | انجام شد/آزمون PASS | فرمول واقعی فقط پس از ورود محتوای ممیزی‌شده |
| adapter واقعی | `adapters.ts` | انجام شد | production rows صفر |
| fixture خارج bundle | `tests/fixtures` + import scan test | انجام شد | فقط محیط test |
| provenance و `not-reviewed` دقیق | Evidence/Claim/Derivation/validator | انجام شد/آزمون PASS | تکمیل locator برای ادعاهای factual وظیفهٔ ورود محتواست |
| جلوگیری از انتساب کیفیت | repository validator | انجام شد | review انسانی روش آزمون همچنان لازم است |
| اقتصاد و lifecycle software | CostScenario | انجام شد | ماشین‌حساب/عدد فرضی ساخته نشده |
| مجوز opt-in | model/software filters + costs | انجام شد | تحلیل حقوقی تولید نشده |
| ۱۴ planned metadata | `guide.ts` | انجام شد | route/body عمداً ندارد |
| mapping مطالب/anchor | `guide.ts` + tests | انجام شد | backlink فعلاً اعمال نشده |
| draft exact query | دو route + helper | انجام شد/مرورگر pass | امنیت/محرمانگی نیست؛ status میزبانی ممکن است 200 باشد |
| noindex اولیه | route head | انجام شد | canonical بدون query است |
| حذف از public discovery | dynamic import + عدم ثبت عمومی | انجام شد در source | بازتولید خروجی نهایی build مسدود است |
| RTL/mobile/dark/a11y با دادهٔ پُر | component محصول + harness test-only + browser review | انجام شد/مرورگر PASS | audit دستی screen reader انجام نشده |
| check/typecheck | script مخزن | PASS | — |
| full build/sitemap/static HTML | pipeline مخزن | BLOCKED | media واقعی ignored در checkout موجود نیست |

## خلأهای باقی‌مانده

### نقص زیرساخت/محیط

1. دارایی‌های واقعی `static/slides/` و `static/images/gallery/` باید از backup محتوایی پروژه بازیابی شوند تا build کامل، sitemap و static-output دوباره اجرا شود.
2. پس از بازیابی، HTML اولیهٔ ساخته‌شده باید دوباره از نظر noindex و نبود رشته‌های planned بررسی شود؛ تست آماده است و در حال حاضر skip می‌شود.
3. پس از build موفق، `npm test` باید دوباره اجرا شود؛ اجرای خارج sandbox نشان داد تنها شش assertion وابسته به static output باقی مانده‌اند و آزمون‌های editorial سالم‌اند.

### محتوای عمداً موکول‌شده

1. انتخاب releaseهای دقیق نرم‌افزار و ایجاد Evidence/Claim نسخه‌مند از منابع رسمی.
2. ورود مدل/artifact/revision واقعی و تعیین معیارهای مستقل فارسی.
3. تعریف workload، SLO، quality floor و سیاست انتخاب metric/statistic برای هر مطالعه.
4. اجرای benchmark تکرارپذیر و نگه‌داری raw output.
5. مشاهدهٔ قیمت‌ها و تعریف basis/assumption اقتصادی؛ هیچ عددی از fixture قابل انتقال نیست.
6. نگارش ۱۴ مقاله و تصمیم editorial برای backlinkهای پیشنهادشده.
7. audit دستی screen reader و مرور نهایی محتوای واقعی پس از ورود داده.

## منابع رسمی taxonomy نرم‌افزار

- Ollama FAQ: <https://docs.ollama.com/faq>
- Ollama OpenAI compatibility (صریحاً «parts of» و endpointمحور): <https://docs.ollama.com/api/openai-compatibility>
- vLLM: <https://github.com/vllm-project/vllm>
- SGLang: <https://github.com/sgl-project/sglang>
- llama-server: <https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md>
- LM Studio developer docs: <https://lmstudio.ai/docs/developer>
- TensorRT-LLM serve: <https://nvidia.github.io/TensorRT-LLM/commands/trtllm-serve.html>
- Triton Inference Server: <https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/index.html>
- Text Embeddings Inference: <https://github.com/huggingface/text-embeddings-inference>
- AirLLM: <https://github.com/lyogavin/airllm>
- Transformers: <https://huggingface.co/docs/transformers/index>
- LiteLLM: <https://docs.litellm.ai/docs/>
- Open WebUI: <https://docs.openwebui.com/>
- Text Generation Inference (maintenance mode در صفحهٔ رسمی مخزن هنگام بازبینی): <https://github.com/huggingface/text-generation-inference>
