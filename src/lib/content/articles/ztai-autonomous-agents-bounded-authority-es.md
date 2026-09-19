---
title: "ZTAI para agentes autónomos: autoridad limitada durante toda la ejecución"
slug: ztai-autonomous-agents-bounded-authority-es
translationGroup: ztai-autonomous-agents-bounded-authority
lang: es
date: '2026-09-18'
faDate: '18 de septiembre de 2026'
category: Seguridad
draft: false
cover: /images/articles/ztai-autonomous-agents-bounded-authority/cover.webp
excerpt: "Eliminar el acceso humano directo a datos confidenciales no debe otorgar autoridad ilimitada a un agente. Permisos, RAG, memoria, MCP, herramientas, detención y evaluación independiente para mantener esa autoridad limitada y comprobable."
readTime: '24 min'
related: ["ztai-indirect-data-access-es", "zero-trust-ai-principles-and-controls-es", "zero-trust-ai-maturity-model-es", "mlops-foundation-of-zero-trust-ai-es"]
---

Un agente recibe el encargo de revisar los informes de mantenimiento de una fábrica y crear solicitudes de inspección para los equipos de alto riesgo. En uno de los informes encuentra una frase que le pide enviar los registros a una dirección externa para completar el análisis. El modelo podría interpretarla como una instrucción válida o descartarla. La arquitectura de seguridad no puede depositar toda la protección en ese juicio. La pregunta más importante es otra: aunque el agente lo intente, ¿dispone de la herramienta, la credencial y la ruta necesarias para hacerlo?

En [«Si las personas no pueden ver los datos, ¿se ha eliminado realmente su acceso?»](/es/articles/ztai-indirect-data-access-es/) examinamos cómo se reconstruye el acceso mediante cambios de código, resultados y administración de infraestructura. [«Ingeniería de datos y modelos sin observar datos confidenciales» (en persa)](/articles/ztai-data-model-engineering-without-raw-access/) explicó cómo continuar el trabajo mediante contratos de datos, ejecución protegida y evidencias autorizadas. Ahora aparece otro componente: un sistema que no se limita a seguir un flujo fijo. Durante la ejecución decide qué leer, qué herramienta utilizar y qué delegar en otro agente.

En la formulación orientada a procesos de esta [colección ZTAI](/es/guides/zero-trust-ai/), la IA de confianza cero consiste en rediseñar y automatizar procesos de datos para eliminar la necesidad de acceso e intervención humanos directos sobre información confidencial. Las personas definen políticas, diseñan y examinan evidencias. Es el objetivo arquitectónico de la colección, no la afirmación de que exista un estándar independiente con ese nombre y esa definición exactos. Delegar la ejecución en un agente solo contribuye a ese objetivo si no abre otra vía de observación o modificación ilimitada de los datos.

**La autoridad retirada a las personas no debe transferirse íntegramente al agente. El trabajo que exigía un acceso amplio debe convertirse en operaciones limitadas, controlables y evaluables.**

## El agente propone; el entorno autoriza la ejecución

La diferencia entre un [asistente de código y un agente de programación (en persa)](/articles/code-completion-assistant-and-agent/) ilustra la frontera entre producir una respuesta y efectuar un cambio. Un modelo puede generar texto parecido a una orden de base de datos; el entorno de ejecución lo convierte en una operación real. Ahí debe aplicarse la política: la salida del modelo propone una acción, pero no la autoriza.

