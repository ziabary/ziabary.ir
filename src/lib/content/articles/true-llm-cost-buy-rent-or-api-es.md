---
title: 'El coste real de ejecutar un LLM: comprar hardware, alquilar GPU o usar una API'
slug: true-llm-cost-buy-rent-or-api-es
translationGroup: true-llm-cost-buy-rent-or-api
lang: es
date: '2026-09-16'
faDate: '2026-09-16'
draft: true
math: false
category: Modelos de lenguaje
excerpt: Un supuesto calculado en USD para comparar API, alquiler y propiedad, con reintentos, respuestas aceptadas, operación, energía y umbrales económicos condicionados.
readTime: 14 min
cover: /images/articles/true-llm-cost-buy-rent-or-api/cover.webp
related:
- single-user-to-enterprise-llm-serving-es
- right-model-size-for-the-task-es
- llms-on-rtx-4090-24gb-vs-48gb-es
- enterprise-rag-model-embedding-reranker-es
- ollama-vllm-sglang-or-llama-cpp-es
updated: "2026-09-19"
author: Mehran Ziabary
---

Una API con tokens baratos, un alquiler económico de GPU y una estación de trabajo potente son tres compras distintas. La comparación financiera empieza a servir cuando definimos qué respuestas deben aceptarse, en cuánto tiempo deben llegar y qué capacidad tiene que sobrevivir a una avería. Sin esa definición, la fila más barata puede describir un servicio que no cumple el objetivo.

Esta edición internacional utiliza un **supuesto educativo calculado en USD**, preparado el 17 de septiembre de 2026. Todos los precios que aparecen son entradas elegidas para el cálculo: no son ofertas actuales de proveedores ni conversiones de precios iraníes. La [edición persa](/articles/true-llm-cost-buy-rent-or-api/) estudia por separado ofertas iraníes con fecha. Usar USD aquí no presupone el país del lector, sus proveedores disponibles, sus impuestos ni su tarifa eléctrica.

## Contar trabajo aceptado, además de llamadas

Supongamos que un asistente documental recibe 100 000 tareas de usuarios al mes. Una tarea puede llamar al modelo varias veces: reformular la consulta, generar la respuesta, corregir un formato rechazado y volver a intentarlo. Un agente de programación puede hacer muchas más llamadas y utilizar herramientas externas. Una llamada a la API, una tarea del usuario y un resultado aceptado son unidades contables distintas.

El denominador útil es el número de tareas que cumplen los requisitos de calidad y tiempo de respuesta. El numerador incluye todos los intentos facturados y los costes del servicio asignados a esa carga. También incluye la corrección humana cuando una alternativa necesita más de ella. Una respuesta barata que un empleado debe reconstruir puede acabar siendo cara.

La [evaluación para tu idioma y tarea](/es/articles/evaluar-llm-idioma-y-tarea/) explica cómo definir ese criterio de aceptación. El consumo de tokens debe proceder del tokenizer y los registros del modelo elegido. Un mismo número de caracteres, entre idiomas o entre tokenizers, no establece el mismo consumo facturable.

| Límite del coste | Infraestructura comprada | Servidor GPU alquilado | API del modelo |
|---|---|---|---|
| Compromiso inicial | Sistema, instalación y preparación del lugar | Entorno y preparación del modelo | Integración y posibles compromisos de cuenta |
| Procesamiento recurrente | Energía, alojamiento, mantenimiento y capital | Recursos asignados y servicios asociados | Consumo y cuotas del plan |
| Durante periodos tranquilos | Permanecen capital y operación fija | La máquina asignada puede seguir facturándose | Baja el consumo si no hay llamadas |
| Quién opera la inferencia | El equipo de la organización | Normalmente el equipo, si se alquila infraestructura sin gestionar | El proveedor del modelo |
| Aplicación, documentos y recuperación | Siguen siendo necesarios | Siguen siendo necesarios | Siguen siendo necesarios salvo que el producto los incluya |
| Cobertura de fallos | Recursos adicionales y enrutamiento | Diseño del despliegue y contrato | Proveedor y ruta alternativa comprobada |

Mantengamos ese límite constante. Comparar un producto documental gestionado con solo la electricidad de una GPU local deja fuera gran parte del servicio local.

## Un supuesto de API con entradas explícitas

Supongamos una API de texto hipotética a **0,50 USD por millón de tokens de entrada y 2,00 USD por millón de tokens de salida**. Son tarifas educativas, no el precio de un modelo concreto. No aplicamos descuentos por caché o lotes, cargos por herramientas ni suscripción. La salida incluye todos los tokens facturables según este contrato hipotético, también los de razonamiento si fueran cobrados.

