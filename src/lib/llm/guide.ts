import { llmDataset, llmDatasetUpdatedOn } from './data/repository.v1';
import type { GuideCollection } from '$lib/guides';
import type {
  ApplicationTaxon,
  ExistingContentLink,
  LlmGuideRepository,
  PlannedArticle,
  SoftwareRole
} from './schema';

export const llmGuideCollection: GuideCollection = {
  slug: 'llm',
  status: 'draft',
  featured: true,
  title: 'راهنمای انتخاب مدل زبانی',
  subtitle: 'از کاربرد تا سخت‌افزار و کارایی؛ مقایسهٔ مدل‌ها و ابزارهای اجرا بر پایهٔ منابع منتشرشده.',
  eyebrow: 'پیش‌نویس · مدل و استنتاج',
  image: '/images/guides/llm.png',
  imageAlt: 'مدل‌های زبانی در اندازه‌های مختلف، متصل به کاربردهای گفت‌وگو، کدنویسی و کار با اسناد',
  intro: 'این راهنما از مستندات سازندگان، نتایج منتشرشده و جمع‌بندی فنی استفاده می‌کند؛ شرایط و منابع هر مورد در جزئیات آمده است.',
  items: [
    { id: 'model-catalog', title: 'شناسنامهٔ مدل‌ها', subtitle: '', kind: 'interactive', href: '#model-catalog' },
    { id: 'model-suitability', title: 'تناسب مدل با کاربرد', subtitle: '', kind: 'interactive', href: '#model-suitability' },
    { id: 'hardware-feasibility', title: 'امکان اجرا روی سخت‌افزار', subtitle: '', kind: 'interactive', href: '#hardware-feasibility' },
    { id: 'serving-software', title: 'نرم‌افزارهای اجرا و سرویس‌دهی', subtitle: '', kind: 'interactive', href: '#serving-software' },
    { id: 'benchmarks', title: 'بنچمارک و شواهد', subtitle: '', kind: 'interactive', href: '#benchmarks' },
    { id: 'specialized-models', title: 'مدل‌های کوچک و تخصصی مکمل', subtitle: '', kind: 'interactive', href: '#specialized-models' }
  ]
};

export const applications: ApplicationTaxon[] = [
  {
    id: 'text-work',
    label: 'گفت‌وگو و کار با متن',
    subapplications: [
      { id: 'translation', label: 'ترجمه' },
      { id: 'summarization', label: 'خلاصه‌سازی' },
      { id: 'rewriting', label: 'بازنویسی' }
    ]
  },
  {
    id: 'enterprise-rag',
    label: 'دستیار دانش سازمانی و RAG',
    subapplications: [
      { id: 'retrieval', label: 'بازیابی' },
      { id: 'reranking', label: 'بازمرتب‌سازی' },
      { id: 'grounded-answering', label: 'پاسخ مبتنی بر سند' }
    ]
  },
  {
    id: 'structured-extraction',
    label: 'استخراج اطلاعات و خروجی ساخت‌یافته',
    subapplications: [
      { id: 'classification', label: 'طبقه‌بندی' },
      { id: 'ner', label: 'تشخیص موجودیت نامدار' },
      { id: 'field-extraction', label: 'استخراج فیلد' },
      { id: 'json-output', label: 'خروجی JSON' },
      { id: 'text-to-sql', label: 'Text-to-SQL' }
    ]
  },
  {
    id: 'coding-assistant',
    label: 'دستیار برنامه‌نویسی',
    subapplications: [
      { id: 'code-completion', label: 'تکمیل کد' },
      { id: 'code-chat', label: 'گفت‌وگو دربارهٔ کد' },
      { id: 'repository-editing', label: 'اصلاح مخزن' }
    ]
  },
  {
    id: 'agents-tools',
    label: 'عامل و استفاده از ابزار',
    subapplications: [
      { id: 'tool-calling', label: 'فراخوانی ابزار' },
      { id: 'workflow-agent', label: 'اجرای گردش‌کار' }
    ]
  },
  {
    id: 'reasoning-analysis',
    label: 'استدلال و تحلیل',
    subapplications: [
      { id: 'reasoning', label: 'استدلال' },
      { id: 'analysis', label: 'تحلیل' }
    ]
  },
  {
    id: 'document-vision',
    label: 'فهم سند و ورودی تصویری',
    subapplications: [
      { id: 'ocr', label: 'OCR' },
      { id: 'table-understanding', label: 'فهم جدول' },
      { id: 'chart-understanding', label: 'فهم نمودار' }
    ]
  }
];

