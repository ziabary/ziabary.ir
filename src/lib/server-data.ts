export type ServerVendor = 'Dell' | 'HPE' | 'Lenovo' | 'Supermicro' | 'GIGABYTE' | 'ASUS' | 'ASRock Rack' | 'Fujitsu' | 'QCT' | 'NVIDIA';
export type ServerStatus = 'current' | 'legacy' | 'announced';
export type AcceleratorForm = 'pcie-card' | 'integrated';
export type CardCooling = 'passive' | 'active' | 'liquid';
export type SystemCooling = 'air' | 'dlc';
export type GpuTopology = 'direct' | 'switched' | 'baseboard';

export type ServerGpuProfile = {
  id: string;
  label: string;
  pcieGeneration: 4 | 5;
  widthSlots: 1 | 2 | 3 | 4;
  powerW: number;
  cooling: CardCooling;
  note: string;
};

export type ServerRecord = {
  id: string;
  vendor: ServerVendor;
  model: string;
  status: ServerStatus;
  acceleratorForm: AcceleratorForm;
  heightU: number;
  depthMm: number | null;
  pcieGeneration: 4 | 5 | 6 | null;
  gpuTopology: GpuTopology;
  maxDoubleWidthGpus: number;
  maxSingleWidthGpus: number | null;
  maxTripleWidthGpus: number;
  maxGpuPowerW: number | null;
  cardCooling: CardCooling[];
  systemCooling: SystemCooling[];
  cpu: string;
  memory: string;
  storage: string;
  expansion: string;
  power: string;
  validatedGpuIds: string[];
  acceleratorSummary: string;
  bestFor: string;
  caution: string;
  sourceLabel: string;
  sourceUrl: string;
  sourceTier: 'سازنده' | 'راهنمای فنی سازنده';
};

export const serverLastReviewed = {
  iso: '2026-08-10',
  fa: '۱۹ مرداد ۱۴۰۵',
  gregorian: '10 August 2026'
};

export const serverGpuProfiles: ServerGpuProfile[] = [
  { id: 'h200-nvl', label: 'NVIDIA H200 NVL PCIe', pcieGeneration: 5, widthSlots: 2, powerW: 600, cooling: 'passive', note: 'FHFL دو اسلات؛ برای ظرفیت کامل، شیار Gen5 x16 و کیت برق/خنک‌کاری تأییدشده لازم است.' },
  { id: 'h100-nvl', label: 'NVIDIA H100 NVL PCIe', pcieGeneration: 5, widthSlots: 2, powerW: 400, cooling: 'passive', note: 'FHFL دو اسلات؛ پشتیبانی NVLink bridge به چیدمان و BOM سرور وابسته است.' },
  { id: 'h100-pcie', label: 'NVIDIA H100 PCIe', pcieGeneration: 5, widthSlots: 2, powerW: 350, cooling: 'passive', note: 'FHFL دو اسلات و passive؛ وجود جریان هوای سروری الزامی است.' },
  { id: 'rtx-pro-6000-bse', label: 'NVIDIA RTX PRO 6000 Blackwell Server Edition', pcieGeneration: 5, widthSlots: 2, powerW: 600, cooling: 'passive', note: 'نسخهٔ Server Edition دو اسلات است؛ با نسخه‌های Workstation و Max-Q یکی نیست.' },
  { id: 'rtx-pro-4500-bse', label: 'NVIDIA RTX PRO 4500 Blackwell Server Edition', pcieGeneration: 5, widthSlots: 2, powerW: 200, cooling: 'passive', note: 'دو اسلات؛ فهرست قطعات و کابل برق سازندهٔ سرور باید کنترل شود.' },
  { id: 'l40s', label: 'NVIDIA L40S', pcieGeneration: 4, widthSlots: 2, powerW: 350, cooling: 'passive', note: 'FHFL دو اسلات و passive؛ در شیار Gen5 نیز با سرعت Gen4 کار می‌کند.' },
  { id: 'l4', label: 'NVIDIA L4', pcieGeneration: 4, widthSlots: 1, powerW: 72, cooling: 'passive', note: 'تک‌اسلات و کم‌مصرف؛ تعداد قابل نصب همچنان به riser و محدودیت حرارتی وابسته است.' },
  { id: 'a100-pcie', label: 'NVIDIA A100 PCIe', pcieGeneration: 4, widthSlots: 2, powerW: 300, cooling: 'passive', note: 'دو اسلات passive؛ برای سرورهای نسل PCIe 4 هنوز گزینهٔ رایج بازار دست‌دوم است.' },
  { id: 'a40', label: 'NVIDIA A40', pcieGeneration: 4, widthSlots: 2, powerW: 300, cooling: 'passive', note: 'دو اسلات passive و بدون فن داخلی.' },
  { id: 'a10', label: 'NVIDIA A10', pcieGeneration: 4, widthSlots: 1, powerW: 150, cooling: 'passive', note: 'تک‌اسلات passive؛ کابل برق و محدودیت تعداد باید در configurator سازنده بررسی شود.' },
  { id: 'rtx-6000-ada', label: 'NVIDIA RTX 6000 Ada', pcieGeneration: 4, widthSlots: 2, powerW: 300, cooling: 'active', note: 'دو اسلات active؛ هر شاسی passive لزوماً خروجی تصویر و مسیر هوای مناسب آن را ندارد.' },
  { id: 'rtx-a6000', label: 'NVIDIA RTX A6000', pcieGeneration: 4, widthSlots: 2, powerW: 300, cooling: 'active', note: 'دو اسلات active؛ پشتیبانی رسمی OEM را با part number همان سازنده کنترل کنید.' },
  { id: 'rtx-5090', label: 'GeForce RTX 5090', pcieGeneration: 5, widthSlots: 3, powerW: 575, cooling: 'active', note: 'مدل مرجع سه اسلات است؛ بیشتر سرورهای ۸-GPU دو اسلات برای آن مناسب نیستند.' },
  { id: 'rtx-4090', label: 'GeForce RTX 4090', pcieGeneration: 4, widthSlots: 4, powerW: 450, cooling: 'active', note: 'بسته به سازنده ۳ تا ۴ اسلات؛ وجود شیار به معنی تأیید برق، ابعاد یا firmware نیست.' }
];

