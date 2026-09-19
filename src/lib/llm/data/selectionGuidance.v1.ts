// Generated from data/llm/v0.3.0/repository.json by scripts/generate-llm-dataset.py.
import type { LlmGuideRepository } from '../schema';

export const selectionGuidance: LlmGuideRepository['selectionGuidance'] = [];
selectionGuidance.push({
  "id": "guidance:rag-fa",
  "locales": [
    "fa"
  ],
  "title": {
    "fa": "شروع انتخاب برای بازیابی فارسی",
    "en": "Starting points for Persian retrieval",
    "es": "Puntos de partida para recuperación en persa"
  },
  "candidateModelRefs": [
    "model:intfloat-multilingual-e5-base",
    "model:intfloat-multilingual-e5-large-instruct",
    "model:partai-tooka-sbert-v2-small",
    "model:jinaai-jina-embeddings-v3"
  ],
  "decision": {
    "fa": "E5 را با شاهد مستقیم MIRACL و Tooka/Jina را با جدول فارسی PTEB کنار هم قرار دهید. ابتدا نوع آزمون را یکسان کنید؛ امتیاز دو مجموعه را در یک رتبه‌بندی ادغام نکنید.",
    "en": "Use the direct Persian MIRACL evidence for E5 and the Persian PTEB table for Tooka/Jina as separate comparison panels. Do not combine their different aggregates into one ranking.",
    "es": "Use MIRACL persa para E5 y la tabla PTEB para Tooka/Jina en paneles separados. No mezcle agregados de conjuntos distintos en una clasificación."
  },
  "chooseWhen": {
    "fa": "برای جست‌وجوی متن فارسی، با ثبت طول قطعه و پیشوند صحیح هر مدل؛ برای Tooka پرسش با «سوال: » و سند با «متن: » طبق کارت ناشر.",
    "en": "For Persian document retrieval, preserving each model’s chunk-length limit and required query/document formatting.",
    "es": "Para recuperar documentos en persa, respetando los límites de fragmento y el formato de consultas y documentos de cada modelo."
  },
  "doNotInfer": {
    "fa": "میانگین بالاتر Tooka-Large به معنی بازیابی بهتر از Small نیست.",
    "en": "A higher Tooka-Large overall average does not establish better retrieval than Small.",
    "es": "Una media global mayor de Tooka-Large no demuestra mejor recuperación que Small."
  },
  "comparisonGroupIds": [
    "comparison:pteb-task-vs-overall",
    "comparison:e5-miracl-by-language"
  ],
  "editorialStatus": "source-based shortlist; not measured recommendation or universal ranking",
  "candidateNames": {
    "model:intfloat-multilingual-e5-base": "multilingual-e5-base",
    "model:intfloat-multilingual-e5-large-instruct": "multilingual-e5-large-instruct",
    "model:partai-tooka-sbert-v2-small": "Tooka-SBERT-V2-Small",
    "model:jinaai-jina-embeddings-v3": "jina-embeddings-v3"
  }
});
selectionGuidance.push({
  "id": "guidance:rag-es",
  "locales": [
    "fa",
    "en",
    "es"
  ],
  "title": {
    "fa": "بازیابی برای اسپانیایی",
    "en": "Spanish retrieval",
    "es": "Recuperación en español"
  },
  "candidateModelRefs": [
    "model:intfloat-multilingual-e5-small",
    "model:intfloat-multilingual-e5-base",
    "model:intfloat-multilingual-e5-large-instruct",
    "model:qwen-qwen3-embedding-0-6b"
  ],
  "decision": {
    "fa": "E5 مقایسهٔ مستقیمِ اسپانیایی دارد؛ مدل Small برای خط پایهٔ کوچک‌تر و Large-Instruct برای مقایسهٔ کیفیت در همان مجموعه مناسب‌اند. Qwen را با برچسب شاهد چندزبانهٔ تجمیعی اضافه کنید، نه شاهد اختصاصی اسپانیایی.",
    "en": "E5 provides a direct Spanish comparison: Small is the lower-size baseline and Large-Instruct the higher-scoring variant in that MIRACL report. Qwen adds a candidate backed here by multilingual aggregate evidence, not a Spanish-specific score.",
    "es": "E5 permite una comparación directa en español: Small es la referencia de menor tamaño y Large-Instruct la variante con mayor puntuación en ese informe MIRACL. Qwen aporta otro candidato, respaldado aquí por un agregado multilingüe, no por una nota específica de español."
  },
  "chooseWhen": {
    "fa": "پرسش و سند هر دو اسپانیایی باشند؛ بازیابی میان‌زبانی را جداگانه مشخص کنید.",
    "en": "When queries and documents are both Spanish; identify cross-language retrieval separately.",
    "es": "Cuando consultas y documentos están en español; identifique por separado la recuperación entre idiomas."
  },
  "doNotInfer": {
    "fa": "اختلاف 51.2 تا 53.7 شواهدی برای کیفیت پاسخ نهایی چت یا پوشش تمام گونه‌های اسپانیایی نیست.",
    "en": "The 51.2-to-53.7 difference establishes neither final-answer quality nor coverage of every Spanish variety.",
    "es": "La diferencia de 51,2 a 53,7 no acredita la calidad de la respuesta final ni la cobertura de todas las variedades del español."
  },
  "comparisonGroupIds": [
    "comparison:e5-miracl-by-language",
    "comparison:qwen-embedding-task-scope"
  ],
  "editorialStatus": "source-based shortlist; not measured recommendation or universal ranking",
  "candidateNames": {
    "model:intfloat-multilingual-e5-small": "multilingual-e5-small",
    "model:intfloat-multilingual-e5-base": "multilingual-e5-base",
    "model:intfloat-multilingual-e5-large-instruct": "multilingual-e5-large-instruct",
    "model:qwen-qwen3-embedding-0-6b": "Qwen3-Embedding-0.6B"
  }
});
selectionGuidance.push({
  "id": "guidance:rag-en",
  "locales": [
    "fa",
    "en",
    "es"
  ],
  "title": {
    "fa": "بازیابی برای انگلیسی",
    "en": "English retrieval",
    "es": "Recuperación en inglés"
  },
  "candidateModelRefs": [
    "model:intfloat-multilingual-e5-large",
    "model:intfloat-multilingual-e5-large-instruct",
    "model:qwen-qwen3-embedding-0-6b"
  ],
  "decision": {
    "fa": "Large و Large-Instruct را گونه‌های مجزا بگیرید: در MIRACL انگلیسی امتیاز Large بالاتر است. برای افزودن reranker، مقایسهٔ Qwen با نامزدهای یکسان قابل استفاده است.",
    "en": "Treat Large and Large-Instruct as separate variants: Large scores higher on English MIRACL in this report. For a reranking step, use Qwen’s comparison with a common candidate pool.",
    "es": "Trate Large y Large-Instruct como variantes distintas: Large obtiene más en MIRACL inglés en este informe. Para valorar un reranker, use la comparación de Qwen con el mismo conjunto de candidatos."
  },
  "chooseWhen": {
    "fa": "وقتی شواهد تک‌زبانه مهم‌تر از میانگین چندزبانه است.",
    "en": "When target-language evidence matters more than a multilingual average.",
    "es": "Cuando importa más la evidencia en el idioma objetivo que una media multilingüe."
  },
  "doNotInfer": {
    "fa": "واژهٔ Instruct تضمین برتری در همهٔ وظایف نیست.",
    "en": "The Instruct label does not guarantee an improvement on every task.",
    "es": "La etiqueta Instruct no garantiza una mejora en todas las tareas."
  },
  "comparisonGroupIds": [
    "comparison:e5-miracl-by-language",
    "comparison:qwen-reranking-top100"
  ],
  "editorialStatus": "source-based shortlist; not measured recommendation or universal ranking",
  "candidateNames": {
    "model:intfloat-multilingual-e5-large": "multilingual-e5-large",
    "model:intfloat-multilingual-e5-large-instruct": "multilingual-e5-large-instruct",
    "model:qwen-qwen3-embedding-0-6b": "Qwen3-Embedding-0.6B"
  }
});
selectionGuidance.push({
  "id": "guidance:reranker",
  "locales": [
    "fa",
    "en",
    "es"
  ],
  "title": {
    "fa": "افزودن مرحلهٔ بازچینی",
    "en": "Adding reranking",
    "es": "Añadir una etapa de reranking"
  },
  "candidateModelRefs": [
    "model:qwen-qwen3-reranker-0-6b",
    "model:qwen-qwen3-reranker-4b",
    "model:qwen-qwen3-reranker-8b",
    "model:baai-bge-reranker-v2-m3"
  ],
  "decision": {
    "fa": "از 0.6B به‌عنوان گزینهٔ کوچک‌تر مقایسه شروع کنید. اگر افزایش کیفیتِ همان وظیفه ارزش هزینهٔ مرحلهٔ دوم را داشت، 4B و 8B را بررسی کنید؛ در همهٔ معیارها 8B جلوتر نیست.",
    "en": "Start the size comparison with 0.6B. Consider 4B and 8B when their task-specific gains justify a second-stage resource budget; 8B does not lead on every metric.",
    "es": "Empiece la comparación de tamaños con 0,6B. Considere 4B y 8B si la mejora en la tarea justifica el presupuesto de la segunda etapa; 8B no encabeza todas las métricas."
  },
  "chooseWhen": {
    "fa": "وقتی سند مرتبط در نامزدهای مرحلهٔ اول هست ولی رتبهٔ خوبی ندارد؛ تعداد نامزدها بخشی از تصمیم است.",
    "en": "When relevant documents reach the candidate pool but rank poorly; candidate count is part of the design.",
    "es": "Cuando los documentos pertinentes están entre los candidatos pero aparecen mal ordenados; la cantidad de candidatos forma parte del diseño."
  },
  "doNotInfer": {
    "fa": "بازچینی سندی را که بازیاب وارد مجموعه نکرده بازیابی نمی‌کند.",
    "en": "Reranking cannot recover a document absent from its input pool.",
    "es": "El reranker no puede recuperar un documento ausente de su conjunto de entrada."
  },
  "comparisonGroupIds": [
    "comparison:qwen-reranking-top100"
  ],
  "editorialStatus": "source-based shortlist; not measured recommendation or universal ranking",
  "candidateNames": {
    "model:qwen-qwen3-reranker-0-6b": "Qwen3-Reranker-0.6B",
    "model:qwen-qwen3-reranker-4b": "Qwen3-Reranker-4B",
    "model:qwen-qwen3-reranker-8b": "Qwen3-Reranker-8B",
    "model:baai-bge-reranker-v2-m3": "bge-reranker-v2-m3"
  }
});
selectionGuidance.push({
  "id": "guidance:coding",
  "locales": [
    "fa",
    "en",
    "es"
  ],
  "title": {
    "fa": "حل مسئله یا ویرایش کد؟",
    "en": "Coding problems or code edits?",
    "es": "¿Ejercicios de programación o edición de código?"
  },
  "candidateModelRefs": [
    "model:qwen-qwen3-4b-instruct-2507",
    "model:qwen-qwen3-30b-a3b",
    "model:bigcode-starcoder2-3b"
  ],
  "decision": {
    "fa": "برای دستیار دستورپذیر، دو Qwen را با معیار متناسب با کار مقایسه کنید. StarCoder2-3B را در مسیر تکمیل کد/FIM نگه دارید؛ امتیاز HumanEval آن شاهد کیفیت چت نیست.",
    "en": "Compare the two Qwen variants on the task relevant to the assistant. Keep StarCoder2-3B in the code-completion/FIM route; its HumanEval result is not evidence of chat quality.",
    "es": "Compare las variantes Qwen en la tarea que realizará el asistente. Mantenga StarCoder2-3B en la ruta de autocompletado/FIM; su resultado HumanEval no demuestra calidad de conversación."
  },
  "chooseWhen": {
    "fa": "وقتی رابط و وظیفه مشخص است: تکمیل داخل ادیتور، اصلاح چند فایل یا حل یک مسئله.",
    "en": "Once the interface is known: editor completion, multi-file changes, or solving a programming problem.",
    "es": "Una vez definida la interfaz: autocompletado, cambios en varios archivos o resolución de un ejercicio."
  },
  "doNotInfer": {
    "fa": "پارامتر فعال MoE مبنای حافظهٔ وزن‌های مقیم نیست.",
    "en": "MoE active parameters do not determine resident weight memory.",
    "es": "Los parámetros activos de un MoE no determinan la memoria de todos sus pesos residentes."
  },
  "comparisonGroupIds": [
    "comparison:qwen-small-nonthinking"
  ],
  "editorialStatus": "source-based shortlist; not measured recommendation or universal ranking",
  "candidateNames": {
    "model:qwen-qwen3-4b-instruct-2507": "Qwen3-4B-Instruct-2507",
    "model:qwen-qwen3-30b-a3b": "Qwen3-30B-A3B",
    "model:bigcode-starcoder2-3b": "starcoder2-3b"
  }
});
selectionGuidance.push({
  "id": "guidance:small-model",
  "locales": [
    "fa",
    "en",
    "es"
  ],
  "title": {
    "fa": "مدل کوچک برای کار محدود",
    "en": "A small model for a bounded task",
    "es": "Un modelo pequeño para una tarea acotada"
  },
  "candidateModelRefs": [
    "model:qwen-qwen3-4b-instruct-2507",
    "model:openbmb-minicpm5-2b",
    "model:liquidai-lfm2-5-1-2b-instruct",
    "model:ibm-granite-granite-4-2-3b"
  ],
  "decision": {
    "fa": "برای استخراج و گردش‌کار محدود، LFM یک گزینهٔ کوچک‌تر است؛ برای استدلال و ابزار، شواهد MiniCPM/Granite را در پنل ناشر خودشان ببینید. نام 2B یا 3B را با شمار دقیق وزن‌ها جایگزین نکنید.",
    "en": "LFM is a smaller candidate for extraction and bounded workflows; for reasoning and tools, read MiniCPM and Granite evidence within each reporter’s panel. Keep nominal 2B/3B labels separate from actual parameter counts.",
    "es": "LFM es un candidato de menor tamaño para extracción y flujos acotados; para razonamiento y herramientas, consulte MiniCPM y Granite dentro del panel de cada fuente. Distinga las etiquetas 2B/3B del recuento real de parámetros."
  },
  "chooseWhen": {
    "fa": "وقتی دامنهٔ وظیفه، قالب خروجی و محدودیت حافظه روشن است.",
    "en": "When task scope, output format and memory constraints are defined.",
    "es": "Cuando se conocen la tarea, el formato de salida y el límite de memoria."
  },
  "doNotInfer": {
    "fa": "امتیاز بالای یک مدل کوچک، تأخیر کمتر یا توان اجرای زمینهٔ حداکثری روی لپ‌تاپ را ثابت نمی‌کند.",
    "en": "A strong small-model score establishes neither lower latency nor laptop feasibility at maximum context.",
    "es": "Una buena puntuación de un modelo pequeño no demuestra menor latencia ni viabilidad en portátil con el contexto máximo."
  },
  "comparisonGroupIds": [
    "comparison:qwen-small-nonthinking",
    "comparison:minicpm-small-model-tasks"
  ],
  "editorialStatus": "source-based shortlist; not measured recommendation or universal ranking",
  "candidateNames": {
    "model:qwen-qwen3-4b-instruct-2507": "Qwen3-4B-Instruct-2507",
    "model:openbmb-minicpm5-2b": "MiniCPM5-2B",
    "model:liquidai-lfm2-5-1-2b-instruct": "LFM2.5-1.2B-Instruct",
    "model:ibm-granite-granite-4-2-3b": "granite-4.2-3b"
  }
});
selectionGuidance.push({
  "id": "guidance:spanish-generation",
  "locales": [
    "en",
    "es"
  ],
  "title": {
    "fa": "انتخاب مدل مولد برای اسپانیایی",
    "en": "Selecting a Spanish-language generator",
    "es": "Elegir un modelo generativo para español"
  },
  "candidateModelRefs": [
    "model:bsc-lt-salamandra-2b-instruct",
    "model:bsc-lt-salamandra-7b-instruct",
    "model:qwen-qwen3-4b-instruct-2507",
    "model:ibm-granite-granite-4-2-3b"
  ],
  "decision": {
    "fa": "Salamandra شاهد مستقیمِ چند وظیفهٔ اسپانیایی می‌دهد. آن را کنار گزینه‌های عمومی چندزبانه نگه دارید؛ دادهٔ موجود برای اعلام بهترین چت‌بات اسپانیایی کافی نیست.",
    "en": "Salamandra supplies direct evidence for several Spanish tasks. Keep it alongside general multilingual candidates; the available data does not identify a best Spanish chatbot.",
    "es": "Salamandra aporta evidencia directa en varias tareas españolas. Compárelo con candidatos multilingües generales; los datos disponibles no identifican al mejor chatbot en español."
  },
  "chooseWhen": {
    "fa": "وقتی عملکرد اسپانیایی باید از ادعای کلی چندزبانه قابل تفکیک باشد.",
    "en": "When Spanish evidence must be distinguished from a general multilingual claim.",
    "es": "Cuando es necesario separar la evidencia en español de una afirmación multilingüe general."
  },
  "doNotInfer": {
    "fa": "پوشش زبان با پوشش مکزیک، آرژانتین، اسپانیا یا حوزهٔ تخصصی یکسان نیست.",
    "en": "Language coverage is not evidence for every region or professional domain.",
    "es": "La cobertura del idioma no acredita todas las regiones ni los ámbitos profesionales."
  },
  "comparisonGroupIds": [
    "comparison:salamandra-spanish"
  ],
  "editorialStatus": "source-based shortlist; not measured recommendation or universal ranking",
  "candidateNames": {
    "model:bsc-lt-salamandra-2b-instruct": "salamandra-2b-instruct",
    "model:bsc-lt-salamandra-7b-instruct": "salamandra-7b-instruct",
    "model:qwen-qwen3-4b-instruct-2507": "Qwen3-4B-Instruct-2507",
    "model:ibm-granite-granite-4-2-3b": "granite-4.2-3b"
  }
});
selectionGuidance.push({
  "id": "guidance:classification",
  "locales": [
    "fa",
    "en",
    "es"
  ],
  "title": {
    "fa": "تشخیص نیت و دسته‌بندی",
    "en": "Intent and text classification",
    "es": "Clasificación de intenciones y textos"
  },
  "candidateModelRefs": [
    "model:intfloat-multilingual-e5-base",
    "model:intfloat-multilingual-e5-large-instruct"
  ],
  "decision": {
    "fa": "برای دسته‌بندی نیت، شواهد MassiveIntent و MTOP را انتخاب کنید. embedding بخشی از سامانهٔ دسته‌بندی است؛ امتیاز به روش طبقه‌بندی و دادهٔ آموزش آن هم وابسته است.",
    "en": "Use MassiveIntent and MTOP evidence for intent classification. An embedding model is one component of the classifier; the result also depends on the classifier and its training data.",
    "es": "Use MassiveIntent y MTOP para valorar la clasificación de intenciones. El modelo de embeddings es un componente; el resultado también depende del clasificador y de sus datos de entrenamiento."
  },
  "chooseWhen": {
    "fa": "برای برچسب‌های محدود و مشخص؛ این داده انتخاب نقطهٔ شروع را پشتیبانی می‌کند.",
    "en": "For a defined set of labels; the published evidence supports an initial shortlist.",
    "es": "Para un conjunto definido de etiquetas; la evidencia publicada ayuda a formar una lista inicial."
  },
  "doNotInfer": {
    "fa": "مدل embedding یا ParsBERT بدون سرِ وظیفه، چت‌بات آماده نیست.",
    "en": "An embedding model or bare ParsBERT is not a ready-to-use chatbot.",
    "es": "Un modelo de embeddings o ParsBERT sin adaptación no es un chatbot listo para usar."
  },
  "comparisonGroupIds": [
    "comparison:e5-classification-es-fa"
  ],
  "editorialStatus": "source-based shortlist; not measured recommendation or universal ranking",
  "candidateNames": {
    "model:intfloat-multilingual-e5-base": "multilingual-e5-base",
    "model:intfloat-multilingual-e5-large-instruct": "multilingual-e5-large-instruct"
  }
});
