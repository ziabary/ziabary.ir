---
title: "¿Cuándo puede considerarse fiable una prueba producida por IA?"
slug: when-can-ai-output-be-evidence-es
translationGroup: when-can-ai-output-be-evidence
lang: es
date: "2026-10-17"
faDate: "17 de octubre de 2026"
draft: true
category: Gobernanza de IA
excerpt: "La autenticidad de los datos no garantiza una conclusión fiable. El origen de la entrada, la validez del método y la posibilidad de defender un resultado concreto son eslabones distintos de la cadena probatoria."
readTime: "11 min"
author: Mehran Ziabary
toc: auto
related:
  - what-does-95-percent-accuracy-mean-for-a-factory-es
  - ai-contract-deliverables-es
tags:
  - Gobernanza de IA
  - Fiabilidad de las pruebas
  - Auditoría de IA
  - Procedencia de los datos
  - Rendición de cuentas
---

*Si un sistema de IA llega a una conclusión a partir de una imagen, un expediente, datos industriales o documentos financieros, ¿podemos aceptarla como una prueba fiable? La autenticidad de los datos originales es solo una parte de la respuesta. También debemos demostrar que el método de análisis es fiable y que esa conclusión concreta se deriva correctamente de los datos.*

Hasta hace unos años, la autenticidad de un documento parecía una cuestión relativamente clara: había que comprobar que la imagen no se había manipulado, que el archivo procedía del momento y la fuente declarados, que la firma era válida o que los datos se habían extraído de un sistema fiable. La IA generativa ha complicado el problema porque permite tanto falsificar el material original como producir un análisis aparentemente experto de un material auténtico que resulte poco fiable en su método o en su conclusión. Son problemas próximos, pero resolver uno no resuelve el otro.

Un vídeo puede ser auténtico y, aun así, un sistema de visión interpretarlo mal. Una imagen médica puede ser genuina mientras que el modelo de diagnóstico no está suficientemente validado para la población en cuestión. Los sensores de una fábrica pueden registrar datos sin manipulación y el modelo de mantenimiento predictivo extraer una conclusión con un error inaceptable para ese uso industrial. En todos estos casos, la autenticidad de la entrada puede estar acreditada sin que lo esté la validez de la inferencia.

