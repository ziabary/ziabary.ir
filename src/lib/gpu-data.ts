export type GpuVendor = 'NVIDIA' | 'AMD' | 'Intel' | 'Huawei' | 'Google' | 'AWS' | 'Tenstorrent' | 'Qualcomm' | 'Cerebras' | 'Groq';
export type GpuStatus = 'current' | 'system-only' | 'announced' | 'legacy';
export type GpuClass = 'frontier' | 'datacenter' | 'server-pcie' | 'workstation' | 'consumer';
export type GpuWorkload = 'آموزش مدل‌های بزرگ' | 'استنتاج سازمانی' | 'هوش مصنوعی محلی' | 'HPC' | 'گرافیک و رندر' | 'چندمستاجری';

export type GpuComputeRate = {
  dense: number | null;
  sparse?: number | null;
};

export type GpuComputeSpec = {
  generalCoreCount: number | null;
  generalCoreLabel: string;
  matrixCoreCount: number | null;
  matrixCoreLabel: string;
  fp8: GpuComputeRate;
  fp16: GpuComputeRate;
  fp32: number | null;
  fp64: number | null;
  fp4?: GpuComputeRate;
  bf16?: GpuComputeRate;
  int8?: GpuComputeRate;
  int4?: GpuComputeRate;
  computeFootnote?: string;
  disclosure?: Partial<Record<'generalCoreCount' | 'matrixCoreCount' | 'fp4' | 'fp8' | 'bf16' | 'fp16' | 'fp32' | 'fp64' | 'int8' | 'int4', 'published' | 'derived' | 'not-published' | 'not-supported' | 'not-applicable'>>;
};

export type GpuExtraSpec = {
  group: 'تراشه' | 'محاسبات' | 'حافظه' | 'ارتباط و شبکه' | 'توان و مکانیک' | 'نرم‌افزار و مجازی‌سازی' | 'رسانه' | 'عرضه و منبع';
  label: string;
  value: string;
  basis?: 'رسمی' | 'استخراج‌شده از سامانه' | 'اعلام‌نشده توسط سازنده';
};

export type GpuBaseRecord = {
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
  productKind?: 'کارت' | 'ماژول' | 'پردازنده' | 'سامانه' | 'ابر';
  sourceTier?: 'سازنده' | 'مستندات فنی سازنده' | 'پژوهش مستقل';
  extraSpecs?: GpuExtraSpec[];
  dataDisclosure?: Partial<Record<'memoryGB' | 'bandwidthTBs' | 'powerW', 'published' | 'derived' | 'not-published' | 'not-supported' | 'not-applicable'>>;
};

export type GpuRecord = GpuBaseRecord & GpuComputeSpec;

export const gpuLastReviewed = {
  iso: '2026-08-10',
  fa: '۱۹ مرداد ۱۴۰۵',
  gregorian: '۱۰ اوت ۲۰۲۶'
};