Consideremos dos cargas:

| Carga educativa | Tokens de entrada por llamada | Tokens de salida por llamada | Coste por llamada | Coste de 100 000 llamadas |
|---|---:|---:|---:|---:|
| Pregunta corta | 2000 | 500 | 0,002 USD | 200 USD |
| Pregunta documental | 8000 | 1000 | 0,006 USD | 600 USD |

En la pregunta corta, la entrada cuesta `2000 / 1 000 000 × 0,50 = 0,001` USD. La salida añade `500 / 1 000 000 × 2,00 = 0,001`. En la pregunta documental, los componentes son 0,004 y 0,002 USD.

El mismo número de llamadas cuesta ahora tres veces más. Enviar historiales completos o muchos fragmentos irrelevantes puede acercar la carga a la segunda fila sin mejorar las respuestas. La [elección de embedding y reranker en RAG](/es/articles/enterprise-rag-model-embedding-reranker-es/) influye en cuánta evidencia útil llega al generador.

Un agente de cinco llamadas es otra carga. Si cada llamada tuviera el patrón corto anterior, 100 000 tareas consumirían 1000 USD de modelo, antes de herramientas. En un agente real, las longitudes suelen cambiar porque crece el historial. La distinción entre [completado, asistente y agente](/es/articles/code-completion-assistant-and-agent-es/) explica por qué una acción del usuario puede necesitar varias inferencias.

## Los reintentos y la calidad cambian el denominador

Otro **ejemplo contable educativo**: 100 000 tareas enviadas producen 120 000 llamadas cortas después de los reintentos. El consumo del modelo cuesta 240 USD. Si 90 000 tareas superan el criterio de aceptación, el consumo por tarea aceptada es `240 / 90 000`, aproximadamente **0,002667 USD**. Dividir por tareas enviadas daría 0,0024; dividir por llamadas devolvería 0,002. Ninguno de esos dos cocientes es el coste por tarea aceptada.

Si 1000 de las tareas aceptadas requieren un minuto de corrección y suponemos un coste laboral de 24 USD por hora, la corrección añade **400 USD**. Consumo y corrección suman 640 USD, aproximadamente **0,007111 USD por tarea aceptada**. Estos recuentos son inventados para explicar el método, no resultados de evaluación de un modelo.

En una comparación real, registremos reintentos y correcciones con el mismo criterio de aceptación para cada candidato. No asignemos idénticas tasas de éxito a un modelo local pequeño y otro alojado mayor solo para comparar sus precios. Una alternativa que incumple un requisito obligatorio de privacidad, idioma o latencia no se vuelve válida por costar menos.

## Alquiler: el tiempo asignado es una unidad concreta

Supongamos un servidor compatible con una GPU y dos **planes educativos hipotéticos**: 1,20 USD por hora asignada o 600 USD por un mes de treinta días. Ambos incluyen la misma CPU, RAM, GPU y disco local. Añadimos 50 USD mensuales por almacenamiento y red no incluidos en ninguno de los dos planes.

| Tiempo asignado | Plan horario, solo cómputo | Plan mensual, solo cómputo |
|---|---:|---:|
| 50 horas | 60 USD | 600 USD |
| 300 horas | 360 USD | 600 USD |
| 500 horas | 600 USD | 600 USD |
| 720 horas | 864 USD | 600 USD |

La igualdad del pago de cómputo aparece en `600 / 1,20 = 500 horas`. No expresa rendimiento en tokens. Descargar pesos, calentar kernels y ejecutar intentos fallidos también puede consumir tiempo asignado. Que una aplicación esté inactiva dentro de una máquina encendida no implica liberar el recurso facturable.

Esta distinción es real aunque las tarifas sean educativas. La [documentación del ciclo de vida de Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html) distingue estados y cargos, incluido almacenamiento que puede permanecer después de detener el cómputo. Con otro proveedor, utilicemos su definición de ciclo de vida y facturación, sin trasladar automáticamente las condiciones de EC2.

