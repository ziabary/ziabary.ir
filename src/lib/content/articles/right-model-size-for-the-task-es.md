---
title: ¿Qué tamaño de modelo de lenguaje necesita realmente tu tarea?
slug: right-model-size-for-the-task-es
translationGroup: right-model-size-for-the-task
lang: es
date: '2026-06-18'
faDate: '2026-06-18'
draft: true
math: false
category: Modelos de lenguaje
excerpt: Cómo elegir entre modelos especializados, generadores pequeños y LLM grandes separando calidad, idioma, recuperación, memoria y capacidad de servicio, con comparaciones publicadas y un ejemplo de cálculo.
readTime: 14 min
cover: /images/articles/right-model-size-for-the-task/cover.png
related:
- rag-cag-kag-fine-tuning-instruction-tuning-es
- choosing-gpu-for-ai-es
- gpu-server-platform-components-es
updated: "2026-09-19"
author: Mehran Ziabary
---

<script>
  import LlmReferenceGuidance from '$lib/components/LlmReferenceGuidance.svelte';
</script>

Enviar mensajes de clientes al departamento adecuado, extraer un número de pedido y responder una pregunta a partir de un manual son tareas lingüísticas, pero piden resultados diferentes: una etiqueta, unos campos y una respuesta respaldada por un documento. Empezar preguntando «¿qué modelo de 30 o 70 mil millones de parámetros instalamos?» adelanta una decisión de infraestructura antes de definir el trabajo. Un clasificador, un modelo especializado o un generador más pequeño pueden resolverlo con menos recursos.

La comparación útil enfrenta configuraciones que cumplen un criterio de aceptación concreto: campos correctos, una respuesta fundamentada o código que funciona, dentro del tiempo requerido. La [guía de modelos de lenguaje](/es/guides/llm/) conecta esas tareas con resultados publicados, archivos descargables, programas de ejecución y estimaciones de memoria.

## Especializado y pequeño son propiedades distintas

