---
title: "Un contrato de IA: ¿qué debemos recibir exactamente?"
slug: ai-contract-deliverables-es
translationGroup: ai-contract-deliverables
lang: es
date: "2026-09-26"
faDate: "26 de septiembre de 2026"
category: Producto y negocio
excerpt: "Un modelo o una demostración que funciona no bastan como entrega de un proyecto de IA. Guía práctica sobre criterios de aceptación, datos, pruebas, seguridad, operación, cambios de versión y salida del proveedor."
readTime: "14 min"
cover: /images/articles/ai-contract-deliverables/cover.png
author: "Mehran Ziabary"
toc: auto
related: []
draft: false
---

El sistema ya se ha entregado. La demostración funciona. El responsable del proyecto plantea unas preguntas al chatbot y recibe respuestas aceptables. Se firma el acta de aceptación y, unas semanas después, empiezan las primeras discrepancias:

- Con datos reales, las respuestas no alcanzan la precisión observada en la demostración.
- Los tiempos de espera aumentan al crecer el número de usuarios.
- Cambia la versión del modelo y empeora el rendimiento en algunas tareas.
- El coste del servicio supera la estimación inicial.
- Nadie tiene claro cuáles de estos problemas son defectos atribuibles al proveedor y cuáles quedan fuera de sus compromisos.

El problema no es necesariamente un modelo deficiente ni un proveedor que haya trabajado poco. A veces, lo que nunca se aclaró fue qué significa exactamente **«entregar un proyecto de IA»**. Expresiones como «alta precisión», «respuestas inteligentes», «compatibilidad con el idioma de trabajo», «escalable» o incluso «95 % de precisión» no son criterios de aceptación mientras no se definan sobre datos, usuarios, condiciones de ejecución y costes del error. Se parecen más a promesas que a compromisos medibles.

El contrato debe redactarse con asesoramiento jurídico y ajustarse a la legislación aplicable, al sector y a los riesgos de la organización. Este artículo trata del conjunto de elementos técnicos y de gestión que debe definirse antes de firmar. Así, el equipo jurídico podrá concretar las obligaciones, la dirección decidir si continuar o detener el proyecto y el equipo técnico comprobar los resultados.

## El modelo no es el producto terminado

Incluso en un proyecto de software convencional, entregar código sin documentación, pruebas, configuración ni procedimientos de operación es insuficiente. En un proyecto de IA, la distancia es mayor. Un modelo puede funcionar bien con datos de prueba y fallar en el proceso real. La respuesta puede ser correcta y llegar tarde; la precisión media puede parecer adecuada mientras los errores se concentran en los casos más costosos. El sistema puede funcionar el día de la entrega y cambiar de comportamiento al modificar el modelo, los datos o el prompt.

Por eso, el objeto del contrato debe abarcar más que «un modelo» o «un chatbot». Se compra un servicio integrado en un proceso real. Ese servicio recibe datos, produce decisiones o recomendaciones, se conecta con otros sistemas, a veces deriva casos a personas, genera costes y cambia con el tiempo. La entrega debe cubrir todo ese ciclo de vida.

