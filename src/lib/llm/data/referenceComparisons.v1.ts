// Generated from data/llm/v0.3.0/repository.json by scripts/generate-llm-dataset.py.
import type { LlmGuideRepository } from '../schema';

export const referenceComparisons: LlmGuideRepository['referenceComparisons'] = [];
referenceComparisons.push({
  "id": "comparison:qwen-small-nonthinking",
  "title": {
    "fa": "۴B تازه در برابر ۴B و ۳۰B قبلی",
    "en": "Updated 4B versus earlier 4B and 30B",
    "es": "4B actualizado frente a 4B y 30B anteriores"
  },
  "interpretation": {
    "fa": "در جدول ناشر، 4B-Instruct-2507 در LiveCodeBench به 35.1 می‌رسد، اما Aider-Polyglot آن 12.9 است؛ 30B-A3B به‌ترتیب 29.0 و 24.4 دارد. انتخاب برای حل مسئلهٔ کدنویسی با انتخاب برای ویرایش مخزن یکسان نیست.",
    "en": "The publisher reports 35.1 on LiveCodeBench and 12.9 on Aider-Polyglot for 4B-Instruct-2507, versus 29.0 and 24.4 for 30B-A3B. Coding-problem performance and repository-editing performance lead to different shortlists.",
    "es": "El editor informa de 35,1 en LiveCodeBench y 12,9 en Aider-Polyglot para 4B-Instruct-2507, frente a 29,0 y 24,4 de 30B-A3B. Resolver ejercicios de programación y editar un repositorio requieren comparaciones distintas."
  },
  "sourceIds": [
    "evidence:reference-qwen-qwen3-4b-instruct-2507-readme-md"
  ],
  "comparisonBasis": "publisher-table",
  "allowed": {
    "reportedSideBySide": true,
    "withinReportNumericDifference": true,
    "universalRanking": false,
    "statisticalSignificanceClaim": false,
    "qualityRatioClaim": false,
    "causalClaim": false
  },
  "qualifications": [
    "Generation recommendations elsewhere in the card are not asserted to be the evaluation settings."
  ],
  "evaluationIds": [
    "evaluation:supplement-fe05fda998c96b79",
    "evaluation:supplement-a3cfdc091012c75c",
    "evaluation:supplement-f09ba156e2c64783",
    "evaluation:supplement-5e30d2472fc2b2bc",
    "evaluation:supplement-c20455489da56598",
    "evaluation:supplement-cb27fa4145f8d829",
    "evaluation:supplement-1e5608cb3afbc794",
    "evaluation:supplement-25f6490a4567afcc",
    "evaluation:supplement-868c118e83f96cdb",
    "evaluation:supplement-8a2b5cd272138518",
    "evaluation:supplement-2a00fd1b5f87d868",
    "evaluation:supplement-43c7eba9249cac69",
    "evaluation:supplement-17f954ccb5ba1468",
    "evaluation:supplement-60b6e4fd15d347aa",
    "evaluation:supplement-3ec4de3a5d3141b8",
    "evaluation:supplement-d2402048f1f183e4",
    "evaluation:supplement-530967d2b894a578",
    "evaluation:supplement-689eb5688ef9b8ce"
  ],
  "numericComparisonPartitionKeys": [
    "benchmark",
    "benchmarkVersion",
    "metric",
    "unit",
    "language"
  ],
  "groupMeaning": "A source-based collection, NOT blanket permission to compare every pair. Partition by the listed keys and preserve settings."
});
referenceComparisons.push({
  "id": "comparison:pteb-task-vs-overall",
  "title": {
    "fa": "میانگین PTEB یا کیفیت بازیابی؟",
    "en": "PTEB average or retrieval quality?",
    "es": "¿Media de PTEB o calidad de recuperación?"
  },
  "interpretation": {
    "fa": "Tooka-Large در میانگین کل 72.05 دارد و Small برابر 70.62؛ ولی بازیابی Small برابر 61.24 و Large برابر 59.80 است. در همان جدول، E5-base برای بازیابی 63.90 دارد. این اعداد تجمیعی PTEB هستند و نباید به یک دیتاست یا nDCG@10 تبدیل شوند.",
    "en": "Tooka-Large leads Small on the overall aggregate, 72.05 versus 70.62, while Small leads on retrieval, 61.24 versus 59.80. E5-base scores 63.90 on that retrieval aggregate. Preserve these as PTEB aggregates, not single-dataset nDCG@10 results.",
    "es": "Tooka-Large supera a Small en la media global, 72,05 frente a 70,62, pero Small obtiene más en recuperación: 61,24 frente a 59,80. E5-base registra 63,90 en ese agregado. Son agregados de PTEB, no resultados nDCG@10 de un único conjunto."
  },
  "sourceIds": [
    "evidence:reference-partai-tooka-sbert-v2-large-readme-md"
  ],
  "comparisonBasis": "publisher-table",
  "allowed": {
    "reportedSideBySide": true,
    "withinReportNumericDifference": true,
    "universalRanking": false,
    "statisticalSignificanceClaim": false,
    "qualityRatioClaim": false,
    "causalClaim": false
  },
  "qualifications": [
    "Task metric composition is not fully specified in the extracted card table.",
    "Relevant to Persian; do not make Tooka a default recommendation for English or Spanish."
  ],
  "evaluationIds": [
    "evaluation:supplement-1b8ae3bbb92ef79f",
    "evaluation:supplement-e032fa1201b8aa68",
    "evaluation:supplement-7645db8b02c3e35c",
    "evaluation:supplement-ac60bd8d96232ed1",
    "evaluation:supplement-81dbbf369f7a38db",
    "evaluation:supplement-b095eeec61552176",
    "evaluation:supplement-1453e2f5497a7a7a",
    "evaluation:supplement-bfd3a4c85ce3b12e",
    "evaluation:supplement-e4e22ab3683526aa",
    "evaluation:supplement-2ecaeea965c0f302",
    "evaluation:supplement-aad5df3cdd593200",
    "evaluation:supplement-59fe0773e4c8d9b4"
  ],
  "numericComparisonPartitionKeys": [
    "benchmark",
    "benchmarkVersion",
    "metric",
    "unit",
    "language"
  ],
  "groupMeaning": "A source-based collection, NOT blanket permission to compare every pair. Partition by the listed keys and preserve settings."
});
referenceComparisons.push({
  "id": "comparison:e5-miracl-by-language",
  "title": {
    "fa": "بازیابی E5 به تفکیک سه زبان",
    "en": "E5 retrieval in three languages",
    "es": "Recuperación E5 en tres idiomas"
  },
  "interpretation": {
    "fa": "در MIRACL فارسی، nDCG@10 از 53.3 برای Small به 59.4 برای Large-Instruct می‌رسد. در اسپانیایی 51.2 و 53.7 است؛ در انگلیسی Large با 52.9 بالاتر از Large-Instruct با 51.5 گزارش شده است. میانگین چندزبانه جای زبانِ کاربرد را نمی‌گیرد.",
    "en": "On Spanish MIRACL, nDCG@10 rises from 51.2 for Small to 53.7 for Large-Instruct. On English, Large scores 52.9 versus 51.5 for Large-Instruct; Persian scores are 59.0 and 59.4. A multilingual average cannot replace the target-language comparison.",
    "es": "En MIRACL español, nDCG@10 pasa de 51,2 con Small a 53,7 con Large-Instruct. En inglés, Large obtiene 52,9 y Large-Instruct 51,5; en persa, 59,0 y 59,4. La media multilingüe no sustituye la comparación en el idioma de uso."
  },
  "sourceIds": [
    "evidence:reference-e5-report-html"
  ],
  "comparisonBasis": "publisher-table",
  "allowed": {
    "reportedSideBySide": true,
    "withinReportNumericDifference": true,
    "universalRanking": false,
    "statisticalSignificanceClaim": false,
    "qualityRatioClaim": false,
    "causalClaim": false
  },
  "qualifications": [
    "This is monolingual retrieval within each language, not evidence for Spanish queries over English documents.",
    "Do not compare nDCG against Recall numerically; they answer different questions."
  ],
  "evaluationIds": [
    "evaluation:supplement-1bebac5a3562e708",
    "evaluation:supplement-bcea84ddaa37050e",
    "evaluation:supplement-d492dbaf0debcd9c",
    "evaluation:supplement-56c65fd4ca5110b4",
    "evaluation:supplement-1e6b46bed04871f8",
    "evaluation:supplement-4d1b2eb24add18be",
    "evaluation:supplement-f75e396bf9194c2b",
    "evaluation:supplement-f1fd222e37134c76",
    "evaluation:supplement-55773adc4c695e91",
    "evaluation:supplement-636ef062353022b1",
    "evaluation:supplement-bee3ec971801a1c4",
    "evaluation:supplement-276364509259713e",
    "evaluation:supplement-8b3099ee4aaa6097",
    "evaluation:supplement-739fbaaf21d57520",
    "evaluation:supplement-1666462d0c94e1d9",
    "evaluation:supplement-01ff381460bf2ee2",
    "evaluation:supplement-ad06c006d16d4568",
    "evaluation:supplement-0c0bfdc764829a8f",
    "evaluation:supplement-8e4c9a86ac032104",
    "evaluation:supplement-4e6d005510c9fc07",
    "evaluation:supplement-cec73c35401e0b22",
    "evaluation:supplement-9d9ac9d1c7a22228",
    "evaluation:supplement-fb9e4c1681dce8f9",
    "evaluation:supplement-395359d64e7aae30"
  ],
  "numericComparisonPartitionKeys": [
    "benchmark",
    "benchmarkVersion",
    "metric",
    "unit",
    "language"
  ],
  "groupMeaning": "A source-based collection, NOT blanket permission to compare every pair. Partition by the listed keys and preserve settings."
});
referenceComparisons.push({
  "id": "comparison:e5-classification-es-fa",
  "title": {
    "fa": "شواهد دسته‌بندی فارسی و اسپانیایی",
    "en": "Persian and Spanish classification evidence",
    "es": "Evidencia de clasificación en persa y español"
  },
  "interpretation": {
    "fa": "نتایج دسته‌بندی E5 برای وظایفی مانند تشخیص نیت کاربرد دارند. آن‌ها را در فیلتر بازیابی نمایش ندهید. همسان‌بودن revision دیتاست برای ادعای همسان‌بودن تمام پروتکل کافی نیست.",
    "en": "These E5 results concern tasks such as intent classification. Exclude them from retrieval-only filters. Matching dataset revisions do not establish identical evaluation software and settings.",
    "es": "Estos resultados de E5 corresponden a tareas como la clasificación de intenciones. No deben aparecer en un filtro exclusivo de recuperación. Coincidir en la revisión del conjunto no demuestra que todo el protocolo sea idéntico."
  },
  "sourceIds": [
    "evidence:reference-intfloat-multilingual-e5-base-readme-md",
    "evidence:reference-intfloat-multilingual-e5-large-instruct-readme-md"
  ],
  "comparisonBasis": "separate-model-cards",
  "allowed": {
    "reportedSideBySide": true,
    "withinReportNumericDifference": false,
    "universalRanking": false,
    "statisticalSignificanceClaim": false,
    "qualityRatioClaim": false,
    "causalClaim": false
  },
  "qualifications": [
    "Matching dataset revisions; evaluation harness versions and classifier settings not established.",
    "Automatic delta/ranking disabled; descriptive discussion of explicitly identified reported rows is allowed."
  ],
  "evaluationIds": [
    "evaluation:supplement-b8937b9f5f5a346e",
    "evaluation:supplement-ccd6ed2772cbec19",
    "evaluation:supplement-db0a0d5684365497",
    "evaluation:supplement-80a4636c673a852c",
    "evaluation:supplement-b2a1fea201feec36",
    "evaluation:supplement-145eb53c6df4eb54",
    "evaluation:supplement-11043d8554452f33",
    "evaluation:supplement-5786a4959b6fe136",
    "evaluation:supplement-7006facf578faeb7",
    "evaluation:supplement-0728685533464a67",
    "evaluation:supplement-199e65a5b289e10d",
    "evaluation:supplement-7676621c41220a88",
    "evaluation:supplement-5640bc1d703b23b9",
    "evaluation:supplement-f209e017204afd58"
  ],
  "numericComparisonPartitionKeys": [
    "benchmark",
    "benchmarkVersion",
    "metric",
    "unit",
    "language"
  ],
  "groupMeaning": "A source-based collection, NOT blanket permission to compare every pair. Partition by the listed keys and preserve settings."
});
referenceComparisons.push({
  "id": "comparison:qwen-embedding-task-scope",
  "title": {
    "fa": "کیفیت embedding در وظیفهٔ درست",
    "en": "Embedding quality for the relevant task",
    "es": "Calidad de embeddings en la tarea pertinente"
  },
  "interpretation": {
    "fa": "میانگین تمام وظایف MTEB را کنار زیرمجموعهٔ بازیابی نگه دارید، نه در همان ستون. کاهش بُعد بردار یک تصمیم ذخیره‌سازی جداگانه است؛ کیفیت بردار کامل را به نسخهٔ کم‌بُعد نسبت ندهید.",
    "en": "Keep the all-task MTEB mean separate from the retrieval subset. Reducing vector dimensions is a separate storage choice; full-dimension scores do not establish reduced-dimension quality.",
    "es": "Separe la media de todas las tareas MTEB del subconjunto de recuperación. Reducir las dimensiones del vector es otra decisión de almacenamiento; la puntuación completa no acredita la calidad con menos dimensiones."
  },
  "sourceIds": [
    "evidence:reference-qwen-qwen3-embedding-0-6b-readme-md"
  ],
  "comparisonBasis": "publisher-collection-with-relayed-baselines",
  "allowed": {
    "reportedSideBySide": true,
    "withinReportNumericDifference": false,
    "universalRanking": false,
    "statisticalSignificanceClaim": false,
    "qualityRatioClaim": false,
    "causalClaim": false
  },
  "qualifications": [
    "Automatic delta/ranking disabled; descriptive discussion of explicitly identified reported rows is allowed.",
    "Non-Qwen values were copied by the publisher from a 2025-05-24 MTEB leaderboard snapshot, not rerun together by Qwen."
  ],
  "evaluationIds": [
    "evaluation:supplement-c9b18a8646cc30c5",
    "evaluation:supplement-8670bad0d992f404",
    "evaluation:supplement-1ac672f871c019c8",
    "evaluation:supplement-8b93a2964a84e80b",
    "evaluation:supplement-9d1d464e23b2b9f7",
    "evaluation:supplement-52fa716c5794088e",
    "evaluation:supplement-0f624f4cb95961eb",
    "evaluation:supplement-57e112c50740d63a",
    "evaluation:supplement-1672818662cf7840",
    "evaluation:supplement-0a4232e7bdb1957a"
  ],
  "numericComparisonPartitionKeys": [
    "benchmark",
    "benchmarkVersion",
    "metric",
    "unit",
    "language"
  ],
  "groupMeaning": "A source-based collection, NOT blanket permission to compare every pair. Partition by the listed keys and preserve settings."
});
referenceComparisons.push({
  "id": "comparison:qwen-reranking-top100",
  "title": {
    "fa": "آیا افزودن reranker مفید بوده است؟",
    "en": "Did adding a reranker help?",
    "es": "¿Ayudó añadir un reranker?"
  },
  "interpretation": {
    "fa": "با نامزدهای یکسانِ top-100، امتیاز MTEB-R از 61.82 برای بازیابی اولیه به 65.80 با reranker-0.6B می‌رسد؛ اختلاف 3.98 واحد است. گونهٔ 4B با 69.76 در این معیار بالاتر از 8B با 69.02 قرار دارد، اما ترتیب MMTEB-R برعکس است. این داده هزینه یا تأخیر مرحلهٔ اضافه را تعیین نمی‌کند.",
    "en": "Using a common top-100 candidate pool, MTEB-R rises from 61.82 for retrieval alone to 65.80 with the 0.6B reranker, a 3.98-point difference. The 4B model scores 69.76 versus 69.02 for 8B on this metric; MMTEB-R reverses that order. These scores do not establish reranking latency or cost.",
    "es": "Con los mismos 100 candidatos, MTEB-R pasa de 61,82 sin reranking a 65,80 con el reranker de 0,6B: 3,98 puntos. El de 4B obtiene 69,76 frente a 69,02 del de 8B; MMTEB-R invierte ese orden. Estas cifras no determinan la latencia ni el coste añadido."
  },
  "sourceIds": [
    "evidence:reference-qwen-qwen3-reranker-0-6b-readme-md",
    "evidence:reference-qwen-embedding-paper-txt"
  ],
  "comparisonBasis": "documented-shared-candidate-pool",
  "allowed": {
    "reportedSideBySide": true,
    "withinReportNumericDifference": true,
    "universalRanking": false,
    "statisticalSignificanceClaim": false,
    "qualityRatioClaim": false,
    "causalClaim": false
  },
  "qualifications": [],
  "evaluationIds": [
    "evaluation:supplement-b60b791be0022b3d",
    "evaluation:supplement-4ece168662ff12c8",
    "evaluation:supplement-fc3076d9f677e667",
    "evaluation:supplement-bc20cbed929f4a7f",
    "evaluation:supplement-15d5b30f20f6e8a1",
    "evaluation:supplement-849983bb897e6c7a",
    "evaluation:supplement-4f9b1b67bcb6d55b",
    "evaluation:supplement-fe980ae85dfb9969",
    "evaluation:supplement-cf5fb912059ae138",
    "evaluation:supplement-e4b7f36a2e5be102",
    "evaluation:supplement-a370f21efa13ad75",
    "evaluation:supplement-716f0a210e415888",
    "evaluation:supplement-0533f0062c9fe297",
    "evaluation:supplement-8473dd5579792f09",
    "evaluation:supplement-dedd3240e467e6b7"
  ],
  "numericComparisonPartitionKeys": [
    "benchmark",
    "benchmarkVersion",
    "metric",
    "unit",
    "language"
  ],
  "groupMeaning": "A source-based collection, NOT blanket permission to compare every pair. Partition by the listed keys and preserve settings."
});
referenceComparisons.push({
  "id": "comparison:salamandra-spanish",
  "title": {
    "fa": "نتایج واقعی اسپانیایی برای Salamandra",
    "en": "Spanish task results for Salamandra",
    "es": "Resultados en español de Salamandra"
  },
  "interpretation": {
    "fa": "این پنج وظیفه شواهد اسپانیایی‌اند، نه نمرهٔ کلیِ چت. در XNLI گونهٔ 7B امتیاز کمتری از 2B دارد؛ از این اختلاف بدون عدم‌قطعیت، برتری قطعی نتیجه نگیرید.",
    "en": "These five tasks provide Spanish evidence, not an overall chat score. The 7B model has a lower XNLI result than 2B. Without uncertainty estimates, this is a reported difference rather than a definitive superiority claim.",
    "es": "Estas cinco tareas aportan evidencia en español, no una nota global de conversación. En XNLI, 7B obtiene menos que 2B. Sin estimaciones de incertidumbre, se trata de una diferencia publicada, no de una superioridad concluyente."
  },
  "sourceIds": [
    "evidence:reference-bsc-lt-salamandra-2b-instruct-readme-md",
    "evidence:reference-bsc-lt-salamandra-7b-instruct-readme-md"
  ],
  "comparisonBasis": "separate-model-cards",
  "allowed": {
    "reportedSideBySide": true,
    "withinReportNumericDifference": false,
    "universalRanking": false,
    "statisticalSignificanceClaim": false,
    "qualityRatioClaim": false,
    "causalClaim": false
  },
  "qualifications": [
    "Model cards report 0-shot with chat template; exact harness and Transformers versions are not established.",
    "XNLI/PAWS do not measure dialogue preference or regional Spanish quality.",
    "Automatic delta/ranking disabled; descriptive discussion of explicitly identified reported rows is allowed."
  ],
  "evaluationIds": [
    "evaluation:supplement-a47d5625bff1db9a",
    "evaluation:supplement-ae42a2e6547a5a18",
    "evaluation:supplement-c2a7ddabb65ae812",
    "evaluation:supplement-e1f22a20c36d6627",
    "evaluation:supplement-9c86a68e288f3d1f",
    "evaluation:supplement-4d4002ecc07e1c1a",
    "evaluation:supplement-b8ba2fd6c4907070",
    "evaluation:supplement-71d32c7c920f2277",
    "evaluation:supplement-042046990140e4c0",
    "evaluation:supplement-f9f3afa9d68be5a5"
  ],
  "numericComparisonPartitionKeys": [
    "benchmark",
    "benchmarkVersion",
    "metric",
    "unit",
    "language"
  ],
  "groupMeaning": "A source-based collection, NOT blanket permission to compare every pair. Partition by the listed keys and preserve settings."
});
referenceComparisons.push({
  "id": "comparison:minicpm-small-model-tasks",
  "title": {
    "fa": "مدل کوچک تازه: برتری وابسته به وظیفه",
    "en": "A new small model: task-dependent results",
    "es": "Un modelo pequeño nuevo: resultados según la tarea"
  },
  "interpretation": {
    "fa": "OpenBMB برای MiniCPM5-2B در LiveCodeBench v6 امتیاز 69.1 و برای Qwen3.5-4B برابر 56.4 گزارش می‌کند؛ اما در MATH-500 امتیازها 94.6 و 99.0 هستند. میانگین تبلیغاتی جدول را به رتبهٔ عمومی تبدیل نکنید.",
    "en": "OpenBMB reports 69.1 for MiniCPM5-2B and 56.4 for Qwen3.5-4B on LiveCodeBench v6; MATH-500 scores are 94.6 and 99.0. The task changes the ordering, so do not promote the table’s aggregate into a universal ranking.",
    "es": "OpenBMB publica 69,1 para MiniCPM5-2B y 56,4 para Qwen3.5-4B en LiveCodeBench v6; en MATH-500 las cifras son 94,6 y 99,0. El orden depende de la tarea; no convierta el promedio de la tabla en una clasificación universal."
  },
  "sourceIds": [
    "evidence:reference-openbmb-minicpm5-2b-readme-md"
  ],
  "comparisonBasis": "publisher-table",
  "allowed": {
    "reportedSideBySide": true,
    "withinReportNumericDifference": true,
    "universalRanking": false,
    "statisticalSignificanceClaim": false,
    "qualityRatioClaim": false,
    "causalClaim": false
  },
  "qualifications": [
    "Evaluation modes, token budgets and exact harness revisions are not established for every compared model.",
    "No quality-per-second or Spanish/Persian quality conclusion is supported."
  ],
  "evaluationIds": [
    "evaluation:supplement-9958cab06ca65141",
    "evaluation:supplement-f5534741d74480bc",
    "evaluation:supplement-1260f5e783ab777b",
    "evaluation:supplement-f53a04210431ed51",
    "evaluation:supplement-2d49c02b3d0f7bca",
    "evaluation:supplement-a1bbe9f547400945",
    "evaluation:supplement-1e216dd7911e7a4e",
    "evaluation:supplement-505d312735c38aac",
    "evaluation:supplement-c5cbbefcfc9a0469",
    "evaluation:supplement-94dc55ff43b6cb38",
    "evaluation:supplement-8659db93ae0c906d",
    "evaluation:supplement-4792cd7d718890c9",
    "evaluation:supplement-b12c8a647fb91bb4",
    "evaluation:supplement-365ce7e70214aece",
    "evaluation:supplement-00322a47bbe6d9da",
    "evaluation:supplement-3b068548e0663976",
    "evaluation:supplement-e89c333a6090ad34",
    "evaluation:supplement-dc42c97fb60b45c5"
  ],
  "numericComparisonPartitionKeys": [
    "benchmark",
    "benchmarkVersion",
    "metric",
    "unit",
    "language"
  ],
  "groupMeaning": "A source-based collection, NOT blanket permission to compare every pair. Partition by the listed keys and preserve settings."
});
