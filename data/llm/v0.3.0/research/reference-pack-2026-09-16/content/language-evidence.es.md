---
contentKey: language-evidence
locale: es
suggestedSlug: elegir-modelos-con-evidencia-en-espanol
replacesRegionalArticleKey: evaluating-language-models-for-persian
status: ready-for-editorial-integration
---

# Elegir modelos con evidencia en español

Que un modelo declare español permite incluirlo entre los candidatos. Para elegirlo hace falta saber qué tarea se ha evaluado: recuperar documentos, clasificar intenciones, responder preguntas, redactar o utilizar herramientas. Esta guía reúne resultados publicados; no presenta experimentos nuevos realizados por el sitio.

## Una etiqueta de idioma no es una puntuación

Un modelo puede producir español y, aun así, carecer de resultados publicados para la tarea que necesita. Tampoco una media multilingüe permite deducir su puntuación en español. Conviene distinguir tres estados: idioma declarado, resultado registrado en una tarea del idioma y evidencia aplicable al flujo previsto.

La ausencia de un resultado significa «sin evaluación registrada». No implica automáticamente «idioma no compatible». Esta diferencia evita descartar candidatos por falta de documentación o recomendarlos con una confianza que los datos no sostienen.

## Para buscar documentos, consulte resultados de recuperación

El informe E5 ofrece una comparación directa sobre el conjunto de desarrollo de MIRACL en español. Los valores siguientes se mantienen en la escala de 0 a 100 publicada por sus autores:

| Modelo | nDCG@10 | Recall@100 |
|---|---:|---:|
| multilingual-e5-small | 51,2 | 87,6 |
| multilingual-e5-base | 51,5 | 88,6 |
| multilingual-e5-large | 52,9 | 89,1 |
| multilingual-e5-large-instruct | 53,7 | 89,3 |

nDCG@10 valora la posición de los documentos pertinentes cerca del principio de la lista. Recall@100 describe su presencia entre un conjunto mayor de candidatos. No promedie ambas columnas ni interprete esos valores como la proporción de respuestas correctas de un asistente RAG. [Informe E5, tabla 6](https://arxiv.org/html/2402.05672v1).

Large-Instruct encabeza estas cuatro variantes en este resultado español. Eso no establece superioridad universal: en la parte inglesa de la misma evaluación, Large obtiene 52,9 en nDCG@10 y Large-Instruct 51,5. El idioma y la tarea cambian la decisión. Tampoco estas pruebas acreditan consultas españolas sobre documentos ingleses; la recuperación entre idiomas necesita evidencia propia. [Misma fuente](https://arxiv.org/html/2402.05672v1).

## Para clasificar, busque otra evidencia

Las fichas de E5 incluyen resultados de clasificación en español, como MassiveIntent y MTOP. Sirven para considerar un componente de embeddings dentro de un clasificador, no para ordenar motores de búsqueda. Conserve la revisión del conjunto, la partición y la métrica. Si no se conoce la configuración del clasificador o la versión del evaluador, no dé por idénticos todos los protocolos. [E5 Base](https://huggingface.co/intfloat/multilingual-e5-base), [E5 Large-Instruct](https://huggingface.co/intfloat/multilingual-e5-large-instruct).

## Para generación, use tareas españolas identificables

Salamandra aporta resultados publicados para tareas españolas con sus variantes de instrucciones de 2B y 7B. Por ejemplo:

| Tarea | Salamandra 2B Instruct | Salamandra 7B Instruct |
|---|---:|---:|
| XStoryCloze_es, accuracy | 61,95 | 68,17 |
| XNLI_es, accuracy | 48,52 | 46,95 |
| PAWS_es, accuracy | 57,10 | 64,25 |

Las fichas describen evaluación zero-shot con plantilla de conversación. El orden cambia según la tarea; sin intervalos de incertidumbre no debe afirmarse que una diferencia pequeña demuestra superioridad concluyente. Estas tareas tampoco constituyen una nota global de conversación. [Ficha 2B](https://huggingface.co/BSC-LT/salamandra-2b-instruct), [ficha 7B](https://huggingface.co/BSC-LT/salamandra-7b-instruct).

SpanishBench permite entender qué se está midiendo: incluye, entre otras, inferencia, paráfrasis, comprensión de preguntas, traducción y resumen. Consulte las definiciones antes de elegir una columna. Por ejemplo, una puntuación de traducción necesita la dirección lingüística para ser interpretable; una etiqueta agregada como FLORES_es no autoriza a inventar esa dirección. [Definiciones de SpanishBench](https://github.com/EleutherAI/lm-evaluation-harness/tree/main/lm_eval/tasks/spanish_bench).

## Español no equivale a un único mercado

Una evaluación en español no demuestra por sí sola cobertura del vocabulario mexicano, el voseo rioplatense, la terminología administrativa española o un sector profesional concreto. La lista inicial puede combinar modelos especializados en lenguas ibéricas con modelos multilingües generales, pero debe conservar esta limitación. En este paquete no se ha verificado una comparación que cubra todas las variedades latinoamericanas.

Disponibilidad, tratamiento de datos y condiciones comerciales también dependen del proveedor y del país. No traslade automáticamente restricciones de otro mercado a todos los usuarios hispanohablantes.

## Cómo usar la comparación

Seleccione primero la tarea y el idioma de consultas y documentos. Después revise modelo exacto, fuente, versión del benchmark y configuración conocida. Mantenga separados resultados del editor, resultados de terceros y conclusiones editoriales.

Si falta información, la comparación sigue siendo útil para formar una lista inicial, pero no debe convertirse en una clasificación universal. El objetivo es reducir decisiones basadas en etiquetas y hacer visibles las razones para elegir cada candidato.