/** Candidate taxonomy only; an option here is not a verified model row. */
export const modelFamilyCandidates = [
  'Qwen', 'DeepSeek', 'Aya / Cohere', 'Gemma', 'Llama', 'Mistral', 'GLM',
  'gpt-oss', 'Phi', 'Granite', 'Nemotron', 'OLMo', 'Kimi', 'MiniMax', 'SmolLM', 'BGE', 'E5'
] as const;

/**
 * Local, non-overlapping navigation bands. They are not a universal SLM
 * definition. MoE placement uses total parameters; active parameters remain a
 * separate filter and field.
 */
export const guideParameterBands = [
  { id: 'under-3b', label: 'کمتر از ۳ میلیارد', minInclusive: 0, maxExclusive: 3 },
  { id: '3b-to-under-9b', label: 'از ۳ میلیارد تا کمتر از ۹ میلیارد', minInclusive: 3, maxExclusive: 9 },
  { id: '9b-to-under-30b', label: 'از ۹ میلیارد تا کمتر از ۳۰ میلیارد', minInclusive: 9, maxExclusive: 30 },
  { id: '30b-to-under-70b', label: 'از ۳۰ میلیارد تا کمتر از ۷۰ میلیارد', minInclusive: 30, maxExclusive: 70 },
  { id: '70b-and-more', label: '۷۰ میلیارد و بیشتر', minInclusive: 70, maxExclusive: null }
] as const;

export const engineCandidates = ['vLLM', 'SGLang', 'llama.cpp', 'Transformers', 'AirLLM'] as const;

export interface SoftwareProductCandidate {
  id: string;
  name: string;
  officialUrl: string;
  /** Navigation hints only; verified capabilities belong to versioned rows. */
  roleHints: SoftwareRole[];
  maintenanceHint?: { status: 'maintenance'; reviewedOn: string; sourceUrl: string };
}

/**
 * Product taxonomy based on official project documentation. Presence here is
 * not evidence of compatibility, performance, or a capability in any release.
 */
export const softwareProductCandidates: SoftwareProductCandidate[] = [
  {
    id: 'ollama', name: 'Ollama', officialUrl: 'https://docs.ollama.com/faq',
    roleHints: ['inference-engine-library', 'api-server', 'model-manager']
  },
  {
    id: 'vllm', name: 'vLLM', officialUrl: 'https://github.com/vllm-project/vllm',
    roleHints: ['inference-engine-library', 'api-server']
  },
  {
    id: 'sglang', name: 'SGLang', officialUrl: 'https://github.com/sgl-project/sglang',
    roleHints: ['inference-engine-library', 'api-server']
  },
  {
    id: 'llama-cpp', name: 'llama.cpp / llama-server',
    officialUrl: 'https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md',
    roleHints: ['inference-engine-library', 'api-server', 'user-interface']
  },
  {
    id: 'lm-studio', name: 'LM Studio', officialUrl: 'https://lmstudio.ai/docs/developer',
    roleHints: ['user-interface', 'api-server', 'model-manager']
  },
  {
    id: 'tensorrt-llm', name: 'TensorRT-LLM',
    officialUrl: 'https://nvidia.github.io/TensorRT-LLM/commands/trtllm-serve.html',
    roleHints: ['inference-engine-library', 'api-server']
  },
  {
    id: 'triton', name: 'Triton Inference Server',
    officialUrl: 'https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/index.html',
    roleHints: ['api-server', 'model-manager', 'deployment-manager']
  },
  {
    id: 'tei', name: 'Text Embeddings Inference',
    officialUrl: 'https://github.com/huggingface/text-embeddings-inference',
    roleHints: ['inference-engine-library', 'api-server']
  },
  {
    id: 'airllm', name: 'AirLLM', officialUrl: 'https://github.com/lyogavin/airllm',
    roleHints: ['inference-engine-library']
  },
  {
    id: 'transformers', name: 'Hugging Face Transformers',
    officialUrl: 'https://huggingface.co/docs/transformers/index',
    roleHints: ['inference-engine-library']
  },
  {
    id: 'litellm', name: 'LiteLLM', officialUrl: 'https://docs.litellm.ai/docs/',
    roleHints: ['gateway', 'api-server']
  },
  {
    id: 'open-webui', name: 'Open WebUI', officialUrl: 'https://docs.openwebui.com/',
    roleHints: ['user-interface']
  },
  {
    id: 'tgi', name: 'Text Generation Inference',
    officialUrl: 'https://github.com/huggingface/text-generation-inference',
    roleHints: ['inference-engine-library', 'api-server'],
    maintenanceHint: {
      status: 'maintenance', reviewedOn: '2026-09-15',
      sourceUrl: 'https://github.com/huggingface/text-generation-inference'
    }
  }
];
export const executionMethodCandidates = [
  { id: 'full-gpu', label: 'اجرای کامل روی GPU' },
  { id: 'cpu', label: 'اجرای CPU' },
  { id: 'cpu-gpu-offload', label: 'CPU/GPU offload' },
  { id: 'kv-cache-offload', label: 'offload حافظهٔ KV' },
  { id: 'layer-wise-loading', label: 'بارگذاری لایه‌به‌لایه' }
] as const;
export const parallelismCandidates = [
  { id: 'none', label: 'بدون موازی‌سازی' },
  { id: 'tensor-parallel', label: 'Tensor parallel' },
  { id: 'pipeline-parallel', label: 'Pipeline parallel' },
  { id: 'expert-parallel', label: 'Expert parallel' },
  { id: 'model-sharding', label: 'تقسیم مدل میان چند GPU' },
  { id: 'independent-replicas', label: 'تکثیر مستقل سرویس روی چند GPU' },
  { id: 'hybrid', label: 'راهبرد ترکیبی' }
] as const;

