export type GpuVendor = 'NVIDIA' | 'AMD' | 'Intel';
export type GpuStatus = 'current' | 'system-only' | 'announced' | 'legacy';
export type GpuClass = 'frontier' | 'datacenter' | 'server-pcie' | 'workstation' | 'consumer';
export type GpuWorkload = 'آموزش مدل‌های بزرگ' | 'استنتاج سازمانی' | 'هوش مصنوعی محلی' | 'HPC' | 'گرافیک و رندر' | 'چندمستاجری';

export type GpuRecord = {
  id: string;
  vendor: GpuVendor;
  model: string;
  status: GpuStatus;
  gpuClass: GpuClass;
  architecture: string;
  year: number;
  memoryGB: number;
  memoryDisplay?: string;
  memoryType: string;
  bandwidthTBs: number;
  powerW: number | null;
  formFactor: string;
  hostInterface: string;
  cooling: string;
  compute: string;
  interconnect: string;
  partitioning: string;
  software: string;
  workloads: GpuWorkload[];
  bestFit: string;
  caution: string;
  serverReady: boolean;
  sourceUrl: string;
  sourceLabel: string;
};

export const gpuLastReviewed = {
  iso: '2026-08-10',
  fa: '۱۹ مرداد ۱۴۰۵',
  gregorian: '۱۰ اوت ۲۰۲۶'
};