Las [directrices del Gobierno británico para la contratación de IA](https://www.gov.uk/government/publications/guidelines-for-ai-procurement/guidelines-for-ai-procurement) recomiendan definir la necesidad a partir del problema y los resultados esperados, evaluar los datos antes de contratar, considerar las limitaciones técnicas y éticas e incluir la gestión del ciclo de vida desde el principio. El [Marco de Gestión de Riesgos de IA del NIST](https://www.nist.gov/itl/ai-risk-management-framework) también aborda el diseño, el desarrollo, el uso y la evaluación como un ciclo continuo. Estos marcos no sustituyen al contrato, pero comparten una advertencia: comprar IA no termina al adquirir una función que luce bien en una demostración.

## Primero hay que definir el problema que debe resolver el servicio

Antes de hablar de modelos, GPU o arquitectura, hay que responder a tres preguntas sin términos ambiguos:

1. ¿Quién utiliza el sistema y en qué momento de su trabajo?
2. ¿Qué decisión o actividad concreta mejora, acelera o abarata?
3. ¿Cuál es la situación de referencia actual si el sistema no existe?

Por ejemplo, «crear un asistente inteligente de recursos humanos» no define una entrega verificable. En cambio, «responder a las preguntas del personal sobre la normativa de permisos con la última versión de los documentos aprobados, citando la cláusula correspondiente y derivando los casos inciertos a un especialista» se acerca a un servicio que puede probarse. Esa frase identifica al usuario, la fuente, el tipo de respuesta, los límites de confianza y el tratamiento de las excepciones.

También hace falta una referencia de partida. Si hoy un especialista responde correctamente en el 80 % de los casos, pero tarda dos días, el valor del proyecto puede estar en reducir el tiempo de respuesta. Si una regla sencilla resuelve el mismo problema con menos coste y errores previsibles, utilizar un modelo complejo no es una ventaja. El artículo sobre [inversión en IA (en persa)](/articles/investment-in-ai/) examina el valor del problema y la adecuación de la inversión. El contrato debe convertir ese razonamiento en indicadores medibles.

## Convierta la «precisión» en un conjunto de pruebas y un coste del error

Una cifra de precisión dice muy poco si no se definen los ejemplos, la distribución de los datos y los tipos de error. La aceptación exige un conjunto de pruebas acordado que cubra casos habituales, límite, difíciles y fuera de alcance. Conviene reservar una parte hasta la evaluación final, sin entregarla previamente al desarrollador, para que el sistema no se optimice solo para ejemplos conocidos.

Para cada caso deben registrarse, como mínimo:

- La entrada y las condiciones de ejecución de la prueba.
- La respuesta o el comportamiento aceptable.
- El tipo y la gravedad del error.
- El método de evaluación y la persona o el rol responsable de juzgarlo.
- Las versiones de los datos, el modelo, el prompt y el software.
- El resultado de referencia y el del sistema propuesto.

No todos los errores tienen el mismo peso. Pasar por alto una avería peligrosa no equivale a generar una alerta adicional. Revelar un documento que el usuario no tiene permiso para ver no equivale a dar una respuesta incompleta. La puntuación agregada debe leerse junto con la tasa de errores críticos, los casos derivados a personas y el coste de la revisión humana. Un próximo artículo de esta serie, «¿Qué significa un 95 % de precisión para una fábrica?», desarrolla esta cuestión mediante un escenario industrial.

En sistemas generativos, las pruebas no consisten únicamente en unas preguntas con respuestas de referencia. Hay que comprobar si se recuperó el documento correcto, si la respuesta es fiel a la fuente, si las citas respaldan realmente las afirmaciones, cómo actúa el sistema cuando no encuentra respuesta y si respeta el formato y las restricciones operativas. [¿Cómo evaluar un buen modelo para persa? (en persa)](/articles/evaluating-language-models-for-persian/) distingue entre la calidad del modelo y la del sistema completo. El contrato debe mantener esa distinción.

## Los datos también forman parte de la entrega

Muchas discrepancias aparecen cuando el proyecto ya depende de los datos de la organización para entrenar, recuperar información o evaluar resultados. Estas preguntas necesitan respuestas claras:

- ¿Quién aporta los datos iniciales y quién responde por su calidad?
- ¿Qué versiones se utilizaron para el entrenamiento, la evaluación y la operación?
- ¿Cuáles son el origen, los permisos, los consentimientos y las restricciones de uso de cada conjunto?
- ¿Dónde se procesan y almacenan los datos y quién puede acceder a ellos?
- ¿A quién pertenecen los datos derivados, las etiquetas, los ejemplos de error y los comentarios de los usuarios?
- ¿Qué versiones deben entregarse, devolverse o eliminarse cuando termine el contrato?

«Los datos no se utilizan para entrenar» no responde a todas esas preguntas. Pueden transferirse a otros sistemas para generar respuestas, registrar eventos, mantener una caché, prestar soporte o evaluar el servicio. [Preservar la confidencialidad de los datos al utilizar API públicas](/es/articles/data-confidentiality-public-apis-es/) examina los límites del procesamiento y las limitaciones de los enfoques habituales. El contrato debe describir el flujo real de los datos, no solo las intenciones generales del proveedor.

## Exija un inventario técnico del sistema

El nombre comercial del modelo no basta. Un servicio de IA contiene muchos componentes y cualquiera de ellos puede alterar el resultado. El inventario de entrega debe incluir, como mínimo:

- Nombre y versión exactos de los modelos, pesos y adaptadores.
- Modelo de embeddings y componente de reordenación de resultados —reranker— en los sistemas de recuperación.
- Plantillas y versiones de los prompts y de las políticas del sistema.
- Versiones del código, las bibliotecas y el motor de ejecución, junto con los ajustes relevantes.
- Métodos de fragmentación, indexación y selección de documentos.
- Dependencias externas y API utilizadas.
- Configuración de los entornos de desarrollo, pruebas y producción.
- Limitaciones conocidas y casos fuera de alcance.

La finalidad de esta lista no es exigir que se revelen todos los secretos comerciales. Se trata de saber qué se ha probado y qué cambios obligan a repetir las pruebas. Si el proveedor puede sustituir el modelo sin avisar, la aceptación de hoy no garantiza el comportamiento de mañana. Pero exigir autorización formal para cualquier modificación menor puede paralizar la operación. La solución es clasificar los cambios: cuáles son ajustes operativos rutinarios, cuáles necesitan pruebas de regresión y cuáles requieren una nueva aceptación.

## Seguridad, acceso y registros son entregables

En un asistente documental, una respuesta correcta para un usuario no autorizado sigue siendo un fallo. En un agente, ejecutar correctamente una acción que nadie autorizó no es un éxito. El contrato debe precisar cómo se transmite la identidad del usuario, dónde se comprueba el acceso antes de recuperar información o ejecutar acciones, qué eventos se registran, cómo se gestionan los datos sensibles en los registros y la memoria, y quién debe detener el servicio, investigar y notificar un incidente de seguridad.

Las pruebas de seguridad tampoco deben limitarse al análisis de vulnerabilidades del software. La inyección de instrucciones a través de documentos, la elusión de los límites de acceso, las filtraciones entre sesiones, la ejecución repetida de herramientas, el abuso de entradas largas y el comportamiento cuando fallan servicios dependientes son ejemplos de pruebas propias de esta arquitectura. Su alcance debe corresponderse con las facultades reales del sistema. [Jev y Laya: cuando la IA decide en lugar de generar texto (en persa)](/articles/jev-laya-llm-decision-governance/) muestra por qué el registro de decisiones y los límites de autoridad cobran más importancia a medida que el sistema pasa de recomendar a ejecutar.

## La calidad está incompleta sin capacidad y coste

Un sistema que responde bien en una demostración con un único usuario puede generar colas largas o costes inaceptables bajo carga real. La entrega debe documentar las condiciones de las pruebas de carga:

- Número de usuarios y solicitudes simultáneos.
- Longitud habitual y máxima de las entradas y salidas.
- Tiempo hasta el inicio de la respuesta, tiempo de finalización y tasa de errores.
- Comportamiento de las colas, cancelación de solicitudes y límites de capacidad.
- Coste por solicitud o por resultado aceptable.
- Consumo de infraestructura y dependencia de la capacidad de proveedores externos.
- Comportamiento ante saturación o fallos.

Los promedios no bastan: también importan los percentiles de tiempo de respuesta y las condiciones desfavorables acordadas. El coste debe medirse por resultado aceptable, no solo por cada mil tokens o por hora de GPU. Si una salida barata necesita una revisión larga, parte del coste se ha trasladado al trabajo humano. [El coste real de ejecutar un LLM: comprar hardware, alquilar GPU o usar una API (en persa)](/articles/true-llm-cost-buy-rent-or-api/) ofrece un marco para ese cálculo.

## Documente la revisión humana y las excepciones

La «supervisión humana» tiene sentido cuando las personas disponen de tiempo, información y autoridad para intervenir. La entrega debe aclarar:

- ¿Qué resultados pueden utilizarse sin aprobación humana?
- ¿Qué casos deben derivarse a un revisor?
- ¿Qué evidencia recibe esa persona?
- ¿Cuándo puede rechazar o corregir la decisión del sistema?
- ¿Cómo se registra su corrección y se aprovecha para mejoras posteriores?
- ¿Cuál es el comportamiento seguro del sistema si no hay un revisor disponible?

Si un especialista debe comprobar de nuevo todas las respuestas desde cero, quizá el proyecto solo haya añadido una interfaz nueva al trabajo anterior. Si no se revisa ningún resultado de alto riesgo, la organización ha delegado de hecho la autoridad en el sistema. Los criterios de aceptación también deben medir el tiempo y el coste de la supervisión humana.

## La operación comienza al día siguiente de la entrega

El modelo y los datos no permanecen inmóviles. Cambian el lenguaje de los usuarios, la combinación de solicitudes, las normas internas, las amenazas y los servicios externos. Por tanto, el contrato debe responder a las necesidades del periodo de operación:

- ¿Qué indicadores se supervisan y qué umbrales activan las alertas?
- ¿Cómo se registran, priorizan y resuelven los ejemplos de error?
- ¿Quién puede modificar el modelo, los datos o el prompt?
- ¿Cómo se conserva o se restaura la versión anterior?
- ¿Con qué conjunto y con qué frecuencia se ejecutan las pruebas de regresión?
- ¿Cómo se comunican los incidentes, la pérdida de calidad y los cambios importantes?
- ¿Hasta cuándo continúan el soporte, las actualizaciones y el mantenimiento?

[ISO/IEC 42001](https://www.iso.org/standard/42001) aborda la IA mediante un sistema de gestión que incluye mantenimiento y mejora continuos. Esa perspectiva resulta útil para el contrato aunque la organización no busque una certificación. La operación forma parte del propio sistema y debe planificarse dentro del proyecto.

## Evalúe la salida antes de entrar

El último entregable es la capacidad de continuar sin el proveedor actual. Eso no exige que todos los acuerdos incluyan la entrega de todo el código o de todos los pesos propietarios: los modelos de negocio y los acuerdos de propiedad intelectual pueden variar. Pero la organización debe saber qué conservará al finalizar el contrato y cuánto costará cambiar de proveedor.

El paquete de salida puede incluir datos depurados y versionados, esquemas de datos, preguntas y resultados de evaluación, configuraciones y prompts de la organización, documentación de interfaces, informes de incidentes, inventarios de dependencias, procedimientos de copia de seguridad y un periodo acordado de asistencia a la migración. Si el historial de evaluación, las opiniones de los usuarios y las reglas de negocio permanecen únicamente en el sistema del proveedor, la organización pierde conocimiento del proyecto aunque reciba los datos en bruto.

Las directrices británicas de contratación de IA también destacan evitar la dependencia que impide cambiar de proveedor, considerar los estándares abiertos y la propiedad intelectual, transferir conocimiento y prever el mantenimiento. Estas cuestiones no deben posponerse hasta el final del contrato. La capacidad para negociar la salida es mayor antes de entrar.

## Vincule los pagos a evidencia, no solo a fechas

En proyectos con mucha incertidumbre, los pagos y las decisiones de continuidad deben apoyarse en hitos evaluables. Cada hito necesita un entregable definido y una pregunta que la evidencia permita responder.

| Etapa | Entregable principal | Pregunta para decidir |
|---|---|---|
| Definición del problema | Servicio, situación de referencia, datos disponibles, riesgos y alternativa más sencilla | ¿Merece la pena continuar? |
| Prototipo | Flujo técnico limitado y reproducible con datos de muestra | ¿Es viable el enfoque en principio? |
| Piloto | Pruebas sobre un flujo real limitado, conjunto de pruebas independiente, coste y supervisión humana | ¿Crea valor la solución en la práctica? |
| Producción | Seguridad, capacidad, monitorización, soporte, recuperación y responsabilidades | ¿Está preparado el sistema para una operación controlada? |
| Salida o transición | Datos, documentación, historial de evaluación y asistencia a la migración | ¿Puede la organización mantener el servicio? |

Un prototipo que funciona no equivale a la aceptación para producción. Tampoco debe presentarse un piloto con unos pocos usuarios colaboradores y datos seleccionados como sustituto de una prueba real. Cada etapa debe reducir una incertidumbre concreta y mantener abierta la posibilidad de detenerse o cambiar de dirección.

## Lista mínima para la entrega de un proyecto de IA

Si hubiera que resumir todo lo anterior en una página, estas doce preguntas necesitarían respuesta escrita antes de firmar. Constituyen una base mínima para determinar qué se ha entregado realmente.

1. ¿Cuáles son el problema, el usuario y el resultado esperado?
2. ¿Cuáles son la situación de referencia y la alternativa sin IA?
3. ¿Qué entra en el alcance y qué queda excluido?
4. ¿Cuáles son el conjunto de pruebas de aceptación y el método de evaluación?
5. ¿Cómo se clasifican los errores por coste y gravedad?
6. ¿De dónde proceden los datos, qué derechos los regulan, qué versiones se utilizan y dónde se procesan?
7. ¿Cuál es el inventario de modelos, software, prompts y configuración?
8. ¿Cómo se prueban la seguridad, el control de acceso y los registros?
9. ¿En qué condiciones se miden la capacidad, el tiempo de respuesta y el coste?
10. ¿Dónde intervienen las personas y con qué autoridad?
11. ¿Cómo se gestionan los cambios de versión, la monitorización, los incidentes y la repetición de pruebas?
12. ¿Qué se entrega al finalizar el contrato y cuál es el proceso de salida?

Esta lista no sustituye al anexo técnico detallado, la evaluación de seguridad, el acuerdo de nivel de servicio ni el contrato jurídico. Su valor está en evitar que el proyecto empiece con una expresión como «sistema inteligente de alta precisión» y que, el día de la entrega, comprador y proveedor descubran que imaginaban dos cosas distintas.

## Un buen contrato aclara el objeto de las discrepancias

Ningún contrato anticipa todos los cambios tecnológicos ni todos los comportamientos de un modelo. Ni siquiera el conjunto de pruebas más completo representa todo el futuro. Un objetivo realista es que ambas partes sepan qué han construido, cómo lo miden, qué cambios exigen nuevas pruebas, quién responde durante la operación y cómo corregir o detener el trabajo si el resultado es insuficiente.

El modelo puede cambiar durante el contrato. Los datos pueden mejorar. Un método más sencillo puede sustituir a la arquitectura inicial. Esos cambios no son fracasos contractuales si el problema, los criterios de aceptación y el proceso de modificación están claros. El verdadero fracaso ocurre cuando se acepta una buena demostración en lugar de un servicio medible y todos empiezan a negociar qué significa «éxito» después de firmar.

## Fuentes y lecturas adicionales

- [Directrices para la contratación de IA — Gobierno británico](https://www.gov.uk/government/publications/guidelines-for-ai-procurement/guidelines-for-ai-procurement)
- [Marco de Gestión de Riesgos de IA del NIST](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI 600-1: perfil de IA generativa](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
- [ISO/IEC 42001:2023 — Sistemas de gestión de IA](https://www.iso.org/standard/42001)
- [Guía de gobernanza empresarial de IA (en persa)](/slides/enterprise-ai-governance-dba/)
