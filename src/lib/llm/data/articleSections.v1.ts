// Generated from data/llm/v0.3.0/repository.json by scripts/generate-llm-dataset.py.
import type { LlmGuideRepository } from '../schema';

export const articleSections: LlmGuideRepository['articleSections'] = [];
articleSections.push({
  "id": "article-block:task-order",
  "articleKey": "right-model-size-for-the-task",
  "locales": [
    "fa",
    "en",
    "es"
  ],
  "title": {
    "fa": "اندازه را پس از تعیین وظیفه انتخاب کنید",
    "en": "Choose size after choosing the task",
    "es": "Elija el tamaño después de definir la tarea"
  },
  "bodyMarkdown": {
    "fa": "در [جدول Qwen](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507)، گونهٔ Qwen3-4B-Instruct-2507 روی LiveCodeBench v6 امتیاز 35.1 دارد و Qwen3-30B-A3B در حالت non-thinking امتیاز 29.0؛ اما در Aider-Polyglot ترتیب برعکس می‌شود: 12.9 در برابر 24.4. معیار اول برای مسئله‌های کدنویسی و معیار دوم برای ویرایش کد در گردش‌کار Aider شاهد می‌دهد. بنابراین عنوان «مدل بهتر برای کدنویسی» بیش از داده ادعا می‌کند. مدل را با نام دقیق، حالت تولید و وظیفهٔ آزمون انتخاب کنید.",
    "en": "[Qwen](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) reports 35.1 on LiveCodeBench v6 for Qwen3-4B-Instruct-2507 and 29.0 for non-thinking Qwen3-30B-A3B. On Aider-Polyglot, the order reverses: 12.9 versus 24.4. Coding problems and code editing in the Aider workflow support different choices. A single “best coding model” label would discard that distinction. Preserve the exact model variant, generation mode and task when interpreting these results.",
    "es": "[Qwen](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) publica 35,1 en LiveCodeBench v6 para Qwen3-4B-Instruct-2507 y 29,0 para Qwen3-30B-A3B sin razonamiento. En Aider-Polyglot, el orden se invierte: 12,9 frente a 24,4. Resolver ejercicios y editar código dentro del flujo de Aider orientan hacia elecciones distintas. Una etiqueta única de «mejor modelo para programar» ocultaría esa diferencia. Conserve la variante exacta, el modo de generación y la tarea al interpretar los resultados."
  },
  "sourceUrls": [
    "https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507"
  ],
  "comparisonGroupIds": [
    "comparison:qwen-small-nonthinking"
  ]
});
articleSections.push({
  "id": "article-block:retrieval-language",
  "articleKey": "enterprise-rag-model-embedding-reranker",
  "locales": [
    "fa",
    "en",
    "es"
  ],
  "title": {
    "fa": "برای بازیابی، زبان و وظیفه را جدا ببینید",
    "en": "Match retrieval evidence to language and task",
    "es": "Relacione la evidencia con el idioma y la tarea"
  },
  "bodyMarkdown": {
    "fa": "[گزارش E5](https://arxiv.org/html/2402.05672v1) روی MIRACL فارسی، nDCG@10 را برای Small برابر 53.3، Base برابر 57.4، Large برابر 59.0 و Large-Instruct برابر 59.4 گزارش می‌کند. در اسپانیایی این اعداد 51.2، 51.5، 52.9 و 53.7 هستند. این‌ها نتایج بازیابی‌اند، نه کیفیت پاسخ تولیدشده. همچنین در [PTEB](https://huggingface.co/PartAI/Tooka-SBERT-V2-Large)، Tooka-Large با میانگین کل 72.05 بالاتر از Small با 70.62 است، ولی امتیاز بازیابی Small بالاتر است: 61.24 در برابر 59.80. امتیاز تجمیعی وظایف PTEB با nDCG یک مجموعهٔ بازیابی قابل جمع یا رتبه‌بندی مشترک نیست.",
    "en": "The [E5 report](https://arxiv.org/html/2402.05672v1) gives English MIRACL nDCG@10 scores of 48.0, 51.2, 52.9 and 51.5 for Small, Base, Large and Large-Instruct. The instruction-tuned variant is not the highest-scoring one on this English task. For Spanish, the corresponding values are 51.2, 51.5, 52.9 and 53.7. Show each language separately and retain Recall@100 as a different metric: it helps assess whether relevant documents enter the pool a reranker will receive. These results do not measure the generated answer or cross-language query/document pairs.",
    "es": "En MIRACL español, [E5](https://arxiv.org/html/2402.05672v1) publica nDCG@10 de 51,2, 51,5, 52,9 y 53,7 para Small, Base, Large y Large-Instruct. Recall@100 es 87,6, 88,6, 89,1 y 89,3: mide otro aspecto, la presencia de documentos pertinentes entre los candidatos. No mezcle ambas métricas en una misma escala de calidad. En inglés, Large supera a Large-Instruct en nDCG@10, de modo que la etiqueta Instruct tampoco garantiza el primer puesto. Estos resultados no miden las respuestas generadas ni consultas en español sobre documentos en otro idioma."
  },
  "sourceUrls": [
    "https://arxiv.org/html/2402.05672v1",
    "https://huggingface.co/PartAI/Tooka-SBERT-V2-Large"
  ],
  "comparisonGroupIds": [
    "comparison:e5-miracl-by-language",
    "comparison:pteb-task-vs-overall"
  ]
});
articleSections.push({
  "id": "article-block:reranker-measured-context",
  "articleKey": "enterprise-rag-model-embedding-reranker",
  "locales": [
    "fa",
    "en",
    "es"
  ],
  "title": {
    "fa": "مقایسهٔ بازچینی با نامزدهای یکسان",
    "en": "Reranking with a common candidate pool",
    "es": "Reranking con los mismos candidatos"
  },
  "bodyMarkdown": {
    "fa": "در [آزمایش Qwen](https://arxiv.org/html/2506.05176v3)، همهٔ rerankerها ۱۰۰ نامزدِ بازیابی‌شده با Qwen3-Embedding-0.6B را دریافت می‌کنند. در MTEB-R، خط پایه 61.82 و نتیجه با reranker-0.6B برابر 65.80 است: 3.98 واحد اختلافِ امتیاز، نه «۳٫۹۸ درصد بهبود کیفیت پاسخ». 4B با 69.76 از 8B با 69.02 جلوتر است، ولی MMTEB-R برای 8B اندکی بالاتر است. انتخاب نهایی به زبان، مجموعهٔ سند و بودجهٔ مرحلهٔ دوم وابسته است؛ این جدول زمان پاسخ را اندازه نگرفته است.",
    "en": "[Qwen’s comparison](https://arxiv.org/html/2506.05176v3) sends the same 100 candidates from Qwen3-Embedding-0.6B to each reranker. MTEB-R rises from 61.82 for the retriever baseline to 65.80 with the 0.6B reranker: a 3.98-point score difference, not a 3.98% improvement in answer quality. The 4B reranker scores 69.76 versus 69.02 for 8B on this metric, while 8B leads slightly on MMTEB-R. Choose according to task and second-stage resources; the table does not measure response latency.",
    "es": "La [comparación de Qwen](https://arxiv.org/html/2506.05176v3) entrega a cada reranker los mismos 100 candidatos recuperados con Qwen3-Embedding-0.6B. MTEB-R pasa de 61,82 a 65,80 con el reranker de 0,6B: son 3,98 puntos, no una mejora del 3,98 % en la calidad de las respuestas. El de 4B obtiene 69,76 frente a 69,02 del de 8B, mientras que 8B aventaja ligeramente en MMTEB-R. La elección depende de la tarea y de los recursos de la segunda etapa; la tabla no mide la latencia."
  },
  "sourceUrls": [
    "https://arxiv.org/html/2506.05176v3"
  ],
  "comparisonGroupIds": [
    "comparison:qwen-reranking-top100"
  ]
});
articleSections.push({
  "id": "article-block:quant-not-conversion",
  "articleKey": "four-bit-model-quantization",
  "locales": [
    "fa",
    "en",
    "es"
  ],
  "title": {
    "fa": "آموزش کم‌دقت با تبدیل فایل یکی نیست",
    "en": "Trained quantization and file conversion differ",
    "es": "Cuantización entrenada y conversión de archivos"
  },
  "bodyMarkdown": {
    "fa": "در [جدول ParetoQ](https://github.com/facebookresearch/ParetoQ)، HellaSwag مدل MobileLLM-350M در BF16 برابر 53.3 و در نسخهٔ 4-bit برابر 53.5 است؛ perplexity گزارش‌شدهٔ Wiki از 10.5 به 10.3 می‌رسد. این نتیجه مربوط به گونه‌های آموزش‌دیده و fine-tuneشدهٔ ParetoQ است. نمی‌توان از آن نتیجه گرفت تبدیل هر مدل به GGUF چهار‌بیتی کیفیت را افزایش می‌دهد. برای مقایسهٔ کاربردی باید علاوه بر معماری و بیت، روش کوانتیزه‌سازی و وضعیت آموزش نیز یکسان یا آشکار باشند.",
    "en": "[ParetoQ](https://github.com/facebookresearch/ParetoQ) reports HellaSwag scores of 53.3 for MobileLLM-350M BF16 and 53.5 for its 4-bit variant; reported Wiki perplexity falls from 10.5 to 10.3. These are trained and fine-tuned ParetoQ variants. The result does not show that converting an arbitrary checkpoint to 4-bit GGUF improves its quality. Compare the training recipe and quantization method alongside architecture and bit width; the study is not a measured memory or speed guarantee for a desktop runtime.",
    "es": "[ParetoQ](https://github.com/facebookresearch/ParetoQ) publica 53,3 en HellaSwag para MobileLLM-350M BF16 y 53,5 para su variante de 4 bits; la perplejidad Wiki baja de 10,5 a 10,3. Son variantes entrenadas y ajustadas con ParetoQ. El resultado no demuestra que convertir cualquier modelo a GGUF de 4 bits mejore su calidad. Además de arquitectura y bits, hay que identificar el entrenamiento y el método de cuantización. El estudio tampoco garantiza memoria o velocidad en un motor de escritorio."
  },
  "sourceUrls": [
    "https://github.com/facebookresearch/ParetoQ"
  ],
  "comparisonGroupIds": []
});
articleSections.push({
  "id": "article-block:coding-evidence",
  "articleKey": "code-completion-assistant-and-agent",
  "locales": [
    "fa",
    "en",
    "es"
  ],
  "title": {
    "fa": "برای هر مسیر، شاهد همان مسیر را بخوانید",
    "en": "Read evidence for the intended coding workflow",
    "es": "Consulte evidencia del flujo de programación previsto"
  },
  "bodyMarkdown": {
    "fa": "[کارت StarCoder2-3B](https://huggingface.co/bigcode/starcoder2-3b) برای HumanEval مقدار pass@1 برابر 31.7 و برای HumanEval+ برابر 27.4 گزارش می‌کند. این مدل پایه برای تکمیل کد است. امتیازهای آن را با موفقیت عاملِ ویرایش چند فایل یا رضایت از گفت‌وگو یکی نکنید. برای انتخاب بین دستیارهای دستورپذیر، [جدول Qwen](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) نمونهٔ روشنی دارد: رتبهٔ LiveCodeBench و Aider-Polyglot یکسان نیست. وقتی harness، ابزارها یا بودجهٔ تلاش متفاوت‌اند، یکسان بودن نام بنچمارک برای ساخت رتبهٔ مشترک کافی نیست.",
    "en": "[StarCoder2-3B’s card](https://huggingface.co/bigcode/starcoder2-3b) reports pass@1 of 31.7 on HumanEval and 27.4 on HumanEval+. Keep this base model in the completion category; those scores do not measure multi-file agent success or chat usefulness. For instruction assistants, [Qwen’s](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) different ordering on LiveCodeBench and Aider-Polyglot is a useful counterexample to a single coding rank. If tools, attempt budgets or agent harnesses differ, a shared benchmark name is insufficient for a combined leaderboard.",
    "es": "La [ficha de StarCoder2-3B](https://huggingface.co/bigcode/starcoder2-3b) publica pass@1 de 31,7 en HumanEval y 27,4 en HumanEval+. Mantenga este modelo base en la categoría de autocompletado; esas cifras no miden el éxito de un agente que modifica varios archivos ni la utilidad de una conversación. El distinto orden de [Qwen](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) en LiveCodeBench y Aider-Polyglot ilustra por qué no basta una sola clasificación de programación. Si cambian herramientas, intentos o entorno del agente, compartir el nombre del benchmark no basta para unir resultados."
  },
  "sourceUrls": [
    "https://huggingface.co/bigcode/starcoder2-3b",
    "https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507"
  ],
  "comparisonGroupIds": [
    "comparison:qwen-small-nonthinking"
  ]
});
articleSections.push({
  "id": "article-block:mac-path",
  "articleKey": "ollama-vllm-sglang-or-llama-cpp",
  "locales": [
    "fa",
    "en",
    "es"
  ],
  "title": {
    "fa": "مسیر Apple silicon: MLX LM",
    "en": "Apple silicon: the MLX LM route",
    "es": "Apple silicon: la ruta MLX LM"
  },
  "bodyMarkdown": {
    "fa": "برای Mac دارای Apple silicon، [MLX LM](https://github.com/ml-explore/mlx-lm) یکی از مسیرهای اجرای محلی مدل‌های سازگار است. تولید متن، کش پرامپت، کوانتیزیشن و فاین‌تیون را پشتیبانی می‌کند؛ انتخاب آن به مدل، قالب وزن و حافظهٔ دستگاه بستگی دارد. قابلیت memory wiring برای مدل‌های بزرگ به macOS 15 یا جدیدتر نیاز دارد.",
    "en": "For a Mac with Apple silicon, [MLX LM](https://github.com/ml-explore/mlx-lm) supports local generation, prompt caching, quantization and fine-tuning. The choice depends on the model, weight format and available memory. Memory wiring for large models requires macOS 15 or later.",
    "es": "En un Mac con Apple silicon, [MLX LM](https://github.com/ml-explore/mlx-lm) permite generación local, caché de prompts, cuantización y ajuste fino. La elección depende del modelo, el formato de pesos y la memoria disponible. El bloqueo de memoria para modelos grandes requiere macOS 15 o posterior."
  },
  "sourceUrls": [
    "https://github.com/ml-explore/mlx-lm"
  ],
  "comparisonGroupIds": []
});
articleSections.push({
  "id": "article-block:context-not-fit",
  "articleKey": "llms-on-rtx-4090-24gb-vs-48gb",
  "locales": [
    "fa",
    "en",
    "es"
  ],
  "title": {
    "fa": "عدد زمینه را از نیاز حافظه جدا کنید",
    "en": "Separate context claims from memory fit",
    "es": "Separe el contexto anunciado de la memoria necesaria"
  },
  "bodyMarkdown": {
    "fa": "در [مشخصات Qwen3-4B-Instruct-2507](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507)، زمینهٔ بومی 262,144 توکن اعلام شده، اما خودِ راهنمای اجرا هنگام OOM کاهش آن به 32,768 را پیشنهاد می‌کند. پشتیبانی معماری از طول متن، تضمین جا شدن آن همراه KV cache و فضای کاری روی یک GPU نیست. برای مقایسهٔ ۲۴ و ۴۸ گیگابایت، قالب وزن، طول ورودی و خروجی، تعداد درخواست هم‌زمان و backend را یکسان نگه دارید. بدون این اطلاعات، یک عدد «حافظهٔ لازم» قابل انتقال به کاربر دیگر نیست.",
    "en": "[Qwen3-4B-Instruct-2507](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) declares a native 262,144-token context, while its deployment instructions suggest reducing the length to 32,768 after an out-of-memory error. Architectural context support does not guarantee that weights, KV cache and workspace fit one GPU. A 24GB-versus-48GB comparison must hold weight format, input/output lengths, concurrency and backend constant. Without them, a single “required VRAM” number is not transferable.",
    "es": "[Qwen3-4B-Instruct-2507](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) declara 262.144 tokens de contexto nativo, pero sus instrucciones sugieren reducirlo a 32.768 ante un error de memoria. El límite de la arquitectura no garantiza que pesos, caché KV y espacio de trabajo quepan en una GPU. Para comparar 24 y 48 GB hay que mantener formato de pesos, longitudes de entrada y salida, concurrencia y motor. Sin esos datos, una única cifra de «VRAM necesaria» no es transferible."
  },
  "sourceUrls": [
    "https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507"
  ],
  "comparisonGroupIds": []
});
articleSections.push({
  "id": "article-block:persian-evidence-scope",
  "articleKey": "evaluating-language-models-for-persian",
  "locales": [
    "fa"
  ],
  "title": {
    "fa": "«شاهد فارسی» باید نام وظیفه داشته باشد",
    "en": "Persian evidence needs a named task",
    "es": "La evidencia en persa necesita una tarea concreta"
  },
  "bodyMarkdown": {
    "fa": "برای E5-Large-Instruct، [گزارش MIRACL](https://arxiv.org/html/2402.05672v1) در فارسی nDCG@10 برابر 59.4 دارد. [کارت مدل](https://huggingface.co/intfloat/multilingual-e5-large-instruct) نتیجهٔ MassiveIntent فارسی را هم گزارش می‌کند. اولی بازیابی سند و دومی دسته‌بندی نیت با embedding را می‌سنجد؛ هیچ‌کدام آزمون نگارش فارسی یا پاسخ‌گویی به سؤال نیست. نتیجهٔ هر مدل به همان وظیفه و مجموعه‌آزمون مربوط است و نبود نتیجه، ناتوانی آن مدل در فارسی را ثابت نمی‌کند.",
    "en": "A [Persian MIRACL result](https://arxiv.org/html/2402.05672v1) measures document retrieval; MassiveIntent measures intent classification using embeddings. Neither is a writing or question-answering test. A language result applies to its named task and dataset; an absent result does not establish inability in that language.",
    "es": "Un [resultado de MIRACL en persa](https://arxiv.org/html/2402.05672v1) mide recuperación de documentos; MassiveIntent mide clasificación de intenciones mediante embeddings. No son pruebas de redacción ni de respuesta a preguntas. Cada resultado corresponde a su tarea y conjunto de datos; la ausencia de resultados no demuestra incapacidad en ese idioma."
  },
  "sourceUrls": [
    "https://arxiv.org/html/2402.05672v1",
    "https://huggingface.co/intfloat/multilingual-e5-large-instruct"
  ],
  "comparisonGroupIds": [
    "comparison:e5-miracl-by-language",
    "comparison:e5-classification-es-fa"
  ]
});
