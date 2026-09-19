---
title: Cómo evaluar un LLM para tu idioma y tu tarea
slug: evaluar-llm-idioma-y-tarea
translationGroup: evaluating-llms-for-your-language-and-workload
lang: es
date: '2026-09-02'
faDate: '2026-09-02'
draft: true
math: false
category: Modelos de lenguaje
excerpt: Cómo usar IberoBench, SpanishBench y MTEB sin confundir sus alcances; preparar muestras propias, conservar variantes del español y comparar corrección, herramientas, tiempo y coste.
readTime: 14 min
cover: /images/articles/evaluating-llms-for-your-language-and-workload/cover.webp
related:
- enterprise-rag-model-embedding-reranker-es
- code-completion-assistant-and-agent-es
- four-bit-model-quantization-es
updated: "2026-09-19"
author: Mehran Ziabary
---

La fluidez es lo primero que se aprecia en una demostración de un modelo. Elegirlo exige mirar más cerca: ¿conservó una condición, mantuvo el importe y la unidad, distinguió una respuesta desconocida de una invención verosímil y terminó dentro del plazo del servicio? «Bueno en español» solo ayuda a decidir cuando concreta tarea y público.

Este artículo describe cómo un equipo puede evaluar candidatos para su trabajo. No presenta experimentos realizados por este sitio. La [guía LLM](/es/guides/llm/) distingue resultados publicados de cálculos de memoria; el [artículo sobre tamaño](/es/articles/right-model-size-for-the-task-es/) explica cómo preparar candidatos. El [artículo especializado en evaluación del persa](/articles/evaluating-language-models-for-persian/) es lectura relacionada sobre otro contexto lingüístico, no una traducción de esta metodología general.

## Definir la decisión antes de elegir la prueba

Un objetivo útil sería: «Responder brevemente preguntas sobre documentos del producto, en el idioma del usuario, conservando importes e identificadores y citando el pasaje que respalda la respuesta». Esa definición permite recoger ejemplos y decidir qué errores vuelven inutilizable una salida.

Fluidez, corrección, seguimiento de instrucciones y adecuación al público deben permanecer separados. Reescribir una carta, extraer campos, recuperar un pasaje y conciliar documentos contradictorios no recompensan lo mismo. El idioma de los menús tampoco es el idioma evaluado: una interfaz inglesa puede atender solicitudes españolas o documentos multilingües.

Hay que concretar registro formal o coloquial, vocabulario profesional, convenciones regionales y mezcla de idiomas. Un lector hispanohablante no reside necesariamente en España. Tampoco las prácticas de un país latinoamericano representan a todos los demás. Fechas, moneda, nombres, tratamiento y términos deben proceder del público real, no de una suposición asociada a `es`.

## Qué evidencia responde a cada pregunta

| Evidencia | Qué ayuda a comparar | Límite que conservar |
| --- | --- | --- |
| Prueba de conocimiento o elección múltiple | Sus preguntas y regla de puntuación | Puede no evaluar respuestas documentadas ni producción libre |
| Seguimiento de instrucciones | Cumplimiento de restricciones concretas | Respetar formato no acredita veracidad |
| Recuperación | Localizar documentos con esa colección y métrica | No es una puntuación del generador |
| Problemas de código | Soluciones ejecutables con un presupuesto definido | No mide directamente latencia en el editor ni agentes de repositorio |
| Prueba de agentes | Combinación de modelo, framework y herramientas | Herramientas e intentos distintos cambian la comparación |
| Muestra del equipo | Aceptación en las tareas representadas | Su composición delimita la conclusión |

