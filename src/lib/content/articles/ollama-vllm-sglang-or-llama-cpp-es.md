---
title: 'Ollama, vLLM, SGLang o llama.cpp: cómo elegir el motor de inferencia'
slug: ollama-vllm-sglang-or-llama-cpp-es
translationGroup: ollama-vllm-sglang-or-llama-cpp
lang: es
date: '2026-09-15'
faDate: '2026-09-15'
updated: "2026-09-19"
draft: false
math: false
category: Modelos de lenguaje
excerpt: 'Cómo cambian la elección la planificación, la caché KV, los formatos y el control operativo: comparación de cuatro motores con un cálculo de memoria y un método reproducible.'
readTime: 14 min
cover: /images/articles/ollama-vllm-sglang-or-llama-cpp/cover.webp
related:
- single-user-to-enterprise-llm-serving
- four-bit-model-quantization
- llms-on-rtx-4090-24gb-vs-48gb
- enterprise-rag-model-embedding-reranker
author: Mehran Ziabary
---

La primera respuesta de un modelo rara vez revela la dificultad de convertirlo en un servicio. El problema aparece cuando alguien envía un documento largo, otra persona espera completar código de inmediato y varias conversaciones generan texto a la vez. El motor de inferencia decide cómo se reparten la memoria y el tiempo de ejecución. Que un modelo quepa en la GPU no garantiza una experiencia satisfactoria.

Para una API compartida con objetivos explícitos de latencia, vLLM y SGLang son candidatos iniciales útiles: la planificación, la gestión de memoria y las métricas de servicio ocupan un lugar central en su diseño. Para desarrollo local y hardware heterogéneo, Ollama y llama.cpp ofrecen otras ventajas prácticas. Esta es una selección de arquitecturas, no una clasificación de velocidad medida. El análisis se basa en la documentación revisada en septiembre de 2026 e identifica las versiones y las rutas de ejecución que sustentan la comparación.

## Separar modelo, motor, API e interfaz

Los pesos, el motor de inferencia, el servidor HTTP y la interfaz de conversación son capas distintas. Podemos conservar una interfaz cómoda y cambiar el motor que la atiende. También podemos incorporar una pasarela de API sin alterar la memoria que necesita el modelo.

| Herramienta | Punto de partida útil | Qué simplifica | Qué queda fuera de ella |
|---|---|---|---|
| Ollama | Desarrollo local y herramientas internas acotadas | Descargar, gestionar y ejecutar modelos mediante una API | Admisión de carga, presupuesto de recursos y operación |
| vLLM | API compartida con demanda concurrente | Planificación, memoria KV y controles de ejecución | Topología del despliegue, criterios de calidad y ajuste de carga |
| SGLang | Servicio con prefijos repetidos y planificación exigente | Reutilización de prefijos, backends y ejecución distribuida | Política de caché, enrutamiento y complejidad operativa |
| llama.cpp | GGUF en CPU, Apple Silicon o sistemas mixtos | Compatibilidad con hardware diverso y pocas dependencias | Configuración del backend, capacidad de slots y operación externa |