Esto concuerda con [NIST SP 800-207, publicado en agosto de 2020](https://csrc.nist.gov/pubs/sp/800/207/final): pertenecer a una red interna o a una organización no genera confianza por sí solo. La arquitectura propuesta aplica ese principio a la identidad del agente, las herramientas y el estado de cada tarea. Lo que sigue es una interpretación de diseño para este uso, no una solución prefabricada extraída del estándar.

El modelo y el planificador pueden elegir su ruta con flexibilidad, pero no deben fijar los límites de su propia autoridad. El motor de políticas, el emisor de credenciales, el ejecutor de herramientas y el sistema de evidencias deben separarse de modo que el agente no pueda eliminar restricciones editando una configuración. Dos servicios separados no crean una frontera real si sus credenciales permiten modificar ambos.

El propio modelo también debe ejecutarse en un entorno de procesamiento autorizado. Si los datos confidenciales se envían a una API externa no autorizada, controlar las herramientas posteriores no resuelve el problema. Aquí suponemos que la inferencia y sus componentes auxiliares, incluidos registros y monitorización, cumplen la política de datos. Si el administrador anfitrión figura en el modelo de amenazas, hacen falta [controles de seguridad del kernel, la GPU y el entorno de ejecución](/es/articles/ai-infrastructure-security-starts-with-kernel-and-gpu-es/). Limitar al agente no los sustituye.

## Identidad propia y autoridad vinculada a la tarea

Una cuenta compartida llamada «asistente corporativo» dificulta la auditoría. Debemos distinguir qué agente actuó, con qué versiones de programa y modelo, en qué ejecución y bajo qué autorización. La identidad del servicio, la de la ejecución y la del solicitante son conceptos distintos. No hace falta crear una cuenta permanente por ejecución, pero las credenciales y evidencias deben conservar esa distinción.

La autoridad de una tarea tampoco es una lista de nombres de herramientas. «Acceso al sistema de mantenimiento» resulta demasiado amplio. El encargo puede permitir leer informes de un ámbito concreto, analizarlos en un entorno protegido y crear un número limitado de borradores de inspección, sin autorizar cambios en los equipos, mensajes externos ni órdenes de compra.

El contrato de ejecución debe convertir la finalidad permitida en restricciones aplicables: recursos, operaciones, destinos, plazo, límites de gasto y acciones, condiciones de detención y derechos de delegación. Escribir «solo para mantenimiento» en el prompt no permite confiar toda la seguridad a la interpretación de la intención lingüística.

Hay una distinción especialmente importante en ZTAI. Un usuario puede estar autorizado a pedir un análisis estadístico sin poder ver los registros de entrada. El servicio procesa los datos con una autorización independiente y limitada, y el usuario recibe únicamente el resultado permitido. En cambio, en un asistente personal de documentos, el agente no debe superar el acceso del usuario. Ambos patrones no se reducen a «usar siempre los permisos del usuario».

En los dos casos, la autoridad efectiva queda limitada por la política de la organización, la autorización de la tarea, los derechos del servicio, la política del recurso y el estado actual de ejecución. El derecho a procesar, a ver el resultado y a actuar a partir de él deben definirse por separado.

## Delegar no debe fabricar permisos

El agente principal puede delegar el análisis de texto, la recuperación de documentos y la consulta del inventario. Dar a cada agente secundario las credenciales completas del principal solo multiplica los titulares de una autoridad amplia.

Cada agente secundario debe recibir únicamente el subconjunto necesario de la autoridad que el principal puede delegar. Deben fijarse la profundidad de delegación, la duración, el destinatario de la credencial y los recursos. Los presupuestos combinados de los agentes secundarios no pueden exceder el de la tarea: crear diez agentes no convierte un límite de diez solicitudes en cien. Una contabilidad compartida, ajena a su control, debe imponer estos límites.

[RFC 8693, OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693), distingue la delegación que conserva la identidad del actor de la suplantación y permite representar una cadena de delegación. Por sí solo no garantiza reducir la autoridad ni revocar automáticamente todos los tokens derivados. La política de emisión y la propagación de la revocación son responsabilidad de la implementación.

Cancelar una tarea debe afectar a todas sus ramas: no emitir nuevos tokens, volver a comprobar las solicitudes en cola e impedir que un agente secundario inicie otra ejecución con una credencial anterior. Las credenciales breves reducen la ventana de riesgo, pero no sustituyen la revocación. Las operaciones sensibles necesitan una nueva validación cerca del momento en que producen su efecto.

## Cada operación se controla fuera del modelo

La pasarela de ejecución debe comprobar identidad, tarea, operación, recurso, parámetros y estado actual. Una herramienta permitida con parámetros prohibidos sigue siendo peligrosa. Leer un archivo autorizado no equivale a leer cualquier ruta; crear un borrador no permite enviarlo a cualquier destinatario.

Conviene que las herramientas sean limitadas por diseño. «Crear un borrador de solicitud de inspección» puede ofrecer un esquema de entrada claro y un destino fijo. Una consola general o SQL arbitrario amplía mucho el alcance para el mismo trabajo. Si es necesario ejecutar código, el entorno debe limitar archivos, red, procesos y recursos. Omitir una herramienta de la lista del modelo no impide que el código generado acceda a la misma capacidad.

El control debe preceder al efecto. Revisar la salida después de enviar un correo o transferir dinero no deshace la acción. Para operaciones sensibles, puede prepararse un plan que fije identificadores de recursos y versiones del estado; al confirmar, se vuelven a comprobar permisos y condiciones previas. Si cambia el destinatario, el importe o la versión del documento, la aprobación anterior deja de valer. Este patrón reduce la distancia entre comprobación y uso; en sistemas distribuidos también hay que precisar el punto de confirmación y sus garantías.

Estas fronteras convierten el diseño en criterios de aceptación comprobables, no solo en ajustes del modelo.

| Frontera de ejecución | Control externo al modelo | Prueba de fallo necesaria |
| --- | --- | --- |
| Inicio de tarea | Identidad propia, contrato válido y credencial limitada | Rechazar la misma solicitud con una tarea caducada |
| Delegación | Menor alcance, profundidad máxima y presupuesto común | El agente secundario no crea autoridad ni presupuesto |
| Recuperación | Autorizar recursos y fragmentos antes de incorporarlos al contexto | Un documento similar pero prohibido no llega a un modelo o reranker no autorizado |
| Memoria y caché | Procedencia, versión de permisos y control al consumir | Una respuesta almacenada no puede usarse tras la revocación |
| Herramientas | Validar operación, parámetros, destino y condiciones previas | Una herramienta permitida no actúa sobre un identificador o destino prohibido |
| Salida de información | Control de contenido, destinatario y entregas relacionadas | Dividir la salida en varias solicitudes no evita el límite |
| Consumo y efectos | Reserva atómica en todo el árbol de la tarea | Paralelismo, reintentos y nuevos agentes no superan el techo |
| Detención | Impedir operaciones nuevas, cancelar colas y contener ejecuciones | Agentes separados y mensajes tardíos no reactivan la tarea |
| Evaluación y retroalimentación | Criterios independientes, procedencia fiable y aceptación separada | El agente no declara su resultado correcto ni autoriza su publicación |

## En RAG, los permisos deben acompañar al documento

Un [asistente de documentos empresariales (en persa)](/articles/enterprise-rag-model-embedding-reranker/) suele buscar, recuperar fragmentos, reordenarlos, construir el contexto y generar una respuesta. Si un fragmento prohibido ya llegó a un modelo o reranker fuera de la frontera permitida, eliminarlo de la respuesta no revierte la revelación. El control debe preceder a cada entrega no autorizada de la cadena. Si el buscador necesita examinar más candidatos dentro del ámbito seguro, también necesita autorización propia para ese procesamiento.

La [documentación de control de acceso por documento de Azure AI Search](https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview) distingue mantener metadatos de permisos y aplicarlos al consultar. Algunas funciones nativas utilizan la API `2026-08-01-preview`. La comprobación compara los permisos del usuario con los metadatos almacenados en el índice. Mientras un cambio de la fuente no llegue al índice, se decide con el estado anterior. La sincronización forma parte de la latencia efectiva de revocación.

En este diseño, la identidad y los filtros proceden de un contexto de ejecución fiable, no de un nombre de usuario o grupo enviado por el modelo. La ausencia de metadatos no debe interpretarse como «público». También pueden ser sensibles el título, el número de resultados, el enlace de descarga o la existencia del archivo.

Una respuesta sintetizada no crea permisos. Resumir documentos confidenciales no elimina automáticamente su confidencialidad. Si solo puede entregarse una estadística limitada, la transformación debe pasar por una vía de salida aprobada; no basta con que el modelo afirme haber «anonimizado» los datos.

## La memoria no convierte el acceso de ayer en un derecho de hoy

Un agente puede haber leído legítimamente un documento ayer y no tener permiso para usarlo hoy. El problema no se limita a la caché de respuestas: resúmenes de conversaciones, memoria persistente, archivos temporales, puntos de control, contexto activo y algunas cachés de inferencia pueden conservar su información.

La memoria derivada debe preservar la procedencia y las dependencias necesarias. Las claves de caché han de considerar el ámbito organizativo, el contexto de acceso y las versiones pertinentes de políticas y datos. Compartir una salida almacenada solo es aceptable si se acredita una autorización equivalente para ese resultado. Hacer la misma pregunta no demuestra esa equivalencia.

Los cambios de permisos requieren invalidar derivados conocidos y comprobarlos al utilizarlos. Una limpieza en segundo plano puede no encontrar todas las copias. Si el documento revocado influyó en el contexto activo, continuar la sesión puede ser inválido. En aplicaciones sensibles hay que detener esa ejecución y reconstruir un contexto limpio con fuentes autorizadas, no limitarse a quitar el documento de las referencias.

No todos los derivados se atribuyen fácilmente a un documento. Un resumen sin procedencia fiable puede tener que descartarse por completo. Conservar menos memoria durante menos tiempo simplifica la revocación. La memoria permanente no debería ser el valor predeterminado de todo agente.

Revocar no borra el pasado. Cambiar una ACL no recupera información ya entregada a una persona o sistema externo autorizado. Borrar un documento del índice tampoco demuestra que desaparezca su influencia de los pesos de un modelo entrenado con él. Las afirmaciones de protección y las políticas de retención deben reconocer esos límites.

## MCP estandariza la conexión, no la confianza

MCP ofrece una interfaz común para herramientas y recursos. Conectarse correctamente a un servidor no autoriza todas sus operaciones; el nombre y la descripción de una herramienta tampoco certifican su seguridad.

La [sección Authorization de la especificación MCP del 28 de julio de 2026](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization) cubre el transporte basado en HTTP y exige atender a la validez del token para el servidor destinatario. No debe extenderse indiscriminadamente a la ejecución local por `stdio`. Las [Security Best Practices oficiales](https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices) también examinan el reenvío indebido de tokens a servicios posteriores, los riesgos de intermediarios confundidos y la ejecución local con autoridad excesiva.

La identidad del servidor y la versión de las herramientas necesitan una vía de aceptación controlada. Cambiar la lista de herramientas o el significado de sus parámetros no debe ampliar automáticamente los permisos de una tarea activa. Etiquetas como «solo lectura» no sustituyen el control efectivo: la [especificación de herramientas](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) indica que las anotaciones no se consideran fiables salvo que procedan de un servidor de confianza.

La inyección de instrucciones también entra por documentos, descripciones de herramientas, errores, resultados web y memoria guardada. Hay que distinguir el contenido recibido de la política válida, pero los delimitadores textuales y el juicio del modelo no bastan como defensa. Incluso el [informe de Anthropic sobre defensas frente a la inyección de instrucciones](https://www.anthropic.com/research/prompt-injection-defenses), que describe mejoras en agentes de navegación, no presenta el problema como resuelto.

La hipótesis práctica es que el modelo será engañado algunas veces. Aun así, el agente de mantenimiento no debe poder crear un destino nuevo, construir una herramienta de extracción de datos ni ampliar su autoridad. Que una herramienta responda «se necesitan más permisos» no autoriza al agente a obtenerlos automáticamente. La ampliación debe pasar por la política y la autoridad competente; de lo contrario, la tarea se detiene dentro de sus límites actuales.

## El presupuesto limita efectos, no solo tokens

Un agente con acceso legítimo puede consumir recursos o introducir cambios permitidos pero perjudiciales. Los límites de tokens y tiempo no limitan necesariamente las solicitudes de compra, los destinatarios, las filas modificadas ni el gasto total.

Cada tarea necesita un presupuesto de cálculo y otro de efectos. El primero cubre tiempo, llamadas, memoria y coste de procesamiento. El segundo limita objetos modificables, contactos, datos liberados y compromisos financieros. También importa el alcance: diez borradores internos no equivalen a diez cartas oficiales enviadas.

La contabilidad debe ser común a la tarea y a todas sus ramas. Antes de ejecutar en paralelo se reserva la capacidad necesaria, evitando que varias solicitudes gasten el mismo saldo. Los reintentos deben depender del resultado anterior y utilizar claves de idempotencia cuando la operación las admita. Un timeout no demuestra que la operación externa haya fallado.

Varias entregas pequeñas pueden revelar mucha información en conjunto. Los límites de divulgación y la comprobación de solicitudes relacionadas no deben reiniciarse con cada sesión. Según la amenaza, el seguimiento puede abarcar tareas, agentes o solicitantes relacionados.

## Detener, revocar y deshacer son capacidades distintas

Apagar el planificador no detiene necesariamente el trabajo. Una herramienta puede haber iniciado un proceso largo; puede haber mensajes en cola, agentes secundarios independientes o reintentos capaces de reactivar una operación.

La vía de detención debe quedar fuera de la autoridad del agente y cubrir todo el árbol. Primero se bloquean nuevas operaciones. Después se revocan o suspenden permisos y colas, y se contienen los trabajos activos según el contrato de cada herramienta. Finalmente se contrasta el estado real con el servicio de destino: qué terminó, qué fue rechazado y qué sigue siendo incierto. Un identificador de generación de tarea, o un mecanismo equivalente, puede impedir que solicitudes antiguas se ejecuten tras un reinicio.

Deshacer no siempre es posible. Un borrador puede borrarse y algunos cambios de datos revertirse con controles de concurrencia. Un correo enviado, una información revelada o un efecto físico en una máquina no se deshacen restaurando una instantánea del sistema del agente. Se necesitan acciones compensatorias y un proceso de gestión de incidentes, además de controles más fuertes antes de efectos irreversibles cuando sea posible.

En un entorno industrial, una parada segura no siempre significa cortar todos los componentes de inmediato. Los equipos pueden necesitar una secuencia ordenada. El agente lingüístico no debe eludir enclavamientos de seguridad independientes ni controles industriales. El responsable del proceso debe definir de antemano el estado seguro, no dejar que el modelo lo improvise durante una crisis.

Si un servicio esencial de políticas o evidencias deja de estar disponible, las operaciones sensibles no pueden continuar sin control. La continuidad requiere una alternativa predefinida, con autoridad y duración limitadas. Evitar una interrupción no debe convertirse en una exención permanente de la frontera de protección.

## Revisar evidencias sin exponer todos los datos

Eliminar la inspección rutinaria no elimina la responsabilidad humana. El supervisor debe poder examinar la tarea, la versión de política, la autoridad, los eventos rechazados, el consumo y los resultados. Normalmente no necesita reunir prompts completos, documentos recuperados y respuestas brutas de herramientas en un panel general.

El registro de auditoría también es una salida de datos. Este diseño conserva identificadores controlados, códigos de motivo, versiones y evidencias mínimas. El contenido sensible permanece en su ámbito autorizado con una política de retención adecuada. Incluso un hash simple de un valor con pocas posibilidades puede identificarse por tanteo; aplicar hashes no sustituye el diseño de confidencialidad del registro.

La aprobación humana debe apoyarse en el efecto exacto propuesto y en evidencias autorizadas, no solo en una explicación persuasiva del agente. Si un juicio responsable exige ver una parte de los datos, debe tratarse como una excepción: asunto, persona autorizada, alcance, duración y fin del acceso definidos. Un proceso que aún depende de esa observación no puede afirmar que ha eliminado por completo la intervención humana.

## Evaluación independiente: el agente no juzga su propio éxito

«La tarea terminó correctamente» no constituye prueba suficiente. Los criterios deben conectarse con un estado verificable externamente: ¿se creó la solicitud correcta sin duplicarla? ¿Entró una fuente prohibida en el contexto? ¿Hubo efectos después de una orden de parada? ¿El resultado llegó únicamente al destinatario autorizado?

La evaluación es independiente cuando el agente ejecutor no puede cambiar los criterios, los datos de prueba, el resultado registrado ni la autorización de publicación. Un segundo modelo puede ayudar, pero dos modelos no son necesariamente independientes frente a la misma entrada contaminada o el mismo error. Las pruebas deterministas, la comprobación del estado real de las herramientas y los controles de política deben acompañar al juicio semántico.

[AgentDojo, cuya tercera versión se publicó el 24 de noviembre de 2024](https://arxiv.org/abs/2406.13352v3), ofrece un entorno para evaluar agentes que usan herramientas y reciben datos no fiables. Su lección útil aquí es medir conjuntamente la ejecución del trabajo y la resistencia a ataques. Rechazarlo todo puede evitar salidas no autorizadas y, a la vez, incumplir el encargo.

Las pruebas de aceptación deben cubrir inyección de instrucciones, cambios de ACL durante la tarea, cachés antiguas, herramientas modificadas, revocación del principal con agentes secundarios activos, reintentos tras timeout y caída del servicio de políticas. Las conclusiones deben respetar el alcance de las pruebas: resistir los ataques ensayados no demuestra inmunidad universal.

## La retroalimentación es una entrada no fiable del siguiente ciclo

Cuando las ejecuciones alimentan el entrenamiento o la memoria futura, aparece otro bucle. El agente que declara correcto su trabajo no debe convertir esa afirmación en una etiqueta de verdad. La opinión del usuario tampoco es definitiva sin examinar procedencia y contexto; un usuario o varias cuentas coordinadas pueden distorsionarla.

En la vía propuesta, los eventos se registran con su procedencia y versión; luego pasan por validación y cuarentena. Solo los datos aceptados llegan a la memoria persistente, al índice de recuperación o al conjunto de entrenamiento. Escribir memoria también exige autorización. Una herramienta no puede convertir una frase que reclama más poder en una regla permanente del agente.

Las salidas generadas, la opinión humana y la evaluación independiente necesitan etiquetas diferentes. Un conjunto de pruebas reservado no debe volver al entrenamiento en cada ciclo. Los cambios de modelo, prompt o índice se evalúan primero en un ámbito limitado; su paso a producción depende de criterios independientes. Automatizar no contradice esa independencia: el productor simplemente no debe controlar sus propios criterios de aceptación.

La [taxonomía de aprendizaje automático adversarial NIST AI 100-2 E2025, publicada en marzo de 2025](https://csrc.nist.gov/pubs/ai/100/2/e2025/final), ayuda a distinguir origen del ataque, fase afectada y capacidades del adversario. No justifica llamar «envenenamiento» a cualquier comentario incorrecto sin analizarlo.

## Del mantenimiento a los criterios de aceptación

Volvamos al encargo inicial. En una implementación hipotética, el agente puede procesar los informes de los últimos treinta días de una línea de producción, dentro del entorno autorizado, y crear como máximo cinco borradores de inspección. No puede enviar datos fuera, comprar piezas ni modificar equipos.

Si un informe recuperado ordena extraer datos, una capa de detección puede señalarlo. Aunque el modelo falle, la pasarela rechaza el destino externo. Los agentes secundarios comparten el mismo presupuesto de cinco acciones. Si se revoca una fuente, se excluyen sus derivados y el análisis continúa solo con contexto limpio y autorizado. La confirmación final también comprueba el estado actual del activo y la autorización de la tarea.

El supervisor puede revisar la cantidad de borradores, las categorías de motivos, las acciones rechazadas y el estado de parada sin leer todos los informes confidenciales. Un evaluador independiente comprueba que los borradores existen y que no hubo actuaciones fuera de alcance. Si la detección no es suficientemente buena, la mejora comienza con evidencias controladas, no entregando todos los datos al desarrollador sin restricciones.

Este es el vínculo con ZTAI: conservar la capacidad de realizar el trabajo, reducir la observación e intervención humanas directas y limitar también la autoridad de procesamiento. Sin instrumentos suficientes de diagnóstico, depuración y evaluación, la arquitectura volverá al acceso humano amplio ante su primer fallo serio.

## ¿Qué respaldan los avances recientes?

[OWASP Top 10 for Agentic Applications 2026, publicado el 9 de diciembre de 2025](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/), trata como cuestión propia la seguridad de agentes que planifican y actúan. El 1 de septiembre de 2026 apareció también la página de [Agent Control Standard, o ACS, en OWASP](https://genai.owasp.org/resource/agent-control-standard-acs/), centrada en puntos de control y aplicación de políticas durante la ejecución. Estos avances muestran atención técnica al control de agentes; no certifican esta definición de ZTAI orientada a procesos ni garantizan la seguridad de un producto.

Junto con las especificaciones MCP y los controles de acceso en recuperación, apuntan a conectar herramientas con límites de autoridad aplicables y comprobables. Una función descrita en un documento, una extensión o una API preliminar no equivale a su implementación completa en nuestro sistema. Deben probarse las versiones, la configuración y el comportamiento real.

## Automatizar no significa abandonar los límites

Los agentes autónomos ayudan a ZTAI cuando reducen la dependencia de la inspección y manipulación humanas directas sin reconstruir ese acceso mediante herramientas, memoria o resultados. No basta con contar tareas completadas o puestos de trabajo reducidos.

Hay que medir conjuntamente la calidad, la reducción de la necesidad de ver datos, las excepciones humanas, los efectos no autorizados, la latencia efectiva de revocación y parada, y el coste de mantener los controles. Autoridad y responsabilidad deben acompañarse, pero eso no exige dar poder ilimitado al ejecutor.

La prueba final llega cuando el agente se equivoca, los datos cambian o se retira un permiso. ¿Puede el sistema seguir imponiendo sus límites? La respuesta debe proceder de evidencias de ejecución, no de la promesa del modelo de obedecer.