export const existingContentLinks: ExistingContentLink[] = [
  {
    id: 'rag-cag-kag-fine-tuning-instruction-tuning',
    title: 'RAG، CAG، KAG، Fine-tuning و Instruction tuning؛ چه تفاوتی دارند و کدام را انتخاب کنیم؟',
    href: '/articles/rag-cag-kag-fine-tuning-instruction-tuning/',
    roles: ['view-concept', 'guide-overview']
  },
  {
    id: 'gpu-types-for-ai', title: 'انواع پردازنده‌های گرافیکی برای هوش مصنوعی',
    href: '/articles/gpu-types-for-ai/', roles: ['planned-article', 'guide-overview']
  },
  {
    id: 'choosing-gpu-for-ai', title: 'نحوه انتخاب پردازنده گرافیکی برای هوش مصنوعی',
    href: '/articles/choosing-gpu-for-ai/', roles: ['planned-article', 'view-concept', 'guide-overview']
  },
  {
    id: 'int8-or-fp8-real-gpu-support', title: 'INT8 یا FP8؛ پشتیبانی واقعی GPU در اجرای مدل‌های زبانی',
    href: '/articles/int8-or-fp8-real-gpu-support/',
    anchors: [
      { id: 'حافظه-وزن-ها-تمام-حافظه-مورد-نیاز-نیست', label: 'حافظهٔ وزن‌ها، تمام حافظهٔ مورد نیاز نیست' },
      { id: 'از-مشخصات-کارت-تا-کرنل-قابل-اجرا', label: 'از مشخصات کارت تا کرنل قابل اجرا' },
      { id: 'تغییر-قالب-و-ارزیابی-کیفیت', label: 'تغییر قالب و ارزیابی کیفیت' }
    ],
    roles: ['planned-article', 'view-concept', 'guide-overview']
  },
  {
    id: 'gpu-inference-latency-throughput', title: 'چرا سریع‌ترین GPU لزوماً سریع‌ترین پاسخ را نمی‌دهد؟',
    href: '/articles/gpu-inference-latency-throughput/',
    anchors: [
      { id: 'وقتی-می-گوییم-سریع-چه-چیزی-را-اندازه-می-گیریم', label: 'TTFT، TPOT و معیارهای سرعت' },
      { id: 'حافظه-فقط-محل-جاگرفتن-مدل-نیست', label: 'حافظه فقط محل جاگرفتن مدل نیست' },
      { id: 'چه-ظرفیتی-واقعا-قابل-فروش-یا-استفاده-است', label: 'ظرفیت قابل استفادهٔ سرویس' }
    ],
    roles: ['planned-article', 'view-concept', 'guide-overview']
  },
  {
    id: 'pcie-vs-sxm-for-ai', title: 'PCIe یا SXM؛ تفاوت رابط‌ها در زیرساخت هوش مصنوعی',
    href: '/articles/pcie-vs-sxm-for-ai/', roles: ['planned-article', 'view-concept', 'guide-overview']
  },
  {
    id: 'gpu-server-platform-components', title: 'اجزای سکوی سرور برای پردازش GPU',
    href: '/articles/gpu-server-platform-components/',
    anchors: [
      { id: 'پردازنده-مرکزی', label: 'پردازندهٔ مرکزی' },
      { id: 'حافظه-سیستم', label: 'حافظهٔ سیستم' },
      { id: 'ذخیره-سازی', label: 'ذخیره‌سازی' }
    ],
    roles: ['planned-article', 'view-concept', 'guide-overview']
  },
  {
    id: 'dgx-and-standard-gpu-servers', title: 'DGX، HGX یا سرور معمولی GPU؟',
    href: '/articles/dgx-and-standard-gpu-servers/', roles: ['planned-article', 'guide-overview']
  },
  {
    id: 'pcie-gpu-server-selection', title: 'چگونه سرور بهینه برای GPU انتخاب کنیم؟',
    href: '/articles/pcie-gpu-server-selection/',
    anchors: [
      { id: 'pcie-و-توپولوژی-داخلی-سرور', label: 'PCIe و توپولوژی داخلی سرور' },
      { id: 'cpu-ram-ذخیره-سازی-و-شبکه-را-از-روی-جریان-داده-انتخاب-کنید', label: 'CPU، RAM، ذخیره‌سازی و شبکه' }
    ],
    roles: ['planned-article', 'view-concept', 'guide-overview']
  },
  {
    id: 'national-ai-platform', title: 'پیکان مجهز به هوش مصنوعی مدل ۱۴۰۴ تحویل فوری!',
    href: '/articles/national-ai-platform/', roles: ['planned-article']
  },
  {
    id: 'zero-trust-ai-principles-and-controls', title: 'اصول و کنترل‌های عملی هوش مصنوعی بدون اعتماد',
    href: '/articles/zero-trust-ai-principles-and-controls/', roles: ['planned-article']
  },
  {
    id: 'ztai-indirect-data-access', title: 'وقتی انسان داده را نمی‌بیند؛ آیا واقعاً دسترسی او حذف شده است؟',
    href: '/articles/ztai-indirect-data-access/', roles: ['planned-article', 'view-concept']
  },
  {
    id: 'mlops-foundation-of-zero-trust-ai', title: 'MLOps؛ بستر پیاده‌سازی هوش مصنوعی بدون اعتماد',
    href: '/articles/mlops-foundation-of-zero-trust-ai/', roles: ['planned-article']
  },
  {
    id: 'ai-infrastructure-security-starts-with-kernel-and-gpu', title: 'امنیت زیرساخت هوش مصنوعی از کرنل و GPU آغاز می‌شود',
    href: '/articles/ai-infrastructure-security-starts-with-kernel-and-gpu/', roles: ['planned-article', 'view-concept']
  },
  {
    id: 'targoman-transformer-update', title: 'موتور ترجمه ماشینی ترگمان به‌روز شد',
    href: '/articles/targoman-transformer-update/', roles: ['planned-article']
  }
];