Para código, [LiveCodeBench](https://livecodebench.github.io/) y [SWE-bench](https://www.swebench.com/) contestan preguntas distintas. Versión, periodo de problemas y entorno pertenecen a cada resultado. El [artículo sobre funciones de programación](/es/articles/code-completion-assistant-and-agent-es/) conecta esas diferencias con autocompletado, asistencia y agentes.

## Recursos para español: escoger la tarea y conservar su alcance

[IberoBench, publicado en COLING 2025](https://aclanthology.org/2025.coling-main.699/), reúne 62 tareas y 179 subtareas para lenguas ibéricas: euskera, catalán, gallego, español europeo y portugués europeo. Evalúa 33 modelos con cero y cinco ejemplos. Su alcance explícito no equivale a cobertura de todas las comunidades hispanohablantes. Resulta útil para identificar dimensiones de evaluación y protocolos, no para declarar por extensión que un modelo sirve para cualquier variedad regional.

La [definición fijada de SpanishBench en LM Evaluation Harness](https://github.com/EleutherAI/lm-evaluation-harness/blob/f2131517dc2e00e6f6a062e254fa126f9e4426da/lm_eval/tasks/spanish_bench/README.md) diferencia, entre otras, estas tareas:

| Identificador | Función evaluada |
| --- | --- |
| `belebele_spa_Latn` | Comprensión lectora |
| `escola` | Aceptabilidad lingüística |
| `mgsm_direct_es_spanish_bench` | Problemas matemáticos |
| `xlsum_es` | Resumen |
| `flores_en-es` / `flores_es-en` | Traducción con direcciones diferentes |

El historial registra que v1.2 modificó el criterio de parada por saltos de línea de la tarea MGSM. Por tanto, «SpanishBench» sin tarea y revisión no identifica todas las condiciones del resultado. Deben registrarse también ejemplos, formato de respuesta y forma de puntuación.

Para embeddings, el [repositorio MTEB](https://github.com/embeddings-benchmark/mteb) y el [artículo MMTEB](https://arxiv.org/abs/2502.13595) permiten buscar evaluaciones por tarea e idioma. Hay que seleccionar la colección y revisión, el subconjunto español y la métrica de recuperación pertinente. La media de clasificación, similitud y recuperación no responde a una necesidad exclusivamente de búsqueda; una media multilingüe tampoco es la puntuación española.

Estas fuentes no son una licencia para atribuir resultados a modelos que no aparecen en el experimento. Cuando falta un resultado para un candidato, la conclusión correcta es que no hay evidencia registrada para ese caso, sin inventar una posición en la clasificación.

## Español nativo, traducción y media multilingüe no son lo mismo

Una tarea escrita originalmente en español aporta un tipo de evidencia; una tarea traducida permite otro tipo de comparación y puede conservar supuestos culturales del original o introducir artefactos de traducción. Ambas pueden ser útiles, pero deben identificarse. «Multilingüe» describe todavía otra situación si se trata de una media de idiomas.

También importa la dirección. Traducir de inglés a español difiere de español a inglés. Una consulta española que recupera documentos ingleses no es recuperación monolingüe española. La configuración `default` de un conjunto no establece que sus muestras sean inglesas.

Separemos declaración del publicador, resultado de una tarea relevante y evaluación independiente. La ausencia de resultados no demuestra falta de soporte; una lista de idiomas en la ficha tampoco demuestra calidad en todas sus tareas. Para un servicio destinado a varios países, conviene representar vocabulario, convenciones y tipos de documento de sus usuarios, sin puntuar una preferencia regional como única forma correcta.

<!-- reference:language-evidence:start -->

## Qué cambia al mirar resultados por idioma

La [tabla 6 del informe E5](https://arxiv.org/html/2402.05672v1) publica estos valores nDCG@10 de desarrollo de MIRACL, en la escala 0–100 del informe:

| Modelo | Inglés | Español |
|---|---:|---:|
| multilingual-e5-small | 48,0 | 51,2 |
| multilingual-e5-base | 51,2 | 51,5 |
| multilingual-e5-large | 52,9 | 52,9 |
| multilingual-e5-large-instruct | 51,5 | 53,7 |

Large-Instruct obtiene la mayor puntuación española de estos cuatro, mientras Large encabeza el subconjunto inglés. Cambia la selección según el idioma; no se demuestra significación estadística ni calidad conversacional. Recall@100 describe cobertura en un conjunto mayor de candidatos y sigue siendo otra métrica. Ninguna de estas pruebas evalúa consultas en español contra una colección inglesa.

Las fichas de [Base](https://huggingface.co/intfloat/multilingual-e5-base) y [Large-Instruct](https://huggingface.co/intfloat/multilingual-e5-large-instruct) también publican clasificación, con particiones y revisiones del conjunto. Esa evidencia orienta la clasificación de intenciones; no debe convertirse en una tabla de recuperación. Compartir revisión del conjunto tampoco establece una configuración idéntica del clasificador.

Para comparar una cadena, el [estudio de rerankers de Qwen](https://arxiv.org/html/2506.05176v3) mantiene los 100 primeros candidatos de Qwen3-Embedding-0.6B. MTEB-R pasa de 61,82 en la referencia a 65,80 con el reranker de 0,6B: 3,98 puntos dentro de ese experimento. No son una mejora medida de la corrección de respuestas generadas ni una reducción de latencia.

Los resultados españoles de las fichas [Salamandra 2B](https://huggingface.co/BSC-LT/salamandra-2b-instruct) y [7B](https://huggingface.co/BSC-LT/salamandra-7b-instruct) aportan candidatos de generación por tarea. Son fichas independientes: no acreditan un protocolo común ni cobertura de todas las variedades regionales del español.

Las [comparaciones por idioma y tarea](/es/guides/llm/?show-drafts=true&reference-group=comparison%3Ae5-miracl-by-language#reference-comparisons) conservan métrica, fuente y configuración de cada resultado.

<!-- reference:language-evidence:end -->

## Una muestra pequeña que revele errores

Un conjunto inicial de aproximadamente 100–200 casos puede servir para identificar fallos y descartar candidatos inadecuados. Es una escala práctica de arranque, no un tamaño estadísticamente suficiente para cualquier conclusión. Una decisión sensible o diferencias pequeñas requieren más evidencia que un desajuste evidente.

Los ejemplos pueden proceder del trabajo real, eliminando datos confidenciales innecesarios. Antes de leer respuestas se registran entrada, evidencia permitida, requisitos de aceptación y errores costosos. Si la pregunta es ambigua, se aclara o se utiliza expresamente para comprobar si el modelo pide precisión.

Mantengamos separadas una muestra próxima al tráfico habitual y otra de casos difíciles. Sobrerrepresentar fallos raros ayuda a diagnosticarlos, pero su media no estima directamente el servicio diario.

Los siguientes son **ejemplos educativos redactados para explicar el método**; no son preguntas copiadas de benchmarks ni resultados medidos:

| Propiedad | Entrada o tarea | Condición de aceptación |
| --- | --- | --- |
| Negación y etapas | «Las solicitudes incompletas se registran, pero no se revisan hasta recibir la documentación». Preguntar si nunca se registran. | Distinguir registro y revisión, y corregir la premisa |
| Importe y unidad | Extraer cantidad y moneda de «La tarifa es de 250,00 EUR». | Conservar ambos datos, sin conversión no solicitada |
| Fecha ambigua | Una fuente dice `03/04/2026` sin indicar convención. Pedir fecha inequívoca. | Solicitar contexto o conservar la ambigüedad, sin inventar el orden |
| Identificadores | Resumir un mensaje con `REQ-0142` y `v2.3.1`. | Mantener exactamente identificador y versión |
| Evidencia ausente | El documento indica horario de respuesta pero ningún precio. Preguntar el coste. | Indicar que no consta, sin inventar importe |
| Contexto conversacional | El usuario indica Linux y después pregunta dónde poner un archivo de configuración. | Mantener plataforma y pedir los datos de software que faltan |
| Variación de vocabulario | Dos usuarios describen el mismo equipo como «ordenador» y «computadora». | Conservar intención y no atribuir país o características no indicadas |
| Contrato de salida | Dos frases o un esquema JSON que deben conservar una excepción. | Cumplir formato y significado, no solo sintaxis |

Las entradas deben tener la calidad real del producto: fragmentos, OCR, abreviaturas y expresiones informales si son habituales. Los errores de extracción se separan de los del generador; recibir un importe corrompido no equivale a evaluar el documento original correcto.

## Condiciones de aceptación antes de la nota total

Para salidas exactas, comprobemos identificadores, importes, campos y destinos de citas directamente. Para texto abierto, una rúbrica debe permitir explicar desacuerdos. Una escala de cero a dos puede ser útil si cada nivel tiene ejemplos:

| Dimensión | 2 | 1 | 0 |
| --- | --- | --- | --- |
| Corrección y tarea | Resultado requerido correcto y completo | Parte correcta con omisión importante | Resultado central erróneo o tarea no realizada |
| Respaldo documental, cuando corresponda | Afirmaciones necesarias respaldadas e incertidumbre clara | Falta respaldo de alguna afirmación necesaria | Afirmación principal inventada o contradictoria |
| Instrucciones | Ámbito, longitud y formato requeridos | Desviación reparable | Restricción esencial incumplida |
| Idioma y público | Texto claro, natural y adecuado | Comprensible, necesita edición | Redacción o tono impiden usarlo |

Es una rúbrica de ejemplo, no un estándar universal validado. El respaldo documental puede no ser aplicable; puntuarlo cero en una tarea ajena distorsionaría la comparación. Un importe erróneo o una excepción eliminada no deberían compensarse con buena prosa. Se fijan primero condiciones indispensables y después se comparan estilo, tiempo y coste entre respuestas utilizables.

Si se calcula una media general, los pesos de categorías se deciden antes de ver el ganador y se acompañan de resultados desglosados. Cuando la formulación exacta no es el objetivo, se admiten varias paráfrasis correctas.

## Normalizar presentación sin borrar significado

La coincidencia exacta sirve para un identificador y puede ser demasiado estricta para una respuesta natural. Una normalización controlada puede ignorar espacios sobrantes o cierta representación equivalente de números. No debe borrar signos negativos, moneda, puntuación de versiones, negación ni diferencias internas de identificadores.

En español también hay convenciones numéricas distintas según el contexto. El evaluador debe conocer la convención declarada en la tarea y no convertir silenciosamente `1.250` entre mil doscientos cincuenta y uno con veinticinco centésimas. Si el origen no permite decidir, resolver la ambigüedad forma parte de la conducta evaluada.

La similitud semántica tiene el riesgo inverso: dos frases casi iguales pueden autorizar y prohibir la misma acción por una sola negación. Conviene combinar revisión semántica y controles directos de datos sensibles. Una preferencia de estilo regional no define por sí sola la corrección lingüística.

## Revisión humana y jueces de modelo

Presentemos respuestas sin nombres de modelo y con orden variable. Dos personas deberían puntuar independientemente una parte antes de resolver desacuerdos. Competencia lingüística y conocimiento del dominio son diferentes: alguien puede juzgar bien el estilo sin poder validar una respuesta especializada.

Un LLM juez amplía cobertura, pero debe contrastarse con personas en ese idioma y tarea. El [estudio de jueces de MT-Bench y Chatbot Arena](https://arxiv.org/abs/2306.05685v4) examina efectos de orden y verbosidad. Rúbricas claras, ejemplos, empates y posiciones intercambiadas ayudan a detectar esas preferencias.

Revisemos una muestra aleatoria de todas las salidas además de casos disputados o de alto impacto. Mirar solo lo que el juez declara dudoso deja fuera sus errores seguros. Para aritmética, esquemas y código ejecutable se aprovechan comprobaciones deterministas; no es necesario que un juez lingüístico adivine lo que puede resolver una calculadora o una prueba.

La referencia tampoco debe proceder únicamente de respuestas sin verificar de uno de los competidores. Eso puede premiar semejanza con ese modelo en vez de éxito en la tarea.

## Separar modelo y sistema completo

En respuestas documentales, entreguemos primero evidencia correcta directamente a cada generador. Después ejecutemos las mismas preguntas a través de recuperación. Si el documento correcto resuelve el fallo, se revisan extracción, búsqueda, reranking y selección de contexto antes de sustituir el generador. La [guía de componentes RAG](/es/articles/enterprise-rag-model-embedding-reranker-es/) explica las mediciones.

En recuperación interesa si toda la evidencia necesaria llega a los primeros k resultados y sobrevive al reranking. En generación importan apoyo y exactitud de las citas. En código se ejecuta el cambio en el entorno requerido. En agentes se registran framework, herramientas, permisos, condiciones de parada e intentos. Una puntuación de conocimiento o código no acredita que el agente resuelva una incidencia completa.

## Comparación reproducible y conclusión limitada a su evidencia

Preguntas, evidencia permitida, aceptación y presupuesto de trabajo deben ser comparables. Cada modelo utiliza su plantilla correcta; imponer a todos un formato que rompe uno no mejora la comparación. Se registran ejemplos de prompt, razonamiento, tokens, temperatura, herramientas y regla de selección entre intentos.

Los ejemplos de desarrollo se separan del ensayo final. Preguntas casi duplicadas o varias procedentes del mismo documento pueden filtrarse entre grupos con una división aleatoria ingenua. Ajustar repetidamente el prompt mirando fallos de prueba convierte esa prueba en desarrollo. El solapamiento con entrenamiento de un benchmark público es una preocupación metodológica; una puntuación alta no demuestra por sí sola contaminación.

Supongamos, **de forma hipotética**, 81 aciertos de 100 para un modelo y 78 para otro. La diferencia de tres no prueba superioridad general. Importan los casos en que discrepan, cómo se eligieron y si varios proceden de un mismo documento. La [guía de significación estadística en PLN](https://aclanthology.org/P18-1128/) trata la elección de métodos según tarea y diseño. Debe informarse incertidumbre de la comparación, no convertir cada cambio pequeño en una clasificación concluyente.

En generación variable o agentes, repeticiones y selección de respuesta se fijan antes. Comparar el mejor de varios intentos con el primer intento de otro enfrenta presupuestos distintos. En API se conservan versión anunciada y fecha de ejecución; en modelos locales, archivo y cuantización. El commit de un documento fuente no es automáticamente la revisión de pesos probados.

## Tiempo y coste después de definir una salida útil

Se usa el mismo texto y trabajo necesario y se cuentan después los tokens reales de cada tokenizador. Los tokens no son una unidad de experiencia independiente del idioma. Tiempo hasta una primera respuesta útil, duración total, salidas truncadas y reintentos acompañan al ritmo de tokens.

Debe evaluarse la variante que se desplegará: modelo, cuantización, motor, contexto y carga concurrente. La puntuación del checkpoint original no valida cualquier conversión a cuatro bits; una petición completada no acredita servicio multiusuario. El [artículo de cuantización](/es/articles/four-bit-model-quantization-es/) y la [comparación de memoria GPU](/es/articles/llms-on-rtx-4090-24gb-vs-48gb-es/) separan esos efectos.

El coste por tarea aceptada incluye intentos fallidos y corrección humana bajo las mismas condiciones de aceptación. Un modelo pequeño puede atender el recorrido habitual y derivar casos difíciles, pero la decisión de ruta necesita evidencia propia. La seguridad del tono no es una señal fiable.

## Un informe que permita decidir el siguiente cambio

| Apartado | Información para decidir |
| --- | --- |
| Trabajo y público | Tarea, idioma y variedad, dominio y salida esperada |
| Configuración | Checkpoint o archivo, motor, prompt, razonamiento, cuantización y herramientas |
| Datos | Fuente y revisión, cantidades por categoría, desarrollo y casos difíciles |
| Puntuación | Requisitos obligatorios, normalización, rúbrica y participación humana o automática |
| Calidad | Resultados por categoría, salidas aceptadas, errores e incertidumbre |
| Servicio | Longitudes, demanda, latencia, duración y costes de intentos |

La conclusión debe indicar el límite: esta configuración cumple estos requisitos para estas tareas representadas, mientras ciertas categorías identificadas necesitan otra ruta. Es más útil que declarar un ganador universal del español. También señala qué revisar cuando cambien documentos, instrucciones, modelos, programas o población usuaria.
