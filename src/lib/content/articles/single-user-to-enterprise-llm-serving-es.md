---
title: 'De un usuario al servicio empresarial: cuándo cambiar el modelo, las réplicas o la GPU'
slug: single-user-to-enterprise-llm-serving-es
translationGroup: single-user-to-enterprise-llm-serving
lang: es
date: '2026-09-08'
faDate: '2026-09-08'
draft: true
math: false
category: Modelos de lenguaje
excerpt: Diagnóstico separado de colas, memoria y disponibilidad, con ejemplos de capacidad tras fallos y ampliación temporal que preservan calidad y tiempo de respuesta.
readTime: 14 min
cover: /images/articles/single-user-to-enterprise-llm-serving/cover.webp
related:
- evaluar-llm-idioma-y-tarea
- llms-on-rtx-4090-24gb-vs-48gb-es
- airllm-layer-wise-inference-es
updated: '2026-09-17'
author: Mehran Ziabary
---

Un asistente organizativo suele empezar con una demostración prometedora: un modelo funciona en una GPU y responde sobre documentos. El problema cambia cuando llegan más personas, crecen las conversaciones y el mantenimiento ya no puede interrumpir el servicio. Comprar una tarjeta más cara resulta tentador, pero respuestas incorrectas, colas largas, memoria agotada y caídas son fallos diferentes.

Hay tres decisiones separadas: cambiar el modelo, añadir réplicas completas o cambiar el hardware de cada réplica. Un modelo pequeño adecuado distribuido por equipos convencionales puede aportar capacidad independiente y una ruta de mantenimiento. Otros trabajos necesitan un modelo más capaz, más memoria o comunicación más rápida entre GPU. La [guía LLM](/es/guides/llm/) permite separar esas decisiones antes de comprar.

## Contar trabajo, no empleados

Mil empleados no implican una cantidad determinada de GPU. Muchos harán pocas preguntas breves; un proceso automático puede llamar al modelo continuamente. Una persona leyendo y una petición que genera tokens tampoco consumen igual. Se miden llegadas, longitudes de entrada y salida y llamadas necesarias por tarea.

Definamos un objetivo de nivel de servicio, SLO, comprobable. Un objetivo **ilustrativo** es: «El 95 % de las peticiones interactivas empieza a responder en dos segundos bajo la carga indicada». No es una recomendación universal: convierte «rápido» en una condición observable. Una extracción nocturna puede necesitar cierta cantidad de documentos correctos antes de la mañana.

| Observación | Decisión que informa |
| --- | --- |
| Llegadas habituales y máximas, con ráfagas | Réplicas y capacidad temporal |
| Distribución de longitudes, historial y documentos | Memoria y duración de ocupación |
| Latencia inicial, total y entre tokens en p95/p99 | Experiencia de las peticiones lentas |
| Tamaño y antigüedad de cola, errores y cancelaciones | Admisión y déficit de capacidad |
| Tareas correctamente completadas | Capacidad del modelo frente a infraestructura |
| Servicio exigido al perder un host | Reserva y ubicación |