const rows: GpuBaseRecord[] = [
  {
    id: 'google-tpu7x', vendor: 'Google', model: 'Cloud TPU7x (Ironwood)', status: 'current', gpuClass: 'frontier', architecture: 'Ironwood؛ دو chiplet', year: 2026,
    memoryGB: 192, memoryType: 'HBM؛ ۹۶GB برای هر chiplet', bandwidthTBs: 7.38, powerW: null, formFactor: 'Cloud TPU؛ برش ۴ تا ۹٬۲۱۶ تراشه', hostInterface: 'PCIe به میزبان چهار‌تراشه‌ای', cooling: 'مدیریت‌شده در Google Cloud',
    compute: '۲٬۳۰۷ TFLOPS BF16 و ۴٬۶۱۴ TFLOPS FP8 برای هر تراشه.', interconnect: 'ICI دوطرفه ۱٫۲ TB/s برای هر تراشه؛ توپولوژی 3D torus', partitioning: 'هر تراشه در JAX به دو device/chiplet دیده می‌شود', software: 'JAX / PyTorch on Google Cloud؛ بدون TensorFlow',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'HPC'], bestFit: 'آموزش و استنتاج dense/MoE در مقیاس بسیار بزرگ روی Google Cloud.', caution: 'محصول ابری است، نه کارت قابل‌خرید؛ توان، مکانیک و قیمت تراشهٔ مستقل منتشر نمی‌شود.', serverReady: true,
    sourceUrl: 'https://docs.cloud.google.com/tpu/docs/tpu7x', sourceLabel: 'Google Cloud TPU7x documentation', productKind: 'ابر', sourceTier: 'مستندات فنی سازنده', dataDisclosure: { powerW: 'not-applicable' },
    extraSpecs: [
      { group: 'تراشه', label: 'ساختار', value: '۲ chiplet؛ هرکدام ۱ TensorCore، ۲ SparseCore و ۹۶GB HBM', basis: 'رسمی' },
      { group: 'ارتباط و شبکه', label: 'DCN', value: '۱۰۰ Gbit/s برای هر تراشه', basis: 'رسمی' },
      { group: 'ارتباط و شبکه', label: 'بیشینهٔ Pod', value: '۹٬۲۱۶ تراشه؛ 3D torus', basis: 'رسمی' },
      { group: 'نرم‌افزار و مجازی‌سازی', label: 'چارچوب‌ها', value: 'JAX و PyTorch؛ TensorFlow پشتیبانی نمی‌شود', basis: 'رسمی' }
    ]
  },
  {
    id: 'google-tpu-v6e', vendor: 'Google', model: 'Cloud TPU v6e (Trillium)', status: 'current', gpuClass: 'frontier', architecture: 'Trillium TPU', year: 2024,
    memoryGB: 32, memoryType: 'HBM', bandwidthTBs: 1.638, powerW: null, formFactor: 'Cloud TPU؛ برش ۱ تا ۲۵۶ تراشه', hostInterface: 'TPU VM؛ ۱/۴/۸ تراشه', cooling: 'مدیریت‌شده در Google Cloud',
    compute: '۹۱۸ TFLOPS BF16 و ۱٬۸۳۶ TOPS INT8 برای هر تراشه.', interconnect: 'ICI دوطرفه ۸۰۰ GB/s؛ چهار پورت؛ 2D torus', partitioning: 'برش‌های ۱ تا ۲۵۶ تراشه', software: 'JAX / PyTorch / TensorFlow on Google Cloud',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی'], bestFit: 'ترنسفورمر، text-to-image و CNN با نسبت هزینه/کارایی ابری.', caution: 'توان هر تراشه و فرم سخت‌افزار به مشتری افشا نمی‌شود؛ فقط به‌صورت سرویس ابری عرضه می‌شود.', serverReady: true,
    sourceUrl: 'https://docs.cloud.google.com/tpu/docs/v6e', sourceLabel: 'Google Cloud TPU v6e documentation', productKind: 'ابر', sourceTier: 'مستندات فنی سازنده', dataDisclosure: { powerW: 'not-applicable' },
    extraSpecs: [
      { group: 'تراشه', label: 'TensorCore / MXU', value: '۱ TensorCore؛ ۲ واحد MXU؛ Vector و Scalar unit', basis: 'رسمی' },
      { group: 'ارتباط و شبکه', label: 'Pod', value: '۲۵۶ تراشه؛ ۲۳۴٫۹ PFLOPS BF16', basis: 'رسمی' },
      { group: 'ارتباط و شبکه', label: 'All-reduce / bisection', value: '۱۰۲٫۴ TB/s / ۳٫۲ TB/s در هر Pod', basis: 'رسمی' },
      { group: 'ارتباط و شبکه', label: 'شبکهٔ میزبان', value: '۴ × ۲۰۰ Gbit/s NIC برای هر میزبان', basis: 'رسمی' }
    ]
  },
  {
    id: 'google-tpu-v5p', vendor: 'Google', model: 'Cloud TPU v5p', status: 'current', gpuClass: 'frontier', architecture: 'TPU v5p', year: 2023,
    memoryGB: 95, memoryType: 'HBM', bandwidthTBs: 2.765, powerW: null, formFactor: 'Cloud TPU؛ Pod تا ۸٬۹۶۰ تراشه', hostInterface: 'TPU VM چهار‌تراشه‌ای', cooling: 'مدیریت‌شده در Google Cloud',
    compute: '۴۵۹ TFLOPS BF16 و ۴۵۹ TFLOPS FP8 برای هر تراشه.', interconnect: 'ICI دوطرفه ۱٫۲ TB/s برای هر تراشه', partitioning: 'برش‌های Cloud TPU', software: 'JAX / PyTorch / TensorFlow on Google Cloud',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی'], bestFit: 'آموزش مقیاس‌بالا با HBM بیشتر از Trillium.', caution: 'عرضه فقط ابری است و توان هر تراشه در جدول رسمی محصول درج نشده است.', serverReady: true,
    sourceUrl: 'https://docs.cloud.google.com/tpu/docs/v5p', sourceLabel: 'Google Cloud TPU v5p documentation', productKind: 'ابر', sourceTier: 'مستندات فنی سازنده', dataDisclosure: { powerW: 'not-applicable' },
    extraSpecs: [
      { group: 'تراشه', label: 'هسته‌ها', value: '۲ TensorCore و ۴ SparseCore برای هر تراشه', basis: 'رسمی' },
      { group: 'ارتباط و شبکه', label: 'DCN', value: '۵۰ Gbit/s برای هر تراشه', basis: 'رسمی' },
      { group: 'ارتباط و شبکه', label: 'بیشینهٔ Pod', value: '۸٬۹۶۰ تراشه', basis: 'رسمی' }
    ]
  },
  {
    id: 'aws-trainium2', vendor: 'AWS', model: 'Trainium2', status: 'current', gpuClass: 'frontier', architecture: 'AWS Trainium2', year: 2024,
    memoryGB: 96, memoryType: 'HBM3', bandwidthTBs: 2.875, powerW: null, formFactor: 'EC2 Trn2؛ ۱۶ تراشه / UltraServer؛ ۶۴ تراشه', hostInterface: 'EC2 Trn2', cooling: 'مدیریت‌شده در AWS',
    compute: '۱٫۳ PFLOPS FP8 برای هر تراشه، استخراج‌شده از ۲۰٫۸ PFLOPS یک نمونهٔ ۱۶‌تراشه‌ای.', interconnect: 'NeuronLink؛ EFAv3 برای scale-out', partitioning: 'در سطح EC2 instance و UltraServer', software: 'AWS Neuron SDK / PyTorch / JAX / Hugging Face',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی'], bestFit: 'آموزش و استنتاج بزرگ در AWS با Neuron و EFA.', caution: 'حافظه، پهنای‌باند و FP8 هر تراشه از مجموع رسمی نمونهٔ ۱۶‌تراشه‌ای استخراج شده‌اند؛ محصول مستقل فروخته نمی‌شود.', serverReady: true,
    sourceUrl: 'https://aws.amazon.com/ec2/instance-types/trn2/', sourceLabel: 'Amazon EC2 Trn2 / Trainium2', productKind: 'ابر', sourceTier: 'سازنده', dataDisclosure: { memoryGB: 'derived', bandwidthTBs: 'derived', powerW: 'not-applicable' },
    extraSpecs: [
      { group: 'محاسبات', label: 'قالب‌ها', value: 'FP32، TF32، BF16، FP16 و cFP8؛ sparsity از نوع 16:4', basis: 'رسمی' },
      { group: 'ارتباط و شبکه', label: 'Trn2 instance', value: '۱۶ تراشه؛ ۲۰٫۸ PFLOPS FP8؛ ۱٫۵TB HBM؛ ۴۶TB/s؛ EFAv3 برابر ۳٫۲Tbit/s', basis: 'رسمی' },
      { group: 'ارتباط و شبکه', label: 'Trn2 UltraServer', value: '۶۴ تراشه؛ ۸۳٫۲ PFLOPS FP8؛ ۶TB HBM؛ ۱۸۵TB/s؛ EFAv3 برابر ۱۲٫۸Tbit/s', basis: 'رسمی' }
    ]
  },
  {
    id: 'tenstorrent-blackhole-p150', vendor: 'Tenstorrent', model: 'Blackhole p150', status: 'current', gpuClass: 'workstation', architecture: 'Blackhole Tensix', year: 2026,
    memoryGB: 32, memoryType: 'GDDR6', bandwidthTBs: 0.512, powerW: 300, formFactor: 'PCIe دو اسلات؛ اکتیو یا پسیو', hostInterface: 'PCIe 5.0 x16', cooling: 'p150a اکتیو؛ p150b پسیو',
    compute: '۶۶۴ TFLOPS از نوع BLOCKFP8؛ با FP8 استاندارد دیگر سازندگان یکی فرض نشود.', interconnect: '۴ × QSFP-DD 800G پسیو برای کارت‌های Blackhole', partitioning: 'در سطح نرم‌افزار متن‌باز', software: 'TT-Metalium / TT-NN / TT-Forge؛ متن‌باز',
    workloads: ['هوش مصنوعی محلی', 'استنتاج سازمانی'], bestFit: 'توسعهٔ باز، استنتاج و خوشه‌سازی کارت‌های قابل‌خرید.', caution: 'عدد ۶۶۴ مربوط به BLOCKFP8 است؛ نرخ FP16/BF16 در جدول عمومی فروش درج نشده است.', serverReady: true,
    sourceUrl: 'https://tenstorrent.com/hardware/cards', sourceLabel: 'Tenstorrent Blackhole cards', productKind: 'کارت', sourceTier: 'سازنده',
    extraSpecs: [
      { group: 'تراشه', label: 'Tensix / RISC-V / SRAM', value: '۱۲۰ Tensix Core؛ ۱۶ هستهٔ Big RISC-V؛ ۱۸۰MB SRAM', basis: 'رسمی' },
      { group: 'محاسبات', label: 'BLOCKFP8', value: '۶۶۴ TFLOPS', basis: 'رسمی' },
      { group: 'توان و مکانیک', label: 'ابعاد', value: '۴۲ × ۲۷۰ × ۱۱۱ mm', basis: 'رسمی' },
      { group: 'توان و مکانیک', label: 'برق کمکی', value: '12V-2x6؛ منبع تغذیه ATX 3.1 یا جدیدتر', basis: 'رسمی' }
    ]
  },
  {
    id: 'tenstorrent-wormhole-n300d', vendor: 'Tenstorrent', model: 'Wormhole n300d / n300s', status: 'current', gpuClass: 'workstation', architecture: 'Wormhole Tensix', year: 2023,
    memoryGB: 24, memoryType: 'GDDR6', bandwidthTBs: 0.576, powerW: 300, formFactor: 'PCIe؛ ۲٫۵ اسلات اکتیو یا ۲ اسلات پسیو', hostInterface: 'PCIe 4.0 x16', cooling: 'n300d اکتیو؛ n300s پسیو',
    compute: '۴۶۶ TFLOPS FP8، ۱۳۱ TFLOPS FP16 و ۲۶۲ TFLOPS BLOCKFP8.', interconnect: '۲ × Warp 100 bridge؛ ۲ × QSFP-DD 200G فعال؛ لینک داخلی 200G', partitioning: 'در سطح TT-Metalium', software: 'TT-Metalium / TT-NN / TT-Forge؛ متن‌باز',
    workloads: ['هوش مصنوعی محلی', 'استنتاج سازمانی'], bestFit: 'توسعهٔ AI محلی و خوشه‌سازی کم‌هزینه با پشتهٔ باز.', caution: 'برای نسخهٔ پسیو حداقل ۳۰ CFM جریان هوا لازم است؛ کانکتور برق EPS12V است نه PCIe 6+2.', serverReady: true,
    sourceUrl: 'https://docs.tenstorrent.com/aibs/wormhole/index.html', sourceLabel: 'Tenstorrent Wormhole PCIe documentation', productKind: 'کارت', sourceTier: 'مستندات فنی سازنده',
    extraSpecs: [
      { group: 'تراشه', label: 'ASIC / Tensix / SRAM', value: '۲ ASIC؛ ۱۲۸ Tensix Core فعال؛ ۱۹۲MB SRAM', basis: 'رسمی' },
      { group: 'محاسبات', label: 'BLOCKFP8', value: '۲۶۲ TFLOPS', basis: 'رسمی' },
      { group: 'محاسبات', label: 'قالب‌ها', value: 'FP8، FP16، BF16، FP32 output، BLOCKFP2/4/8، INT8/32، UINT8، TF32، VTF19/VFP32', basis: 'رسمی' },
      { group: 'توان و مکانیک', label: 'ابعاد n300d / n300s', value: '۵۲٫۲×۲۵۶×۱۱۱ / ۳۶×۲۵۴×۱۱۱ mm', basis: 'رسمی' },
      { group: 'توان و مکانیک', label: 'دمای محیط / die', value: '۱۰–۳۵°C / صفر–۷۵°C', basis: 'رسمی' },
      { group: 'نرم‌افزار و مجازی‌سازی', label: 'سیستم‌عامل مرجع', value: 'Ubuntu 22.04 x86-64', basis: 'رسمی' }
    ]
  },
  {
    id: 'qualcomm-cloud-ai-100-ultra', vendor: 'Qualcomm', model: 'Cloud AI 100 Ultra', status: 'current', gpuClass: 'server-pcie', architecture: 'Qualcomm AI Core', year: 2023,
    memoryGB: 128, memoryType: 'LPDDR4X ECC', bandwidthTBs: 0.548, powerW: 150, formFactor: 'PCIe FH3/4L', hostInterface: 'PCIe 4.0 x16', cooling: 'سروری / وابسته به پلتفرم',
    compute: 'تا ۸۷۰ TOPS و تا ۲۸۸ TFLOPS؛ صفحهٔ محصول این دو اوج را به یک دقت یگانه تقلیل نمی‌دهد.', interconnect: 'PCIe؛ مقیاس چندکارت در Qualcomm AI Stack', partitioning: 'وابسته به Cloud AI SDK', software: 'Qualcomm AI Stack / Cloud AI SDK',
    workloads: ['استنتاج سازمانی'], bestFit: 'استنتاج LLM پرظرفیت با ۱۲۸GB و توان ۱۵۰W.', caution: 'شتاب‌دهندهٔ inference است؛ اوج TOPS/TFLOPS بدون برچسب دقت نباید با FP8/FP16 ردیف‌های دیگر مرتب شود.', serverReady: true,
    sourceUrl: 'https://www.qualcomm.com/data-center/products/cloud-ai-100-ultra', sourceLabel: 'Qualcomm Cloud AI 100 Ultra', productKind: 'کارت', sourceTier: 'سازنده',
    extraSpecs: [
      { group: 'تراشه', label: 'AI Core / SRAM', value: 'تا ۶۴ AI Core؛ ۵۷۶MB SRAM روی die', basis: 'رسمی' },
      { group: 'محاسبات', label: 'اوج اعلامی', value: 'تا ۸۷۰ TOPS؛ تا ۲۸۸ TFLOPS', basis: 'رسمی' },
      { group: 'توان و مکانیک', label: 'ابعاد', value: '۱۱۱٫۲ × ۲۳۷٫۹ mm', basis: 'رسمی' },
      { group: 'عرضه و منبع', label: 'ظرفیت مدل اعلامی', value: 'تا مدل ۱۰۰B روی یک کارت و ۱۷۵B روی دو کارت، طبق ادعای سازنده', basis: 'رسمی' }
    ]
  },
  {
    id: 'cerebras-cs3', vendor: 'Cerebras', model: 'CS-3 / WSE-3', status: 'current', gpuClass: 'frontier', architecture: 'Wafer-Scale Engine 3', year: 2024,
    memoryGB: 0, memoryType: 'SRAM روی ویفر + MemoryX جداشده', bandwidthTBs: 0, powerW: 23000, formFactor: 'سامانهٔ 15U', hostInterface: 'سامانهٔ کامل CS-3', cooling: 'سطح دیتاسنتر / سامانه',
    compute: '۱۲۵ PFLOPS FP16 در سطح یک CS-3.', interconnect: 'پارچهٔ روی ویفر ۲۷ PB/s aggregate؛ SwarmX تا ۲٬۰۴۸ سامانه', partitioning: 'Weight Streaming؛ سامانه به‌صورت یک شتاب‌دهنده برنامه‌ریزی می‌شود', software: 'Cerebras Software Platform / PyTorch integration',
    workloads: ['آموزش مدل‌های بزرگ', 'HPC'], bestFit: 'آموزش مدل‌های بسیار بزرگ با معماری weight streaming و حافظهٔ جداشده.', caution: 'MemoryX معادل VRAM نیست؛ ظرفیت ۱۲TB تا ۱٫۲PB حافظهٔ خارجی را نباید در ستون حافظهٔ روی شتاب‌دهنده قرار داد.', serverReady: true,
    sourceUrl: 'https://www.cerebras.ai/blog/cerebras-cs-3-vs-nvidia-b200-2024-ai-accelerators-compared', sourceLabel: 'Cerebras CS-3 / WSE-3', productKind: 'سامانه', sourceTier: 'سازنده', dataDisclosure: { memoryGB: 'not-applicable', bandwidthTBs: 'not-applicable' },
    extraSpecs: [
      { group: 'تراشه', label: 'ترانزیستور / AI Core', value: 'بیش از ۴ تریلیون ترانزیستور؛ ۹۰۰٬۰۰۰ AI Core', basis: 'رسمی' },
      { group: 'محاسبات', label: 'FP16', value: '۱۲۵ PFLOPS در سطح سامانه', basis: 'رسمی' },
      { group: 'حافظه', label: 'MemoryX', value: '۱۲TB تا ۱٫۲PB حافظهٔ خارجی جداشده؛ تا مدل ۲۴ تریلیون پارامتری', basis: 'رسمی' },
      { group: 'ارتباط و شبکه', label: 'پارچهٔ روی ویفر', value: '۲۷ PB/s aggregate میان ۹۰۰٬۰۰۰ هسته', basis: 'رسمی' },
      { group: 'ارتباط و شبکه', label: 'مقیاس خوشه', value: 'تا ۲٬۰۴۸ سامانه با SwarmX؛ ۲۵۶ EFLOPS در پیکربندی کامل', basis: 'رسمی' }
    ]
  },
  {
    id: 'groq-lpu', vendor: 'Groq', model: 'Groq LPU Inference Engine', status: 'system-only', gpuClass: 'frontier', architecture: 'LPU programmable assembly line؛ 14nm', year: 2023,
    memoryGB: 0, memoryType: 'SRAM روی تراشه؛ ظرفیت عمومی SKUمحور منتشر نشده', bandwidthTBs: 80, powerW: null, formFactor: 'سامانه / GroqRack / GroqCloud', hostInterface: 'Groq system fabric', cooling: 'وابسته به سامانه',
    compute: 'سازنده در منبع انتخاب‌شده FLOPS/TOPS SKUمحور منتشر نمی‌کند و کارایی را با token/s و latency ارائه می‌دهد.', interconnect: 'پارچهٔ قطعی chip-to-chip با زمان‌بندی ایستا', partitioning: 'کامپایل و زمان‌بندی ایستا', software: 'Groq Compiler / GroqCloud API',
    workloads: ['استنتاج سازمانی'], bestFit: 'استنتاج کم‌تأخیر و قطعی برای LLM.', caution: 'بیش از ۸۰TB/s پهنای‌باند SRAM روی تراشه است؛ ظرفیت، توان و FLOPS مستقل در صفحهٔ معماری عمومی افشا نشده‌اند.', serverReady: true,
    sourceUrl: 'https://groq.com/blog/the-groq-lpu-explained', sourceLabel: 'Groq LPU architecture', productKind: 'سامانه', sourceTier: 'سازنده', dataDisclosure: { memoryGB: 'not-published', powerW: 'not-published' },
    extraSpecs: [
      { group: 'تراشه', label: 'فرایند ساخت نسل مستندشده', value: '۱۴ nm', basis: 'رسمی' },
      { group: 'حافظه', label: 'SRAM روی تراشه', value: 'پهنای‌باند بیش از ۸۰ TB/s؛ ظرفیت SKUمحور منتشر نشده', basis: 'رسمی' },
      { group: 'محاسبات', label: 'معیار انتشار', value: 'token/s و latency؛ FLOPS/TOPS مستقل در منبع عمومی درج نشده', basis: 'اعلام‌نشده توسط سازنده' }
    ]
  },
  {
    id: 'huawei-ascend-950dt', vendor: 'Huawei', model: 'Ascend 950DT', status: 'system-only', gpuClass: 'frontier', architecture: 'Da Vinci / Ascend 950', year: 2026,
    memoryGB: 96, memoryType: 'HBM ECC', bandwidthTBs: 4, powerW: null, formFactor: 'NPU سامانه‌ای / Atlas 650E', hostInterface: 'UBoE / PCIe 5.0 در سطح سامانه', cooling: 'هوایی در Atlas 650E',
    compute: 'به‌ازای هر NPU، از مشخصات رسمی سامانهٔ هشت‌NPU استخراج شده: ۴۲۵ TFLOPS FP16/BF16 و ۸۰۳٫۷۵ TFLOPS FP8/HiF8/mxFP8.', interconnect: 'Lingqu UB؛ ۷۸۴ GB/s دوطرفه به‌ازای NPU در یک سامانه', partitioning: 'سازنده برای NPU مستقل منتشر نکرده', software: 'CANN / MindSpore / PyTorch-NPU / MindIE',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'HPC'], bestFit: 'استنتاج و آموزش بزرگ در سامانه‌های نسل جدید Atlas؛ نه خرید به‌شکل کارت عمومی.', caution: 'اعداد توان و مکانیک برای NPU مستقل منتشر نشده‌اند؛ ۱۴٫۵kW توان ورودی بیشینهٔ کل سرور Atlas 650E است و نباید بر ۸ تقسیم شود.', serverReady: true,
    sourceUrl: 'https://www.hiascend.com/hardware/ai-server', sourceLabel: 'Huawei Atlas 650E / Ascend 950DT', productKind: 'پردازنده', sourceTier: 'سازنده',
    extraSpecs: [
      { group: 'محاسبات', label: 'mxFP4', value: '۱٬۵۶۰ TFLOPS به‌ازای NPU', basis: 'استخراج‌شده از سامانه' },
      { group: 'محاسبات', label: 'mxFP8 / FP8 / HiF8', value: '۸۰۳٫۷۵ TFLOPS به‌ازای NPU', basis: 'استخراج‌شده از سامانه' },
      { group: 'محاسبات', label: 'FP16 / BF16', value: '۴۲۵ TFLOPS به‌ازای NPU', basis: 'استخراج‌شده از سامانه' },
      { group: 'ارتباط و شبکه', label: 'UBoE / RoCE', value: '۴۰۰ Gbit/s یک‌طرفه به‌ازای NPU', basis: 'رسمی' },
      { group: 'ارتباط و شبکه', label: 'Lingqu UB', value: '۷۸۴ GB/s دوطرفه به‌ازای NPU در یک سرور؛ ۱٫۶۸ TB/s در پیکربندی دو سرور', basis: 'رسمی' },
      { group: 'توان و مکانیک', label: 'توان NPU', value: 'سازنده برای قطعهٔ مستقل منتشر نکرده', basis: 'اعلام‌نشده توسط سازنده' },
      { group: 'عرضه و منبع', label: 'شکل عرضه', value: 'در Atlas 650E هشت‌NPU؛ پردازندهٔ مستقل خرده‌فروشی نیست', basis: 'رسمی' }
    ]
  },
  {
    id: 'huawei-atlas-350', vendor: 'Huawei', model: 'Atlas 350 (Ascend 950PR)', status: 'current', gpuClass: 'server-pcie', architecture: 'Da Vinci / Ascend 950', year: 2026,
    memoryGB: 112, memoryType: 'HBM ECC', bandwidthTBs: 1.4, powerW: 600, formFactor: 'PCIe OH/FL/DW دو اسلات', hostInterface: 'PCIe 5.0 x16، ۱۲۸ GB/s دوطرفه', cooling: 'پسیو سروری',
    compute: 'کارت استنتاج چنددقتی با mxFP4، mxFP6، mxFP8، HiF8، INT8، FP16 و BF16.', interconnect: 'Lingqu UB؛ دو کارت تا ۴۲۴ GB/s و چهار کارت تا ۳۱۸ GB/s دوطرفه به‌ازای کارت', partitioning: 'سازنده در صفحهٔ عمومی محصول منتشر نکرده', software: 'CANN / MindSpore / PyTorch-NPU / MindIE',
    workloads: ['استنتاج سازمانی', 'آموزش مدل‌های بزرگ'], bestFit: 'استنتاج LLM، تولید چندوجهی و پیشنهادگر در سرور PCIe 5.0.', caution: 'FP8 اعلامی شامل mxFP8/HiF8 است و هم‌معنای دقیق E4M3/E5M2 دیگر سازندگان فرض نشود.', serverReady: true,
    sourceUrl: 'https://www.hiascend.com/hardware/accelerator-card', sourceLabel: 'Huawei Atlas 350', productKind: 'کارت', sourceTier: 'سازنده',
    extraSpecs: [
      { group: 'محاسبات', label: 'mxFP4', value: '۱٬۵۶۱ TFLOPS', basis: 'رسمی' },
      { group: 'محاسبات', label: 'mxFP8 / HiF8 / mxFP6 / INT8', value: '۸۰۴ TFLOPS', basis: 'رسمی' },
      { group: 'محاسبات', label: 'FP16 / BF16', value: '۴۲۵ TFLOPS', basis: 'رسمی' },
      { group: 'ارتباط و شبکه', label: 'Lingqu؛ دو کارت', value: '۴ × x4 UB؛ تا ۴۲۴ GB/s دوطرفه برای هر کارت', basis: 'رسمی' },
      { group: 'ارتباط و شبکه', label: 'Lingqu؛ چهار کارت', value: '۳ × x4 UB؛ تا ۳۱۸ GB/s دوطرفه برای هر کارت', basis: 'رسمی' },
      { group: 'توان و مکانیک', label: 'ابعاد', value: '۲۹۵ × ۱۳۷ × ۳۹٫۰۴ mm', basis: 'رسمی' },
      { group: 'توان و مکانیک', label: 'وزن', value: '۳٫۰ kg', basis: 'رسمی' },
      { group: 'توان و مکانیک', label: 'دمای کاری', value: '۵ تا ۳۵ درجهٔ سلسیوس', basis: 'رسمی' }
    ]
  },
  {
    id: 'huawei-ascend-910b3', vendor: 'Huawei', model: 'Ascend 910B3', status: 'current', gpuClass: 'datacenter', architecture: 'Da Vinci / Ascend 910B', year: 2023,
    memoryGB: 64, memoryType: 'HBM ECC', bandwidthTBs: 0, powerW: null, formFactor: 'NPU سامانه‌ای / Atlas 800T A2', hostInterface: 'HCCS / PCIe / RoCE در سطح سامانه', cooling: 'وابسته به سرور Atlas',
    compute: 'Huawei در مستندات عمومی قابل‌دسترسی، جدول کامل نرخ‌های هر SKU از 910B را منتشر نکرده است.', interconnect: 'HCCS؛ حداکثر ۳۹۲ GB/s دوطرفه برای خانوادهٔ 910 در مستندات HCCL', partitioning: 'Virtual NPU وابسته به CANN و SKU', software: 'CANN / MindSpore / PyTorch-NPU / MindIE',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی'], bestFit: 'خوشه‌های موجود Atlas 800T A2 و اکوسیستم CANN.', caution: '910B نام یک خانواده با چند SKU است؛ ظرفیت، تعداد AI Core و توان را باید با پارت‌نامبر دقیق سرور تطبیق داد.', serverReady: true,
    sourceUrl: 'https://www.hiascend.com/developer/blog/details/02162212217069313067', sourceLabel: 'Huawei Ascend 910B / Atlas 800T A2', productKind: 'پردازنده', sourceTier: 'مستندات فنی سازنده', dataDisclosure: { bandwidthTBs: 'not-published', powerW: 'not-published' },
    extraSpecs: [
      { group: 'تراشه', label: 'AI Core فعال در 910B3 مستندشده', value: '۲۰ هسته', basis: 'رسمی' },
      { group: 'حافظه', label: 'ظرفیت', value: '۶۴ GB برای هر NPU در Atlas 800T A2 مستندشده', basis: 'رسمی' },
      { group: 'حافظه', label: 'پهنای‌باند', value: 'در منبع رسمی انتخاب‌شده اعلام نشده', basis: 'اعلام‌نشده توسط سازنده' },
      { group: 'محاسبات', label: 'FP16 / BF16 / FP32 / INT8', value: 'جدول SKUمحور رسمی در منبع عمومی انتخاب‌شده در دسترس نیست', basis: 'اعلام‌نشده توسط سازنده' },
      { group: 'عرضه و منبع', label: 'هشدار SKU', value: '910B1، 910B2، 910B3 و 910B4 مشخصات یکسان ندارند', basis: 'رسمی' }
    ]
  },
  {
    id: 'huawei-ascend-910c', vendor: 'Huawei', model: 'Ascend 910C', status: 'system-only', gpuClass: 'frontier', architecture: 'Da Vinci / Ascend 910C', year: 2025,
    memoryGB: 0, memoryType: 'HBM؛ ظرفیت SKUمحور', bandwidthTBs: 0, powerW: null, formFactor: 'NPU سامانه‌ای / CloudMatrix 384 و Atlas A3', hostInterface: 'HCCS / SuperNode fabric', cooling: 'وابسته به سامانه',
    compute: 'Huawei محصول را در سطح سامانه عرضه و معرفی می‌کند؛ مشخصات مستقل و SKUمحور تراشه در صفحهٔ عمومی کامل افشا نشده است.', interconnect: 'HCCS / CloudMatrix SuperNode', partitioning: 'وابسته به CANN و سامانه', software: 'CANN / MindSpore / PyTorch-NPU / MindIE',
    workloads: ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی'], bestFit: 'سامانه‌های Ascend A3 و CloudMatrix؛ نه مقایسهٔ کارت مستقل.', caution: 'عددهای سطح CloudMatrix 384 را نباید بدون سند SKU به هر 910C تقسیم و به‌عنوان مشخصات کارت منتشر کرد.', serverReady: true,
    sourceUrl: 'https://www.hiascend.com/hardware/cluster?tag=900A3', sourceLabel: 'Huawei Atlas A3 / Ascend 910C', productKind: 'پردازنده', sourceTier: 'سازنده', dataDisclosure: { memoryGB: 'not-published', bandwidthTBs: 'not-published', powerW: 'not-published' },
    extraSpecs: [
      { group: 'عرضه و منبع', label: 'شکل عرضهٔ عمومی', value: 'CloudMatrix 384 و سامانه‌های Atlas A3', basis: 'رسمی' },
      { group: 'حافظه', label: 'ظرفیت و پهنای‌باند هر NPU', value: 'در منبع رسمی انتخاب‌شده به‌صورت SKUمحور منتشر نشده', basis: 'اعلام‌نشده توسط سازنده' },
      { group: 'محاسبات', label: 'توان هر NPU', value: 'در منبع رسمی انتخاب‌شده به‌صورت SKUمحور منتشر نشده', basis: 'اعلام‌نشده توسط سازنده' },
      { group: 'توان و مکانیک', label: 'توان هر NPU', value: 'در منبع رسمی انتخاب‌شده منتشر نشده', basis: 'اعلام‌نشده توسط سازنده' }
    ]
  },
  {
    id: 'huawei-atlas-300i-duo', vendor: 'Huawei', model: 'Atlas 300I Duo', status: 'current', gpuClass: 'server-pcie', architecture: 'Da Vinci / Ascend 310P', year: 2022,
    memoryGB: 96, memoryDisplay: '۴۸ یا ۹۶', memoryType: 'LPDDR4X ECC', bandwidthTBs: 0.408, powerW: 150, formFactor: 'PCIe FHFL تک‌اسلات', hostInterface: 'PCIe 4.0 x16؛ سازگار با x8/x4/x2', cooling: 'پسیو سروری',
    compute: '۱۴۰ TFLOPS FP16 و ۲۸۰ TOPS INT8 در سطح یک کارت.', interconnect: 'PCIe؛ ارتباط چندکارتی وابسته به سرور', partitioning: 'Virtual NPU / CANN، وابسته به نسخه', software: 'CANN / MindSpore / PyTorch-NPU / MindIE',
    workloads: ['استنتاج سازمانی'], bestFit: 'استنتاج، OCR، جست‌وجو، تحلیل تصویر و ویدئوی پرتراکم.', caution: 'این کارت برای استنتاج و پردازش رسانه طراحی شده؛ FP32/FP64 و آموزش عمومی GPU را جایگزین نمی‌کند.', serverReady: true,
    sourceUrl: 'https://e.huawei.com/cn/products/computing/ascend/atlas-300i-duo', sourceLabel: 'Huawei Atlas 300I Duo', productKind: 'کارت', sourceTier: 'سازنده',
    extraSpecs: [
      { group: 'محاسبات', label: 'INT8', value: '۲۸۰ TOPS', basis: 'رسمی' },
      { group: 'محاسبات', label: 'FP16', value: '۱۴۰ TFLOPS', basis: 'رسمی' },
      { group: 'تراشه', label: 'CPU روی کارت', value: '۱۶ هسته، ۱٫۹ GHz', basis: 'رسمی' },
      { group: 'رسانه', label: 'H.264/H.265 decode', value: '۲۵۶ × 1080p30 یا ۳۲ × 4K60', basis: 'رسمی' },
      { group: 'رسانه', label: 'H.264/H.265 encode', value: '۴۸ × 1080p30 یا ۶ × 4K60', basis: 'رسمی' },
      { group: 'رسانه', label: 'JPEG', value: 'decode: 4K@1024fps؛ encode: 4K@512fps؛ بیشینه 8192×8192', basis: 'رسمی' },
      { group: 'توان و مکانیک', label: 'ابعاد', value: '۲۶۶٫۷ × ۱۱۱٫۱۵ × ۱۸٫۴۶ mm', basis: 'رسمی' },
      { group: 'توان و مکانیک', label: 'دمای کاری', value: '۰ تا ۵۵ درجهٔ سلسیوس', basis: 'رسمی' }
    ]
  },
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

