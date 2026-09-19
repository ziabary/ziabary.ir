---
title: 'Modelos de lenguaje en RTX 4090: qué cambia entre 24 y 48 GB'
slug: llms-on-rtx-4090-24gb-vs-48gb-es
translationGroup: llms-on-rtx-4090-24gb-vs-48gb
lang: es
date: '2026-07-02'
faDate: '2026-07-02'
draft: true
math: true
category: Modelos de lenguaje
excerpt: Archivos concretos, un cálculo de caché KV, réplicas frente a división del modelo y las condiciones en las que una GPU profesional o de centro de datos aporta valor.
readTime: 13 min
cover: /images/articles/llms-on-rtx-4090-24gb-vs-48gb/cover.png
related:
- right-model-size-for-the-task-es
- pcie-gpu-server-selection-es
- rag-cag-kag-fine-tuning-instruction-tuning-es
updated: "2026-09-19"
author: Mehran Ziabary
---

La compra de una GPU para un asistente organizativo suele empezar por nombres como H100 o H200 antes de concretar el modelo, la longitud de entrada, el ritmo de peticiones o el tiempo de respuesta esperado. Para consultar documentos, extraer datos, conversar internamente y resolver algunas tareas de programación, un modelo cuantizado pequeño o mediano sobre una RTX 4090 puede ser un punto de partida práctico. El hardware superior aporta valor cuando resuelve una restricción identificada de memoria, capacidad de procesamiento u operación.

La comparación tiene tres partes: calidad para la tarea, memoria de la configuración concreta y capacidad para atender peticiones. Pasar de 24 a 48 GB modifica el presupuesto de memoria; no duplica automáticamente la velocidad de generación. La [guía de modelos de lenguaje](/es/guides/llm/) separa estas preguntas para no convertir una carga de modelo exitosa en una promesa de rendimiento.

## ¿Qué significa una RTX 4090 de 48 GB?

