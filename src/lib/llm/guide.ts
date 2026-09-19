import { llmDataset, llmDatasetUpdatedOn } from './data/repository.v1';
import type {
  ApplicationTaxon,
  ExistingContentLink,
  LlmGuideRepository,
  SoftwareRole
} from './schema';
import { llmEditionSlugs } from './edition-manifest';
import { llmGuideCollection } from './collection';
export { llmGuideCollection };
export interface SoftwareProductCandidate {
  id: string;
  name: string;
  officialUrl: string;
  /** Navigation hints only; verified capabilities belong to versioned rows. */
  roleHints: SoftwareRole[];
  maintenanceHint?: { status: 'maintenance' | 'archived'; reviewedOn: string; sourceUrl: string };
}
export { llmDatasetUpdatedOn };
import type { LlmI18n } from './i18n/runtime';

/** Text and formatting are edition-scoped; no mutable global locale. */
export function createLlmGuide(i18n: LlmI18n) {
const { t, locale, numberFormat } = i18n;

const applications: ApplicationTaxon[] = [
  {
    id: 'text-work',
    label: t('guide.0001'),
    subapplications: [
      { id: 'translation', label: t('guide.0002') },
      { id: 'summarization', label: t('guide.0003') },
      { id: 'rewriting', label: t('guide.0004') }
    ]
  },
  {
    id: 'enterprise-rag',
    label: t('guide.0005'),
    subapplications: [
      { id: 'retrieval', label: t('guide.0006') },
      { id: 'reranking', label: t('guide.0007') },
      { id: 'grounded-answering', label: t('guide.0008') }
    ]
  },
  {
    id: 'structured-extraction',
    label: t('guide.0009'),
    subapplications: [
      { id: 'classification', label: t('guide.0010') },
      { id: 'ner', label: t('guide.0011') },
      { id: 'field-extraction', label: t('guide.0012') },
      { id: 'json-output', label: t('guide.0013') },
      { id: 'text-to-sql', label: 'Text-to-SQL' }
    ]
  },
  {
    id: 'coding-assistant',
    label: t('guide.0014'),
    subapplications: [
      { id: 'code-completion', label: t('guide.0015') },
      { id: 'code-chat', label: t('guide.0016') },
      { id: 'repository-editing', label: t('guide.0017') }
    ]
  },
  {
    id: 'agents-tools',
    label: t('guide.0018'),
    subapplications: [
      { id: 'tool-calling', label: t('guide.0019') },
      { id: 'workflow-agent', label: t('guide.0020') }
    ]
  },
  {
    id: 'reasoning-analysis',
    label: t('guide.0021'),
    subapplications: [
      { id: 'reasoning', label: t('guide.0022') },
      { id: 'analysis', label: t('guide.0023') }
    ]
  },
  {
    id: 'document-vision',
    label: t('guide.0024'),
    subapplications: [
      { id: 'ocr', label: 'OCR' },
      { id: 'table-understanding', label: t('guide.0025') },
      { id: 'chart-understanding', label: t('guide.0026') }
    ]
  }
];
const modelFamilyCandidates = [
  'Qwen', 'DeepSeek', 'Aya / Cohere', 'Gemma', 'Llama', 'Mistral', 'GLM',
  'gpt-oss', 'Phi', 'Granite', 'Nemotron', 'OLMo', 'Kimi', 'MiniMax', 'SmolLM', 'BGE', 'E5'
] as const;
const guideParameterBands = [
  { id: 'under-3b', label: t('guide.0027'), minInclusive: 0, maxExclusive: 3 },
  { id: '3b-to-under-9b', label: t('guide.0028'), minInclusive: 3, maxExclusive: 9 },
  { id: '9b-to-under-30b', label: t('guide.0029'), minInclusive: 9, maxExclusive: 30 },
  { id: '30b-to-under-70b', label: t('guide.0030'), minInclusive: 30, maxExclusive: 70 },
  { id: '70b-and-more', label: t('guide.0031'), minInclusive: 70, maxExclusive: null }
] as const;
const engineCandidates = ['vLLM', 'SGLang', 'llama.cpp', 'Transformers', 'AirLLM'] as const;
const softwareProductCandidates: SoftwareProductCandidate[] = [
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
      status: 'archived', reviewedOn: '2026-09-16',
      sourceUrl: 'https://github.com/huggingface/text-generation-inference'
    }
  }
];
softwareProductCandidates.push(
  { id: 'ktransformers', name: 'KTransformers', officialUrl: 'https://github.com/kvcache-ai/ktransformers', roleHints: ['inference-engine-library'] },
  { id: 'sentence-transformers', name: 'Sentence Transformers', officialUrl: 'https://sbert.net', roleHints: ['inference-engine-library'] },
  { id: 'flagembedding', name: 'FlagEmbedding', officialUrl: 'https://github.com/FlagOpen/FlagEmbedding', roleHints: ['inference-engine-library'] }
);
const executionMethodCandidates = [
  { id: 'full-gpu', label: t('guide.0032') },
  { id: 'cpu', label: t('guide.0033') },
  { id: 'cpu-gpu-offload', label: 'CPU/GPU offload' },
  { id: 'kv-cache-offload', label: t('guide.0034') },
  { id: 'layer-wise-loading', label: t('guide.0035') }
] as const;
const parallelismCandidates = [
  { id: 'none', label: t('guide.0036') },
  { id: 'tensor-parallel', label: 'Tensor parallel' },
  { id: 'pipeline-parallel', label: 'Pipeline parallel' },
  { id: 'expert-parallel', label: 'Expert parallel' },
  { id: 'model-sharding', label: t('guide.0037') },
  { id: 'independent-replicas', label: t('guide.0038') },
  { id: 'hybrid', label: t('guide.0039') }
] as const;
const existingContentLinks: ExistingContentLink[] = [
  {
    id: 'rag-cag-kag-fine-tuning-instruction-tuning',
    title: t('guide.0040'),
    href: '/articles/rag-cag-kag-fine-tuning-instruction-tuning/',
    roles: ['view-concept', 'guide-overview']
  },
  {
    id: 'gpu-types-for-ai', title: t('guide.0041'),
    href: '/articles/gpu-types-for-ai/', roles: ['planned-article', 'guide-overview']
  },
  {
    id: 'choosing-gpu-for-ai', title: t('guide.0042'),
    href: '/articles/choosing-gpu-for-ai/', roles: ['planned-article', 'view-concept', 'guide-overview']
  },
  {
    id: 'int8-or-fp8-real-gpu-support', title: t('guide.0043'),
    href: '/articles/int8-or-fp8-real-gpu-support/',
    anchors: [
      { id: "حافظه-وزن-ها-تمام-حافظه-مورد-نیاز-نیست", label: t('guide.0045') },
      { id: "از-مشخصات-کارت-تا-کرنل-قابل-اجرا", label: t('guide.0047') },
      { id: "تغییر-قالب-و-ارزیابی-کیفیت", label: t('guide.0049') }
    ],
    roles: ['planned-article', 'view-concept', 'guide-overview']
  },
  {
    id: 'gpu-inference-latency-throughput', title: t('guide.0050'),
    href: '/articles/gpu-inference-latency-throughput/',
    anchors: [
      { id: "وقتی-می-گوییم-سریع-چه-چیزی-را-اندازه-می-گیریم", label: t('guide.0052') },
      { id: "حافظه-فقط-محل-جاگرفتن-مدل-نیست", label: t('guide.0054') },
      { id: "چه-ظرفیتی-واقعا-قابل-فروش-یا-استفاده-است", label: t('guide.0056') }
    ],
    roles: ['planned-article', 'view-concept', 'guide-overview']
  },
  {
    id: 'pcie-vs-sxm-for-ai', title: t('guide.0057'),
    href: '/articles/pcie-vs-sxm-for-ai/', roles: ['planned-article', 'view-concept', 'guide-overview']
  },
  {
    id: 'gpu-server-platform-components', title: t('guide.0058'),
    href: '/articles/gpu-server-platform-components/',
    anchors: [
      { id: "پردازنده-مرکزی", label: t('guide.0060') },
      { id: "حافظه-سیستم", label: t('guide.0062') },
      { id: "ذخیره-سازی", label: t('guide.0064') }
    ],
    roles: ['planned-article', 'view-concept', 'guide-overview']
  },
  {
    id: 'dgx-and-standard-gpu-servers', title: t('guide.0065'),
    href: '/articles/dgx-and-standard-gpu-servers/', roles: ['planned-article', 'guide-overview']
  },
  {
    id: 'pcie-gpu-server-selection', title: t('guide.0066'),
    href: '/articles/pcie-gpu-server-selection/',
    anchors: [
      { id: "pcie-و-توپولوژی-داخلی-سرور", label: t('guide.0068') },
      { id: "cpu-ram-ذخیره-سازی-و-شبکه-را-از-روی-جریان-داده-انتخاب-کنید", label: t('guide.0070') }
    ],
    roles: ['planned-article', 'view-concept', 'guide-overview']
  },
  {
    id: 'national-ai-platform', title: t('guide.0071'),
    href: '/articles/national-ai-platform/', roles: ['planned-article']
  },
  {
    id: 'zero-trust-ai-principles-and-controls', title: t('guide.0072'),
    href: '/articles/zero-trust-ai-principles-and-controls/', roles: ['planned-article']
  },
  {
    id: 'ztai-indirect-data-access', title: t('guide.0073'),
    href: '/articles/ztai-indirect-data-access/', roles: ['planned-article', 'view-concept']
  },
  {
    id: 'mlops-foundation-of-zero-trust-ai', title: t('guide.0074'),
    href: '/articles/mlops-foundation-of-zero-trust-ai/', roles: ['planned-article']
  },
  {
    id: 'ai-infrastructure-security-starts-with-kernel-and-gpu', title: t('guide.0075'),
    href: '/articles/ai-infrastructure-security-starts-with-kernel-and-gpu/', roles: ['planned-article', 'view-concept']
  },
  {
    id: 'targoman-transformer-update', title: t('guide.0076'),
    href: '/articles/targoman-transformer-update/', roles: ['planned-article']
  }
];
const viewRelatedContent: Record<string, Array<{ contentId: string; anchorId?: string }>> = {
  'model-catalog': [
    { contentId: 'int8-or-fp8-real-gpu-support', anchorId: "حافظه-وزن-ها-تمام-حافظه-مورد-نیاز-نیست" }
  ],
  'model-suitability': [
    { contentId: 'rag-cag-kag-fine-tuning-instruction-tuning' }
  ],
  'hardware-feasibility': [
    { contentId: 'int8-or-fp8-real-gpu-support', anchorId: "حافظه-وزن-ها-تمام-حافظه-مورد-نیاز-نیست" },
    { contentId: 'pcie-gpu-server-selection', anchorId: "cpu-ram-ذخیره-سازی-و-شبکه-را-از-روی-جریان-داده-انتخاب-کنید" }
  ],
  'software-products': [
    { contentId: 'gpu-inference-latency-throughput', anchorId: "چه-ظرفیتی-واقعا-قابل-فروش-یا-استفاده-است" }
  ],
  'deployment-compatibility': [
    { contentId: 'int8-or-fp8-real-gpu-support', anchorId: "از-مشخصات-کارت-تا-کرنل-قابل-اجرا" },
    { contentId: 'gpu-server-platform-components', anchorId: "ذخیره-سازی" }
  ],
  benchmarks: [
    { contentId: 'gpu-inference-latency-throughput', anchorId: "وقتی-می-گوییم-سریع-چه-چیزی-را-اندازه-می-گیریم" },
    { contentId: 'int8-or-fp8-real-gpu-support', anchorId: "تغییر-قالب-و-ارزیابی-کیفیت" }
  ],
  'specialized-models': []
};
const viewReadingArticles: Record<string, string[]> = {
  'model-catalog': ['right-model-size-for-the-task', 'four-bit-model-quantization'],
  'model-suitability': ['right-model-size-for-the-task', 'enterprise-rag-model-embedding-reranker', 'code-completion-assistant-and-agent', 'evaluating-language-models-for-persian'],
  'hardware-feasibility': ['llms-on-rtx-4090-24gb-vs-48gb', 'four-bit-model-quantization', 'airllm-layer-wise-inference'],
  'software-products': ['ollama-vllm-sglang-or-llama-cpp', 'single-user-to-enterprise-llm-serving', 'true-llm-cost-buy-rent-or-api'],
  'deployment-compatibility': ['four-bit-model-quantization', 'airllm-layer-wise-inference', 'ollama-vllm-sglang-or-llama-cpp'],
  benchmarks: ['evaluating-language-models-for-persian', 'single-user-to-enterprise-llm-serving', 'ollama-vllm-sglang-or-llama-cpp'],
  'specialized-models': ['enterprise-rag-model-embedding-reranker', 'right-model-size-for-the-task', 'evaluating-language-models-for-persian']
};
const llmArticleSlugs = llmEditionSlugs(locale);
const llmRepository: LlmGuideRepository = llmDataset;
return { llmGuideCollection, llmDatasetUpdatedOn, applications, modelFamilyCandidates, guideParameterBands, engineCandidates, softwareProductCandidates, executionMethodCandidates, parallelismCandidates, existingContentLinks, viewRelatedContent, viewReadingArticles, llmArticleSlugs, llmRepository };
}
