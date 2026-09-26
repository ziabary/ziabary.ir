---
title: "El RAG empresarial necesita más que embeddings: los permisos deben aplicarse en la recuperación"
slug: rag-retrieval-access-control-compass-es
translationGroup: rag-retrieval-access-control-compass
lang: es
date: "2026-09-26"
faDate: "26 de septiembre de 2026"
category: Inteligencia artificial
excerpt: "Una respuesta correcta puede proceder de un documento que el usuario no tiene permiso para leer. El anuncio de Compass Cloud permite examinar el control de acceso en la recuperación y distinguirlo del lugar donde se procesan los datos."
readTime: "7 min"
cover: /images/articles/rag-retrieval-access-control-compass/cover.png
author: "Mehran Ziabary"
toc: auto
related: []
draft: false
---

Un usuario pregunta al asistente de su organización: «¿Por qué cambió el presupuesto de este proyecto?». Recibe una respuesta precisa, bien documentada y convincente. El problema es que una de las fuentes era el acta de una reunión que ese usuario no tenía permiso para leer. Este ejemplo hipotético muestra por qué, al evaluar un sistema RAG, la calidad de la respuesta y la aplicación correcta de los permisos deben medirse por separado.

Unos embeddings mejores pueden encontrar un documento más pertinente, pero la pertinencia no concede permiso. El sistema tiene que responder tanto a «¿Qué información está relacionada con esta pregunta?» como a «¿Qué partes tiene derecho a ver este usuario en este momento?». El [anuncio de Compass Cloud publicado por Cohere el 25 de septiembre de 2026](https://cohere.com/blog/compass-cloud-beta) sirve de punto de partida para examinar ese límite. No demuestra que un solo producto resuelva todos los problemas de seguridad del RAG.

## Los permisos deben aplicarse antes de que el contenido entre en el proceso de respuesta

En una implementación sencilla, la aplicación recupera varios resultados similares y después elimina de la lista los no autorizados. Ese filtro puede formar parte de las defensas del sistema. Sin embargo, si el texto ya ha llegado a un componente de reordenación de resultados —un reranker—, a un registro, a una caché compartida o al modelo generativo, retirarlo de la respuesta final no deshace la exposición anterior. Además, puede haber tan pocos documentos autorizados entre los primeros resultados que la respuesta quede incompleta sin necesidad.

Aplicar los permisos durante la recuperación significa limitar el ámbito de búsqueda y el paso del contenido según la identidad verificada del usuario, el tenant —el entorno lógico de cada cliente— y la política de acceso vigente. El identificador de un rol no debe ser simplemente una cadena que el usuario escribe en el prompt: la aplicación debe obtenerlo de una fuente fiable de autenticación y autorización. La implementación depende del motor de búsqueda y de la estructura de los datos. La mera existencia de una opción de «filtro» no demuestra que ese límite se aplique correctamente.

En la recuperación de varios pasos, tampoco basta con comprobar los permisos en la primera etapa. Cada búsqueda posterior y cada documento encontrado a través de enlaces de un documento anterior deben permanecer dentro del mismo ámbito autorizado. El contexto que recibe el modelo también debe pasar por esos controles. Son consideraciones de arquitectura y de pruebas, no una afirmación de que se hayan verificado todos esos detalles en Compass.

La caché es otro caso importante. Tanto su clave como la validez de una respuesta almacenada deben tener en cuenta el tenant, el ámbito de acceso y los cambios de permisos. Tras revocar un permiso o eliminar un documento, una respuesta antigua no debe convertirse en una vía alternativa para revelar su contenido. La reordenación de resultados y el registro de eventos plantean las mismas preguntas: ¿qué servicio ve el texto en bruto, con qué permiso y durante cuánto tiempo lo conserva?

## ¿Qué ha anunciado Compass Cloud?

En su [presentación de Compass Cloud](https://cohere.com/blog/compass-cloud-beta), Cohere describe una plataforma gestionada de recuperación que reúne la conexión a fuentes, el procesamiento de documentos, los embeddings, la indexación, la recuperación y la reordenación de resultados en un mismo flujo. Según el anuncio, las restricciones por tenant y por documento se aplican durante la recuperación, y el acceso se ofrece mediante una API, un SDK de Python y MCP. Son las capacidades declaradas por el proveedor. Este artículo no presenta una prueba independiente de seguridad ni de funcionamiento del servicio.

La oferta Cloud se anuncia como una **beta privada para un número limitado de socios empresariales**. El anuncio también contempla una oferta autoalojada para necesidades normativas y de privacidad. Por tanto, no se deben trasladar automáticamente las funciones, las condiciones de acceso y las responsabilidades de la versión gestionada a un despliegue interno. El autoalojamiento tampoco implica, por sí solo, código abierto, gratuidad ni independencia respecto a los servicios de soporte.

En este contexto, MCP es una interfaz para conectar herramientas. Utilizarla no garantiza la confidencialidad: siguen siendo determinantes el lugar de ejecución, la autenticación, el alcance de los permisos, los registros y el destino de los datos. Del mismo modo, que un usuario solo vea documentos autorizados no responde a otra pregunta: ¿ha permitido la organización enviar esos documentos a un proveedor de nube para su procesamiento?

## La puntuación de recuperación debe leerse junto con las condiciones de la prueba

En la evaluación interna HighFinance que [Cohere recoge en el mismo anuncio](https://cohere.com/blog/compass-cloud-beta), la puntuación mostrada de nDCG@10 pasa de 64,8 a 81,1: **un aumento de 16,3 puntos en la escala utilizada**. El conjunto contiene documentos financieros y preguntas etiquetadas internamente, y las vías de entrada de los documentos no fueron idénticas. En la comparación con Azure Search, GPT-4.1 Mini realizó el análisis de los documentos, mientras que el flujo de Embed 4 recibió los PDF directamente como imágenes. Por tanto, el resultado no puede atribuirse únicamente a las diferencias entre embeddings.

El informe puede sugerir una hipótesis que conviene probar: conservar la información visual y la estructura de los documentos quizá mejore la recuperación en determinados casos. No demuestra una superioridad general en todas las organizaciones, la calidad de la recuperación en persa ni la aplicación correcta del control de acceso. Para separar el efecto del motor de recuperación del procesamiento documental, una comparación debe utilizar entradas idénticas ya procesadas. La comparación de las dos soluciones completas, con métodos de análisis distintos, debe presentarse por separado.

## ¿Qué falta aclarar para tomar una decisión empresarial?

El anuncio examinado no basta para dar por establecidos el precio, los acuerdos de nivel de servicio (SLA), la región de alojamiento, la residencia de los datos o la disponibilidad del servicio en Irán. Esa limitación no debe convertirse en la afirmación de que la información no existe en ningún documento o contrato de la empresa. Hay que obtener la documentación correspondiente al plan y al cliente concretos. Mientras no estén claras la disponibilidad real y las condiciones del servicio, este artículo no recomienda Compass Cloud como opción práctica por defecto para una organización iraní.

Antes de elegir una solución, el equipo de compras puede pedir una prueba de aceptación pequeña pero concreta: dos usuarios con permisos diferentes plantean la misma pregunta; después, se revoca el acceso de uno de ellos y se elimina un documento. El sistema debe respetar esos cambios en nuevas recuperaciones, en respuestas almacenadas en caché y en consultas que exijan varios pasos de recuperación. La prueba debe examinar tanto los fragmentos recuperados como la respuesta final. Observar una respuesta aparentemente inocua no basta, porque el contenido no autorizado podría haber entrado ya en el contexto del modelo o en otro servicio.

Los criterios de selección deben combinar calidad de recuperación, tiempo de respuesta, coste y respeto de los límites de acceso. Si un texto correcto procede de un documento no autorizado, una puntuación alta de recuperación no resuelve el problema. Eliminar todos los resultados y no responder tampoco es un resultado útil. Ese equilibrio debe evaluarse con documentos de prueba autorizados, roles definidos y criterios de aceptación establecidos de antemano.
