// Local publisher/project assets; provenance is recorded in v0.1.0 and v0.3.0 research/local-brand-assets.json.
const paths: Record<string, string> = {
  "kimi": "/images/llm/brands/kimi.webp",
  "minimax": "/images/llm/brands/minimax.webp",
  "minilm": "/images/llm/brands/minilm.webp",
  "jina": "/images/llm/brands/jina.webp",
  "mixedbread": "/images/llm/brands/mixedbread.webp",
  "nomic": "/images/llm/brands/nomic.webp",
  "modernbert": "/images/llm/brands/modernbert.webp",
  "ktransformers": "/images/llm/brands/ktransformers.png",
  "e5": "/images/llm/brands/phi.webp",
  "huggingface": "/images/llm/brands/huggingface.svg",
  "gpt-oss": "/images/llm/brands/gpt-oss.png",
  "bge": "/images/llm/brands/bge.webp",
  "cohere": "/images/llm/brands/cohere.webp",
  "smollm": "/images/llm/brands/smollm.webp",
  "qwen": "/images/llm/brands/qwen.webp",
  "olmo": "/images/llm/brands/olmo.webp",
  "deepseek": "/images/llm/brands/deepseek.webp",
  "gemma": "/images/llm/brands/gemma.webp",
  "granite": "/images/llm/brands/granite.webp",
  "llama": "/images/llm/brands/llama.webp",
  "phi": "/images/llm/brands/phi.webp",
  "mistral": "/images/llm/brands/mistral.webp",
  "glm": "/images/llm/brands/glm.webp",
  "ollama": "/images/llm/brands/ollama.png",
  "llama-cpp": "/images/llm/brands/llama-cpp.jpg",
  "litellm": "/images/llm/brands/litellm.png",
  "open-webui": "/images/llm/brands/open-webui.png",
  "lm-studio": "/images/llm/brands/lm-studio.png",
  "vllm": "/images/llm/brands/vllm.png",
  "sglang": "/images/llm/brands/sglang.png",
  "airllm": "/images/llm/brands/airllm.png",
  "nemotron": "/images/brands/nvidia.svg"
};
const matches: Array<[string, string]> = [
 ['ktransformers', 'ktransformers'], ['sentence transformers', 'minilm'], ['sentence-transformers', 'minilm'],
 ['kimi', 'kimi'], ['moonshot', 'kimi'], ['minimax', 'minimax'], ['minilm', 'minilm'],
 ['jina', 'jina'], ['mixedbread', 'mixedbread'], ['mxbai', 'mixedbread'], ['nomic', 'nomic'],
 ['modernbert', 'modernbert'], ['answerdotai', 'modernbert'], ['smolvlm', 'smollm'], ['e5', 'e5'],
 ['nvidia', 'nemotron'],
 ['text-embeddings-inference', 'huggingface'], ['text-generation-inference', 'huggingface'], ['transformers', 'huggingface'],
 ['tensorrt', 'nemotron'], ['triton', 'nemotron'], ['huggingfacetb', 'smollm'], ['smollm', 'smollm'],
 ['cohere', 'cohere'], ['aya', 'cohere'], ['deepseek', 'deepseek'], ['qwen', 'qwen'], ['baai', 'bge'], ['bge', 'bge'],
 ['gemma', 'gemma'], ['ollama', 'ollama'], ['llama-cpp', 'llama-cpp'], ['llama.cpp', 'llama-cpp'], ['llama', 'llama'],
 ['granite', 'granite'], ['intfloat', 'e5'], ['phi', 'phi'], ['olmo', 'olmo'], ['nemotron', 'nemotron'],
 ['mistral', 'mistral'], ['ministral', 'mistral'], ['devstral', 'mistral'], ['glm', 'glm'], ['gpt-oss', 'gpt-oss'],
 ['vllm', 'vllm'], ['sglang', 'sglang'], ['airllm', 'airllm'], ['litellm', 'litellm'],
 ['open-webui', 'open-webui'], ['open webui', 'open-webui'], ['lm-studio', 'lm-studio'], ['lm studio', 'lm-studio'], ['tei', 'huggingface'], ['tgi', 'huggingface'], ['flagembedding', 'bge']
];
export function llmBrand(identifier: string): string | undefined {
 const key = matches.find(([token]) => identifier.toLowerCase().includes(token))?.[1];
 return key ? paths[key] : undefined;
}