/** Hand-picked reading links: each published article explains a concept in that view. */
export const viewRelatedContent: Record<string, Array<{ contentId: string; anchorId?: string }>> = {
  'model-catalog': [
    { contentId: 'int8-or-fp8-real-gpu-support', anchorId: 'حافظه-وزن-ها-تمام-حافظه-مورد-نیاز-نیست' }
  ],
  'model-suitability': [
    { contentId: 'rag-cag-kag-fine-tuning-instruction-tuning' }
  ],
  'hardware-feasibility': [
    { contentId: 'int8-or-fp8-real-gpu-support', anchorId: 'حافظه-وزن-ها-تمام-حافظه-مورد-نیاز-نیست' },
    { contentId: 'pcie-gpu-server-selection', anchorId: 'cpu-ram-ذخیره-سازی-و-شبکه-را-از-روی-جریان-داده-انتخاب-کنید' }
  ],
  'software-products': [
    { contentId: 'gpu-inference-latency-throughput', anchorId: 'چه-ظرفیتی-واقعا-قابل-فروش-یا-استفاده-است' }
  ],
  'deployment-compatibility': [
    { contentId: 'int8-or-fp8-real-gpu-support', anchorId: 'از-مشخصات-کارت-تا-کرنل-قابل-اجرا' },
    { contentId: 'gpu-server-platform-components', anchorId: 'ذخیره-سازی' }
  ],
  benchmarks: [
    { contentId: 'gpu-inference-latency-throughput', anchorId: 'وقتی-می-گوییم-سریع-چه-چیزی-را-اندازه-می-گیریم' },
    { contentId: 'int8-or-fp8-real-gpu-support', anchorId: 'تغییر-قالب-و-ارزیابی-کیفیت' }
  ],
  'specialized-models': []
};