Las capacidades proceden de la documentación de [Ollama](https://github.com/ollama/ollama), [vLLM](https://github.com/vllm-project/vllm), [SGLang](https://docs.sglang.io/) y [llama.cpp](https://github.com/ggml-org/llama.cpp). Los usos sugeridos son recomendaciones editoriales. Ni vLLM ni SGLang exigen varias GPU, y llama.cpp no se limita a una demostración por línea de comandos.

## Conexiones, solicitudes en cola y secuencias activas

Un servidor puede mantener cien conexiones HTTP abiertas y ejecutar solo unas pocas solicitudes. Unas esperan en la cola; otras tienen secuencias activas cuya caché KV ocupa memoria. Las solicitudes concurrentes pueden compartir los mismos pesos cargados. No necesitan necesariamente cien copias del modelo.

Las respuestas autorregresivas tampoco terminan a la vez. La planificación por iteración, descrita en [Orca](https://www.usenix.org/conference/osdi22/presentation/yu), permite retirar solicitudes terminadas e incorporar nuevas al lote de trabajo. El beneficio depende de la política del planificador y de la distribución de longitudes de entrada y salida.

| Mecanismo | Recurso o etapa que aborda | Límite del beneficio |
|---|---|---|
| Continuous batching | Uso de capacidad al entrar y terminar solicitudes | Más rendimiento agregado puede acompañarse de respuestas individuales más lentas |
| PagedAttention | Asignación por bloques de caché KV | Reduce desperdicio de asignación; no crea memoria ilimitada |
| Caché de prefijos | Cálculo repetido sobre entradas compartidas | La generación de salida sigue siendo necesaria |
| Chunked prefill | Procesamiento de entradas largas junto con generación activa | El tamaño de fragmento modifica el equilibrio de latencia |
| FlashAttention | Movimiento de datos dentro de attention | No sustituye la cola ni la gestión de réplicas |

Los trabajos de [PagedAttention](https://arxiv.org/abs/2309.06180) y [FlashAttention](https://arxiv.org/abs/2205.14135) actúan en capas distintas. Que dos productos incluyan ambas funciones no demuestra que alcancen el mismo rendimiento publicado.

## Ollama: la facilidad de operación tiene valor

Ollama resulta útil cuando cambiar de modelo y conectar una aplicación local debe requerir poco esfuerzo. Sus [rutas de importación](https://docs.ollama.com/import) incluyen GGUF y modelos compatibles en Safetensors. La extensión del archivo, por sí sola, no confirma compatibilidad con la arquitectura, el tokenizer o un componente multimodal.

Las [preguntas frecuentes de Ollama](https://docs.ollama.com/faq) describen solicitudes paralelas, varios modelos cargados y reparto de un modelo entre GPU. Cuando el modelo cabe en una sola tarjeta, prefiere esa ruta. Presentarlo como un producto incapaz de atender concurrencia o de usar varias GPU oculta la decisión real: cuánto control y cuánta observabilidad necesita el servicio.

Los valores predeterminados importan. En el [código de configuración de v0.34.1](https://github.com/ollama/ollama/blob/v0.34.1/envconfig/config.go), `OLLAMA_NUM_PARALLEL` vale 1 por defecto. `OLLAMA_MAX_LOADED_MODELS` limita los modelos cargados y `OLLAMA_MAX_QUEUE` las solicitudes en espera. Aumentar el segundo parámetro no significa crear ese número de réplicas independientes del mismo modelo.

Cambiar de modelo puede provocar cargas repetidas si falta memoria. `keep_alive` ayuda a controlar la permanencia y `ollama ps` permite observar la ubicación en CPU o GPU. Mantener varios modelos listos consume memoria incluso con pocas consultas. La migración merece atención cuando mantener colas, métricas y enrutamiento alrededor del producto cuesta más que adoptar un motor orientado a esos requisitos.

## vLLM: convertir la capacidad en una propiedad configurable

La gestión de KV por bloques de vLLM aborda la diferencia entre cargar pesos y sostener conversaciones que crecen. Sus controles distinguen longitud máxima de secuencia, secuencias activas y presupuesto de tokens del planificador. Son tres restricciones diferentes.

La [guía de optimización de V1](https://docs.vllm.ai/en/stable/configuration/optimization/) explica la interacción de chunked prefill con decode. Aumentar el presupuesto de tokens puede favorecer una parte de la carga y retrasar otra. La presión de memoria puede interrumpir temporalmente solicitudes y obligar a repetir cálculos; un límite de concurrencia elevado no equivale a capacidad productiva.

Un modelo pequeño en una sola GPU también puede beneficiarse de esta planificación. En cambio, una consulta local ocasional quizá gane poco con un despliegue más complejo. La comparación incluye dependencias, actualizaciones y mantenimiento, además de respuestas entregadas.

En el [informe operativo de Targoman, en persa](/articles/targoman-300-concurrent-requests-one-rtx-4090/), el servicio utilizó una distribución de vLLM de NVIDIA y cambios limitados alrededor de la API. Las solicitudes que no habían empezado a responder a los veinte segundos se cancelaban también en el motor. El ejemplo muestra la importancia de controlar el ciclo de vida de la solicitud; no demuestra que vLLM sea más rápido que los otros motores.

## SGLang: reutilización y enrutamiento forman parte del diseño

El trabajo original de [SGLang](https://arxiv.org/abs/2312.07104) presentó RadixAttention para organizar prefijos compartidos. Instrucciones repetidas, conversaciones de varios turnos y agentes con historiales parcialmente comunes pueden aprovechar esa reutilización. No basta con que el texto se parezca: debe coincidir el prefijo en el nivel de tokens y ejecución que requiere la implementación.

[HiCache](https://docs.sglang.io/docs/advanced_features/hicache_design) amplía la gestión de caché entre GPU, memoria del sistema y almacenamiento. [Model Gateway](https://docs.sglang.io/docs/advanced_features/sgl_model_gateway) incorpora enrutamiento sensible al estado de los workers y a la ubicación de la caché. Son componentes con transferencias y tareas operativas propias, no requisitos para todo servidor pequeño.

vLLM también ofrece [caché automática de prefijos](https://docs.vllm.ai/en/stable/features/automatic_prefix_caching/). Por tanto, hay que comparar el modelo, el backend y la carga compatibles, no la presencia de una etiqueta. Enviar todas las solicitudes parecidas al mismo worker puede conservar aciertos de caché a costa de una cola excesiva.

## llama.cpp: pocas dependencias no significa ausencia de servidor

llama.cpp admite ejecución en CPU y backends como Metal, CUDA y Vulkan. Una distribución entre CPU y GPU puede permitir usar un modelo que no cabe en la memoria de la tarjeta. Cambia el movimiento de datos y la latencia: la RAM no adquiere por ello el ancho de banda de la VRAM.

El [`llama-server` documentado en v0.4.1](https://github.com/ggml-org/llama.cpp/blob/v0.4.1/tools/server/README.md) incluye slots paralelos, continuous batching, caché de prompts, métricas y un modo router para varios modelos. Un servicio GGUF puede ser una elección deliberada. La operación entre hosts y la capacidad tras una avería siguen requiriendo infraestructura adicional.

Para una herramienta local de uso ocasional, aceptar más latencia a cambio de menores requisitos de GPU puede ser razonable. En un servicio interactivo compartido, el mismo intercambio puede crear una cola. El artículo sobre [AirLLM e inferencia por capas (en persa)](/articles/airllm-layer-wise-inference/) desarrolla el coste de esas transferencias.

<!-- reference:mac-path:start -->

### Apple silicon: la ruta MLX LM

En un Mac con Apple silicon, [MLX LM](https://github.com/ml-explore/mlx-lm) permite generación local, caché de prompts, cuantización y ajuste fino. La elección depende del modelo, el formato de pesos y la memoria disponible. El bloqueo de memoria para modelos grandes requiere macOS 15 o posterior.

<!-- reference:mac-path:end -->

## Formato de archivo, precisión y compatibilidad son decisiones distintas

[GGUF](https://github.com/ggml-org/ggml/blob/master/docs/gguf.md) contiene tensores y metadatos; no significa necesariamente cuatro bits. [Safetensors](https://huggingface.co/docs/safetensors/index) también es un formato de almacenamiento. AWQ, GPTQ y FP8 describen otros aspectos de representación y ejecución. El artículo de [cuantización (en persa)](/articles/four-bit-model-quantization/) separa esas decisiones.

llama.cpp y Ollama ofrecen rutas consolidadas para GGUF. La [documentación revisada de vLLM](https://docs.vllm.ai/en/stable/features/quantization/gguf/) describe una ruta experimental que requiere `vllm-gguf-plugin`. Ni «vLLM no ejecuta GGUF» ni «esa ruta ofrece todas las funciones de las demás» son conclusiones correctas. La [compatibilidad de cuantización en SGLang](https://docs.sglang.io/docs/advanced_features/quantization) también debe corresponder al checkpoint y al backend de hardware.

Comparar Q4 en un motor con BF16 en otro cambia más que el motor. Para aislar su efecto, mantengamos esas decisiones constantes cuando las rutas lo permitan. Para elegir una solución completa, podemos usar una configuración aceptable distinta por herramienta, pero el resultado corresponderá a esas configuraciones.

## Un cálculo de memoria que cambia la decisión

Tomemos un **modelo educativo de attention completa**, no un resultado medido: 32 capas, 8 cabezas KV por capa, dimensión de cabeza 128 y elementos KV de dos bytes. El almacenamiento KV bruto por token es:

`2 × 32 × 8 × 128 × 2 = 131 072 bytes = 128 KiB`

El primer factor representa claves y valores. Con grouped-query attention se utiliza el número de cabezas KV, no el de cabezas query. Una secuencia con 8192 tokens retenidos necesita exactamente 1 GiB de KV bruto.

| Secuencias activas | Tokens retenidos por secuencia | KV bruto del ejemplo |
|---:|---:|---:|
| 1 | 8192 | 1 GiB |
| 8 | 8192 | 8 GiB |
| 16 | 8192 | 16 GiB |
| 8 | 32 768 | 32 GiB |

Los tokens incluyen entrada y salida acumuladas. El cálculo excluye prefijos compartidos, cuantización de caché, sobrecarga de asignación, pesos y espacios de trabajo. Supone que cada secuencia ha alcanzado la longitud indicada; un motor con asignación dinámica no tiene por qué reservar el máximo de cada solicitud desde su llegada. MLA, attention híbrida y capas con ventana deslizante necesitan otro tratamiento.

La última fila supera 24 GiB antes de cargar los pesos. Ejecutar un modelo para una persona dice poco sobre ocho conversaciones largas. [Elegir el tamaño del modelo (en persa)](/articles/right-model-size-for-the-task/) y [comparar 24 y 48 GB en una RTX 4090 (en persa)](/articles/llms-on-rtx-4090-24gb-vs-48gb/) conectan este presupuesto con decisiones concretas.

## Los nombres de configuración no son unidades intercambiables

| Objetivo | Ollama | vLLM | SGLang | llama-server |
|---|---|---|---|---|
| Límite de contexto | `num_ctx`, `OLLAMA_CONTEXT_LENGTH` | `--max-model-len` | `--context-length` | `--ctx-size`, según modo KV y slots |
| Ejecución paralela | `OLLAMA_NUM_PARALLEL` | `--max-num-seqs` | `--max-running-requests` | `--parallel` |
| Asignación de memoria | Modelo, contexto y paralelismo | `--gpu-memory-utilization` o presupuesto KV explícito | `--mem-fraction-static` | KV, capas en GPU y división del modelo |
| Trabajo de entrada | Admisión en la capa de servicio | `--max-num-batched-tokens` | `--chunked-prefill-size` | Controles de batch y micro-batch |
| Observación | `ollama ps`, tiempos de la API | `/metrics` | `--enable-metrics` | `--metrics` y estado de slots |

La [referencia de vLLM](https://docs.vllm.ai/en/stable/cli/serve/) y la [guía de ajuste de SGLang](https://docs.sglang.io/docs/advanced_features/hyperparameter_tuning) definen fracciones de memoria distintas. Ninguna limita el porcentaje de uso de las unidades de cálculo de la GPU. Una reserva de memoria alta puede coexistir con un modelo inactivo. En llama-server conviene leer la capacidad indicada por slot, sin atribuir el `ctx-size` completo a cada uno.

## Varias GPU: réplicas o un modelo distribuido

Si el modelo y su memoria de trabajo caben en cada tarjeta, las réplicas independientes pueden procesar solicitudes independientes. El paralelismo tensorial o por etapas divide una instancia entre tarjetas. La topología de comunicación y las restricciones de arquitectura determinan qué divisiones funcionan; un grado tensorial de tres no es válido para todos los modelos.

Tres réplicas en un host tampoco sobreviven a la pérdida de ese host. El artículo de [servicio empresarial (en persa)](/articles/single-user-to-enterprise-llm-serving/) separa réplicas, dominios de fallo y capacidad de reserva. Para tarjetas sin NVLink, la [guía de paralelismo de vLLM](https://docs.vllm.ai/en/stable/serving/parallelism_scaling/) incluye el paralelismo por etapas entre las rutas a considerar. Más tarjetas no establecen por sí solas un multiplicador de rendimiento.

## Compatibilidad de API y control operativo

Un endpoint compatible reduce cambios en el cliente, pero plantillas de conversación, muestreo, condiciones de parada y streaming pueden diferir. Las llamadas a herramientas requieren acuerdo entre modelo, plantilla, parser y cliente; un JSON válido no garantiza una acción correcta. La [documentación de tool calling de vLLM](https://docs.vllm.ai/en/stable/features/tool_calling/) explicita esas dependencias.

Embedding y reranking requieren una comprobación aparte. Pooling, normalización y dimensión de salida deben corresponder al índice ya construido. Los tokens por segundo del generador no miden la calidad de recuperación. El artículo de [la pila RAG (en persa)](/articles/enterprise-rag-model-embedding-reranker/) explica cuándo separar esos servicios evita que la ingestión documental interrumpa las conversaciones.

En operación, recojamos tiempo en cola, tiempo hasta el primer token, intervalo entre tokens, duración total, errores y trabajo aceptado. Las métricas de [vLLM](https://docs.vllm.ai/en/stable/usage/metrics/) y [SGLang](https://docs.sglang.io/docs/references/production_metrics) observan el motor; la red, la recuperación y las herramientas requieren medidas de la aplicación.

| Síntoma | Primera distinción útil |
|---|---|
| Primera respuesta lenta tras inactividad | Carga y calentamiento frente a generación |
| Más espera inicial bajo carga | Cola, prefill o recuperación previa |
| Muchos tokens por segundo y usuarios insatisfechos | Rendimiento agregado frente a latencia individual |
| Falta de memoria con documentos largos | Crecimiento de KV frente a espacio de prefill |
| Interrupciones y recomputación frecuentes | Presión de memoria y concurrencia |
| Menos reutilización al añadir réplicas | Ubicación de caché frente a reparto equilibrado |

Exponer un puerto de inferencia no crea una frontera de acceso completa. La [política de autenticación local de Ollama](https://docs.ollama.com/api/authentication) y la [guía de seguridad de vLLM](https://docs.vllm.ai/en/stable/usage/security/) requieren decisiones explícitas sobre red, proxy y endpoints. Si los datos deben permanecer en la organización, un producto con funciones de nube necesita una ruta local verificada. Los registros, la propagación de cancelaciones y los límites de consumo forman parte del despliegue.

## Una comparación que se pueda reconstruir

Utilicemos categorías de trabajo equivalentes: entradas y salidas cortas y largas, idiomas requeridos y llamadas a herramientas. Separemos arranque en frío, ejecución caliente y caché de prefijos caliente. Controlemos la tasa de llegada además del número de clientes; un cliente que reduce su ritmo cuando el servidor se ralentiza puede ocultar la cola que produciría una demanda externa.

Registremos revisiones de pesos y tokenizer, versión del motor, cuantización, plantilla, backend y dependencias. Los mensajes de inicio permiten detectar kernels alternativos. Presentemos distribuciones de latencia y errores junto con rendimiento aceptado. Los proyectos ofrecen herramientas de carga para [vLLM](https://docs.vllm.ai/en/stable/cli/bench/serve/) y [SGLang](https://docs.sglang.io/docs/developer_guide/bench_serving); ningún ejemplo numérico de este artículo es una medición realizada por este sitio.

Ollama facilita la gestión cotidiana de modelos; llama.cpp ofrece rutas locales GGUF; vLLM y SGLang merecen prioridad cuando el control de un servicio compartido domina la decisión. Conservemos la interfaz que necesitan los usuarios y cambiemos la capa realmente limitada. Una migración útil mejora capacidad aceptada o coste operativo con el mismo objetivo de calidad y respuesta.
