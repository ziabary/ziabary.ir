---
title: "RAG, CAG, KAG, fine-tuning e instruction tuning: ¿en qué se diferencian y cuál elegir?"
slug: rag-cag-kag-fine-tuning-instruction-tuning-es
translationGroup: rag-cag-kag-fine-tuning-instruction-tuning
lang: es
date: '2026-06-15'
faDate: 15 de junio de 2026
author: Mehran Ziabary
category: Guía técnica
topic: infrastructure
cover: /images/articles/rag-cag-kag-fine-tuning-instruction-tuning/cover.webp
coverAlt: Un modelo fundacional en el centro, conectado a distintas vías de recuperación, caché, conocimiento estructurado y entrenamiento
excerpt: "Cuando un modelo no responde bien, ¿necesita más entrenamiento o simplemente acceso a la información adecuada? Mediante ejemplos sencillos, este artículo compara RAG, CAG y KAG con el fine-tuning y el instruction tuning: recuperar documentos, almacenar cálculos en caché, razonar sobre relaciones y cambiar el comportamiento del modelo. Una tabla comparativa y varios escenarios prácticos ayudan a distinguir la falta de conocimiento de un comportamiento inadecuado antes de invertir en entrenamiento, y a elegir el método o la combinación que necesita el proyecto."
readTime: 19 min
tags:
  - Modelos de lenguaje grandes
  - RAG
  - CAG
  - KAG
  - Fine-tuning
  - Instruction tuning
related:
  - mlops-foundation-of-zero-trust-ai-es
  - gpu-inference-latency-throughput-es
draft: false
---

Cuando la respuesta de un modelo de lenguaje no resulta suficiente para una tarea especializada, una de las primeras propuestas suele ser: «Hagamos fine-tuning del modelo». A veces es la decisión correcta, pero en muchos proyectos el problema no se resuelve volviendo a entrenarlo. Quizá el modelo se comporta de forma adecuada y solo le falta el documento necesario. Tal vez el conocimiento requerido es tan limitado que cabe completo en su contexto. Puede que la pregunta exija conectar varias relaciones y razonar en distintas etapas. O quizá el conocimiento sea suficiente, pero el modelo todavía no sepa seguir bien las instrucciones.

RAG, CAG, KAG, fine-tuning e instruction tuning son cinco términos habituales para abordar estos problemas, pero no representan cinco opciones del mismo nivel. Los tres primeros suelen aportar conocimiento o contexto externo al modelo cuando responde. Los dos últimos pertenecen a la familia del entrenamiento y modifican parámetros entrenables del modelo o de sus componentes añadidos. Además, el instruction tuning es un tipo de fine-tuning, no una alternativa completamente independiente.

> En RAG, CAG y KAG ponemos algo junto al modelo para que lo utilice al responder. En el fine-tuning, el efecto del entrenamiento queda registrado en los parámetros entrenables del modelo o de sus componentes añadidos.

## El modelo fundacional: una persona formada, pero no omnisciente

Para construir una imagen mental, podemos comparar un modelo fundacional con una persona que ha leído una enorme cantidad de textos y ha aprendido lenguaje, patrones, conceptos y ciertos conocimientos generales o especializados. Con cautela, el tamaño del modelo y su número de parámetros también pueden compararse con la capacidad intelectual y la amplitud de esa formación. Sin embargo, el número de parámetros no equivale directamente a años de estudios o experiencia. La calidad y diversidad de los datos, la arquitectura, los métodos de entrenamiento, la longitud del contexto y las evaluaciones posteriores también determinan lo que el modelo puede hacer en la práctica. Un modelo más grande no es necesariamente más preciso, más actualizado o más fiable en cualquier tarea.