[NVIDIA especifica 24 GB de GDDR6X para la RTX 4090](https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/). La variante de 48 GB es una modificación de terceros, no la configuración estándar de NVIDIA. Un [análisis directo de una tarjeta modificada](https://main-horse.github.io/posts/4090-48gb/) describe una de esas implementaciones.

La memoria adicional puede eliminar un límite de capacidad sin cambiar la arquitectura ni añadir unidades de cómputo. Al comprar una tarjeta modificada importan la memoria utilizable que expone, la estabilidad bajo carga sostenida, la refrigeración de los chips y el soporte del proveedor. Dos modificaciones no tienen por qué comportarse igual. Resolver estos aspectos resulta más complicado después de instalar varias tarjetas en un chasis de servidor.

## ¿Qué modelos caben?

Los ejemplos identifican archivos concretos en lugar de aplicar una fórmula de parámetros a cualquier descarga. Los tamaños se expresan en **GiB: 2³⁰ bytes**. Corresponden a pesos almacenados, no a toda la memoria de ejecución. Las estimaciones Q4_K_M suponen una petición activa, unos 8.000 tokens contando la salida, caché KV de 16 bits, pesos y KV en la GPU y una reserva provisional de 2 GiB para el motor. Una reserva real mayor puede invalidar un caso con poco margen.

| Modelo | Archivo GGUF elegido y tamaño | 24 GB | 48 GB | Uso inicial |
| --- | --- | --- | --- | --- |
| [Qwen3-4B](https://huggingface.co/Qwen/Qwen3-4B) | [Q4_K_M](https://huggingface.co/Qwen/Qwen3-4B-GGUF/tree/bc640142c66e1fdd12af0bd68f40445458f3869b); 2,33 GiB | Cabe; margen amplio | Cabe; más margen para el servicio | Conversación acotada, extracción y RAG directo |
| [Llama-3.1-8B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) | [Q4_K_M](https://huggingface.co/bartowski/Meta-Llama-3.1-8B-Instruct-GGUF/tree/bf5b95e96dac0462e2a09145ec66cae9a3f12067); 4,58 GiB | Cabe | Cabe; más espacio para peticiones activas | Asistente general y RAG |
| [Aya Expanse 8B](https://huggingface.co/CohereLabs/aya-expanse-8b) | [Q4_K_M](https://huggingface.co/bartowski/aya-expanse-8b-GGUF/tree/f9d62ed0c58e6f2ae17975df990b1b8a4013b596); 4,71 GiB | Cabe | Cabe; el contexto sigue siendo de unos 8K | Tareas multilingües; revisar licencia |
| [Qwen3-14B](https://huggingface.co/Qwen/Qwen3-14B) | [Q4_K_M](https://huggingface.co/Qwen/Qwen3-14B-GGUF/tree/530227a7d994db8eca5ab5ced2fb692b614357fd); 8,38 GiB | Cabe | Cabe; más margen de contexto y concurrencia | Tareas generales y análisis moderado |
| [DeepSeek-R1-Distill-Qwen-14B](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B) | [Q4_K_M](https://huggingface.co/bartowski/DeepSeek-R1-Distill-Qwen-14B-GGUF/tree/9f5d77d401799416e0702290a691038b44012e0c); 8,37 GiB | Cabe; incluir los tokens de razonamiento | Cabe; más espacio para peticiones largas | Tareas de razonamiento |
| [gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b) | [MXFP4](https://huggingface.co/bartowski/openai_gpt-oss-20b-GGUF/tree/e39ba3aa000c47c83dacdc9e1ca2c9dd0808c205); 11,28 GiB | El publicador describe una ruta compatible de 16 GB | Más margen; depende del motor | Razonamiento y herramientas |
| [Qwen3-Coder-30B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct) | [Q4_K_M](https://huggingface.co/unsloth/Qwen3-Coder-30B-A3B-Instruct-GGUF/tree/b17cb02dd882d5b6ab62fc777ad2995f19668350); 17,28 GiB | Cabe; presupuestar contextos activos | Cabe; más espacio para código largo | Código y herramientas |
| [Qwen3-32B](https://huggingface.co/Qwen/Qwen3-32B) | [Q4_K_M](https://huggingface.co/Qwen/Qwen3-32B-GGUF/tree/938a7432affaec9157f883a87164e2646ae17555); 18,40 GiB | Cabe con poco margen de ejecución | Cabe con más margen de servicio | Tareas que superan al modelo menor |
| [Llama-3.1-70B-Instruct](https://huggingface.co/meta-llama/Llama-3.1-70B-Instruct) | [Q4_K_M](https://huggingface.co/bartowski/Meta-Llama-3.1-70B-Instruct-GGUF/tree/83fb6e83d0a8aada42d499259bc929d922e9a558); 39,60 GiB | No cabe íntegro en la GPU | Cabe en este escenario con poco margen | Tareas difíciles con baja concurrencia |

Son estimaciones de memoria, no velocidades medidas. Q4_K_M mezcla cuantizaciones; el tamaño del archivo no equivale sin más al número de parámetros multiplicado por medio byte. Las revisiones enlazadas permiten identificar los mismos archivos aunque el repositorio incorpore otras versiones.

La fila de gpt-oss es un caso de ejecución distinto. Su publicador describe funcionamiento en 16 GB con una ruta MXFP4 compatible, pero eso no valida cualquier conversión GGUF, motor o configuración de contexto. La organización de atención de este modelo también exige su propio cálculo de memoria. Almacenar pesos MXFP4 sobre una 4090 no equivale a disponer de cómputo FP4 nativo de generaciones posteriores. La [vista de compatibilidad entre modelos y motores](/es/guides/llm/?view=deployment-compatibility#serving-software) permite revisar la ruta concreta.

La identidad del modelo importa tanto como el archivo. La entrada DeepSeek es un checkpoint destilado de 14B, no el DeepSeek-R1 completo. Qwen3-Coder tiene unos 30,5 mil millones de parámetros totales y 3,3 mil millones activos por token; todos los pesos residentes siguen ocupando memoria. La licencia es otra condición: los pesos públicos de Aya Expanse tienen restricciones no comerciales, a diferencia de algunos otros modelos descargables de la tabla.

<!-- reference:context-not-fit:start -->

### Separe el contexto anunciado de la memoria necesaria

[Qwen3-4B-Instruct-2507](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) declara 262.144 tokens de contexto nativo, pero sus instrucciones sugieren reducirlo a 32.768 ante un error de memoria. El límite de la arquitectura no garantiza que pesos, caché KV y espacio de trabajo quepan en una GPU. Para comparar 24 y 48 GB hay que mantener formato de pesos, longitudes de entrada y salida, concurrencia y motor. Sin esos datos, una única cifra de «VRAM necesaria» no es transferible.

<!-- reference:context-not-fit:end -->

## La diferencia decisiva aparece después de cargar los pesos

En la VRAM compiten al menos tres consumos: pesos, caché KV y espacio de trabajo del motor. Los pesos de una réplica cargada permanecen aproximadamente constantes; el estado del contexto crece con las secuencias activas y los tokens retenidos. Duplicar la memoria total puede dejar más del doble de espacio para peticiones sin duplicar el cómputo.

Veamos un cálculo concreto. La [configuración fijada de Qwen3-Coder-30B-A3B-Instruct](https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct/blob/b2cff646eb4bb1d68355c01b18ae02e7cf42d120/config.json) indica 48 capas, 4 cabezas KV y dimensión 128 por cabeza. Con dos bytes por valor KV en FP16 o BF16, T tokens retenidos por petición y N peticiones activas de igual longitud:

$$
M_{KV}=2\times48\times4\times128\times2\times T\times N\quad\text{bytes}
$$

| Tokens de entrada y salida retenidos por petición | KV sin sobrecarga para una petición | KV para cuatro peticiones activas |
| --- | ---: | ---: |
| 8.192 | 0,75 GiB | 3 GiB |
| 32.768 | 3 GiB | 12 GiB |
| 65.536 | 6 GiB | 24 GiB |

El cálculo no incluye cuantización de KV ni prefijos compartidos. El espacio de trabajo se contabiliza aparte. Cuatro peticiones de 32.768 tokens, más el archivo de pesos de 17,28 GiB, requieren ya aproximadamente **29,28 GiB**, antes de añadir sobrecarga de ejecución. Mantenerlo todo en una GPU supera la capacidad de una tarjeta de 24 GB; con 48 GB existe margen para estudiar esa configuración. El tiempo de respuesta sigue siendo una condición independiente.

Cuantizar KV, reutilizar prefijos o limitar peticiones modifica el presupuesto; las [preguntas frecuentes de Ollama](https://docs.ollama.com/faq) documentan ejemplos de ajustes de concurrencia y caché. Más VRAM no amplía el contexto admitido por el modelo: los aproximadamente 8K de Aya Expanse 8B no se convierten en 32K al instalar una tarjeta mayor. Deben permitirlo el modelo, el archivo y la memoria disponible.

## Dos tarjetas de 24 GB no son una de 48 GB

Dos tarjetas ofrecen dos procesadores y dos espacios de memoria separados. Dividir un modelo exige que el motor reparta trabajo y transfiera datos entre ellas. RTX 4090 no tiene NVLink y una [respuesta técnica de NVIDIA](https://forums.developer.nvidia.com/t/standard-nvidia-cuda-tests-fail-with-dual-rtx-4090-linux-box/233202/16) indica además que P2P no está soportado. Tener ranuras PCIe no demuestra por sí solo una ruta directa de transferencia entre GPU.

La alternativa es replicar. Si un modelo de 8B cabe en cada tarjeta, se puede ejecutar una copia completa por GPU y distribuir peticiones independientes. Cada petición genera sus tokens en una sola tarjeta, sin intercambiar salidas de cada capa con la otra. La [documentación de paralelismo de datos de vLLM](https://docs.vllm.ai/en/stable/serving/data_parallel_deployment/) distingue ese despliegue de [dividir el modelo entre dispositivos](https://docs.vllm.ai/en/stable/serving/parallelism_scaling/).

Una tarjeta de 48 GB resulta interesante cuando un modelo o su presupuesto KV supera 24 GB. Dos de 24 GB pueden aportar más cómputo independiente para réplicas de un modelo menor. Ninguna organización garantiza duplicar el servicio: longitudes de petición, distribución de carga y otros componentes pueden limitar el aumento.

Dos GPU en un mismo equipo también comparten el fallo del equipo. Sobrevivir a su caída exige capacidad en otro lugar y mecanismos de encaminamiento y recuperación que funcionen sin ese host. La [guía de servidores GPU con PCIe](/es/articles/pcie-gpu-server-selection-es/) conecta topología, chasis y diseño del servicio.

## Elegir la tarjeta a partir del trabajo

Estos intervalos orientan el diseño inicial; no son resultados medidos de aceptación:

| Trabajo | Candidato inicial | Consecuencia para el hardware |
| --- | --- | --- |
| Clasificación, encaminamiento y campos claros | Especialista o generador de unos 1–4B | Para poca demanda puede bastar CPU o una GPU menor |
| Conversación interna y RAG documental directo | Unos 4–14B con recuperación y reranking adecuados | Conviene evaluar 24 GB; las réplicas pueden atender más demanda |
| Traducción, reescritura y resúmenes habituales | Modelo multilingüe adecuado de unos 8–14B | Importan el idioma objetivo y la longitud documental; aumenta KV con el contexto |
| Código y herramientas | Desde un especialista pequeño hasta un modelo de código MoE de 30B | Algunas configuraciones caben en 24 GB; peticiones largas favorecen más VRAM |
| Razonamiento difícil sobre varios documentos | Comparar modelos de razonamiento y modelos mayores | La calidad puede exigir cambiar de modelo antes de estudiar capacidad |

El [artículo sobre tamaño de modelo](/es/articles/right-model-size-for-the-task-es/) desarrolla esta selección. En RAG conviene intervenir donde se produce el fallo: un pasaje ausente apunta a recuperación; un pasaje presente mal interpretado apunta a las instrucciones o al generador. Aumentar este último no sustituye al control de acceso, a la extracción documental correcta ni a un índice actualizado. La [comparación de RAG y métodos de ajuste](/es/articles/rag-cag-kag-fine-tuning-instruction-tuning-es/) ayuda a separar las intervenciones.

## Un servicio añade colas, plazos y fallos

Una respuesta en terminal demuestra que una ruta de ejecución funciona. El servicio necesita gestionar espera en cola, tiempo hasta el primer token, velocidad de continuación y cancelaciones. Una organización con muchos usuarios registrados puede tener pocas peticiones activas; un solo proceso automático puede mantener ocupada la GPU. «Empresarial» no determina la cantidad de tarjetas.

Nuestro informe de despliegue de Targoman describe traducción, resumen y conversación compartiendo un modelo adaptado de Aya en una RTX 4090 de 24 GB. Durante la recarga de un servidor, el restante llegó a recibir unas 300 peticiones concurrentes en el sistema, con respuestas más lentas y cancelación de las que no habían empezado a responder después de 20 segundos. Es un ejemplo operativo de la diferencia entre demanda pendiente y servicio resuelto, no una afirmación de 300 generaciones simultáneas exitosas. El [informe original en persa](/articles/targoman-300-concurrent-requests-one-rtx-4090/) recoge esa experiencia local.

[llama.cpp](https://github.com/ggml-org/llama.cpp) ofrece rutas importantes para GGUF y ejecución combinada CPU/GPU; [Ollama](https://docs.ollama.com/faq) simplifica obtener y servir modelos; motores como vLLM permiten decisiones de planificación y escalado. En la [tabla de programas](/es/guides/llm/#serving-software) se pueden comparar checkpoint, cuantización, patrón de peticiones y motor. Una función de cierta versión no acredita todos los formatos descargables.

Transferir pesos a RAM o cargarlos por capas amplía los modelos ejecutables. [AirLLM](https://github.com/lyogavin/airllm/blob/v4.0.0/README.md) sigue una de esas estrategias, incorporando almacenamiento y transferencias al tiempo de ejecución. Puede servir para procesos sin interacción aunque no cumpla la latencia necesaria para conversar.

## Cuándo compensa otro nivel de hardware

Pesos grandes, contextos largos y trabajo concurrente sostenido pueden convertir memoria y ancho de banda adicionales en capacidad útil. [NVIDIA publica 141 GB de HBM3e y 4,8 TB/s para H200](https://www.nvidia.com/en-us/data-center/h200/), con NVLink en las configuraciones correspondientes. Estas capacidades también importan en inferencia, especialmente al dividir un modelo o mantener mucha caché KV.

Existen opciones intermedias. [RTX 6000 Ada](https://www.nvidia.com/en-us/products/workstations/rtx-6000/) ofrece 48 GB con ECC; [RTX PRO 6000 Blackwell Workstation](https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-6000/) ofrece 96 GB con ECC. Generación y variante importan: «6000» no es una especificación completa, y una tarjeta profesional de estación de trabajo no hereda automáticamente las conexiones de un acelerador de centro de datos.

Varias 4090 también necesitan ranuras, líneas PCIe, alimentación y refrigeración. Los 450 W nominales de la tarjeta de referencia son una especificación, no una medición de consumo de la aplicación ni del servidor completo. Hay que comparar toda la [plataforma del servidor GPU](/es/articles/gpu-server-platform-components-es/), incluyendo espacio y mantenimiento. Un menor coste por respuesta útil puede venir de mejor utilización y operación más sencilla, o de evitar capacidad cara que permanecerá ociosa.

## Entrenar plantea otro problema de memoria

Una 4090 puede servir para entrenar modelos pequeños y realizar adaptaciones eficientes en parámetros. LoRA entrena adaptadores; QLoRA mantiene cuantizados y congelados los pesos base mientras entrena parámetros añadidos. Longitud de secuencia, tamaño de lote y activaciones siguen contando. El [artículo de QLoRA](https://arxiv.org/abs/2305.14314) describe la adaptación de un modelo de 65B en una GPU de 48 GB bajo sus condiciones experimentales; no es entrenamiento de todos los pesos de un modelo de 65B en una 4090 estándar.

El entrenamiento completo añade gradientes, estado del optimizador y activaciones al almacenamiento de pesos. Entrenamiento frecuente, secuencias largas y comunicación abundante entre dispositivos pueden justificar otra plataforma. Para una adaptación ocasional de un modelo pequeño quizá encajen mejor la tarjeta disponible o un alquiler temporal. La [guía de cuantización de PEFT](https://huggingface.co/docs/peft/main/developer_guides/quantization) explica este tipo de proceso; conviene comparar plazo de finalización y frecuencia del trabajo, además de la carga inicial.

## Comparar respuestas útiles durante el mismo periodo

En un periodo definido se incluyen compra o alquiler del sistema, alojamiento, electricidad, refrigeración, mantenimiento e interrupciones. Ese importe se divide por salidas que cumplen calidad y tiempo requeridos. Cuando las respuestas tienen longitudes muy distintas, el coste por tarea terminada puede ser más útil que el coste por token.

Como **relación educativa**, supongamos que la solución completa basada en H200 cuesta cuatro veces la solución completa con 4090 durante el periodo comparado. Si las salidas aceptadas tienen el mismo valor, necesita producir más de cuatro veces su cantidad para reducir el coste por salida. No es una afirmación de precios de mercado. Puede ocurrir con demanda suficiente, o quizá H200 sea la única opción que cumple el trabajo; la capacidad potencial sin utilizar no genera ese beneficio económico.

Primero se elige un modelo que alcance la calidad exigida, se presupuesta el contexto y se estudia el servicio con la demanda prevista. Un límite de memoria orienta hacia más VRAM u otra distribución. Un límite de cómputo, comunicación u operación orienta hacia otra plataforma. La [tabla de viabilidad en hardware](/es/guides/llm/#hardware-feasibility) ayuda con el primer cálculo y lo mantiene separado de la velocidad medida.