/** Planned articles link to their writing-plan entries, never to an unwritten article route. */
export const viewPlannedArticles: Record<string, string[]> = {
  'model-catalog': ['total-vs-active-model-parameters', 'right-model-size-for-the-task', 'open-weight-open-source-commercial-model-licenses'],
  'model-suitability': ['right-model-size-for-the-task', 'enterprise-rag-model-embedding-reranker', 'code-completion-assistant-and-agent', 'evaluating-language-models-for-persian'],
  'hardware-feasibility': ['llms-on-rtx-4090-24gb-vs-48gb', 'which-deepseek-on-personal-gpu', 'airllm-layer-wise-inference'],
  'software-products': ['ollama-vllm-sglang-or-llama-cpp', 'model-engine-api-and-chat-ui-roles', 'single-user-to-enterprise-llm-serving'],
  'deployment-compatibility': ['four-bit-model-quantization', 'airllm-layer-wise-inference', 'ollama-vllm-sglang-or-llama-cpp'],
  benchmarks: ['single-user-to-enterprise-llm-serving', 'ollama-vllm-sglang-or-llama-cpp'],
  'specialized-models': ['enterprise-rag-model-embedding-reranker', 'right-model-size-for-the-task', 'evaluating-language-models-for-persian']
};

export const plannedArticles: PlannedArticle[] = [
  {
    id: 'planned-article:right-model-size', slug: 'right-model-size-for-the-task', order: 1, status: 'planned',
    title: 'برای هر کاربرد واقعاً چه اندازه مدلی لازم داریم؟ از مدل تخصصی و SLM تا LLM',
    relatedContentIds: []
  },
  {
    id: 'planned-article:total-vs-active-parameters', slug: 'total-vs-active-model-parameters', order: 2, status: 'planned',
    title: '۳۰ میلیارد پارامتر، سه میلیارد فعال؛ کدام عدد حافظهٔ لازم را تعیین می‌کند؟',
    relatedContentIds: ['int8-or-fp8-real-gpu-support', 'gpu-inference-latency-throughput'],
    conceptLinks: [
      { contentId: 'int8-or-fp8-real-gpu-support', anchorId: 'حافظه-وزن-ها-تمام-حافظه-مورد-نیاز-نیست' },
      { contentId: 'gpu-inference-latency-throughput', anchorId: 'حافظه-فقط-محل-جاگرفتن-مدل-نیست' }
    ]
  },
  {
    id: 'planned-article:rtx-4090-24-vs-48', slug: 'llms-on-rtx-4090-24gb-vs-48gb', order: 3, status: 'planned',
    title: 'روی RTX 4090 چه مدل‌هایی اجرا می‌شوند؟ تفاوت ۲۴ و ۴۸ گیگابایت در عمل',
    relatedContentIds: ['gpu-types-for-ai', 'choosing-gpu-for-ai', 'pcie-gpu-server-selection']
  },
  {
    id: 'planned-article:four-bit-quantization', slug: 'four-bit-model-quantization', order: 4, status: 'planned',
    title: 'چهاربیتی‌کردن مدل چه چیزی را ارزان می‌کند و چه چیزی را تغییر می‌دهد؟',
    relatedContentIds: ['int8-or-fp8-real-gpu-support', 'gpu-inference-latency-throughput'],
    conceptLinks: [{ contentId: 'int8-or-fp8-real-gpu-support', anchorId: 'تغییر-قالب-و-ارزیابی-کیفیت' }]
  },
  {
    id: 'planned-article:airllm-layer-wise', slug: 'airllm-layer-wise-inference', order: 5, status: 'planned',
    title: 'AirLLM و اجرای لایه‌به‌لایه؛ مدل بزرگ با حافظهٔ کم، با چه هزینه‌ای؟',
    relatedContentIds: ['gpu-inference-latency-throughput', 'gpu-server-platform-components', 'int8-or-fp8-real-gpu-support'],
    conceptLinks: [{ contentId: 'gpu-server-platform-components', anchorId: 'ذخیره-سازی' }]
  },
  {
    id: 'planned-article:enterprise-rag-model-stack', slug: 'enterprise-rag-model-embedding-reranker', order: 6, status: 'planned',
    title: 'برای دستیار اسناد سازمانی، مدل زبانی، embedding و reranker را چگونه انتخاب کنیم؟',
    relatedContentIds: []
  },
  {
    id: 'planned-article:coding-model-needs', slug: 'code-completion-assistant-and-agent', order: 7, status: 'planned',
    title: 'تکمیل کد، دستیار کد و عامل برنامه‌نویسی؛ سه نیاز با سه معیار انتخاب',
    relatedContentIds: []
  },
  {
    id: 'planned-article:evaluating-persian-models', slug: 'evaluating-language-models-for-persian', order: 8, status: 'planned',
    title: 'مدل خوب برای فارسی را چگونه بسنجیم؟',
    relatedContentIds: []
  },
  {
    id: 'planned-article:which-deepseek', slug: 'which-deepseek-on-personal-gpu', order: 9, status: 'planned',
    title: 'دیپ‌سیک روی کارت شخصی؛ دقیقاً کدام دیپ‌سیک؟',
    relatedContentIds: ['gpu-types-for-ai', 'int8-or-fp8-real-gpu-support', 'choosing-gpu-for-ai']
  },
  {
    id: 'planned-article:single-user-to-service', slug: 'single-user-to-enterprise-llm-serving', order: 10, status: 'planned',
    title: 'از یک کاربر تا سرویس سازمانی؛ چه زمانی مدل، تعداد نسخه‌ها یا GPU را تغییر دهیم؟',
    relatedContentIds: ['gpu-inference-latency-throughput', 'pcie-vs-sxm-for-ai', 'dgx-and-standard-gpu-servers'],
    conceptLinks: [{ contentId: 'gpu-inference-latency-throughput', anchorId: 'چه-ظرفیتی-واقعا-قابل-فروش-یا-استفاده-است' }]
  },
  {
    id: 'planned-article:llm-cost-buy-rent-api', slug: 'true-llm-cost-buy-rent-or-api', order: 11, status: 'planned',
    title: 'هزینهٔ واقعی اجرای مدل زبانی؛ خرید، اجاره یا API',
    relatedContentIds: ['choosing-gpu-for-ai', 'gpu-server-platform-components', 'pcie-gpu-server-selection']
  },
  {
    id: 'planned-article:model-licenses', slug: 'open-weight-open-source-commercial-model-licenses', order: 12, status: 'planned',
    title: 'وزن‌باز، متن‌باز و قابل‌استفادهٔ تجاری؛ مجوز مدل چه اثری بر انتخاب دارد؟',
    relatedContentIds: []
  },
  {
    id: 'planned-article:serving-software-selection', slug: 'ollama-vllm-sglang-or-llama-cpp', order: 13, status: 'planned',
    title: 'Ollama، vLLM، SGLang یا llama.cpp؛ برای اجرای مدل کدام را انتخاب کنیم؟',
    relatedContentIds: ['gpu-inference-latency-throughput', 'gpu-server-platform-components'],
    conceptLinks: [
      { contentId: 'gpu-inference-latency-throughput', anchorId: 'چه-ظرفیتی-واقعا-قابل-فروش-یا-استفاده-است' },
      { contentId: 'gpu-server-platform-components', anchorId: 'حافظه-سیستم' }
    ]
  },
  {
    id: 'planned-article:serving-stack-roles', slug: 'model-engine-api-and-chat-ui-roles', order: 14, status: 'planned',
    title: 'مدل، موتور اجرا، API و رابط چت؛ هرکدام چه نقشی در سرویس هوش مصنوعی دارند؟',
    relatedContentIds: []
  }
];

/** Research snapshot 0.3.0; draft-only catalog, without local deployment measurements. */
export const llmRepository: LlmGuideRepository = llmDataset;

export { llmDatasetUpdatedOn };