Si preguntamos a esa persona por un tema sin proporcionarle una fuente nueva, responderá a partir de lo que ya ha aprendido. Del mismo modo, un modelo de lenguaje utilizado directamente genera su respuesta a partir de patrones codificados en sus parámetros. La respuesta puede ser correcta, el conocimiento puede ser insuficiente o estar desactualizado, o el modelo puede producir con seguridad algo que no es cierto. Por definición, un modelo fundacional puede adaptarse a distintos ámbitos, pero no constituye por sí solo un producto completo y fiable para cualquier aplicación. Además, la mayoría de los modelos que hoy utilizamos como asistentes o chatbots no son modelos fundacionales sin adaptar: ya han pasado por instruction tuning y, normalmente, por otras etapas de entrenamiento para la alineación. El [informe de Stanford CRFM sobre modelos fundacionales](https://crfm.stanford.edu/report) también destaca este carácter general, pero todavía incompleto.

## Dos grandes familias: añadir contexto o modificar parámetros

Antes de entrar en los ejemplos, conviene considerar dos dimensiones. La primera es si incorporar conocimiento o una capacidad nueva exige modificar parámetros entrenables. En RAG, CAG y una forma convencional de KAG, el conocimiento externo puede introducirse mediante el contexto sin volver a entrenar el modelo principal. En el fine-tuning y el instruction tuning se realiza un proceso de entrenamiento que modifica todos los parámetros, una parte de ellos o parámetros añadidos, como los adaptadores LoRA. Naturalmente, componentes como el recuperador, el reranker o incluso el generador de un sistema RAG o KAG también pueden entrenarse por separado. La distinción es que añadir y actualizar conocimiento externo en estas arquitecturas no depende, por su propia naturaleza, de modificar los pesos del modelo fundacional.

La segunda dimensión es cómo llega ese conocimiento externo al modelo. ¿Hay que recuperar algunos fragmentos relevantes para cada pregunta? ¿Disponemos de una base de conocimiento pequeña y relativamente estable que puede introducirse una vez en el contexto y cuyos cálculos pueden almacenarse en caché? ¿O la pregunta exige relaciones explícitas, reglas, cálculos y razonamiento en varias etapas? Estas tres situaciones nos acercan, respectivamente, a RAG, CAG y KAG.

## RAG: buscar en la biblioteca las fichas pertinentes para cada pregunta

Supongamos que pedimos a un especialista en entomología una conferencia sobre moscas de alas verdes en Uganda. Conoce la entomología en general, pero quizá no dispone de información suficiente sobre esa especie concreta. Por eso le facilitamos una biblioteca de artículos y libros especializados. Las fuentes ya se han dividido en secciones más pequeñas, y cada una tiene una especie de ficha o índice semántico. Una vez definido el tema de la conferencia, un buscador localiza varias fichas cercanas a la pregunta y las coloca ante el especialista. Este prepara la conferencia combinando sus conocimientos previos con las fichas recuperadas.

Esta imagen sencilla explica la lógica de la generación aumentada por recuperación, o RAG, por sus siglas en inglés. En una implementación habitual, los documentos se dividen en fragmentos y se indexan; la pregunta se envía a una búsqueda semántica, léxica o híbrida; los mejores fragmentos se recuperan, posiblemente se reordenan mediante un reranker y se incorporan al contexto; y el modelo genera la respuesta utilizando la pregunta y los fragmentos recibidos. El [artículo original de RAG](https://arxiv.org/abs/2005.11401) formuló el método como una combinación de la memoria paramétrica del modelo y una memoria externa no paramétrica.

RAG es apropiado para colecciones documentales grandes, cambiantes y actualizables. Las políticas internas, la documentación técnica, las bases de conocimiento de soporte, los contratos y las noticias son ejemplos en los que cada pequeño cambio no debería exigir modificar los pesos del modelo. Es posible actualizar documentos, mostrar las fuentes de una respuesta y aplicar los permisos de cada usuario antes de la recuperación. Sin embargo, RAG no garantiza respuestas correctas: puede no recuperar el fragmento adecuado, seleccionarlo sin el contexto necesario o utilizar mal un documento que sí ha recibido. Por tanto, la fragmentación, la indexación, el reranking, el control de acceso y la evaluación de respuestas forman parte del propio sistema; no son detalles secundarios.

## CAG: poner la pequeña biblioteca sobre la mesa una sola vez

Ahora supongamos que nuestra colección sobre moscas africanas es pequeña, está bien delimitada, cambia poco y cabe en la ventana de contexto del modelo. En ese caso, quizá no sea necesario volver a buscar entre las fichas para cada conferencia. Podemos colocar la colección pertinente en la mesa del especialista desde el principio, introducir todo el material una vez en la sesión y conservar los cálculos de la parte compartida. Para la conferencia de la semana siguiente sobre moscas de alas rojas en Etiopía, esa colección preparada sigue disponible y solo hay que procesar la pregunta nueva. Si se ha incorporado una fuente esencial, también habrá que actualizar la caché.

En este artículo, CAG significa **Cache-Augmented Generation**, o generación aumentada por caché. La idea central consiste en precargar una cantidad limitada de conocimiento en el contexto largo del modelo y reutilizar su estado computacional, normalmente la caché KV, en solicitudes posteriores. Así se elimina la recuperación en tiempo real y se reduce el riesgo de seleccionar un fragmento irrelevante. El [artículo que presenta CAG](https://arxiv.org/abs/2412.15605) propone este enfoque cuando la base de conocimiento es limitada, manejable y puede precargarse en el contexto. El término es más reciente y menos consolidado que RAG; no conviene llamar CAG automáticamente a cualquier uso de caché o de contexto largo.

Esto no equivale a que el modelo aprenda o recuerde permanentemente el material. Una vez eliminada o invalidada la caché, el modelo no conserva esa colección como conocimiento nuevo en sus pesos. CAG tampoco consiste simplemente en reutilizar algunos fragmentos recuperados durante una conversación anterior. Su rasgo distintivo es preparar el conocimiento compartido y reutilizar sus cálculos, en lugar de volver a recuperar material para cada pregunta. Si la colección es grande, cambia con frecuencia, tiene permisos distintos para cada usuario o contiene mucho material irrelevante para cada consulta, el coste de llenar el contexto, la memoria de la caché y la dificultad de invalidarla pueden anular sus ventajas. Algunas publicaciones también utilizan CAG con otro significado, como Context-Augmented Generation. Por ello, el diseño y el contrato de un proyecto deben especificar la definición adoptada.

## KAG: construir un mapa del conocimiento y una ruta de razonamiento

Tras varias conferencias exitosas, pedimos a nuestro especialista que analice las relaciones entre hábitats, vectores de enfermedades, condiciones climáticas y distribución de distintas especies de moscas en varios países africanos. Esta vez no bastan unas pocas fichas con vocabulario parecido. Sus estudiantes examinan las fuentes, registran especies, países, hábitats, enfermedades y sus relaciones en una estructura definida, vinculan cada afirmación con su fuente original y formulan las reglas necesarias. Cuando llega una pregunta, la descomponen en subpreguntas y elaboran la respuesta recorriendo relaciones, consultando el texto original y, cuando corresponde, realizando cálculos o inferencias.

Este ejemplo se aproxima a la generación aumentada por conocimiento, o KAG. El término no designa de manera completamente uniforme un único estándar, pero el marco presentado en el [artículo de KAG](https://arxiv.org/abs/2409.13731) combina un grafo de conocimiento, fragmentos de texto, indexación mutua, una representación lógica de la pregunta y un motor de razonamiento híbrido. Su objetivo es compensar las limitaciones de una recuperación basada únicamente en similitud vectorial, especialmente en relaciones temporales y numéricas, reglas de un dominio y preguntas de varias etapas. Desde el punto de vista de la arquitectura, KAG puede entenderse como un miembro más estructurado y orientado al razonamiento de la amplia familia de sistemas aumentados con conocimiento, no necesariamente como un mundo separado de RAG.

Por tanto, KAG no debería reducirse a «RAG con más documentos» ni a «enviar varios agentes a investigar». Una parte esencial consiste en estructurar el conocimiento y guiar la recuperación y el razonamiento mediante relaciones y reglas. Es atractivo en ámbitos como regulaciones interconectadas, conocimiento médico especializado, cadenas de suministro o diagnóstico de sistemas complejos, donde la respuesta no se encuentra en un único párrafo. Esa capacidad también tiene un coste considerable: diseñar esquemas u ontologías, extraer y alinear conocimiento, conservar los vínculos con las fuentes, actualizar el grafo y evaluar las rutas de razonamiento exige más ingeniería que un RAG sencillo. El modelo central puede permanecer fijo al responder, aunque algunos marcos de KAG también entrenen modelos o componentes auxiliares para mejorar el rendimiento.

## Fine-tuning: modificar capacidades o comportamiento mediante entrenamiento

Pasamos ahora a otra familia. Imaginemos que nuestro modelo fundacional es como un médico general: posee conocimientos médicos amplios, pero necesita comportarse de otra manera en una tarea especializada y recurrente. El médico se forma en cirugía cardíaca y después puede recibir una preparación adicional en un campo más limitado, como las intervenciones sobre la válvula aórtica. Tras esa formación, no necesita volver a poner todos los libros de estudio sobre la mesa para cada paciente: el efecto del aprendizaje permanece en sus habilidades y patrones de decisión. Del mismo modo, el ajuste fino, o fine-tuning, continúa el entrenamiento de un modelo de lenguaje con datos específicos y modifica sus parámetros o los parámetros que se le han añadido.

El fine-tuning no es un método único. En el ajuste completo cambian todos los pesos o una gran parte de ellos. Los métodos eficientes en parámetros, como LoRA, mantienen fijos los pesos originales y entrenan pequeñas matrices o adaptadores. Aunque los pesos base no cambien con LoRA, el sistema resultante sí incorpora un comportamiento nuevo aprendido, porque los parámetros añadidos están activos durante la inferencia. El [artículo de LoRA](https://arxiv.org/abs/2106.09685) mostró que es posible adaptar un modelo a tareas posteriores entrenando muchos menos parámetros.

Este enfoque resulta valioso cuando queremos establecer un patrón de comportamiento estable: clasificación especializada, extracción estructurada, respeto de un formato de salida, uso correcto de la terminología de un ámbito, imitación de un estilo o una tarea que todavía no es suficientemente consistente con un prompt y unos pocos ejemplos. No obstante, la analogía médica no debe confundirnos. El fine-tuning no garantiza por sí solo la competencia, el juicio ni la precisión científica de un especialista humano. El modelo aprende mejor los patrones estadísticos de sus datos de entrenamiento; si esos datos son incompletos, sesgados o contradictorios, las mismas debilidades pueden aparecer en el comportamiento nuevo.

Para información que cambia con frecuencia, requiere citas precisas o debe seleccionarse según los permisos del usuario, el fine-tuning no suele ser un sustituto adecuado de RAG. Actualizar una circular en la colección documental es más sencillo que crear una nueva versión del modelo, y eliminar un hecho de sus pesos no es tan simple como borrar un documento del índice. Antes de elegir esta vía deben valorarse el coste del entrenamiento, el riesgo de sobreajuste o de pérdida de capacidades anteriores, las filtraciones de datos sensibles, la gestión de versiones y la necesidad de una evaluación rigurosa.

## Instruction tuning: ajuste fino para comprender y seguir instrucciones

Nuestro médico puede ser un excelente especialista y, aun así, no saber explicar un tema de acuerdo con las necesidades de su interlocutor. Un estudiante de primer curso necesita una introducción; otro cirujano, detalles técnicos; y un paciente, un lenguaje sencillo y prudente. Practicar con instrucciones y ejemplos de respuestas deseables, como «explica este concepto a un estudiante de grado», «organiza la respuesta en tres partes» o «indica claramente cuándo no hay información suficiente», puede mejorar su manera de responder a las instrucciones.

El ajuste por instrucciones, o instruction tuning, suele ser un tipo de fine-tuning supervisado con ejemplos formados por una instrucción, una entrada y una respuesta deseada. El objetivo no es únicamente incorporar conocimiento temático: el modelo debe reconocer la intención de la instrucción, respetar el formato y las restricciones, y generalizar lo aprendido a instrucciones no vistas. El trabajo [FLAN](https://arxiv.org/abs/2109.01652) mostró que entrenar con tareas expresadas mediante instrucciones en lenguaje natural puede mejorar el rendimiento zero-shot en tareas no vistas.

La relación es sencilla: todo instruction tuning es una forma de fine-tuning, pero no todo fine-tuning es instruction tuning. Si entrenamos un modelo únicamente para identificar un tipo de documento o predecir una etiqueta concreta, hacemos fine-tuning. Si lo entrenamos con instrucciones variadas y respuestas de ejemplo para que siga mejor las órdenes, hacemos instruction tuning. Muchos modelos que incluyen «Instruct» o «Chat» en su nombre son versiones entrenadas de un modelo fundacional. El ajuste por instrucciones tampoco aporta automáticamente información en tiempo real, documentos nuevos de una organización ni capacidad de citar fuentes; suele emplearse junto con RAG, CAG o KAG.

## Comparación de un vistazo

| Método | ¿Añadir conocimiento requiere entrenar el modelo? | ¿De dónde procede el conocimiento o la capacidad? | Aplicación más adecuada | Limitación principal |
| --- | --- | --- | --- | --- |
| RAG | No, aunque los componentes del sistema pueden entrenarse | Algunos fragmentos recuperados de una fuente externa para cada pregunta | Documentación abundante y cambiante que requiere citas y control de acceso | Errores de recuperación, latencia de búsqueda y fragmentos irrelevantes |
| CAG | No | Una base de conocimiento limitada, precargada en el contexto y con sus cálculos en caché | Una base pequeña y relativamente estable con preguntas frecuentes | Capacidad del contexto, memoria de caché, coste del prefill e invalidación de la caché |
| KAG | No; pueden entrenarse componentes auxiliares | Un grafo de conocimiento, textos fuente, reglas y razonamiento guiado | Relaciones complejas, preguntas de varias etapas y reglas temporales o numéricas | Mayor coste de construcción y mantenimiento, y evaluación más compleja |
| Fine-tuning | Sí: pesos del modelo o adaptadores | Ejemplos de entrenamiento de un ámbito o una tarea | Comportamiento estable, formatos de salida, terminología y tareas especializadas recurrentes | Coste de entrenamiento y versionado, dificultad para corregir conocimiento y riesgos de degradación o filtración |
| Instruction tuning | Sí: es un subconjunto del fine-tuning | Ejemplos de instrucciones y respuestas deseadas en una o varias tareas | Seguir instrucciones, generalizar a órdenes nuevas y adaptar la respuesta | No sustituye el conocimiento nuevo, la recuperación de fuentes ni el control de acceso |

## ¿Qué método conviene elegir?

La elección correcta empieza por identificar el tipo de fallo, no por el nombre de una tecnología. Si el modelo desconoce la respuesta o debe responder basándose en la última versión de los documentos, el problema es de conocimiento. Si tiene la información, pero no produce el formato, el tono o el enfoque deseado, el problema se relaciona más con el comportamiento y las capacidades. Confundir ambos suele encarecer el proyecto y volver ambigua su evaluación.

En un problema de conocimiento, el tamaño, la frecuencia de cambio y la estructura de las fuentes son determinantes. Si los documentos son numerosos, se actualizan continuamente o la respuesta debe indicar una fuente precisa, RAG es un punto de partida más natural. Si la colección es pequeña, estable, compartida, cabe en el contexto y recibe muchas preguntas, CAG puede eliminar la recuperación en tiempo real y reducir la latencia; pero solo después de medir el coste del prefill y el consumo de memoria, y de evaluar la política de invalidación de la caché. Si la respuesta depende de conectar hechos, relaciones explícitas, reglas especializadas, cálculos o razonamiento en varias etapas, merece la pena estudiar KAG o arquitecturas similares basadas en grafos de conocimiento y razonamiento.

Para un problema de comportamiento, primero hay que establecer una referencia con un prompt claro, salida estructurada y algunos ejemplos bien elegidos. Si ese enfoque sigue siendo inestable, demasiado extenso o caro a escala real, y disponemos de ejemplos de entrenamiento de calidad, el fine-tuning puede tener sentido. Si el objetivo principal es seguir instrucciones diversas y generalizar la manera de responder, el instruction tuning es la forma más específica de esa elección. En ambos casos, el conjunto de evaluación independiente debe estar preparado antes del entrenamiento. De lo contrario, mejorar en los ejemplos de entrenamiento puede confundirse con mejorar el producto.

Algunos ejemplos prácticos aclaran la decisión:

- Un asistente que responde con las últimas políticas y circulares de una organización: **RAG**, con control de acceso y citas a los apartados correspondientes.
- Preguntas frecuentes sobre un manual técnico breve y estable que cabe completo en el contexto: **CAG**, tras comparar su coste y latencia reales con los de RAG.
- Análisis de normas con referencias cruzadas entre artículos, cláusulas, fechas de vigencia y excepciones: **KAG**, o una combinación de RAG, un grafo de conocimiento y un motor de reglas.
- Conversión masiva de solicitudes de soporte a una estructura JSON fija, cuando el prompt y los ejemplos few-shot no logran suficiente consistencia: **fine-tuning**, o un método eficiente en parámetros como LoRA.
- Creación de una versión de un modelo fundacional que comprenda mejor instrucciones variadas y adapte sus respuestas a distintos públicos: **instruction tuning**.

En un proyecto real, la respuesta suele ser una combinación. Podemos adaptar un modelo Instruct con LoRA para especializar su comportamiento y después utilizar RAG para darle acceso a documentos actualizados. Podemos almacenar en caché una pequeña parte del conocimiento estable, recuperar los documentos cambiantes y recurrir a un grafo de conocimiento para algunas preguntas complejas. La combinación es útil cuando cada componente resuelve un fallo concreto. Añadir más capas sin criterios de evaluación solo complica el sistema.

## Cinco malentendidos frecuentes

El primero es creer que introducir un documento en el contexto equivale a aprenderlo. RAG y CAG no incorporan conocimiento permanente a los parámetros del modelo; al eliminar el contexto o la caché, también se pierde el acceso a ese conocimiento temporal. El segundo es pensar que RAG elimina las alucinaciones. Solo aumenta la posibilidad de apoyarse en evidencia externa; si fallan la recuperación o la generación, la respuesta puede seguir siendo incorrecta.

El tercero es considerar el fine-tuning una forma adecuada de «meter todos los documentos de la empresa en el modelo». El conocimiento cambiante, que debe poder eliminarse o que requiere citas, normalmente debería permanecer fuera de los pesos. El cuarto es atribuir a CAG una memoria ilimitada o gratuita: la ventana de contexto, el tiempo de prefill, la memoria de la caché KV y la política de actualización siguen siendo restricciones reales. El quinto es tratar KAG como una nueva etiqueta para RAG avanzado o para una investigación realizada por agentes. Si no hay conocimiento estructurado, relaciones y razonamiento guiado, conviene describir la arquitectura con un nombre más preciso.

## Conclusión: primero el problema, después el método

RAG, CAG y KAG son, principalmente, tres maneras de aportar conocimiento externo a un modelo cuyos parámetros permanecen fijos: recuperar fragmentos pertinentes para cada solicitud, preparar y almacenar en caché una colección limitada, o estructurar el conocimiento y guiar el razonamiento mediante relaciones y reglas. El fine-tuning es una familia de métodos de entrenamiento para modificar comportamientos o capacidades. El instruction tuning es su subconjunto dedicado a mejorar el seguimiento de instrucciones.

Si al modelo «le falta la información necesaria», primero debemos pensar en cómo proporcionarle ese conocimiento. Si «tiene la información, pero no realiza bien la tarea», cobran relevancia el entrenamiento o la adaptación del comportamiento. Esta distinción sencilla evita uno de los errores más costosos de los proyectos con modelos de lenguaje: elegir una tecnología atractiva antes de precisar qué problema debe resolver.

## Fuentes y lecturas adicionales

- [On the Opportunities and Risks of Foundation Models](https://crfm.stanford.edu/report)
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
- [Don't Do RAG: When Cache-Augmented Generation is All You Need for Knowledge Tasks](https://arxiv.org/abs/2412.15605)
- [KAG: Boosting LLMs in Professional Domains via Knowledge Augmented Generation](https://arxiv.org/abs/2409.13731)
- [Finetuned Language Models Are Zero-Shot Learners](https://arxiv.org/abs/2109.01652)
- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)