Los [materiales de la reunión del 15 de octubre de 2026 del Comité Asesor sobre las Reglas de Prueba de los tribunales federales de Estados Unidos](https://www.uscourts.gov/sites/default/files/document/2026-10-evidence-rules-agenda-book.pdf#page=5) tratan ambas cuestiones por separado: autenticar materiales que podrían haberse falsificado con IA y determinar cuándo un análisis producido por IA puede admitirse como prueba. Los textos examinados son propuestas y borradores de trabajo, no reglas definitivas en vigor. Su interés para este artículo reside menos en los detalles del procedimiento estadounidense que en la forma en que aclaran un problema más amplio de gobernanza de la IA.

## La autenticidad y la fiabilidad del análisis son preguntas distintas

El [borrador de trabajo de la regla 901(c)](https://www.uscourts.gov/sites/default/files/document/2026-10-evidence-rules-agenda-book.pdf#page=150) propone un procedimiento en dos etapas cuando se impugna la autenticidad de una prueba alegando su fabricación mediante IA. Quien la cuestiona debe aportar primero indicios suficientes para justificar una investigación; no basta con decir que podría ser falsa. Superado ese umbral, quien presenta el material debe demostrar que es más probable que sea auténtico que falso. El diseño busca evitar tanto la admisión de pruebas fabricadas como el rechazo de materiales genuinos por la simple afirmación de que quizá los haya creado una IA.

El [borrador de trabajo de la regla 707](https://www.uscourts.gov/sites/default/files/document/2026-10-evidence-rules-agenda-book.pdf#page=173) aborda otra situación: se presenta una salida de IA sin testigo perito, aunque una declaración equivalente de un testigo estaría sometida a los requisitos de prueba pericial de la regla 702. La parte que la aporta debe acreditar una base suficiente de datos, métodos fiables y su aplicación fiable al caso concreto. Para establecer la admisibilidad, el borrador contempla normalmente la explicación de un perito, aunque permite considerar otros medios de acreditación en circunstancias excepcionales. Son requisitos propuestos para un contexto judicial específico. Aplicar su lógica a una administración, un hospital o una fábrica es un argumento de gobernanza, no una extensión automática de la regla jurídica a esos ámbitos.

Fuera del tribunal, las preguntas de fondo siguen siendo si los datos son auténticos y si la conclusión obtenida a partir de ellos es fiable. Podemos responder afirmativamente a la primera sin disponer todavía de pruebas suficientes para responder a la segunda.

## La precisión global no valida este resultado concreto

En [«¿Qué significa un 95 % de precisión para una fábrica?»](/es/articles/what-does-95-percent-accuracy-mean-for-a-factory-es/), mi argumento era que una cifra general de rendimiento dice poco sin conocer la distribución de los errores, su coste y las condiciones de operación. La distinción es todavía más importante al evaluar una salida concreta. Incluso una precisión del 95 % medida correctamente en laboratorio no demuestra que el resultado número 2745, producido hoy, sea válido. La prueba de rendimiento describe un comportamiento estadístico sobre una muestra; la decisión real afecta a un caso individual.

Antes de apoyarnos en la salida, debemos separar tres niveles: la autenticidad de la entrada, es decir, que los datos analizados sean genuinos y no estén alterados; la validez del modelo o del método, que exige una evaluación suficiente en condiciones comparables; y la validez de la inferencia concreta, que requiere poder examinar, reconstruir y defender ese resultado teniendo en cuenta la versión del modelo, los datos, los ajustes y el proceso. Las tres preguntas no tienen por qué recibir la misma respuesta, y acreditar una no sustituye las pruebas necesarias para las otras.

## Una salida es el producto de un proceso

Un error frecuente consiste en tratar el informe generado por IA como un archivo independiente. El informe se ha producido, convertido en PDF y colocado sobre la mesa, por lo que la revisión puede limitarse al documento final. Sin embargo, su valor probatorio depende del proceso que lo produjo. Revisar una conclusión puede exigir conocer el modelo y su versión exacta, los datos de entrada, el preprocesamiento, las instrucciones del usuario y del sistema y las herramientas utilizadas. Si existe generación aumentada por recuperación (RAG), las fuentes recuperadas y sus versiones también forman parte de esas pruebas.

Registrar estos elementos tampoco garantiza siempre una reproducción palabra por palabra. Cuando la ejecución no es determinista, debemos distinguir entre generar otra vez la misma frase y comprobar la estabilidad de la conclusión bajo condiciones controladas. Lo importante es que pueda inspeccionarse la cadena de producción, identificar qué partes son reproducibles y recurrir a evaluaciones estadísticas o pruebas adicionales para estudiar la incertidumbre restante.

En [«Contratos de IA: ¿qué debemos recibir exactamente?»](/es/articles/ai-contract-deliverables-es/), abordé la misma cuestión como un requisito de ingeniería: el modelo, los datos, las instrucciones, los criterios de evaluación, las versiones y los registros de ejecución forman parte de la entrega real porque permiten volver a examinar los resultados. Aquí ese requisito adquiere otra consecuencia. Sin esos registros, puede resultar difícil defender una salida importante como prueba.

## ¿Quién debe demostrar la fiabilidad del resultado?

Si una administración, un banco, un hospital o una aseguradora toma una decisión apoyándose en IA y alguien la impugna, ¿quién debe aportar las pruebas? ¿Debe la persona afectada demostrar desde fuera que el modelo falló, o corresponde a la organización acreditar que utilizó un sistema adecuado y un proceso defendible? La lógica de la regla 707 propuesta sitúa la responsabilidad de acreditar la fiabilidad en quien presenta la salida de IA como prueba. A mi juicio, esa orientación también merece atención al diseñar la responsabilidad de las organizaciones fuera del tribunal.

La evidencia exigida debe seguir siendo proporcional al efecto de la decisión. Una sugerencia para redactar un texto interno no justifica la misma carga que una denegación de crédito, un diagnóstico médico, la exclusión de un servicio o una decisión industrial costosa. Pero, en decisiones importantes, tampoco es razonable trasladar toda la investigación a quien no tiene acceso a los datos, el modelo y los registros de la organización. Cuanto mayor sea el impacto, mayor debería ser su responsabilidad de demostrar la idoneidad del sistema y la validez del proceso.

## ¿Cuándo aporta valor la supervisión humana?

Una respuesta sencilla consiste en llamar a la salida de IA «solo una recomendación» y dejar la aprobación final a una persona. Sin embargo, si el médico, especialista u operador se limita a aceptar el resultado, su presencia no mejora por sí sola las pruebas que lo sostienen. La supervisión humana tiene sentido cuando la persona dispone de información suficiente, autoridad real y tiempo para revisar la conclusión de forma independiente. De lo contrario, su participación puede hacer todavía menos clara la frontera entre el juicio humano y el resultado algorítmico.

Supongamos que el sistema estima un riesgo del 87 % y el especialista copia esa cifra en su informe. ¿Tenemos una opinión pericial independiente o una salida del algoritmo con firma humana? Si la base del análisis procede del modelo, añadir una firma no sustituye su validación. El debate sobre la [relación entre el borrador de la regla 707 y la regla 702 sobre prueba pericial](https://www.uscourts.gov/sites/default/files/document/2026-10-evidence-rules-agenda-book.pdf#page=173) también muestra la necesidad de distinguir entre un perito que explica la fiabilidad del sistema y alguien que simplemente acompaña su resultado. La cuestión es aclarar la responsabilidad y el fundamento de la opinión.

## La explicación del modelo no es un registro de auditoría

Podemos preguntar al modelo por qué ha llegado a una conclusión. Su respuesta puede ser clara y coherente sin representar con exactitud el mecanismo que produjo la decisión. Esa explicación puede aportar información auxiliar, pero no sustituye los registros verificables del proceso. Entre los elementos que pueden examinarse están la entrada, la versión del modelo, las fuentes recuperadas, las llamadas a herramientas, los ajustes de inferencia, los resultados intermedios registrables, las políticas aplicadas y los resultados de validación.

La diferencia resulta especialmente visible en un agente autónomo. «Elegí esta herramienta porque era la más adecuada» ofrece menos evidencia que un registro que indique qué herramienta se invocó, cuándo, con qué parámetros y bajo qué identidad y permisos. Registrar la identidad y la autorización no significa guardar contraseñas o claves secretas en los registros; lo relevante es acreditar la acción y la autoridad con la que se realizó. Auditar exige poder comparar el relato del sistema con lo que realmente quedó registrado durante la ejecución.

## La procedencia de los datos ayuda a defender la conclusión

Hasta aquí hemos supuesto que la entrada es auténtica, aunque la IA ha vuelto más difícil sostener esa suposición. Pueden falsificarse imágenes, audio, vídeo y texto; al mismo tiempo, la disponibilidad de esas técnicas facilita negar documentos genuinos. La regla 901(c) propuesta intenta equilibrar ambos riesgos. Quien diseña el sistema debe considerar además otro problema: si un modelo obtiene una conclusión aparentemente lógica a partir de un documento falso, la corrección de los pasos del análisis no basta para validar el resultado completo.

Por eso la procedencia y el historial de los datos no son solo asuntos de seguridad o gestión de información; forman parte de la posibilidad de defender una conclusión. En aplicaciones sensibles, puede ser necesario demostrar de dónde proceden los datos, cuándo se registraron, qué transformaciones sufrieron y quién accedió a ellos. La lógica de la cadena de custodia puede orientar esa capacidad en sistemas de IA, aunque su implementación y grado de detalle deben ser proporcionales a la aplicación y sus riesgos.

## Una prueba fiable debe poder cuestionarse

Si una organización afirma que «el sistema ha dado este resultado y el algoritmo es propietario», todavía no ha ofrecido una vía independiente para verificar su afirmación. Exigir todo el código fuente y toda la propiedad intelectual en cualquier caso tampoco es necesariamente proporcionado. Una auditoría eficaz necesita acceso suficiente para verificar. Ese acceso puede facilitarse mediante documentación del método, datos pertinentes, especificaciones de versión, tasas de error, condiciones de validación y posibilidades de realizar pruebas independientes.

Cuestionar una salida no requiere hacer públicos todos los detalles del modelo, pero sí disponer de un camino para examinar la afirmación de la organización y responder a las objeciones. Un resultado que no ofrece ninguna vía independiente de crítica o prueba constituye un apoyo débil, desde la gobernanza, para una decisión importante, por preciso y profesional que parezca. La protección de la propiedad intelectual y el acceso efectivo para auditar deben contemplarse conjuntamente al diseñar los mecanismos de acceso.

## La evidencia necesaria debe corresponder al impacto de la decisión

No todas las salidas de IA requieren el mismo escrutinio. Si el modelo resume mal un correo, revisar por completo la procedencia de los datos y su validación puede costar más que el problema. Un informe jurídico, un diagnóstico médico, una evaluación financiera o una orden de control de una fábrica tienen consecuencias distintas. A medida que aumenta el impacto, puede justificarse exigir más evidencia: registro de datos y versiones, pruebas independientes, revisión humana sustantiva, posibilidad de impugnación, conservación de registros auditables y, en los casos más sensibles, evaluación por un especialista independiente.

Por tanto, en lugar de preguntar si una salida de IA es válida en términos generales, deberíamos preguntar qué pruebas necesitamos para justificar su uso en esa decisión concreta. El cambio desplaza la discusión desde la confianza genérica en un modelo hacia la gobernanza del riesgo en una aplicación real. Permite a la organización determinar la profundidad de la revisión según las consecuencias del uso.

## De una salida a una cadena probatoria

La IA introduce una capa de inferencia entre los datos y las decisiones, y esa capa también debe poder examinarse. En muchas aplicaciones ya no basta con demostrar que el archivo original es auténtico. Hay que sostener por separado tres afirmaciones: los datos son genuinos, el método de análisis es fiable y esa conclusión concreta se deriva válidamente de esos datos y ese método. La ausencia de uno de los eslabones puede dejar un resultado de apariencia profesional con un valor probatorio limitado.

Los borradores jurídicos examinados no son reglas definitivas. Su valor para este argumento está en separar autenticidad y fiabilidad y en aclarar quién debe aportar las pruebas. La pregunta es más visible en un tribunal, pero no se limita a él. Siempre que una salida de IA sustente una decisión importante, debe quedar claro quién demuestra que se puede confiar en ella y con qué evidencia. «Lo ha dicho el modelo» no puede ser toda la respuesta.

A mi juicio, una salida de IA se acerca a una prueba fiable cuando existe detrás una cadena verificable desde los datos originales hasta la conclusión, que permite cuestionar, reconstruir y defender la decisión. Entregar el informe no pone fin al proceso: el camino que lo produjo también debe seguir abierto a preguntas y objeciones.
