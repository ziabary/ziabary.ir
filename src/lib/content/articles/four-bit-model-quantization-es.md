---
title: Qué ahorra la cuantización a cuatro bits y qué cambia
slug: four-bit-model-quantization-es
translationGroup: four-bit-model-quantization
lang: es
date: '2026-07-13'
faDate: '2026-07-13'
draft: true
math: false
category: Modelos de lenguaje
excerpt: Tamaños reales de Qwen3-8B, cálculo de memoria KV y diferencias entre métodos de cuantización, precisión, calidad y velocidad de servicio.
readTime: 12 min
cover: /images/articles/four-bit-model-quantization/cover.webp
related:
- llms-on-rtx-4090-24gb-vs-48gb-es
- right-model-size-for-the-task-es
- rag-cag-kag-fine-tuning-instruction-tuning-es
updated: "2026-09-19"
author: Mehran Ziabary
---

El mismo nombre de modelo puede aparecer en una descarga de más de quince GiB y en otra de menos de cinco. «Cuatro bits» explica el cambio de representación de los pesos, pero deja abiertas las preguntas de despliegue: ¿qué ocurre con el coste de la GPU, la calidad, la velocidad y la cantidad de peticiones que admite el servicio?

Cuantizar los pesos puede hacer viable la ejecución local y dejar memoria para más peticiones activas. Sin embargo, cambia la representación numérica y su beneficio depende del método de conversión y de la ruta de ejecución. Conviene separar número de parámetros, precisión de los pesos y memoria total del servicio. La [guía de modelos de lenguaje](/es/guides/llm/) conecta archivos concretos con programas compatibles y supuestos de memoria.

## Qué cambia al pasar los pesos a cuatro bits