Un modelo especializado tiene una función: traducción, reconocimiento de entidades, clasificación, representación vectorial o evaluación de la relevancia de un documento. El tamaño se refiere al número de parámetros. La B de nombres como 8B suele significar *billion*: mil millones, no un billón en español. La especialización no impone un tamaño, y «modelo de lenguaje pequeño» tampoco tiene un umbral universal; la [revisión de modelos pequeños](https://arxiv.org/html/2410.20011v1) explica cómo cambia esa categoría según el contexto.

La diferencia se aprecia en [BGE-M3](https://huggingface.co/BAAI/bge-m3), que permite recuperación densa, dispersa y multivector, y [BGE-Reranker-v2-M3](https://huggingface.co/BAAI/bge-reranker-v2-m3), que puntúa una consulta junto con un pasaje candidato. Ninguno sustituye al generador que redacta la respuesta final. Un asistente documental puede necesitar las tres funciones, con tamaños elegidos por separado.

Para categorías fijas también sirve como referencia un sistema de reglas o un clasificador convencional. En documentos escaneados, hay que decidir si OCR más un modelo de texto conserva la información necesaria o si hace falta entrada visual. Aumentar los parámetros de un modelo exclusivamente textual no le añade visión.

## Una respuesta acotada no exige lo mismo que un análisis abierto

Una respuesta breve de soporte suele requerir comprender la petición, seguir unas instrucciones y expresar una conclusión limitada. En RAG directo, el conocimiento llega en los documentos incluidos en la entrada. Evidencia clara, un dominio acotado y respuestas breves convierten a un modelo pequeño en un candidato razonable. [SmolLM2-1.7B-Instruct](https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct), por ejemplo, está orientado al inglés y permite estudiar tareas limitadas de reescritura y seguimiento de instrucciones; su tamaño no demuestra la misma idoneidad en español.

Comparar excepciones de varios contratos exige otras capacidades: mantener conclusiones intermedias, resolver contradicciones y separar reglas explícitas de suposiciones. Ahí merece la pena incluir un modelo de razonamiento más potente. La palabra «análisis» es demasiado amplia: identificar el tema de un mensaje o pedir a SQL un total de ventas no exige necesariamente un analista generalista.

Lo mismo ocurre con el código. Completar una función es una tarea más estrecha que modificar varios archivos, ejecutar pruebas y decidir el siguiente paso tras un fallo. El tamaño debe responder a la parte difícil del proceso, aunque ambas aplicaciones presenten una interfaz de conversación.

## Un mapa inicial de tamaños

La tabla ofrece **criterios editoriales para preparar una selección inicial**, no resultados de un ensayo. Los intervalos corresponden a modelos generativos densos apropiados para el idioma y la tarea, con un contexto manejable. En MoE hay que distinguir parámetros totales y activos.

| Tarea | Unos 1–4 mil millones | Unos 7–14 mil millones | Unos 24–72 mil millones o más | Primera comparación |
| --- | --- | --- | --- | --- |
| Clasificación y extracción de campos claros | Candidato para entradas acotadas | Más ambigüedad y variedad | Menor prioridad para un esquema fijo | Reglas o especialista, después un generador pequeño |
| Conversación sencilla y preguntas frecuentes | Opción económica para un dominio limitado | Conversaciones más variadas | El aumento necesita un beneficio concreto | Modelo pequeño de instrucciones en el idioma objetivo |
| Reescritura y resumen breve | Texto e instrucciones sencillos | Más detalles y restricciones | Texto difícil y requisitos combinados | Comparar 3–4B con 8B |
| RAG directo sobre pocos pasajes | Posible con evidencia explícita | Punto de partida equilibrado para documentos variados | Difícil justificarlo para extracción directa | Recuperación y generador de 4–8B |
| RAG con varios documentos y excepciones | Subtareas limitadas | Evaluar el razonamiento | Candidato para relaciones complejas | Comparar modelos de razonamiento de 14B y 32B |
| Completar código y hacer cambios locales | Modelo especializado en código | Mayor variedad de código e instrucciones | Dependencias difíciles o cambios amplios | Modelo de código de 3–8B |
| Agente de código con archivos y herramientas | Componentes sencillos del proceso | Tareas acotadas y herramientas definidas | Candidato para trabajo complejo | Modelo más capaz de código o agentes |
| Análisis abierto y razonamiento de varios pasos | Referencia inicial más débil en general | Modelo de razonamiento como referencia | Candidato para problemas difíciles y variados | Calidad y coste por tarea completada |

Para embeddings y reranking se parte de modelos de esas funciones, como [Qwen3-Embedding-0.6B](https://huggingface.co/Qwen/Qwen3-Embedding-0.6B). La [tabla de adecuación por tarea](/es/guides/llm/#model-suitability) permite concretar candidatos; el [catálogo](/es/guides/llm/#model-catalog) identifica versiones y archivos.

## Los resultados publicados ayudan si conservamos su alcance

La sección sin modo de razonamiento de la [ficha de SmolLM3](https://huggingface.co/HuggingFaceTB/SmolLM3-3B) muestra por qué no basta una clasificación por tamaño:

| Modelo | IFEval | LiveCodeBench v4 |
| --- | ---: | ---: |
| SmolLM3-3B | 76,7 | 15,2 |
| Qwen3-4B | 68,9 | 24,9 |

El modelo menor obtiene más puntuación en seguimiento de instrucciones y menos en programación. Son resultados del publicador, no un experimento que aísle el número de parámetros: también cambian el entrenamiento y el diseño.

El [informe de DeepSeek-R1](https://huggingface.co/deepseek-ai/DeepSeek-R1) atribuye a sus modelos destilados basados en Qwen de 14B y 32B valores de MATH-500 pass@1 de 93,9 y 94,3: 0,4 puntos de diferencia. En GPQA Diamond los valores son 59,1 y 62,1. La diferencia mayor pertenece a otra tarea; ninguna equivale directamente a un porcentaje de mejora de un asistente documental.

También sucede con modelos especializados. En la [tabla 4 del artículo de Qwen3 Embedding](https://arxiv.org/html/2506.05176v1), los rerankers de 4B y 8B obtienen 69,76 y 69,02 en MTEB-R en inglés, frente a 72,74 y 72,94 en MMTEB-R multilingüe. El experimento reordena 100 candidatos recuperados con Qwen3-Embedding-0.6B. La inversión del orden se refiere a esas colecciones y a esa configuración, no a todos los idiomas ni a cualquier conjunto de candidatos.

Estos datos ayudan a elegir qué comparar en la aplicación. Una diferencia pequeña puede importar para un error caro, mientras que una media elevada puede no resolver el fallo que está causando problemas.

<!-- reference:task-order:start -->

### Elija el tamaño después de definir la tarea

[Qwen](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) publica 35,1 en LiveCodeBench v6 para Qwen3-4B-Instruct-2507 y 29,0 para Qwen3-30B-A3B sin razonamiento. En Aider-Polyglot, el orden se invierte: 12,9 frente a 24,4. Resolver ejercicios y editar código dentro del flujo de Aider orientan hacia elecciones distintas. Una etiqueta única de «mejor modelo para programar» ocultaría esa diferencia. Conserve la variante exacta, el modo de generación y la tarea al interpretar los resultados.

<LlmReferenceGuidance locale="es" ids={["guidance:small-model"]} />

<!-- reference:task-order:end -->

## En RAG, diagnostiquemos la recuperación antes de cambiar el generador

Un asistente documental debe localizar información, ordenarla y responder a partir de ella. Si la cláusula de devoluciones no llega al modelo, un generador mayor no recuperará con fiabilidad la evidencia ausente. Si apareció entre los candidatos pero quedó fuera del contexto por su posición, corresponde revisar recuperación y reranking. Si la cláusula correcta está presente y el modelo interpreta mal una excepción, las instrucciones o el generador pasan a ser sospechosos más plausibles.

Un diagnóstico útil consiste en entregar manualmente el pasaje correcto. Si mejora la respuesta, conviene investigar el recorrido de recuperación. Si el error persiste, se concentra la revisión en instrucciones, uso del contexto y razonamiento. Así se distingue el gasto en un generador mayor del gasto en indexación o procesamiento documental.

La cantidad total de documentos no determina directamente el tamaño del generador. Millones de documentos pueden aportar tres pasajes a una consulta; unos pocos contratos pueden exigir comparar versiones de forma compleja. La capacidad del índice, el contexto recuperado y la dificultad del razonamiento son presupuestos distintos.

## ¿Aportar conocimiento o modificar el comportamiento aprendido?

Tener datos propios no justifica automáticamente el fine-tuning. Primero hay que separar información ausente de comportamiento inadecuado cuando la información correcta ya está disponible.

[RAG](https://arxiv.org/abs/2005.11401) recupera información externa pertinente para cada pregunta. Resulta apropiado para colecciones extensas o cambiantes y respuestas que deben conservar conexión con sus fuentes. Conectar un modelo de instrucciones ya entrenado con recuperación no exige por sí mismo modificar sus pesos.

Aquí, [CAG significa Cache-Augmented Generation](https://arxiv.org/html/2412.15605v2): se introduce una colección acotada en el contexto y se reutiliza su estado calculado, normalmente la caché KV. Puede evitar recuperación y cómputo repetido del prefijo, pero documentos, pregunta y margen de salida deben caber en el contexto utilizable. Actualizar la colección puede invalidar la caché; almacenar ese estado no es entrenar.

[KAG en el marco OpenSPG](https://arxiv.org/abs/2409.13731) conecta conocimiento estructurado, texto y razonamiento guiado por formas lógicas. Tiene interés cuando relaciones y reglas son centrales, a cambio de construir y mantener esa estructura. No garantiza la eliminación de respuestas inventadas.

El fine-tuning continúa el entrenamiento de un modelo para una tarea, dominio o comportamiento. El [instruction tuning](https://arxiv.org/abs/2109.01652) es una forma de fine-tuning con instrucciones y respuestas deseadas. Un modelo Instruct disponible puede cubrir ya la necesidad. Un entrenamiento adicional tiene más sentido cuando existen ejemplos representativos y el modelo sigue confundiendo campos, contratos de salida o herramientas pese a disponer de la evidencia.

Precios actuales, estados de pedidos y procedimientos revisados suelen exigir acceso a la fuente vigente. El entrenamiento por sí solo no garantiza su actualización. Se pueden combinar métodos: un modelo pequeño adaptado para extracción puede recuperar datos actuales y reutilizar un prefijo fijo. La [comparación de RAG, CAG, KAG y ajuste](/es/articles/rag-cag-kag-fine-tuning-instruction-tuning-es/) desarrolla estas decisiones.

## Evaluemos el idioma del trabajo

El idioma de la interfaz no es el idioma de evaluación. Una aplicación puede tener menús en inglés y procesar documentos en español, o recibir preguntas en un idioma y recuperar textos en otro. Las listas de idiomas del publicador sirven para identificar candidatos; una media multilingüe no acredita la calidad en cada idioma y tarea.

[Aya Expanse 8B](https://huggingface.co/CohereLabs/aya-expanse-8b), por ejemplo, declara 23 idiomas. Sus pesos públicos tienen una licencia no comercial: la idoneidad para desplegarlo incluye condiciones de uso además de evidencia lingüística. Asimismo, el resultado de una adaptación pertenece a esa adaptación, no automáticamente al checkpoint público.

Las entradas representativas deben incluir formatos locales de fechas y números, identificadores, negaciones, nombres de producto, expresiones informales y mezcla de idiomas. En español, la terminología y las convenciones de un país no representan necesariamente a los demás. Conservar un importe o una excepción puede importar más que redactar párrafos fluidos.

Los tokenizadores también producen cantidades de tokens distintas para un mismo texto. Conviene comparar la misma tarea y salida necesaria, y después contabilizar la tokenización de cada modelo. Ni una traducción automática de una prueba inglesa ni una media global sustituye a ejemplos del contexto lingüístico real.

## Parámetros, tamaño del archivo y memoria de ejecución no son equivalentes

Un modelo de 8B sigue teniendo 8 mil millones de parámetros después de cuantizarlo. En un cálculo ideal, ocho mil millones de pesos almacenados exactamente en cuatro bits ocupan cuatro mil millones de bytes. Los metadatos, los tensores conservados con mayor precisión, los búferes temporales y la caché KV separan esa cifra de la VRAM necesaria para un servicio.

[GGUF](https://huggingface.co/docs/hub/en/gguf) es un formato, no una precisión ni un tamaño de modelo. Hay que identificar el checkpoint base, el publicador del archivo, la cuantización y el motor compatible. La [vista de compatibilidad de despliegue](/es/guides/llm/?view=deployment-compatibility#serving-software) distingue esas elecciones.

En MoE, los parámetros activos describen solo parte del trabajo. [Qwen3-Coder-30B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct) declara unos 30,5 mil millones totales y 3,3 mil millones activos. Mantener todos los pesos en memoria sigue implicando el modelo completo. El recuento activo no convierte su huella de memoria en la de un modelo denso de 3,3 mil millones.

## Una petición resuelta no define la capacidad del servicio

Un servidor puede compartir un conjunto de pesos entre varias peticiones y gestionar sus contextos por separado. No necesita una copia por usuario. Las réplicas independientes son otra decisión: duplican pesos y procesan flujos de peticiones separados, como en el [despliegue paralelo de datos de vLLM](https://docs.vllm.ai/en/latest/serving/data_parallel_deployment/). El procesamiento por lotes y la gestión de memoria, incluida [PagedAttention](https://arxiv.org/abs/2309.06180), influyen en el aprovechamiento de una réplica.

Consideremos un **ejemplo educativo de memoria**, con 24 GiB disponibles y 4 GiB reservados para sobrecarga de ejecución:

| Memoria de pesos | Memoria restante para KV | Peticiones activas con 1 GiB de KV cada una | Peticiones activas con 4 GiB de KV cada una |
| --- | ---: | ---: | ---: |
| 4 GiB | 16 GiB | 16 | 4 |
| 16 GiB | 4 GiB | 4 | 1 |

Son límites exclusivamente de memoria bajo esas hipótesis. El consumo KV real depende de arquitectura, precisión y contexto; que una petición quepa no determina su tiempo de respuesta. Usuarios registrados, peticiones en cola y peticiones activas son tres cantidades diferentes.

Las instrucciones del sistema, el historial, los pasajes recuperados y la salida consumen contexto. Reducirlo para admitir más peticiones puede quitar información necesaria al producto. A la inversa, aceptar una entrada larga no demuestra que se use correctamente; [RULER](https://arxiv.org/abs/2404.06654) estudia esa diferencia. Tiempo hasta el primer token, tiempo entre tokens y peticiones completadas deben observarse por separado.

## La forma de ejecutar el modelo cambia la selección práctica

El [enfoque por capas de AirLLM](https://github.com/lyogavin/airllm/blob/v4.0.0/README.md) mueve los pesos para evitar que el modelo entero resida simultáneamente en la GPU. Amplía las posibilidades con poca VRAM, pero almacenamiento y transferencias entran en el presupuesto de latencia. Un experimento nocturno útil puede ser inadecuado para un servicio interactivo.

El motor también forma parte de la configuración: [Ollama](https://docs.ollama.com/) facilita la gestión de modelos y el acceso desde aplicaciones; [vLLM](https://docs.vllm.ai/en/latest/) ofrece ejecución orientada al servicio. La [tabla de programas](/es/guides/llm/#serving-software) permite contrastar modelo, formato, procesamiento por lotes y memoria. El nombre de una herramienta no garantiza una capacidad de atención.

## Una comparación que explique la decisión

Empecemos con una referencia sencilla o especializada, un modelo pequeño adecuado y una alternativa más capaz. Reservemos ejemplos que no hayan servido para escoger instrucciones ni ajustes. Separar casos habituales de fallos costosos evita que una media favorable oculte los segundos.

En extracción, se puntúan los valores y su asignación, no solo que el JSON sea válido. En respuestas documentales, se comprueba que el pasaje respalde la afirmación y que la falta de información no produzca una invención. En código, se ejecutan pruebas pertinentes. Para cada configuración se registran checkpoint, plantilla de conversación, cuantización, contexto, modo de razonamiento y presupuesto de salida.

Después se atribuyen los errores: OCR, recuperación, resultados de herramientas y razonamiento del generador necesitan intervenciones distintas. Reintentos, corrección humana y latencia entran en el coste por salida útil. Un modelo pequeño que repite intentos largos puede consumir más que otro capaz de terminar en un intento.

Otra opción es enrutar trabajo acotado a un especialista y casos difíciles identificados a un modelo más potente. [RouteLLM](https://arxiv.org/abs/2406.18665) estudia ese equilibrio entre calidad y coste, pero la decisión de ruta también necesita evaluación. El tono seguro del modelo no constituye una política fiable de escalado.

Una elección defendible identifica tarea, calidad aceptada, tiempo de respuesta y capacidad de servicio, y explica dónde falla la alternativa menor y qué mejora la mayor. Así el número de parámetros pasa a formar parte de una decisión de despliegue concreta.