const rows: GpuRecord[] = [
  {
    id: 'amd-mi455x', vendor: 'AMD', model: 'Instinct MI455X', status: 'system-only', gpuClass: 'frontier', architecture: 'CDNA 5', year: 2026,
    memoryGB: 432, memoryType: 'HBM4', bandwidthTBs: 23.3, powerW: null, formFactor: 'EAM / Helios', hostInterface: 'سیستم Helios', cooling: 'مایع در سطح سیستم',
    compute: 'شتاب‌دهندهٔ نسل CDNA 5؛ اعداد دقیق همهٔ دقت‌ها را فقط در اسناد سیستم مقایسه کنید.', interconnect: 'Infinity Fabric در Helios', partitioning: 'در سطح پلتفرم', software: 'ROCm',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'HPC'], bestFit: 'خوشه‌های مرزی که از ابتدا برای Helios طراحی می‌شوند.', caution: 'کارت PCIe مستقل نیست؛ توان هر ماژول در صفحهٔ عمومی محصول اعلام نشده است.', serverReady: true,
    sourceUrl: 'https://www.amd.com/en/products/accelerators/instinct/mi400/mi455x.html', sourceLabel: 'AMD Instinct MI455X'
  },
  {
    id: 'nvidia-rubin', vendor: 'NVIDIA', model: 'Rubin GPU', status: 'announced', gpuClass: 'frontier', architecture: 'Rubin', year: 2026,
    memoryGB: 288, memoryType: 'HBM4', bandwidthTBs: 22, powerW: null, formFactor: 'HGX / Vera Rubin NVL72', hostInterface: 'پلتفرم Vera Rubin', cooling: 'مایع در سطح رک',
    compute: 'مشخصات اولیه: تا ۴ PFLOPS متراکم BF16؛ با اعداد پراکنده یا سطح رک مخلوط نشود.', interconnect: 'NVLink تا ۳٫۶ TB/s', partitioning: 'اعلام نهایی نشده', software: 'CUDA / NVIDIA AI Enterprise',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'HPC'], bestFit: 'برنامه‌ریزی نسل بعدی AI Factory، نه خرید فوری کارت.', caution: 'محصول آینده با مشخصات اولیه است؛ زمان عرضه و پیکربندی نهایی را دوباره تأیید کنید.', serverReady: true,
    sourceUrl: 'https://www.nvidia.com/en-us/data-center/hgx/', sourceLabel: 'NVIDIA HGX Platform'
  },
  {
    id: 'nvidia-b300', vendor: 'NVIDIA', model: 'Blackwell Ultra B300', status: 'current', gpuClass: 'frontier', architecture: 'Blackwell Ultra', year: 2025,
    memoryGB: 288, memoryType: 'HBM3e', bandwidthTBs: 8, powerW: 1400, formFactor: 'SXM / HGX', hostInterface: 'HGX B300', cooling: 'مایع',
    compute: 'توان ماتریسی وابسته به دقت؛ برای مقایسه، dense و sparse را جدا نگه دارید.', interconnect: 'NVLink نسل پنجم', partitioning: 'MIG', software: 'CUDA / NVIDIA AI Enterprise',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'HPC', 'چندمستاجری'], bestFit: 'مدل‌های بسیار بزرگ و استنتاج reasoning با حافظهٔ زیاد.', caution: 'توان و زیرساخت مایع، طراحی رک و برق را تعیین می‌کند.', serverReady: true,
    sourceUrl: 'https://developer.nvidia.com/blog/inside-nvidia-blackwell-ultra-the-chip-powering-the-ai-factory-era/', sourceLabel: 'NVIDIA Blackwell Ultra Architecture'
  },
  {
    id: 'nvidia-b200', vendor: 'NVIDIA', model: 'Blackwell B200', status: 'current', gpuClass: 'frontier', architecture: 'Blackwell', year: 2024,
    memoryGB: 192, memoryDisplay: '۱۸۰ تا ۱۹۲', memoryType: 'HBM3e', bandwidthTBs: 8, powerW: 1200, formFactor: 'SXM / HGX', hostInterface: 'HGX / DGX B200', cooling: 'مایع',
    compute: 'اعداد AI با دقت و sparsity تغییر می‌کنند؛ با FP16/BF16 متراکم نسل قبل یکسان فرض نشود.', interconnect: 'NVLink نسل پنجم', partitioning: 'MIG', software: 'CUDA / NVIDIA AI Enterprise',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'HPC', 'چندمستاجری'], bestFit: 'خوشه‌های Blackwell برای آموزش و استنتاج در مقیاس بالا.', caution: 'ظرفیت قابل‌استفاده با پیکربندی سیستم فرق می‌کند؛ DGX B200 مقدار ۱۸۰GB را نشان می‌دهد.', serverReady: true,
    sourceUrl: 'https://www.nvidia.com/en-us/data-center/dgx-b200/', sourceLabel: 'NVIDIA DGX B200'
  },
  {
    id: 'amd-mi355x', vendor: 'AMD', model: 'Instinct MI355X', status: 'current', gpuClass: 'frontier', architecture: 'CDNA 4', year: 2025,
    memoryGB: 288, memoryType: 'HBM3e', bandwidthTBs: 8, powerW: 1400, formFactor: 'OAM', hostInterface: 'UBB / سرور OEM', cooling: 'مایع',
    compute: 'FP4/FP6/FP8/BF16؛ مقادیر sparse را جدا از dense بخوانید.', interconnect: 'Infinity Fabric', partitioning: 'بسته به پلتفرم', software: 'ROCm',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'HPC'], bestFit: 'مدل‌های بزرگ روی پلتفرم ROCm با بودجهٔ حافظهٔ بالا.', caution: 'ماژول OAM به سرور و خنک‌کاری سازگار نیاز دارد.', serverReady: true,
    sourceUrl: 'https://www.amd.com/en/products/accelerators/instinct/mi350/mi355x.html', sourceLabel: 'AMD Instinct MI355X'
  },
  {
    id: 'amd-mi350x', vendor: 'AMD', model: 'Instinct MI350X', status: 'current', gpuClass: 'frontier', architecture: 'CDNA 4', year: 2025,
    memoryGB: 288, memoryType: 'HBM3e', bandwidthTBs: 8, powerW: 1000, formFactor: 'OAM', hostInterface: 'سرور OEM', cooling: 'مایع / OEM',
    compute: 'شتاب ماتریسی چنددقتی؛ عدد متراکم و پراکنده باید با برگهٔ همان SKU سنجیده شود.', interconnect: 'Infinity Fabric', partitioning: 'بسته به پلتفرم', software: 'ROCm',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'HPC'], bestFit: 'آموزش و استنتاج سنگین با اکوسیستم باز ROCm.', caution: 'خرید به شکل پلتفرم سروری انجام می‌شود، نه کارت عمومی.', serverReady: true,
    sourceUrl: 'https://www.amd.com/en/products/accelerators/instinct/mi350/mi350x.html', sourceLabel: 'AMD Instinct MI350X'
  },
  {
    id: 'amd-mi325x', vendor: 'AMD', model: 'Instinct MI325X', status: 'current', gpuClass: 'frontier', architecture: 'CDNA 3', year: 2024,
    memoryGB: 256, memoryType: 'HBM3e', bandwidthTBs: 6, powerW: 1000, formFactor: 'OAM', hostInterface: 'سرور OEM', cooling: 'مایع / OEM',
    compute: 'FP64 تا FP8؛ برای مدل، ظرفیت حافظه معمولاً مزیت اصلی است.', interconnect: 'Infinity Fabric', partitioning: 'بسته به پلتفرم', software: 'ROCm',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'HPC'], bestFit: 'مدل‌های حافظه‌محور و جایگزین CDNA 3 با ظرفیت بالا.', caution: 'مصرف ۱kW نیازمند ارزیابی جدی برق و خنک‌کاری است.', serverReady: true,
    sourceUrl: 'https://www.amd.com/en/products/accelerators/instinct/mi300/mi325x.html', sourceLabel: 'AMD Instinct MI325X'
  },
  {
    id: 'amd-mi300x', vendor: 'AMD', model: 'Instinct MI300X', status: 'current', gpuClass: 'frontier', architecture: 'CDNA 3', year: 2023,
    memoryGB: 192, memoryType: 'HBM3', bandwidthTBs: 5.3, powerW: 750, formFactor: 'OAM', hostInterface: 'سرور OEM', cooling: 'مایع / OEM',
    compute: 'FP64، FP32، BF16، FP16 و FP8؛ نرخ‌های ماتریسی را با sparsity یکسان مقایسه کنید.', interconnect: 'Infinity Fabric', partitioning: 'بسته به پلتفرم', software: 'ROCm',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'HPC'], bestFit: 'مدل‌های بزرگ نیازمند ۱۹۲GB روی هر شتاب‌دهنده.', caution: 'سازگاری مدل و کرنل با ROCm را پیش از خرید PoC کنید.', serverReady: true,
    sourceUrl: 'https://www.amd.com/en/products/accelerators/instinct/mi300/mi300x.html', sourceLabel: 'AMD Instinct MI300X'
  },
  {
    id: 'nvidia-h200-sxm', vendor: 'NVIDIA', model: 'H200 SXM', status: 'current', gpuClass: 'datacenter', architecture: 'Hopper', year: 2024,
    memoryGB: 141, memoryType: 'HBM3e', bandwidthTBs: 4.8, powerW: 700, formFactor: 'SXM', hostInterface: 'HGX', cooling: 'سرور OEM',
    compute: 'Tensor Core نسل چهارم؛ BF16/FP16 متراکم و sparse در جدول رسمی جدا هستند.', interconnect: 'NVLink', partitioning: 'MIG', software: 'CUDA / NVIDIA AI Enterprise',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'HPC', 'چندمستاجری'], bestFit: 'ارتقای حافظه و پهنای‌باند برای مدل‌های Hopper.', caution: 'SXM کارت PCIe مستقل نیست و به پلتفرم HGX نیاز دارد.', serverReady: true,
    sourceUrl: 'https://www.nvidia.com/en-us/data-center/h200/', sourceLabel: 'NVIDIA H200'
  },
  {
    id: 'nvidia-h200-nvl', vendor: 'NVIDIA', model: 'H200 NVL', status: 'current', gpuClass: 'server-pcie', architecture: 'Hopper', year: 2024,
    memoryGB: 141, memoryType: 'HBM3e', bandwidthTBs: 4.8, powerW: 600, formFactor: 'PCIe دو اسلات', hostInterface: 'PCIe 5.0', cooling: 'پسیو سروری',
    compute: 'Tensor Core Hopper؛ اعداد dense و sparse جداگانه تفسیر شوند.', interconnect: 'NVLink bridge', partitioning: 'MIG', software: 'CUDA / NVIDIA AI Enterprise',
    workloads: ['استنتاج سازمانی', 'HPC', 'چندمستاجری'], bestFit: 'سرور PCIe با نیاز به حافظهٔ بسیار بالا.', caution: 'برای جریان هوا، تغذیه و پل NVLink باید سرور تأییدشده انتخاب شود.', serverReady: true,
    sourceUrl: 'https://www.nvidia.com/en-us/data-center/h200/', sourceLabel: 'NVIDIA H200'
  },
  {
    id: 'intel-gaudi3-pcie', vendor: 'Intel', model: 'Gaudi 3 PCIe', status: 'current', gpuClass: 'server-pcie', architecture: 'Gaudi 3', year: 2024,
    memoryGB: 128, memoryType: 'HBM2e', bandwidthTBs: 3.7, powerW: 600, formFactor: 'PCIe دو اسلات', hostInterface: 'PCIe 5.0', cooling: 'پسیو سروری',
    compute: 'شتاب‌دهندهٔ اختصاصی AI است، نه GPU عمومی؛ مقایسه بر اساس مدل واقعی مهم‌تر از TFLOPS خام است.', interconnect: 'Ethernet / پل ۴ کارته', partitioning: 'بسته به نرم‌افزار', software: 'SynapseAI',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی'], bestFit: 'خوشه‌های AI مبتنی بر Ethernet و نرم‌افزار بازتر.', caution: 'برای گرافیک یا CUDA طراحی نشده؛ سازگاری مدل را آزمایش کنید.', serverReady: true,
    sourceUrl: 'https://cdrdv2-public.intel.com/817488/Gaudi%203%20PCIe%20Product%20Brief_RB_1_V6.pdf', sourceLabel: 'Intel Gaudi 3 PCIe Product Brief'
  },
  {
    id: 'nvidia-h100-nvl', vendor: 'NVIDIA', model: 'H100 NVL', status: 'current', gpuClass: 'server-pcie', architecture: 'Hopper', year: 2023,
    memoryGB: 94, memoryType: 'HBM3', bandwidthTBs: 3.9, powerW: 400, formFactor: 'PCIe دو اسلات', hostInterface: 'PCIe 5.0', cooling: 'پسیو سروری',
    compute: 'Tensor Core Hopper با ۹۴GB؛ dense و sparse را هم‌مبنا کنید.', interconnect: 'NVLink bridge', partitioning: 'MIG', software: 'CUDA / NVIDIA AI Enterprise',
    workloads: ['استنتاج سازمانی', 'HPC', 'چندمستاجری'], bestFit: 'LLM در سرور PCIe و جفت NVLink.', caution: 'ظرفیت و توان با نسخهٔ SXM یکسان نیست.', serverReady: true,
    sourceUrl: 'https://www.nvidia.com/en-us/data-center/h100/', sourceLabel: 'NVIDIA H100'
  },
  {
    id: 'nvidia-rtx-pro-6000-server', vendor: 'NVIDIA', model: 'RTX PRO 6000 Blackwell Server', status: 'current', gpuClass: 'server-pcie', architecture: 'Blackwell', year: 2025,
    memoryGB: 96, memoryType: 'GDDR7 ECC', bandwidthTBs: 1.597, powerW: 600, formFactor: 'PCIe دو اسلات / مایع تک‌اسلات', hostInterface: 'PCIe 5.0', cooling: 'پسیو یا مایع',
    compute: 'RTX و Tensor Core Blackwell؛ AI TOPS بازاریابی را جایگزین بنچمارک مدل نکنید.', interconnect: 'PCIe', partitioning: 'vGPU', software: 'CUDA / NVIDIA AI Enterprise',
    workloads: ['استنتاج سازمانی', 'گرافیک و رندر', 'چندمستاجری'], bestFit: 'ترکیب رندر، VDI و استنتاج با ۹۶GB در PCIe.', caution: 'NVLink ندارد؛ مقیاس چند GPU به PCIe و شبکه متکی است.', serverReady: true,
    sourceUrl: 'https://www.nvidia.com/en-us/data-center/rtx-pro-6000-blackwell-server-edition/', sourceLabel: 'NVIDIA RTX PRO 6000 Blackwell Server Edition'
  },
  {
    id: 'nvidia-h100-sxm', vendor: 'NVIDIA', model: 'H100 SXM', status: 'current', gpuClass: 'datacenter', architecture: 'Hopper', year: 2022,
    memoryGB: 80, memoryType: 'HBM3', bandwidthTBs: 3.35, powerW: 700, formFactor: 'SXM', hostInterface: 'HGX', cooling: 'سرور OEM',
    compute: 'BF16/FP16 Tensor Core؛ dense و sparse در مشخصات رسمی جدا هستند.', interconnect: 'NVLink', partitioning: 'MIG', software: 'CUDA / NVIDIA AI Enterprise',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'HPC', 'چندمستاجری'], bestFit: 'خوشه‌های Hopper بالغ و سازگار با CUDA.', caution: 'برای مدل‌های حافظه‌محور، ۸۰GB ممکن است محدودکننده باشد.', serverReady: true,
    sourceUrl: 'https://www.nvidia.com/en-us/data-center/h100/', sourceLabel: 'NVIDIA H100'
  },
  {
    id: 'nvidia-a100-sxm', vendor: 'NVIDIA', model: 'A100 80GB SXM', status: 'legacy', gpuClass: 'datacenter', architecture: 'Ampere', year: 2020,
    memoryGB: 80, memoryType: 'HBM2e', bandwidthTBs: 2.039, powerW: 400, formFactor: 'SXM', hostInterface: 'HGX', cooling: 'سرور OEM',
    compute: 'Tensor Core نسل سوم؛ هنوز مرجع مناسبی برای نرم‌افزار و MIG است.', interconnect: 'NVLink', partitioning: 'MIG', software: 'CUDA / NVIDIA AI Enterprise',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'HPC', 'چندمستاجری'], bestFit: 'زیرساخت بالغ، موجودی دست‌دوم یا ادامهٔ خوشهٔ موجود.', caution: 'نسل قدیمی‌تر است؛ قیمت کل مالکیت را با H100/H200 بسنجید.', serverReady: true,
    sourceUrl: 'https://www.nvidia.com/en-us/data-center/a100/', sourceLabel: 'NVIDIA A100'
  },
  {
    id: 'nvidia-a100-pcie', vendor: 'NVIDIA', model: 'A100 80GB PCIe', status: 'legacy', gpuClass: 'server-pcie', architecture: 'Ampere', year: 2021,
    memoryGB: 80, memoryType: 'HBM2e', bandwidthTBs: 1.935, powerW: 300, formFactor: 'PCIe دو اسلات', hostInterface: 'PCIe 4.0', cooling: 'پسیو سروری',
    compute: 'نسخهٔ PCIe با توان پایین‌تر؛ اعداد آن را با SXM جابه‌جا نکنید.', interconnect: 'NVLink bridge', partitioning: 'MIG', software: 'CUDA / NVIDIA AI Enterprise',
    workloads: ['استنتاج سازمانی', 'HPC', 'چندمستاجری'], bestFit: 'سرورهای PCIe موجود با نیاز به ECC و MIG.', caution: 'پهنای‌باند و توان کمتر از نسخهٔ SXM است.', serverReady: true,
    sourceUrl: 'https://www.nvidia.com/en-us/data-center/a100/', sourceLabel: 'NVIDIA A100'
  },
  {
    id: 'amd-mi210', vendor: 'AMD', model: 'Instinct MI210', status: 'legacy', gpuClass: 'server-pcie', architecture: 'CDNA 2', year: 2021,
    memoryGB: 64, memoryType: 'HBM2e', bandwidthTBs: 1.6, powerW: 300, formFactor: 'PCIe دو اسلات', hostInterface: 'PCIe 4.0', cooling: 'پسیو سروری',
    compute: 'FP64 و ماتریسی مناسب HPC؛ مزیت اصلی HBM و ROCm است.', interconnect: 'Infinity Fabric links', partitioning: 'خیر', software: 'ROCm',
    workloads: ['HPC', 'استنتاج سازمانی'], bestFit: 'HPC و توسعهٔ ROCm در سرور PCIe.', caution: 'برای LLM مدرن، ظرفیت و اکوسیستم نرم‌افزار را PoC کنید.', serverReady: true,
    sourceUrl: 'https://www.amd.com/en/products/accelerators/instinct/mi200/mi210.html', sourceLabel: 'AMD Instinct MI210'
  },
  {
    id: 'nvidia-l40s', vendor: 'NVIDIA', model: 'L40S', status: 'current', gpuClass: 'server-pcie', architecture: 'Ada Lovelace', year: 2023,
    memoryGB: 48, memoryType: 'GDDR6 ECC', bandwidthTBs: 0.864, powerW: 350, formFactor: 'PCIe دو اسلات', hostInterface: 'PCIe 4.0', cooling: 'پسیو سروری',
    compute: 'ترکیب Tensor/RT/FP32 برای AI و گرافیک؛ HBM ندارد.', interconnect: 'PCIe؛ بدون NVLink', partitioning: 'vGPU؛ بدون MIG', software: 'CUDA / NVIDIA AI Enterprise',
    workloads: ['استنتاج سازمانی', 'گرافیک و رندر'], bestFit: 'استنتاج، Omniverse و رندر در سرور استاندارد.', caution: '۴۸GB و نبود NVLink برای مدل‌های بزرگ محدودیت ایجاد می‌کند.', serverReady: true,
    sourceUrl: 'https://www.nvidia.com/en-us/data-center/l40s/', sourceLabel: 'NVIDIA L40S'
  },
  {
    id: 'nvidia-rtx6000-ada', vendor: 'NVIDIA', model: 'RTX 6000 Ada', status: 'current', gpuClass: 'workstation', architecture: 'Ada Lovelace', year: 2022,
    memoryGB: 48, memoryType: 'GDDR6 ECC', bandwidthTBs: 0.96, powerW: 300, formFactor: 'PCIe دو اسلات', hostInterface: 'PCIe 4.0', cooling: 'اکتیو',
    compute: 'RTX/Tensor برای حرفه‌ای؛ معیار اصلی ۴۸GB ECC و درایور سازمانی است.', interconnect: 'PCIe؛ بدون NVLink', partitioning: 'vGPU', software: 'CUDA / RTX Enterprise',
    workloads: ['هوش مصنوعی محلی', 'گرافیک و رندر'], bestFit: 'ایستگاه کاری حرفه‌ای برای مدل محلی، CAD و رندر.', caution: 'کولر اکتیو و فرم ورک‌استیشن را با شاسی سرور تطبیق دهید.', serverReady: false,
    sourceUrl: 'https://www.nvidia.com/content/dam/en-zz/Solutions/design-visualization/rtx-6000/proviz-print-rtx6000-datasheet-web-2504660.pdf', sourceLabel: 'NVIDIA RTX 6000 Ada Datasheet'
  },
  {
    id: 'amd-r9700', vendor: 'AMD', model: 'Radeon AI PRO R9700', status: 'current', gpuClass: 'workstation', architecture: 'RDNA 4', year: 2025,
    memoryGB: 32, memoryType: 'GDDR6', bandwidthTBs: 0.64, powerW: 300, formFactor: 'PCIe دو اسلات', hostInterface: 'PCIe 5.0', cooling: 'اکتیو',
    compute: 'کارت ورک‌استیشن برای AI محلی؛ سازگاری ROCm هر مدل بررسی شود.', interconnect: 'PCIe', partitioning: 'خیر', software: 'ROCm / HIP',
    workloads: ['هوش مصنوعی محلی', 'گرافیک و رندر'], bestFit: 'توسعهٔ محلی با ۳۲GB و مسیر نرم‌افزاری AMD.', caution: 'AMD استفادهٔ کارت ورک‌استیشن در دیتاسنتر را توصیه نمی‌کند.', serverReady: false,
    sourceUrl: 'https://www.amd.com/en/products/graphics/workstations/radeon-ai-pro/ai-9000-series/amd-radeon-ai-pro-r9700.html', sourceLabel: 'AMD Radeon AI PRO R9700'
  },
  {
    id: 'nvidia-rtx5090', vendor: 'NVIDIA', model: 'GeForce RTX 5090', status: 'current', gpuClass: 'consumer', architecture: 'Blackwell', year: 2025,
    memoryGB: 32, memoryType: 'GDDR7', bandwidthTBs: 1.792, powerW: 575, formFactor: 'PCIe، وابسته به سازنده', hostInterface: 'PCIe 5.0', cooling: 'اکتیو',
    compute: 'Tensor Core Blackwell؛ AI TOPS با دقت پایین را با BF16 دیتاسنتر مقایسه نکنید.', interconnect: 'PCIe؛ بدون NVLink', partitioning: 'خیر', software: 'CUDA / GeForce Driver',
    workloads: ['هوش مصنوعی محلی', 'گرافیک و رندر'], bestFit: 'حداکثر توان AI محلی در یک کارت مصرفی.', caution: 'ECC، MIG، vGPU و پشتیبانی دیتاسنتری ندارد؛ توان و ابعاد بسیار بالاست.', serverReady: false,
    sourceUrl: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/', sourceLabel: 'NVIDIA GeForce RTX 5090'
  },
  {
    id: 'nvidia-rtx4090', vendor: 'NVIDIA', model: 'GeForce RTX 4090', status: 'legacy', gpuClass: 'consumer', architecture: 'Ada Lovelace', year: 2022,
    memoryGB: 24, memoryType: 'GDDR6X', bandwidthTBs: 1.008, powerW: 450, formFactor: 'PCIe، وابسته به سازنده', hostInterface: 'PCIe 4.0', cooling: 'اکتیو',
    compute: 'گزینهٔ رایج AI محلی؛ اعداد Tensor بازاریابی جای بنچمارک واقعی نیست.', interconnect: 'PCIe؛ بدون NVLink', partitioning: 'خیر', software: 'CUDA / GeForce Driver',
    workloads: ['هوش مصنوعی محلی', 'گرافیک و رندر'], bestFit: 'مدل‌های محلی تا سقف عملی ۲۴GB و رندر.', caution: 'کارت سروری نیست؛ تراکم، برق، کانکتور و خنک‌کاری ریسک عملیاتی دارند.', serverReady: false,
    sourceUrl: 'https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/', sourceLabel: 'NVIDIA GeForce RTX 4090'
  }
];

export const gpuRecords = rows;
export const gpuWorkloads: GpuWorkload[] = ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'هوش مصنوعی محلی', 'HPC', 'گرافیک و رندر', 'چندمستاجری'];