const computeSpecs: Record<string, GpuComputeSpec> = {
  'google-tpu7x': {
    generalCoreCount: 4, generalCoreLabel: 'SparseCore', matrixCoreCount: 2, matrixCoreLabel: 'TensorCore',
    fp4: { dense: null }, fp8: { dense: 4614 }, bf16: { dense: 2307 }, fp16: { dense: null }, fp32: null, fp64: null, int8: { dense: null }, int4: { dense: null },
    computeFootnote: 'اعداد برای یک تراشهٔ TPU7x شامل دو chiplet هستند. Google نرخ مستقل FP16، FP32، FP64، INT8 و INT4 را در برگهٔ انتخاب‌شده منتشر نکرده است.',
    disclosure: { generalCoreCount: 'published', matrixCoreCount: 'published', fp4: 'not-published', fp8: 'published', bf16: 'published', fp16: 'not-published', fp32: 'not-published', fp64: 'not-published', int8: 'not-published', int4: 'not-published' }
  },
  'google-tpu-v6e': {
    generalCoreCount: 2, generalCoreLabel: 'MXU', matrixCoreCount: 1, matrixCoreLabel: 'TensorCore',
    fp4: { dense: null }, fp8: { dense: null }, bf16: { dense: 918 }, fp16: { dense: null }, fp32: null, fp64: null, int8: { dense: 1836 }, int4: { dense: null },
    computeFootnote: 'Google نرخ ۹۱۸ TFLOPS را برای BF16 و ۱٬۸۳۶ TOPS را برای INT8 در سطح هر تراشه منتشر می‌کند؛ نرخ مستقل سایر دقت‌های این جدول اعلام نشده است.',
    disclosure: { generalCoreCount: 'published', matrixCoreCount: 'published', fp4: 'not-published', fp8: 'not-published', bf16: 'published', fp16: 'not-published', fp32: 'not-published', fp64: 'not-published', int8: 'published', int4: 'not-published' }
  },
  'google-tpu-v5p': {
    generalCoreCount: 4, generalCoreLabel: 'SparseCore', matrixCoreCount: 2, matrixCoreLabel: 'TensorCore',
    fp4: { dense: null }, fp8: { dense: 459 }, bf16: { dense: 459 }, fp16: { dense: null }, fp32: null, fp64: null, int8: { dense: null }, int4: { dense: null },
    computeFootnote: 'اعداد FP8 و BF16 برای هر تراشهٔ Cloud TPU v5p هستند. سایر نرخ‌ها در جدول رسمی مشخصات v5p منتشر نشده‌اند.',
    disclosure: { generalCoreCount: 'published', matrixCoreCount: 'published', fp4: 'not-published', fp8: 'published', bf16: 'published', fp16: 'not-published', fp32: 'not-published', fp64: 'not-published', int8: 'not-published', int4: 'not-published' }
  },
  'aws-trainium2': {
    generalCoreCount: null, generalCoreLabel: 'NeuronCore', matrixCoreCount: null, matrixCoreLabel: 'Tensor Engine',
    fp4: { dense: null }, fp8: { dense: 1300 }, bf16: { dense: null }, fp16: { dense: null }, fp32: null, fp64: null, int8: { dense: null }, int4: { dense: null },
    computeFootnote: 'FP8 هر تراشه از مجموع رسمی ۲۰٫۸ PFLOPS نمونهٔ ۱۶‌تراشه‌ای Trn2 استخراج شده است. AWS پشتیبانی FP32/TF32/BF16/FP16/cFP8 را اعلام می‌کند، اما نرخ مستقل همهٔ قالب‌ها را در این منبع نمی‌دهد.',
    disclosure: { generalCoreCount: 'not-published', matrixCoreCount: 'not-published', fp4: 'not-published', fp8: 'derived', bf16: 'not-published', fp16: 'not-published', fp32: 'not-published', fp64: 'not-published', int8: 'not-published', int4: 'not-published' }
  },
  'tenstorrent-blackhole-p150': {
    generalCoreCount: 120, generalCoreLabel: 'Tensix Core', matrixCoreCount: null, matrixCoreLabel: 'واحد ماتریسی مستقل',
    fp4: { dense: null }, fp8: { dense: null }, bf16: { dense: null }, fp16: { dense: null }, fp32: null, fp64: null, int8: { dense: null }, int4: { dense: null },
    computeFootnote: '۶۶۴ TFLOPS اعلامی از نوع BLOCKFP8 است و عمداً در ستون FP8 استاندارد قرار نگرفته؛ نرخ‌های هم‌سنخ دیگر در صفحهٔ عمومی کارت منتشر نشده‌اند.',
    disclosure: { generalCoreCount: 'published', matrixCoreCount: 'not-applicable', fp4: 'not-published', fp8: 'not-published', bf16: 'not-published', fp16: 'not-published', fp32: 'not-published', fp64: 'not-published', int8: 'not-published', int4: 'not-published' }
  },
  'tenstorrent-wormhole-n300d': {
    generalCoreCount: 128, generalCoreLabel: 'Tensix Core فعال', matrixCoreCount: null, matrixCoreLabel: 'واحد ماتریسی مستقل',
    fp4: { dense: null }, fp8: { dense: 466 }, bf16: { dense: null }, fp16: { dense: 131 }, fp32: null, fp64: null, int8: { dense: null }, int4: { dense: null },
    computeFootnote: '۴۶۶ TFLOPS FP8 و ۱۳۱ TFLOPS FP16 برای کل کارت دوASIC هستند. نرخ ۲۶۲ TFLOPS BLOCKFP8 جداگانه در شناسنامه آمده و با FP8 ادغام نشده است.',
    disclosure: { generalCoreCount: 'published', matrixCoreCount: 'not-applicable', fp4: 'not-published', fp8: 'published', bf16: 'not-published', fp16: 'published', fp32: 'not-published', fp64: 'not-published', int8: 'not-published', int4: 'not-published' }
  },
  'qualcomm-cloud-ai-100-ultra': {
    generalCoreCount: 64, generalCoreLabel: 'AI Core (تا)', matrixCoreCount: null, matrixCoreLabel: 'واحد ماتریسی مستقل',
    fp4: { dense: null }, fp8: { dense: null }, bf16: { dense: null }, fp16: { dense: null }, fp32: null, fp64: null, int8: { dense: null }, int4: { dense: null },
    computeFootnote: 'Qualcomm اوج ۸۷۰ TOPS و ۲۸۸ TFLOPS را اعلام می‌کند، ولی در صفحهٔ محصول آن‌ها را به یک دقت مشخص از ستون‌های حاضر نگاشت نمی‌کند؛ بنابراین عددی به زور در FP8/FP16/INT8 قرار نگرفته است.',
    disclosure: { generalCoreCount: 'published', matrixCoreCount: 'not-applicable', fp4: 'not-published', fp8: 'not-published', bf16: 'not-published', fp16: 'not-published', fp32: 'not-published', fp64: 'not-published', int8: 'not-published', int4: 'not-published' }
  },
  'cerebras-cs3': {
    generalCoreCount: 900000, generalCoreLabel: 'AI Core روی ویفر', matrixCoreCount: null, matrixCoreLabel: 'واحد ماتریسی مستقل',
    fp4: { dense: null }, fp8: { dense: null }, bf16: { dense: null }, fp16: { dense: 125000 }, fp32: null, fp64: null, int8: { dense: null }, int4: { dense: null },
    computeFootnote: '۱۲۵٬۰۰۰ TFLOPS FP16 عدد سطح سامانهٔ CS-3/WSE-3 است، نه کارت یا تراشهٔ قابل‌تعویض. معماری wafer-scale با GPU یا TPU یک‌به‌یک هم‌سنخ نیست.',
    disclosure: { generalCoreCount: 'published', matrixCoreCount: 'not-applicable', fp4: 'not-published', fp8: 'not-published', bf16: 'not-published', fp16: 'published', fp32: 'not-published', fp64: 'not-published', int8: 'not-published', int4: 'not-published' }
  },
  'groq-lpu': {
    generalCoreCount: null, generalCoreLabel: 'Functional Unit / LPU', matrixCoreCount: null, matrixCoreLabel: 'واحد ماتریسی مستقل',
    fp4: { dense: null }, fp8: { dense: null }, bf16: { dense: null }, fp16: { dense: null }, fp32: null, fp64: null, int8: { dense: null }, int4: { dense: null },
    computeFootnote: 'منبع معماری عمومی Groq پهنای‌باند SRAM و مدل اجرای قطعی را توضیح می‌دهد، اما نرخ FLOPS/TOPS، ظرفیت و توان SKUمحور مستقل منتشر نمی‌کند.',
    disclosure: { generalCoreCount: 'not-published', matrixCoreCount: 'not-applicable', fp4: 'not-published', fp8: 'not-published', bf16: 'not-published', fp16: 'not-published', fp32: 'not-published', fp64: 'not-published', int8: 'not-published', int4: 'not-published' }
  },
  'huawei-ascend-950dt': {
    generalCoreCount: null, generalCoreLabel: 'AI Core / Vector Core', matrixCoreCount: null, matrixCoreLabel: 'Cube / Matrix Engine',
    fp4: { dense: 1560 }, fp8: { dense: 803.75 }, bf16: { dense: 425 }, fp16: { dense: 425 }, fp32: null, fp64: null, int8: { dense: null }, int4: { dense: null },
    computeFootnote: 'FP4 و FP8 از نرخ رسمی سامانهٔ هشت‌NPU Atlas 650E تقسیم بر ۸ استخراج شده‌اند. قالب‌ها mxFP4 و mxFP8/FP8/HiF8 هستند؛ شمار هسته و FP32/FP64 مستقل منتشر نشده است.',
    disclosure: { generalCoreCount: 'not-published', matrixCoreCount: 'not-published', fp4: 'derived', fp8: 'derived', bf16: 'derived', fp16: 'derived', fp32: 'not-published', fp64: 'not-published', int8: 'not-published', int4: 'not-published' }
  },
  'huawei-atlas-350': {
    generalCoreCount: null, generalCoreLabel: 'AI Core / Vector Core', matrixCoreCount: null, matrixCoreLabel: 'Cube / Matrix Engine',
    fp4: { dense: 1561 }, fp8: { dense: 804 }, bf16: { dense: 425 }, fp16: { dense: 425 }, fp32: null, fp64: null, int8: { dense: 804 }, int4: { dense: null },
    computeFootnote: 'Huawei مقدار ۸۰۴ را مشترکاً برای mxFP8/HiF8/mxFP6/INT8 اعلام کرده است؛ بنابراین قالب دقیق هر ستون را از یادداشت حذف نکنید. تعداد AI Core و نرخ FP32/FP64 عمومی اعلام نشده است.',
    disclosure: { generalCoreCount: 'not-published', matrixCoreCount: 'not-published', fp4: 'published', fp8: 'published', bf16: 'published', fp16: 'published', fp32: 'not-published', fp64: 'not-published', int8: 'published', int4: 'not-published' }
  },
  'huawei-ascend-910b3': {
    generalCoreCount: 20, generalCoreLabel: 'AI Core فعال (SKU B3)', matrixCoreCount: null, matrixCoreLabel: 'Cube / Matrix Engine',
    fp8: { dense: null }, fp16: { dense: null }, fp32: null, fp64: null,
    computeFootnote: 'مستند رسمی انتخاب‌شده ۲۰ AI Core و ۶۴GB HBM را برای 910B3 نشان می‌دهد، اما جدول کامل نرخ‌های محاسباتی SKUمحور را منتشر نمی‌کند.',
    disclosure: { generalCoreCount: 'published', matrixCoreCount: 'not-published', fp4: 'not-published', fp8: 'not-published', bf16: 'not-published', fp16: 'not-published', fp32: 'not-published', fp64: 'not-published', int8: 'not-published', int4: 'not-published' }
  },
  'huawei-ascend-910c': {
    generalCoreCount: null, generalCoreLabel: 'AI Core', matrixCoreCount: null, matrixCoreLabel: 'Cube / Matrix Engine',
    fp8: { dense: null }, fp16: { dense: null }, fp32: null, fp64: null,
    computeFootnote: 'اطلاعات عمومی Huawei عمدتاً در سطح Atlas A3 و CloudMatrix منتشر شده است. نرخ یا ظرفیت سطح سامانه بدون سند رسمی SKU به عدد هر NPU تبدیل نشده است.',
    disclosure: { generalCoreCount: 'not-published', matrixCoreCount: 'not-published', fp4: 'not-published', fp8: 'not-published', bf16: 'not-published', fp16: 'not-published', fp32: 'not-published', fp64: 'not-published', int8: 'not-published', int4: 'not-published' }
  },
  'huawei-atlas-300i-duo': {
    generalCoreCount: null, generalCoreLabel: 'AI Core', matrixCoreCount: null, matrixCoreLabel: 'Cube / Matrix Engine',
    fp8: { dense: null }, fp16: { dense: 140 }, fp32: null, fp64: null, int8: { dense: 280 },
    computeFootnote: 'اعداد ۱۴۰ TFLOPS FP16 و ۲۸۰ TOPS INT8 برای کل کارت Atlas 300I Duo هستند. FP32/FP64 و شمار AI Core در صفحهٔ عمومی محصول اعلام نشده‌اند.',
    disclosure: { generalCoreCount: 'not-published', matrixCoreCount: 'not-published', fp4: 'not-supported', fp8: 'not-published', bf16: 'not-published', fp16: 'published', fp32: 'not-published', fp64: 'not-published', int8: 'published', int4: 'not-published' }
  },
  'amd-mi455x': {
    generalCoreCount: 256, generalCoreLabel: 'WGP', matrixCoreCount: null, matrixCoreLabel: 'Matrix Core',
    fp8: { dense: 20100 }, fp16: { dense: 5000, sparse: 10100 }, fp32: 315, fp64: 5,
    computeFootnote: 'FP8 از نوع OCP است؛ AMD تعداد Stream Processor یا Matrix Core را برای این SKU اعلام نکرده است.'
  },
  'nvidia-rubin': {
    generalCoreCount: null, generalCoreLabel: 'CUDA Core', matrixCoreCount: null, matrixCoreLabel: 'Tensor Core',
    fp8: { dense: 17500 }, fp16: { dense: 4000 }, fp32: 130, fp64: 33,
    computeFootnote: 'مشخصات اولیه و تا سقف اعلامی هر GPU؛ FP8/FP6 برای آموزش و به‌صورت dense است.'
  },
  'nvidia-b300': {
    generalCoreCount: 20480, generalCoreLabel: 'CUDA Core (تا)', matrixCoreCount: 640, matrixCoreLabel: 'Tensor Core (تا)',
    fp8: { dense: 4500, sparse: 9000 }, fp16: { dense: 2250, sparse: 4500 }, fp32: 75, fp64: null,
    computeFootnote: 'تعداد هسته از پیکربندی کامل ۱۶۰ SM به‌دست می‌آید و با SKU تغییر می‌کند؛ نرخ‌های FP از HGX هشت‌GPU محاسبه شده‌اند.'
  },
  'nvidia-b200': {
    generalCoreCount: null, generalCoreLabel: 'CUDA Core', matrixCoreCount: null, matrixCoreLabel: 'Tensor Core',
    fp8: { dense: 4500, sparse: 9000 }, fp16: { dense: 2250, sparse: 4500 }, fp32: 75, fp64: 37,
    computeFootnote: 'نرخ‌های هر GPU از مشخصات رسمی HGX B200 هشت‌GPU استخراج شده‌اند؛ تعداد هسته در برگهٔ SKU اعلام نشده است.'
  },
  'amd-mi355x': {
    generalCoreCount: 16384, generalCoreLabel: 'Stream Processor', matrixCoreCount: 1024, matrixCoreLabel: 'Matrix Core',
    fp8: { dense: 5000, sparse: 10100 }, fp16: { dense: 2500, sparse: 5000 }, fp32: 157.3, fp64: 78.6
  },
  'amd-mi350x': {
    generalCoreCount: 16384, generalCoreLabel: 'Stream Processor', matrixCoreCount: 1024, matrixCoreLabel: 'Matrix Core',
    fp8: { dense: 4600, sparse: 9200 }, fp16: { dense: 2300, sparse: 4600 }, fp32: 144.2, fp64: 72.1
  },
  'amd-mi325x': {
    generalCoreCount: 19456, generalCoreLabel: 'Stream Processor', matrixCoreCount: 1216, matrixCoreLabel: 'Matrix Core',
    fp8: { dense: 2610, sparse: 5220 }, fp16: { dense: 1300, sparse: 2610 }, fp32: 163.4, fp64: 81.7
  },
  'amd-mi300x': {
    generalCoreCount: 19456, generalCoreLabel: 'Stream Processor', matrixCoreCount: 1216, matrixCoreLabel: 'Matrix Core',
    fp8: { dense: 2610, sparse: 5220 }, fp16: { dense: 1300, sparse: 2610 }, fp32: 163.4, fp64: 81.7
  },
  'nvidia-h200-sxm': {
    generalCoreCount: 16896, generalCoreLabel: 'CUDA Core', matrixCoreCount: 528, matrixCoreLabel: 'Tensor Core',
    fp8: { dense: 1979, sparse: 3958 }, fp16: { dense: 989.5, sparse: 1979 }, fp32: 67, fp64: 34
  },
  'nvidia-h200-nvl': {
    generalCoreCount: 14592, generalCoreLabel: 'CUDA Core', matrixCoreCount: 456, matrixCoreLabel: 'Tensor Core',
    fp8: { dense: 1670.5, sparse: 3341 }, fp16: { dense: 835.5, sparse: 1671 }, fp32: 60, fp64: 30
  },
  'intel-gaudi3-pcie': {
    generalCoreCount: 64, generalCoreLabel: 'TPC', matrixCoreCount: 8, matrixCoreLabel: 'MME',
    fp8: { dense: 1800 }, fp16: { dense: null }, fp32: null, fp64: null,
    computeFootnote: 'Intel توان ۱٫۸ PFLOPS را برای FP8 و BF16 اعلام می‌کند؛ نرخ مستقل FP16/FP32/FP64 در Product Brief درج نشده است.'
  },
  'nvidia-h100-nvl': {
    generalCoreCount: 14592, generalCoreLabel: 'CUDA Core', matrixCoreCount: 456, matrixCoreLabel: 'Tensor Core',
    fp8: { dense: 1670.5, sparse: 3341 }, fp16: { dense: 835.5, sparse: 1671 }, fp32: 60, fp64: 30
  },
  'nvidia-rtx-pro-6000-server': {
    generalCoreCount: 24064, generalCoreLabel: 'CUDA Core', matrixCoreCount: 752, matrixCoreLabel: 'Tensor Core',
    fp8: { dense: 1000, sparse: 2000 }, fp16: { dense: 500, sparse: 1000 }, fp32: 120, fp64: 1.9,
    computeFootnote: 'نرخ‌های Tensor به‌صورت dense/sparse نمایش داده شده‌اند؛ FP64 برای سازگاری است و ۱/۶۴ نرخ FP32 است.'
  },
  'nvidia-h100-sxm': {
    generalCoreCount: 16896, generalCoreLabel: 'CUDA Core', matrixCoreCount: 528, matrixCoreLabel: 'Tensor Core',
    fp8: { dense: 1979, sparse: 3958 }, fp16: { dense: 989.5, sparse: 1979 }, fp32: 67, fp64: 34
  },
  'nvidia-a100-sxm': {
    generalCoreCount: 6912, generalCoreLabel: 'CUDA Core', matrixCoreCount: 432, matrixCoreLabel: 'Tensor Core',
    fp8: { dense: null }, fp16: { dense: 312, sparse: 624 }, fp32: 19.5, fp64: 9.7
  },
  'nvidia-a100-pcie': {
    generalCoreCount: 6912, generalCoreLabel: 'CUDA Core', matrixCoreCount: 432, matrixCoreLabel: 'Tensor Core',
    fp8: { dense: null }, fp16: { dense: 312, sparse: 624 }, fp32: 19.5, fp64: 9.7
  },
  'amd-mi210': {
    generalCoreCount: 6656, generalCoreLabel: 'Stream Processor', matrixCoreCount: null, matrixCoreLabel: 'Matrix Core',
    fp8: { dense: null }, fp16: { dense: 181 }, fp32: 22.6, fp64: 22.6
  },
  'nvidia-l40s': {
    generalCoreCount: 18176, generalCoreLabel: 'CUDA Core', matrixCoreCount: 568, matrixCoreLabel: 'Tensor Core',
    fp8: { dense: 733, sparse: 1466 }, fp16: { dense: 362.1, sparse: 733 }, fp32: 91.6, fp64: null
  },
  'nvidia-rtx6000-ada': {
    generalCoreCount: 18176, generalCoreLabel: 'CUDA Core', matrixCoreCount: 568, matrixCoreLabel: 'Tensor Core',
    fp8: { dense: 728.5, sparse: 1457 }, fp16: { dense: 364, sparse: 728 }, fp32: 91.1, fp64: 1.4,
    computeFootnote: 'FP64 برای سازگاری است و تقریباً ۱/۶۴ نرخ FP32؛ برای HPC دو‌دقتی مناسب نیست.'
  },
  'amd-r9700': {
    generalCoreCount: 4096, generalCoreLabel: 'Stream Processor', matrixCoreCount: 128, matrixCoreLabel: 'AI Accelerator',
    fp8: { dense: 383, sparse: 766 }, fp16: { dense: 191, sparse: 383 }, fp32: 47.8, fp64: null
  },
  'nvidia-rtx5090': {
    generalCoreCount: 21760, generalCoreLabel: 'CUDA Core', matrixCoreCount: 680, matrixCoreLabel: 'Tensor Core',
    fp8: { dense: 838, sparse: 1676 }, fp16: { dense: 419, sparse: 838 }, fp32: 104.8, fp64: 1.6,
    computeFootnote: 'FP64 برای سازگاری است و تقریباً ۱/۶۴ نرخ FP32؛ اعداد Tensor بر مبنای FP16 accumulate هستند.'
  },
  'nvidia-rtx4090': {
    generalCoreCount: 16384, generalCoreLabel: 'CUDA Core', matrixCoreCount: 512, matrixCoreLabel: 'Tensor Core',
    fp8: { dense: 660.6, sparse: 1321.2 }, fp16: { dense: 330.3, sparse: 660.6 }, fp32: 82.6, fp64: 1.3,
    computeFootnote: 'FP64 برای سازگاری است و تقریباً ۱/۶۴ نرخ FP32؛ اعداد Tensor بر مبنای FP16 accumulate هستند.'
  }
};

const emptyCompute: GpuComputeSpec = {
  generalCoreCount: null, generalCoreLabel: 'هستهٔ عمومی', matrixCoreCount: null, matrixCoreLabel: 'هستهٔ ماتریسی',
  fp4: { dense: null }, fp8: { dense: null }, bf16: { dense: null }, fp16: { dense: null }, fp32: null, fp64: null, int8: { dense: null }, int4: { dense: null }
};

export const gpuRecords: GpuRecord[] = rows.map((row) => ({ ...row, ...emptyCompute, ...computeSpecs[row.id] }));
export const gpuWorkloads: GpuWorkload[] = ['آموزش مدل‌های بزرگ', 'استنتاج سازمانی', 'هوش مصنوعی محلی', 'HPC', 'گرافیک و رندر', 'چندمستاجری'];