export const serverRecords: ServerRecord[] = [
  {
    id: 'dell-poweredge-xe7740', vendor: 'Dell', model: 'PowerEdge XE7740', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: 886.73, pcieGeneration: 5, gpuTopology: 'switched', maxDoubleWidthGpus: 8, maxSingleWidthGpus: 8, maxTripleWidthGpus: 0, maxGpuPowerW: 600,
    cardCooling: ['passive'], systemCooling: ['air'], cpu: '۲× Intel Xeon 6؛ تا ۸۶ هسته برای هر پردازنده', memory: '۳۲ اسلات DDR5؛ تا ۴ ترابایت و ۶۴۰۰ MT/s',
    storage: 'تا ۸× E3.S Gen5 NVMe', expansion: '۸× PCIe Gen5 x16 برای GPU؛ OCP 3.0', power: 'منابع تغذیهٔ ۳۲۰۰ وات Titanium؛ تعداد وابسته به پیکربندی',
    validatedGpuIds: ['h200-nvl', 'h100-nvl', 'rtx-pro-6000-bse', 'l40s', 'l4'], acceleratorSummary: '۸ کارت FHFL دو اسلات، هرکدام تا ۶۰۰ وات',
    bestFor: 'استنتاج و fine-tuning متراکم با کارت‌های PCIe Gen5 در شاسی ۴U.', caution: 'تعداد ۲/۴/۶/۸ کارت و نوع PSU/BOM به یکدیگر وابسته‌اند؛ ماتریس رسمی PSU-GPU را قبل از سفارش کنترل کنید.',
    sourceLabel: 'Dell PowerEdge XE7740 — Tech Specs', sourceUrl: 'https://www.dell.com/en-us/shop/ipovw/poweredge-xe7740', sourceTier: 'سازنده'
  },
  {
    id: 'dell-poweredge-xe7745', vendor: 'Dell', model: 'PowerEdge XE7745', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 5, gpuTopology: 'switched', maxDoubleWidthGpus: 8, maxSingleWidthGpus: 16, maxTripleWidthGpus: 0, maxGpuPowerW: 600,
    cardCooling: ['passive'], systemCooling: ['air'], cpu: '۲× AMD EPYC 9005؛ تا ۱۹۲ هسته برای هر پردازنده', memory: '۲۴ اسلات DDR5؛ تا ۳٫۰۷۲ ترابایت و ۶۰۰۰ MT/s',
    storage: 'بسته به پیکربندی E3.S/NVMe', expansion: '۸× PCIe Gen5 x16 DW یا ۱۶× Gen5 x16 SW؛ ۸ شیار Gen5 تکمیلی', power: 'تا ۸ منبع تغذیهٔ افزونه‌پذیر',
    validatedGpuIds: ['h200-nvl', 'rtx-pro-6000-bse'], acceleratorSummary: '۸ کارت دو اسلات تا ۶۰۰ وات یا ۱۶ کارت تک‌اسلات تا ۷۵ وات',
    bestFor: 'تراکم بالای PCIe با پردازنده‌های AMD و نیاز به شیارهای شبکهٔ مستقل از GPU.', caution: 'ظرفیت ۱۶ کارت فقط برای کارت‌های تک‌اسلات کم‌مصرف است؛ آن را به ۱۶ کارت دو اسلات تعمیم ندهید.',
    sourceLabel: 'Dell PowerEdge XE7745 — Tech Specs', sourceUrl: 'https://www.dell.com/en-us/shop/ipovw/poweredge-xe7745', sourceTier: 'سازنده'
  },
  {
    id: 'hpe-dl380a-gen12', vendor: 'HPE', model: 'ProLiant Compute DL380a Gen12', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 5, gpuTopology: 'switched', maxDoubleWidthGpus: 10, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: 600,
    cardCooling: ['passive'], systemCooling: ['air', 'dlc'], cpu: '۲× Intel Xeon 6؛ تا ۱۴۴ هسته برای هر پردازنده', memory: 'DDR5 HPE Smart Memory؛ ظرفیت دقیق وابسته به CPU/BOM',
    storage: 'چند پیکربندی NVMe/SAS/SATA طبق QuickSpecs', expansion: 'PCIe Gen5؛ پیکربندی‌های ۰/۱/۲/۴/۸/۱۰ GPU', power: 'PSUهای ۲۴۰۰ یا ۳۲۰۰ وات برای GPUهای ۶۰۰ وات؛ چند دامنهٔ تغذیه',
    validatedGpuIds: ['h200-nvl', 'h100-nvl', 'rtx-pro-6000-bse', 'l40s', 'l4'], acceleratorSummary: 'تا ۱۰ کارت دو اسلات؛ تعداد و توان به enablement kit وابسته است',
    bestFor: 'بیشترین تراکم کارت PCIe در سبد OEM سازمانی همراه با iLO و گزینهٔ DLC.', caution: 'عدد ۱۰ سقف خانواده است؛ برخی kitها فقط ۸ کارت را فعال می‌کنند و Bridge/PSU نیز کارت‌به‌کارت فرق دارد.',
    sourceLabel: 'HPE DL380a Gen12 QuickSpecs', sourceUrl: 'https://www.hpe.com/us/en/collaterals/collateral.a00047453enw.html', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'hpe-dl380a-gen11', vendor: 'HPE', model: 'ProLiant DL380a Gen11', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 2, depthMm: 816, pcieGeneration: 5, gpuTopology: 'direct', maxDoubleWidthGpus: 4, maxSingleWidthGpus: 8, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: ['passive', 'active'], systemCooling: ['air'], cpu: '۲× نسل چهارم یا پنجم Intel Xeon Scalable', memory: '۲۴ اسلات DDR5؛ تا ۳ ترابایت و ۵۶۰۰ MT/s',
    storage: 'پیکربندی‌های SFF/NVMe طبق QuickSpecs', expansion: 'PCIe Gen5؛ تا ۴ DW یا ۸ SW', power: 'PSU و کابل GPU وابسته به نوع و تعداد شتاب‌دهنده',
    validatedGpuIds: ['l40s', 'l4', 'a10', 'rtx-6000-ada'], acceleratorSummary: '۴ کارت دو اسلات یا ۸ کارت تک‌اسلات در ۲U',
    bestFor: 'وقتی ارتفاع ۲U مهم‌تر از تراکم ۸ کارت دو اسلات است.', caution: 'برای کارت‌های پرتوان، محدودیت دمای محیط، heatsink و کابل برق در QuickSpecs را جداگانه بررسی کنید.',
    sourceLabel: 'HPE DL380a Gen11 QuickSpecs', sourceUrl: 'https://www.hpe.com/us/en/collaterals/collateral.a50004309enw.html', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'hpe-dl345-gen12', vendor: 'HPE', model: 'ProLiant Compute DL345 Gen12', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 2, depthMm: null, pcieGeneration: 5, gpuTopology: 'direct', maxDoubleWidthGpus: 4, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: ['passive'], systemCooling: ['air'], cpu: '۱× نسل پنجم AMD EPYC؛ تا ۱۹۲ هسته', memory: 'تا ۶ ترابایت DDR5',
    storage: 'تا ۱۲ LFF، ۲۴ SFF یا ۳۶ EDSFF بسته به پیکربندی', expansion: 'PCIe Gen5؛ تا ۴ کارت دو اسلات در جلو', power: 'وابسته به GPU و پیکربندی HPE',
    validatedGpuIds: ['rtx-pro-4500-bse', 'l40s', 'l4'], acceleratorSummary: 'تا ۴ کارت دو اسلات در شاسی ۲U تک‌سوکت',
    bestFor: 'استنتاج سازمانی با CPU تک‌سوکت و هزینه/فضای کمتر.', caution: 'پشتیبانی مدل دقیق GPU را با شمارهٔ قطعهٔ HPE بررسی کنید؛ سقف چهار کارت به معنی پشتیبانی همهٔ کارت‌های ۶۰۰ وات نیست.',
    sourceLabel: 'HPE DL345 Gen12 QuickSpecs', sourceUrl: 'https://www.hpe.com/us/en/collaterals/collateral.a50009233enw.html', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'lenovo-sr675-v3', vendor: 'Lenovo', model: 'ThinkSystem SR675 V3', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 3, depthMm: 892, pcieGeneration: 5, gpuTopology: 'switched', maxDoubleWidthGpus: 8, maxSingleWidthGpus: 8, maxTripleWidthGpus: 0, maxGpuPowerW: 600,
    cardCooling: ['passive', 'active'], systemCooling: ['air', 'dlc'], cpu: 'تا ۲× AMD EPYC 9005/9004؛ تا ۱۶۰ هسته', memory: '۲۴ اسلات DDR5؛ تا ۶ ترابایت و ۶۴۰۰ MT/s',
    storage: '۸× ۲٫۵ اینچ یا ۶× E1.S یا ۴× E3.S، وابسته به shuttle', expansion: 'GPUها روی PCIe Gen5 x16؛ تا ۶ شیار Gen5 تکمیلی و OCP 3.0', power: 'PSUهای ۱۸۰۰ یا ۲۴۰۰ وات؛ طول شاسی با PSU تغییر می‌کند',
    validatedGpuIds: ['h200-nvl', 'rtx-pro-6000-bse', 'l40s'], acceleratorSummary: 'تا ۸ کارت FHFL دو اسلات ۶۰۰ وات؛ همچنین نسخهٔ HGX چهار GPU',
    bestFor: 'تراکم ۸ کارت Gen5 در ۳U و انتخاب میان PCIe و HGX در یک خانواده.', caution: 'front shuttle تعیین می‌کند مدل ۴-DW، ۸-DW یا SXM باشد؛ این سه BOM قابل‌جایگزینی ذهنی نیستند.',
    sourceLabel: 'Lenovo ThinkSystem SR675 V3 Product Guide', sourceUrl: 'https://lenovopress.lenovo.com/lp1611-thinksystem-sr675-v3-server', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'lenovo-sr655-v3', vendor: 'Lenovo', model: 'ThinkSystem SR655 V3', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 2, depthMm: null, pcieGeneration: 5, gpuTopology: 'direct', maxDoubleWidthGpus: 3, maxSingleWidthGpus: 8, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: ['passive', 'active'], systemCooling: ['air'], cpu: '۱× AMD EPYC 9005/9004؛ تا ۱۶۰ هسته', memory: '۱۲ اسلات DDR5؛ تا ۳ ترابایت و ۶۴۰۰ MT/s',
    storage: 'تا ۴۰× ۲٫۵ اینچ با ترکیب bayهای جلو/میانی/عقب', expansion: 'PCIe Gen5؛ تا ۳ DW یا ۸ SW', power: 'وابسته به riser، GPU و configurator لنوو',
    validatedGpuIds: ['l40s', 'l4', 'a10', 'rtx-6000-ada'], acceleratorSummary: '۳ کارت دو اسلات یا ۸ کارت تک‌اسلات',
    bestFor: 'گره ۲U تک‌سوکت با تمرکز هم‌زمان بر GPU و ذخیره‌سازی متراکم.', caution: 'اعلام قدیمی ۶ کارت DW به پیکربندی‌های نخستین مربوط بود؛ راهنمای جاری سقف ۳ DW را اعلام می‌کند.',
    sourceLabel: 'Lenovo ThinkSystem SR655 V3 Product Guide', sourceUrl: 'https://lenovopress.lenovo.com/lp1610-thinksystem-sr655-v3-server', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'supermicro-sys-422ga-nrt', vendor: 'Supermicro', model: 'GPU SuperServer SYS-422GA-NRT', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: 737, pcieGeneration: 5, gpuTopology: 'switched', maxDoubleWidthGpus: 8, maxSingleWidthGpus: 8, maxTripleWidthGpus: 0, maxGpuPowerW: 600,
    cardCooling: ['passive', 'active'], systemCooling: ['air'], cpu: '۲× Intel Xeon 6900 P-core؛ تا ۱۲۸ هسته', memory: '۲۴ اسلات DDR5؛ تا ۶ ترابایت',
    storage: 'طبق SKU؛ NVMe hot-swap و M.2 بوت', expansion: 'تا ۱۳× PCIe Gen5 x16 FHFL؛ ۸ جایگاه GPU', power: 'منابع تغذیهٔ افزونه‌پذیر پرتوان؛ BOM وابسته به GPU',
    validatedGpuIds: ['rtx-pro-6000-bse'], acceleratorSummary: 'تا ۸ کارت دو اسلات ۶۰۰ وات در ۳۵°C',
    bestFor: 'PCIe Gen5 پرتوان با شیارهای شبکه/BlueField فراوان.', caution: 'سقف دمای محیط و تعداد BlueField در پیکربندی پرتوان بخشی از شرط سازگاری است.',
    sourceLabel: 'Supermicro SYS-422GA-NRT Datasheet', sourceUrl: 'https://www.supermicro.com/en/products/system/datasheet/sys-422ga-nrt', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'supermicro-as-4125gs-tnrt2', vendor: 'Supermicro', model: 'GPU A+ Server AS-4125GS-TNRT2', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 5, gpuTopology: 'switched', maxDoubleWidthGpus: 10, maxSingleWidthGpus: 10, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: ['passive', 'active'], systemCooling: ['air'], cpu: '۲× AMD EPYC 9005/9004؛ تا ۴۰۰ وات برای هر CPU', memory: '۲۴ اسلات DDR5',
    storage: 'پیکربندی‌های hot-swap NVMe/SAS/SATA', expansion: 'PCIe Gen5 با switch؛ تا ۱۰ GPU FHFL دو اسلات', power: 'وابسته به کارت و BOM؛ فن‌های heavy-duty hot-swap',
    validatedGpuIds: ['h200-nvl', 'h100-pcie', 'l40s', 'rtx-pro-6000-bse'], acceleratorSummary: 'تا ۱۰ کارت دو اسلات active یا passive',
    bestFor: 'بیشترین تعداد کارت دو اسلات در یک شاسی ۴U مبتنی بر AMD.', caution: 'عدد ۱۰ به معنای ۱۰ کارت در هر توان و هر دمای محیط نیست؛ QPL مدل کارت معیار نهایی است.',
    sourceLabel: 'Supermicro AS-4125GS-TNRT2 Datasheet', sourceUrl: 'https://www.supermicro.com/en/products/system/datasheet/as-4125gs-tnrt2', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'supermicro-sys-421ge-tnrt3', vendor: 'Supermicro', model: 'GPU SuperServer SYS-421GE-TNRT3', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 5, gpuTopology: 'switched', maxDoubleWidthGpus: 8, maxSingleWidthGpus: 8, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: ['passive', 'active'], systemCooling: ['air'], cpu: '۲× نسل چهارم/پنجم Intel Xeon Scalable', memory: 'DDR5؛ ظرفیت وابسته به DIMM/QPL',
    storage: 'پیکربندی‌های NVMe/SATA/SAS', expansion: 'PCIe Gen5؛ ۸ GPU دو اسلات', power: 'وابسته به مدل GPU و QPL',
    validatedGpuIds: ['h200-nvl', 'h100-nvl', 'h100-pcie', 'l40s', 'l4', 'rtx-6000-ada'], acceleratorSummary: '۸ کارت PCIe دو اسلات؛ فهرست QPL رسمی و کارت‌به‌کارت',
    bestFor: 'تنوع زیاد کارت‌های تأییدشده از Hopper تا Ada.', caution: 'نسل رابط واقعی هر کارت متفاوت است؛ L40S در شیار Gen5 همچنان کارت Gen4 باقی می‌ماند.',
    sourceLabel: 'Supermicro Qualified Platform List', sourceUrl: 'https://www.supermicro.com/en/support/resources/gpu', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'gigabyte-g494-sb0-aap2', vendor: 'GIGABYTE', model: 'G494-SB0-AAP2', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 5, gpuTopology: 'switched', maxDoubleWidthGpus: 8, maxSingleWidthGpus: 8, maxTripleWidthGpus: 0, maxGpuPowerW: 600,
    cardCooling: ['passive'], systemCooling: ['air'], cpu: '۲× Intel Xeon 6700/6500', memory: '۳۲ اسلات DDR5 RDIMM/MRDIMM؛ ۸ کانال برای هر CPU',
    storage: '۸× ۲٫۵ اینچ Gen5 NVMe/SATA/SAS-4 + ۴× SATA/SAS-4', expansion: '۸× FHFL PCIe Gen5 x16 برای GPU + شیار جلویی Gen5', power: '۴× ۳۰۰۰ وات Titanium افزونه‌پذیر',
    validatedGpuIds: ['h200-nvl', 'rtx-pro-6000-bse'], acceleratorSummary: '۸ کارت Gen5 دو اسلات؛ تا ۶۰۰ وات با fan kit اختیاری',
    bestFor: 'هشت کارت PCIe Gen5 همراه با ذخیره‌سازی جلویی متنوع.', caution: 'پیکربندی ۸×۶۰۰ وات به fan kit و دمای محیط ۲۵°C مقید شده است.',
    sourceLabel: 'GIGABYTE G494-SB0-AAP2', sourceUrl: 'https://www.gigabyte.com/us/Enterprise/GPU-Server/G494-SB0-AAP2', sourceTier: 'سازنده'
  },
  {
    id: 'gigabyte-g494-zb4-aap2', vendor: 'GIGABYTE', model: 'G494-ZB4-AAP2', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 5, gpuTopology: 'switched', maxDoubleWidthGpus: 8, maxSingleWidthGpus: 8, maxTripleWidthGpus: 0, maxGpuPowerW: 600,
    cardCooling: ['passive'], systemCooling: ['air'], cpu: '۲× AMD EPYC 9005/9004', memory: '۴۸ اسلات DDR5؛ ۱۲ کانال برای هر CPU',
    storage: '۱۲× ۲٫۵ اینچ Gen5 NVMe/SATA/SAS-4', expansion: '۸× FHFL PCIe Gen5 x16 برای GPU', power: '۴× ۳۰۰۰ وات Titanium افزونه‌پذیر',
    validatedGpuIds: ['h200-nvl', 'rtx-pro-6000-bse'], acceleratorSummary: '۸ کارت Gen5 دو اسلات؛ پشتیبانی کارت‌های ۶۰۰ وات مشروط',
    bestFor: 'هشت GPU با پهنای‌باند حافظهٔ CPU بیشترِ پلتفرم EPYC.', caution: 'واژهٔ «conditionally supports» در صفحهٔ سازنده مهم است؛ fan kit و شرایط محیطی را در BOM درج کنید.',
    sourceLabel: 'GIGABYTE G494-ZB4-AAP2', sourceUrl: 'https://www.gigabyte.com/Enterprise/GPU-Server/G494-ZB4-AAP2', sourceTier: 'سازنده'
  },
  {
    id: 'asus-esc8000a-e13', vendor: 'ASUS', model: 'ESC8000A-E13', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 5, gpuTopology: 'direct', maxDoubleWidthGpus: 8, maxSingleWidthGpus: 8, maxTripleWidthGpus: 0, maxGpuPowerW: 600,
    cardCooling: ['passive', 'active'], systemCooling: ['air'], cpu: '۲× AMD EPYC 9005/9004؛ تا ۱۹۲ هسته', memory: '۲۴ اسلات DDR5؛ تا ۶۴۰۰ MHz',
    storage: 'تا ۶× U.2 NVMe', expansion: '۸ جایگاه GPU دو اسلات + ۲ شیار PCIe Gen5', power: 'منابع تغذیهٔ افزونه‌پذیر؛ وابسته به پیکربندی',
    validatedGpuIds: ['h200-nvl', 'rtx-pro-6000-bse', 'rtx-pro-4500-bse'], acceleratorSummary: '۸ کارت دو اسلات active یا passive؛ تا ۶۰۰ وات',
    bestFor: 'کارت‌های PCIe Gen5 جدید با پشتیبانی هم‌زمان NVIDIA و AMD Instinct PCIe.', caution: 'مدل AMD MI350P در صفحهٔ رسمی ذکر شده، اما OAM و HGX را نباید با نسخهٔ PCIe آن یکسان فرض کرد.',
    sourceLabel: 'ASUS ESC8000A-E13', sourceUrl: 'https://servers.asus.com/products/Servers/GPU-Servers/ESC8000A-E13/', sourceTier: 'سازنده'
  },
  {
    id: 'asus-esc8000a-e12', vendor: 'ASUS', model: 'ESC8000A-E12', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 5, gpuTopology: 'direct', maxDoubleWidthGpus: 8, maxSingleWidthGpus: 8, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: ['passive', 'active'], systemCooling: ['air'], cpu: '۲× AMD EPYC 9004', memory: '۲۴ اسلات DDR5',
    storage: 'Dual NVMe؛ جزئیات بیشتر در datasheet', expansion: '۱۱ شیار PCIe Gen5؛ ۸ GPU دو اسلات', power: '۴× ۳۰۰۰ وات Titanium',
    validatedGpuIds: ['h100-pcie', 'l40s'], acceleratorSummary: '۸ کارت دو اسلات active یا passive',
    bestFor: 'نسل جاری EPYC 9004 و کارت‌های PCIe Gen5/Gen4 در شاسی ۴U.', caution: 'برای H100، نوع PCIe با HGX H100 متفاوت است؛ صفحهٔ GPU Compatibility ملاک part number است.',
    sourceLabel: 'ASUS ESC8000A-E12', sourceUrl: 'https://servers.asus.com/products/Servers/GPU-Servers/ESC8000A-E12', sourceTier: 'سازنده'
  },
  {
    id: 'asrock-4u8g-egs2', vendor: 'ASRock Rack', model: '4U8G-EGS2', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 5, gpuTopology: 'direct', maxDoubleWidthGpus: 8, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: ['passive'], systemCooling: ['air'], cpu: '۲× نسل چهارم/پنجم Intel Xeon Scalable', memory: '۳۲ اسلات DDR5',
    storage: '۴× NVMe + تا ۱۲× SATA/SAS', expansion: '۸× FHFL dual-slot PCIe Gen5 x16 مستقیم به CPU + شیارهای تکمیلی', power: '۳+۱× ۱۶۰۰ وات CRPS Platinum',
    validatedGpuIds: [], acceleratorSummary: '۸ جایگاه دو اسلات Gen5 با اتصال مستقیم CPU',
    bestFor: 'کاربری‌ای که topology مستقیم را به PCIe switch ترجیح می‌دهد.', caution: 'توان PSU درج‌شده سقف پشتیبانی هر GPU را ثابت نمی‌کند؛ مدل کارت باید در فهرست تأیید سازنده باشد.',
    sourceLabel: 'ASRock Rack 4U8G-EGS2', sourceUrl: 'https://www.asrockrack.com/general/productdetail.asp?Model=4U8G-EGS2', sourceTier: 'سازنده'
  },
  {
    id: 'fujitsu-gx2550-m8s', vendor: 'Fujitsu', model: 'PRIMERGY GX2550 M8s', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 5, gpuTopology: 'switched', maxDoubleWidthGpus: 8, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: 600,
    cardCooling: ['passive'], systemCooling: ['air'], cpu: '۲× Intel Xeon 6', memory: 'DDR5؛ ظرفیت دقیق طبق configurator منطقه‌ای',
    storage: 'طبق configurator PRIMERGY', expansion: 'تا ۸ کارت PCIe دو اسلات', power: 'وابسته به پیکربندی کارت و منطقه',
    validatedGpuIds: ['h200-nvl', 'rtx-pro-6000-bse'], acceleratorSummary: '۸ کارت دو اسلات، از جمله H200 NVL و RTX PRO 6000',
    bestFor: 'سازمان‌هایی که چرخهٔ پشتیبانی PRIMERGY و هشت کارت PCIe را هم‌زمان می‌خواهند.', caution: 'مشخصات منطقه‌ای PRIMERGY ممکن است متفاوت باشد؛ configurator همان کشور مرجع خرید است.',
    sourceLabel: 'Fujitsu PRIMERGY Server Portfolio', sourceUrl: 'https://www.fujitsu.com/es/products/computing/servers/', sourceTier: 'سازنده'
  },
  {
    id: 'qct-d75t-7u', vendor: 'QCT', model: 'QuantaGrid D75T-7U', status: 'announced', acceleratorForm: 'pcie-card',
    heightU: 7, depthMm: null, pcieGeneration: 5, gpuTopology: 'switched', maxDoubleWidthGpus: 8, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: 600,
    cardCooling: ['passive'], systemCooling: ['air'], cpu: '۲× AMD EPYC 9005', memory: '۲۴ اسلات DDR5؛ تا ۳ ترابایت در اطلاعات اولیه',
    storage: 'اطلاعات نهایی محصول در انتظار انتشار', expansion: '۸× PCIe Gen5 x16 برای GPU دو اسلات', power: 'اطلاعات نهایی در انتظار انتشار',
    validatedGpuIds: [], acceleratorSummary: 'تا ۸ کارت DW ششصدوات؛ محصول در وضعیت coming soon',
    bestFor: 'رصد گزینه‌های جدید QCT برای نسل PCIe 5، نه خرید فوری بدون datasheet نهایی.', caution: 'این محصول هنوز «coming soon» است؛ تا انتشار datasheet و configurator نباید مبنای سفارش قطعی قرار گیرد.',
    sourceLabel: 'QCT GPGPU Server Portfolio', sourceUrl: 'https://www.qct.io/product/index/Server/rackmount-server/GPGPU-Xeon-Phi', sourceTier: 'سازنده'
  },
  {
    id: 'gigabyte-g495-db1-am1', vendor: 'GIGABYTE', model: 'G495-DB1-AM1', status: 'announced', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 6, gpuTopology: 'switched', maxDoubleWidthGpus: 10, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: ['passive'], systemCooling: ['air'], cpu: '۲× AMD EPYC 9006 SP7', memory: '۳۲ اسلات DDR5؛ ۱۶ کانال برای هر CPU',
    storage: '۱۲× ۲٫۵ اینچ Gen5 NVMe/SATA/SAS-4 + ۲× M.2', expansion: '۱۰× FHFL PCIe Gen6 x16 برای GPU + ۲ شیار Gen6 جلویی', power: '۴× ۳۲۰۰ وات Titanium',
    validatedGpuIds: [], acceleratorSummary: '۱۰ کارت دو اسلات PCIe Gen6؛ هنوز عرضه نشده',
    bestFor: 'برنامه‌ریزی نسل بعد، زمانی که Gen6 واقعاً الزام کارت یا شبکه باشد.', caution: 'سازنده صریحاً To be released نوشته است؛ این رکورد برای roadmap است، نه پیشنهاد خرید امروز.',
    sourceLabel: 'GIGABYTE G495-DB1-AM1', sourceUrl: 'https://www.gigabyte.com/Enterprise/GPU-Server/G495-DB1-AM1', sourceTier: 'سازنده'
  },
  {
    id: 'supermicro-sys-420gp-tnr', vendor: 'Supermicro', model: 'GPU SuperServer SYS-420GP-TNR', status: 'legacy', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: 737, pcieGeneration: 4, gpuTopology: 'switched', maxDoubleWidthGpus: 10, maxSingleWidthGpus: 10, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: ['passive', 'active'], systemCooling: ['air'], cpu: '۲× نسل سوم Intel Xeon Scalable', memory: '۳۲ اسلات DDR4؛ تا ۸ ترابایت',
    storage: '۲۴× ۲٫۵ اینچ hot-swap؛ ۸ NVMe + ۱۶ SATA/SAS', expansion: '۱۲× PCIe Gen4 x16 FHFL؛ تا ۱۰ GPU', power: '۴× ۲۰۰۰ وات Titanium',
    validatedGpuIds: ['h100-pcie', 'a100-pcie', 'a40', 'a10', 'l40s', 'rtx-a6000'], acceleratorSummary: 'تا ۱۰ کارت تک یا دو اسلات PCIe 4',
    bestFor: 'کارت‌های PCIe 4 در بازار دست‌دوم با تراکم بالا.', caution: 'H100 PCIe روی این سامانه در Gen4 کار می‌کند؛ برای کارت Gen5 گزینهٔ full-speed نیست.',
    sourceLabel: 'Supermicro SYS-420GP-TNR Datasheet', sourceUrl: 'https://www.supermicro.com/en/products/system/datasheet/sys-420gp-tnr', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'asus-esc8000a-e11', vendor: 'ASUS', model: 'ESC8000A-E11', status: 'legacy', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 4, gpuTopology: 'direct', maxDoubleWidthGpus: 8, maxSingleWidthGpus: 8, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: ['passive', 'active'], systemCooling: ['air'], cpu: '۲× AMD EPYC 7003', memory: 'DDR4؛ جزئیات در datasheet',
    storage: 'Dual NVMe + Dual M.2', expansion: '۸ GPU دو اسلات PCIe 4', power: '۴× ۳۰۰۰ وات Titanium',
    validatedGpuIds: ['a100-pcie', 'a40', 'a10', 'rtx-a6000'], acceleratorSummary: '۸ کارت دو اسلات active یا passive PCIe 4',
    bestFor: 'کارت‌های Ampere/RTX A در بازار دست‌دوم.', caution: 'با ESC8000-E11 مبتنی بر Intel و PCIe 5 اشتباه نشود؛ حرف A در نام مدل نشان‌دهندهٔ پلتفرم AMD است.',
    sourceLabel: 'ASUS ESC8000A-E11', sourceUrl: 'https://servers.asus.com/products/servers/gpu-servers/ESC8000A-E11', sourceTier: 'سازنده'
  },
  {
    id: 'gigabyte-g492-h80', vendor: 'GIGABYTE', model: 'G492-H80', status: 'legacy', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 4, gpuTopology: 'direct', maxDoubleWidthGpus: 8, maxSingleWidthGpus: 8, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: ['passive'], systemCooling: ['air'], cpu: '۲× نسل سوم Intel Xeon Scalable', memory: '۳۲ اسلات DDR4؛ ۸ کانال برای هر CPU',
    storage: '۱۲× ۳٫۵/۲٫۵ اینچ SATA hot-swap', expansion: '۸× FHFL PCIe Gen4 x16 برای GPU', power: 'منابع تغذیهٔ افزونه‌پذیر 80 PLUS Platinum',
    validatedGpuIds: ['a100-pcie', 'a40', 'a10'], acceleratorSummary: '۸ کارت دو اسلات PCIe 4؛ وضعیت Legacy با firmware support',
    bestFor: 'زیرساخت PCIe 4 دست‌دوم با پشتیبانی firmware سازنده.', caution: 'سازنده مدل را Legacy اعلام کرده است؛ موجودی قطعه و مدت پشتیبانی را پیش از خرید بررسی کنید.',
    sourceLabel: 'GIGABYTE G492-H80', sourceUrl: 'https://www.gigabyte.com/Enterprise/GPU-Server/G492-H80-rev-100', sourceTier: 'سازنده'
  },
  {
    id: 'asrock-4u10g-rome2', vendor: 'ASRock Rack', model: '4U10G-ROME2/2T', status: 'legacy', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 4, gpuTopology: 'direct', maxDoubleWidthGpus: 10, maxSingleWidthGpus: 20, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: ['passive'], systemCooling: ['air'], cpu: '۲× AMD EPYC 7003/7002', memory: '۳۲ اسلات DDR4',
    storage: '۱۲× ۳٫۵ اینچ hot-swap + M.2 Gen4', expansion: '۱۰× dual-slot Gen4 x16 یا ۲۰× single-slot Gen4 x8 + یک FHFL x16', power: '۳+۱× ۱۶۰۰ وات CRPS',
    validatedGpuIds: [], acceleratorSummary: '۱۰ کارت دو اسلات x16 یا ۲۰ کارت تک‌اسلات x8',
    bestFor: 'تعداد زیاد کارت کم‌مصرف PCIe 4 یا کارت‌های دو اسلات نسل قبل.', caution: 'در حالت ۲۰ کارت، اتصال هر کارت x8 است؛ تعداد شیار را با پهنای‌باند x16 اشتباه نگیرید.',
    sourceLabel: 'ASRock Rack 4U10G-ROME2/2T', sourceUrl: 'https://www.asrockrack.com/general/productdetail.asp?Model=4U10G-ROME2%2F2T', sourceTier: 'سازنده'
  },
  {
    id: 'supermicro-sys-532aw-c', vendor: 'Supermicro', model: 'SuperWorkstation SYS-532AW-C', status: 'current', acceleratorForm: 'pcie-card',
    heightU: 4, depthMm: null, pcieGeneration: 5, gpuTopology: 'direct', maxDoubleWidthGpus: 1, maxSingleWidthGpus: 1, maxTripleWidthGpus: 1, maxGpuPowerW: 575,
    cardCooling: ['active'], systemCooling: ['air'], cpu: 'Intel Core Ultra Series 2', memory: 'DDR5 ECC UDIMM؛ وابسته به پیکربندی',
    storage: 'پلتفرم workstation؛ جزئیات در صفحهٔ محصول', expansion: 'یک GPU سه‌اسلات active در QPL', power: 'وابسته به BOM workstation',
    validatedGpuIds: ['rtx-5090'], acceleratorSummary: 'یک GeForce RTX 5090 سه‌اسلات به‌صورت رسمی در QPL',
    bestFor: 'یک کارت مصرفی پرتوان که واقعاً در QPL سازنده آمده است.', caution: 'این workstation است، نه سرور ۸-GPU؛ برای RTX 4090 نیز تأیید جداگانه لازم است.',
    sourceLabel: 'Supermicro Qualified Platform List', sourceUrl: 'https://www.supermicro.com/en/support/resources/gpu', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'nvidia-dgx-b200', vendor: 'NVIDIA', model: 'DGX B200', status: 'current', acceleratorForm: 'integrated',
    heightU: 10, depthMm: 897.1, pcieGeneration: 5, gpuTopology: 'baseboard', maxDoubleWidthGpus: 0, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: 1000,
    cardCooling: [], systemCooling: ['air'], cpu: '۲× Intel Xeon 8570؛ هرکدام ۵۶ هسته', memory: '۲ ترابایت؛ قابل ارتقا تا ۴ ترابایت',
    storage: '۲× ۱٫۹۲TB M.2 RAID1 + ۸× ۳٫۸۴TB U.2 data cache', expansion: '۸× B200 روی HGX/NVSwitch؛ کارت PCIe قابل انتخاب نیست', power: '۶× ۳٫۳kW؛ افزونگی ۵+۱؛ حداکثر سامانه ۱۴٫۳kW',
    validatedGpuIds: [], acceleratorSummary: '۸× B200 یکپارچه؛ ۱۴۴۰GB حافظهٔ GPU',
    bestFor: 'آموزش و استنتاج بزرگ‌مقیاس با سامانهٔ یکپارچه و پشتهٔ DGX.', caution: 'برای کسی که کارت PCIe خریده گزینه نیست؛ GPUها بخشی از سامانهٔ HGX هستند.',
    sourceLabel: 'NVIDIA DGX B200 User Guide', sourceUrl: 'https://docs.nvidia.com/dgx/dgxb200-user-guide/introduction-to-dgxb200.html', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'dell-poweredge-xe9680', vendor: 'Dell', model: 'PowerEdge XE9680', status: 'current', acceleratorForm: 'integrated',
    heightU: 6, depthMm: 995, pcieGeneration: 5, gpuTopology: 'baseboard', maxDoubleWidthGpus: 0, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: 900,
    cardCooling: [], systemCooling: ['air'], cpu: '۲× نسل چهارم/پنجم Intel Xeon Scalable', memory: '۳۲ اسلات DDR5؛ تا ۴ ترابایت',
    storage: 'تا ۸× ۲٫۵ اینچ یا ۱۶× E3.S', expansion: '۸ شتاب‌دهندهٔ HGX/OAM یکپارچه', power: '۶ PSU؛ افزونگی ۵+۱',
    validatedGpuIds: [], acceleratorSummary: '۸× H100/H200 SXM5 یا MI300X/Gaudi3 OAM',
    bestFor: 'انتخاب یک سامانهٔ ۸ شتاب‌دهندهٔ یکپارچه با چند اکوسیستم GPU/OAM.', caution: 'هیچ‌یک از گزینه‌های GPU این رکورد کارت PCIe خریداری‌شدهٔ کاربر نیستند.',
    sourceLabel: 'Dell PowerEdge XE9680 — Tech Specs', sourceUrl: 'https://www.dell.com/en-us/shop/ipovw/poweredge-xe9680', sourceTier: 'سازنده'
  },
  {
    id: 'dell-poweredge-xe9680l', vendor: 'Dell', model: 'PowerEdge XE9680L', status: 'current', acceleratorForm: 'integrated',
    heightU: 4, depthMm: null, pcieGeneration: 5, gpuTopology: 'baseboard', maxDoubleWidthGpus: 0, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: 1000,
    cardCooling: [], systemCooling: ['dlc'], cpu: '۲× Intel Xeon Scalable', memory: 'DDR5؛ وابسته به پیکربندی',
    storage: 'NVMe؛ وابسته به پیکربندی', expansion: '۸× H200 یا B200 روی HGX', power: 'زیرساخت direct liquid cooling الزامی',
    validatedGpuIds: [], acceleratorSummary: '۸× H200 یا B200 HGX در شاسی ۴U مایع‌خنک',
    bestFor: 'تراکم HGX بالا در مرکز دادهٔ آمادهٔ DLC.', caution: 'عبارت PCIe در ارتباط داخلی محصول به معنی امکان نصب کارت PCIe دلخواه نیست.',
    sourceLabel: 'Dell PowerEdge XE9680L — Tech Specs', sourceUrl: 'https://www.dell.com/en-us/shop/ipovw/poweredge-xe9680l', sourceTier: 'سازنده'
  },
  {
    id: 'hpe-xd685', vendor: 'HPE', model: 'ProLiant Compute XD685', status: 'current', acceleratorForm: 'integrated',
    heightU: 6, depthMm: null, pcieGeneration: 5, gpuTopology: 'baseboard', maxDoubleWidthGpus: 0, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: [], systemCooling: ['air', 'dlc'], cpu: '۲× نسل پنجم AMD EPYC', memory: '۲۴ اسلات DDR5-6400؛ ۱۲ کانال برای هر CPU',
    storage: 'طبق QuickSpecs', expansion: '۸ شتاب‌دهندهٔ HGX/OAM یکپارچه', power: '۵U برای DLC یا ۶U برای air؛ وابسته به GPU',
    validatedGpuIds: [], acceleratorSummary: '۸× B300/B200/H200 یا AMD MI355X',
    bestFor: 'نسل‌های Blackwell Ultra و MI355X با انتخاب air یا DLC.', caution: 'ارتفاع ۵U فقط نسخهٔ DLC است؛ نسخهٔ air برابر ۶U است و H200 تنها گزینهٔ air اعلام‌شده است.',
    sourceLabel: 'HPE ProLiant Compute XD685 QuickSpecs', sourceUrl: 'https://www.hpe.com/us/en/collaterals/collateral.a00073553enw.html', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'hpe-xd670', vendor: 'HPE', model: 'Cray XD670', status: 'current', acceleratorForm: 'integrated',
    heightU: 5, depthMm: null, pcieGeneration: 5, gpuTopology: 'baseboard', maxDoubleWidthGpus: 0, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: 700,
    cardCooling: [], systemCooling: ['air', 'dlc'], cpu: '۲× نسل چهارم/پنجم Intel Xeon Scalable', memory: 'تا ۳۲ DIMM DDR5-5600',
    storage: 'تا ۱۶ NVMe + ۸ SAS/SATA + M.2', expansion: '۸× H100/H200 SXM5 یکپارچه؛ ۸ شیار HHHL برای fabric', power: 'کیت‌های چند PSU پرتوان؛ طبق QuickSpecs',
    validatedGpuIds: [], acceleratorSummary: '۸× H100 یا H200 SXM5؛ کارت PCIe پشتیبانی نمی‌شود',
    bestFor: 'آموزش مدل بزرگ روی H100/H200 با انتخاب air یا direct liquid cooling.', caution: 'HPE صریحاً نوشته است PCIe GPU پشتیبانی نمی‌شود.',
    sourceLabel: 'HPE Cray XD670 QuickSpecs', sourceUrl: 'https://www.hpe.com/us/en/collaterals/collateral.a50004292enw.html', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'lenovo-sr680a-v4', vendor: 'Lenovo', model: 'ThinkSystem SR680a V4', status: 'current', acceleratorForm: 'integrated',
    heightU: 8, depthMm: null, pcieGeneration: 5, gpuTopology: 'baseboard', maxDoubleWidthGpus: 0, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: [], systemCooling: ['air'], cpu: '۲× Intel Xeon 6', memory: 'DDR5؛ طبق Product Guide',
    storage: 'NVMe؛ طبق Product Guide', expansion: '۸× NVIDIA B300 HGX', power: 'زیرساخت برق پرتوان؛ طبق Product Guide',
    validatedGpuIds: [], acceleratorSummary: '۸× B300 HGX یکپارچه در ۸U air-cooled',
    bestFor: 'Blackwell Ultra در مرکزی که خنک‌کاری مایع ندارد.', caution: 'سامانهٔ air-cooled هشت‌یونیتی است و برای کارت PCIe مستقل طراحی نشده است.',
    sourceLabel: 'Lenovo ThinkSystem SR680a V4 Product Guide', sourceUrl: 'https://lenovopress.lenovo.com/lp2264-thinksystem-sr680a-v4-server', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'lenovo-sr680a-v3', vendor: 'Lenovo', model: 'ThinkSystem SR680a V3', status: 'current', acceleratorForm: 'integrated',
    heightU: 8, depthMm: null, pcieGeneration: 5, gpuTopology: 'baseboard', maxDoubleWidthGpus: 0, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: 1000,
    cardCooling: [], systemCooling: ['air'], cpu: '۲× نسل پنجم Intel Xeon Scalable', memory: 'DDR5؛ طبق Product Guide',
    storage: 'NVMe؛ طبق Product Guide', expansion: '۸× H100/H200 یا B200 HGX، وابسته به مدل', power: 'زیرساخت برق پرتوان؛ طبق Product Guide',
    validatedGpuIds: [], acceleratorSummary: '۸ شتاب‌دهندهٔ HGX یکپارچه در ۸U air-cooled',
    bestFor: 'H100/H200/B200 با پلتفرم سازمانی Lenovo.', caution: 'نسخهٔ B200 راهنمای محصول جدا دارد؛ پیکربندی‌ها را قابل تبدیل ساده فرض نکنید.',
    sourceLabel: 'Lenovo ThinkSystem SR680a V3 Product Guide', sourceUrl: 'https://lenovopress.lenovo.com/lp1909-thinksystem-sr680a-v3-server', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'lenovo-sr685a-v3', vendor: 'Lenovo', model: 'ThinkSystem SR685a V3', status: 'legacy', acceleratorForm: 'integrated',
    heightU: 8, depthMm: null, pcieGeneration: 5, gpuTopology: 'baseboard', maxDoubleWidthGpus: 0, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: 750,
    cardCooling: [], systemCooling: ['air'], cpu: '۲× AMD EPYC 9005/9004', memory: '۲۴ اسلات DDR5؛ تا ۳ ترابایت',
    storage: 'تا ۱۶× ۲٫۵ اینچ NVMe + M.2 بوت', expansion: '۸× H100/H200 SXM5 یا MI300X OAM؛ ۱۰ شیار Gen5 برای شبکه', power: 'تا ۸ PSU hot-swap',
    validatedGpuIds: [], acceleratorSummary: '۸× H100/H200 یا MI300X یکپارچه',
    bestFor: 'انتخاب میان NVIDIA HGX و AMD MI300X در پلتفرم Lenovo.', caution: 'datasheet این مدل withdrawn است؛ برای سفارش جدید نسل جایگزین را نیز بررسی کنید.',
    sourceLabel: 'Lenovo ThinkSystem SR685a V3 Product Guide', sourceUrl: 'https://lenovopress.lenovo.com/lp1910-thinksystem-sr685a-v3-server', sourceTier: 'راهنمای فنی سازنده'
  },
  {
    id: 'fujitsu-gx2580-m8s', vendor: 'Fujitsu', model: 'PRIMERGY GX2580 M8s', status: 'current', acceleratorForm: 'integrated',
    heightU: 8, depthMm: null, pcieGeneration: 5, gpuTopology: 'baseboard', maxDoubleWidthGpus: 0, maxSingleWidthGpus: null, maxTripleWidthGpus: 0, maxGpuPowerW: null,
    cardCooling: [], systemCooling: ['air'], cpu: '۲× Intel Xeon 6', memory: 'DDR5؛ طبق configurator منطقه‌ای',
    storage: 'طبق configurator PRIMERGY', expansion: '۸× NVIDIA HGX B300 با NVLink نسل پنجم', power: 'وابسته به پیکربندی و منطقه',
    validatedGpuIds: [], acceleratorSummary: '۸× B300 HGX؛ ۲٫۳ ترابایت HBM3e در سامانه',
    bestFor: 'زیرساخت B300 با چرخهٔ پشتیبانی PRIMERGY.', caution: 'محصول یکپارچه است؛ برای نصب کارت PCIe خریداری‌شده مناسب نیست.',
    sourceLabel: 'Fujitsu PRIMERGY Server Portfolio', sourceUrl: 'https://www.fujitsu.com/es/products/computing/servers/', sourceTier: 'سازنده'
  }
];

export default {
  meta: { ...serverLastReviewed, recordCount: serverRecords.length },
  gpuProfiles: serverGpuProfiles,
  records: serverRecords
};