Los pesos son valores numéricos aprendidos. Los checkpoints habituales pueden almacenarlos en BF16 o FP16, con dieciséis bits por valor. La cuantización transforma un conjunto amplio de valores posibles en una representación menor. Cuatro bits permiten dieciséis códigos; escalas y, en ocasiones, otros metadatos determinan qué representa cada código dentro de un grupo de pesos. La [guía de cuantización de Transformers](https://huggingface.co/docs/transformers/main/quantization/concept_guide) explica esa distinción entre código y valor reconstruido.

Se parece a medir piezas con un instrumento menos preciso: dos medidas próximas pueden volverse indistinguibles. La diferencia importa cuando cambia el producto terminado. Los métodos de cuantización intentan distribuir el error de aproximación para reducir su efecto sobre el comportamiento útil del modelo; no todos consisten en redondear uniformemente cada peso.

La cuantización habitual conserva las capas y el número de parámetros. Un modelo de 8B sigue teniendo ocho mil millones de parámetros. La poda y la destilación son otras intervenciones. Expandir un peso cuantizado a un contenedor de dieciséis bits tampoco recupera la información perdida; para comparar con el original hace falta el checkpoint original.

## Almacenamiento de cuatro bits no describe todo el cálculo

Pesos, activaciones intermedias y caché KV tienen precisiones distintas. W4A16 describe pesos de cuatro bits y activaciones de dieciséis para las operaciones afectadas; la acumulación depende del kernel. Un archivo llamado Q4 puede seguir usando KV en FP16. La [configuración de bitsandbytes](https://huggingface.co/docs/transformers/main/quantization/bitsandbytes#compute-data-type) distingue explícitamente almacenamiento y tipo de cálculo.

| Etiqueta | Qué identifica | Qué falta comprobar |
| --- | --- | --- |
| GGUF | Contenedor de pesos y metadatos | Precisión de los tensores y motor compatible |
| Q4_K_M | Configuración de cuantización mixta del entorno GGUF/llama.cpp | Tamaño real y tipos de tensor combinados |
| GPTQ | Cuantización posterior al entrenamiento con calibración y aproximación de sensibilidad | Organización del checkpoint, calibración y kernel |
| AWQ | Cuantización de pesos informada por las activaciones | Formato soportado; las activaciones no son necesariamente de cuatro bits |
| NF4 | Representación de cuatro bits con niveles adaptados a una distribución normal | Flujo de ejecución o adaptación; no equivale a INT4 |
| MXFP4 / NVFP4 | Representaciones FP4 distintas con escalado por bloques | Bloques, escalas y soporte de motor y hardware |
| W4A16 | Descripción de precisión de pesos y activaciones | Formato, precisión KV y operaciones incluidas |

La [especificación GGUF](https://github.com/ggml-org/ggml/blob/master/docs/gguf.md) y la [guía de cuantización de llama.cpp](https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md) describen contenedor y configuraciones. [GPTQ](https://arxiv.org/abs/2210.17323) y [AWQ](https://arxiv.org/abs/2306.00978) explican métodos diferentes para reducir errores. [QLoRA](https://arxiv.org/abs/2305.14314) introduce NF4 en su proceso de adaptación, mientras que la [explicación de NVIDIA sobre FP4](https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/) distingue NVFP4 de MXFP4. No son nombres intercambiables de un único tipo de archivo.

## El primer ahorro está en los pesos almacenados

Una conversión pura de dieciséis a cuatro bits reduciría los pesos a una cuarta parte. Los archivos reales contienen escalas, metadatos y tensores con otras precisiones; además, el tamaño incluido en el nombre del modelo está redondeado. Para planificar almacenamiento y descargas, es más preciso usar los archivos publicados.

En **Qwen3-8B**, la fila BF16 suma los archivos de pesos de la [revisión fijada del repositorio original](https://huggingface.co/Qwen/Qwen3-8B/tree/b968826d9c46dd6066d109eabc6255188de91218). Las demás filas proceden del [repositorio oficial GGUF, también fijado](https://huggingface.co/Qwen/Qwen3-8B-GGUF/tree/7c41481f57cb95916b40956ab2f0b139b296d974). Un GiB son 2³⁰ bytes; las reducciones se refieren a archivos BF16, no a VRAM medida.

| Archivo de pesos | Tamaño | Reducción frente a BF16 |
| --- | ---: | ---: |
| BF16 / Safetensors | 15,26 GiB | Referencia |
| Q8_0 / GGUF | 8,11 GiB | 46,8 % |
| Q6_K / GGUF | 6,26 GiB | 58,9 % |
| Q5_K_M / GGUF | 5,45 GiB | 64,3 % |
| Q4_K_M / GGUF | 4,68 GiB | 69,3 % |

El paquete BF16 ocupa aquí aproximadamente **3,26 veces** lo que ocupa Q4_K_M. Disminuyen el volumen descargado y el almacenamiento de los pesos comprimidos. El tiempo de carga también depende de conversiones y preparación del motor. Un cambio especialmente útil aparece cuando el modelo entero pasa a caber en una GPU y desaparece la necesidad de transferir pesos desde RAM repetidamente o de repartirlos entre tarjetas.

## La memoria total baja en otra proporción

Los pesos son una sola asignación. Caché KV, espacio de trabajo, búferes y gestión de peticiones siguen consumiendo memoria. Cuantizar pesos no cuantiza automáticamente el estado del contexto.

La [configuración de Qwen3-8B](https://huggingface.co/Qwen/Qwen3-8B/blob/b968826d9c46dd6066d109eabc6255188de91218/config.json) tiene 36 capas, 8 cabezas KV y dimensión 128 por cabeza. Con valores KV de dos bytes y 32.768 tokens retenidos, la caché sin sobrecarga de una petición es:

`2 × 36 × 8 × 128 × 2 × 32.768 bytes = 4,5 GiB`

En este **ejemplo de planificación**, aproximamos los pesos residentes mediante el tamaño del archivo y reservamos hipotéticamente 2 GiB para el motor. Cada petición activa conserva los 32.768 tokens; no hay prefijos compartidos ni cuantización KV.

| Configuración | Pesos | KV sin sobrecarga | Total con 2 GiB de espacio de trabajo supuesto |
| --- | ---: | ---: | ---: |
| BF16, una petición | 15,26 GiB | 4,5 GiB | 21,76 GiB |
| Q4_K_M, una petición | 4,68 GiB | 4,5 GiB | 11,18 GiB |
| Q4_K_M, cuatro peticiones | 4,68 GiB | 18 GiB | 24,68 GiB |

El total de una petición disminuye aproximadamente un **49 %**, frente al 69 % de reducción de los archivos. Cuatro peticiones largas superan el presupuesto de una tarjeta nominal de 24 GB incluso con pesos Q4. Ajustar contexto, peticiones activas, réplicas o precisión KV actúa sobre partes distintas del problema. La [documentación de KV cuantizada de vLLM](https://docs.vllm.ai/en/stable/features/quantization/quantized_kvcache/) explica esa optimización separada; el [artículo sobre 24 y 48 GB](/es/articles/llms-on-rtx-4090-24gb-vs-48gb-es/) desarrolla las consecuencias para el hardware.

Son cálculos de memoria. No miden usuarios simultáneos ni acreditan latencia aceptable, y el espacio de trabajo real del motor puede diferir de la reserva supuesta.

## ¿Cuatro bits significa más velocidad?

Los pesos menores pueden reducir el tráfico de memoria, algo valioso cuando la generación está limitada por ancho de banda. Un kernel adecuado debe consumir esa representación eficientemente. Desempaquetar, reescalar o reorganizar pesos puede comerse parte de la ventaja; algunas rutas integran la reconstrucción en el propio cálculo. [Marlin](https://github.com/IST-DASLab/marlin) es un ejemplo de diseño de kernels para aprovechar pesos de cuatro bits. Sus resultados corresponden al kernel y trabajo estudiados, no automáticamente a toda una aplicación.

Leer la entrada, o *prefill*, difiere de generar tokens sucesivos, o *decode*. Entradas largas y lotes mayores cambian la reutilización de pesos y la cantidad de cálculo. Contextos largos también incrementan tráfico KV. Una mejora en la generación para un usuario no implica la misma mejora en tiempo hasta el primer token ni en capacidad total del servicio.

Registremos longitudes de entrada y salida, peticiones activas y configuración del motor. Comparemos por separado latencia inicial, velocidad de continuación y peticiones completadas correctamente. W4A16 puede leer pesos comprimidos y calcular con mayor precisión; usar instrucciones nativas de baja precisión es otra ruta. La [matriz de hardware de vLLM](https://docs.vllm.ai/en/stable/features/quantization/#supported-hardware) muestra por qué hay que concretar modelo, formato numérico, kernel y versión del motor.

## La calidad cambia según la tarea

No existe un porcentaje universal de pérdida por usar cuatro bits. Influyen arquitectura, tamaño, método, tensores afectados y tarea. [Evaluating Quantized Large Language Models](https://arxiv.org/html/2402.18158v2) estudia pesos, activaciones y KV en varias familias y encuentra sensibilidades diferentes. No fija una pérdida para cada modelo o conversión posterior.

Dos variantes pueden sonar igual de fluidas y diferir al conservar un identificador, interpretar una excepción contractual o construir un argumento de herramienta. Conviene puntuar la tarea: valores de campos en extracción, respaldo documental en RAG, pruebas ejecutadas en código y elección correcta de herramienta y argumentos en agentes. Un JSON válido acredita sintaxis, no valores correctos. Tampoco una redacción distinta es por sí sola una pérdida de calidad, especialmente con generación aleatoria.

La evaluación debe usar el idioma del servicio. Resultados ingleses o una media multilingüe no explican cómo ese checkpoint cuantizado maneja nombres, formatos numéricos o vocabulario especializado de una comunidad hispanohablante. Mantener casos difíciles junto a los habituales permite detectar errores poco frecuentes pero costosos.

## ¿Modelo mayor en cuatro bits o menor con más precisión?

La cuantización permite introducir un modelo mayor en el mismo presupuesto de memoria. Tiene valor cuando el menor carece de una capacidad necesaria y el mayor cuantizado la conserva. Pero más parámetros pueden seguir exigiendo más trabajo por token: comprimirlos no elimina esa diferencia de cálculo.

Comparemos dos configuraciones ejecutables con la misma tarea y hardware, en vez de comparar solo archivos. Si un especialista o un modelo pequeño alcanza la calidad requerida, la memoria libre puede servir para más peticiones u otros componentes. Si hace falta razonamiento más potente, conviene estudiar un modelo mayor cuantizado. La [guía de tamaño de modelo](/es/articles/right-model-size-for-the-task-es/) explica cómo preparar esa comparación sin suponer una clasificación universal por tamaño.

<!-- reference:quant-not-conversion:start -->

### Cuantización entrenada y conversión de archivos

[ParetoQ](https://github.com/facebookresearch/ParetoQ) publica 53,3 en HellaSwag para MobileLLM-350M BF16 y 53,5 para su variante de 4 bits; la perplejidad Wiki baja de 10,5 a 10,3. Son variantes entrenadas y ajustadas con ParetoQ. El resultado no demuestra que convertir cualquier modelo a GGUF de 4 bits mejore su calidad. Además de arquitectura y bits, hay que identificar el entrenamiento y el método de cuantización. El estudio tampoco garantiza memoria o velocidad en un motor de escritorio.

| Variante entrenada de ParetoQ | HellaSwag (mayor es mejor) | Perplejidad Wiki (menor es mejor) |
|---|---:|---:|
| MobileLLM-ParetoQ-350M-BF16 | 53.3 | 10.5 |
| MobileLLM-ParetoQ-350M-2-bit | 47.3 | 12.5 |
| MobileLLM-ParetoQ-350M-4-bit | 53.5 | 10.3 |
| MobileLLM-ParetoQ-600M-BF16 | 59.5 | 9.1 |
| MobileLLM-ParetoQ-600M-2-bit | 53.9 | 10.5 |
| MobileLLM-ParetoQ-600M-4-bit | 59.5 | 8.9 |


<!-- reference:quant-not-conversion:end -->

## PTQ, QAT y QLoRA resuelven problemas distintos

La **cuantización posterior al entrenamiento, PTQ**, convierte un modelo ya entrenado. Puede utilizar una colección pequeña de calibración para elegir una aproximación numérica mejor; GPTQ y AWQ son ejemplos. Calibrar no equivale a enseñar al modelo el conocimiento de una organización. Si existe un archivo publicado adecuado, quien lo despliega no necesita repetir la conversión.

El **entrenamiento consciente de cuantización, QAT**, introduce el efecto de la precisión reducida durante entrenamiento o ajuste para que los parámetros se adapten. La [explicación de QAT de PyTorch](https://pytorch.org/blog/quantization-aware-training/) presenta implementación y evaluación. Simular el error de cuantización no significa que todas las operaciones y estados del optimizador sean de cuatro bits.

**QLoRA** conserva congelados los pesos base cuantizados y entrena un conjunto limitado de adaptadores. Busca abaratar la adaptación, no entrenar todos los parámetros con aritmética de cuatro bits. Antes hay que decidir si el error restante necesita entrenamiento o si se resuelve con recuperación y mejores entradas; la [comparación de RAG y ajuste](/es/articles/rag-cag-kag-fine-tuning-instruction-tuning-es/) distingue esos casos.

## Elegir la variante que quite la restricción real

Es útil empezar por un archivo fiable con checkpoint base, cuantización, publicador, licencia y ruta de ejecución identificables. Tokenizador y plantilla de conversación deben corresponder al modelo. Para convertir de nuevo conviene partir de un original adecuado: encadenar conversiones con pérdida puede arrastrar errores anteriores.

| Situación | Primera comparación útil | Motivo |
| --- | --- | --- |
| Los pesos no caben o consumen casi toda la VRAM | Archivo de cuatro bits disponible y soportado | La residencia completa y el margen para peticiones pueden cambiar el despliegue |
| Q4 no alcanza calidad y queda algo de memoria | Q5/Q6, ocho bits u otro método de cuatro bits | Una precisión intermedia o un método distinto puede conservar el comportamiento necesario |
| Mayor precisión cabe holgadamente y hay poca demanda | Mantener referencia u ocho bits hasta concretar la ventaja de Q4 | Reducir el archivo quizá no mejore el servicio |
| Los pesos caben pero los contextos agotan memoria | Precisión KV, reutilización de prefijos y límites de actividad | El cuello de botella está en las peticiones |
| Demanda alta sin límite principal de memoria | Rutas soportadas FP8/BF16 frente a Q4 bajo la carga prevista | El archivo menor no tiene por qué producir más trabajo útil |

El [catálogo](/es/guides/llm/#model-catalog) identifica archivos y la [tabla de programas](/es/guides/llm/#serving-software) sus rutas de ejecución. En una comparación controlada de calidad conviene mantener entradas y ajustes de generación; al comparar sistemas finales se puede optimizar cada ruta si se explican las diferencias.

El ahorro económico aparece cuando se usan menos recursos para trabajo aceptado o se termina más trabajo aceptado con los mismos recursos. También cuentan conversión, mantenimiento de variantes, ingeniería y respuestas fallidas. El archivo menor aporta valor cuando la memoria liberada o el tráfico reducido se convierten en una mejora utilizable, conservando la calidad exigida.