Las [métricas de vLLM](https://docs.vllm.ai/en/stable/usage/metrics/) incluyen observaciones de cola, latencia, tokens y KV en versiones compatibles. Se combinan con tiempos de la aplicación completa: la persona también espera autenticación, recuperación y otras etapas.

## Localizar la espera

En un asistente documental, autorización, búsqueda, reranking y construcción de entrada preceden a la generación. Una base de datos lenta o demasiado contexto pueden limitar el servicio. Separar tiempos evita gastar en GPU para mejorar otra etapa.

Prefill procesa entrada y decode genera tokens sucesivos. Entrada larga y salida larga con el mismo total no se comportan necesariamente igual. Eliminar pasajes irrelevantes y ajustar la salida a la tarea puede liberar capacidad sin cambiar el modelo, siempre que conserve evidencia y respuesta necesarias.

El procesamiento continuo por lotes admite y planifica trabajo durante la generación, sin esperar siempre a que terminen todos los integrantes de un lote. [Orca](https://www.usenix.org/conference/osdi22/presentation/yu) es una referencia inicial de ese enfoque. Más salida agregada debe evaluarse junto con latencia interactiva. La [tabla de programas](/es/guides/llm/#serving-software) identifica rutas compatibles.

La [caché de prefijos de vLLM](https://docs.vllm.ai/en/stable/features/automatic_prefix_caching/) reutiliza prefijos calculados. Su ahorro principal está en prefill, no en acelerar cualquier token nuevo. También difiere de guardar y devolver una respuesta terminada. Ambas cachés deben respetar separación de datos y permisos.

## Cambiar el modelo cuando limita la capacidad de resolver la tarea

Si las respuestas son correctas sin carga y lentas en horas punta, ampliar el modelo puede añadir presión. Primero se revisan planificación, distribución y réplicas. Cambiarlo cobra sentido cuando calidad, modalidad de entrada, contexto o razonamiento ya no encajan.

Extracción o clasificación limitada puede empezar con un especialista o candidato de 2–4B; un asistente documental directo puede comparar unos 8B con opciones menores y mayores. Son tamaños de selección, no garantías. La [guía de tamaño](/es/articles/right-model-size-for-the-task-es/) y el [artículo de RAG](/es/articles/enterprise-rag-model-embedding-reranker-es/) explican el diagnóstico.

Un modelo menor residente facilita replicación y deja memoria para contextos activos. Cuantizar pesos no reduce proporcionalmente toda la memoria: KV conserva un presupuesto propio. Cargar correctamente difiere de servir de forma estable con la demanda objetivo.

Se puede reservar un modelo más capaz para casos difíciles identificados. Hay que incluir éxito, latencia y coste de toda la ruta: probar primero el pequeño y repetir con el grande paga ambos. Un tono seguro no es un clasificador validado de dificultad.

## Replicar no es repartir un modelo

Aquí **réplica** significa una instancia completa que admite trabajo, no una nueva publicación de pesos. Cuatro GPU con un modelo completo cada una pueden ofrecer cuatro unidades de servicio. Cuatro GPU necesarias conjuntamente para un modelo repartido pueden ofrecer solo una.

La [guía de paralelismo de vLLM](https://docs.vllm.ai/en/stable/serving/parallelism_scaling/) distingue ejecución en varias GPU de aumentar instancias. Paralelismo tensorial o por etapas puede resolver memoria; paralelismo de datos distribuye trabajo. Las dependencias reales entre procesos determinan si dos unidades aparentes son independientes.

| Cambio | Beneficio posible | Lo que no se obtiene automáticamente |
| --- | --- | --- |
| Réplicas completas en GPU separadas | Repartir peticiones independientes | Acelerar proporcionalmente una petición individual |
| Modelo dividido entre GPU | Memoria y cálculo para ese modelo | Varias instancias alternativas |
| Réplicas en un solo host | Capacidad y cierta tolerancia a fallos de proceso o tarjeta | Sobrevivir a la caída del host |
| Réplicas en hosts independientes | Mantenimiento o fallo de un equipo | Independencia de energía, disco o red compartidos |
| Réplicas temporales en nube | Seguir demanda variable | Disponibilidad instantánea y garantizada |

Las peticiones independientes no necesitan intercambiar salidas de cada capa entre hosts, aunque documentos y encaminamiento siguen usando red. Un modelo dividido puede ser sensible a latencia y ancho de banda entre GPU. Por eso un servicio de inferencia replicado y un clúster de entrenamiento estrechamente conectado tienen economías distintas.

## Ejemplo de capacidad con pérdida de una instancia

Supongamos que una réplica atiende **40 peticiones por minuto** dentro de calidad y latencia requeridas para el trabajo definido. Es una **entrada educativa**, no una medición de RTX 4090 ni de un modelo. El máximo previsto es **90 peticiones por minuto**, cada réplica tiene su host independiente y los componentes compartidos no limitan. La cifra de 40 representa una tasa operativa utilizable, no saturación con cola creciente.

| Réplicas preparadas | Capacidad supuesta | Tras perder una | Resultado con 90 peticiones/minuto |
| --- | ---: | ---: | --- |
| 2 | 80 | 40 | Insuficiente incluso sin fallo |
| 3 | 120 | 80 | Suficiente en estado sano, insuficiente tras fallo |
| 4 | 160 | 120 | El cálculo cubre la pérdida de una réplica |

El cálculo inicial para réplicas equivalentes es `ceil(carga objetivo / capacidad por réplica)`. Se añade una para tolerar la pérdida de una réplica independiente. Desequilibrio de carga, lotes menores al repartir, cachés frías y reintentos pueden hacer que la capacidad medida difiera de esa aritmética.

Ahora coloquemos las cuatro GPU de dos en dos en dos hosts. Perder uno elimina dos réplicas y deja 80 peticiones por minuto: no cumple. Bajo las mismas hipótesis, tres hosts de dos réplicas dejan cuatro réplicas al caer un host. Debe planificarse para el **mayor grupo de capacidad que desaparece con el fallo considerado**. Tolerar una zona exige capacidad suficiente fuera de ella.

## La disponibilidad empieza por la capacidad que queda

Un segundo modelo ayuda si el tráfico llega a él y funcionan sus dependencias. Autenticación, búsqueda documental, almacenamiento de conversaciones, balanceo y red pueden compartir un punto de fallo. El historial necesario tras conmutar no debe existir solo en memoria de un proceso.

Nuestro despliegue de Targoman utilizó dos hosts activos, cada uno con RTX 4090. Durante una recarga en uno, el otro continuó traducción, resumen y conversación, pero aumentaron espera y algunas cancelaciones. El [relato original en persa](/articles/targoman-300-concurrent-requests-one-rtx-4090/) ilustra la diferencia entre seguir accesible y conservar el mismo objetivo de servicio. No es una garantía porcentual de disponibilidad.

Las [restricciones de distribución topológica de Kubernetes](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/) ayudan a repartir instancias entre hosts o zonas. [PodDisruptionBudget](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/) limita ciertas interrupciones voluntarias; no evita una caída inesperada del host. Capacidad y aplicación deben dar utilidad a esa distribución.

En una sustitución planificada, se carga y prepara la nueva instancia antes de recibir tráfico y se permite terminar trabajo en la anterior. Un fallo inesperado puede cortar una respuesta en curso. Reintentar una operación de agente no debe duplicar pagos, registros ni otros efectos externos; identidad de operación y control de duplicados pertenecen a la aplicación. Disponibilidad para nuevas peticiones no equivale a continuidad de toda respuesta iniciada.

## Cuándo una GPU mayor resuelve el problema

Más VRAM aporta valor cuando no caben modelo, contexto o KV requeridos. Más capacidad por instancia importa si una petición aislada ya tarda demasiado; las réplicas no corrigen solas esa latencia. Una plataforma profesional también puede reducir espacio, energía por trabajo útil o esfuerzo operativo con demanda sostenida.

La [guía GPU](/es/guides/gpu-selection/) compara memoria, conexiones y plataforma. Hay que comparar la arquitectura completa con igual calidad y latencia, incluyendo el host adicional necesario para disponibilidad. Una tarjeta potente no crea otra instancia independiente. Dos tarjetas de 24 GB tampoco se convierten automáticamente en memoria unificada de 48 GB; el [artículo de 24 y 48 GB](/es/articles/llms-on-rtx-4090-24gb-vs-48gb-es/) explica esa diferencia.

## Facturación flexible y autoescalado son distintos

La capacidad temporal sirve cuando demanda y modelo todavía son inciertos, para experimentos o picos periódicos. Con un patrón conocido, la demanda base puede cubrirse mediante compra, reserva o alquiler apropiado, y la parte variable usar otra ruta.

**Pay as you go describe la facturación; autoescalado describe el control de capacidad.** Cerrar la aplicación no necesariamente detiene la factura de una máquina. La [documentación del ciclo de EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html) distingue instancias activas y detenidas y recursos cobrados aparte. Otros servicios contabilizan arranque del worker, ejecución o espera antes de apagar. Se compara la unidad real y el momento de inicio y fin del cobro.

Compartir GPU es otra decisión de asignación: varios servicios reciben recursos gestionados sin reservar cada uno una tarjeta completa. Con demanda moderada o variable puede evitarse pagar capacidad exclusiva sin uso. Memoria asignada, interferencias, aislamiento y tiempo de respuesta bajo demanda conjunta siguen entrando en la comparación. Compartir no equivale a ser interrumpible ni implica el mismo mecanismo de virtualización en toda plataforma.

| Organización de capacidad | Uso posible | Condición económica u operativa |
| --- | --- | --- |
| Instancia GPU siempre preparada | Demanda interactiva base | Tiempo ocioso, reserva y gestión |
| Recursos GPU compartidos y gestionados | Demanda menor o variable | Memoria asignada, reglas concurrentes y latencia en horas punta |
| Réplicas temporales junto a la base | Picos previstos o estacionales | Preparación, disponibilidad y transferencia |
| Servicio que baja a cero | Trabajo poco frecuente que tolera esperar | Arranque frío y recursos que siguen facturándose |
| Capacidad Spot o interrumpible | Colas reiniciables o reanudables | Interrupción y recuperación |
| API de modelo alojado | Demanda limitada o ruta especializada | Calidad, latencia, límites y llamadas por tarea |

Las [interrupciones Spot de AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-interruptions.html) son un ejemplo documentado de capacidad recuperable por el proveedor. Si el trabajo no puede esperar, necesita recuperación o alternativa. Compartir recursos no implica por sí solo esa propiedad; la determina el contrato.

## Ejemplo de capacidad que sigue al pico

Volvamos a las 40 peticiones por minuto supuestas por réplica. Si la carga normal es 30, dos réplicas independientes preparadas conservan capacidad tras perder una. El máximo de 90 necesita cuatro para el mismo objetivo de fallo.

En un **mes ilustrativo de 720 horas**, mantener cuatro preparadas consume **2.880 horas-réplica**. Mantener dos todo el mes y añadir dos durante **60 horas cada una**, incluyendo preparación y espera previa al apagado, consume:

`2 × 720 + 2 × 60 = 1.560 horas-réplica`

Son aproximadamente **46 % menos horas-réplica**. En este ejemplo cada réplica usa una GPU y las horas-GPU coinciden. Si comparten tarjeta o cada réplica necesita varias, la unidad cambia. Tampoco significa automáticamente reducir 46 % la factura completa: tarifas, disco, red y gestión pueden ser diferentes.

Las réplicas adicionales deben estar preparadas antes del pico y ubicadas conforme a la tolerancia asumida. Encenderlas cuando ya hay cola añade aprovisionamiento, descarga de pesos, carga y calentamiento a la espera. La [guía de autoescalado de Ray Serve](https://docs.ray.io/en/latest/serve/advanced-guides/advanced-autoscaling.html) trata el arranque frío; escalar infraestructura es otra capa. Eliminar procesos de modelo no libera necesariamente máquinas ni recursos facturados.

Para picos previsibles se prepara capacidad con antelación. Ante ráfagas inesperadas se conserva margen listo y límites de admisión. Antigüedad de cola y latencia cercana al objetivo, junto a memoria y trabajo activo, pueden ser más informativas que la utilización GPU aislada. Los periodos de espera antes de reducir capacidad evitan oscilaciones; siguen vigentes mínimos por fallo y límites de gasto.

Una alternativa híbrida local/nube necesita pesos y plantillas compatibles, permisos de datos y red preparados. El autoescalado no crea cuota ni GPU inexistentes en una región. Una instancia descargando todo durante la incidencia no equivale a una reserva caliente.

## Una cola ilimitada no es una estrategia de crecimiento

Conviene separar trabajo interactivo breve, análisis largo y procesos en segundo plano cuando compiten. Entrada, salida y tiempo tienen presupuestos apropiados. Agotada la capacidad, espera limitada o finalización asíncrona pueden funcionar mejor que una cola creciente. Usar un modelo de menor calidad debe seguir una política explícita del producto, no sustituir silenciosamente un análisis sensible.

Los reintentos amplifican sobrecarga. Se limitan intentos y se espacian con demora creciente y variación aleatoria; la cancelación debe llegar al motor cuando sea posible para detener trabajo abandonado. La [guía de gestión de sobrecarga de Google](https://sre.google/sre-book/handling-overload/) relaciona admisión, reintentos y balanceo.

Se prueban ráfagas, entradas largas, pérdida de réplica, recuperación con caché fría y dependencias caídas. Peticiones tardías, canceladas y fallidas acompañan al resultado exitoso. La capacidad útil cuenta trabajo que cumple calidad y tiempo, no todos los tokens producidos.

## Relacionar el cambio con el síntoma

| Síntoma | Cambio que estudiar | Criterio |
| --- | --- | --- |
| Respuestas erróneas incluso sin carga | Recuperación, instrucciones, modelo adecuado o especialista | Más tareas aceptadas en ejemplos representativos |
| Calidad correcta con colas en picos | Planificación y réplicas independientes | Capacidad mayor dentro de objetivos |
| Una petición aislada tarda demasiado | Entrada, aplicación, modelo o hardware de la instancia | Menor latencia de esa petición |
| Contexto o KV agotan memoria | Selección de entradas, ubicación, caché o más VRAM | Conservar evidencia sin inestabilidad |
| Perder un host interrumpe servicio | Capacidad preparada en otro ámbito de fallo | Capacidad restante y dependencias suficientes |
| Poca demanda habitual con picos | Base menor y ampliación temporal a tiempo | Menor coste total real cumpliendo el pico |
| Demanda estable y alquiler caro | Compra, acuerdo de capacidad o seguir alquilando | Operación completa, reserva y costes de cambio |

La [evaluación por idioma y tarea](/es/articles/evaluar-llm-idioma-y-tarea/) define salidas aceptadas. Se divide el coste completo del periodo, incluyendo reserva ociosa, fallos y escalados, entre trabajo aceptado del mismo periodo. Así cobra sentido comparar réplicas convencionales con hardware superior.

Un servicio inicial pequeño no necesita comprar desde el primer día su capacidad final. Unidades reproducibles, umbrales observables y separación de fallos permiten crecer gradualmente. La GPU mayor entra cuando memoria, latencia o coste completo le asignan una función concreta.