El alquiler también debe cumplir las necesidades de RAM y disco. Una GPU barata con memoria del sistema insuficiente para cargar el archivo, o sin espacio para pesos originales y convertidos, no representa la misma configuración. La [vista de viabilidad de hardware](/es/guides/llm/#hardware-feasibility) ayuda a separar tamaño de pesos y presupuesto completo de despliegue.

## Compra: un presupuesto educativo completo

Supongamos ahora una instalación completa con una GPU y **6000 USD de desembolso inicial**. La distribución siguiente es un modelo de costes, no una lista de compra ni la afirmación de que una GPU concreta esté disponible a ese precio. Una lista real de componentes debe cumplir compatibilidad física, eléctrica y de software antes de sustituir estas entradas.

| Partida educativa | USD |
|---|---:|
| GPU | 3000 |
| CPU | 700 |
| Placa base | 400 |
| Memoria del sistema | 600 |
| Almacenamiento | 300 |
| Fuente de alimentación | 250 |
| Caja | 200 |
| Refrigeración | 150 |
| Montaje e instalación | 400 |
| **Total inicial** | **6000** |

La GPU representa la mitad del presupuesto. Confundir su precio con el del servicio omitiría 3000 USD antes incluso de operar el sistema. Un montaje en rack, alimentación redundante u otra necesidad de memoria exige una lista distinta, no un porcentaje añadido sin explicación.

Tomemos un periodo de 36 meses, sin descontar ingresos hipotéticos por reventa. Repartir linealmente el desembolso equivale a **166,67 USD mensuales**, redondeados para mostrar el resultado. Es una imputación contable del ejemplo, no la cuota mensual de un préstamo.

Para operación continua, supongamos potencia informática media de **0,45 kW**, medida a la entrada del sistema; multiplicador de energía de la instalación de **1,20**; electricidad a **0,20 USD/kWh** y 720 horas mensuales. El multiplicador representa energía adicional de la instalación asignada al sistema; no describe el lugar del lector.

`0,45 × 720 × 1,20 × 0,20 = 77,76 USD al mes`

Los 0,45 kW son una media supuesta del sistema completo, no el TDP de la GPU. Sustituirlos por la potencia máxima de la tarjeta excluiría el resto del equipo y no demostraría consumo medio.

## Totales mensuales con el mismo límite operativo

Añadamos 50 USD mensuales por lugar y red del equipo comprado, 30 USD por mantenimiento del hardware y seis horas de operación de inferencia a 40 USD por hora. En el alquiler de infraestructura, las mismas seis horas de operación permanecen; suponemos que el proveedor incluye el mantenimiento físico en el precio. Desarrollo de aplicación, documentos y recuperación quedan fuera de los tres totales por considerarse comunes e idénticos: cualquier diferencia real debe incorporarse.

| Partida mensual educativa | Compra | Alquiler mensual | Alquiler horario durante 720 horas |
|---|---:|---:|---:|
| Imputación del capital o alquiler de cómputo | 166,67 USD | 600 USD | 864 USD |
| Energía | 77,76 USD | Incluida | Incluida |
| Lugar/red o almacenamiento/red excluidos | 50 USD | 50 USD | 50 USD |
| Mantenimiento físico | 30 USD | Incluido | Incluido |
| Operación de inferencia | 240 USD | 240 USD | 240 USD |
| **Total mensual** | **564,43 USD** | **890 USD** | **1154 USD** |

Sin redondear los pasos intermedios, la compra suma **20 319,36 USD** en 36 meses y el alquiler mensual **32 040 USD**: una diferencia de **11 720,64 USD** bajo estas condiciones. Las tarifas permanecen constantes, no hay impuestos ni financiación y ninguna configuración incluye un segundo servidor para cubrir fallos. Estas decisiones definen el cálculo; no predicen tres años de mercado.

El plazo de recuperación de caja responde a otra pregunta. Operar el equipo comprado, sin imputación del capital, cuesta 397,76 USD al mes. La diferencia frente al alquiler de 890 USD es 492,24 USD. Recuperar los 6000 USD iniciales con esa diferencia constante requiere aproximadamente **12,19 meses**. Añadir otra vez los 166,67 USD contables a este cálculo de caja duplicaría la adquisición.

Para ilustrar un uso bajo, supongamos que el sistema permanece apagado salvo cincuenta horas al mes y que la energía adicional escala con esas horas. La energía cuesta 5,40 USD. Manteniendo los demás supuestos, compra y operación imputadas suman **492,07 USD**, frente a **350 USD** del alquiler horario: 60 de cómputo, 50 de servicios adicionales y 240 de operación. Un servicio que debe estar disponible todo el día no puede utilizar este supuesto de apagado.

## Dónde se cruzan API y servidor

Primero hagamos una suposición fuerte y explícita: API y servidor entregan **la misma tarea aceptada mediante una llamada, con la misma latencia y capacidad suficiente**, sin diferencias de corrección o reintentos. Supongamos además que la API no añade un coste fijo de operación de inferencia en esta comparación simplificada. Con los totales anteriores:

| Carga | Igualdad aritmética compra/API | Igualdad aritmética alquiler mensual/API |
|---|---:|---:|
| Llamada corta a 0,002 USD | Unas 282 213 llamadas/mes | 445 000 llamadas/mes |
| Llamada documental a 0,006 USD | Unas 94 071 llamadas/mes | Unas 148 333 llamadas/mes |

Los umbrales dividen el total del servidor por el precio supuesto por llamada. No recomiendan comprar: la equivalencia y la capacidad indicadas no se han medido. Si la integración de API añade operación fija, hay que usar `coste fijo del servidor − coste fijo de la API` antes de dividir por la diferencia de coste variable.

La capacidad es fácil de pasar por alto. En un mes de treinta días, 100 000 tareas equivalen a unas **2,31 por minuto**. Si el 60 % llega en sesenta horas de mayor actividad, esos periodos promedian **16,67 tareas por minuto**, con posibles picos superiores. Un cruce de costes mensuales puede exigir más capacidad en hora punta que la ofrecida por el servidor. [Del usuario individual al servicio empresarial](/es/articles/single-user-to-enterprise-llm-serving-es/) conecta cola, capacidad de reserva y costes.

<!-- reference:cost-choice:start -->

### Contexto y segunda etapa de búsqueda cambian el presupuesto viable

Las [instrucciones de Qwen3-4B-Instruct-2507](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507) describen un contexto nativo de 262.144 tokens y sugieren reducirlo a 32.768 ante un error de memoria. El límite no promete que pesos, caché KV y peticiones concurrentes quepan en el equipo ofertado. La [comparación de 24 y 48 GB](/es/articles/llms-on-rtx-4090-24gb-vs-48gb-es/) separa esos componentes.

La [evaluación de rerankers de Qwen](https://arxiv.org/html/2506.05176v3) fija 100 candidatos. Sus puntuaciones de calidad no proporcionan el tiempo de procesamiento de esa etapa adicional para la carga presupuestada. Si una alternativa añade reranking, la comparación debe incorporar sus recursos y evaluar las respuestas aceptadas resultantes.

<!-- reference:cost-choice:end -->

## Continuidad del servicio y límites de datos

Si debemos conservar toda la capacidad tras perder un host, una máquina comprada o una instancia alquilada son diseños incompletos. Añadamos réplicas, alojamiento y enrutamiento necesarios en ambos casos. Si la API requiere un segundo proveedor, contemos integración, compromisos mínimos y reserva de capacidad. Dos intermediarios conectados al mismo modelo de origen no establecen rutas de fallo independientes.

El [informe de Targoman, en persa](/articles/targoman-300-concurrent-requests-one-rtx-4090/) describe continuidad sobre infraestructura local durante una interrupción de conectividad exterior y servicio reducido después de perder un servidor. Su aportación es distinguir seguir respondiendo de conservar toda la capacidad. No proporciona un porcentaje universal de disponibilidad ni un precio de hardware para este ejemplo.

Los requisitos de ubicación y acceso a datos pueden descartar una alternativa antes de comparar precios. [Confidencialidad de datos y API públicas](/es/articles/data-confidentiality-public-apis-es/) examina ese límite. Comprar equipos no implementa por sí solo controles de acceso o registros seguros; contratar un modelo gestionado tampoco incluye automáticamente permisos documentales y auditoría.

## Reducir el trabajo que llega al modelo

Consultar un estado de pedido de forma determinista no requiere generar una respuesta en cada paso. Seleccionar fragmentos relevantes antes de generar puede reducir tokens de entrada y memoria KV. Un modelo menor que cumpla el criterio de aceptación puede liberar capacidad concurrente. Son cambios de arquitectura con efectos observables, no una promesa universal de ahorro.

El [tamaño del modelo](/es/articles/right-model-size-for-the-task-es/), la [cuantización a cuatro bits](/es/articles/four-bit-model-quantization-es/) y la [elección del motor](/es/articles/ollama-vllm-sglang-or-llama-cpp-es/) afectan componentes diferentes. La cuantización puede ahorrar memoria sin reducir proporcionalmente la latencia. Cancelar solicitudes abandonadas recupera trabajo que, de otro modo, no produciría resultados aceptados.

Con demanda incierta, una API por consumo o un alquiler breve permiten obtener evidencia antes de comprometer capital. Con carga estable, un modelo pequeño compatible y un equipo de operación experimentado, comprar puede resultar atractivo. Al sustituir las entradas educativas, conservemos distribución real de tokens, tareas aceptadas, capacidad en hora punta y alcance completo de las facturas. Esos registros permiten que otra persona reconstruya la decisión.
